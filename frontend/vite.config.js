import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://lets-code-new-backend.vercel.app",
    },
  },
  plugins: [react()],
});
