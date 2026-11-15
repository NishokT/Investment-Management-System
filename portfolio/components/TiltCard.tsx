'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';
import { delayStyle, prefersReducedMotion } from '@/lib/browser';

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger delay for the scroll-in animation, in milliseconds */
  delay?: number;
};

/**
 * A card that tilts in 3D toward the cursor, with a soft glare that follows it.
 * Touch and pen input are left alone, and reduced-motion visitors get a flat card.
 */
export function TiltCard({ children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== 'mouse' || prefersReducedMotion()) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    el.style.setProperty('--ry', `${((px - 0.5) * 12).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${((0.5 - py) * 12).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
    el.dataset.tilting = 'true';
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    delete el.dataset.tilting;
  }

  return (
    <div
      ref={ref}
      className={`tilt ${className}`.trim()}
      data-reveal
      style={delayStyle(delay)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}
