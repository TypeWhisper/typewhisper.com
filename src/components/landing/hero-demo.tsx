import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Waveform } from "@/components/ui/waveform";
import { cn } from "@/lib/utils";
import { t, type Locale } from "@/i18n/index";

type DemoExample = "email" | "chat" | "code";
type DemoPhase = "listening" | "done";

const examples: DemoExample[] = ["email", "chat", "code"];

const RECORDING_DURATION_MS = 1900;
const HOLD_DONE_MS = 3800;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Animated before/after dictation demo: the target app stays untouched while
 * TypeWhisper records, then the finished result is inserted.
 * Falls back to a static before/after layout for reduced motion.
 */
export function HeroDemo({ locale = "en" }: { locale?: Locale }) {
  const reducedMotion = usePrefersReducedMotion();
  const [exampleIndex, setExampleIndex] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>("listening");
  const timersRef = useRef<number[]>([]);

  const example = examples[exampleIndex];
  const rawText = t(locale, `heroDemo.raw.${example}`);
  const polishedText = t(locale, `heroDemo.polished.${example}`);

  useEffect(() => {
    if (reducedMotion) return;

    const timers = timersRef.current;
    function schedule(fn: () => void, delay: number) {
      timers.push(window.setTimeout(fn, delay));
    }

    setPhase("listening");

    schedule(() => setPhase("done"), RECORDING_DURATION_MS);
    schedule(
      () => setExampleIndex((current) => (current + 1) % examples.length),
      RECORDING_DURATION_MS + HOLD_DONE_MS,
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      timers.length = 0;
    };
  }, [exampleIndex, locale, reducedMotion]);

  if (reducedMotion) {
    return (
      <DemoFrame locale={locale} example={example} phase="done">
        <div className="space-y-4 text-left">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t(locale, "heroDemo.label.raw")}
            </p>
            <p className="mt-1 text-sm italic text-muted-foreground">
              &ldquo;{rawText}&rdquo;
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t(locale, "heroDemo.label.polished")}
            </p>
            <p className="mt-1 text-base text-foreground">{polishedText}</p>
          </div>
        </div>
      </DemoFrame>
    );
  }

  return (
    <DemoFrame locale={locale} example={example} phase={phase}>
      <div className="text-left">
        {phase === "done" ? (
          <p className="fade-in-soft text-base text-foreground">
            {polishedText}
          </p>
        ) : (
          <p className="text-base text-muted-foreground/70 transition-opacity">
            {t(locale, `heroDemo.placeholder.${example}`)}
            <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-muted-foreground/50 align-middle" />
          </p>
        )}
      </div>
    </DemoFrame>
  );
}

function DemoFrame({
  locale,
  example,
  phase,
  children,
}: {
  locale: Locale;
  example: DemoExample;
  phase: DemoPhase;
  children: React.ReactNode;
}) {
  const statusKey =
    phase === "listening"
      ? "heroDemo.status.listening"
      : "heroDemo.status.done";

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        data-testid="hero-demo"
        className="rounded-2xl border border-border/60 bg-card/80 shadow-lg backdrop-blur"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-2.5">
          <span className="truncate text-xs font-medium text-muted-foreground">
            {t(locale, `heroDemo.context.${example}`)}
          </span>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
              phase === "done"
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground",
            )}
            data-testid="hero-demo-status"
          >
            {phase === "done" ? (
              <Check className="size-3" aria-hidden="true" />
            ) : (
              <Waveform
                bars={9}
                seed={3}
                animated={phase === "listening"}
                className="h-3 w-8"
              />
            )}
            {t(locale, statusKey)}
          </span>
        </div>
        <div className="min-h-[96px] px-5 py-4 sm:min-h-[84px]">{children}</div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        {t(locale, "heroDemo.caption")}
      </p>
    </div>
  );
}
