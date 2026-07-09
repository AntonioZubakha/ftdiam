import React, { useState, useEffect, useRef, useMemo, type CSSProperties } from 'react';
import '../../styles/quality.css';

const QualitySection: React.FC = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const setSliderTransform = (transform: string) => {
    if (sliderRef.current) {
      sliderRef.current.style.setProperty('--slider-transform', transform);
    }
  };

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

  const imagePaths = useMemo(() => [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo5.jpg',
    '/images/photo3.jpg',
    '/images/photo4.jpg',
  ], []);

  const cardData = [
    {
      image: '/images/photo1.jpg',
      title: 'Diamond View',
      highlight: 'No inclusions',
      description: 'No defects, dislocations <10¹ cm⁻²',
    },
    {
      image: '/images/photo2.jpg',
      title: 'Polarized Light',
      highlight: 'Very low strain',
      description: 'Perfect for optical applications',
    },
    {
      image: '/images/photo5.jpg',
      title: 'X-Ray Diffraction',
      highlight: '<50 cm⁻²',
      description: 'Dislocation density',
    },
    {
      image: '/images/photo3.jpg',
      title: 'FTIR',
      highlight: 'Ultra-pure',
      description: 'Exceptional crystal purity',
    },
    {
      image: '/images/photo4.jpg',
      title: 'UV-Vis',
      highlight: 'Low absorbance',
      description: 'Premium optical quality',
    },
  ];

  useEffect(() => {
    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
      });
    };

    Promise.all(imagePaths.map((path) => loadImage(path)))
      .then(() => {
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error('Error preloading images:', error);
        setImagesLoaded(true);
      });
  }, [imagePaths]);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 992);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

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
  }, [imagesLoaded, visibleCards]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setSliderTransform(`translateX(-${index * 100}%)`);
  };

  const prevSlide = () => {
    const newIndex = currentSlide === 0 ? cardData.length - 1 : currentSlide - 1;
    goToSlide(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentSlide === cardData.length - 1 ? 0 : currentSlide + 1;
    goToSlide(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const containerWidth = sliderRef.current.clientWidth;
    const percentMoved = (diff / containerWidth) * 100;

    const newOffset = Math.max(
      Math.min(percentMoved, currentSlide === 0 ? 20 : 0),
      currentSlide === cardData.length - 1 ? -20 : -100,
    );

    setSlideOffset(newOffset);
    setSliderTransform(`translateX(calc(-${currentSlide * 100}% + ${newOffset}%))`);
  };

  const handleTouchEnd = () => {
    if (!isDragging || !sliderRef.current) return;

    setIsDragging(false);

    if (slideOffset > 20) {
      prevSlide();
    } else if (slideOffset < -20) {
      nextSlide();
    } else {
      setSliderTransform(`translateX(-${currentSlide * 100}%)`);
    }

    setSlideOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const currentX = e.clientX;
    const diff = currentX - startX;
    const containerWidth = sliderRef.current.clientWidth;
    const percentMoved = (diff / containerWidth) * 100;

    const newOffset = Math.max(
      Math.min(percentMoved, currentSlide === 0 ? 20 : 0),
      currentSlide === cardData.length - 1 ? -20 : -100,
    );

    setSlideOffset(newOffset);
    setSliderTransform(`translateX(calc(-${currentSlide * 100}% + ${newOffset}%))`);
  };

  const handleMouseUp = () => {
    if (!isDragging || !sliderRef.current) return;

    setIsDragging(false);

    if (slideOffset > 20) {
      prevSlide();
    } else if (slideOffset < -20) {
      nextSlide();
    } else {
      setSliderTransform(`translateX(-${currentSlide * 100}%)`);
    }

    setSlideOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = '';
  };

  const renderCardImage = (card: (typeof cardData)[number], index: number) => {
    if (index === 3) {
      return (
        <div
          className="quality-card-image--bg"
          style={{ '--card-bg': `url(${card.image})` } as CSSProperties}
        />
      );
    }

    return (
      <img
        src={card.image}
        alt={card.title}
        className={`quality-card-image${index === 4 ? ' quality-card-image--uvvis' : ''}`}
      />
    );
  };

  const renderDesktopCards = () => {
    return cardData.map((card, index) => (
      <div
        key={index}
        ref={(el) => { cardRefs.current[index] = el; }}
        className={`spec-block spec-block-animate ${visibleCards.includes(index) ? 'visible' : ''}`}
      >
        <div
          className="quality-image-container"
          onClick={() => openModal(card.image)}
        >
          {renderCardImage(card, index)}
        </div>
        <h3 className="spec-name">{card.title}</h3>
        <div className="spec-highlight">{card.highlight}</div>
        <p className="spec-description">{card.description}</p>
      </div>
    ));
  };

  const renderSlider = () => {
    return (
      <>
        <div className="slider-arrows">
          <button
            type="button"
            className="slider-arrow"
            onClick={prevSlide}
            aria-label="Previous slide"
          />
          <button
            type="button"
            className="slider-arrow"
            onClick={nextSlide}
            aria-label="Next slide"
          />
        </div>

        <div
          className={`mobile-slider${isDragging ? ' is-dragging' : ''}`}
          ref={sliderRef}
          style={{ '--slider-transform': `translateX(-${currentSlide * 100}%)` } as CSSProperties}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {cardData.map((card, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`spec-block spec-block-animate ${visibleCards.includes(index) ? 'visible' : ''}`}
            >
              <div
                className="quality-image-container"
                onClick={() => openModal(card.image)}
              >
                {renderCardImage(card, index)}
              </div>
              <h3 className="spec-name">{card.title}</h3>
              <div className="spec-highlight">{card.highlight}</div>
              <p className="spec-description">{card.description}</p>
            </div>
          ))}
        </div>

        {isTablet && (
          <div className="slider-indicators">
            {cardData.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`slider-indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <section
      id="quality"
      className={`quality-section${imagesLoaded ? ' quality-section--loaded' : ''}`}
    >
      <div className="quality-bg" aria-hidden="true" />
      <div className="quality-overlay" aria-hidden="true" />

      <div className="content-wrapper quality-content-wrapper">
        <div className="quality-inner">
          <div className="quality-title-block">
            <h2 className="quality-headline gradient-headline">
              Quality Analysis
            </h2>
            <h3 className="quality-subheadline">
              Tested. Proven. Exceptional.
            </h3>
            <p className="quality-description">
              Our diamonds undergo rigorous testing to ensure they meet the highest standards.
              See the evidence of our flawless quality below.
            </p>
          </div>

          <div className={`quality-cards-row ${isMobile ? 'slider-container' : ''}`}>
            {isMobile ? renderSlider() : renderDesktopCards()}
          </div>

          <a
            href={isMobile ? '#contact-form' : '#contacts'}
            className="request-document-button"
            onClick={(e) => {
              e.preventDefault();
              scrollToContacts();
            }}
            aria-label="Request analysis documentation"
          >
            REQUEST ANALYSIS DOCUMENTATION
          </a>
        </div>
      </div>

      {modalImage && (
        <div className="quality-modal-overlay" onClick={closeModal}>
          <img
            src={modalImage}
            alt="Enlarged view"
            className="quality-modal-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="quality-modal-close"
            onClick={closeModal}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
};

export default QualitySection;
