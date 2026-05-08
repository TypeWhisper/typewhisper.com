import type { CSSProperties } from "react";
import {
  PenLine,
  Sparkles,
  Languages,
  Zap,
  Settings,
  RefreshCw,
  FileText,
  Terminal,
  BookOpen,
  Mic,
  FileAudio,
} from "lucide-react";
import type { UseCaseFeature } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  PenLine,
  Sparkles,
  Languages,
  Zap,
  Settings,
  RefreshCw,
  FileText,
  Terminal,
  BookOpen,
  Mic,
  FileAudio,
};

interface UseCaseFeaturesProps {
  features: UseCaseFeature[];
  locale?: Locale;
  /** Use-case brand color used to tint cards and icons. Defaults to neutral. */
  color?: string;
}

export function UseCaseFeatures({
  features,
  locale = "en",
  color,
}: UseCaseFeaturesProps) {
  const tint = color ?? "#86868b";
  const enableSpotlight = features.length === 3;

  return (
    <section className="section-dark relative overflow-hidden py-20 sm:py-28">
      {color && (
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-24 top-1/3 h-[320px] w-[320px] rounded-full blur-[120px]"
            style={{ backgroundColor: `${color}1F` }}
          />
          <div
            className="absolute -right-20 bottom-0 h-[280px] w-[280px] rounded-full blur-[120px]"
            style={{ backgroundColor: `${color}14` }}
          />
        </div>
      )}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "useCases.featuresTitle")}
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            const isSpotlight = enableSpotlight && i === 0;
            return (
              <div
                key={i}
                className={cn(
                  "reveal-hidden relative overflow-hidden rounded-2xl bg-[#1d1d1f] p-6 sm:p-8",
                  isSpotlight && "sm:col-span-3 lg:col-span-2",
                )}
                style={
                  {
                    backgroundImage: `linear-gradient(135deg, ${tint}26, ${tint}0F 35%, #1d1d1f 70%)`,
                    boxShadow: `inset 0 0 0 1px ${tint}1F`,
                  } satisfies CSSProperties
                }
              >
                {Icon && (
                  <div
                    className="flex size-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${tint}26`,
                      color: tint,
                      boxShadow: `inset 0 0 0 1px ${tint}3D`,
                    }}
                  >
                    <Icon className="size-6" />
                  </div>
                )}
                <h3
                  className={cn(
                    "mt-5 font-semibold text-[#f5f5f7]",
                    isSpotlight ? "text-2xl sm:text-3xl" : "text-xl",
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-[#86868b]",
                    isSpotlight && "max-w-xl text-base sm:text-lg",
                  )}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
