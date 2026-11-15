import { HeroSpotlight } from '@/components/HeroSpotlight';
import { HeroVisual } from '@/components/HeroVisual';
import { MagneticLink } from '@/components/MagneticLink';
import { SplitWords } from '@/components/SplitWords';
import { hero, site } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function Hero() {
  return (
    <HeroSpotlight>
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="eyebrow" data-reveal>
            <span className="dot" aria-hidden="true" /> {site.availability}
          </p>

          <SplitWords segments={hero.headline} />

          <p className="lead" data-reveal style={delayStyle(350)}>
            {hero.lead}
          </p>

          <div className="cta-row" data-reveal style={delayStyle(450)}>
            <MagneticLink href="#work" className="btn btn-primary">
              View my work
            </MagneticLink>
            <MagneticLink href="#contact" className="btn btn-ghost">
              Start a project
            </MagneticLink>
          </div>

          <ul className="stats" data-reveal style={delayStyle(550)}>
            {hero.stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual>
          {hero.cards.map((card) => (
            <div key={card.label} className={`float-card ${card.className}`}>
              <small>{card.label}</small>
              {card.value}
            </div>
          ))}
        </HeroVisual>
      </div>
    </HeroSpotlight>
  );
}
