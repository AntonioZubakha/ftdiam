import React, { useState, useEffect } from 'react';

const IntroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Определяем стиль с фоновым изображением
  const backgroundStyle = {
    backgroundColor: '#fff',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  };

  // Новый стиль для липкого заголовка
  const stickyTitleStyle = {
    position: isMobile ? 'static' as const : 'sticky' as const,
    top: '100px',
    flex: '1',
    minWidth: '300px',
    paddingRight: '40px',
    textAlign: 'left' as const,
    alignSelf: 'flex-start' as const,
    height: 'fit-content',
    zIndex: 5,
    marginBottom: isMobile ? '30px' : '0'
  };

  return (
    <section 
      id="intro" 
      className="intro-section" 
      style={{ 
        backgroundColor: 'transparent',
        marginTop: '150px',
        paddingTop: '150px',
        paddingBottom: '0', // Убираем нижний padding, чтобы новый блок прилегал вплотную
        minHeight: '80vh'
      }}
    >
      <div style={backgroundStyle}></div>
      
      <div className="content-wrapper" style={{ width: '100%', maxWidth: '100%', padding: 0 }}>
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 20px',
            minHeight: '60vh',
            position: 'relative'
          }}
        >
          {/* Левая колонка с заголовком и подзаголовком - теперь с position: sticky */}
          <div style={stickyTitleStyle} className="sticky-title">
            <h2 className="headline gradient-headline" style={{ 
              fontSize: '3rem',
              textAlign: 'left',
              marginBottom: '2rem',
              position: 'relative'
            }}>
              Premium Single Crystal Diamond Substrates
            </h2>
            <p className="section-description" style={{ 
              textAlign: 'left',
              fontSize: '1.2rem',
              lineHeight: '1.6',
              maxWidth: '100%'
            }}>
              Unlock the full potential of diamond technology with our comprehensive range of high-quality single crystal diamond substrates.
            </p>
          </div>
          
          {/* Правая колонка с карточками */}
          <div style={{ 
            flex: '1',
            minWidth: '300px'
          }}>
            <div className="specs-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
              margin: 0,
              marginBottom: '60px'
            }}>
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
                <h3 className="spec-name">Technologies</h3>
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
                }}>CVD & HPHT</div>
                <p className="spec-description">Advanced manufacturing methods</p>
              </div>
              
              <div className="spec-block">
                <div className="spec-icon">
                  <i className="fas fa-cubes" style={{
                    fontSize: '60px',
                    marginBottom: '15px',
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}></i>
                </div>
                <h3 className="spec-name">Types</h3>
                <div style={{
                  fontSize: '1.6rem',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '1rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>IIa, N-doped, B-doped</div>
                <p className="spec-description">Various compositions available</p>
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
                <h3 className="spec-name">Sizes</h3>
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
                }}>Up to 15×15 mm</div>
                <p className="spec-description">Perfect for all applications</p>
              </div>
              
              <div className="spec-block">
                <div className="spec-icon">
                  <i className="fas fa-microscope" style={{
                    fontSize: '60px',
                    marginBottom: '15px',
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}></i>
                </div>
                <h3 className="spec-name">Dislocation Density</h3>
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
                }}>As low as 10¹ cm⁻²</div>
                <p className="spec-description">Ultra-low defect concentration</p>
              </div>
              
              <div className="spec-block">
                <div className="spec-icon">
                  <i className="fas fa-ruler-combined" style={{
                    fontSize: '60px',
                    marginBottom: '15px',
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}></i>
                </div>
                <h3 className="spec-name">Surface Perfection</h3>
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
                }}>Down to 1 nm</div>
                <p className="spec-description">Exceptional polishing roughness</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Новый блок с текстом на градиентном фоне */}
        <div style={{
          width: '100%',
          height: isMobile ? '300px' : '200px',
          background: 'linear-gradient(to right, #00837f, #241e46)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '40px',
          marginBottom: '100px',
          position: 'relative',
          zIndex: 2 // Понижаем z-index, чтобы заголовок мог быть над ним если нужно
        }}>
          <p style={{
            color: 'white',
            fontSize: isMobile ? '2rem' : '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '0 20px',
            maxWidth: '1400px',
            margin: '0 auto',
            letterSpacing: '0.5px',
            lineHeight: '1.2'
          }}>
            Engineered for excellence. Trusted for precision. Perfect for advanced applications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 