import React from 'react';

const QualitySection = () => {
  // Определяем стиль с фоновым изображением
  const backgroundStyle = {
    backgroundImage: `url(/images/quality-bg.svg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
    zIndex: 0
  };

  return (
    <section id="quality" className="section quality-section">
      <div style={backgroundStyle}></div>
      <div className="content-wrapper">
        <h2 className="headline">Quality Analysis</h2>
        <h3 className="quality-subheadline">Tested. Proven. Exceptional.</h3>
        <p className="section-description">
          Our diamonds undergo rigorous testing to ensure they meet the highest standards. See the evidence of our flawless quality below.
        </p>
        
        <div className="quality-methods">
          <div className="quality-method">
            <div className="quality-method-image">
              <img src="/images/photo1.jpg" alt="Diamond View" />
            </div>
            <h3>Diamond View</h3>
            <p>Shows no inclusions, no defects, dislocations &lt;10¹ cm⁻².</p>
          </div>
          
          <div className="quality-method">
            <div className="quality-method-image">
              <img src="/images/photo2.jpg" alt="Polarized Light Microscopy" />
            </div>
            <h3>Polarized Light Microscopy</h3>
            <p>Very low strain.</p>
          </div>
          
          <div className="quality-method">
            <div className="quality-method-image">
              <img src="/images/photo3.jpg" alt="FTIR" />
            </div>
            <h3>FTIR</h3>
            <p>Ultra-pure crystals.</p>
          </div>
          
          <div className="quality-method">
            <div className="quality-method-image">
              <img src="/images/photo4.jpg" alt="UV-Vis" />
            </div>
            <h3>UV-Vis</h3>
            <p>Low absorbance, premium quality.</p>
          </div>
          
          <div className="quality-method">
            <div className="quality-method-image">
              <img src="/images/photo5.jpg" alt="X-Ray Diffraction Imaging" />
            </div>
            <h3>X-Ray Diffraction Imaging</h3>
            <p>Dislocation density &lt;50 cm⁻².</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection; 