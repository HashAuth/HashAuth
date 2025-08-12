import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
    optimizeDeps: {
        include: ["buffer"],
    },
    plugins: [vike({}), react()],
    logLevel: "warn",
    ssr: {
        noExternal: ["@hashgraph/hedera-wallet-connect"],
    },
    server: {
        port: 24678,
        host: "0.0.0.0",
    },
});
