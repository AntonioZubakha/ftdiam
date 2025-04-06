import { useState } from 'react';

const ProductsSection = () => {
  const [activeProduct, setActiveProduct] = useState(1);
  
  // Определяем стиль с фоновым изображением
  const backgroundStyle = {
    backgroundImage: `url(/images/background-products.svg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 1,
    zIndex: 0
  };

  const products = [
    {
      id: 1,
      name: "Quantum-Grade Substrates",
      shortDesc: "Ultra-pure substrates for quantum applications",
      description: "Our highest purity diamond substrates with nitrogen content below 5 ppb, ideal for quantum sensing, quantum computing, and NV center applications. These substrates feature ultra-low dislocation density of 10¹ cm⁻².",
      specs: [
        { name: "Nitrogen Content", value: "≤5 ppb" },
        { name: "Dislocation Density", value: "10¹ cm⁻²" },
        { name: "Size Options", value: "3x3 mm to 15x15 mm" },
        { name: "Thickness", value: "0.3 mm to 1.0 mm" },
        { name: "Surface Polish", value: "Double sided, Ra < 1 nm" }
      ],
      icon: "fas fa-atom"
    },
    {
      id: 2,
      name: "Electronics-Grade Substrates",
      shortDesc: "Optimized for power electronics",
      description: "High-performance substrates designed for power electronics and semiconductor applications. These substrates provide excellent thermal conductivity and electrical insulation properties.",
      specs: [
        { name: "Nitrogen Content", value: "5-50 ppb" },
        { name: "Dislocation Density", value: "10²-10³ cm⁻²" },
        { name: "Size Options", value: "3x3 mm to 12x12 mm" },
        { name: "Thickness", value: "0.3 mm to 1.0 mm" },
        { name: "Surface Polish", value: "Single or double sided, Ra < 5 nm" }
      ],
      icon: "fas fa-microchip"
    },
    {
      id: 3,
      name: "Optical-Grade Substrates",
      shortDesc: "Superior clarity for optical applications",
      description: "Diamond substrates with exceptional optical properties for beam windows, thermal sensors, and advanced optical devices.",
      specs: [
        { name: "Nitrogen Content", value: "≤50 ppb" },
        { name: "Dislocation Density", value: "10²-10³ cm⁻²" },
        { name: "Size Options", value: "3x3 mm to 10x10 mm" },
        { name: "Thickness", value: "0.2 mm to 0.5 mm" },
        { name: "Surface Polish", value: "Double sided, Ra < 1 nm" }
      ],
      icon: "fas fa-eye"
    },
    {
      id: 4,
      name: "Custom Solutions",
      shortDesc: "Tailored to your specific requirements",
      description: "We provide custom-designed diamond substrates to meet your specific research or industrial application needs, with optimized properties for your particular use case.",
      specs: [
        { name: "Nitrogen Content", value: "Customizable" },
        { name: "Dislocation Density", value: "Customizable" },
        { name: "Size Options", value: "Customizable" },
        { name: "Thickness", value: "Customizable" },
        { name: "Surface Polish", value: "According to specifications" }
      ],
      icon: "fas fa-cogs"
    }
  ];

  return (
    <section id="products" className="section products-section">
      <div style={backgroundStyle}></div>
      <div className="content-wrapper">
        <h2 className="headline">Our Products</h2>
        <p className="section-description">FTDiam offers a range of high-quality single-crystal diamond substrates optimized for different applications.</p>
        
        <div className="products-navigation">
          {products.map(product => (
            <button 
              key={product.id}
              className={`product-nav-btn ${activeProduct === product.id ? 'active' : ''}`}
              onClick={() => setActiveProduct(product.id)}
            >
              <i className={`${product.icon} product-nav-icon`}></i>
              <span className="product-nav-title">{product.name}</span>
              <span className="product-short-desc">{product.shortDesc}</span>
            </button>
          ))}
        </div>
        
        {products.map(product => (
          product.id === activeProduct && (
            <div key={product.id} className="product-info">
              <div className="product-image">
                <div className="product-image-overlay"></div>
                <img src="/images/555.png" alt={product.name} className="product-crystal-image" />
              </div>
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-specs">
                  <h4>Specifications:</h4>
                  <ul>
                    {product.specs.map((spec, index) => (
                      <li key={index}>
                        <span className="spec-name">{spec.name}:</span> 
                        <span className="spec-value">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="product-cta">
                  <a href="#contacts" className="cta-button">Request Quote</a>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  );
};

export default ProductsSection; 