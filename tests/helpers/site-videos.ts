import type { Page } from "@playwright/test";

/**
 * Keeps the site's own video players on the next page loads by dropping the
 * YouTube boxes before `playStudioVideosFromYoutube` runs. For specs about the
 * site's players; youtube-videos.spec.ts covers the YouTube player.
 */
export async function keepSiteVideos(page: Page) {
  await page.addInitScript(() => {
    // "interactive" comes before module scripts run.
    document.addEventListener("readystatechange", () => {
      if (document.readyState !== "interactive") return;
      for (const box of document.querySelectorAll("[data-youtube-video]")) box.remove();
    });
  });
}
