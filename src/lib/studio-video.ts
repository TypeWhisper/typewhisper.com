/** Same query as the `.site-video--adaptive` rule in `src/styles/site.css`. */
export const portraitQuery = "(orientation: portrait) and (max-width: 639px)";

interface PlaybackState {
  time: number;
  playing: boolean;
  muted: boolean;
  volume: number;
  playbackRate: number;
  captions: TextTrackMode | undefined;
}

interface Cuts {
  wide: HTMLVideoElement;
  upright: HTMLVideoElement;
  /** Handoff that waits for the metadata of the visible player. */
  pending?: { state: PlaybackState; cancel: () => void };
}

function started(video: HTMLVideoElement) {
  return video.currentTime > 0 || !video.paused;
}

function snapshot(video: HTMLVideoElement): PlaybackState {
  return {
    time: video.currentTime,
    playing: !video.paused,
    muted: video.muted,
    volume: video.volume,
    playbackRate: video.playbackRate,
    captions: video.textTracks[0]?.mode,
  };
}

function applySettings(video: HTMLVideoElement, state: PlaybackState) {
  video.muted = state.muted;
  video.volume = state.volume;
  video.playbackRate = state.playbackRate;
  const track = video.textTracks[0];
  if (track && state.captions) track.mode = state.captions;
}

/**
 * A `StudioVideo` with a portrait cut shows one of its two players, chosen by
 * CSS. A hidden player keeps playing, so when the phone turns, this pauses the
 * one that went out of view and continues in the other at the same moment,
 * with the same sound and caption settings.
 */
export function watchStudioVideoOrientation(root: ParentNode = document) {
  const query = window.matchMedia(portraitQuery);
  const figures: Cuts[] = [];
  for (const figure of root.querySelectorAll<HTMLElement>("[data-studio-video]")) {
    const wide = figure.querySelector<HTMLVideoElement>(".site-video__wide");
    const upright = figure.querySelector<HTMLVideoElement>(".site-video__portrait");
    if (wide && upright) figures.push({ wide, upright });
  }
  if (!figures.length) return;

  query.addEventListener("change", ({ matches }) => {
    for (const cuts of figures) {
      const [from, to] = matches
        ? [cuts.wide, cuts.upright]
        : [cuts.upright, cuts.wide];

      // Turned back before the handoff finished: `from` never got the
      // playback, so the state saved for it still describes `to`.
      const pending = cuts.pending;
      cuts.pending = undefined;
      pending?.cancel();
      const state =
        pending && !started(from) ? pending.state : snapshot(from);

      from.pause();
      applySettings(to, state);

      // Never started: nothing to hand over, and the poster stays.
      if (state.time === 0 && !state.playing) continue;

      const resume = () => {
        // Loading resets the playback rate, so the settings go on again.
        applySettings(to, state);
        to.currentTime = state.time;
        if (state.playing) to.play().catch(() => {});
      };
      if (to.readyState >= HTMLMediaElement.HAVE_METADATA) {
        resume();
        continue;
      }
      const onMetadata = () => {
        cuts.pending = undefined;
        resume();
      };
      to.addEventListener("loadedmetadata", onMetadata, { once: true });
      cuts.pending = {
        state,
        cancel: () => to.removeEventListener("loadedmetadata", onMetadata),
      };
      to.preload = "metadata";
      to.load();
    }
  });
}
