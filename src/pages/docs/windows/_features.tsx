import { Screenshot } from "@/components/ui/screenshot";
import { localePath, screenshotPath, type Locale } from "@/i18n/index";

type Feature = {
  title: string;
  description: string;
};

export default function DocsWindowsFeatures({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  const dailyFeatures: Feature[] = isDe
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

  const writingFeatures: Feature[] = isDe
    ? [
        { title: "Wörterbuch", description: "Gib Fachbegriffe als Hinweise an unterstützte Engines weiter und korrigiere wiederkehrende Erkennungsfehler." },
        { title: "Snippets", description: "Ersetze gesprochene oder geschriebene Kürzel durch vorbereiteten Text und dynamische Platzhalter." },
        { title: "Automatisches Korrektur-Lernen · Premium", description: "Lass eindeutige manuelle Korrekturen nach dem Einfügen als neue Wörterbuchkorrekturen lernen." },
        { title: "Cloud-Ordnersynchronisierung · Premium", description: "Synchronisiere unterstützte Nutzerdaten über den konfigurierten Cloud-Speicher." },
      ]
    : [
        { title: "Dictionary", description: "Pass specialist terms to supported engines as hints and correct recurring recognition mistakes." },
        { title: "Snippets", description: "Expand spoken or typed triggers into prepared text and dynamic placeholders." },
        { title: "Automatic correction learning · Premium", description: "Turn clear manual edits made after insertion into new dictionary corrections." },
        { title: "Cloud folder sync · Premium", description: "Synchronize supported user data through the configured cloud storage provider." },
      ];

  const renderFeatures = (features: Feature[]) => (
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {features.map((feature) => (
        <li key={feature.title} className="rounded-xl border border-border/70 bg-background p-4">
          <h3 className="text-sm font-semibold">{feature.title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{feature.description}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {isDe ? "Funktionen" : "Features"}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {isDe
          ? "Die wichtigsten Funktionen für tägliches Diktieren, Aufnehmen und Weiterverarbeiten unter Windows."
          : "The essential features for everyday dictation, recording, and text processing on Windows."}
      </p>

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Diktieren und Tastenkürzel" : "Dictation and hotkeys"}
          </h2>
          {renderFeatures(dailyFeatures)}
          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            <Screenshot
              src={screenshotPath(locale, "/screenshots/windows/dictation.png")}
              alt={isDe ? "Diktateinstellungen von TypeWhisper für Windows" : "TypeWhisper dictation settings for Windows"}
              className="aspect-[31/20] w-full rounded-xl border border-border object-cover"
              loading="eager"
            />
            <Screenshot
              src={screenshotPath(locale, "/screenshots/windows/shortcuts.png")}
              alt={isDe ? "Tastenkürzel von TypeWhisper für Windows" : "TypeWhisper hotkeys for Windows"}
              className="aspect-[31/20] w-full rounded-xl border border-border object-cover"
              loading="lazy"
            />
          </div>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Wörterbuch und Snippets" : "Dictionary and snippets"}
          </h2>
          {renderFeatures(writingFeatures)}
          <Screenshot
            src={screenshotPath(locale, "/screenshots/windows/dictionary.png")}
            alt={isDe ? "Wörterbuch mit Begriffen und Korrekturen in TypeWhisper" : "TypeWhisper dictionary with terms and corrections"}
            className="mt-5 aspect-[31/20] w-full rounded-xl border border-border object-cover"
            loading="lazy"
          />
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Dateien und Recorder" : "Files and recorder"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Die Datei-Transkription verarbeitet Audio- und Videodateien als Queue. Der Recorder nimmt Mikrofon und Systemaudio für längere Sitzungen auf und kann das Ergebnis anschließend transkribieren."
              : "File transcription processes audio and video files as a queue. The recorder captures microphone and system audio for longer sessions and can transcribe the result afterward."}
          </p>
          <p className="mt-3 text-sm">
            <a href={localePath(locale, "/docs/windows/file-transcription")} className="text-primary hover:underline">
              {isDe ? "Datei-Transkription im Detail" : "File transcription in detail"}
            </a>
          </p>
          <Screenshot
            src={screenshotPath(locale, "/screenshots/windows/recorder.png")}
            alt={isDe ? "Recorder für Mikrofon und Systemaudio in TypeWhisper" : "TypeWhisper recorder for microphone and system audio"}
            className="mt-5 aspect-[31/20] w-full rounded-xl border border-border object-cover"
            loading="lazy"
          />
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Modelle und Beschleunigung" : "Models and acceleration"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Transkriptions-Engines und Modelle werden als Erweiterungen installiert. Lokale Engines arbeiten offline; Cloud-Engines senden Audio an den gewählten Anbieter. Unterstützte lokale Modelle können automatisch, auf der CPU oder mit NVIDIA CUDA, AMD Vulkan beziehungsweise AMD ROCm geladen werden. Eine Änderung der Beschleunigung kann einen Neustart erfordern."
              : "Transcription engines and models are installed as extensions. Local engines work offline; cloud engines send audio to the selected provider. Supported local models can load automatically, on the CPU, or with NVIDIA CUDA, AMD Vulkan, or AMD ROCm. Changing acceleration can require a restart."}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {isDe
              ? "Welche Modelle, Provider und Aktionen aktuell verfügbar sind, ändert sich unabhängig von der App-Version."
              : "The currently available models, providers, and actions can change independently of the app version."}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Integrationen und Workflows" : "Integrations and workflows"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Der Marketplace ergänzt lokale und Cloud-Engines, KI-Anbieter, Action-Plugins, Speicher und Hilfsfunktionen. Workflows verbinden diese Bausteine mit Apps, Websites, Tastenkürzeln oder einem globalen Fallback."
              : "The marketplace adds local and cloud engines, AI providers, action plugins, memory, and utilities. Workflows connect these building blocks to apps, websites, hotkeys, or a global fallback."}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href={localePath(locale, "/addons")} className="text-primary hover:underline">
              {isDe ? "Aktueller Add-on-Katalog" : "Current add-on catalog"}
            </a>
            <a href={localePath(locale, "/docs/windows/workflows")} className="text-primary hover:underline">
              {isDe ? "Workflows einrichten" : "Configure workflows"}
            </a>
          </div>
          <Screenshot
            src={screenshotPath(locale, "/screenshots/windows/integrations-marketplace.png")}
            alt={isDe ? "Marketplace für TypeWhisper-Erweiterungen unter Windows" : "Marketplace for TypeWhisper extensions on Windows"}
            className="mt-5 aspect-[31/20] w-full rounded-xl border border-border object-cover"
            loading="lazy"
          />
        </section>
      </div>
    </div>
  );
}
