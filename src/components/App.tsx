import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import HomeSection from './sections/HomeSection';
import IntroSection from './sections/IntroSection';
import TechnologySection from './sections/TechnologySection';
import ProductsSection from './sections/ProductsSection';
import QualitySection from './sections/QualitySection';
import MissionSection from './sections/MissionSection';
import WhoWeAreSection from './sections/WhoWeAre';
import ContactsSection from './sections/ContactsSection';
import '../styles/app.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Обработчик для анимации появления элементов при скролле
    const handleScroll = () => {
      const sections = document.querySelectorAll('.fade-in-section');
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('is-visible');
        }
      });

      // Определение активной секции при скролле
      const sectionElements = document.querySelectorAll('section[id]');
      let currentActiveSection = 'home';
      
      sectionElements.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight / 2) {
          currentActiveSection = section.id;
        }
      });
      
      if (currentActiveSection !== activeSection) {
        setActiveSection(currentActiveSection);
      }
    };
    
    // Применяем классы для анимации ко всем секциям
    const applySectionClasses = () => {
      const allSections = document.querySelectorAll('section > div');
      allSections.forEach((section) => {
        if (!section.classList.contains('fade-in-section')) {
          section.classList.add('fade-in-section');
        }
      });
      
      // Также добавим класс к карточкам, блокам и другим элементам
      const cards = document.querySelectorAll('.spec-block, .founder-block, .advantage-card, .contact-info, .contact-form');
      cards.forEach((card) => {
        if (!card.classList.contains('fade-in-section')) {
          card.classList.add('fade-in-section');
        }
      });
      
      // Вызываем handleScroll для начальных элементов на экране
      handleScroll();
    };

    // Инициализация при загрузке страницы
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    window.addEventListener('load', applySectionClasses);
    
    // Небольшая задержка для уверенности, что DOM полностью загружен
    setTimeout(applySectionClasses, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('load', applySectionClasses);
    };
  }, [activeSection]);

  return (
    <div className="app">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <main>
        <HomeSection />
        <IntroSection />
        <TechnologySection />
        <ProductsSection />
        <QualitySection />
        <MissionSection />
        <WhoWeAreSection />
        <ContactsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App; 