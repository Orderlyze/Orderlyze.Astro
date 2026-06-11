/**
 * Zentrale Site-Konfiguration — alle pflegbaren Konstanten an einem Ort.
 * SEO-Tool-Anforderungen: siehe planning/seo-tools.md
 */

export const SITE = {
  name: 'Orderlyze',
  url: 'https://www.orderlyze.com',
  phone: '0800 400 4511',
  phoneHref: 'tel:08004004511',
  email: 'office@orderlyze.com',
  helpUrl: 'https://hilfe.orderlyze.com',
} as const;

/** Plausible Analytics (cookielos, kein Consent-Banner nötig) */
export const PLAUSIBLE = {
  domain: 'orderlyze.com',
  /* tagged-events + outbound-links: CTA-/Tel-Klicks als Goals trackbar */
  src: 'https://plausible.io/js/script.tagged-events.outbound-links.js',
} as const;

/**
 * Site-Verifizierung (planning/seo-tools.md).
 * Werte eintragen, sobald vorhanden — leere Strings rendern keinen Tag.
 */
export const VERIFICATION = {
  /** Ahrefs Webmaster Tools: <meta name="ahrefs-site-verification" …> */
  ahrefs: '',
  /** Bing Webmaster Tools: <meta name="msvalidate.01" …> */
  bing: '',
  /** Google Search Console (optional, Entscheidung offen): <meta name="google-site-verification" …> */
  google: '',
} as const;

/** Plausible-Event-Namen (in Plausible als Goals anlegen) */
export const EVENTS = {
  ctaAngebot: 'CTA Angebot',
  ctaPhone: 'Anruf',
  angebotSubmit: 'Angebot abgeschickt',
} as const;
