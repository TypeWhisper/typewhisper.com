import { getYoutubeVideo } from "@/data/youtube-videos";
import { localePath, t, type Locale } from "@/i18n/index";

interface StudioVideoProps {
  /**
   * Name of the clip in `public/videos/`. Each language needs
   * `<slug>-<locale>.mp4`, `<slug>-<locale>-poster.jpg` and `<slug>-<locale>.vtt`,
   * taken from the `-web.mp4`, `-poster.jpg` and `.vtt` of a Demo Studio export.
   */
  slug: string;
  locale: Locale;
  /** Accessible name of the player: what the video is about. */
  label: string;
  /** Says what the video shows, below the player. */
  caption?: string;
  /**
   * The clip also has a portrait cut: `<slug>-<locale>-portrait.mp4` and
   * `<slug>-<locale>-portrait-poster.jpg`, taken from the `-portrait.mp4` and
   * `-thumbnail-portrait.jpg` of the Shorts export. Phones held upright show
   * it instead of the wide cut; both share the captions. Pages that use it
   * load `watchStudioVideoOrientation` from `@/lib/studio-video`.
   */
  portrait?: boolean;
  className?: string;
}

const captionLabels: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
};

/**
 * A wide product video rendered in the TypeWhisper Demo Studio, in the
 * language of the page. The file loads only when someone starts it, and the
 * voice-over comes with captions. When the video is listed in
 * `src/data/youtube-videos.ts`, `playStudioVideosFromYoutube` swaps the
 * site's players for the poster with a play button; the YouTube player loads
 * only after that click. Without JavaScript the site's own file plays.
 */
export function StudioVideo({
  slug,
  locale,
  label,
  caption,
  portrait = false,
  className = "",
}: StudioVideoProps) {
  const base = `/videos/${slug}-${locale}`;
  const youtube = getYoutubeVideo(slug, locale);
  const track = (
    <track
      kind="captions"
      src={`${base}.vtt`}
      srcLang={locale}
      label={captionLabels[locale]}
    />
  );
  const classes = [
    "site-video",
    portrait ? "site-video--adaptive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={classes} data-studio-video={portrait ? "" : undefined}>
      {youtube && (
        <div
          className="site-video__youtube"
          data-youtube-video={youtube.id}
          data-youtube-title={label}
          hidden
        >
          <button
            type="button"
            className="site-video__youtube-start"
            aria-label={`${label}: ${t(locale, "video.youtube.play")}`}
            data-testid="youtube-start"
          >
            <img src={`${base}-poster.jpg`} alt="" loading="lazy" decoding="async" />
            <span className="site-video__youtube-label" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
              </svg>
              {t(locale, "video.youtube.play")}
            </span>
          </button>
          <p className="site-video__youtube-note">
            {t(locale, "video.youtube.note")}{" "}
            <a href={`${localePath(locale, "/privacy")}#thirdParty`}>
              {t(locale, "video.youtube.privacy")}
            </a>
          </p>
        </div>
      )}
      <video
        className={portrait ? "site-video__wide" : undefined}
        playsInline
        controls
        preload="none"
        poster={`${base}-poster.jpg`}
        aria-label={label}
        data-testid="studio-video"
      >
        <source src={`${base}.mp4`} type="video/mp4" />
        {track}
        {t(locale, "howItWorks.videoFallback")}
      </video>
      {portrait && (
        <video
          className="site-video__portrait"
          playsInline
          controls
          preload="none"
          poster={`${base}-portrait-poster.jpg`}
          aria-label={label}
          data-testid="studio-video-portrait"
        >
          <source src={`${base}-portrait.mp4`} type="video/mp4" />
          {track}
          {t(locale, "howItWorks.videoFallback")}
        </video>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
