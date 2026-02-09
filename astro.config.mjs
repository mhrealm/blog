import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import path from 'path';

export default defineConfig({
  // 1. 必填：换成你自己的 GitHub Pages 域名
  site: 'https://your-username.github.io', 
  
  // 2. 删掉 output: 'server'。删掉后它默认就是 static 模式。

  integrations: [
    tailwind(), 
    sitemap({
      serialize(item) {
        item.lastmod = new Date();
        return item;
      },
    })
  ],

  vite: {
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    }
  },

  // 如果报错找不到这两个 .mjs 文件，先像这样注释掉这一块
  /*
  markdown: {
    remarkPlugins: [remarkModifiedTime, remarkReadingTime],
  },
  */
})