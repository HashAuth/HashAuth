// vite.config.ts
import react from "file:///app/node_modules/.pnpm/@vitejs+plugin-react@4.3.1_vite@5.3.5_@types+node@22.0.2_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///app/node_modules/.pnpm/vite@5.3.5_@types+node@22.0.2/node_modules/vite/dist/node/index.js";
import vike from "file:///app/node_modules/.pnpm/vike@0.4.182_react-streaming@0.3.43_react-dom@18.3.1_react@18.3.1__react@18.3.1__vite@5.3.5_@types+node@22.0.2_/node_modules/vike/dist/esm/node/plugin/index.js";
import { nodePolyfills } from "file:///app/node_modules/.pnpm/vite-plugin-node-polyfills@0.22.0_rollup@4.19.1_vite@5.3.5_@types+node@22.0.2_/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [vike({}), react({}), nodePolyfills()],
  server: {
    port: 24678,
    host: "0.0.0.0"
    // watch: {
    ///    usePolling: true
    //  }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwL2FwcHMvb2lkY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2FwcC9hcHBzL29pZGMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2FwcC9hcHBzL29pZGMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZpa2UgZnJvbSBcInZpa2UvcGx1Z2luXCI7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSBcInZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2aWtlKHt9KSwgcmVhY3Qoe30pLCBub2RlUG9seWZpbGxzKCldLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAyNDY3OCxcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcblxuICAgIC8vIHdhdGNoOiB7XG4gICAgLy8vICAgIHVzZVBvbGxpbmc6IHRydWVcbiAgICAvLyAgfVxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTROLE9BQU8sV0FBVztBQUM5TyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFFOUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUM7QUFBQSxFQUM5QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
