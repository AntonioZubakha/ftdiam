import React from 'react';

const IntroSection: React.FC = () => {
  // Определяем стиль с фоновым изображением
  const backgroundStyle = {
    backgroundImage: `url(/images/111.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  };

  return (
    <section 
      id="intro" 
      className="intro-section" 
      style={{ 
        backgroundColor: 'transparent',
        marginTop: '150px',
        paddingTop: '120px'
      }}
    >
      <div style={backgroundStyle}></div>
      <div className="content-wrapper">
        <h2 className="headline gradient-headline">Premium Diamond Specifications</h2>
        <p className="section-description">Setting the industry standard with exceptional quality</p>
        
        <div className="specs-grid">
          <div className="spec-block">
            <div className="spec-icon">
              <i className="fas fa-project-diagram" style={{
                fontSize: '60px',
                marginBottom: '15px',
                background: 'linear-gradient(to right, #00837f, #241e46)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}></i>
            </div>
            <h3 className="spec-name">Dislocations</h3>
            <div style={{
              fontSize: '1.8rem',
              background: 'linear-gradient(to right, #00837f, #241e46)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '1rem 0',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              display: 'inline-block'
            }}>10¹ cm⁻²</div>
            <p className="spec-description">Industry-leading purity</p>
          </div>
          
          <div className="spec-block">
            <div className="spec-icon">
              <i className="fas fa-expand-alt" style={{
                fontSize: '60px',
                marginBottom: '15px',
                background: 'linear-gradient(to right, #00837f, #241e46)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}></i>
            </div>
            <h3 className="spec-name">Size</h3>
            <div style={{
              fontSize: '1.8rem',
              background: 'linear-gradient(to right, #00837f, #241e46)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '1rem 0',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              display: 'inline-block'
            }}>up to 15×15 mm</div>
            <p className="spec-description">Perfect for all applications</p>
          </div>
          
          <div className="spec-block">
            <div className="spec-icon">
              <i className="fas fa-gem" style={{
                fontSize: '60px',
                marginBottom: '15px',
                background: 'linear-gradient(to right, #00837f, #241e46)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}></i>
            </div>
            <h3 className="spec-name">Purity</h3>
            <div style={{
              fontSize: '1.8rem',
              background: 'linear-gradient(to right, #00837f, #241e46)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '1rem 0',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              display: 'inline-block'
            }}>≤5 ppb N</div>
            <p className="spec-description">Ultra-low nitrogen content</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 