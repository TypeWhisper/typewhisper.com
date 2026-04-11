import type { Locale } from "@/i18n/index";

export default function DocsWindowsFeatures({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  const onDeviceItems = isDe
    ? [
        "Parakeet TDT 0.6B - Schnelle allgemeine Transkription mit Unterstützung für über 25 Sprachen. ~670 MB Download.",
        "Canary 180M Flash - Mehrsprachiges Modell mit eingebauter Übersetzung zwischen Englisch, Deutsch, Französisch und Spanisch. ~200 MB Download.",
      ]
    : [
        "Parakeet TDT 0.6B - Fast general transcription supporting 25+ languages. ~670 MB download.",
        "Canary 180M Flash - Multilingual model with built-in translation between English, German, French, and Spanish. ~200 MB download.",
      ];

  const cloudRows = [
    ["Groq", "whisper-large-v3", isDe ? "Schnelle Cloud-Transkription, unterstützt Übersetzung" : "Fast cloud transcription, supports translation"],
    ["Groq", "whisper-large-v3-turbo", isDe ? "Am schnellsten, keine Übersetzung" : "Fastest, no translation"],
    ["OpenAI", "gpt-4o-transcribe", isDe ? "Höchste Genauigkeit" : "Highest accuracy"],
    ["OpenAI", "gpt-4o-mini-transcribe", isDe ? "Geringere Kosten, gute Qualität" : "Lower cost, good quality"],
    ["OpenAI", "whisper-1", isDe ? "Klassisch, unterstützt Übersetzung" : "Classic, supports translation"],
  ] as const;

  const dictationItems = isDe
    ? [
        "Hybrid - Kurzer Tastendruck startet oder stoppt die Aufnahme, langes Halten aktiviert Push-to-Talk. Die beste Mischung aus beidem.",
        "Toggle - Einmal drücken zum Starten, erneut drücken zum Stoppen. Gut für längere Diktate ohne dauerhaftes Halten.",
        "Push-to-Talk - Taste halten zum Aufnehmen, loslassen zum Stoppen und Transkribieren. Ideal für kurze Nachrichten oder präzise Kontrolle.",
      ]
    : [
        "Hybrid - Short press toggles recording on/off, long press activates push-to-talk. Best of both worlds.",
        "Toggle - Press the hotkey once to start recording, press again to stop. Good for longer dictation where you want hands-free recording.",
        "Push-to-Talk - Hold the hotkey to record, release to stop and transcribe. Ideal for quick messages or when you want precise control over recording duration.",
      ];

  const fileItems = isDe
    ? [
        "Unterstützte Formate - WAV, MP3, M4A, AAC, OGG, FLAC, WMA, MP4, MKV, AVI, MOV, WebM",
        "Batch-Verarbeitung - Mehrere Dateien in die Warteschlange stellen und nacheinander transkribieren",
        "Export - Ergebnisse als TXT-, SRT- oder WebVTT-Untertitel mit genauen Zeitstempeln speichern",
      ]
    : [
        "Supported formats - WAV, MP3, M4A, AAC, OGG, FLAC, WMA, MP4, MKV, AVI, MOV, WebM",
        "Batch processing - Queue multiple files and transcribe them sequentially",
        "Export - Save results as TXT, SRT, or WebVTT subtitles with accurate timestamps",
      ];

  const translationItems = isDe
    ? [
        "Canary on-device - Übersetzung zwischen Englisch, Deutsch, Französisch und Spanisch mit dem Canary 180M Flash Modell. Vollständig offline.",
        "Marian on-device - Lokales ONNX-Übersetzungsmodell mit 20 Zielsprachen: EN, DE, FR, ES, IT, NL, PL, SV, DA, FI, CS, RU, UK, HU, JA, ZH, AR, HI, VI, ID. Kein Internet erforderlich.",
        "Cloud LLM - Groq (Llama 3.3 70B) oder OpenAI (GPT-4o-mini) für beliebige Sprachpaare. Erfordert einen API-Key.",
      ]
    : [
        "Canary on-device - Translation between English, German, French, and Spanish using the Canary 180M Flash model. Fully offline.",
        "Marian on-device - Local ONNX translation model supporting 20 target languages: EN, DE, FR, ES, IT, NL, PL, SV, DA, FI, CS, RU, UK, HU, JA, ZH, AR, HI, VI, ID. No internet required.",
        "Cloud LLM - Groq (Llama 3.3 70B) or OpenAI (GPT-4o-mini) for any language pair. Requires an API key.",
      ];

  const snippetItems = isDe
    ? [
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{date}"}
          </code>
          ,{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{time}"}
          </code>
          ,{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{datetime}"}
          </code>{" "}
          - Aktuelles Datum und Uhrzeit (benutzerdefinierte Formate unterstützt,
          z.B.{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{date:dd.MM.yyyy}"}
          </code>
          )
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{clipboard}"}
          </code>{" "}
          - Aktueller Zwischenablageinhalt
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{day}"}
          </code>
          ,{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{year}"}
          </code>{" "}
          - Aktueller Tagesname oder aktuelles Jahr
        </>,
      ]
    : [
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{date}"}
          </code>
          ,{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{time}"}
          </code>
          ,{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{datetime}"}
          </code>{" "}
          - Current date/time (custom formats supported, e.g.{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{date:dd.MM.yyyy}"}
          </code>
          )
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{clipboard}"}
          </code>{" "}
          - Current clipboard content
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{day}"}
          </code>
          ,{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            {"{year}"}
          </code>{" "}
          - Current day name or year
        </>,
      ];

  const audioItems = isDe
    ? [
        "Audio Ducking - Reduziert die Systemlautstärke während der Aufnahme automatisch, um Hintergrundgeräusche aus anderen Anwendungen zu minimieren.",
        "Media Pause - Pausiert Medienwiedergabe (Musik, Videos) während der Aufnahme automatisch und setzt sie danach fort.",
        "Audio Normalization - Automatische Pegelanpassung für konsistente Eingangspegel, unabhängig davon, wie nah du am Mikrofon bist.",
        "Silence Detection - Beendet die Aufnahme nach einer konfigurierbaren Stillephase automatisch, sodass du den Hotkey nicht erneut drücken musst.",
        "Sound Feedback - Audiohinweise für Start und Ende der Aufnahme, damit du weißt, wann TypeWhisper zuhört.",
        "Non-blocking Pipeline - Mehrere Aufnahmen können in die Warteschlange gestellt werden, während die Transkription im Hintergrund läuft. Starte die nächste Aufnahme, bevor die vorherige fertig verarbeitet ist.",
      ]
    : [
        "Audio Ducking - Automatically reduces system volume while recording to minimize background noise from other applications.",
        "Media Pause - Automatically pauses media playback (music, videos) during recording and resumes when done.",
        "Audio Normalization - Automatic gain control for consistent input levels, regardless of how close you are to the microphone.",
        "Silence Detection - Automatically stops recording after a configurable silence period, so you don't have to press the hotkey again.",
        "Sound Feedback - Audio cues for recording start and stop, so you know when TypeWhisper is listening.",
        "Non-blocking Pipeline - Multiple recordings can be queued while transcription runs in the background. Start your next recording before the previous one finishes processing.",
      ];

  const dashboardItems = isDe
    ? [
        "Dashboard - Nutzungsstatistiken mit Gesamtwortzahl, Aufnahmedauer und Anzahl der Transkriptionen inklusive Aktivitätsdiagramm.",
        "Transcription History - Alle Transkriptionen werden lokal mit Zeitstempeln, der Ziel-App und der verwendeten Engine bzw. dem Modell gespeichert. Durchsuche deinen Verlauf, bearbeite Transkriptionen inline und sieh Korrekturerkennung, die Unterschiede zwischen Original und Bearbeitung hervorhebt.",
      ]
    : [
        "Dashboard - Usage statistics showing total words, recording duration, and number of transcriptions with an activity chart.",
        "Transcription History - All transcriptions are saved locally with timestamps, the app they were dictated into, and which engine/model was used. Search and browse your history. Edit transcriptions inline and see correction detection that highlights differences between the original and edited text.",
      ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {isDe ? "Funktionen" : "Features"}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {isDe
          ? "Eine umfassende Übersicht über die Fähigkeiten von TypeWhisper unter Windows."
          : "A comprehensive overview of TypeWhisper's capabilities on Windows."}
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "On-Device-Transkription" : "On-Device Transcription"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Die gesamte lokale Verarbeitung läuft auf deiner CPU mit ONNX Runtime und int8-Quantisierung - keine GPU erforderlich. Es stehen zwei Engines zur Verfügung:"
              : "All local processing runs on your CPU using ONNX Runtime with int8 quantization - no GPU required. Two engines are available:"}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {onDeviceItems.map((item) => {
              const [label, rest] = item.split(" - ");
              return (
                <li key={item}>
                  &bull; <strong>{label}</strong> - {rest}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Cloud-Transkription (optional)" : "Cloud Transcription (Optional)"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Für höhere Genauigkeit oder schnellere Verarbeitung kannst du optional Cloud-Provider verbinden. Deine Sprachdaten bleiben auf deinem PC, solange du nicht ausdrücklich einen Cloud-Provider aktivierst. API-Keys werden per DPAPI verschlüsselt gespeichert."
              : "For higher accuracy or faster processing, you can optionally connect cloud providers. Your voice data stays on your PC unless you explicitly enable a cloud provider. API keys are encrypted at rest via DPAPI."}
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-medium">
                    {isDe ? "Anbieter" : "Provider"}
                  </th>
                  <th className="pb-2 pr-4 font-medium">
                    {isDe ? "Modell" : "Model"}
                  </th>
                  <th className="pb-2 font-medium">
                    {isDe ? "Hinweise" : "Notes"}
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {cloudRows.map(([provider, model, notes], index) => (
                  <tr
                    key={model}
                    className={index < cloudRows.length - 1 ? "border-b border-border/50" : undefined}
                  >
                    <td className="py-2 pr-4">{provider}</td>
                    <td className="py-2 pr-4 font-mono text-xs">{model}</td>
                    <td className="py-2">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {isDe
              ? "Konfiguriere Cloud-Provider in den Einstellungen oder während des Welcome Wizard."
              : "Configure cloud providers in Settings or during the Welcome Wizard."}
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Systemweites Diktieren" : "System-Wide Dictation"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Nutze einen globalen Hotkey, um aus jeder App heraus die Aufnahme zu starten und zu stoppen. Transkribierter Text wird automatisch in das aktive Textfeld eingefügt. Der Standard-Hotkey ist Ctrl+Shift+F9 - du kannst ihn unter Settings > Hotkey ändern. Drei unabhängige Hotkey-Modi stehen zur Verfügung:"
              : "Use a global hotkey to start and stop recording from any app. Transcribed text is automatically pasted into the active text field. The default hotkey is Ctrl+Shift+F9 - you can change it in Settings > Hotkey. Three independent hotkeys can be configured:"}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {dictationItems.map((item) => {
              const [label, rest] = item.split(" - ");
              return (
                <li key={item}>
                  &bull; <strong>{label}</strong> - {rest}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Live-Teilergebnisse" : "Live Partial Results"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Silero VAD erkennt Sprachsegmente während der Aufnahme und transkribiert sie in Echtzeit. Ein schwebendes Overlay zeigt Teilergebnisse schon vor dem Stoppen der Aufnahme, sodass du sofort Feedback bekommst."
              : "Silero VAD detects speech segments during recording and transcribes them in real time. A floating overlay shows partial transcription results before you stop recording, so you get immediate feedback as you speak."}
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Datei-Transkription" : "File Transcription"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Transkribiere Audio- und Videodateien direkt in der App. Ziehe Dateien auf das TypeWhisper-Fenster oder wähle sie über den Dateiauswahldialog aus."
              : "Transcribe audio and video files directly within the app. Drag and drop files onto the TypeWhisper window, or use the file picker to select them."}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {fileItems.map((item) => {
              const [label, rest] = item.split(" - ");
              return (
                <li key={item}>
                  &bull; <strong>{label}</strong> - {rest}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Übersetzung" : "Translation"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "TypeWhisper unterstützt drei Übersetzungsmethoden:"
              : "TypeWhisper supports three translation methods:"}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {translationItems.map((item) => {
              const [label, rest] = item.split(" - ");
              return (
                <li key={item}>
                  &bull; <strong>{label}</strong> - {rest}
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            {isDe
              ? "Lege Übersetzungsoptionen in den Einstellungen fest oder konfiguriere sie pro App über Profile."
              : "Set translation options in Settings or configure them per-app using Profiles."}
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Wörterbuch" : "Dictionary"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Benutzerdefinierte Begriffskorrekturen werden nach der Transkription automatisch angewendet. Korrigiere Namen, Fachbegriffe oder wiederkehrende Fehlinterpretationen. Regex-Muster werden für fortgeschrittene Ersetzungen unterstützt."
              : "Custom term corrections applied automatically after transcription. Fix names, jargon, or recurring misrecognitions. Supports regex patterns for advanced replacements."}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {isDe
              ? "13 eingebaute Begriffspakete sind enthalten: Web Dev, .NET/C#, DevOps, Data & AI, Design, Game Dev, Mobile, Security, Databases, Medical, Legal, Finance und Music Production."
              : "13 built-in term packs are included: Web Dev, .NET/C#, DevOps, Data & AI, Design, Game Dev, Mobile, Security, Databases, Medical, Legal, Finance, and Music Production."}
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Snippets" : "Snippets"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Textkürzel, die automatisch expandieren. Definiere ein Triggerwort und den zugehörigen Ersetzungstext. Folgende dynamische Platzhalter werden unterstützt:"
              : "Text shortcuts that expand automatically. Define a trigger word and its replacement text. Supports dynamic placeholders:"}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {snippetItems.map((item, index) => (
              <li key={index}>&bull; {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Whisper-Modus" : "Whisper Mode"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Erhöhe die Mikrofonverstärkung für leises Sprechen oder laute Umgebungen. Wenn aktiviert, verstärkt TypeWhisper das Mikrofonsignal, sodass du auch leise sprechen und trotzdem genaue Transkriptionen erhalten kannst - nützlich in Großraumbüros, Bibliotheken oder spätabends. Umschaltbar pro Profil oder global in den Einstellungen."
              : "Boost microphone gain for quiet speech or noisy environments. When enabled, TypeWhisper amplifies the microphone input so you can speak softly and still get accurate transcriptions - useful in shared offices, libraries, or late-night sessions. Toggle it per-profile or globally in settings."}
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Audio & Aufnahme" : "Audio & Recording"}
          </h2>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            {audioItems.map((item) => {
              const [label, rest] = item.split(" - ");
              return (
                <li key={item}>
                  &bull; <strong>{label}</strong> - {rest}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Dashboard & Verlauf" : "Dashboard & History"}
          </h2>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            {dashboardItems.map((item) => {
              const [label, rest] = item.split(" - ");
              return (
                <li key={item}>
                  &bull; <strong>{label}</strong> - {rest}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
