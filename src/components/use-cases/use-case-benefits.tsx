import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { t, type Locale } from "@/i18n/index";

interface UseCaseBenefitsProps {
  benefits: string[];
  locale?: Locale;
  /** Use-case brand color used for the check-icon tile. */
  color?: string;
}

export function UseCaseBenefits({
  benefits,
  locale = "en",
  color,
}: UseCaseBenefitsProps) {
  const tint = color ?? "var(--primary)";

  return (
    <section className="section-light py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "useCases.benefitsTitle")}
        </h2>

        <ul className="reveal-hidden mx-auto mt-12 grid max-w-4xl gap-x-8 gap-y-4 sm:grid-cols-2">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full"
                style={
                  {
                    backgroundColor: color ? `${color}1F` : undefined,
                    color: tint,
                    boxShadow: color
                      ? `inset 0 0 0 1px ${color}33`
                      : undefined,
                  } satisfies CSSProperties
                }
              >
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              <span className="text-base sm:text-lg">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
