import { DocsLayout } from "@/components/layout/docs-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Smartphone } from "lucide-react";
import { iosTestFlightUrl } from "@/lib/platform-download";

export default function DocsIOS() {
  return (
    <DocsLayout>
      <div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Smartphone className="size-8 text-primary" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <h1 className="font-display text-3xl font-bold tracking-tight">
              iOS
            </h1>
            <Badge variant="outline">Beta</Badge>
          </div>
          <p className="mt-2 max-w-md text-lg text-muted-foreground">
            TypeWhisper for iOS is available as a beta through Apple TestFlight.
            Get on-device speech-to-text on your iPhone and iPad.
          </p>

          <Button size="lg" className="mt-8" asChild>
            <a
              href={iosTestFlightUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join TestFlight Beta
              <ArrowUpRight className="size-4" />
            </a>
          </Button>

          <div className="mt-12 max-w-md text-left space-y-6">
            <div>
              <h2 className="font-display text-lg font-semibold">
                How to join the beta
              </h2>
              <ol className="mt-2 list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>
                  Install{" "}
                  <a
                    href="https://apps.apple.com/app/testflight/id899247664"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground"
                  >
                    TestFlight
                  </a>{" "}
                  from the App Store if you don&apos;t have it yet.
                </li>
                <li>
                  Tap the{" "}
                  <a
                    href={iosTestFlightUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground"
                  >
                    TestFlight invite link
                  </a>{" "}
                  on your iOS device.
                </li>
                <li>Accept the invite and install TypeWhisper.</li>
              </ol>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold">
                Beta notice
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                This is a beta release. You may encounter bugs or incomplete
                features. Your feedback helps us improve - you can report issues
                directly through TestFlight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
