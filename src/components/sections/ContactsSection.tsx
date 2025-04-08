import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../../styles/contacts.css';

const ContactsSection = () => {
  return (
    <section id="contacts" className="contacts-section" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="container">
        <h2 className="contacts-headline gradient-headline">Contacts</h2>
        
        <div className="contacts-content">
          <div className="contact-info">
            <div className="contact-info-header">
              <h3 className="info-title">Contact Information</h3>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="contact-text">
                <span className="contact-label">Email</span>
                <a href="mailto:info@ftdiam.com" className="contact-value">info@ftdiam.com</a>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="contact-text">
                <span className="contact-label">Phone</span>
                <a href="tel:+16172752599" className="contact-value">+1 617 275 2599</a>
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
            
            <div className="contact-info-item">
              <div className="contact-icon">
                <FontAwesomeIcon icon={faLinkedin} />
              </div>
              <div className="contact-text">
                <span className="contact-label">LinkedIn</span>
                <a href="https://www.linkedin.com/company/ftdiam" target="_blank" rel="noopener noreferrer" className="contact-value">
                  Follow us
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <div className="form-header">
              <h3 className="form-title">Get in touch</h3>
            </div>
            
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your name" required />
              </div>
              
              <div className="form-group">
                <input type="email" placeholder="Your email" required />
              </div>
              
              <div className="form-group">
                <textarea name="message" placeholder="Your message" required></textarea>
              </div>
              
              <button type="submit" className="contact-submit-button">Send message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection; 