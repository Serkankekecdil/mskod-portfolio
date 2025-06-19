import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAdminData, updateAdminData as firebaseUpdateAdminData } from '../services/firestoreService';

interface AdminData {
  // Home Page Data
  hero: {
    title: string;
    subtitle: string;
    description: string;
    stats: {
      projects: string;
      clients: string;
      quality: string;
      experience: string;
    };
    statsDetails?: {
      experience?: {
        icon?: string;
        label?: string;
        description?: string;
      };
      projects?: {
        icon?: string;
        label?: string;
        description?: string;
      };
      quality?: {
        icon?: string;
        label?: string;
        description?: string;
      };
      clients?: {
        icon?: string;
        label?: string;
        description?: string;
      };
    };
    buttons?: {
      primary: {
        text: string;
        url: string;
        icon: string;
      };
      secondary: {
        text: string;
        url: string;
        icon: string;
      };
    };
  };
  services: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
    gradient: string;
    color?: string;
  }>;
  process: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
    number: string;
  }>;
  workProcess: Array<{
    id: number;
    step: number;
    title: string;
    description: string;
    icon: string;
  }>;
  techStack: {
    [key: string]: {
      title: string;
      icon: string;
      technologies: string[];
    };
  };
  // CTA Section
  cta: {
    title: string;
    description: string;
    buttonText: string;
    features?: string[];
    buttons?: {
      primary: {
        text: string;
        url: string;
        icon: string;
      };
      secondary: {
        text: string;
        url: string;
        icon: string;
      };
    };
    referencesCta?: {
      title: string;
      description: string;
      buttonText: string;
      features: string[];
    };
  };
  // Tech Skills
  techSkills: Array<{
    name: string;
    level: number;
    icon: string;
    color: string;
  }>;
  // Services Page Data
  servicesHero?: {
    title: string;
    subtitle: string;
  };
  // About Page Data
  about: {
    title: string;
    description: string;
    story: string;
    mission: string;
    vision: string;
    values: Array<{
      id: number;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  // Contact Data
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    icons?: {
      email: string;
      phone: string;
      whatsapp: string;
      address: string;
    };
    socialMedia: {
      linkedin: string;
      github: string;
      twitter: string;
      instagram: string;
    };
    socialMediaIcons?: {
      linkedin: string;
      github: string;
      twitter: string;
      instagram: string;
    };
    customFields?: Array<{
      id: number;
      label: string;
      value: string;
      type: 'text' | 'email' | 'tel' | 'url';
      icon?: string;
    }>;
  };
  // Contact Hero Section
  contactHero?: {
    title: string;
    subtitle: string;
    features: string[];
  };
  // Contact CTA Section
  contactCta?: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    buttonIcon: string;
    features: Array<{
      icon: string;
      text: string;
    }>;
  };
  // Messages from contact form
  messages?: Array<{
    id: number;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    timestamp: string;
    status: 'new' | 'read' | 'replied';
  }>;
  // Message filters and sorting
  messageFilter?: 'all' | 'new' | 'read' | 'replied';
  messageSortOrder?: 'newest' | 'oldest' | 'name';
  // References Data
  references: Array<{
    id: number;
    title: string;
    client: string;
    industry: string;
    image: string;
    logo?: string;
    description: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    category?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    duration?: number;
    metrics?: {
      before: string;
      after: string;
      improvement: string;
    };
    testimonials?: Array<{
      name: string;
      role: string;
      company: string;
      content: string;
      rating: number;
    }>;
    gradient?: string;
    color?: string;
  }>;
  // References Hero Section
  referencesHero?: {
    title: string;
    subtitle: string;
  };
  // Brands Data
  brands: {
    title?: string;
    subtitle?: string;
    list?: Array<{
      id: number;
      name: string;
      category: string;
      description: string;
      image: string;
      logo?: string;
      technologies: string[];
      metrics?: {
        previous: string;
        current: string;
      };
      testimonial?: {
        text: string;
        author: string;
        position: string;
      };
      features: string[];
      status: 'completed' | 'in-progress' | 'planning';
      launchDate: string;
      gradient: string;
      delay?: number;
      links?: {
        website?: string;
        github?: string;
        playstore?: string;
      };
    }>;
  };
  // Brands Hero Section
  brandsHero?: {
    title: string;
    subtitle: string;
  };
  // Brands Kategorileri
  brandCategories?: string[];
  // Brands CTA Section
  brandsCta?: {
    title?: string;
    description?: string;
    buttonText?: string;
    features?: string[];
  };
  // Proje Kategorileri  
  projectCategories?: string[];
  // Footer Yönetimi
  footer: {
    company: {
      name: string;
      description: string;
    };
    quickLinks: Array<{
      name: string;
      path: string;
    }>;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
    socialMedia: {
      linkedin: string;
      github: string;
      instagram: string;
      twitter: string;
    };
    copyright: string;
  };
  // SEO Ayarları
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    openGraph: {
      title: string;
      description: string;
      image: string;
      url: string;
    };
    twitterCard: {
      title: string;
      description: string;
      image: string;
    };
    googleAnalyticsId?: string;
    googleSearchConsoleId?: string;
  };
  // Sayfa Özel SEO Ayarları
  pagesSEO?: {
    home: {
      title: string;
      description: string;
      keywords: string[];
      url: string;
    };
    about: {
      title: string;
      description: string;
      keywords: string[];
      url: string;
    };
    services: {
      title: string;
      description: string;
      keywords: string[];
      url: string;
    };
    brands: {
      title: string;
      description: string;
      keywords: string[];
      url: string;
    };
    references: {
      title: string;
      description: string;
      keywords: string[];
      url: string;
    };
    contact: {
      title: string;
      description: string;
      keywords: string[];
      url: string;
    };
  };
}

const defaultAdminData: AdminData = {
  hero: {
    title: 'MSK CODE',
    subtitle: 'Modern web teknolojileri konusunda uzmanlaşan, kaliteli yazılım çözümleri geliştiren tutkulu genç yazılımcı. Her projede öğrenmeye ve gelişmeye odaklı.',
    description: 'Modern, responsive ve yüksek performanslı web uygulamaları. React, Next.js ve modern teknolojilerle.',
    stats: {
      projects: "5",
      clients: "3",
      quality: "98",
      experience: "2"
    },
    statsDetails: {
      experience: {
        icon: '📅',
        label: 'Yıllık Deneyim',
        description: 'Sektörde kazandığımız tecrübe'
      },
      projects: {
        icon: '🚀',
        label: 'Tamamlanan Proje',
        description: 'Başarıyla teslim edilen projeler'
      },
      quality: {
        icon: '😊',
        label: 'Kod Kalitesi',
        description: 'Yüksek kalite standartları'
      },
      clients: {
        icon: '⚡',
        label: 'Mutlu Müşteri',
        description: 'Memnun müşteri sayısı'
      }
    },
    buttons: {
      primary: {
        text: 'Projelerimizi Keşfet',
        url: '/references',
        icon: '🚀'
      },
      secondary: {
        text: 'Hemen İletişime Geç',
        url: '/contact',
        icon: '💬'
      }
    }
  },
  services: [
    {
      id: 1,
      title: "Web Development",
      description: "Modern, responsive ve yüksek performanslı web uygulamaları. React, Next.js ve modern teknolojilerle.",
      icon: "🌐",
      features: ["React/Next.js", "Responsive Design", "SEO Optimized", "High Performance"],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "Mobile Development",
      description: "Cross-platform mobil uygulamalar. iOS ve Android için React Native ile native performans.",
      icon: "📱",
      features: ["React Native", "Cross Platform", "Native Performance", "App Store Ready"],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "AI Solutions",
      description: "Yapay zeka destekli çözümler. Machine Learning, NLP ve automation sistemleri.",
      icon: "🤖",
      features: ["Machine Learning", "NLP Integration", "Automation", "Smart Analytics"],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      title: "Cloud Services",
      description: "Scalable cloud architecture. AWS, Docker, Kubernetes ile modern deployment.",
      icon: "☁️",
      features: ["AWS/Azure", "Docker", "Kubernetes", "Auto Scaling"],
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    }
  ],
  process: [
    {
      id: 1,
      title: "Project Planning",
      description: "Define project goals and objectives",
      icon: "📅",
      number: "1"
    },
    {
      id: 2,
      title: "Design",
      description: "Create visual representations of the project",
      icon: "🎨",
      number: "2"
    },
    {
      id: 3,
      title: "Development",
      description: "Implement the project based on the design",
      icon: "💻",
      number: "3"
    },
    {
      id: 4,
      title: "Testing",
      description: "Ensure the project meets the requirements",
      icon: "🔍",
      number: "4"
    },
    {
      id: 5,
      title: "Deployment",
      description: "Deploy the project to the production environment",
      icon: "🚀",
      number: "5"
    },
    {
      id: 6,
      title: "Maintenance",
      description: "Monitor and maintain the project",
      icon: "🔧",
      number: "6"
    }
  ],
  workProcess: [
    {
      id: 1,
      step: 1,
      title: "Requirement Gathering",
      description: "Gather and analyze project requirements",
      icon: "📋"
    },
    {
      id: 2,
      step: 2,
      title: "Design",
      description: "Create visual representations of the project",
      icon: "🎨"
    },
    {
      id: 3,
      step: 3,
      title: "Development",
      description: "Implement the project based on the design",
      icon: "💻"
    },
    {
      id: 4,
      step: 4,
      title: "Testing",
      description: "Ensure the project meets the requirements",
      icon: "🔍"
    },
    {
      id: 5,
      step: 5,
      title: "Deployment",
      description: "Deploy the project to the production environment",
      icon: "🚀"
    },
    {
      id: 6,
      step: 6,
      title: "Maintenance",
      description: "Monitor and maintain the project",
      icon: "🔧"
    }
  ],
  techStack: {
    "React/Next.js": {
      title: "React/Next.js",
      icon: "⚛️",
      technologies: ["React", "Next.js"]
    },
    "Node.js": {
      title: "Node.js",
      icon: "🟢",
      technologies: ["Node.js"]
    },
    "Python/AI": {
      title: "Python/AI",
      icon: "🐍",
      technologies: ["Python", "Machine Learning", "NLP"]
    },
    "Cloud/DevOps": {
      title: "Cloud/DevOps",
      icon: "☁️",
      technologies: ["AWS", "Azure", "Docker", "Kubernetes"]
    },
    "Mobile/React Native": {
      title: "Mobile/React Native",
      icon: "📱",
      technologies: ["React Native"]
    },
    "Database/MongoDB": {
      title: "Database/MongoDB",
      icon: "🍃",
      technologies: ["MongoDB"]
    }
  },
  cta: {
    title: "Let's Work Together",
    description: "We're here to help you achieve your goals",
    buttonText: "Get Started",
    features: ["Innovation", "Quality", "Customer Focus"],
    buttons: {
      primary: {
        text: 'Ücretsiz Konsültasyon',
        url: '/contact',
        icon: '→'
      },
      secondary: {
        text: 'Portfolio İncele',
        url: '/references',
        icon: '📋'
      }
    },
    referencesCta: {
      title: "References",
      description: "See our past projects",
      buttonText: "View References",
      features: ["Client Testimonials", "Industry Recognition"]
    }
  },
  techSkills: [
    { name: "React/Next.js", level: 85, icon: "⚛️", color: "#61DAFB" },
    { name: "Node.js", level: 80, icon: "🟢", color: "#68A063" },
    { name: "Python/AI", level: 75, icon: "🐍", color: "#306998" },
    { name: "Cloud/DevOps", level: 70, icon: "☁️", color: "#FF9900" },
    { name: "Mobile/React Native", level: 65, icon: "📱", color: "#61DAFB" },
    { name: "Database/MongoDB", level: 78, icon: "🍃", color: "#4DB33D" }
  ],
  servicesHero: {
    title: "Hizmetlerimiz",
    subtitle: "Teknoloji dünyasında size özel çözümler sunuyoruz"
  },
  about: {
    title: "Hakkımızda",
    description: "Teknoloji ile geleceği şekillendiriyoruz",
    story: "MSK CODE, 2019 yılında teknoloji tutkunu bir ekip tarafından kuruldu. İlk günden itibaren amacımız, işletmelerin dijital dönüşüm süreçlerinde güvenilir bir partner olmak ve müşterilerimize en kaliteli hizmeti sunmaktı. Yıllar boyunca küçük bir ekipten, alanında uzman profesyonellerden oluşan bir aileye dönüştük. Her projede müşteri memnuniyetini ön planda tutarak, sektörde saygın bir konuma ulaştık.",
    mission: "Müşterilerimizin ihtiyaçlarına özel, yenilikçi ve kaliteli yazılım çözümleri sunarak dijital dönüşümlerine destek olmak.",
    vision: "Teknoloji ile insanların hayatını kolaylaştıran, sürdürülebilir çözümler üreten lider bir yazılım şirketi olmak.",
    values: [
      {
        id: 1,
        title: "Innovation",
        description: "We are committed to innovation and pushing the boundaries of technology.",
        icon: "🌟"
      },
      {
        id: 2,
        title: "Quality",
        description: "We strive for excellence in everything we do.",
        icon: "🔥"
      },
      {
        id: 3,
        title: "Customer Focus",
        description: "We put our customers' needs first and strive to exceed their expectations.",
        icon: "🤝"
      },
      {
        id: 4,
        title: "Teamwork",
        description: "We believe in the power of teamwork and collaboration.",
        icon: "👥"
      }
    ]
  },
  contact: {
    email: "info@mskcode.com",
    phone: "+90 555 123 45 67",
    whatsapp: "905551234567",
    address: "İstanbul, Türkiye",
    icons: {
      email: "📧",
      phone: "📞",
      whatsapp: "💬",
      address: "📍"
    },
    socialMedia: {
      linkedin: "https://linkedin.com/in/mskod",
      github: "https://github.com/mskcode",
      twitter: "",
      instagram: "https://instagram.com/mskcode"
    },
    socialMediaIcons: {
      linkedin: "💼",
      github: "💻",
      twitter: "🐦",
      instagram: "📸"
    }
  },
  contactHero: {
    title: "İletişime Geçin",
    subtitle: "Projeleriniz için birlikte çalışalım",
    features: ["24 Saat İçinde Yanıt", "Ücretsiz Danışmanlık", "Hızlı Çözümler"]
  },
  contactCta: {
    title: "Projenizi Hayata Geçirelim!",
    description: "Fikirlerinizi modern teknolojilerle buluşturalım. Size özel çözümler geliştirmek için sabırsızlanıyoruz.",
    buttonText: "Hemen Başlayalım",
    buttonUrl: "mailto:info@mskod.com",
    buttonIcon: "🚀",
    features: [
      {
        icon: "💡",
        text: "Ücretsiz Konseptual Tasarım"
      },
      {
        icon: "📋",
        text: "Detaylı Proje Planlaması"
      },
      {
        icon: "🔧",
        text: "Teknik Danışmanlık"
      }
    ]
  },
  messages: [],
  references: [
    {
      id: 1,
      title: "E-Ticaret Platformu",
      client: "TechStore",
      industry: "E-Ticaret",
      image: "/images/ecommerce-project.jpg",
      description: "Modern ve kullanıcı dostu e-ticaret platformu. React, Node.js ve MongoDB ile geliştirildi.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://demo-ecommerce.mskcode.com",
      githubUrl: "https://github.com/mskcode/ecommerce-platform"
    },
    {
      id: 2,
      title: "Kurumsal Web Sitesi",
      client: "InnovateTech",
      industry: "Teknoloji",
      image: "/images/corporate-website.jpg",
      description: "Kurumsal kimliği yansıtan modern web sitesi. SEO optimizasyonu ve yüksek performans.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://demo-corporate.mskcode.com",
      githubUrl: "https://github.com/mskcode/corporate-website"
    },
    {
      id: 3,
      title: "Mobil Uygulama",
      client: "HealthTracker",
      industry: "Sağlık",
      image: "/images/mobile-app.jpg",
      description: "Sağlık takip uygulaması. React Native ile iOS ve Android platformları için geliştirildi.",
      technologies: ["React Native", "Firebase", "Redux"],
      liveUrl: "https://demo-mobile.mskcode.com",
      githubUrl: "https://github.com/mskcode/health-tracker-app"
    }
  ],
  referencesHero: {
    title: "Our Clients Speak",
    subtitle: "Hear from our satisfied clients"
  },
  brands: {
    title: "Our Clients",
    subtitle: "Trusted by leading companies",
    list: [
      {
        id: 1,
        name: "TechCorp",
        category: "Technology",
        description: "Teknoloji çözümleri şirketi",
        image: "/images/brands/techcorp.png",
        technologies: ["React", "Node.js", "MongoDB"],
        metrics: {
          previous: "10%",
          current: "20%"
        },
        testimonial: {
          text: "MSK CODE has been a great partner for us. Their team is highly skilled and always delivers on time.",
          author: "John Doe",
          position: "CEO at TechCorp"
        },
        features: ["React", "Node.js", "MongoDB"],
        status: "completed",
        launchDate: "2022-01-01",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        links: {
          website: "https://techcorp.com"
        }
      },
      {
        id: 2,
        name: "StartupHub",
        category: "Startup",
        description: "Girişim inkübatörü",
        image: "/images/brands/startuphub.png",
        technologies: ["React", "Node.js"],
        metrics: {
          previous: "5%",
          current: "10%"
        },
        testimonial: {
          text: "MSK CODE helped us launch our startup. Their team was very supportive and their services were top-notch.",
          author: "Jane Smith",
          position: "Founder at StartupHub"
        },
        features: ["React", "Node.js"],
        status: "completed",
        launchDate: "2021-05-15",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        links: {
          website: "https://startuphub.com"
        }
      },
      {
        id: 3,
        name: "DigitalAgency",
        category: "Digital Marketing",
        description: "Dijital pazarlama ajansı",
        image: "/images/brands/digitalagency.png",
        technologies: ["React", "Node.js"],
        metrics: {
          previous: "5%",
          current: "10%"
        },
        testimonial: {
          text: "MSK CODE has helped us grow our business. Their team is very professional and their services are excellent.",
          author: "Michael Brown",
          position: "CEO at DigitalAgency"
        },
        features: ["React", "Node.js"],
        status: "completed",
        launchDate: "2020-09-01",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        links: {
          website: "https://digitalagency.com"
        }
      }
    ]
  },
  brandsHero: {
    title: "Our Clients",
    subtitle: "Trusted by leading companies"
  },
  brandCategories: ["Technology", "Startup", "Digital Marketing"],
  brandsCta: {
    title: "Let's Work Together",
    description: "We're here to help you achieve your goals",
    buttonText: "Get Started",
    features: ["Innovation", "Quality", "Customer Focus"]
  },
  projectCategories: ["Web Development", "Mobile Development", "AI Solutions", "Cloud Services"],
  footer: {
    company: {
      name: "MSK CODE",
      description: "Modern web teknolojileri konusunda uzmanlaşan, kaliteli yazılım çözümleri geliştiren tutkulu genç yazılımcı."
    },
    quickLinks: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" }
    ],
    contact: {
      email: "info@mskcode.com",
      phone: "+90 555 123 45 67",
      address: "İstanbul, Türkiye"
    },
    socialMedia: {
      linkedin: "https://linkedin.com/in/mskod",
      github: "https://github.com/mskcode",
      instagram: "https://instagram.com/mskcode",
      twitter: ""
    },
    copyright: "© 2023 MSK CODE. All rights reserved."
  },
  seo: {
    metaTitle: "MSK CODE - Modern Web Development Solutions",
    metaDescription: "MSK CODE provides modern web development solutions. We specialize in React, Next.js, and modern technologies.",
    keywords: ["MSK CODE", "Modern Web Development", "React", "Next.js", "Web Development", "Technology"],
    openGraph: {
      title: "MSK CODE - Modern Web Development Solutions",
      description: "MSK CODE provides modern web development solutions. We specialize in React, Next.js, and modern technologies.",
      image: "/images/open-graph.jpg",
      url: "https://mskcode.com"
    },
    twitterCard: {
      title: "MSK CODE - Modern Web Development Solutions",
      description: "MSK CODE provides modern web development solutions. We specialize in React, Next.js, and modern technologies.",
      image: "/images/twitter-card.jpg"
    },
    googleAnalyticsId: "G-XXXXXXXXXX",
    googleSearchConsoleId: "XXXXXXXXXX"
  },
  pagesSEO: {
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
  }
};

interface AdminContextType {
  adminData: AdminData;
  updateAdminData: (data: AdminData) => Promise<void>;
  resetToDefaults: () => void;
  loading?: boolean;
  error?: string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [adminData, setAdminData] = useState<AdminData>(defaultAdminData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        setLoading(true);
        
        // Önce localStorage'dan veri yüklemeye çalış
        const localData = localStorage.getItem('adminData');
        if (localData) {
          try {
            const parsedData = JSON.parse(localData);
            setAdminData(parsedData);
          } catch {
            console.warn('localStorage verisi bozuk, temizleniyor');
            localStorage.removeItem('adminData');
          }
        }
        
        // Firebase'den veri yüklemeye çalış
        const firebaseData = await getAdminData();
        
        if (firebaseData) {
          // Firebase verisi ile default veriyi birleştir (eksik alanları tamamla)
          const mergedData = {
            ...defaultAdminData,
            ...firebaseData,
            // Nested objeleri de birleştir
            contact: {
              ...defaultAdminData.contact,
              ...firebaseData.contact
            },
            contactHero: {
              ...defaultAdminData.contactHero,
              ...firebaseData.contactHero
            },
            contactCta: {
              ...defaultAdminData.contactCta,
              ...firebaseData.contactCta
            },
            // Messages ve filter alanlarını Firebase'den al (varsa)
            messages: firebaseData.messages || [],
            messageFilter: firebaseData.messageFilter || 'all',
            messageSortOrder: firebaseData.messageSortOrder || 'newest'
          };
          
          setAdminData(mergedData);
          // Birleştirilmiş veriyi localStorage'a kaydet
          localStorage.setItem('adminData', JSON.stringify(mergedData));
        } else {
          setAdminData(defaultAdminData);
          localStorage.setItem('adminData', JSON.stringify(defaultAdminData));
        }
      } catch (error) {
        console.error('Error loading admin data:', error);
        // Hata durumunda default veriyi kullan
        setAdminData(defaultAdminData);
        localStorage.setItem('adminData', JSON.stringify(defaultAdminData));
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, []);

  const updateAdminData = async (data: AdminData) => {
    setLoading(true);
    try {
      // Önce local state'i güncelle (hızlı UI güncellemesi için)
      setAdminData(data);
      localStorage.setItem('adminData', JSON.stringify(data));
      
      // Firebase'e kaydet
      await firebaseUpdateAdminData(data);
      setError(null);
    } catch (_err) {
      console.error('Firebase kaydetme hatası:', _err);
      // Firebase hatası durumunda da local veriler korunur
      setError('Firebase kaydetme hatası - Veriler yerel olarak kaydedildi');
    } finally {
      setLoading(false);
    }
  };

  const resetToDefaults = () => {
    setLoading(true);
    try {
      setAdminData(defaultAdminData);
      localStorage.setItem('adminData', JSON.stringify(defaultAdminData));
      setError(null);
    } catch (_err) {
      console.error('Varsayılan değerlere sıfırlama hatası:', _err);
      setError('Varsayılan değerlere sıfırlama hatası');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider value={{ adminData, updateAdminData, resetToDefaults, loading, error }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
export type { AdminData }; 
 