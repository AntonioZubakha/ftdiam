import { useState } from 'react';

const QualitySection = () => {
  const [activeTab, setActiveTab] = useState('purity');
  
  return (
    <section id="quality" className="section quality-section">
      <div className="content-wrapper">
        <h2 className="headline">Quality Analysis</h2>
        <p className="section-description">
          Every diamond substrate we produce undergoes rigorous quality analysis to ensure it meets our
          exceptional standards. Our comprehensive testing methodology ensures that only the
          highest quality crystals reach our customers.
        </p>
        
        <div className="quality-features">
          <div className="quality-feature">
            <div className="quality-icon">
              <i className="fas fa-atom fa-3x"></i>
            </div>
            <h3>Crystal Lattice</h3>
            <p>Through X-ray topography and birefringence imaging, we verify the diamond's crystal lattice structure meets our exceptional standards.</p>
          </div>
          
          <div className="quality-feature">
            <div className="quality-icon">
              <i className="fas fa-tachometer-alt fa-3x"></i>
            </div>
            <h3>Dislocation Density</h3>
            <p>Our advanced AHPHT method achieves industry-leading low dislocation densities, measured using specialized etching techniques.</p>
          </div>
          
          <div className="quality-feature">
            <div className="quality-icon">
              <i className="fas fa-vial fa-3x"></i>
            </div>
            <h3>Purity</h3>
            <p>Utilizing FTIR spectroscopy, we ensure ultra-low nitrogen content below 5 ppb, critical for quantum and semiconductor applications.</p>
          </div>
        </div>
        
        <div className="equipment-gallery">
          <h2 className="headline">Our Equipment</h2>
          <div className="equipment-tabs">
            <button
              className={`equipment-tab ${activeTab === 'purity' ? 'active' : ''}`}
              onClick={() => setActiveTab('purity')}
            >
              Purity Analysis
            </button>
            <button
              className={`equipment-tab ${activeTab === 'structure' ? 'active' : ''}`}
              onClick={() => setActiveTab('structure')}
            >
              Structure Analysis
            </button>
            <button
              className={`equipment-tab ${activeTab === 'optical' ? 'active' : ''}`}
              onClick={() => setActiveTab('optical')}
            >
              Optical Characterization
            </button>
          </div>
          
          <div className="equipment-content">
            {activeTab === 'purity' && (
              <div className="equipment-item">
                <div className="equipment-image">
                  <i className="fas fa-microscope fa-5x" style={{ color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}></i>
                </div>
                <div className="equipment-details">
                  <h3>FTIR Spectroscopy System</h3>
                  <p className="equipment-description">
                    Our advanced Fourier-Transform Infrared Spectroscopy system allows us to precisely measure nitrogen and other impurity concentrations down to the parts-per-billion level.
                  </p>
                  <dl className="equipment-specs">
                    <dt>Resolution</dt>
                    <dd>0.5 cm<sup>-1</sup></dd>
                    <dt>Detection Limit</dt>
                    <dd>&lt;1 ppb nitrogen content</dd>
                    <dt>Measurement Time</dt>
                    <dd>15 minutes per sample</dd>
                  </dl>
                </div>
              </div>
            )}
            
            {activeTab === 'structure' && (
              <div className="equipment-item">
                <div className="equipment-image">
                  <i className="fas fa-broadcast-tower fa-5x" style={{ color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}></i>
                </div>
                <div className="equipment-details">
                  <h3>X-ray Topography System</h3>
                  <p className="equipment-description">
                    Our X-ray topography system provides detailed imaging of crystal defects and strain fields, allowing us to accurately characterize the structural quality of each diamond substrate.
                  </p>
                  <dl className="equipment-specs">
                    <dt>Resolution</dt>
                    <dd>1 µm</dd>
                    <dt>X-ray Source</dt>
                    <dd>Cu Kα (8 keV)</dd>
                    <dt>Analysis Area</dt>
                    <dd>Up to 20x20 mm</dd>
                  </dl>
                </div>
              </div>
            )}
            
            {activeTab === 'optical' && (
              <div className="equipment-item">
                <div className="equipment-image">
                  <i className="fas fa-eye fa-5x" style={{ color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}></i>
                </div>
                <div className="equipment-details">
                  <h3>Optical Characterization Suite</h3>
                  <p className="equipment-description">
                    Our comprehensive optical characterization system includes photoluminescence spectroscopy and birefringence imaging to evaluate the optical properties of our diamond substrates.
                  </p>
                  <dl className="equipment-specs">
                    <dt>Wavelength Range</dt>
                    <dd>200-1100 nm</dd>
                    <dt>Spectral Resolution</dt>
                    <dd>0.1 nm</dd>
                    <dt>Imaging Resolution</dt>
                    <dd>0.5 µm</dd>
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="standards-section">
          <h2 className="headline">Quality Standards</h2>
          <div className="standards-grid">
            <div className="standard-item">
              <h3>Purity Classification</h3>
              <p>Our diamonds are classified into three purity grades: Quantum Grade (&lt;5 ppb N), Electronic Grade (5-50 ppb N), and Optical Grade (50-200 ppb N), ensuring you receive the appropriate quality for your specific application.</p>
            </div>
            <div className="standard-item">
              <h3>Structural Quality</h3>
              <p>Each substrate is categorized by dislocation density levels, ranging from ultra-low (10¹ cm⁻²) to standard (10⁴ cm⁻²), providing transparent quality metrics for your selection process.</p>
            </div>
            <div className="standard-item">
              <h3>Certification</h3>
              <p>Every diamond substrate is delivered with a comprehensive quality certificate detailing its specific measured properties, ensuring you have complete transparency on the exact specifications.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection; 