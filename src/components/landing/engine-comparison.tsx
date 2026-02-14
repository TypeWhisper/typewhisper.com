import { EngineComparisonTable } from "@/components/landing/engine-comparison-table";

export function EngineComparison() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your engine
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three speech recognition engines. All run entirely on-device.
          </p>
        </div>

        <div className="mt-12">
          <EngineComparisonTable />
        </div>
      </div>
    </section>
  );
}
