import { FileAudio, History, Languages, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const reasons = [
  {
    icon: SlidersHorizontal,
    title: "Per-app profiles",
    description:
      "Automatically switch language, engine, and behavior per app or website. Built-in dictation is mostly one global setup.",
  },
  {
    icon: Languages,
    title: "Three speech engines",
    description:
      "Pick WhisperKit, Parakeet, or Apple Speech depending on your speed and accuracy needs.",
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

export function AppleDictationComparison() {
  return (
    <section className="py-20 sm:py-28 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center reveal-hidden">
          <Badge variant="secondary" className="mb-4">
            Built-in Dictation Comparison
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Better than Apple's built-in dictation because...
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            You keep on-device privacy and gain controls the default dictation
            stack does not offer.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {reasons.map((reason, i) => (
            <article
              key={reason.title}
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
