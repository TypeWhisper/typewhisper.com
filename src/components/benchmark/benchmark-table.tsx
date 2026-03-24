import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { ModelRanking } from "@/data/benchmark";
import {
  formatWer,
  formatCer,
  formatRtf,
  formatCost,
  providerDisplayName,
  providerTypeLabels,
} from "@/data/benchmark";
import type { SortKey } from "@/pages/benchmark/_index";

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

interface Column {
  key: SortKey;
  label: string;
  align?: "left" | "right";
}

const columns: Column[] = [
  { key: "wer", label: "WER", align: "right" },
  { key: "cer", label: "CER", align: "right" },
  { key: "speed", label: "Speed (RTF)", align: "right" },
  { key: "cost", label: "Cost/h", align: "right" },
];

interface BenchmarkTableProps {
  rankings: ModelRanking[];
  sortBy: SortKey;
  onSort: (key: SortKey) => void;
}

export function BenchmarkTable({
  rankings,
  sortBy,
  onSort,
}: BenchmarkTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 pl-4 pr-2 text-left font-medium text-muted-foreground w-12">
              #
            </th>
            <th className="py-3 px-3 text-left font-medium text-muted-foreground">
              Model
            </th>
            <th className="py-3 px-3 text-left font-medium text-muted-foreground">
              Type
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                className="py-3 px-3 text-right font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
                onClick={() => onSort(col.key)}
              >
                <span className="inline-flex items-center gap-1 justify-end">
                  {col.label}
                  {sortBy === col.key ? (
                    <ChevronUp className="size-3.5" />
                  ) : (
                    <ChevronDown className="size-3.5 opacity-30" />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rankings.map((r, i) => (
            <tr
              key={`${r.providerId}-${r.model}`}
              className="border-b border-border/50 last:border-0 hover:bg-accent/50 transition-colors"
            >
              <td className="py-3 pl-4 pr-2">
                {i < 3 ? (
                  <span
                    className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-bold ${rankColors[i]}`}
                  >
                    {i + 1}
                  </span>
                ) : (
                  <span className="inline-flex size-6 items-center justify-center text-xs text-muted-foreground">
                    {i + 1}
                  </span>
                )}
              </td>
              <td className="py-3 px-3">
                <div className="font-medium">{r.model}</div>
                <div className="text-xs text-muted-foreground">
                  {providerDisplayName(r.providerId)}
                </div>
              </td>
              <td className="py-3 px-3">
                <Badge
                  variant="outline"
                  className={`text-xs ${providerTypeBadgeClass[r.providerType] ?? ""}`}
                >
                  {providerTypeLabels[r.providerType]}
                </Badge>
              </td>
              <td className="py-3 px-3 text-right tabular-nums">
                {formatWer(r.avgWerNormalized)}
              </td>
              <td className="py-3 px-3 text-right tabular-nums">
                {formatCer(r.avgCer)}
              </td>
              <td className="py-3 px-3 text-right tabular-nums">
                {formatRtf(r.avgRealtimeFactor)}
              </td>
              <td className="py-3 px-3 text-right tabular-nums">
                {r.costPerHourAudio === 0 ? (
                  <span className="text-green-500 font-medium">Free</span>
                ) : (
                  formatCost(r.costPerHourAudio)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
