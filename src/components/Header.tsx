import React, { useState, useEffect, useCallback } from 'react';

interface HeaderProps {
  activeSection?: string;
  scrollToSection?: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection: propActiveSection, scrollToSection }) => {
  const [logoError, setLogoError] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Используем активный раздел из пропсов, если он доступен
  useEffect(() => {
    if (propActiveSection) {
      setActiveSection(propActiveSection);
    }
  }, [propActiveSection]);

  // Закрытие меню при нажатии Escape - для доступности
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
    }
  }, [menuOpen]);

  // Обработчик клика по пунктам меню
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
  }, []);

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

  // Обновленные пункты меню, соответствующие секциям в App.tsx
  const menuItems = [
    { id: 'intro', label: 'Advantages' },
    { id: 'technology', label: 'Technology' },
    { id: 'products', label: 'Products' },
    { id: 'quality', label: 'Quality Analysis' },
    { id: 'clients', label: 'Clients' },
    { id: 'blueprint', label: 'Blueprint' },
    { id: 'contacts', label: 'Contacts' }
  ];

  return (
    <header className="static-header">
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