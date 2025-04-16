import React, { useState, useEffect, useCallback } from 'react';

const Header = () => {
  const [logoError, setLogoError] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Закрытие меню при нажатии Escape - для доступности
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
    }
  }, [menuOpen]);

  // Обработчик клика по пунктам меню
  const handleSectionClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMenuOpen(false); // Закрываем меню при клике на пункт
    }
  };

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Слушатель клавиатуры для доступности
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, handleKeyDown]);

  // Определение активного раздела при прокрутке
  useEffect(() => {
    const handleScroll = () => {
      // Меняем состояние прокрутки для эффекта хедера
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      const sections = [
        'home',
        'about',
        'products',
        'applications',
        'facilities',
        'diamond',
        'contacts'
      ];
      
      const scrollPosition = window.scrollY + 100; // Смещение для лучшего определения активного раздела
      
      let activeFound = false;
      
      // Находим текущий активный раздел
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          activeFound = true;
          break;
        }
      }
      
      // Если ни один раздел не активен (например, пользователь в самом верху страницы)
      if (!activeFound) {
        setActiveSection('');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Вызываем при монтировании
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogoError = () => {
    setLogoError(true);
  };
  
  // Функция для управления анимацией появления элементов
  const getAnimationDelay = (index: number) => {
    return {
      animationDelay: `${0.1 + index * 0.05}s`
    };
  };

  // Переключение меню
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'applications', label: 'Applications' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'diamond', label: 'Diamond' },
    { id: 'contacts', label: 'Contact' }
  ];

  return (
    <header className={`static-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-wrapper fade-in">
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
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </button>
        
        <nav className={`static-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            {menuItems.map((item, index) => (
              <li key={item.id} style={getAnimationDelay(index)} className="fade-in">
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
        
        {/* Оверлей для мобильного меню */}
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