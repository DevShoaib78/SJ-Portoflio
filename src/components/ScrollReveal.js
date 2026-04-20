import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  highlightWords = []
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    
    // Create a map to track which words should be highlighted
    const wordsToHighlight = new Set();
    
    // For each highlight phrase, find its position in the text and mark those words
    highlightWords.forEach(phrase => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        const beforeText = text.substring(0, match.index);
        const wordsBefore = beforeText.split(/\s+/).filter(w => w.length > 0).length;
        const phraseWords = phrase.split(/\s+/).filter(w => w.length > 0);
        
        for (let i = 0; i < phraseWords.length; i++) {
          wordsToHighlight.add(wordsBefore + i);
        }
      }
    });
    
    // Split text into words and spaces, then process each segment
    const segments = text.split(/(\s+)/);
    let wordIndex = 0;
    
    return segments.map((segment, index) => {
      // Return whitespace as-is
      if (segment.match(/^\s+$/)) return segment;
      
      // For actual words, check if they should be highlighted
      const isHighlighted = wordsToHighlight.has(wordIndex);
      wordIndex++;
      
      return (
        <span 
          className={`word ${isHighlighted ? 'highlight-word' : ''}`} 
          key={index}
        >
          {segment}
        </span>
      );
    });
  }, [children, highlightWords]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    const wordElements = el.querySelectorAll('.word');

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal; 