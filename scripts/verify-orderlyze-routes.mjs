import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const manifestPath = join(root, 'content-source/orderlyze.com/manifest.json');
const dist = join(root, 'dist');

if (!existsSync(manifestPath)) {
  throw new Error('Missing content-source/orderlyze.com/manifest.json.');
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const expected = manifest.included_urls.map((sourceUrl) => {
  const url = new URL(sourceUrl);
  const decoded = decodeURIComponent(url.pathname);
  return decoded === '/' ? 'index.html' : `${decoded.replace(/^\/|\/$/g, '')}/index.html`;
});

const forbidden = [
  'support',
  'erste-schritte',
  'drucker-verbinden',
  'thermorollen',
  'bestellen',
  'product-page',
];

const missing = [];
const badSeo = [];

for (const route of expected) {
  const file = join(dist, route);
  if (!existsSync(file)) {
    missing.push(route);
    continue;
  }

  const html = readFileSync(file, 'utf8');
  const h1Count = html.match(/<h1[\s>]/g)?.length ?? 0;
  const essentials = [
    '<meta name="description"',
    '<link rel="canonical"',
    '<meta property="og:title"',
    '<meta property="og:image"',
    'application/ld+json',
  ];
  const missingEssentials = essentials.filter((snippet) => !html.includes(snippet));
  if (h1Count !== 1 || missingEssentials.length > 0) {
    badSeo.push(`${route}: h1=${h1Count}, missing=${missingEssentials.join(', ')}`);
  }
}

const unexpected = forbidden.filter((route) => existsSync(join(dist, route)));

if (missing.length > 0 || badSeo.length > 0 || unexpected.length > 0) {
  if (missing.length > 0) console.error(`Missing routes:\n${missing.join('\n')}`);
  if (badSeo.length > 0) console.error(`Bad SEO routes:\n${badSeo.join('\n')}`);
  if (unexpected.length > 0) console.error(`Unexpected excluded routes:\n${unexpected.join('\n')}`);
  process.exit(1);
}

console.log(`Orderlyze route verification passed for ${expected.length} pages.`);
