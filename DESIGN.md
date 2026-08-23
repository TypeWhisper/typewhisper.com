# Design System — TypeWhisper Website

Source of truth for all visual and UI decisions on typewhisper.com.
Always read this file before making visual changes. Do not deviate without explicit approval.

## Product Context

- **What this is:** Marketing site for TypeWhisper, a privacy-first dictation app with stable macOS, Windows, and iOS editions.
- **Who it's for:** Developers, writers, professionals; secondary: business/legal buyers.
- **Positioning:** Free, local-first, open ecosystem (add-on marketplace + SDK), made in Germany.
- **Project type:** Marketing site + docs, statically built with Astro 6 + Tailwind 4 + React islands, EN/DE.

## Aesthetic Direction

- **Direction:** Apple clarity, own voice. Clean, reduced, generous whitespace — but with a recognizable brand motif instead of a pure Apple clone look.
- **Decoration level:** Intentional. The waveform motif is the single decorative element; no purple gradient orbs, no generic AI-product visuals.
- **Mood:** Calm confidence. The product speaks (literally) for itself — show, don't claim.
- **Dark mode is the default**; light mode is fully supported.

## Brand Motif: Waveform

- Component: `src/components/ui/waveform.tsx` (`<Waveform />`).
- Static variant for accents (section dividers, footer); `animated` variant for live surfaces (hero recording state).
- Color comes from the `--waveform-color` token; never hardcode it.
- Animation respects `prefers-reduced-motion` (handled in `src/index.css`).

## Typography

- **Display (H1/H2, hero):** General Sans (variable 200–700, self-hosted at `public/fonts/GeneralSans-Variable.woff2`, Fontshare license). Use via `font-display` utility + `tracking-tight`.
- **Body/UI:** System stack (`-apple-system`, SF Pro Text, Segoe UI, …) — zero webfont cost for body copy.
- **Mono:** SF Mono, Fira Code fallback.
- **Loading:** Preloaded in `src/layouts/BaseLayout.astro`, `font-display: swap`.
- **Scale:** Tailwind defaults. Hero H1 `text-5xl sm:text-6xl lg:text-7xl`, section H2 `text-3xl sm:text-4xl lg:text-5xl`.

## Color

- **Approach:** Restrained. One accent color, neutrals do the work.
- **Primary:** `#0071e3` (all themes; rings, links, CTAs).
- **Neutrals dark:** background `#000000`, card `#1d1d1f`, elevated card `#2d2d2f`, foreground `#f5f5f7`, muted text `#86868b`.
- **Neutrals light:** background `#fbfbfd`, card `#ffffff`, secondary `#f5f5f7`, foreground `#1d1d1f`, muted text `#6e6e73`.
- **Destructive:** `#ff3b30`.
- **Borders:** 8% white (dark) / 8% black (light).
- **Forbidden:** Purple/violet gradients, multi-color orbs, any hardcoded hex in components — use tokens.

### Token architecture

- All tokens live in `src/index.css` as CSS custom properties, mapped through Tailwind v4 `@theme inline`.
- Two themes (`:root` dark default, `:root.light`), toggled by class on `<html>`.
- Section surfaces: `.section-light`, `.section-light-gray`, `.section-dark`, `.section-dark-card` share the same token definitions as the global themes (single source, deltas only).
- Branded surfaces: `.hero-surface` (blue glow + gradient via `--hero-gradient-*` / `--hero-glow`).
- Use-case/marketing accents come from MDX frontmatter but flow through component props — never inline new hex values in components.

## Spacing & Layout

- **Base unit:** Tailwind defaults (4px grid).
- **Sections:** `py-20 sm:py-28`; hero `py-16 sm:py-32 lg:py-40`.
- **Containers:** `max-w-6xl` for main sections/header/footer; `max-w-3xl` prose/FAQ; `max-w-2xl` centered subtitles.
- **Density:** Comfortable, generous whitespace.

## Radius

- Base `--radius: 0.75rem` (12px), derived scale sm/md/lg/xl/2xl.
- Cards/feature tiles: `rounded-2xl`. Primary CTAs: pill (`rounded-full`).

## Motion

- **Approach:** Intentional. Scroll-reveal on sections + micro-interactions; nothing decorative-for-its-own-sake.
- **Tokens:** `--motion-micro` 100ms, `--motion-short` 200ms, `--motion-medium` 350ms, `--motion-ease` (ease-out cubic-bezier).
- **Easing:** enter ease-out, exit ease-in.
- **Reduced motion:** Every animation must have a `prefers-reduced-motion` fallback (static end state).

## Constraints

- SEO structure (hreflang, canonicals, sitemap mapping, JSON-LD) in `BaseLayout.astro` must not change.
- Locale screenshots in `public/screenshots/{en,de}/` are shared assets — UI changes must not require regenerating them.
- React island boundaries: keep hydration minimal; new interactive components need a reason to hydrate.
- Both locales (EN/DE) and both themes must be checked for every visual change (`npm run test:i18n`, Playwright theme tests).

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-09 | Initial design system created | Redesign "Apple clarity, own voice": consolidated tokens, General Sans display font, waveform brand motif, removed indigo/violet hero orbs |
