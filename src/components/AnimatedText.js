import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './AnimatedText.css';

const AnimatedText = ({ 
  text, 
  className = '', 
  delay = 0, 
  type = 'reveal', 
  gradient = false 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Split text into words for animation
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: type === 'typewriter' ? 0.1 : 0.08,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: type === 'reveal' ? 50 : 0,
      scale: type === 'reveal' ? 0.8 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // Typewriter effect with requestAnimationFrame
  useEffect(() => {
    if (type === 'typewriter') {
      let i = 0;
      let lastTime = 0;
      const typingSpeed = 50; // milliseconds between characters
      let animationFrame;
      
      const timer = setTimeout(() => {
        const typeChar = (currentTime) => {
          if (currentTime - lastTime >= typingSpeed) {
            if (i < text.length) {
              setDisplayedText(text.slice(0, i + 1));
              i++;
              lastTime = currentTime;
            } else {
              // Typing complete, schedule cursor hide
              setTimeout(() => {
                setIsTypingComplete(true);
              }, 1000);
              return;
            }
          }
          animationFrame = requestAnimationFrame(typeChar);
        };
        
        animationFrame = requestAnimationFrame(typeChar);
      }, delay * 1000);
      
      return () => {
        clearTimeout(timer);
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [text, type, delay]);

  if (type === 'typewriter') {
    return (
      <div className={`animated-text ${className} ${gradient ? 'gradient-text' : ''}`}>
        {displayedText}
        {!isTypingComplete && <span className="cursor">|</span>}
      </div>
    );
  }

  if (type === 'letters') {
    return (
      <motion.div
        className={`animated-text ${className} ${gradient ? 'gradient-text' : ''}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {text.split('').map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="letter"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`animated-text ${className} ${gradient ? 'gradient-text' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="word"
        >
          {word}{index < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText; 