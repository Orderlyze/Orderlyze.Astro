import type { CollectionEntry } from 'astro:content';

export type OrderlyzePage = CollectionEntry<'orderlyzePages'>;

const SOURCE_ORIGIN = 'https://www.orderlyze.com';

const keywordMap: Record<string, string> = {
  home: 'Orderlyze Kassensystem',
  kassensystem: 'Kassensystem',
  registrierkasse: 'Registrierkasse',
  kassensoftware: 'Kassensoftware',
  funktionen: 'Kassensystem Funktionen',
  kartenzahlung: 'Kassensystem Kartenzahlung',
  funkbonieren: 'Funkbonieren Kassensystem',
  verwaltung: 'Kassensystem Verwaltung',
  'datenexport-steuerberater': 'Kassensystem Datenexport Steuerberater',
  gastronomie: 'Kassensystem Gastronomie',
  restaurant: 'Kassensystem Restaurant',
  cafe: 'Kassensystem Cafe',
  bar: 'Kassensystem Bar',
  friseur: 'Kassensystem Friseur',
  beauty: 'Kassensystem Beauty',
  preise: 'Kassensystem Preise',
};

const commerceIds = new Set([
  'angebot',
  'angebot-de',
  'angebot-gastro',
  'angebot-google',
  'preise',
  'bestellen',
  'testen',
]);

const legalIds = new Set(['agb', 'datenschutzerklaerung', 'impressum']);

export function routePathFromUrl(sourceUrl: string) {
  const url = new URL(sourceUrl);
  if (url.origin !== SOURCE_ORIGIN) {
    return '/';
  }
  return url.pathname === '/' ? '/' : `${decodeURIComponent(url.pathname).replace(/\/$/, '')}/`;
}

export function canonicalFromPage(page: OrderlyzePage) {
  return routePathFromUrl(page.data.source_url);
}

export function slugParamFromPage(page: OrderlyzePage) {
  return canonicalFromPage(page).replace(/^\/|\/$/g, '');
}

export function pageKeyword(page: OrderlyzePage) {
  return keywordMap[page.id] ?? page.data.title.replace(/\s+-\s+Orderlyze.*$/i, '');
}

export function funnelStage(page: OrderlyzePage) {
  if (legalIds.has(page.id)) return 'trust';
  if (commerceIds.has(page.id) || page.id.startsWith('product-page-')) return 'conversion';
  if (page.id.includes('restaurant') || page.id.includes('gastro') || page.id.includes('cafe') || page.id.includes('bar') || page.id.includes('beauty') || page.id.includes('friseur')) {
    return 'consideration';
  }
  return 'awareness';
}

export function pageDescription(page: OrderlyzePage) {
  const description = page.data.description?.trim();
  if (description) return description;

  const paragraph = (page.body ?? '')
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 80 && !line.startsWith('#'));

  return paragraph?.slice(0, 160) ?? 'Orderlyze Kassensystem: einfach, schnell, effizient und finanzamtkonform.';
}

export function pageTitle(page: OrderlyzePage) {
  if (page.id === 'home') return page.data.title;
  const title = page.data.title.replace(/\s+[-|]\s+Orderlyze.*$/i, '').trim();
  return title.includes('Orderlyze') ? title : `${title} | Orderlyze`;
}

export function bodyLines(page: OrderlyzePage) {
  const normalizedTitle = page.data.title.trim().toLowerCase();
  return (page.body ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => {
      if (!line.startsWith('# ')) return true;
      return line.replace(/^#\s+/, '').trim().toLowerCase() !== normalizedTitle;
    });
}

export function contentBlocks(page: OrderlyzePage) {
  const navigationNoise = new Set([
    'Kassensystem',
    'Branchen',
    'Preise',
    'Hilfe',
    'SHOP',
    'KOSTENLOSES ANGEBOT',
    'top of page',
  ]);

  return bodyLines(page)
    .map((line) => line.replace(/^#+\s*/, '').trim())
    .filter((line) => line.length > 0)
    .filter((line) => !navigationNoise.has(line));
}

export function pageSchema(page: OrderlyzePage, siteUrl: string) {
  const canonical = new URL(canonicalFromPage(page), siteUrl).toString();
  const keyword = pageKeyword(page);
  const type = page.id.startsWith('product-page-') ? 'Product' : 'WebPage';

  const schema: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': type,
      name: pageTitle(page),
      description: pageDescription(page),
      url: canonical,
      inLanguage: 'de-DE',
      about: keyword,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Orderlyze',
        url: siteUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Startseite',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: pageTitle(page),
          item: canonical,
        },
      ],
    },
  ];

  return schema;
}
