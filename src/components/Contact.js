import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MobileOptimizedParticles from './MobileOptimizedParticles';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiry: '',
    message: ''
  });

  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.inquiry || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Format message for WhatsApp
    const formatWhatsAppMessage = () => {
      // Convert inquiry value to readable text
      const inquiryTypes = {
        'speaking': 'Speaking Engagement',
        'partnership': 'Partnership',
        'collaboration': 'Strategic Collaboration',
        'media': 'Media/Podcast',
        'community': 'Community Building',
        'other': 'Other'
      };
      
      let message = "Hi! I'd like to connect with you. Here are my details:\n\n";
      message += `*Name:* ${formData.name}\n`;
      message += `*Email:* ${formData.email}\n`;
      if (formData.organization) {
        message += `*Organization:* ${formData.organization}\n`;
      }
      message += `*Type of Inquiry:* ${inquiryTypes[formData.inquiry] || formData.inquiry}\n\n`;
      message += `*Message:* ${formData.message}`;
      
      return encodeURIComponent(message);
    };
    
    // Redirect to WhatsApp
    const whatsappNumber = "916309498607";
    const whatsappMessage = formatWhatsAppMessage();
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    window.open(whatsappURL, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      organization: '',
      inquiry: '',
      message: ''
    });
  };

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

  return (
    <section className="contact section" id="contact">
      {/* Floating particles - Mobile Optimized */}
      <div className="contact-particles">
        <MobileOptimizedParticles mobileReduceFactor={0.6}>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </MobileOptimizedParticles>
      </div>
      
      <div className="container">
        <motion.div
          className="contact-content"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2>Let's <span className="text-gold">Connect</span></h2>
            <div className="section-line"></div>
            <p>Ready to collaborate, innovate, or build something amazing together?</p>
          </motion.div>

          <motion.div className="contact-grid" variants={containerVariants}>
            <motion.div className="contact-info" variants={itemVariants}>
              <div className="info-card">
                <h3>Professional Inquiries</h3>
                <p>
                  Whether you're looking for strategic partnerships, speaking engagements, 
                  or collaboration on entrepreneurial initiatives, 
                  I'd love to hear from you.
                </p>
              </div>

              <div className="info-items">
                <motion.div className="info-item" variants={itemVariants}>
                  <div className="info-icon">🎙️</div>
                  <div className="info-text">
                    <h4>Speaking Engagements</h4>
                    <p>Keynotes and panel discussions on entrepreneurship</p>
                  </div>
                </motion.div>

                <motion.div className="info-item" variants={itemVariants}>
                  <div className="info-icon">🤝</div>
                  <div className="info-text">
                    <h4>Community Building</h4>
                    <p>Collaborative initiatives and partnerships</p>
                  </div>
                </motion.div>

                <motion.div className="info-item" variants={itemVariants}>
                  <div className="info-icon">💡</div>
                  <div className="info-text">
                    <h4>Strategic Collaboration</h4>
                    <p>Innovative partnerships and entrepreneurial ventures</p>
                  </div>
                </motion.div>
              </div>

              <motion.div className="social-contact" variants={itemVariants}>
                <h4>Connect on Social</h4>
                <div className="social-icons">
                  <a href="https://www.linkedin.com/in/sayeedajabri/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                    💼 LinkedIn
                  </a>
                  <a href="https://www.instagram.com/sayeeda_jabri" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                    📱 Instagram
                  </a>
                  <a href="https://x.com/Sayeeda_Jabri" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                    🐦 Twitter
                  </a>
                  <a href="mailto:sayeedajabri2074@gmail.com" className="social-icon email">
                    ✉️ Email
                  </a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="contact-form-wrapper" variants={itemVariants}>
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Send a Message</h3>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="organization"
                    placeholder="Organization (Optional)"
                    value={formData.organization}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <select
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Type of Inquiry</option>
                    <option value="speaking">Speaking Engagement</option>
                    <option value="partnership">Partnership</option>
                    <option value="collaboration">Strategic Collaboration</option>
                    <option value="media">Media/Podcast</option>
                    <option value="community">Community Building</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Tell me about your project, idea, or how we can collaborate..."
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn submit-btn">
                  Send Message
                </button>
              </form>
            </motion.div>
          </motion.div>

          <motion.div className="cta-section" variants={itemVariants}>
            <div className="cta-card">
              <h3>Ready to Make an Impact?</h3>
              <p>
                Join me in building the future of entrepreneurship and innovation. 
                Let's create opportunities that matter.
              </p>
              <a 
                href="https://wa.me/916309498607?text=Hi%20Sayeeda!%20I'd%20like%20to%20start%20a%20conversation%20with%20you." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-large"
              >
                Start a Conversation
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 