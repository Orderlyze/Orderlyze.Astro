/**
 * Lead-/Formular-Submit.
 *
 * Angebotsformular: angebunden an den Orderlyze RestService
 * (POST /api/users/registerSellerAngebot, anonym). Der Service speichert die
 * Anfrage als OfferRequest und legt automatisch einen Testaccount an
 * (Entscheidung "Variante 3 — eigenes Backend", siehe planning/angebot-flow.md).
 *
 * Übrige Formulare (/bestellen, /testen) laufen weiterhin über den
 * Platzhalter submitLead(), bis deren Anbindung entschieden ist.
 */

import { API_BASE_URL } from '../config/site';

export interface LeadField {
  label: string;
  value: string;
}

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

/**
 * ⚠️ PLATZHALTER für die übrigen Formulare (/bestellen, /testen) —
 * Anbindung offen, siehe planning/angebot-flow.md.
 */
export async function submitLead(formName: string, fields: LeadField[]): Promise<{ ok: boolean }> {
  console.warn(
    `[Orderlyze] Formular "${formName}" — Submit ist ein PLATZHALTER (Anbindung offen, siehe planning/angebot-flow.md).`,
    fields
  );
  // Simulierte Latenz, damit Lade-Zustände der UI sichtbar/testbar sind
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { ok: true };
}

/** Plausible-Custom-Event feuern (window.plausible kommt vom Script-Snippet) */
export function trackGoal(name: string, props?: Record<string, string>) {
  const w = window as typeof window & {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  };
  w.plausible?.(name, props ? { props } : undefined);
}
