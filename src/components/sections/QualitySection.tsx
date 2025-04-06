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
    opacity: 1,
    zIndex: 0
  };

  return (
    <section id="quality" className="section quality-section">
      <div style={backgroundStyle}></div>
      <div className="content-wrapper">
        <h2 className="headline">Quality Analysis</h2>
        <p className="section-description">We employ advanced diagnostic methods to ensure the highest quality of our diamond substrates. Each crystal undergoes rigorous testing and characterization.</p>
        
        <div className="quality-methods">
          <div className="quality-method">
            <div className="quality-method-icon">
              <i className="fas fa-microscope"></i>
            </div>
            <h3>Optical Characterization</h3>
            <p>High-resolution optical microscopy with cross-polarized light for defect and strain analysis. Our inspection process can identify imperfections down to 1μm in size.</p>
          </div>
          
          <div className="quality-method">
            <div className="quality-method-icon">
              <i className="fas fa-atom"></i>
            </div>
            <h3>Spectroscopic Analysis</h3>
            <p>Photoluminescence and FTIR spectroscopy for precise measurement of nitrogen and other impurity concentrations with sensitivity below 1 ppb.</p>
          </div>
          
          <div className="quality-method">
            <div className="quality-method-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>X-Ray Topography</h3>
            <p>Identification of crystal structure, orientation, and dislocation density. Allows precise mapping of crystalline defects and growth sectors.</p>
          </div>
          
          <div className="quality-method">
            <div className="quality-method-icon">
              <i className="fas fa-ruler-combined"></i>
            </div>
            <h3>Surface Profilometry</h3>
            <p>Atomic Force Microscopy (AFM) for surface roughness characterization with sub-nanometer precision, ensuring specification compliance.</p>
          </div>
        </div>
        
        <div className="quality-standards">
          <h3>Our Quality Standards</h3>
          <div className="standards-grid">
            <div className="standard-item">
              <div className="standard-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <p><strong>100% Inspection:</strong> Every single crystal undergoes all quality tests</p>
            </div>
            
            <div className="standard-item">
              <div className="standard-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <p><strong>Certification:</strong> Detailed quality report provided with each substrate</p>
            </div>
            
            <div className="standard-item">
              <div className="standard-icon">
                <i className="fas fa-sync-alt"></i>
              </div>
              <p><strong>Traceability:</strong> Unique ID and complete growth and processing history</p>
            </div>
            
            <div className="standard-item">
              <div className="standard-icon">
                <i className="fas fa-thumbs-up"></i>
              </div>
              <p><strong>Satisfaction Guarantee:</strong> Immediate replacement for any non-conforming product</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection; 