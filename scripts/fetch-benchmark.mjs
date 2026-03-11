import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const resultsDir =
  process.env.BENCHMARK_RESULTS_DIR ||
  join(
    fileURLToPath(import.meta.url),
    "..",
    "..",
    "..",
    "typewhisper-benchmark",
    "visualizer",
    "public",
    "data",
    "results"
  );

const files = readdirSync(resultsDir).filter((f) => f.endsWith(".json"));

const rankings = files
  .map((file) => {
    const content = JSON.parse(readFileSync(join(resultsDir, file), "utf-8"));
    return content.ranking;
  })
  .filter(Boolean)
  .sort((a, b) => a.avgWerNormalized - b.avgWerNormalized);

const output = {
  rankings,
  metadata: {
    timestamp: new Date().toISOString(),
    totalModels: rankings.length,
    totalTests: rankings.reduce((sum, r) => sum + r.totalTests, 0),
  },
};

const outPath = fileURLToPath(
  new URL("../src/data/benchmark-results.json", import.meta.url)
);
writeFileSync(outPath, JSON.stringify(output, null, 2) + "\n");
console.log(
  `Wrote ${rankings.length} model rankings to src/data/benchmark-results.json`
);
