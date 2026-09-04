import { useEffect, useState } from "react";
import { t, type Locale } from "@/i18n/index";

type Example = "email" | "chat" | "note";
const examples: Example[] = ["email", "chat", "note"];

/** A selectable example, not a recording or a simulated live transcription. */
export function HeroDemo({ locale = "en" }: { locale?: Locale }) {
  const [example, setExample] = useState<Example>("email");
  useEffect(() => {
    const restore = () => {
      const value = new URLSearchParams(location.search).get("example");
      setExample(
        examples.includes(value as Example) ? (value as Example) : "email",
      );
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  function select(value: Example) {
    setExample(value);
    const url = new URL(location.href);
    url.searchParams.set("example", value);
    history.replaceState(history.state, "", url);
  }
  return (
    <div className="mx-auto w-full max-w-3xl" data-testid="hero-demo">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t(locale, "heroDemo.exampleLabel")}
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
              className={`min-h-10 rounded-full px-4 text-sm transition-colors ${example === value ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}
            >
              {t(locale, `heroDemo.choice.${value}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid overflow-hidden rounded-2xl border border-border bg-card text-left sm:grid-cols-2">
        <div className="border-b border-border p-5 sm:border-b-0 sm:border-r">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t(locale, "heroDemo.label.raw")}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            “{t(locale, `heroDemo.raw.${example}`)}”
          </p>
        </div>
        <div className="p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-primary">
            {t(locale, "heroDemo.label.polished")}
          </p>
          <p
            className="text-sm leading-relaxed text-foreground whitespace-pre-line"
            data-testid="hero-demo-result"
          >
            {t(locale, `heroDemo.polished.${example}`)}
          </p>
        </div>
      </div>
    </div>
  );
}
