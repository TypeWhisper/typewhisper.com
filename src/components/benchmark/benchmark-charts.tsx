import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Button } from "@/components/ui/button";
import type { ModelRanking } from "@/data/benchmark";
import {
  formatWer,
  formatRtf,
  formatCost,
  providerDisplayName,
} from "@/data/benchmark";

type ChartTab = "accuracy" | "speed" | "cost";

const tabs: { value: ChartTab; label: string }[] = [
  { value: "accuracy", label: "Accuracy (WER)" },
  { value: "speed", label: "Speed (RTF)" },
  { value: "cost", label: "Cost" },
];

const providerTypeColors: Record<string, { fill: string; label: string }> = {
  cloud: { fill: "#3b82f6", label: "Cloud" },
  local: { fill: "#22c55e", label: "Local" },
  system: { fill: "#a855f7", label: "System" },
};

interface BenchmarkChartsProps {
  rankings: ModelRanking[];
}

function chartLabel(r: ModelRanking): string {
  return `${providerDisplayName(r.providerId)} ${r.model}`;
}

function AccuracyChart({ rankings }: { rankings: ModelRanking[] }) {
  const data = rankings.map((r) => ({
    name: chartLabel(r),
    value: r.avgWerNormalized * 100,
    providerType: r.providerType,
    fill: providerTypeColors[r.providerType]?.fill ?? "#888",
  }));

  return (
    <ResponsiveContainer width="100%" height={rankings.length * 48 + 40}>
      <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20, top: 5, bottom: 5 }}>
        <XAxis
          type="number"
          domain={[0, "auto"]}
          tickFormatter={(v: number) => `${v.toFixed(0)}%`}
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={200}
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value) => [formatWer(Number(value) / 100), "WER"]}
          contentStyle={{
            backgroundColor: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            color: "var(--color-foreground)",
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function SpeedChart({ rankings }: { rankings: ModelRanking[] }) {
  const sorted = [...rankings].sort(
    (a, b) => a.avgRealtimeFactor - b.avgRealtimeFactor
  );
  const data = sorted.map((r) => ({
    name: chartLabel(r),
    value: r.avgRealtimeFactor,
    providerType: r.providerType,
    fill: providerTypeColors[r.providerType]?.fill ?? "#888",
  }));

  return (
    <ResponsiveContainer width="100%" height={rankings.length * 48 + 40}>
      <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20, top: 5, bottom: 5 }}>
        <XAxis
          type="number"
          domain={[0, "auto"]}
          tickFormatter={(v: number) => `${v.toFixed(1)}x`}
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={200}
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value) => [formatRtf(Number(value)), "RTF"]}
          contentStyle={{
            backgroundColor: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            color: "var(--color-foreground)",
          }}
        />
        <ReferenceLine
          x={1}
          stroke="var(--color-muted-foreground)"
          strokeDasharray="3 3"
          label={{
            value: "Realtime",
            fill: "var(--color-muted-foreground)",
            fontSize: 11,
            position: "top",
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CostChart({ rankings }: { rankings: ModelRanking[] }) {
  const withCost = rankings.filter((r) => r.costPerHourAudio > 0);
  const free = rankings.filter((r) => r.costPerHourAudio === 0);
  const sorted = [...withCost].sort(
    (a, b) => a.costPerHourAudio - b.costPerHourAudio
  );
  const data = sorted.map((r) => ({
    name: chartLabel(r),
    value: r.costPerHourAudio,
    providerType: r.providerType,
    fill: providerTypeColors[r.providerType]?.fill ?? "#888",
  }));

  return (
    <div>
      <ResponsiveContainer width="100%" height={sorted.length * 48 + 40}>
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20, top: 5, bottom: 5 }}>
          <XAxis
            type="number"
            domain={[0, "auto"]}
            tickFormatter={(v: number) => `$${v.toFixed(2)}`}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={200}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [formatCost(Number(value)), "Cost/h"]}
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              color: "var(--color-foreground)",
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
      {free.length > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          Free models:{" "}
          {free
            .map((r) => `${providerDisplayName(r.providerId)} ${r.model}`)
            .join(", ")}
        </p>
      )}
    </div>
  );
}

function ChartLegend() {
  return (
    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
      {Object.values(providerTypeColors).map((c) => (
        <div key={c.label} className="flex items-center gap-1.5">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ backgroundColor: c.fill }}
          />
          {c.label}
        </div>
      ))}
    </div>
  );
}

export function BenchmarkCharts({ rankings }: BenchmarkChartsProps) {
  const [tab, setTab] = useState<ChartTab>("accuracy");

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <Button
              key={t.value}
              variant={tab === t.value ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setTab(t.value)}
            >
              {t.label}
            </Button>
          ))}
        </div>
        <ChartLegend />
      </div>

      {tab === "accuracy" && <AccuracyChart rankings={rankings} />}
      {tab === "speed" && <SpeedChart rankings={rankings} />}
      {tab === "cost" && <CostChart rankings={rankings} />}
    </div>
  );
}
