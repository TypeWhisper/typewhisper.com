import { ArrowRight, Plus } from "lucide-react";
import { platformVersions } from "@/lib/platform-versions";
import { localePath, t, type Locale } from "@/i18n/index";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

const faqIds = ["free", "privacy", "platforms", "languages", "work", "builtIn"];

const faqLinks: Record<string, string> = {
  free: "/pricing",
  work: "/business",
  builtIn: "/benchmark",
};

/** Localized landing FAQ, shared by the section and its FAQPage JSON-LD. */
export function getLandingFaq(locale: Locale): FaqItem[] {
  return faqIds.map((id) => {
    const answer = t(locale, `faq.${id}.answer`)
      .replace("{macVersion}", platformVersions.mac ?? "")
      .replace("{windowsVersion}", platformVersions.windows ?? "")
      .replace("{iosVersion}", platformVersions.ios ?? "");
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

/** Static FAQ built on native disclosure elements, no hydration. */
export function LandingFaq({ locale = "en" }: { locale?: Locale }) {
  const items = getLandingFaq(locale);

  return (
    <section data-testid="landing-faq" className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="reveal-hidden text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "faq.title")}
        </h2>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {items.map((item) => (
            <details key={item.id} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 text-left text-base font-semibold text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-5 pr-9 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>{item.answer}</p>
                {item.link && (
                  <a
                    href={item.link.href}
                    className="mt-3 inline-flex items-center gap-1 font-medium text-primary hover:underline"
                  >
                    {item.link.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
