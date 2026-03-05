import { Check } from "lucide-react";

interface UseCaseBenefitsProps {
  benefits: string[];
}

export function UseCaseBenefits({ benefits }: UseCaseBenefitsProps) {
  return (
    <section className="section-light py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Benefits
        </h2>

        <ul className="reveal-hidden mx-auto mt-12 max-w-2xl space-y-4">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="mt-0.5 size-5 shrink-0 text-primary" />
              <span className="text-lg">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
