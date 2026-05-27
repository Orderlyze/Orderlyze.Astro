---
name: orderlyze-source-rebuilder
description: Use this skill when rebuilding, expanding, or refactoring the Astro marketing website from orderlyze.com as the source brand and SEO reference, especially for German Kassensystem pages, branch pages, feature pages, and conversion-focused SEO.
---

# Orderlyze Source Rebuilder

## Use With

Use after `$astro-seo-governor` when the requested page should be based on `orderlyze.com`, Orderlyze positioning, German Kassensystem search intent, or the existing brand/site structure.

Read `references/orderlyze-com-baseline.md` before writing copy, routes, or page clusters.

## Required Workflow

1. Treat `https://www.orderlyze.com/` as the current brand/source reference, but re-fetch it when precision matters because live copy can change.
2. Build German-first pages unless the user explicitly requests another locale.
3. Preserve the core positioning: `Orderlyze Kassensystem`, `Registrierkasse`, simple setup, fast checkout, efficient daily work, and finance-office compliance.
4. Convert source navigation into scalable route clusters:
   - `/kassensystem/`
   - `/funktionen/`
   - `/kartenzahlung/`
   - `/funkbonieren/`
   - `/verwaltung/`
   - `/datenexport-steuerberater/`
   - `/branchen/gastronomie/`
   - `/branchen/cafe/`
   - `/branchen/restaurant/`
   - `/branchen/friseur/`
   - `/branchen/beauty/`
   - `/preise/`
   - `/hilfe/`
5. For every route, create content metadata first: title, description, primary keyword, funnel stage, canonical path, owner, status, proof source.
6. Prefer reusable section components over one-off page compositions.
7. Add FAQ schema to commercial intent pages when the source page gives enough answerable information.

## SEO Copy Rules

- Titles should lead with the search phrase, not the brand, unless it is the homepage.
- Descriptions should include the result and a trust signal, usually `finanzamtkonform`, `kostenloses Angebot`, support, or Steuerberater export.
- CTAs should map to source intent: `Kostenloses Angebot anfordern`, `Mehr erfahren`, `Shop`, or phone contact.
- Do not invent legal, tax, pricing, integration, or certification claims. If a claim is not visible on the source or provided by the user, mark it as needing proof.

## Output Standard

For each created cluster, report:

- Source claim used.
- Route and canonical path.
- Target keyword.
- Schema type.
- Missing proof or assets.
