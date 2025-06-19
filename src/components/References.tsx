import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import PageSEO from './PageSEO';
import '../styles/References.css';

interface Reference {
  id: number;
  title: string;
  client: string;
  industry: string;
  description: string;
  image: string;
  logo?: string;
  technologies: string[];
  metrics?: {
    before?: string;
    after?: string;
    improvement?: string;
  };
  testimonials?: Array<{
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
  }>;
  duration?: number;
  status?: string;
  category?: string;
  gradient?: string;
  color?: string;
  liveUrl?: string;
  githubUrl?: string;
}

const References: React.FC = () => {
  const { adminData } = useAdmin();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  // Admin context'ten kategorileri al
  const categories = adminData.projectCategories || ['Tümü', 'E-Ticaret', 'Kurumsal', 'Mobil', 'SaaS', 'Fintech', 'Eğitim'];

  // Admin context'ten referansları al
  const references: Reference[] = (adminData.references || []) as Reference[];

  const filteredReferences = selectedCategory === 'Tümü' 
    ? references 
    : references.filter(ref => ref.category === selectedCategory);

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying || filteredReferences.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredReferences.length);
    }, 5000); // 5 saniyede bir değiş

    return () => clearInterval(interval);
  }, [filteredReferences.length, isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredReferences.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredReferences.length) % filteredReferences.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const totalProjects = references.length;
  const successRate = Math.round((references.filter(ref => ref.status === 'Tamamlandı').length / totalProjects) * 100);
  const avgImprovement = 245; // Average improvement percentage across all metrics

  return (
    <>
      <PageSEO page="references" />
      <div className="references-container">
        {/* Background Animation */}
        <div className="background-animation">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
            <div className="shape shape-6"></div>
            <div className="shape shape-7"></div>
            <div className="shape shape-8"></div>
          </div>
          
          <div className="background-text">
            <span>SUCCESS</span>
            <span>REFERANSLAR</span>
            <span>PROJECTS</span>
            <span>RESULTS</span>
            <span>CLIENTS</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="references-hero">
          <h1 className="references-title">
            <span className="gradient-text">{adminData.referencesHero?.title || "Başarı Hikayelerimiz"}</span>
          </h1>
          <div className="hero-subtitle">
            <p>{adminData.referencesHero?.subtitle || "Müşterilerimize sunduğumuz çözümler ve elde edilen sonuçlar"}</p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{totalProjects}+</span>
                <span className="stat-label">Başarılı Proje</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{successRate}%</span>
                <span className="stat-label">Başarı Oranı</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{avgImprovement}%</span>
                <span className="stat-label">Ortalama İyileştirme</span>
              </div>
            </div>
          </div>
        </div>

        <div className="references-main-content">
          {/* Category Filter */}
          <div className="filter-section">
            <h2 className="section-title">Proje Kategorileri</h2>
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* References Slider */}
          <div className="references-section">
            <div className="slider-header">
              <h2 className="section-title">Proje Detayları</h2>
              <div className="slider-controls">
                <button 
                  className="slider-control-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? 'Otomatik geçişi durdur' : 'Otomatik geçişi başlat'}
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <button className="slider-control-btn" onClick={prevSlide}>
                  ⬅️
                </button>
                <button className="slider-control-btn" onClick={nextSlide}>
                  ➡️
                </button>
              </div>
            </div>

            <div className="references-slider">
              <div 
                className="slider-track"
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
                {filteredReferences.map((reference, index) => (
                  <div
                    key={reference.id}
                    className={`neuromorphic-card reference-card slider-item ${
                      index === currentSlide ? 'active' : ''
                    }`}
                    style={{ 
                      background: reference.color || reference.gradient || '#667eea',
                    }}
                  >
                    {/* Card Header */}
                    <div className="card-header">
                      <div className="project-image">
                        <div 
                          className="image-placeholder" 
                          style={{ background: reference.color || reference.gradient || '#667eea' }}
                        >
                          {reference.logo ? (
                            <img 
                              src={reference.logo} 
                              alt={`${reference.client} logo`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: '8px'
                              }}
                            />
                          ) : '📊'}
                        </div>
                        <div className="status-badge" data-status={reference.status?.toLowerCase()}>
                          {reference.status}
                        </div>
                      </div>
                      <div className="project-info">
                        <h3 className="project-title">{reference.title}</h3>
                        <p className="client-name">{reference.client}</p>
                        <span className="industry-tag">{reference.industry}</span>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div className="project-description">
                      <p>{reference.description}</p>
                    </div>

                    {/* Metrics */}
                    <div className="metrics-section">
                      <h4 className="metrics-title">📈 Sonuçlar</h4>
                      <div className="metrics-grid">
                        {reference.metrics && (
                          <>
                            <div className="metric-item">
                              <div className="metric-comparison">
                                <div className="before-after">
                                  <span className="before">Önce: {reference.metrics.before}</span>
                                  <span className="after">Sonra: {reference.metrics.after}</span>
                                </div>
                                <div className="improvement">{reference.metrics.improvement}</div>
                              </div>
                              <span className="metric-label">{reference.metrics.before}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="tech-section">
                      <h4 className="tech-title">🛠️ Teknolojiler</h4>
                      <div className="tech-stack">
                        {reference.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    {reference.testimonials && reference.testimonials.length > 0 && (
                      <div className="testimonial-section">
                        <div className="testimonial-content">
                          <div className="quote-icon">💬</div>
                          <p className="testimonial-text">"{reference.testimonials[0].content}"</p>
                          <div className="testimonial-author">
                            <span className="author-name">{reference.testimonials[0].name}</span>
                            <span className="author-position">{reference.testimonials[0].role}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Card Footer */}
                    <div className="card-footer">
                      <div className="project-duration">
                        <span className="duration-icon">⏱️</span>
                        <span>Süre: {reference.duration} ay</span>
                      </div>
                      <div className="project-category">
                        <span className="category-tag">{reference.category}</span>
                      </div>
                    </div>

                    {/* Project Links */}
                    {(reference.liveUrl || reference.githubUrl) && (
                      <div className="project-links">
                        {reference.liveUrl && (
                          <a 
                            href={reference.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="project-link demo-link"
                          >
                            <span className="link-icon">🚀</span>
                            <span>Canlı Demo</span>
                          </a>
                        )}
                        {reference.githubUrl && (
                          <a 
                            href={reference.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="project-link github-link"
                          >
                            <span className="link-icon">📂</span>
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    )}

                    <div className="card-glow" style={{ background: reference.color || reference.gradient || '#667eea' }}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Indicators */}
            <div className="slider-indicators">
              {filteredReferences.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* Slider Info */}
            <div className="slider-info">
              <span className="slide-counter">
                {currentSlide + 1} / {filteredReferences.length}
              </span>
              <span className="slide-title">
                {filteredReferences[currentSlide]?.title}
              </span>
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <div className="neuromorphic-card cta-card">
              <h2 className="cta-title">{adminData.cta?.referencesCta?.title || "Sizin de Başarı Hikayanizi Yazalım!"}</h2>
              <p className="cta-description">
                {adminData.cta?.referencesCta?.description || "Müşterilerimizin elde ettiği sonuçlar gibi, sizin de işinizi bir sonraki seviyeye taşıyalım. Ücretsiz danışmanlık için hemen iletişime geçin!"}
              </p>
              <div className="cta-features">
                {(adminData.cta?.referencesCta?.features || ["Hedef Odaklı Çözümler", "Ölçülebilir Sonuçlar", "Hızlı Teslimat"]).map((feature, index) => (
                  <div key={index} className="cta-feature">
                    <span className="cta-icon">✨</span>
                    <span className="cta-text">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="cta-buttons">
                <button 
                  className="cta-btn primary"
                  onClick={() => window.location.href = '/contact'}
                >
                  <span>{adminData.cta?.referencesCta?.buttonText || "Projenizi Başlatalım"}</span>
                  <span className="cta-btn-icon">→</span>
                </button>
                <button 
                  className="cta-btn secondary"
                  onClick={() => window.location.href = '/brands'}
                >
                  <span>Markalarımızı İncele</span>
                  <span className="cta-btn-icon">🏢</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default References; 