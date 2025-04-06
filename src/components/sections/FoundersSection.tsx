import React from 'react';

const FoundersSection = () => {
  // Определяем стиль с фоновым изображением
  const backgroundStyle = {
    backgroundImage: `url(/images/background.svg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
    zIndex: 0
  };

  return (
    <section id="founders" className="section founders-section">
      <div style={backgroundStyle}></div>
      <div className="content-wrapper">
        <h2 className="headline">Founders</h2>
        <p className="section-description">Our company is led by experienced industry experts with a shared passion for diamond innovation.</p>
        
        <div className="founders-grid">
          <div className="founder-card">
            <div className="founder-image">
              <img src="/images/Dmitri.jpg" alt="Dmitry Semchenko" />
            </div>
            <h3>Dmitry Semchenko, CTO</h3>
            <p>Serial entrepreneur with over 8 years in high-quality diamond material. Holder of AHPHT technology.</p>
          </div>
          
          <div className="founder-card">
            <div className="founder-image">
              <img src="/images/Dan.jpg" alt="Daniil Kurganov" />
            </div>
            <h3>Daniil Kurganov, CEO</h3>
            <p>15+ years in management, technical sales and business development worldwide.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection; 