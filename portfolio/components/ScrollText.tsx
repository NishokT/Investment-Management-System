'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { prefersReducedMotion } from '@/lib/browser';

/**
 * A large paragraph whose words light up one by one as it scrolls through the viewport.
 * The component only sets one number (--p, 0 to 1); CSS works out each word's brightness.
 * Without JavaScript, or with reduced motion, every word is fully visible.
 */
export function ScrollText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty('--p', '1');
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts when the top reaches 85% down the screen, completes as the bottom passes 45%
      const progress = (vh * 0.85 - rect.top) / (rect.height + vh * 0.4);
      el.style.setProperty('--p', Math.min(Math.max(progress, 0), 1).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={`scroll-text ${className}`.trim()} style={{ '--n': words.length } as CSSProperties}>
      {words.map((word, i) => (
        <span key={i} style={{ '--i': i } as CSSProperties}>
          {word}{' '}
        </span>
      ))}
    </p>
  );
}
