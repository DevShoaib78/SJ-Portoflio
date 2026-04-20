import React from 'react';
import { motion } from 'framer-motion';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="splash-content">
        <motion.div
          className="monogram"
          initial={{ scale: 0.3, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 60,
            damping: 15
          }}
        >
          SJ
        </motion.div>
        <div className="loading-container">
          <div className="loading-bar-wrapper">
            <motion.div
              className="loading-bar-background"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
            
            <div className="loading-segments">
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  className="loading-segment"
                  initial={{ opacity: 0.3, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.3, 1, 0.3], 
                    scale: [0.8, 1.1, 0.8],
                    boxShadow: [
                      "0 0 5px rgba(254, 189, 89, 0.3)",
                      "0 0 20px rgba(254, 189, 89, 0.8)",
                      "0 0 5px rgba(254, 189, 89, 0.3)"
                    ]
                  }}
                  transition={{
                    delay: 0.9 + (index * 0.2),
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            <motion.div
              className="loading-progress"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ 
                delay: 1.0, 
                duration: 2.0,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />
            
            <div className="loading-particles">
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  className="particle"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -20, -40],
                    x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30]
                  }}
                  transition={{
                    delay: 1.2 + (index * 0.3),
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen; 