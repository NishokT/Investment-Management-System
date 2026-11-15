import { SectionHeading } from '@/components/SectionHeading';
import { TiltCard } from '@/components/TiltCard';
import { services } from '@/content/site';

export function Services() {
  return (
    <section className="section alt" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading id="services-title" eyebrow={services.eyebrow} title={services.title} lead={services.lead} center />

        <div className="grid-3">
          {services.items.map((item, i) => (
            <TiltCard key={item.title} className="card" delay={i * 120}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
