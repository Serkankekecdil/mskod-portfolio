import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary yakaladı:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0f2e 50%, #0a0a1a 100%)',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
          padding: '2rem'
        }}>
          <div style={{
            textAlign: 'center',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '3rem',
            maxWidth: '500px',
            width: '100%'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😅</div>
            <h1 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #E91E63 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Bir şeyler ters gitti
            </h1>
            <p style={{ 
              color: 'rgba(255,255,255,0.8)', 
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Üzgünüz, beklenmeyen bir hata oluştu. Sayfayı yenilemeyi deneyin veya ana sayfaya dönün.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.8rem 1.5rem',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #E91E63 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                🔄 Sayfayı Yenile
              </button>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  padding: '0.8rem 1.5rem',
                  background: 'transparent',
                  border: '2px solid #FFD700',
                  borderRadius: '25px',
                  color: '#FFD700',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FFD700';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#FFD700';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                🏠 Ana Sayfa
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                marginTop: '2rem', 
                textAlign: 'left',
                background: 'rgba(255,0,0,0.1)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,0,0,0.2)'
              }}>
                <summary style={{ cursor: 'pointer', color: '#ff6b6b' }}>
                  Geliştirici Detayları (sadece development'ta görünür)
                </summary>
                <pre style={{ 
                  fontSize: '0.8rem', 
                  color: '#ff9999',
                  marginTop: '1rem',
                  overflow: 'auto'
                }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 