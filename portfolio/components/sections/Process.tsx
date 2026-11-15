import { SectionHeading } from '@/components/SectionHeading';
import { approach } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function Process() {
  return (
    <section className="section alt" id="process" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading id="process-title" eyebrow={approach.eyebrow} title={approach.title} />

        <ol className="steps">
          {approach.steps.map((step, i) => (
            <li key={step.title} data-reveal style={delayStyle(i * 110)}>
              <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
