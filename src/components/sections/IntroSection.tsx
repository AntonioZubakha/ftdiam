import React, { useState, useEffect, useRef } from 'react';

const IntroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Добавляем наблюдатель за каждой карточкой
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1 && !visibleCards.includes(index)) {
            setVisibleCards(prev => [...prev, index]);
          }
        }
      });
    }, {
      threshold: 0.3
    });

    // Начинаем наблюдать за каждой карточкой
    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, [isMobile]);

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
    paddingRight: isMobile ? '0' : '40px',
    textAlign: 'left' as const,
    alignSelf: 'flex-start' as const,
    height: 'fit-content',
    zIndex: 5,
    marginBottom: isMobile ? '20px' : '0'
  };

  // Mobile card container styles
  const mobileCardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: isMobile ? '15px' : '1.5rem',
    margin: 0,
    marginBottom: isMobile ? '30px' : '60px',
    padding: isMobile ? '0 0 15px 0' : '0',
  };

  return (
    <section 
      id="intro" 
      className="intro-section" 
      style={{ 
        backgroundColor: 'transparent',
        marginTop: isMobile ? '60px' : '150px',
        paddingTop: isMobile ? '40px' : '150px',
        paddingBottom: '0',
        minHeight: isMobile ? 'auto' : '80vh'
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
            minHeight: isMobile ? 'auto' : '60vh',
            position: 'relative'
          }}
        >
          {/* Левая колонка с заголовком и подзаголовком */}
          <div style={stickyTitleStyle} className="sticky-title">
            <h2 className="headline gradient-headline" style={{ 
              fontSize: isMobile ? '2rem' : '3rem',
              textAlign: 'left',
              marginBottom: isMobile ? '1rem' : '2rem',
              position: 'relative'
            }}>
              Premium Single Crystal Diamond Substrates
            </h2>
            <p className="section-description" style={{ 
              textAlign: 'left',
              fontSize: isMobile ? '1rem' : '1.2rem',
              lineHeight: '1.6',
              maxWidth: '100%'
            }}>
              Unlock the full potential of diamond technology with our comprehensive range of high-quality single crystal diamond substrates.
            </p>
          </div>
          
          {/* Правая колонка с карточками */}
          <div style={{ 
            flex: '1',
            minWidth: '300px',
            overflow: 'visible'
          }}>
            <div 
              className="specs-grid" 
              style={mobileCardContainerStyle}
            >
              <div 
                ref={el => cardRefs.current[0] = el}
                className={`spec-block spec-block-animate ${visibleCards.includes(0) ? 'visible' : ''}`}
              >
                <div className="spec-icon">
                  <i className="fas fa-gem" style={{
                    fontSize: isMobile ? '32px' : '60px',
                    marginBottom: isMobile ? '10px' : '15px',
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}></i>
                </div>
                <h3 className="spec-name" style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>Technologies</h3>
                <div style={{
                  fontSize: isMobile ? '1.3rem' : '1.8rem',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.7rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>CVD & HPHT</div>
                <p className="spec-description" style={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>Advanced manufacturing methods</p>
              </div>
              
              <div 
                ref={el => cardRefs.current[1] = el}
                className={`spec-block spec-block-animate ${visibleCards.includes(1) ? 'visible' : ''}`}
              >
                <div className="spec-icon">
                  <i className="fas fa-cubes" style={{
                    fontSize: isMobile ? '32px' : '60px',
                    marginBottom: isMobile ? '10px' : '15px',
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}></i>
                </div>
                <h3 className="spec-name" style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>Types</h3>
                <div style={{
                  fontSize: isMobile ? '1.2rem' : '1.6rem',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.7rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>IIa, N-doped, B-doped</div>
                <p className="spec-description" style={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>Various compositions available</p>
              </div>
              
              <div 
                ref={el => cardRefs.current[2] = el}
                className={`spec-block spec-block-animate ${visibleCards.includes(2) ? 'visible' : ''}`}
              >
                <div className="spec-icon">
                  <i className="fas fa-expand-alt" style={{
                    fontSize: isMobile ? '32px' : '60px',
                    marginBottom: isMobile ? '10px' : '15px',
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}></i>
                </div>
                <h3 className="spec-name" style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>Sizes</h3>
                <div style={{
                  fontSize: isMobile ? '1.3rem' : '1.8rem',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.7rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>Up to 15×15 mm</div>
                <p className="spec-description" style={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>Perfect for all applications</p>
              </div>
              
              <div 
                ref={el => cardRefs.current[3] = el}
                className={`spec-block spec-block-animate ${visibleCards.includes(3) ? 'visible' : ''}`}
              >
                <div className="spec-icon">
                  <i className="fas fa-microscope" style={{
                    fontSize: isMobile ? '32px' : '60px',
                    marginBottom: isMobile ? '10px' : '15px',
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}></i>
                </div>
                <h3 className="spec-name" style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>Dislocation Density</h3>
                <div style={{
                  fontSize: isMobile ? '1.3rem' : '1.8rem',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.7rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>As low as 10¹ cm⁻²</div>
                <p className="spec-description" style={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>Ultra-low defect concentration</p>
              </div>
              
              <div 
                ref={el => cardRefs.current[4] = el}
                className={`spec-block spec-block-animate ${visibleCards.includes(4) ? 'visible' : ''}`}
              >
                <div className="spec-icon">
                  <i className="fas fa-ruler-combined" style={{
                    fontSize: isMobile ? '32px' : '60px',
                    marginBottom: isMobile ? '10px' : '15px',
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}></i>
                </div>
                <h3 className="spec-name" style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>Surface Perfection</h3>
                <div style={{
                  fontSize: isMobile ? '1.3rem' : '1.8rem',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.7rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>Down to 1 nm</div>
                <p className="spec-description" style={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>Exceptional polishing roughness</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Новый блок с текстом на градиентном фоне */}
        <div style={{
          width: '100%',
          height: isMobile ? '250px' : '200px',
          background: 'linear-gradient(to right, #00837f, #241e46)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isMobile ? '20px' : '40px',
          marginBottom: isMobile ? '40px' : '100px',
          position: 'relative',
          zIndex: 2
        }}>
          <p style={{
            color: 'white',
            fontSize: isMobile ? '1.5rem' : '3rem',
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