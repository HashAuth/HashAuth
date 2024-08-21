import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import compression from "compression";

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import { renderPage } from "vike/server";
import Provider from "oidc-provider";

import config from "./config/index.js";
import logger from "./config/logger.js";

// TODO: This best ES6 way to set up mongoose models?
import AccountSchema from "./models/Account.js";
const Account = mongoose.model("Account");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;

const app = express();
//app.use(compression());
//app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");

logger.info(
  `HashAuth Authorization Server starting in ${config.DEVELOPMENT_MODE ? "DEVELOPMENT" : "PRODUCTION"} mode...`
);

mongoose
  .connect(config.DB_CONNECTION_STRING, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    logger.debug(
      `Connected to ${config.DEVELOPMENT_MODE ? "DEVELOPMENT" : "PRODUCTION"} database`
    );
    if (config.DEVELOPMENT_MODE) {
      mongoose.set("debug", true);
    }
  })
  .catch((err) => {
    logger.error(
      `Failed to connect to ${config.DEVELOPMENT_MODE ? "DEVELOPMENT" : "PRODUCTION"} database:\n${err}`
    );
    process.exit();
  });

mongoose.connection.on("error", (err) => {
  logger.error(`Database error: ${err}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(`${root}/dist/client`));
} else {
  const vite = await import("vite");
  const viteDevMiddleware = (
    await vite.createServer({
      root,
      server: { middlewareMode: true },
    })
  ).middlewares;
  app.use(viteDevMiddleware);
}

async function vikeHandler(pageContextInit, req, res, next) {
  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;
  if (!httpResponse) {
    return next();
  } else {
    const { body, statusCode, headers, earlyHints } = httpResponse;
    if (res.writeEarlyHints)
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    headers.forEach(([name, value]) => res.setHeader(name, value));
    res.status(statusCode);
    // httpResponse.pipe(res);
    res.send(body);
  }
}

const provider = new Provider(`http://localhost:5050`, {
  clients: [
    {
      client_id: "hello-future-demo",
      logo_uri:
        "https://cdn.discordapp.com/icons/1098212475343732777/dbf2a25a40891837392eec5d2877cfe9.webp",
      client_name: "Hello Future Demo Client",
      client_secret: "demo_client_secret",
      redirect_uris: ["https://echo.free.beeceptor.com"],
      response_types: ["code", "code id_token", "id_token"],
      grant_types: ["authorization_code", "implicit"],
      response_modes: ["form_post"],
    },

    {
      client_id: "hashauth",
      logo_uri:
        "https://cdn.discordapp.com/icons/1098212475343732777/dbf2a25a40891837392eec5d2877cfe9.webp",
      client_name: "HashAuth",
      client_secret: "dev_hashauth_client_secret", // TODO: Update to docker secret
      redirect_uris: config.DEVELOPMENT_MODE
        ? ["http://localhost", "http://localhost/account"]
        : ["http://hashauth.io", "http://hashauth.io/account"],
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
    const grantId =
      ctx.oidc.result?.consent?.grantId ||
      ctx.oidc.session.grantIdFor(ctx.oidc.client.clientId);

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

      grant.addOIDCScope("openid email profile");
      await grant.save();
      return grant;
    }
  },
  findAccount: Account.findAccountById,
});

const { invalidate: orig } = provider.Client.Schema.prototype;

// TODO: Just for testing
provider.Client.Schema.prototype.invalidate = function invalidate(
  message,
  code
) {
  if (code === "implicit-force-https" || code === "implicit-forbid-localhost") {
    return;
  }

  orig.call(this, message);
};

provider.proxy = true;

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

app.post("/interaction/:uid/login", async function (req, res, next) {
  try {
    const {
      prompt: { name },
    } = await provider.interactionDetails(req, res);
    if (name != "login")
      throw new Error("Corrupt auth interaction state. Please start over.");

    console.log(req.body);

    // TODO: Authentication logic
    // For now (demo), bypassing this for time management purposes.

    const result = {
      login: {
        accountId: req.body.accountId,
      },
    };

    await provider.interactionFinished(req, res, result, {
      mergeWithLastSubmission: false,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/demo/callback", async function (req, res, next) {});

app.post("/interaction/:uid/confirm", async function (req, res, next) {
  try {
    const interactionDetails = await provider.interactionDetails(req, res);
    const {
      prompt: { name, details },
      params,
      session: { accountId },
    } = interactionDetails;
    if (name != "consent")
      throw new Error("Corrupt auth interaction state. Please start over.");

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
      for (const [indicator, scopes] of Object.entries(
        details.missingResourceScopes
      )) {
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

  await vikeHandler(pageContextInit, req, res, next);
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
