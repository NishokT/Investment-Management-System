'use client';

import { useEffect, useState } from 'react';
import { nav, site } from '@/content/site';
import { MagneticLink } from './MagneticLink';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  // Add a border once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav link for the section in view
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const classes = ['site-header', scrolled && 'scrolled', open && 'open'].filter(Boolean).join(' ');

  return (
    <header className={classes}>
      <div className="container nav">
        <a href="#top" className="logo" aria-label={`${site.name}, back to top`}>
          {site.initials}
          <span>.</span>
        </a>

        <nav id="site-nav" className="nav-links" aria-label="Primary">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={isActive ? 'active' : undefined}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <MagneticLink href="#contact" className="btn btn-primary btn-sm nav-cta">
            Hire me
          </MagneticLink>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
