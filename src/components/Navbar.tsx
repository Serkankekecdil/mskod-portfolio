import React, { useState, useEffect, createContext, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

// Language Context
interface LanguageContextType {
  currentLanguage: string;
  toggleLanguage: () => void;
  getText: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('TR');

  const texts = {
    TR: {
      home: 'Ana Sayfa',
      about: 'Hakkımızda',
      services: 'Hizmetler',
      brands: 'Markalar',
      references: 'Referanslar',
      contact: 'İletişim',
      // Ana sayfa metinleri
      heroTitle: 'MSK CODE',
      heroDescription: 'Modern web teknolojileri konusunda uzmanlaşan, kaliteli yazılım çözümleri geliştiren tutkulu genç yazılımcı. Her projede öğrenmeye ve gelişmeye odaklı.',
      completedProjects: 'Tamamlanan Proje',
      happyClients: 'Mutlu Müşteri',
      codeQuality: 'Kod Kalitesi',
      yearsExperience: 'Yıl Deneyim',
      exploreProjects: 'Projelerimizi Keşfet',
      getInTouch: 'Hemen İletişime Geç',
      expertiseAreas: 'Uzmanlık Alanlarım',
      techSkills: 'Teknoloji Yetkinliklerim',
      developmentProcess: 'Geliştirme Sürecim',
      letsBuildProject: 'Projenizi Hayata Geçirelim!',
      // Contact sayfası
      contactTitle: 'İletişime Geçin',
      contactSubtitle: 'Projeleriniz için birlikte çalışalım',
      // Footer
      quickLinks: 'Hızlı Linkler',
      contactInfo: 'İletişim',
      socialMedia: 'Sosyal Medya'
    },
    EN: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      brands: 'Brands',
      references: 'References',
      contact: 'Contact',
      // Home page texts
      heroTitle: 'MSK CODE',
      heroDescription: 'Passionate young developer specializing in modern web technologies, developing quality software solutions. Focused on learning and growing with every project.',
      completedProjects: 'Completed Projects',
      happyClients: 'Happy Clients',
      codeQuality: 'Code Quality',
      yearsExperience: 'Years Experience',
      exploreProjects: 'Explore My Projects',
      getInTouch: 'Get In Touch',
      expertiseAreas: 'My Expertise Areas',
      techSkills: 'Technology Skills',
      developmentProcess: 'Development Process',
      letsBuildProject: 'Let\'s Build Your Project!',
      // Contact page
      contactTitle: 'Get In Touch',
      contactSubtitle: 'Let\'s work together on your projects',
      // Footer
      quickLinks: 'Quick Links',
      contactInfo: 'Contact',
      socialMedia: 'Social Media'
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'TR' ? 'EN' : 'TR');
  };

  const getText = (key: string) => {
    return texts[currentLanguage as keyof typeof texts][key as keyof typeof texts.TR] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, toggleLanguage, getText }}>
      {children}
    </LanguageContext.Provider>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { currentLanguage, toggleLanguage, getText } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Dark mode durumunu localStorage'dan al
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-theme');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-symbol">
            <div className="symbol-arc arc-1"></div>
            <div className="symbol-arc arc-2"></div>
            <div className="symbol-arc arc-3"></div>
            <div className="symbol-dot"></div>
          </div>
          <img src="/logo.png" alt="MSK Logo" className="logo-image" />
        </Link>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {getText('home')}
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {getText('about')}
          </Link>
          <Link 
            to="/services" 
            className={`nav-link ${isActive('/services') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {getText('services')}
          </Link>
          <Link 
            to="/brands" 
            className={`nav-link ${isActive('/brands') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {getText('brands')}
          </Link>
          <Link 
            to="/references" 
            className={`nav-link ${isActive('/references') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {getText('references')}
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {getText('contact')}
          </Link>
          
          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          {/* Language Toggle */}
          <button className="language-toggle" onClick={toggleLanguage}>
            {currentLanguage}
          </button>
        </div>

        <div 
          className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 