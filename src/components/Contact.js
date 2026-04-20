import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import MobileOptimizedParticles from './MobileOptimizedParticles';
import './Contact.css';
import useIsMobile from '../hooks/useIsMobile';

const Contact = () => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiry: '',
    message: ''
  });
  const [dmModalOpen, setDmModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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
    setDmModalOpen(true);
  };

  const getDMMessage = () => {
    return (
      `Hi Sayeeda! I'd like to connect with you. Here are my details:\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      (formData.organization ? `Organization: ${formData.organization}\n` : '') +
      `Inquiry: ${formData.inquiry}\n` +
      `Message: ${formData.message}`
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getDMMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoToInstagram = () => {
    window.open('https://www.instagram.com/sayeeda_jabri', '_blank');
    setDmModalOpen(false);
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

  // Modal component using portal for true centering
  const DMHelperModal = () =>
    ReactDOM.createPortal(
      <div className="dm-helper-modal-fixed">
        <div className="dm-helper-modal-backdrop" onClick={() => setDmModalOpen(false)}></div>
        <div className="dm-helper-modal-content">
          <h4>Copy Your Message</h4>
          <textarea
            readOnly
            value={getDMMessage()}
            rows={7}
            className="dm-helper-textarea"
          />
          <div className="dm-helper-btn-group">
            <button className="btn" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button className="btn" onClick={handleGoToInstagram}>
              Go to Instagram DM
            </button>
          </div>
        </div>
      </div>,
      document.body
    );

  // If using framer-motion or similar for entrance animation, set delay to 0 on mobile
  const animationDelay = isMobile ? 0 : 0.8;

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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: animationDelay }}
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
                  <svg
                    className="info-item-bg-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="8" y1="22" x2="16" y2="22" />
                  </svg>
                  <div className="info-text">
                    <h4>Speaking Engagements</h4>
                    <p>Keynotes and panel discussions on entrepreneurship</p>
                  </div>
                </motion.div>

                <motion.div className="info-item" variants={itemVariants}>
                  <svg
                    className="info-item-bg-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <div className="info-text">
                    <h4>Community Building</h4>
                    <p>Collaborative initiatives and partnerships</p>
                  </div>
                </motion.div>

                <motion.div className="info-item" variants={itemVariants}>
                  <svg
                    className="info-item-bg-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 2a7 7 0 0 0-4 12.7c.7.5 1 1.3 1 2.1V18h6v-1.2c0-.8.3-1.6 1-2.1A7 7 0 0 0 12 2z" />
                    <line x1="9" y1="21" x2="15" y2="21" />
                    <line x1="10" y1="18" x2="14" y2="18" />
                    <path d="M12 6v6" />
                    <path d="M9.5 9.5l5 0" />
                  </svg>
                  <div className="info-text">
                    <h4>Strategic Collaboration</h4>
                    <p>Innovative partnerships and entrepreneurial ventures</p>
                  </div>
                </motion.div>
              </div>

              <motion.div className="social-contact" variants={itemVariants}>
                <h4>Connect on Social</h4>
                <div className="social-icons">
                  <a
                    href="https://www.linkedin.com/in/sayeedajabri/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Connect on LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/sayeeda_jabri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Follow on Instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/Sayeeda_Jabri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon social-icon--x"
                    aria-label="Follow on X (Twitter)"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:sayeedajabri2074@gmail.com"
                    className="social-icon"
                    aria-label="Send an email"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
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
              {dmModalOpen && <DMHelperModal />}
            </motion.div>
          </motion.div>

          {/* CTA Section - Recoded for Consistency and Responsiveness */}
          <motion.div 
            className="cta-section"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="cta-card recoded-impact-cta">
              <h3 className="cta-title">Read to make an impact?</h3>
              <p className="cta-message">
                Whether you want to collaborate, share your story, or just say hi, let's connect and create something meaningful together!
              </p>
              <a 
                href="https://www.instagram.com/sayeeda_jabri" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-large cta-btn"
                aria-label="Start a conversation on Instagram"
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