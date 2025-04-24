import React, { useState, useEffect, useRef } from 'react';
import { trackButtonClick } from '../../utils/analytics';

const ProductsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageLoadedArray = useRef<boolean[]>([]);
  
  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 576);
    };
    
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Данные о продуктах точно по ТЗ
  const products = [
    {
      id: 1,
      title: "Advanced HPHT Diamond Substrates",
      image: "/images/photo1.11.png",
      specs: [
        "Type IIa single-crystal plates",
        "Sizes: 3x3 mm to 15x15 mm",
        "Thickness: 0.1-10 mm",
        "Purity: ≤5 ppb Nitrogen",
        "Dislocations: As low as 10¹ cm⁻²",
        "Surface: Polished up to 0.5 nm Ra",
        "Customization: Shapes, sizes, doping, orientation, miscut, polishing, etc."
      ]
    },
    {
      id: 2,
      title: "Diamond Anvils",
      image: "/images/photo1.2.png",
      specs: [
        "Diameters: 2.5-4 mm",
        "Designs: Smooth or faceted",
        "Table orientation: (100) standard, custom available",
        "Quality: No inclusions and defects at 50x magnification, low birefringence"
      ]
    },
    {
      id: 3,
      title: "Custom Products",
      image: "/images/photo1.3.png",
      specs: [
        "Lenses",
        "Optical windows",
        "Membranes",
        "Rods",
        "Holders"
      ]
    },
    {
      id: 4,
      title: "CVD Diamond Substrates",
      image: "/images/photo1.4.png",
      specs: [
        "Single-crystal CVD plates",
        "Sizes: 3x3 mm to 30x30 mm",
        "Thickness: 0.3-10 mm",
        "Boron Concentration ≈ 0 ppb",
        "Nitrogen Concentration ≈ 100 ppb",
        "Dislocations density ≈ 10⁵⁻⁷cm⁻²",
        "Surface: Polished up to 0.5 nm Ra",
        "Customization: Shapes, sizes, orientation, miscut, polishing, etc."
      ]
    }
  ];
  
  // Предзагрузка изображений с улучшенной версией
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Также загружаем изображение из секции с видео
        const imagePromises = [
          ...products.map((product, index) => {
            return new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => {
                imageLoadedArray.current[index] = true;
                resolve();
              };
              img.onerror = () => {
                // Even if error, mark as loaded to allow rendering
                imageLoadedArray.current[index] = true;
                resolve();
              };
              img.src = product.image;
            });
          }),
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = "/images/6565.jpg";
          })
        ];
        
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
        // Even if there's an error, mark images as loaded
        setImagesLoaded(true);
      }
    };
    
    loadImages();
  }, []);
  
  const handlePrevClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(prevIndex => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
  };
  
  const handleNextClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(prevIndex => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);
  
  const currentProduct = products[activeIndex];
  
  // Подготовка следующего и предыдущего индексов для предзагрузки
  const nextIndex = activeIndex === products.length - 1 ? 0 : activeIndex + 1;
  const prevIndex = activeIndex === 0 ? products.length - 1 : activeIndex - 1;
  
  // Функция для прокрутки к секции контактов
  const scrollToContacts = () => {
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' });
      // Отслеживаем клик по кнопке
      trackButtonClick('product_contact_tailored');
    }
  };
  
  if (!imagesLoaded) {
    return (
      <section id="products" className="products-section loading">
        <div className="loading-indicator">
          <div>Loading products...</div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="products" className="products-section">
      <div className="products-container">
        <div className="products-inner-container">
          <div className="products-headline-container">
            <h2 className="gradient-headline">
              High Quality Diamond Products
            </h2>
          </div>
        </div>
        
        <div className="products-content-wrapper">
          {/* Левая часть с видео и изображениями */}
          <div className="video-container">
            <div className="media-item video-top-left">
              <video autoPlay muted loop playsInline>
                <source src="/video/1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="media-item image-top-right tailored-solutions-container">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <h3 className="tailored-solutions-title">
                  Tailored Solutions<br />
                  For Cutting-Edge<br />
                  Applications
                </h3>
              </div>
            </div>
            <div className="media-item image-bottom-left">
              <img src="/images/6565.jpg" alt="Diamond quality control" />
            </div>
            <div className="media-item video-bottom-right">
              <video autoPlay muted loop playsInline>
                <source src="/video/2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          {/* Правая часть со слайдером */}
          <div className="product-content">
            <div className="product-details-wrapper">
              <div className="product-details">
                <div className="title-nav-container">
                  <button 
                    className="nav-button"
                    onClick={handlePrevClick}
                    aria-label="Previous product"
                    disabled={isTransitioning}
                  >
                  </button>
                  <h4 className={`product-section-title ${isTransitioning ? 'transitioning' : ''}`}>
                    {currentProduct.title}
                  </h4>
                  <button 
                    className="nav-button"
                    onClick={handleNextClick}
                    aria-label="Next product"
                    disabled={isTransitioning}
                  >
                  </button>
                </div>
                
                <div className="product-image-container">
                  {/* Текущее изображение */}
                  <img 
                    src={currentProduct.image} 
                    alt={currentProduct.title} 
                    className={`product-image ${isTransitioning ? 'transitioning' : ''}`}
                  />
                  
                  {/* Предзагрузка следующего и предыдущего изображения */}
                  <div className="preload-images">
                    <img src={products[nextIndex].image} alt="Preload next" />
                    <img src={products[prevIndex].image} alt="Preload previous" />
                  </div>
                </div>

                <div className="product-content-scroll">
                  <div className="spec-list-container">
                    <ul className={`spec-list ${isTransitioning ? 'transitioning' : ''}`}>
                      {currentProduct.specs.map((spec, index) => (
                        <li key={index} className="spec-item">
                          <span className="gradient-diamond"></span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Кнопка запроса продуктов внизу слайдера - вынесена за пределы скроллируемой области */}
              <div className="product-request-button-container">
                <button 
                  onClick={scrollToContacts}
                  className="product-request-button"
                  aria-label="Request FTDiam products"
                  style={{
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 30px',
                    fontSize: isMobile ? 'var(--text-base)' : isSmallMobile ? 'var(--text-base)' : 'var(--text-md)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 5,
                    width: 'auto',
                    marginTop: '20px'
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
                  Request FTDiam Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection; 