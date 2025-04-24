import React, { useState, useEffect, useCallback } from 'react';

interface HeaderProps {
  activeSection?: string;
  scrollToSection?: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection: propActiveSection, scrollToSection }) => {
  const [logoError, setLogoError] = useState(false);
  const [whiteLogoError, setWhiteLogoError] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Use active section from props if available
  useEffect(() => {
    if (propActiveSection) {
      setActiveSection(propActiveSection);
    }
  }, [propActiveSection]);

  // Close menu when pressing Escape - for accessibility
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
    }
  }, [menuOpen]);

  // Menu item click handler
  const handleSectionClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (scrollToSection) {
      scrollToSection(sectionId);
      setMenuOpen(false);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMenuOpen(false); // Close menu after clicking
    }
  };

  // Lock scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Keyboard listener for accessibility
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, handleKeyDown]);

  // Determine active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'intro',
        'technology',
        'products',
        'quality',
        'applications',
        'clients',
        'blueprint',
        'contacts'
      ];
      
      const scrollPosition = window.scrollY + 100; // Offset for better active section detection
      
      let activeFound = false;
      
      // Find current active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          activeFound = true;
          break;
        }
      }
      
      // If no section is active (e.g., user is at the very top)
      if (!activeFound) {
        setActiveSection('');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogoError = () => {
    setLogoError(true);
  };

  const handleWhiteLogoError = () => {
    setWhiteLogoError(true);
  };

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Updated menu items matching sections in App.tsx
  const menuItems = [
    { id: 'intro', label: 'ADVANTAGES' },
    { id: 'technology', label: 'TECHNOLOGY' },
    { id: 'products', label: 'PRODUCTS' },
    { id: 'quality', label: 'QUALITY ANALYSIS' },
    { id: 'applications', label: 'APPLICATIONS' },
    { id: 'clients', label: 'CLIENTS' },
    { id: 'blueprint', label: 'BLUEPRINT' },
    { id: 'contacts', label: 'CONTACTS' }
  ];

  // New header layout with simpler structure
  return (
    <header className="new-header">
      {/* Logo in left corner with absolute positioning - скрываем при открытии меню */}
      <div className={`corner-logo logo-wrapper ${menuOpen ? 'hide-on-mobile' : ''}`}>
        <a 
          href="#home" 
          onClick={(e) => handleSectionClick('home', e)} 
          className="logo-link"
        >
          {!logoError ? (
            <img 
              src="/images/Logo.png" 
              alt="FTD Logo" 
              className="header-logo"
              onError={handleLogoError} 
            />
          ) : (
            <span className="placeholder-logo">FTD</span>
          )}
        </a>
      </div>
      
      {/* Navigation centered in the header */}
      <div className="new-nav-container">
        <nav className={`new-menu ${menuOpen ? 'open' : ''}`}>
          {/* Mobile menu content with mobile-first layout */}
          <div className="mobile-menu-content">
            {/* Белый логотип отдельным блоком сверху */}
            <div className="mobile-menu-logo">
              <a 
                href="#home" 
                onClick={(e) => handleSectionClick('home', e)} 
                className="logo-link white-logo-link"
              >
                {!whiteLogoError ? (
                  <img 
                    src="/images/Logo_white.png" 
                    alt="FTD Logo" 
                    className="header-logo white-logo"
                    onError={handleWhiteLogoError} 
                  />
                ) : (
                  <span className="placeholder-logo white">FTD</span>
                )}
              </a>
            </div>
            
            {/* Отдельный блок с пунктами меню */}
            <div className="mobile-menu-items">
              <ul>
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`}
                      onClick={(e) => handleSectionClick(item.id, e)}
                      className={activeSection === item.id ? 'active' : ''}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Desktop menu - показывается только на десктопе */}
          <ul className="desktop-menu-items">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`}
                  onClick={(e) => handleSectionClick(item.id, e)}
                  className={activeSection === item.id ? 'active' : ''}
                  style={{
                    background: 'linear-gradient(to right, #00837f, #241e46)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 600,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Mobile menu toggle */}
      <button 
        className="new-menu-toggle"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        style={{
          display: 'none', // Hide by default, show on mobile via CSS
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 2000,
          padding: '8px'
        }}
      >
        <span className={menuOpen ? "open" : ""} style={{
          display: 'block',
          width: '22px',
          height: '2px',
          background: '#00837f',
          marginBottom: '5px',
          transition: '0.3s ease'
        }}></span>
        <span className={menuOpen ? "open" : ""} style={{
          display: 'block',
          width: '22px',
          height: '2px',
          background: '#00837f',
          marginBottom: '5px',
          transition: '0.3s ease'
        }}></span>
        <span className={menuOpen ? "open" : ""} style={{
          display: 'block',
          width: '22px',
          height: '2px',
          background: '#00837f',
          transition: '0.3s ease'
        }}></span>
      </button>
      
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div 
          className="menu-overlay" 
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 899
          }}
        ></div>
      )}
    </header>
  );
};

export default Header; 