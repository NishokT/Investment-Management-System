import { SectionHeading } from '@/components/SectionHeading';
import { services } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          index="02"
          id="services-title"
          eyebrow={services.eyebrow}
          title={services.title}
          lead={services.lead}
        />

        <ol className="index-list">
          {services.items.map((item, i) => (
            <li key={item.title} className="index-row" data-reveal style={delayStyle(i * 100)}>
              <span className="row-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="row-main">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
              <ul className="row-side">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
