# Gesamtplan: Relaunch orderlyze.com — Wix → Astro

> Diese Datei ist als **Prompt für einen Goal-Request in Claude Code** verwendbar.
> Alle referenzierten Dateien liegen im Ordner `planning/` dieses Repos.
> Stand: 2026-06-11.

## Auftrag

Baue die neue Marketing-Webseite für orderlyze.com (Kassensystem-/POS-Software für Gastronomie
und Dienstleister, Markt AT/DE, Sprache Deutsch) als **Astro-Projekt mit der allerneuesten
Astro-Version (letzte Preview/Beta verwenden, nicht die Stable)** in diesem Repository.

Oberstes Ziel neben der Qualität der Seite: **Kein Verlust der bestehenden SEO-Werte**
(Rankings, Keywords, Backlinks). Die alte Wix-Seite ist vollständig dokumentiert — nichts
von der Live-Seite muss erneut gescrapt werden.

## Eingangsdaten (alle vorhanden, zuerst lesen)

| Datei/Ordner | Inhalt |
|---|---|
| `planning/README.md` | Überblick, URL-Inventar, Ausschluss-Listen, SEO-Regeln |
| `planning/content/pages/*.md` | Die **35 zu bauenden Seiten**: Frontmatter (`url`, `title`, `description`, `og_*`, `canonical`) + kompletter Seitentext mit Heading-Hierarchie + interne/externe Links |
| `planning/content/support-excluded/`, `planning/content/shop-excluded/` | Entfallende Seiten — NICHT bauen, nur 301-Redirects |
| `planning/sitemaps/` | Original-Wix-Sitemaps + `additional-pages.xml` (Referenz für URL-Erhalt) |
| `planning/farben.md` | Farbpalette, Typografie (Raleway/Open Sans), fertige CSS-Design-Tokens |
| `planning/bilder-strategie.md` | Bild-Beschaffung, Dateinamen-Konvention, Astro-`<Picture/>`-Vorgaben |
| `planning/seo-tools.md` | Plausible/Ahrefs/Bing-Anforderungen + Bau-Checkliste |
| `planning/angebot-flow.md` | Backend-Logik des Angebots-Formulars (einzige echte Logik der Seite) |
| `planning/assets/wix-media/` | **Alle Medien der alten Webseite (im Repo committet):** 370 Bilder (`images/`) + 21 Videos (`videos/`) in Originalauflösung |
| `planning/wix-media-inventory.json` | Inventar dazu (Name, URL, Auflösung, Größe je Datei) |

## Harte Anforderungen

1. **URL-Erhalt:** Alle 35 Seiten aus `planning/content/pages/` erscheinen unter **exakt
   demselben Pfad** wie auf der alten Seite (`/kassensystem`, `/preise`, `/dank-angebot` …).
   Kein Trailing-Slash-Wechsel ohne Redirect, keine Umbenennungen.
2. **Meta-Erhalt:** `title`, `meta description`, OG-Tags und Canonical jeder Seite kommen aus
   dem Frontmatter der jeweiligen Content-Datei (Startbasis; Verbesserungen erlaubt, aber
   bewusst und dokumentiert).
3. **301-Redirects** für alle entfallenden URLs (Support: 22 Seiten + `/support` +
   `/erste-schritte` + `/uebermittlung-finanzamt`; Shop: `/thermorollen` + 4 ×
   `/product-page/*`) auf die jeweils thematisch nächste verbleibende Seite — Redirect-Map
   als eigene, reviewbare Datei anlegen. Keine Redirect-Ketten.
4. **Angebots-Funnel `/angebot`:** Mehrstufiger Wizard wie dokumentiert in
   `planning/angebot-flow.md` (4 Intro-Slides + 3 Formular-Schritte + Redirect auf
   `/dank-angebot`). **Die API-Anbindung ist eine OFFENE ENTSCHEIDUNG des Nutzers**
   (Variante 1/2/3 in angebot-flow.md) — UI komplett bauen, Submit gegen einen klar
   markierten Platzhalter (z. B. eigenen Astro-Endpoint mit TODO) implementieren,
   NICHT eigenmächtig eine Variante festlegen.
5. **Design:** Brand-Look gemäß `planning/farben.md` — CSS-Design-Tokens von dort übernehmen
   (`#0659A9` CTA-Blau, `#6EA4CA` Headings, `#DB9421` Akzent-Orange, `#062134` Navy,
   `#F6F9FC` Flächen; Raleway für Headings, Open Sans für Fließtext; Buttons 5px Radius).
   Es ist ein **Redesign erlaubt und erwünscht** (moderner, schneller, sauberer als Wix),
   aber im bestehenden Markenbild.
6. **Bilder & Videos: primär aus `planning/assets/wix-media/` nehmen** (alle 370 Bilder +
   21 Videos der alten Webseite liegen dort lokal in Originalauflösung; sprechende Dateinamen,
   Inventar in `planning/wix-media-inventory.json`). Passende Dateien von dort nach
   `src/assets/` übernehmen — dabei Dateinamen gemäß SEO-Konvention normalisieren
   (klein, Bindestriche, deutsch-beschreibend). Die Anleitungs-Videos (`videos/`) können
   auf den Feature-Sektionen eingesetzt werden (lazy, ohne Autoplay-Ton). Ergänzend:
   App-Screenshots von hilfe.orderlyze.com auf Geräte-Mockups. Verarbeitung als AVIF/WebP
   via Astro `<Picture/>`; Alt-Texte überall; keine fotorealistischen AI-Bilder. Nur wo
   nichts Passendes im Ordner liegt: strukturierte Platzhalter + Liste benötigter Bilder
   führen. Details: `planning/bilder-strategie.md`.
7. **SEO-Tool-Integration** gemäß `planning/seo-tools.md`: Plausible-Snippet + Event-fähige
   CTA-Komponenten, Verify-Slots für Ahrefs/Bing im Head, `robots.txt` + `@astrojs/sitemap`,
   `public/`-Root-Dateien, IndexNow-Vorbereitung im Deploy.
8. **Technische Qualität:** Statisches Astro (SSG) wo möglich; saubere
   Komponenten-Architektur (Base-Layout, Header/Footer/Nav, CTA-, Sektion-, Karten-Komponenten
   statt Copy-Paste); genau eine H1 pro Seite, logische Heading-Hierarchie; Core Web Vitals
   im grünen Bereich (CLS via Astro-Image-Komponenten, Lazy-Loading, Font-Loading optimieren).

## Navigation der neuen Seite

Wie alte Seite, minus Shop und Hilfe: Kassensystem (Dropdown: So funktioniert's, Funktionen,
Kartenzahlung, Funkbonieren, Verwaltung, Datenexport für Steuerberater), Branchen (Dropdown:
Bar, Cafe, Restaurant, Friseur, Beauty, Sonstige), Preise, CTA "Kostenloses Angebot" → `/angebot`,
Telefonnummer 0800 400 4511. Footer: Rechtliches (AGB, Impressum, Datenschutzerklärung) +
Compliance-Badges. Der Menüpunkt "Hilfe" zeigt künftig auf https://hilfe.orderlyze.com (extern).

## Vorgehen (Phasen — nacheinander, mit Review-Punkten)

### Phase 1: Projekt-Setup
- Neues Astro-Projekt mit der letzten Preview-Version initialisieren (`npm create astro@beta`
  bzw. aktuellste Beta prüfen), TypeScript, `@astrojs/sitemap`
- Design-Tokens aus `farben.md` als CSS-Variablen/Theme anlegen, Fonts (Raleway, Open Sans)
  selbst hosten (kein Google-Fonts-CDN — DSGVO)
- Base-Layout mit SEO-Head-Komponente (Title/Description/OG/Canonical aus Props,
  Tool-Snippet-Slots gemäß seo-tools.md)

### Phase 2: Komponenten & Layout
- Header/Nav (Desktop + Mobile), Footer, CTA-Button (mit Plausible-Event-Prop),
  Sektions-/Karten-Komponenten, Geräte-Mockup-Komponente für Screenshots
- Review-Punkt: Startseite als Design-Referenz bauen und abnehmen lassen, BEVOR die
  restlichen Seiten produziert werden

### Phase 3: Seiten-Produktion
- Alle 35 Seiten aus `content/pages/` umsetzen (Inhalte/Headings aus den MD-Dateien,
  redaktionelle Glättung erlaubt, Kerninhalte und Keywords beibehalten)
- Interne Verlinkung wie dokumentiert (Links-Sektionen der Content-Dateien), Links auf
  entfallene Seiten auf deren Redirect-Ziele umbiegen

### Phase 4: Angebots-Funnel
- Wizard-UI nach `angebot-flow.md`, Validierung (E-Mail, Telefon), Redirect auf `/dank-angebot`
- Submit gegen Platzhalter-Endpoint mit TODO-Markierung (offene Nutzer-Entscheidung!)

### Phase 5: SEO-Finish
- Redirect-Map (Hosting-Format je nach Deploy-Ziel), robots.txt, Sitemap, Verify-Dateien
- Meta-Abgleich: Skript schreiben, das alle gebauten Seiten gegen die Frontmatter-Daten
  der Content-Dateien prüft (Title/Description/Canonical/H1 vorhanden und korrekt)
- Strukturierte Daten: Organization + Product/SoftwareApplication auf der Startseite erwägen

### Phase 6: Qualitätssicherung
- Build prüfen, alle 35 Routen + alle Redirects testen (Skript), Lighthouse/CWV-Check,
  Mobile-Darstellung, Plausible-Events verifizieren
- Abschlussbericht: was fehlt noch für Go-Live (Bilder-Liste, offene Entscheidungen,
  DNS-Umzug, Tool-Verifizierungen)

## Offene Entscheidungen (beim Nutzer rückfragen, nicht selbst entscheiden)

1. **Angebots-API-Anbindung** (angebot-flow.md Variante 1/2/3) — blockiert nur Phase 4-Submit
2. **Deploy-Ziel/Hosting** (beeinflusst Redirect-Format, IndexNow-Hook, Plausible-Proxy)
3. **Google Search Console** zusätzlich zu den drei festgelegten Tools?
4. **Facebook-/Google-Ads-Conversion-Tracking** übernehmen? (Wenn ja: Consent-Banner nötig;
   nur Plausible = kein Banner)
5. **Redirect-Ziele im Detail** (Vorschlag in der Redirect-Map zur Abnahme vorlegen)

## Definition of Done

- [ ] Alle 35 URLs liefern 200 mit korrektem Title/Description/OG/Canonical/H1
- [ ] Alle dokumentierten Alt-URLs (Support/Shop/Sonstige) liefern 301 direkt aufs Endziel
- [ ] `/angebot`-Wizard funktioniert bis zum Platzhalter-Submit inkl. `/dank-angebot`
- [ ] sitemap.xml + robots.txt korrekt, Plausible feuert, Verify-Slots vorhanden
- [ ] Lighthouse Performance/SEO/Accessibility ≥ 95 auf Startseite + 3 Stichproben-Seiten
- [ ] Liste benötigter Bilder + offene Entscheidungen im Abschlussbericht
