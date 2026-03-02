import { usePlatform } from "@/hooks/use-platform";

interface Reason {
  title: string;
  description: string;
}

function getEngineTitle(platform: string): string {
  switch (platform) {
    case "mac":
    case "other":
      return "Six speech engines";
    default:
      return "Two speech engines";
  }
}

function getReasons(platform: string): Reason[] {
  return [
    {
      title: "Per-app profiles",
      description: "Automatically switch language, engine, and behavior per app or website.",
    },
    {
      title: getEngineTitle(platform),
      description: "Pick the right engine for speed, accuracy, or language support.",
    },
    {
      title: "Audio and video files",
      description: "Transcribe full files with drag and drop. Export subtitles as SRT or WebVTT.",
    },
    {
      title: "History and automation",
      description: "Searchable transcription history and a local HTTP API for workflows.",
    },
  ];
}

export function AppleDictationComparison() {
  const platform = usePlatform();
  const reasons = getReasons(platform);

  return (
    <section className="section-light py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-3xl font-bold tracking-tight text-[#1d1d1f] sm:text-4xl">
          Why not just use built-in dictation?
        </h2>

        <div className="mt-12">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className={`reveal-hidden py-6 ${i < reasons.length - 1 ? "border-b border-[#d2d2d7]" : ""}`}
            >
              <h3 className="text-lg font-semibold text-[#1d1d1f]">
                {reason.title}
              </h3>
              <p className="mt-1 text-[#6e6e73]">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
