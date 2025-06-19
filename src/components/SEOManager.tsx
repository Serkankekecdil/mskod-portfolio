import React from 'react';
import { useAdmin } from '../contexts/AdminContext';

interface SEOManagerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

const SEOManager: React.FC<SEOManagerProps> = ({
  title,
  description,
  keywords,
  image,
  url
}) => {
  const { adminData } = useAdmin();
  
  React.useEffect(() => {
    try {
      // SEO verisini güvenli şekilde al, yoksa varsayılan değerleri kullan
      const seoData = adminData?.seo || {
        metaTitle: "MSK CODE - Modern Web Teknolojileri",
        metaDescription: "Modern web teknolojileri ile yaratıcı çözümler geliştiren yazılım şirketi.",
        keywords: ["web geliştirme", "react", "nodejs", "python", "yazılım"],
        openGraph: {
          title: "MSK CODE - Modern Web Teknolojileri",
          description: "Modern web teknolojileri ile yaratıcı çözümler geliştiren yazılım şirketi.",
          image: "/images/mskod-logo.jpeg",
          url: "https://mskcode.com"
        },
        twitterCard: {
          title: "MSK CODE - Modern Web Teknolojileri",
          description: "Modern web teknolojileri ile yaratıcı çözümler geliştiren yazılım şirketi.",
          image: "/images/mskod-logo.jpeg"
        },
        favicon: "/favicon.ico"
      };

      // Güvenli değer ataması
      const finalTitle = title || seoData?.metaTitle || "MSK CODE";
      const finalDescription = description || seoData?.metaDescription || "Modern web teknolojileri";
      const finalKeywords = keywords || seoData?.keywords || ["web geliştirme"];
      const finalImage = image || seoData?.openGraph?.image || "/images/mskod-logo.jpeg";
      const finalUrl = url || seoData?.openGraph?.url || "https://mskcode.com";

      // Title güncelleme
      if (finalTitle) {
        document.title = finalTitle;
      }
      
      // Meta description güncelleme
      try {
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', finalDescription);
      } catch (e) {
        console.warn('Meta description update failed:', e);
      }
      
      // Meta keywords güncelleme
      try {
        if (Array.isArray(finalKeywords) && finalKeywords.length > 0) {
          let metaKeywords = document.querySelector('meta[name="keywords"]');
          if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
          }
          metaKeywords.setAttribute('content', finalKeywords.join(', '));
        }
      } catch (e) {
        console.warn('Meta keywords update failed:', e);
      }
      
      // Open Graph etiketleri
      try {
        const ogTags = [
          { property: 'og:title', content: finalTitle },
          { property: 'og:description', content: finalDescription },
          { property: 'og:image', content: finalImage },
          { property: 'og:url', content: finalUrl },
          { property: 'og:type', content: 'website' },
          { property: 'og:site_name', content: seoData?.openGraph?.title || finalTitle }
        ];
        
        ogTags.forEach(tag => {
          if (tag.content) {
            let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
            if (!metaTag) {
              metaTag = document.createElement('meta');
              metaTag.setAttribute('property', tag.property);
              document.head.appendChild(metaTag);
            }
            metaTag.setAttribute('content', tag.content);
          }
        });
      } catch (e) {
        console.warn('Open Graph tags update failed:', e);
      }
      
      // Twitter Card etiketleri
      try {
        const twitterTags = [
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: seoData?.twitterCard?.title || finalTitle },
          { name: 'twitter:description', content: seoData?.twitterCard?.description || finalDescription },
          { name: 'twitter:image', content: seoData?.twitterCard?.image || finalImage }
        ];
        
        twitterTags.forEach(tag => {
          if (tag.content) {
            let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
            if (!metaTag) {
              metaTag = document.createElement('meta');
              metaTag.setAttribute('name', tag.name);
              document.head.appendChild(metaTag);
            }
            metaTag.setAttribute('content', tag.content);
          }
        });
      } catch (e) {
        console.warn('Twitter Card tags update failed:', e);
      }
      
      // Favicon güncelleme - sabit logo kullan
      try {
        const faviconUrl = "/logo.png"; // Sabit logo kullan
        let favicon = document.querySelector('link[rel="icon"]');
        if (!favicon) {
          favicon = document.createElement('link');
          favicon.setAttribute('rel', 'icon');
          document.head.appendChild(favicon);
        }
        favicon.setAttribute('href', faviconUrl);
      } catch (e) {
        console.warn('Favicon update failed:', e);
      }
      
      // Google Analytics - güvenli şekilde
      try {
        if (seoData?.googleAnalyticsId && typeof seoData.googleAnalyticsId === 'string' && seoData.googleAnalyticsId.trim()) {
          const gaId = seoData.googleAnalyticsId.trim();
          let gaScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`) as HTMLScriptElement;
          if (!gaScript) {
            gaScript = document.createElement('script') as HTMLScriptElement;
            gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
            gaScript.async = true;
            document.head.appendChild(gaScript);
            
            // GA4 konfigürasyon script'i
            const gaConfigScript = document.createElement('script') as HTMLScriptElement;
            gaConfigScript.innerHTML = `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `;
            document.head.appendChild(gaConfigScript);
          }
        }
      } catch (e) {
        console.warn('Google Analytics setup failed:', e);
      }
      
      // Google Search Console - güvenli şekilde
      try {
        if (seoData?.googleSearchConsoleId && typeof seoData.googleSearchConsoleId === 'string' && seoData.googleSearchConsoleId.trim()) {
          const searchConsoleId = seoData.googleSearchConsoleId.trim();
          let searchConsoleTag = document.querySelector(`meta[name="google-site-verification"]`);
          if (!searchConsoleTag) {
            searchConsoleTag = document.createElement('meta');
            searchConsoleTag.setAttribute('name', 'google-site-verification');
            document.head.appendChild(searchConsoleTag);
          }
          searchConsoleTag.setAttribute('content', searchConsoleId);
        }
      } catch (e) {
        console.warn('Google Search Console setup failed:', e);
      }

      // Structured Data (JSON-LD) - güvenli şekilde
      try {
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MSK CODE",
          "alternateName": "MSK CODE - Modern Web Teknolojileri",
          "url": finalUrl,
          "logo": finalImage,
          "description": finalDescription,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "TR",
            "addressLocality": "İstanbul"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["Turkish", "English"]
          },
          "sameAs": [
            "https://github.com/mskod",
            "https://linkedin.com/company/msk-code"
          ],
          "founder": {
            "@type": "Person",
            "name": "MSK CODE Team"
          },
          "foundingDate": "2020",
          "knowsAbout": [
            "Web Development",
            "Mobile App Development", 
            "React",
            "Node.js",
            "Python",
            "Artificial Intelligence",
            "Cloud Computing"
          ],
          "serviceType": [
            "Web Development",
            "Mobile Application Development",
            "AI Solutions",
            "Cloud Services",
            "E-commerce Development",
            "Software Consulting"
          ]
        };

        // Mevcut JSON-LD script'ini kaldır
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
          existingScript.remove();
        }

        // Yeni JSON-LD script'ini ekle
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      } catch (e) {
        console.warn('Structured Data setup failed:', e);
      }
      
    } catch (error) {
      console.error('SEOManager genel hatası:', error);
      // Hata durumunda en temel SEO ayarlarını yap
      try {
        document.title = title || "MSK CODE";
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description || "Modern web teknolojileri");
      } catch (fallbackError) {
        console.error('SEOManager fallback bile başarısız:', fallbackError);
      }
    }
  }, [title, description, keywords, image, url, adminData]);

  return null; // Bu component sadece SEO etiketlerini yönetir, render etmez
};

export default SEOManager; 