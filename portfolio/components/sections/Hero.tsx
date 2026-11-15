import { MagneticLink } from '@/components/MagneticLink';
import { SplitWords } from '@/components/SplitWords';
import { hero, site } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container">
        <div className="hero-copy">
          <p className="kicker" data-reveal>
            <span className="dot" aria-hidden="true" />
            {site.availability}
          </p>

          <p className="greeting" data-reveal style={delayStyle(120)}>
            {hero.greeting}
          </p>

          <SplitWords segments={hero.headline} className="display" />

          <p className="lead" data-reveal style={delayStyle(400)}>
            {hero.lead}
          </p>

          <div className="cta-row" data-reveal style={delayStyle(500)}>
            <MagneticLink href="#work" className="btn btn-primary">
              View my work
            </MagneticLink>
            <MagneticLink href="#contact" className="btn btn-ghost">
              Start a project
            </MagneticLink>
          </div>
        </div>
      </div>

      <div className="container hero-foot" data-reveal style={delayStyle(650)}>
        <ul className="hero-stats">
          {hero.stats.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
        <p className="hero-meta">
          {hero.badges.map((badge) => (
            <span key={badge.label}>
              {badge.label}: <strong>{badge.value}</strong>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
