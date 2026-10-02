/** Code samples of the plugin guide; the same in every locale. */

export const sdkDependency = `// Package.swift
dependencies: [
    .package(
        url: "https://github.com/TypeWhisper/TypeWhisperPluginSDK.git",
        from: "1.0.0"
    )
]

// Target dependency
.product(name: "TypeWhisperPluginSDK", package: "TypeWhisperPluginSDK")`;

export const manifest = `{
  "id": "com.yourname.myplugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "minHostVersion": "0.9.0",
  "minOSVersion": "14.0",
  "hosting": "local",
  "requiresAPIKey": false,
  "author": "Your Name",
  "principalClass": "MyPlugin"
}`;

export const typeWhisperPlugin = `public protocol TypeWhisperPlugin: AnyObject, Sendable {
    static var pluginId: String { get }
    static var pluginName: String { get }
    init()
    func activate(host: HostServices)
    func deactivate()
    var settingsView: AnyView? { get }  // optional, default nil
}`;

export const hostServices = `public protocol HostServices: Sendable {
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
}`;

export const llmProviderPlugin = `public protocol LLMProviderPlugin: TypeWhisperPlugin {
    var providerName: String { get }
    var isAvailable: Bool { get }
    var supportedModels: [PluginModelInfo] { get }
    func process(
        systemPrompt: String,
        userText: String,
        model: String?
    ) async throws -> String
}`;

export const pluginModelInfo = `public final class PluginModelInfo: @unchecked Sendable {
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
}`;

export const transcriptionEnginePlugin = `public protocol TranscriptionEnginePlugin: TypeWhisperPlugin {
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
}`;

export const postProcessorPlugin = `public protocol PostProcessorPlugin: TypeWhisperPlugin {
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
}`;

export const actionPlugin = `public protocol ActionPlugin: TypeWhisperPlugin {
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
}`;

export const eventBus = `public protocol EventBusProtocol: Sendable {
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
}`;

export const exampleLlmPlugin = `import Foundation
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
}`;

export const installPath =
  "~/Library/Application Support/TypeWhisper/Plugins/MyPlugin.bundle";
