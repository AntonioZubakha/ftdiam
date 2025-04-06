import React from 'react';

const IntroSection = () => {
  // Определяем стиль с фоновым изображением
  const backgroundStyle = {
    backgroundImage: `url(/images/intro-bg.svg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 1,
    zIndex: 0
  };

  return (
    <section id="intro" className="section intro-section">
      <div style={backgroundStyle}></div>
      <div className="content-wrapper">
        <h2 className="headline">Synthetic Diamonds Redefined</h2>
        <div className="intro-text">
          <p>FTDiam utilizes a revolutionary Advanced HPHT technology to produce ultra-high-quality single-crystal diamond substrates with unprecedented purity and structural perfection. Our substrates are distinguished by exceptionally low defect concentrations, making them ideal for the most demanding quantum and semiconductor applications.</p>
        </div>

        <div className="key-features">
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-gem"></i>
            </div>
            <h3>Superior Quality</h3>
            <p>Nitrogen content as low as 5 ppb and dislocation density of 10¹ cm⁻²</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-expand-arrows-alt"></i>
            </div>
            <h3>Customizable Sizes</h3>
            <p>Available in sizes from 3×3 mm to 15×15 mm with varying thicknesses</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-atom"></i>
            </div>
            <h3>Quantum-Ready</h3>
            <p>Ideal for NV centers, quantum sensing, and quantum computing applications</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 