import React from 'react';

const WhoWeAreSection: React.FC = () => {
  // Используем только inline-стили без зависимости от внешних CSS
  const sectionStyles = {
    padding: '120px 0 100px 0',
    backgroundColor: '#fff',
    position: 'relative' as const,
    marginBottom: '0',
    marginTop: '0',
    width: '100%',
    overflow: 'hidden'
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const headlineStyles = {
    fontSize: '3rem',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    textAlign: 'center' as const,
    marginBottom: '2rem',
    position: 'relative' as const,
    fontWeight: '600' as const,
    letterSpacing: '0.5px',
    display: 'inline-block'
  };

  // Новый стиль для обновленного макета
  const newLayoutStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    width: '100%',
    margin: '20px auto 0',
    position: 'relative' as const,
    maxWidth: '1200px',
    overflow: 'hidden'
  };

  // Стиль для левой колонки (About + люди)
  const leftColumnStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    backgroundColor: '#fff'
  };

  // Стиль для правой колонки (История)
  const rightColumnStyles = {
    padding: '50px 60px',
    height: '100%',
    position: 'relative' as const,
    minHeight: '900px', // Чтобы история занимала всю высоту
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start' as const,
    backgroundColor: '#fff'
  };

  // Базовый стиль для блоков
  const blockStyles = {
    padding: '40px',
    position: 'relative' as const,
    zIndex: 1,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    justifyContent: 'flex-start' as const
  };

  const aboutBlockStyles = {
    ...blockStyles,
    minHeight: '300px',
    padding: '50px 40px'
  };

  const foundersContainerStyles = {
    display: 'flex',
    flexDirection: 'row' as const,
    height: '500px',
    marginTop: '30px'
  };

  const founderBlockStyles = {
    ...blockStyles,
    flex: 1,
    padding: '40px 30px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)'
    }
  };

  const blockTitleStyles = {
    fontSize: '24px',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    marginBottom: '20px',
    fontWeight: '600' as const
  };

  // Отдельный стиль для центрированного заголовка About Us
  const centeredBlockTitleStyles = {
    ...blockTitleStyles,
    textAlign: 'center' as const,
    width: '100%',
    marginBottom: '40px'
  };

  const founderPhotoStyles = {
    width: '100%',
    height: '220px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const
  };

  const founderPhotoImgStyles = {
    width: '80%',
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
    display: 'inline-block',
    fontSize: '18px'
  };

  // Стиль для имен основателей (градиентный)
  const founderNameStyles = {
    fontSize: '20px',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    margin: '0 0 5px 0',
    fontWeight: '600' as const,
    textAlign: 'center' as const
  };

  // Стиль для подзаголовков (должности)
  const roleStyles = {
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    fontWeight: 'bold' as const,
    marginBottom: '10px',
    fontSize: '16px',
    textAlign: 'center' as const
  };

  // Стили для таймлайна
  const timelineContainerStyles = {
    position: 'relative' as const,
    marginTop: '40px',
    paddingLeft: '30px',
    maxWidth: '80%',
    margin: '40px auto 0'
  };

  // Вертикальная линия таймлайна
  const timelineLineStyles = {
    position: 'absolute' as const,
    top: '5px',
    bottom: '5px',
    left: '0',
    width: '3px',
    background: 'linear-gradient(to bottom, #00837f, #241e46)',
    borderRadius: '2px',
    zIndex: 1
  };

  const timelineItemStyles = {
    position: 'relative' as const,
    marginBottom: '50px',
    paddingLeft: '40px'
  };

  const timelineMarkerStyles = {
    position: 'absolute' as const,
    left: '-14px',
    top: '5px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    border: '3px solid #00837f',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const timelineMarker2Styles = {
    ...timelineMarkerStyles,
    top: '5px',
    border: '3px solid #00667f'
  };

  const timelineMarker3Styles = {
    ...timelineMarkerStyles,
    top: '5px',
    border: '3px solid #241e46'
  };

  const timelineDotStyles = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'linear-gradient(to right, #00837f, #241e46)'
  };

  const timelineContentStyles = {
    padding: '25px'
  };

  // Стили для адаптивности
  const getResponsiveHeadlineStyles = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) {
        return {
          fontSize: '2.25rem'
        };
      } else if (window.innerWidth <= 992) {
        return {
          fontSize: '2.5rem'
        };
      }
    }
    return {};
  };

  const timelineStyles = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative' as const,
    zIndex: 2
  };

  // Центрированный стиль для заголовков в блоке истории
  const historyTitleStyles = {
    ...blockTitleStyles,
    marginBottom: '40px',
    textAlign: 'center' as const
  };

  // Стили для года в таймлайне
  const timelineYearStyles = {
    ...yearStyles,
    fontSize: '22px',
    fontWeight: 'bold' as const,
    marginBottom: '15px',
    display: 'block'
  };

  return (
    <section id="about" style={sectionStyles}>
      <div style={containerStyles}>
        <div style={{textAlign: 'center'}}>
          <h2 style={{...headlineStyles, ...getResponsiveHeadlineStyles()}}>
            Who We Are
          </h2>
        </div>
      </div>
      
      <div style={newLayoutStyles}>
        {/* Левая колонка: About + Команда */}
        <div style={leftColumnStyles}>
          {/* Блок About Us */}
          <div style={aboutBlockStyles}>
            <h3 style={centeredBlockTitleStyles}>About Us</h3>
            <p style={{ 
              lineHeight: '1.6', 
              flex: 1, 
              paddingLeft: '12.5%', 
              paddingRight: '12.5%',
              textAlign: 'left',
              fontSize: '1.1rem'
            }}>
              FTDiam is a US-based deep-tech start-up in advanced materials sector. We are revolutionizing the industry with the unique Advanced HPHT (AHPHT) technology. Since our inception, we've been dedicated to producing the highest-quality single-crystal diamond substrates for advanced applications.
            </p>
          </div>
          
          {/* Блоки с основателями */}
          <div style={foundersContainerStyles}>
            {/* CTO */}
            <div style={founderBlockStyles}>
              <div style={founderPhotoStyles}>
                <img 
                  src="/images/Dmitri.png" 
                  alt="Dmitry Semchenko" 
                  style={founderPhotoImgStyles}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const }}>
                <h3 style={founderNameStyles}>Dmitry Semchenko</h3>
                <div style={roleStyles}>CTO</div>
                <p style={{ fontSize: '14px', lineHeight: '1.5', textAlign: 'center', color: '#555' }}>
                  Serial entrepreneur with over 8 years in high-quality diamond material. Holder of AHPHT technology.
                </p>
              </div>
            </div>
            
            {/* CEO */}
            <div style={founderBlockStyles}>
              <div style={founderPhotoStyles}>
                <img 
                  src="/images/Dan.png" 
                  alt="Daniil Kurganov" 
                  style={founderPhotoImgStyles}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const }}>
                <h3 style={founderNameStyles}>Daniil Kurganov</h3>
                <div style={roleStyles}>CEO</div>
                <p style={{ fontSize: '14px', lineHeight: '1.5', textAlign: 'center', color: '#555' }}>
                  15+ years in management, technical sales and business development worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Правая колонка: История */}
        <div style={rightColumnStyles}>
          <h3 style={historyTitleStyles}>History</h3>
          
          {/* Таймлайн */}
          <div style={timelineContainerStyles}>
            {/* Вертикальная линия таймлайна */}
            <div style={timelineLineStyles}></div>
            
            {/* Элемент таймлайна 2022 */}
            <div style={timelineItemStyles}>
              <div style={timelineMarkerStyles}>
                <div style={timelineDotStyles}></div>
              </div>
              <div style={timelineContentStyles}>
                <div style={timelineYearStyles}>2022</div>
                <p style={{ marginTop: '10px', marginBottom: '0' }}>
                  Founded as a sales-focused entity sourcing diamonds from a partner facility in India.
                </p>
              </div>
            </div>
            
            {/* Элемент таймлайна 2023 */}
            <div style={timelineItemStyles}>
              <div style={timelineMarker2Styles}>
                <div style={timelineDotStyles}></div>
              </div>
              <div style={timelineContentStyles}>
                <div style={timelineYearStyles}>2023</div>
                <p style={{ marginTop: '10px', marginBottom: '0' }}>
                  Expanded partnerships and client base across quantum technology sector.
                </p>
              </div>
            </div>
            
            {/* Элемент таймлайна 2027 */}
            <div style={timelineItemStyles}>
              <div style={timelineMarker3Styles}>
                <div style={timelineDotStyles}></div>
              </div>
              <div style={timelineContentStyles}>
                <div style={timelineYearStyles}>2027</div>
                <p style={{ marginTop: '10px', marginBottom: '0' }}>
                  Planned establishment of own AHPHT production facility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection; 