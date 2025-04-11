import React, { useState, useEffect, useRef } from 'react';

const IntroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Проверяем, загружены ли все шрифты и стили
  useEffect(() => {
    // Дожидаемся загрузки шрифтов
    document.fonts.ready.then(() => {
      // Добавляем небольшую задержку для гарантии загрузки стилей
      setTimeout(() => {
        setContentLoaded(true);
      }, 100);
    });
  }, []);
  
  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Добавляем наблюдатель за каждой карточкой только после полной загрузки контента
  useEffect(() => {
    if (!contentLoaded) return;

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
      threshold: 0.3,
      rootMargin: '0px'
    });

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, [contentLoaded]);

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
        minHeight: isMobile ? 'auto' : '80vh',
        visibility: contentLoaded ? 'visible' : 'hidden', // Скрываем секцию до загрузки контента
        opacity: contentLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in'
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
              fontSize: isMobile ? 'var(--section-headline-mobile-size)' : 'var(--section-headline-size)',
              textAlign: isMobile ? 'center' : 'left',
              marginBottom: isMobile ? '1rem' : '2rem',
              position: 'relative'
            }}>
              Premium Single Crystal Diamond Substrates
            </h2>
            <p className="section-description" style={{ 
              textAlign: isMobile ? 'center' : 'left',
              fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)',
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
                <h3 className="spec-name" style={{ fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)' }}>Technologies</h3>
                <div style={{
                  fontSize: isMobile ? 'var(--h3-mobile)' : 'var(--h3-desktop)',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.7rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>CVD & HPHT</div>
                <p className="spec-description" style={{ fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)' }}>Advanced manufacturing methods</p>
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
                <h3 className="spec-name" style={{ fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)' }}>Types</h3>
                <div style={{
                  fontSize: isMobile ? 'var(--h3-mobile)' : 'var(--h3-desktop)',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.7rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>IIa, N-doped, B-doped</div>
                <p className="spec-description" style={{ fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)' }}>Various compositions available</p>
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
                <h3 className="spec-name" style={{ fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)' }}>Sizes</h3>
                <div style={{
                  fontSize: isMobile ? 'var(--h3-mobile)' : 'var(--h3-desktop)',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.7rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>Up to 15×15 mm</div>
                <p className="spec-description" style={{ fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)' }}>Perfect for all applications</p>
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
                <h3 className="spec-name" style={{ fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)' }}>Dislocation Density</h3>
                <div style={{
                  fontSize: isMobile ? 'var(--h3-mobile)' : 'var(--h3-desktop)',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.7rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>As low as 10¹ cm⁻²</div>
                <p className="spec-description" style={{ fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)' }}>Ultra-low defect concentration</p>
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
                <h3 className="spec-name" style={{ fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)' }}>Surface Perfection</h3>
                <div style={{
                  fontSize: isMobile ? 'var(--h3-mobile)' : 'var(--h3-desktop)',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.7rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>Down to 1 nm</div>
                <p className="spec-description" style={{ fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)' }}>Exceptional polishing roughness</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Новый блок с текстом на градиентном фоне */}
        <div style={{
          width: '100%',
          height: isMobile ? '200px' : '200px',
          background: 'linear-gradient(to right, #00837f, #241e46)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isMobile ? '20px' : '40px',
          marginBottom: isMobile ? '40px' : '100px',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            color: 'white',
            fontSize: isMobile ? 'var(--h1-mobile)' : 'var(--h1-desktop)',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: isMobile ? '0 20px' : '0 20px',
            maxWidth: '1400px',
            margin: '0 auto',
            letterSpacing: '0.5px',
            lineHeight: '1.4',
            width: '100%'
          }}>
            {isMobile ? (
              <div style={{ textAlign: 'center', width: '100%' }}>
                <p style={{ 
                  margin: '0 0 10px 0', 
                  fontSize: '1.45rem', 
                  textAlign: 'center', 
                  color: 'white',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>Engineered for excellence.</p>
                <p style={{ 
                  margin: '0 0 10px 0', 
                  fontSize: '1.45rem', 
                  textAlign: 'center', 
                  color: 'white',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>Trusted for precision.</p>
                <p style={{ 
                  margin: '0', 
                  fontSize: '1.45rem', 
                  textAlign: 'center', 
                  color: 'white',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>Perfect for advanced applications.</p>
              </div>
            ) : (
              <p style={{ margin: '0', color: 'white' }}>
                Engineered for excellence. Trusted for precision. Perfect for advanced applications.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 