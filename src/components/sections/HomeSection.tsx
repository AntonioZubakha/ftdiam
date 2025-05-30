import React, { useState, useEffect, useRef } from 'react';
import { FC } from 'react';
import { trackButtonClick } from '../../utils/analytics';

interface HomeSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HomeSection: FC<HomeSectionProps> = ({ scrollToSection }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize(); // Проверяем размер экрана при загрузке
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContactClick = () => {
    trackButtonClick('home_get_in_touch');
    
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
    <section className="home">
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
          </div>
          
          {!isMobile && (
            <div className="home__image">
              <img 
                src="/images/photo1.1.png" 
                alt="Diamond substrates visualization" 
                className="home__image-content"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeSection; 