/// <reference types="vitest" />
/// <reference types="vite/client" />

declare module "*.{svg,png,jpg,jpeg,gif,webp}" {
  const value: string;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_TEST_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
