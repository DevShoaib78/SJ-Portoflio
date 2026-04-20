import React from 'react';
import { motion } from 'framer-motion';
import './FloatingElements.css';
import useIsMobile from '../hooks/useIsMobile';

const FloatingElements = ({ count = 4 }) => {
  const isMobile = useIsMobile();
  const mobileCount = isMobile ? Math.max(1, Math.floor(count / 2)) : count;
  const elements = Array.from({ length: mobileCount }, (_, i) => ({
    id: i,
    size: 20 + Math.random() * 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 8 + Math.random() * 4,
    opacity: isMobile ? 0.08 + Math.random() * 0.12 : 0.1 + Math.random() * 0.3
  }));

  const floatVariants = {
    animate: (custom) => ({
      y: [0, -20, 0],
      x: [0, 10, -10, 0],
      rotate: [0, 6, -6, 0],
      scale: [1, 1.05, 0.95, 1],
      transition: {
        duration: custom.duration * (isMobile ? 1.5 : 1),
        repeat: Infinity,
        delay: custom.delay,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="floating-elements">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="floating-element"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
            opacity: element.opacity
          }}
          variants={floatVariants}
          animate="animate"
          custom={element}
        >
          {!isMobile && <div className="element-glow" />}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements; 