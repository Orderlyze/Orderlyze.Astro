/**
 * Lead-/Formular-Submit.
 *
 * Alle Lead-Formulare (/angebot, /bestellen, /testen) sind an den Orderlyze
 * RestService angebunden (POST /api/users/registerSellerAngebot, anonym). Der
 * Service speichert die Anfrage als OfferRequest und legt automatisch einen
 * Testaccount an (Entscheidung "Variante 3 — eigenes Backend", siehe
 * planning/angebot-flow.md).
 *
 * Hinweis: /testen sollte eigentlich registerSellerWixTestAccount nutzen, der
 * Endpoint ist aber serverseitig defekt (500 NullReference) — bis zum Backend-Fix
 * läuft auch /testen über registerSellerAngebot.
 */

import { API_BASE_URL } from '../config/site';

/** Payload für POST /api/users/registerSellerAngebot (RegisterSellerAngebot-DTO) */
export interface AngebotFormData {
  name: string;
  email: string;
  telefon: string;
  unternehmensname: string;
  branche: string;
  land: string;
  mitarbeiter: string;
  standgeraete: number;
  mobilgeraete: number;
  drucker: number;
}

export async function submitAngebot(data: AngebotFormData): Promise<{ ok: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/registerSellerAngebot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error(`[Orderlyze] Angebot-Submit fehlgeschlagen (HTTP ${res.status})`);
    }
    return { ok: res.ok };
  } catch (err) {
    console.error('[Orderlyze] Angebot-Submit fehlgeschlagen', err);
    return { ok: false };
  }
}

/* ── Website-Konfigurator (Sofort-Angebot) ─────────────────────────────────
 * POST /api/WebsiteOffer erstellt Lead + Testaccount wie registerSellerAngebot,
 * löst die Paket-/Hardware-Auswahl serverseitig gegen SevDesk-Produkte auf und
 * versendet das Angebot inkl. Bestelllink (E-Mail + WhatsApp). Mode "instant"
 * liefert Angebot + Link direkt zurück; "manual" = Fallback auf den bisherigen
 * Prozess (Vertrieb erstellt das Angebot, Kunde bekommt es per E-Mail).
 * Antwort-Felder sind PascalCase (Newtonsoft DefaultContractResolver).
 */

export interface WebsiteOfferPayload extends AngebotFormData {
  paket: string;
  addons: string[];
  hardware: { key: string; quantity: number }[];
}

export interface WebsiteOfferPosition {
  ProductName: string;
  Quantity: number;
  PriceNet: number;
  PriceGross: number;
  TaxRate: number;
  IsRecurring: boolean;
  IsYearlyPayment: boolean;
}

export interface WebsiteOfferResult {
  Mode: 'instant' | 'manual';
  QuoteNumber?: string;
  Link?: string;
  EmailSent?: boolean;
  WhatsAppSent?: boolean;
  Positions?: WebsiteOfferPosition[];
}

export async function submitWebsiteOffer(
  data: WebsiteOfferPayload,
): Promise<{ ok: boolean; result?: WebsiteOfferResult }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/WebsiteOffer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error(`[Orderlyze] WebsiteOffer-Submit fehlgeschlagen (HTTP ${res.status})`);
      return { ok: false };
    }
    return { ok: true, result: (await res.json()) as WebsiteOfferResult };
  } catch (err) {
    console.error('[Orderlyze] WebsiteOffer-Submit fehlgeschlagen', err);
    return { ok: false };
  }
}

export interface WebsiteOfferCatalogEntry {
  Key: string;
  DisplayName: string;
  Branche?: string;
  PriceNet: number;
  PriceGross: number;
  Available: boolean;
}

export interface WebsiteOfferCatalog {
  Packages: WebsiteOfferCatalogEntry[];
  Addons: WebsiteOfferCatalogEntry[];
  Hardware: WebsiteOfferCatalogEntry[];
  ActivationFeeNet?: number;
  ActivationFeeGross?: number;
}

/** Live-Preise für den Konfigurator; null bei Netzwerk-/Serverfehler (dann statische Preise nutzen) */
export async function fetchWebsiteOfferCatalog(): Promise<WebsiteOfferCatalog | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/WebsiteOffer/Catalog`);
    if (!res.ok) return null;
    return (await res.json()) as WebsiteOfferCatalog;
  } catch {
    return null;
  }
}

/** Plausible-Custom-Event feuern (window.plausible kommt vom Script-Snippet) */
export function trackGoal(name: string, props?: Record<string, string>) {
  const w = window as typeof window & {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  };
  w.plausible?.(name, props ? { props } : undefined);
}
