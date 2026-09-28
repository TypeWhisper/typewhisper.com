import type { CSSProperties } from "react";
import { mulberry32 } from "@/lib/seeded-random";

const TILE_BARS = 96;
const TILE_PITCH = 6;
const TILE_HEIGHT = 18;

/**
 * Seamlessly repeating strip of waveform bars as an SVG data URI. The strip
 * is used as a mask, so its own color does not matter.
 */
function waveTile(seed: number): string {
  const random = mulberry32(seed);
  let bars = "";
  for (let index = 0; index < TILE_BARS; index += 1) {
    const turn = (index / TILE_BARS) * Math.PI * 2;
    const phrase = 0.5 + 0.5 * Math.sin(turn * 3 + seed);
    const syllable = 0.5 + 0.5 * Math.sin(turn * 11 + seed * 2);
    const level =
      (0.25 + 0.75 * random()) * (0.2 + 0.5 * phrase + 0.3 * syllable);
    const height = Math.max(2, Math.round(level * TILE_HEIGHT));
    const y = (TILE_HEIGHT - height) / 2;
    bars += `<rect x="${index * TILE_PITCH + 2}" y="${y}" width="2" height="${height}" rx="1"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE_BARS * TILE_PITCH}" height="${TILE_HEIGHT}">${bars}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

interface WaveRuleProps {
  /** Word that names the section, set into the gap of the waveform. */
  label?: string;
  /** Changes the pattern of the bars; give every divider of a page its own. */
  seed?: number;
  /** `start` sets the label first and lets the waveform run out to the right. */
  align?: "center" | "start";
  className?: string;
}

/**
 * The recurring divider: a thin waveform across the page, as if the page were
 * one continuous recording. An optional label names the next section.
 */
export function WaveRule({
  label,
  seed = 3,
  align = "center",
  className = "",
}: WaveRuleProps) {
  const style = { "--site-rule-tile": waveTile(seed) } as CSSProperties;
  return (
    <div
      className={`site-rule ${label ? "" : "site-rule--plain"} ${className}`}
      style={style}
    >
      {align === "center" && (
        <span
          className="site-rule__bars site-rule__bars--start"
          aria-hidden="true"
        />
      )}
      {label && <p className="site-rule__label">{label}</p>}
      <span
        className="site-rule__bars site-rule__bars--end"
        aria-hidden="true"
      />
    </div>
  );
}
