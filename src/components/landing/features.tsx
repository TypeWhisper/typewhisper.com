import {
  Shield,
  Cpu,
  Keyboard,
  FileAudio,
  Wand2,
  UserCog,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { usePlatform } from "@/hooks/use-platform";
import type { Platform } from "@/lib/platform-download";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

function getEngineFeature(platform: Platform): { title: string; description: string } {
  switch (platform) {
    case "mac":
      return {
        title: "Six AI Engines",
        description:
          "WhisperKit, Parakeet TDT v3, and Apple SpeechAnalyzer built in. Extend with Qwen3 ASR, Groq, and OpenAI from the add-ons marketplace.",
      };
    case "windows":
      return {
        title: "Two AI Engines",
        description:
          "Parakeet TDT (25+ languages, blazing-fast) and Canary (compact, built-in translation). Both run on-device via ONNX Runtime.",
      };
    case "ios":
      return {
        title: "Two AI Engines",
        description:
          "WhisperKit (99+ languages, streaming) and Apple Speech (zero setup). Both run entirely on-device.",
      };
    default:
      return {
        title: "Multiple AI Engines",
        description:
          "Multiple AI engines depending on your platform. All run entirely on-device.",
      };
  }
}

function getFeatures(platform: Platform): Feature[] {
  const engine = getEngineFeature(platform);

  return [
    {
      icon: Shield,
      title: "100% On-Device",
      description:
        "All processing happens locally on your device. No cloud, no telemetry, no data collection. Your voice data never leaves your machine.",
    },
    {
      icon: Cpu,
      title: engine.title,
      description: engine.description,
    },
    {
      icon: Keyboard,
      title: "System-Wide Dictation",
      description:
        "Push-to-talk or toggle via global hotkey. Transcription is auto-pasted into any app - works on macOS and Windows.",
    },
    {
      icon: FileAudio,
      title: "File Transcription",
      description:
        "Batch-process audio and video files with drag & drop. Export as SRT or WebVTT subtitles with timestamps.",
    },
    {
      icon: Wand2,
      title: "AI Text Processing",
      description:
        "8 built-in prompts for translation, formatting, and summarization. Connect Apple Intelligence, Groq, OpenAI, or Gemini.",
    },
    {
      icon: UserCog,
      title: "Context-Aware Profiles",
      description:
        "Per-app and even per-URL overrides for language, engine, translation, and more. Profiles activate automatically based on the active app or website.",
    },
  ];
}

export function Features() {
  const platform = usePlatform();
  const features = getFeatures(platform);

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
              key={i}
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
