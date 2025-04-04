import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeSection from './components/sections/HomeSection'
import IntroSection from './components/sections/IntroSection'
import AboutSection from './components/sections/AboutSection'
import TechnologySection from './components/sections/TechnologySection'
import ProductsSection from './components/sections/ProductsSection'
import VideoSection from './components/sections/VideoSection'
import QualitySection from './components/sections/QualitySection'
import ContactsSection from './components/sections/ContactsSection'
import './styles/index.css'

// Main App component
function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({
    home: null,
    about: null,
    technology: null,
    products: null,
    video: null,
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
  }, [])

  // Присваиваем ссылки на DOM-элементы при монтировании компонентов
  useEffect(() => {
    sectionsRef.current = {
      home: document.getElementById('home'),
      about: document.getElementById('about'),
      technology: document.getElementById('technology'),
      products: document.getElementById('products'),
      video: document.getElementById('video-section'),
      quality: document.getElementById('quality'),
      contacts: document.getElementById('contacts'),
    };
  }, [])

  return (
    <div className="app">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />

      <main className="no-gap-container">
        <HomeSection />
        <IntroSection />
        <AboutSection />
        <TechnologySection />
        <ProductsSection />
        <VideoSection />
        <QualitySection />
        <ContactsSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
