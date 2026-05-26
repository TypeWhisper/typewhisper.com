import type { CSSProperties } from "react";
import type { LegalSecurityReviewContent } from "@/data/legal-security-review";

interface LegalSecurityReviewChecklistProps {
  checklist: LegalSecurityReviewContent["checklist"];
  color: string;
}

export function LegalSecurityReviewChecklist({
  checklist,
  color,
}: LegalSecurityReviewChecklistProps) {
  return (
    <section id="checklist" className="scroll-mt-24 py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="reveal-fade-hidden font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {checklist.title}
          </h2>
          <p className="reveal-fade-hidden mt-3 text-muted-foreground">
            {checklist.intro}
          </p>
        </div>
        <ol className="space-y-3">
          {checklist.items.map((item, index) => (
            <li
              key={index}
              className="reveal-hidden flex gap-3 rounded-2xl border bg-card p-4"
            >
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                style={
                  {
                    backgroundColor: `${color}1A`,
                    color,
                    boxShadow: `inset 0 0 0 1px ${color}33`,
                  } satisfies CSSProperties
                }
              >
                {index + 1}
              </span>
              <span className="text-sm text-muted-foreground">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
