import { EngineComparisonTable } from "@/components/landing/engine-comparison-table";
import { usePlatform } from "@/hooks/use-platform";

function getSubtitle(platform: string): string {
  switch (platform) {
    case "mac":
    case "other":
      return "Six speech engines - three built-in, more via add-ons.";
    default:
      return "Two speech recognition engines. All run entirely on-device.";
  }
}

export function EngineComparison() {
  const platform = usePlatform();

  return (
    <section className="section-dark py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal-fade-hidden text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your engine
          </h2>
          <p className="mt-4 text-lg text-[#86868b]">
            {getSubtitle(platform)}
          </p>
        </div>

        <div className="mt-12">
          <EngineComparisonTable platform={platform} />
        </div>
      </div>
    </section>
  );
}
