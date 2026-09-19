import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist/client",
    rollupOptions: {
      input: {
        client: path.resolve(__dirname, "index.html"),
      },
    },
  },
  ssr: {
    // Render our App server-side; keep node builtins external for the express server
    external: ["express"],
  },
});
