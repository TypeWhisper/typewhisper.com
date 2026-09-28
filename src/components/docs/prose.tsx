import type { ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { Screenshot } from "@/components/ui/screenshot";
import { t, type Locale } from "@/i18n/index";

/*
 * Building blocks of a documentation page. They render static markup; the
 * script in `DocsLayout.astro` adds copying and the table of contents state.
 */

/** Heading that links to itself. `target` is the anchor the link points to. */
function Anchor({ target, children }: { target: string; children: ReactNode }) {
  return (
    <a href={`#${target}`} className="docs-anchor">
      {children}
      <span className="docs-anchor__sign" aria-hidden="true">
        #
      </span>
    </a>
  );
}

interface DocsSectionProps {
  /** Anchor of the section; stays stable across locales. */
  id?: string;
  /** Anchor on the headline itself, where earlier markup had it there. */
  headingId?: string;
  /** Small label above the headline. */
  label?: string;
  title: ReactNode;
  children?: ReactNode;
}

/** A section of a page: `<h2>` with an anchor, listed in the table of contents. */
export function DocsSection({
  id,
  headingId,
  label,
  title,
  children,
}: DocsSectionProps) {
  const target = headingId ?? id ?? "";
  return (
    <section id={id} className="docs-section" aria-labelledby={headingId}>
      {label && <p className="docs-section__label">{label}</p>}
      <h2 id={headingId} data-docs-toc={target}>
        <Anchor target={target}>{title}</Anchor>
      </h2>
      {children}
    </section>
  );
}

/** `<h3>` with an anchor, listed below its section in the table of contents. */
export function DocsSubheading({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <h3 id={id} data-docs-toc={id}>
      <Anchor target={id}>{children}</Anchor>
    </h3>
  );
}

interface DocsCodeProps {
  code: string;
  /** Label of the block, usually the language. */
  lang?: string;
  locale?: Locale;
  /** `text` wraps and uses the body font: example output, prompts. */
  kind?: "code" | "text";
  /** Download target reported to analytics when the block is copied. */
  trackTarget?: string;
  trackPlatform?: string;
}

/** Code block with a label row and a copy button. */
export function DocsCode({
  code,
  lang = "shell",
  locale = "en",
  kind = "code",
  trackTarget,
  trackPlatform,
}: DocsCodeProps) {
  return (
    <div
      className={`docs-code ${kind === "text" ? "docs-code--text" : ""}`}
      data-docs-code
    >
      <div className="docs-code__label">{lang}</div>
      <button
        type="button"
        className="docs-code__copy"
        aria-label={t(locale, "docs.copyCommand")}
        data-docs-copy
        data-copied-text={t(locale, "docs.copied")}
        data-failed-text={t(locale, "docs.copyFailed")}
        data-track-target={trackTarget}
        data-track-platform={trackPlatform}
        data-track-locale={locale}
      >
        <Copy className="docs-code__idle" aria-hidden="true" />
        <Check className="docs-code__done" aria-hidden="true" />
      </button>
      <p className="sr-only" role="status" data-docs-copy-status />
      <pre tabIndex={0} aria-label={lang}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

interface DocsCalloutProps {
  /** Mono label: note, important, the release stage. */
  label: string;
  /** Bold line above the text. */
  title?: ReactNode;
  children?: ReactNode;
}

/** A note beside the text: a hairline on the left and a label, no box. */
export function DocsCallout({ label, title, children }: DocsCalloutProps) {
  return (
    <div className="docs-callout" role="note">
      <p className="docs-callout__label">{label}</p>
      {title && <p className="docs-callout__title">{title}</p>}
      {children}
    </div>
  );
}

type FigureKind = "window" | "framed" | "phone" | "tablet" | "watch";

const figureClasses: Record<FigureKind, string> = {
  window: "site-shot--window",
  framed: "site-shot--framed",
  phone: "docs-figure--phone",
  tablet: "docs-figure--tablet",
  watch: "docs-figure--watch",
};

interface DocsFigureProps {
  src: string;
  alt: string;
  /** Defaults to the alternative text, which says what the capture shows. */
  caption?: string;
  /** `window` macOS capture with shadow, `framed` Windows, the rest iOS. */
  kind?: FigureKind;
  loading?: "eager" | "lazy";
}

/** A real screenshot as a plain figure with its caption. */
export function DocsFigure({
  src,
  alt,
  caption,
  kind = "window",
  loading = "lazy",
}: DocsFigureProps) {
  return (
    <figure className={`site-shot docs-figure ${figureClasses[kind]}`}>
      <Screenshot src={src} alt={alt} loading={loading} />
      <figcaption className="site-caption" aria-hidden={!caption}>
        {caption ?? alt}
      </figcaption>
    </figure>
  );
}

interface DocsTableProps {
  /** Accessible name of the scrolling region. */
  label: string;
  head: ReactNode[];
  rows: ReactNode[][];
  /** `endpoints`: method, route, purpose. `terms`: name and explanation. */
  kind?: "endpoints" | "terms";
}

/** Table that scrolls inside of its own container on narrow screens. */
export function DocsTable({
  label,
  head,
  rows,
  kind = "terms",
}: DocsTableProps) {
  return (
    <div
      className={`docs-table docs-table--${kind}`}
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <table>
        <thead>
          <tr>
            {head.map((cell, index) => (
              <th key={index} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export interface DocsItem {
  title: ReactNode;
  description: ReactNode;
}

/** Numbered steps, each with a title and an explanation. */
export function DocsSteps({ items }: { items: DocsItem[] }) {
  return (
    <ol className="docs-steps">
      {items.map((item, index) => (
        <li key={index}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ol>
  );
}

/** Names with their explanation between hairlines. */
export function DocsTerms({
  items,
  stacked = false,
}: {
  items: DocsItem[];
  /** Explanation below the name instead of beside it. */
  stacked?: boolean;
}) {
  return (
    <ul className={`docs-terms ${stacked ? "docs-terms--stacked" : ""}`}>
      {items.map((item, index) => (
        <li key={index}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

/** Sets text between backticks as inline code. */
export function withCode(text: string): ReactNode {
  return text
    .split("`")
    .map((part, index) =>
      index % 2 === 1 ? <code key={index}>{part}</code> : part,
    );
}
