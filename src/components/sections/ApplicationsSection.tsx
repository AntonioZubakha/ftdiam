import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import '../../styles/applications.css';

const APPLICATIONS = [
  {
    title: 'Quantum photonics',
    description: 'Ultra-low background fluorescence for enhanced signal purity',
    icon: 'fas fa-atom',
  },
  {
    title: 'Quantum sensors',
    description: 'Negligible background noise for high-sensitivity detection',
    customImage: '/images/quantum.png',
  },
  {
    title: 'Quantum computing',
    description: 'Extended T₂ coherence times for more stable qubit performance',
    icon: 'fas fa-microchip',
  },
  {
    title: 'Laser optics & windows',
    description: 'Minimal scattering and absorption for superior optical clarity',
    icon: 'fas fa-bullseye',
  },
  {
    title: 'Homoepitaxial growth',
    description: 'Near-zero inherited defects for high-quality crystal development',
    icon: 'fas fa-gem',
  },
  {
    title: 'X-ray & UV detectors',
    description: 'Improved charge collection efficiency for higher sensitivity',
    icon: 'fas fa-radiation',
  },
  {
    title: 'Power electronics',
    description: 'Fewer electrical breakdown points for greater device reliability',
    icon: 'fas fa-bolt',
  },
  {
    title: 'High-frequency electronics',
    description: 'High carrier mobility enabling fast, efficient signal transmission',
    icon: 'fas fa-broadcast-tower',
  },
] as const;

const ApplicationsSection: React.FC = () => {
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

  const handleContactClick = () => {
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="applications"
      className={`intro-section ${contentLoaded ? 'intro-section--ready' : 'intro-section--loading'}`}
    >
      <div className="intro-bg-layer" />

      <div className="content-wrapper">
        <div className="applications-header">
          <h2 className="headline gradient-headline">Applications</h2>
          <p className="section-description">
            AHPHT diamond substrates are produced to meet the stringent requirements of next-generation technologies, offering application-specific advantages across a wide range of advanced industries.
          </p>
        </div>

        <div className="specs-grid">
          {APPLICATIONS.map((app, index) => (
            <div
              key={app.title}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`spec-block spec-block-animate ${visibleCards.includes(index) ? 'visible' : ''}`}
            >
              <div className="spec-icon">
                {'customImage' in app ? (
                  <div
                    className="app-custom-icon"
                    style={{ '--icon-mask': `url(${app.customImage})` } as CSSProperties}
                  />
                ) : (
                  <i className={app.icon} />
                )}
              </div>
              <h3 className="spec-name">{app.title}</h3>
              <p className="spec-description">{app.description}</p>
            </div>
          ))}
        </div>

        <div className="applications-cta-wrapper">
          <button type="button" className="applications-cta-button" onClick={handleContactClick}>
            CONTACT US
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
