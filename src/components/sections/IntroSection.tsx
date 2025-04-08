import React from 'react';

const IntroSection: React.FC = () => {
  // Определяем стиль с фоновым изображением
  const backgroundStyle = {
    backgroundImage: `url(/images/background.svg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top', // Привязываем фон к верху
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
    zIndex: 0,
    transform: 'rotate(180deg)' // Разворачиваем на 180 градусов
  };

  // Дополнительный фоновый элемент для правого верхнего угла
  const topRightBackgroundStyle = {
    position: 'absolute' as const,
    top: -30,
    right: -30,
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(244, 249, 250, 0.9) 0%, rgba(244, 249, 250, 0) 70%)',
    zIndex: 0,
    borderRadius: '50%'
  };

  // Стиль для иконок с градиентной заливкой
  const iconStyle = {
    fontSize: '60px',
    opacity: 0.7,
    marginBottom: '15px',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    display: 'inline-block'
  };

  // Градиентный стиль для значений
  const valueStyle = {
    fontSize: '1.8rem',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    margin: '1rem 0',
    fontWeight: 'bold' as const,
    letterSpacing: '0.5px',
    display: 'inline-block'
  };

  return (
    <section id="intro" className="intro-section">
      <div style={backgroundStyle}></div>
      <div style={topRightBackgroundStyle}></div>
      <div className="content-wrapper">
        <h2 className="headline gradient-headline">Premium Diamond Specifications</h2>
        <p className="section-description">Setting the industry standard with exceptional quality</p>
        
        <div className="specs-grid">
          <div className="spec-block">
            <div className="spec-icon">
              <i className="fas fa-project-diagram" style={iconStyle}></i>
            </div>
            <h3 className="spec-name">Dislocations</h3>
            <div style={valueStyle}>10¹ cm⁻²</div>
            <p className="spec-description">Industry-leading purity</p>
          </div>
          
          <div className="spec-block">
            <div className="spec-icon">
              <i className="fas fa-expand-alt" style={iconStyle}></i>
            </div>
            <h3 className="spec-name">Size</h3>
            <div style={valueStyle}>up to 15×15 mm</div>
            <p className="spec-description">Perfect for all applications</p>
          </div>
          
          <div className="spec-block">
            <div className="spec-icon">
              <i className="fas fa-gem" style={iconStyle}></i>
            </div>
            <h3 className="spec-name">Purity</h3>
            <div style={valueStyle}>≤5 ppb N</div>
            <p className="spec-description">Ultra-low nitrogen content</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 