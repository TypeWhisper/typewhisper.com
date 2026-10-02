import { WaveRule } from "@/components/site";
import type { LegalSecurityReviewContent } from "@/data/legal-security-review";

interface LegalSecurityReviewBoundariesProps {
  boundaries: LegalSecurityReviewContent["boundaries"];
  label: string;
}

/** What the tool does not promise, each statement marked by a bar. */
export function LegalSecurityReviewBoundaries({
  boundaries,
  label,
}: LegalSecurityReviewBoundariesProps) {
  return (
    <section className="site-section">
      <div className="site-wrap site-wrap--narrow">
        <WaveRule label={label} seed={15} align="start" />
        <div className="commercial-doc__head">
          <h2 className="site-title site-title--start">{boundaries.title}</h2>
        </div>
        <ul className="commercial-limits">
          {boundaries.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
