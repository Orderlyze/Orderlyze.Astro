/**
 * Navigation der neuen Seite (PLAN.md „Navigation der neuen Seite“):
 * wie alte Seite, minus Shop und Hilfe-Bereich; Hilfe zeigt extern auf
 * hilfe.orderlyze.com.
 */
import { SITE } from './site';

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  href: string;
  children?: NavLink[];
}

export const NAV: NavGroup[] = [
  {
    label: 'Kassensystem',
    href: '/kassensystem',
    children: [
      { label: "So funktioniert's", href: '/so-funktionierts' },
      { label: 'Funktionen', href: '/funktionen' },
      { label: 'Kartenzahlung', href: '/kartenzahlung' },
      { label: 'Funkbonieren', href: '/funkbonieren' },
      { label: 'Verwaltung', href: '/verwaltung' },
      { label: 'Datenexport für Steuerberater', href: '/datenexport-steuerberater' },
    ],
  },
  {
    label: 'Branchen',
    href: '/branchen',
    children: [
      { label: 'Bar', href: '/bar' },
      { label: 'Cafe', href: '/cafe' },
      { label: 'Restaurant', href: '/restaurant' },
      { label: 'Friseur', href: '/friseur' },
      { label: 'Beauty', href: '/beauty' },
      { label: 'Sonstige', href: '/sonstige' },
    ],
  },
  { label: 'Preise', href: '/preise' },
  { label: 'Ratgeber', href: '/ratgeber' },
  { label: 'Kostenlos testen', href: '/testen' },
];

export const NAV_EXTRA: NavLink[] = [
  { label: 'Hilfe', href: SITE.helpUrl, external: true },
  // Login für Bestandskunden (Suchintention „orderlyze login" — GSC: Pos 1, bisher 0 Klicks mangels Link)
  { label: 'Login', href: 'https://web.orderlyze.com/', external: true },
];

export const FOOTER_NAV = {
  kassensystem: [
    { label: 'Preise', href: '/preise' },
    { label: 'Kostenlos testen', href: '/testen' },
    { label: "So funktioniert's", href: '/so-funktionierts' },
    { label: 'Funktionen', href: '/funktionen' },
    { label: 'Kartenzahlung', href: '/kartenzahlung' },
    { label: 'Funkbonieren', href: '/funkbonieren' },
    { label: 'Verwaltung', href: '/verwaltung' },
    { label: 'Hardware', href: '/hardware' },
  ],
  branchen: [
    { label: 'Cafe', href: '/cafe' },
    { label: 'Bar', href: '/bar' },
    { label: 'Restaurant', href: '/restaurant' },
    { label: 'Friseursalon', href: '/friseur' },
    { label: 'Beauty', href: '/beauty' },
    { label: 'Sonstige Dienstleistungen', href: '/sonstige' },
  ],
  compliance: [
    { label: 'Finanzamtkonform', href: '/finanzamt-konform' },
    { label: 'Technische Sicherheitseinrichtung', href: '/technische-sicherheitseinrichtung' },
    { label: 'Datenexport für Steuerberater', href: '/datenexport-steuerberater' },
    { label: 'Kassensystem-Ratgeber', href: '/ratgeber' },
    { label: 'Hilfe & Support', href: SITE.helpUrl, external: true },
    { label: 'Login – orderlyze web', href: 'https://web.orderlyze.com/', external: true },
  ],
  rechtliches: [
    { label: 'AGB', href: '/agb' },
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutzerklärung', href: '/datenschutzerklaerung' },
  ],
} as const;
