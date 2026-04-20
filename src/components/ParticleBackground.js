import React, { useEffect, useRef } from 'react';
import './ParticleBackground.css';
import useIsMobile from '../hooks/useIsMobile';

const ParticleBackground = ({ 
  particleCount = 25, 
  color = '#febd59', 
  size = 2, 
  speed = 0.5,
  opacity = 0.3,
  interactive = true 
}) => {
  const isMobile = useIsMobile();
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
      let adjustedCount = particleCount;
      let adjustedSize = size;
      let adjustedSpeed = speed;
      let adjustedOpacity = opacity;
      let enableGlow = true;
      if (isMobile) {
        adjustedCount = Math.max(6, Math.ceil(particleCount * 0.25));
        adjustedSize = size * 1.5;
        adjustedSpeed = speed * 0.5;
        adjustedOpacity = Math.min(0.18, opacity);
        enableGlow = false;
      }
      particlesRef.current = [];
      for (let i = 0; i < adjustedCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * adjustedSpeed,
          vy: (Math.random() - 0.5) * adjustedSpeed,
          size: Math.random() * adjustedSize + 1,
          opacity: Math.random() * adjustedOpacity + 0.1,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          enableGlow
        });
      }
      // Store for use in animation
      particlesRef.current.forEach(p => p.enableGlow = enableGlow);
    };

    initParticles();

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    if (!isMobile && interactive) {
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
        if (!isMobile && interactive) {
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
        // Add glow effect only if enabled
        if (particle.enableGlow) {
          ctx.shadowBlur = particle.size * 2;
          ctx.shadowColor = color;
          ctx.fill();
        }
        ctx.restore();
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (!isMobile && interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line
  }, [particleCount, color, size, speed, opacity, interactive, isMobile]);

  return <canvas ref={canvasRef} className="particle-bg-canvas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
};

export default ParticleBackground; 