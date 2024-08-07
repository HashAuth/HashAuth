export default {
  DEVELOPMENT_MODE: process.env.NODE_ENV != "production",
  IS_TESTNET:
    process.env.NODE_ENV != "production" && process.env.IS_TESTNET == "true",
};
