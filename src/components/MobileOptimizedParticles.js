import React, { useState, useEffect } from 'react';

const MobileOptimizedParticles = ({ children, mobileReduceFactor = 0.5 }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile && React.Children.count(children) > 1) {
    const childrenArray = React.Children.toArray(children);
    const mobileCount = Math.ceil(childrenArray.length * mobileReduceFactor);
    return <>{childrenArray.slice(0, mobileCount)}</>;
  }

  return <>{children}</>;
};

export default MobileOptimizedParticles; 