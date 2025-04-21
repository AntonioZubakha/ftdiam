import React, { useState, useEffect, useRef } from 'react';
import '../../styles/intro.css';
import { trackButtonClick } from '../../utils/analytics';

const IntroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

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

  // Функция для прокрутки к секции контактов с отслеживанием клика
  const scrollToContacts = () => {
    trackButtonClick('intro_contact_us');
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Функция для прокрутки к секции продуктов с отслеживанием клика
  const scrollToProducts = () => {
    trackButtonClick('intro_explore_more');
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Card container styles - изменено для размещения карточек в одну строку
  const cardContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
    gap: isMobile ? '10px' : '15px',
    maxWidth: '1450px',
    textAlign: 'center' as const,
    margin: '3rem auto 4rem',
    padding: '0 15px',
  };

  // Style for spec blocks to make them more square-shaped
  const specBlockStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: '#333',
    borderRadius: '6px',
    padding: isMobile ? '20px 15px' : '25px 15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '100%',
    minHeight: isMobile ? '320px' : '380px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'default',
    margin: '0 auto',
    maxWidth: isMobile ? '100%' : '300px',
  };

  const specIconStyle: React.CSSProperties = {
    fontSize: isMobile ? '32px' : '60px',
    marginBottom: isMobile ? '10px' : '15px',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    height: isMobile ? '60px' : '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const specNameStyle: React.CSSProperties = {
    fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)',
    height: isMobile ? '40px' : '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px'
  };

  const specValueStyle: React.CSSProperties = {
    fontSize: isMobile ? 'var(--h3-mobile)' : 'var(--h3-desktop)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0.7rem 0',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    height: isMobile ? '40px' : '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const specDescriptionStyle: React.CSSProperties = {
    fontSize: isMobile ? 'calc(var(--text-sm) - 1px)' : 'calc(var(--text-base) - 1px)',
    textAlign: 'center',
    height: isMobile ? '80px' : '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    lineHeight: '1.3',
    padding: '0 5px',
    wordBreak: 'normal'
  };

  // Специальные стили для третьей карточки с длинным описанием
  const longDescriptionStyle: React.CSSProperties = {
    ...specDescriptionStyle,
    fontSize: isMobile ? 'calc(var(--text-sm) - 2px)' : 'calc(var(--text-base) - 2px)',
    lineHeight: '1.2',
  };

  const specBlockHoverStyle: React.CSSProperties = {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  };

  return (
    <section 
      id="intro" 
      className="intro-section" 
      style={{ 
        backgroundColor: 'transparent',
        marginTop: isMobile ? '40px' : '150px',
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
        {/* Центрированный заголовок и подзаголовок */}
        <div style={{
          textAlign: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
        }}>
          <h2 className="headline gradient-headline" style={{ 
            fontSize: isMobile ? 'var(--section-headline-mobile-size)' : 'var(--section-headline-size)',
            marginBottom: isMobile ? '1rem' : '1.5rem',
            position: 'relative'
          }}>
            Top quality IIa diamond substrates. And more.
          </h2>
          <p className="section-description" style={{ 
            fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)',
            lineHeight: '1.6',
            maxWidth: '900px',
            margin: '0 auto 1.5rem'
          }}>
            Explore the characteristics of best-in class AHPHT diamond plates with our comprehensive range of high-quality single crystal diamond substrates.
          </p>
          
          {/* Explore More button */}
          <button 
            onClick={scrollToProducts}
            style={{
              background: 'linear-gradient(to right, #00837f, #241e46)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 30px',
              fontSize: isMobile ? 'var(--text-base)' : 'var(--text-md)',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              marginBottom: '3rem',
              position: 'relative',
              zIndex: 5
            }}
            onMouseOver={(e) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.25)';
            }}
            onMouseOut={(e) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
            }}
          >
            Explore More
          </button>
        </div>

        {/* Карточки в одну строку */}
        <div 
          className="specs-grid" 
          style={cardContainerStyle}
        >
          <div 
            ref={el => cardRefs.current[0] = el}
            className={`spec-block spec-block-animate ${visibleCards.includes(0) ? 'visible' : ''}`}
            style={{
              ...specBlockStyle,
              ...(hoveredCardIndex === 0 ? specBlockHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredCardIndex(0)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
            <div className="spec-icon">
              <i className="fas fa-gem" style={specIconStyle}></i>
            </div>
            <h3 className="spec-name" style={specNameStyle}>Technologies</h3>
            <div style={specValueStyle}>AHPHT</div>
            <p className="spec-description" style={specDescriptionStyle}>Advanced manufacturing methods</p>
          </div>
          
          <div 
            ref={el => cardRefs.current[1] = el}
            className={`spec-block spec-block-animate ${visibleCards.includes(1) ? 'visible' : ''}`}
            style={{
              ...specBlockStyle,
              ...(hoveredCardIndex === 1 ? specBlockHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredCardIndex(1)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
            <div className="spec-icon">
              <i className="fas fa-expand-alt" style={specIconStyle}></i>
            </div>
            <h3 className="spec-name" style={specNameStyle}>Sizes</h3>
            <div style={specValueStyle}>Up to 15×15 mm</div>
            <p className="spec-description" style={specDescriptionStyle}>Perfect for all applications</p>
          </div>
          
          <div 
            ref={el => cardRefs.current[2] = el}
            className={`spec-block spec-block-animate ${visibleCards.includes(2) ? 'visible' : ''}`}
            style={{
              ...specBlockStyle,
              ...(hoveredCardIndex === 2 ? specBlockHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredCardIndex(2)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
            <div className="spec-icon">
              <i className="fas fa-microscope" style={specIconStyle}></i>
            </div>
            <h3 className="spec-name" style={specNameStyle}>Dislocation Density</h3>
            <div style={specValueStyle}>10¹ cm⁻²</div>
            <p className="spec-description" style={longDescriptionStyle}>Ultra-low defect concentration especially for mono-sectorial plates</p>
          </div>
          
          <div 
            ref={el => cardRefs.current[3] = el}
            className={`spec-block spec-block-animate ${visibleCards.includes(3) ? 'visible' : ''}`}
            style={{
              ...specBlockStyle,
              ...(hoveredCardIndex === 3 ? specBlockHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredCardIndex(3)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
            <div className="spec-icon">
              <i className="fas fa-ruler-combined" style={specIconStyle}></i>
            </div>
            <h3 className="spec-name" style={specNameStyle}>Surface Perfection</h3>
            <div style={specValueStyle}>Down to 0.5 nm</div>
            <p className="spec-description" style={specDescriptionStyle}>Exceptional polishing roughness</p>
          </div>
        </div>
        
        {/* Новый блок с дополнительной информацией и кнопкой */}
        <div style={{
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto 60px',
          padding: '0 20px',
        }}>
          <div style={{
            background: 'rgba(0, 131, 127, 0.05)',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 131, 127, 0.1)',
          }}>
            <p style={{
              fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)',
              color: '#333',
              lineHeight: '1.6',
              maxWidth: '900px',
              margin: '0 auto 30px',
              textAlign: 'center'
            }}>
Learn more about our flagship AHPHT substrates - and explore our range of diamond anvils, lenses, windows, membranes, and large single-crystal CVD substrates up to 30×30 mm.
            </p>
            <button 
              onClick={scrollToContacts}
              style={{
                background: 'linear-gradient(to right, #00837f, #241e46)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '14px 35px',
                fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.transform = 'translateY(-2px)';
                target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.25)';
              }}
              onMouseOut={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
        
        {/* Новый блок с текстом на градиентном фоне */}
        <div style={{
          width: '100%',
          height: isMobile ? '110px' : '100px',
          background: 'linear-gradient(to right, #00837f, #241e46)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-start' : 'center',
          marginTop: isMobile ? '20px' : '40px',
          marginBottom: isMobile ? '40px' : '100px',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            color: 'white',
            fontSize: isMobile ? 'var(--text-xl)' : 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            textAlign: 'center',
            padding: '0 20px',
            maxWidth: '1400px',
            margin: '0 auto',
            letterSpacing: '0.5px',
            lineHeight: '1.3',
            width: '100%'
          }}>
            {isMobile ? (
              <div style={{ textAlign: 'center', width: '100%' }}>
                <p style={{ 
                  margin: '0', 
                  textAlign: 'center', 
                  color: 'white',
                  whiteSpace: 'normal',
                  overflow: 'hidden'
                }}>Developed for excellence. Trusted for precision. Perfect for advanced applications.</p>
              </div>
            ) : (
              <p style={{ margin: '0', color: 'white' }}>
                Developed for excellence. Trusted for precision. Perfect for advanced applications.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 