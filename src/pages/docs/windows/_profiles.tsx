import type { Locale } from "@/i18n/index";

export default function DocsWindowsProfiles({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  const matchingItems = isDe
    ? [
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            *
          </code>{" "}
          passt auf jede Zeichenfolge innerhalb eines einzelnen Segments
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            *.github.com
          </code>{" "}
          passt auf alle GitHub-Subdomains (z.B. gist.github.com)
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            docs.google.com/document/*
          </code>{" "}
          passt auf alle Google-Docs-Dokumente
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            *slack.com*
          </code>{" "}
          passt auf jede URL, die slack.com enthält
        </>,
      ]
    : [
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            *
          </code>{" "}
          matches any sequence of characters within a single segment
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            *.github.com
          </code>{" "}
          matches all GitHub subdomains (e.g., gist.github.com)
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            docs.google.com/document/*
          </code>{" "}
          matches all Google Docs documents
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            *slack.com*
          </code>{" "}
          matches any URL containing slack.com
        </>,
      ];

  const priorityItems = isDe
    ? [
        "Prozessname + URL-Muster (am spezifischsten)",
        "Nur URL-Muster (browserübergreifende Profile)",
        "Nur Prozessname",
        "Standardeinstellungen (Fallback)",
      ]
    : [
        "Process Name + URL Pattern (most specific)",
        "URL Pattern only (cross-browser profiles)",
        "Process Name only",
        "Default settings (fallback)",
      ];

  const overrideItems = isDe
    ? [
        <>
          <strong>Sprache</strong> - Überschreibt die Transkriptionssprache
        </>,
        <>
          <strong>Aufgabe</strong> - Transcribe oder Translate
        </>,
        <>
          <strong>Engine</strong> - Parakeet TDT 0.6B oder Canary 180M Flash
        </>,
        <>
          <strong>Whisper-Modus</strong> - Erhöhte Mikrofonverstärkung
        </>,
      ]
    : [
        <>
          <strong>Language</strong> - Override the transcription language
        </>,
        <>
          <strong>Task</strong> - Transcribe or Translate
        </>,
        <>
          <strong>Engine</strong> - Parakeet TDT 0.6B or Canary 180M Flash
        </>,
        <>
          <strong>Whisper Mode</strong> - Boosted microphone gain
        </>,
      ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {isDe ? "Profile" : "Profiles"}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {isDe
          ? "Konfiguriere app-spezifische Transkriptionseinstellungen, die automatisch aktiviert werden."
          : "Configure per-application transcription settings that activate automatically."}
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Wie Profile funktionieren" : "How Profiles Work"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Wenn du mit dem Diktieren beginnst, gleicht TypeWhisper den Prozessnamen der aktiven Anwendung mit deinen Profilen ab. Für browserbasierte Apps werden zusätzlich URL-Muster abgeglichen. Wenn eine Übereinstimmung gefunden wird, werden die Überschreibungen des Profils automatisch angewendet. Der aktive Profilname erscheint als Badge im Aufnahme-Overlay."
              : "When you start dictating, TypeWhisper matches the active application's process name against your profiles. For browser-based apps, it also matches URL patterns. If a match is found, the profile's overrides are applied automatically. The active profile name is shown as a badge in the recording overlay."}
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Zuordnung" : "Matching"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe ? "Profile gleichen den Prozessnamen (z.B. " : "Profiles match using the process name (e.g., "}
            <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
              chrome.exe
            </code>
            ,{" "}
            <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
              outlook.exe
            </code>
            {isDe
              ? ") und optional ein URL-Muster für Browser-Tabs ab."
              : ") and optionally a URL pattern for browser tabs."}
          </p>
          <p className="mt-3 text-sm font-medium">
            {isDe ? "Syntax für URL-Muster" : "URL Pattern Syntax"}
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            {matchingItems.map((item, index) => (
              <li key={index}>&bull; {item}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm font-medium">
            {isDe ? "Prozessnamen einer App finden" : "Finding an App's Process Name"}
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {isDe
              ? "Öffne den Task Manager (Ctrl+Shift+Esc), wechsle zum Tab \"Details\" und suche die Anwendung. Die Spalte \"Name\" zeigt den Prozessnamen, den du brauchst (z.B. "
              : "Open Task Manager (Ctrl+Shift+Esc), go to the Details tab, and find the application. The \"Name\" column shows the process name you need (e.g., "}
            <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
              Teams.exe
            </code>
            ,{" "}
            <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
              WINWORD.EXE
            </code>
            ).
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Priorität" : "Priority"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Wenn mehrere Profile passen könnten, gewinnt das spezifischste:"
              : "When multiple profiles could match, the most specific one wins:"}
          </p>
          <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
            {priorityItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Ein Profil erstellen" : "Creating a Profile"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Gehe zu Settings > Profiles und klicke auf \"Add Profile\". Weise eine oder mehrere Anwendungen zu und konfiguriere dann deine Überschreibungen:"
              : "Go to Settings > Profiles and click \"Add Profile\". Assign one or more applications, then configure your overrides:"}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {overrideItems.map((item, index) => (
              <li key={index}>&bull; {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Beispiel-Setups" : "Example Setups"}
          </h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-md bg-background p-4">
              <p className="text-sm font-semibold">Chrome - GitHub</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isDe
                  ? "Prozess: chrome.exe, URL: *.github.com, Sprache: Englisch"
                  : "Process: chrome.exe, URL: *.github.com, Language: English"}
              </p>
            </div>
            <div className="rounded-md bg-background p-4">
              <p className="text-sm font-semibold">
                {isDe ? "Outlook - Deutsch" : "Outlook - German"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {isDe
                  ? "Prozess: outlook.exe, Sprache: Deutsch, Engine: Canary 180M Flash"
                  : "Process: outlook.exe, Language: German, Engine: Canary 180M Flash"}
              </p>
            </div>
            <div className="rounded-md bg-background p-4">
              <p className="text-sm font-semibold">
                {isDe ? "Terminal - Whisper-Modus" : "Terminal - Whisper Mode"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {isDe
                  ? "Prozess: WindowsTerminal.exe, Whisper-Modus: Immer an"
                  : "Process: WindowsTerminal.exe, Whisper Mode: Always on"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Speicherort der Einstellungen" : "Settings Location"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe ? "Die Profilkonfiguration wird unter " : "Profile configuration is stored in "}
            <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
              %LOCALAPPDATA%\TypeWhisper\settings.json
            </code>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
