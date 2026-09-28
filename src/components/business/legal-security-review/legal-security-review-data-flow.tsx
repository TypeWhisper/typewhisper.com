import { BarMark, WaveRule } from "@/components/site";
import type { LegalSecurityReviewContent } from "@/data/legal-security-review";

interface LegalSecurityReviewDataFlowProps {
  dataFlow: LegalSecurityReviewContent["dataFlow"];
  label: string;
}

/** The building blocks along one line, from processing to approval. */
export function LegalSecurityReviewDataFlow({
  dataFlow,
  label,
}: LegalSecurityReviewDataFlowProps) {
  return (
    <section className="site-section site-section--band">
      <div className="site-wrap site-wrap--narrow">
        <WaveRule label={label} seed={9} align="start" />
        <div className="commercial-doc__head">
          <h2 className="site-title site-title--start">{dataFlow.title}</h2>
        </div>
        <ol className="commercial-flow">
          {dataFlow.items.map((item) => (
            <li key={item.area} className="commercial-flow__item">
              <span className="commercial-flow__node" aria-hidden="true">
                <BarMark />
              </span>
              <div>
                <h3 className="site-heading">{item.area}</h3>
                <p className="site-text">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
