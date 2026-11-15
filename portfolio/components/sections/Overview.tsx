import { Icon } from '@/components/Icon';
import { MagneticLink } from '@/components/MagneticLink';
import { Orb } from '@/components/Orb';
import { SplitWords } from '@/components/SplitWords';
import { SpotlightGrid } from '@/components/SpotlightGrid';
import { about, hero, services, site } from '@/content/site';
import { delayStyle } from '@/lib/browser';

/** The opening bento grid: intro, 3D orb, about, stats, status, services and tools. */
export function Overview() {
  return (
    <section id="top" className="container section-first" aria-label="Introduction">
      <SpotlightGrid className="bento">
        <div className="tile tile-intro" data-reveal>
          <p className="pill">
            <span className="dot" aria-hidden="true" />
            {site.availability}
          </p>
          <p className="greeting">{hero.greeting}</p>
          <SplitWords segments={hero.headline} className="display" />
          <p className="lead">{hero.lead}</p>
          <div className="cta-row">
            <MagneticLink href="#work" className="btn btn-primary">
              View my work
            </MagneticLink>
            <MagneticLink href="#contact" className="btn btn-ghost">
              Start a project
            </MagneticLink>
          </div>
        </div>

        <div className="tile tile-orb" data-reveal style={delayStyle(100)}>
          <Orb />
          <span className="tile-caption">Interactive 3D · Three.js</span>
        </div>

        <article id="about" className="tile tile-about" data-reveal style={delayStyle(150)} aria-labelledby="about-title">
          <h2 id="about-title" className="tile-label">
            {about.label}
          </h2>
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

        <div className="tile tile-stats" data-reveal style={delayStyle(200)}>
          <ul className="stats">
            {hero.stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="tile tile-status" data-reveal style={delayStyle(250)}>
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

        <article id="services" className="tile tile-services" data-reveal aria-labelledby="services-title">
          <h2 id="services-title" className="tile-label">
            {services.label}
          </h2>
          <p className="tile-title">{services.title}</p>
          <ul className="service-list">
            {services.items.map((item) => (
              <li key={item.title}>
                <span className="service-icon">
                  <Icon name={item.icon} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <div className="tile tile-tools" data-reveal style={delayStyle(100)}>
          <p className="tile-label">{about.toolsLabel}</p>
          <ul className="chips">
            {about.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
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
