import { chromium } from 'playwright';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const ORIGIN = 'https://www.orderlyze.com';
const OUT_DIR = join(process.cwd(), 'content-source', 'orderlyze.com');
const SITEMAPS = [
  `${ORIGIN}/pages-sitemap.xml`,
  `${ORIGIN}/store-products-sitemap.xml`,
];

const manualSupportSeeds = new Set([
  `${ORIGIN}/support`,
  `${ORIGIN}/erste-schritte`,
  `${ORIGIN}/uebermittlung-finanzamt`,
  `${ORIGIN}/kassenbuch`,
  `${ORIGIN}/drucker-verbinden`,
  `${ORIGIN}/kopie-von-drucker-verbinden`,
  `${ORIGIN}/zahlungsarten`,
  `${ORIGIN}/berichte`,
  `${ORIGIN}/umsaetze`,
  `${ORIGIN}/gutscheine`,
  `${ORIGIN}/stammkunden`,
  `${ORIGIN}/tischplan`,
  `${ORIGIN}/dynamisches-produkt`,
  `${ORIGIN}/buchungskonten`,
  `${ORIGIN}/rechnungen-bearbeiten`,
  `${ORIGIN}/gaengesystem`,
  `${ORIGIN}/bewirtungsbeleg`,
  `${ORIGIN}/farbeinstellungen`,
  `${ORIGIN}/abholung`,
  `${ORIGIN}/pfand`,
  `${ORIGIN}/steuer-aendern`,
  `${ORIGIN}/cloud-drucker`,
  `${ORIGIN}/bluetooth-drucker`,
  `${ORIGIN}/sunmi-drucker`,
]);

const supportPathAllowlist = new Set(
  [...manualSupportSeeds].map((url) => new URL(url).pathname),
);

const legalOrUtilityPaths = new Set([
  '/agb',
  '/datenschutzerklaerung',
  '/impressum',
]);

const shopPaths = new Set([
  '/bestellen',
  '/thermorollen',
]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizeUrl(input) {
  try {
    const url = new URL(input, ORIGIN);
    url.hash = '';
    url.search = '';
    if (url.origin !== ORIGIN) return null;
    return url.toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}

function slugFor(url) {
  const parsed = new URL(url);
  const path = decodeURIComponent(parsed.pathname)
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-zA-Z0-9äöüÄÖÜß]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  return path || 'home';
}

function mdEscape(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function cleanText(text) {
  const ignoredLines = new Set([
    'Cookie Zustimmung',
    'Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern. Wir gehen davon aus, dass Sie damit einverstanden sind. Sie können dies jedoch ablehnen, wenn Sie möchten.',
    'Einstellungen',
    'Ablehnen',
    'Alle akzeptieren',
  ]);

  const lines = text
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .filter(Boolean)
    .filter((line) => !ignoredLines.has(line));

  const compacted = [];
  for (const line of lines) {
    const previous = compacted.at(-1);
    if (line === previous) continue;
    compacted.push(line);
  }

  return compacted.join('\n\n');
}

function markdownFor({ url, title, description, text }) {
  return `---\nsource_url: "${mdEscape(url)}"\ntitle: "${mdEscape(title)}"\ndescription: "${mdEscape(description)}"\nscraped_at: "2026-05-27"\n---\n\n# ${title || slugFor(url)}\n\n${text}\n`;
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
}

async function sitemapUrls() {
  const urls = new Set();
  for (const sitemap of SITEMAPS) {
    const xml = await fetchText(sitemap);
    for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
      const normalized = normalizeUrl(match[1]);
      if (normalized) urls.add(normalized);
    }
  }
  return urls;
}

async function pageLinks(page, url) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  return page.evaluate(() =>
    [...document.querySelectorAll('a[href]')]
      .map((anchor) => anchor.href)
      .filter(Boolean),
  );
}

async function supportUrlSet(browser, allUrls) {
  const support = new Set([...manualSupportSeeds].map((url) => normalizeUrl(url)).filter(Boolean));
  const page = await browser.newPage();

  const queue = [...support];
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;

    let links = [];
    try {
      links = await pageLinks(page, current);
    } catch (error) {
      console.warn(`WARN support crawl failed: ${current} - ${error.message}`);
      continue;
    }

    for (const href of links) {
      const normalized = normalizeUrl(href);
      if (!normalized) continue;
      const path = new URL(normalized).pathname;
      if (legalOrUtilityPaths.has(path)) continue;

      const isKnownSupportPath = supportPathAllowlist.has(path);
      if (isKnownSupportPath && !support.has(normalized)) {
        support.add(normalized);
        if (allUrls.has(normalized)) queue.push(normalized);
      }
    }
  }

  await page.close();
  return support;
}

async function scrapePage(browser, url) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(250);

  const data = await page.evaluate(() => {
    const title =
      document.title?.trim() ||
      document.querySelector('h1')?.textContent?.trim() ||
      location.pathname;
    const description =
      document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ||
      '';
    const text = document.body?.innerText || '';
    return { title, description, text };
  });

  await page.close();
  return {
    url,
    title: data.title,
    description: data.description,
    text: cleanText(data.text),
  };
}

async function main() {
  const allUrls = await sitemapUrls();
  const browser = await chromium.launch({ headless: true });

  const supportUrls = await supportUrlSet(browser, allUrls);
  const urlsToScrape = [...allUrls]
    .filter((url) => !supportUrls.has(url))
    .filter((url) => !new URL(url).pathname.startsWith('/support'))
    .filter((url) => !new URL(url).pathname.startsWith('/product-page/'))
    .filter((url) => !shopPaths.has(new URL(url).pathname))
    .sort((a, b) => slugFor(a).localeCompare(slugFor(b), 'de'));

  if (existsSync(OUT_DIR)) {
    await rm(OUT_DIR, { recursive: true, force: true });
  }
  await mkdir(OUT_DIR, { recursive: true });

  const manifest = {
    source: ORIGIN,
    scraped_at: '2026-05-27',
    excluded_support_urls: [...supportUrls].sort(),
    included_urls: urlsToScrape,
    files: [],
  };

  for (const url of urlsToScrape) {
    try {
      const scraped = await scrapePage(browser, url);
      const file = `${slugFor(url)}.md`;
      await writeFile(join(OUT_DIR, file), markdownFor(scraped), 'utf8');
      manifest.files.push({ url, file, title: scraped.title });
      console.log(`SCRAPED ${url} -> ${file}`);
    } catch (error) {
      console.warn(`WARN scrape failed: ${url} - ${error.message}`);
      manifest.files.push({ url, error: error.message });
    }
  }

  await browser.close();
  await writeFile(join(OUT_DIR, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const failed = manifest.files.filter((entry) => entry.error);
  console.log(`Included pages: ${urlsToScrape.length}`);
  console.log(`Excluded support pages: ${supportUrls.size}`);
  console.log(`Failed pages: ${failed.length}`);
  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
