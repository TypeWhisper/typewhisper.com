import { ArrowRight, CircleCheck, Info } from "lucide-react";
import { Screenshot } from "@/components/ui/screenshot";
import {
  getIosDocPage,
  getIosDocTitle,
  type IosDocSlug,
} from "@/data/ios-docs";
import { localePath, screenshotPath, type Locale } from "@/i18n/index";
import { iosAppStoreUrl, iosVersion } from "@/lib/platform-download";

function imageClass(layout: "phone" | "tablet" | "wide" = "wide") {
  if (layout === "phone") {
    return "mx-auto max-w-[17rem] rounded-[2rem] border border-border bg-card p-1.5 shadow-2xl shadow-black/10";
  }
  if (layout === "tablet") {
    return "mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-2xl shadow-black/10";
  }
  return "mx-auto max-w-xl overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-2xl shadow-black/10";
}

export default function DocsIOSGuide({
  locale = "en",
  slug,
}: {
  locale?: Locale;
  slug: IosDocSlug;
}) {
  const page = getIosDocPage(locale, slug);
  const isDe = locale === "de";

  return (
    <article>
      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          {page.eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {page.intro}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
          <span>iOS / iPadOS 18+</span>
          <span>watchOS 11+</span>
          <span>{isDe ? "Version 1.0 stabil" : "Version 1.0 stable"}</span>
          <a
            href={iosAppStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-download-social-trigger
            data-download-platform="ios"
            data-download-target="ios_app_store"
            data-download-version={iosVersion}
            data-tracking-placement="docs"
            className="text-primary hover:underline"
          >
            {isDe ? "App Store öffnen" : "Open the App Store"}
          </a>
        </div>
      </header>

      <div className="divide-y divide-border">
        {page.sections.map((section, sectionIndex) => (
          <section
            key={section.title}
            id={`section-${sectionIndex + 1}`}
            className="scroll-mt-28 py-10 sm:py-12"
          >
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_8rem] xl:gap-12">
              <div>
                <p className="font-mono text-xs font-semibold text-primary">
                  {String(sectionIndex + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                  {section.title}
                </h2>

                {section.paragraphs && (
                  <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {section.steps && (
                  <ol className="mt-6 space-y-5">
                    {section.steps.map((step, index) => (
                      <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                        <span className="flex size-7 items-center justify-center rounded-full border border-primary/30 font-mono text-[11px] font-semibold text-primary">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {step.title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}

                {section.bullets && (
                  <ul className="mt-6 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.code && (
                  <ul
                    className="mt-6 flex list-none flex-wrap gap-2 p-0"
                    aria-label={isDe ? "Snippet-Platzhalter" : "Snippet placeholders"}
                  >
                    {section.code.map((entry) => (
                      <li key={entry}>
                        <code className="block rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-xs text-foreground">
                          {entry}
                        </code>
                      </li>
                    ))}
                  </ul>
                )}

                {section.callout && (
                  <div className="mt-7 flex gap-3 border-l-2 border-primary bg-primary/5 px-4 py-3">
                    <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {section.callout.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {section.callout.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <a
                href={`#section-${sectionIndex + 1}`}
                className="hidden self-start text-right font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary xl:block"
              >
                {isDe ? "Abschnitt" : "Section"} {sectionIndex + 1}
              </a>
            </div>

            {section.image && (
              <div className="mt-8">
                <div className={imageClass(section.image.layout)}>
                  <Screenshot
                    src={screenshotPath(locale, section.image.path)}
                    alt={section.image.alt}
                    className={
                      section.image.layout === "phone"
                        ? "w-full rounded-[1.6rem]"
                        : "w-full rounded-xl"
                    }
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      <footer className="border-t border-border pt-8">
        {page.next ? (
          <a
            href={localePath(locale, `/docs/ios/${page.next}`)}
            className="group flex items-center justify-between gap-4 py-3"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {isDe ? "Weiterlesen" : "Continue"}
              </span>
              <span className="mt-1 block text-lg font-semibold text-foreground group-hover:text-primary">
                {getIosDocTitle(locale, page.next)}
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
          </a>
        ) : (
          <a
            href={localePath(locale, "/docs/ios")}
            className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            {isDe ? "Zurück zur iOS-Übersicht" : "Back to the iOS overview"}
            <ArrowRight className="size-4" />
          </a>
        )}
      </footer>
    </article>
  );
}
