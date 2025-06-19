import React from 'react';
import { useAdmin } from '../contexts/AdminContext';
import PageSEO from './PageSEO';
import '../styles/Services.css';

const Services: React.FC = () => {
  const { adminData } = useAdmin();
  
  // Get services from admin context
  const services = adminData.services || [];
  const workProcess = adminData.process || [];
  const techStack = adminData.techStack || {};

  return (
    <>
      <PageSEO page="services" />
      <div className="services-container">
        {/* Background Animation */}
        <div className="services-background-animation">
          <div className="services-floating-shapes">
            <div className="services-shape shape-1"></div>
            <div className="services-shape shape-2"></div>
            <div className="services-shape shape-3"></div>
            <div className="services-shape shape-4"></div>
            <div className="services-shape shape-5"></div>
          </div>
          
          {/* Background Text */}
          <div className="background-text">
            <span>SERVICES</span>
            <span>HİZMETLER</span>
            <span>SOLUTIONS</span>
            <span>ÇÖZÜMLER</span>
            <span>DEVELOPMENT</span>
          </div>
        </div>

        <div className="services-hero">
          <h1 className="services-title">
            <span className="gradient-text">{adminData.servicesHero?.title || 'Hizmetlerimiz'}</span>
          </h1>
          <div className="hero-subtitle">
            <p>{adminData.servicesHero?.subtitle || 'Teknoloji dünyasında size özel çözümler sunuyoruz'}</p>
          </div>
        </div>

        <div className="services-main-content">
          {/* Services Grid */}
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="neuromorphic-card service-card"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                {/* Card Header */}
                <div className="service-header">
                  <div className="service-icon-container">
                    <div 
                      className="service-icon"
                      style={{ background: service.gradient }}
                    >
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                </div>

                {/* Card Content */}
                <div className="service-content">
                  <p className="service-description">{service.description}</p>
                  
                  <div className="service-features">
                    <h4>Özellikler:</h4>
                    <div className="service-features">
                      {(service.features || []).map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="service-footer">
                  <button className="btn-service">
                    <span>Detaylar</span>
                    <div className="btn-icon">→</div>
                  </button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="card-overlay"></div>
              </div>
            ))}
          </div>

          {/* Process Section */}
          <div className="process-section">
            <h2 className="section-title">Çalışma Sürecimiz</h2>
            <div className="process-steps">
              {workProcess.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="neuromorphic-card process-step">
                    <div className="step-number">{step.number}</div>
                    <div className="step-icon">{step.icon}</div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {index < workProcess.length - 1 && (
                    <div className="process-arrow">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Technologies Section */}
          <div className="technologies-section">
            <h2 className="section-title">Kullandığımız Teknolojiler</h2>
            <div className="tech-grid">
              {Object.entries(techStack).map(([key, category]) => (
                <div key={key} className="neuromorphic-card tech-category">
                  <div className="tech-icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    {category.icon}
                  </div>
                  <h3>{category.title}</h3>
                  <div className="tech-items">
                    {(category.technologies || []).map((tech, index) => (
                      <span 
                        key={index}
                        className="tech-item"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services; 