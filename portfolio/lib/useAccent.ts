import { useEffect, useState } from 'react';

type ThemeColors = { accent: string; secondary: string; tertiary: string; dark: boolean };

const FALLBACK: ThemeColors = { accent: '#4c7dff', secondary: '#a78bfa', tertiary: '#3fe0c5', dark: true };

/**
 * Reads the --accent, --accent-2 and --accent-3 design tokens so the 3D scene always matches the
 * site's colours, and updates when the visitor switches between dark and light mode.
 */
export function useAccent(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>(FALLBACK);

  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const style = getComputedStyle(root);
      setColors({
        accent: style.getPropertyValue('--accent').trim() || FALLBACK.accent,
        secondary: style.getPropertyValue('--accent-2').trim() || FALLBACK.secondary,
        tertiary: style.getPropertyValue('--accent-3').trim() || FALLBACK.tertiary,
        dark: root.getAttribute('data-theme') !== 'light',
      });
    };
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return colors;
}
