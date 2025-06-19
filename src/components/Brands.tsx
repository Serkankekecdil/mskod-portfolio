import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import PageSEO from './PageSEO';
import '../styles/Brands.css';

const Brands: React.FC = () => {
  const { adminData } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  // Markalar listesine eriş
  const brandsList = adminData.brands?.list || [];
  const categories = ['Tümü', ...(adminData.brandCategories || [])];

  // Filtreleme
  const filteredBrands = selectedCategory === 'Tümü' 
    ? brandsList
    : brandsList.filter((brand: any) => brand.category === selectedCategory);

  const totalProducts = brandsList.length;
  const activeProducts = brandsList.filter((brand: any) => brand.status === 'completed').length;

  return (
    <>
      <PageSEO page="brands" />
      <div className="brands-container">
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
            <span>BRANDS</span>
            <span>MARKALAR</span>
            <span>PARTNERS</span>
            <span>SUCCESS</span>
            <span>PROJECTS</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="brands-hero">
          <h1 className="brands-title">
            <span className="gradient-text">{adminData.brands?.title || "Güvenilir Markaların Tercihi"}</span>
          </h1>
          <div className="hero-subtitle">
            <p>{adminData.brands?.subtitle || "Dünya genelindeki başarılı markalarla güçlü iş birlikleri kuruyoruz"}</p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{totalProducts}+</span>
                <span className="stat-label">Başarılı Proje</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{activeProducts}</span>
                <span className="stat-label">Aktif Marka</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Müşteri Memnuniyeti</span>
              </div>
            </div>
          </div>
        </div>

        <div className="brands-main-content">
          {/* Category Filter */}
          <div className="filter-section">
            <h2 className="section-title">Marka Kategorileri</h2>
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

          {/* Brands Grid */}
          <div className="brands-section">
            <h2 className="section-title">Marka Portföyümüz</h2>
            <div className="brands-grid">
              {filteredBrands.map((brand: any, index: number) => (
                <div 
                  key={brand.id} 
                  className="neuromorphic-card brand-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Card Header */}
                  <div className="card-header">
                    <div className="brand-image">
                      <div 
                        className="image-placeholder" 
                        style={{ background: brand.gradient }}
                      >
                        {brand.logo ? (
                          <img 
                            src={brand.logo} 
                            alt={`${brand.name} logo`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              borderRadius: '8px'
                            }}
                          />
                        ) : '🏢'}
                      </div>
                      <div className="status-badge" data-status={brand.status}>
                        {brand.status === 'completed' ? '✅ Tamamlandı' : 
                         brand.status === 'in-progress' ? '🔄 Devam Ediyor' : 
                         '📋 Planlama'}
                      </div>
                    </div>
                    <div className="brand-info">
                      <h3 className="brand-name">{brand.name}</h3>
                      <p className="brand-category">{brand.category}</p>
                      <span className="launch-date">
                        {brand.launchDate ? `📅 ${new Date(brand.launchDate).getFullYear()}` : ''}
                      </span>
                    </div>
                  </div>

                  {/* Brand Description */}
                  <div className="brand-description">
                    <p>{brand.description}</p>
                  </div>

                  {/* Technologies */}
                  {brand.technologies && brand.technologies.length > 0 && (
                    <div className="tech-section">
                      <h4>🛠️ Teknolojiler</h4>
                      <div className="tech-stack">
                        {brand.technologies.map((tech: string, techIndex: number) => (
                          <span key={techIndex} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {brand.features && brand.features.length > 0 && (
                    <div className="features-section">
                      <h4>✨ Özellikler</h4>
                      <div className="features-list">
                        {brand.features.map((feature: string, featureIndex: number) => (
                          <span key={featureIndex} className="feature-tag">{feature}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metrics */}
                  {brand.metrics && (brand.metrics.previous || brand.metrics.current) && (
                    <div className="metrics-section">
                      <h4>📊 Performans Sonuçları</h4>
                      <div className="metrics-grid">
                        {brand.metrics.previous && (
                          <div className="metric-item before">
                            <div className="metric-label">Önceki</div>
                            <div className="metric-value">{brand.metrics.previous}</div>
                          </div>
                        )}
                        {brand.metrics.current && (
                          <div className="metric-item after">
                            <div className="metric-label">Güncel</div>
                            <div className="metric-value current">{brand.metrics.current}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Card Footer */}
                  <div className="card-footer">
                    {brand.links && (
                      <div className="brand-links">
                        {brand.links.website && (
                          <a href={brand.links.website} target="_blank" rel="noopener noreferrer" className="brand-link">
                            🌐 Website
                          </a>
                        )}
                        {brand.links.github && (
                          <a href={brand.links.github} target="_blank" rel="noopener noreferrer" className="brand-link">
                            💻 GitHub
                          </a>
                        )}
                        {brand.links.playstore && (
                          <a href={brand.links.playstore} target="_blank" rel="noopener noreferrer" className="brand-link">
                            📱 Play Store
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="card-overlay"></div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <div className="cta-content">
              <h2 className="cta-title">
                {adminData.brandsCta?.title || "Bir Sonraki Başarılı Marka Sizin Olabilir!"}
              </h2>
              <p className="cta-description">
                {adminData.brandsCta?.description || "Modern teknolojiler ve proven methodologies ile markanızı yeni seviyelere taşıyalım."}
              </p>
              
              {/* CTA Features */}
              {adminData.brandsCta?.features && adminData.brandsCta.features.length > 0 && (
                <div className="cta-features">
                  {adminData.brandsCta.features.map((feature, index) => (
                    <div key={index} className="cta-feature">
                      <span className="cta-icon">✨</span>
                      <span className="cta-text">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="cta-buttons">
                <button 
                  className="cta-btn primary"
                  onClick={() => window.location.href = '/contact'}
                >
                  <span>{adminData.brandsCta?.buttonText || "Ücretsiz Konsültasyon"}</span>
                  <span className="cta-btn-icon">→</span>
                </button>
                <button 
                  className="cta-btn secondary"
                  onClick={() => window.location.href = '/references'}
                >
                  <span>Portfolio İncele</span>
                  <span className="cta-btn-icon">📋</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brands; 