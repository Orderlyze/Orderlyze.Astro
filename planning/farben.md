# Farben der Live-Webseite orderlyze.com

Erhoben am 2026-06-11 direkt aus dem gerenderten DOM (Playwright, Startseite + /kassensystem):
Wix-Theme-Variablen (`--color_0` bis `--color_65`) plus Häufigkeitsanalyse der tatsächlich
verwendeten Farben (Hintergründe, Texte, Rahmen) aller Elemente.

## Markenfarben (die wichtigsten, tatsächlich verwendet)

| Farbe | Hex | RGB | Verwendung |
|---|---|---|---|
| **Brand-Blau (CTA)** | `#0659A9` | 6, 89, 169 | Primäre Buttons ("KOSTENLOSES ANGEBOT", "ANGEBOT ANFORDERN"), border-radius 5px, weiße Schrift; auch als Rahmenfarbe |
| **Heading-Blau (hell)** | `#6EA4CA` | 110, 164, 202 | Standardfarbe fast aller Überschriften H1–H4 (Raleway) |
| **Text-Blau (mittel)** | `#39729B` | 57, 114, 155 | Fließtexte/Absätze in Blau, sekundäre H3 |
| **Orange (Akzent)** | `#DB9421` | 219, 148, 33 | Große Akzent-Kartenflächen/Sektionen (Bild-Text-Karten) |
| **Dunkel-Navy** | `#062134` | 6, 33, 52 | Wix-Theme-Hauptfarbe (color_0), dunkle Flächen/Hero-Bereiche |
| **Hellgrau-Blau (Flächen)** | `#F6F9FC` | 246, 249, 252 | Helle Karten-/Sektionshintergründe |

Wichtig: `#0659A9` und `#DB9421` sind **nicht** Teil der Wix-Theme-Palette, sondern direkt
zugewiesen — es sind aber die prägenden Markenfarben der Seite.

## Textfarben

| Farbe | Hex | RGB | Verwendung |
|---|---|---|---|
| Schwarz | `#000000` | 0, 0, 0 | Standard-Fließtext (häufigste Textfarbe) |
| Dunkelgrau | `#212121` | 33, 33, 33 | Fließtext (zweithäufigste) |
| Weiß | `#FFFFFF` | 255, 255, 255 | Text auf dunklen/blauen/orangen Flächen, H1 im Hero |
| Grau | `#565662` | 86, 86, 98 | Sekundärtexte |

## Flächen-/Hintergrundfarben

| Farbe | Hex | RGB | Verwendung |
|---|---|---|---|
| Weiß | `#FFFFFF` | 255, 255, 255 | Seitenhintergrund |
| Hellgrau-Blau | `#F6F9FC` | 246, 249, 252 | Karten/Sektionen hell |
| Hellgrau | `#F4F4F4` | 244, 244, 244 | Neutrale Flächen |
| Grau | `#B9BBBD` | 185, 187, 189 | Graue Bild-Karten |
| Orange | `#DB9421` | 219, 148, 33 | Akzent-Karten |

## Wix-Theme-Palette (CSS-Variablen)

Die 5 Basisfarben des Themes (color_0–5):
`#062134` (Navy), `#FFFFFF`, `#000000`, `#FFCB05` (Gelb), `#0088CB` (Blau), `#ED1C24` (Rot)
— Gelb und Rot tauchen im sichtbaren Design praktisch nicht auf.

Aktiv genutzte Abstufungen aus der Blau-Reihe:

| Variable | Hex | RGB |
|---|---|---|
| color_15 / 37 / 45 / 46 (dunkel) | `#0C3C60` | 12, 60, 96 |
| color_14 / 40 / 47 (mittel) | `#39729B` | 57, 114, 155 |
| color_13 / 39 / 43 (hell, Headings) | `#6EA4CA` | 110, 164, 202 |
| color_12 / 38 (sehr hell) | `#D1E0EB` | 209, 224, 235 |
| color_9 / 10 (Link-Blau) | `#1C95EF` | 28, 149, 239 |
| color_18 / 41 / 48–61 (Türkis) | `#1EABC7` | 30, 171, 199 |
| color_17 / 42 (Türkis hell) | `#7DCADA` | 125, 202, 218 |

Vollständige Variablen-Liste (color_0–65) bei Bedarf erneut auslesbar — Skript siehe unten.

## Typografie (Bonus, da miterhoben)

| Font | Verwendung |
|---|---|
| **Raleway** | Alle Überschriften H1–H6 (Markenschrift) |
| **Open Sans** | Fließtext (häufigste Schrift) |
| roboto-bold / roboto-thin | Einzelne Text-Elemente |
| Arial | Fallback / Wix-Standardelemente (Cookie-Banner, Menüs) |

Beobachtete Heading-Größen (Desktop 1280px Viewport): H1 61px / 33px, H2 48–50px, H3 20–27px.
Hinweis: Im Repo gab es bereits Pixel-Matching-Arbeit gegen orderlyze.com (Git-Historie:
"two brand-blues + exact Raleway sizes per orderlyze.com section") — dortige Werte beziehen
sich auf 1440px-Viewport.

## Empfehlung für Astro (Design-Tokens)

```css
:root {
  --color-brand: #0659A9;        /* CTA-Buttons */
  --color-heading: #6EA4CA;      /* Überschriften */
  --color-heading-dark: #39729B; /* sekundäre Überschriften / blauer Text */
  --color-accent: #DB9421;       /* Orange Akzentflächen */
  --color-navy: #062134;         /* dunkle Sektionen */
  --color-surface: #F6F9FC;      /* helle Karten */
  --color-text: #212121;
  --color-text-muted: #565662;
  --radius-button: 5px;
}
```

## Reproduzierbarkeit

Die Erhebung lief per Playwright `browser_evaluate` auf der Live-Seite:
1. `--color_N`-CSS-Variablen von `documentElement` lesen (Theme-Palette)
2. Über alle Elemente `getComputedStyle` → backgroundColor/color/borderColor zählen (Ist-Nutzung)
3. Headings/Buttons gezielt inspizieren (Zuordnung Farbe → Element)
