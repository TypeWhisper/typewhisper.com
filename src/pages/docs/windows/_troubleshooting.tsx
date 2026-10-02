import { ArrowRight } from "lucide-react";
import { DocsCode, DocsSection } from "@/components/docs/prose";
import { localePath, type Locale } from "@/i18n/index";

export function windowsTroubleshootingHead(locale: Locale) {
  return locale === "de"
    ? {
        heading: "Fehlerbehebung",
        lede: "Löse typische Installations-, Aufnahme-, Einfüge- und API-Probleme unter Windows.",
      }
    : {
        heading: "Troubleshooting",
        lede: "Resolve common installation, recording, insertion, and API problems on Windows.",
      };
}

export default function DocsWindowsTroubleshooting({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const isDe = locale === "de";

  return (
    <>
      <DocsSection
        id="smartscreen"
        title={
          isDe
            ? "SmartScreen blockiert den Installer"
            : "SmartScreen blocks the installer"
        }
      >
        <p>
          {isDe
            ? "Nutze nach Möglichkeit den Microsoft Store. Beim direkten GitHub-Installer ist die Warnung „Unbekannter Herausgeber“ bekannt. Lade die Datei nur aus dem offiziellen TypeWhisper-Release und vergleiche vor dem Start ihre SHA-256-Prüfsumme mit der veröffentlichten Prüfsumme."
            : "Prefer the Microsoft Store. The direct GitHub installer is known to show an Unknown publisher warning. Download it only from the official TypeWhisper release and compare its SHA-256 hash with the published hash before running it."}
        </p>
        <DocsCode
          locale={locale}
          lang="powershell"
          code={
            "Get-FileHash .\\TypeWhisper-win-x64-Setup.exe -Algorithm SHA256"
          }
        />
        <a
          href={localePath(locale, "/docs/windows/installation")}
          className="site-link"
        >
          {isDe ? "Sichere Installationswege" : "Safe installation options"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </DocsSection>

      <DocsSection
        id="microphone"
        title={
          isDe
            ? "Kein oder falsches Mikrofon"
            : "No microphone or wrong microphone"
        }
      >
        <ol>
          <li>
            {isDe
              ? "Prüfe Windows-Einstellungen > Datenschutz & Sicherheit > Mikrofon und erlaube Desktop-Apps den Zugriff."
              : "Open Windows Settings > Privacy & security > Microphone and allow desktop apps to access it."}
          </li>
          <li>
            {isDe
              ? "Wähle unter TypeWhisper > Einstellungen > Diktat das gewünschte Gerät oder „Standard“."
              : "Choose the input under TypeWhisper > Settings > Dictation, or select Default."}
          </li>
          <li>
            {isDe
              ? "Ordne bei wechselnden Headsets die Mikrofon-Prioritätsliste; TypeWhisper nimmt das erste verfügbare Gerät."
              : "For changing headsets, order the microphone priority list; TypeWhisper uses the first available device."}
          </li>
          <li>
            {isDe
              ? "Öffne das Onboarding über das Dashboard erneut und prüfe den Pegel in Schritt 2."
              : "Re-run onboarding from the dashboard and check the input level in step 2."}
          </li>
        </ol>
      </DocsSection>

      <DocsSection
        id="hotkey"
        title={isDe ? "Tastenkürzel reagiert nicht" : "Hotkey does not respond"}
      >
        <ol>
          <li>
            {isDe
              ? "Öffne Einstellungen > Tastenkürzel und zeichne die Kombination erneut auf."
              : "Open Settings > Shortcuts and record the combination again."}
          </li>
          <li>
            {isDe
              ? "Wähle eine Kombination, die weder Windows noch eine andere App global registriert."
              : "Choose a combination that Windows or another app has not registered globally."}
          </li>
          <li>
            {isDe
              ? "Prüfe auch workflow-spezifische Tastenkürzel. TypeWhisper verhindert Konflikte innerhalb der App, aber nicht mit fremden Programmen."
              : "Check workflow-specific hotkeys as well. TypeWhisper prevents conflicts inside the app, but not with other programs."}
          </li>
          <li>
            {isDe
              ? "Beende die konkurrierende App oder ändere eines der beiden Kürzel, dann starte TypeWhisper neu."
              : "Quit the conflicting app or change one of the shortcuts, then restart TypeWhisper."}
          </li>
        </ol>
      </DocsSection>

      <DocsSection
        id="text-not-inserted"
        title={isDe ? "Text wird nicht eingefügt" : "Text is not inserted"}
      >
        <p>
          {isDe
            ? "TypeWhisper kopiert das fertige Ergebnis zuerst in die Zwischenablage und sendet für automatisches Einfügen Ctrl+V. Manche erhöht gestarteten, geschützten oder ungewöhnlichen Textfelder blockieren simulierte Eingaben."
            : "TypeWhisper first copies the final result to the clipboard and sends Ctrl+V for automatic insertion. Some elevated, protected, or unusual text fields block simulated input."}
        </p>
        <ol>
          <li>
            {isDe
              ? "Drücke direkt nach dem Diktat selbst Ctrl+V. Der Text sollte noch in der Zwischenablage liegen."
              : "Press Ctrl+V yourself immediately after dictation. The text should still be on the clipboard."}
          </li>
          <li>
            {isDe
              ? "Prüfe Einstellungen > Diktat > Nach der Transkription automatisch einfügen."
              : "Check Settings > Dictation > Auto paste after transcription."}
          </li>
          <li>
            {isDe
              ? "Teste ein normales Textfeld wie Editor. Funktioniert es dort, liegt die Grenze am Zielprogramm."
              : "Test a regular field such as Notepad. If it works there, the limitation is in the target app."}
          </li>
          <li>
            {isDe
              ? "Starte TypeWhisper nicht mit niedrigeren Rechten als das Zielprogramm; Windows blockiert Eingaben über diese Berechtigungsgrenze."
              : "Do not run TypeWhisper with lower privileges than the target app; Windows blocks input across that privilege boundary."}
          </li>
        </ol>
      </DocsSection>

      <DocsSection
        id="model-not-ready"
        title={
          isDe
            ? "Modell oder Erweiterung ist nicht bereit"
            : "Model or extension is not ready"
        }
      >
        <ol>
          <li>
            {isDe
              ? "Öffne Einstellungen > Diktat und prüfe, ob Engine und Modell installiert und ausgewählt sind."
              : "Open Settings > Dictation and verify that the engine and model are installed and selected."}
          </li>
          <li>
            {isDe
              ? "Öffne Integrationen > Installiert und prüfe Status, Konfiguration und verfügbare Updates des Add-ons."
              : "Open Integrations > Installed and review the add-on status, configuration, and available updates."}
          </li>
          <li>
            {isDe
              ? "Starte TypeWhisper neu, wenn „App-Neustart erforderlich“ erscheint oder du die lokale Modellbeschleunigung geändert hast."
              : "Restart TypeWhisper when App restart required appears or after changing local model acceleration."}
          </li>
          <li>
            {isDe
              ? "Wenn Auto-Beschleunigung fehlschlägt, teste CPU. Nutze CUDA, Vulkan oder ROCm nur mit passender Hardware und Laufzeit."
              : "If automatic acceleration fails, try CPU. Use CUDA, Vulkan, or ROCm only with matching hardware and runtime support."}
          </li>
        </ol>
      </DocsSection>

      <DocsSection
        id="api-or-cli"
        title={
          isDe
            ? "API oder CLI erreicht TypeWhisper nicht"
            : "API or CLI cannot reach TypeWhisper"
        }
      >
        <ol>
          <li>
            {isDe
              ? "Prüfe Einstellungen > Erweitert > API Server: aktiviert, Status „läuft“ und der erwartete Port."
              : "Check Settings > Advanced > API Server: enabled, status running, and the expected port."}
          </li>
          <li>
            {isDe
              ? "Teste curl.exe http://localhost:8978/v1/status oder den tatsächlich angezeigten Port."
              : "Test curl.exe http://localhost:8978/v1/status, or use the displayed port."}
          </li>
          <li>
            {isDe
              ? "Lösche Discovery-Dateien nicht während die App läuft. Starte TypeWhisper neu, wenn Port oder Token nicht zum Client passen."
              : "Do not delete discovery files while the app is running. Restart TypeWhisper if the port or token does not match the client."}
          </li>
          <li>
            {isDe
              ? "Bei aktivem Token-Schutz: /v1/status bleibt frei; alle anderen Routen brauchen Authorization: Bearer oder X-TypeWhisper-API-Token."
              : "With token protection enabled, /v1/status stays public; every other route needs Authorization: Bearer or X-TypeWhisper-API-Token."}
          </li>
        </ol>
        <a href={localePath(locale, "/docs/windows/api")} className="site-link">
          {isDe ? "API-Setup und Discovery" : "API setup and discovery"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </DocsSection>

      <DocsSection
        id="diagnostics"
        title={isDe ? "Diagnose exportieren" : "Export diagnostics"}
      >
        <p>
          {isDe
            ? "Öffne Einstellungen > Über, prüfe zuerst das Fehlerprotokoll und klicke auf „Diagnose exportieren“. Die JSON-Datei enthält App-, Windows- und Laufzeitversion, Gebietsschema sowie protokollierte Fehler. Lies sie vor dem Teilen durch und sende sie nur an einen vertrauenswürdigen Support-Kanal."
            : "Open Settings > About, review the error log first, and click Export Diagnostics. The JSON file contains app, Windows, and runtime versions, locale, and recorded errors. Review it before sharing and send it only through a trusted support channel."}
        </p>
      </DocsSection>
    </>
  );
}
