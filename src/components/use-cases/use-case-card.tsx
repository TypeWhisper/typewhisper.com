import type { CSSProperties } from "react";
import {
  Mail,
  MessageCircle,
  Code,
  ClipboardList,
  Home,
  Building2,
  Scale,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Screenshot } from "@/components/ui/screenshot";
import { type UseCase, categoryKeys } from "@/data/use-cases";
import { screenshotPath, t, type Locale } from "@/i18n/index";
import { cn } from "@/lib/utils";
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

interface UseCaseCardProps {
  useCase: UseCase;
  basePath?: string;
  locale?: Locale;
  /** Compact variant for the related-use-cases grid. */
  compact?: boolean;
}

export function UseCaseCard({
  useCase,
  basePath = "/use-cases",
  locale = "en",
  compact = false,
}: UseCaseCardProps) {
  const Icon = iconMap[useCase.icon];
  const color = useCase.color;
  const featurePills = useCase.features.slice(0, 2).map((f) => f.title);
  const useMockup = hasUseCaseMockup(useCase.slug);
  const shotSrc =
    !useMockup && useCase.heroScreenshot
      ? screenshotPath(locale, useCase.heroScreenshot)
      : null;

  return (
    <a
      href={`${basePath}/${useCase.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-xl",
      )}
      style={
        {
          borderColor: `${color}33`,
        } satisfies CSSProperties
      }
    >
      {(useMockup || shotSrc) && (
        <div
          className={cn(
            "relative overflow-hidden",
            compact ? "aspect-[16/9]" : "aspect-[16/10]",
          )}
          style={{
            background: `linear-gradient(135deg, ${color}33, ${color}14 50%, ${color}26)`,
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -top-12 h-40 rounded-full blur-[80px] opacity-70"
            style={{ backgroundColor: `${color}66` }}
          />
          <div
            className={cn(
              "relative h-full w-full transition-transform duration-500 group-hover:scale-[1.02]",
              compact ? "p-3 sm:p-4" : "p-4 sm:p-5",
            )}
          >
            {useMockup ? (
              <UseCaseMockup
                slug={useCase.slug}
                color={color}
                compact
                locale={locale}
              />
            ) : (
              shotSrc && (
                <div
                  className="h-full w-full overflow-hidden rounded-xl bg-background/80 shadow-2xl ring-1 ring-black/5"
                  style={{
                    boxShadow: `0 24px 48px -16px ${color}66, 0 8px 16px -8px ${color}40`,
                  }}
                >
                  <Screenshot
                    src={shotSrc}
                    alt={useCase.name}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}

      <div
        className={cn(
          "relative flex flex-1 flex-col",
          compact ? "p-5" : "p-6 sm:p-7",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <span
                aria-hidden="true"
                className="flex size-7 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `${color}1F`,
                  color,
                  boxShadow: `inset 0 0 0 1px ${color}33`,
                }}
              >
                <Icon className="size-3.5" />
              </span>
            )}
            <h3
              className={cn(
                "font-semibold tracking-tight",
                compact ? "text-base" : "text-lg",
              )}
            >
              {useCase.name}
            </h3>
          </div>
          <Badge variant="secondary" className="text-[10px]">
            {t(locale, categoryKeys[useCase.category])}
          </Badge>
        </div>

        <p
          className={cn(
            "mt-3 text-muted-foreground",
            compact ? "text-sm" : "text-sm sm:text-[15px]",
          )}
        >
          {useCase.description}
        </p>

        {!compact && featurePills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {featurePills.map((title) => (
              <span
                key={title}
                className="inline-flex items-center rounded-full border border-border/70 bg-background/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {title}
              </span>
            ))}
          </div>
        )}

        <div
          className={cn(
            "mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground",
            compact && "pt-4",
          )}
        >
          <span>{t(locale, "useCases.learnMore")}</span>
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </a>
  );
}
