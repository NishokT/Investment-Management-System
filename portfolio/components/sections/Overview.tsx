import { Icon } from '@/components/Icon';
import { ScrollText } from '@/components/ScrollText';
import { SpotlightGrid } from '@/components/SpotlightGrid';
import { about, hero, services, site } from '@/content/site';
import { delayStyle } from '@/lib/browser';

/** A statement that lights up on scroll, then a bento of profile, services, status and tools. */
export function Overview() {
  return (
    <section id="about" className="container section" aria-labelledby="about-title">
      <div className="statement">
        <h2 id="about-title" className="pill" data-reveal>
          {about.label}
        </h2>
        <ScrollText text={about.statement} />
      </div>

      <SpotlightGrid className="bento overview-bento">
        <article className="tile tile-about" data-reveal aria-label="Profile">
          <div className="about-head">
            <span className="avatar" aria-hidden="true">
              {site.initials}
            </span>
            <div>
              <p className="about-name">{site.name}</p>
              <p className="muted small">{site.role}</p>
            </div>
          </div>
          {about.paragraphs.map((paragraph, i) => (
            <p key={i} className="tile-text">
              {paragraph}
            </p>
          ))}
        </article>

        <article id="services" className="tile tile-services" data-reveal style={delayStyle(100)} aria-labelledby="services-title">
          <div className="services-head">
            <h2 id="services-title" className="tile-label">
              {services.label}
            </h2>
            <p className="tile-title">{services.title}</p>
          </div>
          <ol className="service-list">
            {services.items.map((item, i) => (
              <li key={item.title}>
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="service-icon">
                  <Icon name={item.icon} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <div className="tile tile-status" data-reveal style={delayStyle(150)}>
          <p className="tile-label">Status</p>
          <ul className="status-list">
            {hero.status.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="tile tile-tools" data-reveal style={delayStyle(100)}>
          <div>
            <p className="tile-label">{about.toolsLabel}</p>
            <ul className="chips">
              {about.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
          <div className="tools-cta">
            <p>Have a project in mind?</p>
            <a className="link-arrow" href="#contact">
              Let&apos;s talk <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </SpotlightGrid>
    </section>
  );
}
