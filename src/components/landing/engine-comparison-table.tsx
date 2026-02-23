import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Link } from "react-router";
import type { Platform } from "@/lib/platform-download";

interface Engine {
  name: string;
  badge: string;
  description: string;
}

interface ComparisonRow {
  label: string;
  values: (boolean | string)[];
}

const macEngines: Engine[] = [
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
      "Apple's native speech recognition. No manual model downloads - models are managed by macOS. Requires macOS 26+.",
  },
];

const macRows: ComparisonRow[] = [
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

const windowsEngines: Engine[] = [
  {
    name: "Parakeet TDT 0.6B",
    badge: "Fast",
    description:
      "NVIDIA's TDT architecture optimized for ONNX Runtime. Fast transcription for European languages, CPU-only.",
  },
  {
    name: "Canary 180M Flash",
    badge: "Compact",
    description:
      "Compact multilingual model with built-in translation. Supports EN, DE, FR, and ES.",
  },
];

const windowsRows: ComparisonRow[] = [
  { label: "Languages", values: ["25+", "4 (EN/DE/FR/ES)"] },
  { label: "Streaming", values: [false, false] },
  { label: "Translation", values: ["Via Marian/Cloud", "Built-in"] },
  { label: "Speed", values: ["Very fast", "Fast"] },
  { label: "Model Sizes", values: ["0.6B params", "180M params"] },
  { label: "Model Download", values: ["Automatic", "Automatic"] },
  { label: "Best For", values: ["European languages", "Quick multilingual"] },
  { label: "Accuracy", values: ["Excellent", "Good"] },
];

const iosEngines: Engine[] = [
  {
    name: "WhisperKit",
    badge: "Versatile",
    description:
      "Apple-optimized Whisper models. Best for multilingual use and streaming preview.",
  },
  {
    name: "Apple Speech",
    badge: "Zero Setup",
    description:
      "Apple's native speech recognition. No model downloads needed - fast and reliable.",
  },
];

const iosRows: ComparisonRow[] = [
  { label: "Languages", values: ["99+", "~40"] },
  { label: "Streaming", values: [true, true] },
  { label: "Translation", values: ["20 languages", "20 languages"] },
  { label: "Speed", values: ["Fast", "Fast"] },
  { label: "Model Sizes", values: ["Tiny to Large v3", "System-managed"] },
  { label: "Model Download", values: ["Manual in-app", "Automatic"] },
  { label: "Best For", values: ["Multilingual & translation", "Quick setup"] },
  { label: "Accuracy", values: ["Excellent", "Good"] },
];

function getEngineData(platform: Platform): { engines: Engine[]; rows: ComparisonRow[] } {
  switch (platform) {
    case "windows":
      return { engines: windowsEngines, rows: windowsRows };
    case "ios":
      return { engines: iosEngines, rows: iosRows };
    default:
      return { engines: macEngines, rows: macRows };
  }
}

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

const gridColsClass: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
};

export function EngineComparisonTable({ platform }: { platform: Platform }) {
  const { engines, rows } = getEngineData(platform);
  const showCloudHint = platform === "mac" || platform === "windows" || platform === "other";

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
        <div className={`mt-8 grid ${gridColsClass[engines.length] ?? "grid-cols-3"} gap-6`}>
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

      {showCloudHint && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Cloud engines (Groq, OpenAI) are also available as{" "}
          <Link to="/addons" className="underline underline-offset-4 hover:text-foreground">
            add-ons
          </Link>
          .
        </p>
      )}
    </>
  );
}
