import axios from "axios";
import crypto from "crypto";

import config from "../config/index.js";
import logger from "../config/logger.js";

let axiosConfig = {};
axiosConfig.baseURL = "https://api.sumsub.com";

axios.interceptors.request.use(createSignature, function (error) {
    return Promise.reject(error);
});

function createSignature(localConfig) {
    var ts = Math.floor(Date.now() / 1000);
    const signature = crypto.createHmac("sha256", config.SUMSUB_SECRET_KEY);
    signature.update(ts + localConfig.method.toUpperCase() + localConfig.url);

    if (localConfig.data) {
        signature.update(localConfig.data);
    }

    localConfig.headers["X-App-Access-Ts"] = ts;
    localConfig.headers["X-App-Access-Sig"] = signature.digest("hex");

    return localConfig;
}

function createAccessToken(externalUserId, levelName = "id-and-liveness", ttlInSecs = config.SUMSUB_ACCESSTOKEN_TTL) {
    var body = {
        userId: externalUserId,
        levelName: levelName,
        ttlInSecs: ttlInSecs,
    };

    var method = "post";
    var url = "/resources/accessTokens/sdk";

    var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-App-Token": config.SUMSUB_APP_TOKEN,
    };

    axiosConfig.method = method;
    axiosConfig.url = url;
    axiosConfig.headers = headers;
    axiosConfig.data = JSON.stringify(body);

    return axiosConfig;
}

export async function generateAccessToken(userId, levelName, ttlInSecs) {
    return await axios(createAccessToken(userId, levelName, ttlInSecs));
}
