import { Badge } from "@/components/ui/badge";
import { Clock3, Smartphone } from "lucide-react";
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
            <Badge variant="outline">{isDe ? "Prüfung ausstehend" : "Review Pending"}</Badge>
          </div>
          <p className="mt-2 max-w-md text-lg text-muted-foreground">
            {isDe
              ? "TypeWhisper für iPhone und iPad wurde bei Apple eingereicht und wartet auf die Freigabe für den App Store."
              : "TypeWhisper for iPhone and iPad has been submitted to Apple and is waiting for App Store approval."}
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-2.5 text-sm font-medium text-amber-700 dark:text-amber-300">
            <Clock3 className="size-4" />
            {isDe ? "Bald im App Store" : "Coming soon to the App Store"}
          </div>

          <div className="mt-12 max-w-md text-left">
            <div>
              <h2 className="font-display text-lg font-semibold">
                {isDe ? "Was als Nächstes passiert" : "What happens next"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isDe
                  ? "Sobald Apple das Release freigibt, erscheint hier der offizielle App-Store-Link. Ein genaues Datum können wir bis zum Abschluss der Prüfung nicht nennen."
                  : "Once Apple approves the release, the official App Store link will appear here. We cannot give an exact date until the review is complete."}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
