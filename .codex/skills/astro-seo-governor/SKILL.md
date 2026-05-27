---
name: astro-seo-governor
description: Use this skill before creating, auditing, or refactoring any scalable Astro marketing website where SEO correctness, content collections, structured data, sitemap coverage, GitHub deployment, and deterministic Codex verification are required.
---

# Astro SEO Governor

## Use First

Use this skill before writing page code when the user asks for an Astro marketing site, SEO, scalable page clusters, GitHub Pages, content collections, structured data, or Codex-safe website generation.

## Research Baseline

Read `references/research-baseline.md` when you need the source-backed rationale behind these rules.

Core assumptions:

- Astro config must define a production `site`; use `base` when deployed below a path.
- Public pages must route through one SEO component for title, description, canonical, robots, Open Graph, Twitter, and JSON-LD.
- Content that can become a page cluster belongs in typed Content Collections.
- `@astrojs/sitemap` and `robots.txt` are mandatory for public marketing sites.
- Generated pages must stay static-first unless interactivity clearly needs an island.
- Verification must run in CI and locally before commit.

## Required Workflow

1. Detect the project shape: `astro.config.*`, `package.json`, `src/content.config.*`, `src/pages/`, layouts, and existing SEO components.
2. Define the page cluster before implementation: target intent, canonical path, owner, funnel stage, proof source, and internal links.
3. Add or update typed content entries before page templates.
4. Render every public page through the shared SEO component and base layout.
5. Add schema that matches the page type: `Organization`, `WebSite`, `WebPage`, `SoftwareApplication`, `Product`, `FAQPage`, `BreadcrumbList`, `Article`, or `CaseStudy`.
6. Use `import.meta.env.BASE_URL` for public assets so GitHub Pages subpath deploys do not break.
7. Run `npm run verify`. If deeper SEO inspection is needed, run:

```sh
node .codex/skills/astro-seo-governor/scripts/audit-astro-site.mjs
```

## Hard Gates

Do not commit a public page if any of these fail:

- Missing or localhost-only `site` in Astro config.
- No sitemap integration.
- No shared SEO component.
- Missing canonical, description, OG image, or JSON-LD on rendered HTML.
- More than one H1, or no H1.
- Images without meaningful `alt` text unless decorative.
- Content collection page metadata not typed.
- `npm run verify` fails.

## Output Standard

When finishing work, report:

- Files changed.
- Page clusters or content models added.
- SEO gates run and result.
- Any non-file task still needed, such as Search Console submission or real customer proof.
