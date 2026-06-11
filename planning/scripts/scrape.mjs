// Scrapes all orderlyze.com pages from the downloaded sitemaps into markdown files.
// Usage: node planning/scripts/scrape.mjs            -> alle Seiten aus den Sitemaps + EXTRA_PAGE_URLS
//        node planning/scripts/scrape.mjs <url ...>  -> nur die angegebenen URLs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outPages = join(root, 'content', 'pages');
// Shop wird nicht übernommen (Entscheidung 2026-06-11) — Produktseiten landen im Archivordner
const outProducts = join(root, 'content', 'shop-excluded');
mkdirSync(outPages, { recursive: true });

function urlsFromSitemap(file) {
  const xml = readFileSync(join(root, 'sitemaps', file), 'utf8');
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
}

// Seiten, die live existieren, aber nicht in der Wix-Sitemap stehen (siehe sitemaps/additional-pages.xml)
const EXTRA_PAGE_URLS = ['https://www.orderlyze.com/dank-angebot'];

const pageUrls = [...urlsFromSitemap('pages-sitemap.xml'), ...EXTRA_PAGE_URLS];
const productUrls = urlsFromSitemap('store-products-sitemap.xml').filter(u => u.includes('/product-page/'));

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', auml: 'ä', ouml: 'ö', uuml: 'ü', Auml: 'Ä', Ouml: 'Ö', Uuml: 'Ü', szlig: 'ß', euro: '€', copy: '©', reg: '®', trade: '™', hellip: '…', mdash: '—', ndash: '–', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', bdquo: '„' };
function decode(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-zA-Z]+);/g, (_, n) => ENTITIES[n] ?? `&${n};`);
}

function meta(html, name, attr = 'name') {
  const re = new RegExp(`<meta[^>]*${attr}=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i');
  const re2 = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${name}["']`, 'i');
  return decode((html.match(re) || html.match(re2))?.[1] ?? '');
}

function htmlToMd(bodyHtml) {
  let h = bodyHtml
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|noscript|svg|iframe)[\s\S]*?<\/\1>/gi, '')
    // drop invisible/aria-only helpers
    .replace(/<[^>]+aria-hidden=["']true["'][^>]*>([\s\S]*?)<\/(?:span|div)>/gi, '');

  // collect links before stripping tags
  const links = [];
  for (const m of h.matchAll(/<a\b[^>]*href=["']([^"'#][^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = decode(m[2].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
    if (text) links.push({ href: m[1], text });
  }

  h = h
    .replace(/<h([1-6])[^>]*>/gi, (_, n) => `\n\n${'#'.repeat(+n)} `)
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<\/(p|li|div|section|article|header|footer|tr|ul|ol|button|figcaption)>/gi, '\n')
    .replace(/<(p|div|section|article|header|footer|tr|ul|ol|button|figcaption|blockquote)[^>]*>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '');

  let text = decode(h)
    .split('\n')
    .map(l => l.replace(/\s+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // dedupe identical consecutive lines (Wix renders some text twice for responsive variants)
  const out = [];
  for (const line of text.split('\n')) {
    if (line && out.length && out[out.length - 1] === line) continue;
    out.push(line);
  }
  return { md: out.join('\n'), links };
}

async function scrape(url, outDir) {
  const slug = (new URL(url).pathname.replace(/^\/(product-page\/)?/, '') || 'home').replace(/[^\p{L}\p{N}-]+/gu, '-');
  // Aussortierte Support-/Shop-Seiten nicht wieder in content/pages anlegen
  for (const excluded of ['support-excluded', 'shop-excluded']) {
    if (outDir !== join(root, 'content', excluded) && existsSync(join(root, 'content', excluded, `${slug}.md`))) {
      console.log(`SKIP ${slug} (${excluded})`);
      return;
    }
  }
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36' } });
  if (!res.ok) { console.error(`FAIL ${res.status} ${url}`); return; }
  const html = await res.text();

  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim();
  const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)?.[1] ?? '';
  const bodyHtml = html.match(/<body[\s\S]*<\/body>/i)?.[0] ?? html;
  const { md, links } = htmlToMd(bodyHtml);

  const internal = [], external = [];
  const seen = new Set();
  for (const l of links) {
    const abs = new URL(l.href, url).href;
    const key = `${abs}|${l.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    (abs.includes('orderlyze.com') ? internal : external).push(`- [${l.text}](${abs})`);
  }

  const fm = [
    '---',
    `url: ${url}`,
    `slug: ${slug}`,
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(meta(html, 'description'))}`,
    `og_title: ${JSON.stringify(meta(html, 'og:title', 'property'))}`,
    `og_description: ${JSON.stringify(meta(html, 'og:description', 'property'))}`,
    `og_image: ${JSON.stringify(meta(html, 'og:image', 'property'))}`,
    `canonical: ${canonical}`,
    `robots: ${JSON.stringify(meta(html, 'robots'))}`,
    `scraped_at: 2026-06-11`,
    '---',
  ].join('\n');

  const doc = `${fm}\n\n# Seiteninhalt\n\n${md}\n\n## Interne Links\n\n${internal.join('\n') || '_keine_'}\n\n## Externe Links\n\n${external.join('\n') || '_keine_'}\n`;
  writeFileSync(join(outDir, `${slug}.md`), doc, 'utf8');
  console.log(`OK ${slug} (${md.length} chars, ${internal.length} int / ${external.length} ext links)`);
}

const cliUrls = process.argv.slice(2);
const jobs = cliUrls.length
  ? cliUrls.map(u => ({ u, dir: u.includes('/product-page/') ? outProducts : outPages }))
  : [
      ...pageUrls.map(u => ({ u, dir: outPages })),
      ...productUrls.map(u => ({ u, dir: outProducts })),
    ];
const CONCURRENCY = 5;
let i = 0;
async function worker() {
  while (i < jobs.length) {
    const job = jobs[i++];
    try { await scrape(job.u, job.dir); } catch (e) { console.error(`ERROR ${job.u}: ${e.message}`); }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
console.log('DONE');
