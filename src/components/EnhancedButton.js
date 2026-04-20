import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './EnhancedButton.css';

const EnhancedButton = ({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'default',
  effect = 'glow',
  className = '',
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const ButtonComponent = href ? motion.a : motion.button;

  return (
    <ButtonComponent
      ref={buttonRef}
      href={href}
      onClick={onClick}
      className={`enhanced-btn ${variant} ${size} ${effect} ${className}`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onMouseMove={handleMouseMove}
      {...props}
    >
      <span className="btn-content">
        {children}
      </span>
      
      {effect === 'ripple' && (
        <div 
          className="ripple-effect" 
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        />
      )}
      
      {effect === 'shine' && (
        <div className="shine-effect" />
      )}
      
      {effect === 'magnetic' && (
        <div 
          className="magnetic-effect"
          style={{
            transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 25) * 0.1}px)`
          }}
        />
      )}
      
      <div className="btn-glow" />
    </ButtonComponent>
  );
};

export default EnhancedButton; 