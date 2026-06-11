# /angebot — Formular-Flow und Backend-Requests

Dokumentation des Angebots-Funnels auf https://www.orderlyze.com/angebot — die einzige echte
Logik der Webseite. Die neue Astro-Seite muss **exakt dieselben Backend-Calls** machen, damit
Angebots-Anfragen weiterhin im (Wix-)Backend landen.

Aufgenommen am 2026-06-11 per Playwright-Durchklick (Testdaten: "TEST Relaunch - bitte ignorieren").
Machbarkeit ohne Browser/Wix-Frontend verifiziert mit `scripts/test-angebot-submit.mjs`
→ **200 OK, submissionId `556b8b8d-0515-496b-a811-dec7b5814f86`**.

## Ablauf der Seite (Wizard / "Diashow")

Ein mehrstufiger Slide-Wizard, alles client-seitig, **kein Backend-Call bis zum finalen Submit**:

1. Slide: "Das Nr. 1 Kassensystem" (Intro) → Weiter
2. Slide: "Höhere Umsätze" (Marketing) → Weiter
3. Slide: "Mehr Zeit für deine KundInnen" (Marketing) → Weiter
4. Slide: "Sorgenfrei arbeiten" (Marketing) → Weiter
5. Slide **Formular 1** "Infos zu deinem Unternehmen":
   - Unternehmensname (Textfeld)
   - Branche (Dropdown: `Dienstleistung (z.b. Friseur, Beauty, Physio)` | `Gastronomie (z.b. Bar, Cafe, Restaurant)`)
   - Unternehmensstandort (Dropdown: `Österreich` | `Deutschland`)
6. Slide **Formular 2** "Was benötigst du?":
   - Wieviele Mitarbeiter*innen sind im Betrieb beschäftigt? (Dropdown, z. B. `0-4`)
   - Wie viele Standgeräte benötigst du? (Tablet Kasse) (Zahlenfeld)
   - Wieviele mobile Geräte möchtest du verwenden? (Zahlenfeld)
   - Wieviele Bar- oder Küchendrucker benötigst du? (Zahlenfeld)
7. Slide **Formular 3** "gleich erhältst du dein Angebot":
   - Vor- und Nachname (Textfeld)
   - E-Mail Adresse (Textfeld, validiert)
   - Telefon (Textfeld, validiert — `+43 660 0000000` wurde abgelehnt, `06601234567` akzeptiert)
   - Button "Zum Angebot" → **Submit**
8. Nach erfolgreichem Submit: Redirect auf **`/dank-angebot`**
   (Seite steht NICHT in der Sitemap — muss in der neuen Seite ebenfalls existieren!)

## Die zwei relevanten Backend-Requests

Alles andere im Network-Log ist Wix-Infrastruktur, Analytics und Tracking (siehe unten).
Roh-Log: `angebot-network-requests-raw.md`.

### Request 1: Session-/App-Token holen

```
GET https://www.orderlyze.com/_api/v1/access-tokens
```

- Keine Authentifizierung nötig (öffentlich), `access-control-allow-origin: *`
- Response (JSON): `{ hs, visitorId, svSession, ctToken, mediaAuthToken, metaSiteId, apps: { <appDefId>: { instance, intId, accessToken } } }`
- Benötigt wird: `apps["14ce1214-b278-a7e4-1373-00cebd1bef7c"].instance`
  (= Instance-Token der **Wix Forms App**, appDefId `14ce1214-b278-a7e4-1373-00cebd1bef7c`)
- Token ist signiert und zeitlich begrenzt → **pro Submission frisch holen**, nicht cachen/hardcoden.

### Request 2: Formular absenden

```
POST https://www.orderlyze.com/_api/wix-forms/v1/submit-form
```

Header:

```
authorization: <instance-Token aus Request 1>
content-type: application/json
x-wix-client-artifact-id: wix-form-builder
```

Body (exakt diese Struktur, Werte aus dem Test-Durchlauf):

```json
{
  "formProperties": { "formName": "Angebot", "formId": "comp-l4432eze1" },
  "emailConfig": { "sendToOwnerAndEmails": { "emailIds": [] } },
  "viewMode": "Site",
  "fields": [
    { "fieldId": "comp-me9ncog34", "label": "Unternehmensname",
      "company": { "value": "TEST Relaunch - bitte ignorieren" } },
    { "fieldId": "comp-me9ncogj5", "label": "Branche",
      "address": { "value": "Gastronomie (z.b. Bar, Cafe, Restaurant)", "tag": "other" } },
    { "fieldId": "comp-me9ncogp4", "label": "Unternehmensstandort",
      "address": { "value": "Österreich", "tag": "other" } },
    { "fieldId": "comp-me9nr2or", "label": "Wie viele Standgeräte benötigst du? (Tablet Kasse)",
      "additional": { "value": { "string": "1" } } },
    { "fieldId": "comp-me9nsewv", "label": "Wieviele mobile Geräte möchtest du verwenden?",
      "additional": { "value": { "string": "1" } } },
    { "fieldId": "comp-me9nsvp5", "label": "Wieviele Bar- oder Küchendrucker benötigst du?",
      "additional": { "value": { "string": "1" } } },
    { "fieldId": "comp-me9nkk9r", "label": "Wieviele Mitarbeiter*innen sind im Betrieb beschäftigt?",
      "additional": { "value": { "string": "0-4" } } },
    { "fieldId": "comp-l445dver", "label": "Vor- und Nachname",
      "lastName": { "value": "TEST Relaunch Daniel" } },
    { "fieldId": "comp-l445gfle", "label": "E-Mail Adresse",
      "email": { "value": "d.hufnagl@codelisk.com", "tag": "other" } },
    { "fieldId": "comp-l44h3b2e", "label": "Telefon",
      "phone": { "value": "06601234567", "tag": "other" } }
  ],
  "labelKeys": ["contacts.contacted-me", "custom.multistep-registration", "custom.kontakt-aufnehmen-2"]
}
```

Response: `200 OK` mit `{ "submissionId": "<uuid>" }`

Eigenheiten des Payloads (Wix-Field-Mapping, genau so beibehalten):
- Branche und Standort werden als Typ `address` gesendet (nicht als Auswahl-Feld)
- Der Name geht als `lastName` (es gibt kein separates Vorname-Feld)
- Die Zahlenfelder und das Mitarbeiter-Dropdown gehen als `additional.value.string`
- Die `fieldId`s (`comp-…`) sind fixe Wix-Komponenten-IDs des Formulars `comp-l4432eze1`

## Machbarkeit / Replikation in Astro

✅ **Funktioniert standalone** — verifiziert mit `scripts/test-angebot-submit.mjs` (Node, plain fetch):
1. `GET /_api/v1/access-tokens` → Token extrahieren
2. `POST /_api/wix-forms/v1/submit-form` mit Token + Payload → `200 OK` + submissionId

Es gibt keine CAPTCHA-, Cookie- oder CSRF-Hürde. Der Call kann aus dem Browser (CORS ist offen)
oder server-seitig (Astro Endpoint/Action) gemacht werden. **Empfehlung: server-seitig** über einen
Astro-API-Endpoint, dann sind fieldIds/Token-Handling im Frontend unsichtbar und Spam besser kontrollierbar.

## ⚠️ Wichtige Einschränkung (das "was nicht geht")

> **🔴 OFFENE ENTSCHEIDUNG — NICHT UMSETZEN, BEVOR DER NUTZER ENTSCHIEDEN HAT.**
> Wie die neue Astro-Seite die API anspricht (Variante 1, 2 oder 3 unten), ist bewusst
> offen gelassen und muss vom Nutzer (Daniel) entschieden werden. Bis dahin bleibt die
> Formular-Anbindung in der neuen Seite unimplementiert bzw. nur als Platzhalter.

Beide Endpoints sind **relative Wix-Endpoints auf www.orderlyze.com** und werden von der
Wix-Infrastruktur bedient, solange die Domain auf Wix zeigt. **Sobald die Domain auf die neue
Astro-Seite umzieht, existieren `/_api/...` auf www.orderlyze.com nicht mehr.**

Optionen (Entscheidung des Nutzers ausstehend):
1. **Wix-Site unter der freien `*.wixsite.com`-URL weiter ansprechen** — dieselben Endpoints
   existieren dort (`https://<account>.wixsite.com/<site>/_api/...`); URL muss noch ermittelt
   und getestet werden, solange die Wix-Site nicht gelöscht wird.
2. **Wix Headless / REST API**: `POST https://www.wixapis.com/form-submission-service/v4/submissions`
   mit API-Key — sauberer offizieller Weg, erfordert API-Key-Erstellung im Wix-Dashboard.
3. **Eigenes Backend**: Submission per E-Mail/CRM-Webhook selbst verarbeiten und Wix ganz ablösen
   (langfristig am saubersten, aber Änderung des bestehenden Lead-Workflows).

## Beobachtete Bugs der Live-Seite

- Beim Playwright-Durchlauf wurde im Standort-Dropdown `Österreich` ausgewählt, im Payload kam
  trotzdem `Deutschland` an — das Wix-Dropdown übernimmt programmatische `selectOption`-Änderungen
  nicht in seinen State. Für echte Nutzer per Maus vermutlich kein Problem, aber ein Hinweis,
  dass der Wizard-State fragil ist.
- Telefon-Validierung lehnt Formate mit Leerzeichen/`+` ab (`+43 660 0000000` → invalid).

## Tracking-Calls beim Submit (optional zu replizieren)

Beim Submit/Seitenwechsel feuern zusätzlich (für Conversion-Tracking relevant, nicht für die Angebots-Logik):
- `POST https://www.orderlyze.com/_serverless/analytics-reporter/facebook/event` (Wix→Facebook CAPI)
- Google Ads Conversion (`google.com/pagead/form-data/663646460`, `/ccm/form-data/…` via GTM)
- Wix-interne Telemetrie (`frog.wix.com`, `panorama.wixapps.net`) — irrelevant

Beim Relaunch: GTM/GA4/Facebook-Pixel-Setup übernehmen, sonst gehen die Conversion-Daten der
Google-Ads-Kampagnen verloren (Tag-Manager-Config: `663646460` / GTM auf Seite eingebunden).

## Offene Punkte

- [x] `/dank-angebot` in die Seitenliste der neuen Webseite aufnehmen — erledigt 2026-06-11
      (gescrapt nach `content/pages/dank-angebot.md`, eingetragen in `sitemaps/additional-pages.xml`)
- [ ] **🔴 ENTSCHEIDUNG DES NUTZERS AUSSTEHEND:** Wie wird die API angesprochen —
      Variante 1 (wixsite.com-URL), 2 (Wix REST API mit API-Key) oder 3 (eigenes Backend)?
      Bis zur Entscheidung offen lassen, nichts implementieren.
- [ ] Test-Submissions im Wix-Dashboard löschen (2 Stück: "TEST Relaunch - bitte ignorieren",
      "TEST API-Replikation - bitte ignorieren", beide mit E-Mail d.hufnagl@codelisk.com)
