import { SectionHeading } from '@/components/SectionHeading';
import { TiltCard } from '@/components/TiltCard';
import { testimonials } from '@/content/site';

export function Testimonials() {
  return (
    <section className="section" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading id="testimonials-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />

        <div className="quotes">
          {testimonials.items.map((item, i) => (
            <TiltCard key={i} className="quote" delay={i * 120}>
              <blockquote>
                <p>“{item.quote}”</p>
              </blockquote>
              <div className="quote-author">
                <span className="quote-avatar" aria-hidden="true">
                  {item.initials}
                </span>
                <span>
                  <strong>{item.name}</strong>
                  {item.role}
                </span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
