import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [vike({}), react({}), nodePolyfills()],
  server: {
    port: 24678,
    host: "0.0.0.0",

    // watch: {
    ///    usePolling: true
    //  }
  },
});
