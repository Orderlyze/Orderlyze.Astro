# Orderlyze Astro Marketing Site

SEO-first Astro foundation for the Orderlyze marketing website.

## Stack

- Astro 6 with static output
- Tailwind CSS 4 via `@tailwindcss/vite`
- Astro Content Collections with `glob()` loaders
- `@astrojs/sitemap` for sitemap generation
- MDX-ready content layer
- GitHub Actions for CI and GitHub Pages deployment
- Project skills in `.codex/skills/`

## Commands

Use Node `22.22.3` from `.nvmrc`.

```sh
npm install
npm run dev
npm run verify
```

`npm run verify` runs Astro type checks, production build, and the SEO artifact verifier.

## SEO Foundation

- Reusable metadata and JSON-LD live in `src/components/Seo.astro`.
- Shared layout and navigation live in `src/layouts/BaseLayout.astro`.
- Page metadata and editorial governance live in `src/content/seoPages/`.
- The sitemap is generated during `astro build`.
- `public/robots.txt` points crawlers to the GitHub Pages sitemap URL.

## Deployment

The repo includes:

- `.github/workflows/ci.yml` for checks on push and pull request.
- `.github/workflows/deploy-pages.yml` for GitHub Pages deployment from `dist`.

The default deploy target is `https://orderlyze.github.io/Orderlyze.Astro/`.
