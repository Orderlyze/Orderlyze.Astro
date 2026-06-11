// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { redirects } from './redirects.config.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.orderlyze.com',
  // Die alte Wix-Seite nutzt URLs ohne Trailing-Slash (siehe Canonicals in
  // planning/content/pages/*) — exakt beibehalten, kein Slash-Wechsel.
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  // Meta-Refresh-Fallback für den statischen Build; die echten 301s kommen
  // beim Deploy aus der generierten Hosting-Redirect-Datei (Phase 5).
  redirects,
  integrations: [
    sitemap({
      // /dank-angebot war auch auf der alten Seite nicht in der Sitemap
      // (planning/sitemaps/additional-pages.xml); /dank dagegen schon.
      filter: (page) => new URL(page).pathname !== '/dank-angebot',
    }),
  ],
  image: {
    // Bilder kommen lokal aus src/assets (planning/assets/wix-media)
    domains: [],
  },
});
