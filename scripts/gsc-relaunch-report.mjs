/**
 * Google-Search-Console-Vergleich für den Astro-Relaunch vom 08.07.2026.
 *
 * Liest ausschließlich Daten. Credentials werden aus der von Git ignorierten
 * Datei .secrets/google-search-console.json geladen und niemals ausgegeben.
 *
 * Aufruf: npm run seo:gsc
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sign } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const credentialPath = join(root, '.secrets/google-search-console.json');
const siteUrl = 'https://www.orderlyze.com/';
const launchDate = new Date('2026-07-08T00:00:00Z');
const dataDelayDays = 3;

const monitoredPaths = [
  '/',
  '/friseur',
  '/funkbonieren',
  '/kassensystem',
  '/preise',
  '/ratgeber/kassensystem-kosten',
  '/ratgeber/kassensichv-tse-deutschland',
  '/ratgeber/registrierkassenpflicht-oesterreich',
];

const credentials = JSON.parse(readFileSync(credentialPath, 'utf8'));
for (const field of ['client_email', 'private_key', 'token_uri']) {
  if (!credentials[field]) throw new Error(`Credential-Feld fehlt: ${field}`);
}

const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
const nowSeconds = Math.floor(Date.now() / 1000);
const unsignedJwt = `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode({
  iss: credentials.client_email,
  scope: 'https://www.googleapis.com/auth/webmasters.readonly',
  aud: credentials.token_uri,
  iat: nowSeconds,
  exp: nowSeconds + 3600,
})}`;
const assertion = `${unsignedJwt}.${sign('RSA-SHA256', Buffer.from(unsignedJwt), credentials.private_key).toString('base64url')}`;

const tokenResponse = await fetch(credentials.token_uri, {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  }),
});
if (!tokenResponse.ok) throw new Error(`Google OAuth (${tokenResponse.status}): ${await tokenResponse.text()}`);
const { access_token: accessToken } = await tokenResponse.json();

const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
const iso = (date) => date.toISOString().slice(0, 10);
const addDays = (date, days) => {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
};
const minimum = (a, b) => (a < b ? a : b);
const percent = (value) => `${(value * 100).toFixed(2)} %`;

async function query(startDate, endDate, dimensions = []) {
  if (endDate < startDate) return [];
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      startDate: iso(startDate),
      endDate: iso(endDate),
      dimensions,
      rowLimit: 25000,
      dataState: 'final',
    }),
  });
  if (!response.ok) throw new Error(`Search Console API (${response.status}): ${await response.text()}`);
  return (await response.json()).rows ?? [];
}

const safeEnd = addDays(new Date(), -dataDelayDays);
safeEnd.setUTCHours(0, 0, 0, 0);
const windows = [
  { label: 'Baseline 28 Tage', start: addDays(launchDate, -28), end: addDays(launchDate, -1) },
  { label: 'Nach Relaunch – Tage 1–28', start: launchDate, end: addDays(launchDate, 27) },
  { label: 'Nach Relaunch – Tage 29–56', start: addDays(launchDate, 28), end: addDays(launchDate, 55) },
];

console.log(`\nOrderlyze GSC-Relaunchreport`);
console.log(`Relaunch: ${iso(launchDate)} · verfügbare finale Daten bis ca. ${iso(safeEnd)}`);
console.log('Hinweis: Query-Auswertungen sind wegen Googles Datenschutzfilter nie vollständig.\n');

for (const window of windows) {
  const effectiveEnd = minimum(window.end, safeEnd);
  const complete = safeEnd >= window.end;
  console.log(`${window.label}: ${iso(window.start)} bis ${iso(window.end)}${complete ? '' : ' (noch unvollständig)'}`);
  if (effectiveEnd < window.start) {
    console.log(`  Noch keine finalen Daten verfügbar.\n`);
    continue;
  }

  const [totalRows, pageRows] = await Promise.all([
    query(window.start, effectiveEnd),
    query(window.start, effectiveEnd, ['page']),
  ]);
  const total = totalRows[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  console.log(
    `  Verfügbar bis ${iso(effectiveEnd)}: ${total.clicks} Klicks · ${total.impressions} Impressionen · ` +
      `CTR ${percent(total.ctr)} · Position ${total.position.toFixed(1)}`
  );

  const byPage = new Map(pageRows.map((row) => [new URL(row.keys[0]).pathname.replace(/\/$/, '') || '/', row]));
  for (const path of monitoredPaths) {
    const row = byPage.get(path);
    if (!row) continue;
    console.log(
      `    ${path}: ${row.clicks} Klicks · ${row.impressions} Impr. · ` +
        `CTR ${percent(row.ctr)} · Pos. ${row.position.toFixed(1)}`
    );
  }
  console.log('');
}

console.log('Bewertungszeitpunkte:');
console.log(`  28-Tage-Fenster vollständig ab ${iso(addDays(launchDate, 31))}`);
console.log(`  56-Tage-Fenster vollständig ab ${iso(addDays(launchDate, 59))}`);
