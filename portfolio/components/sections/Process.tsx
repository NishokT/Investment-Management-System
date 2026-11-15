import { SectionHeading } from '@/components/SectionHeading';
import { SpotlightGrid } from '@/components/SpotlightGrid';
import { approach } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function Process() {
  return (
    <section id="process" className="container section" aria-labelledby="process-title">
      <SectionHeading id="process-title" label={approach.label} title={approach.title} />

      <SpotlightGrid className="bento bento-4">
        {approach.steps.map((step, i) => (
          <article key={step.title} className="tile tile-step" data-reveal style={delayStyle(i * 100)}>
            <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.summary}</p>
          </article>
        ))}
      </SpotlightGrid>
    </section>
  );
}
