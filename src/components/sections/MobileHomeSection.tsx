import { useRef, useState, useEffect } from 'react';
import '../../styles/home.css';
import '../../styles/mobile-home.css';
import { trackButtonClick } from '../../utils/analytics';

const MobileHomeSection: React.FC<{ scrollToSection: (sectionId: string) => void }> = ({ scrollToSection }) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Функция для скролла к разделу контактов
  const scrollToContacts = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trackButtonClick('home_get_in_touch');
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="home-section mobile-home-section" ref={sectionRef}>
      <div className="home-container mobile-home-container">
        <div className="content-area mobile-content-area">
          {/* Изображение первым для мобильной версии */}
          <div className="image-area mobile-image-area">
            <img 
              src="/images/photo1.1.png" 
              alt="Diamond substrates visualization" 
              className="feature-image mobile-feature-image"
            />
          </div>
          
          <div className="title-area mobile-title-area">
            <h1 className="site-title mobile-site-title">
              <div className="heading-wrapper">
                <span className="title-line gradient-headline">FLAWLESS DIAMOND</span>
                <span className="title-line gradient-headline">SUBSTRATES</span>
              </div>
            </h1>
            
            <p className="site-tagline mobile-site-tagline">
              Produced by Advanced HPHT technology for cutting-edge applications
            </p>
            
            <div className="button-container" style={{ textAlign: 'center', width: '100%' }}>
              <button 
                className="action-button mobile-action-button"
                onClick={scrollToContacts}
                aria-label="Contact us for more information"
              >
                GET IN TOUCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileHomeSection; 