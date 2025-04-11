import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../../styles/contacts.css';

const ContactsSection = () => {
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
            
            <form>
              <div className="form-group" style={{ marginBottom: isMobile ? '10px' : '15px' }}>
                <input type="text" placeholder="Your name" required style={{ padding: isMobile ? '8px 12px' : '10px 15px' }} />
              </div>
              
              <div className="form-group" style={{ marginBottom: isMobile ? '10px' : '15px' }}>
                <input type="email" placeholder="Your email" required style={{ padding: isMobile ? '8px 12px' : '10px 15px' }} />
              </div>
              
              <div className="form-group" style={{ marginBottom: isMobile ? '15px' : '20px' }}>
                <textarea 
                  name="message" 
                  placeholder="Your message" 
                  required 
                  style={{ 
                    padding: isMobile ? '8px 12px' : '10px 15px',
                    height: isMobile ? '100px' : '120px'
                  }}></textarea>
              </div>
              
              <button 
                type="submit" 
                className="contact-submit-button"
                style={{ 
                  padding: isMobile ? '8px 16px' : '10px 20px',
                  fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)'
                }}
              >Send message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection; 