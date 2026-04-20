import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Hero from './components/Hero';
import ErrorBoundary from './components/ErrorBoundary';
import { useAnimationControl } from './components/AnimationController';
import useLenis from './hooks/useLenis';
import './App.css';

// Below-the-fold sections are code-split so the initial JS bundle stays small.
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Media = lazy(() => import('./components/Media'));
const Contact = lazy(() => import('./components/Contact'));

// Splash stays up long enough to show the full SJ monogram + loading-bar animation.
// The loading bar in SplashScreen.js runs from delay=1.0s for duration=2.0s,
// so ~3s is the natural end point. MAX caps it if the page is still loading.
const MIN_SPLASH_MS = 3000;
const MAX_SPLASH_MS = 4500;

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useAnimationControl();
  useLenis();

  useEffect(() => {
    const startedAt = performance.now();
    let dismissed = false;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, MIN_SPLASH_MS - elapsed);
      setTimeout(() => setShowSplash(false), wait);
    };

    // Dismiss as soon as the page is fully loaded, but never past MAX_SPLASH_MS.
    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', dismiss, { once: true });
    }
    const hardCap = setTimeout(dismiss, MAX_SPLASH_MS);

    return () => {
      clearTimeout(hardCap);
      window.removeEventListener('load', dismiss);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <AnimatePresence>
          {showSplash && <SplashScreen key="splash" />}
        </AnimatePresence>

        {!showSplash && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
            <Suspense fallback={<div style={{ minHeight: '40vh' }} aria-hidden="true" />}>
              <About />
              <Experience />
              <Media />
              <Contact />
            </Suspense>
          </motion.main>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
