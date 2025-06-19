import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import '../styles/Contact.css';
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import PageSEO from './PageSEO';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const { adminData, updateAdminData } = useAdmin();

  // Icon render fonksiyonu
  const renderIcon = (iconType: string, fallbackIcon: string) => {
    const iconStyle = { fontSize: '1.5rem', color: 'inherit' };
    
    switch (iconType.toLowerCase()) {
      case 'linkedin':
        return <FaLinkedin style={iconStyle} />;
      case 'github':
        return <FaGithub style={iconStyle} />;
      case 'instagram':
        return <FaInstagram style={iconStyle} />;
      case 'twitter':
        return <FaTwitter style={iconStyle} />;
      case 'whatsapp':
        return <FaWhatsapp style={iconStyle} />;
      case 'email':
        return <FaEnvelope style={iconStyle} />;
      case 'phone':
      case 'telefon':
        return <FaPhone style={iconStyle} />;
      case 'address':
      case 'adres':
        return <FaMapMarkerAlt style={iconStyle} />;
      default:
        return <span style={iconStyle}>{fallbackIcon}</span>;
    }
  };
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Temel iletişim bilgileri
  const baseContactInfo = [
    {
      id: 1,
      title: "Email",
      value: adminData.contact.email,
      icon: adminData.contact.icons?.email || "📧",
      link: `mailto:${adminData.contact.email}`,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      delay: 0.1
    },
    {
      id: 2,
      title: "Telefon",
      value: adminData.contact.phone,
      icon: adminData.contact.icons?.phone || "📞",
      link: `tel:${adminData.contact.phone.replace(/\s/g, '')}`,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      delay: 0.2
    },
    {
      id: 3,
      title: "Adres",
      value: adminData.contact.address,
      icon: adminData.contact.icons?.address || "📍",
      link: undefined,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      delay: 0.3
    },
    {
      id: 4,
      title: "WhatsApp",
      value: adminData.contact.whatsapp,
      icon: adminData.contact.icons?.whatsapp || "💬",
      link: `https://wa.me/${adminData.contact.whatsapp}`,
      gradient: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
      delay: 0.4
    }
  ];

  // Özel iletişim alanları
  const customContactInfo = adminData.contact.customFields?.map((field, index) => ({
    id: `custom-${field.id}`,
    title: field.label,
    value: field.value,
    icon: field.icon || (field.type === 'email' ? "📧" : 
          field.type === 'tel' ? "📞" : 
          field.type === 'url' ? "🌐" : "💬"),
    link: field.type === 'email' ? `mailto:${field.value}` :
          field.type === 'tel' ? `tel:${field.value.replace(/\s/g, '')}` :
          field.type === 'url' ? field.value : undefined,
    gradient: `linear-gradient(135deg, hsl(${(index + 5) * 60}, 70%, 60%) 0%, hsl(${(index + 5) * 60 + 30}, 70%, 50%) 100%)`,
    delay: 0.5 + (index * 0.1)
  })) || [];

  // Tüm iletişim bilgilerini birleştir
  const contactInfo = [...baseContactInfo, ...customContactInfo];

  // Sosyal medya bağlantıları - dinamik olarak oluştur
  const allSocialMediaOptions = [
    {
      name: "LinkedIn",
      url: adminData.contact.socialMedia.linkedin,
      icon: adminData.contact.socialMediaIcons?.linkedin || "💼",
      color: "#0077B5"
    },
    {
      name: "GitHub", 
      url: adminData.contact.socialMedia.github,
      icon: adminData.contact.socialMediaIcons?.github || "💻",
      color: "#333"
    },
    {
      name: "Instagram",
      url: adminData.contact.socialMedia.instagram,
      icon: adminData.contact.socialMediaIcons?.instagram || "📸",
      color: "#E4405F"
    },
    {
      name: "Twitter",
      url: (adminData.contact.socialMedia as any).twitter,
      icon: adminData.contact.socialMediaIcons?.twitter || "🐦",
      color: "#1DA1F2"
    }
  ];

  // Sadece dolu olan sosyal medya hesaplarını göster
  const socialLinks = allSocialMediaOptions.filter(social => 
    social.url && social.url.trim() !== '' && social.url !== '#'
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "İsim gereklidir";
    } else if (formData.name.length < 2) {
      newErrors.name = "İsim en az 2 karakter olmalıdır";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email gereklidir";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir email adresi giriniz";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Konu gereklidir";
    } else if (formData.subject.length < 5) {
      newErrors.subject = "Konu en az 5 karakter olmalıdır";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mesaj gereklidir";
    } else if (formData.message.length < 10) {
      newErrors.message = "Mesaj en az 10 karakter olmalıdır";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Başarılı gönderim simülasyonu
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new message object
      const newMessage = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
        status: 'new' as const
      };

      // Add to messages array
      const updatedMessages = [...(adminData.messages || []), newMessage];
      
      // Update admin data
      updateAdminData({
        ...adminData,
        messages: updatedMessages
      });

      setIsSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
              // Form submission error handled silently
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageSEO page="contact" />
      <div className="contact-container">
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
          </div>
          
          <div className="background-text">
            <span>CONTACT</span>
            <span>İLETİŞİM</span>
            <span>CONNECT</span>
            <span>COMMUNICATION</span>
            <span>REACH OUT</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="contact-hero">
          <h1 className="contact-title">
            <span className="gradient-text">{adminData.contactHero?.title || "İletişime Geçin"}</span>
          </h1>
          <div className="hero-subtitle">
            <p>{adminData.contactHero?.subtitle || "Projeleriniz için birlikte çalışalım"}</p>
            <div className="hero-features">
              {(adminData.contactHero?.features || ["24 Saat İçinde Yanıt", "Ücretsiz Danışmanlık", "Hızlı Çözümler"]).map((feature, index) => (
                <div key={index} className="feature-item">
                  <span className="feature-icon">✨</span>
                  <span className="feature-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-main-content">
          {/* Contact Info Cards */}
          <div className="contact-info-section">
            <h2 className="section-title">İletişim Bilgileri</h2>
            <div className="contact-info-grid">
              {contactInfo.map((info) => (
                <a 
                  key={info.id}
                  href={info.link}
                  className="neuromorphic-card contact-info-card"
                  style={{ animationDelay: `${info.delay}s` }}
                >
                  <div 
                    className="contact-icon"
                    style={{ background: info.gradient }}
                  >
                    {renderIcon(info.title.toLowerCase(), info.icon)}
                  </div>
                  <div className="contact-details">
                    <h3 className="contact-label">{info.title}</h3>
                    <p className="contact-value">{info.value}</p>
                  </div>
                  <div className="card-glow" style={{ background: info.gradient }}></div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2 className="section-title">Mesaj Gönder</h2>
            <div className="form-container">
              <form onSubmit={handleSubmit} className="neuromorphic-card contact-form">
                {isSubmitted && (
                  <div className="success-message">
                    <span className="success-icon">✅</span>
                    <span className="success-text">Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</span>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      İsim *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Adınız ve soyadınız"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="email@example.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Konu *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`form-input ${errors.subject ? 'error' : ''}`}
                    placeholder="Mesajınızın konusu"
                  />
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Proje detaylarınızı ve ihtiyaçlarınızı açıklayın..."
                    rows={6}
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <span>Mesaj Gönder</span>
                      <span className="btn-icon">✈️</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="social-media-section">
            <h2 className="section-title">Sosyal Medya</h2>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="social-icon">{renderIcon(social.name.toLowerCase(), social.icon)}</span>
                  <span className="social-name">{social.name}</span>
                  <div className="social-glow" style={{ backgroundColor: social.color }}></div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA Section - Now Dynamic */}
          <div className="cta-section">
            <div className="neuromorphic-card cta-card">
              <h2 className="cta-title">{adminData.contactCta?.title || "Projenizi Hayata Geçirelim!"}</h2>
              <p className="cta-description">
                {adminData.contactCta?.description || "Fikirlerinizi modern teknolojilerle buluşturalım. Size özel çözümler geliştirmek için sabırsızlanıyoruz."}
              </p>
              <div className="cta-features">
                {(adminData.contactCta?.features || [
                  { icon: "💡", text: "Ücretsiz Konseptual Tasarım" },
                  { icon: "📋", text: "Detaylı Proje Planlaması" },
                  { icon: "🔧", text: "Teknik Danışmanlık" }
                ]).map((feature, index) => (
                  <div key={index} className="cta-feature">
                    <span className="cta-icon">{feature.icon}</span>
                    <span className="cta-text">{feature.text}</span>
                  </div>
                ))}
              </div>
              <a href={adminData.contactCta?.buttonUrl || "mailto:info@mskod.com"} className="cta-btn">
                <span>{adminData.contactCta?.buttonText || "Hemen Başlayalım"}</span>
                <span className="cta-btn-icon">{adminData.contactCta?.buttonIcon || "🚀"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact; 