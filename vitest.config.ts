import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
    setupFiles: ["src/tests/vitest.setup.ts"],
  },
});
