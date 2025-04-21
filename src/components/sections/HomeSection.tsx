import { useRef, useState } from 'react';
import '../../styles/home.css';
import ContactModal from '../../components/ContactModal';
import { trackButtonClick } from '../../utils/analytics';

const HomeSection: React.FC<{ scrollToSection: (sectionId: string) => void }> = ({ scrollToSection }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    <section id="home" className="section home-section" ref={sectionRef}>
      <div className="content-wrapper">
        <div className="hero-content">
          <h1 
            className="main-headline gradient-headline"
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              marginBottom: '1.5rem',
              textAlign: 'center',
              color: 'white'
            }}
          >
            FLAWLESS DIAMOND SUBSTRATES
          </h1>
          
          <p 
            className="sub-headline gradient-headline"
            style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              letterSpacing: '0.5px',
              lineHeight: '1.5',
              marginBottom: '2rem',
              textAlign: 'center',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
              color: 'white'
            }}
          >
            Produced by Advanced HPHT technology for cutting-edge applications
          </p>
          
          <button 
            className="hero-button" 
            onClick={openModal}
            aria-label="Contact us for more information"
          >
            GET IN TOUCH
          </button>
        </div>
      </div>
      
      {/* Модальное окно с контактной формой */}
      <ContactModal isOpen={modalOpen} onClose={closeModal} />
    </section>
  );
};

export default HomeSection; 