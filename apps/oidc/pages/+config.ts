import vikeReact from "vike-react/config";
import type { Config } from "vike/types";

// Default config (can be overridden by pages)
export default {
    // <title>
    stream: false,
    htmlAttributes: { class: "dark bg-gray-900" },
    title: "HashAuth",
    extends: vikeReact,
    passToClient: ["isDevelopment", "isTestnet", "user", "id_token", "accountNickname"],
} satisfies Config;
