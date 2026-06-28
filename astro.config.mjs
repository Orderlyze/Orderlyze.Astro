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
      // Aus der Sitemap ausgeschlossen (alle bewusst noindex):
      // - /dank & /dank-angebot sind Danke-/Conversion-Seiten (Plausible-Goals),
      //   kein SEO-Wert.
      // - /angebot-de|-gastro|-google sind Werbe-Landingpages (Google Ads etc.),
      //   kein SEO-Ziel.
      filter: (page) => !['/dank', '/dank-angebot', '/angebot-de', '/angebot-gastro', '/angebot-google']
        .includes(new URL(page).pathname),
    }),
  ],
  image: {
    // Bilder kommen lokal aus src/assets (planning/assets/wix-media)
    domains: [],
  },
});
