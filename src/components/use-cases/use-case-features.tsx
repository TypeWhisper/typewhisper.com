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
}

export function UseCaseFeatures({ features, locale = "en" }: UseCaseFeaturesProps) {
  return (
    <section className="section-dark py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "useCases.featuresTitle")}
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={i}
                className="reveal-hidden rounded-2xl bg-[#1d1d1f] p-6 sm:p-8"
              >
                {Icon && (
                  <Icon className="size-8 text-[#86868b]" />
                )}
                <h3 className="mt-4 text-xl font-semibold text-[#f5f5f7]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[#86868b]">
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
