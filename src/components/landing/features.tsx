interface Feature {
  title: string;
  description: string;
  screenshot?: string;
  span?: "col-span-1" | "col-span-2";
}

const features: Feature[] = [
  {
    title: "Private by default.",
    description: "Run speech-to-text locally on your Mac with no telemetry, no subscriptions, and no mandatory cloud dependency.",
    span: "col-span-2",
    screenshot: "/screenshots/mac/recording.png",
  },
  {
    title: "System-wide dictation.",
    description: "Use a global hotkey to dictate into any app, with fast insertion and configurable behavior.",
    screenshot: "/screenshots/mac/general.png",
  },
  {
    title: "Prompts and automation.",
    description: "Process text with built-in prompt actions, then go deeper with the local API, CLI, and plugins as advanced surfaces.",
    screenshot: "/screenshots/mac/prompts.png",
  },
  {
    title: "Profiles, history, dictionary.",
    description: "Keep app-aware settings, searchable history, correction rules, and snippets in one place.",
    screenshot: "/screenshots/mac/profiles.png",
  },
  {
    title: "File transcription.",
    description: "Drop in audio or video files, batch transcribe them, and export subtitles with timestamps.",
    screenshot: "/screenshots/mac/file-transcription.png",
  },
];

export function Features() {

  return (
    <section id="features" className="section-dark py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight sm:text-4xl">
          The macOS 1.0 core.
        </h2>
        <p className="reveal-fade-hidden mt-4 text-center text-lg text-[#86868b]">
          The stable release focuses on dictation, transcription, prompts, profiles, history, dictionary, and snippets.
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
