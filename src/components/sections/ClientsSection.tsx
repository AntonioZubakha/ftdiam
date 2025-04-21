import React, { useEffect, useState, useRef } from 'react';
import '../../styles/clients.css';

const ClientsSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Client logos array - keeping the same image paths
  const clientLogos = [
    { logo: '/images/client1.png', alt: 'Applied Diamond, Inc.' },
    { logo: '/images/client2.png', alt: 'Michigan State University' },
    { logo: '/images/client3.jpg', alt: 'Argonne National Laboratory' },
    { logo: '/images/client4.jpg', alt: 'ESRF' },
    { logo: '/images/client5.png', alt: 'HiQuTe Diamond' },
    { logo: '/images/client6.png', alt: 'LSPM-CNRS' },
    { logo: '/images/client7.jpg', alt: 'DIAMFAB' },
    { logo: '/images/client8.jpg', alt: 'UC Santa Barbara' }
  ];
  
  // Duplicate the logos array to create a seamless loop effect
  const allLogos = [...clientLogos, ...clientLogos];
  
  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    
    // Check if the screen is mobile-sized
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <section className="clients-section" id="clients">
      <div className="section-container">
        <h2 className="section-title">Our Clients</h2>
        
        <div className="carousel-container">
          <div 
            className="logo-carousel" 
            ref={carouselRef}
            style={{ 
              animationPlayState: prefersReducedMotion ? 'paused' : 'running',
              gap: isMobile ? '25px' : 'inherit'
            }}
          >
            {allLogos.map((client, index) => (
              <div key={index} className="logo-item">
                <img 
                  src={client.logo} 
                  alt={client.alt} 
                  className="client-logo" 
                  style={{
                    maxWidth: isMobile ? '95%' : '90%',
                    maxHeight: isMobile ? '95%' : '90%'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection; 