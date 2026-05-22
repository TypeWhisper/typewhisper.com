import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { t, type Locale } from "@/i18n/index";

interface AddonsDevelopProps {
  backHref?: string;
  locale?: Locale;
}

export default function AddonsDevelop({ backHref = "/addons", locale = "en" }: AddonsDevelopProps) {
  const isDe = locale === "de";

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <a href={backHref}>
            <ArrowLeft className="size-4" />
            {t(locale, "addons.backToAddons")}
          </a>
        </Button>

        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {isDe ? "Plugin erstellen" : "Build a Plugin"}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {isDe
            ? "Erstelle eigene Plugins für TypeWhisper mit Swift und dem TypeWhisperPluginSDK."
            : "Create custom plugins for TypeWhisper using Swift and the TypeWhisperPluginSDK."}
        </p>

        <div className="mt-10 space-y-6">
          {/* Overview */}
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">
              {isDe ? "Überblick" : "Overview"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isDe
                ? "TypeWhisper-Plugins sind normale macOS-Bundles (.bundle), die in Swift geschrieben werden. Jedes Plugin bindet das TypeWhisperPluginSDK-Paket ein und exportiert eine Principal Class, die einem oder mehreren Plugin-Protokollen entspricht. Die Principal Class muss von "
                : "TypeWhisper plugins are standard macOS bundles (.bundle) written in Swift. Each plugin links against the TypeWhisperPluginSDK package and exports a principal class conforming to one or more plugin protocols. The principal class must inherit from "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                NSObject
              </code>
              {isDe ? " erben und das Attribut " : " and use the "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                @objc(ClassName)
              </code>
              {isDe
                ? " verwenden, damit der Bundle-Loader sie instanziieren kann. Plugins werden beim Start aus "
                : " attribute so the bundle loader can instantiate it. Plugins are loaded at launch from "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                ~/Library/Application Support/TypeWhisper/Plugins/
              </code>
              .
            </p>
          </section>

          {/* Plugin Types */}
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">
              {isDe ? "Plugin-Typen" : "Plugin Types"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isDe
                ? "Es gibt vier Plugin-Protokolle, die du implementieren kannst. Ein einzelnes Plugin kann mehreren Protokollen gleichzeitig entsprechen, z.B. Transkription und LLM."
                : "There are four plugin protocols you can adopt. A single plugin can conform to multiple protocols (e.g., both transcription and LLM)."}
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">
                  TranscriptionEnginePlugin
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isDe
                    ? "Stellt eine Speech-to-Text-Engine bereit. Erhält Audiodaten (16kHz Mono-Float-Samples plus vorcodiertes WAV) und gibt transkribierten Text zurück. Unterstützt Modellauswahl, Spracherkennung, Übersetzung und optionales Streaming über einen Progress-Callback."
                    : "Provides a speech-to-text engine. Receives audio data (16kHz mono Float samples + pre-encoded WAV) and returns transcribed text. Supports model selection, language detection, translation, and optional streaming via a progress callback."}
                </p>
              </div>
              <div className="rounded-xl bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">LLMProviderPlugin</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isDe
                    ? "Stellt ein LLM zur Verarbeitung transkribierten Texts über eigene Prompts bereit. Erhält einen System-Prompt und Benutzertest und gibt die Modellantwort zurück. Geeignet für Textkorrektur, Zusammenfassung, Formatierung und mehr."
                    : "Provides an LLM for processing transcribed text via custom prompts. Receives a system prompt and user text, returns the model's response. Used for text correction, summarization, formatting, and more."}
                </p>
              </div>
              <div className="rounded-xl bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">PostProcessorPlugin</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isDe
                    ? "Verarbeitet Text nach der Transkription in einer prioritätsbasierten Pipeline. Erhält den transkribierten Text und Kontext wie aktive App, URL und Sprache. Läuft neben eingebauten Prozessoren wie Snippets und Wörterbuch."
                    : "Processes text after transcription in a priority-based pipeline. Receives the transcribed text and context (active app, URL, language). Runs alongside built-in processors like snippets and dictionary."}
                </p>
              </div>
              <div className="rounded-xl bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">ActionPlugin</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isDe
                    ? "Führt eine Aktion mit LLM-verarbeitetem Text aus, statt ihn einzufügen. Erhält den verarbeiteten Text und Kontext und gibt eine Ergebnisnachricht zurück, die im Notch-Indikator angezeigt wird. Kann eine zu öffnende URL und eine eigene Anzeigedauer enthalten."
                    : "Performs an action with LLM-processed text instead of inserting it. Receives the processed text and context, returns a result message shown in the notch indicator. Can include a URL to open and a custom display duration."}
                </p>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">
              {isDe ? "Erste Schritte" : "Getting Started"}
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold">
                  {isDe ? "Voraussetzungen" : "Prerequisites"}
                </h3>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  <li>- macOS 14.0+ (Sonoma) and Xcode 16+</li>
                  <li>- Swift 6.0</li>
                  <li>{isDe ? "- Grundlegende Vertrautheit mit macOS-Bundle-Targets" : "- Basic familiarity with macOS bundle targets"}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  {isDe ? "1. Ein Bundle-Target erstellen" : "1. Create a Bundle Target"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isDe
                    ? "Erstelle in Xcode ein neues macOS-Bundle-Target. Setze in deiner Info.plist die Principal Class auf den Namen der Hauptklasse deines Plugins. Die Klasse muss von "
                    : "In Xcode, create a new macOS Bundle target. Set the principal class in your Info.plist to your plugin's main class name. The class must inherit from "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    NSObject
                  </code>
                  {isDe ? " erben und mit " : " and be annotated with "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    @objc(ClassName)
                  </code>
                  {isDe
                    ? " annotiert sein, damit die Runtime sie finden und instanziieren kann."
                    : " so the runtime can find and instantiate it."}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  {isDe ? "2. Die SDK-Abhängigkeit hinzufügen" : "2. Add the SDK Dependency"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isDe
                    ? "Füge TypeWhisperPluginSDK als Swift-Package-Abhängigkeit hinzu:"
                    : "Add TypeWhisperPluginSDK as a Swift Package dependency:"}
                </p>
                <div className="mt-2">
                  <CodeBlock
                    lang="swift"
                    code={`// Package.swift
dependencies: [
    .package(
        url: "https://github.com/TypeWhisper/TypeWhisperPluginSDK.git",
        from: "1.0.0"
    )
]

// Target dependency
.product(name: "TypeWhisperPluginSDK", package: "TypeWhisperPluginSDK")`}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  {isDe ? "3. manifest.json erstellen" : "3. Create manifest.json"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isDe
                    ? "Lege eine manifest.json im Resources-Verzeichnis deines Bundles an:"
                    : "Add a manifest.json to your bundle's Resources directory:"}
                </p>
                <div className="mt-2">
                  <CodeBlock
                    lang="json"
                    code={`{
  "id": "com.yourname.myplugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "minHostVersion": "0.9.0",
  "minOSVersion": "14.0",
  "hosting": "local",
  "requiresAPIKey": false,
  "author": "Your Name",
  "principalClass": "MyPlugin"
}`}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  <code className="rounded bg-muted px-1 py-0.5">
                    principalClass
                  </code>
                  {isDe ? " muss zum Namen in deiner " : " must match the name in your "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    @objc(...)
                  </code>
                  {isDe ? "-Annotation passen. " : " annotation. "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    minOSVersion
                  </code>
                  {isDe ? " ist optional und standardmäßig 14.0. " : " is optional and defaults to 14.0. "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    hosting
                  </code>
                  {isDe
                    ? " steuert die Local/Cloud-Kategorie im Plugin-Katalog; "
                    : " controls the Local/Cloud category in the plugin catalog; "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    requiresAPIKey
                  </code>
                  {isDe
                    ? " beschreibt nur, ob ein API-Key-Credential erforderlich ist."
                    : " only describes whether an API key credential is required."}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  {isDe ? "4. Bauen und installieren" : "4. Build & Install"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isDe ? "Baue dein Bundle und kopiere die .bundle-Datei nach " : "Build your bundle and copy the .bundle file to "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    ~/Library/Application Support/TypeWhisper/Plugins/
                  </code>
                  {isDe ? ". Starte TypeWhisper neu, um das Plugin zu laden." : ". Restart TypeWhisper to load the plugin."}
                </p>
              </div>
            </div>
          </section>

          {/* SDK API Reference */}
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">
              {isDe ? "SDK-API-Referenz" : "SDK API Reference"}
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold">TypeWhisperPlugin</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isDe ? "Basisprotokoll, dem alle Plugins entsprechen müssen." : "Base protocol all plugins must conform to."}
                </p>
                <div className="mt-2">
                  <CodeBlock
                    code={`public protocol TypeWhisperPlugin: AnyObject, Sendable {
    static var pluginId: String { get }
    static var pluginName: String { get }
    init()
    func activate(host: HostServices)
    func deactivate()
    var settingsView: AnyView? { get }  // optional, default nil
}`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">HostServices</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isDe
                    ? "Wird deinem Plugin bei der Aktivierung übergeben. Bietet Zugriff auf Keychain, Preferences, Dateispeicher, App-Kontext und den Event Bus."
                    : "Provided to your plugin on activation. Gives access to keychain, preferences, file storage, app context, and the event bus."}
                </p>
                <div className="mt-2">
                  <CodeBlock
                    code={`public protocol HostServices: Sendable {
    // Keychain (plugin-scoped)
    func storeSecret(key: String, value: String) throws
    func loadSecret(key: String) -> String?

    // UserDefaults (plugin-scoped)
    func userDefault(forKey: String) -> Any?
    func setUserDefault(_ value: Any?, forKey: String)

    // File storage
    var pluginDataDirectory: URL { get }

    // App context
    var activeAppBundleId: String? { get }
    var activeAppName: String? { get }

    // Event bus
    var eventBus: EventBusProtocol { get }

    // Profiles
    var availableProfileNames: [String] { get }

    // Notify host that plugin capabilities changed
    func notifyCapabilitiesChanged()
}`}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {isDe ? "Rufe " : "Call "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    notifyCapabilitiesChanged()
                  </code>
                  {isDe
                    ? " auf, wenn sich verfügbare Modelle oder der Konfigurationszustand deines Plugins ändern, z.B. nach dem Laden eines Modells oder dem Empfang eines API-Keys."
                    : " when your plugin's available models or configuration state changes (e.g., after loading a model or receiving an API key)."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold">LLMProviderPlugin</h3>
                <div className="mt-2">
                  <CodeBlock
                    code={`public protocol LLMProviderPlugin: TypeWhisperPlugin {
    var providerName: String { get }
    var isAvailable: Bool { get }
    var supportedModels: [PluginModelInfo] { get }
    func process(
        systemPrompt: String,
        userText: String,
        model: String?
    ) async throws -> String
}`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">PluginModelInfo</h3>
                <div className="mt-2">
                  <CodeBlock
                    code={`public final class PluginModelInfo: @unchecked Sendable {
    public let id: String
    public let displayName: String
    public let sizeDescription: String   // e.g. "1.5 GB"
    public let languageCount: Int        // number of supported languages

    public init(
        id: String,
        displayName: String,
        sizeDescription: String = "",
        languageCount: Int = 0
    )
}`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  TranscriptionEnginePlugin
                </h3>
                <div className="mt-2">
                  <CodeBlock
                    code={`public protocol TranscriptionEnginePlugin: TypeWhisperPlugin {
    var providerId: String { get }
    var providerDisplayName: String { get }
    var isConfigured: Bool { get }
    var transcriptionModels: [PluginModelInfo] { get }
    var selectedModelId: String? { get }
    func selectModel(_ modelId: String)
    var supportsTranslation: Bool { get }
    var supportsStreaming: Bool { get }       // default false
    var supportedLanguages: [String] { get }  // default []

    // Standard transcription
    func transcribe(
        audio: AudioData,
        language: String?,
        translate: Bool,
        prompt: String?
    ) async throws -> PluginTranscriptionResult

    // Streaming variant - onProgress returns false to cancel
    func transcribe(
        audio: AudioData,
        language: String?,
        translate: Bool,
        prompt: String?,
        onProgress: @Sendable @escaping (String) -> Bool
    ) async throws -> PluginTranscriptionResult
}`}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {isDe
                    ? "Die Streaming-Variante besitzt eine Standardimplementierung, die auf die normale "
                    : "The streaming variant has a default implementation that falls back to the standard "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    transcribe
                  </code>
                  {isDe ? "-Methode zurückfällt. Überschreibe sie und setze " : " method. Override it and set "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    supportsStreaming
                  </code>
                  {isDe ? " auf " : " to "}
                  <code className="rounded bg-muted px-1 py-0.5">true</code>{" "}
                  {isDe ? ", wenn deine Engine Teilergebnisse unterstützt." : "if your engine supports partial results."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold">PostProcessorPlugin</h3>
                <div className="mt-2">
                  <CodeBlock
                    code={`public protocol PostProcessorPlugin: TypeWhisperPlugin {
    var processorName: String { get }
    var priority: Int { get }
    @MainActor func process(
        text: String,
        context: PostProcessingContext
    ) async throws -> String
}

public struct PostProcessingContext: Sendable {
    public let appName: String?
    public let bundleIdentifier: String?
    public let url: String?
    public let language: String?
}`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">ActionPlugin</h3>
                <div className="mt-2">
                  <CodeBlock
                    code={`public protocol ActionPlugin: TypeWhisperPlugin {
    var actionName: String { get }
    var actionId: String { get }
    var actionIcon: String { get }  // SF Symbol name
    func execute(
        input: String,
        context: ActionContext
    ) async throws -> ActionResult
}

public struct ActionContext: Sendable {
    public let appName: String?
    public let bundleIdentifier: String?
    public let url: String?
    public let language: String?
    public let originalText: String
}

public struct ActionResult: Sendable {
    public let success: Bool
    public let message: String
    public let url: String?              // URL to open after action
    public let icon: String?             // SF Symbol for result display
    public let displayDuration: TimeInterval?  // custom display time
}`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">EventBus</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isDe
                    ? "Abonniere appweite Events wie Aufnahme-Start/Stopp, abgeschlossene Transkription und Texteinfügung."
                    : "Subscribe to app-wide events like recording start/stop, transcription completion, and text insertion."}
                </p>
                <div className="mt-2">
                  <CodeBlock
                    code={`public protocol EventBusProtocol: Sendable {
    @discardableResult
    func subscribe(
        handler: @escaping @Sendable (TypeWhisperEvent) async -> Void
    ) -> UUID
    func unsubscribe(id: UUID)
}

public enum TypeWhisperEvent: Sendable {
    case recordingStarted(RecordingStartedPayload)
    case recordingStopped(RecordingStoppedPayload)
    case transcriptionCompleted(TranscriptionCompletedPayload)
    case transcriptionFailed(TranscriptionFailedPayload)
    case textInserted(TextInsertedPayload)
    case actionCompleted(ActionCompletedPayload)
}`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  {isDe ? "Hilfsklassen" : "Helper Classes"}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isDe ? "Das SDK enthält Helfer für häufige Muster:" : "The SDK includes helpers for common patterns:"}
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <li>
                    -{" "}
                    <code className="rounded bg-muted px-1 py-0.5">
                      PluginOpenAITranscriptionHelper
                    </code>{" "}
                    - {isDe ? "OpenAI-kompatibler Transkriptions-API-Client" : "OpenAI-compatible transcription API client"}
                  </li>
                  <li>
                    -{" "}
                    <code className="rounded bg-muted px-1 py-0.5">
                      PluginOpenAIChatHelper
                    </code>{" "}
                    - {isDe ? "OpenAI-kompatibler Chat-Completion-Client" : "OpenAI-compatible chat completion client"}
                  </li>
                  <li>
                    -{" "}
                    <code className="rounded bg-muted px-1 py-0.5">
                      PluginWavEncoder
                    </code>{" "}
                    - {isDe ? "Kodiert Float-Samples zu WAV-Daten" : "Encode Float samples to WAV data"}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Example */}
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">
              {isDe ? "Beispiel: Minimales LLM-Plugin" : "Example: Minimal LLM Plugin"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isDe
                ? "Ein vollständiges LLM-Provider-Plugin, das eine OpenAI-kompatible API kapselt:"
                : "A complete LLM provider plugin that wraps an OpenAI-compatible API:"}
            </p>
            <div className="mt-4">
              <CodeBlock
                code={`import Foundation
import TypeWhisperPluginSDK

@objc(MyLLMPlugin)
final class MyLLMPlugin: NSObject, LLMProviderPlugin {
    static let pluginId = "com.example.my-llm"
    static let pluginName = "My LLM"

    private nonisolated(unsafe) var host: HostServices?
    private let chatHelper = PluginOpenAIChatHelper(
        baseURL: "https://api.example.com"
    )

    let providerName = "My LLM"
    let supportedModels = [
        PluginModelInfo(
            id: "model-v1",
            displayName: "Model V1",
            sizeDescription: "Cloud",
            languageCount: 50
        )
    ]

    var isAvailable: Bool {
        host?.loadSecret(key: "apiKey") != nil
    }

    override init() {
        super.init()
    }

    func activate(host: HostServices) {
        self.host = host
    }

    func deactivate() {
        host = nil
    }

    func process(
        systemPrompt: String,
        userText: String,
        model: String?
    ) async throws -> String {
        guard let apiKey = host?.loadSecret(key: "apiKey") else {
            throw PluginChatError.notConfigured
        }
        return try await chatHelper.process(
            apiKey: apiKey,
            model: model ?? "model-v1",
            systemPrompt: systemPrompt,
            userText: userText
        )
    }
}`}
              />
            </div>
          </section>

          {/* Distribution */}
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">
              {isDe ? "Distribution" : "Distribution"}
            </h2>
            <div className="mt-2 space-y-3 text-sm text-muted-foreground">
              <p>
                {isDe
                  ? "Baue dein Plugin in der Release-Konfiguration und verteile die resultierende .bundle-Datei. Nutzer installieren es, indem sie es nach folgendem Pfad kopieren:"
                  : "Build your plugin in Release configuration and distribute the resulting .bundle file. Users install it by copying to:"}
              </p>
              <div className="mt-2">
                <CodeBlock
                  lang="bash"
                  code="~/Library/Application Support/TypeWhisper/Plugins/MyPlugin.bundle"
                />
              </div>
            </div>
          </section>

          {/* Contribute Plugins */}
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">
              {isDe ? "Plugins beitragen" : "Contribute Plugins"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isDe
                ? "Wenn du ein Plugin teilen oder upstream beisteuern möchtest, reiche es im passenden Plattform-Repository ein. Der separate Community-Plugin-Katalog wird eingestellt; macOS- und Windows-Plugins werden in den jeweiligen App-Repos geprüft."
                : "If you want to share or upstream a plugin, submit it to the matching platform repository. The separate community plugin catalog is being retired; macOS and Windows plugins are reviewed in the app repositories that own them."}
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">
                  {isDe ? "Provider-Zugriffsrichtlinie" : "Provider access policy"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isDe
                    ? "Plugin-Beiträge, die externe Anbieter anbinden, müssen Zugangswege verwenden, die der Anbieter für Drittanbieter-Integrationen autorisiert. Zulässig sind nutzerbereitgestellte API-Schlüssel, offizielle Abrechnung über Entwicklerplattformen, offiziell dokumentierte SDK- oder OAuth-Flows für Drittanbieter-Apps sowie rein lokale Integrationen, die kein Anbieterkonto imitieren."
                    : "Plugin contributions that connect to external providers must use access paths the provider authorizes for third-party integrations. Acceptable paths include user-provided API keys, official developer platform billing, officially documented SDK or OAuth flows intended for third-party apps, and local-only integrations that do not impersonate a provider account."}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isDe
                    ? "Plugins dürfen keinen First-Party-Client eines Anbieters imitieren, keine Verbraucher-Abo-Zugangsdaten als API-Zugriff verwenden, sofern der Anbieter diesen Drittanbieter-Weg nicht ausdrücklich unterstützt, und nicht auf inoffizielle OAuth-Clients, kopierte Client-IDs, versteckte Endpunkte oder Token-Refresh-Flows setzen, die für ein anderes First-Party-Produkt bestimmt sind."
                    : "Plugins must not impersonate a provider's first-party client, use consumer subscription credentials as API access unless the provider explicitly supports that third-party path, or rely on unofficial OAuth clients, copied client IDs, hidden endpoints, or token refresh flows intended for another first-party product."}
                </p>
              </div>
              <div className="rounded-xl bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">
                  {isDe ? "Wo du Beiträge einreichst" : "Where to submit"}
                </h3>
                <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">1.</span>{" "}
                    {isDe ? "macOS-Plugins gehören in " : "Submit macOS plugins to "}
                    <a
                      href="https://github.com/TypeWhisper/typewhisper-mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      TypeWhisper/typewhisper-mac
                    </a>{" "}
                    {isDe ? "." : "."}
                  </li>
                  <li>
                    <span className="font-medium text-foreground">2.</span>{" "}
                    {isDe ? "Windows-Plugins gehören in " : "Submit Windows plugins to "}
                    <a
                      href="https://github.com/TypeWhisper/typewhisper-win"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      TypeWhisper/typewhisper-win
                    </a>{" "}
                    {isDe ? "." : "."}
                  </li>
                  <li>
                    <span className="font-medium text-foreground">3.</span>{" "}
                    {isDe
                      ? "Dokumentiere Einrichtung, benötigte Zugangsdaten, unterstützte Plattformen und den autorisierten Provider-Zugriffsweg im Pull Request oder Issue."
                      : "Document setup, required credentials, supported platforms, and the authorized provider access path in the pull request or issue."}
                  </li>
                  <li>
                    <span className="font-medium text-foreground">4.</span>{" "}
                    {isDe
                      ? "Das Plattform-Repo ist die Quelle der Wahrheit für Build, Review, Release und mögliche Katalog-Listung."
                      : "The platform repository is the source of truth for build, review, release, and any catalog listing."}
                  </li>
                </ol>
              </div>
              <p className="text-xs text-muted-foreground">
                {isDe
                  ? "Der frühere separate Community-Plugin-Repository-Ansatz wird nicht mehr als Einreichungsweg verwendet."
                  : "The earlier separate community plugin repository flow is no longer used for submissions."}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
