import React, { useState, useEffect, useRef } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeSection from './components/sections/HomeSection'
import IntroSection from './components/sections/IntroSection'
import TechnologySection from './components/sections/TechnologySection'
import ProductsSection from './components/sections/ProductsSection'
import QualitySection from './components/sections/QualitySection'
import ApplicationsSection from './components/sections/ApplicationsSection'
import ContactsSection from './components/sections/ContactsSection'
import BluePrint from './components/sections/BluePrint'
import ClientsSection from './components/sections/ClientsSection'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import { trackVisitor } from './utils/analytics'

// Import styles
import './styles/index.css'

// Declare Google Analytics gtag for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: object) => void;
  }
}

// Component for protected routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = sessionStorage.getItem('ftdiam_admin_auth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Main site component
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
    applications: null,
    clients: null,
    blueprint: null,
    contacts: null,
  });
  
  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      
      // Update URL hash without causing a scroll
      window.history.replaceState(null, '', `#${sectionId}`);
      
      // Track the navigation event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'navigation', {
          'event_category': 'user_interaction',
          'event_label': `scroll_to_${sectionId}`
        });
      }
    }
  };
  
  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Use smaller offset for better detection
      
      // Get all sections as array and sort by their position
      const sections = [
        { id: 'home', element: document.getElementById('home') },
        { id: 'intro', element: document.getElementById('intro') },
        { id: 'technology', element: document.getElementById('technology') },
        { id: 'products', element: document.getElementById('products') },
        { id: 'quality', element: document.getElementById('quality') },
        { id: 'applications', element: document.getElementById('applications') },
        { id: 'clients', element: document.getElementById('clients') },
        { id: 'blueprint', element: document.getElementById('blueprint') },
        { id: 'contacts', element: document.getElementById('contacts') }
      ].filter(section => section.element !== null)
        .sort((a, b) => {
          if (!a.element || !b.element) return 0;
          return a.element.offsetTop - b.element.offsetTop;
        });
      
      // Find the last section that is above current scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          if (activeSection !== section.id) {
            setActiveSection(section.id);
            // Update URL hash without scroll
            window.history.replaceState(null, '', `#${section.id}`);
          }
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);
  
  // Track site visits
  useEffect(() => {
    trackVisitor();
  }, []);
  
  // Check URL hash on initial load for direct section navigation
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Delay to ensure DOM is fully loaded
      setTimeout(() => {
        scrollToSection(hash);
      }, 500);
    }
  }, []);
  
  useEffect(() => {
    // Simulate loading for smooth animation
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
            <ApplicationsSection />
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
