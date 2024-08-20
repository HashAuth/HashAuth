import vikeReact from "vike-react/config";
import type { Config } from "vike/types";

// Default config (can be overridden by pages)
export default {
  // <title>
  title: "HashAuth",
  extends: vikeReact,
  passToClient: ["isDevelopment", "isTestnet", "accountId"],
} satisfies Config;
