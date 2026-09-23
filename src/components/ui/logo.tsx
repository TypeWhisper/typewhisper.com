import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

// [x, y, height] of each waveform bar; `--i` staggers the hover wave.
const bars = [
  [2, 14, 12],
  [11, 8, 24],
  [20, 4, 32],
  [29, 10, 20],
  [38, 14, 12],
] as const;

export function Logo({ className, showText = true, textClassName }: LogoProps) {
  return (
    <div className={cn("logo-wave flex items-center gap-3", className)}>
      <svg viewBox="0 0 46 40" className="h-8 w-auto" fill="currentColor" aria-hidden="true">
        {bars.map(([x, y, height], i) => (
          <rect
            key={x}
            x={x}
            y={y}
            width="6"
            height={height}
            rx="3"
            className="logo-bar text-primary"
            style={{ ["--i" as string]: i }}
          />
        ))}
      </svg>
      {showText && (
        <span className={cn("text-xl font-semibold tracking-tight font-display", textClassName)}>
          TypeWhisper
        </span>
      )}
    </div>
  );
}
