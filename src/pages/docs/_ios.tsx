import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Smartphone } from "lucide-react";
import { iosTestFlightUrl } from "@/lib/platform-download";
import type { Locale } from "@/i18n/index";

export default function DocsIOS({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  return (
      <div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Smartphone className="size-8 text-primary" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <h1 className="font-display text-3xl font-bold tracking-tight">
              iOS
            </h1>
            <Badge variant="outline">Alpha</Badge>
          </div>
          <p className="mt-2 max-w-md text-lg text-muted-foreground">
            {isDe
              ? "TypeWhisper für iOS ist derzeit eine frühe Alpha über Apple TestFlight. Es ist eine experimentelle Vorschau auf lokale Sprache-zu-Text-Funktionen für iPhone und iPad."
              : "TypeWhisper for iOS is currently an early alpha through Apple TestFlight. It is an experimental preview of on-device speech-to-text for iPhone and iPad."}
          </p>

          <Button size="lg" className="mt-8" asChild>
            <a
              href={iosTestFlightUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {isDe ? "TestFlight Alpha beitreten" : "Join TestFlight Alpha"}
              <ArrowUpRight className="size-4" />
            </a>
          </Button>

          <div className="mt-12 max-w-md text-left space-y-6">
            <div>
              <h2 className="font-display text-lg font-semibold">
                {isDe ? "So trittst du der Beta bei" : "How to join the beta"}
              </h2>
              <ol className="mt-2 list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>
                  {isDe ? "Installiere " : "Install "}
                  <a
                    href="https://apps.apple.com/app/testflight/id899247664"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground"
                  >
                    TestFlight
                  </a>{" "}
                  {isDe ? "aus dem App Store, falls du es noch nicht hast." : "from the App Store if you don&apos;t have it yet."}
                </li>
                <li>
                  {isDe ? "Öffne den " : "Tap the "}
                  <a
                    href={iosTestFlightUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground"
                  >
                    {isDe ? "TestFlight-Einladungslink" : "TestFlight invite link"}
                  </a>{" "}
                  {isDe ? "auf deinem iOS-Gerät." : "on your iOS device."}
                </li>
                <li>{isDe ? "Akzeptiere die Einladung und installiere TypeWhisper." : "Accept the invite and install TypeWhisper."}</li>
              </ol>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold">
                {isDe ? "Alpha-Hinweis" : "Alpha notice"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isDe
                  ? "Dieser Build ist noch experimentell. Rechne mit fehlenden Features, rauen Kanten und häufigen Änderungen, während das mobile Erlebnis Form annimmt. Feedback über TestFlight ist in dieser Phase besonders hilfreich."
                  : "This build is still experimental. Expect missing features, rough edges, and frequent changes while the mobile experience takes shape. Feedback through TestFlight is especially helpful at this stage."}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
