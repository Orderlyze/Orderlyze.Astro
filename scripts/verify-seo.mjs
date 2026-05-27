import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const indexPath = join(dist, 'index.html');
const sitemapPath = join(dist, 'sitemap-index.xml');

const requiredSnippets = [
  '<meta name="description"',
  '<link rel="canonical"',
  '<meta property="og:title"',
  '<meta name="twitter:card"',
  'application/ld+json',
  'Orderlyze',
];

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html is missing. Run npm run build before verify:seo.');
}

if (!existsSync(sitemapPath)) {
  throw new Error('dist/sitemap-index.xml is missing. Sitemap generation failed.');
}

const html = readFileSync(indexPath, 'utf8');
const missing = requiredSnippets.filter((snippet) => !html.includes(snippet));

if (missing.length > 0) {
  throw new Error(`SEO verification failed. Missing: ${missing.join(', ')}`);
}

const jsonLdCount = html.match(/application\/ld\+json/g)?.length ?? 0;
if (jsonLdCount < 3) {
  throw new Error(`Expected at least 3 JSON-LD blocks, found ${jsonLdCount}.`);
}

console.log('SEO verification passed.');
