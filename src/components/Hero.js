import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedText from './AnimatedText';
import ParticleBackground from './ParticleBackground';
import FloatingElements from './FloatingElements';
import './Hero.css';

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="hero section" id="home">
      <ParticleBackground 
        particleCount={20}
        color="#febd59"
        size={1.5}
        speed={0.3}
        opacity={0.2}
        interactive={true}
      />
      <FloatingElements count={3} />
      
      {/* Background logos (decorative) */}
      <div className="hero-bg-logos" aria-hidden="true">
        <div className="hero-bg-logo hh-logo">
          <img src="/hhlogo.webp" alt="" width="240" height="240" loading="lazy" decoding="async" />
        </div>
        <div className="hero-bg-logo evp-logo">
          <img src="/evplogo.webp" alt="" width="240" height="240" loading="lazy" decoding="async" />
        </div>
      </div>
      
      <div className="container">
        <motion.div
          className="hero-content"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="hero-image" variants={itemVariants}>
            <div className="hero-photo">
              <img
                src="/sayeeda.webp"
                alt="Portrait of Sayeeda Jabri, Co-founder of Hyderabad Hustlers"
                width="480"
                height="480"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </div>
          </motion.div>
          
          <motion.div className="hero-text" variants={itemVariants}>
            <motion.div className="hero-name" variants={itemVariants}>
              <AnimatedText 
                text="Sayeeda Jabri" 
                className="hero-name-text"
                type="reveal"
                delay={0.5}
                gradient={true}
              />
            </motion.div>
            
            <motion.div className="hero-titles" variants={itemVariants}>
              <div className="title-line">
                <AnimatedText 
                  text="Co-founder of Hyderabad Hustlers"
                  className="title-primary"
                  type="typewriter"
                  delay={1.5}
                />
              </div>
              <motion.div 
                className="title-connector"
                initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 2.2, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <span className="title-ampersand">&</span>
              </motion.div>
              <div className="title-line">
                <AnimatedText 
                  text="IMF Fellow at EdVenture Park"
                  className="title-primary"
                  type="letters"
                  delay={2.5}
                />
              </div>
            </motion.div>
            
            <motion.p className="hero-description" variants={itemVariants}>
              Covering Stories and Engaging with Entrepreneurs around Hyderabad
            </motion.p>

            {/* Let's Connect Button - New Implementation */}
            <div className="lets-connect-cta">
              <div className="lets-connect-pill">
                <span className="lets-connect-text">Let's Connect</span>
                <div className="lets-connect-icons">
                  <a 
                    href="https://www.linkedin.com/in/sayeedajabri" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="lets-connect-btn linkedin"
                    aria-label="Connect on LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" className="lets-connect-icon" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/sayeeda_jabri" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="lets-connect-btn instagram"
                    aria-label="Follow on Instagram"
                  >
                    <svg viewBox="0 0 24 24" className="lets-connect-icon" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="18" cy="6" r="1"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 