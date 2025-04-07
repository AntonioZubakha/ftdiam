import React from 'react';

const WhoWeAreSection = () => {
  return (
    <section id="about" className="section who-we-are-section">
      <div className="content-wrapper">
        <div className="about-container">
          {/* About Us section */}
          <div className="about-half">
            <div className="about-content">
              <h2 className="about-title">About Us</h2>
              <div className="about-divider"></div>
              <p className="about-description">
                FTDiam is a US-based deep-tech start-up in advanced materials sector. We are revolutionizing the industry with the unique Advanced HPHT (AHPHT) technology. Since our inception, we've been dedicated to producing the highest-quality single-crystal diamond substrates for advanced applications.
              </p>
            </div>
          </div>
          
          {/* History section */}
          <div className="about-half">
            <div className="about-content">
              <h2 className="about-title">History</h2>
              <div className="about-divider"></div>
              <p className="about-description">
                Since our founding, FTDiam has been on a mission to transform the diamond industry with breakthrough technology and exceptional quality.
              </p>
              
              <ul className="history-timeline">
                <li className="timeline-entry">
                  <span className="year">2022</span>
                  <p>Founded as a sales-focused entity sourcing diamonds from a partner facility in India.</p>
                </li>
                <li className="timeline-entry">
                  <span className="year">2023</span>
                  <p>Expanded partnerships and client base across quantum technology sector.</p>
                </li>
                <li className="timeline-entry">
                  <span className="year">2027</span>
                  <p>Planned establishment of own AHPHT production facility.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="founders-container">
          <div className="founder-profile">
            <div className="founder-image">
              <img src="/images/Dmitri.jpg" alt="Dmitry Semchenko" />
            </div>
            <h3 className="founder-name">Dmitry Semchenko, CTO</h3>
            <p className="founder-bio">Serial entrepreneur with over 8 years in high-quality diamond material. Holder of AHPHT technology.</p>
          </div>
          
          <div className="founder-profile">
            <div className="founder-image">
              <img src="/images/Dan.jpg" alt="Daniil Kurganov" />
            </div>
            <h3 className="founder-name">Daniil Kurganov, CEO</h3>
            <p className="founder-bio">15+ years in management, technical sales and business development worldwide.</p>
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

export { WhoWeAreSection, HistorySection }; 