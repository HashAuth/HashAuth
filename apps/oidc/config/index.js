import * as fs from "fs";

let isDevelopmentMode = process.env.NODE_ENV != "production";

export default {
    DEVELOPMENT_MODE: isDevelopmentMode,
    IS_TESTNET: process.env.IS_TESTNET == "true",

    DB_CONNECTION_STRING: fs.readFileSync(process.env.DB_CONNECTION_STRING_SECRET, "utf-8").trim(),
    JWT_PRIVATE_KEY: fs.readFileSync(process.env.JWT_PRIVATE_KEY_SECRET, "utf-8").trim(),
    DB_ENCRYPTION_KEY: fs.readFileSync(process.env.DB_ENCRYPTION_KEY_SECRET, "utf-8").trim(),
};
