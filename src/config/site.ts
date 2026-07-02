/**
 * Zentrale Site-Konfiguration — alle pflegbaren Konstanten an einem Ort.
 * SEO-Tool-Anforderungen: siehe planning/seo-tools.md
 */

export const SITE = {
  name: 'Orderlyze',
  url: 'https://www.orderlyze.com',
  phone: '0800 400 4511',
  phoneHref: 'tel:08004004511',
  /** WhatsApp-Support: Anzeige-Nummer + wa.me-Link (ohne + und Leerzeichen) */
  whatsapp: '+43 677 61068190',
  whatsappHref: 'https://wa.me/4367761068190',
  email: 'office@orderlyze.com',
  helpUrl: 'https://hilfe.orderlyze.com',
} as const;

/**
 * Orderlyze RestService — Ziel für Formular-Submits (z. B. Angebotsformular).
 * Per PUBLIC_API_BASE_URL (Build-Env) übersteuerbar; Default ist Produktion.
 * Dev-Instanz (zum Testen): https://orderlyzeservicedev.azurewebsites.net
 */
export const API_BASE_URL =
  import.meta.env.PUBLIC_API_BASE_URL ?? 'https://orderlyzeservice.azurewebsites.net';

/** Plausible Analytics (cookielos, kein Consent-Banner nötig) */
export const PLAUSIBLE = {
  /* Neues Script-Format: Site-ID steckt in der URL (Site "orderlyze.com" der
     Self-hosted-Instanz, tools-vm). Tagged Events sind automatisch aktiv,
     Outbound-Links werden im Dashboard geschaltet (Site Settings → General →
     Site Installation). Nach DNS-Umstellung Host → analytics.orderlyze.com */
  src: 'https://orderlyze-tools.westeurope.cloudapp.azure.com/js/pa-bZJChA_ymwJKzDN3Gq8Fq.js',
} as const;

/**
 * Site-Verifizierung (planning/seo-tools.md).
 * Werte eintragen, sobald vorhanden — leere Strings rendern keinen Tag.
 */
export const VERIFICATION = {
  /** Ahrefs Webmaster Tools: <meta name="ahrefs-site-verification" …> */
  ahrefs: '',
  /** Bing Webmaster Tools: <meta name="msvalidate.01" …> */
  bing: '',
  /** Google Search Console (optional, Entscheidung offen): <meta name="google-site-verification" …> */
  google: '',
} as const;

/** Plausible-Event-Namen (in Plausible als Goals anlegen) */
export const EVENTS = {
  ctaAngebot: 'CTA Angebot',
  ctaPhone: 'Anruf',
  ctaWhatsApp: 'WhatsApp',
  angebotSubmit: 'Angebot abgeschickt',
} as const;
