import { Smartphone, Monitor, Cpu, Shield, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function PlatformCard({
  icon: Icon,
  title,
  description,
  nativeLabel,
}: {
  icon: typeof Smartphone;
  title: string;
  description: string;
  nativeLabel: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-8 text-center">
      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
        <Icon className="size-8 text-primary" />
      </div>

      <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      <div className="mt-8 grid grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <Cpu className="size-5 text-muted-foreground" />
          <p className="text-sm font-semibold">On-Device</p>
          <p className="text-xs text-muted-foreground">Fully private</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Sparkles className="size-5 text-muted-foreground" />
          <p className="text-sm font-semibold">Native</p>
          <p className="text-xs text-muted-foreground">{nativeLabel}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Shield className="size-5 text-muted-foreground" />
          <p className="text-sm font-semibold">Free</p>
          <p className="text-xs text-muted-foreground">No subscriptions</p>
        </div>
      </div>
    </div>
  );
}

export function PlatformsComingSoon() {
  return (
    <section className="py-20 sm:py-28 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center reveal-hidden">
          <Badge variant="secondary" className="mb-4">
            Coming Soon
          </Badge>

          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Coming to More Platforms
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            TypeWhisper is expanding. The same powerful on-device transcription
            - natively built for more platforms, completely free.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <PlatformCard
              icon={Smartphone}
              title="iOS"
              description="Coming to iPhone and iPad."
              nativeLabel="Built for iOS"
            />
            <PlatformCard
              icon={Monitor}
              title="Windows"
              description="Coming to Windows desktop."
              nativeLabel="Built for Windows"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
