import React, { useState, useEffect, useCallback } from 'react';

interface HeaderProps {
  activeSection?: string;
  scrollToSection?: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection: propActiveSection, scrollToSection }) => {
  const [logoError, setLogoError] = useState(false);
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
    { id: 'clients', label: 'CLIENTS' },
    { id: 'blueprint', label: 'BLUEPRINT' },
    { id: 'contacts', label: 'CONTACTS' }
  ];

  return (
    <header className="static-header">
      <div className="header-container">
        <div className="logo-wrapper">
          <a href="#home" onClick={(e) => handleSectionClick('home', e)}>
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
        
        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </button>
        
        <nav className={`static-menu ${menuOpen ? 'open' : ''}`}>
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
        </nav>
        
        {/* Overlay for mobile menu */}
        {menuOpen && (
          <div 
            className="menu-overlay" 
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          ></div>
        )}
      </div>
    </header>
  );
};

export default Header; 