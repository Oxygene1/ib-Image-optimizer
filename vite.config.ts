import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from 'vite-plugin-dts';


export default defineConfig({
  plugins: [react(), dts({
    insertTypesEntry: true,
  }),],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ib-Image-optimizer",
      fileName: (format) => `ib-image-optimizer.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    target: "esnext",
    sourcemap: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
});
