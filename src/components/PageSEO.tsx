import React from 'react';
import { useAdmin } from '../contexts/AdminContext';
import SEOManager from './SEOManager';

interface PageSEOProps {
  page: 'home' | 'about' | 'services' | 'brands' | 'references' | 'contact';
}

const PageSEO: React.FC<PageSEOProps> = ({ page }) => {
  const { adminData } = useAdmin();

  // Admin data'dan pagesSEO bilgilerini al, yoksa fallback kullan
  const pagesSEO = adminData.pagesSEO || {
    home: {
      title: "MSK CODE - Modern Web Geliştirme ve Yazılım Hizmetleri",
      description: "Modern web geliştirme, mobil uygulama ve AI çözümleri. React, Node.js, Python ile profesyonel yazılım hizmetleri. İstanbul'da en iyi yazılım firması.",
      keywords: ["web geliştirme", "react", "nodejs", "python", "yazılım", "istanbul", "mobil uygulama", "AI"],
      url: "https://mskcode.com/"
    },
    about: {
      title: "Hakkımızda - MSK CODE | Modern Web Teknolojileri",
      description: "MSK CODE ekibi hakkında bilgi alın. Deneyimli yazılım geliştiricileri ile modern web teknolojileri ve yaratıcı çözümler.",
      keywords: ["hakkımızda", "yazılım ekibi", "deneyim", "teknoloji", "MSK CODE"],
      url: "https://mskcode.com/about"
    },
    services: {
      title: "Hizmetlerimiz - Web Geliştirme, Mobil Uygulama | MSK CODE",
      description: "Web geliştirme, mobil uygulama, AI çözümleri, e-ticaret, cloud hizmetleri. Profesyonel yazılım geliştirme hizmetleri.",
      keywords: ["web geliştirme", "mobil uygulama", "AI çözümleri", "e-ticaret", "cloud", "hizmetler"],
      url: "https://mskcode.com/services"
    },
    brands: {
      title: "Markalar - İş Ortaklarımız | MSK CODE",
      description: "MSK CODE'un çalıştığı markalar ve iş ortakları. Güvenilir teknoloji çözümleri ile büyüyen markalar.",
      keywords: ["markalar", "iş ortakları", "referanslar", "güvenilir", "teknoloji"],
      url: "https://mskcode.com/brands"
    },
    references: {
      title: "Referanslar - Tamamlanan Projeler | MSK CODE",
      description: "MSK CODE tarafından tamamlanan başarılı projeler ve referanslar. Web siteleri, mobil uygulamalar ve yazılım çözümleri.",
      keywords: ["referanslar", "projeler", "portfolio", "başarılı", "web sitesi", "mobil uygulama"],
      url: "https://mskcode.com/references"
    },
    contact: {
      title: "İletişim - MSK CODE | Hemen Teklif Alın",
      description: "MSK CODE ile iletişime geçin. Projeleriniz için ücretsiz teklif alın. İstanbul merkezli profesyonel yazılım hizmetleri.",
      keywords: ["iletişim", "teklif", "proje", "danışmanlık", "istanbul", "yazılım"],
      url: "https://mskcode.com/contact"
    }
  };

  const currentSEO = pagesSEO[page];

  return (
    <SEOManager
      title={currentSEO.title}
      description={currentSEO.description}
      keywords={currentSEO.keywords}
      url={currentSEO.url}
      image="https://mskcode.com/mskod-logo.jpeg"
    />
  );
};

export default PageSEO; 