#!/usr/bin/env python3
"""Create side-by-side comparison images and resize for inspection."""
import os
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

COMPARE = Path('tmp/compare')
THUMBS = Path('tmp/compare/sidebyside')
THUMBS.mkdir(exist_ok=True)

THUMB_W = 700  # per side

pairs = {}
for f in sorted(COMPARE.glob('*-ref.jpg')):
    name = f.name.removesuffix('-ref.jpg')
    local = COMPARE / f'{name}-local.jpg'
    if local.exists():
        pairs[name] = (f, local)

print(f'found {len(pairs)} pairs')

for name, (ref, local) in pairs.items():
    out = THUMBS / f'{name}.jpg'
    if out.exists() and out.stat().st_mtime > max(ref.stat().st_mtime, local.stat().st_mtime):
        continue
    a = Image.open(ref)
    b = Image.open(local)
    # Resize to same width while keeping aspect
    ar = THUMB_W / a.width
    br = THUMB_W / b.width
    a = a.resize((THUMB_W, int(a.height * ar)), Image.LANCZOS)
    b = b.resize((THUMB_W, int(b.height * br)), Image.LANCZOS)
    h = max(a.height, b.height)
    margin = 28
    canvas = Image.new('RGB', (THUMB_W * 2 + margin * 3, h + 60), 'white')
    canvas.paste(a, (margin, 50))
    canvas.paste(b, (margin * 2 + THUMB_W, 50))
    d = ImageDraw.Draw(canvas)
    try:
        font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 22)
    except OSError:
        font = ImageFont.load_default()
    d.text((margin, 12), f'orderlyze.com — {name}', fill='black', font=font)
    d.text((margin * 2 + THUMB_W, 12), f'local — {name}', fill='black', font=font)
    canvas.save(out, 'JPEG', quality=70)
    print(f'wrote {out} ({a.height} vs {b.height})')

print('done')
