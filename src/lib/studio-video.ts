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

/**
 * Plays a `StudioVideo` from YouTube, so the views count on the channel.
 * Until someone presses play, the page shows the site's own poster and sends
 * nothing to YouTube; the click loads the player from youtube-nocookie.com and
 * starts it.
 */
export function playStudioVideosFromYoutube(root: ParentNode = document) {
  for (const box of root.querySelectorAll<HTMLElement>("[data-youtube-video]")) {
    const figure = box.closest("figure");
    const start = box.querySelector<HTMLButtonElement>(".site-video__youtube-start");
    if (!figure || !start) continue;

    figure.classList.add("site-video--youtube");
    box.hidden = false;
    start.addEventListener(
      "click",
      () => {
        const lang = document.documentElement.lang || "en";
        const url = new URL(
          `https://www.youtube-nocookie.com/embed/${encodeURIComponent(box.dataset.youtubeVideo ?? "")}`,
        );
        url.searchParams.set("autoplay", "1");
        url.searchParams.set("rel", "0");
        url.searchParams.set("hl", lang);
        url.searchParams.set("cc_lang_pref", lang);
        url.searchParams.set("cc_load_policy", "1");

        const frame = document.createElement("iframe");
        frame.className = "site-video__youtube-frame";
        frame.src = url.toString();
        frame.title = box.dataset.youtubeTitle ?? "";
        frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen; web-share";
        frame.allowFullscreen = true;
        // YouTube refuses embeds that arrive without a referrer.
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        start.replaceWith(frame);
        frame.focus();
      },
      { once: true },
    );
  }
}
