import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './ImpactStats.css';

// Edit these freely — they're the only source of truth for the block.
const STATS = [
  { value: 50, suffix: '+', label: 'Founders Spotlighted' },
  { value: 5, suffix: '+', label: 'Leadership Roles' },
  { value: 3, suffix: '+', label: 'Years of Community Building' },
];

function Counter({ target, suffix, duration = 1800, inView }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }
    let rafId;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, duration]);

  return (
    <span className="stat-number">
      {value}
      <span className="stat-suffix">{suffix}</span>
    </span>
  );
}

export default function ImpactStats() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="impact-stats" ref={ref} aria-label="Impact in numbers">
      <div className="container">
        <ul className="impact-stats-grid">
          {STATS.map((stat, idx) => (
            <li key={idx} className="impact-stat">
              <Counter target={stat.value} suffix={stat.suffix} inView={inView} />
              <span className="stat-label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
