import { defineConfig, passthroughImageService, fontProviders } from 'astro/config'
import tailwind from '@astrojs/tailwind';
import path from 'path'
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { remarkModifiedTime } from './remark-modified-time.mjs';
import { remarkReadingTime } from './remark-reading-time.mjs';

// Sitemap: https://erpanomer.nurverse.com/projects/leetcode/sitemap.xml
// Sitemap: https://erpanomer.nurverse.com/projects/learning/sitemap.xml

export default defineConfig({
  site: 'https://mh0904.github.io',
  base: '/',
  output: 'static',  // 静态输出  GitHub Pages 不支持 SSR

  // Use 'compile' service to optimize static images at build time
  // This works even in SSR mode for assets known at build time
  // adapter: cloudflare({
  //   imageService: 'passthrough',
  // }),

  image: {
    service: passthroughImageService()
  },

  integrations: [tailwind(), sitemap({
    customSitemaps: ['https://erpanomer.nurverse.com/projects/leetcode/sitemap.xml', 'https://erpanomer.nurverse.com/projects/learning/sitemap.xml', 'https://erpanomer.nurverse.com/sitemap-blog.xml'],
    serialize(item) {
      item.lastmod = new Date();
      return item;
    },
  })],

  vite: {
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    }
  },

  build: {
  },

  server: {
    open: true // 启动开发服务器时自动打开浏览器
  },
  // markdown: {
  //   remarkPlugins: [remarkModifiedTime, remarkReadingTime],
  //   shikiConfig: {
  //   }
  // },
})
