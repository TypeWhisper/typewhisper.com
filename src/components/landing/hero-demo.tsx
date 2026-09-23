import { replacePageUrl } from "@/hooks/use-page-url";
import { useEffect, useState } from "react";
import { Check, Mic } from "lucide-react";
import { Waveform, type WaveformMotion } from "@/components/ui/waveform";
import { cn } from "@/lib/utils";
import { t, type Locale } from "@/i18n/index";

type Example = "email" | "chat" | "note";
const examples: Example[] = ["email", "chat", "note"];

type Phase = "listening" | "processing" | "typing" | "done";

// Timeline of one example, loosely following the app: record, process, insert.
const LISTEN_MS = 2200;
const PROCESS_MS = 800;
const TYPE_MS_PER_CHAR = 22;
const MAX_TYPE_MS = 1600;
const HOLD_MS = 3800;
const TICK_MS = 40;

const waveformMotion: Record<Phase, WaveformMotion> = {
  listening: "speaking",
  processing: "processing",
  typing: "calm",
  done: "static",
};

function typingDuration(text: string): number {
  return Math.min(MAX_TYPE_MS, text.length * TYPE_MS_PER_CHAR);
}

/** Splits text into a visible part and an invisible remainder that keeps layout and full text stable. */
function RevealText({
  text,
  visible,
  caret = false,
}: {
  text: string;
  visible: number;
  caret?: boolean;
}) {
  if (visible >= text.length) return <>{text}</>;
  return (
    <>
      {text.slice(0, visible)}
      {caret && (
        <span
          aria-hidden="true"
          className="typing-caret -mr-0.5 inline-block h-[1.1em] w-0.5 translate-y-[0.2em] bg-primary"
        />
      )}
      <span className="text-transparent">{text.slice(visible)}</span>
    </>
  );
}

/**
 * A selectable example, not a recording. It plays a short capture, processing,
 * and typing sequence; reduced motion shows the finished state right away.
 */
export function HeroDemo({ locale = "en" }: { locale?: Locale }) {
  const [example, setExample] = useState<Example>("email");
  // Elapsed time of the current run. Infinity is the finished state, which is
  // also the server-rendered and reduced-motion state.
  const [elapsed, setElapsed] = useState(Number.POSITIVE_INFINITY);
  const [run, setRun] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const restore = () => {
      const value = new URLSearchParams(location.search).get("example");
      if (examples.includes(value as Example)) {
        setExample(value as Example);
        setAutoplay(false);
      } else {
        setExample("email");
      }
      setRun((value) => value + 1);
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);

  const raw = t(locale, `heroDemo.raw.${example}`);
  const polished = t(locale, `heroDemo.polished.${example}`);
  const typeMs = typingDuration(polished);
  const totalMs = LISTEN_MS + PROCESS_MS + typeMs;

  useEffect(() => {
    if (run === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setElapsed(Number.POSITIVE_INFINITY);
      return;
    }
    const start = performance.now();
    setElapsed(0);
    const timer = window.setInterval(() => {
      const now = performance.now() - start;
      if (now < totalMs) {
        setElapsed(now);
        return;
      }
      setElapsed(Number.POSITIVE_INFINITY);
      if (!autoplay) {
        window.clearInterval(timer);
        return;
      }
      if (now >= totalMs + HOLD_MS && !document.hidden) {
        window.clearInterval(timer);
        setExample(
          (current) =>
            examples[(examples.indexOf(current) + 1) % examples.length],
        );
        setRun((value) => value + 1);
      }
    }, TICK_MS);
    return () => window.clearInterval(timer);
    // The run counter restarts the timeline; example changes always bump it.
  }, [run]);

  function select(value: Example) {
    setAutoplay(false);
    setExample(value);
    setRun((current) => current + 1);
    const url = new URL(location.href);
    url.searchParams.set("example", value);
    replacePageUrl(url);
  }

  const phase: Phase =
    elapsed < LISTEN_MS
      ? "listening"
      : elapsed < LISTEN_MS + PROCESS_MS
        ? "processing"
        : elapsed < totalMs
          ? "typing"
          : "done";
  const rawWords = raw.split(" ");
  const visibleRawWords =
    phase === "listening"
      ? Math.ceil((elapsed / LISTEN_MS) * rawWords.length)
      : rawWords.length;
  const quotedRaw = `“${raw}”`;
  const visibleRaw =
    phase === "listening"
      ? 1 + rawWords.slice(0, visibleRawWords).join(" ").length
      : quotedRaw.length;
  const visiblePolished =
    phase === "typing"
      ? Math.floor(
          ((elapsed - LISTEN_MS - PROCESS_MS) / typeMs) * polished.length,
        )
      : phase === "done"
        ? polished.length
        : 0;

  return (
    <div className="mx-auto w-full min-w-0 max-w-xl" data-testid="hero-demo">
      <div className="overflow-hidden rounded-2xl border border-border bg-card text-left shadow-2xl shadow-black/30">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          </span>
          <p className="min-w-0 flex-1 truncate text-xs font-medium text-muted-foreground">
            {t(locale, `heroDemo.context.${example}`)}
          </p>
          <div
            className="flex gap-1"
            role="group"
            aria-label={t(locale, "heroDemo.choose")}
          >
            {examples.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={example === value}
                onClick={() => select(value)}
                className={`min-h-8 rounded-full px-3 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${example === value ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                {t(locale, `heroDemo.choice.${value}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span
              className="relative mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
              aria-hidden="true"
            >
              {phase === "listening" && (
                <span className="absolute inset-0 rounded-full bg-primary/30 motion-safe:animate-ping" />
              )}
              <Mic className="relative size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t(locale, "heroDemo.label.raw")}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                <RevealText text={quotedRaw} visible={visibleRaw} />
              </p>
            </div>
          </div>

          <div className="my-4 flex h-8 items-center pl-11">
            <Waveform
              bars={40}
              seed={11}
              motion={waveformMotion[phase]}
              className="h-full justify-start"
            />
          </div>

          <div
            className={cn(
              "rounded-xl border bg-background/60 p-4 transition-colors duration-500",
              phase === "done" ? "border-primary/40" : "border-border",
            )}
          >
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              {t(locale, "heroDemo.label.polished")}
            </p>
            <p
              className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-foreground"
              data-testid="hero-demo-result"
            >
              <RevealText
                text={polished}
                visible={visiblePolished}
                caret={phase === "typing"}
              />
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3 text-xs text-muted-foreground sm:px-6">
          <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
            {phase === "done" ? (
              <Check className="size-3.5 text-primary" aria-hidden="true" />
            ) : (
              <span
                className="size-2 rounded-full bg-primary motion-safe:animate-pulse"
                aria-hidden="true"
              />
            )}
            {t(locale, `heroDemo.status.${phase}`)}
          </span>
          <span className="hidden sm:inline">
            {t(locale, "heroDemo.footnote")}
          </span>
        </div>
      </div>
    </div>
  );
}
