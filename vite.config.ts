import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { rmSync } from "fs";

rmSync("dist", { recursive: true, force: true });

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.d.ts", "src/types/*.d.ts"],
      exclude: ["src/__tests__", "src/**/*.test.ts", "src/**/*.test.tsx"],
      insertTypesEntry: true,
      rollupTypes: true,
      copyDtsFiles: true,
      staticImport: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        "use-react": resolve(__dirname, "src/use-react/index.tsx"),
      },
      name: "ib-image-optimizer",
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "vue"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          vue: "Vue",
        },
        preserveModules: true,
        manualChunks: undefined,
      },
    },
    target: "esnext",
    sourcemap: true,
    outDir: "dist",
    ssr: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".d.ts"],
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
});