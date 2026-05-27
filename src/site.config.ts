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

export const NAVIGATION = [
  { label: 'Kassensystem', href: '/kassensystem/' },
  { label: 'Funktionen', href: '/funktionen/' },
  { label: 'Kartenzahlung', href: '/kartenzahlung/' },
  { label: 'Branchen', href: '/branchen/' },
  { label: 'Preise', href: '/preise/' },
] as const;
