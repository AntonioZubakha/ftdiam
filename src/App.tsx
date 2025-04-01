import { useState, useEffect, useRef } from 'react'
import './App.css'
import './LoadingScreen.css'
import './styles.css'
import CrystalGrid from './CrystalGrid'
import ContactForm from './ContactForm'

// Loading screen component with enhanced animation
const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <img src="/images/Logo.png" alt="FTDiam Logo" className="loading-logo" />
        <div className="diamond-shape"></div>
        <h2>INITIALIZING FTDIAM</h2>
      </div>
    </div>
  )
}

// Parallax background component
const ParallaxBackground = ({ children }: { children: React.ReactNode }) => {
  const [offset, setOffset] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollTop = window.scrollY;
        setOffset(scrollTop * 0.5); // Adjust the multiplier for parallax intensity
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={parallaxRef} 
      className="parallax-container"
      style={{ 
        backgroundImage: `linear-gradient(135deg, rgba(36, 30, 70, 0.85), rgba(0, 131, 127, 0.85)), url('/images/hero-bg.svg')`,
        backgroundPosition: `center ${-offset}px`,
        width: '100%',
        maxWidth: '100%',
        margin: 0,
        padding: '6rem 0 2rem' // Отступы только сверху и снизу
      }}
    >
      {children}
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (section: string) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      // Update header style on scroll
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
      
      // Update active section on scroll
      const sections = ['home', 'about', 'technology', 'products', 'quality', 'market', 'contacts']
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  // Key advantages section
  const keyAdvantages = [
    "Dislocation Density as Low as 10¹ cm⁻²",
    "Record-Size Plates up to 15x15 mm",
    "Ultra-Pure: ≤5 ppb Nitrogen, ≤20 ppb Boron"
  ];

  return (
    <div className="app">
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="logo-container">
          <img src="/images/Logo.png" alt="FTDiam Logo" className="logo-img" />
        </div>
        <nav>
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</li>
            <li className={activeSection === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About Us</li>
            <li className={activeSection === 'technology' ? 'active' : ''} onClick={() => scrollToSection('technology')}>Technology</li>
            <li className={activeSection === 'products' ? 'active' : ''} onClick={() => scrollToSection('products')}>Products</li>
            <li className={activeSection === 'quality' ? 'active' : ''} onClick={() => scrollToSection('quality')}>Quality Analysis</li>
            <li className={activeSection === 'market' ? 'active' : ''} onClick={() => scrollToSection('market')}>Market Opportunity</li>
            <li className={activeSection === 'contacts' ? 'active' : ''} onClick={() => scrollToSection('contacts')}>Contacts</li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="home" className="home-section">
          <ParallaxBackground>
            <CrystalGrid />
            <div className="content-container">
              <div className="hero">
                <h1>Flawless Technical Diamonds</h1>
                <h2>Single Crystal Diamond Substrates with Unmatched Characteristics. The Best Technical Diamonds on the Market.</h2>
                <p>Advanced HPHT technology delivering superior diamond substrates for cutting-edge applications.</p>
              </div>
              
              <div className="key-advantages">
                {keyAdvantages.map((advantage, index) => (
                  <div className="advantage" key={index}>
                    <h3>{advantage}</h3>
                  </div>
                ))}
              </div>
              
              <div className="hero-image">
                <img src="/images/crystal-3d.svg" alt="Diamond Crystal" />
                <div className="tech-specs">
                  <div className="spec-item">
                    <span className="spec-label">Purity</span>
                    <span className="spec-value">≤5 ppb N, ≤20 ppb B</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Dislocations</span>
                    <span className="spec-value">10<sup>1</sup> cm<sup>-2</sup></span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Size</span>
                    <span className="spec-value">up to 15x15 mm</span>
                  </div>
                </div>
              </div>
            </div>
          </ParallaxBackground>
        </section>

        <section id="about" className="about-section">
          <div className="about-decor about-decor-1"></div>
          <div className="about-decor about-decor-2"></div>
          
          <div className="content-wrapper">
            <h2 className="headline">Who We Are</h2>
            <p>FTDiam is a US-based deep-tech start-up in advanced materials sector. We are revolutionizing the industry with the unique Advanced HPHT (AHPHT) technology. Since our inception, we've been dedicated to producing the highest-quality single-crystal diamond substrates for advanced applications.</p>
            
            <div className="infographic">
              <div className="stat-card">
                <div className="stat-number">8+</div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">15+</div>
                <div className="stat-label">Global Partners</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Quality Control</div>
              </div>
            </div>

            <div className="applications">
              <span className="app-icon">Quantum technology</span>
              <span className="app-icon">Semiconductors</span>
              <span className="app-icon">Power electronics</span>
              <span className="app-icon">Advanced optics</span>
            </div>

            <h2 className="headline">Mission</h2>
            <p>Our mission is to provide flawless technical diamonds that drive innovation across industries, from next-generation electronics to life-changing quantum solutions.</p>
            
            <h2 className="headline">History</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">2022</div>
                <div className="timeline-content">Founded as a sales-focused entity sourcing diamonds from a partner facility in India.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2023</div>
                <div className="timeline-content">Expanded partnerships and client base across quantum technology sector.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2027</div>
                <div className="timeline-content">Planned establishment of own AHPHT production facility.</div>
              </div>
            </div>

            <h2 className="headline">Founders</h2>
            <div className="founders">
              <div className="founder">
                <h3>Dmitry Semchenko, CTO</h3>
                <p>Serial entrepreneur with over 8 years in high-quality diamond material. Holder of AHPHT technology.</p>
              </div>
              <div className="founder">
                <h3>Daniil Kurganov, CEO</h3>
                <p>15+ years in management, technical sales and business development worldwide.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="technology" className="technology-section">
          <div className="content-wrapper">
            <h2 className="headline">Advanced HPHT Technology</h2>
            <h3>The Future of Diamond Synthesis</h3>

            <p>Our proprietary Advanced HPHT (AHPHT) technology sets us apart by delivering Type IIa single-crystal diamonds with unmatched quality. With precise control over synthesis parameters, we achieve dislocation densities as low as 10¹ cm⁻² and record-breaking plate sizes up to 15x15 mm.</p>
            
            <div className="features">
              <div className="feature">
                <h4>Unique setup and software for optimal synthesis conditions.</h4>
              </div>
              <div className="feature">
                <h4>Capable of producing large crystals ({'>'}100 carats).</h4>
              </div>
              <div className="feature">
                <h4>Precise nitrogen and boron content control (≤5 ppb N, ≤20 ppb B).</h4>
              </div>
            </div>

            <h3>Technology Comparison</h3>
            <div className="comparison-chart">
              <div className="chart-bar" style={{ height: '200px' }}>
                <div className="chart-bar-fill" style={{ height: '60%' }}></div>
                <div className="chart-value">60%</div>
                <div className="chart-label">CVD</div>
              </div>
              <div className="chart-bar" style={{ height: '200px' }}>
                <div className="chart-bar-fill" style={{ height: '75%' }}></div>
                <div className="chart-value">75%</div>
                <div className="chart-label">HPHT</div>
              </div>
              <div className="chart-bar" style={{ height: '200px' }}>
                <div className="chart-bar-fill" style={{ height: '95%' }}></div>
                <div className="chart-value">95%</div>
                <div className="chart-label">AHPHT</div>
              </div>
            </div>
            
            <div className="comparison-details">
              <div className="comparison-item">
                <h4>CVD</h4>
                <p>Scalable, high dislocations (10⁴-10¹⁰).</p>
              </div>
              <div className="comparison-item">
                <h4>HPHT</h4>
                <p>Better quality, smaller sizes (up to 9x9 mm).</p>
              </div>
              <div className="comparison-item">
                <h4>AHPHT</h4>
                <p>Ultra-low dislocations (10¹ cm⁻²), large sizes, premium quality.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="products-section">
          <div className="content-wrapper">
            <h2 className="headline">High-Quality Diamond Products</h2>
            <h3>Tailored Solutions for Cutting-Edge Applications</h3>
            
            <div className="product">
              <div className="product-header">
                <h4>Diamond Substrates</h4>
              </div>
              <ul>
                <li>Type IIa single-crystal plates.</li>
                <li>Sizes: 3x3 mm to 15x15 mm; Thickness: 0.1-10 mm.</li>
                <li>Purity: ≤5 ppb Nitrogen, ≤20 ppb Boron.</li>
                <li>Dislocations: As low as 10¹ cm⁻².</li>
                <li>Surface: Polished to 0.5 nm Ra.</li>
                <li>Customizable: Shapes, orientations ((100), (111), (110)), miscut.</li>
              </ul>
            </div>
            
            <div className="product">
              <div className="product-header">
                <h4>Diamond Anvils</h4>
              </div>
              <ul>
                <li>Diameters: 3-12 mm.</li>
                <li>Designs: Smooth or faceted.</li>
                <li>Table orientation: (100) standard, custom available.</li>
                <li>Quality: No defects at 50x magnification.</li>
              </ul>
            </div>
            
            <div className="product">
              <div className="product-header">
                <h4>Custom Products</h4>
              </div>
              <ul>
                <li>Lenses, optics, and any shape per client specs.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="quality" className="quality-section">
          <div className="content-wrapper">
            <h2>Unmatched Quality, Proven by Science</h2>
            <p>Our diamonds undergo rigorous testing to ensure they meet the highest standards. See the evidence of our flawless quality below.</p>
            
            <div className="analysis-methods">
              <div className="method">
                <h4>Diamond View</h4>
                <p>Shows minor inclusions, no defects, dislocations &lt;10¹ cm⁻².</p>
              </div>
              <div className="method">
                <h4>Polarized Light Microscopy</h4>
                <p>Very low strain in birefringence.</p>
              </div>
              <div className="method">
                <h4>FTIR</h4>
                <p>Trace boron levels, ultra-pure crystals.</p>
              </div>
              <div className="method">
                <h4>UV-Vis</h4>
                <p>High transmittance, premium quality.</p>
              </div>
              <div className="method">
                <h4>X-Ray Diffraction</h4>
                <p>Dislocation density &lt;50 cm⁻².</p>
              </div>
            </div>
          </div>
        </section>

        <section id="market" className="market-section">
          <div className="content-wrapper">
            <h2 className="headline">Pioneering the Future</h2>
            <p>The demand for high-quality diamond substrates is set to soar as industries transition from R&D to mass production.</p>
            
            <div className="key-areas">
              <div className="area">
                <h4>Quantum Technology</h4>
                <p>NV centers for sensing and computing ($0.5B-$72B by 2035, McKinsey).</p>
                <div className="market-growth">
                  <div className="growth-bar" style={{ width: '85%' }}></div>
                  <span>Projected Growth: High</span>
                </div>
              </div>
              <div className="area">
                <h4>Semiconductors</h4>
                <p>Power electronics and 6G/7G ($70M-$365M by 2031, Verified Market).</p>
                <div className="market-growth">
                  <div className="growth-bar" style={{ width: '70%' }}></div>
                  <span>Projected Growth: Medium-High</span>
                </div>
              </div>
            </div>
            
            <div className="clients">
              <h3>Our Clients</h3>
              <div className="client-logos">
                <div className="logo-placeholder">Harvard</div>
                <div className="logo-placeholder">ESRF</div>
                <div className="logo-placeholder">Quantum Transistors</div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="contacts-section">
          <div className="contact-decor contact-decor-1"></div>
          <div className="contact-decor contact-decor-2"></div>
          
          <div className="content-wrapper">
            <div>
              <h2 className="headline">Partner with Us</h2>
              <p>Ready to explore flawless diamond substrates for your next project? Contact us.</p>
              
              <div className="contact-info">
                <div className="contact-info-block">
                  <h3>Location</h3>
                  <p>220 Park Ave PMB 83131</p>
                  <p>New York, NY 10003, USA</p>
                </div>
                
                <div className="contact-info-block">
                  <h3>Contact Us</h3>
                  <p>Email: <a href="mailto:info@ftdiam.com">info@ftdiam.com</a></p>
                  <p>Phone: <a href="tel:+16172752599">+1 617 275 2599</a></p>
                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/images/Logo.png" alt="FTDiam Logo" className="footer-logo-img" />
            <div className="footer-company-info">
              <p>Advanced HPHT technology delivering superior diamond substrates for cutting-edge applications.</p>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-nav">
              <div className="footer-nav-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#contacts">Contact</a></li>
                </ul>
              </div>
              
              <div className="footer-nav-column">
                <h4>Products</h4>
                <ul>
                  <li><a href="#technology">Technology</a></li>
                  <li><a href="#products">Diamond Substrates</a></li>
                  <li><a href="#quality">Quality Analysis</a></li>
                </ul>
              </div>
              
              <div className="footer-nav-column">
                <h4>Contact</h4>
                <ul>
                  <li><a href="mailto:info@ftdiam.com">info@ftdiam.com</a></li>
                  <li><a href="tel:+16172752599">+1 617 275 2599</a></li>
                  <li>New York, NY 10003, USA</li>
                </ul>
              </div>
            </div>
          </div>
          
          <p className="copyright">© {new Date().getFullYear()} FTDiam - Flawless Technical Diamonds. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
