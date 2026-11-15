import { site } from '@/content/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {year} {site.name}. Designed &amp; built by me.
        </p>
        <nav className="socials" aria-label="Social and contact">
          {site.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="me noopener noreferrer">
              {social.label}
            </a>
          ))}
          <a href={`mailto:${site.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
