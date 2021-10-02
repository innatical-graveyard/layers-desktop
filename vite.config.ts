import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inn from "@innatical/inn.ts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inn()],
  define: {
    global: "globalThis",
  },
  build: {
    sourcemap: true,
  },
});
