/**
 * 301-Redirect-Map für den Relaunch orderlyze.com (Wix → Astro).
 *
 * EINZIGE QUELLE DER WAHRHEIT für alle Redirects:
 *  - astro.config.mjs liest sie (Meta-Refresh-Fallback im statischen Build)
 *  - scripts/generate-redirects.mjs erzeugt daraus `_redirects` (Netlify/Cloudflare)
 *    und `vercel.json`-Rewrites — je nach Deploy-Ziel (offene Entscheidung)
 *  - scripts/check-redirects.mjs testet sie gegen den Build
 *
 * Regeln (siehe planning/PLAN.md Anforderung 3):
 *  - KEINE Redirect-Ketten: jedes Ziel ist eine finale, existierende URL
 *  - Ziel = thematisch nächste verbleibende Seite
 *  - VOR GO-LIVE: gegen Ahrefs-Backlink-Export prüfen (planning/seo-tools.md)
 *
 * Status: VORSCHLAG zur Abnahme (offene Entscheidung Nr. 5 in PLAN.md).
 */

/** @type {Record<string, string>} */
export const redirects = {
  // ── Support-Hub + Anleitungen (22 + 3) — Bereich entfällt komplett ──────
  // Hub: Hilfe lebt künftig extern auf hilfe.orderlyze.com
  '/support': 'https://hilfe.orderlyze.com/',

  // ── SEO: doppelte Friseur-Seite konsolidiert (Keyword-Kannibalisierung) ──
  // /friseure (Keyword-Landing) → /friseur (Branchen-Seite, behalten)
  '/friseure': '/friseur',

  // Drucker-Setup/How-to → Hilfe-Artikel (Such-Intent = Anleitung, nicht Kauf)
  '/drucker-verbinden': 'https://hilfe.orderlyze.com/app/drucker/',
  '/kopie-von-drucker-verbinden': 'https://hilfe.orderlyze.com/app/drucker/', // versehentliche Wix-Kopie

  // Drucker-Produkte/Hardware → /hardware (kommerzielle Absicht)
  '/bluetooth-drucker': '/hardware',
  '/cloud-drucker': '/hardware',
  '/sunmi-drucker': '/hardware',

  // Zahlung → /kartenzahlung
  '/zahlungsarten': '/kartenzahlung',

  // Buchhaltung/Berichte/Verwaltung → /verwaltung bzw. /datenexport-steuerberater
  '/berichte': '/verwaltung',
  '/umsaetze': '/verwaltung',
  '/steuer-aendern': '/verwaltung',
  '/kassenbuch': '/verwaltung',
  '/buchungskonten': '/datenexport-steuerberater',

  // Bonieren/Gastro-Ablauf → /funkbonieren
  '/gaengesystem': '/funkbonieren',
  '/tischplan': '/funkbonieren',

  // Funktions-Anleitungen → /funktionen
  '/abholung': '/funktionen',
  '/bewirtungsbeleg': '/funktionen',
  '/dynamisches-produkt': '/funktionen',
  '/einstellungen-synchronisieren': '/funktionen',
  '/farbeinstellungen': '/funktionen',
  '/gutscheine': '/funktionen',
  '/pfand': '/funktionen',
  '/rechnungen-bearbeiten': '/funktionen',
  '/stammkunden': '/funktionen',

  // Live, aber ohne Sitemap-Eintrag (vom Support-Hub verlinkt)
  '/erste-schritte': '/so-funktionierts',
  '/uebermittlung-finanzamt': '/finanzamt-konform',

  // ── Shop (5) — Thermorollen-Shop entfällt ───────────────────────────────
  '/thermorollen': '/hardware',
  '/product-page/thermorollen-30': '/hardware',
  '/product-page/thermorollen-50': '/hardware',
  '/product-page/25-thermorollen': '/hardware',
  '/product-page/30-thermorollen-ökopapier': '/hardware',

  // ── Sitemap: alte (bei Google registrierte) Wix-URL → neue Astro-Sitemap ──
  '/sitemap.xml': '/sitemap-index.xml',
};
