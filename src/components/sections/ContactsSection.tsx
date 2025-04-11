import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../../styles/contacts.css';

const ContactsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Проверяем URL параметры при загрузке компонента для определения статуса отправки формы
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
      setFormSubmitted(true);
      
      // Очищаем URL после обработки
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  return (
    <section id="contacts" className="contacts-section" style={{ 
      paddingTop: isMobile ? '40px' : '60px', 
      paddingBottom: isMobile ? '40px' : '60px',
      overflow: 'hidden' 
    }}>
      <div className="container">
        <h2 className="contacts-headline gradient-headline" style={{ 
          fontSize: isMobile ? 'var(--section-headline-mobile-size)' : 'var(--section-headline-size)',
          marginBottom: isMobile ? '1.5rem' : '2.5rem'
        }}>Contacts</h2>
        
        <div className="contacts-content" style={{ 
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '20px' : '40px' 
        }}>
          <div className="contact-info" style={{ 
            padding: isMobile ? '15px' : '30px',
            marginBottom: isMobile ? '0' : '0'
          }}>
            <div className="contact-info-header">
              <h3 className="info-title" style={{ 
                fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)',
                marginBottom: isMobile ? '15px' : '25px'
              }}>Contact Information</h3>
            </div>
            
            <div className="contact-info-item" style={{ marginBottom: isMobile ? '10px' : '20px' }}>
              <div className="contact-icon" style={{ fontSize: isMobile ? 'var(--text-xl)' : 'var(--h4-desktop)' }}>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="contact-text">
                <span className="contact-label" style={{ fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)' }}>Email</span>
                <a href="mailto:info@ftdiam.com" className="contact-value" style={{ fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)' }}>info@ftdiam.com</a>
              </div>
            </div>
            
            <div className="contact-info-item" style={{ marginBottom: isMobile ? '10px' : '20px' }}>
              <div className="contact-icon" style={{ fontSize: isMobile ? 'var(--text-xl)' : 'var(--h4-desktop)' }}>
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="contact-text">
                <span className="contact-label" style={{ fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)' }}>Phone</span>
                <a href="tel:+16172752599" className="contact-value" style={{ fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)' }}>+1 617 275 2599</a>
              </div>
            </div>
            
            <div className="contact-info-item" style={{ marginBottom: isMobile ? '10px' : '20px' }}>
              <div className="contact-icon" style={{ fontSize: isMobile ? 'var(--text-xl)' : 'var(--h4-desktop)' }}>
                <FontAwesomeIcon icon={faLinkedin} />
              </div>
              <div className="contact-text">
                <span className="contact-label" style={{ fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)' }}>LinkedIn</span>
                <a href="https://www.linkedin.com/company/ftdiam" target="_blank" rel="noopener noreferrer" className="contact-value" style={{ fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)' }}>
                  Follow us
                </a>
              </div>
            </div>
            
            <div className="contact-info-item" style={{ marginBottom: isMobile ? '0' : '0' }}>
              <div className="contact-icon" style={{ fontSize: isMobile ? 'var(--text-xl)' : 'var(--h4-desktop)' }}>
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div className="contact-text">
                <span className="contact-label" style={{ fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)' }}>Address</span>
                <p className="contact-value" style={{ fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)' }}>
                  220 Park Ave PMB 83131<br />
                  New York, NY 10003, USA
                </p>
              </div>
            </div>
          </div>
          
          <div className="contact-form" style={{ 
            padding: isMobile ? '15px' : '30px'
          }}>
            <div className="form-header">
              <h3 className="form-title" style={{ 
                fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)',
                marginBottom: isMobile ? '15px' : '25px'
              }}>Get in touch</h3>
            </div>
            
            {formSubmitted ? (
              <div 
                className="form-message form-success"
                style={{ 
                  padding: '20px', 
                  borderRadius: '5px',
                  backgroundColor: '#effff4',
                  color: '#00837f',
                  border: '1px solid #c3f0d1',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}
              >
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>
                  Thank you!
                </p>
                <p>Your message has been sent successfully.</p>
                <p style={{ fontSize: '0.9rem', marginTop: '15px' }}>
                  <strong>Note:</strong> If this is your first time using the form, please check your email for a confirmation message from FormSubmit.
                </p>
              </div>
            ) : (
              <form 
                action="https://formsubmit.co/info@ftdiam.com" 
                method="POST"
              >
                {/* Скрытые поля для настройки FormSubmit.co */}
                <input type="hidden" name="_subject" value="New message from FTDiam website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value={`${window.location.href.split('?')[0]}?submitted=true`} />
                <input type="text" name="_honey" style={{ display: 'none' }} />
                
                <div className="form-group" style={{ marginBottom: isMobile ? '15px' : '20px' }}>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your name" 
                    required
                    style={{ 
                      padding: isMobile ? '8px 12px' : '10px 15px',
                      width: '100%',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '15px'
                    }} 
                  />
                </div>
                
                <div className="form-group" style={{ marginBottom: isMobile ? '15px' : '20px' }}>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your email" 
                    required
                    style={{ 
                      padding: isMobile ? '8px 12px' : '10px 15px',
                      width: '100%',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '15px'
                    }} 
                  />
                </div>
                
                <div className="form-group" style={{ marginBottom: isMobile ? '20px' : '25px' }}>
                  <textarea 
                    name="message"
                    placeholder="Your message" 
                    required
                    style={{ 
                      padding: isMobile ? '8px 12px' : '10px 15px',
                      height: isMobile ? '100px' : '120px',
                      width: '100%',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '15px',
                      resize: 'vertical'
                    }}
                  ></textarea>
                </div>
                
                <p style={{ 
                  fontSize: '0.8rem', 
                  marginBottom: '15px', 
                  color: '#666',
                  fontStyle: 'italic'
                }}>
                  * The first message will require a confirmation from FormSubmit
                </p>
                
                <button 
                  type="submit" 
                  className="contact-submit-button"
                  style={{ 
                    padding: isMobile ? '10px 16px' : '12px 20px',
                    fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)',
                    width: '100%',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    color: '#fff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection; 