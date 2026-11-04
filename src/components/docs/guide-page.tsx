import {
  DocsCallout,
  DocsFigure,
  DocsSection,
  DocsSteps,
} from "@/components/docs/prose";
import { StudioVideo } from "@/components/ui/studio-video";
import type { IosDocPage } from "@/data/ios-docs";
import { getTutorial } from "@/data/tutorials";
import { localePath, screenshotPath, t, type Locale } from "@/i18n/index";

const figureKinds = {
  phone: "phone",
  tablet: "tablet",
  wide: "watch",
} as const;

/** The tutorial video of a section and a link to its page. */
function SectionTutorial({
  locale,
  slug,
  link,
}: {
  locale: Locale;
  slug: string;
  link: string;
}) {
  const tutorial = getTutorial(slug);
  if (!tutorial) {
    throw new Error(`Unknown tutorial "${slug}" in the docs.`);
  }
  const copy = tutorial.copy[locale];
  return (
    <>
      <StudioVideo
        slug={tutorial.video}
        locale={locale}
        label={copy.title}
        caption={copy.caption}
        portrait={tutorial.portrait}
      />
      <p>
        <a href={localePath(locale, `/tutorials/${tutorial.slug}`)}>{link}</a>
      </p>
    </>
  );
}

/** One guide page of a mobile platform (iOS, Android), rendered from its data. */
export function DocsGuidePage({
  locale = "en",
  page,
}: {
  locale?: Locale;
  page: IosDocPage;
}) {
  const isDe = locale === "de";

  return (
    <>
      {page.sections.map((section, sectionIndex) => (
        <DocsSection
          key={section.title}
          id={`section-${sectionIndex + 1}`}
          title={section.title}
        >
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {section.steps && (
            <DocsSteps
              items={section.steps.map((step) => ({
                title: step.title,
                description: step.description,
              }))}
            />
          )}

          {section.bullets && (
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}

          {section.code && (
            <ul
              className="docs-values"
              aria-label={isDe ? "Snippet-Platzhalter" : "Snippet placeholders"}
            >
              {section.code.map((entry) => (
                <li key={entry}>
                  <code>{entry}</code>
                </li>
              ))}
            </ul>
          )}

          {section.callout && (
            <DocsCallout
              label={t(locale, "docs.callout.note")}
              title={section.callout.title}
            >
              <p>{section.callout.description}</p>
            </DocsCallout>
          )}

          {section.image && (
            <DocsFigure
              kind={figureKinds[section.image.layout ?? "wide"]}
              src={screenshotPath(locale, section.image.path)}
              alt={section.image.alt}
            />
          )}

          {section.tutorial && <SectionTutorial locale={locale} {...section.tutorial} />}
        </DocsSection>
      ))}
    </>
  );
}
