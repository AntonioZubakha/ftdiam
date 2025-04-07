import React, { useState } from 'react';

const ProductsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const products = [
    {
      name: "Diamond Substrates",
      image: "/images/photo1.1.jpg",
      specs: [
        "Type IIa single-crystal plates.",
        "Sizes: 3x3 mm to 15x15 mm; Thickness: 0.1-10 mm.",
        "Purity: ≤5 ppb Nitrogen.",
        "Dislocations: As low as 10¹ cm⁻².",
        "Surface: Polished up to 0.5 nm Ra.",
        "Customizable: Shapes, orientations ((100), (111), (110), etc.), miscut."
      ]
    },
    {
      name: "Diamond Anvils",
      image: "/images/photo1.2.jpg",
      specs: [
        "Diameters: 2.5-4 mm.",
        "Designs: Smooth or faceted.",
        "Table orientation: (100) standard, custom available.",
        "Quality: No inclusions and defects at 50x magnification, low birefringence."
      ]
    },
    {
      name: "Custom Products",
      image: "/images/photo1.3.jpg",
      specs: [
        "Lenses, optical windows and any shape per client specs."
      ]
    }
  ];

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentProduct = products[activeIndex];

  return (
    <section 
      id="products" 
      style={{
        padding: '5rem 0',
        background: 'white'
      }}
    >
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem'
        }}>
          High-Quality Diamond Products
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '3rem',
          alignItems: 'flex-start'
        }}>
          <div style={{
            position: 'relative',
            width: '95%',
            height: '750px',
            overflow: 'hidden',
            boxShadow: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'transparent',
            margin: '0 auto',
            borderRadius: '0px'
          }}>
            <video 
              src="/video/2.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                maxHeight: '98%',
                width: 'auto',
                height: 'auto',
                maxWidth: '98%',
                objectFit: 'contain',
                borderRadius: '0px'
              }}
            />
          </div>
          
          <div style={{
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            height: '750px',
            position: 'relative'
          }}>
            <h3 style={{
              textAlign: 'center',
              fontSize: '1.8rem',
              marginBottom: '2rem'
            }}>
              Tailored Solutions for Cutting-Edge Applications
            </h3>
            
            <div style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                height: '40px'
              }}>
                <button 
                  onClick={handlePrevClick}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    background: '#00837f',
                    color: 'white',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                >
                  &#9664;
                </button>
                
                <div style={{ 
                  fontWeight: 'bold',
                  width: '40px',
                  textAlign: 'center'
                }}>
                  {activeIndex + 1} / {products.length}
                </div>
                
                <button 
                  onClick={handleNextClick}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    background: '#00837f',
                    color: 'white',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                >
                  &#9654;
                </button>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(150px, 200px) 1fr',
                gap: '1.5rem',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                minHeight: '400px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '200px',
                  width: '200px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  <img 
                    src={currentProduct.image} 
                    alt={currentProduct.name}
                    style={{
                      width: '100%', 
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                
                <div style={{
                  overflowY: 'auto'
                }}>
                  <h4 style={{
                    fontSize: '1.4rem',
                    marginBottom: '1rem',
                    height: '30px'
                  }}>
                    {currentProduct.name}
                  </h4>
                  
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {currentProduct.specs.map((spec, index) => (
                      <li 
                        key={index}
                        style={{
                          marginBottom: '0.8rem',
                          paddingLeft: '1.5rem',
                          position: 'relative',
                          lineHeight: '1.5'
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: '#00837f'
                        }}>•</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              height: '20px',
              position: 'absolute',
              bottom: '2rem',
              left: 0,
              right: 0
            }}>
              {products.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    border: 'none',
                    background: index === activeIndex ? '#00837f' : '#e0e0e0',
                    padding: 0,
                    cursor: 'pointer',
                    transform: index === activeIndex ? 'scale(1.2)' : 'scale(1)'
                  }}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection; 