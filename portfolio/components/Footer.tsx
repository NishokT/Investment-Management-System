import { nav, site } from '@/content/site';
import { Wordmark } from './Wordmark';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-cta">
            <p className="footer-kicker">Got an idea?</p>
            <a className="footer-email" href={`mailto:${site.email}`}>
              {site.email} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <nav className="footer-cols" aria-label="Footer">
            <div>
              <p className="tile-label">Sitemap</p>
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="tile-label">Elsewhere</p>
              <ul>
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="me noopener noreferrer">
                      {social.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.email}`}>Email</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <Wordmark text={site.name} />

        <div className="footer-bottom">
          <p>
            © {year} {site.name}. Designed &amp; built by me.
          </p>
          <a href="#top" className="back-to-top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
