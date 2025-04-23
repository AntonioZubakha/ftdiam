import { FC } from 'react';
import '../../styles/home.css';
import { trackButtonClick } from '../../utils/analytics';

const HomeSection: FC = () => {
  const handleContactClick = () => {
    trackButtonClick('home_get_in_touch');
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' });
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
            <button 
              className="home__button"
              onClick={handleContactClick}
              aria-label="Contact us for more information"
            >
              GET IN TOUCH
            </button>
          </div>
          
          <div className="home__image">
            <img 
              src="/images/photo1.1.png" 
              alt="Diamond substrates visualization" 
              className="home__image-content"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection; 