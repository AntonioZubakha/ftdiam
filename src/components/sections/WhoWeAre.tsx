import React, { useEffect, useState } from 'react';

const WhoWeAreSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Используем только inline-стили без зависимости от внешних CSS
  const sectionStyles = {
    padding: isMobile ? '40px 0 20px 0' : '120px 0 60px 0',
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
    padding: isMobile ? '0 15px' : '0 20px'
  };

  const headlineStyles = {
    fontSize: isMobile ? 'var(--section-headline-mobile-size)' : 'var(--section-headline-size)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    textAlign: 'center' as const,
    marginBottom: isMobile ? '1.5rem' : '2rem',
    position: 'relative' as const,
    fontWeight: '600' as const,
    letterSpacing: '0.5px',
    display: 'inline-block'
  };

  // Новый стиль для обновленного макета
  const newLayoutStyles = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: isMobile ? '15px' : '30px',
    width: '100%',
    margin: isMobile ? '10px auto 0' : '20px auto 0',
    position: 'relative' as const,
    maxWidth: '1200px',
    overflow: 'hidden'
  };

  // Стиль для левой колонки (About + люди)
  const leftColumnStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    backgroundColor: '#fff',
    marginBottom: isMobile ? '15px' : '0'
  };

  // Стиль для правой колонки (История)
  const rightColumnStyles = {
    padding: isMobile ? '20px 15px' : '50px 60px',
    height: '100%',
    position: 'relative' as const,
    minHeight: isMobile ? 'auto' : '900px', // Чтобы история занимала всю высоту
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
    minHeight: isMobile ? '200px' : '300px',
    padding: isMobile ? '30px 20px 5px' : '50px 40px 5px'
  };

  const foundersContainerStyles = {
    display: 'flex',
    flexDirection: isMobile ? 'column' as const : 'row' as const,
    height: isMobile ? 'auto' : '500px',
    marginTop: '0px',
    gap: isMobile ? '15px' : '0'
  };

  const founderBlockStyles = {
    ...blockStyles,
    flex: 1,
    padding: isMobile ? '15px 15px' : '40px 30px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)'
    }
  };

  const blockTitleStyles = {
    fontSize: 'var(--h3-desktop)',
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
    height: isMobile ? '180px' : '220px',
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
    fontSize: 'var(--text-lg)'
  };

  // Стиль для имен основателей (градиентный) - теперь как заголовки About Us и History
  const founderNameStyles = {
    fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    margin: '0 0 5px 0',
    fontWeight: '600' as const,
    textAlign: 'center' as const
  };

  // Стиль для подзаголовков (должности) - теперь тоже как About Us и History
  const roleStyles = {
    fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    fontWeight: '600' as const,
    marginBottom: '10px',
    textAlign: 'center' as const
  };

  // Стили для таймлайна - полностью переделанные
  const timelineContainerStyles = {
    position: 'relative' as const,
    marginTop: isMobile ? '25px' : '40px',
    maxWidth: isMobile ? '95%' : '90%',
    margin: isMobile ? '25px auto 0' : '40px auto 0',
    paddingLeft: '0'
  };

  // Вертикальная линия таймлайна - новый подход с брендовыми цветами
  const timelineLineStyles = {
    position: 'absolute' as const,
    top: '0',
    bottom: '0',
    left: '16px', // Смещаем линию левее
    width: '6px',
    background: 'linear-gradient(to bottom, #00837f 0%, #00837f 30%, #00837f 50%, #241e46 100%)',
    borderRadius: '3px',
    zIndex: 1
  };

  const timelineItemStyles = {
    position: 'relative' as const,
    marginBottom: isMobile ? '25px' : '60px',
    paddingLeft: '50px',
    display: 'flex',
    flexDirection: 'column' as const
  };

  // Убираем маркеры полностью (скрываем их)
  const timelineMarkerStyles = {
    display: 'none'
  };

  // Белый круг внутри маркера тоже скрываем
  const timelineMarkerInnerStyles = {
    display: 'none'
  };

  // Варианты маркеров для разных годов тоже скрываем
  const timelineMarker2023Styles = {
    display: 'none'
  };

  const timelineMarker2027Styles = {
    display: 'none'
  };

  // Новые стили для годов в таймлайне
  const timelineYearStyles = {
    fontSize: isMobile ? 'var(--h3-mobile)' : 'var(--h3-desktop)',
    fontWeight: 'bold' as const,
    background: 'linear-gradient(to right, #00837f, #00837f)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    marginBottom: isMobile ? '10px' : '15px',
    lineHeight: '1'
  };

  const timelineYear2023Styles = {
    ...timelineYearStyles,
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const
  };

  const timelineYear2027Styles = {
    ...timelineYearStyles,
    background: 'linear-gradient(to right, #241e46, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const
  };

  const timelineContentStyles = {
    padding: '0'
  };

  // Изменяю стили текста для описаний в таймлайне - теперь как текст под About Us
  const timelineTextStyles = {
    marginTop: isMobile ? '8px' : '12px', 
    marginBottom: '0', 
    color: '#555', 
    lineHeight: '1.6',
    fontSize: isMobile ? '0.9rem' : '1.1rem',
    listStyleType: 'none',
    paddingLeft: '0'
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

  // Стиль для текста биографии фаундеров - соответствует тексту под About Us
  const founderBioStyles = {
    fontSize: isMobile ? '1rem' : '1.1rem',
    lineHeight: '1.6',
    textAlign: 'center' as const,
    color: '#555'
  };

  // Add custom styles for Dan's photo
  const ceoPhotoStyles = {
    width: '90%', // Larger than the default 80%
    height: '105%', // Slightly taller
    objectFit: 'contain' as const
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
              paddingLeft: isMobile ? '5%' : '12.5%', 
              paddingRight: isMobile ? '5%' : '12.5%',
              textAlign: 'left',
              fontSize: isMobile ? '1rem' : '1.1rem'
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
                <p style={founderBioStyles}>
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
                  style={ceoPhotoStyles}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const }}>
                <h3 style={founderNameStyles}>Daniil Kurganov</h3>
                <div style={roleStyles}>CEO</div>
                <p style={founderBioStyles}>
                  15+ years in management, technical sales and business development worldwide. Experienced leader.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Правая колонка: История */}
        <div style={rightColumnStyles}>
          <h3 style={historyTitleStyles}>History</h3>
          
          {/* Таймлайн в новом стиле */}
          <div style={timelineContainerStyles}>
            {/* Вертикальная линия таймлайна */}
            <div style={timelineLineStyles}></div>
            
            {/* Элемент таймлайна 2022 */}
            <div style={timelineItemStyles}>
              <div style={timelineMarkerStyles}>
                <div style={timelineMarkerInnerStyles}></div>
              </div>
              <div style={timelineContentStyles}>
                <div style={timelineYearStyles}>2022</div>
                <p style={timelineTextStyles}>
                  Founded as a sales-focused entity sourcing diamonds from a partner facility in India.
                </p>
              </div>
            </div>
            
            {/* Элемент таймлайна 2023 */}
            <div style={timelineItemStyles}>
              <div style={timelineMarker2023Styles}>
                <div style={timelineMarkerInnerStyles}></div>
              </div>
              <div style={timelineContentStyles}>
                <div style={timelineYear2023Styles}>2023</div>
                <p style={timelineTextStyles}>
                  Expanded partnerships and client base across quantum technology sector.
                </p>
              </div>
            </div>
            
            {/* Элемент таймлайна 2027 */}
            <div style={timelineItemStyles}>
              <div style={timelineMarker2027Styles}>
                <div style={timelineMarkerInnerStyles}></div>
              </div>
              <div style={timelineContentStyles}>
                <div style={timelineYear2027Styles}>2027</div>
                <p style={timelineTextStyles}>
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