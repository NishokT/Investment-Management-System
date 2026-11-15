import { SectionHeading } from '@/components/SectionHeading';
import { about } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <SectionHeading index="01" id="about-title" eyebrow={about.eyebrow} title={about.title} />

        <div className="about-copy" data-reveal style={delayStyle(120)}>
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          <p className="label">{about.toolsTitle}</p>
          <ul className="tools">
            {about.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
