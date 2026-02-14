import { Smartphone, Cpu, Shield, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function IosComingSoon() {
  return (
    <section className="py-20 sm:py-28 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center reveal-hidden">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Smartphone className="size-8 text-primary" />
          </div>

          <Badge variant="secondary" className="mb-4">
            Coming Soon
          </Badge>

          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Coming to iOS
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            TypeWhisper is coming to iPhone and iPad. The same powerful on-device
            transcription — natively built for iOS, completely free.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 text-center max-w-md mx-auto">
            <div className="flex flex-col items-center gap-2">
              <Cpu className="size-5 text-muted-foreground" />
              <p className="text-sm font-semibold">On-Device</p>
              <p className="text-xs text-muted-foreground">
                Fully private
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="size-5 text-muted-foreground" />
              <p className="text-sm font-semibold">Native</p>
              <p className="text-xs text-muted-foreground">
                Built for iOS
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="size-5 text-muted-foreground" />
              <p className="text-sm font-semibold">Free</p>
              <p className="text-xs text-muted-foreground">
                No subscriptions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
