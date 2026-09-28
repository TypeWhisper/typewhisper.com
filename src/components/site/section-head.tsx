import type { ReactNode } from "react";
import { WaveRule } from "./wave-rule";

interface SectionHeadProps {
  /** Word in the gap of the waveform divider. */
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  seed?: number;
  /** Left-aligned heads sit beside their content instead of above it. */
  align?: "center" | "start";
  /** Fades in on scroll; needs the reveal observer of the page or the island. */
  reveal?: boolean;
  /** Anchor on the headline. */
  id?: string;
}

/**
 * Waveform divider, headline, and lede: the opening of every section. A plain
 * element, so the site header stays the only `<header>` of the page.
 */
export function SectionHead({
  label,
  title,
  lede,
  seed = 3,
  align = "center",
  reveal = true,
  id,
}: SectionHeadProps) {
  const start = align === "start";
  return (
    <div
      className={`site-head ${start ? "site-head--start" : ""} ${reveal ? "reveal-hidden" : ""}`}
    >
      <WaveRule label={label} seed={seed} align={align} />
      <h2 id={id} className={`site-title ${start ? "site-title--start" : ""}`}>
        {title}
      </h2>
      {lede && <p className="site-lede">{lede}</p>}
    </div>
  );
}
