import { expect, test } from "@playwright/test";
import {
  getIosDocPage,
  getIosDocTitle,
  iosDocSlugs,
  type IosDocSlug,
} from "../src/data/ios-docs";

const guidePages = iosDocSlugs.map(
  (slug) =>
    [slug, getIosDocTitle("en", slug), getIosDocTitle("de", slug)] as const,
);

test.describe("detailed iOS documentation", () => {
  test("overview links every guide and uses current Studio media", async ({
    page,
  }) => {
    await page.goto("/en/docs/ios/");

    for (const [slug, englishTitle] of guidePages) {
      await expect(
        page
          .locator(`a[href="/en/docs/ios/${slug}/"]`)
          .filter({ hasText: englishTitle })
          .first(),
      ).toBeVisible();
    }

    await expect(
      page.locator('source[src="/ios-app-preview-en.mp4"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('img[src="/screenshots/en/ios/ipad/03-inbox.png"]'),
    ).toBeVisible();
    await expect(
      page.locator('source[srcset="/screenshots/en/ios/ipad/03-inbox.webp"]'),
    ).toHaveCount(1);
    await expect(page.locator('a[href*="testflight.apple.com"]')).toHaveCount(
      0,
    );
    await expect(
      page.getByRole("link", { name: "Download on the App Store" }),
    ).toHaveAttribute(
      "href",
      "https://apps.apple.com/us/app/typewhisper-app/id6759319267",
    );
  });

  for (const locale of ["en", "de"] as const) {
    test(`${locale} guide routes render with the iOS sidebar`, async ({
      page,
    }) => {
      for (const [slug, englishTitle, germanTitle] of guidePages) {
        await page.goto(`/${locale}/docs/ios/${slug}/`);
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: locale === "de" ? germanTitle : englishTitle,
          }),
        ).toBeVisible();
        await expect(
          page.locator(`nav a[href="/${locale}/docs/ios/${slug}/"]`),
        ).toHaveAttribute("aria-current", "page");
        // The release notice belongs to the overview only.
        await expect(page.locator(".docs-callout--release")).toHaveCount(0);
      }

      await page.goto(`/${locale}/docs/ios/`);
      await expect(
        page
          .locator(".docs-callout--release")
          .getByText(locale === "de" ? "Stabil" : "Stable", { exact: true }),
      ).toBeVisible();
    });
  }

  test("keyboard guide explains Full Access and the iOS return flow", async ({
    page,
  }) => {
    await page.goto("/en/docs/ios/dictation-and-keyboard/");

    await expect(
      page.getByText(
        "Settings > General > Keyboard > Keyboards > Add New Keyboard",
      ),
    ).toBeVisible();
    await expect(
      page.getByText(/Normal typing works without it/),
    ).toBeVisible();
    await expect(
      page.getByText(
        /Without Record in the Keyboard, the TypeWhisper app records and transcribes/,
      ),
    ).toBeVisible();
    await expect(page.getByText(/previous-app link/).first()).toBeVisible();
  });

  for (const locale of ["en", "de"] as const) {
    test(`${locale} keyboard guide explains Record in the Keyboard next to the app switch`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/ios/dictation-and-keyboard/`);

      const section = page.locator("#section-4");
      await expect(
        section.getByRole("heading", {
          level: 2,
          name:
            locale === "de"
              ? "Mit Premium in der Tastatur aufnehmen"
              : "Record in the keyboard with Premium",
        }),
      ).toBeVisible();
      await expect(
        section.getByText(
          locale === "de"
            ? /„In der Tastatur aufnehmen“ unter Einstellungen > Tastatur > Tastatur-Diktat ist mit Premium standardmäßig eingeschaltet/
            : /Record in the Keyboard under Settings > Keyboard > Keyboard Dictation is on by default with Premium/,
        ),
      ).toBeVisible();
      await expect(section.getByText(/Fluid Speech Pro/)).toBeVisible();
      await expect(
        section.getByText(
          locale === "de"
            ? /Ohne App-Wechsel diktieren/
            : /Dictate Without Switching Apps/,
        ),
      ).toBeVisible();

      // The app switch stays documented for dictations without Premium.
      await expect(
        page
          .locator("#section-3")
          .getByText(
            locale === "de"
              ? /Nach oben, dann nach links wischen/
              : /Swipe up, then left/,
          ),
      ).toBeVisible();
      await expect(
        page
          .locator("#section-5")
          .getByText(
            locale === "de"
              ? /schaltet TypeWhisper das Mikrofon stumm/
              : /TypeWhisper mutes the microphone/,
          ),
      ).toBeVisible();
    });
  }

  test("keyboard guide covers staying ready, Tools Only, and hardware keyboards", async ({
    page,
  }) => {
    await page.goto("/en/docs/ios/dictation-and-keyboard/");

    await expect(page.getByText(/Swipe up, then left/)).toBeVisible();
    await expect(
      page.getByText(/Keep Ready for Next Dictation/),
    ).toBeVisible();
    await expect(page.getByText(/between 1 and 30 minutes/)).toBeVisible();
    await expect(page.getByText(/Tools Only with Hardware Keyboard/)).toBeVisible();
    await expect(
      page.getByText(/Settings > Accessibility > Touch > AssistiveTouch/),
    ).toBeVisible();

    await page.goto("/de/docs/ios/dictation-and-keyboard/");
    await expect(
      page.getByText(
        /Einstellungen > Bedienungshilfen > Tippen > AssistiveTouch/,
      ),
    ).toBeVisible();

    await page.goto("/en/docs/ios/troubleshooting/");
    await expect(
      page.getByRole("heading", {
        name: "Speech recognition or the keyboard seems stuck on preparing",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "The keyboard is missing next to a Magic Keyboard",
      }),
    ).toBeVisible();
  });

  for (const locale of ["en", "de"] as const) {
    test(`${locale} overview links the 1.2.4 additions to their guides`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/ios/`);

      const link = page.locator(
        `#release-status a[href="/${locale}/docs/ios/profiles-and-processing/#section-5"]`,
      );
      await expect(link).toBeVisible();
      await link.click();
      await expect(
        page.locator("#section-5").getByRole("heading", {
          level: 2,
          name:
            locale === "de"
              ? "Text ohne Aufnahme formatieren"
              : "Format text without a recording",
        }),
      ).toBeVisible();
    });
  }

  for (const locale of ["en", "de"] as const) {
    test(`${locale} overview links the 1.3 additions to their guides`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/ios/`);

      await expect(
        page.getByRole("heading", {
          level: 3,
          name: locale === "de" ? "Neu in 1.3" : "What's new in 1.3",
        }),
      ).toBeVisible();

      for (const [path, title] of [
        [
          "dictation-and-keyboard/#section-4",
          locale === "de"
            ? "Mit Premium in der Tastatur aufnehmen"
            : "Record in the keyboard with Premium",
        ],
        [
          "files-history-and-inbox/#section-5",
          locale === "de"
            ? "Fragen zum Verlauf mit Premium"
            : "Ask questions about your History with Premium",
        ],
        [
          "files-history-and-inbox/#section-4",
          locale === "de"
            ? "Eine Aufnahme erneut transkribieren"
            : "Transcribe a recording again",
        ],
        [
          "dictionary-and-snippets/#section-5",
          locale === "de" ? "Emoji per Namen einfügen" : "Insert emoji by name",
        ],
      ]) {
        const link = page.locator(
          `#release-status a[href="/${locale}/docs/ios/${path}"]`,
        );
        await expect(link).toBeVisible();
        await link.click();
        await expect(
          page.locator(path.slice(path.indexOf("#"))).getByRole("heading", {
            level: 2,
            name: title,
          }),
        ).toBeVisible();
        await page.goBack();
      }
    });

    test(`${locale} overview links point to existing guide sections`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/ios/`);

      const hrefs = await page
        .locator('#release-status a[href*="/docs/ios/"][href*="#section-"]')
        .evaluateAll((links) =>
          links.map((link) => link.getAttribute("href") ?? ""),
        );
      expect(hrefs.length).toBeGreaterThan(0);

      const sectionsBySlug = new Map<IosDocSlug, Set<number>>();
      for (const href of hrefs) {
        const match = href.match(
          new RegExp(`^/${locale}/docs/ios/([a-z-]+)/#section-(\\d+)$`),
        );
        expect(match, href).not.toBeNull();
        const slug = match![1] as IosDocSlug;
        expect(iosDocSlugs, href).toContain(slug);
        const sections = sectionsBySlug.get(slug) ?? new Set<number>();
        sections.add(Number(match![2]));
        sectionsBySlug.set(slug, sections);
      }

      for (const [slug, sections] of sectionsBySlug) {
        const guide = getIosDocPage(locale, slug);
        await page.goto(`/${locale}/docs/ios/${slug}/`);
        for (const section of sections) {
          expect(section, `${slug}#section-${section}`).toBeLessThanOrEqual(
            guide.sections.length,
          );
          await expect(
            page.locator(`#section-${section}`).getByRole("heading", {
              level: 2,
              name: guide.sections[section - 1].title,
              exact: true,
            }),
          ).toBeVisible();
        }
      }
    });
  }

  test("History guide covers Transcribe Again and Ask History", async ({
    page,
  }) => {
    await page.goto("/en/docs/ios/files-history-and-inbox/");

    const again = page.locator("#section-4");
    await expect(again.getByText(/Allow for This Run/)).toBeVisible();
    await expect(again.getByText(/First Transcription/)).toBeVisible();
    await expect(again.getByText(/It does not need Premium/)).toBeVisible();

    const ask = page.locator("#section-5");
    await expect(ask.getByText(/In History, tap Ask/)).toBeVisible();
    await expect(
      ask.getByText(/download the optional search model under Settings > Ask History/),
    ).toBeVisible();
    await expect(
      ask.getByText(/Ask TypeWhisper about my recordings/),
    ).toBeVisible();

    await page.goto("/de/docs/ios/files-history-and-inbox/");
    await expect(
      page.locator("#section-5").getByText(/Tippe im Verlauf auf „Fragen“/),
    ).toBeVisible();
    await expect(
      page.locator("#section-4").getByText(/„Für diesen Lauf erlauben“/),
    ).toBeVisible();
  });

  test("Local Only, Siri while locked, and pairing match the current app", async ({
    page,
  }) => {
    await page.goto("/en/docs/ios/privacy-and-premium/");
    await expect(
      page.getByText(/Local Only under Settings > General > Privacy/),
    ).toBeVisible();

    await page.goto("/de/docs/ios/privacy-and-premium/");
    await expect(
      page.getByText(/„Nur lokal“ unter Einstellungen > Allgemein > Datenschutz/),
    ).toBeVisible();

    await page.goto("/en/docs/ios/watch-and-shortcuts/");
    await expect(
      page.getByText(
        /Allow Siri While Locked under Settings > General > Siri and Shortcuts/,
      ),
    ).toBeVisible();

    await page.goto("/en/docs/ios/");
    await expect(page.locator("#mac")).toContainText("Confirm Pairing");
    await expect(page.locator("#mac")).not.toContainText("The Codes Match");

    await page.goto("/en/docs/mac/installation/");
    await expect(page.locator("#iphone")).toContainText(
      "Settings > Premium > Mac",
    );
    await expect(page.locator("#iphone")).toContainText("Confirm Pairing");
  });

  test("installation and troubleshooting describe the public App Store path", async ({
    page,
  }) => {
    await page.goto("/en/docs/ios/installation/");
    await expect(page.getByText(/available from the App Store/)).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Open the App Store" }),
    ).toHaveAttribute(
      "href",
      "https://apps.apple.com/us/app/typewhisper-app/id6759319267",
    );

    await page.goto("/en/docs/ios/troubleshooting/");
    await expect(
      page.getByRole("heading", {
        name: "The App Store download does not work",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(/official App Store product page/),
    ).toBeVisible();
  });

  test("Inbox, Shortcuts, privacy, and Premium behavior are documented", async ({
    page,
  }) => {
    await page.goto("/en/docs/ios/files-history-and-inbox/");
    await expect(
      page.getByText(
        /Quick Dictations, Apple Watch recordings, calendar drafts/,
      ),
    ).toBeVisible();
    await expect(
      page.locator('img[src="/screenshots/en/ios/ipad/03-inbox.png"]'),
    ).toBeVisible();

    await page.goto("/en/docs/ios/watch-and-shortcuts/");
    await expect(
      page.getByText(/Get Last Transcription returns/),
    ).toBeVisible();
    await expect(
      page.getByText(/assign that Shortcut to the Action Button/),
    ).toBeVisible();

    await page.goto("/en/docs/ios/privacy-and-premium/");
    await expect(
      page.getByText(/Normal keyboard typing works without Full Access/),
    ).toBeVisible();
    await expect(
      page.getByText(/History and Inbox text and metadata/),
    ).toBeVisible();
    await expect(
      page.getByText(
        /does not pass through the TypeWhisper entitlement service/,
      ),
    ).toBeVisible();
  });

  for (const locale of ["en", "de"] as const) {
    test(`${locale} overview lists what is new in 1.1 and links the guides`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/ios/`);

      await expect(
        page.getByRole("heading", {
          level: 3,
          name: locale === "de" ? "Neu in 1.1" : "What's new in 1.1",
        }),
      ).toBeVisible();

      for (const [slug, title] of [
        [
          "profiles-and-processing",
          locale === "de" ? "Schreibdienst wählen" : "Choose a writing service",
        ],
        [
          "dictionary-and-snippets",
          locale === "de"
            ? "Wörterbuch importieren und exportieren"
            : "Import and export the dictionary",
        ],
        [
          "watch-and-shortcuts",
          locale === "de"
            ? "Über Kontrollzentrum oder Aktionstaste starten"
            : "Start from Control Center or the Action Button",
        ],
      ]) {
        const link = page.locator(
          `#release-status a[href="/${locale}/docs/ios/${slug}/#section-4"]`,
        );
        await expect(link).toBeVisible();
        await link.click();
        await expect(
          page.locator("#section-4").getByRole("heading", {
            level: 2,
            name: title,
          }),
        ).toBeVisible();
        await page.goBack();
      }
    });
  }

  test("snippet placeholders expose localized list semantics", async ({
    page,
  }) => {
    await page.goto("/en/docs/ios/dictionary-and-snippets/");

    const placeholders = page.getByRole("list", {
      name: "Snippet placeholders",
    });
    await expect(placeholders).toBeVisible();
    await expect(placeholders.getByRole("listitem")).toHaveCount(5);
  });

  test("iOS docs do not overflow a phone viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/de/docs/ios/dictation-and-keyboard/");

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  });
});
