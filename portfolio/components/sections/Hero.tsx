import { HeroCanvas } from '@/components/HeroCanvas';
import { MagneticLink } from '@/components/MagneticLink';
import { SplitWords } from '@/components/SplitWords';
import { hero, site } from '@/content/site';
import { delayStyle } from '@/lib/browser';

/** Full-screen opening: a 3D scene edge to edge, an oversized headline and the key numbers. */
export function Hero() {
  return (
    <section id="top" className="hero" aria-label="Introduction">
      <HeroCanvas />
      <div className="hero-grid" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-top">
          <p className="pill">
            <span className="dot" aria-hidden="true" />
            {site.availability}
          </p>
          <p className="hero-meta">
            <span>{site.role}</span>
            <span>{site.location}</span>
          </p>
        </div>

        <div className="hero-main">
          <p className="greeting">{hero.greeting}</p>
          <SplitWords segments={hero.headline} className="display hero-title" />
        </div>

        <div className="hero-bottom">
          <div className="hero-copy" data-reveal style={delayStyle(450)}>
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

          <a href="#about" className="scroll-cue" data-reveal style={delayStyle(700)}>
            <span>Scroll</span>
            <i aria-hidden="true" />
          </a>

          <ul className="hero-stats" data-reveal style={delayStyle(600)}>
            {hero.stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
