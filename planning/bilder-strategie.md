# Bilder-Strategie für den Relaunch (SEO + Beschaffung)

Deep-Research vom 2026-06-11: 5 Such-Winkel, 25 Quellen, 25 Top-Claims adversarial verifiziert
(3-Voter-Prinzip) — 20 bestätigt, 5 widerlegt. Konfidenz pro Aussage ist markiert.
Ergänzt um die Analyse der vorhandenen Bild-Assets (hilfe.orderlyze.com).

## TL;DR — Empfehlung

1. **Echte App-Screenshots auf Geräte-Mockups sind das Rückgrat** — einzigartig (kein
   Duplicate-Problem), authentisch, rechtlich sauber, und das Rohmaterial existiert schon:
   **hilfe.orderlyze.com hat 194 hochauflösende Screenshots** (siehe unten).
2. **Branchen-Seiten (Bar, Café, Restaurant, Friseur, Beauty):** eigene Fotos (Mini-Shooting
   bei echten Kunden) > klar stilisierte Illustrationen > Stock. Fotorealistische AI-Bilder
   wegen EU AI Act ab 02.08.2026 nur mit Kennzeichnung — besser vermeiden.
3. **Stockfotos nur als Lückenfüller**: ranken in der Google-Bildersuche praktisch nicht
   (Duplikat-Behandlung), schaden aber der normalen Web-Suche nicht.
4. **Technik:** Astro `<Picture />` mit AVIF+WebP, beschreibende deutsche Dateinamen,
   saubere Alt-Texte — deckt Googles komplette Bilder-SEO-Anforderungen ab.

---

## Teil 1: Was sagt die Evidenz? (verifizierte Befunde)

### Google-Guidelines Bilder-SEO (Konfidenz: hoch, Primärquellen)

- **Alt-Text ist das wichtigste Bild-Metadatum.** Kein Keyword-Stuffing — das kann als
  Spam gewertet werden. [Google Search Central¹]
- **Dateinamen kurz und beschreibend** (`kassensystem-gastronomie-tischplan.avif` statt
  `IMG00023.jpg`), Bilder **nahe relevantem Text** auf thematisch passenden Seiten platzieren,
  **scharfe, hochwertige Bilder** verwenden. [Google¹]
- **AVIF und WebP werden von Google voll unterstützt** (AVIF-Indexierung offiziell seit
  08/2024). AVIF spart teils >50 % gegenüber JPEG, WebP komprimiert meist besser als
  JPEG/PNG/GIF. [Google¹, web.dev², Google Blog³]
- **Lizenz-Metadaten** (Schema.org `license` oder IPTC) ermöglichen das "Licensable"-Badge
  in der Bildersuche — für Orderlyze als B2B-Site aber praktisch irrelevant (zielt auf
  Bild-Lizenzgeber). [Google⁴]
- **AI-Content-Policy:** Google verbietet AI-Bilder nicht; nur massenhaft generierter Content
  ohne Nutzwert verstößt gegen die Spam-Policy "scaled content abuse". Eine generelle
  IPTC-Kennzeichnungs-PFLICHT für AI-Bilder seitens Google wurde im Verifikationsprozess
  **widerlegt** (ist Empfehlung, keine Pflicht). [Google⁵]

### Stock vs. Original (Konfidenz: mittel)

- **John Mueller (Google):** Vielfach verwendete Stockfotos werden in der **Bildersuche als
  Duplikate** behandelt und ranken dort kaum ("if it's the same image as used in many places,
  it'll be harder"). Für die normale Web-Suche schaden sie nicht direkt. [SEJ⁶, SEO Südwest⁷]
- **Eigene Grafiken/Screenshots sind der einzige garantierte Weg zu einzigartigem Bildcontent.**
- Ehrlicher Negativ-Befund: Die populären **Conversion-Studien** ("echte Fotos +95 % Conversion",
  Medalia Art; "+48 %", Jason Thompson) haben die adversariale Verifikation **NICHT überstanden**
  (0-3 bzw. 1-2 widerlegt). Die Empfehlung pro Originalbilder stützt sich auf den
  SEO-Duplikat-Mechanismus und Googles Qualitäts-Guidelines, **nicht** auf belastbare
  Conversion-Zahlen.

### Rechtslage AT/DE (Konfidenz: mittel — Leitlinien noch im Entwurf)

- **EU AI Act, Stichtag 02.08.2026** (= in ~7 Wochen!): Fotorealistische KI-Bilder, die für
  echt gehalten werden könnten (auch fiktive, aber plausible Werbe-Szenen wie "Kellnerin mit
  Tablet im Café"), fallen unter die **Deepfake-Kennzeichnungspflicht** (Art. 50). **Erkennbar
  stilisierte AI-Illustrationen sind ausgenommen.** Die maschinenlesbare Markierung ist Sache
  des AI-Anbieters (Midjourney & Co.), die sichtbare Kennzeichnung Sache des Verwenders.
  [WKO⁸, Lausen⁹, AI Act Art. 50¹⁰]
- **Midjourney & Co. kommerziell:** Nutzung erlaubt mit bezahltem Abo. ABER: AI-Bilder genießen
  in DE/AT **keinen Urheberrechtsschutz** (Konkurrenz darf sie frei kopieren) und der **Nutzer
  haftet selbst** für etwaige IP-Verstöße des Outputs (Abmahnrisiko), nicht Midjourney.
  [e-recht24¹¹]
- **Adobe Stock / Shutterstock Standardlizenz:** zeitlich + räumlich unbegrenzt, kommerzielle
  Website-Nutzung mit unbegrenzten Views rechtssicher abgedeckt (Einschränkungen nur Print
  >500k / Merchandise). Lizenz überlebt Abo-Ende. [Lizenztexte¹²]

---

## Teil 2: Beschaffungs-Optionen im Überblick

| Option | Kosten (Richtwert)* | SEO-Wert | Rechtssicherheit | Geeignet für |
|---|---|---|---|---|
| **Vorhandene Doku-Screenshots** (hilfe.orderlyze.com) | **0 €** | ★★★ einzigartig | ★★★ eigene Inhalte | Features, So-funktioniert's, Hero |
| **Eigenes Fotoshooting** (bei echten Kunden in Bar/Café/Salon) | ~500–1.500 € einmalig | ★★★ einzigartig | ★★★ (Model-Release unterschreiben lassen) | Branchen-Seiten, Testimonials, Hero |
| **Geräte-Mockup-Tools** (Rotato, Shots.so, Mockuuups, Figma-Mockups) | 0–~100 € | ★★★ (mit eigenen Screenshots) | ★★ Tool-Lizenz prüfen | App-Darstellung auf iPhone/Tablet |
| **AI-Illustrationen, stilisiert** (Midjourney ~10–30 $/Monat) | gering | ★★ einzigartig | ★★ keine Schutzfähigkeit, ab 08/2026 ausgenommen von Kennzeichnung solange erkennbar stilisiert | Icons, abstrakte Feature-Grafiken, Hintergründe |
| **AI fotorealistisch** | gering | ★★ | ★ Kennzeichnungspflicht ab 02.08.2026, Haftungsrisiko | ⚠️ vermeiden |
| **Adobe Stock / Shutterstock** (Abo ~30–50 €/Monat o. Credits) | mittel | ★ Duplikat in Bildersuche | ★★★ Standardlizenz reicht für Web | Lückenfüller, generische Szenen |
| **Premium-Stock** (Stocksy, Death to Stock) | hoch (~50–100+ €/Bild) | ★★ seltener verwendet | ★★★ | hochwertige Branchen-Bilder, wenn kein Shooting |
| **Gratis-Stock** (Unsplash, Pexels, Pixabay) | 0 € | ☆ maximal dupliziert | ★★ Lizenz ok, aber keine Freigabe-Garantien (Personen/Marken) | Nur Notnagel |

\* Kosten-Richtwerte aus allgemeiner Marktkenntnis — die Recherche konnte zu konkreten Preisen
keine verifizierten Claims liefern (siehe "Offene Punkte"). Vor Kauf aktuelle Preise prüfen.

### Der Trumpf: hilfe.orderlyze.com (vorhanden, 0 €)

Inventur vom 2026-06-11 (Docusaurus, 75 Doku-Seiten):

| Ordner | Anzahl | Inhalt |
|---|---|---|
| `/screenshots/admin/` | 75 | Web-Dashboard (Verwaltung, 1440px+) |
| `/screenshots/app/` | 62 | Bonier-App: Handy **1206×2622**, Tablet **2420×1668** (Retina!) |
| `/screenshots/funktionen/` | 29 | Funktions-Screenshots |
| `/screenshots/buchungskonten/` | 15 | Buchhaltungs-Features |
| sonstige (einstellungen, berichte, export, kueche, home) | 13 | inkl. Dashboard-Hero 1440×1021 |
| **Gesamt** | **194** | |

Die Auflösungen reichen für Geräte-Mockups in Marketing-Qualität locker aus.
→ **Daniel stellt die Bilder bereit** (Repo/Ordner-Zugriff genügt, URLs sind bekannt).

---

## Teil 3: Konkrete Empfehlung pro Bild-Typ

| Einsatzort | Empfehlung | Quelle |
|---|---|---|
| **Hero (Startseite, /kassensystem …)** | App-Screenshot(s) auf iPhone-/Tablet-Mockup, evtl. kombiniert mit Dashboard | Doku-Screenshots + Mockup-Tool |
| **Feature-Sektionen** | Passender echter Screenshot pro Feature (Tischplan, Berichte, Kassenbuch…) — die Doku hat zu fast jedem Feature einen | Doku-Screenshots |
| **Branchen-Seiten** (Bar, Café, Restaurant, Friseur, Beauty) | Eigene Fotos von echten Kunden-Betrieben mit Orderlyze im Einsatz (stärkste Authentizität + einzigartig); Alternative: einheitlich stilisierte Illustrationen im Brand-Look (#0659A9/#DB9421) | Mini-Shooting / Illustrator oder stilisierte AI |
| **Testimonials** | Echte Kundenfotos (Einverständnis einholen!) — niemals Stock-Gesichter zu echten Zitaten | Kunden fragen |
| **Hardware-Seite** | Eigene Produktfotos der Drucker/Tablets (weißer Hintergrund, einheitlich) | Eigenes Foto oder Hersteller-Pressematerial (Lizenz prüfen) |
| **Icons/Deko** | Eigenes SVG-Icon-Set im Brand-Stil (einheitlich, winzig, SEO-neutral) | selbst/Designer/AI-stilisiert |
| **OG-Images (Social Preview)** | Pro Seite generiert: Brand-Farben + Seiten-Headline + Screenshot — Astro kann das beim Build automatisch erzeugen | Build-Pipeline |

### Technische Umsetzung in Astro (alles nativ vorhanden)

- `<Picture formats={['avif', 'webp']} />` → automatische Format-Generierung beim Build (Sharp)
- Alt-Attribut wird von Astro **erzwungen** (Build-Error wenn vergessen) — `alt=""` für Deko
- `width`/`height` automatisch bei lokalen Bildern → kein Layout-Shift (CLS = Core Web Vital,
  rankingrelevant)
- Dateinamen-Konvention: deutsch, beschreibend, mit Bindestrichen:
  `kassensystem-tischplan-tablet.png` → Astro generiert daraus die AVIF/WebP-Varianten
- Bilder als lokale Assets ins Repo (in `src/assets/`), nicht von Wix/extern hotlinken

## Offene Punkte / Grenzen der Recherche

- **Conversion-Evidenz fehlt:** Keine der populären A/B-Studien überlebte die Verifikation —
  "nachweislich beste Bilder für Conversion" kann seriös niemand belegen.
- **Konkrete Preise** (Stock-Abos, Shootings, Mockup-Tools) waren nicht verifizierbar —
  Richtwerte in der Tabelle vor Entscheidung aktuell prüfen.
- **EU-AI-Act-Leitlinien** zu Art. 50 sind Stand 06/2026 noch im Entwurf; "täuschend echt"
  ist nicht final definiert. Konservative Linie: fotorealistische AI-Bilder ganz vermeiden.
- Zu Gratis-Quellen (Unsplash & Co.) und alternativen AI-Generatoren (Flux, Imagen, DALL-E)
  überlebten keine Claims die Verifikation — Bewertung in der Tabelle ist konservative Ableitung.

## Quellen (verifiziert am 2026-06-11)

1. https://developers.google.com/search/docs/appearance/google-images
2. https://web.dev/learn/performance/image-performance
3. https://developers.google.com/search/blog/2024/08/happy-avifriday
4. https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata
5. https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
6. https://www.searchenginejournal.com/stock-photography-and-seo/373153/
7. https://www.seo-suedwest.de/4122-duplicate-content-google-aeussert-sich-zu-stock-photos-in-der-bildersuche.html
8. https://www.wko.at/gewerbe-handwerk/kennzeichnungspflicht-fuer-ki-inhalte
9. https://lausen.com/en/section-504-of-the-ai-act-what-organisations-must-label-as-ai-content-from-august-2026/
10. https://artificialintelligenceact.eu/article/50/
11. https://www.e-recht24.de/ki/13411-midjourney-urheberrecht.html
12. https://stock.adobe.com/license-terms · https://www.shutterstock.com/license
13. https://docs.astro.build/en/guides/images/
