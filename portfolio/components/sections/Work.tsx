import Image from 'next/image';
import type { CSSProperties } from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { SpotlightGrid } from '@/components/SpotlightGrid';
import { work, type Project } from '@/content/site';

/**
 * Full-width project showcases that stack as you scroll: each card pins near the top
 * and the next one slides over it. On small screens they simply flow one after another.
 */
export function Work() {
  const total = String(work.items.length).padStart(2, '0');

  return (
    <section id="work" className="container section" aria-labelledby="work-title">
      <SectionHeading id="work-title" label={work.label} title={work.title} lead={work.lead} />

      <SpotlightGrid className="stack">
        {work.items.map((project, i) => (
          <article key={project.title} className="tile stack-card" style={{ '--i': i } as CSSProperties}>
            <div className="stack-copy">
              <p className="stack-index">
                <span>{String(i + 1).padStart(2, '0')}</span> / {total}
              </p>
              <div>
                <ul className="tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <a className="btn btn-ghost stack-link" href={project.caseStudy}>
                View case study <span aria-hidden="true">→</span>
              </a>
            </div>
            <Preview project={project} />
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
        <Image src={project.image} alt="" fill sizes="(max-width: 860px) 100vw, 60vw" className="project-image" />
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
          <div className="mock-hero">
            <span />
            <span />
          </div>
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
