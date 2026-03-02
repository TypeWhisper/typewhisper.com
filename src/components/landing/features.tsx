interface Feature {
  title: string;
  description: string;
  screenshot?: string;
  span?: "col-span-1" | "col-span-2";
}

const features: Feature[] = [
    {
      title: "100% on-device.",
      description: "All processing happens locally. No cloud, no telemetry, no data collection. Your voice data never leaves your machine.",
      span: "col-span-2",
      screenshot: "/screenshots/mac/recording.png",
    },
    {
      title: "Extend with add-ons.",
      description: "Install extra speech engines, AI providers, and tools from the built-in marketplace.",
      screenshot: "/screenshots/mac/plugins.png",
    },
    {
      title: "Rewrite, translate, summarize.",
      description: "8 built-in AI prompts for text processing. Connect Apple Intelligence, Groq, OpenAI, or Gemini.",
      screenshot: "/screenshots/mac/prompts.png",
    },
    {
      title: "Context-aware profiles.",
      description: "Per-app and per-URL overrides for language, engine, and behavior. Profiles activate automatically.",
      screenshot: "/screenshots/mac/profiles.png",
    },
    {
      title: "Transcribe files.",
      description: "Drag and drop audio or video files. Export as SRT or WebVTT subtitles with timestamps.",
      screenshot: "/screenshots/mac/file-transcription.png",
    },
];

export function Features() {

  return (
    <section id="features" className="section-dark py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need.
        </h2>
        <p className="reveal-fade-hidden mt-4 text-center text-lg text-[#86868b]">
          Built for privacy, speed, and flexibility.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`reveal-hidden group rounded-2xl bg-[#1d1d1f] p-6 sm:p-8 ${feature.span === "col-span-2" ? "sm:col-span-2" : ""}`}
            >
              <h3 className="text-xl font-semibold text-[#f5f5f7] sm:text-2xl">
                {feature.title}
              </h3>
              <p className="mt-2 max-w-lg text-[#86868b]">
                {feature.description}
              </p>
              {feature.screenshot && (
                <div className="mt-6 overflow-hidden rounded-xl">
                  <img
                    src={feature.screenshot}
                    alt={feature.title}
                    className="w-full rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
