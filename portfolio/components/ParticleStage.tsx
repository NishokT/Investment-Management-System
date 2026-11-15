'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { supportsWebGL } from '@/lib/browser';

// The 3D engine loads only in the browser, after the page is interactive.
const Scene = dynamic(() => import('./ParticleStageScene').then((mod) => mod.ParticleStageScene), {
  ssr: false,
  loading: () => null,
});

/** The fixed 3D backdrop. Renders nothing when WebGL is unavailable, and the page works without it. */
export function ParticleStage() {
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  if (!webgl) return null;

  return (
    <div className="stage" aria-hidden="true">
      <Scene />
    </div>
  );
}
