'use client';

import type { PointerEvent, ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/browser';

type Props = { className: string; children: ReactNode };

/**
 * A bento grid whose tiles light up softly around the cursor. It only reacts to the
 * mouse, nothing moves on scroll, and it does nothing for touch or reduced motion.
 */
export function SpotlightGrid({ className, children }: Props) {
  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const tiles = event.currentTarget.querySelectorAll<HTMLElement>('.tile');
    tiles.forEach((tile) => {
      const rect = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', `${(event.clientX - rect.left).toFixed(0)}px`);
      tile.style.setProperty('--my', `${(event.clientY - rect.top).toFixed(0)}px`);
    });
  }

  return (
    <div className={className} onPointerMove={onMove}>
      {children}
    </div>
  );
}
