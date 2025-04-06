import React from 'react';

const AboutUsSection = () => {
  // Определяем стиль с фоновым изображением
  const backgroundStyle = {
    backgroundImage: `url(/images/about-elegant-bg.svg)`,
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
    <section id="about" className="section about-section">
      <div style={backgroundStyle}></div>
      <div className="content-wrapper">
        <h2 className="headline">About Us</h2>
        <p className="section-description">FTDiam is a US-based deep-tech start-up in advanced materials sector. We are revolutionizing the industry with the unique Advanced HPHT (AHPHT) technology. Since our inception, we've been dedicated to producing the highest-quality single-crystal diamond substrates for advanced applications.</p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="stat-number">8+</div>
            <div className="stat-label">Years of Experience</div>
            <div className="stat-detail">Pioneering diamond synthesis since 2015</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-globe"></i>
            </div>
            <div className="stat-number">15+</div>
            <div className="stat-label">Global Partners</div>
            <div className="stat-detail">Trusted by leading research institutions</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-number">100%</div>
            <div className="stat-label">Quality Control</div>
            <div className="stat-detail">Every crystal rigorously tested</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-number">2x</div>
            <div className="stat-label">Annual Growth</div>
            <div className="stat-detail">Rapid market expansion</div>
          </div>
        </div>

        <h3 className="section-subtitle">Application Areas</h3>
        <div className="applications-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-atom"></i>
            </div>
            <div className="stat-number">Quantum</div>
            <div className="stat-label">Technology</div>
            <div className="stat-detail">NV centers and quantum computing</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-microchip"></i>
            </div>
            <div className="stat-number">Semi</div>
            <div className="stat-label">conductors</div>
            <div className="stat-detail">Next-gen power electronics</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-bolt"></i>
            </div>
            <div className="stat-number">Power</div>
            <div className="stat-label">Electronics</div>
            <div className="stat-detail">High-efficiency devices</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-microscope"></i>
            </div>
            <div className="stat-number">Advanced</div>
            <div className="stat-label">Optics</div>
            <div className="stat-detail">Precision optical components</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HistorySection = () => {
  // Определяем стиль с фоновым изображением
  const backgroundStyle = {
    backgroundImage: `url(/images/history-bg.svg)`,
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
    <section id="history" className="section history-section">
      <div style={backgroundStyle}></div>
      <div className="content-wrapper">
        <h2 className="headline">History</h2>
        <p className="section-description">Since our founding, FTDiam has been on a mission to transform the diamond industry with breakthrough technology and exceptional quality.</p>
        
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-year">2022</div>
            <div className="timeline-content">Founded as a sales-focused entity sourcing diamonds from a partner facility in India.</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2023</div>
            <div className="timeline-content">Expanded partnerships and client base across quantum technology sector.</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2027</div>
            <div className="timeline-content">Planned establishment of own AHPHT production facility.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutUsSection, HistorySection }; 