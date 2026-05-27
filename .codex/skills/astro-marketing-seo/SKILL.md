---
name: astro-marketing-seo
description: Use this skill when building or extending the Orderlyze Astro marketing website with SEO-first pages, content collections, metadata, structured data, sitemap coverage, and release checks.
---

# Astro Marketing SEO

Use `$astro-seo-governor` first for hard gates and deterministic auditing. Use this skill for the local implementation pattern in this repository.

## Workflow

1. Start with search intent: define the primary keyword, funnel stage, canonical path, and page owner before writing UI.
2. Add or update the relevant `src/content/seoPages/*.json` entry so metadata is typed and reviewable.
3. Use `src/layouts/BaseLayout.astro` and `src/components/Seo.astro` for public pages instead of hand-rolling head tags.
4. Include JSON-LD when the page represents an organization, product, article, case study, FAQ, or software application.
5. Keep pages statically renderable unless a clear interactive feature requires an island.
6. Run `npm run verify` before committing.

## Page Requirements

- One H1 per page.
- Title should be specific, readable, and below 60 characters where practical.
- Description should describe the page value and stay within the schema range in `src/content.config.ts`.
- Canonical path must start with `/`.
- Public assets must work with `import.meta.env.BASE_URL` so GitHub Pages subpath deploys remain valid.
- Avoid publishing pages without sitemap coverage.

## Expansion Patterns

- Solution pages: one content entry per search intent plus a dedicated route under `src/pages/solutions/`.
- Case studies: store proof in `src/content/caseStudies/` and expose measurable outcomes in structured data.
- Comparison pages: document the compared alternative, search intent, and claim evidence before writing UI.
