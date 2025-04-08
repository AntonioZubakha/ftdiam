import React from 'react';

const TechnologySection: React.FC = () => {
  return (
    <section id="technology" className="technology-section" style={{ 
      backgroundColor: '#fff',
      padding: '160px 0 150px 0'  // Установка стандартных отступов как в других секциях
    }}>
      <div className="technology-container">
        <div className="technology-headline-container">
          <h2 className="technology-headline gradient-headline">Advanced HPHT Technology</h2>
        </div>
        
        <div className="technology-content" style={{ marginTop: '60px' }}>
          <div className="tech-points" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="tech-point" style={{ marginBottom: '30px' }}>
              <h3 className="gradient-subheadline">Ultra low dislocations number (10¹ cm⁻²)</h3>
            </div>
            
            <div className="tech-point" style={{ marginBottom: '30px' }}>
              <h3 className="gradient-subheadline">Record-size high-quality substrates</h3>
            </div>
            
            <div className="tech-point">
              <h3 className="gradient-subheadline">Very low strain and zero-Nitrogen level</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection; 