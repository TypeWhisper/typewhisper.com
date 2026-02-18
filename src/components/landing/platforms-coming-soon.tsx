import {
  ArrowUpRight,
  Cpu,
  Monitor,
  Shield,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { iosTestFlightUrl } from "@/lib/platform-download";

function PlatformCard({
  icon: Icon,
  title,
  description,
  nativeLabel,
  status,
  downloadHref,
  downloadLabel,
  className,
}: {
  icon: typeof Smartphone;
  title: string;
  description: string;
  nativeLabel: string;
  status: "Available Now" | "Beta" | "Coming Soon";
  downloadHref?: string;
  downloadLabel?: string;
  className?: string;
}) {
  const badgeVariant =
    status === "Available Now"
      ? "default"
      : status === "Beta"
        ? "outline"
        : "secondary";

  return (
    <div className={`rounded-2xl border bg-card p-8 text-center ${className ?? ""}`}>
      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
        <Icon className="size-8 text-primary" />
      </div>

      <div className="flex items-center justify-center gap-2">
        <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          {title}
        </h3>
        <Badge variant={badgeVariant}>{status}</Badge>
      </div>
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

      {downloadHref && (
        <Button size="lg" className="mt-8" asChild>
          <a href={downloadHref} target="_blank" rel="noopener noreferrer">
            {downloadLabel ?? `Download for ${title}`}
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      )}
    </div>
  );
}

export function PlatformsComingSoon() {
  return (
    <section className="py-20 sm:py-28 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center reveal-hidden">
          <Badge variant="secondary" className="mb-4">
            Available on All Platforms
          </Badge>

          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            More platforms, same local privacy
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            TypeWhisper runs on macOS, Windows, and iOS.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <PlatformCard
              icon={Smartphone}
              title="iOS"
              description="Available now as Beta for iPhone and iPad."
              nativeLabel="Built for iOS"
              status="Beta"
              downloadHref={iosTestFlightUrl}
              downloadLabel="Join TestFlight Beta"
              className="reveal-hidden stagger-delay-100"
            />
            <PlatformCard
              icon={Monitor}
              title="Windows"
              description="Available now for Windows desktop."
              nativeLabel="Built for Windows"
              status="Available Now"
              downloadHref="https://github.com/TypeWhisper/typewhisper-win/releases"
              downloadLabel="Download for Windows"
              className="reveal-hidden stagger-delay-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
