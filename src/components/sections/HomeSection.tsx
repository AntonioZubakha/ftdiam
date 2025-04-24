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
    scrollToSection('contacts');
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
            <button 
              className="home__button"
              onClick={handleContactClick}
              aria-label="Contact us for more information"
            >
              GET IN TOUCH
            </button>
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