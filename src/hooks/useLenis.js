import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

/**
 * Scroll to a section anchor, using Lenis when active and falling back
 * to native smooth-scroll on touch / reduced-motion environments.
 */
export function scrollToSection(target, options = {}) {
  const element =
    typeof target === 'string' ? document.getElementById(target.replace(/^#/, '')) : target;
  if (!element) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(element, { offset: 0, duration: 1.2, ...options });
  } else if (typeof element.scrollIntoView === 'function') {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

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
    lenisInstance = lenis;

    const scrollHandler = () => ScrollTrigger.update();
    lenis.on('scroll', scrollHandler);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

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
      if (lenisInstance === lenis) lenisInstance = null;
    };
  }, []);
}
