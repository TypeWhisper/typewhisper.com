import { ExternalLink, Quote } from "lucide-react";
import { Waveform } from "@/components/ui/waveform";
import { testimonials, testimonialQuote } from "@/data/testimonials";
import { t, type Locale } from "@/i18n/index";

interface WallOfLoveProps {
  locale?: Locale;
}

export function WallOfLove({ locale = "en" }: WallOfLoveProps) {
  if (testimonials.length === 0) return null;

  return (
    <section
      data-testid="wall-of-love"
      className="bg-background py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center reveal-hidden">
          <Waveform
            bars={32}
            className="mx-auto mb-6 h-4 max-w-[160px] opacity-60"
          />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t(locale, "wallOfLove.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(locale, "wallOfLove.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => {
            const body = (
              <>
                <Quote className="size-5 text-primary/50" aria-hidden="true" />
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  &ldquo;{testimonialQuote(item, locale)}&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{item.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.source}
                    </p>
                  </div>
                  {item.href && (
                    <ExternalLink
                      className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </>
            );

            const cardClass =
              "group flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all";
            const revealClass = `reveal-hidden stagger-delay-${Math.min(index + 1, 6)}00`;

            return item.href ? (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} ${revealClass} hover:border-primary/40 hover:shadow-md`}
              >
                {body}
              </a>
            ) : (
              <div key={item.id} className={`${cardClass} ${revealClass}`}>
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
