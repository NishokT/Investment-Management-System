import type { CSSProperties } from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { approach } from '@/content/site';

/** The four steps on one line across the page; the line fills and each stop lights up in turn. */
export function Process() {
  return (
    <section id="process" className="container section" aria-labelledby="process-title">
      <SectionHeading id="process-title" label={approach.label} title={approach.title} />

      <ol className="timeline" data-reveal>
        {approach.steps.map((step, i) => (
          <li key={step.title} className="timeline-step" style={{ '--i': i } as CSSProperties}>
            <span className="timeline-dot" aria-hidden="true" />
            <span className="step-num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3>{step.title}</h3>
            <p>{step.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
