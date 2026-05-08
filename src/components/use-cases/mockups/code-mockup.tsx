import { MacWindow } from "./mac-window";
import { RecordingNotch } from "./recording-notch";

interface CodeMockupProps {
  color: string;
  compact?: boolean;
  locale?: "en" | "de";
}

/**
 * Stylized VS Code-style editor mockup with a JSDoc comment being dictated and
 * the TypeWhisper notch indicator hanging from the top edge.
 * Used for the "Dictate Code" use case.
 */
export function CodeMockup({ color, compact = false, locale = "en" }: CodeMockupProps) {
  const t = locale === "de" ? copyDe : copyEn;

  return (
    <div className="relative h-full w-full pt-1">
      <MacWindow title={t.windowTitle} accent={color} className="h-full bg-[#1e1e1e] text-neutral-100">
        <div className="flex flex-1 font-mono text-[11px]">
          {!compact && (
            <div className="hidden w-32 shrink-0 flex-col gap-0.5 border-r border-white/5 bg-[#252526] px-2 py-3 text-[10px] sm:flex">
              <div className="px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                {t.explorer}
              </div>
              {t.files.map((f, i) => (
                <div
                  key={f.name}
                  className={`flex items-center gap-1 rounded px-1.5 py-0.5 ${i === 0 ? "bg-white/10 text-white" : "text-neutral-400"}`}
                >
                  <span style={{ color: f.iconColor }}>●</span>
                  <span className="truncate">{f.name}</span>
                </div>
              ))}
            </div>
          )}

          <div className="relative flex flex-1 flex-col bg-[#1e1e1e]">
            <div className="flex shrink-0 items-center gap-1 border-b border-white/5 bg-[#2d2d30] px-2 pt-1">
              <div
                className="flex items-center gap-1.5 rounded-t bg-[#1e1e1e] px-2.5 py-1 text-[10px] text-white"
                style={{ borderTop: `2px solid ${color}` }}
              >
                <span style={{ color: "#3178c6" }}>●</span>
                <span>parser.ts</span>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden text-[11px] leading-[1.6]">
              <div className="flex shrink-0 flex-col items-end px-2 py-3 text-[10px] text-neutral-500 sm:px-3">
                {Array.from({ length: compact ? 6 : 9 }, (_, i) => i + 41).map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
              <pre className="flex-1 overflow-hidden whitespace-pre py-3 pr-3 text-[11px] leading-[1.6]">
                <CodeLines color={color} compact={compact} t={t} />
              </pre>
            </div>
          </div>
        </div>
      </MacWindow>

      <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2">
        <RecordingNotch
          color={color}
          appIconSrc="/brand-logos/vscode/logo.svg"
          appIconAlt="Visual Studio Code"
          partialText={compact ? undefined : t.partialText}
          compact={compact}
        />
      </div>
    </div>
  );
}

function CodeLines({
  color,
  compact,
  t,
}: {
  color: string;
  compact: boolean;
  t: typeof copyEn;
}) {
  const commentColor = "#6a9955";
  const keywordColor = "#569cd6";
  const stringColor = "#ce9178";
  const fnColor = "#dcdcaa";
  const typeColor = "#4ec9b0";
  const varColor = "#9cdcfe";
  const punctColor = "#d4d4d4";

  return (
    <>
      <span style={{ color: commentColor }}>{"/**"}</span>
      <br />
      <span style={{ color: commentColor }}>
        {" * "}
        {t.docLine1}
      </span>
      <br />
      <span style={{ color: commentColor }}>
        {" * "}
        {t.docLine2}
        <span
          className="ml-0.5 inline-block h-3 w-[2px] align-[-1px] animate-pulse"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      </span>
      <br />
      <span style={{ color: commentColor }}>{" */"}</span>
      <br />
      <span style={{ color: keywordColor }}>export function </span>
      <span style={{ color: fnColor }}>parseInput</span>
      <span style={{ color: punctColor }}>(</span>
      <span style={{ color: varColor }}>raw</span>
      <span style={{ color: punctColor }}>: </span>
      <span style={{ color: typeColor }}>string</span>
      <span style={{ color: punctColor }}>) {"{"}</span>
      {!compact && (
        <>
          <br />
          <span style={{ color: punctColor }}>{"  "}</span>
          <span style={{ color: keywordColor }}>const </span>
          <span style={{ color: varColor }}>tokens</span>
          <span style={{ color: punctColor }}> = </span>
          <span style={{ color: varColor }}>raw</span>
          <span style={{ color: punctColor }}>.</span>
          <span style={{ color: fnColor }}>split</span>
          <span style={{ color: punctColor }}>(</span>
          <span style={{ color: stringColor }}>{'" "'}</span>
          <span style={{ color: punctColor }}>);</span>
          <br />
          <span style={{ color: punctColor }}>{"  "}</span>
          <span style={{ color: keywordColor }}>return </span>
          <span style={{ color: varColor }}>tokens</span>
          <span style={{ color: punctColor }}>;</span>
          <br />
          <span style={{ color: punctColor }}>{"}"}</span>
        </>
      )}
    </>
  );
}

const copyEn = {
  windowTitle: "parser.ts — typewhisper",
  explorer: "Explorer",
  files: [
    { name: "parser.ts", iconColor: "#3178c6" },
    { name: "tokenizer.ts", iconColor: "#3178c6" },
    { name: "index.ts", iconColor: "#3178c6" },
    { name: "README.md", iconColor: "#519aba" },
  ],
  docLine1: "Parse a raw input string into a list of word tokens.",
  docLine2: "Splits on whitespace and trims punctuation",
  partialText:
    "splits on whitespace and trims punctuation, returning an array of clean tokens",
};

const copyDe = {
  windowTitle: "parser.ts — typewhisper",
  explorer: "Explorer",
  files: [
    { name: "parser.ts", iconColor: "#3178c6" },
    { name: "tokenizer.ts", iconColor: "#3178c6" },
    { name: "index.ts", iconColor: "#3178c6" },
    { name: "README.md", iconColor: "#519aba" },
  ],
  docLine1: "Parst einen rohen Eingabestring in eine Liste von Wort-Tokens.",
  docLine2: "Trennt an Leerzeichen und entfernt Satzzeichen",
  partialText:
    "trennt an Leerzeichen und entfernt Satzzeichen, gibt ein Array sauberer Tokens zurück",
};
