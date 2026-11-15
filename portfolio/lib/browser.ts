import type { CSSProperties } from 'react';

/** True when the visitor has asked the system to reduce motion. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Sets the stagger delay used by the [data-reveal] scroll animation. */
export function delayStyle(ms: number): CSSProperties {
  return { '--d': `${ms}ms` } as CSSProperties;
}

/** Whether WebGL can be created here. Used to skip the 3D scene on unsupported devices. */
export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}
