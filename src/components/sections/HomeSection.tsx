import React, { useState, useEffect, useRef, FC } from 'react';
import '../../styles/home.css';

interface HomeSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HomeSection: FC<HomeSectionProps> = ({ scrollToSection }) => {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize(); // Проверяем размер экрана при загрузке
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // Autoplay was prevented.
        console.warn("Video autoplay was prevented:", error);
      });
    }
  }, [isMobile]);

  const handleContactClick = () => {
    try {
      if (isMobile) {
        // На мобильных устройствах прокручиваем к форме обратной связи
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
      scrollToSection('contacts');
    }
  };

  return (
    <section id="home" className="home">
      <div className="home__video-container">
        <video 
          ref={videoRef}
          autoPlay 
          loop
          muted 
          playsInline 
          className="home__background-video"
          key={isMobile ? 'mobile' : 'desktop'}
        >
          <source src={isMobile ? "/video/mob.mp4" : "/video/V001.mp4"} type="video/mp4" />
        </video>
      </div>
      <div className="home__container">
        <div className="home__content">
          <div className="home__text">
            <h1 className="home__title">
              <span className="home__title-line gradient-headline">FLAWLESS DIAMOND</span>
              <span className="home__title-line gradient-headline">SUBSTRATES</span>
            </h1>
            <p className="home__description">
              Produced by Advanced HPHT technology<br />
              for cutting-edge applications
            </p>
            <a 
              href={isMobile ? "#contact-form" : "#contacts"}
              className="home__button"
              onClick={(e) => {
                e.preventDefault();
                handleContactClick();
              }}
              aria-label="Contact us for more information"
            >
              GET IN TOUCH
            </a>
            <div className="home__subtitle">
              Inspired by Nature. Engineered to Perfection.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection; 