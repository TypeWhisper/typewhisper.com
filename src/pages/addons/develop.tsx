import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddonsDevelop() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/addons">
            <ArrowLeft className="size-4" />
            Back to Add-ons
          </Link>
        </Button>

        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Build a Plugin
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Create custom plugins for TypeWhisper using Swift and the
          TypeWhisperPluginSDK.
        </p>

        <div className="mt-10 space-y-6">
          {/* Overview */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              TypeWhisper plugins are standard macOS bundles (.bundle) written in
              Swift. Each plugin links against the TypeWhisperPluginSDK package
              and exports a principal class conforming to one or more plugin
              protocols. Plugins are loaded at launch from{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                ~/Library/Application Support/TypeWhisper/Plugins/
              </code>
              .
            </p>
          </section>

          {/* Plugin Types */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Plugin Types</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              There are four plugin protocols you can adopt. A single plugin can
              conform to multiple protocols (e.g., both transcription and LLM).
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-md bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">
                  TranscriptionEnginePlugin
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Provides a speech-to-text engine. Receives audio data (16kHz
                  mono Float samples + pre-encoded WAV) and returns transcribed
                  text. Supports model selection, language detection, and
                  translation.
                </p>
              </div>
              <div className="rounded-md bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">LLMProviderPlugin</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Provides an LLM for processing transcribed text via custom
                  prompts. Receives a system prompt and user text, returns the
                  model&apos;s response. Used for text correction,
                  summarization, formatting, and more.
                </p>
              </div>
              <div className="rounded-md bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">PostProcessorPlugin</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Processes text after transcription in a priority-based
                  pipeline. Receives the transcribed text and context (active
                  app, URL, language). Runs alongside built-in processors like
                  snippets and dictionary.
                </p>
              </div>
              <div className="rounded-md bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">ActionPlugin</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Performs an action with LLM-processed text instead of inserting
                  it. Receives the processed text and context, returns a result
                  message shown in the notch indicator. Used for integrations
                  like creating Linear issues or sending data to external
                  services.
                </p>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Getting Started</h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold">Prerequisites</h3>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  <li>- macOS 15.0+ and Xcode 16+</li>
                  <li>- Swift 6.0</li>
                  <li>- Basic familiarity with macOS bundle targets</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  1. Create a Bundle Target
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  In Xcode, create a new macOS Bundle target. Set the principal
                  class in your Info.plist to your plugin&apos;s main class
                  name.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  2. Add the SDK Dependency
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add TypeWhisperPluginSDK as a local Swift Package dependency:
                </p>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  <code>{`// Package.swift dependency
.package(path: "../TypeWhisperPluginSDK")

// Target dependency
.product(name: "TypeWhisperPluginSDK", package: "TypeWhisperPluginSDK")`}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  3. Create manifest.json
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add a manifest.json to your bundle&apos;s Resources directory:
                </p>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  <code>{`{
  "id": "com.example.my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "minHostVersion": "0.9.0",
  "author": "Your Name",
  "description": "What your plugin does",
  "website": "https://example.com",
  "capabilities": ["llm"]
}`}</code>
                </pre>
                <p className="mt-2 text-xs text-muted-foreground">
                  Valid capabilities:{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    &quot;transcription&quot;
                  </code>
                  ,{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    &quot;llm&quot;
                  </code>
                  ,{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    &quot;postprocessor&quot;
                  </code>
                  ,{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    &quot;action&quot;
                  </code>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">4. Build & Install</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Build your bundle and copy the .bundle file to{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    ~/Library/Application Support/TypeWhisper/Plugins/
                  </code>
                  . Restart TypeWhisper to load the plugin.
                </p>
              </div>
            </div>
          </section>

          {/* SDK API Reference */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">SDK API Reference</h2>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold">TypeWhisperPlugin</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Base protocol all plugins must conform to.
                </p>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  <code>{`public protocol TypeWhisperPlugin: AnyObject, Sendable {
    static var pluginId: String { get }
    static var pluginName: String { get }
    init()
    func activate(host: HostServices)
    func deactivate()
    var settingsView: AnyView? { get }  // optional
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold">HostServices</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Provided to your plugin on activation. Gives access to
                  keychain, preferences, file storage, app context, and the
                  event bus.
                </p>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  <code>{`public protocol HostServices: Sendable {
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
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold">LLMProviderPlugin</h3>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  <code>{`public protocol LLMProviderPlugin: TypeWhisperPlugin {
    var providerName: String { get }
    var isAvailable: Bool { get }
    var supportedModels: [PluginModelInfo] { get }
    func process(
        systemPrompt: String,
        userText: String,
        model: String?
    ) async throws -> String
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  TranscriptionEnginePlugin
                </h3>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  <code>{`public protocol TranscriptionEnginePlugin: TypeWhisperPlugin {
    var providerId: String { get }
    var providerDisplayName: String { get }
    var isConfigured: Bool { get }
    var transcriptionModels: [PluginModelInfo] { get }
    var selectedModelId: String? { get }
    func selectModel(_ modelId: String)
    var supportsTranslation: Bool { get }
    func transcribe(
        audio: AudioData,
        language: String?,
        translate: Bool,
        prompt: String?
    ) async throws -> PluginTranscriptionResult
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold">PostProcessorPlugin</h3>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  <code>{`public protocol PostProcessorPlugin: TypeWhisperPlugin {
    var processorName: String { get }
    var priority: Int { get }
    @MainActor func process(
        text: String,
        context: PostProcessingContext
    ) async throws -> String
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold">ActionPlugin</h3>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  <code>{`public protocol ActionPlugin: TypeWhisperPlugin {
    var actionName: String { get }
    var actionId: String { get }
    var actionIcon: String { get }  // SF Symbol name
    func execute(
        input: String,
        context: ActionContext
    ) async throws -> ActionResult
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold">EventBus</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Subscribe to app-wide events like recording start/stop,
                  transcription completion, and text insertion.
                </p>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  <code>{`public enum TypeWhisperEvent: Sendable {
    case recordingStarted(RecordingStartedPayload)
    case recordingStopped(RecordingStoppedPayload)
    case transcriptionCompleted(TranscriptionCompletedPayload)
    case transcriptionFailed(TranscriptionFailedPayload)
    case textInserted(TextInsertedPayload)
    case actionCompleted(ActionCompletedPayload)
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Helper Classes</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  The SDK includes helpers for common patterns:
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <li>
                    -{" "}
                    <code className="rounded bg-muted px-1 py-0.5">
                      PluginOpenAITranscriptionHelper
                    </code>{" "}
                    - OpenAI-compatible transcription API client
                  </li>
                  <li>
                    -{" "}
                    <code className="rounded bg-muted px-1 py-0.5">
                      PluginOpenAIChatHelper
                    </code>{" "}
                    - OpenAI-compatible chat completion client
                  </li>
                  <li>
                    -{" "}
                    <code className="rounded bg-muted px-1 py-0.5">
                      PluginWavEncoder
                    </code>{" "}
                    - Encode Float samples to WAV data
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Example */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">
              Example: Minimal LLM Plugin
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A complete LLM provider plugin that wraps an OpenAI-compatible
              API:
            </p>
            <pre className="mt-4 overflow-x-auto rounded-md bg-muted p-3 text-xs">
              <code>{`import Foundation
import TypeWhisperPluginSDK

final class MyLLMPlugin: LLMProviderPlugin {
    static let pluginId = "com.example.my-llm"
    static let pluginName = "My LLM"

    private var host: HostServices?
    private let chatHelper = PluginOpenAIChatHelper(
        baseURL: "https://api.example.com"
    )

    let providerName = "My LLM"
    let supportedModels = [
        PluginModelInfo(id: "model-v1", displayName: "Model V1")
    ]

    var isAvailable: Bool {
        host?.loadSecret(key: "apiKey") != nil
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
}`}</code>
            </pre>
          </section>

          {/* Distribution */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Distribution</h2>
            <div className="mt-2 space-y-3 text-sm text-muted-foreground">
              <p>
                Build your plugin in Release configuration and distribute the
                resulting .bundle file. Users install it by copying to:
              </p>
              <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
                <code>
                  ~/Library/Application Support/TypeWhisper/Plugins/MyPlugin.bundle
                </code>
              </pre>
              <p>
                A community plugin registry is planned for a future release,
                enabling discovery and one-click installation directly from
                TypeWhisper.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
