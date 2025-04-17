import React, { useEffect, useState } from 'react';

const BluePrint: React.FC = () => {
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

  // Используем только inline-стили без зависимости от внешних CSS
  const sectionStyles = {
    padding: isMobile ? '40px 0 20px 0' : '120px 0 60px 0',
    backgroundColor: '#fff',
    position: 'relative' as const,
    marginBottom: '0',
    marginTop: '0',
    width: '100%',
    overflow: 'hidden'
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '0 15px' : '0 20px'
  };

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
    display: 'inline-block'
  };

  const newLayoutStyles = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: isMobile ? '15px' : '30px',
    width: '100%',
    margin: isMobile ? '10px auto 0' : '20px auto 0',
    position: 'relative' as const,
    maxWidth: '1200px'
  };

  const columnStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    backgroundColor: '#fff',
    marginBottom: isMobile ? '15px' : '0'
  };

  const blockStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '0',
    marginTop: '20px'
  };

  const centeredBlockTitleStyles = {
    fontSize: 'var(--h3-desktop)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    fontWeight: '600' as const,
    marginBottom: '40px',
    textAlign: 'center' as const,
    width: '100%'
  };

  const textContainerStyles = {
    width: '100%',
    padding: isMobile ? '0 5%' : '0 12.5%',
    textAlign: 'left' as const
  };

  const textStyles = {
    fontSize: isMobile ? '1rem' : '1.1rem',
    lineHeight: '1.6',
    color: '#555'
  };

  const founderBlockStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: isMobile ? '15px 15px' : '40px 30px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  const founderPhotoStyles = {
    width: '100%',
    height: isMobile ? '180px' : '220px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const
  };

  const founderNameStyles = {
    fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    margin: '0 0 5px 0',
    fontWeight: '600' as const,
    textAlign: 'center' as const
  };

  const roleStyles = {
    fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    fontWeight: '600' as const,
    marginBottom: '10px',
    textAlign: 'center' as const
  };

  const founderBioStyles = {
    fontSize: isMobile ? '1rem' : '1.1rem',
    lineHeight: '1.6',
    textAlign: 'center' as const,
    color: '#555'
  };

  const ceoPhotoStyles = {
    width: '90%',
    height: '100%',
    objectFit: 'contain' as const,
    objectPosition: 'bottom'
  };

  const ctoPhotoStyles = {
    width: '80%',
    height: '100%',
    objectFit: 'contain' as const,
    objectPosition: 'bottom'
  };

  return (
    <section id="blueprint" style={sectionStyles}>
      <div style={containerStyles}>
        <div style={{textAlign: 'center'}}>
          <h2 style={headlineStyles}>Our Blueprint</h2>
        </div>
      </div>
      
      <div style={newLayoutStyles}>
        <div style={columnStyles}>
          <div style={blockStyles}>
            <h3 style={centeredBlockTitleStyles}>About Us</h3>
            <div style={textContainerStyles}>
              <p style={textStyles}>
                FTDiam is a US-based deep-tech start-up in advanced materials sector. We are revolutionizing the industry with the unique Advanced HPHT (AHPHT) technology. Since our inception, we've been dedicated to producing the highest-quality single-crystal diamond substrates for advanced applications.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '15px' : '0' }}>
            <div style={founderBlockStyles}>
              <div style={founderPhotoStyles}>
                <img src="/images/Dmitri.png" alt="Dmitry Semchenko" style={ctoPhotoStyles} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const }}>
                <h3 style={founderNameStyles}>Dmitry Semchenko</h3>
                <div style={roleStyles}>CTO</div>
                <p style={founderBioStyles}>
                  Serial entrepreneur with over 8 years in high-quality diamond material. Holder of AHPHT technology.
                </p>
              </div>
            </div>
            
            <div style={founderBlockStyles}>
              <div style={founderPhotoStyles}>
                <img src="/images/Dan.png" alt="Daniil Kurganov" style={ceoPhotoStyles} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const }}>
                <h3 style={founderNameStyles}>Daniil Kurganov</h3>
                <div style={roleStyles}>CEO</div>
                <p style={founderBioStyles}>
                  15+ years in management, technical sales and business development worldwide. Experienced leader.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={columnStyles}>
          <div style={blockStyles}>
            <h3 style={centeredBlockTitleStyles}>Our Mission</h3>
            <div style={textContainerStyles}>
              <p style={textStyles}>
                Our mission is to provide flawless technical diamonds that drive innovation across industries, from next-generation electronics to life-changing quantum solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BluePrint; 