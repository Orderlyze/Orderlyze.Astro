// Feasibility test: replicate the /angebot form submission without the Wix frontend.
// This is exactly what the new Astro site needs to do.
const BASE = 'https://www.orderlyze.com';
const FORMS_APP_ID = '14ce1214-b278-a7e4-1373-00cebd1bef7c'; // Wix Forms (form-builder)

// 1. Get a visitor session + app instance tokens
const tokensRes = await fetch(`${BASE}/_api/v1/access-tokens`, {
  headers: { 'user-agent': 'Mozilla/5.0' },
});
const tokens = await tokensRes.json();
const auth = tokens.apps[FORMS_APP_ID].instance;
console.log('1. access-tokens:', tokensRes.status, '— forms instance token erhalten');

// 2. Submit the form with the exact payload shape captured from the live site
const payload = {
  formProperties: { formName: 'Angebot', formId: 'comp-l4432eze1' },
  emailConfig: { sendToOwnerAndEmails: { emailIds: [] } },
  viewMode: 'Site',
  fields: [
    { fieldId: 'comp-me9ncog34', label: 'Unternehmensname', company: { value: 'TEST API-Replikation - bitte ignorieren' } },
    { fieldId: 'comp-me9ncogj5', label: 'Branche', address: { value: 'Gastronomie (z.b. Bar, Cafe, Restaurant)', tag: 'other' } },
    { fieldId: 'comp-me9ncogp4', label: 'Unternehmensstandort', address: { value: 'Österreich', tag: 'other' } },
    { fieldId: 'comp-me9nr2or', label: 'Wie viele Standgeräte benötigst du? (Tablet Kasse)', additional: { value: { string: '1' } } },
    { fieldId: 'comp-me9nsewv', label: 'Wieviele mobile Geräte möchtest du verwenden?', additional: { value: { string: '1' } } },
    { fieldId: 'comp-me9nsvp5', label: 'Wieviele Bar- oder Küchendrucker benötigst du?', additional: { value: { string: '1' } } },
    { fieldId: 'comp-me9nkk9r', label: 'Wieviele Mitarbeiter*innen sind im Betrieb beschäftigt?', additional: { value: { string: '0-4' } } },
    { fieldId: 'comp-l445dver', label: 'Vor- und Nachname', lastName: { value: 'TEST API-Replikation' } },
    { fieldId: 'comp-l445gfle', label: 'E-Mail Adresse', email: { value: 'd.hufnagl@codelisk.com', tag: 'other' } },
    { fieldId: 'comp-l44h3b2e', label: 'Telefon', phone: { value: '06601234567', tag: 'other' } },
  ],
  labelKeys: ['contacts.contacted-me', 'custom.multistep-registration', 'custom.kontakt-aufnehmen-2'],
};

const submitRes = await fetch(`${BASE}/_api/wix-forms/v1/submit-form`, {
  method: 'POST',
  headers: {
    authorization: auth,
    'content-type': 'application/json',
    'x-wix-client-artifact-id': 'wix-form-builder',
    'user-agent': 'Mozilla/5.0',
  },
  body: JSON.stringify(payload),
});
console.log('2. submit-form:', submitRes.status, submitRes.statusText);
console.log('   response:', (await submitRes.text()) || '(leer)');
