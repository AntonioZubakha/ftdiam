import { useRef, useState, useEffect } from 'react';
import '../../styles/home.css';
import { trackButtonClick } from '../../utils/analytics';

const HomeSection: React.FC<{ scrollToSection: (sectionId: string) => void }> = ({ scrollToSection }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

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
    <section 
      id="home" 
      className="home-section" 
      ref={sectionRef}
    >
      <div className="home-container">
        <div className="content-area">
          <div className="title-area">
            <h1 className="site-title">
              <div className="heading-wrapper">
                <span className="title-line first-line gradient-headline">FLAWLESS DIAMOND</span>
                <span className="title-line second-line gradient-headline">SUBSTRATES</span>
              </div>
            </h1>
            
            <p className="site-tagline">
              Produced by Advanced HPHT technology<br />
              for cutting-edge applications
            </p>
            
            <button 
              className="action-button"
              onClick={scrollToContacts}
              aria-label="Contact us for more information"
            >
              GET IN TOUCH
            </button>
          </div>
          
          <div className="image-area">
            <img 
              src="/images/photo1.1.png" 
              alt="Diamond substrates visualization" 
              className="feature-image"
            />
          </div>
        </div>
        
        {/* Spacer div to create distance */}
        <div className="flex-spacer"></div>
      </div>
      
      {/* Full-width gradient banner */}
      <div className="gradient-banner">
        <div className="banner-container">
          <p className="banner-text">
            Developed for excellence. Trusted for precision. Perfect for advanced applications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeSection; 