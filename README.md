# Orderlyze.Astro

Nachbau von [www.orderlyze.com](https://www.orderlyze.com) als [Astro](https://astro.build)-Web-App.
Alle Seiten sind pixelgenau (Referenz: Desktop 1440 px) der Original-Wix-Seite nachempfunden.

## Seiten (25)

- **Start**: `/`
- **Kassensystem**: `/preise`, `/so-funktionierts`, `/funktionen`, `/kartenzahlung`, `/funkbonieren`, `/verwaltung`, `/datenexport-steuerberater`
- **Branchen**: `/branchen`, `/cafe`, `/bar`, `/restaurant`, `/friseur`, `/beauty`, `/sonstige`
- **Hilfe & Support**: `/support`, `/erste-schritte`, `/drucker-verbinden`, `/zahlungsarten`, `/berichte`, `/tischplan`
- **Sonstiges**: `/angebot` (Funnel, Schritt 1 statisch), `/agb`, `/impressum`, `/datenschutzerklaerung`

Noch nicht gebaut (im Original verlinkt): Shop (`/thermorollen`, `/cart-page`, `/bestellen`) sowie
die tieferen Support-Tutorials (`/kassenbuch`, `/gutscheine`, `/stammkunden`, `/umsaetze`,
`/dynamisches-produkt`, `/buchungskonten`, `/rechnungen-bearbeiten`, `/gaengesystem`,
`/farbeinstellungen`, `/bewirtungsbeleg`, `/abholung`, `/pfand`, `/steuer-aendern`,
`/uebermittlung-finanzamt`, `/bluetooth-drucker`, `/cloud-drucker`, `/sunmi-drucker`).

## Stack

- **Astro 5** (statischer Build, `astro:assets`-Bildoptimierung, Sitemap)
- **TypeScript** (strict)
- **Fonts**: Roboto (Headings), Open Sans (Body), Raleway – lokal über `@fontsource/*`
- **Prettier** mit `prettier-plugin-astro`

## Entwicklung

```sh
npm install
npm run dev      # Dev-Server auf http://localhost:4321
npm run build    # Produktions-Build nach ./dist
npm run preview  # Build lokal testen
npm run check    # astro check (Typen + Diagnostik)
npm run format   # Prettier
```

## Struktur

```
src/
  consts.ts             # Site-Konfiguration (Telefon, Navigation, Social Links)
  styles/global.css     # Design-Tokens (Farben, Fonts, Buttons, Akzentlinien)
  layouts/
    BaseLayout.astro      # HTML-Gerüst, Fonts, SEO
    BranchenPage.astro    # Layout der 6 Branchenseiten (gastro/service Variante)
    TutorialLayout.astro  # Hilfe-Artikel (blaues Titelband + Artikel)
    LegalLayout.astro     # AGB/Impressum/Datenschutz
  components/
    SiteHeader.astro    # Header mit Dropdown-Navigation, Telefon, CTA, Shop
    Hero.astro          # Registrierkasse-Hero mit Bewertungen & Badges
    TrustCards.astro    # „Bei uns bist du einfach richtig“
    Sekundenschnell.astro
    Kinderleicht.astro
    Kartenzahlung.astro
    Branchen.astro      # 6 Branchen-Karten
    CtaBanner.astro     # Wiederverwendbarer Angebots-Banner (Parallax)
    FeatureSplit.astro  # Geräte / Buchhaltung / Support (Panel + Bild)
    Funktionen.astro    # Funktions-Kacheln
    Testimonials.astro  # Carlo M. / Helene S.
    SiteFooter.astro
    WhatsAppButton.astro
    icons/              # Inline-SVGs (Check, Anführungszeichen)
  assets/images/        # Original-Assets (werden beim Build zu WebP optimiert)
  pages/index.astro     # Startseite
```

## Design-Tokens

| Token        | Wert      | Verwendung                              |
| ------------ | --------- | --------------------------------------- |
| `--c-blue`   | `#0659A9` | Buttons, Akzentwörter, Unterstreichungen |
| `--c-check`  | `#3567FD` | Häkchen-Icons                            |
| `--c-panel`  | `#F6F9FC` | Helle Panel-Flächen                      |
| `--c-footer` | `#0C090D` | Footer                                   |

Headings: Roboto Bold (h1 61 px, h2 44–50 px, Karten-h3 20–27 px) · Body: Open Sans 17–19 px mit hoher Zeilenhöhe.
