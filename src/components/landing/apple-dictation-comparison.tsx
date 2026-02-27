import { FileAudio, History, Languages, SlidersHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePlatform } from "@/hooks/use-platform";

interface Reason {
  icon: LucideIcon;
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
      icon: SlidersHorizontal,
      title: "Per-app profiles",
      description:
        "Automatically switch language, engine, and behavior per app or website. Built-in dictation is mostly one global setup.",
    },
    {
      icon: Languages,
      title: getEngineTitle(platform),
      description:
        "Six engines to choose from - three built-in plus three more via add-ons. Pick based on speed, accuracy, and privacy needs.",
    },
    {
      icon: FileAudio,
      title: "Audio and video files",
      description:
        "Transcribe full files with drag and drop and export subtitles as SRT or WebVTT.",
    },
    {
      icon: History,
      title: "History and automation",
      description:
        "Keep searchable transcription history and connect workflows through the local HTTP API.",
    },
  ];
}

export function AppleDictationComparison() {
  const platform = usePlatform();
  const reasons = getReasons(platform);

  return (
    <section className="py-20 sm:py-28 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center reveal-hidden">
          <Badge variant="secondary" className="mb-4">
            vs. Built-in Dictation
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Better than built-in dictation because...
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            You keep on-device privacy and gain controls that your system's
            default dictation does not offer.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {reasons.map((reason, i) => (
            <article
              key={i}
              className={`reveal-hidden stagger-delay-${(i + 1) * 100} rounded-2xl border bg-card p-6`}
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <reason.icon className="size-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{reason.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
