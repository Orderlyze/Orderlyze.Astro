export type ThermoRolle = {
  slug: string;
  name: string;
  pack: string;
  description: string;
  price: string;
  oldPrice?: string;
};

export const thermoRollen: ThermoRolle[] = [
  {
    slug: '25-thermorollen',
    name: '25 Thermorollen',
    pack: '25 Stück / 80 × 80 × 12 mm',
    description: 'Hochwertige Thermorollen für Bondrucker. Phenolfrei und langlebig.',
    price: '24,90€',
    oldPrice: '27,90€',
  },
  {
    slug: 'thermorollen-30',
    name: '30 Thermorollen',
    pack: '30 Stück / 80 × 80 × 12 mm',
    description: 'Standard-Bondrucker-Rollen für deinen täglichen Einsatz. Beste Druckqualität.',
    price: '28,90€',
    oldPrice: '32,90€',
  },
  {
    slug: 'thermorollen-50',
    name: '50 Thermorollen',
    pack: '50 Stück / 80 × 80 × 12 mm',
    description: 'Vorratspack für Vielnutzer. Phenolfrei und schnell trocknend.',
    price: '46,90€',
    oldPrice: '52,90€',
  },
  {
    slug: '30-thermorollen-ökopapier',
    name: '30 Thermorollen Ökopapier',
    pack: '30 Stück / 80 × 80 × 12 mm',
    description: 'Nachhaltige Ökopapier-Bonrollen. Recyclingfähig, ohne Bisphenol-A.',
    price: '32,90€',
    oldPrice: '36,90€',
  },
];

export const thermoBySlug = (slug: string) => thermoRollen.find((r) => r.slug === slug);
