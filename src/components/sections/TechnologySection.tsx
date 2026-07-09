import React, { useState, useEffect, useRef } from 'react';
import '../../styles/technology.css';

const FEATURES = [
  'Special know-how raw materials.',
  'The use of specially prepared materials, resulting in precise control over boron and nitrogen content.',
  'Specially developed automation system that allows us to control temperature, pressure, humidity, and other parameters.',
  'Custom software solution operating in sync with the automation system enabling optimized control.',
  'Upgraded press machines.',
  'Customized mechanical structure of a cubic cell.',
  'Long term dynamically controlled growth process.',
];

const ADVANTAGES = [
  { icon: 'fas fa-arrow-trend-down', title: 'Ultra low dislocation density (10¹ cm⁻²)' },
  { icon: 'fas fa-flask', title: 'No Nitrogen' },
  { icon: 'fas fa-compress', title: 'Very low strain' },
];

const TechFeatureList: React.FC<{ variant: 'mobile' | 'desktop' }> = ({ variant }) => (
  <ul className={`tech-features-list tech-features-list--${variant}`}>
    {FEATURES.map((text) => (
      <li key={text} className="tech-feature-item">
        <span className="tech-feature-bullet" aria-hidden="true" />
        {text}
      </li>
    ))}
  </ul>
);

const MobileAdvantageCards: React.FC = () => (
  <div className="advantages-grid advantages-grid--mobile-tech">
    {ADVANTAGES.map(({ icon, title }) => (
      <div key={title} className="advantage-card advantage-card--mobile-tech">
        <div className="advantage-icon">
          <i className={`${icon} tech-advantage-icon tech-advantage-icon--mobile`} />
        </div>
        <h3 className="advantage-title gradient-subheadline tech-advantage-title--mobile">{title}</h3>
      </div>
    ))}
  </div>
);

const DesktopAdvantageCards: React.FC = () => (
  <div className="advantages-grid advantages-grid--desktop-tech">
    {ADVANTAGES.map(({ icon, title }) => (
      <div key={title} className="advantage-card advantage-card--desktop-tech">
        <div className="advantage-icon advantage-icon--desktop-tech">
          <i className={`${icon} tech-advantage-icon tech-advantage-icon--desktop`} />
        </div>
        <h3 className="advantage-title gradient-subheadline tech-advantage-title--desktop">{title}</h3>
      </div>
    ))}
  </div>
);

const TechnologySection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToContacts = () => {
    try {
      if (isMobile) {
        const contactForm = document.getElementById('contact-form') ||
          document.querySelector('.contact-form');

        if (contactForm) {
          contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });

          setTimeout(() => {
            const rect = contactForm.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = rect.top + scrollTop - 100;

            window.scrollTo({
              top: targetY,
              behavior: 'smooth',
            });
          }, 100);
        } else {
          const contactsSection = document.getElementById('contacts');
          if (contactsSection) {
            contactsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        const contactsSection = document.getElementById('contacts');
        if (contactsSection) {
          contactsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (error) {
      console.warn('Error during scroll:', error);
      window.location.href = '#contacts';
    }
  };

  return (
    <section
      id="technology"
      className="technology-section"
      ref={sectionRef}
    >
      <div className="technology-container">
        {isMobile ? (
          <>
            <div className="technology-headline-container technology-headline-container--mobile">
              <h2 className="technology-headline gradient-headline technology-headline--mobile">
                Advanced HPHT Technology
              </h2>
              <div className="technology-intro-wrap">
                <p className="technology-intro-text">
                  AHPHT technology was developed through extensive R&amp;D. We have established a unique HPHT growing methods.
                </p>
              </div>
              <TechFeatureList variant="mobile" />
            </div>

            <MobileAdvantageCards />

            <div className="tech-cta-wrapper tech-cta-wrapper--mobile">
              <button
                type="button"
                className="tech-cta-button tech-cta-button--mobile"
                onClick={scrollToContacts}
                aria-label="Contact us to request a quotation"
              >
                Request a Quotation
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="technology-headline-container technology-headline-container--desktop">
              <h2 className="technology-headline gradient-headline technology-headline--desktop">
                Advanced HPHT Technology
              </h2>
              <p className="technology-intro-text">
                AHPHT technology was developed through extensive R&amp;D. We have established a unique HPHT growing methods.
              </p>
            </div>

            <div className="technology-content-row">
              <div className="technology-features-col">
                <TechFeatureList variant="desktop" />
              </div>
              <DesktopAdvantageCards />
            </div>

            <div className="tech-cta-wrapper tech-cta-wrapper--desktop">
              <a
                href="#contacts"
                className="tech-cta-button tech-cta-button--desktop"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToContacts();
                }}
                aria-label="Contact us to request a quotation"
              >
                Request a Quotation
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TechnologySection;
