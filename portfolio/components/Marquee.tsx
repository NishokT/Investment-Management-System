import { Fragment } from 'react';
import { marquee } from '@/content/site';

function Group() {
  return (
    <div className="marquee-group">
      {marquee.map((word) => (
        <Fragment key={word}>
          <span>{word}</span>
          <i>✦</i>
        </Fragment>
      ))}
    </div>
  );
}

/** A scrolling strip of services. The list is duplicated so the loop is seamless. */
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <Group />
        <Group />
      </div>
    </div>
  );
}
