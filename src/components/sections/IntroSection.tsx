import React, { useState, useEffect, useRef } from 'react';
import '../../styles/intro.css';

const SPEC_CARDS = [
  {
    icon: 'fas fa-gem',
    name: 'Technologies',
    value: 'AHPHT',
    description: 'Advanced manufacturing methods',
    longDescription: false,
  },
  {
    icon: 'fas fa-expand-alt',
    name: 'Sizes',
    value: 'Up to 15×15 mm',
    description: 'Perfect for all applications',
    longDescription: false,
  },
  {
    icon: 'fas fa-microscope',
    name: 'Dislocation Density',
    value: '10¹ cm⁻²',
    description: 'Ultra-low defect concentration especially for mono-sectorial plates',
    longDescription: true,
  },
  {
    icon: 'fas fa-ruler-combined',
    name: 'Surface Perfection',
    value: 'Down to 0.5 nm',
    description: 'Exceptional polishing roughness',
    longDescription: false,
  },
] as const;

const IntroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setTimeout(() => {
        setContentLoaded(true);
      }, 100);
    });
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!contentLoaded) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1 && !visibleCards.includes(index)) {
            setVisibleCards((prev) => [...prev, index]);
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px',
    });

    const currentCardRefs = cardRefs.current;
    currentCardRefs.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      currentCardRefs.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [contentLoaded, visibleCards]);

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
      id="intro"
      className={`intro-section ${contentLoaded ? 'intro-section--ready' : 'intro-section--loading'}`}
    >
      <div className="intro-bg-layer" />

      <div className="content-wrapper">
        <div className="intro-header">
          <h2 className="headline gradient-headline">
            Top Quality IIa Diamond Substrates
          </h2>
          <p className="section-description">
            Explore the characteristics of best-in class AHPHT diamond plates with our comprehensive range of high-quality single crystal diamond substrates.
          </p>

          <a
            href={isMobile ? '#contact-form' : '#contacts'}
            className="intro-cta-button"
            onClick={(e) => {
              e.preventDefault();
              scrollToContacts();
            }}
          >
            EXPLORE MORE
          </a>
        </div>

        <div className="specs-grid">
          {SPEC_CARDS.map((card, index) => (
            <div
              key={card.name}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`spec-block spec-block-animate ${visibleCards.includes(index) ? 'visible' : ''}`}
            >
              <div className="spec-icon">
                <i className={card.icon} />
              </div>
              <h3 className="spec-name">{card.name}</h3>
              <div className="spec-value">{card.value}</div>
              <p className={`spec-description ${card.longDescription ? 'spec-description--long' : ''}`}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="gradient-banner">
          <div className="banner-container">
            <p className="banner-text banner-text-desktop">
              Developed for excellence. Trusted for precision. Perfect for advanced applications.
            </p>
            <p className="banner-text banner-text-mobile">
              Developed for excellence.<br />
              Trusted for precision.<br />
              Perfect for advanced applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
