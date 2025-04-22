import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-col footer-info" style={{ 
            display: 'flex',
            alignItems: 'flex-start',
            marginRight: '40px',
            height: '100%',
            paddingTop: '0',
            marginTop: '-20px'
          }}>
            <img 
              src="/images/Logo_white.png" 
              alt="FTDiam Logo" 
              className="footer-logo" 
              style={{ 
                width: '220px', 
                height: 'auto', 
                objectFit: 'contain',
                marginTop: '0'
              }} 
            />
          </div>
          
          <div className="footer-col">
            <ul className="footer-links">
              <li><a href="#advantages">ADVANTAGES</a></li>
              <li><a href="#technology">TECHNOLOGY</a></li>
              <li><a href="#products">PRODUCTS</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <ul className="footer-links">
              <li><a href="#quality">QUALITY ANALYSIS</a></li>
              <li><a href="#applications">APPLICATIONS</a></li>
              <li><a href="#blueprint">BLUEPRINT</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <ul className="footer-contact">
              <li><a href="mailto:info@ftdiam.com"><FontAwesomeIcon icon={faEnvelope} /> info@ftdiam.com</a></li>
              <li><a href="tel:+16172752599"><FontAwesomeIcon icon={faPhone} /> +1 617 275 2599</a></li>
              <li><a href="https://www.linkedin.com/company/ftdiam" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} style={{ marginRight: '8px', width: '16px' }} />
                LinkedIn
              </a></li>
              <li><a href="#address"><FontAwesomeIcon icon={faMapMarkerAlt} /> 220 Park Ave PMB 83131, NY 10003</a></li>
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