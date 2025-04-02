import { useState, useEffect } from 'react'
import './styles.css'
import ContactForm from './ContactForm'

// Main App component
function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      const sections = ['home', 'about', 'technology', 'products', 'quality', 'contacts']
      
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

  // Добавляем эффект для создания декоративных элементов
  useEffect(() => {
    // Функция для создания геометрических элементов
    const createGeometricElements = () => {
      const sections = document.querySelectorAll('.section:not(.home-section)');
      
      // Удаляем существующие дополнительные элементы
      document.querySelectorAll('.additional-element').forEach(el => el.remove());
      
      // Паттерны SVG для различных типов геометрических фигур
      const svgPatterns = [
        // Круги
        "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23241e46' stroke-width='1.5'%3E%3Ccircle cx='20' cy='20' r='15' /%3E%3C/g%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300837f' stroke-width='1.5'%3E%3Ccircle cx='20' cy='20' r='10' /%3E%3Ccircle cx='20' cy='20' r='5' /%3E%3C/g%3E%3C/svg%3E",
        // Квадраты
        "data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23241e46' stroke-width='1.5'%3E%3Crect x='5' y='5' width='20' height='20' /%3E%3C/g%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg width='110' height='110' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300837f' stroke-width='1.5'%3E%3Crect x='10' y='10' width='20' height='20' /%3E%3Crect x='15' y='15' width='10' height='10' /%3E%3C/g%3E%3C/svg%3E",
        // Ромбы
        "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23241e46' stroke-width='1.5'%3E%3Cpath d='M20,5 L35,20 L20,35 L5,20 Z' /%3E%3C/g%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg width='130' height='130' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300837f' stroke-width='1.5'%3E%3Cpath d='M25,10 L40,25 L25,40 L10,25 Z' /%3E%3Cpath d='M25,15 L35,25 L25,35 L15,25 Z' /%3E%3C/g%3E%3C/svg%3E",
        // Треугольники
        "data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23241e46' stroke-width='1.5'%3E%3Cpath d='M15,5 L25,25 L5,25 Z' /%3E%3C/g%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg width='110' height='110' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300837f' stroke-width='1.5'%3E%3Cpath d='M20,10 L30,30 L10,30 Z' /%3E%3C/g%3E%3C/svg%3E",
        // Шестиугольники
        "data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23241e46' stroke-width='1.5'%3E%3Cpath d='M30,20 L25,32 L15,32 L10,20 L15,8 L25,8 Z' /%3E%3C/g%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300837f' stroke-width='1.5'%3E%3Cpath d='M30,20 L25,32 L15,32 L10,20 L15,8 L25,8 Z' /%3E%3Cpath d='M25,20 L22.5,26 L17.5,26 L15,20 L17.5,14 L22.5,14 Z' /%3E%3C/g%3E%3C/svg%3E",
        // Сетки
        "data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23241e46' stroke-width='1.5'%3E%3Cpath d='M5,5 L25,5 M5,15 L25,15 M5,25 L25,25' /%3E%3Cpath d='M5,5 L5,25 M15,5 L15,25 M25,5 L25,25' /%3E%3C/g%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300837f' stroke-width='1.5'%3E%3Cpath d='M10,10 L30,10 M10,20 L30,20 M10,30 L30,30' /%3E%3Cpath d='M10,10 L10,30 M20,10 L20,30 M30,10 L30,30' /%3E%3C/g%3E%3C/svg%3E"
      ];
      
      sections.forEach(section => {
        // Создаем 12 элементов в каждой секции
        for (let i = 0; i < 12; i++) {
          const element = document.createElement('div');
          element.classList.add('additional-element');
          element.style.position = 'absolute';
          
          // Определяем размеры элемента (от 60px до 170px)
          const size = Math.floor(Math.random() * 110 + 60);
          element.style.width = size + 'px';
          element.style.height = size + 'px';
          
          // Случайное положение элемента внутри секции
          element.style.top = Math.floor(Math.random() * 100) + '%';
          element.style.left = Math.floor(Math.random() * 100) + '%';
          element.style.transform = 'translate(-50%, -50%) rotate(' + Math.floor(Math.random() * 360) + 'deg)';
          
          // Случайная непрозрачность (от 0.06 до 0.12)
          element.style.opacity = (Math.random() * 0.06 + 0.06).toFixed(2);
          
          // Выбираем случайный SVG паттерн
          const patternIndex = Math.floor(Math.random() * svgPatterns.length);
          element.style.backgroundImage = 'url("' + svgPatterns[patternIndex] + '")';
          element.style.backgroundRepeat = 'no-repeat';
          element.style.backgroundSize = 'contain';
          element.style.pointerEvents = 'none';
          element.style.zIndex = '1';
          
          section.appendChild(element);
        }
      });
    };

    // Вызываем функцию создания элементов сразу после монтирования компонента
    createGeometricElements();

    // Добавляем обработчик на изменение размера окна, чтобы элементы не терялись при ресайзе
    window.addEventListener('resize', createGeometricElements);
    
    // Очистка при размонтировании компонента
    return () => {
      window.removeEventListener('resize', createGeometricElements);
      document.querySelectorAll('.additional-element').forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="app">
      <header className={scrolled ? 'scrolled' : ''}>
        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="menu-icon"></span>
        </button>
        <nav className={isMenuOpen ? 'open' : ''}>
          <ul>
            <li className={activeSection === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About</li>
            <li className={activeSection === 'technology' ? 'active' : ''} onClick={() => scrollToSection('technology')}>Technology</li>
            <li className={activeSection === 'products' ? 'active' : ''} onClick={() => scrollToSection('products')}>Products</li>
            <li className={activeSection === 'quality' ? 'active' : ''} onClick={() => scrollToSection('quality')}>Quality Analysis</li>
            <li className={activeSection === 'contacts' ? 'active' : ''} onClick={() => scrollToSection('contacts')}>Contacts</li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="home" className="section home-section">
          <div className="video-container">
            <video className="background-video" autoPlay muted playsInline loop>
              <source src="/video/video.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="content-wrapper">
            <div className="hero-content">
              <img src="/images/Logo_white.png" alt="FTDiam Logo" className="hero-logo" />
              <div className="hero-text">
                <h2 className="hero-subheadline">Single Crystal Diamond Substrates</h2>
                <p className="hero-description">Advanced HPHT technology for cutting-edge applications</p>
              </div>
            </div>
          </div>
        </section>

        <section id="intro" className="section intro-section">
          <div className="content-wrapper">
            <div className="intro-content">
              <h2 className="intro-headline">Premium Diamond Specifications</h2>
              <p className="intro-tagline">Setting the industry standard with exceptional quality</p>
            </div>
            <div className="specs-grid">
              <div className="spec-block">
                <div className="spec-icon">
                  <img src="/images/CrystalLatticeIcon.png" alt="Dislocations" />
                </div>
                <h3>Dislocations</h3>
                <p>10¹ cm⁻²</p>
                <div className="spec-detail">Industry-leading purity</div>
              </div>
              <div className="spec-block">
                <div className="spec-icon">
                  <img src="/images/DiamondSizeIcon.png" alt="Size" />
                </div>
                <h3>Size</h3>
                <p>up to 15x15 mm</p>
                <div className="spec-detail">Perfect for all applications</div>
              </div>
              <div className="spec-block">
                <div className="spec-icon">
                  <img src="/images/DiamondPurityIcon.png" alt="Purity" />
                </div>
                <h3>Purity</h3>
                <p>≤5 ppb N</p>
                <div className="spec-detail">Ultra-low nitrogen content</div>
              </div>
            </div>
          </div>
        </section>
        <div className="section-divider" />

        <section id="about" className="section about-section">
          <div className="content-wrapper">
            <h2 className="headline">Who We Are</h2>
            <p className="section-description">FTDiam is a US-based deep-tech start-up in advanced materials sector. We are revolutionizing the industry with the unique Advanced HPHT (AHPHT) technology. Since our inception, we've been dedicated to producing the highest-quality single-crystal diamond substrates for advanced applications.</p>
            
            <div className="infographic">
              <div className="stat-card">
                <div className="stat-icon">🌟</div>
                <div className="stat-number">8+</div>
                <div className="stat-label">Years of Experience</div>
                <div className="stat-detail">Pioneering diamond synthesis since 2015</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌍</div>
                <div className="stat-number">15+</div>
                <div className="stat-label">Global Partners</div>
                <div className="stat-detail">Trusted by leading research institutions</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✨</div>
                <div className="stat-number">100%</div>
                <div className="stat-label">Quality Control</div>
                <div className="stat-detail">Every crystal rigorously tested</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-number">2x</div>
                <div className="stat-label">Annual Growth</div>
                <div className="stat-detail">Rapid market expansion</div>
              </div>
            </div>

            <div className="applications">
              <div className="app-card">
                <span className="app-icon">⚛️</span>
                <span className="app-title">Quantum Technology</span>
                <span className="app-detail">NV centers and quantum computing</span>
              </div>
              <div className="app-card">
                <span className="app-icon">💻</span>
                <span className="app-title">Semiconductors</span>
                <span className="app-detail">Next-gen power electronics</span>
              </div>
              <div className="app-card">
                <span className="app-icon">⚡</span>
                <span className="app-title">Power Electronics</span>
                <span className="app-detail">High-efficiency devices</span>
              </div>
              <div className="app-card">
                <span className="app-icon">🔭</span>
                <span className="app-title">Advanced Optics</span>
                <span className="app-detail">Precision optical components</span>
              </div>
            </div>

            <h2 className="headline">Mission</h2>
            <p className="section-description">Our mission is to provide flawless technical diamonds that drive innovation across industries, from next-generation electronics to life-changing quantum solutions.</p>
            
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
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <img src="/images/Dmitri.jpg" alt="Dmitry Semchenko" className="founder-photo" />
                </div>
                <h3>Dmitry Semchenko, CTO</h3>
                <p>Serial entrepreneur with over 8 years in high-quality diamond material. Holder of AHPHT technology.</p>
              </div>
              <div className="founder">
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <img src="/images/Dan.jpg" alt="Daniil Kurganov" className="founder-photo" />
                </div>
                <h3>Daniil Kurganov, CEO</h3>
                <p>15+ years in management, technical sales and business development worldwide.</p>
              </div>
            </div>
          </div>
        </section>
        <div className="section-divider" />

        <section id="technology" className="section technology-section">
          <div className="content-wrapper">
            <h2 className="headline">Advanced HPHT Technology</h2>
            <h3>The Future of Diamond Synthesis</h3>
            <p className="section-description">
              • An added technological setup that allows for controlling and adjusting parameters to achieve the optimal synthesis conditions.<br/>
              • Specialized software for monitoring synthesis parameters.<br/>
              • Unique know-how in the composition and preparation methods of the synthesis cell for crystal growth.
            </p>
            
            <div className="features">
              <div className="feature">
                <h4>Ultra low dislocations number (10¹ cm⁻²)</h4>
              </div>
              <div className="feature">
                <h4>Record-size high-quality substrates</h4>
              </div>
              <div className="feature">
                <h4>Very low strain and zero-Nitrogen level</h4>
              </div>
            </div>

            <div className="tech-highlights">
              <div className="highlight-card">
                <div className="highlight-icon">💎</div>
                <h4>Crystal Perfection</h4>
                <p>Dislocation density as low as 10¹ cm⁻²</p>
                <div className="highlight-meter">
                  <div className="meter-fill" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">⚡</div>
                <h4>Energy Efficiency</h4>
                <p>30% less energy consumption</p>
                <div className="highlight-meter">
                  <div className="meter-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">📏</div>
                <h4>Size Control</h4>
                <p>Precise dimensional control</p>
                <div className="highlight-meter">
                  <div className="meter-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="section-divider" />

        <section id="products" className="section products-section">
          <div className="content-wrapper">
            <h2 className="headline">High-Quality Diamond Products</h2>
            <h3>Tailored Solutions for Cutting-Edge Applications</h3>
            
            <div className="product">
              <div className="product-header">
                <h4>Diamond Substrates</h4>
              </div>
              <ul>
                <li>Type IIa single-crystal plates</li>
                <li>Sizes: 3x3 mm to 15x15 mm; Thickness: 0.1-10 mm</li>
                <li>Purity: ≤5 ppb Nitrogen, ≤20 ppb Boron</li>
                <li>Dislocations: As low as 10¹ cm⁻²</li>
                <li>Surface: Polished to 0.5 nm Ra</li>
                <li>Customizable: Shapes, orientations ((100), (111), (110)), miscut</li>
              </ul>
            </div>
            
            <div className="product">
              <div className="product-header">
                <h4>Diamond Anvils</h4>
              </div>
              <ul>
                <li>Diameters: 3-12 mm</li>
                <li>Designs: Smooth or faceted</li>
                <li>Table orientation: (100) standard, custom available</li>
                <li>Quality: No defects at 50x magnification</li>
              </ul>
            </div>
            
            <div className="product">
              <div className="product-header">
                <h4>Custom Products</h4>
              </div>
              <ul>
                <li>Lenses, optics, and any shape per client specs</li>
              </ul>
            </div>
          </div>
        </section>
        <div className="section-divider" />

        <section id="quality" className="section quality-section">
          <div className="content-wrapper">
            <h2 className="headline">Unmatched Quality, Proven by Science</h2>
            <p className="section-description">Our diamonds undergo rigorous testing to ensure they meet the highest standards. See the evidence of our flawless quality below.</p>
            
            <div className="analysis-methods">
              <div className="method">
                <h4>Diamond View</h4>
                <p>Shows minor inclusions, no defects, dislocations &lt;10¹ cm⁻²</p>
              </div>
              <div className="method">
                <h4>Polarized Light Microscopy</h4>
                <p>Very low strain in birefringence</p>
              </div>
              <div className="method">
                <h4>FTIR</h4>
                <p>Trace boron levels, ultra-pure crystals</p>
              </div>
              <div className="method">
                <h4>UV-Vis</h4>
                <p>High transmittance, premium quality</p>
              </div>
              <div className="method">
                <h4>X-Ray Diffraction</h4>
                <p>Dislocation density &lt;50 cm⁻²</p>
              </div>
            </div>
          </div>
        </section>
        <div className="section-divider" />

        <section id="contacts" className="section contacts-section">
          <div className="content-wrapper">
            <div>
              <h2 className="headline">Partner with Us</h2>
              <p className="section-description">Ready to explore flawless diamond substrates for your next project? Contact us.</p>
              
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
              <p>FTDiam - Flawless Technical Diamonds</p>
              <p>220 Park Ave PMB 83131</p>
              <p>New York, NY 10003, USA</p>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-nav">
              <div className="footer-nav-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#technology">Technology</a></li>
                </ul>
              </div>
              
              <div className="footer-nav-column">
                <h4>Products</h4>
                <ul>
                  <li><a href="#products">Diamond Substrates</a></li>
                  <li><a href="#quality">Quality Analysis</a></li>
                  <li><a href="#market">Market Opportunity</a></li>
                </ul>
              </div>
              
              <div className="footer-nav-column">
                <h4>Contact</h4>
                <ul>
                  <li><a href="mailto:info@ftdiam.com">info@ftdiam.com</a></li>
                  <li><a href="tel:+16172752599">+1 617 275 2599</a></li>
                  <li><a href="#contacts">Contact Form</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="copyright">
            <p>© {new Date().getFullYear()} FTDiam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
