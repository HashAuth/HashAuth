import { readFileSync } from "node:fs";

export default {
    DEVELOPMENT_MODE: process.env.NODE_ENV != "production",
    IS_TESTNET: process.env.IS_TESTNET == "true",

    SUMSUB_APP_TOKEN: "sbx:GM5Ibzi7lVYxq0bUY9AnAva5.7SZOfaJxHLchnMjzbVOjLr8B3iO1BPtA", // sandbox token
    SUMSUB_SECRET_KEY: readFileSync(process.env.SUMSUB_SECRET_KEY_SECRET, "utf-8").trim(),
    SUMSUB_ACCESSTOKEN_TTL: 600,

    DB_ENCRYPTION_KEY: readFileSync(process.env.DB_ENCRYPTION_KEY_SECRET, "utf-8").trim(),
    DB_CONNECTION_STRING: readFileSync(process.env.DB_CONNECTION_STRING_SECRET, "utf-8").trim(),

    JWT_PRIVATE_KEY: readFileSync(process.env.JWT_PRIVATE_KEY_SECRET, "utf-8"),
};
