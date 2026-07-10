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

  // Alte Drucker-Anleitungen → exakte Hilfe-Seite (Such-Intent = Einrichtung)
  '/bluetooth-drucker': 'https://hilfe.orderlyze.com/app/drucker/',
  '/cloud-drucker': 'https://hilfe.orderlyze.com/app/drucker/',
  '/sunmi-drucker': 'https://hilfe.orderlyze.com/app/drucker/',

  // Funktions-Anleitungen → exakte Artikel im Hilfe-Center
  '/zahlungsarten': 'https://hilfe.orderlyze.com/funktionen/zahlungsarten/',

  // Buchhaltung/Berichte → exakte Hilfe-Seiten
  '/berichte': 'https://hilfe.orderlyze.com/auswertung/berichte/',
  '/umsaetze': 'https://hilfe.orderlyze.com/auswertung/weitere-berichte/tagesumsatzbericht/',
  '/steuer-aendern': 'https://hilfe.orderlyze.com/funktionen/steuer-aendern/',
  '/kassenbuch': 'https://hilfe.orderlyze.com/funktionen/kassenbuch/',
  '/buchungskonten': 'https://hilfe.orderlyze.com/einstellungen/buchungskonten/',

  // Bonieren/Gastro-Ablauf → /funkbonieren
  '/gaengesystem': '/funkbonieren',
  '/tischplan': 'https://hilfe.orderlyze.com/funktionen/tischplan/',

  // Weitere Funktions-Anleitungen → möglichst exakte Hilfe-Seiten
  '/abholung': 'https://hilfe.orderlyze.com/funktionen/abholung/',
  '/bewirtungsbeleg': 'https://hilfe.orderlyze.com/funktionen/bewirtungsbeleg/',
  '/dynamisches-produkt': 'https://hilfe.orderlyze.com/funktionen/dynamisches-produkt/',
  '/einstellungen-synchronisieren': 'https://hilfe.orderlyze.com/app/einstellungen/',
  '/farbeinstellungen': '/funktionen',
  '/gutscheine': 'https://hilfe.orderlyze.com/stammdaten/gutscheine/',
  '/pfand': 'https://hilfe.orderlyze.com/funktionen/pfand/',
  '/rechnungen-bearbeiten': 'https://hilfe.orderlyze.com/funktionen/rechnungen-bearbeiten/',
  '/stammkunden': 'https://hilfe.orderlyze.com/personal/kunden/',

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
