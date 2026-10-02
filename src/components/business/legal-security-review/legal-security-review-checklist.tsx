import { WaveRule } from "@/components/site";
import type { LegalSecurityReviewContent } from "@/data/legal-security-review";

interface LegalSecurityReviewChecklistProps {
  checklist: LegalSecurityReviewContent["checklist"];
  label: string;
}

/** The review questions, numbered so that a reviewer can refer to them. */
export function LegalSecurityReviewChecklist({
  checklist,
  label,
}: LegalSecurityReviewChecklistProps) {
  return (
    <section
      id="checklist"
      className="site-section site-section--tight-top commercial-anchor"
    >
      <div className="site-wrap site-wrap--narrow">
        <WaveRule label={label} seed={5} align="start" />
        <div className="commercial-doc__head">
          <h2 className="site-title site-title--start">{checklist.title}</h2>
          <p className="site-lede site-lede--start">{checklist.intro}</p>
        </div>
        <ol className="site-steps commercial-doc__list">
          {checklist.items.map((item) => (
            <li key={item} className="site-steps__item">
              <p className="commercial-doc__item">{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
