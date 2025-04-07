import React, { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeSection from './components/sections/HomeSection'
import IntroSection from './components/sections/IntroSection'
import TechnologySection from './components/sections/TechnologySection'
import ProductsSection from './components/sections/ProductsSection'
import QualitySection from './components/sections/QualitySection'
import ContactsSection from './components/sections/ContactsSection'
import MissionSection from './components/sections/MissionSection'
import { WhoWeAreSection, HistorySection } from './components/sections/AboutSection'
import './styles/index.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/header.css'
import './styles/responsive.css'
import './styles/intro.css'
import './styles/technology.css'
import './styles/quality.css'
import './styles/about.css'
import './styles/mission.css'
import './styles/founders.css'
import './styles/contacts.css'
import './styles/footer.css'
import './styles/home.css'
import './styles/cards.css'
import './styles/backgrounds.css'

// Main App component
function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({
    home: null,
    mission: null,
    intro: null,
    about: null,
    technology: null,
    products: null,
    quality: null,
    contacts: null,
  })
  
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
    // Функция обработки скролла
    const handleScroll = () => {
      // Обновляем стиль хедера при скролле
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Определяем, какая секция сейчас видна
      for (const section in sectionsRef.current) {
        const element = sectionsRef.current[section];
        
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    // Устанавливаем обработчик события скролла
    window.addEventListener('scroll', handleScroll);
    
    // Вызываем обработчик первоначально
    handleScroll();
    
    // Очищаем обработчик при размонтировании
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Присваиваем ссылки на DOM-элементы при монтировании компонентов
  useEffect(() => {
    sectionsRef.current = {
      home: document.getElementById('home'),
      mission: document.getElementById('mission'),
      intro: document.getElementById('intro'),
      about: document.getElementById('about'),
      technology: document.getElementById('technology'),
      products: document.getElementById('products'),
      quality: document.getElementById('quality'),
      contacts: document.getElementById('contacts'),
    };
  }, [])

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
            <div className="loader-spinner"></div>
          </div>
        </div>
      ) : (
        <>
          <Header activeSection={activeSection} scrollToSection={scrollToSection} />

          <main className="no-gap-container">
            <HomeSection />
            <MissionSection />
            <IntroSection />
            <WhoWeAreSection />
            <TechnologySection />
            <ProductsSection />
            <QualitySection />
            <ContactsSection />
          </main>

          <Footer />
        </>
      )}
    </div>
  )
}

export default App
