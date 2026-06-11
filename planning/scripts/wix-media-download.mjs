// Lädt alle Dateien aus planning/wix-media-inventory.json herunter
// nach planning/assets/wix-media/{images,videos}/
// Bereits vorhandene Dateien werden übersprungen (fortsetzbar).
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const inventory = JSON.parse(readFileSync(join(root, 'wix-media-inventory.json'), 'utf8'));
const outImages = join(root, 'assets', 'wix-media', 'images');
const outVideos = join(root, 'assets', 'wix-media', 'videos');
mkdirSync(outImages, { recursive: true });
mkdirSync(outVideos, { recursive: true });

function sanitize(name) {
  return name
    .normalize('NFC')
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
}

const usedNames = new Set();
function uniqueName(base, ext) {
  let candidate = `${base}${ext}`;
  let i = 2;
  while (usedNames.has(candidate.toLowerCase())) candidate = `${base} (${i++})${ext}`;
  usedNames.add(candidate.toLowerCase());
  return candidate;
}

const EXT_BY_TYPE = {
  'image/jpeg': '.jpg', 'image/png': '.png', 'image/gif': '.gif', 'image/webp': '.webp',
  'image/avif': '.avif', 'image/svg+xml': '.svg', 'video/mp4': '.mp4', 'video/quicktime': '.mov',
};

let done = 0, skipped = 0, failed = 0;
const failures = [];

async function download(f) {
  const isVideo = f.type === 'VIDEO';
  const dir = isVideo ? outVideos : outImages;
  let base = sanitize(f.name.replace(/\.[a-z0-9]{2,4}$/i, ''));
  // Extension: aus displayName, sonst aus URL, sonst später aus Content-Type
  let ext = (f.name.match(/\.[a-z0-9]{2,4}$/i)?.[0] ?? extname(new URL(f.url).pathname)).toLowerCase();
  if (ext === '.file' || !ext) ext = '';

  const res = await fetch(f.url);
  if (!res.ok) { failed++; failures.push(`${res.status} ${f.name} ${f.url}`); return; }
  if (!ext) ext = EXT_BY_TYPE[res.headers.get('content-type')?.split(';')[0]] ?? (isVideo ? '.mp4' : '.jpg');

  const filename = uniqueName(base, ext);
  const target = join(dir, filename);
  if (existsSync(target) && statSync(target).size > 0) { skipped++; return; }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(target, buf);
  done++;
  if (done % 25 === 0) console.log(`  ${done}/${inventory.length} ...`);
}

const CONCURRENCY = 8;
let idx = 0;
async function worker() {
  while (idx < inventory.length) {
    const f = inventory[idx++];
    try { await download(f); } catch (e) { failed++; failures.push(`ERR ${f.name}: ${e.message}`); }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
console.log(`FERTIG: ${done} geladen, ${skipped} übersprungen, ${failed} fehlgeschlagen`);
if (failures.length) console.log(failures.join('\n'));
