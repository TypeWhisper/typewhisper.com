import { Star, Users } from "lucide-react";
import { DiscordIcon } from "@/components/ui/discord-icon";
import { GitHubIcon } from "@/components/ui/github-icon";
import { discordUrl, orgGitHubUrl } from "@/lib/platform-download";
import { t, localePath, type Locale } from "@/i18n/index";
import socialStats from "@/data/social-stats.json";

interface SocialProofProps {
  locale?: Locale;
}

function formatCount(value: number): string {
  if (value >= 1000) {
    return (value / 1000).toFixed(value >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k";
  }
  return String(value);
}

export function SocialProof({ locale = "en" }: SocialProofProps) {
  const { githubStars, discordMembers } = socialStats as {
    githubStars: number;
    discordMembers: number | null;
  };

  return (
    <section
      data-testid="social-proof"
      className="border-b border-border bg-background py-6 sm:py-8"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {githubStars > 0 && (
            <a
              href={orgGitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <GitHubIcon className="size-4" />
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
      </div>
    </section>
  );
}
