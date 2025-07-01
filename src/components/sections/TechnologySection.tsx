import React, { useState, useEffect, useRef } from 'react';
import '../../styles/technology.css';

const TechnologySection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Обновленная функция для скролла к секции контактов по аналогии с ProductsSection
  const scrollToContacts = () => {
    try {
      if (isMobile) {
        // На мобильных устройствах прокручиваем к форме обратной связи
        const contactForm = document.getElementById('contact-form') || 
                           document.querySelector('.contact-form');
                           
        if (contactForm) {
          // Метод 1: Используем scrollIntoView
          contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Метод 2: Если первый не сработал, используем setTimeout и window.scrollTo
          setTimeout(() => {
            const rect = contactForm.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = rect.top + scrollTop - 100; // Отступ сверху 100px
            
            window.scrollTo({
              top: targetY,
              behavior: 'smooth'
            });
          }, 100);
        } else {
          // Если форму не нашли, ищем секцию контактов
          const contactsSection = document.getElementById('contacts');
          if (contactsSection) {
            contactsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        // На десктопе просто прокручиваем к началу секции контактов
        const contactsSection = document.getElementById('contacts');
        if (contactsSection) {
          contactsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (error) {
      console.warn("Error during scroll:", error);
      // В случае ошибки используем запасной вариант
      window.location.href = '#contacts';
    }
  };

  // Функция открытия модального окна (оставлена для обратной совместимости)
  const openModal = () => {
    setModalOpen(true);
  };

  // Функция закрытия модального окна
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section 
      id="technology" 
      className="technology-section" 
      ref={sectionRef}
      style={{ 
        backgroundColor: '#fff',
        padding: isMobile ? '60px 0' : '40px 0 60px',
        transition: 'all 0.3s ease',
        position: 'relative',
        borderTop: '1px solid rgba(0, 131, 127, 0.08)',
        borderBottom: '1px solid rgba(0, 131, 127, 0.08)'
      }}
    >
      <div className="technology-container">
        {isMobile ? (
          // Мобильная верстка (вертикальная)
          <>
            <div className="technology-headline-container" style={{
              textAlign: 'center',
              marginBottom: '40px',
              padding: '0 20px'
            }}>
              <h2 className="technology-headline gradient-headline" style={{ 
                fontSize: 'var(--section-headline-mobile-size)',
                textAlign: 'center',
                marginBottom: '20px',
                maxWidth: '95%',
                margin: '0 auto 20px'
              }}>Advanced HPHT Technology</h2>
              <div style={{
                marginBottom: '30px',
                position: 'relative',
                textAlign: 'center'
              }}>
                <p style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--dark-gray)',
                  lineHeight: '1.6',
                  fontWeight: '400',
                  margin: '0 auto',
                  textAlign: 'center',
                  maxWidth: '800px',
                  position: 'relative'
                }}>
                  AHPHT technology was developed through extensive R&D. We have established a unique HPHT growing methods.
                </p>
              </div>
              <ul style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.6',
                color: 'var(--dark-gray)',
                paddingLeft: '5px',
                marginBottom: '20px',
                textAlign: 'left',
                maxWidth: '300px',
                margin: '0 auto 20px',
                listStyle: 'none'
              }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                  padding: '8px 0',
                  cursor: 'default',
                  position: 'relative',
                  paddingLeft: '0'
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{
                    width: isMobile ? '10px' : '12px',
                    height: isMobile ? '10px' : '12px',
                    minWidth: isMobile ? '10px' : '12px',
                    background: 'linear-gradient(135deg, #00837f, #241e46)',
                    transform: 'rotate(45deg)',
                    marginRight: isMobile ? '8px' : '15px',
                    marginLeft: '0',
                    marginTop: '6px',
                    flexShrink: 0,
                    display: 'block',
                    position: 'relative',
                    borderRadius: isMobile ? '2px' : '3px',
                    boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                    transition: 'all 0.3s ease'
                  }}></div>
                  Special know-how raw materials.
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                  padding: '8px 0',
                  cursor: 'default',
                  position: 'relative',
                  paddingLeft: isMobile ? '0' : '4px'
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{
                    width: isMobile ? '10px' : '12px',
                    height: isMobile ? '10px' : '12px',
                    minWidth: isMobile ? '10px' : '12px',
                    background: 'linear-gradient(135deg, #00837f, #241e46)',
                    transform: 'rotate(45deg)',
                    marginRight: isMobile ? '8px' : '15px',
                    marginLeft: '0',
                    marginTop: '6px',
                    flexShrink: 0,
                    display: 'block',
                    position: 'relative',
                    borderRadius: isMobile ? '2px' : '3px',
                    boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                    transition: 'all 0.3s ease'
                  }}></div>
                  The use of specially prepared materials, resulting in precise control over boron and nitrogen content.
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                  padding: '8px 0',
                  cursor: 'default',
                  position: 'relative',
                  paddingLeft: isMobile ? '0' : '4px'
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{
                    width: isMobile ? '10px' : '12px',
                    height: isMobile ? '10px' : '12px',
                    minWidth: isMobile ? '10px' : '12px',
                    background: 'linear-gradient(135deg, #00837f, #241e46)',
                    transform: 'rotate(45deg)',
                    marginRight: isMobile ? '8px' : '15px',
                    marginLeft: '0',
                    marginTop: '6px',
                    flexShrink: 0,
                    display: 'block',
                    position: 'relative',
                    borderRadius: isMobile ? '2px' : '3px',
                    boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                    transition: 'all 0.3s ease'
                  }}></div>
                  Specially developed automation system that allows us to control temperature, pressure, humidity, and other parameters.
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                  padding: '8px 0',
                  cursor: 'default',
                  position: 'relative',
                  paddingLeft: isMobile ? '0' : '4px'
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{
                    width: isMobile ? '10px' : '12px',
                    height: isMobile ? '10px' : '12px',
                    minWidth: isMobile ? '10px' : '12px',
                    background: 'linear-gradient(135deg, #00837f, #241e46)',
                    transform: 'rotate(45deg)',
                    marginRight: isMobile ? '8px' : '15px',
                    marginLeft: '0',
                    marginTop: '6px',
                    flexShrink: 0,
                    display: 'block',
                    position: 'relative',
                    borderRadius: isMobile ? '2px' : '3px',
                    boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                    transition: 'all 0.3s ease'
                  }}></div>
                  Custom software solution operating in sync with the automation system enabling optimized control.
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                  padding: '8px 0',
                  cursor: 'default',
                  position: 'relative',
                  paddingLeft: isMobile ? '0' : '4px'
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{
                    width: isMobile ? '10px' : '12px',
                    height: isMobile ? '10px' : '12px',
                    minWidth: isMobile ? '10px' : '12px',
                    background: 'linear-gradient(135deg, #00837f, #241e46)',
                    transform: 'rotate(45deg)',
                    marginRight: isMobile ? '8px' : '15px',
                    marginLeft: '0',
                    marginTop: '6px',
                    flexShrink: 0,
                    display: 'block',
                    position: 'relative',
                    borderRadius: isMobile ? '2px' : '3px',
                    boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                    transition: 'all 0.3s ease'
                  }}></div>
                  Upgraded press machines.
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                  padding: '8px 0',
                  cursor: 'default',
                  position: 'relative',
                  paddingLeft: isMobile ? '0' : '4px'
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{
                    width: isMobile ? '10px' : '12px',
                    height: isMobile ? '10px' : '12px',
                    minWidth: isMobile ? '10px' : '12px',
                    background: 'linear-gradient(135deg, #00837f, #241e46)',
                    transform: 'rotate(45deg)',
                    marginRight: isMobile ? '8px' : '15px',
                    marginLeft: '0',
                    marginTop: '6px',
                    flexShrink: 0,
                    display: 'block',
                    position: 'relative',
                    borderRadius: isMobile ? '2px' : '3px',
                    boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                    transition: 'all 0.3s ease'
                  }}></div>
                  Customized mechanical structure of a cubic cell.
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '8px 0',
                  cursor: 'default',
                  position: 'relative',
                  paddingLeft: isMobile ? '0' : '4px'
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLLIElement;
                  target.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{
                    width: isMobile ? '10px' : '12px',
                    height: isMobile ? '10px' : '12px',
                    minWidth: isMobile ? '10px' : '12px',
                    background: 'linear-gradient(135deg, #00837f, #241e46)',
                    transform: 'rotate(45deg)',
                    marginRight: isMobile ? '8px' : '15px',
                    marginLeft: '0',
                    marginTop: '6px',
                    flexShrink: 0,
                    display: 'block',
                    position: 'relative',
                    borderRadius: isMobile ? '2px' : '3px',
                    boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                    transition: 'all 0.3s ease'
                  }}></div>
                  Long term dynamically controlled growth process.
                </li>
              </ul>
            </div>
            
            <div className="advantages-grid" style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '25px',
              padding: '0 20px',
              maxWidth: '340px', // Уменьшено с 400px до 340px для соответствия десктопной ширине
              margin: '0 auto'
            }}>
              <div className="advantage-card" style={{ 
                padding: '30px', // Уменьшил с 25px до 20px для более компактного вида
                backgroundColor: '#fff',
                borderRadius: '15px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 131, 127, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                textAlign: 'center',
                height: '140px', // Фиксированная высота
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div className="advantage-icon">
                  <i className="fas fa-arrow-trend-down" style={{
                    fontSize: '35px', // Уменьшил с 40px до 35px
                    marginBottom: '10px',
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}></i>
                </div>
                <h3 className="advantage-title gradient-subheadline" style={{ 
                  fontSize: '1.3rem', // Уменьшил с var(--h4-mobile) до фиксированного значения
                  marginBottom: '5px'
                }}>Ultra low dislocation density (10¹ cm⁻²)</h3>
              </div>
              
              <div className="advantage-card" style={{ 
                padding: '30px',
                backgroundColor: '#fff',
                borderRadius: '15px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 131, 127, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                textAlign: 'center',
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div className="advantage-icon">
                  <i className="fas fa-flask" style={{
                    fontSize: '35px',
                    marginBottom: '10px',
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}></i>
                </div>
                <h3 className="advantage-title gradient-subheadline" style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '5px'
                }}>No Nitrogen</h3>
              </div>
              
              <div className="advantage-card" style={{ 
                padding: '30px',
                backgroundColor: '#fff',
                borderRadius: '15px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 131, 127, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                textAlign: 'center',
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div className="advantage-icon">
                  <i className="fas fa-compress" style={{
                    fontSize: '35px',
                    marginBottom: '10px',
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}></i>
                </div>
                <h3 className="advantage-title gradient-subheadline" style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '5px'
                }}>Very low strain</h3>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button 
                onClick={scrollToContacts}
                style={{
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  marginTop: '10px',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.25)';
                  target.style.background = 'linear-gradient(to right, #009e99, #2d267a)';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                  target.style.background = 'linear-gradient(to right, #00837f, #241e46)';
                }}
                aria-label="Contact us to request a quotation"
              >
                Request a Quotation
              </button>
            </div>
          </>
        ) : (
          // Десктопная верстка (новая структура)
          <>
            {/* Заголовок и подзаголовок по центру */}
            <div className="technology-headline-container" style={{
              textAlign: 'center',
              maxWidth: '1100px',
              margin: '0 auto 60px'
            }}>
              <h2 className="technology-headline gradient-headline" style={{ 
                fontSize: 'var(--section-headline-size)',
                textAlign: 'center',
                marginBottom: '30px'
              }}>Advanced HPHT Technology</h2>
              <p style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--dark-gray)',
                lineHeight: '1.6',
                fontWeight: '400',
                margin: '0 auto',
                textAlign: 'center',
                maxWidth: '800px',
                position: 'relative'
              }}>
                AHPHT technology was developed through extensive R&D. We have established a unique HPHT growing methods.
              </p>
            </div>
            
            {/* Содержимое ниже заголовка: список точек слева, карточки справа */}
            <div style={{ 
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'flex-start',
              gap: isMobile ? '30px' : '60px',
              maxWidth: '1200px',
              margin: '0 auto 60px',
              padding: isMobile ? '0 10px' : undefined
            }}>
              {/* Буллет-поинты слева */}
              <div style={{
                flex: '0 0 48%',
                paddingLeft: isMobile ? '0' : undefined
              }}>
                <ul style={{
                  fontSize: 'var(--text-lg)',
                  lineHeight: '1.6',
                  color: 'var(--dark-gray)',
                  maxWidth: '98%',
                  marginBottom: '30px',
                  paddingLeft: '0',
                  listStyle: 'none',
                  position: 'relative'
                }}>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '10px',
                    padding: '8px 0',
                    cursor: 'default',
                    position: 'relative',
                    paddingLeft: isMobile ? '0' : '4px'
                  }}
                  onMouseOver={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{
                      width: isMobile ? '10px' : '12px',
                      height: isMobile ? '10px' : '12px',
                      minWidth: isMobile ? '10px' : '12px',
                      background: 'linear-gradient(135deg, #00837f, #241e46)',
                      transform: 'rotate(45deg)',
                      marginRight: isMobile ? '8px' : '15px',
                      marginLeft: '0',
                      marginTop: '6px',
                      flexShrink: 0,
                      display: 'block',
                      position: 'relative',
                      borderRadius: isMobile ? '2px' : '3px',
                      boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                      transition: 'all 0.3s ease'
                    }}></div>
                    Special know-how raw materials.
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '10px',
                    padding: '8px 0',
                    cursor: 'default',
                    position: 'relative',
                    paddingLeft: isMobile ? '0' : '4px'
                  }}
                  onMouseOver={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{
                      width: isMobile ? '12px' : '12px',
                      height: isMobile ? '12px' : '12px',
                      minWidth: isMobile ? '12px' : '12px',
                      background: 'linear-gradient(135deg, #00837f, #241e46)',
                      transform: 'rotate(45deg)',
                      marginRight: isMobile ? '10px' : '15px',
                      marginLeft: '0',
                      marginTop: '6px',
                      flexShrink: 0,
                      display: 'block',
                      position: 'relative',
                      borderRadius: isMobile ? '3px' : '3px',
                      boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                      transition: 'all 0.3s ease'
                    }}></div>
                    The use of specially prepared materials, resulting in precise control over boron and nitrogen content.
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '10px',
                    padding: '8px 0',
                    cursor: 'default',
                    position: 'relative',
                    paddingLeft: isMobile ? '0' : '4px'
                  }}
                  onMouseOver={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{
                      width: isMobile ? '12px' : '12px',
                      height: isMobile ? '12px' : '12px',
                      minWidth: isMobile ? '12px' : '12px',
                      background: 'linear-gradient(135deg, #00837f, #241e46)',
                      transform: 'rotate(45deg)',
                      marginRight: isMobile ? '10px' : '15px',
                      marginLeft: '0',
                      marginTop: '6px',
                      flexShrink: 0,
                      display: 'block',
                      position: 'relative',
                      borderRadius: isMobile ? '3px' : '3px',
                      boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                      transition: 'all 0.3s ease'
                    }}></div>
                    Specially developed automation system that allows us to control temperature, pressure, humidity, and other parameters.
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '10px',
                    padding: '8px 0',
                    cursor: 'default',
                    position: 'relative',
                    paddingLeft: isMobile ? '0' : '4px'
                  }}
                  onMouseOver={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{
                      width: isMobile ? '12px' : '12px',
                      height: isMobile ? '12px' : '12px',
                      minWidth: isMobile ? '12px' : '12px',
                      background: 'linear-gradient(135deg, #00837f, #241e46)',
                      transform: 'rotate(45deg)',
                      marginRight: isMobile ? '10px' : '15px',
                      marginLeft: '0',
                      marginTop: '6px',
                      flexShrink: 0,
                      display: 'block',
                      position: 'relative',
                      borderRadius: isMobile ? '3px' : '3px',
                      boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                      transition: 'all 0.3s ease'
                    }}></div>
                    Custom software solution operating in sync with the automation system enabling optimized control.
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '10px',
                    padding: '8px 0',
                    cursor: 'default',
                    position: 'relative',
                    paddingLeft: isMobile ? '0' : '4px'
                  }}
                  onMouseOver={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{
                      width: '12px',
                      height: '12px',
                      minWidth: '12px',
                      background: 'linear-gradient(135deg, #00837f, #241e46)',
                      transform: 'rotate(45deg)',
                      marginRight: isMobile ? '10px' : '15px',
                      marginLeft: '0',
                      marginTop: '6px',
                      flexShrink: 0,
                      display: 'block',
                      position: 'relative',
                      borderRadius: '3px',
                      boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                      transition: 'all 0.3s ease'
                    }}></div>
                    Upgraded press machines.
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '10px',
                    padding: '8px 0',
                    cursor: 'default',
                    position: 'relative',
                    paddingLeft: isMobile ? '0' : '4px'
                  }}
                  onMouseOver={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{
                      width: '12px',
                      height: '12px',
                      minWidth: '12px',
                      background: 'linear-gradient(135deg, #00837f, #241e46)',
                      transform: 'rotate(45deg)',
                      marginRight: isMobile ? '10px' : '15px',
                      marginLeft: '0',
                      marginTop: '6px',
                      flexShrink: 0,
                      display: 'block',
                      position: 'relative',
                      borderRadius: '3px',
                      boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                      transition: 'all 0.3s ease'
                    }}></div>
                    Customized mechanical structure of a cubic cell.
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '8px 0',
                    cursor: 'default',
                    position: 'relative',
                    paddingLeft: isMobile ? '0' : '4px'
                  }}
                  onMouseOver={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget as HTMLLIElement;
                    target.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{
                      width: '12px',
                      height: '12px',
                      minWidth: '12px',
                      background: 'linear-gradient(135deg, #00837f, #241e46)',
                      transform: 'rotate(45deg)',
                      marginRight: isMobile ? '10px' : '15px',
                      marginLeft: '0',
                      marginTop: '6px',
                      flexShrink: 0,
                      display: 'block',
                      position: 'relative',
                      borderRadius: '3px',
                      boxShadow: '0 2px 8px rgba(0, 131, 127, 0.2)',
                      transition: 'all 0.3s ease'
                    }}></div>
                    Long term dynamically controlled growth process.
                  </li>
                </ul>
              </div>
              
              {/* Карточки справа */}
              <div className="advantages-grid" style={{ 
                flex: '0 0 45%',
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: '45px'
              }}>
                <div className="advantage-card" style={{ 
                  padding: '30px 25px',
                  backgroundColor: '#fff',
                  borderRadius: '15px',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.05)',
                  border: '2px solid rgba(0, 131, 127, 0.08)',
                  transition: 'all 0.4s ease',
                  width: '330px',
                  height: '140px',
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }} onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.transform = 'translateY(-5px)';
                  target.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
                }} onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
                }}>
                  <div className="advantage-icon" style={{ 
                    marginBottom: '12px',
                    textAlign: 'center'
                  }}>
                    <i className="fas fa-arrow-trend-down" style={{
                      fontSize: '42px',
                      background: 'linear-gradient(to right, #00837f, #241e46)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block'
                    }}></i>
                  </div>
                  <h3 className="advantage-title gradient-subheadline" style={{ 
                    fontSize: '1.4rem',
                    marginBottom: '0',
                    textAlign: 'center'
                  }}>Ultra low dislocation density (10¹ cm⁻²)</h3>
                </div>
                
                <div className="advantage-card" style={{ 
                  padding: '30px 25px',
                  backgroundColor: '#fff',
                  borderRadius: '15px',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.05)',
                  border: '2px solid rgba(0, 131, 127, 0.08)',
                  transition: 'all 0.4s ease',
                  width: '330px',
                  height: '140px',
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }} onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.transform = 'translateY(-5px)';
                  target.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
                }} onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
                }}>
                  <div className="advantage-icon" style={{ 
                    marginBottom: '12px',
                    textAlign: 'center'
                  }}>
                    <i className="fas fa-flask" style={{
                      fontSize: '42px',
                      background: 'linear-gradient(to right, #00837f, #241e46)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block'
                    }}></i>
                  </div>
                  <h3 className="advantage-title gradient-subheadline" style={{ 
                    fontSize: '1.4rem',
                    marginBottom: '0',
                    textAlign: 'center'
                  }}>No Nitrogen</h3>
                </div>
                
                <div className="advantage-card" style={{ 
                  padding: '30px 25px',
                  backgroundColor: '#fff',
                  borderRadius: '15px',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.05)',
                  border: '2px solid rgba(0, 131, 127, 0.08)',
                  transition: 'all 0.4s ease',
                  width: '330px',
                  height: '140px',
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }} onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.transform = 'translateY(-5px)';
                  target.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
                }} onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
                }}>
                  <div className="advantage-icon" style={{ 
                    marginBottom: '12px',
                    textAlign: 'center'
                  }}>
                    <i className="fas fa-compress" style={{
                      fontSize: '42px',
                      background: 'linear-gradient(to right, #00837f, #241e46)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block'
                    }}></i>
                  </div>
                  <h3 className="advantage-title gradient-subheadline" style={{ 
                    fontSize: '1.4rem',
                    marginBottom: '0',
                    textAlign: 'center'
                  }}>Very low strain</h3>
                </div>
              </div>
            </div>
            
            {/* Кнопка внизу по центру */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: '60px',
              position: 'relative',
              zIndex: 1
            }}>
              <a 
                href={isMobile ? "#contact-form" : "#contacts"}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToContacts();
                }}
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(to right, #00837f, #241e46)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '18px 38px',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  margin: '0 auto',
                  position: 'relative',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(-3px)';
                  target.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
                  target.style.background = 'linear-gradient(to right, #009e99, #2d267a)';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                  target.style.background = 'linear-gradient(to right, #00837f, #241e46)';
                }}
                aria-label="Contact us to request a quotation"
              >
                Request a Quotation
              </a>
            </div>
          </>
        )}
      </div>
      
      {/* Модальное окно оставлено для обратной совместимости */}
    </section>
  );
};

export default TechnologySection; 