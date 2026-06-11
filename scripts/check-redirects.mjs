/**
 * Redirect-Tests (PLAN.md Phase 6):
 *   1. Jede Quelle aus redirects.config.mjs hat im Build eine Meta-Refresh-Seite
 *      mit korrektem Ziel (Fallback für Hosts ohne _redirects-Support).
 *   2. KEINE Redirect-Ketten: jedes interne Ziel ist eine echte Seite (kein
 *      erneuter Redirect) und liefert eine eigene HTML-Datei.
 *   3. Alle 35 Content-URLs existieren als Seiten im Build.
 *
 * Aufruf: npm run check:redirects   (vorher: npm run build)
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { redirects } from '../redirects.config.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

let errors = 0;
const sources = new Set(Object.keys(redirects));

/* 1+2: Redirect-Quellen prüfen */
for (const [from, to] of Object.entries(redirects)) {
  const file = join(dist, `${decodeURIComponent(from)}.html`);
  if (!existsSync(file)) {
    console.error(`✗ Redirect-Quelle ohne Fallback-Seite: ${from}`);
    errors++;
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const target = html.match(/url=([^">]+)"/)?.[1];
  const expected = to.startsWith('http') ? to : `https://www.orderlyze.com${to}`;
  if (target !== expected && target !== to) {
    console.error(`✗ ${from}: Meta-Refresh zeigt auf "${target}" statt "${to}"`);
    errors++;
  }
  if (!to.startsWith('http')) {
    if (sources.has(to)) {
      console.error(`✗ Redirect-KETTE: ${from} → ${to} (selbst Redirect-Quelle!)`);
      errors++;
    }
    if (!existsSync(join(dist, `${to.slice(1)}.html`))) {
      console.error(`✗ ${from}: Ziel ${to} existiert nicht im Build`);
      errors++;
    }
  }
}
console.log(`✓ ${Object.keys(redirects).length} Redirects geprüft`);

/* 3: alle 35 Content-URLs vorhanden */
const pagesDir = join(root, 'planning/content/pages');
let pageCount = 0;
for (const file of readdirSync(pagesDir).sort()) {
  if (!file.endsWith('.md')) continue;
  const slug = file.replace(/\.md$/, '');
  const distFile = slug === 'home' ? 'index.html' : `${slug}.html`;
  pageCount++;
  if (!existsSync(join(dist, distFile))) {
    console.error(`✗ Seite fehlt im Build: /${slug === 'home' ? '' : slug} (${distFile})`);
    errors++;
  }
}
console.log(`✓ ${pageCount} Content-Seiten geprüft`);

console.log(`──────────────────────────────────────`);
console.log(errors ? `✗ ${errors} Fehler` : '✓ Alle Redirect- und Routen-Checks bestanden');
process.exit(errors > 0 ? 1 : 0);
