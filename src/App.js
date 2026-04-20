import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Media from './components/Media';
import Contact from './components/Contact';
import { useAnimationControl } from './components/AnimationController';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  // Initialize animation control for performance optimization
  useAnimationControl();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
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
          <About />
          <Experience />
          <Media />
          <Contact />
        </motion.main>
      )}
    </div>
  );
}

export default App; 