import { t, type Locale } from "@/i18n/index";
import { salesEmail } from "@/lib/pricing";

const faqItems = [
  "gpl",
  "freelancer",
  "workPay",
  "upgrade",
  "supporterVsCommercial",
  "lifetimeUpdates",
  "cancel",
  "refund",
  "discounts",
  "activate",
];

export function PricingFaq({ locale }: { locale: Locale }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "pricing.faq.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(locale, "pricing.faq.subtitle")}
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqItems.map((id) => (
            <details
              key={id}
              className="group rounded-2xl border bg-card p-5 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium">
                <span>{t(locale, `pricing.faq.${id}.q`)}</span>
                <span className="text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-3 whitespace-pre-line text-sm text-muted-foreground">
                {t(locale, `pricing.faq.${id}.a`)}
              </div>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t(locale, "pricing.faq.contactBefore")}{" "}
          <a
            href={`mailto:${salesEmail}`}
            className="text-primary underline-offset-4 hover:underline"
          >
            {salesEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
