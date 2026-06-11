/**
 * Meta-Abgleich (PLAN.md Phase 5):
 * Prüft alle gebauten Seiten (dist/) gegen die Frontmatter-Daten der
 * Content-Dateien (planning/content/pages/*.md):
 *   - <title> exakt wie Frontmatter `title`        → FEHLER bei Abweichung
 *   - <link rel="canonical"> exakt wie `canonical`  → FEHLER bei Abweichung
 *   - meta description vorhanden                    → FEHLER wenn fehlt;
 *     weicht sie vom (nicht-leeren) Frontmatter ab  → WARNUNG (bewusste Verbesserung dokumentieren)
 *   - genau EINE <h1>                               → FEHLER sonst
 *
 * Aufruf: npm run check:meta   (vorher: npm run build)
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pagesDir = join(root, 'planning/content/pages');
const dist = join(root, 'dist');

/** Mini-Frontmatter-Parser (key: "value" / key: value) */
function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  if (!m) return out;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1').trim();
  }
  return out;
}

const decode = (s) =>
  s
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");

let errors = 0;
let warnings = 0;

for (const file of readdirSync(pagesDir).sort()) {
  if (!file.endsWith('.md')) continue;
  const fm = frontmatter(readFileSync(join(pagesDir, file), 'utf8'));
  const slug = fm.slug === 'home' ? 'index' : fm.slug;
  const distFile = join(dist, `${slug}.html`);

  if (!existsSync(distFile)) {
    console.error(`✗ ${fm.slug}: dist/${slug}.html fehlt!`);
    errors++;
    continue;
  }

  const html = readFileSync(distFile, 'utf8');
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;

  const issues = [];

  if (title !== fm.title) issues.push(`FEHLER Title: "${title}" ≠ "${fm.title}"`);

  // Canonical der Startseite: Wix nutzt https://www.orderlyze.com (ohne Slash)
  const expectedCanonical = fm.canonical;
  if (canonical !== expectedCanonical)
    issues.push(`FEHLER Canonical: "${canonical}" ≠ "${expectedCanonical}"`);

  if (!description) {
    issues.push('FEHLER Meta-Description fehlt');
  } else if (fm.description && description !== fm.description) {
    issues.push(`WARNUNG Description weicht ab (bewusste Verbesserung?):\n      alt: "${fm.description}"\n      neu: "${description}"`);
  }

  if (h1Count !== 1) issues.push(`FEHLER H1-Anzahl: ${h1Count} (muss genau 1 sein)`);

  if (issues.length) {
    console.log(`\n${fm.slug} (dist/${slug}.html)`);
    for (const i of issues) {
      console.log(`  ${i.startsWith('WARNUNG') ? '⚠' : '✗'} ${i}`);
      if (i.startsWith('WARNUNG')) warnings++;
      else errors++;
    }
  }
}

console.log(`\n──────────────────────────────────────`);
console.log(`Meta-Abgleich: ${errors} Fehler, ${warnings} Warnungen`);
process.exit(errors > 0 ? 1 : 0);
