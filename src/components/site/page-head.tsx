import type { ReactNode } from "react";
import { BarMark } from "./bar-mark";
import { WaveRule } from "./wave-rule";

const wraps = {
  default: "site-wrap",
  narrow: "site-wrap site-wrap--narrow",
  prose: "site-wrap site-wrap--prose",
  wide: "site-wrap site-wrap--wide",
} as const;

interface PageHeadProps {
  /** Small label above the headline, in capitals. */
  label?: string;
  /** `mark` sets the label behind three bars, `rule` into the waveform divider. */
  labelStyle?: "mark" | "rule";
  /** The `<h1>` of the page. */
  title: ReactNode;
  lede?: ReactNode;
  /** One line in the utility font: version, date, platforms. */
  meta?: ReactNode;
  /** Actions below the text, usually a `site-button` and a `site-link`. */
  children?: ReactNode;
  align?: "start" | "center";
  /** Smaller headline for reading pages: docs, legal texts, changelog. */
  compact?: boolean;
  /** Hairline below the head. */
  rule?: boolean;
  /** Width of the content, same names as the `site-wrap` modifiers. */
  wrap?: keyof typeof wraps;
  seed?: number;
  className?: string;
}

/**
 * Head of a subpage: label, headline, lede, and actions. Calm and static; the
 * animated hero belongs to the homepage alone. A plain element, so the site
 * header stays the only `<header>` of the page.
 */
export function PageHead({
  label,
  labelStyle = "mark",
  title,
  lede,
  meta,
  children,
  align = "start",
  compact = false,
  rule = false,
  wrap = "default",
  seed = 3,
  className = "",
}: PageHeadProps) {
  const classes = [
    "site-page-head",
    align === "center" ? "site-page-head--center" : "",
    compact ? "site-page-head--compact" : "",
    rule ? "site-page-head--rule" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} data-testid="page-head">
      <div className={wraps[wrap]}>
        {label &&
          (labelStyle === "rule" ? (
            <WaveRule label={label} seed={seed} align={align} />
          ) : (
            <p className="site-label">
              <BarMark />
              {label}
            </p>
          ))}
        <h1 className="site-page-head__title">{title}</h1>
        {lede && <p className="site-page-head__lede">{lede}</p>}
        {meta && <p className="site-page-head__meta">{meta}</p>}
        {children && <div className="site-actions">{children}</div>}
      </div>
    </div>
  );
}
