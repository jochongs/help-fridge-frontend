import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { ViteFaviconsPlugin } from "vite-plugin-favicon";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ViteFaviconsPlugin("favicon.png")],
  server: {
    host: true,
    port: 5173,
  },
});
