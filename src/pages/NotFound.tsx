import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0f2e 25%, #2a1a3e 50%, #1a0f2e 75%, #0a0a1a 100%)',
      color: 'white',
      fontFamily: 'Inter, sans-serif',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.1,
        background: `
          radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 70%),
          radial-gradient(circle at 80% 70%, rgba(255, 107, 53, 0.1) 0%, transparent 70%)
        `,
        zIndex: 0
      }} />

      <div style={{
        textAlign: 'center',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '30px',
        padding: '4rem 3rem',
        maxWidth: '600px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
      }}>
        {/* 404 Number */}
        <div style={{
          fontSize: 'clamp(4rem, 15vw, 8rem)',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #E91E63 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
          textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
          letterSpacing: '0.1em'
        }}>
          404
        </div>

        {/* Emoji */}
        <div style={{ 
          fontSize: '3rem', 
          marginBottom: '1.5rem',
          animation: 'bounce 2s ease-in-out infinite'
        }}>🤔</div>

        {/* Title */}
        <h1 style={{ 
          fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #E91E63 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '700'
        }}>
          Sayfa Bulunamadı
        </h1>

        {/* Description */}
        <p style={{ 
          color: 'rgba(255,255,255,0.8)', 
          marginBottom: '2.5rem',
          lineHeight: '1.6',
          fontSize: '1.1rem'
        }}>
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
          Ana sayfaya dönerek aradığınızı bulabilirsiniz.
        </p>

        {/* Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          <Link
            to="/"
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #E91E63 100%)',
              border: 'none',
              borderRadius: '25px',
              color: 'white',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              fontSize: '1rem'
            }}
                         onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
               e.currentTarget.style.transform = 'translateY(-3px)';
               e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 215, 0, 0.4)';
             }}
             onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
               e.currentTarget.style.transform = 'translateY(0)';
               e.currentTarget.style.boxShadow = 'none';
             }}
          >
            🏠 Ana Sayfa
          </Link>

          <button
            onClick={() => window.history.back()}
            style={{
              padding: '1rem 2rem',
              background: 'transparent',
              border: '2px solid #FFD700',
              borderRadius: '25px',
              color: '#FFD700',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FFD700';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#FFD700';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ⬅️ Geri Dön
          </button>
        </div>

        {/* Popular Links */}
        <div style={{ marginTop: '2rem' }}>
          <p style={{ 
            color: 'rgba(255,255,255,0.6)', 
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            Popüler sayfalarımız:
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            {[
              { to: '/services', label: 'Hizmetler', icon: '⚡' },
              { to: '/references', label: 'Referanslar', icon: '🚀' },
              { to: '/contact', label: 'İletişim', icon: '📞' },
              { to: '/about', label: 'Hakkımızda', icon: '👥' }
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '15px',
                  background: 'rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
                                 onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                   e.currentTarget.style.background = 'rgba(255,215,0,0.1)';
                   e.currentTarget.style.color = '#FFD700';
                   e.currentTarget.style.transform = 'translateY(-2px)';
                 }}
                 onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                   e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                   e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                   e.currentTarget.style.transform = 'translateY(0)';
                 }}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation for bounce effect */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound; 