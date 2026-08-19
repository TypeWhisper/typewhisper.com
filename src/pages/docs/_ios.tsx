import { Badge } from "@/components/ui/badge";
import { Screenshot } from "@/components/ui/screenshot";
import { Clock3, Mail, Smartphone } from "lucide-react";
import { screenshotPath, type Locale } from "@/i18n/index";

const screenshots = [
  {
    filename: "01-recording.png",
    alt: {
      en: "TypeWhisper recording and live transcription on iPhone",
      de: "TypeWhisper-Aufnahme und Live-Transkription auf dem iPhone",
    },
  },
  {
    filename: "03-keyboard.png",
    alt: {
      en: "TypeWhisper voice keyboard on iPhone",
      de: "TypeWhisper-Diktier-Tastatur auf dem iPhone",
    },
  },
  {
    filename: "05-profiles.png",
    alt: {
      en: "TypeWhisper formatting profiles on iPhone",
      de: "TypeWhisper-Formatierungsprofile auf dem iPhone",
    },
  },
] as const;

const watchScreenshots = [
  {
    filename: "01-ready.webp",
    alt: {
      en: "TypeWhisper ready to dictate on Apple Watch",
      de: "TypeWhisper bereit zum Diktieren auf der Apple Watch",
    },
  },
  {
    filename: "02-recording.webp",
    alt: {
      en: "TypeWhisper recording on Apple Watch",
      de: "Laufende TypeWhisper-Aufnahme auf der Apple Watch",
    },
  },
  {
    filename: "03-recent.webp",
    alt: {
      en: "Recent TypeWhisper dictations on Apple Watch",
      de: "Letzte TypeWhisper-Diktate auf der Apple Watch",
    },
  },
] as const;

export default function DocsIOS({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";
  const previewPoster = screenshotPath(
    locale,
    "/screenshots/ios/01-recording.webp",
  );
  const previewSrc = isDe
    ? "/ios-app-preview-de.mp4"
    : "/ios-app-preview-en.mp4";

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-12 text-center sm:py-16">
        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Smartphone className="size-8 text-primary" />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            iOS
          </h1>
          <Badge variant="outline">
            {isDe ? "Prüfung ausstehend" : "Review Pending"}
          </Badge>
        </div>
        <p className="mt-2 max-w-xl text-lg text-muted-foreground">
          {isDe
            ? "Private Spracherkennung für iPhone und iPad mit lokalen Modellen, Diktier-Tastatur, Profilen, Übersetzung, Wörterbuch, Snippets und Apple Watch. Das Release wurde bei Apple eingereicht."
            : "Private speech-to-text for iPhone and iPad with on-device models, a voice keyboard, profiles, translation, dictionary, snippets, and Apple Watch. The release has been submitted to Apple."}
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-2.5 text-sm font-medium text-amber-700 dark:text-amber-300">
          <Clock3 className="size-4" />
          {isDe ? "Bald im App Store" : "Coming soon to the App Store"}
        </div>
      </div>

      <section aria-labelledby="ios-gallery-title">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="ios-gallery-title"
            className="font-display text-2xl font-semibold"
          >
            {isDe ? "TypeWhisper auf dem iPhone" : "TypeWhisper on iPhone"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {isDe
              ? "Aufnehmen, in anderen Apps diktieren und für jeden Text das passende Profil wählen."
              : "Record, dictate in other apps, and choose the right profile for every piece of text."}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.filename}
              className="overflow-hidden rounded-2xl border bg-card p-1.5 shadow-xl shadow-black/10"
            >
              <Screenshot
                src={screenshotPath(
                  locale,
                  `/screenshots/ios/${screenshot.filename}`,
                )}
                alt={screenshot.alt[locale]}
                className="w-full rounded-xl"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="ios-preview-title">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="ios-preview-title"
            className="font-display text-2xl font-semibold"
          >
            {isDe ? "Die App-Vorschau" : "App Preview"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {isDe
              ? "Der 26-sekündige Preview zeigt lokales Diktieren, Live-Text und Wörterbuch-Korrekturen."
              : "The 30-second App Preview shows dictation in TypeWhisper and the voice keyboard in another app."}
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-64 overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-black/20 sm:max-w-72">
          <video
            className="w-full"
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

      <section className="mt-14" aria-labelledby="ios-watch-title">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="ios-watch-title"
            className="font-display text-2xl font-semibold"
          >
            {isDe
              ? "TypeWhisper auf der Apple Watch"
              : "TypeWhisper on Apple Watch"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {isDe
              ? "Starte ein fokussiertes Diktat direkt am Handgelenk und übertrage die Aufnahme anschließend an dein iPhone."
              : "Start a focused dictation from your wrist, then transfer the recording to your iPhone."}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {watchScreenshots.map((screenshot) => (
            <div
              key={screenshot.filename}
              className="overflow-hidden rounded-2xl border bg-card p-1.5 shadow-xl shadow-black/10"
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

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border bg-card p-6">
          <h2 className="font-display text-xl font-semibold">
            {isDe ? "Was enthalten ist" : "What is included"}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-primary">
            <li>
              {isDe
                ? "Lokale Transkription mit WhisperKit, Apple Speech und Parakeet sowie optionale Cloud-Engines."
                : "On-device transcription with WhisperKit, Apple Speech, and Parakeet, plus optional cloud engines."}
            </li>
            <li>
              {isDe
                ? "Diktieren in der App, in anderen Apps über die TypeWhisper-Tastatur oder aus vorhandenen Audio- und Videodateien."
                : "Dictation in the app, in other apps through the TypeWhisper keyboard, or from existing audio and video files."}
            </li>
            <li>
              {isDe
                ? "Profile für Sprache, Modell, Übersetzung, Flüstermodus und intelligente Formatierung."
                : "Profiles for language, model, translation, whisper mode, and smart formatting."}
            </li>
            <li>
              {isDe
                ? "Verlauf, persönliches Wörterbuch, Snippets und Übertragung von Apple-Watch-Aufnahmen."
                : "History, personal dictionary, snippets, and Apple Watch recording transfer."}
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border bg-card p-6">
          <h2 className="font-display text-xl font-semibold">
            {isDe
              ? "Voraussetzungen und Datenschutz"
              : "Requirements and privacy"}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-primary">
            <li>
              {isDe
                ? "iOS oder iPadOS 18.0 oder neuer"
                : "iOS or iPadOS 18.0 or later"}
            </li>
            <li>
              {isDe
                ? "watchOS 11.0 oder neuer für die Watch-App"
                : "watchOS 11.0 or later for the Watch app"}
            </li>
            <li>
              {isDe
                ? "Lokale Engines verarbeiten Audiodaten auf dem Gerät. Cloud-Anbieter werden nur verwendet, wenn du sie bewusst auswählst."
                : "On-device engines process audio locally. Cloud providers are used only when you explicitly choose them."}
            </li>
            <li>
              {isDe
                ? "Lokales Diktieren, Wörterbuch und Snippets bleiben ohne Account oder Abo verfügbar."
                : "Core local dictation, dictionary, and snippet features remain available without an account or subscription."}
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border bg-card p-6">
          <div className="flex items-start gap-3">
            <Clock3 className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <h2 className="font-display text-xl font-semibold">
                {isDe ? "Was als Nächstes passiert" : "What happens next"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {isDe
                  ? "Sobald Apple das Release freigibt, erscheint hier der offizielle App-Store-Link. Ein genaues Datum können wir bis zum Abschluss der Prüfung nicht nennen."
                  : "Once Apple approves the release, the official App Store link will appear here. We cannot give an exact date until the review is complete."}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-6">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <h2 className="font-display text-xl font-semibold">
                {isDe ? "Direkter Support" : "Direct support"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {isDe
                  ? "Wenn nach dem Release Installation, Diktieren, Tastatur, Premium oder Sync nicht wie erwartet funktionieren, schreib an "
                  : "If installation, dictation, keyboard, Premium, or sync does not work as expected after release, email "}
                <a
                  href="mailto:licensing@typewhisper.com"
                  className="text-primary underline hover:text-primary/80"
                >
                  licensing@typewhisper.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
