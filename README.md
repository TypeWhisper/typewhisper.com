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
npm install
npm run dev
```

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
