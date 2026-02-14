import {
  Shield,
  Cpu,
  Keyboard,
  FileAudio,
  Globe,
  UserCog,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "100% On-Device",
    description:
      "All processing happens locally on your Mac. No cloud, no telemetry, no data collection. Your voice data never leaves your machine.",
  },
  {
    icon: Cpu,
    title: "Three AI Engines",
    description:
      "WhisperKit (99+ languages, streaming, translation), Parakeet TDT v3 (blazing-fast), and Apple Speech (zero-setup, system-managed models on macOS 26+).",
  },
  {
    icon: Keyboard,
    title: "System-Wide Dictation",
    description:
      "Push-to-talk or toggle via global hotkey. Transcription is auto-pasted into any app — works everywhere on macOS.",
  },
  {
    icon: FileAudio,
    title: "File Transcription",
    description:
      "Batch-process audio and video files with drag & drop. Export as SRT or WebVTT subtitles with timestamps.",
  },
  {
    icon: Globe,
    title: "Local HTTP API",
    description:
      "REST API for integration with external tools, scripts, and automations. Run on localhost with zero configuration.",
  },
  {
    icon: UserCog,
    title: "Context-Aware Profiles",
    description:
      "Per-app and even per-URL overrides for language, engine, translation, and more. Profiles activate automatically based on the active app or website.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for local transcription
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built for privacy, speed, and flexibility. No account required.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Card
              key={feature.title}
              className={`reveal-hidden stagger-delay-${(i + 1) * 100} hover:border-primary/20 transition-colors`}
            >
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
