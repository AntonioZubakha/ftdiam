import React from 'react';
import '../../styles/quality.css';

const QualitySection: React.FC = () => {
  return (
    <section id="quality" className="quality-section" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="quality-container">
        <h2 className="quality-headline gradient-headline">Quality Analysis</h2>
        <div className="text-center">
          <h3 className="quality-subheadline">Tested. Proven. Exceptional.</h3>
        </div>
        <p className="quality-description">
          Our diamonds undergo rigorous testing to ensure they meet the highest standards. 
          See the evidence of our flawless quality below.
        </p>

        <div className="quality-grid">
          {/* First row - 3 items */}
          <div className="quality-row">
            <div className="quality-item">
              <div className="quality-image-container">
                <img src="/images/photo1.jpg" alt="Diamond View" className="quality-image" />
              </div>
              <h4 className="quality-item-title">Diamond View</h4>
              <p className="quality-item-description">
                Shows no inclusions, no defects, dislocations &lt;10¹ cm⁻².
              </p>
            </div>

            <div className="quality-item">
              <div className="quality-image-container">
                <img src="/images/photo2.jpg" alt="Polarized Light Microscopy" className="quality-image" />
              </div>
              <h4 className="quality-item-title">Polarized Light Microscopy</h4>
              <p className="quality-item-description">Very low strain.</p>
            </div>

            <div className="quality-item">
              <div className="quality-image-container">
                <img src="/images/photo5.jpg" alt="X-Ray Diffraction Imaging" className="quality-image" />
              </div>
              <h4 className="quality-item-title">X-Ray Diffraction Imaging</h4>
              <p className="quality-item-description">Dislocation density &lt;50 cm⁻².</p>
            </div>
          </div>

          {/* Second row - 2 items */}
          <div className="quality-row quality-row-graphs">
            <div className="quality-item">
              <div className="quality-image-container">
                <img src="/images/photo3.jpg" alt="FTIR" className="quality-image" />
              </div>
              <h4 className="quality-item-title">FTIR</h4>
              <p className="quality-item-description">Ultra-pure crystals.</p>
            </div>

            <div className="quality-item">
              <div className="quality-image-container">
                <img src="/images/photo4.jpg" alt="UV-Vis" className="quality-image" />
              </div>
              <h4 className="quality-item-title">UV-Vis</h4>
              <p className="quality-item-description">Low absorbance, premium quality.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection; 