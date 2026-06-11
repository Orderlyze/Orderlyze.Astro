# SEO-Tools für die neue Webseite

Festgelegt am 2026-06-11: Diese drei Tools werden für die neue orderlyze.com verwendet.
**Beim Gestalten/Bauen der Astro-Seite mitbedenken** — jedes Tool hat Anforderungen an die Seite.

## 1. Plausible Analytics (Web-Analytics)

Privacy-first Analytics, ersetzt Google Analytics. Cookielos.

**Was die Webseite dafür braucht:**
- **Script-Snippet im `<head>` jeder Seite** (gehört ins Astro-Base-Layout):
  ```html
  <script defer data-domain="orderlyze.com" src="https://plausible.io/js/script.js"></script>
  ```
- **Custom Events / Goals einplanen** — die Conversion-Punkte der Seite sollten als
  Plausible-Events ausgelöst werden, sonst ist nur Traffic sichtbar, keine Conversions:
  - Angebots-Formular abgeschickt (wichtigstes Goal — beim Submit-Handler des
    Angebot-Wizards mitfeuern, siehe `angebot-flow.md`)
  - Klicks auf Telefonnummer (`tel:`-Links), WhatsApp-Button, CTA-Buttons
  - Alternativ reicht für Formulare auch ein Pageview-Goal auf `/dank-angebot`
- **Proxy-Option mitdenken:** Plausible kann über die eigene Domain proxied werden
  (z. B. `/js/script.js` + `/api/event` weiterleiten), damit Adblocker das Tracking nicht
  blocken — bei Astro über Rewrites/Edge-Functions des Hosters konfigurierbar.
  Entscheidung beim Setup treffen.
- **Kein Cookie-Banner nötig** für Plausible allein (cookielos, DSGVO-konform) — wenn die
  neue Seite sonst keine Tracking-Cookies setzt, kann der CookieYes-Banner der alten Seite
  komplett entfallen. ABER: Die alte Seite feuert Facebook CAPI + Google Ads Conversions
  (siehe `angebot-flow.md`) — falls die übernommen werden, braucht es weiterhin Consent.

## 2. Ahrefs (Keywords, Backlinks, Site Audit)

Wird genutzt für Keyword-Tracking, Backlink-Überwachung (kritisch beim Relaunch!) und Site Audits.

**Was die Webseite dafür braucht:**
- **Site-Verifizierung** für Ahrefs Site Audit / Webmaster Tools: per DNS-Record,
  HTML-Datei im Root oder Meta-Tag im `<head>` — beim Build eine der Optionen vorsehen
  (Meta-Tag im Base-Layout ist am einfachsten zu pflegen).
- **`AhrefsBot` und `AhrefsSiteAudit` in `robots.txt` NICHT blockieren**, sonst funktionieren
  Crawls/Audits nicht.
- **Sauberes technisches Fundament**, damit der Site Audit grün ist (Astro liefert das meiste,
  aber bewusst einplanen):
  - `sitemap.xml` automatisch generieren (`@astrojs/sitemap`) und in `robots.txt` referenzieren
  - Canonical-Tag auf jeder Seite (Frontmatter-Daten aus `content/pages/` übernehmen)
  - Genau eine H1 pro Seite, saubere Heading-Hierarchie (beim Komponenten-Design beachten!)
  - Keine Redirect-Ketten: alle 301s aus README/`support-excluded`/`shop-excluded` direkt
    auf das Endziel zeigen lassen
  - Alt-Texte überall (erzwingt Astro ohnehin)
- **Rolle beim Relaunch:** Vor dem Go-Live Backlink-Bestand exportieren (welche URLs haben
  Links?) → Redirect-Map dagegen prüfen, damit kein verlinktes Ziel ins Leere läuft.
  Nach Go-Live: Broken-Backlinks-Report überwachen.

## 3. Microsoft Bing Webmaster Tools

Pendant zur Google Search Console für Bing (speist auch DuckDuckGo, Ecosia, ChatGPT-Suche).

**Was die Webseite dafür braucht:**
- **Site-Verifizierung**: XML-Datei (`BingSiteAuth.xml` im Root), Meta-Tag
  (`<meta name="msvalidate.01" content="..." />` im Base-Layout) oder DNS-CNAME.
  Tipp: Wenn Google Search Console schon verifiziert ist, kann Bing die Property
  direkt aus GSC importieren.
- **Sitemap einreichen** (gleiche `sitemap.xml` wie für Ahrefs/Google).
- **IndexNow einbauen** (von Bing betrieben, kostenlos): Beim Deploy geänderte URLs per
  IndexNow-API pingen → sofortige Indexierung statt auf Crawl warten. Braucht einen
  API-Key als Textdatei im Root (`<key>.txt`) + Ping beim Build/Deploy — lässt sich in
  die Astro-/CI-Pipeline integrieren. Beim Hosting-Setup einplanen.
- `robots.txt`: `bingbot` nicht blockieren.

## Konsequenzen fürs Seiten-Design (Checkliste beim Bauen)

- [ ] Base-Layout bekommt einen definierten **`<head>`-Slot für Tool-Snippets**:
      Plausible-Script, Ahrefs-Verify-Meta, Bing-Verify-Meta (zentral pflegbar, z. B. als
      Konstanten in einer Config-Datei)
- [ ] **Root-Dateien servierbar**: `robots.txt`, `sitemap.xml`, `BingSiteAuth.xml`,
      IndexNow-`<key>.txt` (in Astro: `public/`-Ordner)
- [ ] **CTA-Komponenten feuern Plausible-Events** (Button-/Link-Komponente mit optionalem
      `data-event`-Prop bauen statt nackter `<a>`-Tags)
- [ ] **Danke-Seiten als Goal-Ziele** erhalten (`/dank`, `/dank-angebot`) — nicht wegoptimieren
- [ ] **Redirect-Map als Teil des Deploys** (301s für Support-/Shop-URLs), vor Go-Live gegen
      Ahrefs-Backlink-Export prüfen
- [ ] Cookie-/Consent-Frage klären: Nur Plausible → kein Banner. Mit Facebook/Google-Ads-Tracking
      (wie alte Seite) → Consent-Lösung nötig

## Nicht beauftragt, aber empfohlen (Entscheidung Daniel)

- **Google Search Console** wurde nicht genannt — für den SEO-erhaltenden Relaunch (Sitemap
  einreichen, Indexierung überwachen, Crawling-Fehler sehen) praktisch unverzichtbar und
  vermutlich für die Wix-Seite bereits vorhanden. Falls ja: Property bleibt beim Domain-Umzug
  bestehen, nur neue Sitemap einreichen.
