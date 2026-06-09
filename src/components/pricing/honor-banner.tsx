import { HandHeart } from "lucide-react";
import { t, type Locale } from "@/i18n/index";

/** The honor-system story: no license checks, commercial use is trust-based. */
export function HonorBanner({ locale }: { locale: Locale }) {
  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6 text-center sm:p-8">
          <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-primary/10">
            <HandHeart className="size-5 text-primary" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold">
            {t(locale, "pricing.honor.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t(locale, "pricing.honor.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
