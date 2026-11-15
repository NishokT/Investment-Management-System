'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { supportsWebGL } from '@/lib/browser';

// The 3D engine is split into its own bundle and only loaded in the browser,
// after the page is interactive.
const OrbScene = dynamic(() => import('./OrbScene').then((mod) => mod.OrbScene), {
  ssr: false,
  loading: () => null,
});

/** The 3D object inside its tile. Shows a static gradient orb until WebGL is ready, or if it is unavailable. */
export function Orb() {
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  return (
    <div className="orb" data-ready={ready ? 'true' : 'false'} aria-hidden="true">
      <div className="orb-fallback" />
      {webgl && <OrbScene onReady={() => setReady(true)} />}
    </div>
  );
}
