const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/images/Logo.png" alt="FTDiam Logo" className="footer-logo-img" />
          <div className="footer-company-info">
            <p>FTDiam - Flawless Technical Diamonds</p>
            <p>220 Park Ave PMB 83131</p>
            <p>New York, NY 10003, USA</p>
            <p>A US-based deep-tech company in the advanced materials sector</p>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="footer-nav">
            <div className="footer-nav-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#technology">Our Technology</a></li>
                <li><a href="#about">Our Mission</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4>Products</h4>
              <ul>
                <li><a href="#products">Products Overview</a></li>
                <li><a href="#quality">Quality Analysis</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:info@ftdiam.com">info@ftdiam.com</a></li>
                <li><a href="tel:+16172752599">+1 617 275 2599</a></li>
                <li><a href="https://www.linkedin.com/company/ftdiam" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="copyright">
          <p>© {new Date().getFullYear()} FTDiam LLC. All rights reserved. Flawless Technical Diamonds</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 