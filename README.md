# TypeWhisper Website

[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v1/monitor/2lx87.svg)](https://uptime.betterstack.com/?utm_source=status_badge)

Landing page and documentation site for [TypeWhisper](https://www.typewhisper.com).

## Stack

- Astro 6 + React 19 + TypeScript
- Vite 7
- TailwindCSS 4
- Radix UI + shadcn/ui components

## Design

All visual decisions (tokens, typography, color, motion, brand motif) are documented in [DESIGN.md](DESIGN.md). Read it before making UI changes.

## Languages

The site is fully localized in English and German. All routes are prefixed with the locale (`/en/`, `/de/`). The root `/` redirects based on the browser's language preference.

Translations live in `src/i18n/locales/en/` and `src/i18n/locales/de/`. Locale-specific screenshots are stored in `public/screenshots/de/` and `public/screenshots/en/`.

## Development

```bash
npm ci
npm run dev
```

The documentation search uses a generated Pagefind index. Run `npm run build` once before testing search in development, and rebuild after changing indexed content. The build copies the index to the ignored `public/pagefind/` directory for the dev server. Responsive screenshots are generated automatically by both `dev` and `build`.

## Build

```bash
npm run build
npm run preview
```

## Pages

All routes exist under both `/en/` and `/de/`.

| Route | Description |
|-------|-------------|
| `/{locale}/` | Landing page with features, engine comparison, download CTAs |
| `/{locale}/docs` | Documentation hub |
| `/{locale}/docs/search` | Documentation and add-on search with platform filters |
| `/{locale}/setup` | Setup guides selected by platform, processing, and task |
| `/{locale}/docs/mac/installation` | System requirements and installation guide |
| `/{locale}/docs/mac/features` | Feature documentation |
| `/{locale}/docs/mac/api` | HTTP API reference |
| `/{locale}/docs/mac/workflows` | Workflows guide for app, website, hotkey, and fallback automations |
| `/{locale}/docs/mac/troubleshooting` | Troubleshooting guide for permissions, text insertion, microphone access, and setup |
| `/{locale}/addons` | Add-ons marketplace |
| `/{locale}/addons/{slug}` | Individual add-on documentation |
| `/{locale}/use-cases` | Use cases overview |
| `/{locale}/use-cases/{slug}` | Individual use case pages |
| `/{locale}/changelog` | Release notes |
| `/{locale}/benchmark` | Speech engine performance comparison |
| `/{locale}/privacy` | Privacy policy |
| `/{locale}/terms` | Terms of service |
| `/{locale}/legal-notice` | Legal notice |
| `/{locale}/support` | Support page |

## Deployment

Static site hosted on GitHub Pages. Production builds are deployed to [www.typewhisper.com](https://www.typewhisper.com).

## License

GPLv3
