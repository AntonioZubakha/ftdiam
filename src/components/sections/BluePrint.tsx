import React, { useEffect, useState } from 'react';
import '../../styles/bluePrint.css';

const BluePrint: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Common styles consistent with other components
  const headlineStyles = {
    fontSize: isMobile ? 'var(--section-headline-mobile-size)' : 'var(--section-headline-size)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    textAlign: 'center' as const,
    marginBottom: isMobile ? '1.5rem' : '2rem',
    position: 'relative' as const,
    fontWeight: '600' as const,
    letterSpacing: '0.5px',
    display: 'block',
    width: '100%'
  };

  // Common styles for block titles (About Us and Our Mission)
  const blockTitleStyles = {
    fontSize: isMobile ? 'var(--h3-mobile)' : 'var(--h3-desktop)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    marginBottom: '1rem',
    fontWeight: 'var(--font-weight-semibold)' as const,
    display: 'inline-block',
    width: isMobile ? '100%' : 'auto',
    textAlign: isMobile ? 'center' as const : 'left' as const
  };

  // Стили для контейнеров фотографий
  const founderPhotoContainerStyle = {
    width: '200px',
    height: '220px',
    marginBottom: '15px',
    display: 'flex' as const,
    alignItems: 'flex-end' as const,
    justifyContent: 'center' as const,
    overflow: 'hidden'
  };

  // Стили для фотографий
  const founderImageStyle = {
    width: '200px',
    objectFit: 'contain' as const,
    objectPosition: 'bottom' as const
  };
  
  // Стили для сетки основателей
  const founderGridStyle = {
    display: 'flex' as const,
    flexDirection: isMobile ? 'column' as const : 'row' as const,
    justifyContent: 'center' as const,
    gap: isMobile ? '30px' : '60px',
    flexWrap: isMobile ? 'wrap' as const : 'nowrap' as const,
    width: '100%',
    marginTop: '20px',
    alignItems: isMobile ? 'center' as const : 'flex-start' as const
  };

  return (
    <section className="blueprint-section" id="blueprint">
      <div className="blueprint-container">
        <h2 style={headlineStyles}>Blueprint</h2>
        
        <div className="blueprint-content-layout">
          <div className="founder-column">
            <div className="founder-grid" style={founderGridStyle}>
              <div className="founder-block">
                <div style={founderPhotoContainerStyle}>
                  <img 
                    src="/images/Dmitri.png" 
                    alt="Dmitry Semchenko" 
                    style={founderImageStyle}
                  />
                </div>
                <div className="founder-details">
                  <h3 className="founder-name">Dmitry Semchenko</h3>
                  <div className="founder-title">CTO</div>
                  <p className="founder-bio">
                  Technical expert with 8+ years in in diamond substrates business and R&D. Holder of AHPHT technology.
                  </p>
                </div>
              </div>

              <div className="founder-block">
                <div style={founderPhotoContainerStyle}>
                  <img 
                    src="/images/Dan.png" 
                    alt="Daniil Kurganov" 
                    style={founderImageStyle}
                  />
                </div>
                <div className="founder-details">
                  <h3 className="founder-name">Daniil Kurganov</h3>
                  <div className="founder-title">CEO</div>
                  <p className="founder-bio">
                  15+ years in management, technical sales and business development worldwide. Serial enterpreneur.

                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-column">
            <div className="info-block about-block">
              <h3 style={blockTitleStyles}>About Us</h3>
              <div className="block-content">
                <p>
                  FTDiam is a US-based deep-tech start-up in advanced materials sector. We are revolutionizing the industry with the unique Advanced HPHT (AHPHT) technology. Since our inception, we've been dedicated to producing the highest-quality single-crystal diamond substrates for cutting-edge applications.
                </p>
              </div>
            </div>

            <div className="info-block history-block">
              <h3 style={blockTitleStyles}>Our Mission</h3>
              <div className="block-content">
                <p>
                  Our mission is to provide flawless technical diamonds that drive innovation across industries, from next-generation electronics to life-changing quantum solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BluePrint; 