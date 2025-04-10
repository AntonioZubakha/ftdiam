import React from 'react';

const TechnologySection: React.FC = () => {
  return (
    <section id="technology" className="technology-section" style={{ 
      backgroundColor: '#fff',
      padding: '60px 0 120px 0'  // Установка стандартных отступов как в других секциях
    }}>
      <div className="technology-container">
        <div className="technology-headline-container">
          <h2 className="technology-headline gradient-headline">Advanced HPHT Technology</h2>
        </div>
        
        <div className="technology-content" style={{ marginTop: '60px' }}>
          <div className="advantages-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="advantage-card">
              <div className="advantage-icon">
                <i className="fas fa-chart-line" style={{
                  fontSize: '60px',
                  marginBottom: '15px',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}></i>
              </div>
              <h3 className="advantage-title gradient-subheadline">Ultra low dislocations number (10¹ cm⁻²)</h3>
            </div>
            
            <div className="advantage-card">
              <div className="advantage-icon">
                <i className="fas fa-expand" style={{
                  fontSize: '60px',
                  marginBottom: '15px',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}></i>
              </div>
              <h3 className="advantage-title gradient-subheadline">Record-size high-quality substrates</h3>
            </div>
            
            <div className="advantage-card">
              <div className="advantage-icon">
                <i className="fas fa-atom" style={{
                  fontSize: '60px',
                  marginBottom: '15px',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}></i>
              </div>
              <h3 className="advantage-title gradient-subheadline">Very low strain and zero-Nitrogen level</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection; 