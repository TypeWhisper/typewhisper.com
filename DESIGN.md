# Design System — TypeWhisper Website

Source of truth for all visual and UI decisions on typewhisper.com.
Always read this file before making visual changes. Do not deviate without explicit approval.

The landing page (`/en/`, `/de/`) is the approved reference. Every other page is built from the same tokens and primitives.

## Product Context

- **What this is:** Marketing site for TypeWhisper, a privacy-first dictation app with stable macOS, Windows, and iOS editions.
- **Who it's for:** Developers, writers, professionals; secondary: business/legal buyers.
- **Positioning:** Free, local-first, open ecosystem (add-on marketplace + SDK), made in Germany.
- **Project type:** Marketing site + docs, statically built with Astro 7 + Tailwind 4 + React 19 islands, EN/DE.

## Principles

1. **Two grounds.** Black (`#000000`) in the dark theme, paper-white (`#fbfbfd`) in the light theme. Dark is the default; both themes are equal citizens.
2. **One hue.** Blue is the only color. No green checks, no amber warnings, no purple gradients. States are told by weight, position, and the blue accent. `--destructive` exists for real errors only.
3. **Hairlines instead of cards.** Content is structured by 1px lines and whitespace. No boxed tiles with shadows. A surface (`--surface`) is used for a whole band, for media frames, and for small icon tiles, not to box text.
4. **The waveform is the only motif.** It appears as the section divider with its label (`WaveRule`) and as the three-bar mark (`BarMark`). No other decoration, no icons as ornaments, no glows on subpages.
5. **Real product only.** Screenshots and video come from the apps. No HTML imitations of app windows, chat bubbles, notches, or device frames.
6. **The animated hero belongs to the homepage.** Subpages open with the calm, static `PageHead`. The hero canvas, its glow, and the waveform band of the final call to action are not reused.
7. **Docs are a reading mode.** Docs, legal texts, and changelog entries use `site-prose` on a narrow measure with a compact page head. No marketing sections inside of them.
8. **No invented facts, no AI attribution.** Copy states what the product does; versions and counts come from data.

## Files

| File | Content |
|------|---------|
| `src/index.css` | Tokens for both themes, Tailwind theme mapping, base rules (focus ring, selection, display type), reveal and waveform animations |
| `src/styles/site.css` | Primitives, prefix `site-`, in the `components` cascade layer. Imported once in `src/layouts/BaseLayout.astro` after `index.css`. Also declares JetBrains Mono |
| `src/styles/landing.css` | Homepage only, prefix `landing-`, scoped under `.landing`, outside of a layer. Imported by `src/pages/[locale]/index.astro` |
| `src/components/site/` | `BarMark`, `WaveRule`, `SectionHead`, `PageHead` (hook-free React components, rendered statically) |
| `src/components/ui/` | `Button`, `Card`, `Badge`, `Separator`, `CodeBlock`, `Screenshot`, `Logo`, … |
| `src/components/layout/` | Site header, footer, download banner |

**Cascade.** Tailwind base < `site-` primitives (layer `components`) < Tailwind utilities < page styles outside of a layer. A utility on the same element overrides a primitive (`class="site-section pt-0"` works). Page-specific CSS that must win over utilities stays outside of a layer, scoped under a page class, as `landing.css` does.

## Tokens

All tokens are CSS custom properties in `src/index.css`: dark on `:root`, light on `:root.light`, toggled by the class on `<html>`. Never hardcode a hex value in a component.

### Color

| Token | Dark | Light | Use |
|-------|------|-------|-----|
| `--background` | `#000000` | `#fbfbfd` | Page ground |
| `--surface` | `#0e0f12` | `#f5f5f7` | Bands, media frames, icon tiles, row hover |
| `--surface-raised` | `#16181d` | `#ffffff` | Elements on a surface, popovers |
| `--stage` | `#000000` | `#ffffff` | Backdrop behind screenshots that bring their own margin |
| `--fill` | `#16181d` | `#f5f5f7` | Quiet fill for chips, inline code, hover states |
| `--glass` | `rgba(0,0,0,0.55)` | `rgba(255,255,255,0.7)` | Control above a canvas or an image (`site-switch`) |
| `--foreground` | `#f5f5f7` | `#1d1d1f` | Headlines, primary text |
| `--muted-foreground` | `#98989d` | `#6e6e73` | Ledes, body copy of sections, captions |
| `--text-faint` | `#8a8a90` | `#6e6e73` | Quietest text, still AA |
| `--accent-text` | `#5cafff` | `#005fbe` | Links, labels, marks, focus ring |
| `--accent-text-hover` | `#8cc6ff` | `#004a94` | Hovered links |
| `--primary` | `#0068d1` | `#0068d1` | Filled buttons |
| `--primary-hover` | `#0071e3` | `#0071e3` | Hovered filled buttons |
| `--primary-foreground` | `#ffffff` | `#ffffff` | Text on filled buttons |
| `--hairline` | `rgba(255,255,255,0.1)` | `rgba(0,0,0,0.1)` | Lines, frames |
| `--hairline-strong` | `rgba(255,255,255,0.16)` | `rgba(0,0,0,0.16)` | Outlines of quiet buttons, chips, inputs, table heads |
| `--wave` | `#5cafff` | `#0071e3` | Waveform bars |
| `--wave-ink` | `#f5f5f7` | `#1d1d1f` | Color a bar reaches once it has become type (hero canvas) |
| `--selection` | `rgba(10,132,255,0.45)` | `rgba(0,113,227,0.22)` | Text selection |
| `--wordmark-filter` | `invert(1)` | `none` | Wordmarks that are black artwork (F.A.Z.) |
| `--destructive` | `#d70015` | `#d70015` | Fill for destructive actions; white text on it |

Names the Tailwind utilities rely on are aliases of the palette:

| Alias | Points to | Utilities |
|-------|-----------|-----------|
| `--card` | `--surface` | `bg-card` |
| `--popover` | `--surface-raised` | `bg-popover` |
| `--secondary`, `--muted`, `--accent` | `--fill` | `bg-secondary`, `bg-muted`, `bg-accent` |
| `--border` | `--hairline` | `border-border`, default border color |
| `--input` | `--hairline-strong` | `border-input` |
| `--link`, `--ring` | `--accent-text` | `text-link`, `outline-ring` |
| `--waveform-color` | `--wave` at 60% | `Waveform` component |

Additional utilities from `@theme inline`: `bg-surface`, `bg-surface-raised`, `bg-stage`, `bg-fill`, `border-hairline`, `border-hairline-strong`, `text-faint`, `text-link`, `text-link-hover`, `bg-primary-hover`, `bg-wave`, `rounded-frame`.

Notes:

- Blue text is `text-link` (`--accent-text`), blue fill is `bg-primary`. `--primary` as text fails contrast on black; the legacy class `.text-primary` is therefore mapped to `--link`.
- Inside `site-section--band` the aliases `--card`, `--fill`, `--muted`, `--secondary`, `--accent` step up to `--surface-raised`.
- Legacy surfaces `.section-light`, `.section-light-gray`, `.section-dark`, `.section-dark-card`, and `.hero-surface` still work and use the new palette. Do not use them in new markup; they go away with the pages that use them.
- Landing-only tokens: `--landing-glow`, `--landing-glow-soft`, `--landing-shot-ratio` (in `landing.css`).
- The hero and the final canvas read `--wave` and `--wave-ink` from CSS and redraw when the theme class on `<html>` changes.

### Contrast (WCAG AA, measured)

| Pair | Dark | Light |
|------|------|-------|
| Foreground on background / surface / raised | 19.3 / 17.6 / 16.3 | 16.3 / 15.5 / 16.8 |
| Muted on background / surface / raised | 7.3 / 6.7 / 6.2 | 4.9 / 4.7 / 5.1 |
| Faint on background / surface / raised | 6.1 / 5.6 / 5.2 | same as muted |
| Accent text on background / surface / raised | 9.0 / 8.2 / 7.6 | 6.0 / 5.7 / 6.2 |
| White on `--primary` / `--primary-hover` | 5.4 / 4.7 | 5.4 / 4.7 |
| White on `--destructive` | 5.4 | 5.4 |

In the light theme muted text must not sit on anything darker than `#f2f2f4`.

### Type

| Token | Value | Use |
|-------|-------|-----|
| `--font-display` | General Sans (variable 200–700, self-hosted `public/fonts/GeneralSans-Variable.woff2`, preloaded) | Headlines, names, prices, quotes |
| `--font-sans` | System stack (`-apple-system`, SF Pro Text, Segoe UI, …) | Body and UI, no webfont cost |
| `--font-mono` | JetBrains Mono Variable (self-hosted from `@fontsource-variable/jetbrains-mono`, Latin and Latin Extended subsets, `font-display: swap`) | Labels, captions, meta lines, versions, code |

Display type always carries `font-variant-ligatures: none` and `text-rendering: geometricPrecision` (it keeps the letter spacing of General Sans on low-density displays). The base rule covers `h1`, `h2`, `h3`, `blockquote`, and `.font-display`; every display primitive sets it itself.

| Role | Class | Size | Weight | Tracking | Line height |
|------|-------|------|--------|----------|-------------|
| Homepage hero | `landing-hero__title` | up to `6.5rem` | 600 | `-0.045em` | 1 |
| Page headline (`h1`) | `site-page-head__title` | `clamp(2.375rem, 6.4vw, 4.75rem)` | 600 | `-0.04em` | 1.02 |
| Page headline, compact | `site-page-head--compact` | `clamp(2rem, 4.4vw, 3.25rem)` | 600 | `-0.035em` | 1.06 |
| Section headline (`h2`) | `site-title` | `clamp(2.125rem, 5.2vw, 4rem)` | 600 | `-0.035em` | 1.04 |
| Section headline beside content | `site-title--start` | `clamp(2rem, 3.4vw, 2.875rem)` | 600 | `-0.035em` | 1.04 |
| Block headline (`h3`) | `site-subtitle` | `clamp(1.5rem, 2.6vw, 2rem)` | 600 | `-0.025em` | 1.15 |
| Item headline (`h3`) | `site-heading`, `site-points__title` | `clamp(1.375rem, 2.2vw, 1.75rem)` | 600 | `-0.02em` | 1.2 |
| Index entry | `site-index__name` | `clamp(1.375rem, 2vw, 1.625rem)`, tiles `1.25rem` | 600 | `-0.02em` | 1.2 |
| Lede | `site-lede`, `site-page-head__lede` | `clamp(1.0625rem, 1.5vw, 1.25rem)` | 400 | 0 | 1.6 |
| Body | `site-text` | `1rem` | 400 | 0 | 1.65 |
| Prose | `site-prose` | `1.0625rem` (`1rem` on phones) | 400 | 0 | 1.7 |
| Small text | lists, index text, notes | `0.9375rem` | 400 | 0 | 1.5–1.6 |
| Label | `site-label`, `site-rule__label` | `0.75rem`, capitals | 500 | `0.16em` | 1 |
| Caption, footnote | `site-caption`, `site-footnote` | `0.8125rem` mono | 400 | `0.03em` | 1.6 |
| Meta | `site-meta`, `site-index__meta` | `0.75rem` mono | 400 | `0.04em` | 1.6 |

Headlines use `text-wrap: balance`, running text `text-wrap: pretty`. Headlines end with a period when they are a sentence.

### Spacing, layout, radius

| Token | Value | Use |
|-------|-------|-----|
| `--gutter` | `1.25rem`, from 640px `2rem` | Side padding of `site-wrap` |
| `--wrap` | `72rem` | Default content width |
| `--wrap-narrow` | `56rem` | Quotes, focused content |
| `--wrap-prose` | `46rem` | Long-form text |
| `--section-space` | `clamp(4.5rem, 9vw, 7.5rem)` | Vertical padding of a section |
| `--header-height` | `3rem` | Sticky site header; offset for sticky elements |
| `--radius` | `0.75rem` | Base of the Tailwind radius scale |

Radius in use: pill (`999px`) for buttons, switches, chips; `14px` (`rounded-frame`) for video, cards, code blocks; `12px` for screenshots; `10px` for icon tiles; `18px` for phone screenshots; `6px` for inline code.

Breakpoints of the primitives: 639px (phone: one column, stacked actions), 859px (tiles two columns), 899px (split layouts, tiers, and editions stack), 1023px (index and grid two columns).

### Motion

| Token | Value | Use |
|-------|-------|-----|
| `--motion-micro` / `--motion-short` / `--motion-medium` | 100ms / 200ms / 350ms | Durations |
| `--motion-ease` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Reveals on scroll |
| `--motion-ease-out` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Hover and state changes |

## Primitives

Classes live in `src/styles/site.css`. Components live in `src/components/site/` and render static HTML; use them in `.astro` files without a `client:` directive.

```astro
---
import { PageHead, SectionHead, WaveRule, BarMark } from "@/components/site";
import { ArrowRight } from "lucide-react";
---
<div class="site-page">
  <PageHead label="Add-ons" title="…" lede="…">
    <a href="…" class="site-button">…</a>
    <a href="…" class="site-link">… <ArrowRight className="size-4" aria-hidden="true" /></a>
  </PageHead>
  <section class="site-section">
    <div class="site-wrap">
      <SectionHead label="…" title="…" lede="…" seed={11} />
      …
    </div>
  </section>
</div>
```

### Page frame

| Class / component | What it is | When to use |
|-------------------|------------|-------------|
| `site-page` | Root of a page: ground, text color, line height 1.6, clips horizontal overflow. Links with a class are not underlined inside of it | Wrap the whole content of every rebuilt page |
| `site-wrap` | Content wrapper, `--wrap` wide with `--gutter`. Modifiers `--narrow`, `--prose`, `--wide` (80rem) | Inside every section |
| `site-section` | Vertical section spacing. Modifiers `--tight-top`, `--tight-bottom`, `--rule` (hairline on top), `--band` (surface ground) | Every content section. At most one or two bands per page |
| `PageHead` / `site-page-head` | Head of a subpage: label, `h1`, lede, meta line, actions | Exactly once per subpage, first element |
| `SectionHead` / `site-head` | Waveform divider with label, `h2`, lede | Opening of a section |
| `WaveRule` / `site-rule` | The waveform divider alone, with or without label | Where the headline sits beside the content (`site-split`), or as a plain divider |
| `BarMark` / `site-mark` | Three bars | List marks, labels, empty icon tiles |

`PageHead` props: `title` (required), `label`, `labelStyle` (`"mark"` default, `"rule"`), `lede`, `meta`, `children` (actions), `align` (`"start"` default, `"center"`), `compact`, `rule`, `wrap` (`"default"`, `"narrow"`, `"prose"`, `"wide"`), `seed`, `className`. Marketing pages: default or centered. Docs, legal texts, changelog: `compact` with `wrap="prose"` or the wrap of the layout.

`SectionHead` props: `label`, `title` (required), `lede`, `seed`, `align` (`"center"` default, `"start"`), `reveal` (default `true`), `id`.

`WaveRule` props: `label`, `seed`, `align` (`"center"` default, `"start"` sets the label first), `className`. Give every divider of a page its own `seed` so the patterns differ. The bars are a CSS mask over `--wave`; the markup cannot be written by hand, use the component.

### Text

| Class | What it is |
|-------|------------|
| `site-title`, `site-title--start` | Section headline |
| `site-lede`, `site-lede--start` | Lede below a headline, 40rem wide |
| `site-subtitle` | Block headline |
| `site-heading` | Item headline |
| `site-text` | Muted paragraph below a headline |
| `site-label` | Label in capitals; put a `BarMark` in front if wanted. Modifiers `--muted`, `--strong` |
| `site-meta`, `site-meta__accent` | Meta line: platforms, versions, dates |
| `site-caption` | Says what a screenshot or a video shows |
| `site-footnote` | Centered mono note below a section |
| `site-note` | Centered closing note with an optional `site-link` |
| `site-list` | List with three-bar marks: `<li><BarMark />Text</li>`. One mark and one text child; wrap text with markup in a `<span>` |
| `site-callout`, `site-callout__title` | Note beside the text, marked by a bar in the wave color |
| `site-prose` | Long-form text: headings `h1`–`h4`, paragraphs, lists with three-bar bullets, numbered lists, links, `code`, `kbd`, `pre`, `blockquote`, `hr`, tables, images. Put rendered Markdown or MDX inside |

### Actions

| Class | What it is |
|-------|------------|
| `site-button` | Filled pill, 52px high. One per view |
| `site-button--quiet` | Outlined pill for the second action |
| `site-button--small` | 44px high, for dense places |
| `site-link` | Blue text link, 44px target; an arrow icon inside moves on hover |
| `site-actions` | Row of actions, centered, stacks on phones. `--start` aligns left |
| `site-more` | Centered single link below a list |
| `site-switch`, `site-switch__item` | One choice out of a few (platform). State via `aria-pressed`, `aria-selected`, or `aria-current` |
| `site-chips`, `site-chip` | Wrapping filters. Same state attributes |

The `Button` component (`src/components/ui/button.tsx`) is for compact UI (header, forms, filters inside islands). Page-level calls to action use `site-button`.

### Lists and grids

| Class | What it is | When to use |
|-------|------------|-------------|
| `site-split`, `site-split__head` | Two columns: headline left (sticky), content right. `--aside` makes the left column narrower | Reasons, FAQ, any list with its own headline |
| `site-points`, `__item`, `__mark`, `__title`, `__text` | Rows of mark, title, text between hairlines | Reasons, benefits, features without a picture |
| `site-steps`, `__item` | Same rows with a mono count (`01`, `02`) | Sequences: setup, how it works |
| `site-grid`, `__item` | Three columns that open with a hairline. `--2`, `--4` | Short parallel blocks |
| `site-index`, `__link`, `__name`, `__text`, `__meta`, `__accent` | Index of links, three columns, text clamped to three lines. `--2` two columns, `--open` full texts | Use cases, related pages |
| `site-index--tiles` with `__mark`, `__logo`, `__icon`, `__body` | Index with a logo or icon tile in front | Add-ons, integrations |
| `site-tiers`, `__link`, `__name` (`--accent`), `__price`, `__text` | Prices as columns of type, divided by hairlines. `--2` | Pricing |
| `site-editions`, `__link`, `__body`, `__name`, `__version`, `__text` | One row per platform with icon and arrow | Downloads |
| `site-disclosure`, `__body` | `<details>` row with a plus icon that turns | FAQ, optional detail |
| `site-quotes`, `site-quote`, `__source`, `__wordmark`, `__name`, `__link` | Quotes as large type with their source | Press, testimonials |
| `site-table` | Wrapper of a `<table>`: hairline rows, mono head, scrolls sideways | Comparisons |

Index entry:

```html
<ul class="site-index site-index--tiles">
  <li>
    <a href="…" class="site-index__link">
      <span class="site-index__mark" aria-hidden="true"><img class="site-index__logo" … /></span>
      <span class="site-index__body">
        <span class="site-index__name">Name</span>
        <span class="site-index__text">Description</span>
        <span class="site-index__meta"><span class="site-index__accent">Recommended</span>macOS · iOS</span>
      </span>
    </a>
  </li>
</ul>
```

Without tiles the link holds `site-index__name` (with an `ArrowUpRight` icon, `size-5`), `site-index__text`, and optionally `site-index__meta` directly.

Disclosure:

```html
<details class="site-disclosure">
  <summary>Question<Plus className="size-5" aria-hidden="true" /></summary>
  <div class="site-disclosure__body"><p>Answer</p></div>
</details>
```

### Media

| Class | What it is |
|-------|------------|
| `site-shot` | `<figure>` with a real screenshot (use the `Screenshot` component) and a `site-caption`. Modifiers: `--window` for macOS captures with their shadow margin, `--framed` for captures without shadow (Windows), `--phone` for iOS, `--stage` for a stage behind the image on a band |
| `site-video` | `<figure>` with a real `<video controls>` and `<figcaption>`. `--phone` for portrait video |

The pinned feature tour, the panned phone screenshots, and the frame in the shape of the screenshot (`landing-shot`) stay homepage-only.

### UI components

| Component | Look |
|-----------|------|
| `Button` | Pill in every size. `default` filled blue, `outline` quiet with strong hairline, `secondary` fill with hairline, `ghost`, `link`, `link-arrow`, `destructive` |
| `Card` | Surface with hairline, radius 14px, no shadow. For UI that needs a container (forms, results). Not for structuring page content |
| `Badge` | Pill. `default` blue, `secondary` fill with hairline, `outline` strong hairline |
| `Separator` | Hairline |
| `CodeBlock` | Surface with hairline, radius 14px, mono label row, copy button |
| `Waveform` | Legacy animated bars. Existing call sites only; new markup uses `WaveRule` and `BarMark` |

Two traps in `.astro` files:

- `<Button asChild><a …>` does not pass its classes to the link there, because the child arrives as static HTML. The link renders unstyled. Put `site-button` (or `buttonVariants()`) on the `<a>` itself.
- `CodeBlock` needs the `locale` prop of the page. Without it the server renders the English label and the client the localized one, which logs a hydration mismatch.

### Header and footer

- Header: 48px (`--header-height`), sticky, translucent ground with blur, hairline below. Navigation in 12px; download as small filled pill.
- Footer: surface band with hairline on top, a plain `WaveRule`, links in 12px muted text, hairlines between the rows.
- Download banner: raised surface with strong hairline, radius 14px, mono kicker, quiet pill links.

## Motion

- **Approach:** Calm. Motion relates to voice or feedback, never decoration.
- **Reveals:** `reveal-hidden`, `reveal-fade-hidden`, `reveal-scale-hidden` fade content in once on scroll (`stagger-delay-100` … `600` for sequences). Static markup is observed by the script in `BaseLayout.astro`; inside an island call `useScrollReveal()` and put its ref on the root. Use them sparingly on subpages: heads and lists, not every paragraph.
- **Hover:** color, border color, and a 2–3px shift of an arrow, 200–250ms with `--motion-ease-out`. Buttons scale to 0.98 while pressed.
- **Homepage hero:** One orchestrated sequence in three beats: a live waveform listens, its bars assemble the headline, and the bar-built headline resolves into the real `<h1>` while the remaining bars settle into a resting line. The crisp headline stands about 0.9 seconds after the start, because it is the largest element of the page. The sequence plays once on load and again whenever the visitor switches the platform. The headline is real markup at all times: it shows without the canvas, without fonts, without script (`<noscript>` rule and CSS failsafe after 1.5 seconds; a sequence that would start later than that is skipped), and immediately with reduced motion. The canvas pauses offscreen and in hidden tabs.
- **Homepage feature tour:** From 1024px a real screenshot stays pinned below the site header while the five feature texts scroll past. Native scrolling only, no scroll-jacking. Smaller screens and reduced motion get stacked pairs of text and figure.
- **Subpages:** no canvas, no pinned scroll sequences, no autoplaying loops.
- **Reduced motion:** Every animation has a `prefers-reduced-motion` fallback with the static end state.

## Accessibility

- WCAG AA contrast in both themes (table above). Check new combinations before use.
- One `<h1>` per page (`PageHead`), sections start at `<h2>`, no skipped levels. The site header is the only `<header>`.
- Focus: every focusable element shows the global ring (2px `--ring`, 3px offset). Do not remove outlines.
- Targets: links and buttons that stand alone are at least 44px high (`site-link`, `site-button`, `site-switch__item` with 40px inside a padded group).
- Decorative marks and dividers are `aria-hidden`. Screenshots carry an `alt` that says what they show; a visible caption that repeats the `alt` is `aria-hidden`.
- State is carried by ARIA attributes (`aria-pressed`, `aria-current`), which also drive the styles.
- Native elements first: `<details>` for disclosure, `<video controls>` for video, `<table>` for tables.
- No horizontal overflow at 360px. Long German compounds must wrap: headlines use `overflow-wrap: break-word`, page headlines hyphenate on phones.
- Links in running text are underlined (base rule for `p a` and `li a`); links with their own class mark themselves by color and position.

## Version numbers

Copy never spells out the current stable version of an app. It uses placeholders that are resolved in one place.

- **Source:** `src/data/versions.ts`. macOS and Windows are read from the generated release feed `src/data/downloads.json` (written by `scripts/fetch-releases.mjs`). iOS has no feed: `iosVersion` in `src/data/versions.ts` is the only number entered by hand.
- **Placeholders:** `{macVersion}`, `{macSeries}`, `{windowsVersion}`, `{windowsSeries}`, `{iosVersion}`, `{iosSeries}`. `Version` is the full number (`1.6.1`), `Series` the release line (`1.6`). Use the series where the text names the release line ("macOS {macSeries}", "{macSeries} Stable") and the version where it names the exact release ("Windows {windowsVersion}").
- **Resolution:** `t()` resolves them on the server, `getClientMessages()` for hydrated islands. Strings outside of the locale files call `resolveVersions()` from `src/data/versions.ts`.
- **Unknown version:** the placeholder stays in the text, so a caller can drop the passage, as the landing FAQ does.
- **Release builds never ship a placeholder:** `npm run build` runs `fetch-releases.mjs --require-versions` and stops when the macOS or Windows version cannot be resolved and no earlier release data exists. `npm run dev` goes on without, so working offline stays possible.
- **Written by hand on purpose:** numbers that belong to the content of one release ("What's new in 1.7"), minimum OS versions, add-on versions and their minimum host versions.

## Constraints

- SEO structure (hreflang, canonicals, sitemap mapping, JSON-LD) in `BaseLayout.astro` must not change.
- Locale screenshots in `public/screenshots/{en,de}/` are shared assets — UI changes must not require regenerating them.
- React island boundaries: keep hydration minimal; new interactive components need a reason to hydrate. The components in `src/components/site/` stay free of hooks.
- Both locales (EN/DE) and both themes must be checked for every visual change (`npm run test:i18n`, Playwright theme tests).
- The landing page is approved as it is. Changes to `site.css` must leave it pixel-identical; compare screenshots before and after.
- `data-testid` values and the behaviour of existing components stay as they are.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-09 | Initial design system created | Redesign "Apple clarity, own voice": consolidated tokens, General Sans display font, waveform brand motif, removed indigo/violet hero orbs |
| 2026-09-04 | Compact landing and pricing sections, accessible blue text, selectable demo, collapsible comparisons | Keep downloads and examples within reach and improve contrast in both themes |
| 2026-09-24 | Two-column hero with animated dictation demo, evergreen landing copy without hardcoded versions, value pillars, use-case teaser, FAQ, edition cards in the final CTA, app-derived waveform motion | Show the product above the fold, stop copy going stale with each release, and make the page feel alive without generic decoration |
| 2026-09-28 | Landing page "Voice becomes type": hero waveform that morphs into the headline, spoken versus written as typography, pinned feature tour with real screenshots, waveform dividers, JetBrains Mono as utility font, own light and dark palette. No imitated app windows | The headline itself shows what the product does, the tour gives real screenshots room to be read, and only real product media keeps the page honest |
| 2026-09-28 | The landing palette becomes the palette of the whole site; `--landing-*` colors are replaced by global tokens (`--surface`, `--surface-raised`, `--fill`, `--hairline`, `--accent-text`, `--wave`, …) | One source for every page; shared components look the same inside and outside of the homepage |
| 2026-09-28 | `landing.css` split into `site.css` (primitives, prefix `site-`, layer `components`) and a homepage-only `landing.css`; shared React pieces moved to `src/components/site/` | Subpages are rebuilt from the same parts as the approved homepage; utilities can still adjust a primitive |
| 2026-09-28 | New primitives `PageHead` and `site-prose`; the animated hero stays on the homepage | Subpages need a calm opening and a reading mode, the hero keeps its weight by being unique |
| 2026-09-28 | JetBrains Mono is the site-wide mono font (`--font-mono`), loaded once in `site.css` | Labels, captions, and code share one utility face |
| 2026-09-28 | Global focus ring in the accent color, buttons as pills, cards without shadow, footer with the static waveform divider instead of animated bars | Header, footer, and shared components follow the hairline system |
| 2026-09-28 | Current app versions come from `src/data/versions.ts` through placeholders in copy | Support, release status, docs, and changelog can no longer show different numbers |
| 2026-09-28 | `--fill` differs from the landing mapping of `--muted` in the light theme (`#f5f5f7` instead of `#ffffff`); `--destructive` darkened to `#d70015` | A white fill disappears on paper-white; white text on the old red reached only 3.6:1 |
