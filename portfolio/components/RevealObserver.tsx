'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/browser';

/**
 * Watches every [data-reveal] element and adds .is-in when it scrolls into view.
 * Content is already in the HTML, so this only controls the entrance animation.
 */
export function RevealObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]');

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
