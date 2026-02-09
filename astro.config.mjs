import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import path from "path";

export default defineConfig({
  // 替换成你自己的 GitHub 地址
  site: "https://mhrealm.github.io",
  base: process.env.NODE_ENV === "production" ? "/blog" : "/",
  // 显式指定为静态模式，防止它乱跑
  output: "static",
  integrations: [tailwind(), sitemap(), mdx()],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("src"),
      },
    },
  },
});
