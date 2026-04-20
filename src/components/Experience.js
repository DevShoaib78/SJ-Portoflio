import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useIsMobile from '../hooks/useIsMobile';
import TimelineIcon from './TimelineIcon';
import './Experience.css';

const FlowingParticles = () => {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1, // 1px to 5px
    left: Math.random() * 100, // Random horizontal position
    animationDelay: Math.random() * 20, // Extended staggered start times for more spread
    animationDuration: 12 + Math.random() * 8, // 12s to 20s for slower, more elegant flow
    opacity: 0.2 + Math.random() * 0.5, // 0.2 to 0.7 opacity for better layering
    glowIntensity: Math.random() * 0.6 + 0.3, // Enhanced glow intensity
  }));

  return (
    <div className="flowing-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="flowing-particle"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(254, 189, 89, ${particle.glowIntensity})`,
          }}
        />
      ))}
    </div>
  );
};

const TimelineItem = ({ experience, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.25,
    triggerOnce: false // Reveal on enter, un-reveal on exit (scroll up)
  });

  const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2 // Small delay for smoother individual reveals
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.1
      }
    }
  };

  // Mouse tracking for spotlight effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--mouse-x', '50%');
    card.style.setProperty('--mouse-y', '50%');
  };

  return (
    <motion.div 
      ref={ref}
      className={`timeline-item ${experience.priority ? 'priority' : ''} ${experience.featured ? 'featured' : ''}`}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Timeline Dot */}
      <motion.div 
        className="timeline-dot"
        variants={dotVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="dot-inner">
          <span className="dot-icon">
            <TimelineIcon name={experience.icon} />
          </span>
        </div>
        {experience.priority && <div className="priority-ring"></div>}
      </motion.div>
      
      {/* Experience Card */}
      <div 
        className="experience-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Company Logo for specific cards */}
        {experience.title === "Co-founder & COO" && experience.organization === "Hyderabad Hustlers" && (
          <div className="card-logo">
            <img src="/hhlogo.webp" alt="Hyderabad Hustlers logo" width="96" height="96" loading="lazy" decoding="async" />
          </div>
        )}
        {experience.title === "Incubation Manager Fellow" && experience.organization === "EdVenture Park" && (
          <div className="card-logo">
            <img src="/evplogo.webp" alt="EdVenture Park logo" width="96" height="96" loading="lazy" decoding="async" />
          </div>
        )}
        
        <div className="card-header">
          <div className="header-content">
            <h3 className="card-title">{experience.title}</h3>
            <h4 className="card-organization">{experience.organization}</h4>
          </div>
        </div>
        
        <p className="card-description">{experience.description}</p>
        
        <ul className="highlights">
          {experience.highlights.map((highlight, idx) => (
            <li key={idx} className="highlight-item">
              <span className="highlight-marker" aria-hidden="true" />
              <span className="highlight-text">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [headerRef, headerInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [timelineRef, timelineInView] = useInView({
    threshold: 0.05,
    triggerOnce: false
  });

  // Core Experiences (ordered as per client)
  const coreExperiences = [
    {
      title: "Co-founder & COO",
      organization: "Hyderabad Hustlers",
      description: "Co-founded and built a platform where underrated voices and hustlers of Hyderabad get amplified. I am trying to build a thriving entrepreneurial community by connecting startups, mentors, investors and by reaching out to the potential events/activities which aligns with our vision across the city.",
      highlights: ["Podcast hosting & management", "On-field operations", "Content creation & strategy"],
      icon: "rocket",
      featured: true,
      priority: true
    },
    {
      title: "Incubation Manager Fellow",
      organization: "EdVenture Park",
      description: "Contributing to pre-incubation programs and providing strategic guidance to early-stage startups. Executing pre-incubation operations, mentoring founders, and facilitating their journey from ideation to execution.",
      highlights: ["Guided several starting founders", "Involved in pre-incubation program operations", "Facilitated startup acceleration processes"],
      icon: "graduation",
      featured: true,
      priority: true
    },
    {
      title: "X-Team",
      organization: "EdVenture Park",
      description: "An Executive team member at EdVenture Park Incubation Center, driving powerful strategic moves and bringing different teams together to turn big ideas into real results.",
      highlights: ["Strategic planning & execution", "Cross-team leadership", "High-impact initiative implementation"],
      icon: "bolt"
    },
    {
      title: "Law student",
      organization: "Currently Pursuing",
      description: "Studying law to combine legal expertise with entrepreneurial knowledge.",
      highlights: ["Legal research", "Business law focus", "Academic achievement"],
      icon: "scales"
    }
  ];

  // Beyond the Core Experiences (ordered as per client)
  const beyondCoreExperiences = [
    {
      title: "Head of EdTalk",
      organization: "EdVenture Park",
      description: "Organizing and hosting educational, trending and controversial talks, bringing experts to share their insights with attendees. I believe changing conversations brings a huge impact in the long run.",
      highlights: ["Hosted multiple panel discussions", "Facilitated conversational flows", "Curated thought-provoking sessions"],
      icon: "chat"
    },
    {
      title: "Founders' Friday Lead",
      organization: "EdVenture Park",
      description: "As a Founders' Friday Lead, contributed to organizing multiple Founders' Fridays events, overseeing operations and arrangements while actively networking and building meaningful connections within the entrepreneurial community.",
      highlights: ["Event operations management", "Founder community networking", "Strategic event planning"],
      icon: "users"
    },
    {
      title: "Founders' Fest Lead",
      organization: "EdVenture Park",
      description: "Led the planning and execution of Founders' Fest, a flagship event celebrating entrepreneurship and innovation. Coordinated with teams, managed logistics, and ensured a memorable experience for all participants.",
      highlights: ["Flagship event leadership", "Team coordination", "Event logistics & execution"],
      icon: "star"
    },
    {
      title: "CLX",
      organization: "EdVenture Park",
      description: "As a Campus Lead Executive (CLX), primarily focused on identifying and onboarding Campus Leads at EdVenture Park, conducting interviews, providing comprehensive assistance with their activities, and continuously engaging in R&D to enhance and upscale Campus Lead operations.",
      highlights: ["Campus Lead onboarding", "Interview coordination", "R&D for CL's Excellence"],
      icon: "diamond"
    },
    {
      title: "Campus Lead",
      organization: "EdVenture Park",
      description: "Led campus-wide entrepreneurship initiatives and student engagement programs between EdVenture Park and Sultan Uloom College.",
      highlights: ["Student leadership", "Event coordination", "Academic excellence"],
      icon: "school"
    }
  ];

  const timelineVariants = {
    hidden: {
      scaleY: 0,
      transition: { duration: 0.5, ease: "easeIn" }
    },
    visible: {
      scaleY: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  return (
    <section className="experience-section" id="experience">
      {/* Flowing Particles Background */}
      <FlowingParticles />
      <div className="experience-container">
        <motion.div 
          className="section-header"
          ref={headerRef}
          initial={{ y: -30, opacity: 0 }}
          animate={headerInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            My <span className="title-accent">Journey</span>
          </h2>
          <div className="section-line"></div>
          <p className="section-subtitle">Building communities, empowering entrepreneurs, and creating impact</p>
        </motion.div>
        {/* Main Timeline */}
        <div className="timeline-container">
          {/* Vertical Timeline Line */}
          <motion.div 
            className="timeline-line"
            ref={timelineRef}
            variants={timelineVariants}
            initial="hidden"
            animate={timelineInView ? "visible" : "hidden"}
          ></motion.div>
          {/* Timeline Items */}
          <div className="timeline-items">
            {coreExperiences.map((experience, index) => (
              <TimelineItem 
                key={index} 
                experience={experience} 
                index={index}
              />
            ))}
          </div>
        </div>
        {/* Beyond the Core Section */}
        <div className="beyond-core-section">
          <div className="section-header" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
            <h2 className="section-title" style={{ fontSize: '2.2rem' }}>
              Beyond the <span className="title-accent">Core</span>
            </h2>
            <div className="section-line"></div>
          </div>
          <div className="timeline-container">
            {/* Vertical Timeline Line for Beyond the Core */}
            <motion.div 
              className="timeline-line"
              // No animation for this secondary timeline, but keep structure for consistency
              style={{}}
            ></motion.div>
            <div className="timeline-items">
              {beyondCoreExperiences.map((experience, index) => (
                <TimelineItem 
                  key={index} 
                  experience={experience} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 