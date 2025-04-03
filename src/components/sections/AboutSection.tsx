const AboutSection = () => {
  return (
    <section id="about" className="section about-section">
      <div className="content-wrapper">
        <h2 className="headline">About Us</h2>
        <p className="section-description">FTDiam is a US-based deep-tech start-up in advanced materials sector. We are revolutionizing the industry with the unique Advanced HPHT (AHPHT) technology. Since our inception, we've been dedicated to producing the highest-quality single-crystal diamond substrates for advanced applications.</p>
        
        <div className="infographic">
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

        <div className="infographic">
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

        <h2 className="headline">Mission</h2>
        <p className="section-description">Our mission is to provide flawless technical diamonds that drive innovation across industries, from next-generation electronics to life-changing quantum solutions.</p>
        
        <h2 className="headline">History</h2>
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

        <h2 className="headline">Founders</h2>
        <div className="founders">
          <div className="founder">
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <img src="/images/Dmitri.jpg" alt="Dmitry Semchenko" className="founder-photo" />
            </div>
            <h3>Dmitry Semchenko, CTO</h3>
            <p>Serial entrepreneur with over 8 years in high-quality diamond material. Holder of AHPHT technology.</p>
          </div>
          <div className="founder">
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <img src="/images/Dan.jpg" alt="Daniil Kurganov" className="founder-photo" />
            </div>
            <h3>Daniil Kurganov, CEO</h3>
            <p>15+ years in management, technical sales and business development worldwide.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 