'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, type ReactNode } from 'react';
import { site } from '@/content/site';
import { supportsWebGL } from '@/lib/browser';

// The 3D engine is split into its own bundle and only loaded in the browser,
// so the HTML, text and layout are ready before Three.js downloads.
const HeroScene = dynamic(() => import('./HeroScene').then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => null,
});

export function HeroVisual({ children }: { children?: ReactNode }) {
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  return (
    <div className="hero-visual" data-ready={ready ? 'true' : 'false'} data-reveal aria-hidden="true">
      {webgl && <HeroScene onReady={() => setReady(true)} />}
      <div className="hero-fallback">
        <span className="avatar">{site.initials}</span>
      </div>
      {children}
    </div>
  );
}
