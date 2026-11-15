import { SectionHeading } from '@/components/SectionHeading';
import { work } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading index="03" id="work-title" eyebrow={work.eyebrow} title={work.title} lead={work.lead} />

        <ol className="index-list">
          {work.items.map((item, i) => (
            <li key={item.title} data-reveal style={delayStyle(i * 100)}>
              <a className="index-row" href={item.caseStudy}>
                <span className="row-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="row-main">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
                <div className="row-side">
                  <ul className="tags">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <span className="row-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
