import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-col footer-info">
            <img src="/images/Logo_white.png" alt="FTDiam Logo" className="footer-logo" />
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">Navigation</h3>
            <ul className="footer-links">
              <li><a href="#about">Our Blueprint</a></li>
              <li><a href="#technology">Advanced HPHT</a></li>
              <li><a href="#products">Products</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">Links</h3>
            <ul className="footer-links">
              <li><a href="#quality">Quality Analysis</a></li>
              <li><a href="#contacts">Contacts</a></li>
              <li><a href="https://www.linkedin.com/company/ftdiam" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} style={{ marginRight: '8px', width: '16px' }} />
                LinkedIn
              </a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li><a href="mailto:info@ftdiam.com"><FontAwesomeIcon icon={faEnvelope} />info@ftdiam.com</a></li>
              <li><a href="tel:+16172752599"><FontAwesomeIcon icon={faPhone} />+1 617 275 2599</a></li>
              <li><a href="#address"><FontAwesomeIcon icon={faMapMarkerAlt} />220 Park Ave PMB 83131, NY 10003</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FTDiam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 