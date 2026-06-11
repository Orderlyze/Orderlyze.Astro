# Abschlussbericht: Relaunch orderlyze.com (Wix → Astro)

Stand: 2026-06-11 · Umsetzung gemäß `planning/PLAN.md`

## Was gebaut wurde

- **Astro 7.0.0-beta.3** (letzte Preview, wie gefordert), statisches SSG, TypeScript strict,
  `@astrojs/sitemap`, selbst gehostete Fonts (Raleway Variable + Open Sans Variable via
  Fontsource — kein Google-Fonts-CDN, DSGVO-konform).
- **Alle 35 Seiten** aus `planning/content/pages/` unter exakt denselben URLs
  (ohne Trailing-Slash, wie die Wix-Seite). Title/Description/OG/Canonical aus dem
  Frontmatter; **Meta-Abgleich-Skript: 0 Fehler**.
- **Design**: Brand-Look gemäß `planning/farben.md` (#0659A9 CTA, #DB9421 Akzent, #062134 Navy,
  Raleway/Open Sans, 5px-Button-Radius). Jede Seite mit dem frontend-design-Skill durchgestaltet —
  Design-Signatur „**Kassenbon**“ (perforierte Karten für Testimonials & Preis-Pakete),
  Navy-Sektionen mit Punktraster, Orange als präziser Akzent, Scroll-Reveals (Reduced-Motion-fähig).
- **Angebots-Wizard** (`/angebot`, `/angebot-de`, `/angebot-gastro`, `/angebot-google`):
  4 Intro-Slides + 3 Formular-Schritte + Validierung (Telefon nur Ziffern, wie altes Formular)
  + Redirect auf `/dank-angebot` — exakt nach `planning/angebot-flow.md`.
  **Submit = Platzhalter** in `src/lib/lead-submit.ts` (🔴 offene Entscheidung, s. u.).
- **301-Redirects** für alle 30 entfallenden URLs (Support 25 + Shop 5):
  Quelle der Wahrheit `redirects.config.mjs` → generiert `public/_redirects`
  (Netlify/Cloudflare) + `vercel.json` (Vercel) + Meta-Refresh-Fallback im Build.
  Keine Ketten (geprüft per Skript).
- **SEO-Tooling** (`planning/seo-tools.md`): Plausible-Snippet (tagged-events + outbound-links),
  CTA-/Tel-Komponenten feuern Events, Verify-Slots für Ahrefs/Bing/Google in
  `src/config/site.ts`, `robots.txt` + Sitemap, IndexNow-Ping-Skript (`scripts/indexnow-ping.mjs`),
  JSON-LD (Organization + SoftwareApplication) auf der Startseite.
- **Medien**: kuratierte Übernahme aus `planning/assets/wix-media/` nach `src/assets/`
  (SEO-Dateinamen, AVIF/WebP via Astro-Pipeline, Alt-Texte überall), 3 Anleitungs-Videos
  lazy/stumm in Feature-Sektionen. ⚠️ 5 Bilder der alten Seite tragen **iStock-Wasserzeichen**
  (nicht lizenzierte Comps!) und wurden bewusst NICHT übernommen: `cafe_owner.jpg`,
  `restaurant_owner.jpg`, `bartender.jpg`, `websitePhoto1.jpg`, `termin.jpg`*(unverifiziert)*.

## Definition of Done — Status

- [x] Alle 35 URLs liefern Seiten mit korrektem Title/Description/OG/Canonical/H1
      (`npm run check:meta` → 0 Fehler, 1 dokumentierte Verbesserung: Tippfehler
      „losglegen“→„loslegen“ in der /so-funktionierts-Description)
- [x] Alle Alt-URLs (Support/Shop) → 301 direkt aufs Endziel, keine Ketten
      (`npm run check:redirects` → alles grün; echte 301s kommen vom Hosting, Map liegt bereit)
- [x] `/angebot`-Wizard funktioniert bis zum Platzhalter-Submit inkl. `/dank-angebot`
      (per Browser-Durchklick verifiziert)
- [x] sitemap-index.xml + robots.txt korrekt, Plausible eingebunden, Verify-Slots vorhanden
- [x] Lighthouse (Startseite + /preise, /kassensystem, /restaurant):
      **Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100**
- [x] Mobile geprüft (Menü, Wizard, Startseite)
- [x] Diese Liste + offene Entscheidungen

## 🔴 Offene Entscheidungen (für Daniel)

1. **Angebots-API-Anbindung** — Variante 1 (wixsite.com-URL), 2 (Wix REST API) oder
   3 (eigenes Backend)? Bis dahin simuliert `src/lib/lead-submit.ts` den Submit
   (gilt für Angebots-Wizard, /bestellen und /testen). **Vor Go-Live zwingend klären.**
2. **Deploy-Ziel/Hosting** — `_redirects` (Netlify/Cloudflare) und `vercel.json` liegen
   beide bereit; IndexNow-Ping in die CI hängen (`scripts/indexnow-ping.mjs`).
3. **Google Search Console** zusätzlich? (empfohlen; Verify-Slot ist vorbereitet)
4. **Facebook-/Google-Ads-Conversion-Tracking** übernehmen? Aktuell nur Plausible
   (cookielos → bewusst **kein** Consent-Banner). Mit Ads-Tracking wäre ein Banner nötig.
5. **Redirect-Ziele** — Vorschlag in `redirects.config.mjs` zur Abnahme
   (u. a. `/support` → hilfe.orderlyze.com, Shop/Thermorollen → `/hardware`).
   Vor Go-Live gegen den Ahrefs-Backlink-Export prüfen!

## Benötigte Bilder / Inhalte (Liste gemäß PLAN Punkt 6)

- **Beauty**: kein eigenes lizenziertes Beauty-/Kosmetik-Foto im Fundus — aktuell
  Friseurin-Foto als Ersatz auf /beauty und Startseiten-Kachel. Empfehlung: Mini-Shooting
  (siehe bilder-strategie.md).
- **App-Store-/Play-Store-Links** für „So funktioniert's“ (auf der alten Seite Bild-Links,
  nicht erfasst) — URLs nachtragen.
- **Beratungsgespräch-Buchung** (/technische-sicherheitseinrichtung): Kalender-Link der
  alten Seite wurde nicht erfasst; CTA zeigt vorerst auf /angebot.
- **Mitarbeiter-Dropdown im Wizard**: dokumentiert war nur „0-4“; Optionen 5-9/10-19/20+
  sind Annahme — ggf. an echte Wix-Optionen angleichen.
- **Testimonial-Fotos** (Carlo M., Helene S., Verena S.): aktuell ohne Foto (Bon-Karten) —
  echte Kundenfotos mit Einverständnis wären stärker.

## Go-Live-Checkliste (Rest)

1. API-Anbindung implementieren (Entscheidung 1) und `lead-submit.ts` ersetzen
2. Hosting wählen, deployen, Domain umziehen; 301s am Live-System stichprobenartig testen
3. Ahrefs-Backlink-Export gegen Redirect-Map prüfen (vor DNS-Umzug)
4. Verify-Codes eintragen (`src/config/site.ts`): Ahrefs, Bing (`BingSiteAuth.xml` optional),
   ggf. Google; Sitemap in Bing Webmaster Tools (+ ggf. GSC) einreichen
5. IndexNow-Key generieren → `public/<key>.txt` + CI-Ping
6. Plausible-Goals anlegen: „Angebot abgeschickt“, „CTA Angebot“, „Anruf“,
   „Bestellanfrage abgeschickt“, „Test angefordert“ (+ Pageview-Goal /dank-angebot)
7. Test-Submissions im Wix-Dashboard löschen (2 Stück, siehe angebot-flow.md)
8. Wix-Abo erst kündigen, wenn Variante-1-Frage geklärt ist (sonst bricht die Form-API weg!)

## Nützliche Befehle

```bash
npm run dev              # Entwicklung
npm run build            # generiert Redirect-Dateien + baut nach dist/
npm run check:meta       # Meta-Abgleich gegen planning/content/pages/
npm run check:redirects  # Redirect- und Routen-Tests
```
