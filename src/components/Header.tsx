import { useState, useEffect } from 'react';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (section: string) => void;
}

const Header = ({ activeSection, scrollToSection }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  const handleSectionClick = (section: string, e: React.MouseEvent) => {
    e.stopPropagation();
    scrollToSection(section);
    closeMenu();
  };

  return (
    <header className={scrolled ? 'scrolled' : ''} onClick={() => handleSectionClick('home', window.event as any)}>
      <button 
        className={`menu-button ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="menu-icon"></span>
      </button>

      <nav className={isMenuOpen ? 'open' : ''} onClick={(e) => e.stopPropagation()}>
        <div className="close-button" onClick={closeMenu}>
          <span className="close-icon">×</span>
        </div>
        <ul>
          <li 
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => handleSectionClick('about', e)}
          >
            <span>About Us</span>
          </li>
          <li 
            className={activeSection === 'technology' ? 'active' : ''}
            onClick={(e) => handleSectionClick('technology', e)}
          >
            <span>Our Technology</span>
          </li>
          <li 
            className={activeSection === 'products' ? 'active' : ''}
            onClick={(e) => handleSectionClick('products', e)}
          >
            <span>Products</span>
          </li>
          <li 
            className={activeSection === 'quality' ? 'active' : ''}
            onClick={(e) => handleSectionClick('quality', e)}
          >
            <span>Quality Analysis</span>
          </li>
          <li 
            className={activeSection === 'contacts' ? 'active' : ''}
            onClick={(e) => handleSectionClick('contacts', e)}
          >
            <span>Contact Us</span>
          </li>
        </ul>
      </nav>

      <div 
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} 
        onClick={closeMenu}
      ></div>
    </header>
  );
};

export default Header; 