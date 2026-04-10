# Kyuna — Portfolio

Multilingual personal site (English, Japanese, Mongolian) built with **Next.js** (Pages Router), **Chakra UI**, **Framer Motion**, and **next-i18next**.

**Live:** [kyuna-web.vercel.app](https://kyuna-web.vercel.app) · [amane312.vercel.app](https://amane312.vercel.app) (alternate front)  
**GitHub:** [@kyuna0312](https://github.com/kyuna0312)

## Features

- **i18n** — URL-based locales: `en`, `jp`, `mn`
- **Theming** — Light/dark mode, glass-style UI, responsive layout
- **Performance** — Dynamic imports for heavy client-only effects, image optimization
- **SEO** — Meta tags, Open Graph, Twitter cards, `hreflang`, JSON-LD `Person`
- **PWA** — `manifest.json` and service worker

## Prerequisites

- Node.js 18+

## Setup

```bash
git clone https://github.com/kyuna0312/kyuna_web.git
cd kyuna_web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Optional (create `.env.local`):

| Variable | Purpose |
| -------- | ------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (default in code: Vercel URL) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address used in the contact form `mailto:` fallback |
| `NEXT_PUBLIC_LINKEDIN_URL` | If set, shows a LinkedIn icon on the contact page |

## Scripts

```bash
npm run dev      # Development
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
npm run prettier # Format
npm run analyze  # Bundle analyzer (ANALYZE=true next build)
```

## Project layout

- `pages/` — Routes (`index`, `projects`, `contact`, …)
- `components/` — UI, layouts, SEO (`seo-head.js`), performance helpers
- `public/locales/{en,jp,mn}/` — `common.json` translations
- `lib/theme.js` — Chakra theme

## Author

**Kyuna / 霜花** — [GitHub](https://github.com/kyuna0312) · [YouTube @amarihana](https://www.youtube.com/@amarihana) · [X](https://x.com/kyuna0312) · [Instagram](https://www.instagram.com/kyuna0312/)

Profile README: [github.com/kyuna0312/kyuna0312](https://github.com/kyuna0312/kyuna0312)

MIT License.
