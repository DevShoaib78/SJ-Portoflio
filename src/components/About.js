import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollReveal from './ScrollReveal';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5
      }
    }
  };

  return (
    <section className="about section" id="about">
      <div className="container">
        <motion.div
          className="about-content"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <motion.h2 className="about-title" variants={itemVariants}>
              About <span className="title-highlight">Me</span>
            </motion.h2>
            <motion.div 
              className="section-line"
              variants={lineVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            ></motion.div>
          </motion.div>

          <motion.div className="about-main" variants={containerVariants}>
            <motion.div className="about-text" variants={itemVariants}>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={2}
                blurStrength={8}
                textClassName="about-intro"
                highlightWords={["Sayeeda Jabri"]}
              >
                Assalamualaikum! I'm Sayeeda Jabri, a hijabi woman who loves to study constitution and works closely with incubators around Hyderabad, spotlighting entrepreneurs from the city through podcasts.
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={2}
                blurStrength={8}
                highlightWords={["Hyderabad Hustlers"]}
              >
                I co-founded Hyderabad Hustlers alongside Shoaib Khan with the idea of creating a space where real stories, especially from underrated and emerging founders, could be celebrated. I've had the pleasure of hosting some amazing podcast conversations, particularly with women. Behind the scenes, I've been actively involved in building connections with founders, brainstorming content ideas, and helping shape what the Hustlers community stands for today.
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={2}
                blurStrength={8}
                highlightWords={["Incubation Manager Fellow"]}
              >
                I'm also an Incubation Manager Fellow at EdVenture Park, where I work closely with student-led startups. From supporting founders during their early journeys to managing day-to-day activities and operations at the incubation center, I love being part of a space where ideas take flight.
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={2}
                blurStrength={8}
                highlightWords={["Law degree"]}
              >
                Currently, I'm pursuing my Law degree at Sultan Uloom College, which helps me bring a different perspective to the startup and content worlds I move in. For me, it's all about bridging creativity, community, and purpose, while making space for those who need it most.
              </ScrollReveal>

              <motion.div
                className="about-signature"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                aria-hidden="true"
              >
                — Sayeeda
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 