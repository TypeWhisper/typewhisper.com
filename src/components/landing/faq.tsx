import { ArrowRight, Plus } from "lucide-react";
import { localePath, t, type Locale } from "@/i18n/index";
import { WaveRule } from "@/components/site/wave-rule";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

// A version placeholder t() could not resolve, with its "(version …)" aside.
const unresolvedVersionAside =
  / \([^()]*\{(?:mac|windows|ios)(?:Version|Series)\}\)/g;

const faqIds = ["free", "privacy", "platforms", "languages", "work", "builtIn"];

const faqLinks: Record<string, string> = {
  free: "/pricing",
  work: "/business",
  builtIn: "/benchmark",
};

/** Localized landing FAQ, shared by the section and its FAQPage JSON-LD. */
export function getLandingFaq(locale: Locale): FaqItem[] {
  return faqIds.map((id) => {
    // Without release data, drop the whole "(version …)" aside.
    const answer = t(locale, `faq.${id}.answer`).replace(
      unresolvedVersionAside,
      "",
    );
    const href = faqLinks[id];
    return {
      id,
      question: t(locale, `faq.${id}.question`),
      answer,
      link: href
        ? { href: localePath(locale, href), label: t(locale, `faq.${id}.link`) }
        : undefined,
    };
  });
}

/** FAQ on native disclosure elements beside its headline. Static markup. */
export function Faq({ locale = "en" }: { locale?: Locale }) {
  const items = getLandingFaq(locale);

  return (
    <section data-testid="landing-faq" className="site-section">
      <div className="site-wrap">
        <WaveRule label={t(locale, "faq.label")} seed={47} />
        <div className="site-split site-split--aside">
          <h2 className="site-title site-title--start reveal-hidden">
            {t(locale, "faq.title")}
          </h2>

          <div>
            {items.map((item) => (
              <details key={item.id} className="site-disclosure">
                <summary>
                  {item.question}
                  <Plus className="size-5" aria-hidden="true" />
                </summary>
                <div className="site-disclosure__body">
                  <p>{item.answer}</p>
                  {item.link && (
                    <a href={item.link.href} className="site-link">
                      {item.link.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
