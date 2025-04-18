import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../../styles/contacts.css';

const ContactsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
      setFormSubmitted(true);
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  return (
    <section id="contacts" className="contacts-section">
      <div className="container">
        <h2 className="contacts-headline gradient-headline">
          Contacts
        </h2>
        
        <div className="contacts-content">
          <div className="contact-info">
            <div className="contact-info-header">
              <h2>Contact Information</h2>
            </div>
            <div className="contact-info-content">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="contact-text">
                  <span className="contact-label">Email</span>
                  <a href="mailto:info@ftdiam.com" className="contact-value">
                    info@ftdiam.com
                  </a>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="contact-text">
                  <span className="contact-label">Phone</span>
                  <a href="tel:+16172752599" className="contact-value">
                    +1 617 275 2599
                  </a>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faLinkedin} />
                </div>
                <div className="contact-text">
                  <span className="contact-label">LinkedIn</span>
                  <a 
                    href="https://www.linkedin.com/company/ftdiam" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-value"
                  >
                    Follow us
                  </a>
                </div>
              </div>
            
              <div className="contact-info-item">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="contact-text">
                  <span className="contact-label">Address</span>
                  <p className="contact-value">
                    220 Park Ave PMB 83131<br />
                    New York, NY 10003, USA
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <div className="form-header">
              <h3 className="form-title">Get in touch</h3>
            </div>
            
            {formSubmitted ? (
              <div className="form-message form-success">
                <p className="success-title">Thank you!</p>
                <p>Your message has been sent successfully.</p>
                <p className="success-note">
                  <strong>Note:</strong> If this is your first time using the form, please check your email for a confirmation message from FormSubmit.
                </p>
              </div>
            ) : (
              <form action="https://formsubmit.co/info@ftdiam.com" method="POST">
                <input type="hidden" name="_subject" value="New message from FTDiam website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value={`${window.location.href.split('?')[0]}?submitted=true`} />
                <input type="text" name="_honey" style={{ display: 'none' }} />
                
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your name" 
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your email" 
                    required
                  />
                </div>
                
                <div className="form-group">
                  <textarea 
                    name="message"
                    placeholder="Your message" 
                    required
                  ></textarea>
                </div>
                
                <p className="form-note">
                  * The first message will require a confirmation from FormSubmit
                </p>
                
                <button type="submit" className="contact-submit-button">
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