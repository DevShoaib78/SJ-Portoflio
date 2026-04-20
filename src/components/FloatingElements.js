import React from 'react';
import { motion } from 'framer-motion';
import './FloatingElements.css';

const FloatingElements = ({ count = 4 }) => {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 20 + Math.random() * 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 8 + Math.random() * 4,
    opacity: 0.1 + Math.random() * 0.3
  }));

  const floatVariants = {
    animate: (custom) => ({
      y: [0, -30, 0],
      x: [0, 15, -15, 0],
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 0.9, 1],
      transition: {
        duration: custom.duration,
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
          <div className="element-glow" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements; 