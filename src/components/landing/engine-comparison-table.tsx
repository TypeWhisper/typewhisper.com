import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface Engine {
  name: string;
  badge: string;
  description: string;
}

interface ComparisonRow {
  label: string;
  values: (boolean | string)[];
}

const engines: Engine[] = [
  {
    name: "WhisperKit",
    badge: "Versatile",
    description:
      "Apple-optimized Whisper models. Best for multilingual use and streaming preview.",
  },
  {
    name: "Parakeet TDT v3",
    badge: "Fast",
    description:
      "NVIDIA's latest TDT architecture. Extremely fast transcription for European languages with excellent accuracy.",
  },
  {
    name: "Apple Speech",
    badge: "Zero Setup",
    description:
      "Apple's native speech recognition. No manual model downloads — models are managed by macOS. Requires macOS 26+.",
  },
];

const rows: ComparisonRow[] = [
  { label: "Languages", values: ["99+", "25 European", "~40"] },
  { label: "Streaming", values: [true, false, true] },
  { label: "Translation", values: ["20 languages", "20 languages", "20 languages"] },
  { label: "Speed", values: ["Fast", "Up to 5x faster", "Fast"] },
  {
    label: "Model Sizes",
    values: ["Tiny to Large v3", "1.1B params", "System-managed"],
  },
  {
    label: "Model Download",
    values: ["Manual in-app", "Manual in-app", "Automatic by macOS"],
  },
  {
    label: "Best For",
    values: [
      "Multilingual & translation",
      "European languages",
      "Quick setup",
    ],
  },
  { label: "Accuracy", values: ["Excellent", "Excellent", "Good"] },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="size-5 text-green-600 dark:text-green-400" aria-label="Yes" />
    ) : (
      <X className="size-5 text-muted-foreground/50" aria-label="No" />
    );
  }
  return <span>{value}</span>;
}

export function EngineComparisonTable() {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto reveal-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-4 pr-4 text-left font-medium text-muted-foreground w-[180px]">
                Feature
              </th>
              {engines.map((engine) => (
                <th key={engine.name} className="py-4 px-4 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-base">
                      {engine.name}
                    </span>
                    <Badge variant="secondary">{engine.badge}</Badge>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={
                  i % 2 === 0
                    ? "bg-muted/30"
                    : ""
                }
              >
                <td className="py-3 pr-4 font-medium text-muted-foreground">
                  {row.label}
                </td>
                {row.values.map((value, j) => (
                  <td key={engines[j].name} className="py-3 px-4">
                    <CellValue value={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Engine descriptions below table */}
        <div className="mt-8 grid grid-cols-3 gap-6">
          {engines.map((engine) => (
            <p
              key={engine.name}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {engine.description}
            </p>
          ))}
        </div>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden space-y-6">
        {engines.map((engine) => (
          <div
            key={engine.name}
            className="rounded-xl border bg-card p-5 reveal-hidden"
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">{engine.name}</h3>
              <Badge variant="secondary">{engine.badge}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {engine.description}
            </p>
            <div className="space-y-3">
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                    i % 2 === 0 ? "bg-muted/30" : ""
                  }`}
                >
                  <span className="text-sm text-muted-foreground">
                    {row.label}
                  </span>
                  <span className="text-sm font-medium">
                    <CellValue value={row.values[engines.indexOf(engine)]} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
