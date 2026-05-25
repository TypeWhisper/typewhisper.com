import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useCases, type UseCase, type UseCaseCategory } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";
import { Button } from "@/components/ui/button";
import {
  MacOSLogo,
  WindowsLogo,
  IOSLogo,
} from "@/components/ui/platform-logos";
import { macDmgUrl } from "@/lib/platform-download";
import { CategoryFilter } from "@/components/use-cases/category-filter";
import { UseCaseCard } from "@/components/use-cases/use-case-card";

interface UseCasesIndexProps {
  locale?: Locale;
  allUseCases?: UseCase[];
  basePath?: string;
}

export default function UseCasesIndex({
  locale = "en",
  allUseCases,
  basePath = "/use-cases",
}: UseCasesIndexProps) {
  const [category, setCategory] = useState<UseCaseCategory | "all">("all");

  const items = allUseCases ?? useCases;

  const counts = useMemo(() => {
    const next: Record<UseCaseCategory | "all", number> = {
      all: items.length,
      app: 0,
      workflow: 0,
    };
    for (const uc of items) {
      next[uc.category] += 1;
    }
    return next;
  }, [items]);

  const filtered = items.filter(
    (uc) => category === "all" || uc.category === category,
  );

  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef2ff_0%,#f5f0ff_30%,#fbfbfd_70%)] py-20 dark:bg-[linear-gradient(180deg,#0b1220_0%,#111827_35%,#000000_75%)] sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[#0071e3]/15 blur-[100px] dark:bg-[#0071e3]/20" />
          <div className="absolute -right-32 top-16 h-[360px] w-[360px] rounded-full bg-[#7c3aed]/12 blur-[100px] dark:bg-[#7c3aed]/20" />
          <div className="absolute bottom-0 left-1/4 h-[280px] w-[420px] rounded-full bg-[#10b981]/10 blur-[100px] dark:bg-[#10b981]/15" />
          <div className="absolute -bottom-10 right-1/4 h-[260px] w-[360px] rounded-full bg-[#f59e0b]/10 blur-[100px] dark:bg-[#f59e0b]/15" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
              {t(locale, "useCases.heading")}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              {t(locale, "useCases.description")}
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <CategoryFilter
              selected={category}
              onChange={setCategory}
              locale={locale}
              counts={counts}
            />
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {filtered.map((uc) => (
              <UseCaseCard
                key={uc.slug}
                useCase={uc}
                basePath={basePath}
                locale={locale}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-muted-foreground">
              {t(locale, "useCases.emptyState")}
            </p>
          )}

          <div className="mt-16 sm:mt-20">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 top-1/2 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-[#0071e3]/10 blur-[80px]" />
                <div className="absolute -right-16 -top-10 h-[220px] w-[220px] rounded-full bg-[#7c3aed]/10 blur-[80px]" />
              </div>

              <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <div className="flex flex-col items-center gap-2 sm:items-start">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MacOSLogo className="size-5" aria-hidden="true" />
                    <WindowsLogo className="size-5" aria-hidden="true" />
                    <IOSLogo className="size-5" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {t(locale, "useCases.findCta.title")}
                  </h2>
                  <p className="max-w-md text-sm text-muted-foreground sm:text-base">
                    {t(locale, "useCases.findCta.subtitle")}
                  </p>
                </div>
                <Button size="pill" asChild>
                  <a
                    href={macDmgUrl}
                    data-download-social-trigger
                    className="inline-flex items-center gap-1.5"
                  >
                    {t(locale, "useCases.cta.download")}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
