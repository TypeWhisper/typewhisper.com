import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface WaveformProps {
  /** Number of bars to render. */
  bars?: number;
  /** Animate bars (CSS-driven, disabled automatically via prefers-reduced-motion). */
  animated?: boolean;
  /** Deterministic seed so SSR and client render the same bar heights. */
  seed?: number;
  className?: string;
}

// Deterministic pseudo-random generator: SSR markup must match client hydration.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Audio waveform brand motif. Renders a row of rounded bars whose heights
 * follow a speech-like envelope. Use `animated` for live surfaces (hero),
 * omit it for static accents (dividers, footer).
 */
export function Waveform({
  bars = 48,
  animated = false,
  seed = 7,
  className,
}: WaveformProps) {
  const heights = useMemo(() => {
    const random = mulberry32(seed);
    return Array.from({ length: bars }, (_, i) => {
      // Speech-like envelope: louder mid-phrase, quieter at the edges.
      const envelope = Math.sin((i / (bars - 1)) * Math.PI);
      return 0.15 + envelope * (0.25 + random() * 0.6);
    });
  }, [bars, seed]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center gap-[3px]",
        animated && "waveform-animated",
        className,
      )}
    >
      {heights.map((height, i) => (
        <span
          key={i}
          className="waveform-bar w-[3px] rounded-full bg-[var(--waveform-color)]"
          style={{
            height: `${Math.round(height * 100)}%`,
            ...(animated
              ? { ["--bar-delay" as string]: `${(i % 12) * 90}ms` }
              : null),
          }}
        />
      ))}
    </div>
  );
}
