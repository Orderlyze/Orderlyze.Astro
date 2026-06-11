# Planung: Relaunch orderlyze.com (Wix → Astro)

Ziel: Migration der bestehenden Wix-Baukasten-Webseite auf eine neue, optimierte Astro-Webseite
(neueste Astro-Preview-Version), **ohne Verlust der bestehenden SEO-Daten** (Keywords, Backlinks, URLs).

Stand: 2026-06-11 (Scrape-Datum)

## Ordnerstruktur

| Pfad | Inhalt |
|---|---|
| `PLAN.md` | **Gesamtplan / Goal-Prompt** — konsolidiert alle Planungsdaten in einen ausführbaren Auftrag (Anforderungen, Phasen, offene Entscheidungen, Definition of Done) |
| `sitemaps/` | Original-Sitemaps der Live-Seite (sitemap.xml = Index, pages-sitemap.xml, store-products-sitemap.xml) + `additional-pages.xml` (live existierende Seiten ohne Sitemap-Eintrag, z. B. /dank-angebot) |
| `content/pages/` | 35 Seiten als Markdown, die in die neue Webseite übernommen werden — Frontmatter mit URL, Title, Meta-Description, OG-Tags, Canonical + kompletter Seitentext + alle internen/externen Links |
| `content/support-excluded/` | 22 Support-/Hilfe-Seiten, die **NICHT** in die neue Webseite übernommen werden (Entscheidung 2026-06-11). Aufbewahrt, weil die URLs in der Sitemap stehen und 301-Redirects brauchen |
| `content/shop-excluded/` | Shop-Seiten (/thermorollen + 4 Produktseiten), die **NICHT** übernommen werden (Entscheidung 2026-06-11). Ebenfalls aufbewahrt für 301-Redirects |
| `scripts/scrape.mjs` | Scraper-Skript (Node, ohne Dependencies) — erneut ausführbar mit `node planning/scripts/scrape.mjs` |
| `seo-tools.md` | Festgelegte SEO-Tools (Plausible, Ahrefs, Bing Webmaster) + was die Webseite dafür vorsehen muss (Snippets, Verify-Tags, Root-Dateien, Events, Checkliste) |
| `bilder-strategie.md` | Verifizierte Recherche: beste Bilder für SEO + alle Beschaffungsoptionen (Kosten/Lizenzen/Rechtslage) + Empfehlung pro Bild-Typ. Asset-Inventur: 194 Screenshots auf hilfe.orderlyze.com |
| `farben.md` | Farbpalette der Live-Seite (Markenfarben, Wix-Theme-Variablen, Ist-Nutzung) + Typografie + Design-Token-Vorschlag für Astro |
| `angebot-flow.md` | **Backend-Logik des Angebots-Formulars** (/angebot) — die einzige echte Logik der Seite. Dokumentierte Requests, Payload-Struktur, verifizierte Replikation + Einschränkungen |
| `angebot-network-requests-raw.md` | Komplettes Playwright-Network-Log des Angebots-Durchlaufs (Rohdaten) |
| `scripts/test-angebot-submit.mjs` | Verifizierter Standalone-Test der Formular-Submission (Achtung: erzeugt echte Test-Anfrage im Wix-Backend!) |

## Wichtig für SEO-Erhalt

- **Alle 61 URLs** aus den Sitemaps sind erfasst. Jede dieser URLs muss in der neuen Seite
  entweder 1:1 erhalten bleiben oder per **301-Redirect** weitergeleitet werden.
- Jede Markdown-Datei enthält im Frontmatter `title`, `description`, `og_*` und `canonical`
  der Live-Seite — Basis für die Meta-Tags der neuen Seiten.
- Auffälligkeiten:
  - `kopie-von-drucker-verbinden` — vermutlich versehentlich veröffentlichte Wix-Kopie von
    `drucker-verbinden` (Duplicate-Content-Kandidat, beim Relaunch klären: Redirect oder entfernen).
  - `dank`, `angebot*`, `bestellen`, `testen` — Funnel-/Danke-Seiten, teils dünner Inhalt.
  - `agb` und `datenschutzerklaerung` sind sehr lang (Rechtstexte, 1:1 übernehmen).

## URL-Inventar — Seiten für die neue Webseite (35)

Startseite: `/`

Produkt/Funktionen: `/kassensystem`, `/kassensoftware`, `/registrierkasse`, `/bestellsystem`,
`/funktionen`, `/so-funktionierts`, `/funkbonieren`, `/kartenzahlung`, `/verwaltung`,
`/datenexport-steuerberater`

Branchen: `/branchen`, `/gastronomie`, `/restaurant`, `/cafe`, `/bar`, `/friseur`, `/friseure`,
`/beauty`, `/sonstige`

Hardware: `/hardware`

Compliance: `/finanzamt-konform`, `/technische-sicherheitseinrichtung`

Conversion/Funnel: `/preise`, `/angebot`, `/angebot-de`, `/angebot-gastro`, `/angebot-google`,
`/bestellen`, `/testen`, `/dank`, `/dank-angebot` (nicht in der Wix-Sitemap, aber live —
Ziel des Redirects nach Angebots-Submit, siehe `angebot-flow.md`)

Rechtliches: `/impressum`, `/agb`, `/datenschutzerklaerung`

## Support-Bereich — wird NICHT übernommen (22 + Hub)

Entscheidung 2026-06-11: Der komplette Hilfe-/Support-Bereich entfällt in der neuen Webseite.
Die Inhalte liegen in `content/support-excluded/`. **Für alle diese URLs müssen beim Relaunch
301-Redirects definiert werden** (Ziel noch festzulegen, z. B. passende Feature-Seite oder Startseite):

Hub: `/support` (steht nicht in der Sitemap, ist aber verlinkt und live)

Anleitungen: `/abholung`, `/berichte`, `/bewirtungsbeleg`, `/bluetooth-drucker`, `/buchungskonten`,
`/cloud-drucker`, `/drucker-verbinden`, `/dynamisches-produkt`, `/einstellungen-synchronisieren`,
`/farbeinstellungen`, `/gaengesystem`, `/gutscheine`, `/kassenbuch`, `/kopie-von-drucker-verbinden`,
`/pfand`, `/rechnungen-bearbeiten`, `/stammkunden`, `/steuer-aendern`, `/sunmi-drucker`,
`/tischplan`, `/umsaetze`, `/zahlungsarten`

Außerdem live, aber nicht in der Sitemap (vom Support-Hub verlinkt, nicht gescrapt):
`/erste-schritte`, `/uebermittlung-finanzamt` — auch diese brauchen Redirects.

## Shop — wird NICHT übernommen (5 Seiten)

Entscheidung 2026-06-11: Der Thermorollen-Shop entfällt in der neuen Webseite (wie der
Support-Bereich). Inhalte inkl. Preise/Beschreibungen liegen in `content/shop-excluded/`.
**Auch diese URLs brauchen beim Relaunch 301-Redirects** (Ziel noch festzulegen):

- `/thermorollen` (Shop-Übersicht, im Menü als "SHOP" verlinkt — Menüpunkt entfällt ebenfalls)
- `/product-page/thermorollen-30`
- `/product-page/thermorollen-50`
- `/product-page/25-thermorollen`
- `/product-page/30-thermorollen-ökopapier`

Hinweis: Mit dem Wix-Store fallen auch dessen Standard-Seiten (Warenkorb `/cart-page`,
Checkout, "Danke"-Bestellseite) weg — die stehen nicht in der Sitemap und sind nur über
den Shop erreichbar, brauchen also keine eigenen Redirects. Die Seite `/bestellen` (Funnel)
und `/hardware` (Marketing) sind KEIN Teil des Shops und bleiben erhalten.
