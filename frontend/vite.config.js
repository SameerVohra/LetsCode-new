import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/": "https://lets-code-new-back.vercel.app",
    },
  },
  plugins: [react()],
});
