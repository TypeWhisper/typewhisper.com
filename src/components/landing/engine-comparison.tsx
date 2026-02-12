import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const engines = [
  {
    name: "WhisperKit",
    badge: "Versatile",
    highlights: [
      { label: "Languages", value: "99+" },
      { label: "Streaming", value: "Yes" },
      { label: "Translation", value: "To English" },
      { label: "Models", value: "Tiny to Large v3" },
    ],
    description:
      "Apple-optimized Whisper models. Best for multilingual use, streaming preview, and translation to English.",
  },
  {
    name: "Parakeet TDT v3",
    badge: "Fast",
    highlights: [
      { label: "Languages", value: "25 European" },
      { label: "Streaming", value: "No" },
      { label: "Translation", value: "No" },
      { label: "Speed", value: "Up to 5x faster" },
    ],
    description:
      "NVIDIA's latest TDT architecture. Extremely fast transcription for European languages with excellent accuracy.",
  },
  {
    name: "Apple Speech",
    badge: "Zero Setup",
    highlights: [
      { label: "Languages", value: "~40" },
      { label: "Streaming", value: "Yes" },
      { label: "Translation", value: "No" },
      { label: "Download", value: "System-managed" },
    ],
    description:
      "Apple's native speech recognition. No manual model downloads — models are managed by macOS. Requires macOS 26+.",
  },
];

export function EngineComparison() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your engine
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three speech recognition engines. All run entirely on-device.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {engines.map((engine) => (
            <Card key={engine.name} className="reveal-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CardTitle className="text-xl">{engine.name}</CardTitle>
                  <Badge variant="secondary">{engine.badge}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {engine.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {engine.highlights.map((h) => (
                    <div key={h.label}>
                      <p className="text-xs text-muted-foreground">
                        {h.label}
                      </p>
                      <p className="text-sm font-semibold">{h.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
