import { ArrowRight, Blocks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddonCard } from "@/components/addons/addon-card";
import { getPlugins, type Plugin } from "@/data/addons";
import { t, localePath, type Locale } from "@/i18n/index";

interface AddonsShowcaseProps {
  locale?: Locale;
}

const SHOWCASE_COUNT = 6;

function pickShowcasePlugins(locale: Locale): Plugin[] {
  const all = getPlugins(locale);
  const featured = all.filter((p) => p.featured);
  const rest = all.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, SHOWCASE_COUNT);
}

/** Landing section highlighting the add-on marketplace and plugin SDK. */
export function AddonsShowcase({ locale = "en" }: AddonsShowcaseProps) {
  const showcase = pickShowcasePlugins(locale);
  if (showcase.length === 0) return null;

  return (
    <section
      data-testid="addons-showcase"
      className="bg-secondary py-20 sm:py-28"
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
            {t(locale, "addonsShowcase.subtitle")}
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
