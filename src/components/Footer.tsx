import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  const iconStyle = {
    marginRight: '8px',
    width: '16px'
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-col footer-info">
            <img 
              src="/images/Logo_white.png" 
              alt="FTDiam Logo" 
              className="footer-logo" 
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
              <li><a href="mailto:info@ftdiam.com"><FontAwesomeIcon icon={faEnvelope} style={iconStyle} /> info@ftdiam.com</a></li>
              <li><a href="tel:+19298224798"><FontAwesomeIcon icon={faPhone} style={iconStyle} /> +1 929 822 4798</a></li>
              <li><a href="https://www.linkedin.com/company/ftdiam" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} style={iconStyle} />
                LinkedIn
              </a></li>
              <li><a href="#address"><FontAwesomeIcon icon={faMapMarkerAlt} style={iconStyle} /> 220 Park Ave PMB 83131, NY 10003</a></li>
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