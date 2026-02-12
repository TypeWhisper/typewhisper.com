import { Keyboard, Mic, Type } from "lucide-react";

const steps = [
  {
    icon: Keyboard,
    title: "Press Your Hotkey",
    description:
      "Trigger recording with a global keyboard shortcut — works in any app, anytime.",
  },
  {
    icon: Mic,
    title: "Speak Naturally",
    description:
      "Talk at your normal pace. See real-time streaming preview as you speak (WhisperKit).",
  },
  {
    icon: Type,
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
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps. No setup required beyond downloading.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`reveal-hidden stagger-delay-${(i + 1) * 100} flex flex-col items-center text-center`}
            >
              <div className="relative mb-6">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                  <step.icon className="size-7 text-primary" />
                </div>
                <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
