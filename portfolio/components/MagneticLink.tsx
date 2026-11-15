'use client';

import type { PointerEvent, ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/browser';

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** A link that leans slightly toward the cursor, for a tactile feel on buttons. */
export function MagneticLink({ href, className = '', children }: Props) {
  function onMove(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    el.style.setProperty('--magnet-x', `${(x * 0.22).toFixed(1)}px`);
    el.style.setProperty('--magnet-y', `${(y * 0.32).toFixed(1)}px`);
  }

  function onLeave(event: PointerEvent<HTMLAnchorElement>) {
    const el = event.currentTarget;
    el.style.setProperty('--magnet-x', '0px');
    el.style.setProperty('--magnet-y', '0px');
  }

  return (
    <a href={href} className={`magnetic ${className}`.trim()} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </a>
  );
}
