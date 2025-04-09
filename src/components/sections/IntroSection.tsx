import React, { useEffect, useRef } from 'react';

const IntroSection: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  
  // Эффект "липкого" скролла для заголовка
  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current) return;
      
      const section = document.getElementById('intro');
      if (!section) return;
      
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY;
      
      // Вычисляем, насколько заголовок должен сдвинуться вниз
      const scrollPercentage = Math.min(
        Math.max(0, (scrollPosition - sectionTop) / (sectionHeight - window.innerHeight * 0.6)), 
        1
      );
      
      // Максимальное смещение - 70% высоты секции
      const maxOffset = sectionHeight * 0.7;
      const translateY = scrollPercentage * maxOffset;
      
      titleRef.current.style.transform = `translateY(${translateY}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    // Запускаем один раз при загрузке
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  return (
    <section 
      id="intro" 
      className="intro-section" 
      style={{ 
        backgroundColor: 'transparent',
        marginTop: '150px',
        paddingTop: '120px',
        paddingBottom: '100px',
        minHeight: '80vh'
      }}
    >
      <div style={backgroundStyle}></div>
      
      <div className="content-wrapper" style={{ width: '100%', maxWidth: '100%', padding: 0 }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
          minHeight: '60vh'
        }}>
          {/* Левая колонка с заголовком и подзаголовком */}
          <div style={{ 
            flex: '1',
            minWidth: '300px',
            paddingRight: '40px',
            position: 'relative',
            textAlign: 'left'
          }} ref={titleRef}>
            <h2 className="headline gradient-headline" style={{ 
              fontSize: '3rem',
              textAlign: 'left',
              marginBottom: '2rem',
              position: 'relative',
              transition: 'transform 0.1s ease-out'
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
                  <i className="fas fa-cogs" style={{
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
                  <i className="fas fa-tachometer-alt" style={{
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
      </div>
    </section>
  );
};

export default IntroSection; 