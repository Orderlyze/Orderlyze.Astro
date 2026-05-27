---
name: orderlyze-growth-system
description: Use this skill when planning scalable Orderlyze marketing architecture, page clusters, proof assets, content operations, or GitHub-based release workflows for the Astro website.
---

# Orderlyze Growth System

## Strategy

Build the website as a search-led publishing system, not a one-off landing page.

1. Group work into page clusters: product, solutions, comparisons, case studies, resources, and conversion pages.
2. Each cluster needs a content model, route pattern, proof source, and internal-linking target.
3. Prioritize pages that can show operational proof: time saved, fewer handoffs, faster publishing, better governance, or fewer failed checks.
4. Keep implementation changes small enough to review and commit after each coherent layer.

## GitHub Workflow

- Use feature commits for foundation, content model, page UI, verification, and deployment.
- CI must run `npm ci`, `npm run check`, `npm run build`, and SEO verification.
- GitHub Pages deploys should use Node from `.nvmrc` and upload the built `dist` folder.

## Quality Bar

- Every new public route must have metadata, canonical URL, sitemap inclusion, and accessible heading structure.
- Prefer Astro static rendering, Content Collections, and small CSS modules before adding client JavaScript.
- Use generated or real raster assets for primary marketing visuals; avoid empty placeholder blocks.
