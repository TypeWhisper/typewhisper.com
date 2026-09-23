import { useMemo } from "react";
import { cn } from "@/lib/utils";

export type WaveformMotion = "static" | "speaking" | "calm" | "processing";

interface WaveformProps {
  /** Number of bars to render. */
  bars?: number;
  /** Shorthand for `motion="speaking"`, kept for existing call sites. */
  animated?: boolean;
  /**
   * CSS-driven motion, disabled automatically via prefers-reduced-motion.
   * `speaking` mimics live input, `calm` is a slow ambient breath, and
   * `processing` bounces one bar after another like the macOS indicator.
   */
  motion?: WaveformMotion;
  /** Deterministic seed so SSR and client render the same bar heights. */
  seed?: number;
  className?: string;
}

const motionClass: Record<WaveformMotion, string | null> = {
  static: null,
  speaking: "waveform-animated",
  calm: "waveform-calm",
  processing: "waveform-processing",
};

// Step between neighboring bars in the processing bounce, as in the app.
const BOUNCE_STEP_MS = 60;

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
 * follow a speech-like envelope. Use a `motion` for live surfaces (hero),
 * keep it static for quiet accents.
 */
export function Waveform({
  bars = 48,
  animated = false,
  motion = animated ? "speaking" : "static",
  seed = 7,
  className,
}: WaveformProps) {
  const heights = useMemo(() => {
    const random = mulberry32(seed);
    const denominator = Math.max(1, bars - 1);
    return Array.from({ length: bars }, (_, i) => {
      // Speech-like envelope: louder mid-phrase, quieter at the edges.
      const envelope = Math.sin((i / denominator) * Math.PI);
      return 0.15 + envelope * (0.25 + random() * 0.6);
    });
  }, [bars, seed]);

  const timings = useMemo(() => {
    const random = mulberry32(seed + 1);
    const baseDuration = motion === "calm" ? 2600 : 1200;
    return Array.from({ length: bars }, (_, i) => {
      // A sine phase across the bars makes the motion travel like a wave;
      // negative delays start every bar mid-cycle instead of in sync.
      const phase = (Math.sin((i / 6) * Math.PI) + 1) / 2;
      const duration = baseDuration + random() * baseDuration * 0.5;
      return { duration, delay: -Math.round(phase * duration) };
    });
  }, [bars, seed, motion]);

  const animationClass = motionClass[motion];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center gap-[3px]",
        animationClass,
        className,
      )}
      style={
        motion === "processing"
          ? { ["--bounce-cycle" as string]: `${bars * BOUNCE_STEP_MS}ms` }
          : undefined
      }
    >
      {heights.map((height, i) => (
        <span
          key={i}
          className="waveform-bar w-[3px] rounded-full bg-[var(--waveform-color)]"
          style={{
            height: `${Math.round(height * 100)}%`,
            ...(motion === "speaking" || motion === "calm"
              ? {
                  ["--bar-duration" as string]: `${Math.round(timings[i].duration)}ms`,
                  ["--bar-delay" as string]: `${timings[i].delay}ms`,
                }
              : null),
            ...(motion === "processing"
              ? { ["--bounce-delay" as string]: `${i * BOUNCE_STEP_MS}ms` }
              : null),
          }}
        />
      ))}
    </div>
  );
}
