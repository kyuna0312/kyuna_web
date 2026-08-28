# 霜花 — kyuna_web

Personal portfolio of [kyuna0312](https://github.com/kyuna0312) — trilingual
(EN · 日本語 · Монгол), built with Next.js and Chakra UI around the
**Magia paper** design system.

**Live:** [kyuna-web.vercel.app](https://kyuna-web.vercel.app)

## Stack

- **Next.js 15** (pages router) · React 18
- **Chakra UI v2** — semantic tokens, dark mode by default
- **Framer Motion** — page-load entrances, reduced-motion respected
- **next-i18next** — `en` / `jp` / `mn` locales

## Design system

"Magia paper" — derived from [madoka](https://github.com/kyuna0312/madoka),
a 魔法少女まどか☆マギカ CSS study. Tokens live in `lib/theme.js`:

| Token | Role |
|-------|------|
| `paper` / `pane` | page ground and raised surface (light: warm paper, dark: night violet) |
| `ink` / `rime` | headings and body text |
| `ice` / `bloom` / `gold` | the three accents — one leads per section |

Light-mode accents meet WCAG AA (≥ 4.5:1); interactive targets are 44px.

## Development

Requires Node 18–22 (`next build` hangs on Node 26).

```bash
yarn          # install
yarn dev      # http://localhost:3000
yarn build    # production build
yarn lint     # ESLint
```

## Structure

```
components/   # navbar, footer, frost (Magia primitives), seo-head, layouts
pages/        # index, projects, contact, 404
public/
  locales/    # en / jp / mn translation files
lib/theme.js  # Magia paper Chakra theme
```

## i18n

Translations live in `public/locales/<locale>/common.json`. To add a locale,
create that file and add the locale code to `next-i18next.config.js`.

## License

[MIT](LICENSE)

---

<p align="center"><sub>❄️ 霜花 — frost flower: the ice that blooms on winter glass.</sub></p>
