import { Badge } from "@/components/ui/badge";
import type { ModelRanking } from "@/data/benchmark";
import {
  formatWer,
  formatCer,
  formatRtf,
  formatCost,
  providerDisplayName,
  providerTypeLabels,
} from "@/data/benchmark";

const providerTypeBadgeClass: Record<string, string> = {
  cloud: "border-blue-500/30 text-blue-500",
  local: "border-green-500/30 text-green-500",
  system: "border-purple-500/30 text-purple-500",
};

const rankColors = [
  "bg-yellow-500 text-black",
  "bg-gray-300 text-black",
  "bg-amber-700 text-white",
];

interface BenchmarkCardsProps {
  rankings: ModelRanking[];
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 px-3 border-b border-border/30 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium tabular-nums">{value}</span>
    </div>
  );
}

export function BenchmarkCards({ rankings }: BenchmarkCardsProps) {
  return (
    <div className="space-y-4">
      {rankings.map((r, i) => (
        <div
          key={`${r.providerId}-${r.model}`}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            {i < 3 ? (
              <span
                className={`inline-flex size-7 items-center justify-center rounded-full text-xs font-bold ${rankColors[i]}`}
              >
                {i + 1}
              </span>
            ) : (
              <span className="inline-flex size-7 items-center justify-center rounded-full text-xs font-bold text-muted-foreground border border-border">
                {i + 1}
              </span>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{r.model}</h3>
                <Badge
                  variant="outline"
                  className={`text-xs ${providerTypeBadgeClass[r.providerType] ?? ""}`}
                >
                  {providerTypeLabels[r.providerType]}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {providerDisplayName(r.providerId)}
              </p>
            </div>
          </div>
          <div>
            <Row label="WER" value={formatWer(r.avgWerNormalized)} />
            <Row label="CER" value={formatCer(r.avgCer)} />
            <Row label="Speed (RTF)" value={formatRtf(r.avgRealtimeFactor)} />
            <Row
              label="Cost/h"
              value={
                r.costPerHourAudio === 0 ? (
                  <span className="text-green-500 font-medium">Free</span>
                ) : (
                  formatCost(r.costPerHourAudio)
                )
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
