import React, { useState, useEffect, useRef } from 'react';
import '../../styles/intro.css';

const IntroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 992);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1600);
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
        
        // Проверка наличия формы и секции контактов
        console.log('[IntroSection] Init check - Contact form found by ID:', 
          document.getElementById('contact-form') !== null);
        console.log('[IntroSection] Init check - Contacts section found by ID:', 
          document.getElementById('contacts') !== null);
        console.log('[IntroSection] Init check - Contact form found by class:', 
          document.querySelector('.contact-form') !== null);
      }, 100);
    });
  }, []);
  
  // Check if the screen is mobile-sized, tablet-sized or wide-screen
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 992);
      setIsWideScreen(width >= 1600);
    };
    
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
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
    try {
      if (isMobile) {
        // На мобильных устройствах прокручиваем к форме обратной связи
        // Пробуем несколько способов найти форму
        const contactForm = document.getElementById('contact-form') || 
                           document.querySelector('.contact-form');
                           
        if (contactForm) {
          // Метод 1: Используем scrollIntoView
          contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Метод 2: Если первый не сработал, используем setTimeout и window.scrollTo
          setTimeout(() => {
            const rect = contactForm.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = rect.top + scrollTop - 100; // Отступ сверху 100px
            
            window.scrollTo({
              top: targetY,
              behavior: 'smooth'
            });
          }, 100);
        } else {
          // Если форму не нашли, ищем секцию контактов
          const contactsSection = document.getElementById('contacts');
          if (contactsSection) {
            contactsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        // На десктопе просто прокручиваем к началу секции контактов
        const contactsSection = document.getElementById('contacts');
        if (contactsSection) {
          contactsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (error) {
      console.warn("Error during scroll:", error);
      // В случае ошибки используем запасной вариант
      window.location.href = '#contacts';
    }
  };

  // Card container styles - изменено для размещения карточек на разных экранах
  const cardContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: isMobile ? '10px' : isTablet ? '16px' : isWideScreen ? '30px' : '24px',
    maxWidth: isWideScreen ? '1600px' : '1450px',
    textAlign: 'center' as const,
    margin: '3rem auto 4rem',
    padding: '0 15px',
  };

  // Style for spec blocks to make them more square-shaped
  const specBlockStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: '#333',
    borderRadius: '6px',
    padding: isMobile ? '20px 16px' : isTablet ? '16px 16px' : isWideScreen ? '30px 24px' : '24px 20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '100%',
    minHeight: isMobile ? '240px' : isTablet ? '280px' : isWideScreen ? '380px' : '350px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'default',
    margin: '0 auto',
    maxWidth: isMobile ? '100%' : isTablet ? '100%' : '100%',
    aspectRatio: isMobile ? 'auto' : isTablet ? '1/1.1' : '1/1',
  };

  const specIconStyle: React.CSSProperties = {
    fontSize: isMobile ? '40px' : isTablet ? '45px' : isWideScreen ? '55px' : '50px',
    marginBottom: isMobile ? '12px' : isTablet ? '12px' : isWideScreen ? '20px' : '16px',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    height: isMobile ? '55px' : isTablet ? '60px' : isWideScreen ? '80px' : '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const specNameStyle: React.CSSProperties = {
    fontSize: isMobile ? 'calc(var(--h4-mobile) + 2px)' : isTablet ? 'var(--h4-tablet)' : 'var(--h4-desktop)',
    height: isMobile ? '40px' : isTablet ? '45px' : isWideScreen ? '60px' : '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    fontWeight: isMobile ? '600' : '600',
    width: '100%'
  };

  const specValueStyle: React.CSSProperties = {
    fontSize: isMobile ? 'calc(var(--h3-mobile) + 2px)' : isTablet ? 'var(--h3-tablet)' : 'var(--h3-desktop)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0.5rem 0 0.7rem',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    height: isMobile ? '45px' : isTablet ? '50px' : isWideScreen ? '60px' : '55px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  };

  const specDescriptionStyle: React.CSSProperties = {
    color: '#555',
    textAlign: 'center',
    marginBottom: 'var(--spacing-3)',
    fontWeight: '400',
    opacity: '0.95',
    fontSize: isMobile ? 'var(--text-base)' : isTablet ? 'var(--text-base)' : 'calc(var(--text-base) - 1px)',
    transition: 'all 0.3s ease',
    height: 'auto',
    minHeight: isMobile ? 'auto' : isTablet ? '55px' : isWideScreen ? '70px' : '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    lineHeight: '1.4'
  };

  // Специальные стили для третьей карточки с длинным описанием
  const longDescriptionStyle: React.CSSProperties = {
    color: '#555',
    textAlign: 'center',
    marginBottom: 'var(--spacing-3)',
    fontWeight: '400',
    opacity: '0.90',
    fontSize: isMobile ? 'var(--text-base)' : isTablet ? 'calc(var(--text-base) - 1px)' : 'calc(var(--text-base) - 1px)',
    transition: 'all 0.3s ease',
    height: 'auto',
    minHeight: isMobile ? 'auto' : isTablet ? '70px' : isWideScreen ? '80px' : '75px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1.5',
    width: '100%'
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
        marginTop: isMobile ? '40px' : '60px',
        paddingTop: isMobile ? '40px' : '60px',
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
          maxWidth: isWideScreen ? '1600px' : '1400px',
          margin: '0 auto',
          padding: '0 20px',
        }}>
          <h2 className="headline gradient-headline" style={{ 
            fontSize: isMobile ? 'var(--section-headline-mobile-size)' : isTablet ? 'var(--section-headline-tablet-size)' : 'var(--section-headline-size)',
            marginBottom: isMobile ? '1rem' : isTablet ? '1.2rem' : '1.5rem',
            position: 'relative'
          }}>
            Top Quality IIa Diamond Substrates
          </h2>
          <p className="section-description" style={{ 
            fontSize: 'var(--text-xl)',
            color: 'var(--dark-gray)',
            lineHeight: '1.6',
            maxWidth: '900px',
            margin: '0 auto 1.5rem'
          }}>
            Explore the characteristics of best-in class AHPHT diamond plates with our comprehensive range of high-quality single crystal diamond substrates.
          </p>
          
          {/* Explore More button */}
          <a 
            href={isMobile ? "#contact-form" : "#contacts"}
            onClick={(e) => {
              e.preventDefault(); // Предотвращаем стандартное поведение якоря
              scrollToContacts();
            }}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(to right, #00837f, #241e46)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 30px',
              fontSize: isMobile ? 'var(--text-base)' : isTablet ? 'var(--text-base)' : 'var(--text-md)',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              marginBottom: '3rem',
              position: 'relative',
              zIndex: 5,
              textDecoration: 'none',
              textAlign: 'center'
            }}
            onMouseOver={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.25)';
            }}
            onMouseOut={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
            }}
          >
            EXPLORE MORE
          </a>
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

        {/* Gradient banner */}
        <div className="gradient-banner" style={{ marginTop: 'auto' }}>
          <div className="banner-container">
            {/* Десктопная версия текста (без переносов) */}
            <p className="banner-text banner-text-desktop">
              Developed for excellence. Trusted for precision. Perfect for advanced applications.
            </p>
            
            {/* Мобильная версия текста (с переносами) */}
            <p className={`banner-text banner-text-mobile ${isMobile ? 'force-show' : ''}`} style={{ display: isMobile ? 'block' : 'none' }}>
              Developed for excellence.<br/>
              Trusted for precision.<br/>
              Perfect for advanced applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 