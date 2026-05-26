import type { CSSProperties } from "react";
import { AlertTriangle } from "lucide-react";
import type { LegalSecurityReviewContent } from "@/data/legal-security-review";

interface LegalSecurityReviewBoundariesProps {
  boundaries: LegalSecurityReviewContent["boundaries"];
  color: string;
}

export function LegalSecurityReviewBoundaries({
  boundaries,
  color,
}: LegalSecurityReviewBoundariesProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {boundaries.title}
        </h2>
        <ul className="reveal-hidden mt-8 space-y-4">
          {boundaries.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl border bg-card p-4 text-sm text-muted-foreground"
            >
              <span
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full"
                style={
                  {
                    backgroundColor: `${color}14`,
                    color,
                  } satisfies CSSProperties
                }
              >
                <AlertTriangle className="size-3.5" strokeWidth={2.5} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
