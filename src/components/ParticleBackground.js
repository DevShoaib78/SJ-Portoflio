import React, { useEffect, useRef } from 'react';
import './ParticleBackground.css';

const ParticleBackground = ({ 
  particleCount = 25, 
  color = '#febd59', 
  size = 2, 
  speed = 0.5,
  opacity = 0.3,
  interactive = true 
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles with mobile optimization
    const initParticles = () => {
      const isMobile = window.innerWidth <= 768;
      const adjustedCount = isMobile ? Math.ceil(particleCount * 0.6) : particleCount;
      
      particlesRef.current = [];
      for (let i = 0; i < adjustedCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * size + 1,
          opacity: Math.random() * opacity + 0.1,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03
        });
      }
    };

    initParticles();

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Pulse effect
        particle.pulse += particle.pulseSpeed;
        const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.1;

        // Interactive effect with mouse
        if (interactive) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.x -= dx * force * 0.01;
            particle.y -= dy * force * 0.01;
          }
        }

        // Boundary checks
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx = -particle.vx;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy = -particle.vy;
        }

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.save();
        ctx.globalAlpha = pulseOpacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = particle.size * 2;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.restore();

        // Draw connections between nearby particles (optimized)
        if (index % 2 === 0) { // Only check connections for every other particle to reduce computations
          particlesRef.current.slice(index + 1).forEach((otherParticle, otherIndex) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) { // Reduced connection distance
              ctx.save();
              ctx.globalAlpha = (80 - distance) / 80 * 0.08; // Reduced opacity
              ctx.strokeStyle = color;
              ctx.lineWidth = 0.3; // Thinner lines
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              ctx.restore();
            }
          });
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, color, size, speed, opacity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-background"
    />
  );
};

export default ParticleBackground; 