
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import compression from "compression";

import express from "express";
import morgan from "morgan";
import { renderPage } from "vike/server";
import Provider from "oidc-provider";

import config from './config/index.js';
import logger from './config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;

const app = express();
app.use(compression());
app.use(morgan("tiny"));
app.disable("x-powered-by");

logger.info(`HashAuth Authorization Server starting in ${config.DEVELOPMENT_MODE ? "DEVELOPMENT" : "PRODUCTION"} mode...`);

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
  const { httpResponse } = pageContext
  if (!httpResponse) {
    return next()
  } else {
    const { statusCode, headers, earlyHints } = httpResponse
    if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) })
    headers.forEach(([name, value]) => res.setHeader(name, value))
    res.status(statusCode)
    httpResponse.pipe(res)
  }
}

const provider = new Provider(`http://localhost:5050`, {
  clients: [
    {
      client_id: 'foo',
      client_name: 'Test Client',
      client_secret: 'foo_secret',
      redirect_uris: ['https://echo.free.beeceptor.com'], // using jwt.io as redirect_uri to show the ID Token contents
      response_types: ['code'],
      grant_types: ['authorization_code'],
    },
  ],
  pkce: {
    required: function(ctx, client) {
        return false;
    }
  },
  interactions: {
    url: function(ctx, interaction) {
      return `/interaction/${interaction.uid}/${interaction.prompt.name}`;
    }
  },
  features: {
    devInteractions: { enabled: false }
  }
});

app.use("/oidc", provider.callback());

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.get("*", async function (req, res, next) {
  // TODO: Do this the non-lazy way
  const pageContextInit = {
    urlOriginal: req.originalUrl,
    headersOriginal: req.headers,
    req,
    res,
    provider
  };

  await vikeHandler(pageContextInit, req, res, next);
});

if (config.DEVELOPMENT_MODE) {
  // development error handler
  // will print stacktrace
  app.use(function(err, req, res, next) {
    logger.error(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {}
    }});
  });
}

export default app;