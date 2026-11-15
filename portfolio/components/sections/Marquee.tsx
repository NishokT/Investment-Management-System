import { marquee } from '@/content/site';

/**
 * Two crossed bands that scroll sideways in opposite directions, edge to edge.
 * Each list is repeated once for a seamless loop; the copy is hidden from screen readers.
 * Hovering pauses them, and they stand still for visitors who prefer reduced motion.
 */
export function Marquee() {
  return (
    <section className="marquee" aria-label="Services and tools">
      <div className="marquee-band band-a">
        <MarqueeRow items={marquee.primary} />
      </div>
      <div className="marquee-band band-b">
        <MarqueeRow items={marquee.secondary} reverse />
      </div>
    </section>
  );
}

function MarqueeRow({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  return (
    <div className={reverse ? 'marquee-track reverse' : 'marquee-track'}>
      {[0, 1].map((copy) => (
        <ul key={copy} className="marquee-list" aria-hidden={copy === 1 ? true : undefined}>
          {items.map((item) => (
            <li key={item}>
              {item}
              <span className="marquee-star" aria-hidden="true">
                ✦
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
