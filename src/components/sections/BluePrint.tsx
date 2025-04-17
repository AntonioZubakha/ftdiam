import React, { useEffect, useState } from 'react';

const BluePrint: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sectionStyles = {
    padding: isMobile ? '60px 0' : '120px 0',
    backgroundColor: '#fff',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center'
  };

  const containerStyles = {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '0 20px'
  };

  const gradientTextStyles = {
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  };

  const headlineStyles = {
    ...gradientTextStyles,
    fontSize: isMobile ? 'var(--h1-mobile)' : 'var(--h1-desktop)',
    textAlign: 'center' as const,
    marginBottom: isMobile ? '40px' : '80px',
    fontWeight: '600',
    width: '100%'
  };

  const contentLayoutStyles = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: isMobile ? '40px' : '60px',
    width: '100%'
  };

  const leftColumnStyles = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: '24px'
  };

  const rightColumnStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '60px',
    paddingTop: '20px'
  };

  const founderCardStyles = {
    background: '#FFFFFF',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start'
  };

  const founderImageStyles = {
    width: '100%',
    height: '240px',
    marginBottom: '24px'
  };

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  };

  const founderNameStyles = {
    ...gradientTextStyles,
    fontSize: isMobile ? 'var(--h3-mobile)' : 'var(--h3-desktop)',
    marginBottom: '8px',
    fontWeight: '600'
  };

  const founderRoleStyles = {
    ...gradientTextStyles,
    fontSize: '1.125rem',
    marginBottom: '16px',
    fontWeight: '500'
  };

  const founderBioStyles = {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#545352'
  };

  const sectionTitleStyles = {
    ...gradientTextStyles,
    fontSize: isMobile ? 'var(--h2-mobile)' : 'var(--h2-desktop)',
    marginBottom: '24px',
    fontWeight: '600'
  };

  const sectionTextStyles = {
    fontSize: '1.125rem',
    lineHeight: '1.8',
    color: '#545352'
  };

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <h1 style={headlineStyles}>Blueprint</h1>
        
        <div style={contentLayoutStyles}>
          <div style={leftColumnStyles}>
            <div style={founderCardStyles}>
              <div style={founderImageStyles}>
                <img src="/images/Dmitri.png" alt="Dmitry Semchenko" style={imageStyles} />
              </div>
              <h3 style={founderNameStyles}>Dmitry Semchenko</h3>
              <div style={founderRoleStyles}>CTO</div>
              <p style={founderBioStyles}>
                Serial entrepreneur with over 8 years in high-quality diamond material. Holder of AHPHT technology.
              </p>
            </div>

            <div style={founderCardStyles}>
              <div style={founderImageStyles}>
                <img src="/images/Dan.png" alt="Daniil Kurganov" style={imageStyles} />
              </div>
              <h3 style={founderNameStyles}>Daniil Kurganov</h3>
              <div style={founderRoleStyles}>CEO</div>
              <p style={founderBioStyles}>
                15+ years in management, technical sales and business development worldwide. Experienced leader.
              </p>
            </div>
          </div>

          <div style={rightColumnStyles}>
            <div>
              <h2 style={sectionTitleStyles}>About Us</h2>
              <p style={sectionTextStyles}>
                FTDiam is a US-based deep-tech start-up in advanced materials sector. We are revolutionizing the industry with the unique Advanced HPHT (AHPHT) technology. Since our inception, we've been dedicated to producing the highest-quality single-crystal diamond substrates for advanced applications.
              </p>
            </div>

            <div>
              <h2 style={sectionTitleStyles}>Our Mission</h2>
              <p style={sectionTextStyles}>
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