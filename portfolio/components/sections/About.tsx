import { SectionHeading } from '@/components/SectionHeading';
import { about } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container split">
        <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} />

        <div className="split-copy" data-reveal style={delayStyle(120)}>
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          <h3>{about.toolsTitle}</h3>
          <ul className="chips">
            {about.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
