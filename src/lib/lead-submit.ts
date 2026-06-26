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

/** Plausible-Custom-Event feuern (window.plausible kommt vom Script-Snippet) */
export function trackGoal(name: string, props?: Record<string, string>) {
  const w = window as typeof window & {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  };
  w.plausible?.(name, props ? { props } : undefined);
}
