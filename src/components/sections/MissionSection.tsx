import React from 'react';

const MissionSection: React.FC = () => {
  // Определяем стиль для белого фона
  const backgroundStyle = {
    backgroundColor: '#fff',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  };

  return (
    <section id="mission" className="section mission-section">
      <div style={backgroundStyle}></div>
      <div className="content-wrapper">
        <h2 className="headline">Our Mission</h2>
        <div className="mission-container">
          <div className="mission-logo-container">
            <img src="/images/Logo.png" alt="FTDiam Logo" className="mission-logo" />
          </div>
          <div className="mission-content">
            <div className="quote-mark">&#8220;</div>
            <p className="section-description">
              Our vision is to provide CVD diamond Made-in-Germany with NV centers for 
              applications in magnetic imaging, nano-NMR and quantum computing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection; 