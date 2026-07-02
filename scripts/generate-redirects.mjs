/**
 * Erzeugt Hosting-Redirect-Dateien aus redirects.config.mjs (Quelle der Wahrheit):
 *   - public/_redirects                 → Netlify / Cloudflare Pages (301)
 *   - vercel.json                       → Vercel (permanent: true)
 *   - public/staticwebapp.config.json   → Azure Static Web Apps (301 + 404-Seite)
 *
 * Das Deploy-Ziel ist eine OFFENE ENTSCHEIDUNG — beide Formate liegen bereit,
 * das jeweils ungenutzte ist auf anderen Hosts wirkungslos.
 * Läuft automatisch vor jedem Build (npm run build).
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { redirects } from '../redirects.config.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* Netlify/Cloudflare: "<from> <to> 301" */
const lines = Object.entries(redirects).map(([from, to]) => `${from} ${to} 301`);
writeFileSync(
  join(root, 'public/_redirects'),
  `# 301-Redirects Wix→Astro-Relaunch — generiert aus redirects.config.mjs, NICHT von Hand editieren\n${lines.join('\n')}\n`
);

/* Vercel */
const vercel = {
  redirects: Object.entries(redirects).map(([source, destination]) => ({
    source,
    destination,
    permanent: true,
  })),
};
writeFileSync(join(root, 'vercel.json'), JSON.stringify(vercel, null, 2) + '\n');

/* Azure Static Web Apps: routes mit 301 + 404-Override (landet via public/ im Build) */
const swa = {
  routes: [
    ...Object.entries(redirects).map(([route, redirect]) => ({
      route,
      redirect,
      statusCode: 301,
    })),
    // Astro-Assets tragen einen Content-Hash im Dateinamen → dauerhaft cachen
    // (SWA-Default wäre nur max-age=30).
    {
      route: '/_astro/*',
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
  ],
  responseOverrides: {
    404: { rewrite: '/404.html' },
  },
};
writeFileSync(join(root, 'public/staticwebapp.config.json'), JSON.stringify(swa, null, 2) + '\n');

console.log(`✓ ${lines.length} Redirects → public/_redirects + vercel.json + public/staticwebapp.config.json`);
