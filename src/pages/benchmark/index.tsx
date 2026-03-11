import { useState, useMemo } from "react";
import {
  benchmarkData,
  modelPlatforms,
  type ModelRanking,
  type BenchmarkPlatform,
} from "@/data/benchmark";
import { BenchmarkCharts } from "@/components/benchmark/benchmark-charts";
import { BenchmarkTable } from "@/components/benchmark/benchmark-table";
import { BenchmarkCards } from "@/components/benchmark/benchmark-cards";
import { Button } from "@/components/ui/button";

export type SortKey = "wer" | "cer" | "speed" | "cost";

type PlatformFilter = "all" | BenchmarkPlatform;

const platformOptions: { value: PlatformFilter; label: string }[] = [
  { value: "all", label: "All Platforms" },
  { value: "mac", label: "macOS" },
  { value: "windows", label: "Windows" },
];

function sortRankings(rankings: ModelRanking[], sortBy: SortKey): ModelRanking[] {
  const sorted = [...rankings];
  switch (sortBy) {
    case "wer":
      return sorted.sort((a, b) => a.avgWerNormalized - b.avgWerNormalized);
    case "cer":
      return sorted.sort((a, b) => a.avgCer - b.avgCer);
    case "speed":
      return sorted.sort((a, b) => a.avgRealtimeFactor - b.avgRealtimeFactor);
    case "cost":
      return sorted.sort((a, b) => a.costPerHourAudio - b.costPerHourAudio);
  }
}

export default function BenchmarkIndex() {
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [sortBy, setSortBy] = useState<SortKey>("wer");

  const filtered = useMemo(() => {
    if (platform === "all") return benchmarkData.rankings;
    return benchmarkData.rankings.filter((r) => {
      const platforms = modelPlatforms[r.providerId];
      return platforms?.includes(platform);
    });
  }, [platform]);

  const sorted = useMemo(() => sortRankings(filtered, sortBy), [filtered, sortBy]);

  const lastUpdated = new Date(benchmarkData.metadata.timestamp).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Benchmark
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Transcription accuracy, speed, and cost comparison across speech-to-text models.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {platformOptions.map((p) => (
          <Button
            key={p.value}
            variant={platform === p.value ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setPlatform(p.value)}
          >
            {p.label}
          </Button>
        ))}
      </div>

      <div className="mt-8">
        <BenchmarkCharts rankings={sorted} />
      </div>

      <div className="mt-8 hidden md:block">
        <BenchmarkTable rankings={sorted} sortBy={sortBy} onSort={setSortBy} />
      </div>

      <div className="mt-8 md:hidden">
        <BenchmarkCards rankings={sorted} />
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Last updated: {lastUpdated} - {benchmarkData.metadata.totalModels} models,{" "}
        {benchmarkData.metadata.totalTests} tests
      </p>
    </div>
  );
}
