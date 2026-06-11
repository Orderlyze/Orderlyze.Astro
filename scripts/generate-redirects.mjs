/**
 * Erzeugt Hosting-Redirect-Dateien aus redirects.config.mjs (Quelle der Wahrheit):
 *   - public/_redirects  → Netlify / Cloudflare Pages (301)
 *   - vercel.json        → Vercel (permanent: true)
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

console.log(`✓ ${lines.length} Redirects → public/_redirects + vercel.json`);
