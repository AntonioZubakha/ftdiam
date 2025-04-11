import React, { useState, useEffect } from 'react';
import '../../styles/mission.css';

const MissionSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      id="mission" 
      className="mission-section" 
      style={{ 
        paddingTop: isMobile ? '220px' : '180px',
        paddingBottom: isMobile ? '220px' : '180px',
        backgroundColor: '#fff',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      <div className="container">
        <h2 className="mission-headline gradient-headline" style={{ 
          fontSize: isMobile ? 'var(--section-headline-mobile-size)' : 'var(--section-headline-size)',
          marginBottom: isMobile ? '1.5rem' : '2.5rem'
        }}>Our Mission</h2>
        
        <div className="mission-content" style={{ position: 'relative' }}>
          <div className="mission-logo-container" style={{ marginBottom: isMobile ? '15px' : '30px' }}>
            <img 
              src="/images/Logo.png" 
              alt="FTDiam Logo" 
              className="mission-logo" 
              style={{ width: isMobile ? '120px' : '150px' }}
            />
          </div>
          
          <div className="mission-text">
            <img 
              src="/images/quote.svg" 
              alt="" 
              aria-hidden="true"
              style={{ 
                position: "absolute",
                left: isMobile ? "0" : "-25px", 
                top: isMobile ? "0" : "-20px",
                width: isMobile ? "30px" : "50px",
                height: isMobile ? "25px" : "40px",
                opacity: 0.8
              }}
            />
            <p className="mission-description" style={{ 
              fontStyle: 'normal',
              paddingLeft: isMobile ? '30px' : '30px',
              position: 'relative',
              fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)',
              lineHeight: isMobile ? '1.5' : '1.7',
              maxWidth: isMobile ? '100%' : '80%',
              margin: '0 auto'
            }}>
            Our mission is to provide flawless technical diamonds that drive innovation across industries, from next-generation electronics to life-changing quantum solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection; 