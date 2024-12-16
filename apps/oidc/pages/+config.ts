import vikeReact from "vike-react/config";
import type { Config } from "vike/types";

// Default config (can be overridden by pages)
export default {
    // <title>
    stream: false,
    title: "HashAuth",
    extends: vikeReact,
    passToClient: ["isDevelopment", "isTestnet", "accountId", "id_token", "accountNickname"],
} satisfies Config;
