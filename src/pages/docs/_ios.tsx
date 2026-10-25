import { ArrowRight } from "lucide-react";
import {
  DocsCallout,
  DocsFigure,
  DocsSection,
  DocsSubheading,
} from "@/components/docs/prose";
import { StudioVideo } from "@/components/ui/studio-video";
import { getIosDocPage, iosDocSlugs } from "@/data/ios-docs";
import { resolveVersions } from "@/data/versions";
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

// What the App Store release notes of 1.2 name.
const newIn12 = [
  {
    en: "Use your Mac: transcribe with its speech models and write with its language models and workflows (Premium, TypeWhisper for Mac 1.8 or later)",
    de: "Deinen Mac nutzen: mit seinen Spracherkennungsmodellen transkribieren und mit seinen Sprachmodellen und Workflows schreiben (Premium, TypeWhisper für Mac ab 1.8)",
    anchor: "mac",
  },
  {
    en: "On-device speaker detection with names, corrected turns, and optional local voice profiles (Premium)",
    de: "Sprechererkennung auf dem Gerät mit Namen, korrigierbaren Wortbeiträgen und optionalen lokalen Stimmprofilen (Premium)",
  },
  {
    en: "Read transcripts and results aloud with the voices installed on your device",
    de: "Transkripte und Ergebnisse mit den installierten Stimmen deines Geräts vorlesen lassen",
  },
  {
    en: "Ask questions about a transcript with your selected writing service (Premium)",
    de: "Fragen zu einem Transkript über deinen gewählten Schreibdienst stellen (Premium)",
  },
  {
    en: "Create a dictionary correction from misrecognized text in a transcript (Premium)",
    de: "Aus falsch erkanntem Text im Transkript eine Wörterbuchkorrektur anlegen (Premium)",
  },
  {
    en: "Gemini transcription with a live mode, Soniox live transcription, and Parakeet Ultra on supported devices",
    de: "Gemini-Transkription mit Live-Modus, Soniox-Live-Transkription und Parakeet Ultra auf unterstützten Geräten",
  },
  {
    en: "Ogg Opus voice notes, including WhatsApp, and a persistent queue for shared audio and video files",
    de: "Ogg-Opus-Sprachnachrichten, etwa aus WhatsApp, und eine dauerhafte Warteschlange für geteilte Audio- und Videodateien",
  },
] as const;

// What the App Store release notes of 1.1 name, with the guide that explains it.
const newIn11 = [
  {
    en: "On-device writing models that process text on the device",
    de: "Lokale Schreibmodelle, die Text auf dem Gerät verarbeiten",
    path: "/docs/ios/profiles-and-processing#section-4",
  },
  {
    en: "Dictionary imports with a preview",
    de: "Wörterbuchimporte mit Vorschau",
    path: "/docs/ios/dictionary-and-snippets#section-4",
  },
  {
    en: "Recording controls for Control Center and the Action Button",
    de: "Aufnahmesteuerungen für das Kontrollzentrum und die Aktionstaste",
    path: "/docs/ios/watch-and-shortcuts#section-4",
  },
  {
    en: "Optional Meta speech and writing services",
    de: "Optionale Meta-Dienste für Spracherkennung und Textbearbeitung",
    path: "/docs/ios/profiles-and-processing#section-1",
  },
  {
    en: "Better VoiceOver support",
    de: "Bessere VoiceOver-Unterstützung",
  },
  {
    en: "Faster and more reliable history search, transcript playback, keyboard suggestions, and audio handling",
    de: "Schnellere und zuverlässigere Verlaufssuche, Transkriptwiedergabe, Tastaturvorschläge und Audioverarbeitung",
  },
] as const;

export function iosOverviewHead(locale: Locale) {
  const isDe = locale === "de";
  return {
    heading: "iOS",
    badge: resolveVersions(
      isDe ? "Version {iosSeries} stabil" : "Version {iosSeries} stable",
    ),
    lede: isDe
      ? "Private Sprache-zu-Text für iPhone, iPad und Apple Watch mit lokalen Engines, Diktier-Tastatur, Live-Text, Capture Inbox, Profilen, Dateien, Wörterbuch, Snippets, Kurzbefehlen und optionalem Premium-Sync."
      : "Private speech-to-text for iPhone, iPad, and Apple Watch with on-device engines, a voice keyboard, live text, Capture Inbox, profiles, files, dictionary, snippets, Shortcuts, and optional Premium sync.",
    download: isDe ? "Im App Store laden" : "Download on the App Store",
  };
}

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
  const previewLabel = isDe ? "Aktuelle App-Vorschau" : "Current App Preview";

  return (
    <>
      <DocsSection
        id="preview"
        label={previewLabel}
        title={
          isDe
            ? "Der komplette Ablauf in 30 Sekunden."
            : "The complete flow in 30 seconds."
        }
      >
        <div className="docs-beside">
          <div>
            <p>
              {isDe
                ? "Die aktuelle Studio-Fassung zeigt Aufnahme, Live-Text und den Rückweg über die TypeWhisper-Tastatur in ein anderes Textfeld."
                : "The current Studio cut shows recording, live text, and the return flow through the TypeWhisper keyboard into another text field."}
            </p>
            <dl className="docs-facts">
              <div>
                <dt>iPhone / iPad</dt>
                <dd>iOS 18+</dd>
              </div>
              <div>
                <dt>Apple Watch</dt>
                <dd>watchOS 11+</dd>
              </div>
              <div>
                <dt>{isDe ? "Lokaler Core" : "Local core"}</dt>
                <dd>{isDe ? "Ohne Account" : "No account"}</dd>
              </div>
            </dl>
          </div>
          <figure className="docs-figure docs-figure--video">
            <video
              playsInline
              controls
              preload="metadata"
              poster={previewPoster}
              aria-label={previewLabel}
            >
              <source src={previewSrc} type="video/mp4" />
              {isDe
                ? "Dein Browser unterstützt das Video-Tag nicht."
                : "Your browser does not support the video tag."}
            </video>
          </figure>
        </div>
      </DocsSection>

      <DocsSection id="mac" title={isDe ? "Mit deinem Mac" : "Use your Mac"}>
        <p>
          {isDe
            ? "Ab Version 1.2 koppelst du dein iPhone oder iPad über das lokale Netzwerk mit TypeWhisper für Mac. Du transkribierst dann mit einem Spracherkennungsmodell auf dem Mac, nutzt seine Sprachmodelle für deine Formate oder führst seine Text-Workflows beim Diktieren in der App oder Tastatur aus."
            : "From version 1.2, you pair your iPhone or iPad with TypeWhisper for Mac over the local network. You then transcribe with a speech model on the Mac, use its language models for your formats, or run its text-processing workflows when dictating in the app or keyboard."}
        </p>
        <StudioVideo
          slug="mac-ios-release"
          locale={locale}
          label={
            isDe
              ? "TypeWhisper 1.8 für den Mac und 1.2 fürs iPhone"
              : "TypeWhisper 1.8 for Mac and 1.2 for iPhone"
          }
          caption={
            isDe
              ? "Kopplung mit Code, Diktat auf dem iPhone, Transkription auf dem Mac und ein Mac-Workflow. 67 Sekunden, mit Untertiteln."
              : "Pairing with a code, dictating on iPhone, transcribing on the Mac, and a Mac workflow. 67 seconds, with captions."
          }
        />
        <ol>
          <li>
            {isDe
              ? "Öffne auf dem Mac TypeWhisper-Einstellungen > Premium > iPhone und iPad, erlaube gekoppelte Geräte und klicke auf „Gerät koppeln …“."
              : "On your Mac, open TypeWhisper Settings > Premium > iPhone and iPad, allow paired devices, and click Pair Device…"}
          </li>
          <li>
            {isDe
              ? "Gehe in TypeWhisper auf dem iPhone zu Einstellungen > Mac und wähle deinen Mac unter „Macs in diesem Netzwerk“."
              : "In TypeWhisper on the iPhone, go to Settings > Mac and choose your Mac under Macs on This Network."}
          </li>
          <li>
            {isDe
              ? "Prüfe, ob beide Geräte denselben sechsstelligen Code zeigen. Tippe auf „Die Codes stimmen überein“ und bestätige auf dem Mac."
              : "Check that both devices show the same six-digit code. Tap The Codes Match and approve on the Mac."}
          </li>
          <li>
            {isDe
              ? "Tippe auf „Für Spracherkennung verwenden“ und wähle unter „Modell auf dem Mac“ ein Modell oder „Wie auf dem Mac ausgewählt“."
              : "Tap Use for Speech Recognition and choose a model under Model on the Mac, or As Selected on the Mac."}
          </li>
        </ol>
        <p>
          {isDe
            ? "Sprachmodelle und Workflows des Macs stehen bereit, wenn auf dem Mac „Schreiben mit diesem Mac erlauben“ eingeschaltet ist. Jeder Workflow erscheint als Format am Ende deiner Formatliste."
            : "The Mac's language models and workflows are available when Allow Writing with This Mac is on. Each workflow appears as a format at the end of your format list."}
        </p>
        <DocsCallout label={isDe ? "Voraussetzungen" : "Requirements"}>
          <p>
            {isDe
              ? "TypeWhisper für Mac ab Version 1.8 im selben lokalen Netzwerk und Zugang zu den Premium-Funktionen auf beiden Geräten. Die Verbindung ist verschlüsselt. Die auf dem Mac ausgewählten Modelle können dort eingerichtete Cloud-Anbieter nutzen."
              : "TypeWhisper for Mac 1.8 or later on the same local network and access to Premium features on both devices. The connection is encrypted. Models selected on the Mac may use the cloud providers configured there."}
          </p>
        </DocsCallout>
        <a
          href={localePath(locale, "/docs/mac/installation#iphone")}
          className="site-link"
        >
          {isDe
            ? "Die Kopplung auf dem Mac einrichten"
            : "Set up pairing on the Mac"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </DocsSection>

      <DocsSection
        headingId="ios-guide-title"
        label={isDe ? "Nicht nur eine Featureliste" : "More than a feature list"}
        title={
          isDe ? "Die vollständige iOS-Anleitung." : "The complete iOS guide."
        }
      >
        <p>
          {isDe
            ? "Beginne bei Installation und Berechtigungen oder springe direkt zu dem Ablauf, den du einrichten oder reparieren möchtest."
            : "Start with installation and permissions, or jump straight to the workflow you want to set up or fix."}
        </p>
        <ul className="docs-index">
          {iosDocSlugs.map((slug) => {
            const page = getIosDocPage(locale, slug);
            return (
              <li key={slug}>
                <a
                  href={localePath(locale, `/docs/ios/${slug}`)}
                  className="docs-index__link"
                >
                  <span className="docs-index__name">{page.title}</span>
                  <span className="docs-index__text">{page.description}</span>
                  <ArrowRight aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </DocsSection>

      <DocsSection
        headingId="ios-screens-title"
        title={
          isDe
            ? "iPhone und iPad, aktuell abgebildet."
            : "iPhone and iPad, shown as they are now."
        }
      >
        <p>
          {isDe
            ? "Die Motive stammen aus den aktuellen lokalisierten App-Store-Renderings und zeigen Aufnahme, Tastatur sowie Verlauf und Capture Inbox."
            : "These images come from the current localized App Store renders and show recording, keyboard, and History with Capture Inbox."}
        </p>
        <div className="docs-figures">
          {phoneScreenshots.map((screenshot) => (
            <DocsFigure
              key={screenshot.filename}
              kind="phone"
              src={screenshotPath(
                locale,
                `/screenshots/ios/${screenshot.filename}`,
              )}
              alt={screenshot.alt[locale]}
            />
          ))}
        </div>
        <DocsFigure
          kind="tablet"
          src={screenshotPath(locale, "/screenshots/ios/ipad/03-inbox.png")}
          alt={
            isDe
              ? "TypeWhisper Capture Inbox auf dem iPad"
              : "TypeWhisper Capture Inbox on iPad"
          }
        />
      </DocsSection>

      <DocsSection
        headingId="ios-watch-title"
        title={isDe ? "Aufnehmen am Handgelenk." : "Capture from your wrist."}
      >
        <p>
          {isDe
            ? "Starte eine fokussierte Aufnahme auf der Apple Watch, übertrage sie ans iPhone und prüfe das Ergebnis in der Capture Inbox."
            : "Start a focused recording on Apple Watch, transfer it to iPhone, and review the result in Capture Inbox."}
        </p>
        <div className="docs-figures docs-figures--3">
          {watchScreenshots.map((screenshot) => (
            <DocsFigure
              key={screenshot.filename}
              kind="watch"
              src={screenshotPath(
                locale,
                `/screenshots/ios/watch/${screenshot.filename}`,
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
              ? "Version {iosVersion} ist als stabiles Release für iPhone und iPad im App Store verfügbar. Die Apple-Watch-App ist enthalten."
              : "Version {iosVersion} is available as a stable release for iPhone and iPad on the App Store. The Apple Watch app is included.",
          )}
        </p>
        <a
          href={iosAppStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-download-social-trigger
          data-download-platform="ios"
          data-download-target="ios_app_store"
          data-download-version={iosVersion ?? undefined}
          data-tracking-placement="docs"
          className="site-link"
        >
          {isDe ? "App Store öffnen" : "Open the App Store"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>

        <DocsSubheading id="new-in-1-2">
          {isDe ? "Neu in 1.2" : "What's new in 1.2"}
        </DocsSubheading>
        <ul>
          {newIn12.map((entry) => (
            <li key={entry.en}>
              {"anchor" in entry ? (
                <a href={`#${entry.anchor}`}>{entry[locale]}</a>
              ) : (
                entry[locale]
              )}
            </li>
          ))}
        </ul>

        <DocsSubheading id="new-in-1-1">
          {isDe ? "Neu in 1.1" : "What's new in 1.1"}
        </DocsSubheading>
        <ul>
          {newIn11.map((entry) => (
            <li key={entry.en}>
              {"path" in entry ? (
                <a href={localePath(locale, entry.path)}>{entry[locale]}</a>
              ) : (
                entry[locale]
              )}
            </li>
          ))}
        </ul>
      </DocsSection>

      <DocsSection
        id="support"
        title={isDe ? "Direkter Support" : "Direct support"}
      >
        <p>
          {isDe
            ? "Für konkrete Fragen zur iOS-Version: "
            : "For specific questions about the iOS edition, email "}
          <a href="mailto:hello@typewhisper.com">hello@typewhisper.com</a>.
        </p>
      </DocsSection>
    </>
  );
}
