import React, { useEffect, useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import PageSEO from '../components/PageSEO';
import '../styles/Home.css';
import '../styles/FeatureTags.css';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  gradient: string;
  delay: number;
}

interface TechSkill {
  name: string;
  level: number;
  icon: string;
  color: string;
}

const Home: React.FC = () => {
  const { adminData } = useAdmin();

  // SVG icon definitions
  const svgIcons: { [key: string]: string } = {
    'web': 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 10.1 9.9 11 11 11V22H13V11C14.1 11 15 10.1 15 9ZM5 12H7V22H5V12ZM19 12H21V22H19V12Z',
    'mobile': 'M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21C5,22.11 5.89,23 7,23H17C18.11,23 19,22.11 19,21V3C19,1.89 18.11,1 17,1Z',
    'ai': 'M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z',
    'cloud': 'M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04Z',
    'database': 'M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z',
    'security': 'M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z',
    'analytics': 'M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z',
    'design': 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,15.4L16.2,16.2Z',
    'ecommerce': 'M17,18C17.55,18 18,18.45 18,19A1,1 0 0,1 17,20A1,1 0 0,1 16,19C16,18.45 16.45,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5H5.21L4.27,3H1M7,18C7.55,18 8,18.45 8,19A1,1 0 0,1 7,20A1,1 0 0,1 6,19C6,18.45 6.45,18 7,18Z',
    'consulting': 'M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z'
  };

  const renderServiceIcon = (icon: string) => {
    // SVG icon formatında mı kontrol et
    if (icon.startsWith('svg:')) {
      const iconKey = icon.replace('svg:', '');
      const svgPath = svgIcons[iconKey];
      
      if (svgPath) {
        return (
          <div className="service-icon-content">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d={svgPath} />
            </svg>
          </div>
        );
      }
    }
    
    // Emoji veya diğer formatlar için - inline style ile zorla
    return (
      <span 
        style={{
          fontSize: '3rem',
          fontFamily: 'Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          color: 'white',
          textShadow: '0 0 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.9)',
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))',
          WebkitTextStroke: '1px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 2
        }}
      >
        {icon}
      </span>
    );
  };
  
  const [currentStats, setCurrentStats] = useState({
    projects: 0,
    clients: 0,
    quality: 0,
    experience: 0
  });

  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  


  // Admin context'ten veri al
  const finalStats = adminData.hero.stats;

  // Admin context'ten hizmetleri al ve delay ekle
  const services: Service[] = adminData.services.map((service, index) => ({
    ...service,
    delay: (index + 1) * 0.1
  }));
  


  const techSkills: TechSkill[] = adminData.techSkills;

  const codeSnippets = [
    { 
      code: "const developer = 'MSK CODE';\n// Building amazing apps! 🚀",
      language: 'javascript'
    },
    { 
      code: "function createInnovation() {\n  return passion + skills + coffee;\n}",
      language: 'javascript'
    },
    { 
      code: "import React from 'react';\n\nconst App = () => {\n  return <Future />;\n};",
      language: 'jsx'
    },
    { 
      code: "class Developer:\n    def __init__(self):\n        self.skills = ['Python', 'React', 'AI']\n        self.passion = float('inf')",
      language: 'python'
    },
    { 
      code: "{\n  \"name\": \"MSK CODE\",\n  \"skills\": [\"Full-Stack\", \"AI\", \"Cloud\"],\n  \"status\": \"Available for projects\"\n}",
      language: 'json'
    },
    { 
      code: "SELECT * FROM developers \nWHERE passion = 'unlimited' \n  AND innovation > 9000;",
      language: 'sql'
    }
  ];

  // Animated counter effect - string değerleri sayıya çevirerek
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    const intervals = Object.keys(finalStats).map(key => {
      const finalValueStr = finalStats[key as keyof typeof finalStats];
      // String'den sayıyı çıkarma (50+ -> 50, 99% -> 99)
      const finalValue = parseInt(finalValueStr.replace(/[^0-9]/g, '')) || 0;
      const step = finalValue / steps;
      let current = 0;

      return setInterval(() => {
        current += step;
        if (current >= finalValue) {
          current = finalValue;
        }
        
        setCurrentStats(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));

        if (current >= finalValue) {
          clearInterval(intervals.find(interval => interval === interval));
        }
      }, stepTime);
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [finalStats]);

  // Component mount olduğunda animasyonu başlat
  useEffect(() => {
    // İlk kod snippet'ini başlat
    setDisplayedCode('');
    setCurrentCodeIndex(0);
    setCharIndex(0);
    setIsTyping(true);
  }, []);



  // Live Code Typing Animation
  useEffect(() => {
    const interval = setInterval(() => {
      const currentSnippet = codeSnippets[currentCodeIndex];
      
      if (isTyping) {
        if (charIndex < currentSnippet.code.length) {
          setDisplayedCode(currentSnippet.code.slice(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsTyping(false), 2000);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(prev => prev - 1);
          setDisplayedCode(currentSnippet.code.slice(0, charIndex - 1));
        } else {
          // Move to next snippet
          setCurrentCodeIndex(prev => (prev + 1) % codeSnippets.length);
          setIsTyping(true);
        }
      }
    }, isTyping ? 100 : 50); // Typing speed: 100ms, Deleting speed: 50ms

    return () => clearInterval(interval);
  }, [charIndex, currentCodeIndex, isTyping]);

  // Scroll animasyonu için
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // WhatsApp butonu click handler
  const handleWhatsAppClick = () => {
    const phoneNumber = adminData.contact.whatsapp;
    const message = "Merhaba! Web sitenizden ulaşıyorum. Projemle ilgili bilgi almak istiyorum.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <PageSEO page="home" />
      <div className="home-container">
      {/* WhatsApp Floating Button */}
      <div className="whatsapp-float" onClick={handleWhatsAppClick}>
        <div className="whatsapp-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </div>
        <div className="whatsapp-tooltip">WhatsApp ile İletişim</div>
      </div>

      {/* Background Animation with Floating Code */}
      <div className="background-animation">
        <div className="floating-shapes">
          <div className="shape shape-1" style={{ transform: `translateY(${scrollY * 0.1}px)` }}></div>
          <div className="shape shape-2" style={{ transform: `translateY(${scrollY * 0.15}px)` }}></div>
          <div className="shape shape-3" style={{ transform: `translateY(${scrollY * 0.08}px)` }}></div>
          <div className="shape shape-4" style={{ transform: `translateY(${scrollY * 0.12}px)` }}></div>
          <div className="shape shape-5" style={{ transform: `translateY(${scrollY * 0.09}px)` }}></div>
          <div className="shape shape-6" style={{ transform: `translateY(${scrollY * 0.14}px)` }}></div>
          <div className="shape shape-7" style={{ transform: `translateY(${scrollY * 0.11}px)` }}></div>
          <div className="shape shape-8" style={{ transform: `translateY(${scrollY * 0.13}px)` }}></div>
        </div>
        
        <div className="floating-code">
          <div className="code-line code-1">{'const dev = new Developer();'}</div>
          <div className="code-line code-2">{'function build() { return app; }'}</div>
          <div className="code-line code-3">{"const tech = ['React', 'Node'];"}</div>
          <div className="code-line code-4">{'async deploy() => success;'}</div>
          <div className="code-line code-5">{"import { Quality } from 'best';"}</div>
          <div className="code-line code-6">{"const msk = { passion: true };"}</div>
          <div className="code-line code-7">{'while(learning) skills++;'}</div>
          <div className="code-line code-8">{'export default Innovation;'}</div>
          <div className="code-line code-9">{'const result = await client();'}</div>
          <div className="code-line code-10">{'if(challenge) solve();'}</div>
          <div className="code-line code-11">{'const portfolio = github.get();'}</div>
          <div className="code-line code-12">{'npm install @mskcode/app'}</div>
          <div className="code-line code-13">{'const api = new REST();'}</div>
          <div className="code-line code-14">{'docker run -p 3000:3000 app'}</div>
          <div className="code-line code-15">{'useEffect(() => magic(), []);'}</div>
          <div className="code-line code-16">{'git commit -m "feat: new"'}</div>
          <div className="code-line code-17">{'const db = mongoose.connect();'}</div>
          <div className="code-line code-18">{'export const config = edge;'}</div>
          <div className="code-line code-19">{'await fetch("/api/projects");'}</div>
          <div className="code-line code-20">{'const [state, setState] = use();'}</div>
        </div>
        
        <div className="background-text">
          <span>INNOVATION</span>
          <span>TECHNOLOGY</span>
          <span>SOLUTIONS</span>
          <span>FUTURE</span>
          <span>EXCELLENCE</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-card">
            <div className="live-code-container">
              <div className="code-window">
                <div className="window-header">
                  <div className="window-controls">
                    <span className="control close"></span>
                    <span className="control minimize"></span>
                    <span className="control maximize"></span>
                  </div>
                  <div className="window-title">
                    {codeSnippets[currentCodeIndex].language === 'javascript' && '📄 app.js'}
                    {codeSnippets[currentCodeIndex].language === 'jsx' && '⚛️ App.jsx'}
                    {codeSnippets[currentCodeIndex].language === 'python' && '🐍 developer.py'}
                    {codeSnippets[currentCodeIndex].language === 'json' && '📦 package.json'}
                    {codeSnippets[currentCodeIndex].language === 'sql' && '🗄️ query.sql'}
                  </div>
                </div>
                <div className="code-content">
                  <div className="line-numbers">
                    {displayedCode.split('\n').map((_, index) => (
                      <span key={index} className="line-number">{index + 1}</span>
                    ))}
                  </div>
                  <div className="code-text">
                    <pre>
                      <code className={`language-${codeSnippets[currentCodeIndex].language}`}>
                        {displayedCode}
                        <span className="typing-cursor">|</span>
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            
            <h1 className="hero-title">
              <span className="gradient-text">{adminData.hero.title}</span>
            </h1>
            
            <p className="hero-description">
              {adminData.hero.description}
            </p>

            <div className="stats-grid">
              <div className="stat-item" style={{ animationDelay: '0.6s' }}>
                <span className="stat-number">{currentStats.projects}+</span>
                <span className="stat-label">Tamamlanan Proje</span>
              </div>
              <div className="stat-item" style={{ animationDelay: '0.8s' }}>
                <span className="stat-number">{currentStats.clients}+</span>
                <span className="stat-label">Mutlu Müşteri</span>
              </div>
              <div className="stat-item" style={{ animationDelay: '1s' }}>
                <span className="stat-number">{currentStats.quality}%</span>
                <span className="stat-label">Kod Kalitesi</span>
              </div>
              <div className="stat-item" style={{ animationDelay: '1.2s' }}>
                <span className="stat-number">{currentStats.experience}+</span>
                <span className="stat-label">Yıl Deneyim</span>
              </div>
            </div>

            <div className="hero-buttons">
              <a 
                href={adminData.hero.buttons?.primary.url || '/references'} 
                className="btn btn-primary"
              >
                <span>{adminData.hero.buttons?.primary.text || 'Projelerimizi Keşfet'}</span>
                <span className="btn-icon">{adminData.hero.buttons?.primary.icon || '🚀'}</span>
              </a>
              <a 
                href={adminData.hero.buttons?.secondary.url || '/contact'} 
                className="btn btn-outline"
              >
                <span>{adminData.hero.buttons?.secondary.text || 'Hemen İletişime Geç'}</span>
                <span className="btn-icon">{adminData.hero.buttons?.secondary.icon || '💬'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">
        {/* Services Section */}
        <div className="services-section">
          <h2 className="section-title">Uzmanlık Alanlarımız</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card"
                style={{ 
                  animationDelay: `${service.delay}s`
                }}
              >
                <div className="service-header">
                  <div 
                    className="service-icon" 
                    style={{ 
                      background: `${service.gradient}, radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, transparent 70%)`,
                      position: 'relative'
                    }}
                  >
                    <div 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, transparent 60%)',
                        borderRadius: '20px'
                      }}
                    />
                    {renderServiceIcon(service.icon)}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                </div>
                
                <p className="service-description">{service.description}</p>
                
                <div className="service-features">
                  {service.features.filter(feature => typeof feature === 'string').map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
                
                <div className="service-glow" style={{ background: service.gradient }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="technology-section">
          <h2 className="section-title">Teknoloji Yetkinliklerimiz</h2>
          <div className="tech-grid">
            {techSkills.map((skill, index) => (
              <div key={skill.name} className="tech-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="tech-header">
                  <span className="tech-icon">{skill.icon}</span>
                  <span className="tech-name">{skill.name}</span>
                  <span className="tech-percentage">{skill.level}%</span>
                </div>
                <div className="tech-progress">
                  <div 
                    className="tech-progress-bar" 
                    style={{ 
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="metrics-section">
          <h2 className="section-title">Geliştirme Sürecimiz</h2>
          <div className="metrics-grid">
            {adminData.process.map((step, index) => (
              <div key={step.id} className="metric-card" style={{ animationDelay: `${index * 0.2}s` }}>
                <h3 className="metric-title">{step.icon} {step.title}</h3>
                <div className="metric-comparison">
                  <div className="step-number">{step.number}</div>
                  <div className="step-description">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-card">
            <h2 className="cta-title">{adminData.cta?.title || 'Projenizi Hayata Geçirelim!'}</h2>
            <p className="cta-description">
              {adminData.cta?.description || 'Modern teknolojiler ve güncel best practices ile projenizi en yüksek kalitede teslim etmeye odaklıyım.'}
            </p>
            
            <div className="cta-features">
              {(adminData.cta?.features || [
                "Modern Teknolojiler",
                "Yaratıcı Çözümler", 
                "Sürekli Gelişim"
              ]).filter(feature => typeof feature === 'string').map((feature, index) => (
                <div key={index} className="cta-feature">
                  <span className="cta-icon">✨</span>
                  <span className="cta-text">{feature}</span>
                </div>
              ))}
            </div>

            <div className="cta-buttons">
              <button 
                className="cta-btn primary" 
                onClick={() => window.location.href = adminData.cta?.buttons?.primary?.url || '/contact'}
              >
                <span>{adminData.cta?.buttons?.primary?.text || adminData.cta?.buttonText || 'Ücretsiz Konsültasyon'}</span>
                <span className="cta-btn-icon">{adminData.cta?.buttons?.primary?.icon || '→'}</span>
              </button>
              <button 
                className="cta-btn secondary" 
                onClick={() => window.location.href = adminData.cta?.buttons?.secondary?.url || '/references'}
              >
                <span>{adminData.cta?.buttons?.secondary?.text || 'Portfolio İncele'}</span>
                <span className="cta-btn-icon">{adminData.cta?.buttons?.secondary?.icon || '📋'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home; 