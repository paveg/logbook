// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://logbook.paveg.dev',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        {
          url: 'https://logbook.paveg.dev/',
          changefreq: 'daily',
          priority: 1.0,
        },
        {
          url: 'https://logbook.paveg.dev/blog/',
          changefreq: 'daily',
          priority: 0.9,
        },
      ],
    }),
  ],
});
