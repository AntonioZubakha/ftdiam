import React from 'react';

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
              <li><a href="#about">Who We Are</a></li>
              <li><a href="#technology">Advanced HPHT</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#quality">Quality Analysis</a></li>
              <li><a href="#contacts">Contacts</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li><a href="mailto:info@ftdiam.com"><i className="fas fa-envelope"></i>info@ftdiam.com</a></li>
              <li><a href="tel:+16172752599"><i className="fas fa-phone"></i>+1 617 275 2599</a></li>
              <li><a href="#address"><i className="fas fa-map-marker-alt"></i>220 Park Ave PMB 83131, NY 10003</a></li>
              <li><a href="https://www.linkedin.com/company/ftdiam" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i>LinkedIn</a></li>
              <li><a href="#" style={{visibility: "hidden"}}><i className="fas fa-empty"></i>&nbsp;</a></li>
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