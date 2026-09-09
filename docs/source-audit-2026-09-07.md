# Website source audit — 2026-09-07

The English and German website was checked against desktop app/plugin implementations, published plugin catalogs and releases, and the iOS implementation and public App Store listing. The audit covers 51 add-on families: 48 macOS implementations and 39 Windows implementations. All published catalog entries are represented. Thirty-six families have separate macOS and Windows guides in both languages.

## Evidence and release boundaries

- Website baseline: `1d8d816` on `main`.
- [macOS implementation](https://github.com/TypeWhisper/typewhisper-mac/tree/09ac5a11): public stable host 1.6.0. Plugin versions and requirements use the [published catalog](https://github.com/TypeWhisper/typewhisper-mac/blob/gh-pages/plugins-community-v1.json) and linked release packages.
- [Windows implementation](https://github.com/TypeWhisper/typewhisper-win/tree/e18adcd): public stable host 1.0.9. Plugin versions and requirements use the [published catalog](https://github.com/TypeWhisper/typewhisper-win/blob/gh-pages/plugins.json) and linked releases.
- [iOS App Store listing](https://apps.apple.com/app/id6759319267): public version 1.0, minimum iOS 18. Unreleased 1.1 features were not promoted to current public capabilities.
- Source manifests may lag independently published plugin packages. OpenRouter's published 1.1.7 bundle was inspected to resolve that discrepancy. The Windows Qwen3 1.1.0 guide links its published release source because that ONNX implementation differs from current development source.
- Plugin publication does not prove compatibility with the stable host. Pages now identify requirements above the current stable version. Requirements were not lowered to hide catalog inconsistencies.

## Corrections

| Area | Result |
| --- | --- |
| Catalog completeness | Added System Voice, Web Link Transcription and MemPalace, with published metadata and setup guides. No screenshots were fabricated for these entries. |
| Versions and requirements | Refreshed independently released macOS/Windows versions, minimum versions and release links. |
| Platform filters | Combined category/platform filters use the selected edition's capabilities. Cohere and Fireworks no longer appear as Windows transcription providers. Card badges follow the selected platform. |
| Gemini and OpenRouter | Corrected transcription/LLM capabilities, separate model catalogs, configuration and data flow. |
| Granite on Windows | Documented the managed Python/PyTorch implementation instead of ONNX. |
| Memory | Corrected Windows OpenAI Vector Memory to local JSON plus cloud embeddings. Removed File Memory's nonexistent folder setting. Distinguished local storage from LLM extraction, and documented macOS writes to every ready memory provider. |
| Windows memory limitation | Source inspection of both current code and stable 1.0.9 found no host call wiring automatic memory extraction/retrieval into dictation. Guides describe this limitation rather than promising automatic recall. Native Windows execution was not performed. |
| Other setup details | Corrected Cohere's explicit language selection and dictionary limitations, AssemblyAI models/diarization, MCP stdio/HTTP support, Qwen model unloading, and WhisperKit/Parakeet model selection. |
| Desktop/iOS comparison | Corrected Parakeet streaming differences, model size, Windows acceleration/download instructions, Apple language availability and translation wording. Removed unsupported speed and accuracy rankings. |
| Premium | Corrected Cloud Folder Sync wording and included macOS calendar automation among Commercial features. |
| General benchmark | Replaced the old aggregate ranking with a localized explanation of missing reproducibility information. The raw historical dataset remains available in source. Separately documented Cohere measurements were checked against public issue evidence and retained. |
| Rendered pages | Corrected 404 language links, mobile overflow from long inline file paths, extra main landmarks in interface illustrations, and release-note heading hierarchy. Localized changelog controls and dates. |

The linked Cohere measurements have their own documented inputs and hardware: [macOS issue 1031](https://github.com/TypeWhisper/typewhisper-mac/issues/1031) and [Windows issue 339](https://github.com/TypeWhisper/typewhisper-win/issues/339). They are limited evaluations, not a current ranking of all engines.

## Validation

- `npm run test:unit`: 29 passed.
- `npm run build`: 539 HTML pages, zero Astro errors/warnings, 1,421 translation keys checked; 306 pages indexed in two languages.
- Playwright: all 113 scenarios passed during the audit. The final full run passed 111 immediately; two existing documentation navigation tests failed transiently and passed in the isolated eight-test documentation rerun. An earlier full run passed all 113 together. The production crawl below independently checked the rendered artifact.
- Production browser crawl: 360 localized routes (including redirects), HTTP 200 throughout, one main landmark and one primary heading per rendered page, no page JavaScript exceptions or broken loaded images, and no horizontal overflow at 390 CSS pixels.
- Static artifact scan: 14,101 local references checked across 539 HTML files; no missing targets, missing fragments or duplicate IDs.
- Visual inspection: English iOS and German Windows at 390 pixels in light mode, German macOS at 1280 pixels in dark mode, plus add-on compatibility notices and platform filters in the collaborative preview.
- Catalog/source reconciliation: all 87 published platform entries covered, no version/requirement mismatches, and every documented add-on source path exists at its linked revision.
- `git diff --check`: clean.

Native app execution, paid-provider calls, account-specific model availability and model-quality benchmarks are outside this website verification. App source repositories were inspected without changing their code. No publication or deployment was performed.

## Published add-on inventory

Versions below are plugin versions. Minimum host versions are included when supplied by the published metadata. A dash means that no minimum host version was declared in that catalog entry; it does not imply universal compatibility.

| Family | macOS version / minimum host | Windows version / minimum host | Capabilities across editions |
| --- | --- | --- | --- |
| [Apple Speech](../src/content/addons/en/apple-speech.mdx) | 1.0.15 / 0.12.0 | — | transcription |
| [AssemblyAI](../src/content/addons/en/assemblyai.mdx) | 1.1.0 / 1.5.0 | 1.1.2 / — | transcription |
| [Authenticated Provider CLIs](../src/content/addons/en/authenticated-cli.mdx) | 1.1.0 / 1.7.0 | 1.1.0 / 1.0.9 | llm |
| [Cartesia](../src/content/addons/en/cartesia.mdx) | 1.0.4 / 1.5.0 | — | transcription, tts |
| [Cerebras](../src/content/addons/en/cerebras.mdx) | 1.0.5 / 0.9.0 | 1.0.0 / — | llm |
| [Claude](../src/content/addons/en/claude.mdx) | 1.1.1 / 0.9.0 | 1.0.1 / 1.0.9 | llm |
| [Cloudflare ASR](../src/content/addons/en/cloudflare-asr.mdx) | 1.0.6 / 1.5.0 | 1.0.0 / — | transcription |
| [Cohere Transcribe (Local)](../src/content/addons/en/cohere-local.mdx) | 1.0.1 / 1.6.0 | 1.0.1 / 1.0.6 | transcription |
| [Cohere](../src/content/addons/en/cohere.mdx) | 1.0.4 / 0.12.0 | 1.0.0 / — | transcription, llm |
| [Deepgram](../src/content/addons/en/deepgram.mdx) | 1.0.15 / 1.6.0 | 1.0.2 / — | transcription |
| [ElevenLabs](../src/content/addons/en/elevenlabs.mdx) | 1.0.11 / 1.5.0 | 1.0.1 / — | transcription |
| [File Memory](../src/content/addons/en/file-memory.mdx) | 1.0.3 / 0.14.0 | 1.0.0 / — | memory |
| [Filler Words](../src/content/addons/en/filler-words.mdx) | 1.0.1 / 1.0.0 | 1.0.0 / 1.0.0 | post-processing |
| [Fireworks AI](../src/content/addons/en/fireworks.mdx) | 1.0.6 / 0.9.0 | 1.0.0 / — | transcription, llm |
| [Gemini](../src/content/addons/en/gemini.mdx) | 1.1.0 / 1.5.0 | 1.3.0 / 1.0.9 | transcription, llm |
| [Gemma 4 (Local)](../src/content/addons/en/gemma-local.mdx) | — | 1.0.1 / 1.0.9 | llm |
| [Gemma 4](../src/content/addons/en/gemma4.mdx) | 1.1.6 / 1.6.0 | — | llm |
| [Gladia](../src/content/addons/en/gladia.mdx) | 1.0.8 / 1.5.0 | 1.0.0 / — | transcription |
| [Google Cloud Speech-to-Text](../src/content/addons/en/google-cloud-stt.mdx) | 1.0.4 / 0.12.0 | 1.0.0 / — | transcription |
| [Granite](../src/content/addons/en/granite.mdx) | 1.0.10 / 1.6.0 | 1.0.4 / 0.8.4 | transcription |
| [Groq](../src/content/addons/en/groq.mdx) | 1.0.24 / 1.5.0 | 1.0.6 / 1.0.9 | transcription, llm |
| [Improve TypeWhisper](../src/content/addons/en/improve-typewhisper.mdx) | 0.1.0 / 1.6.0 | — | utility |
| [Linear](../src/content/addons/en/linear.mdx) | 1.0.14 / 0.9.0 | 1.0.0 / — | action |
| [Live Transcript](../src/content/addons/en/live-transcript.mdx) | 1.0.12 / 1.1.0 | 1.0.3 / — | utility |
| [MCP Client](../src/content/addons/en/mcp-client.mdx) | 0.2.1 / 1.6.0 | — | action |
| [MemPalace](../src/content/addons/en/mempalace.mdx) | 0.3.5 / 1.4.0 | — | memory |
| [Meta](../src/content/addons/en/meta.mdx) | 1.0.0 / 1.7.0 | 1.0.1 / 1.0.10 | transcription, llm |
| [Microsoft AI](../src/content/addons/en/microsoft-ai.mdx) | 1.0.0 / 1.7.0 | 1.0.0 / 1.0.9 | transcription |
| [Mistral AI](../src/content/addons/en/mistral.mdx) | 1.0.5 / 1.5.0 | — | transcription, llm |
| [Obsidian](../src/content/addons/en/obsidian.mdx) | 1.1.0 / 1.6.0 | 1.0.0 / — | action |
| [OpenAI Compatible](../src/content/addons/en/openai-compatible.mdx) | 1.1.8 / 1.5.0 | 1.0.6 / 1.0.9 | transcription, llm |
| [OpenAI Vector Memory](../src/content/addons/en/openai-vector-memory.mdx) | 1.0.3 / 0.14.0 | 1.0.0 / — | memory |
| [OpenAI / ChatGPT](../src/content/addons/en/openai.mdx) | 1.3.3 / 1.6.0 | 1.1.2 / 1.0.9 | transcription, llm, tts |
| [OpenRouter](../src/content/addons/en/openrouter.mdx) | 1.1.7 / 1.5.0 | 1.1.1 / 1.0.9 | transcription, llm |
| [Parakeet](../src/content/addons/en/parakeet.mdx) | 1.3.1 / 1.5.0 | — | transcription |
| [Qwen3 ASR](../src/content/addons/en/qwen3-asr.mdx) | 1.1.8 / 1.6.0 | 1.1.0 / — | transcription |
| [Reson8](../src/content/addons/en/reson8.mdx) | 1.0.0 / 0.12.0 | 1.0.0 / — | transcription |
| [Sber SaluteSpeech](../src/content/addons/en/sber-salutespeech.mdx) | 0.1.1 / 1.4.0 | — | transcription |
| [Script Runner](../src/content/addons/en/script-runner.mdx) | 1.1.5 / 0.9.0 | 1.1.0 / — | post-processing |
| [Local Models (sherpa-onnx)](../src/content/addons/en/sherpa-onnx.mdx) | — | 1.0.5 / — | transcription |
| [Smallest Pulse](../src/content/addons/en/smallest-pulse.mdx) | 1.0.0 / 1.4.0 | 1.0.0 / — | transcription |
| [Soniox](../src/content/addons/en/soniox.mdx) | 1.2.6 / 1.5.0 | 1.1.0 / — | transcription, tts |
| [Speechmatics](../src/content/addons/en/speechmatics.mdx) | 1.0.8 / 1.5.0 | 1.0.0 / — | transcription |
| [Supertonic (Experimental)](../src/content/addons/en/supertonic.mdx) | 1.0.1 / 1.4.0 | 1.0.1 / 1.4.0 | tts |
| [System Voice](../src/content/addons/en/system-voice.mdx) | 1.0.2 / 1.3.0 | — | tts |
| [Voxtral](../src/content/addons/en/voxtral.mdx) | 1.0.14 / 1.6.0 | 1.0.0 / — | transcription |
| [Web Link Transcription](../src/content/addons/en/web-link.mdx) | 1.0.0 / 1.7.0 | — | utility |
| [Webhook](../src/content/addons/en/webhook.mdx) | 1.0.15 / 0.9.0 | 1.0.0 / — | utility |
| [whisper.cpp (Local)](../src/content/addons/en/whisper-cpp.mdx) | — | 1.0.3 / 1.0.7 | transcription |
| [WhisperKit](../src/content/addons/en/whisperkit.mdx) | 1.2.0 / 1.6.0 | — | transcription |
| [xAI / Grok](../src/content/addons/en/xai-grok.mdx) | 1.0.2 / 1.5.0 | 1.0.1 / 1.0.9 | transcription, llm, tts |
