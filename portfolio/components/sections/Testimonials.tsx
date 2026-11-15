import { SectionHeading } from '@/components/SectionHeading';
import { SpotlightGrid } from '@/components/SpotlightGrid';
import { testimonials } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function Testimonials() {
  return (
    <section id="testimonials" className="container section" aria-labelledby="testimonials-title">
      <SectionHeading id="testimonials-title" label={testimonials.label} title={testimonials.title} />

      <SpotlightGrid className="bento bento-2">
        {testimonials.items.map((item, i) => (
          <figure key={i} className="tile tile-quote" data-reveal style={delayStyle(i * 100)}>
            <blockquote>
              <p>“{item.quote}”</p>
            </blockquote>
            <figcaption>
              <span className="avatar avatar-sm" aria-hidden="true">
                {item.initials}
              </span>
              <span>
                <strong>{item.name}</strong>
                {item.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </SpotlightGrid>
    </section>
  );
}
