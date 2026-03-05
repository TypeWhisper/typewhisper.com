import { useState } from "react";
import { useCases, type UseCaseCategory } from "@/data/use-cases";
import { CategoryFilter } from "@/components/use-cases/category-filter";
import { UseCaseCard } from "@/components/use-cases/use-case-card";

export default function UseCasesIndex() {
  const [category, setCategory] = useState<UseCaseCategory | "all">("all");

  const filtered = useCases.filter(
    (uc) => category === "all" || uc.category === category,
  );

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Use Cases
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover how TypeWhisper fits into your daily workflow.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {filtered.map((uc) => (
            <UseCaseCard key={uc.slug} useCase={uc} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            No use cases found for this filter.
          </p>
        )}
      </div>
    </div>
  );
}
