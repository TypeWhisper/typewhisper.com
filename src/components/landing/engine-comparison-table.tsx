import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import type { Platform } from "@/lib/platform-download";
import { t, localePath, type Locale } from "@/i18n/index";

interface Engine {
  name: string;
  badge: string;
  description: string;
}

interface ComparisonRow {
  label: string;
  values: (boolean | string)[];
}

function comparisonValue(locale: Locale, key: string): string {
  return t(locale, `engineComparison.value.${key}`);
}

function getMacEngines(locale: Locale): Engine[] {
  return [
    {
      name: t(locale, "engineComparison.mac.engine1.name"),
      badge: t(locale, "engineComparison.mac.engine1.badge"),
      description: t(locale, "engineComparison.mac.engine1.description"),
    },
    {
      name: t(locale, "engineComparison.mac.engine2.name"),
      badge: t(locale, "engineComparison.mac.engine2.badge"),
      description: t(locale, "engineComparison.mac.engine2.description"),
    },
    {
      name: t(locale, "engineComparison.mac.engine3.name"),
      badge: t(locale, "engineComparison.mac.engine3.badge"),
      description: t(locale, "engineComparison.mac.engine3.description"),
    },
  ];
}

function getMacRows(locale: Locale): ComparisonRow[] {
  return [
    {
      label: t(locale, "engineComparison.row.languages"),
      values: ["99+", comparisonValue(locale, "european25"), "~40"],
    },
    { label: t(locale, "engineComparison.row.streaming"), values: [true, false, true] },
    {
      label: t(locale, "engineComparison.row.translation"),
      values: Array(3).fill(comparisonValue(locale, "languages20")),
    },
    {
      label: t(locale, "engineComparison.row.speed"),
      values: [
        comparisonValue(locale, "fast"),
        comparisonValue(locale, "upToFiveTimesFaster"),
        comparisonValue(locale, "fast"),
      ],
    },
    {
      label: t(locale, "engineComparison.row.modelSizes"),
      values: [
        comparisonValue(locale, "tinyToLargeV3"),
        comparisonValue(locale, "params1_1b"),
        comparisonValue(locale, "systemManaged"),
      ],
    },
    {
      label: t(locale, "engineComparison.row.modelDownload"),
      values: [
        comparisonValue(locale, "manualInApp"),
        comparisonValue(locale, "manualInApp"),
        comparisonValue(locale, "automaticByMacos"),
      ],
    },
    {
      label: t(locale, "engineComparison.row.bestFor"),
      values: [
        comparisonValue(locale, "multilingualTranslation"),
        comparisonValue(locale, "europeanLanguages"),
        comparisonValue(locale, "quickSetup"),
      ],
    },
    {
      label: t(locale, "engineComparison.row.accuracy"),
      values: [
        comparisonValue(locale, "excellent"),
        comparisonValue(locale, "excellent"),
        comparisonValue(locale, "good"),
      ],
    },
  ];
}

function getWindowsEngines(locale: Locale): Engine[] {
  return [
    {
      name: t(locale, "engineComparison.win.engine1.name"),
      badge: t(locale, "engineComparison.win.engine1.badge"),
      description: t(locale, "engineComparison.win.engine1.description"),
    },
    {
      name: t(locale, "engineComparison.win.engine2.name"),
      badge: t(locale, "engineComparison.win.engine2.badge"),
      description: t(locale, "engineComparison.win.engine2.description"),
    },
  ];
}

function getWindowsRows(locale: Locale): ComparisonRow[] {
  return [
    { label: t(locale, "engineComparison.row.languages"), values: ["25+", "4 (EN/DE/FR/ES)"] },
    { label: t(locale, "engineComparison.row.streaming"), values: [false, false] },
    {
      label: t(locale, "engineComparison.row.translation"),
      values: [comparisonValue(locale, "viaMarianCloud"), comparisonValue(locale, "builtIn")],
    },
    {
      label: t(locale, "engineComparison.row.speed"),
      values: [comparisonValue(locale, "veryFast"), comparisonValue(locale, "fast")],
    },
    {
      label: t(locale, "engineComparison.row.modelSizes"),
      values: [comparisonValue(locale, "params0_6b"), comparisonValue(locale, "params180m")],
    },
    {
      label: t(locale, "engineComparison.row.modelDownload"),
      values: Array(2).fill(comparisonValue(locale, "automatic")),
    },
    {
      label: t(locale, "engineComparison.row.bestFor"),
      values: [
        comparisonValue(locale, "europeanLanguages"),
        comparisonValue(locale, "quickMultilingual"),
      ],
    },
    {
      label: t(locale, "engineComparison.row.accuracy"),
      values: [comparisonValue(locale, "excellent"), comparisonValue(locale, "good")],
    },
  ];
}

function getIosEngines(locale: Locale): Engine[] {
  return [
    {
      name: t(locale, "engineComparison.ios.engine1.name"),
      badge: t(locale, "engineComparison.ios.engine1.badge"),
      description: t(locale, "engineComparison.ios.engine1.description"),
    },
    {
      name: t(locale, "engineComparison.ios.engine2.name"),
      badge: t(locale, "engineComparison.ios.engine2.badge"),
      description: t(locale, "engineComparison.ios.engine2.description"),
    },
    {
      name: t(locale, "engineComparison.ios.engine3.name"),
      badge: t(locale, "engineComparison.ios.engine3.badge"),
      description: t(locale, "engineComparison.ios.engine3.description"),
    },
  ];
}

function getIosRows(locale: Locale): ComparisonRow[] {
  return [
    { label: t(locale, "engineComparison.row.languages"), values: ["99+", "~40", "25+"] },
    { label: t(locale, "engineComparison.row.streaming"), values: [true, true, true] },
    { label: t(locale, "engineComparison.row.translation"), values: ["Apple Translate", "Apple Translate", "Apple Translate"] },
    {
      label: t(locale, "engineComparison.row.speed"),
      values: [
        comparisonValue(locale, "fast"),
        comparisonValue(locale, "fast"),
        comparisonValue(locale, "veryFast"),
      ],
    },
    {
      label: t(locale, "engineComparison.row.modelSizes"),
      values: [
        comparisonValue(locale, "tinyToLargeV3"),
        comparisonValue(locale, "systemManaged"),
        comparisonValue(locale, "params1_1b"),
      ],
    },
    {
      label: t(locale, "engineComparison.row.modelDownload"),
      values: [
        comparisonValue(locale, "manualInApp"),
        comparisonValue(locale, "automatic"),
        comparisonValue(locale, "manualInApp"),
      ],
    },
    {
      label: t(locale, "engineComparison.row.bestFor"),
      values: [
        comparisonValue(locale, "multilingual"),
        comparisonValue(locale, "quickSetup"),
        comparisonValue(locale, "europeanLanguages"),
      ],
    },
    {
      label: t(locale, "engineComparison.row.accuracy"),
      values: [
        comparisonValue(locale, "excellent"),
        comparisonValue(locale, "good"),
        comparisonValue(locale, "excellent"),
      ],
    },
  ];
}

function getEngineData(platform: Platform, locale: Locale): { engines: Engine[]; rows: ComparisonRow[] } {
  switch (platform) {
    case "windows":
      return { engines: getWindowsEngines(locale), rows: getWindowsRows(locale) };
    case "ios":
      return { engines: getIosEngines(locale), rows: getIosRows(locale) };
    default:
      return { engines: getMacEngines(locale), rows: getMacRows(locale) };
  }
}

function CellValue({ value, locale }: { value: boolean | string; locale: Locale }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="size-5 text-green-600 dark:text-green-400" aria-label={comparisonValue(locale, "yes")} />
    ) : (
      <X className="size-5 text-muted-foreground/50" aria-label={comparisonValue(locale, "no")} />
    );
  }
  return <span>{value}</span>;
}

const gridColsClass: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
};

export function EngineComparisonTable({ platform, locale = "en" }: { platform: Platform; locale?: Locale }) {
  const { engines, rows } = getEngineData(platform, locale);
  const showCloudHint = platform === "mac" || platform === "windows" || platform === "other";

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto reveal-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 text-left font-medium text-muted-foreground w-[180px]">
                {t(locale, "engineComparison.featureHeader")}
              </th>
              {engines.map((engine) => (
                <th key={engine.name} className="py-4 px-4 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">
                      {engine.name}
                    </span>
                    <Badge variant="outline" className="border-border text-xs text-muted-foreground">{engine.badge}</Badge>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-border"
              >
                <td className="py-4 pr-4 font-medium text-muted-foreground">
                  {row.label}
                </td>
                {row.values.map((value, j) => (
                  <td key={engines[j].name} className="py-4 px-4">
                    <CellValue value={value} locale={locale} />
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
            className="reveal-hidden rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">{engine.name}</h3>
              <Badge variant="outline" className="border-border text-xs text-muted-foreground">{engine.badge}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {engine.description}
            </p>
            <div className="space-y-3">
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between py-3 px-3 ${
                    i < rows.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="text-sm text-muted-foreground">
                    {row.label}
                  </span>
                  <span className="text-sm font-medium">
                    <CellValue value={row.values[engines.indexOf(engine)]} locale={locale} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showCloudHint && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t(locale, "engineComparison.cloudHint")}{" "}
          <a href={localePath(locale, "/addons")} className="underline underline-offset-4 hover:text-foreground">
            {t(locale, "engineComparison.cloudHintLink")}
          </a>
          .
        </p>
      )}
    </>
  );
}
