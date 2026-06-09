import { ExternalLink, Star, Users } from "lucide-react";
import { DiscordIcon } from "@/components/ui/discord-icon";
import { GitHubIcon } from "@/components/ui/github-icon";
import { BrandLogo, canRenderBrandLogo } from "@/components/ui/brand-logo";
import { discordUrl, orgGitHubUrl } from "@/lib/platform-download";
import { t, localePath, type Locale } from "@/i18n/index";
import socialStats from "@/data/social-stats.json";

interface TrustStripProps {
  locale?: Locale;
}

function formatCount(value: number): string {
  if (value >= 1000) {
    return (value / 1000).toFixed(value >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k";
  }
  return String(value);
}

const fazHref =
  "https://www.faz.net/premium/digitalwirtschaft/ki-akademie/wispr-flow-und-type-whisper-die-12-besten-ki-apps-fuer-das-diktieren-accg-200842482.html";

/** Compact trust section: GitHub stars, Discord members, commercial-license hint, and press logo in one strip. */
export function TrustStrip({ locale = "en" }: TrustStripProps) {
  const { githubStars, discordMembers } = socialStats as {
    githubStars: number;
    discordMembers: number | null;
  };
  const showGitHubBrandLogo = canRenderBrandLogo("github", "social");

  return (
    <section
      data-testid="social-proof"
      className="border-b border-border bg-background py-8 sm:py-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {githubStars > 0 && (
            <a
              href={orgGitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              {showGitHubBrandLogo ? (
                <BrandLogo brand="github" context="social" className="size-4" alt="GitHub" />
              ) : (
                <GitHubIcon className="size-4" />
              )}
              <Star className="size-3.5 text-amber-500" aria-hidden="true" />
              <span className="font-medium text-foreground">
                {formatCount(githubStars)}
              </span>
              <span>{t(locale, "socialProof.stars")}</span>
            </a>
          )}

          {typeof discordMembers === "number" && discordMembers > 0 && (
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <DiscordIcon className="size-4" />
              <Users className="size-3.5" aria-hidden="true" />
              <span className="font-medium text-foreground">
                {formatCount(discordMembers)}
              </span>
              <span>{t(locale, "socialProof.members")}</span>
            </a>
          )}

          <span className="inline-flex items-center gap-1.5">
            <span>{t(locale, "socialProof.commercial.before")}</span>
            <a
              href={localePath(locale, "/pricing")}
              className="text-primary underline-offset-4 hover:underline"
            >
              {t(locale, "socialProof.commercial.link")}
            </a>
          </span>
        </div>

        <div
          data-testid="press-mentions"
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t(locale, "pressMentions.title")}
          </span>
          <a
            href={fazHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(locale, "pressMentions.faz.aria")}
            className="group inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 shadow-sm transition-colors hover:border-primary/40 hover:bg-secondary/50"
          >
            <img
              src="/brand-logos/faz/wordmark.svg"
              alt="Frankfurter Allgemeine Zeitung"
              className="h-4 w-auto max-w-[12rem] dark:invert sm:h-5"
            />
            <ExternalLink
              className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
