import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    cors: true,
    host: true,
    allowedHosts: ["react-ts-insta-generator.onrender.com"],
  },
  plugins: [react()],
});
