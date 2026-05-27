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
  const title = page.data.title
    .replace(/^Orderlyze\s+[-|]\s+/i, '')
    .replace(/\s+[-|]\s+Orderlyze.*$/i, '')
    .trim();
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

const NAV_NOISE = new Set([
  'Kassensystem',
  'Branchen',
  'Preise',
  'Hilfe',
  'SHOP',
  'Shop',
  'KOSTENLOSES ANGEBOT',
  'Kostenloses Angebot',
  'top of page',
  'Angebot',
  'Angebot anfordern',
  'Angebot anforden',
  'Angebot anfordern.',
  'Mehr dazu',
  'Mehr erfahren',
  'jetzt bestellen',
  'Kostenlos und Unverbindlich.',
  'Kostenlos und unverbindlich.',
  '0800 400 4511',
  '100% finanzamtkonform',
  'So funktioniert\'s',
  'Funktionen',
  'Kartenzahlung',
  'Funkbonieren',
  'Verwaltung',
  'Cafe',
  'Bar',
  'Restaurant',
  'Friseursalon',
  'Friseur',
  'Beauty',
  'Sonstige Dienstleistungen',
  'Sonstige',
  'Erste Schritte',
  'Drucker verbinden',
  'Zahlungsarten',
  'Berichte & Exporte',
  'Tischplan gestalten',
  'Datenexport für Steuerberater',
  '+',
]);

const FOOTER_MARKERS = ['Hilfe und Support'];

function trimToContentEnd(lines: string[]): string[] {
  // First: hard footer markers
  for (let i = 0; i < lines.length; i += 1) {
    if (FOOTER_MARKERS.includes(lines[i])) {
      return lines.slice(0, i);
    }
  }
  // Then: detect the contiguous footer nav block (AGB + Impressum + Datenschutzerklärung clustered)
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i] === 'AGB' && lines.slice(i, i + 6).includes('Impressum') && lines.slice(i, i + 8).some((l) => l.startsWith('Datenschutz'))) {
      return lines.slice(0, i);
    }
  }
  return lines;
}

const NAV_NOISE_LOWER = new Set([...NAV_NOISE].map((line) => line.toLowerCase()));

function isNavNoise(line: string) {
  return NAV_NOISE_LOWER.has(line.toLowerCase());
}

export function contentBlocks(page: OrderlyzePage) {
  const cleaned = bodyLines(page)
    .map((line) => line.replace(/^#+\s*/, '').trim())
    .filter((line) => line.length > 0);
  return trimToContentEnd(cleaned)
    .filter((line) => !isNavNoise(line))
    .filter((line) => !/^\d{1,2}$/.test(line))
    .filter((line) => line !== '+');
}

export type ContentSection = { heading: string; paragraphs: string[] };

const HEADING_MAX_LEN = 80;
const HEADING_MIN_LEN = 6;

function looksLikeHeading(line: string) {
  if (line.length > HEADING_MAX_LEN) return false;
  if (line.length < HEADING_MIN_LEN) return false;
  if (/[.!?:]$/.test(line)) return false;
  if (/^\d+(?:[,.]\d+)?\s*€/.test(line)) return false;
  return true;
}

const HEADING_CONTINUATIONS = new Set([
  'für', 'und', 'mit', 'oder', 'der', 'die', 'das', 'des', 'dem', 'den',
  'ein', 'eine', 'einer', 'einem', 'einen', 'eines',
  'zu', 'von', 'vom', 'im', 'in', 'an', 'auf', 'bei',
  'als', 'wie', 'um', 'so', 'noch', 'nur', 'aus', 'nach',
  'mein', 'meine', 'dein', 'deine',
]);

function endsWithConnector(line: string): boolean {
  const lastWord = line.trim().split(/\s+/).pop()?.toLowerCase() ?? '';
  return HEADING_CONTINUATIONS.has(lastWord);
}

export function contentSections(page: OrderlyzePage): ContentSection[] {
  const lines = contentBlocks(page);
  const merged: string[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const prev = merged[merged.length - 1];
    if (
      prev !== undefined &&
      looksLikeHeading(prev) &&
      looksLikeHeading(line) &&
      prev.length < 40 &&
      line.length < 40 &&
      endsWithConnector(prev)
    ) {
      merged[merged.length - 1] = `${prev} ${line}`;
    } else {
      merged.push(line);
    }
  }

  const sections: ContentSection[] = [];
  let current: ContentSection | null = null;

  for (const line of merged) {
    if (looksLikeHeading(line)) {
      if (current && (current.paragraphs.length > 0 || current.heading.length > 0)) {
        sections.push(current);
      }
      current = { heading: line, paragraphs: [] };
    } else if (current) {
      current.paragraphs.push(line);
    } else {
      current = { heading: '', paragraphs: [line] };
    }
  }

  if (current) sections.push(current);

  return sections.filter((section) => section.heading.length > 0 || section.paragraphs.length > 0);
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
