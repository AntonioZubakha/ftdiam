import { useRef, useState, useEffect } from 'react';
import '../../styles/home.css';
import '../../styles/mobile-home.css';
import '../../styles/tablet-home.css';
import { trackButtonClick } from '../../utils/analytics';
import MobileHomeSection from './MobileHomeSection';
import TabletHomeSection from './TabletHomeSection';

// Screen size breakpoints
const SCREEN_SIZES = {
  MOBILE: 768,
  TABLET: 1520,
};

const HomeSection: React.FC<{ scrollToSection: (sectionId: string) => void }> = ({ scrollToSection }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Check screen size and set appropriate view
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= SCREEN_SIZES.MOBILE) {
        setScreenSize('mobile');
      } else if (width <= SCREEN_SIZES.TABLET) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  // Для мобильных устройств используем мобильную версию компонента
  if (screenSize === 'mobile') {
    return <MobileHomeSection scrollToSection={scrollToSection} />;
  }

  // Для планшетов используем планшетную версию компонента
  if (screenSize === 'tablet') {
    return <TabletHomeSection scrollToSection={scrollToSection} />;
  }

  // Для десктопа используем стандартную версию
  return (
    <section id="home" className="home-section" ref={sectionRef}>
      <div className="home-container">
        <div className="content-area">
          <div className="title-area">
            <h1 className="site-title">
              <div className="heading-wrapper">
                <span className="title-line gradient-headline no-wrap">FLAWLESS DIAMOND</span>
                <span className="title-line gradient-headline">SUBSTRATES</span>
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
              style={{
                background: 'linear-gradient(to right, #00837f, #241e46)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 30px',
                fontSize: 'var(--text-md)',
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
          
          <div className="image-area">
            <img 
              src="/images/photo1.1.png" 
              alt="Diamond substrates visualization" 
              className="feature-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection; 