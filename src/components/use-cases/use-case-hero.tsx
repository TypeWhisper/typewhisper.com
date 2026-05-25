import type { CSSProperties } from "react";
import {
  Mail,
  MessageCircle,
  Code,
  ClipboardList,
  Home,
  Building2,
  Scale,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Screenshot } from "@/components/ui/screenshot";
import {
  MacOSLogo,
  WindowsLogo,
  IOSLogo,
} from "@/components/ui/platform-logos";
import { type UseCase, categoryKeys } from "@/data/use-cases";
import { macDmgUrl } from "@/lib/platform-download";
import { screenshotPath, t, type Locale } from "@/i18n/index";
import {
  UseCaseMockup,
  hasUseCaseMockup,
} from "@/components/use-cases/use-case-mockup";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  MessageCircle,
  Code,
  ClipboardList,
  Home,
  Building2,
  Scale,
};

interface UseCaseHeroProps {
  useCase: UseCase;
  backHref?: string;
  locale?: Locale;
}

export function UseCaseHero({
  useCase,
  backHref = "/use-cases",
  locale = "en",
}: UseCaseHeroProps) {
  const Icon = iconMap[useCase.icon];
  const color = useCase.color;
  const useMockup = hasUseCaseMockup(useCase.slug);
  const shotSrc =
    !useMockup && useCase.heroScreenshot
      ? screenshotPath(locale, useCase.heroScreenshot)
      : null;

  return (
    <section
      className="section-light relative overflow-hidden py-16 sm:py-20"
      style={
        {
          backgroundImage: `linear-gradient(180deg, ${color}14 0%, ${color}06 35%, transparent 75%)`,
        } satisfies CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-32 -top-16 h-[420px] w-[420px] rounded-full blur-[100px]"
          style={{ backgroundColor: `${color}26` }}
        />
        <div
          className="absolute -right-24 top-32 h-[340px] w-[340px] rounded-full blur-[100px]"
          style={{ backgroundColor: `${color}1A` }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <a href={backHref}>
            <ArrowLeft className="size-4" />
            {t(locale, "useCases.allUseCases")}
          </a>
        </Button>

        <div className="mx-auto max-w-3xl text-center">
          <div className="reveal-fade-hidden mb-5 inline-flex items-center gap-2">
            {Icon && (
              <span
                className="flex size-7 items-center justify-center rounded-lg"
                style={
                  {
                    backgroundColor: `${color}1F`,
                    color,
                    boxShadow: `inset 0 0 0 1px ${color}40`,
                  } satisfies CSSProperties
                }
              >
                <Icon className="size-3.5" />
              </span>
            )}
            <Badge
              variant="outline"
              className="border-transparent text-[11px] font-semibold uppercase tracking-wider"
              style={{
                backgroundColor: `${color}14`,
                color,
              }}
            >
              {t(locale, categoryKeys[useCase.category])}
            </Badge>
          </div>

          <h1 className="reveal-fade-hidden font-display text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
            {useCase.name}
          </h1>
          <p className="reveal-fade-hidden mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {useCase.description}
          </p>

          <div className="reveal-fade-hidden mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button size="pill" asChild>
              <a
                href={macDmgUrl}
                data-download-social-trigger
              >
                {t(locale, "useCases.cta.download")}
              </a>
            </Button>
            <Button variant="link-arrow" asChild>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-1"
              >
                {t(locale, "useCases.seeHowItWorks")}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <div className="reveal-fade-hidden mt-6 flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <span className="font-medium uppercase tracking-wider">
              {t(locale, "useCases.availableOn")}
            </span>
            <span aria-hidden="true" className="text-muted-foreground/50">
              &bull;
            </span>
            <span className="inline-flex items-center gap-3">
              <MacOSLogo className="size-4" aria-hidden="true" />
              <WindowsLogo className="size-4" aria-hidden="true" />
              <IOSLogo className="size-4" aria-hidden="true" />
            </span>
          </div>
        </div>

        {(useMockup || shotSrc) && (
          <div className="reveal-scale-hidden relative mx-auto mt-12 max-w-4xl sm:mt-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-12 -bottom-8 -top-4 rounded-[3rem] blur-[60px]"
              style={{
                background: `radial-gradient(ellipse at center, ${color}33, transparent 70%)`,
              }}
            />
            {useMockup ? (
              <div
                className="relative aspect-[16/9] w-full"
                style={{
                  filter: `drop-shadow(0 32px 48px ${color}66)`,
                }}
              >
                <UseCaseMockup
                  slug={useCase.slug}
                  color={color}
                  locale={locale}
                />
              </div>
            ) : (
              shotSrc && (
                <div
                  className="relative overflow-hidden rounded-2xl border border-black/5 bg-background shadow-2xl"
                  style={{
                    boxShadow: `0 32px 64px -24px ${color}80, 0 16px 32px -16px ${color}40`,
                  }}
                >
                  <Screenshot
                    src={shotSrc}
                    alt={useCase.name}
                    className="w-full"
                    loading="eager"
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
