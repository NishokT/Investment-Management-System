import { useEffect, useState } from 'react';

const FALLBACK = '#d4ff3a';

/**
 * Reads the --accent design token so the 3D scene always matches the site's colour,
 * and updates when the visitor switches between light and dark mode.
 */
export function useAccent(): string {
  const [accent, setAccent] = useState(FALLBACK);

  useEffect(() => {
    const update = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      setAccent(value || FALLBACK);
    };
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    systemDark.addEventListener('change', update);

    return () => {
      observer.disconnect();
      systemDark.removeEventListener('change', update);
    };
  }, []);

  return accent;
}
