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
              src="/images/333.png" 
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
              Produced by Advanced HPHT technology<br />
              for cutting-edge applications
            </p>
            
            <button 
              className="action-button mobile-action-button"
              onClick={scrollToContacts}
              aria-label="Contact us for more information"
              style={{
                background: 'linear-gradient(to right, #00837f, #241e46)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 30px',
                fontSize: 'var(--text-base)',
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
              GET IN TOUCH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileHomeSection; 