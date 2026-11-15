'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A giant name that spans the full width of the footer, whatever its length.
 * It is drawn as SVG text, then the box is measured once the font has loaded so the
 * word scales to fit edge to edge without being stretched. Decorative only.
 */
export function Wordmark({ text }: { text: string }) {
  const textRef = useRef<SVGTextElement>(null);
  // A close first guess so the server-rendered size is already about right
  const [viewBox, setViewBox] = useState(`0 -150 ${Math.max(text.length, 1) * 108} 190`);

  useEffect(() => {
    let cancelled = false;
    const measure = () => {
      const el = textRef.current;
      if (cancelled || !el) return;
      const box = el.getBBox();
      if (box.width > 0) setViewBox(`${box.x} ${box.y} ${box.width} ${box.height}`);
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <svg className="wordmark" viewBox={viewBox} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wordmark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="wordmark-stop-top" />
          <stop offset="1" className="wordmark-stop-bottom" />
        </linearGradient>
      </defs>
      <text ref={textRef} x="0" y="0" fill="url(#wordmark-fill)">
        {text}
      </text>
    </svg>
  );
}
