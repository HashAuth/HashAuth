const express = require('express');
const morgan = require('morgan');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Provider } = require('fix-esm').require('oidc-provider');

//const promBundle = require('express-prom-bundle');

const app = express();

//const metricsMiddleware = promBundle({ includePath: true, includeMethod: true, autoregister: false, metricsPath: "/api/metrics" });
//promClient.collectDefaultMetrics();

const config = require('./config');
const logger = require('./config/logger');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

if (config.DEVELOPMENT_MODE) {
  app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // enable set cookie
}));
}

app.use(morgan('short'));
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
  }
});

app.use(provider.callback());

// mongoose.connect(config.DB_CONNECTION_STRING, { serverSelectionTimeoutMS: 10000 } )
//   .then(() => {
//     logger.debug(`Connected to ${config.DEVELOPMENT_MODE ? "DEVELOPMENT" : "PRODUCTION"} database`);
//     if (config.DEVELOPMENT_MODE) {
//       mongoose.set("debug", true);
//     }
//   })
//   .catch((err) => {
//     logger.error(`Failed to connect to ${config.DEVELOPMENT_MODE ? "DEVELOPMENT" : "PRODUCTION"} database:\n${err}`);
//     process.exit();
//   });

// mongoose.connection.on('error', err => {
//   logger.error(`Database error: ${err}`);
// });

// mongoose models and configs

// express metrics middleware
//app.use(metricsMiddleware);

// master router
//app.use('/api', require('./routes'));

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

module.exports = app;