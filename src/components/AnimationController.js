import { useEffect } from 'react';

// Utility to control CSS animations based on intersection observer
export const useAnimationControl = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target;
          if (entry.isIntersecting) {
            element.classList.add('in-view');
          } else {
            element.classList.remove('in-view');
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    // Observe all text-gold elements
    const textGoldElements = document.querySelectorAll('.text-gold');
    textGoldElements.forEach((el) => observer.observe(el));

    // Observe all elements with continuous animations
    const animatedElements = document.querySelectorAll('[class*="glow"], [class*="pulse"]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
};

export default useAnimationControl; 