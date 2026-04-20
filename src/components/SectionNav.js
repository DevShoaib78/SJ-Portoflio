import React, { useEffect, useState } from 'react';
import { scrollToSection } from '../hooks/useLenis';
import './SectionNav.css';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Journey' },
  { id: 'media', label: 'Media' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionNav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    let rafId = null;

    const detectActive = () => {
      const marker = window.scrollY + window.innerHeight * 0.45;
      let current = SECTIONS[0].id;
      for (let i = 0; i < SECTIONS.length; i += 1) {
        const el = document.getElementById(SECTIONS[i].id);
        if (!el) continue;
        if (el.offsetTop <= marker) current = SECTIONS[i].id;
      }
      setActive(current);
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(detectActive);
    };

    detectActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Lazy-loaded sections (About/Experience/Media/Contact) aren't in the DOM
    // when this component first mounts, so re-probe a few times to catch them.
    const retries = [100, 300, 700, 1400, 2500].map((delay) =>
      setTimeout(detectActive, delay)
    );

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      retries.forEach(clearTimeout);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleClick = (id) => (event) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <nav className="section-nav" aria-label="Page sections">
      <ul>
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                type="button"
                className={`section-nav-dot${isActive ? ' is-active' : ''}`}
                onClick={handleClick(id)}
                aria-label={`Scroll to ${label}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="section-nav-label">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
