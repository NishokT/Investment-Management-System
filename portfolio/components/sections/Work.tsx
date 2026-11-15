import Image from 'next/image';
import { SectionHeading } from '@/components/SectionHeading';
import { SpotlightGrid } from '@/components/SpotlightGrid';
import { work, type Project } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function Work() {
  return (
    <section id="work" className="container section" aria-labelledby="work-title">
      <SectionHeading id="work-title" label={work.label} title={work.title} lead={work.lead} />

      <SpotlightGrid className="bento bento-3">
        {work.items.map((project, i) => (
          <article key={project.title} className="tile tile-project" data-reveal style={delayStyle(i * 100)}>
            <Preview project={project} />
            <div className="project-meta">
              <ul className="tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <a className="link-arrow" href={project.caseStudy}>
                Case study <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </SpotlightGrid>
    </section>
  );
}

/** A real screenshot when one is set; otherwise a browser-window mockup on a coloured panel. */
function Preview({ project }: { project: Project }) {
  const label = `Preview of ${project.title}`;

  if (project.image) {
    return (
      <div className="project-preview" role="img" aria-label={label}>
        <Image src={project.image} alt="" fill sizes="(max-width: 1024px) 100vw, 400px" className="project-image" />
      </div>
    );
  }

  return (
    <div className={`project-preview tone-${project.tone}`} role="img" aria-label={label}>
      <div className="mock-window" aria-hidden="true">
        <div className="mock-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="mock-body">
          <div className="mock-nav" />
          <div className="mock-hero" />
          <div className="mock-cards">
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
