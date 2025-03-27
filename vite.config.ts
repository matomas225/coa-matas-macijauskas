import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
  plugins: [react()],
});
