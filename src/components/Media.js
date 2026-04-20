import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Media.css';

const Media = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [imageFallbacks, setImageFallbacks] = useState({});
  const [playingVideos, setPlayingVideos] = useState(new Set());

  const handleImageError = (itemId, fallbackUrl) => {
    setImageFallbacks(prev => ({
      ...prev,
      [itemId]: fallbackUrl
    }));
  };

  const toggleVideoPlay = (videoId) => {
    setPlayingVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const openYouTubeVideo = (url, e) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Mouse tracking for spotlight effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  // YouTube videos only - Instagram content removed
  const mediaContent = [
    {
      id: 1,
      title: "Hyderabad Hustlers YouTube Content",
      description: "Entrepreneurship insights and community building",
      thumbnail: "https://img.youtube.com/vi/5QiDSWN3T-w/maxresdefault.jpg",
      embedId: "5QiDSWN3T-w",
      url: "https://www.youtube.com/watch?v=5QiDSWN3T-w",
      duration: "12:34",
      views: "1.2K",
      type: "video"
    },
    {
      id: 2,
      title: "Business Development Strategies",
      description: "Building successful entrepreneurial ventures",
      thumbnail: "https://img.youtube.com/vi/b3VB6imWJ-A/maxresdefault.jpg",
      embedId: "b3VB6imWJ-A",
      url: "https://www.youtube.com/watch?v=b3VB6imWJ-A",
      duration: "15:42",
      views: "2.1K",
      type: "video"
    },
    {
      id: 3,
      title: "Startup Ecosystem Discussion",
      description: "Innovation and growth in the startup world",
      thumbnail: "https://img.youtube.com/vi/93liZm9670g/maxresdefault.jpg",
      embedId: "93liZm9670g",
      url: "https://www.youtube.com/watch?v=93liZm9670g",
      duration: "18:20",
      views: "3.5K",
      type: "video"
    },
    {
      id: 4,
      title: "Community Building Insights",
      description: "Creating strong entrepreneurial networks",
      thumbnail: "https://img.youtube.com/vi/6NwUMEbNfnk/maxresdefault.jpg",
      embedId: "6NwUMEbNfnk",
      url: "https://www.youtube.com/watch?v=6NwUMEbNfnk",
      duration: "21:15",
      views: "1.8K",
      type: "video"
    },
    {
      id: 5,
      title: "Innovation & Leadership",
      description: "Driving change through entrepreneurship",
      thumbnail: "https://img.youtube.com/vi/0OHbMhp2I80/maxresdefault.jpg",
      embedId: "0OHbMhp2I80",
      url: "https://www.youtube.com/watch?v=0OHbMhp2I80",
      duration: "14:28",
      views: "2.7K",
      type: "video"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="media section" id="media">
      {/* Floating Background Elements - Enhanced with More Particles */}
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      
      <div className="container">
        <motion.div
          className="media-content"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <motion.h2 
              className="media-title"
              variants={itemVariants}
            >
              Media & <span className="title-highlight">Content</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
            >
              Sharing knowledge and building connections through various media platforms
            </motion.p>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <motion.h3 
              className="content-section-title"
              variants={itemVariants}
            >
              🎙️ <span className="youtube-red">YouTube</span> Videos
            </motion.h3>

            <motion.div 
              className="media-grid"
              variants={containerVariants}
            >
              {mediaContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="media-card"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="video-thumbnail">
                    {playingVideos.has(item.id) ? (
                      // YouTube Embed Player - Lazy Loaded
                      <div className="youtube-embed-container">
                        <iframe
                          src={`https://www.youtube.com/embed/${item.embedId}?autoplay=1&rel=0&modestbranding=1`}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="youtube-iframe"
                          loading="lazy"
                        ></iframe>
                        <motion.button
                          className="youtube-logo-link"
                          onClick={(e) => openYouTubeVideo(item.url, e)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Open on YouTube"
                        >
                          <svg viewBox="0 0 24 24" className="youtube-icon">
                            <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </motion.button>
                        <motion.button
                          className="close-embed"
                          onClick={() => toggleVideoPlay(item.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Close embedded player"
                        >
                          ✕
                        </motion.button>
                      </div>
                    ) : (
                      // Thumbnail with Play Button
                      <div 
                        className="thumbnail-placeholder"
                        onClick={() => toggleVideoPlay(item.id)}
                      >
                      <img
                        src={imageFallbacks[item.id] || item.thumbnail}
                        alt={`${item.title} thumbnail`}
                        onError={() => item.fallbackThumbnail && handleImageError(item.id, item.fallbackThumbnail)}
                        loading="lazy"
                        decoding="async"
                      />
                      <motion.span 
                        className="play-icon"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        ▶
                      </motion.span>
                        <motion.button
                          className="youtube-logo-link youtube-logo-overlay"
                          onClick={(e) => openYouTubeVideo(item.url, e)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Open on YouTube"
                        >
                          <svg viewBox="0 0 24 24" className="youtube-icon">
                            <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </motion.button>
                    </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* New Instagram Follow Section */}
          <motion.div className="instagram-section" variants={itemVariants}>
            <motion.div 
              className="instagram-content"
              variants={itemVariants}
            >
              <motion.p
                className="instagram-text"
                variants={itemVariants}
              >
                Follow us on <span className="instagram-glow">Instagram</span>:
              </motion.p>
              <motion.div
                className="instagram-image-wrapper"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.instagram.com/hyderabad_hustlers/', '_blank', 'noopener,noreferrer')}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src="/hhinsta.png"
                  alt="Follow Hyderabad Hustlers on Instagram"
                  className="instagram-image"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="media-cta" 
            variants={itemVariants}
            onMouseMove={handleMouseMove}
          >
            <motion.div 
              className="cta-content"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                variants={itemVariants}
              >
                Follow for More <span className="content-highlight">Content</span>
              </motion.h3>
              <motion.p
                variants={itemVariants}
              >
                Stay updated with the latest entrepreneurship insights and community updates
              </motion.p>
              <motion.div 
                className="social-links"
                variants={containerVariants}
              >
                <motion.button 
                  onClick={() => window.open('https://www.youtube.com/@Hyderabad_Hustlers/featured', '_blank', 'noopener,noreferrer')}
                  className="social-link youtube"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Visit Hyderabad Hustlers YouTube Channel"
                >
                  YouTube
                </motion.button>
                <motion.button 
                  onClick={() => window.open('https://www.instagram.com/hyderabad_hustlers/', '_blank', 'noopener,noreferrer')}
                  className="social-link instagram"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Visit Hyderabad Hustlers Instagram Profile"
                >
                  Instagram
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Media; 