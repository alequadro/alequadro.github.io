# alequadro.github.io

Personal portfolio site of Alessandro Quadrini - Senior DevOps & Platform Engineer.

Live at <https://alequadro.github.io>.

## Stack

- **[Astro](https://astro.build)** (static output, one small script for themes and navigation)
- Plain HTML/CSS - no UI frameworks, no build-time dependencies beyond Astro
- **GitHub Actions** → GitHub Pages

## Structure

```
src/
  components/Portfolio.astro # Shared page layout for both languages
  components/         # Shared contact links and small SVG icons
  i18n/en.json         # English content
  i18n/it.json         # Italian content
  i18n/index.ts        # Language routes and shared credential names/status
  layouts/Base.astro   # HTML shell: meta/CSP/OG tags, nav, theme toggle, global CSS
  pages/index.astro    # English page at /
  pages/it/index.astro # Italian page at /it/
public/
  theme.js             # Theme state + mobile menu enhancements (the only shipped JS)
  me.jpg, profile-portrait.png, favicon.svg
  fonts/               # Self-hosted Special Gothic and Source Sans 3, with licenses
.github/workflows/
  deploy.yml           # Build on push to main, deploy artifact to Pages
```

## How it was built

Deliberately minimal - a portfolio page doesn't need a SPA.

- **Localized content**: English and Italian copy, experience, and skills live in
  `src/i18n/en.json` and `src/i18n/it.json`. Official credential names and status are
  shared in `src/i18n/index.ts`. Both routes render the same `Portfolio.astro`
  component, keeping content changes separate from layout.
- **Languages**: English is the default at `/`; Italian is available at `/it/`.
  The header links to the other language without requiring JavaScript. Each page
  supplies its own document language, description, canonical URL, and alternate
  language links. The existing script preserves section fragments when switching;
  theme preferences continue to apply to both versions.
- **Typography**: self-hosted Special Gothic headings and Source Sans 3 body text.
  The editorial layout uses a name masthead, a portrait spread, and aligned section
  labels. Mobile reflows into a single reading column.
- **Theming**: warm light colors on `:root`, overridden by `[data-theme='dark']`.
  `public/theme.js` runs in `<head>` before first paint (no flash of wrong theme),
  persists the choice in `localStorage`. It's an external file because the CSP forbids
  inline scripts.
- **Portrait**: `profile-portrait.png` preserves the decoded pixels of the original
  400×400 `me.jpg`. The source photo has no brightness adjustment or AI retouching.
  The user accepted its native resolution. Impeccable's phase tracker remains at
  `plates/open` because its automated check requires a 561px source; independent
  production screenshots, responsive checks, and visual review cover the finished UI.
- **Progressive disclosure**: native `<details>` elements keep section navigation,
  full job narratives, and expired certification history available without JavaScript.
  The script closes the mobile menu after navigation and supports Escape.
- **Security headers**: strict CSP (`default-src 'self'`, `object-src 'none'`,
  `frame-ancestors 'none'`), `referrer` policy, canonical URL, and OG tags are set in
  the base layout.
- **Accessibility**: skip link, semantic landmarks, synchronized `aria-pressed` on the
  theme toggle, visible keyboard focus, reduced-motion support, and mobile section
  navigation. Theme selection remains usable when browser storage is unavailable.
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
