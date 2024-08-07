import winston from "winston";

import config from "./index.js";

const { combine, timestamp, prettyPrint } = winston.format;

const loggerLevels = {
  levels: {
    critical: 0,
    error: 1,
    warn: 2,
    info: 3,
    heartbeat: 4,
    debug: 5,
    verbose: 6,
  },
  colors: {
    critical: "red",
    error: "red",
    warn: "yellow",
    info: "green",
    verbose: "blue",
    heartbeat: "grey",
  },
};

winston.addColors(loggerLevels.colors);

const logger = winston.createLogger({
  level: "verbose",
  levels: loggerLevels.levels,
  format: combine(timestamp(), prettyPrint({ colorize: true })),
  transports: [
    new winston.transports.Console({
      level: config.DEVELOPMENT_MODE ? "verbose" : "info",
    }),
  ],
});

export default logger;
