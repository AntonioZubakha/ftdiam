import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeSection from './components/sections/HomeSection'
import IntroSection from './components/sections/IntroSection'
import TechnologySection from './components/sections/TechnologySection'
import ProductsSection from './components/sections/ProductsSection'
import QualitySection from './components/sections/QualitySection'
import ContactsSection from './components/sections/ContactsSection'
import BluePrint from './components/sections/BluePrint'
import ClientsSection from './components/sections/ClientsSection'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import { trackVisitor } from './utils/analytics'

// Импорт стилей
import './styles/app.css'
import './styles/index.css'
import './styles/base.css'
import './styles/header.css'
import './styles/intro.css'
import './styles/technology.css'
import './styles/quality.css'
import './styles/bluePrint.css'
import './styles/contacts.css'
import './styles/footer.css'
import './styles/home.css'
import './styles/contact-modal.css'
import './styles/technology-modal.css'
import './styles/clients.css'
import './styles/admin.css'

// Компонент для защищенных маршрутов
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = sessionStorage.getItem('ftdiam_admin_auth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Основной компонент сайта
const MainSite: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  
  const sectionsRef = useRef<{
    [key: string]: HTMLElement | null;
  }>({
    home: null,
    intro: null,
    technology: null,
    products: null,
    quality: null,
    clients: null,
    blueprint: null,
    contacts: null,
  });
  
  // Функция для скролла к секции
  const scrollToSection = (sectionId: string) => {
    const section = sectionsRef.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Отслеживание активной секции при скролле
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      const sections = Object.entries(sectionsRef.current)
        .filter(([_, el]) => el !== null)
        .sort(([_, a], [__, b]) => {
          if (!a || !b) return 0;
          return a.offsetTop - b.offsetTop;
        });
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const [sectionId, element] = sections[i];
        if (element && element.offsetTop <= scrollPosition) {
          if (activeSection !== sectionId) {
            setActiveSection(sectionId);
            // Опционально: обновляем URL хеш без скролла
            window.history.replaceState(null, '', `#${sectionId}`);
          }
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Инициализация
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);
  
  // Отслеживание посещений сайта
  useEffect(() => {
    trackVisitor();
  }, []);
  
  // Присваиваем ссылки на DOM-элементы при монтировании компонентов
  useEffect(() => {
    sectionsRef.current = {
      home: document.getElementById('home'),
      intro: document.getElementById('intro'),
      technology: document.getElementById('technology'),
      products: document.getElementById('products'),
      quality: document.getElementById('quality'),
      clients: document.getElementById('clients'),
      blueprint: document.getElementById('blueprint'),
      contacts: document.getElementById('contacts'),
    };
  }, []);
  
  useEffect(() => {
    // Имитация загрузки для плавной анимации
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`app ${isLoading ? 'app-loading' : 'app-loaded'}`}>
      {isLoading ? (
        <div className="loader">
          <div className="loader-content">
            <img src="/images/Logo.png" alt="FTDiam Logo" className="loader-logo" />
          </div>
        </div>
      ) : (
        <>
          <Header activeSection={activeSection} scrollToSection={scrollToSection} />
          
          <main className="no-gap-container" style={{ position: 'relative' }}>
            <HomeSection scrollToSection={scrollToSection} />
            <IntroSection />
            <TechnologySection />
            <ProductsSection />
            <QualitySection />
            <ClientsSection />
            <BluePrint />
            <ContactsSection />
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App
