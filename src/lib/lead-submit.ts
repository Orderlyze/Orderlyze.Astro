/**
 * Lead-/Formular-Submit.
 *
 * Alle Lead-Formulare (/angebot, /bestellen, /testen) sind an den Orderlyze
 * RestService angebunden (POST /api/users/registerSellerAngebot, anonym). Der
 * Service speichert die Anfrage als OfferRequest und legt automatisch einen
 * Testaccount an.
 *
 * Spam-Signale (Honeypot + Ausfüllzeit) werden hier zentral ergänzt, damit jedes
 * Formular, das <HoneypotField /> rendert, automatisch geschützt ist — kein Caller
 * muss sie selbst mitgeben.
 */

import { API_BASE_URL } from '../config/site';

/**
 * Zeit ab der ersten echten Nutzer-Interaktion (Fokus/Eingabe), NICHT ab Seiten-Load:
 * sonst würde ein schneller Autofill-Nutzer fälschlich als Bot eingestuft. Bleibt null,
 * bis ein Mensch das Formular anfasst; ein Bot, der das Script gar nicht ausführt, sendet
 * ohnehin keinen Wert.
 */
let firstInteractionAt: number | null = null;
if (typeof document !== 'undefined') {
  const mark = () => {
    if (firstInteractionAt === null) firstInteractionAt = Date.now();
  };
  document.addEventListener('focusin', mark, { once: true, capture: true });
  document.addEventListener('input', mark, { once: true, capture: true });
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
  /* Honeypot (HoneypotField.astro) zentral auslesen und die Ausfüllzeit ergänzen. Submits
     mit befülltem Honeypot oder unter der Mindestzeit behandelt der Service als Bot. */
  const honeypot =
    typeof document !== 'undefined'
      ? (document.querySelector('input[name="website"]') as HTMLInputElement | null)?.value ?? ''
      : '';
  const payload: Record<string, unknown> = {
    ...data,
    website: honeypot,
  };
  if (firstInteractionAt !== null) {
    payload.formFillDurationMs = Date.now() - firstInteractionAt;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/registerSellerAngebot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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
