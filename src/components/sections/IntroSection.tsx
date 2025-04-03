const IntroSection = () => {
  return (
    <section id="intro" className="section intro-section">
      <div className="content-wrapper">
        <div className="intro-content">
          <h2 className="intro-headline">Premium Diamond Specifications</h2>
          <p className="intro-tagline">Setting the industry standard with exceptional quality</p>
        </div>
        <div className="specs-grid">
          <div className="spec-block">
            <div className="spec-icon">
              <img src="/images/CrystalLatticeIcon.png" alt="Dislocations" />
            </div>
            <h3>Dislocations</h3>
            <p>10¹ cm⁻²</p>
            <div className="spec-detail">Industry-leading purity</div>
          </div>
          <div className="spec-block">
            <div className="spec-icon">
              <img src="/images/DiamondSizeIcon.png" alt="Size" />
            </div>
            <h3>Size</h3>
            <p>up to 15x15 mm</p>
            <div className="spec-detail">Perfect for all applications</div>
          </div>
          <div className="spec-block">
            <div className="spec-icon">
              <img src="/images/DiamondPurityIcon.png" alt="Purity" />
            </div>
            <h3>Purity</h3>
            <p>≤5 ppb N</p>
            <div className="spec-detail">Ultra-low nitrogen content</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 