import React, { useState, useEffect, useRef } from 'react';
import '../../styles/products.css';

const ProductsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const imagesLoaded = useRef<boolean[]>([]);
  
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
      title: "Diamond Substrates",
      image: "/images/photo1.1.png",
      specs: [
        "Type IIa single-crystal plates",
        "Sizes: 3x3 mm to 15x15 mm",
        "Thickness: 0.1-10 mm",
        "Purity: ≤5 ppb Nitrogen",
        "Dislocations: As low as 10¹ cm⁻²",
        "Surface: Polished up to 0.5 nm Ra",
        "Customizable: Shapes, orientations ((100), (111), (110), etc.), miscut"
      ]
    },
    {
      id: 2,
      title: "Diamond Anvils",
      image: "/images/photo1.2.png",
      specs: [
        "Diameters: 2.5-4 mm.",
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
        "Lenses, optical windows and any shape per client specs"
      ]
    }
  ];
  
  // Предзагрузка изображений
  useEffect(() => {
    products.forEach((product, index) => {
      const img = new Image();
      img.src = product.image;
      img.onload = () => {
        imagesLoaded.current[index] = true;
      };
    });
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
  
  return (
    <section id="products" className="products-section">
      <div className="products-container">
        <div className="products-inner-container">
          <div className="products-headline-container">
            <h2 className="gradient-headline" style={{ 
              fontSize: isMobile ? 'var(--section-headline-mobile-size)' : 'var(--section-headline-size)' 
            }}>
              High Quality Diamond Products
            </h2>
          </div>
        </div>
        
        <div className="products-content-wrapper">
          {/* Левая часть с видео и изображениями */}
          <div className="video-container">
            <div className="media-item video-top-left">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
              >
                <source src="/video/1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="media-item image-top-right tailored-solutions-container">
              <h3 className="tailored-solutions-title">
                Tailored Solutions For Cutting-Edge Applications
              </h3>
            </div>
            <div className="media-item image-bottom-left">
              <img 
                src="/images/6565.jpg" 
                alt="Diamond quality control"
              />
            </div>
            <div className="media-item video-bottom-right">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
              >
                <source src="/video/2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          {/* Правая часть со слайдером */}
          <div className="product-content">
            <div className="product-details">
              <div className="title-nav-container">
                <button 
                  className="nav-button"
                  onClick={handlePrevClick}
                  aria-label="Previous product"
                  disabled={isTransitioning}
                >
                </button>
                <h4 className="product-section-title" style={{ 
                  opacity: isTransitioning ? 0.5 : 1,
                  fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.6rem' : 'var(--h4-desktop)',
                  fontWeight: isMobile ? 'bold' : '600'
                }}>
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
                  className="product-image"
                  style={{ 
                    opacity: isTransitioning ? 0.5 : 1,
                    transform: isTransitioning ? 'scale(0.95)' : 'scale(1)'
                  }}
                />
                
                {/* Предзагрузка следующего и предыдущего изображения */}
                <div style={{ display: 'none' }}>
                  <img src={products[nextIndex].image} alt="Preload next" />
                  <img src={products[prevIndex].image} alt="Preload previous" />
                </div>
              </div>

              <div className="spec-list-container">
                <ul className="spec-list" style={{ opacity: isTransitioning ? 0.5 : 1 }}>
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
        </div>
      </div>
    </section>
  );
};

export default ProductsSection; 