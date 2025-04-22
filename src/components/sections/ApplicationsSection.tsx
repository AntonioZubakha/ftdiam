import React, { useState, useEffect, useRef } from 'react';
import '../../styles/intro.css';
import { trackButtonClick } from '../../utils/analytics';

const ApplicationsSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
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
    trackButtonClick('applications_contact_us');
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Card container styles
  const cardContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: isMobile ? '10px' : isTablet ? '20px' : isWideScreen ? '50px' : '40px',
    maxWidth: isWideScreen ? '1600px' : '1450px',
    textAlign: 'center' as const,
    margin: '3rem auto 4rem',
    padding: '0 15px',
  };

  // Style for spec blocks
  const specBlockStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: '#333',
    borderRadius: '6px',
    padding: isMobile ? '25px 20px' : isTablet ? '20px 20px' : isWideScreen ? '35px 30px' : '30px 25px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '100%',
    minHeight: isMobile ? '250px' : isTablet ? '270px' : isWideScreen ? '320px' : '300px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'default',
    margin: '0 auto',
    maxWidth: isMobile ? '100%' : isTablet ? '100%' : '100%',
    aspectRatio: isMobile ? 'auto' : isTablet ? 'auto' : '1/1',
  };

  const specIconStyle: React.CSSProperties = {
    fontSize: isMobile ? '45px' : isTablet ? '50px' : isWideScreen ? '60px' : '55px',
    marginBottom: isMobile ? '15px' : isTablet ? '15px' : isWideScreen ? '25px' : '20px',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    height: isMobile ? '60px' : isTablet ? '70px' : isWideScreen ? '90px' : '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const specNameStyle: React.CSSProperties = {
    fontSize: isMobile ? 'calc(var(--h4-mobile) + 2px)' : isTablet ? 'var(--h4-tablet)' : 'var(--h4-desktop)',
    minHeight: isMobile ? '45px' : isTablet ? '50px' : isWideScreen ? '60px' : '55px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    fontWeight: isMobile ? '600' : '600',
    width: '100%',
    textAlign: 'center'
  };

  const specDescriptionStyle: React.CSSProperties = {
    color: '#555',
    textAlign: 'center',
    marginBottom: 'var(--spacing-3)',
    fontWeight: '400',
    opacity: '0.95',
    fontSize: isMobile ? 'var(--text-base)' : isTablet ? 'var(--text-base)' : 'calc(var(--text-base) - 1px)',
    transition: 'all 0.3s ease',
    minHeight: isMobile ? 'auto' : isTablet ? '60px' : isWideScreen ? '80px' : '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    lineHeight: '1.4'
  };

  const specBlockHoverStyle: React.CSSProperties = {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  };

  // Данные для карточек приложений
  const applications = [
    {
      title: "Quantum photonics",
      description: "Very low background fluorescence",
      icon: "fas fa-lightbulb" // Лампочка для фотоники
    },
    {
      title: "Quantum sensors",
      description: "Neglectable background noise",
      icon: "fas fa-wave-square" // Волна для сенсоров
    },
    {
      title: "Quantum computing",
      description: "Longer T2 coherence",
      icon: "fas fa-laptop-code" // Компьютер для квантовых вычислений
    },
    {
      title: "Laser optics and windows",
      description: "Low scattering and absorption",
      icon: "fas fa-sun" // Солнце вместо лазера (лучи света)
    },
    {
      title: "Homoepitaxial growth",
      description: "Close-to-zero inherited defects",
      icon: "fas fa-layer-group" // Слои для эпитаксиального роста
    },
    {
      title: "X-ray and UV detectors",
      description: "More efficient charge collection",
      icon: "fas fa-radiation" // Радиация для детекторов
    },
    {
      title: "Power electronics",
      description: "Lower amount of electrical breakdown points",
      icon: "fas fa-bolt" // Молния для силовой электроники
    },
    {
      title: "High-frequency electronics",
      description: "High career mobility",
      icon: "fas fa-broadcast-tower" // Башня для высокочастотной электроники
    }
  ];

  return (
    <section 
      id="applications" 
      className="intro-section" 
      style={{ 
        backgroundColor: 'transparent',
        marginTop: isMobile ? '40px' : '60px',
        paddingTop: isMobile ? '40px' : '60px',
        paddingBottom: '0',
        minHeight: isMobile ? 'auto' : isTablet ? 'auto' : '80vh',
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
            Applications
          </h2>
          <p className="section-description" style={{ 
            fontSize: isMobile ? 'var(--text-base)' : isTablet ? 'var(--text-base)' : 'var(--text-lg)',
            lineHeight: '1.6',
            maxWidth: '900px',
            margin: '0 auto 1.5rem'
          }}>
            AHPHT diamond substrates are created to meet the stringent demands of cutting-edge industries, delivering application-specific benefits across diverse high-tech domains
          </p>
        </div>

        {/* Карточки в две строки (2*4) */}
        <div 
          className="specs-grid" 
          style={{
            ...cardContainerStyle,
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          }}
        >
          {applications.map((app, index) => (
            <div 
              key={index}
              ref={el => cardRefs.current[index] = el}
              className={`spec-block spec-block-animate ${visibleCards.includes(index) ? 'visible' : ''}`}
              style={{
                ...specBlockStyle,
                ...(hoveredCardIndex === index ? specBlockHoverStyle : {}),
              }}
              onMouseEnter={() => setHoveredCardIndex(index)}
              onMouseLeave={() => setHoveredCardIndex(null)}
            >
              <div className="spec-icon">
                <i className={app.icon} style={specIconStyle}></i>
              </div>
              <h3 className="spec-name" style={specNameStyle}>{app.title}</h3>
              <p className="spec-description" style={specDescriptionStyle}>{app.description}</p>
            </div>
          ))}
        </div>
        
        {/* Кнопка перемещена сюда - под карточки */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          marginBottom: isMobile ? '60px' : isTablet ? '80px' : '100px',
        }}>
          <button 
            onClick={scrollToContacts}
            style={{
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
            CONTACT US
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection; 