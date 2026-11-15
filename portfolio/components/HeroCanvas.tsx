'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { supportsWebGL } from '@/lib/browser';

// The 3D engine is split into its own bundle and only loaded in the browser,
// after the page is interactive.
const HeroScene = dynamic(() => import('./HeroScene').then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => null,
});

/** The hero's 3D backdrop. Shows a soft glow while it loads, and a static gradient orb if WebGL is unavailable. */
export function HeroCanvas() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  return (
    <div
      className="hero-scene"
      data-ready={ready ? 'true' : 'false'}
      data-webgl={webgl === null ? 'pending' : String(webgl)}
      aria-hidden="true"
    >
      <div className="hero-fallback" />
      {webgl && <HeroScene onReady={() => setReady(true)} />}
    </div>
  );
}
