import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://lc-back.onrender.com/",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
