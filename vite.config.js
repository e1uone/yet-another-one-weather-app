import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    hmr: {
      port: 3001,
    },
  },

  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: "prompt",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "yet-another-one-weather-app",
        short_name: "yet-another-one-weather-app",
        description: "Yet another one weather app :)",
        theme_color: "#ffffff",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
