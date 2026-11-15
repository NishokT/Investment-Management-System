'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/browser';

const RESET = { glowX: '70%', glowY: '35%', px: '0', py: '0' };

/**
 * The hero section. Moving the mouse over it moves a light spotlight behind the
 * content and tilts the 3D visual slightly, using CSS custom properties.
 */
export function HeroSpotlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  function onMove(event: PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== 'mouse' || prefersReducedMotion()) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    el.style.setProperty('--glow-x', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--glow-y', `${(y * 100).toFixed(1)}%`);
    el.style.setProperty('--px', (x * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (y * 2 - 1).toFixed(3));
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--glow-x', RESET.glowX);
    el.style.setProperty('--glow-y', RESET.glowY);
    el.style.setProperty('--px', RESET.px);
    el.style.setProperty('--py', RESET.py);
  }

  return (
    <section id="top" ref={ref} className="hero" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      {children}
    </section>
  );
}
