import { createRequestHandler } from "@remix-run/express";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import winston from "winston";
import Provider from "oidc-provider";

import config from './config/index.js';
import logger from './config/logger.js';

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const remixHandler = createRequestHandler({
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
    : await import("./build/server/index.js"),
});

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("build/client", { maxAge: "1h" }));

app.use(morgan("tiny"));
logger.info(`HashAuth Authorization Server starting in ${config.DEVELOPMENT_MODE ? "DEVELOPMENT" : "PRODUCTION"} mode...`);

const provider = new Provider(`http://localhost:5050`, {
  clients: [
    {
      client_id: 'foo',
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
      return '/oidc/interaction/${interaction.uid}';
    }
  }
});

// handle SSR requests
app.use("/oidc", provider.callback());
app.all("*", remixHandler);


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