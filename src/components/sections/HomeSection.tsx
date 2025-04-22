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
  const [isLoaded, setIsLoaded] = useState(false);
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

  // Animation effect when component mounts
  useEffect(() => {
    setIsLoaded(true);
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
      <div className={`home-container ${isLoaded ? 'loaded' : ''}`}>
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
            >
              GET IN TOUCH
            </button>
          </div>
          
          <div className="image-area">
            <img 
              src="/images/333.png" 
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