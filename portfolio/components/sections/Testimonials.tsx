import { SectionHeading } from '@/components/SectionHeading';
import { testimonials } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function Testimonials() {
  return (
    <section className="section" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading index="05" id="testimonials-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />

        <div className="quotes">
          {testimonials.items.map((item, i) => (
            <figure key={i} className="quote" data-reveal style={delayStyle(i * 120)}>
              <blockquote>
                <p>“{item.quote}”</p>
              </blockquote>
              <figcaption>
                <strong>{item.name}</strong> · {item.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
