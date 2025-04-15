import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.d.ts",
        "**/*.test.{ts,tsx}",
        "src/test/**/*",
      ],
    },
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
    reporters: ["default", "html"],
    watch: true,
    testTimeout: 10000,
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
