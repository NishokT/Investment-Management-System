import { useEffect, useState } from 'react';

type ThemeColors = { accent: string; secondary: string };

const FALLBACK: ThemeColors = { accent: '#4c7dff', secondary: '#a78bfa' };

/**
 * Reads the --accent and --accent-2 design tokens so the 3D scene always matches the
 * site's colours, and updates when the visitor switches between dark and light mode.
 */
export function useAccent(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>(FALLBACK);

  useEffect(() => {
    const update = () => {
      const style = getComputedStyle(document.documentElement);
      setColors({
        accent: style.getPropertyValue('--accent').trim() || FALLBACK.accent,
        secondary: style.getPropertyValue('--accent-2').trim() || FALLBACK.secondary,
      });
    };
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return colors;
}
