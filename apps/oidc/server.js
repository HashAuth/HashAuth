import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import compression from "compression";

import express from "express";
import morgan from "morgan";
import { renderPage } from "vike/server";
import Provider from "oidc-provider";

import config from "./config/index.js";
import logger from "./config/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;

const app = express();
app.use(compression());
app.use(morgan("tiny"));
app.disable("x-powered-by");

logger.info(
  `HashAuth Authorization Server starting in ${config.DEVELOPMENT_MODE ? "DEVELOPMENT" : "PRODUCTION"} mode...`,
);

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
    const { statusCode, headers, earlyHints } = httpResponse;
    if (res.writeEarlyHints)
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    headers.forEach(([name, value]) => res.setHeader(name, value));
    res.status(statusCode);
    httpResponse.pipe(res);
  }
}

const provider = new Provider(`http://localhost:5050`, {
  clients: [
    {
      client_id: "hello-future-test",
      logo_uri:
        "https://cdn.discordapp.com/icons/1098212475343732777/dbf2a25a40891837392eec5d2877cfe9.webp",
      client_name: "Hello Future",
      client_secret: "test_client_secret",
      redirect_uris: ["https://echo.free.beeceptor.com"],
      response_types: ["code", "code id_token", "id_token"],
      grant_types: ["authorization_code", "implicit"],
      response_modes: ["form_post"],
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
});

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

    const result = {
      login: {
        accountId: "0.0.1337",
      },
    };

    await provider.interactionFinished(req, res, result, {
      mergeWithLastSubmission: false,
    });
  } catch (error) {
    next(error);
  }
});

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
        details.missingResourceScopes,
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

  // TODO: Do this the non-lazy way
  const pageContextInit = {
    urlOriginal: req.originalUrl,
    headersOriginal: req.headers,
    req,
    res,
    provider,
    accountId: session?.accountId,
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
