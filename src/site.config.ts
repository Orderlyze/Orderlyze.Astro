export const SITE = {
  name: 'Orderlyze',
  title: 'Orderlyze Kassensystem - einfach. schnell. effizient.',
  description:
    'Orderlyze ist das einfache, schnelle und effiziente Kassensystem fuer Gastronomie, Dienstleistungen und Handel. 100% finanzamtkonform.',
  locale: 'de_DE',
  url: 'https://orderlyze.github.io',
  repository: 'https://github.com/Orderlyze/Orderlyze.Astro',
  image: '/images/orderlyze/hero-system.png',
};

export type NavItem = {
  label: string;
  href: string;
  children?: ReadonlyArray<{ label: string; href: string }>;
};

export const NAVIGATION: ReadonlyArray<NavItem> = [
  {
    label: 'Kassensystem',
    href: '/kassensystem/',
    children: [
      { label: "So funktioniert's", href: '/so-funktionierts/' },
      { label: 'Funktionen', href: '/funktionen/' },
      { label: 'Kartenzahlung', href: '/kartenzahlung/' },
      { label: 'Funkbonieren', href: '/funkbonieren/' },
      { label: 'Verwaltung', href: '/verwaltung/' },
      { label: 'Datenexport für Steuerberater', href: '/datenexport-steuerberater/' },
    ],
  },
  {
    label: 'Branchen',
    href: '/branchen/',
    children: [
      { label: 'Bar', href: '/bar/' },
      { label: 'Cafe', href: '/cafe/' },
      { label: 'Restaurant', href: '/restaurant/' },
      { label: 'Friseur', href: '/friseur/' },
      { label: 'Beauty', href: '/beauty/' },
      { label: 'Sonstige', href: '/sonstige/' },
    ],
  },
  { label: 'Preise', href: '/preise/' },
  { label: 'Hilfe', href: '/so-funktionierts/' },
];
