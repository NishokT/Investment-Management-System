'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  // null until mounted, so the server and first client render match
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    const read = () => {
      const explicit = document.documentElement.getAttribute('data-theme');
      setDark(explicit ? explicit === 'dark' : systemDark.matches);
    };
    read();
    systemDark.addEventListener('change', read);
    return () => systemDark.removeEventListener('change', read);
  }, []);

  function toggle() {
    const next = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage blocked: the choice lasts for this visit only
    }
    setDark(next === 'dark');
  }

  const isDark = dark === true;

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      data-dark={isDark ? 'true' : 'false'}
    >
      <svg className="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
