import backgroundImage from '../../assets/images/111.png';

const IntroSection = () => {
  // Определяем стиль с фоновым изображением
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.25,
    zIndex: 0
  };

  return (
    <section id="intro" className="section intro-section">
      <div style={backgroundStyle}></div>
      <div className="content-wrapper">
        <div className="intro-content">
          <h2 className="intro-headline animate-fade delay-1">Premium Diamond Specifications</h2>
          <p className="intro-tagline animate-fade delay-2">Setting the industry standard with exceptional quality</p>
        </div>
        <div className="specs-grid">
          <div className="spec-block animate-fade-up delay-1">
            <div className="spec-icon">
              <img src="/images/CrystalLatticeIcon.png" alt="Dislocations" />
            </div>
            <h3>Dislocations</h3>
            <p className="spec-value">10<sup>1</sup> cm<sup>-2</sup></p>
            <div className="spec-detail">Industry-leading purity</div>
          </div>
          <div className="spec-block animate-fade-up delay-2">
            <div className="spec-icon">
              <img src="/images/DiamondSizeIcon.png" alt="Size" />
            </div>
            <h3>Size</h3>
            <p className="spec-value">up to 15×15 mm</p>
            <div className="spec-detail">Perfect for all applications</div>
          </div>
          <div className="spec-block animate-fade-up delay-3">
            <div className="spec-icon">
              <img src="/images/DiamondPurityIcon.png" alt="Purity" />
            </div>
            <h3>Purity</h3>
            <p className="spec-value">≤5 ppb N</p>
            <div className="spec-detail">Ultra-low nitrogen content</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 