import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/Navbar';
import { AdminProvider } from './contexts/AdminContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './components/About';
import Services from './components/Services';
import Brands from './components/Brands';
import References from './components/References';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import NotFound from './pages/NotFound';

import SEOManager from './components/SEOManager';
import './App.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AdminProvider>
        <LanguageProvider>
          <Router>
            <div className="App">
              <SEOManager />
              <Routes>
                {/* Admin Panel Route - No Layout */}
                <Route path="/admin" element={
                  <ErrorBoundary fallback={
                    <div style={{
                      minHeight: '100vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#0a0a1a',
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      <div>
                        <h2>Admin Panel Hatası</h2>
                        <p>Admin paneli yüklenirken bir hata oluştu.</p>
                        <button onClick={() => window.location.href = '/'}>Ana Sayfaya Dön</button>
                      </div>
                    </div>
                  }>
                    <AdminPanel />
                  </ErrorBoundary>
                } />

                {/* Normal Routes with Layout */}
                <Route path="/" element={
                  <ErrorBoundary>
                    <Navbar />
                    <main>
                      <Home />
                    </main>
                    <Footer />
                  </ErrorBoundary>
                } />
                <Route path="/about" element={
                  <ErrorBoundary>
                    <Navbar />
                    <main>
                      <About />
                    </main>
                    <Footer />
                  </ErrorBoundary>
                } />
                <Route path="/services" element={
                  <ErrorBoundary>
                    <Navbar />
                    <main>
                      <Services />
                    </main>
                    <Footer />
                  </ErrorBoundary>
                } />
                <Route path="/brands" element={
                  <ErrorBoundary>
                    <Navbar />
                    <main>
                      <Brands />
                    </main>
                    <Footer />
                  </ErrorBoundary>
                } />
                <Route path="/references" element={
                  <ErrorBoundary>
                    <Navbar />
                    <main>
                      <References />
                    </main>
                    <Footer />
                  </ErrorBoundary>
                } />
                <Route path="/contact" element={
                  <ErrorBoundary>
                    <Navbar />
                    <main>
                      <Contact />
                    </main>
                    <Footer />
                  </ErrorBoundary>
                } />
                
                {/* 404 Route - Must be last */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </LanguageProvider>
      </AdminProvider>
    </ErrorBoundary>
  );
};

export default App;
 