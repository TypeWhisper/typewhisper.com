import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCaseIcons } from "@/components/use-cases/use-case-card";
import { getUseCases } from "@/data/use-cases";
import { localePath, t, type Locale } from "@/i18n/index";

const teaserSlugs = [
  "emails",
  "chat",
  "code",
  "meeting-notes",
  "legal",
  "architecture",
];

/** Links the landing page to the use-case library. Static markup, no hydration. */
export function UseCasesTeaser({ locale = "en" }: { locale?: Locale }) {
  const all = getUseCases(locale);
  const useCases = teaserSlugs
    .map((slug) => all.find((useCase) => useCase.slug === slug))
    .filter((useCase) => useCase !== undefined);
  if (useCases.length === 0) return null;

  return (
    <section
      data-testid="use-cases-teaser"
      className="bg-background py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center reveal-hidden">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t(locale, "useCasesTeaser.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(locale, "useCasesTeaser.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => {
            const Icon = useCaseIcons[useCase.icon];
            return (
              <div
                key={useCase.slug}
                className={`reveal-hidden stagger-delay-${(index % 3) + 1}00`}
              >
                <a
                  href={localePath(locale, `/use-cases/${useCase.slug}`)}
                  className="group flex h-full gap-4 rounded-2xl border border-border bg-card p-5 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  {Icon && (
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${useCase.color}1F`,
                        color: useCase.color,
                      }}
                      aria-hidden="true"
                    >
                      <Icon className="size-5" />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 font-semibold tracking-tight text-card-foreground">
                      {useCase.name}
                      <ArrowRight
                        className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">
                      {useCase.description}
                    </span>
                  </span>
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="link-arrow" asChild>
            <a
              href={localePath(locale, "/use-cases")}
              className="inline-flex items-center gap-1 text-primary"
            >
              {t(locale, "useCasesTeaser.all")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
