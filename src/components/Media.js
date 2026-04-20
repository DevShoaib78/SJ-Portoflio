import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Media.css';
import useIsMobile from '../hooks/useIsMobile';

const Media = () => {
  const isMobile = useIsMobile();
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
      id: 5,
      title: "Innovation & Leadership",
      description: "Driving change through entrepreneurship",
      thumbnail: "https://img.youtube.com/vi/nde-mpDNpsc/maxresdefault.jpg",
      embedId: "nde-mpDNpsc",
      url: "https://www.youtube.com/shorts/nde-mpDNpsc",
      duration: "0:59",
      views: "-",
      type: "video"
    },
    {
      id: 6,
      title: "Shorts: Community Highlight 1",
      description: "A quick insight from Hyderabad Hustlers community.",
      thumbnail: "https://img.youtube.com/vi/92ZpXsVz374/maxresdefault.jpg",
      embedId: "92ZpXsVz374",
      url: "https://www.youtube.com/shorts/92ZpXsVz374",
      duration: "0:59",
      views: "-",
      type: "video"
    },
    {
      id: 7,
      title: "Shorts: Community Highlight 2",
      description: "Another inspiring moment from the community.",
      thumbnail: "https://img.youtube.com/vi/SZPzwLphezU/maxresdefault.jpg",
      embedId: "SZPzwLphezU",
      url: "https://www.youtube.com/shorts/SZPzwLphezU",
      duration: "0:59",
      views: "-",
      type: "video"
    },
    {
      id: 8,
      title: "Shorts: Entrepreneurial Wisdom",
      description: "Quick tip for entrepreneurs.",
      thumbnail: "https://img.youtube.com/vi/-ogu2Bkh4as/maxresdefault.jpg",
      embedId: "-ogu2Bkh4as",
      url: "https://www.youtube.com/shorts/-ogu2Bkh4as",
      duration: "0:59",
      views: "-",
      type: "video"
    },
    {
      id: 9,
      title: "Shorts: Startup Motivation",
      description: "Motivational snippet for startups.",
      thumbnail: "https://img.youtube.com/vi/5tiRXPqP_GQ/maxresdefault.jpg",
      embedId: "5tiRXPqP_GQ",
      url: "https://www.youtube.com/shorts/5tiRXPqP_GQ",
      duration: "0:59",
      views: "-",
      type: "video"
    },
    {
      id: 10,
      title: "Shorts: Startup Journey",
      description: "A glimpse into the startup journey.",
      thumbnail: "https://img.youtube.com/vi/GicGS9D8Vv4/maxresdefault.jpg",
      embedId: "GicGS9D8Vv4",
      url: "https://www.youtube.com/shorts/GicGS9D8Vv4",
      duration: "0:59",
      views: "-",
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
      {/* Only render floating elements and heavy backgrounds if not mobile */}
      {!isMobile && (
        <>
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
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </>
      )}
      
      <div className="container">
        {isMobile ? (
          <div className="media-content">
            {/* Render all content statically for mobile, no animation */}
            {/* ...copy the same content as in the motion.div below, but as plain divs and no animation logic... */}
            <div className="section-header">
              <h2 className="media-title">Media & <span className="title-highlight">Content</span></h2>
              <div className="section-line"></div>
              <p>Amplifying Hyderabad's entrepreneurs through podcasts, reels, and conversations on Hyderabad Hustlers</p>
            </div>
            <div className="content-section">
              <h3 className="content-section-title">🎙️ <span className="youtube-red">YouTube</span> Videos</h3>
              <div className="media-grid">
                {mediaContent.map((item, index) => (
                  <div key={item.id} className="media-card">
                    <div className="video-thumbnail">
                      {playingVideos.has(item.id) ? (
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
                          <button
                            className="close-embed"
                            onClick={() => toggleVideoPlay(item.id)}
                            title="Close embedded player"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div 
                          className="thumbnail-placeholder"
                          onClick={() => toggleVideoPlay(item.id)}
                        >
                          <img
                            src={imageFallbacks[item.id] || item.thumbnail}
                            alt={`${item.title} — YouTube video thumbnail`}
                            width="480"
                            height="270"
                            onError={() => item.fallbackThumbnail && handleImageError(item.id, item.fallbackThumbnail)}
                            loading="lazy"
                            decoding="async"
                          />
                          <span className="play-icon">▶</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="instagram-section">
              <div className="instagram-content">
                <p className="instagram-text">Follow us on <span className="instagram-glow">Instagram</span>:</p>
                <div
                  className="instagram-image-wrapper"
                  onClick={() => window.open('https://www.instagram.com/hyderabad_hustlers/', '_blank', 'noopener,noreferrer')}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src="/hhinsta.webp"
                    alt="Follow Hyderabad Hustlers on Instagram"
                    className="instagram-image"
                    width="400"
                    height="400"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
            <div className="media-cta" onMouseMove={handleMouseMove}>
              <div className="cta-content">
                <h3>Follow for More <span className="content-highlight">Content</span></h3>
                <p>Stay updated with the latest entrepreneurship insights and community updates</p>
                <div className="social-links">
                  <button
                    onClick={() => window.open('https://www.youtube.com/@Hyderabad_Hustlers/featured', '_blank', 'noopener,noreferrer')}
                    className="social-link youtube"
                    aria-label="Visit Hyderabad Hustlers YouTube Channel"
                  >
                    YouTube
                  </button>
                  <button
                    onClick={() => window.open('https://www.instagram.com/hyderabad_hustlers/', '_blank', 'noopener,noreferrer')}
                    className="social-link instagram"
                    aria-label="Visit Hyderabad Hustlers Instagram Profile"
                  >
                    Instagram
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
              <motion.div className="section-line" variants={itemVariants}></motion.div>
              <motion.p
                variants={itemVariants}
              >
                Amplifying Hyderabad's entrepreneurs through podcasts, reels, and conversations on Hyderabad Hustlers
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
                    src="/hhinsta.webp"
                    alt="Follow Hyderabad Hustlers on Instagram"
                    className="instagram-image"
                    width="400"
                    height="400"
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
        )}
      </div>
    </section>
  );
};

export default Media; 