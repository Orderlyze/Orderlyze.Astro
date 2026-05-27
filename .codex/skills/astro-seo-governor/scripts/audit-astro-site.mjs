import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');
const exists = (path) => existsSync(join(root, path));

const checks = [];
const pass = (name, detail = '') => checks.push({ name, detail, ok: true });
const fail = (name, detail = '') => checks.push({ name, detail, ok: false });

function includesAll(text, snippets) {
  return snippets.every((snippet) => text.includes(snippet));
}

if (!exists('package.json')) {
  fail('package.json exists');
} else {
  const pkg = JSON.parse(read('package.json'));
  if (pkg.dependencies?.astro) pass('Astro dependency exists', pkg.dependencies.astro);
  else fail('Astro dependency exists');

  if (pkg.dependencies?.['@astrojs/sitemap']) pass('Sitemap dependency exists', pkg.dependencies['@astrojs/sitemap']);
  else fail('Sitemap dependency exists');

  if (pkg.scripts?.verify) pass('verify script exists', pkg.scripts.verify);
  else fail('verify script exists');
}

if (!exists('astro.config.mjs')) {
  fail('astro.config.mjs exists');
} else {
  const config = read('astro.config.mjs');
  const hasProductionSite =
    config.includes('site: process.env.SITE_URL') ||
    /site:\s*['"`]https:\/\//.test(config);
  if (hasProductionSite && !/site:\s*['"`]http:\/\/localhost/.test(config)) {
    pass('Astro site config is production-capable');
  } else {
    fail('Astro site config is production-capable');
  }

  if (config.includes('sitemap(')) pass('Sitemap integration configured');
  else fail('Sitemap integration configured');
}

if (!exists('src/components/Seo.astro')) {
  fail('Shared Seo.astro exists');
} else {
  const seo = read('src/components/Seo.astro');
  const snippets = [
    '<title>',
    'name="description"',
    'rel="canonical"',
    'property="og:title"',
    'name="twitter:card"',
    'application/ld+json',
  ];
  if (includesAll(seo, snippets)) pass('Shared SEO component covers core tags');
  else fail('Shared SEO component covers core tags', snippets.filter((snippet) => !seo.includes(snippet)).join(', '));
}

if (!exists('src/content.config.ts')) {
  fail('Content config exists');
} else {
  const contentConfig = read('src/content.config.ts');
  if (includesAll(contentConfig, ['defineCollection', 'glob(', 'z.object'])) pass('Content collections use loader and schema');
  else fail('Content collections use loader and schema');
}

if (!exists('public/robots.txt')) {
  fail('robots.txt exists');
} else {
  const robots = read('public/robots.txt');
  if (/Sitemap:\s*https?:\/\//.test(robots)) pass('robots.txt references absolute sitemap URL');
  else fail('robots.txt references absolute sitemap URL');
}

if (exists('dist/index.html')) {
  const html = read('dist/index.html');
  const renderedSnippets = [
    '<meta name="description"',
    '<link rel="canonical"',
    '<meta property="og:image"',
    'application/ld+json',
  ];
  if (includesAll(html, renderedSnippets)) pass('Rendered home page includes SEO essentials');
  else fail('Rendered home page includes SEO essentials', renderedSnippets.filter((snippet) => !html.includes(snippet)).join(', '));

  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count === 1) pass('Rendered home page has exactly one H1');
  else fail('Rendered home page has exactly one H1', `found ${h1Count}`);

  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  const missingAlt = images.filter((tag) => !/\salt=/.test(tag));
  if (missingAlt.length === 0) pass('Rendered images include alt attributes', `${images.length} image(s)`);
  else fail('Rendered images include alt attributes', `${missingAlt.length} missing alt`);
} else {
  fail('Rendered dist/index.html exists', 'run npm run build first');
}

if (exists('dist/sitemap-index.xml')) pass('Generated sitemap index exists');
else fail('Generated sitemap index exists', 'run npm run build first');

const failed = checks.filter((check) => !check.ok);
for (const check of checks) {
  const status = check.ok ? 'PASS' : 'FAIL';
  console.log(`${status} ${check.name}${check.detail ? ` - ${check.detail}` : ''}`);
}

if (failed.length > 0) {
  process.exitCode = 1;
}
