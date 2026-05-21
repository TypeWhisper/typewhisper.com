import { ExternalLink } from "lucide-react";
import { t, type Locale } from "@/i18n/index";

interface PressMentionsProps {
  locale?: Locale;
}

const pressMentions = [
  {
    id: "faz",
    href: "https://www.faz.net/premium/digitalwirtschaft/ki-akademie/wispr-flow-und-type-whisper-die-12-besten-ki-apps-fuer-das-diktieren-accg-200842482.html",
    logoSrc: "/brand-logos/faz/wordmark.svg",
    logoAlt: "Frankfurter Allgemeine Zeitung",
    ariaKey: "pressMentions.faz.aria",
  },
] as const;

export function PressMentions({ locale = "en" }: PressMentionsProps) {
  return (
    <section
      data-testid="press-mentions"
      className="border-b border-border bg-background py-10 sm:py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {t(locale, "pressMentions.title")}
        </p>

        <div className="flex max-w-full flex-wrap items-center justify-center gap-3">
          {pressMentions.map((mention) => (
            <a
              key={mention.id}
              href={mention.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(locale, mention.ariaKey)}
              className="group inline-flex min-h-16 max-w-full items-center justify-center gap-3 rounded-md border border-border bg-card px-6 py-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-secondary/50"
            >
              <img
                src={mention.logoSrc}
                alt={mention.logoAlt}
                className="h-5 w-auto max-w-[13rem] dark:invert sm:h-6 sm:max-w-[16rem]"
              />
              <ExternalLink
                className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
