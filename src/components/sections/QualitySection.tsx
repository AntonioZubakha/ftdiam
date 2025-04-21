import React, { useState, useEffect, useRef } from 'react';
import '../../styles/quality.css';
import { trackButtonClick } from '../../utils/analytics';

const QualitySection: React.FC = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToContacts = () => {
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' });
      // Отслеживаем клик по кнопке
      trackButtonClick('product_contact_tailored');
    }
  };
  
  // Массив путей к изображениям
  const imagePaths = [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo5.jpg',
    '/images/photo3.jpg',
    '/images/photo4.jpg'
  ];

  // Массив данных карточек
  const cardData = [
    {
      image: '/images/photo1.jpg',
      title: 'Diamond View',
      highlight: 'No inclusions',
      description: 'No defects, dislocations <10¹ cm⁻²'
    },
    {
      image: '/images/photo2.jpg',
      title: 'Polarized Light',
      highlight: 'Very low strain',
      description: 'Perfect for optical applications'
    },
    {
      image: '/images/photo5.jpg',
      title: 'X-Ray Diffraction',
      highlight: '<50 cm⁻²',
      description: 'Dislocation density'
    },
    {
      image: '/images/photo3.jpg',
      title: 'FTIR',
      highlight: 'Ultra-pure',
      description: 'Exceptional crystal purity'
    },
    {
      image: '/images/photo4.jpg',
      title: 'UV-Vis',
      highlight: 'Low absorbance',
      description: 'Premium optical quality'
    }
  ];

  // Предзагрузка изображений
  useEffect(() => {
    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
      });
    };

    Promise.all(imagePaths.map(path => loadImage(path)))
      .then(() => {
        setImagesLoaded(true);
      })
      .catch(error => {
        console.error('Error preloading images:', error);
        // Даже если произошла ошибка, позволяем компоненту отрендериться
        setImagesLoaded(true);
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

  // Добавляем наблюдатель за каждой карточкой только после загрузки изображений
  useEffect(() => {
    if (!imagesLoaded) return;

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
  }, [imagesLoaded]);
  
  // Открытие изображения в модальном окне
  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  // Закрытие модального окна
  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = '';
  };

  // Обработчик клика по кнопке запроса документации с отслеживанием
  const handleRequestDocumentation = () => {
    trackButtonClick('request_analysis');
    // Здесь можно добавить открытие формы или модального окна
    console.log('Запрос документа');
  };

  // Определяем стиль с фоновым изображением
  const backgroundStyle = {
    backgroundImage: 'url(/images/gpt.png)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  };

  const overlayStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    zIndex: 1
  };

  const imageContainerStyle = {
    width: '100%',
    height: '0',
    paddingBottom: '100%',
    marginBottom: '1rem',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    position: 'relative' as const
  };

  const imageStyle = {
    position: 'absolute' as const,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: 'transform 0.3s ease'
  };

  // Новый стиль для заголовка (без липкости)
  const titleStyle = {
    position: 'static' as const,
    minWidth: '300px',
    textAlign: 'center' as const,
    height: 'fit-content',
    marginBottom: '40px',
    width: '100%'
  };

  return (
    <section 
      id="quality" 
      className="quality-section" 
      style={{ 
        backgroundColor: 'transparent',
        paddingTop: isMobile ? '40px' : '120px',
        paddingBottom: isMobile ? '40px' : '120px',
        position: 'relative',
        minHeight: isMobile ? 'auto' : '80vh',
        visibility: imagesLoaded ? 'visible' : 'hidden' // Скрываем секцию до загрузки изображений
      }}
    >
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>
      
      <div className="content-wrapper" style={{ 
        width: '100%', 
        maxWidth: '100%', 
        padding: 0, 
        position: 'relative', 
        zIndex: 2
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {/* Заголовок и подзаголовок */}
          <div style={titleStyle}>
            <h2 className="quality-headline gradient-headline" style={{ 
              fontSize: isMobile ? 'var(--section-headline-mobile-size)' : 'var(--section-headline-size)',
              textAlign: 'center',
              marginBottom: isMobile ? '1rem' : '2rem',
              position: 'relative',
              lineHeight: isMobile ? '1.2' : '1.3'
            }}>
              Quality Analysis
            </h2>
            <h3 className="quality-subheadline" style={{ 
              textAlign: 'center',
              marginBottom: isMobile ? '1rem' : '1rem',
              fontSize: isMobile ? 'var(--h3-mobile)' : 'var(--h3-desktop)',
              display: 'inline-block',
              width: '100%',
              lineHeight: '1.3'
            }}>
              Tested. Proven. Exceptional.
            </h3>
            <p className="quality-description" style={{ 
              textAlign: 'center',
              fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '0 auto 2rem auto'
            }}>
              Our diamonds undergo rigorous testing to ensure they meet the highest standards. 
              See the evidence of our flawless quality below.
            </p>
          </div>
          
          {/* Карточки в одном ряду */}
          <div className="quality-cards-row">
            {cardData.map((card, index) => (
              <div 
                key={index}
                ref={el => cardRefs.current[index] = el}
                className={`spec-block spec-block-animate ${visibleCards.includes(index) ? 'visible' : ''}`}
                style={{ 
                  padding: isMobile ? '15px' : '20px',
                }}
              >
                <div 
                  style={{...imageContainerStyle}}
                  onClick={() => openModal(card.image)}
                >
                  {index === 3 ? (
                    <div style={{
                      ...imageStyle,
                      backgroundImage: `url(${card.image})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat'
                    }}></div>
                  ) : (
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      style={index === 4 ? {...imageStyle, objectFit: 'contain' as const} : imageStyle} 
                    />
                  )}
                </div>
                <h3 className="spec-name" style={{ 
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  textAlign: 'center',
                  margin: '0 0 0.5rem 0',
                  fontWeight: '600',
                  minHeight: isMobile ? 'auto' : '2.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>{card.title}</h3>
                <div style={{
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.5rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'block',
                  textAlign: 'center',
                  minHeight: isMobile ? 'auto' : '1.6rem'
                }}>{card.highlight}</div>
                <p className="spec-description" style={{ 
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  textAlign: 'center',
                  margin: '0.5rem 0 0 0',
                  color: '#666',
                  lineHeight: '1.4',
                  minHeight: isMobile ? 'auto' : '2.5rem'
                }}>{card.description}</p>
              </div>
            ))}
          </div>
          
          {/* Кнопка запроса документа */}
          <button 
            className="request-document-button"
            onClick={scrollToContacts}
            aria-label="Request analysis documentation"
          >
            Request Analysis Documentation
          </button>
        </div>
      </div>

      {/* Модальное окно для увеличенного изображения */}
      {modalImage && (
        <div style={{
          position: 'fixed' as const,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          boxSizing: 'border-box' as const
        }} onClick={closeModal}>
          <img 
            src={modalImage} 
            alt="Enlarged view" 
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain' as const,
              boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)'
            }} 
            onClick={(e) => e.stopPropagation()} 
          />
          <button style={{
            position: 'absolute' as const,
            top: '20px',
            right: '20px',
            background: 'transparent',
            color: 'white',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }} onClick={closeModal}>×</button>
        </div>
      )}
    </section>
  );
};

export default QualitySection; 