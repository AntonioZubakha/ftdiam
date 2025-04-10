import React, { useState, useEffect } from 'react';

const TechnologySection: React.FC = () => {
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
    <section id="technology" className="technology-section" style={{ 
      backgroundColor: '#fff',
      padding: isMobile ? '40px 0' : '180px 0 280px 0',  // Значительно уменьшаем отступы для мобильных
      transition: 'padding 0.3s ease'
    }}>
      <div className="technology-container">
        <div className="technology-headline-container">
          <h2 className="technology-headline gradient-headline">Advanced HPHT Technology</h2>
        </div>
        
        <div className="technology-content" style={{ marginTop: isMobile ? '30px' : '60px' }}>
          <div className="advantages-grid" style={{ 
            maxWidth: '1100px', 
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '20px' : '30px'
          }}>
            <div className="advantage-card" style={{ padding: isMobile ? '15px' : '20px' }}>
              <div className="advantage-icon">
                <i className="fas fa-arrow-trend-down" style={{
                  fontSize: isMobile ? '40px' : '60px',
                  marginBottom: isMobile ? '10px' : '15px',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}></i>
              </div>
              <h3 className="advantage-title gradient-subheadline" style={{ 
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                marginBottom: isMobile ? '5px' : '10px'
              }}>Ultra low dislocations number (10¹ cm⁻²)</h3>
            </div>
            
            <div className="advantage-card" style={{ padding: isMobile ? '15px' : '20px' }}>
              <div className="advantage-icon">
                <i className="fas fa-expand" style={{
                  fontSize: isMobile ? '40px' : '60px',
                  marginBottom: isMobile ? '10px' : '15px',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}></i>
              </div>
              <h3 className="advantage-title gradient-subheadline" style={{ 
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                marginBottom: isMobile ? '5px' : '10px'
              }}>Record-size high-quality substrates</h3>
            </div>
            
            <div className="advantage-card" style={{ padding: isMobile ? '15px' : '20px' }}>
              <div className="advantage-icon">
                <i className="fas fa-atom" style={{
                  fontSize: isMobile ? '40px' : '60px',
                  marginBottom: isMobile ? '10px' : '15px',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}></i>
              </div>
              <h3 className="advantage-title gradient-subheadline" style={{ 
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                marginBottom: isMobile ? '5px' : '10px'
              }}>Very low strain and zero-Nitrogen level</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection; 