import { expect, test, type Page } from "@playwright/test";

/*
 * TypeWhisper 1.8 for macOS adds the audio settings API, the Recorder catch-up
 * endpoint, Recorder automation in two add-ons, and model commands in the CLI.
 * It also adds speaker detection and voice profiles, the browser context of
 * browser extensions, text processing with language models and workflows, and
 * the replace mode of settings imports.
 */

const copy = {
  en: {
    available: "Available from TypeWhisper 1.8.",
    token: "From TypeWhisper 1.8, the API server requires the token by default",
    models: "Load, unload, and delete models",
    audio: "Audio settings",
    audioFields: "Fields",
    audioRestore: "Change settings temporarily",
    recordings: "Completed Recorder transcripts",
    recordingFields: "Response fields",
    automation: "Webhooks, scripts, and plugin events",
    recorderHeading: "Recorder transcripts",
    webhookOption: "Also send completed Recorder transcripts",
    scriptOption: "Also run for completed Recorder transcripts",
    macOnly: "TypeWhisper for Windows does not offer this option.",
    minimumVersion: "Available on macOS from TypeWhisper 1.8 with version 1.2.0 or newer of this add-on.",
    timeLimit: "On macOS, Script Runner stops every run after five seconds",
    transcriptionSpeakers: "Speaker detection",
    historySpeakers: "Speakers and Recorder recordings",
    speakerProfiles: "Name speakers and teach voice profiles",
    requestFields: "Request fields",
    errors: "Errors",
    browser: "Report the active browser tab",
    text: "Process text with language models and workflows",
    textLlm: "Language models",
    textWorkflows: "Workflows",
    textLimits: "Limits and errors",
  },
  de: {
    available: "Verfügbar ab TypeWhisper 1.8.",
    token: "Ab TypeWhisper 1.8 verlangt der API-Server standardmäßig das Token",
    models: "Modelle laden, entladen und löschen",
    audio: "Audioeinstellungen",
    audioFields: "Felder",
    audioRestore: "Einstellungen vorübergehend ändern",
    recordings: "Fertige Recorder-Transkripte",
    recordingFields: "Felder der Antwort",
    automation: "Webhooks, Skripte und Plugin-Events",
    recorderHeading: "Recorder-Transkripte",
    webhookOption: "Auch fertige Recorder-Transkripte senden",
    scriptOption: "Auch für fertige Recorder-Transkripte ausführen",
    macOnly: "TypeWhisper für Windows bietet diese Option nicht.",
    minimumVersion: "Verfügbar unter macOS ab TypeWhisper 1.8 mit Version 1.2.0 oder neuer dieses Add-ons.",
    timeLimit: "Unter macOS beendet Script Runner jeden Lauf nach fünf Sekunden",
    transcriptionSpeakers: "Sprechererkennung",
    historySpeakers: "Sprecher und Recorder-Aufnahmen",
    speakerProfiles: "Sprecher benennen und Sprecherprofile anlernen",
    requestFields: "Felder des Requests",
    errors: "Fehler",
    browser: "Aktiven Browser-Tab melden",
    text: "Text mit Sprachmodellen und Workflows verarbeiten",
    textLlm: "Sprachmodelle",
    textWorkflows: "Workflows",
    textLimits: "Grenzen und Fehler",
  },
} as const;

function section(page: Page, id: string) {
  return page.locator(`section#${id}`);
}

async function expectAnchoredHeading(
  page: Page,
  level: 2 | 3,
  id: string,
  name: string,
) {
  const heading = page.getByRole("heading", { level, name, exact: true });
  await expect(heading).toBeVisible();
  await expect(heading.getByRole("link")).toHaveAttribute("href", `#${id}`);
  await expect(page.locator(`.docs-toc a[href="#${id}"]`)).toHaveCount(1);
}

/** A subheading whose name is not unique on the page, found by its anchor. */
async function expectAnchoredSubheading(page: Page, id: string, name: string) {
  const heading = page.locator(`h3#${id}`);
  await expect(heading).toHaveAccessibleName(name);
  await expect(heading.getByRole("link")).toHaveAttribute("href", `#${id}`);
  await expect(page.locator(`.docs-toc a[href="#${id}"]`)).toHaveCount(1);
}

/** The endpoint table row whose route cell is exactly `path`. */
function endpointRow(page: Page, path: string) {
  return section(page, "endpoint-reference")
    .getByRole("row")
    .filter({ has: page.getByRole("cell", { name: path, exact: true }) });
}

/** The paragraph right after a subheading. */
function firstParagraphAfter(page: Page, id: string) {
  return page.locator(`h3#${id}`).locator("xpath=following-sibling::p[1]");
}

test.describe("macOS 1.8 API documentation", () => {
  for (const locale of ["en", "de"] as const) {
    const text = copy[locale];

    test(`${locale} lists the new routes in the endpoint reference`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/mac/api/`);
      const reference = section(page, "endpoint-reference");

      for (const route of [
        "/v1/models/load",
        "/v1/models/unload",
        "/v1/models?engine=<id>&model=<id>",
        "/v1/recorder/recordings?since=<time>",
      ]) {
        await expect(
          reference.getByRole("cell", { name: route, exact: true }),
        ).toBeVisible();
      }

      const audioRows = reference
        .getByRole("row")
        .filter({ hasText: "/v1/settings/audio" });
      await expect(audioRows).toHaveCount(2);
      await expect(audioRows.filter({ hasText: "PATCH" })).toContainText(
        text.available,
      );
      await expect(audioRows.filter({ hasText: "GET" })).toContainText(
        text.available,
      );
      await expect(
        reference.getByRole("row").filter({ hasText: "/v1/recorder/recordings" }),
      ).toContainText(text.available);
      // The model routes shipped before 1.8 and carry no availability note.
      for (const route of ["/v1/models/load", "/v1/models/unload", "/v1/models?engine"]) {
        await expect(
          reference.getByRole("row").filter({ hasText: route }),
        ).not.toContainText(text.available);
      }
    });

    test(`${locale} describes the token and browser checks of 1.8`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/mac/api/`);
      const setup = section(page, "setup-authentication");
      await expect(setup).toContainText(text.token);
      await expect(setup).toContainText(
        '-H @"$AUTH_HEADER"',
      );
      await expect(setup).toContainText("Sec-Fetch-Site: cross-site");
      // The token never appears on a command line in the examples.
      await expect(page.locator("main")).not.toContainText("Bearer $TYPEWHISPER_API_TOKEN");
      await expect(
        page.locator("#error-codes ~ ul li", { hasText: "403" }),
      ).toHaveCount(1);
    });

    test(`${locale} documents model management, audio settings, and Recorder catch-up`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/mac/api/`);

      await expectAnchoredHeading(page, 2, "model-management", text.models);
      const models = section(page, "model-management");
      await expect(models).toContainText('"status": "ready"');
      await expect(models).toContainText(
        "/v1/models?engine=whisper&model=openai_whisper-large-v3_turbo",
      );
      await expect(models.locator("p").first()).not.toHaveText(text.available);

      await expectAnchoredHeading(page, 2, "audio-settings", text.audio);
      await expectAnchoredHeading(
        page,
        3,
        "audio-settings-fields",
        text.audioFields,
      );
      await expectAnchoredHeading(
        page,
        3,
        "audio-settings-restore",
        text.audioRestore,
      );
      const audio = section(page, "audio-settings");
      await expect(audio.locator("p").first()).toHaveText(text.available);
      const fields = audio.getByRole("region", { name: text.audioFields });
      for (const field of [
        "input_devices",
        "input_priority",
        "active_input",
        "audio_ducking_enabled",
        "audio_ducking_level",
        "pause_media_during_recording",
        "sound_feedback_enabled",
      ]) {
        await expect(fields).toContainText(field);
      }
      await expect(audio).toContainText(
        "jq 'del(.input_devices, .active_input)'",
      );
      await expect(
        audio.locator(`a[href="/${locale}/docs/mac/cli/#command-audio"]`),
      ).toBeVisible();

      await expectAnchoredHeading(
        page,
        2,
        "recorder-recordings",
        text.recordings,
      );
      await expectAnchoredHeading(
        page,
        3,
        "recorder-recordings-fields",
        text.recordingFields,
      );
      await expectAnchoredHeading(page, 3, "recorder-automation", text.automation);
      const recordings = section(page, "recorder-recordings");
      await expect(recordings.locator("p").first()).toHaveText(text.available);
      for (const field of [
        '"source": "recorder"',
        '"completion_id"',
        '"completed_at": 1791100000.123456',
        '"markdown_file"',
      ]) {
        await expect(recordings).toContainText(field);
      }
      await expect(
        recordings.locator(`a[href="/${locale}/addons/webhook/macos/"]`),
      ).toBeVisible();
      await expect(
        recordings.locator(`a[href="/${locale}/addons/script-runner/macos/"]`),
      ).toBeVisible();
      await expect(recordings).toContainText(text.webhookOption);
      await expect(recordings).toContainText(text.scriptOption);
      await expect(
        recordings.getByRole("link", { name: "recorderTranscriptReady" }),
      ).toHaveAttribute("href", `/${locale}/addons/develop/#eventbus`);
    });

    test(`${locale} lists the speaker, browser, and text processing routes`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/mac/api/`);

      for (const [method, path] of [
        ["PUT", "/v1/history/speakers/name"],
        ["POST", "/v1/history/speakers/enroll"],
        ["POST", "/v1/history/speakers/confirm"],
        ["PUT", "/v1/browser/context"],
        ["GET", "/v1/llm/models"],
        ["POST", "/v1/llm/process"],
        ["GET", "/v1/workflows"],
        ["POST", "/v1/workflows/run"],
      ] as const) {
        const row = endpointRow(page, path);
        await expect(row).toHaveCount(1);
        await expect(row.getByRole("cell").first()).toHaveText(method);
        await expect(row).toContainText(text.available);
      }
      await expect(page.locator("h3#endpoints-text").getByRole("link")).toHaveAttribute(
        "href",
        "#endpoints-text",
      );
      // Routes that shipped before 1.8 carry no availability note.
      for (const path of ["/v1/status", "/v1/history", "/v1/settings/import"]) {
        await expect(endpointRow(page, path)).not.toContainText(text.available);
      }
    });

    test(`${locale} documents speaker detection, History speakers, and voice profiles`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/mac/api/`);

      const status = section(page, "status");
      await expect(status).toContainText('"api_version": "1.2"');
      await expect(status).toContainText('"supports_browser_context": true');
      await expect(status).toContainText('"remote_writing_allowed": false');
      await expect(section(page, "models")).toContainText(
        '"engine_name": "WhisperKit"',
      );

      const transcription = section(page, "transcription");
      for (const parameter of ["detect_speakers", "speaker_count"]) {
        await expect(
          transcription.locator("li", {
            hasText: new RegExp(`^${parameter} –`),
          }),
        ).toContainText(text.available);
      }
      await expectAnchoredSubheading(
        page,
        "transcription-speakers",
        text.transcriptionSpeakers,
      );
      await expect(firstParagraphAfter(page, "transcription-speakers")).toHaveText(
        text.available,
      );
      await expect(transcription).toContainText('-F "detect_speakers=true"');
      await expect(transcription).toContainText('"speaker": "Speaker 1"');

      await expectAnchoredSubheading(page, "history-speakers", text.historySpeakers);
      await expect(firstParagraphAfter(page, "history-speakers")).toHaveText(
        text.available,
      );
      const history = section(page, "history");
      await expect(history).toContainText("include=speaker_segments");
      const speakerFields = history.getByRole("region", {
        name: text.historySpeakers,
      });
      for (const field of [
        "recording_id",
        "speaker_state",
        "transcript_revision",
        "transcript_version",
        "speakers",
        "speaker_segments",
      ]) {
        await expect(
          speakerFields.getByRole("cell", { name: field, exact: true }),
        ).toBeVisible();
      }
      const voiceStates = history.getByRole("region", { name: "voice_state" });
      for (const state of ["none", "canEnroll", "suggestion", "linked", "outdated"]) {
        await expect(
          voiceStates.getByRole("cell", { name: state, exact: true }),
        ).toBeVisible();
      }

      await expectAnchoredHeading(page, 2, "speaker-profiles", text.speakerProfiles);
      const profiles = section(page, "speaker-profiles");
      await expect(profiles.locator("p").first()).toHaveText(text.available);
      await expect(profiles.locator("ol > li")).toHaveCount(4);
      const example = profiles.locator("[data-docs-code]").first();
      for (const route of ["name", "enroll", "confirm"]) {
        await expect(example).toContainText(`"$SPEAKERS_URL/${route}"`);
      }
      // These routes always need the token, so the example sends it from a file.
      await expect(example).toContainText('AUTH_HEADER="$(mktemp)"');
      await expect(example).toContainText('-H @"$AUTH_HEADER"');
      await expectAnchoredSubheading(
        page,
        "speaker-profiles-fields",
        text.requestFields,
      );
      await expectAnchoredSubheading(page, "speaker-profiles-errors", text.errors);
      const errors = profiles.getByRole("region").last();
      for (const code of [
        "premium_required",
        "stale_transcript",
        "profile_name_exists",
        "voice_unavailable",
        "speaker_save_failed",
      ]) {
        await expect(errors).toContainText(code);
      }
      await expect(profiles).toContainText('"already_learned": false');
    });

    test(`${locale} documents browser context, text processing, and the 1.8 data changes`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/mac/api/`);

      await expectAnchoredHeading(page, 2, "browser-context", text.browser);
      const browser = section(page, "browser-context");
      await expect(browser.locator("p").first()).toHaveText(text.available);
      await expect(
        browser.locator(`a[href="/${locale}/extensions/#browser"]`),
      ).toBeVisible();
      await expectAnchoredSubheading(
        page,
        "browser-context-fields",
        text.requestFields,
      );
      for (const field of ["client_id", "focused", "url", "title"]) {
        await expect(
          browser.getByRole("region").getByRole("cell", { name: field, exact: true }),
        ).toBeVisible();
      }
      await expect(browser).toContainText('"status": "active"');

      await expectAnchoredHeading(page, 2, "text-processing", text.text);
      const textProcessing = section(page, "text-processing");
      await expect(textProcessing.locator("p").first()).toHaveText(text.available);
      await expectAnchoredSubheading(page, "text-processing-llm", text.textLlm);
      await expectAnchoredSubheading(
        page,
        "text-processing-workflows",
        text.textWorkflows,
      );
      await expectAnchoredSubheading(page, "text-processing-limits", text.textLimits);
      await expect(
        textProcessing.locator(
          `a[href="/${locale}/docs/mac/workflows/#global-llm-fallbacks"]`,
        ),
      ).toBeVisible();
      await expect(textProcessing).toContainText("jq -n --rawfile text call-notes.txt");
      for (const code of [
        "writing_not_allowed",
        "workflow_not_runnable",
        "rate_limited",
        "llm_not_configured",
        "timeout",
      ]) {
        await expect(textProcessing.getByRole("region")).toContainText(code);
      }

      for (const status of ["422", "429", "502", "504"]) {
        await expect(
          page.locator("#error-codes ~ ul li", {
            has: page.locator("code", { hasText: new RegExp(`^${status}$`) }),
          }),
        ).toHaveCount(1);
      }

      const settings = section(page, "settings-backup");
      await expect(settings).toContainText("/v1/settings/import?mode=replace");
      await expect(settings).toContainText('"historySkippedAsDuplicate": 0');
      await expect(settings).toContainText(
        "typewhisper import ~/.config/typewhisper/settings.json --replace",
      );
      await expect(section(page, "dictionary")).toContainText('"isRegex":true');
      await expect(section(page, "dictation")).toContainText("latency");
    });
  }

  test("the route overview no longer claims a fixed number of routes", async ({
    page,
  }) => {
    await page.goto("/en/docs/mac/api/");
    await expect(section(page, "endpoint-reference")).not.toContainText(
      "26 routes",
    );
  });
});

test.describe("macOS 1.8 CLI documentation", () => {
  for (const locale of ["en", "de"] as const) {
    const text = copy[locale];

    test(`${locale} documents the model and audio commands`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/mac/cli/`);

      for (const [id, name, example] of [
        [
          "models-load",
          "models load",
          "typewhisper models load --engine parakeet --model parakeet-tdt-0.6b-v3",
        ],
        [
          "models-unload",
          "models unload",
          "typewhisper models unload --engine parakeet",
        ],
        [
          "models-delete",
          "models delete",
          "typewhisper models delete --engine whisper --model openai_whisper-large-v3_turbo",
        ],
        ["audio", "audio", "typewhisper audio"],
        [
          "audio-set",
          "audio set",
          `echo '{"input_priority":[{"id":"BlackHole2ch_UID"}]}' | typewhisper audio set -`,
        ],
      ] as const) {
        const heading = page.locator(`h3#command-${id}`);
        await expect(heading.locator("code")).toHaveText(name);
        await expect(heading.getByRole("link")).toHaveAttribute(
          "href",
          `#command-${id}`,
        );
        // The availability note follows the heading, then the description.
        await expect(heading.locator("xpath=following-sibling::p[1]")).toHaveText(
          text.available,
        );
        await expect(
          page.locator(`h3#command-${id} ~ [data-docs-code] code`).first(),
        ).toHaveText(example);
      }

      // Commands that shipped earlier carry no availability note.
      await expect(
        page.locator("h3#command-models").locator("xpath=following-sibling::p[1]"),
      ).not.toHaveText(text.available);

      await expect(
        page.locator(`a[href="/${locale}/docs/mac/api/#model-management"]`),
      ).toBeVisible();
      await expect(
        page.locator(`a[href="/${locale}/docs/mac/api/#audio-settings"]`),
      ).toBeVisible();

      const examples = section(page, "examples");
      await expect(examples).toContainText(
        "typewhisper models unload --engine whisper",
      );
      await expect(examples).toContainText(
        "typewhisper audio --json > audio-settings.json",
      );
    });

    test(`${locale} documents import --replace`, async ({ page }) => {
      await page.goto(`/${locale}/docs/mac/cli/`);

      const heading = page.locator("h3#command-import-replace");
      await expect(heading.locator("code")).toHaveText("import --replace");
      await expect(heading.locator("xpath=following-sibling::p[1]")).toHaveText(
        text.available,
      );
      const blocks = page.locator("h3#command-import-replace ~ [data-docs-code] code");
      await expect(blocks.first()).toHaveText(
        "typewhisper import typewhisper-settings.json --replace",
      );
      await expect(blocks.nth(1)).toContainText(
        "Workflows: 0 imported, 1 updated, 7 skipped",
      );
      await expect(
        page.locator(`a[href="/${locale}/docs/mac/api/#settings-backup"]`),
      ).toBeVisible();
      // The plain import shipped before 1.8.
      await expect(
        page.locator("h3#command-import").locator("xpath=following-sibling::p[1]"),
      ).not.toHaveText(text.available);

      const replaceOption = section(page, "options")
        .getByRole("row")
        .filter({ has: page.getByRole("cell", { name: "--replace", exact: true }) });
      await expect(replaceOption).toContainText(text.available);
      for (const id of ["settings-backup", "examples"]) {
        await expect(section(page, id)).toContainText(
          "typewhisper import ~/.config/typewhisper/settings.json --replace",
        );
      }
    });
  }
});

test.describe("Recorder automation in add-ons", () => {
  for (const locale of ["en", "de"] as const) {
    const text = copy[locale];

    test(`${locale} macOS Webhook and Script Runner pages describe Recorder transcripts`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/addons/webhook/macos/`);
      await expect(
        page.getByRole("heading", { level: 2, name: text.recorderHeading }),
      ).toBeVisible();
      await expect(page.getByText(text.macOnly)).toBeVisible();
      await expect(page.locator("main")).toContainText(text.webhookOption);
      await expect(
        page.locator(`a[href="/${locale}/docs/mac/api/#recorder-recordings"]`),
      ).toBeVisible();
      await expect(page.getByText(text.minimumVersion)).toBeVisible();

      await page.goto(`/${locale}/addons/script-runner/macos/`);
      await expect(
        page.getByRole("heading", { level: 2, name: text.recorderHeading }),
      ).toBeVisible();
      await expect(page.getByText(text.macOnly)).toBeVisible();
      await expect(page.locator("main")).toContainText(text.scriptOption);
      await expect(page.getByText(text.timeLimit)).toBeVisible();
      for (const variable of [
        "TYPEWHISPER_SOURCE",
        "TYPEWHISPER_RECORDING_ID",
        "TYPEWHISPER_COMPLETION_ID",
        "TYPEWHISPER_COMPLETED_AT",
        "TYPEWHISPER_AUDIO_FILE",
        "TYPEWHISPER_TRANSCRIPT_FILE",
        "TYPEWHISPER_MARKDOWN_FILE",
      ]) {
        await expect(page.locator("main")).toContainText(variable);
      }
      // The former ten-second timeout belongs to no macOS release.
      await expect(page.locator("main")).not.toContainText("10s");
      // Examples must run in macOS /bin/sh with BSD tools.
      await expect(page.locator("main")).not.toContainText(">(pbcopy)");
      await expect(page.locator("main")).not.toContainText("\\U\\1");
      await expect(page.locator("main")).toContainText('mkdir -p "$HOME/Meeting Notes"');
    });

    test(`${locale} Windows editions do not offer Recorder automation`, async ({
      page,
    }) => {
      for (const slug of ["webhook", "script-runner"]) {
        await page.goto(`/${locale}/addons/${slug}/windows/`);
        await expect(page.locator("main")).not.toContainText("Recorder");
      }
    });
  }

  test("the plugin SDK guide names the Recorder event", async ({ page }) => {
    for (const locale of ["en", "de"] as const) {
      await page.goto(`/${locale}/addons/develop/`);
      await expect(page.locator("main")).toContainText(
        "case recorderTranscriptReady(RecorderTranscriptReadyPayload)",
      );
      await expect(
        page.locator(`a[href="/${locale}/docs/mac/api/#recorder-recordings"]`),
      ).toBeVisible();
    }
  });
});
