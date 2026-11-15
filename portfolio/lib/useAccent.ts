import { useEffect, useState } from 'react';

const FALLBACK = '#5b5bf0';

/**
 * Reads the --accent design token so the 3D scene always matches the site's colour,
 * and updates when the visitor switches between light and dark mode.
 */
export function useAccent(): string {
  const [accent, setAccent] = useState(FALLBACK);

  useEffect(() => {
    const read = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      if (value) setAccent(value);
    };
    read();

    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    systemDark.addEventListener('change', read);

    return () => {
      observer.disconnect();
      systemDark.removeEventListener('change', read);
    };
  }, []);

  return accent;
}
