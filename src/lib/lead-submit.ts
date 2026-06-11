/**
 * ⚠️ PLATZHALTER — Lead-/Formular-Submit.
 *
 * 🔴 OFFENE ENTSCHEIDUNG (planning/angebot-flow.md, PLAN.md Punkt 4):
 * Wie die neue Seite die Formulare ans Backend anbindet, ist bewusst offen:
 *   Variante 1: Wix-Site über die freie *.wixsite.com-URL weiter ansprechen
 *               (GET /_api/v1/access-tokens → POST /_api/wix-forms/v1/submit-form,
 *               Payload-Struktur und fieldIds dokumentiert in angebot-flow.md)
 *   Variante 2: Wix Headless REST API
 *               (POST https://www.wixapis.com/form-submission-service/v4/submissions, API-Key nötig)
 *   Variante 3: Eigenes Backend / CRM-Webhook
 *
 * Bis zur Entscheidung simuliert dieses Modul einen erfolgreichen Submit,
 * damit der Funnel (inkl. Redirect auf die Danke-Seite und Plausible-Goal)
 * vollständig testbar ist. NICHT live schalten, bevor die Anbindung steht!
 */

export interface LeadField {
  label: string;
  value: string;
}

export async function submitLead(formName: string, fields: LeadField[]): Promise<{ ok: boolean }> {
  // TODO(ANBINDUNG OFFEN): echten Submit gemäß gewählter Variante implementieren.
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
