import { ArrowRight } from "lucide-react";
import {
  DocsFigure,
  DocsSection,
  DocsTerms,
  type DocsItem,
} from "@/components/docs/prose";
import { localePath, screenshotPath, type Locale } from "@/i18n/index";

export function windowsFeaturesHead(locale: Locale) {
  return locale === "de"
    ? {
        heading: "Funktionen",
        lede: "Die wichtigsten Funktionen für tägliches Diktieren, Aufnehmen und Weiterverarbeiten unter Windows.",
      }
    : {
        heading: "Features",
        lede: "The essential features for everyday dictation, recording, and text processing on Windows.",
      };
}

export default function DocsWindowsFeatures({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  const dailyFeatures: DocsItem[] = isDe
    ? [
        { title: "Systemweites Diktat", description: "Starte eine Aufnahme aus jeder App und füge das Ergebnis direkt in das aktive Textfeld ein." },
        { title: "Flexible Tastenkürzel", description: "Nutze Hybrid, Umschalten oder Gedrückthalten; zusätzliche Kürzel öffnen Verlauf, Workflow-Palette oder das letzte Ergebnis." },
        { title: "Geordnete Sprachhinweise", description: "Begrenze die automatische Erkennung auf mehrere Sprachen und ordne die Hinweise nach ihrer erwarteten Priorität." },
        { title: "Aufnahme-Overlays", description: "Sieh Aufnahmestatus, Dauer, aktiven Workflow und – bei unterstützten Engines – Live-Teilergebnisse." },
        { title: "Verlauf", description: "Suche frühere Transkriptionen, kopiere Text erneut und prüfe verwendete Engine, Modell und Dauer." },
      ]
    : [
        { title: "System-wide dictation", description: "Start recording from any app and insert the result directly into the active text field." },
        { title: "Flexible hotkeys", description: "Use Hybrid, Toggle, or Hold mode; additional shortcuts open history, the workflow palette, or the last result." },
        { title: "Ordered language hints", description: "Restrict automatic detection to several languages and order the hints by expected priority." },
        { title: "Recording overlays", description: "See recording state, duration, the active workflow, and live partial results when the engine supports them." },
        { title: "History", description: "Search previous transcriptions, copy text again, and review the engine, model, and duration." },
      ];

  const writingFeatures: DocsItem[] = isDe
    ? [
        { title: "Wörterbuch", description: "Gib Fachbegriffe als Hinweise an unterstützte Engines weiter und korrigiere wiederkehrende Erkennungsfehler." },
        { title: "Snippets", description: "Ersetze gesprochene oder geschriebene Kürzel durch vorbereiteten Text und dynamische Platzhalter." },
        { title: "Aus Korrekturen lernen · Premium", description: "Lass eindeutige manuelle Korrekturen nach dem Einfügen als neue Wörterbuchkorrekturen lernen. Bis Windows 1.0.9 heißt die Funktion in der App „Automatisches Korrekturlernen“." },
        { title: "Wörterbuch & Snippets synchronisieren · Premium", description: "Halte Wörterbuch und Snippets über einen gemeinsamen Cloud-Ordner auf deinen Geräten synchron, zum Beispiel in iCloud Drive, OneDrive oder Dropbox. Bis Windows 1.0.9 heißt die Funktion in der App „Cloud Folder Sync“." },
      ]
    : [
        { title: "Dictionary", description: "Pass specialist terms to supported engines as hints and correct recurring recognition mistakes." },
        { title: "Snippets", description: "Expand spoken or typed triggers into prepared text and dynamic placeholders." },
        { title: "Learn from Corrections · Premium", description: "Turn clear manual edits made after insertion into new dictionary corrections. Up to Windows 1.0.9, the app calls this feature \"Automatic correction learning\"." },
        { title: "Sync Dictionary & Snippets · Premium", description: "Keep dictionary entries and snippets in sync across your devices through a shared cloud folder, for example in iCloud Drive, OneDrive, or Dropbox. Up to Windows 1.0.9, the app calls this feature \"Cloud Folder Sync\"." },
      ];

  return (
    <>
      <DocsSection
        id="dictation-and-hotkeys"
        title={isDe ? "Diktieren und Tastenkürzel" : "Dictation and hotkeys"}
      >
        <DocsTerms items={dailyFeatures} />
        <DocsFigure
          kind="framed"
          src={screenshotPath(locale, "/screenshots/windows/dictation.png")}
          alt={isDe ? "Diktateinstellungen von TypeWhisper für Windows" : "TypeWhisper dictation settings for Windows"}
          loading="eager"
        />
        <DocsFigure
          kind="framed"
          src={screenshotPath(locale, "/screenshots/windows/shortcuts.png")}
          alt={isDe ? "Tastenkürzel von TypeWhisper für Windows" : "TypeWhisper hotkeys for Windows"}
        />
      </DocsSection>

      <DocsSection
        id="dictionary-and-snippets"
        title={isDe ? "Wörterbuch und Snippets" : "Dictionary and snippets"}
      >
        <DocsTerms items={writingFeatures} />
        <DocsFigure
          kind="framed"
          src={screenshotPath(locale, "/screenshots/windows/dictionary.png")}
          alt={isDe ? "Wörterbuch mit Begriffen und Korrekturen in TypeWhisper" : "TypeWhisper dictionary with terms and corrections"}
        />
      </DocsSection>

      <DocsSection
        id="files-and-recorder"
        title={isDe ? "Dateien und Recorder" : "Files and recorder"}
      >
        <p>
          {isDe
            ? "Die Datei-Transkription verarbeitet Audio- und Videodateien als Queue. Der Recorder nimmt Mikrofon und Systemaudio für längere Sitzungen auf und kann das Ergebnis anschließend transkribieren."
            : "File transcription processes audio and video files as a queue. The recorder captures microphone and system audio for longer sessions and can transcribe the result afterward."}
        </p>
        <a href={localePath(locale, "/docs/windows/file-transcription")} className="site-link">
          {isDe ? "Datei-Transkription im Detail" : "File transcription in detail"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
        <DocsFigure
          kind="framed"
          src={screenshotPath(locale, "/screenshots/windows/recorder.png")}
          alt={isDe ? "Recorder für Mikrofon und Systemaudio in TypeWhisper" : "TypeWhisper recorder for microphone and system audio"}
        />
      </DocsSection>

      <DocsSection
        id="models-and-acceleration"
        title={isDe ? "Modelle und Beschleunigung" : "Models and acceleration"}
      >
        <p>
          {isDe
            ? "Transkriptions-Engines und Modelle werden als Erweiterungen installiert. Lokale Engines arbeiten offline; Cloud-Engines senden Audio an den gewählten Anbieter. Unterstützte lokale Modelle können automatisch, auf der CPU oder mit NVIDIA CUDA, AMD Vulkan beziehungsweise AMD ROCm geladen werden. Eine Änderung der Beschleunigung kann einen Neustart erfordern."
            : "Transcription engines and models are installed as extensions. Local engines work offline; cloud engines send audio to the selected provider. Supported local models can load automatically, on the CPU, or with NVIDIA CUDA, AMD Vulkan, or AMD ROCm. Changing acceleration can require a restart."}
        </p>
        <p>
          {isDe
            ? "Welche Modelle, Provider und Aktionen aktuell verfügbar sind, ändert sich unabhängig von der App-Version."
            : "The currently available models, providers, and actions can change independently of the app version."}
        </p>
      </DocsSection>

      <DocsSection
        id="integrations-and-workflows"
        title={isDe ? "Integrationen und Workflows" : "Integrations and workflows"}
      >
        <p>
          {isDe
            ? "Der Marketplace ergänzt lokale und Cloud-Engines, KI-Anbieter, Action-Plugins, Speicher und Hilfsfunktionen. Workflows verbinden diese Bausteine mit Apps, Websites, Tastenkürzeln oder einem globalen Fallback."
            : "The marketplace adds local and cloud engines, AI providers, action plugins, memory, and utilities. Workflows connect these building blocks to apps, websites, hotkeys, or a global fallback."}
        </p>
        <p className="docs-links">
          <a href={localePath(locale, "/addons")} className="site-link">
            {isDe ? "Aktueller Add-on-Katalog" : "Current add-on catalog"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a href={localePath(locale, "/docs/windows/workflows")} className="site-link">
            {isDe ? "Workflows einrichten" : "Configure workflows"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </p>
        <DocsFigure
          kind="framed"
          src={screenshotPath(locale, "/screenshots/windows/integrations-marketplace.png")}
          alt={isDe ? "Marketplace für TypeWhisper-Erweiterungen unter Windows" : "Marketplace for TypeWhisper extensions on Windows"}
        />
      </DocsSection>
    </>
  );
}
