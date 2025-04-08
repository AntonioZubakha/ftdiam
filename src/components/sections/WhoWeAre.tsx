import React from 'react';

const WhoWeAreSection: React.FC = () => {
  // Цвета из градиента в более светлых оттенках для фона с увеличенной контрастностью
  const lightTeal = 'rgba(0, 131, 127, 0.15)';  // Увеличена контрастность с 0.08 до 0.15
  const lightBlue = 'rgba(36, 30, 70, 0.15)';   // Увеличена контрастность с 0.08 до 0.15

  // Используем только inline-стили без зависимости от внешних CSS
  const sectionStyles = {
    padding: '160px 0 0 0', // Убрал нижний отступ 150px
    backgroundColor: '#fff',
    position: 'relative' as const,
    marginBottom: '0',
    marginTop: '0',
    borderTop: '1px solid #f0f0f0',
    borderBottom: '0', // Убрал нижнюю границу
    width: '100%',
    overflow: 'hidden'
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const headlineStyles = {
    fontSize: '3rem', // Используем размер из переменной --section-headline-size
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    textAlign: 'center' as const,
    marginBottom: '3rem', // --section-headline-margin
    position: 'relative' as const,
    fontWeight: '600' as const, // --font-weight-semibold
    letterSpacing: '0.5px', // --section-headline-letter-spacing
    display: 'inline-block'
  };

  const headlineAfterStyles = {
    content: '""',
    display: 'block',
    width: '50px', // --section-headline-after-width
    height: '3px', // --section-headline-after-height
    background: 'linear-gradient(to right, #00837f, #241e46)', // --main-gradient
    margin: '15px auto 0',
    transition: 'width 0.3s ease' // --transition-normal
  };

  // Стиль для грида
  const gridContainerStyles = {
    width: '100%',
    position: 'relative' as const,
    backgroundColor: '#fff', // Убрал цвет разделительных линий
    padding: '0', // Убрал отступ для линий
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0', // Убрал отступ между карточками
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative' as const,
  };

  // Базовый стиль для блоков
  const blockStyles = {
    padding: '30px',
    position: 'relative' as const,
    zIndex: 1,
    minHeight: '400px', // Увеличена высота с 345px
    display: 'flex' as const,
    flexDirection: 'column' as const,
    justifyContent: 'flex-start' as const
  };

  // Стили для левых блоков, которые расширяются влево
  const leftBlockStyle = {
    ...blockStyles,
    position: 'relative' as const,
  };

  // Стили для правых блоков, которые расширяются вправо
  const rightBlockStyle = {
    ...blockStyles,
    position: 'relative' as const,
  };

  // Стили для псевдоэлементов, которые расширяются от края карточки до края экрана
  const leftBlockExtensionStyles = {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    width: '100vw',
    right: '100%', // Расширяется влево от края карточки
    zIndex: -1
  };

  const rightBlockExtensionStyles = {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    width: '100vw',
    left: '100%', // Расширяется вправо от края карточки
    zIndex: -1
  };

  const blockTitleStyles = {
    fontSize: '24px',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    marginBottom: '15px',
    fontWeight: '600' as const
  };

  const founderPhotoStyles = {
    width: '100%',
    height: '140px',
    marginBottom: '15px'
  };

  const founderPhotoImgStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const
  };

  // Гарантируем что год выделен
  const yearStyles = {
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    fontWeight: 'bold' as const,
    display: 'inline-block'
  };

  // Стиль для имен основателей (градиентный)
  const founderNameStyles = {
    fontSize: '20px',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    margin: '0 0 5px 0',
    fontWeight: '600' as const
  };

  // Стиль для подзаголовков (должности)
  const roleStyles = {
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    fontWeight: 'bold' as const,
    marginBottom: '10px',
    fontSize: '16px'
  };

  // Стили для адаптивности
  const getResponsiveHeadlineStyles = () => {
    // Медиа-запрос реализован через проверку ширины окна
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) {
        return {
          fontSize: '2.25rem' // --section-headline-mobile-size
        };
      } else if (window.innerWidth <= 992) {
        return {
          fontSize: '2.5rem' // --section-headline-tablet-size
        };
      }
    }
    return {};
  };

  return (
    <section id="about" style={sectionStyles}>
      <div style={containerStyles}>
        <div style={{textAlign: 'center'}}>
          <h2 style={{...headlineStyles, ...getResponsiveHeadlineStyles()}}>
            Who We Are
            <span style={headlineAfterStyles}></span>
          </h2>
        </div>
      </div>
      
      <div style={gridContainerStyles}>
        <div style={gridStyles}>
          {/* Block 1: About Us - Левый блок */}
          <div style={{...leftBlockStyle, backgroundColor: lightTeal, height: '450px'}}>
            {/* Расширение влево */}
            <div style={{...leftBlockExtensionStyles, backgroundColor: lightTeal}}></div>
            <h3 style={blockTitleStyles}>About Us</h3>
            <p style={{ lineHeight: '1.6', flex: 1 }}>
              FTDiam is a US-based deep-tech start-up in advanced materials sector. We are revolutionizing the industry with the unique Advanced HPHT (AHPHT) technology. Since our inception, we've been dedicated to producing the highest-quality single-crystal diamond substrates for advanced applications.
            </p>
          </div>
          
          {/* Block 2: History - Правый блок */}
          <div style={{...rightBlockStyle, backgroundColor: lightBlue, height: '450px'}}>
            {/* Расширение вправо */}
            <div style={{...rightBlockExtensionStyles, backgroundColor: lightBlue}}></div>
            <h3 style={blockTitleStyles}>History</h3>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <p style={{ marginBottom: '15px' }}>
                <span style={yearStyles}>2022</span> - Founded as a sales-focused entity sourcing diamonds from a partner facility in India.
              </p>
              <p style={{ marginBottom: '15px' }}>
                <span style={yearStyles}>2023</span> - Expanded partnerships and client base across quantum technology sector.
              </p>
              <p>
                <span style={yearStyles}>2027</span> - Planned establishment of own AHPHT production facility.
              </p>
            </div>
          </div>
          
          {/* Block 3: CTO - Левый блок */}
          <div style={{...leftBlockStyle, backgroundColor: lightBlue, height: '450px'}}>
            {/* Расширение влево */}
            <div style={{...leftBlockExtensionStyles, backgroundColor: lightBlue}}></div>
            <div style={{ ...founderPhotoStyles, flex: '0 0 auto', height: '220px' }}>
              <img 
                src="/images/Dmitri.png" 
                alt="Dmitry Semchenko" 
                style={founderPhotoImgStyles}
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <h3 style={founderNameStyles}>Dmitry Semchenko</h3>
              <div style={roleStyles}>CTO</div>
              <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
                Serial entrepreneur with over 8 years in high-quality diamond material. Holder of AHPHT technology.
              </p>
            </div>
          </div>
          
          {/* Block 4: CEO - Правый блок */}
          <div style={{...rightBlockStyle, backgroundColor: lightTeal, height: '450px'}}>
            {/* Расширение вправо */}
            <div style={{...rightBlockExtensionStyles, backgroundColor: lightTeal}}></div>
            <div style={{ ...founderPhotoStyles, flex: '0 0 auto', height: '220px' }}>
              <img 
                src="/images/Dan.png" 
                alt="Daniil Kurganov" 
                style={founderPhotoImgStyles}
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <h3 style={founderNameStyles}>Daniil Kurganov</h3>
              <div style={roleStyles}>CEO</div>
              <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
                15+ years in management, technical sales and business development worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection; 