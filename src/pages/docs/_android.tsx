import { ArrowRight } from "lucide-react";
import { DocsFigure, DocsSection } from "@/components/docs/prose";
import { androidDocSlugs, getAndroidDocPage } from "@/data/android-docs";
import { resolveVersions } from "@/data/versions";
import { localePath, screenshotPath, type Locale } from "@/i18n/index";
import { androidBetaProgram } from "@/lib/android";
import {
  androidVersion,
  getAndroidPlayStoreUrl,
} from "@/lib/platform-download";

const phoneScreenshots = [
  {
    filename: "01-record.png",
    alt: {
      en: "Recording screen of TypeWhisper on Android",
      de: "Aufnahmebildschirm von TypeWhisper auf Android",
    },
  },
  {
    filename: "08-keyboard.png",
    alt: {
      en: "TypeWhisper keyboard in an Android text field",
      de: "TypeWhisper-Tastatur in einem Android-Textfeld",
    },
  },
  {
    filename: "05-email.png",
    alt: {
      en: "Email draft written from a dictation on Android",
      de: "E-Mail-Entwurf aus einem Diktat auf Android",
    },
  },
  {
    filename: "02-inbox.png",
    alt: {
      en: "Inbox with quick dictations in TypeWhisper on Android",
      de: "Inbox mit Schnelldiktaten in TypeWhisper auf Android",
    },
  },
] as const;

/**
 * The product video of the overview, per language. Leave a language out
 * until its render is in public/.
 */
const previewVideos: Partial<Record<Locale, { src: string; poster: string }>> =
  {};

export function androidOverviewHead(locale: Locale) {
  const isDe = locale === "de";
  return {
    heading: "Android",
    badge: resolveVersions(
      isDe ? "Version {androidSeries} stabil" : "Version {androidSeries} stable",
    ),
    lede: isDe
      ? "Private Spracherkennung für Android mit lokalen Engines, eigener Tastatur, Diktier-Bubble für jede App, Profilen, Schnelldiktat, Dateien, Wörterbuch und Textbausteinen."
      : "Private speech-to-text for Android with on-device engines, its own keyboard, a dictation bubble for any app, profiles, quick dictation, files, dictionary, and snippets.",
    download: isDe ? "Bei Google Play laden" : "Get it on Google Play",
  };
}

export default function DocsAndroid({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";
  const playStoreUrl = getAndroidPlayStoreUrl(locale);
  const preview = previewVideos[locale];
  const previewLabel = isDe ? "Die App im Video" : "The app in a video";

  return (
    <>
      <DocsSection
        id="preview"
        label={preview ? previewLabel : undefined}
        title={
          isDe
            ? "Sprechen statt tippen, in jeder App."
            : "Speak instead of typing, in any app."
        }
      >
        <div className={preview ? "docs-beside" : undefined}>
          <div>
            <p>
              {isDe
                ? "TypeWhisper nimmt in der App, über die eigene Tastatur, über die Diktier-Bubble neben deiner gewohnten Tastatur oder per Schnelldiktat auf. Mit einer lokalen Engine bleibt die Aufnahme auf dem Gerät."
                : "TypeWhisper records in the app, through its own keyboard, through the dictation bubble next to the keyboard you already use, or as a quick dictation. With an on-device engine the recording stays on the device."}
            </p>
            <dl className="docs-facts">
              <div>
                <dt>{isDe ? "Handy / Tablet" : "Phone / tablet"}</dt>
                <dd>Android 10+</dd>
              </div>
              <div>
                <dt>{isDe ? "Lokaler Core" : "Local core"}</dt>
                <dd>{isDe ? "Ohne Konto" : "No account"}</dd>
              </div>
              <div>
                <dt>{isDe ? "Bezugsquelle" : "Available on"}</dt>
                <dd>Google Play</dd>
              </div>
            </dl>
          </div>
          {preview && (
            <figure className="docs-figure docs-figure--video">
              <video
                playsInline
                controls
                preload="metadata"
                poster={preview.poster}
                aria-label={previewLabel}
              >
                <source src={preview.src} type="video/mp4" />
                {isDe
                  ? "Dein Browser unterstützt das Video-Tag nicht."
                  : "Your browser does not support the video tag."}
              </video>
            </figure>
          )}
        </div>
      </DocsSection>

      <DocsSection
        headingId="android-guide-title"
        label={isDe ? "Nicht nur eine Featureliste" : "More than a feature list"}
        title={
          isDe
            ? "Die vollständige Android-Anleitung."
            : "The complete Android guide."
        }
      >
        <p>
          {isDe
            ? "Beginne bei Installation und Einrichtung oder springe direkt zu dem Ablauf, den du einrichten oder reparieren möchtest."
            : "Start with installation and setup, or jump straight to the workflow you want to set up or fix."}
        </p>
        <ul className="docs-index">
          {androidDocSlugs.map((slug) => {
            const page = getAndroidDocPage(locale, slug);
            return (
              <li key={slug}>
                <a
                  href={localePath(locale, `/docs/android/${slug}`)}
                  className="docs-index__link"
                >
                  <span className="docs-index__name">{page.title}</span>
                  <span className="docs-index__text">
                    {resolveVersions(page.description)}
                  </span>
                  <ArrowRight aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </DocsSection>

      <DocsSection
        headingId="android-screens-title"
        title={
          isDe ? "So sieht die App aus." : "What the app looks like."
        }
      >
        <p>
          {isDe
            ? "Die Bilder stammen aus dem aktuellen Google-Play-Eintrag und zeigen Aufnahme, Tastatur, einen E-Mail-Entwurf und die Inbox."
            : "These images come from the current Google Play listing and show recording, the keyboard, an email draft, and the Inbox."}
        </p>
        <div className="docs-figures">
          {phoneScreenshots.map((screenshot) => (
            <DocsFigure
              key={screenshot.filename}
              kind="phone"
              src={screenshotPath(
                locale,
                `/screenshots/android/${screenshot.filename}`,
              )}
              alt={screenshot.alt[locale]}
            />
          ))}
        </div>
      </DocsSection>

      <DocsSection
        id="release-status"
        title={
          isDe ? "Aktueller Veröffentlichungsstatus" : "Current release status"
        }
      >
        <p>
          {resolveVersions(
            isDe
              ? "Version {androidVersion} ist als stabiles Release für Handys und Tablets mit Android 10 oder neuer bei Google Play verfügbar."
              : "Version {androidVersion} is available as a stable release for phones and tablets with Android 10 or later on Google Play.",
          )}
        </p>
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-download-social-trigger
          data-download-platform="android"
          data-download-target="android_play_store"
          data-download-version={androidVersion}
          data-tracking-placement="docs"
          className="site-link"
        >
          {isDe ? "Google Play öffnen" : "Open Google Play"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
        <p>
          {isDe
            ? "Neue Versionen gibt es vorab im Betaprogramm. Melde dich auf der Testseite von Google Play als Tester an; Updates kommen dann wie gewohnt über Google Play."
            : "New versions arrive early in the beta program. Join on the Google Play testing page; updates then arrive through Google Play as usual."}{" "}
          <a
            href={androidBetaProgram.optInUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {isDe ? "Am Betaprogramm teilnehmen" : "Join the beta program"}
          </a>
          .
        </p>
      </DocsSection>

      <DocsSection
        id="support"
        title={isDe ? "Direkter Support" : "Direct support"}
      >
        <p>
          {isDe
            ? "In der App findest du unter Einstellungen → Feedback senden einen direkten Weg zu uns. Für Fragen zur Android-Version schreib an "
            : "In the app, Settings → Send feedback reaches us directly. For questions about the Android edition, email "}
          <a href="mailto:hello@typewhisper.com">hello@typewhisper.com</a>.
        </p>
      </DocsSection>
    </>
  );
}
