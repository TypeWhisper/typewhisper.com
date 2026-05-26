import type { CSSProperties } from "react";
import {
  Cloud,
  Cpu,
  Database,
  Plug,
  Scale,
  type LucideIcon,
} from "lucide-react";
import type { LegalSecurityReviewContent } from "@/data/legal-security-review";

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Cloud,
  Database,
  Plug,
  Scale,
};

interface LegalSecurityReviewDataFlowProps {
  dataFlow: LegalSecurityReviewContent["dataFlow"];
  color: string;
}

export function LegalSecurityReviewDataFlow({
  dataFlow,
  color,
}: LegalSecurityReviewDataFlowProps) {
  return (
    <section className="section-light-gray py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {dataFlow.title}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dataFlow.items.map((item) => {
            const Icon = iconMap[item.icon] ?? Cpu;

            return (
              <div
                key={item.area}
                className="reveal-hidden rounded-2xl border bg-card p-6"
                style={
                  {
                    boxShadow: `inset 0 0 0 1px ${color}14`,
                  } satisfies CSSProperties
                }
              >
                <div
                  className="flex size-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${color}1A`,
                    color,
                    boxShadow: `inset 0 0 0 1px ${color}33`,
                  }}
                >
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {item.area}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
