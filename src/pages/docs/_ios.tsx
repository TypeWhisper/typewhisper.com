import { ArrowRight, Download, Mail, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Screenshot } from "@/components/ui/screenshot";
import { getIosDocTitle, iosDocSlugs } from "@/data/ios-docs";
import { localePath, screenshotPath, type Locale } from "@/i18n/index";
import { getIosAppStoreUrl, iosVersion } from "@/lib/platform-download";

const phoneScreenshots = [
  {
    filename: "01-recording.png",
    alt: {
      en: "TypeWhisper recording with live transcription on iPhone",
      de: "TypeWhisper-Aufnahme mit Live-Transkription auf dem iPhone",
    },
  },
  {
    filename: "03-keyboard.png",
    alt: {
      en: "TypeWhisper voice keyboard in an iPhone text field",
      de: "TypeWhisper-Diktier-Tastatur in einem iPhone-Textfeld",
    },
  },
  {
    filename: "04-history.png",
    alt: {
      en: "TypeWhisper History and Capture Inbox on iPhone",
      de: "TypeWhisper-Verlauf und Capture Inbox auf dem iPhone",
    },
  },
  {
    filename: "05-profiles.png",
    alt: {
      en: "TypeWhisper profiles on iPhone",
      de: "TypeWhisper-Profile auf dem iPhone",
    },
  },
] as const;

const watchScreenshots = [
  {
    filename: "01-ready.png",
    alt: {
      en: "TypeWhisper ready to record on Apple Watch",
      de: "TypeWhisper aufnahmebereit auf der Apple Watch",
    },
  },
  {
    filename: "02-recording.png",
    alt: {
      en: "TypeWhisper recording in progress on Apple Watch",
      de: "Laufende TypeWhisper-Aufnahme auf der Apple Watch",
    },
  },
  {
    filename: "03-recent.png",
    alt: {
      en: "Recent TypeWhisper recordings on Apple Watch",
      de: "Letzte TypeWhisper-Aufnahmen auf der Apple Watch",
    },
  },
] as const;

export default function DocsIOS({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";
  const iosAppStoreUrl = getIosAppStoreUrl(locale);
  const previewSrc = isDe
    ? "/ios-app-preview-de.mp4"
    : "/ios-app-preview-en.mp4";
  const previewPoster = screenshotPath(
    locale,
    "/screenshots/ios/01-recording.webp",
  );

  return (
    <div>
      <header className="border-b border-border pb-10 pt-4 sm:pb-12 sm:pt-8">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-border bg-card">
          <Smartphone className="size-7 text-primary" />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl font-bold tracking-tight">
            iOS
          </h1>
          <Badge variant="outline">
            {isDe ? "Version 1.0 stabil" : "Version 1.0 stable"}
          </Badge>
        </div>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {isDe
            ? "Private Sprache-zu-Text für iPhone, iPad und Apple Watch mit lokalen Engines, Diktier-Tastatur, Live-Text, Capture Inbox, Profilen, Dateien, Wörterbuch, Snippets, Kurzbefehlen und optionalem Premium-Sync."
            : "Private speech-to-text for iPhone, iPad, and Apple Watch with on-device engines, a voice keyboard, live text, Capture Inbox, profiles, files, dictionary, snippets, Shortcuts, and optional Premium sync."}
        </p>
        <Button size="pill" asChild className="mt-6">
          <a
            href={iosAppStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-download-social-trigger
            data-download-platform="ios"
            data-download-target="ios_app_store"
            data-download-version={iosVersion}
            data-tracking-placement="docs"
          >
            <Download className="size-4" />
            {isDe ? "Im App Store laden" : "Download on the App Store"}
          </a>
        </Button>
      </header>

      <section className="grid gap-10 border-b border-border py-12 lg:grid-cols-[1fr_18rem] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {isDe ? "Aktuelle App-Vorschau" : "Current App Preview"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            {isDe
              ? "Der komplette Ablauf in 30 Sekunden."
              : "The complete flow in 30 seconds."}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            {isDe
              ? "Die aktuelle Studio-Fassung zeigt Aufnahme, Live-Text und den Rückweg über die TypeWhisper-Tastatur in ein anderes Textfeld."
              : "The current Studio cut shows recording, live text, and the return flow through the TypeWhisper keyboard into another text field."}
          </p>
          <dl className="mt-7 grid gap-5 border-y border-border py-5 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                iPhone / iPad
              </dt>
              <dd className="mt-1 font-semibold">iOS 18+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Apple Watch
              </dt>
              <dd className="mt-1 font-semibold">watchOS 11+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {isDe ? "Lokaler Core" : "Local core"}
              </dt>
              <dd className="mt-1 font-semibold">
                {isDe ? "Ohne Account" : "No account"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="mx-auto w-full max-w-[17rem] overflow-hidden rounded-[2rem] border border-border bg-card p-1.5 shadow-2xl shadow-black/20">
          <video
            className="w-full rounded-[1.6rem]"
            playsInline
            controls
            preload="metadata"
            poster={previewPoster}
          >
            <source src={previewSrc} type="video/mp4" />
            {isDe
              ? "Dein Browser unterstützt das Video-Tag nicht."
              : "Your browser does not support the video tag."}
          </video>
        </div>
      </section>

      <section
        className="border-b border-border py-12"
        aria-labelledby="ios-guide-title"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {isDe ? "Nicht nur eine Featureliste" : "More than a feature list"}
        </p>
        <h2
          id="ios-guide-title"
          className="mt-3 font-display text-3xl font-semibold tracking-tight"
        >
          {isDe ? "Die vollständige iOS-Anleitung." : "The complete iOS guide."}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          {isDe
            ? "Beginne bei Installation und Berechtigungen oder springe direkt zu dem Ablauf, den du einrichten oder reparieren möchtest."
            : "Start with installation and permissions, or jump straight to the workflow you want to set up or fix."}
        </p>

        <div className="mt-8 border-y border-border">
          {iosDocSlugs.map((slug, index) => (
            <a
              key={slug}
              href={localePath(locale, `/docs/ios/${slug}`)}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-border py-4 last:border-b-0"
            >
              <span className="font-mono text-xs text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-semibold text-foreground group-hover:text-primary">
                {getIosDocTitle(locale, slug)}
              </span>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </a>
          ))}
        </div>
      </section>

      <section
        className="border-b border-border py-12"
        aria-labelledby="ios-screens-title"
      >
        <h2
          id="ios-screens-title"
          className="font-display text-3xl font-semibold tracking-tight"
        >
          {isDe
            ? "iPhone und iPad, aktuell abgebildet."
            : "iPhone and iPad, shown as they are now."}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          {isDe
            ? "Die Motive stammen aus den aktuellen lokalisierten App-Store-Renderings und zeigen Aufnahme, Tastatur sowie Verlauf und Capture Inbox."
            : "These images come from the current localized App Store renders and show recording, keyboard, and History with Capture Inbox."}
        </p>
        <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
          {phoneScreenshots.map((screenshot) => (
            <div
              key={screenshot.filename}
              className="w-[14rem] flex-none snap-center overflow-hidden rounded-[2rem] border border-border bg-card p-1.5 shadow-xl shadow-black/10 sm:w-[16rem]"
            >
              <Screenshot
                src={screenshotPath(
                  locale,
                  `/screenshots/ios/${screenshot.filename}`,
                )}
                alt={screenshot.alt[locale]}
                className="w-full rounded-[1.6rem]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-xl shadow-black/10">
          <Screenshot
            src={screenshotPath(locale, "/screenshots/ios/ipad/03-inbox.png")}
            alt={
              isDe
                ? "TypeWhisper Capture Inbox auf dem iPad"
                : "TypeWhisper Capture Inbox on iPad"
            }
            className="w-full rounded-xl"
            loading="lazy"
          />
        </div>
      </section>

      <section
        className="border-b border-border py-12"
        aria-labelledby="ios-watch-title"
      >
        <h2
          id="ios-watch-title"
          className="font-display text-3xl font-semibold tracking-tight"
        >
          {isDe ? "Aufnehmen am Handgelenk." : "Capture from your wrist."}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          {isDe
            ? "Starte eine fokussierte Aufnahme auf der Apple Watch, übertrage sie ans iPhone und prüfe das Ergebnis in der Capture Inbox."
            : "Start a focused recording on Apple Watch, transfer it to iPhone, and review the result in Capture Inbox."}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {watchScreenshots.map((screenshot) => (
            <div
              key={screenshot.filename}
              className="overflow-hidden rounded-2xl border border-border bg-card p-1.5"
            >
              <Screenshot
                src={screenshotPath(
                  locale,
                  `/screenshots/ios/watch/${screenshot.filename}`,
                )}
                alt={screenshot.alt[locale]}
                className="w-full rounded-xl"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 py-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold">
            {isDe
              ? "Aktueller Veröffentlichungsstatus"
              : "Current release status"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {isDe
              ? "Version 1.0 ist als stabiles Release für iPhone und iPad im App Store verfügbar. Die Apple-Watch-App ist enthalten."
              : "Version 1.0 is available as a stable release for iPhone and iPad on the App Store. The Apple Watch app is included."}
          </p>
          <a
            href={iosAppStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-download-social-trigger
            data-download-platform="ios"
            data-download-target="ios_app_store"
            data-download-version={iosVersion}
            data-tracking-placement="docs"
            className="mt-3 inline-block text-sm text-primary underline hover:text-primary/80"
          >
            {isDe ? "App Store öffnen" : "Open the App Store"}
          </a>
        </div>
        <div className="border-l border-border pl-6">
          <Mail className="size-5 text-primary" />
          <h2 className="mt-3 font-display text-2xl font-semibold">
            {isDe ? "Direkter Support" : "Direct support"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {isDe
              ? "Für konkrete Fragen zur iOS-Version: "
              : "For specific questions about the iOS edition, email "}
            <a
              href="mailto:hello@typewhisper.com"
              className="text-primary underline hover:text-primary/80"
            >
              hello@typewhisper.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
