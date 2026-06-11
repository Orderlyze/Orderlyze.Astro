/**
 * IndexNow-Ping (planning/seo-tools.md, Bing Webmaster Tools):
 * Meldet die URLs der Sitemap nach dem Deploy an IndexNow (Bing & Partner).
 *
 * Voraussetzungen (beim Hosting-Setup erledigen, siehe Abschlussbericht):
 *   1. Key generieren (32+ Hex-Zeichen) und als public/<key>.txt mit dem Key
 *      als Inhalt ablegen (wird mit deployed).
 *   2. Diesen Ping NACH dem Deploy in der CI ausführen:
 *      INDEXNOW_KEY=<key> node scripts/indexnow-ping.mjs
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.error('INDEXNOW_KEY fehlt — Abbruch. (Key-Datei public/<key>.txt nicht vergessen!)');
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sitemap = readFileSync(join(root, 'dist/sitemap-0.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'www.orderlyze.com',
    key,
    keyLocation: `https://www.orderlyze.com/${key}.txt`,
    urlList: urls,
  }),
});

console.log(`IndexNow: ${res.status} ${res.statusText} — ${urls.length} URLs gemeldet`);
process.exit(res.ok ? 0 : 1);
