/** Same query as the `.site-video--adaptive` rule in `src/styles/site.css`. */
export const portraitQuery = "(orientation: portrait) and (max-width: 639px)";

/**
 * A `StudioVideo` with a portrait cut shows one of its two players, chosen by
 * CSS. A hidden player keeps playing, so when the phone turns, this pauses the
 * one that went out of view and continues in the other at the same moment.
 */
export function watchStudioVideoOrientation(root: ParentNode = document) {
  const query = window.matchMedia(portraitQuery);
  const figures = [...root.querySelectorAll<HTMLElement>("[data-studio-video]")];
  if (!figures.length) return;

  query.addEventListener("change", ({ matches }) => {
    for (const figure of figures) {
      const wide = figure.querySelector<HTMLVideoElement>(".site-video__wide");
      const upright = figure.querySelector<HTMLVideoElement>(".site-video__portrait");
      if (!wide || !upright) continue;

      const [from, to] = matches ? [wide, upright] : [upright, wide];
      // Never started: nothing to hand over, and the poster stays.
      if (from.currentTime === 0 && from.paused) continue;

      const playing = !from.paused;
      from.pause();
      const resume = () => {
        to.currentTime = from.currentTime;
        if (playing) to.play().catch(() => {});
      };
      if (to.readyState >= HTMLMediaElement.HAVE_METADATA) {
        resume();
      } else {
        to.preload = "metadata";
        to.addEventListener("loadedmetadata", resume, { once: true });
        to.load();
      }
    }
  });
}
