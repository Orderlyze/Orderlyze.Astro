export type BranchCard = {
  title: string;
  body: string;
  image: string;
  bullets?: string[];
  cta?: { label: string; href: string; style?: 'solid' | 'outline' };
};

export type BranchDefinition = {
  slug: string;
  title: string;
  heroTitle: string;
  heroImage: string;
  introHeading: string;
  introBody?: string;
  description: string;
  cards: BranchCard[];
  ctaTitle?: string;
};

const gastroCards = (extraImage: string): BranchCard[] => [
  {
    title: 'Sekundenschnell kassieren',
    body: 'Mit Orderlyze kannst du Rechnungen in Sekundenschnelle erstellen, ganz ohne langes Einarbeiten. Produkte mit nur zwei Klicks hinzufügen, löschen und bearbeiten – inklusive Extras und Kommentaren. Schnell und unkompliziert abrechnen, Bestellungen stornieren. So geht Kassieren heute!',
    image: '/images/orderlyze/checkout-counter.jpg',
  },
  {
    title: 'Kinderleicht & mühelos bedienen',
    body: 'Ein Kassensystem, wie es sein sollte: Sofort zu verstehen, einfach zu bedienen, effizient und das Wichtigste, immer auf dem neuesten Stand. Orderlyze hilft dir, indem es deinen Alltag erleichtert und vereinfacht.',
    image: extraImage,
  },
  {
    title: 'Kartenzahlung? Kein Problem',
    body: 'Bargeldlos zu bezahlen wird immer beliebter und hat für dich und deine KundInnen viele Vorteile. Mit Orderlyze bist du für jede Zahlungsmethode gerüstet und kannst diverse Zahlungen ganz einfach entgegennehmen.',
    image: '/images/orderlyze/card-payment.jpg',
    bullets: ['EC, Maestro/V Pay, MasterCard und Visa', 'Apple Pay', 'Kontaktlose Zahlung per NFC'],
    cta: { label: 'Mehr erfahren', href: '/kartenzahlung/', style: 'outline' },
  },
  {
    title: 'Umsatz steigern mit Funkbonieren',
    body: 'Stift und Kellnerblock gehören der Vergangenheit an. Heute nimmst du die Bestellungen ganz einfach per Smartphone oder All-In-One Gerät auf. Mit einem Fingertipp werden die Bestellungen des Tisches sofort bei der Bar und in der Küche gedruckt. Weniger Wege, mehr Umsatz.',
    image: '/images/orderlyze/app-phone.png',
    cta: { label: 'Mehr erfahren', href: '/funkbonieren/', style: 'outline' },
  },
];

const serviceCards: BranchCard[] = [
  {
    title: 'Sekundenschnell kassieren',
    body: 'Mit Orderlyze kannst du Rechnungen blitzschnell erstellen, ganz ohne langes Einarbeiten. Produkte und Dienstleistungen mit nur zwei Klicks anlegen, bearbeiten und in Rechnung stellen.',
    image: '/images/orderlyze/checkout-counter.jpg',
  },
  {
    title: 'Kundenmanagement leicht gemacht',
    body: 'Behalte den Überblick über deine Stammkunden, Termine und Vorlieben. Mit Orderlyze führst du Kundendaten, Behandlungen und Verkäufe an einer Stelle.',
    image: '/images/orderlyze/customer-helene.jpg',
  },
  {
    title: 'Kartenzahlung? Kein Problem',
    body: 'Biete deinen KundInnen jede Zahlungsmethode an – schnell, einfach und sicher. Apple Pay, Maestro, Visa und mehr.',
    image: '/images/orderlyze/card-payment.jpg',
    bullets: ['EC, Maestro/V Pay, MasterCard und Visa', 'Apple Pay', 'Kontaktlose Zahlung per NFC'],
    cta: { label: 'Mehr erfahren', href: '/kartenzahlung/', style: 'outline' },
  },
  {
    title: 'Verwalte dein Unternehmen von überall',
    body: 'Mit orderlyze web hast du Berichte, Statistiken und Steuerexporte jederzeit griffbereit – egal ob am Smartphone, Tablet oder PC.',
    image: '/images/orderlyze/accounting.jpg',
    cta: { label: 'Mehr erfahren', href: '/verwaltung/', style: 'outline' },
  },
];

export const branches: BranchDefinition[] = [
  {
    slug: 'restaurant',
    title: 'Restaurant Kassensystem | Orderlyze',
    heroTitle: 'Das Nr 1. Kassensystem für dein Restaurant',
    heroImage: '/images/orderlyze/branch-restaurant.jpg',
    introHeading: 'Gastronomie – so einfach wie nie!',
    description: 'Das Nr 1 Kassensystem für dein Restaurant. Sekundenschnell kassieren, Funkbonieren und kostenloser Support – mit Orderlyze einfach. schnell. effizient.',
    cards: gastroCards('/images/orderlyze/checkout-counter.jpg'),
  },
  {
    slug: 'cafe',
    title: 'Cafe Kassensystem | Orderlyze',
    heroTitle: 'Das Nr 1. Kassensystem für dein Cafe',
    heroImage: '/images/orderlyze/branch-cafe.jpg',
    introHeading: 'Gastronomie – so einfach wie nie!',
    description: 'Das Nr 1 Kassensystem für dein Cafe. Sekundenschnell kassieren, Funkbonieren und kostenloser Support – mit Orderlyze einfach. schnell. effizient.',
    cards: gastroCards('/images/orderlyze/branch-cafe.jpg'),
  },
  {
    slug: 'bar',
    title: 'Bar Kassensystem | Orderlyze',
    heroTitle: 'Das Nr 1. Kassensystem für deine Bar',
    heroImage: '/images/orderlyze/branch-bar.jpg',
    introHeading: 'Gastronomie – so einfach wie nie!',
    description: 'Das Nr 1 Kassensystem für deine Bar. Sekundenschnell kassieren, Funkbonieren und kostenloser Support – mit Orderlyze einfach. schnell. effizient.',
    cards: gastroCards('/images/orderlyze/branch-bar.jpg'),
  },
  {
    slug: 'friseur',
    title: 'Friseur Kassensystem | Orderlyze',
    heroTitle: 'Das Kassensystem für deinen Friseursalon',
    heroImage: '/images/orderlyze/branch-friseur.jpg',
    introHeading: 'Dienstleistungen – einfach abgerechnet',
    description: 'Das Kassensystem für deinen Friseursalon. Sekundenschnell kassieren, Kundendaten verwalten und Berichte exportieren. 100% finanzamtkonform.',
    cards: serviceCards,
  },
  {
    slug: 'beauty',
    title: 'Beauty Kassensystem | Orderlyze',
    heroTitle: 'Das Kassensystem für dein Beauty Studio',
    heroImage: '/images/orderlyze/branch-beauty.jpg',
    introHeading: 'Dienstleistungen – einfach abgerechnet',
    description: 'Das Kassensystem für dein Beauty Studio. Sekundenschnell kassieren, Termine und Kundendaten verwalten. 100% finanzamtkonform.',
    cards: serviceCards,
  },
  {
    slug: 'sonstige',
    title: 'Kassensystem für Dienstleistungen | Orderlyze',
    heroTitle: 'Das Kassensystem für deine Dienstleistung',
    heroImage: '/images/orderlyze/branch-physio.jpg',
    introHeading: 'Dienstleistungen – einfach abgerechnet',
    description: 'Das Kassensystem für sonstige Dienstleistungen. Sekundenschnell kassieren, Berichte exportieren und Kundenmanagement an einer Stelle.',
    cards: serviceCards,
  },
];

export function branchBySlug(slug: string): BranchDefinition | undefined {
  return branches.find((b) => b.slug === slug);
}
