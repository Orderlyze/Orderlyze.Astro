// Listet Dateien aus dem Wix Media Manager via REST API.
// Key liegt in wixkey.txt (gitignored, NIEMALS committen).
import { readFileSync } from 'node:fs';

const key = readFileSync(new URL('../../wixkey.txt', import.meta.url), 'utf8').trim();
const SITE_IDS = {
  metaSiteId: 'c069009d-e1e7-40c2-82aa-c906e0cdad8c',
  siteId: 'd043142b-af45-4462-a9e0-685bd843c1b1',
};

async function tryList(label, siteId) {
  const res = await fetch('https://www.wixapis.com/site-media/v1/files?paging.limit=5', {
    headers: { authorization: key, 'wix-site-id': siteId },
  });
  const body = await res.text();
  console.log(`--- wix-site-id=${label} -> ${res.status}`);
  if (res.ok) {
    const j = JSON.parse(body);
    console.log(`Dateien gesamt (erste Seite): ${j.files?.length}`);
    for (const f of j.files ?? []) console.log(` ${f.mediaType}  ${f.displayName}  ${f.url?.slice(0, 80)}`);
  } else {
    console.log(body.slice(0, 300));
  }
  return res.ok;
}

for (const [label, id] of Object.entries(SITE_IDS)) {
  if (await tryList(label, id)) break;
}
