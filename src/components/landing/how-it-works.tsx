const steps = [
  {
    title: "Press Your Hotkey",
    description:
      "Trigger recording with a global keyboard shortcut - works in any app, anytime.",
  },
  {
    title: "Speak Naturally",
    description:
      "Talk at your normal pace. See real-time streaming preview as you speak (WhisperKit).",
  },
  {
    title: "Text Appears",
    description:
      "Transcribed text is automatically pasted into the active text field. Done.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            How it works in practice
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real product flow, no abstract icon story.
          </p>
        </div>

        <div className="mt-12 reveal-hidden">
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <video
              className="w-full"
              autoPlay
              loop
              muted
              playsInline
              controls
              preload="metadata"
              poster="/og-image.png"
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`reveal-hidden stagger-delay-${(i + 1) * 100} rounded-xl border bg-card p-5 text-left`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Step {i + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
