import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      cache: false,
      setupFiles: "./src/setupTests.ts",
      includeSource: ["src/**/*.{js,ts,vue}"],
    },
  })
);
