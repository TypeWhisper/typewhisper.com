# Brand logo sources — 2026-09-28

Record of the logos added to the add-on index on 2026-09-28. Every file is stored under `public/brand-logos/` and served by the site itself; no page loads a logo from another host. The files are unchanged copies of their source: renamed, not edited, recoloured, or converted.

Brand names and marks belong to their owners. The site uses them to name the provider or the maker of the model an add-on works with.

## Logos from svgl.app

Synced with `node scripts/sync-svgl-logos.mjs --only cerebras,nvidia,ibm,apple,model-context-protocol`. The definitions are in `src/data/brand-logos.ts`, the generated entries in `src/data/brand-logos.generated.json`. Add-ons name the brand in `brandLogo`.

| Add-on | Brand | Source | Files in `public/brand-logos/` | Brand guidelines |
| --- | --- | --- | --- | --- |
| Apple Speech | Apple | `https://svgl.app/library/apple.svg`, `https://svgl.app/library/apple_dark.svg` | `apple/logo-light.svg`, `apple/logo-dark.svg` | Not listed by the source |
| Cerebras | Cerebras | `https://svgl.app/library/cerebras-dark.svg`, `https://svgl.app/library/cerebras.svg` | `cerebras/logo-light.svg`, `cerebras/logo-dark.svg`, `cerebras/wordmark-light.svg`, `cerebras/wordmark-dark.svg` | Not listed by the source |
| Granite | IBM | `https://svgl.app/library/ibm.svg` | `ibm/logo.svg` | Not listed by the source |
| MCP Client | Model Context Protocol | `https://svgl.app/library/model-context-protocol-light.svg`, `https://svgl.app/library/model-context-protocol-dark.svg` | `model-context-protocol/logo-light.svg`, `model-context-protocol/logo-dark.svg`, `model-context-protocol/wordmark-light.svg`, `model-context-protocol/wordmark-dark.svg` | Not listed by the source |
| Parakeet | NVIDIA | `https://svgl.app/library/nvidia-icon-light.svg`, `https://svgl.app/library/nvidia-icon-dark.svg` | `nvidia/logo-light.svg`, `nvidia/logo-dark.svg`, `nvidia/wordmark-light.svg`, `nvidia/wordmark-dark.svg` | https://www.nvidia.com/en-us/about-nvidia/legal-info/logo-brand-usage |

Two add-ons use a brand that the project already had: Voxtral shows `mistral`, OpenAI Vector Memory shows `openai`. No file was added for them.

## Logos from the provider's own website

Downloaded on 2026-09-28. Add-ons name the file in `iconUrl`; where the source offers a variant for dark grounds, it is named in `iconUrlDark`.

| Add-on | Brand | Source | Files in `public/brand-logos/` | SHA-256 (first 12) | Brand guidelines |
| --- | --- | --- | --- | --- | --- |
| AssemblyAI | AssemblyAI | `https://www.assemblyai.com/media/logos/secondary-light.svg`, `https://www.assemblyai.com/media/logos/secondary-dark.svg` | `assemblyai/logo-light.svg`, `assemblyai/logo-dark.svg` | `7672bf72df15`, `681b44cca2e4` | https://www.assemblyai.com/media |
| Cartesia | Cartesia | `https://www.cartesia.ai/Cartesia-brand-assets.zip`, files `Archie/svg/black-archie.svg` and `Archie/svg/white-archie.svg` | `cartesia/logo-light.svg`, `cartesia/logo-dark.svg` | `03c0671ee3cc`, `05af884f8714` | https://www.cartesia.ai/brand |
| Deepgram | Deepgram | Brand files provided by the owner on 2026-09-28 (archive `Deepgram/`: `Deepgram_Icon_6.jpeg`, `Deepgram_Logo_0.svg`, `Deepgram_Logo_3.svg`) | `deepgram/logo.jpeg`, `deepgram/wordmark-light.svg`, `deepgram/wordmark-dark.svg` | `ebe55c2d1054` | None found on deepgram.com |
| ElevenLabs | ElevenLabs | `https://elevenlabs.io/icon.svg` | `elevenlabs/logo.svg` | `a8ccade64d9d` | https://elevenlabs.io/brand |
| Fireworks AI | Fireworks AI | `https://fireworks.ai/icon0.svg` | `fireworks/logo.svg` | `86b7f4b33ca4` | None found on fireworks.ai |
| Gladia | Gladia | `https://www.gladia.io/favicon.svg` | `gladia/logo.svg` | `443aaed6d55d` | None found on gladia.io |
| Soniox | Soniox | `https://soniox.com/icons/apple-touch-icon.png` | `soniox/logo.png` | `97ee93ffd0e9` | https://soniox.com/brand |
| Speechmatics | Speechmatics | `https://www.speechmatics.com/apple-touch-icon.png` | `speechmatics/logo.png` | `a352f33f2b53` | https://www.speechmatics.com/brand |

The same files exist in the owner's repositories, which confirms the choice:

- AssemblyAI: `typewhisper-win/src/TypeWhisper.WinUI/Assets/PluginLogos/assemblyai-light.svg` and `assemblyai-dark.svg` are identical to the downloads.
- Gladia: `typewhisper-win/src/TypeWhisper.WinUI/Assets/PluginLogos/gladia.svg` is identical to the download.
- Soniox: `typewhisper-ios/TypeWhisper/Resources/Assets.xcassets/EngineLogoSoniox.imageset/soniox-logo.png` is identical to the download.

## Notes on single variants

- **Deepgram**: the icon is a 400 pixel JPEG from the brand files the owner provided. It replaces the site icon (`favicon.ico`, 64 pixels) used at first. The two wordmarks from the same archive are stored for later use and not shown yet. `typewhisper-win` holds an SVG from Simple Icons (CC0) with the fill `#13EF93`; on the light tile that green reaches a contrast of 1.4:1, so it is not used.
- **Fireworks AI** has one variant in `#6720FF`. On the dark tile it reaches 3.0:1, on the light tile 6.0:1.
- **IBM** has one variant in `#1F70C1`. On the dark tile it reaches 3.8:1, on the light tile 4.7:1.
- **ElevenLabs**, **Gladia**, **Soniox**, **Speechmatics**, and **Deepgram** bring their own ground, so they read the same in both themes.
- The NVIDIA mark from svgl.app includes the name below the symbol. At the size of a tile the name is small.

## Add-ons without a logo

| Add-on | Reason |
| --- | --- |
| Sber SaluteSpeech | No mark of SaluteSpeech was found on the provider's domain. The icon of `developers.sber.ru` stands for the developer portal, not for the product. |
| Gemma 4, Gemma 4 (Local) | No file from a Google domain could be obtained. `typewhisper-win` holds `gemma.svg` from Lobe Icons (MIT), which is not a Google source. The page of Gemma 4 (Local) does not name Google. |
| Qwen3 ASR | svgl.app has a Qwen mark. The add-on page does not name the maker of the model, so the icon stays. |
| Supertonic | `typewhisper-win` holds the Supertone site icon. The add-on page does not name Supertone, so the icon stays. |
| WhisperKit | `typewhisper-ios` holds the Argmax logo from `https://www.argmaxinc.com/brand`. The add-on page does not name Argmax, so the icon stays. |
| whisper.cpp (Local) | The page does not name a maker of the model. whisper.cpp is a project of its own and has no logo in the sources. |
| Local Models (sherpa-onnx) | A runtime for several models. The Windows app shows the NVIDIA mark for it; the website keeps the icon. |
| Canary ASR | The plug-in sources name Sophea by KIEFERSA and no other maker. |
| MemPalace | Community add-on; no logo in the plug-in sources. |

TypeWhisper's own tools keep a lucide icon: Authenticated Provider CLIs, File Memory, Filler Words, Improve TypeWhisper, Live Transcript, OpenAI Compatible, Script Runner, System Voice, Web Link Transcription, Webhook.
