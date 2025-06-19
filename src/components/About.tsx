import React from 'react';
import { useAdmin } from '../contexts/AdminContext';
import PageSEO from './PageSEO';
import '../styles/About.css';

const About: React.FC = () => {
  const { adminData } = useAdmin();

  return (
    <>
      <PageSEO page="about" />
      <div className="about-container">
        {/* Background Animation */}
        <div className="about-background-animation">
          <div className="about-floating-shapes">
            <div className="about-shape shape-1"></div>
            <div className="about-shape shape-2"></div>
            <div className="about-shape shape-3"></div>
            <div className="about-shape shape-4"></div>
            <div className="about-shape shape-5"></div>
          </div>
          
          {/* Background Text */}
          <div className="background-text">
            <span>ABOUT</span>
            <span>HAKKIMIZDA</span>
            <span>TEAM</span>
            <span>EXPERIENCE</span>
            <span>VISION</span>
          </div>
        </div>

        <div className="about-hero">
          <h1 className="about-title">
            <span className="gradient-text">{adminData.about.title}</span>
          </h1>
          <p>{adminData.about.description}</p>
        </div>

        <div className="about-main-content">
          {/* Company Story Section */}
          <div className="story-section">
            <div className="neuromorphic-card story-card">
              <div className="card-header">
                <h2>Hikayemiz</h2>
              </div>
              <div className="story-content">
                <div className="about-story">
                  {adminData.about.story}
                </div>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="vision-mission">
              <div className="neuromorphic-card vision-card">
                <div className="icon-container">
                  <div className="vision-icon">👁️</div>
                </div>
                <h3>Vizyonumuz</h3>
                <p>{adminData.about.vision}</p>
              </div>

              <div className="neuromorphic-card mission-card">
                <div className="icon-container">
                  <div className="mission-icon">🎯</div>
                </div>
                <h3>Misyonumuz</h3>
                <p>{adminData.about.mission}</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <h2 className="section-title">Başarılarımız</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{adminData.hero.stats.experience}+</span>
                <span className="stat-label">Yıl Deneyim</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{adminData.hero.stats.projects}+</span>
                <span className="stat-label">Tamamlanan Proje</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{adminData.hero.stats.quality}%</span>
                <span className="stat-label">Kod Kalitesi</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{adminData.hero.stats.clients}+</span>
                <span className="stat-label">Mutlu Müşteri</span>
              </div>
            </div>
          </div>

          {/* Team Values Section */}
          <div className="values-section">
            <h2 className="section-title">Değerlerimiz</h2>
            <div className="values-grid">
              {adminData.about.values.map((value) => (
                <div key={value.id} className="neuromorphic-card value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About; 
