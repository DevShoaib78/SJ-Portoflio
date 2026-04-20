import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './QuoteCard.css';

/**
 * A short personal quote from Sayeeda — her mission in her own words.
 * Kept authentic rather than a fabricated testimonial.
 */
const QUOTE = {
  text: "The best stories aren't always the loudest. My work is about making space for the voices that haven't been heard yet.",
  attribution: 'Sayeeda Jabri',
};

export default function QuoteCard() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="quote-card-section" aria-label="Mission statement">
      <div className="container">
        <motion.figure
          className="quote-card"
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <svg
            className="quote-mark"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6.5 10c-1.93 0-3.5 1.57-3.5 3.5S4.57 17 6.5 17c.17 0 .33-.02.5-.05V18c0 1.1-.9 2-2 2H4v2h1c2.21 0 4-1.79 4-4v-4.5C9 11.57 7.43 10 6.5 10zm11 0c-1.93 0-3.5 1.57-3.5 3.5S15.57 17 17.5 17c.17 0 .33-.02.5-.05V18c0 1.1-.9 2-2 2h-1v2h1c2.21 0 4-1.79 4-4v-4.5c0-1.93-1.57-3.5-3.5-3.5z" />
          </svg>
          <blockquote className="quote-text">{QUOTE.text}</blockquote>
          <figcaption className="quote-attribution">
            <span className="quote-attribution-line" />
            <span>{QUOTE.attribution}</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
