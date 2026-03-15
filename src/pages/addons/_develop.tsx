import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";

export default function AddonsDevelop() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <a href="/addons">
            <ArrowLeft className="size-4" />
            Back to Add-ons
          </a>
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
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              TypeWhisper plugins are standard macOS bundles (.bundle) written in
              Swift. Each plugin links against the TypeWhisperPluginSDK package
              and exports a principal class conforming to one or more plugin
              protocols. The principal class must inherit from{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                NSObject
              </code>{" "}
              and use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                @objc(ClassName)
              </code>{" "}
              attribute so the bundle loader can instantiate it. Plugins are
              loaded at launch from{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                ~/Library/Application Support/TypeWhisper/Plugins/
              </code>
              .
            </p>
          </section>

          {/* Plugin Types */}
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Plugin Types</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              There are four plugin protocols you can adopt. A single plugin can
              conform to multiple protocols (e.g., both transcription and LLM).
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">
                  TranscriptionEnginePlugin
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Provides a speech-to-text engine. Receives audio data (16kHz
                  mono Float samples + pre-encoded WAV) and returns transcribed
                  text. Supports model selection, language detection, translation,
                  and optional streaming via a progress callback.
                </p>
              </div>
              <div className="rounded-xl bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">LLMProviderPlugin</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Provides an LLM for processing transcribed text via custom
                  prompts. Receives a system prompt and user text, returns the
                  model's response. Used for text correction,
                  summarization, formatting, and more.
                </p>
              </div>
              <div className="rounded-xl bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">PostProcessorPlugin</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Processes text after transcription in a priority-based
                  pipeline. Receives the transcribed text and context (active
                  app, URL, language). Runs alongside built-in processors like
                  snippets and dictionary.
                </p>
              </div>
              <div className="rounded-xl bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">ActionPlugin</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Performs an action with LLM-processed text instead of inserting
                  it. Receives the processed text and context, returns a result
                  message shown in the notch indicator. Can include a URL to open
                  and a custom display duration.
                </p>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Getting Started</h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold">Prerequisites</h3>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  <li>- macOS 14.0+ (Sonoma) and Xcode 16+</li>
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
                  class in your Info.plist to your plugin's main class name.
                  The class must inherit from{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    NSObject
                  </code>{" "}
                  and be annotated with{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    @objc(ClassName)
                  </code>{" "}
                  so the runtime can find and instantiate it.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  2. Add the SDK Dependency
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add TypeWhisperPluginSDK as a Swift Package dependency:
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
                  3. Create manifest.json
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add a manifest.json to your bundle's Resources directory:
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
  "author": "Your Name",
  "principalClass": "MyPlugin"
}`}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  <code className="rounded bg-muted px-1 py-0.5">
                    principalClass
                  </code>{" "}
                  must match the name in your{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    @objc(...)
                  </code>{" "}
                  annotation.{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    minOSVersion
                  </code>{" "}
                  is optional and defaults to 14.0.
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
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">SDK API Reference</h2>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold">TypeWhisperPlugin</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Base protocol all plugins must conform to.
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
                  Provided to your plugin on activation. Gives access to
                  keychain, preferences, file storage, app context, and the
                  event bus.
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
                  Call{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    notifyCapabilitiesChanged()
                  </code>{" "}
                  when your plugin's available models or configuration state
                  changes (e.g., after loading a model or receiving an API key).
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
                  The streaming variant has a default implementation that falls
                  back to the standard{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    transcribe
                  </code>{" "}
                  method. Override it and set{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    supportsStreaming
                  </code>{" "}
                  to{" "}
                  <code className="rounded bg-muted px-1 py-0.5">true</code>{" "}
                  if your engine supports partial results.
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
                  Subscribe to app-wide events like recording start/stop,
                  transcription completion, and text insertion.
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
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">
              Example: Minimal LLM Plugin
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A complete LLM provider plugin that wraps an OpenAI-compatible
              API:
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
            <h2 className="text-lg font-semibold">Distribution</h2>
            <div className="mt-2 space-y-3 text-sm text-muted-foreground">
              <p>
                Build your plugin in Release configuration and distribute the
                resulting .bundle file. Users install it by copying to:
              </p>
              <div className="mt-2">
                <CodeBlock
                  lang="bash"
                  code="~/Library/Application Support/TypeWhisper/Plugins/MyPlugin.bundle"
                />
              </div>
            </div>
          </section>

          {/* Submit to Plugin Catalog */}
          <section className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">
              Submit to the Plugin Catalog
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Share your plugin with the TypeWhisper community by submitting it
              to the official plugin catalog. Submitted plugins are built
              automatically and listed on this website for easy discovery.
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-muted/50 px-4 py-3">
                <h3 className="text-sm font-semibold">How to Submit</h3>
                <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">1.</span>{" "}
                    Fork the{" "}
                    <a
                      href="https://github.com/TypeWhisper/typewhisper-plugins"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      TypeWhisper/typewhisper-plugins
                    </a>{" "}
                    repository.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">2.</span>{" "}
                    Create a directory under{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">
                      plugins/your-plugin-slug/
                    </code>{" "}
                    with your{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">
                      manifest.json
                    </code>
                    ,{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">
                      README.md
                    </code>
                    ,{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">
                      LICENSE
                    </code>
                    , and{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">
                      src/
                    </code>{" "}
                    directory with your Swift source.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">3.</span>{" "}
                    Open a pull request - CI will automatically validate your
                    manifest, check required files, and compile your plugin.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">4.</span>{" "}
                    The TypeWhisper team reviews your submission.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">5.</span>{" "}
                    After merge, your plugin is automatically built, released,
                    and listed in the catalog.
                  </li>
                </ol>
              </div>
              <p className="text-xs text-muted-foreground">
                See the{" "}
                <a
                  href="https://github.com/TypeWhisper/typewhisper-plugins/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  CONTRIBUTING.md
                  <ExternalLink className="ml-0.5 inline size-3" />
                </a>{" "}
                for detailed guidelines on manifest format, directory structure,
                and review criteria.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
