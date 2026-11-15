import type { CSSProperties } from 'react';
import type { Segment } from '@/content/site';

type Props = {
  segments: readonly Segment[];
  className?: string;
};

/**
 * Renders a heading with each word wrapped in its own span, for a word-by-word 3D entrance.
 * It renders on the server, so the text is in the HTML before any JavaScript runs.
 * Screen readers get the full sentence via aria-label; the spans are hidden from them.
 */
export function SplitWords({ segments, className }: Props) {
  const label = segments.map((segment) => segment.text).join('');
  let index = 0;

  return (
    <h1 className={['split-words', className].filter(Boolean).join(' ')} aria-label={label}>
      {segments.map((segment, segmentIndex) => {
        const parts = segment.text.split(/(\s+)/).filter((part) => part.length > 0);
        const content = parts.map((part, partIndex) => {
          if (/^\s+$/.test(part)) return <span key={`s-${segmentIndex}-${partIndex}`}> </span>;
          const i = index++;
          return (
            <span key={`w-${segmentIndex}-${partIndex}`} className="w" style={{ '--i': i } as CSSProperties} aria-hidden="true">
              {part}
            </span>
          );
        });
        return segment.accent ? (
          <span key={`seg-${segmentIndex}`} className="accent">
            {content}
          </span>
        ) : (
          <span key={`seg-${segmentIndex}`}>{content}</span>
        );
      })}
    </h1>
  );
}
