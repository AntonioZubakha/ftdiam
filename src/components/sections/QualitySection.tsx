import React, { useState, useEffect, useRef } from 'react';
import '../../styles/quality.css';

const QualitySection: React.FC = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Массив путей к изображениям
  const imagePaths = [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo5.jpg',
    '/images/photo3.jpg',
    '/images/photo4.jpg'
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
    if (!isMobile || !imagesLoaded) return;

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
  }, [isMobile, imagesLoaded]);
  
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
    marginBottom: '1.2rem',
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

  // Новый стиль для липкого заголовка
  const stickyTitleStyle = {
    position: isMobile ? 'static' as const : 'sticky' as const,
    top: '100px',
    flex: '1',
    minWidth: '300px',
    paddingRight: isMobile ? '0' : '40px',
    paddingTop: '20px',
    textAlign: isMobile ? 'center' as const : 'left' as const,
    alignSelf: 'flex-start' as const,
    height: 'fit-content',
    marginBottom: isMobile ? '30px' : '0',
    width: isMobile ? '100%' : 'auto'
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
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
          minHeight: isMobile ? 'auto' : '60vh',
          justifyContent: isMobile ? 'center' : 'flex-start'
        }}>
          {/* Левая колонка с заголовком и подзаголовком */}
          <div style={stickyTitleStyle}>
            <h2 className="quality-headline gradient-headline" style={{ 
              fontSize: isMobile ? '2.5rem' : '3rem',
              textAlign: isMobile ? 'center' : 'left',
              marginBottom: isMobile ? '1rem' : '2rem',
              position: 'relative',
              lineHeight: isMobile ? '1.2' : '1.3'
            }}>
              Quality Analysis
            </h2>
            <h3 className="quality-subheadline" style={{ 
              textAlign: isMobile ? 'center' : 'left',
              marginBottom: isMobile ? '1rem' : '1rem',
              fontSize: isMobile ? '1.8rem' : '1.8rem',
              display: 'inline-block',
              width: '100%',
              lineHeight: '1.3'
            }}>
              Tested. Proven. Exceptional.
            </h3>
            <p className="quality-description" style={{ 
              textAlign: isMobile ? 'center' : 'left',
              fontSize: isMobile ? '1.1rem' : '1.2rem',
              lineHeight: '1.6',
              maxWidth: '100%',
              margin: '0 0 2rem 0'
            }}>
              Our diamonds undergo rigorous testing to ensure they meet the highest standards. 
              See the evidence of our flawless quality below.
            </p>
          </div>
          
          {/* Правая колонка с карточками */}
          <div style={{ 
            flex: '1.2',
            minWidth: isMobile ? '300px' : '350px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '1rem' : '2rem',
              margin: 0
            }}
            className="quality-card-row"
            >
              <div 
                ref={el => cardRefs.current[0] = el}
                className={`spec-block spec-block-animate ${visibleCards.includes(0) ? 'visible' : ''}`}
                style={{ padding: isMobile ? '15px' : '20px' }}
              >
                <div 
                  style={{...imageContainerStyle, paddingBottom: isMobile ? '90%' : '100%'}}
                  onClick={() => openModal('/images/photo1.jpg')}
                >
                  <img src="/images/photo1.jpg" alt="Diamond View" style={imageStyle} />
                </div>
                <h3 className="spec-name" style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>Diamond View</h3>
                <div style={{
                  fontSize: isMobile ? '1.2rem' : '1.4rem',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.5rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>No inclusions</div>
                <p className="spec-description" style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>No defects, dislocations &lt;10¹ cm⁻²</p>
              </div>
              
              <div 
                ref={el => cardRefs.current[1] = el}
                className={`spec-block spec-block-animate ${visibleCards.includes(1) ? 'visible' : ''}`}
                style={{ padding: isMobile ? '15px' : '20px' }}
              >
                <div 
                  style={{...imageContainerStyle, paddingBottom: isMobile ? '90%' : '100%'}}
                  onClick={() => openModal('/images/photo2.jpg')}
                >
                  <img src="/images/photo2.jpg" alt="Polarized Light Microscopy" style={imageStyle} />
                </div>
                <h3 className="spec-name" style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>Polarized Light</h3>
                <div style={{
                  fontSize: isMobile ? '1.2rem' : '1.4rem',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.5rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>Very low strain</div>
                <p className="spec-description" style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>Perfect for optical applications</p>
              </div>
            </div>
            
            {/* Средний ряд: X-Ray Diffraction по центру */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              margin: isMobile ? '1rem 0' : '2rem 0'
            }}>
              <div 
                ref={el => cardRefs.current[2] = el}
                className={`spec-block spec-block-animate ${visibleCards.includes(2) ? 'visible' : ''}`}
                style={{ 
                  padding: isMobile ? '15px' : '20px',
                  width: isMobile ? '100%' : 'calc(((100% - 2rem) / 2))'
                }}
              >
                <div 
                  style={{...imageContainerStyle, paddingBottom: isMobile ? '90%' : '100%'}}
                  onClick={() => openModal('/images/photo5.jpg')}
                >
                  <img src="/images/photo5.jpg" alt="X-Ray Diffraction Imaging" style={imageStyle} />
                </div>
                <h3 className="spec-name" style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>X-Ray Diffraction</h3>
                <div style={{
                  fontSize: isMobile ? '1.2rem' : '1.4rem',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.5rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>&lt;50 cm⁻²</div>
                <p className="spec-description" style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>Dislocation density</p>
              </div>
            </div>
            
            {/* Нижний ряд: 2 графика */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '1rem' : '2rem',
              margin: isMobile ? '1rem 0 0 0' : '2rem 0 0 0'
            }}>
              <div 
                ref={el => cardRefs.current[3] = el}
                className={`spec-block spec-block-animate ${visibleCards.includes(3) ? 'visible' : ''}`}
                style={{ padding: isMobile ? '15px' : '20px' }}
              >
                <div 
                  style={{...imageContainerStyle, paddingBottom: isMobile ? '90%' : '100%'}}
                  onClick={() => openModal('/images/photo3.jpg')}
                >
                  <img src="/images/photo3.jpg" alt="FTIR" style={imageStyle} />
                </div>
                <h3 className="spec-name" style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>FTIR</h3>
                <div style={{
                  fontSize: isMobile ? '1.2rem' : '1.4rem',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.5rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>Ultra-pure</div>
                <p className="spec-description" style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>Exceptional crystal purity</p>
              </div>
              
              <div 
                ref={el => cardRefs.current[4] = el}
                className={`spec-block spec-block-animate ${visibleCards.includes(4) ? 'visible' : ''}`}
                style={{ padding: isMobile ? '15px' : '20px' }}
              >
                <div 
                  style={{...imageContainerStyle, paddingBottom: isMobile ? '90%' : '100%'}}
                  onClick={() => openModal('/images/photo4.jpg')}
                >
                  <img src="/images/photo4.jpg" alt="UV-Vis" style={imageStyle} />
                </div>
                <h3 className="spec-name" style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>UV-Vis</h3>
                <div style={{
                  fontSize: isMobile ? '1.2rem' : '1.4rem',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0.5rem 0',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}>Low absorbance</div>
                <p className="spec-description" style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>Premium optical quality</p>
              </div>
            </div>
          </div>
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