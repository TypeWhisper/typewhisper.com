import { ArrowRight, Blocks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddonCard } from "@/components/addons/addon-card";
import { getPlugins, type Plugin } from "@/data/addons";
import { t, localePath, type Locale } from "@/i18n/index";

interface AddonsShowcaseProps {
  locale?: Locale;
}

// Local engines for both desktops, cloud AI, and integrations.
const SHOWCASE_SLUGS = [
  "whisperkit",
  "whisper-cpp",
  "openai",
  "claude",
  "obsidian",
  "mcp-client",
];

function pickShowcasePlugins(all: Plugin[]): Plugin[] {
  return SHOWCASE_SLUGS.map((slug) => all.find((p) => p.slug === slug)).filter(
    (plugin) => plugin !== undefined,
  );
}

/** Landing section highlighting the add-on marketplace and plugin SDK. */
export function AddonsShowcase({ locale = "en" }: AddonsShowcaseProps) {
  const all = getPlugins(locale);
  const showcase = pickShowcasePlugins(all);
  if (showcase.length === 0) return null;

  return (
    <section
      data-testid="addons-showcase"
      className="bg-secondary py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center reveal-hidden">
          <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary/10">
            <Blocks className="size-6 text-primary" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t(locale, "addonsShowcase.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(locale, "addonsShowcase.subtitle").replace(
              "{count}",
              String(all.length),
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 reveal-hidden">
          {showcase.map((plugin) => (
            <AddonCard
              key={plugin.slug}
              plugin={plugin}
              basePath={localePath(locale, "/addons")}
              locale={locale}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <Button size="pill" asChild>
            <a href={localePath(locale, "/addons")}>
              {t(locale, "addonsShowcase.browseAll")}
            </a>
          </Button>
          <Button variant="link-arrow" asChild>
            <a
              href={localePath(locale, "/addons/develop")}
              className="inline-flex items-center gap-1 text-primary"
            >
              {t(locale, "addonsShowcase.buildYourOwn")}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
