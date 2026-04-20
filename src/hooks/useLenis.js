import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scroll and keeps GSAP ScrollTrigger in sync.
 * - Disabled on touch devices (kept native inertia — feels better on mobile)
 * - Disabled when user prefers reduced motion
 */
export default function useLenis() {
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    if (mql.matches || isTouch) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      infinite: false,
    });

    // Keep ScrollTrigger-driven animations (About section text reveals) in sync
    const scrollHandler = () => ScrollTrigger.update();
    lenis.on('scroll', scrollHandler);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Pause smooth scroll while the page is hidden (saves battery)
    const handleVisibility = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      gsap.ticker.remove(rafCallback);
      lenis.off('scroll', scrollHandler);
      lenis.destroy();
    };
  }, []);
}
