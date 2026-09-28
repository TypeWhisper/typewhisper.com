# Website checklist — macOS 1.7 release

The redesigned website goes live together with TypeWhisper 1.7 for macOS. The copy and the screenshots already describe 1.7. The version numbers follow the release feed and still show 1.6 until `v1.7.0` is published. Windows copy is unchanged apart from the Premium feature names. The iOS copy describes iOS 1.1, and `iosVersion` is set to `1.1`.

## What switches by itself

These follow `src/data/downloads.json`, which `scripts/fetch-releases.mjs` writes at the start of every build. Nothing has to be edited.

| Where | Before the release | After the release |
| --- | --- | --- |
| `{macSeries}` and `{macVersion}` in copy: docs badges and headings, docs subtitle, release status, support, landing FAQ, hero notice | 1.6 / 1.6.1 | 1.7 / 1.7.0 |
| macOS download links | `TypeWhisper-v1.6.1.dmg` | `TypeWhisper-v1.7.0.dmg` |
| Changelog | "Latest stable" names macOS 1.6.1 | "Latest stable" names macOS 1.7.0, and the entry carries the notes of the GitHub release |
| Notice "Newer app version required" on add-ons that need 1.7.0 (Web Link, Vercel AI Gateway, and the macOS editions of Meta, Microsoft AI, and Authenticated Provider CLIs) | shown | gone |
| Playwright specs that assert version numbers | read 1.6 from the feed | read 1.7 from the feed |

The feed takes the stable tag (`vX.Y.Z`, no suffix) that was published last and has a `.dmg` asset. A 1.6.x hotfix published after 1.7.0 would therefore move the website back to 1.6.

## Written by hand for 1.7

These texts name 1.7 themselves and do not change on release day. Merged before the release, they stand next to "macOS 1.6".

- `docs.mac.installation.release.desc`, `docs.mac.installation.highlights.*` ("What's new in 1.7"), `docs.mac.installation.upgrade.desc`, `docs.mac.installation.sync.*`
- `docs.mac.index.description`
- `releaseStatus.mac.description` in `common.json` and `platform-releases.json`
- The requirement paragraph in `src/content/addons/{en,de}/web-link.mdx`

The same holds for iOS 1.1. These texts name or describe 1.1 and come from the App Store release notes and the app source of `typewhisper-ios`:

- "What's new in 1.1" on the iOS overview (`src/pages/docs/_ios.tsx`)
- `releaseStatus.ios.description` in `common.json`
- The sections about writing services, dictionary import, and Control Center and Action Button in `src/data/ios-docs.ts`

## Before merging

1. `v1.7.0` is published on GitHub as a stable release of `typewhisper-mac`: tag `v1.7.0`, not a draft, with the DMG attached.
2. The release contains what the copy describes. Dictation Recovery with the last three dictations (highlight 5) and the number formatting threshold (highlight 6) come from `docs/release-notes/unreleased.md` in the app repository; check that these changes ship in the final 1.7.0.
3. iOS 1.1 is available in the App Store. `iosVersion` in `src/data/versions.ts` is set to `1.1` and is the only version number entered by hand. Merged before the App Store release, the website would name 1.1 while the App Store still offers 1.0.
4. The checks pass on the branch:

   ```bash
   npx astro check
   npm run test:i18n
   npm run test:unit
   npm run test:e2e
   ```

5. Merge after step 1. A push to `main` builds and deploys at once; merged earlier, the website would show the 1.7 copy with the 1.6 version and download.

The stable tag of the app also triggers a website build (`release-published`), and so does editing the GitHub release. If the branch is merged first, that build brings the numbers in line as soon as 1.7.0 is out.

## After the deploy

- `/en/docs/mac` and `/de/docs/mac` show "1.7 Stable" and "1.7 Stabil".
- `/en/docs/mac/installation`, section "Upgrade from an earlier version": the headings read "macOS 1.7" and "What's new in 1.7".
- `/en/release-status`: the title reads "macOS 1.7" and "Download latest release" points to `TypeWhisper-v1.7.0.dmg`. Download the file once.
- `/en/` with the macOS tab: the hero notice and the FAQ answer about platforms name 1.7.0.
- `/en/addons/web-link` and `/en/addons/vercel-ai-gateway`: the notice "Newer app version required" is gone.
- `/en/changelog`: the line "Latest stable" names macOS 1.7.0, and the entry shows the release notes.
- `/en/docs/search`: a search for "iCloud" finds the macOS installation page.
- Homebrew: `brew info --cask typewhisper/tap/typewhisper` reports 1.7.0. The app release workflow updates the cask.
- `/en/docs/mac/prompts` and `/de/docs/mac/prompts` redirect to the Workflows page, which carries the Workflow Palette quick start (`#quick-start`) and the FAQ (`#faq`).
- `/en/docs/ios` shows "Version 1.1 stable" and the list "What's new in 1.1"; `/en/release-status` reads "iOS 1.1".
- Windows pages still show their own version.

## Rehearsal

To see the release day in a running preview, set the three macOS values in `src/data/downloads.json` to `v1.7.0` and wait for the dev server to reload. Run the specs against that preview with a Playwright config that has no `webServer` block and the preview as `baseURL`. `npm run test:e2e` does not work for this: it starts its own dev server, which fetches the feed from GitHub and overwrites the file. The file is generated and ignored by git; every `npm run dev` and `npm run build` writes it again.
