import type { ComponentType, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface RecordingNotchProps {
  /** Use-case brand color (used only for subtle accents; the notch itself stays black). */
  color?: string;
  /** App icon shown on the left (lucide icon component or any SVG component). */
  appIcon?: ComponentType<{ className?: string }>;
  /**
   * Optional URL to a real brand-logo SVG (e.g. "/brand-logos/slack/logo.svg").
   * Takes precedence over appIcon when provided. Rendered with full color so
   * the brand identity stays intact on the black notch background.
   */
  appIconSrc?: string;
  /** Accessible label for the appIconSrc image (e.g. "Slack"). */
  appIconAlt?: string;
  /**
   * Live partial transcript snippet shown inside the expanded notch body.
   * Pass empty string to render the closed (collapsed) variant.
   */
  partialText?: string;
  /** Compact variant for cards: tighter padding, smaller text. */
  compact?: boolean;
  className?: string;
}

/**
 * Stylized clone of TypeWhisper's notch-style recording indicator.
 *
 * Visual reference: top-anchored capsule with rectangular top edge and rounded
 * bottom corners. Three zones: app-icon + audio-level dots on the left, a red
 * pulsing recording dot on the right, and an optional live partial transcript
 * preview spanning the body underneath.
 *
 * Designed to be positioned absolutely at the top of a Mac-window mockup so it
 * appears to "hang down" from the menubar.
 */
export function RecordingNotch({
  appIcon: AppIcon,
  appIconSrc,
  appIconAlt,
  partialText,
  compact = false,
  className,
}: RecordingNotchProps) {
  const hasTranscript = Boolean(partialText && partialText.length > 0);
  const dotCount = compact ? 4 : 5;

  return (
    <div
      className={cn(
        "flex flex-col bg-black text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)]",
        "rounded-b-[18px]",
        compact ? "rounded-b-[14px]" : "rounded-b-[18px]",
        className,
      )}
      style={
        {
          minWidth: compact ? 200 : 320,
          maxWidth: compact ? 320 : 560,
        } satisfies CSSProperties
      }
    >
      <div
        className={cn(
          "flex items-center justify-between gap-2",
          compact ? "px-3 py-2" : "px-4 py-2.5",
        )}
      >
        <div className="flex items-center gap-2">
          {appIconSrc ? (
            <span
              className={cn(
                "flex shrink-0 items-center justify-center overflow-hidden",
                compact ? "size-4" : "size-5",
              )}
            >
              <img
                src={appIconSrc}
                alt={appIconAlt ?? ""}
                className={cn(
                  "object-contain",
                  compact ? "size-3.5" : "size-[18px]",
                )}
                loading="lazy"
                decoding="async"
              />
            </span>
          ) : (
            AppIcon && (
              <span
                aria-hidden="true"
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-md bg-white/10 text-white/80",
                  compact ? "size-4" : "size-5",
                )}
              >
                <AppIcon className={compact ? "size-2.5" : "size-3"} />
              </span>
            )
          )}

          <span
            aria-hidden="true"
            className={cn(
              "flex items-center",
              compact ? "gap-[3px]" : "gap-[4px]",
            )}
          >
            {Array.from({ length: dotCount }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "rounded-full bg-white/85",
                  compact ? "size-[3px]" : "size-[4px]",
                  "animate-pulse",
                )}
                style={
                  {
                    animationDelay: `${i * 120}ms`,
                    animationDuration: "1.2s",
                    opacity: 0.55 + (i % 2) * 0.35,
                  } satisfies CSSProperties
                }
              />
            ))}
          </span>
        </div>

        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 rounded-full bg-[#ff453a] animate-pulse",
            compact ? "size-1.5" : "size-2",
          )}
          style={{
            boxShadow: "0 0 10px rgba(255,69,58,0.55)",
            animationDuration: "1s",
          }}
        />
      </div>

      {hasTranscript && (
        <div
          className={cn(
            "border-t border-white/5",
            compact ? "px-3 pb-2.5 pt-1.5" : "px-4 pb-3 pt-2",
          )}
        >
          <p
            className={cn(
              "leading-snug text-white/95",
              compact ? "text-[10px]" : "text-[12.5px]",
            )}
            style={{
              fontFeatureSettings: '"ss01", "ss02"',
            }}
          >
            {partialText}
          </p>
        </div>
      )}
    </div>
  );
}
