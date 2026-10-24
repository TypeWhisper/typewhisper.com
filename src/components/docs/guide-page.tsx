import {
  DocsCallout,
  DocsFigure,
  DocsSection,
  DocsSteps,
} from "@/components/docs/prose";
import type { IosDocPage } from "@/data/ios-docs";
import { screenshotPath, t, type Locale } from "@/i18n/index";

const figureKinds = {
  phone: "phone",
  tablet: "tablet",
  wide: "watch",
} as const;

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
        </DocsSection>
      ))}
    </>
  );
}
