import React from 'react';

const IntroSection = () => {
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
    zIndex: 0,
    transform: 'rotate(180deg)' // Разворачиваем на 180 градусов
  };

  return (
    <section id="intro" className="section intro-section">
      <div style={backgroundStyle}></div>
      <div className="content-wrapper">
        <h2 className="headline">Premium Diamond Specifications</h2>
        <p className="section-description">Setting the industry standard with exceptional quality</p>
        
        <div className="specs-grid">
          <div className="spec-block">
            <div className="spec-icon">
              <img src="/images/DiamondPurityIcon.png" alt="Dislocations" />
            </div>
            <h3>Dislocations</h3>
            <div className="spec-value">10<sup>1</sup> cm<sup>-2</sup></div>
            <p>Industry-leading purity</p>
          </div>
          
          <div className="spec-block">
            <div className="spec-icon">
              <img src="/images/DiamondSizeIcon.png" alt="Size" />
            </div>
            <h3>Size</h3>
            <div className="spec-value">up to 15×15 mm</div>
            <p>Perfect for all applications</p>
          </div>
          
          <div className="spec-block">
            <div className="spec-icon">
              <img src="/images/CrystalLatticeIcon.png" alt="Purity" />
            </div>
            <h3>Purity</h3>
            <div className="spec-value">≤5 ppb N</div>
            <p>Ultra-low nitrogen content</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 