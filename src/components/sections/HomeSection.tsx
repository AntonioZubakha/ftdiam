import { useRef, useEffect, useState } from 'react';
import '../../styles/home.css';
import ContactModal from '../../components/ContactModal';
import { trackButtonClick } from '../../utils/analytics';

const HomeSection: React.FC<{ scrollToSection: (sectionId: string) => void }> = ({ scrollToSection }) => {
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Определяем, является ли устройство мобильным
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Set normal playback rate (1.0) for videos
    const leftVideo = leftVideoRef.current;
    const rightVideo = rightVideoRef.current;
    const mobileVideo = mobileVideoRef.current;
    
    if (leftVideo) {
      leftVideo.playbackRate = 1.0;
    }
    
    if (rightVideo) {
      rightVideo.playbackRate = 1.0;
    }

    if (mobileVideo) {
      mobileVideo.playbackRate = 1.0;
    }
  }, []);

  // Функция открытия модального окна с отслеживанием клика
  const openModal = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем любые действия по умолчанию
    e.stopPropagation(); // Останавливаем всплытие события
    trackButtonClick('home_get_in_touch');
    setModalOpen(true);
  };

  // Функция закрытия модального окна
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section id="home" className="section home-section" ref={sectionRef}>
      <div className="home-video-container">
        {isMobile ? (
          // Мобильная версия - одно видео
          <div className="mobile-screen">
            <video
              ref={mobileVideoRef}
              className="background-video"
              autoPlay
              muted
              playsInline
              loop
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                position: 'absolute'
              }}
            >
              <source src="/video/mobile.mp4" type="video/mp4" />
            </video>
          </div>
        ) : (
          // Десктоп версия - два видео
          <div className="split-screen">
            <div className="split-screen-left" style={{ overflow: 'hidden' }}>
              <video 
                ref={leftVideoRef}
                className="background-video" 
                autoPlay 
                muted 
                playsInline 
                loop
                style={{ 
                  objectFit: 'cover',
                  width: '110%', // Увеличиваем размер на 10% для большего растяжения
                  height: '110%',
                  left: '-5%', // Центрируем видео
                  top: '-5%',
                  position: 'absolute'
                }} 
              >
                <source src="/video/nature.mp4" type="video/mp4" />
              </video>
            </div>
            
            <div className="split-screen-right">
              <video 
                ref={rightVideoRef}
                className="background-video" 
                autoPlay 
                muted 
                playsInline 
                loop
              >
                <source src="/video/tech.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        )}
        
        {/* Визуальный маркер для центра экрана (будет скрыт на продакшене) */}
        <div className="center-marker"></div>
      </div>
      
      <div className="content-wrapper">
        <div className="hero-content">
          <div className="hero-text-background"></div>
          <div className="hero-text">
            <div className="text-with-shadow">
              <h2 className="hero-subheadline">FLAWLESS DIAMOND SUBSTRATES</h2>
            </div>
            <div className="text-with-shadow">
              <div className="text-shadow-element">Produced by Advanced HPHT technology for cutting-edge applications</div>
              <p className="hero-description">Produced by Advanced HPHT technology for cutting-edge applications</p>
            </div>
            
            {/* Кнопка для открытия модального окна */}
            <button 
              className="hero-button" 
              onClick={openModal}
              aria-label="Contact us for more information"
              style={{
                background: 'rgba(255, 255, 255, 0.01)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '8px',
                padding: '16px 32px',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-weight-semibold)',
                cursor: 'pointer',
                marginTop: 'var(--spacing-8)',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                position: 'relative',
                zIndex: 3,
                outline: 'none',
                textUnderlineOffset: '6px',
                backdropFilter: 'blur(5px)',
              }}
              onMouseOver={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.background = 'rgba(255, 255, 255, 0.1)';
                target.style.border = '1px solid rgba(255, 255, 255, 1)';
                target.style.transform = 'translateY(-3px)';
              }}
              onMouseOut={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.background = 'rgba(255, 255, 255, 0.01)';
                target.style.border = '1px solid rgba(255, 255, 255, 0.8)';
                target.style.transform = 'translateY(0)';
              }}
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
      
      {/* Модальное окно с контактной формой */}
      <ContactModal isOpen={modalOpen} onClose={closeModal} />
    </section>
  );
};

export default HomeSection; 