# alequadro.github.io

Personal portfolio site of Alessandro Quadrini - Senior DevOps & Platform Engineer.

Live at <https://alequadro.github.io>.

## Stack

- **[Astro](https://astro.build)** (static output, zero JS shipped except one theme script)
- Plain HTML/CSS - no UI frameworks, no build-time dependencies beyond Astro
- **GitHub Actions** → GitHub Pages

## Structure

```
src/
  layouts/Base.astro   # HTML shell: meta/CSP/OG tags, nav, theme toggle, global CSS
  pages/index.astro    # Single page: hero, about, experience, skills, certs, education
public/
  theme.js             # Theme bootstrap + toggle (the only JS on the site)
  me.jpg, favicon.svg
.github/workflows/
  deploy.yml           # Build on push to main, deploy artifact to Pages
```

## How it was built

Deliberately minimal - a portfolio page doesn't need a SPA.

- **Content as data**: experience, skills, and certifications are plain JS arrays in
  `index.astro`'s frontmatter, rendered with `.map()`. Editing the resume means editing
  data, not markup.
- **Theming**: CSS custom properties on `:root`, overridden by `[data-theme='light']`.
  `public/theme.js` runs in `<head>` before first paint (no flash of wrong theme),
  persists the choice in `localStorage`. It's an external file because the CSP forbids
  inline scripts.
- **Security headers**: strict CSP (`default-src 'self'`, `object-src 'none'`,
  `frame-ancestors 'none'`), `referrer` policy, canonical URL, and OG tags are set in
  the base layout.
- **Accessibility**: skip link, semantic landmarks, `aria-pressed` on the theme toggle,
  responsive down to mobile via a single breakpoint.
- **User-site config**: since this is a `<user>.github.io` repo, the site is served from
  root - `astro.config.mjs` only sets `site`, no `base` path.

## Development

```sh
npm ci          # install
npm run dev     # dev server with HMR
npm run build   # static build → dist/
npm run preview # serve the production build locally
```

## Deployment

Push to `main`. The workflow in `.github/workflows/deploy.yml` runs
`npm ci && npm run build`, then publishes `dist/` via `actions/deploy-pages`
using OIDC (`id-token: write`) - no stored secrets. Requires Pages to be set to
"GitHub Actions" as the source in repo settings.
