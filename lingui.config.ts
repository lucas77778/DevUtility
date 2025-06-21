import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en-US",
  locales: ["en-US", "zh-CN"],
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
