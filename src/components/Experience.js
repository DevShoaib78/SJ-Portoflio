import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Experience.css';

const FlowingParticles = () => {
  // Generate particles with upward flow - OPTIMIZED COUNT
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
    threshold: 0.3,
    triggerOnce: true // Stays visible once revealed
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
          <span className="dot-icon">{experience.icon}</span>
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
        {experience.title === "Cofounder" && experience.organization === "Hyderabad Hustlers" && (
          <div className="card-logo">
            <img src="/hhlogo.png" alt="Hyderabad Hustlers" loading="lazy" decoding="async" />
          </div>
        )}
        {experience.title === "Incubation Manager Fellow" && experience.organization === "EdVenture Park" && (
          <div className="card-logo">
            <img src="/evplogo.png" alt="EdVenture Park" loading="lazy" decoding="async" />
          </div>
        )}
        
        <div className="card-header">
          <div className="header-content">
            <h3 className="card-title">{experience.title}</h3>
            <h4 className="card-organization">{experience.organization}</h4>
          </div>
        </div>
        
        <p className="card-description">{experience.description}</p>
        
        <div className="highlights">
          {experience.highlights.map((highlight, idx) => (
            <div key={idx} className="highlight-badge">
              {highlight}
            </div>
          ))}
        </div>
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
    threshold: 0.1,
    triggerOnce: true
  });

  // Priority-ordered experiences (Cofounder, IMF Fellow, Host at top)
  const experiences = [
    {
      title: "Cofounder",
      organization: "Hyderabad Hustlers",
      description: "Co-founded and built a platform where underrated voices and hustlers of Hyderabad get amplified. Building a thriving entrepreneurial community, connecting startups, mentors, and investors across the city.",
      highlights: ["Podcast hosting & management", "On-field operations", "Content creation & strategy"],
      icon: "🚀",
      featured: true,
      priority: true
    },
    {
      title: "Incubation Manager Fellow",
      organization: "EdVenture Park",
      description: "Contributing to pre-incubation programs and providing strategic guidance to early-stage startups. Managing incubation operations, mentoring founders, and facilitating their journey from ideation to execution.",
      highlights: ["Guided several starting founders", "Involved in pre-incubation program operations", "Facilitated startup acceleration processes"],
      icon: "🎓",
      featured: true,
      priority: true
    },
    {
      title: "Host",
      organization: "Hyderabad Hustlers - Podcast & Reels",
      description: "Creating engaging content through podcast interviews and social media reels, amplifying entrepreneurial stories.",
      highlights: ["Hosted multiple founders", "300K+ social media reach", "Featured startup success stories"],
      icon: "🎙️",
      featured: true
    },
    {
      title: "X-Team Member",
      organization: "EdVenture Park",
      description: "Executive team member driving powerful strategic moves and bringing different teams together to turn big ideas into real results.",
      highlights: ["Strategic planning & execution", "Cross-team leadership", "High-impact initiative implementation"],
      icon: "⚡"
    },
    {
      title: "Head of EdTalk",
      organization: "EdVenture Park",
      description: "Organizing and hosting educational, trending and controversial talks, bringing experts to share their insights with attendees.",
      highlights: ["Hosted multiple panel discussions", "Facilitated conversational flows", "Curated thought-provoking sessions"],
      icon: "💬"
    },
    {
      title: "Founders' Friday Lead",
      organization: "EdVenture Park",
      description: "As a Founders' Friday Lead, contributed to organizing multiple Founders' Fridays events, overseeing operations and arrangements while actively networking and building meaningful connections within the founder community.",
      highlights: ["Event operations management", "Founder community networking", "Strategic event planning"],
      icon: "🤝"
    },
    {
      title: "Campus Lead Executive (CLX)",
      organization: "CLX",
      description: "As a Campus Lead Executive, primarily focused on identifying and onboarding Campus Leads at EdVenture Park, conducting interviews, providing comprehensive assistance with their activities, and continuously engaging in R&D to enhance and upscale Campus Lead operations.",
      highlights: ["Campus Lead onboarding", "Interview coordination", "R&D for CL's Excellence"],
      icon: "🔹"
    },
    {
      title: "Campus Lead",
      organization: "Sultan Uloom College",
      description: "Led campus-wide entrepreneurship initiatives and student engagement programs.",
      highlights: ["Student leadership", "Event coordination", "Academic excellence"],
      icon: "🏫"
    },
    {
      title: "Law Student",
      organization: "Currently Pursuing",
      description: "Studying law to combine legal expertise with entrepreneurial knowledge.",
      highlights: ["Legal research", "Business law focus", "Academic achievement"],
      icon: "⚖️"
    }
  ];

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
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
          <p className="section-subtitle">Building communities, empowering entrepreneurs, and creating impact</p>
        </motion.div>
        
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
            {experiences.map((experience, index) => (
              <TimelineItem 
                key={index} 
                experience={experience} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 