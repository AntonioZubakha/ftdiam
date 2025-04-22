import { useRef, useState, useEffect } from 'react';
import '../../styles/home.css';
import '../../styles/mobile-home.css';
import '../../styles/tablet-home.css';
import { trackButtonClick } from '../../utils/analytics';

const TabletHomeSection: React.FC<{ scrollToSection: (sectionId: string) => void }> = ({ scrollToSection }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [deviceType, setDeviceType] = useState<string>('');

  // Check orientation and device type
  useEffect(() => {
    const checkOrientationAndDevice = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
      
      // Identify iPad
      const isIPad = /iPad/.test(navigator.userAgent) || 
                     (/Macintosh/.test(navigator.userAgent) && 'ontouchend' in document);
      
      // iPad Air specific dimensions (approximately)
      const isIPadAir = (window.innerWidth === 820 && window.innerHeight === 1180) || 
                        (window.innerWidth === 1180 && window.innerHeight === 820);
      
      if (isIPad || isIPadAir) {
        setDeviceType('ipad');
      } else {
        setDeviceType('other-tablet');
      }
    };
    
    checkOrientationAndDevice(); // Initial check
    window.addEventListener('resize', checkOrientationAndDevice);
    window.addEventListener('orientationchange', checkOrientationAndDevice);
    
    return () => {
      window.removeEventListener('resize', checkOrientationAndDevice);
      window.removeEventListener('orientationchange', checkOrientationAndDevice);
    };
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

  return (
    <section 
      id="home" 
      className={`home-section tablet-home-section ${isLandscape ? 'landscape' : ''} ${deviceType}`}
      ref={sectionRef}
    >
      <div className={`home-container tablet-home-container ${isLoaded ? 'loaded' : ''}`}>
        <div className="content-area tablet-content-area">
          {/* Image first for portrait tablet layout, or side by side for landscape */}
          <div className="image-area tablet-image-area">
            <img 
              src="/images/333.png" 
              alt="Diamond substrates visualization" 
              className="feature-image tablet-feature-image"
            />
          </div>
          
          <div className="title-area tablet-title-area">
            <h1 className="site-title tablet-site-title">
              <div className="heading-wrapper">
                <span className="title-line gradient-headline">FLAWLESS DIAMOND</span>
                <span className="title-line gradient-headline">SUBSTRATES</span>
              </div>
            </h1>
            
            <p className="site-tagline tablet-site-tagline">
              Produced by Advanced HPHT technology<br />
              for cutting-edge applications
            </p>
            
            <button 
              className="action-button tablet-action-button"
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

export default TabletHomeSection; 