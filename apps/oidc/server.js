import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import compression from "compression";

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import { renderPage, createDevMiddleware } from "vike/server";
import Provider from "oidc-provider";

import config from "./config/index.js";
import logger from "./config/logger.js";
import { generateAccessToken } from "./helpers/sumsub.js";

import UserAccountSchema from "./models/UserAccount.js";
import IdDocumentSchema from "./models/IdDocument.js";
import SumsubIdentificationSchema from "./models/SumsubIdentification.js";
const UserAccount = mongoose.model("UserAccount");
const IdDocument = mongoose.model("IdDocument");
const SumsubIdentification = mongoose.model("SumsubIdentification");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;

const app = express();
app.use(compression());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");

logger.info(`HashAuth Authorization Server starting in ${config.DEVELOPMENT_MODE ? "DEVELOPMENT" : "PRODUCTION"} mode...`);

mongoose
    .connect(config.DB_CONNECTION_STRING, { serverSelectionTimeoutMS: 10000 })
    .then(() => {
        logger.info(`Connected to ${config.DEVELOPMENT_MODE ? "DEVELOPMENT" : "PRODUCTION"} database`);
        if (config.DEVELOPMENT_MODE) {
            mongoose.set("debug", true);
        }
    })
    .catch((err) => {
        logger.error(`Failed to connect to ${config.DEVELOPMENT_MODE ? "DEVELOPMENT" : "PRODUCTION"} database:\n${err}`);
        process.exit();
    });

mongoose.connection.on("error", (err) => {
    logger.error(`Database error: ${err}`);
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(`${root}/dist/client`));
} else {
    const { devMiddleware } = await createDevMiddleware({ root });
    app.use(devMiddleware);
}

async function vikeHandler(pageContextInit, req, res, next) {
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) {
        return next();
    } else {
        const { body, statusCode, headers, earlyHints } = httpResponse;
        // if (res.writeEarlyHints)
        //  res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
        headers.forEach(([name, value]) => res.setHeader(name, value));
        res.status(statusCode);
        // httpResponse.pipe(res);
        res.send(body);
    }
}

const provider = new Provider(config.DEVELOPMENT_MODE ? `http://localhost` : `https://hashauth.io`, {
    clients: [
        {
            client_id: "hello-future-demo",
            logo_uri: "https://cdn.discordapp.com/icons/1098212475343732777/dbf2a25a40891837392eec5d2877cfe9.webp",
            client_name: "Hello Future Demo Client",
            client_secret: "demo_client_secret",
            redirect_uris: config.DEVELOPMENT_MODE ? ["http://localhost/demo/callback"] : ["https://hashauth.io/demo/callback"],
            response_types: ["code", "code id_token", "id_token"],
            grant_types: ["authorization_code", "implicit"],
            response_modes: ["form_post"],
        },

        {
            client_id: "hashauth",
            logo_uri: "https://i.imgur.com/GLOfiJ5.png",
            client_name: "HashAuth",
            client_secret: "dev_hashauth_client_secret", // TODO: Update to docker secret
            redirect_uris: config.DEVELOPMENT_MODE
                ? ["http://localhost", "http://localhost/account"]
                : ["https://hashauth.io", "https://hashauth.io/account"],
            response_types: ["code", "code id_token", "id_token", "none"],
            grant_types: ["authorization_code", "implicit"],
            response_modes: ["form_post", "fragment"],
        },
    ],
    pkce: {
        required: function (ctx, client) {
            return false;
        },
    },
    interactions: {
        url: function (ctx, interaction) {
            return `/interaction/${interaction.uid}`;
        },
    },
    features: {
        devInteractions: { enabled: false },
    },
    async loadExistingGrant(ctx) {
        const grantId = ctx.oidc.result?.consent?.grantId || ctx.oidc.session.grantIdFor(ctx.oidc.client.clientId);

        if (grantId) {
            // keep grant expiry aligned with session expiry
            // to prevent consent prompt being requested when grant expires
            const grant = await ctx.oidc.provider.Grant.find(grantId);

            // this aligns the Grant ttl with that of the current session
            // if the same Grant is used for multiple sessions, or is set
            // to never expire, you probably do not want this in your code
            if (ctx.oidc.account && grant.exp < ctx.oidc.session.exp) {
                grant.exp = ctx.oidc.session.exp;

                await grant.save();
            }

            return grant;
        } else if (ctx.oidc.client.clientId == "hashauth") {
            const grant = new ctx.oidc.provider.Grant({
                clientId: ctx.oidc.client.clientId,
                accountId: ctx.oidc.session.accountId,
            });

            grant.addOIDCScope("openid");
            await grant.save();
            return grant;
        }
    },
    findAccount: UserAccount.findAccountById,
    claims: {
        openid: ["sub", "accountId"],
        kyc: ["kycIdNumber", "kycIdType", "kycIdIssueDate", "kycIdExpirationDate", "kycFullName", "kycBirthDate", "kycResidentialAddress"],
    },
    renderError: async (ctx, out, error) => {
        ctx.type = "html";

        if (config.DEVELOPMENT_MODE) {
            ctx.body = `
        <h1>OIDC Provider Error</h1>
        <p><strong>Error:</strong> ${out.error}</p>
        <p><strong>Description:</strong> ${out.error_description}</p>
        <p><strong>Error URI:</strong> ${out.error_uri || "N/A"}</p>
        <pre>${error.stack}</pre>
      `;
        } else {
            // production-friendly error
            ctx.body = `
        <h1>Something went wrong</h1>
        <p>${out.error_description}</p>
      `;
        }
    },
});

const { invalidate: orig } = provider.Client.Schema.prototype;

// TODO: Just for testing
provider.Client.Schema.prototype.invalidate = function invalidate(message, code) {
    if (code === "implicit-force-https" || code === "implicit-forbid-localhost") {
        return;
    }

    orig.call(this, message);
};

// provider.proxy = true;

app.use("/oidc", provider.callback());

app.get("/interaction/:uid/abort", async (req, res, next) => {
    try {
        const result = {
            error: "access_denied",
            error_description: "End-User aborted interaction",
        };
        await provider.interactionFinished(req, res, result, {
            mergeWithLastSubmission: false,
        });
    } catch (err) {
        next(err);
    }
});

app.get("/api/sumsub/accessToken", async function (req, res, next) {
    const ctx = provider.app.createContext(req, res);
    const session = await provider.Session.get(ctx);

    if (!session || !session.accountId) {
        res.status(401).json({ error: "No session" });
        return;
    }

    let sumsubId;
    try {
        sumsubId = await SumsubIdentification.findOneAndUpdate({ user: session.accountId, active: true }, {}, { new: true, upsert: true });
    } catch (error) {
        logger.error("Error while finding SumsubIdentification in /api/sumsub/accessToken:", error);
        res.status(500).json({ error: "Database error" });
        return;
    }

    const now = new Date();
    if (!sumsubId.accessTokenExpiresOn || sumsubId.accessTokenExpiresOn.getTime() < now.getTime()) {
        let accessToken;
        try {
            accessToken = (await generateAccessToken(session.accountId)).data.token;
        } catch (error) {
            logger.error("Error while fetching sumsub accessToken:", error);
            res.status(500).json({ error: "Failed to fetch sumsub accessToken" });
            return;
        }

        if (!accessToken || accessToken == "") {
            logger.error("Missing or empty sumsub token received in /api/sumsub/accessToken");
            res.status(500).json({ error: "Failed to fetch sumsub accessToken" });
            return;
        }

        try {
            sumsubId.accessToken = accessToken;
            now.setSeconds(now.getSeconds() + config.SUMSUB_ACCESSTOKEN_TTL);
            sumsubId.accessTokenExpiresOn = now;
            await sumsubId.save();
        } catch (error) {
            logger.error("Failed to save SumsubIdentification in /api/sumsub/accessToken:", error);
            res.status(500).json({ error: "Database error" });
            return;
        }
    }

    res.json({ accessToken: sumsubId.accessToken });
});

app.post("/interaction/:uid/login", async function (req, res, next) {
    try {
        const {
            prompt: { name },
        } = await provider.interactionDetails(req, res);
        if (name != "login") throw new Error("Corrupt auth interaction state. Please start over.");

        console.log(req.body);

        // TODO: Authentication logic
        // For now (demo), bypassing this.

        // TODO: Verify valid account IDs, etc.
        let authError = false;

        let user;
        try {
            user = await UserAccount.findOneAndUpdate(
                { linkedWallets: req.body.accountId },
                { activeWallet: req.body.accountId, $setOnInsert: { linkedWallets: [req.body.accountId] } },
                { upsert: true, new: true },
            );

            if (user.accountId != user._id.toString()) {
                user.accountId = user._id.toString();
                user.kycDocument = new IdDocument();
                await user.save();
            }
        } catch (error) {
            logger.error("Failed to find UserAccounts by hedera account ID in /interaction/:uid/login:", error);
            authError = true;
        }

        let result;
        if (authError) {
            result = {
                error: "access_denied",
                error_description: "Database error",
            };
        } else {
            result = {
                login: {
                    accountId: user._id.toString(),
                },
            };
        }

        await provider.interactionFinished(req, res, result, {
            mergeWithLastSubmission: false,
        });
    } catch (error) {
        next(error);
    }
});

app.post("/demo/callback", async function (req, res, next) {
    let id_token = req.body.id_token;

    const ctx = provider.app.createContext(req, res);
    const session = await provider.Session.get(ctx);

    const pageContextInit = {
        urlOriginal: "/demo",
        headersOriginal: req.headers,
        req,
        res,
        provider,
        accountId: session?.accountId,
        isDevelopment: config.DEVELOPMENT_MODE,
        isTestnet: config.IS_TESTNET,
        id_token,
    };

    await vikeHandler(pageContextInit, req, res, next);
});

app.post("/interaction/:uid/confirm", async function (req, res, next) {
    try {
        const interactionDetails = await provider.interactionDetails(req, res);
        const {
            prompt: { name, details },
            params,
            session: { accountId },
        } = interactionDetails;
        if (name != "consent") throw new Error("Corrupt auth interaction state. Please start over.");

        let { grantId } = interactionDetails;
        let grant;

        if (grantId) {
            // we'll be modifying existing grant in existing session
            grant = await provider.Grant.find(grantId);
        } else {
            // we're establishing a new grant
            grant = new provider.Grant({
                accountId,
                clientId: params.client_id,
            });
        }

        if (details.missingOIDCScope) {
            grant.addOIDCScope(details.missingOIDCScope.join(" "));
        }
        if (details.missingOIDCClaims) {
            grant.addOIDCClaims(details.missingOIDCClaims);
        }
        if (details.missingResourceScopes) {
            for (const [indicator, scopes] of Object.entries(details.missingResourceScopes)) {
                grant.addResourceScope(indicator, scopes.join(" "));
            }
        }

        grantId = await grant.save();

        const consent = {};
        if (!interactionDetails.grantId) {
            consent.grantId = grantId;
        }

        const result = { consent };
        await provider.interactionFinished(req, res, result, {
            mergeWithLastSubmission: true,
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.get("*", async function (req, res, next) {
    const ctx = provider.app.createContext(req, res);
    const session = await provider.Session.get(ctx);

    const pageContextInit = {
        urlOriginal: req.originalUrl,
        headersOriginal: req.headers,
        req,
        res,
        provider,
        accountId: session?.accountId,
        isDevelopment: config.DEVELOPMENT_MODE,
        isTestnet: config.IS_TESTNET,
    };

    return await vikeHandler(pageContextInit, req, res, next);
});

if (config.DEVELOPMENT_MODE) {
    // development error handler
    // will print stacktrace
    app.use(function (err, req, res, next) {
        logger.error(err.stack);

        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
                error: {},
            },
        });
    });
}

export default app;
