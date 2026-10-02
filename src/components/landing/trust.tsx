import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/github-icon";
import { orgGitHubUrl } from "@/lib/platform-download";
import { localePath, t, type Locale } from "@/i18n/index";
import socialStats from "@/data/social-stats.json";

const fazHref =
  "https://www.faz.net/premium/digitalwirtschaft/ki-akademie/wispr-flow-und-type-whisper-die-12-besten-ki-apps-fuer-das-diktieren-accg-200842482.html";

function formatCount(value: number): string {
  if (value >= 1000) {
    return (
      (value / 1000).toFixed(value >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k"
    );
  }
  return String(value);
}

/** One quiet line of proof beneath the hero. Static markup, no hydration. */
export function Trust({ locale = "en" }: { locale?: Locale }) {
  const { githubStars } = socialStats as { githubStars: number };

  return (
    <section data-testid="social-proof" className="landing-trust">
      <ul className="site-wrap landing-trust__row">
        {githubStars > 0 && (
          <li>
            <a
              href={orgGitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="landing-trust__item"
            >
              <GitHubIcon className="size-4" aria-hidden="true" />
              <strong>{formatCount(githubStars)}</strong>
              {/* The space separates count and label in the accessible name. */}
              {` ${t(locale, "socialProof.stars")}`}
            </a>
          </li>
        )}
        <li data-testid="press-mentions">
          <a
            href={fazHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(locale, "pressMentions.faz.aria")}
            className="landing-trust__item"
          >
            {t(locale, "pressMentions.title")}
            <img
              src="/brand-logos/faz/wordmark.svg"
              alt="Frankfurter Allgemeine Zeitung"
              className="landing-trust__faz"
              width="160"
              height="20"
            />
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </li>
        <li>
          <span className="landing-trust__item">
            {t(locale, "socialProof.commercial.before")}
            <a
              href={localePath(locale, "/pricing")}
              className="landing-trust__link"
            >
              {t(locale, "socialProof.commercial.link")}
            </a>
          </span>
        </li>
      </ul>
    </section>
  );
}
