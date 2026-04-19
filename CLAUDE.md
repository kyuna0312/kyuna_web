# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev            # Dev server (Turbopack, 0.0.0.0)
yarn dev:webpack    # Dev server with webpack instead
yarn build          # Production build (webpack — required for Vercel)
yarn start          # Serve production build
yarn lint           # ESLint
yarn lint:fix       # ESLint auto-fix
yarn prettier       # Format all files
yarn format:check   # Check formatting
yarn type-check     # tsc --noEmit
yarn analyze        # Bundle analyzer (ANALYZE=true next build)
```

> `next build` must use `--webpack` flag (see `package.json`). Turbopack is dev-only.

## Architecture

**Next.js Pages Router** app. No `src/` directory — pages and components sit at repo root.

### Key directories

| Path | Purpose |
|------|---------|
| `pages/` | Routes: `index.tsx`, `projects.tsx`, `contact.tsx`, `404.tsx` |
| `components/` | All UI components; `layouts/` sub-dir has `main.tsx` (app shell) and `article.tsx` |
| `lib/` | `theme.ts` (Chakra theme), `fonts.ts` (Next.js font vars) |
| `types/` | TypeScript type definitions, one file per component group |
| `public/locales/{en,jp,mn}/` | i18n translation JSONs (`common.json` in each) |

### Stack

- **Chakra UI v2** — primary component/style system. Custom theme in `lib/theme.ts` with sakura/kawaii/lavender/mint palettes; dark mode default.
- **Framer Motion** — page transitions via `AnimatePresence` in `_app.tsx`; animation variants in `types/animations.ts`.
- **next-i18next** — three locales: `en` (default), `jp`, `mn`. Config in `next-i18next.config.js`. Every page needs `getStaticProps` with `serverSideTranslations`.
- **Vercel Analytics** — dynamically imported (SSR disabled) in `_app.tsx`.

### Data flow

Pages call `serverSideTranslations` → pass `_nextI18Next` in `pageProps` → `appWithTranslation` wraps the app → components call `useTranslation('common')`.

### Performance patterns

- Heavy client-only effects (`interactive-effects-v2`, `advanced-animations`, `projects-background-effects`) use `next/dynamic` with `ssr: false`.
- `components/performance-optimization.tsx` exports memoized wrappers.
- `components/optimized-image-v2.tsx` wraps `next/image` with lazy loading helpers.
- Webpack build splits into named chunks: `framework`, `chakra`, `motion`, `i18n`, `vendor`, `common`.

### PWA

`public/sw.js` + `public/manifest.json`. Service worker registers only in production (`_app.tsx`).

## Environment variables

Optional `.env.local`:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact form `mailto:` fallback |
| `NEXT_PUBLIC_LINKEDIN_URL` | Shows LinkedIn icon on contact page |

## i18n notes

- URL locale prefix: `/jp/...`, `/mn/...`; `/...` = English.
- Translation files: `public/locales/{en,jp,mn}/common.json`.
- Add new page → add `getStaticProps` exporting `serverSideTranslations(locale, ['common'])`.
