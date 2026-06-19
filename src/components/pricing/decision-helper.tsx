import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { t, type Locale } from "@/i18n/index";

type Tone = "free" | "commercial";

export function DecisionHelper({ locale }: { locale: Locale }) {
  const scenarios = [
    {
      id: "personal",
      recommend: t(locale, "pricing.decision.personal.recommend"),
      title: t(locale, "pricing.decision.personal.title"),
      examples: [
        t(locale, "pricing.decision.personal.example1"),
        t(locale, "pricing.decision.personal.example2"),
        t(locale, "pricing.decision.personal.example3"),
      ],
      targetId: "personal-plan",
      action: t(locale, "pricing.decision.action.personal"),
      tone: "free" as Tone,
    },
    {
      id: "individual",
      recommend: t(locale, "pricing.decision.individual.recommend"),
      title: t(locale, "pricing.decision.individual.title"),
      examples: [
        t(locale, "pricing.decision.individual.included"),
        t(locale, "pricing.decision.individual.example1"),
        t(locale, "pricing.decision.individual.example2"),
        t(locale, "pricing.decision.individual.example3"),
      ],
      targetId: "commercial-plans",
      action: t(locale, "pricing.decision.action.commercial"),
      tone: "commercial" as Tone,
    },
    {
      id: "team",
      recommend: t(locale, "pricing.decision.team.recommend"),
      title: t(locale, "pricing.decision.team.title"),
      examples: [
        t(locale, "pricing.decision.team.included"),
        t(locale, "pricing.decision.team.example1"),
        t(locale, "pricing.decision.team.example2"),
      ],
      targetId: "commercial-plans",
      action: t(locale, "pricing.decision.action.commercial"),
      tone: "commercial" as Tone,
    },
    {
      id: "enterprise",
      recommend: t(locale, "pricing.decision.enterprise.recommend"),
      title: t(locale, "pricing.decision.enterprise.title"),
      examples: [
        t(locale, "pricing.decision.enterprise.included"),
        t(locale, "pricing.decision.enterprise.example1"),
        t(locale, "pricing.decision.enterprise.example2"),
      ],
      targetId: "commercial-plans",
      action: t(locale, "pricing.decision.action.commercial"),
      tone: "commercial" as Tone,
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "pricing.decision.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(locale, "pricing.decision.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((s) => (
            <Card
              key={s.id}
              className="bg-card/80 transition-colors hover:border-primary/40"
            >
              <CardHeader>
                <span
                  className={cn(
                    "inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                    s.tone === "free"
                      ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                      : "border-primary/40 text-primary",
                  )}
                >
                  {s.recommend}
                </span>
                <CardTitle className="text-lg">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {s.examples.map((ex) => (
                    <li key={ex} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="link-arrow" size="sm" className="self-start">
                  <a href={`#${s.targetId}`} className="inline-flex items-center gap-1">
                    {s.action}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
