import type { ReactNode } from 'react';
import type { IconName } from '@/content/site';

const icons: Record<IconName, ReactNode> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2.5" />
      <path d="M3 9h18M8 21h8M12 18v3" />
    </>
  ),
  ux: (
    <>
      <path d="M4 7h10M4 12h7M4 17h9" />
      <circle cx="17.5" cy="15.5" r="3.5" />
    </>
  ),
  '3d': (
    <>
      <path d="M12 2.5l8.5 4.75v9.5L12 21.5l-8.5-4.75v-9.5z" />
      <path d="M3.5 7.25L12 12l8.5-4.75M12 12v9.5" />
    </>
  ),
};

/** Line icon. Decorative, so it is hidden from screen readers. */
export function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}
