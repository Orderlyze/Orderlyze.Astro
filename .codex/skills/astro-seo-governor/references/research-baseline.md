# Research Baseline

Use this as source-backed context, not as a long checklist to repeat in final answers.

## Astro Official Docs

- Astro config `site` is used for sitemap generation and canonical URLs. `base` is required when deploying below a path such as GitHub Pages project pages.
- Astro adds SEO metadata with normal HTML tags in page heads; the config is not a generic metadata store.
- `@astrojs/sitemap` generates `sitemap-index.xml` and numbered sitemap files during build and requires a deployed site URL.
- Astro Content Collections use `src/content.config.ts`, `defineCollection()`, loaders such as `glob()`, and Zod schemas to type structured content.

## GitHub / Community Research

- `jdevalk/skills` includes `astro-seo`, `astro-github-actions`, `metadata-check`, and related skills. Its Astro SEO skill audits head metadata, JSON-LD graph, content collections, OG images, sitemaps/indexing, agent discovery, performance, redirects, and build validation.
- `hellotham/hello-astro` positions a scalable Astro starter around MDX/Markdown content, search, Open Graph, Twitter Cards, Schema/JSON-LD, RSS, robots, sitemap, performance, and type safety.
- Astro SEO Blog-style templates emphasize static-first generation, file-based content, MDX, full-text search, i18n readiness, automatic sitemap, meta tags, Open Graph, Twitter Cards, and structured data.
- SaaS marketing templates such as `sitepins/powerai-astro` show the need for many reusable pages/components, but this project should keep SEO primitives centralized instead of copying page-local head tags.

## Codex Rule

Prefer project-local deterministic checks over relying on memory. If a rule matters for SEO, add it to a script, CI, or schema where practical.
