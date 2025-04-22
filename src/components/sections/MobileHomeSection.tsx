import { useRef, useState, useEffect } from 'react';
import '../../styles/home.css';
import '../../styles/mobile-home.css';
import ContactModal from '../../components/ContactModal';
import { trackButtonClick } from '../../utils/analytics';

const MobileHomeSection: React.FC<{ scrollToSection: (sectionId: string) => void }> = ({ scrollToSection }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation effect when component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Функция открытия модального окна с отслеживанием клика
  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trackButtonClick('home_get_in_touch');
    setModalOpen(true);
  };

  // Функция закрытия модального окна
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section id="home" className="home-section mobile-home-section" ref={sectionRef}>
      <div className={`home-container mobile-home-container ${isLoaded ? 'loaded' : ''}`}>
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
              onClick={openModal}
              aria-label="Contact us for more information"
            >
              GET IN TOUCH
            </button>
          </div>
        </div>
      </div>
      
      <ContactModal isOpen={modalOpen} onClose={closeModal} />
    </section>
  );
};

export default MobileHomeSection; 