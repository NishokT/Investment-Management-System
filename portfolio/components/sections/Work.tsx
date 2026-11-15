import { SectionHeading } from '@/components/SectionHeading';
import { TiltCard } from '@/components/TiltCard';
import { work, type Tone } from '@/content/site';

const toneClass: Record<Tone, string> = {
  indigo: 'media-indigo',
  sunset: 'media-sunset',
  mint: 'media-mint',
};

export function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading id="work-title" eyebrow={work.eyebrow} title={work.title} lead={work.lead} />

        <div className="grid-3">
          {work.items.map((item, i) => (
            <TiltCard key={item.title} className="project" delay={i * 120}>
              <div className={`project-media ${toneClass[item.tone]}`} role="img" aria-label={`Preview of ${item.title}`}>
                <span>{item.media}</span>
              </div>

              <div className="project-body">
                <p className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="project-links">
                  <a href={item.caseStudy}>Case study →</a>
                  {'live' in item && <a href={item.live}>Live site ↗</a>}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
