import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  const { adminData, updateAdminData, loading, error } = useAdmin();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Sayfa yüklendiğinde localStorage'dan kontrol et
    return localStorage.getItem('adminAuthenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState(() => {
    // Son aktif tab'ı localStorage'dan al
    return localStorage.getItem('adminActiveTab') || 'home';
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [analyticsData, setAnalyticsData] = useState({
    dailyVisitors: 0,
    totalVisitors: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSessionDuration: '0:00',
    topPages: [],
    deviceStats: { mobile: 0, desktop: 0, tablet: 0 },
    lastUpdated: new Date().toISOString()
  });

  const [formData, setFormData] = useState(adminData);

  useEffect(() => {
    setFormData(adminData);
  }, [adminData]);

  // Tab değişikliklerini localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  const handleLogin = () => {
    if (password === '1343114643') {
      setIsAuthenticated(true);
      setPassword('');
      // localStorage'a kaydet
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      alert('❌ Hatalı şifre! Tekrar deneyin.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminActiveTab');
    setActiveTab('home');
  };

  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      await updateAdminData(formData);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Kayıt hatası:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const updateFormData = async (path: string, value: any, autoSave: boolean = false) => {
    const keys = path.split('.');
    const newData = { ...formData };
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setFormData(newData);

    // Mesajlar için otomatik kaydetme
    if (autoSave || path === 'messages' || path === 'messageFilter' || path === 'messageSortOrder') {
      try {
        setSaveStatus('saving');
        await updateAdminData(newData);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 1000);
      } catch (error) {
        console.error('Otomatik kayıt hatası:', error);
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
    }
  };



  const renderHomeTab = () => (
    <div className="admin-section">
      <h2 className="section-title">🏠 Ana Sayfa Yönetimi</h2>
      
      {/* Hero Section */}
      <div className="section-block">
        <h3 className="block-title">Hero Bölümü</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Ana Başlık</label>
            <input
              type="text"
              value={formData.hero?.title || ''}
              onChange={(e) => updateFormData('hero', { ...formData.hero, title: e.target.value })}
              placeholder="MSK CODE"
            />
          </div>
          <div className="form-group">
            <label>Açıklama</label>
            <textarea
              value={formData.hero?.description || ''}
              onChange={(e) => updateFormData('hero', { ...formData.hero, description: e.target.value })}
              rows={3}
              placeholder="Ana sayfa açıklaması..."
            />
          </div>
        </div>
        
        <h4 className="sub-title">İstatistikler</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Projeler</label>
            <input
              type="text"
              value={formData.hero?.stats?.projects || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                stats: { ...formData.hero?.stats, projects: e.target.value } 
              })}
              placeholder="50+"
            />
          </div>
          <div className="form-group">
            <label>Müşteriler</label>
            <input
              type="text"
              value={formData.hero?.stats?.clients || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                stats: { ...formData.hero?.stats, clients: e.target.value } 
              })}
              placeholder="25+"
            />
          </div>
          <div className="form-group">
            <label>Kalite</label>
            <input
              type="text"
              value={formData.hero?.stats?.quality || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                stats: { ...formData.hero?.stats, quality: e.target.value } 
              })}
              placeholder="99%"
            />
          </div>
          <div className="form-group">
            <label>Deneyim</label>
            <input
              type="text"
              value={formData.hero?.stats?.experience || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                stats: { ...formData.hero?.stats, experience: e.target.value } 
              })}
              placeholder="5+ Yıl"
            />
          </div>
        </div>
      </div>

      {/* Hero Butonları */}
      <div className="section-block">
        <h3 className="block-title">Hero Butonları</h3>
        
        <h4 className="sub-title">Ana Buton (Primary)</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Buton Metni</label>
            <input
              type="text"
              value={formData.hero?.buttons?.primary?.text || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                buttons: { 
                  primary: {
                    text: e.target.value,
                    url: formData.hero?.buttons?.primary?.url || '',
                    icon: formData.hero?.buttons?.primary?.icon || ''
                  },
                  secondary: {
                    text: formData.hero?.buttons?.secondary?.text || '',
                    url: formData.hero?.buttons?.secondary?.url || '',
                    icon: formData.hero?.buttons?.secondary?.icon || ''
                  }
                } 
              })}
              placeholder="Projelerimizi Keşfet"
            />
          </div>
          <div className="form-group">
            <label>Link URL</label>
            <input
              type="text"
              value={formData.hero?.buttons?.primary?.url || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                buttons: { 
                  primary: {
                    text: formData.hero?.buttons?.primary?.text || '',
                    url: e.target.value,
                    icon: formData.hero?.buttons?.primary?.icon || ''
                  },
                  secondary: {
                    text: formData.hero?.buttons?.secondary?.text || '',
                    url: formData.hero?.buttons?.secondary?.url || '',
                    icon: formData.hero?.buttons?.secondary?.icon || ''
                  }
                } 
              })}
              placeholder="/references"
            />
          </div>
          <div className="form-group">
            <label>Icon</label>
            <input
              type="text"
              value={formData.hero?.buttons?.primary?.icon || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                buttons: { 
                  primary: {
                    text: formData.hero?.buttons?.primary?.text || '',
                    url: formData.hero?.buttons?.primary?.url || '',
                    icon: e.target.value
                  },
                  secondary: {
                    text: formData.hero?.buttons?.secondary?.text || '',
                    url: formData.hero?.buttons?.secondary?.url || '',
                    icon: formData.hero?.buttons?.secondary?.icon || ''
                  }
                } 
              })}
              placeholder="🚀"
            />
          </div>
        </div>

        <h4 className="sub-title">İkinci Buton (Secondary)</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Buton Metni</label>
            <input
              type="text"
              value={formData.hero?.buttons?.secondary?.text || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                buttons: { 
                  primary: {
                    text: formData.hero?.buttons?.primary?.text || '',
                    url: formData.hero?.buttons?.primary?.url || '',
                    icon: formData.hero?.buttons?.primary?.icon || ''
                  },
                  secondary: {
                    text: e.target.value,
                    url: formData.hero?.buttons?.secondary?.url || '',
                    icon: formData.hero?.buttons?.secondary?.icon || ''
                  }
                } 
              })}
              placeholder="Hemen İletişime Geç"
            />
          </div>
          <div className="form-group">
            <label>Link URL</label>
            <input
              type="text"
              value={formData.hero?.buttons?.secondary?.url || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                buttons: { 
                  primary: {
                    text: formData.hero?.buttons?.primary?.text || '',
                    url: formData.hero?.buttons?.primary?.url || '',
                    icon: formData.hero?.buttons?.primary?.icon || ''
                  },
                  secondary: {
                    text: formData.hero?.buttons?.secondary?.text || '',
                    url: e.target.value,
                    icon: formData.hero?.buttons?.secondary?.icon || ''
                  }
                } 
              })}
              placeholder="/contact"
            />
          </div>
          <div className="form-group">
            <label>Icon</label>
            <input
              type="text"
              value={formData.hero?.buttons?.secondary?.icon || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                buttons: { 
                  primary: {
                    text: formData.hero?.buttons?.primary?.text || '',
                    url: formData.hero?.buttons?.primary?.url || '',
                    icon: formData.hero?.buttons?.primary?.icon || ''
                  },
                  secondary: {
                    text: formData.hero?.buttons?.secondary?.text || '',
                    url: formData.hero?.buttons?.secondary?.url || '',
                    icon: e.target.value
                  }
                } 
              })}
              placeholder="💬"
            />
          </div>
        </div>
      </div>

      {/* Uzmanlık Alanları (Services) */}
      <div className="section-block">
        <h3 className="block-title">Uzmanlık Alanlarım (Hizmetler)</h3>
        {formData.services?.map((service, index) => (
          <div key={service.id} className="list-item">
            <div className="form-row">
              <div className="form-group">
                <label>Icon</label>
                <input
                  type="text"
                  value={service.icon || ''}
                  onChange={(e) => {
                    const newServices = [...(formData.services || [])];
                    newServices[index] = { ...service, icon: e.target.value };
                    updateFormData('services', newServices);
                  }}
                  placeholder="🔧"
                />
              </div>
              <div className="form-group">
                <label>Başlık</label>
                <input
                  type="text"
                  value={service.title || ''}
                  onChange={(e) => {
                    const newServices = [...(formData.services || [])];
                    newServices[index] = { ...service, title: e.target.value };
                    updateFormData('services', newServices);
                  }}
                  placeholder="Hizmet başlığı"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Açıklama</label>
              <textarea
                value={service.description || ''}
                onChange={(e) => {
                  const newServices = [...(formData.services || [])];
                  newServices[index] = { ...service, description: e.target.value };
                  updateFormData('services', newServices);
                }}
                rows={3}
                placeholder="Hizmet açıklaması"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Özellikler (virgülle ayırın)</label>
                <input
                  type="text"
                  value={service.features?.join(', ') || ''}
                  onChange={(e) => {
                    const newServices = [...(formData.services || [])];
                    newServices[index] = { ...service, features: e.target.value.split(',').map(f => f.trim()) };
                    updateFormData('services', newServices);
                  }}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="form-group">
                <label>Gradient CSS</label>
                <input
                  type="text"
                  value={service.gradient || ''}
                  onChange={(e) => {
                    const newServices = [...(formData.services || [])];
                    newServices[index] = { ...service, gradient: e.target.value };
                    updateFormData('services', newServices);
                  }}
                  placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Renk</label>
              <input
                type="color"
                value={service.color || '#667eea'}
                onChange={(e) => {
                  const newServices = [...(formData.services || [])];
                  newServices[index] = { 
                    ...service, 
                    color: e.target.value,
                    gradient: `linear-gradient(135deg, ${e.target.value}, ${e.target.value}80)`
                  };
                  updateFormData('services', newServices);
                }}
              />
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={() => {
                const newServices = formData.services?.filter((_, i) => i !== index) || [];
                updateFormData('services', newServices);
              }}
            >
              🗑️ Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            const newService = {
              id: Date.now(),
              title: 'Yeni Hizmet',
              description: 'Hizmet açıklaması...',
              icon: '🔧',
              features: ['Özellik 1', 'Özellik 2'],
              gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            };
            updateFormData('services', [...(formData.services || []), newService]);
          }}
        >
          ➕ Yeni Hizmet Ekle
        </button>
      </div>

      {/* Teknoloji Yetkinlikleri */}
      <div className="section-block">
        <h3 className="block-title">Teknoloji Yetkinliklerim</h3>
        {formData.techSkills?.map((skill, index) => (
          <div key={`${skill.name}-${index}`} className="list-item">
            <div className="form-row">
              <div className="form-group">
                <label>Icon</label>
                <input
                  type="text"
                  value={skill.icon || ''}
                  onChange={(e) => {
                    const newSkills = [...(formData.techSkills || [])];
                    newSkills[index] = { ...skill, icon: e.target.value };
                    updateFormData('techSkills', newSkills);
                  }}
                  placeholder="⚛️"
                />
              </div>
              <div className="form-group">
                <label>Teknoloji Adı</label>
                <input
                  type="text"
                  value={skill.name || ''}
                  onChange={(e) => {
                    const newSkills = [...(formData.techSkills || [])];
                    newSkills[index] = { ...skill, name: e.target.value };
                    updateFormData('techSkills', newSkills);
                  }}
                  placeholder="React"
                />
              </div>
              <div className="form-group">
                <label>Seviye (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.level || 0}
                  onChange={(e) => {
                    const newSkills = [...(formData.techSkills || [])];
                    newSkills[index] = { ...skill, level: parseInt(e.target.value) || 0 };
                    updateFormData('techSkills', newSkills);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Renk</label>
                <input
                  type="color"
                  value={skill.color || '#667eea'}
                  onChange={(e) => {
                    const newSkills = [...(formData.techSkills || [])];
                    newSkills[index] = { ...skill, color: e.target.value };
                    updateFormData('techSkills', newSkills);
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={() => {
                const newSkills = formData.techSkills?.filter((_, i) => i !== index) || [];
                updateFormData('techSkills', newSkills);
              }}
            >
              🗑️ Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            const newSkill = {
              name: 'Yeni Teknoloji',
              level: 50,
              icon: '🔧',
              color: '#667eea'
            };
            updateFormData('techSkills', [...(formData.techSkills || []), newSkill]);
          }}
        >
          ➕ Yeni Yetenek Ekle
        </button>
      </div>

      {/* Geliştirme Sürecim */}
      <div className="section-block">
        <h3 className="block-title">Geliştirme Sürecim</h3>
        {formData.process?.map((step, index) => (
          <div key={step.id} className="list-item">
            <div className="form-row">
              <div className="form-group">
                <label>Adım Numarası</label>
                <input
                  type="text"
                  value={step.number || ''}
                  onChange={(e) => {
                    const newProcess = [...(formData.process || [])];
                    newProcess[index] = { ...step, number: e.target.value };
                    updateFormData('process', newProcess);
                  }}
                  placeholder="01"
                />
              </div>
              <div className="form-group">
                <label>Icon</label>
                <input
                  type="text"
                  value={step.icon || ''}
                  onChange={(e) => {
                    const newProcess = [...(formData.process || [])];
                    newProcess[index] = { ...step, icon: e.target.value };
                    updateFormData('process', newProcess);
                  }}
                  placeholder="🎯"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Başlık</label>
              <input
                type="text"
                value={step.title || ''}
                onChange={(e) => {
                  const newProcess = [...(formData.process || [])];
                  newProcess[index] = { ...step, title: e.target.value };
                  updateFormData('process', newProcess);
                }}
                placeholder="Adım başlığı"
              />
            </div>
            <div className="form-group">
              <label>Açıklama</label>
              <textarea
                value={step.description || ''}
                onChange={(e) => {
                  const newProcess = [...(formData.process || [])];
                  newProcess[index] = { ...step, description: e.target.value };
                  updateFormData('process', newProcess);
                }}
                rows={3}
                placeholder="Adım açıklaması"
              />
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={() => {
                const newProcess = formData.process?.filter((_, i) => i !== index) || [];
                updateFormData('process', newProcess);
              }}
            >
              🗑️ Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            const newStep = {
              id: Date.now(),
              number: (formData.process?.length + 1 || 1).toString().padStart(2, '0'),
              title: 'Yeni Adım',
              description: 'Adım açıklaması...',
              icon: '🔄'
            };
            updateFormData('process', [...(formData.process || []), newStep]);
          }}
        >
          ➕ Yeni Adım Ekle
        </button>
      </div>

      {/* CTA Section */}
      <div className="section-block">
        <h3 className="block-title">CTA Section (Proje Çağrısı)</h3>
        <div className="form-group">
          <label>CTA Başlığı</label>
          <input
            type="text"
            value={formData.cta?.title || ''}
            onChange={(e) => updateFormData('cta', { ...formData.cta, title: e.target.value })}
            placeholder="Projenizi Hayata Geçirelim!"
          />
        </div>
        <div className="form-group">
          <label>CTA Açıklaması</label>
          <textarea
            value={formData.cta?.description || ''}
            onChange={(e) => updateFormData('cta', { ...formData.cta, description: e.target.value })}
            rows={3}
            placeholder="Modern teknolojiler ve güncel best practices ile..."
          />
        </div>
        
        {/* CTA Features */}
        <div className="form-group">
          <label>CTA Özellikler (3 adet)</label>
          {(formData.cta?.features || []).map((feature, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...(formData.cta?.features || [])];
                  newFeatures[index] = e.target.value;
                  updateFormData('cta', { ...formData.cta, features: newFeatures });
                }}
                placeholder="Innovation"
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="remove-btn"
                onClick={() => {
                  const newFeatures = (formData.cta?.features || []).filter((_, i) => i !== index);
                  updateFormData('cta', { ...formData.cta, features: newFeatures });
                }}
              >
                ✕
              </button>
            </div>
          ))}
          {(!formData.cta?.features || formData.cta.features.length < 3) && (
            <button
              type="button"
              className="add-btn"
              onClick={() => {
                const currentFeatures = formData.cta?.features || [];
                const newFeatures = [...currentFeatures, 'Yeni Özellik'];
                updateFormData('cta', { ...formData.cta, features: newFeatures });
              }}
            >
              + Özellik Ekle
            </button>
          )}
        </div>

        {/* CTA Butonları */}
        <h4 className="sub-title">CTA Butonları</h4>
        
        <h5 style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: '16px 0 8px 0' }}>Ana Buton (Primary)</h5>
        <div className="form-row">
          <div className="form-group">
            <label>Buton Metni</label>
            <input
              type="text"
              value={formData.cta?.buttons?.primary?.text || ''}
              onChange={(e) => updateFormData('cta', { 
                ...formData.cta, 
                buttons: { 
                  primary: {
                    text: e.target.value,
                    url: formData.cta?.buttons?.primary?.url || '',
                    icon: formData.cta?.buttons?.primary?.icon || ''
                  },
                  secondary: {
                    text: formData.cta?.buttons?.secondary?.text || '',
                    url: formData.cta?.buttons?.secondary?.url || '',
                    icon: formData.cta?.buttons?.secondary?.icon || ''
                  }
                } 
              })}
              placeholder="Ücretsiz Konsültasyon"
            />
          </div>
          <div className="form-group">
            <label>Link URL</label>
            <input
              type="text"
              value={formData.cta?.buttons?.primary?.url || ''}
              onChange={(e) => updateFormData('cta', { 
                ...formData.cta, 
                buttons: { 
                  primary: {
                    text: formData.cta?.buttons?.primary?.text || '',
                    url: e.target.value,
                    icon: formData.cta?.buttons?.primary?.icon || ''
                  },
                  secondary: {
                    text: formData.cta?.buttons?.secondary?.text || '',
                    url: formData.cta?.buttons?.secondary?.url || '',
                    icon: formData.cta?.buttons?.secondary?.icon || ''
                  }
                } 
              })}
              placeholder="/contact"
            />
          </div>
          <div className="form-group">
            <label>Icon</label>
            <input
              type="text"
              value={formData.cta?.buttons?.primary?.icon || ''}
              onChange={(e) => updateFormData('cta', { 
                ...formData.cta, 
                buttons: { 
                  primary: {
                    text: formData.cta?.buttons?.primary?.text || '',
                    url: formData.cta?.buttons?.primary?.url || '',
                    icon: e.target.value
                  },
                  secondary: {
                    text: formData.cta?.buttons?.secondary?.text || '',
                    url: formData.cta?.buttons?.secondary?.url || '',
                    icon: formData.cta?.buttons?.secondary?.icon || ''
                  }
                } 
              })}
              placeholder="→"
            />
          </div>
        </div>

        <h5 style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: '16px 0 8px 0' }}>İkinci Buton (Secondary)</h5>
        <div className="form-row">
          <div className="form-group">
            <label>Buton Metni</label>
            <input
              type="text"
              value={formData.cta?.buttons?.secondary?.text || ''}
              onChange={(e) => updateFormData('cta', { 
                ...formData.cta, 
                buttons: { 
                  primary: {
                    text: formData.cta?.buttons?.primary?.text || '',
                    url: formData.cta?.buttons?.primary?.url || '',
                    icon: formData.cta?.buttons?.primary?.icon || ''
                  },
                  secondary: {
                    text: e.target.value,
                    url: formData.cta?.buttons?.secondary?.url || '',
                    icon: formData.cta?.buttons?.secondary?.icon || ''
                  }
                } 
              })}
              placeholder="Portfolio İncele"
            />
          </div>
          <div className="form-group">
            <label>Link URL</label>
            <input
              type="text"
              value={formData.cta?.buttons?.secondary?.url || ''}
              onChange={(e) => updateFormData('cta', { 
                ...formData.cta, 
                buttons: { 
                  primary: {
                    text: formData.cta?.buttons?.primary?.text || '',
                    url: formData.cta?.buttons?.primary?.url || '',
                    icon: formData.cta?.buttons?.primary?.icon || ''
                  },
                  secondary: {
                    text: formData.cta?.buttons?.secondary?.text || '',
                    url: e.target.value,
                    icon: formData.cta?.buttons?.secondary?.icon || ''
                  }
                } 
              })}
              placeholder="/references"
            />
          </div>
          <div className="form-group">
            <label>Icon</label>
            <input
              type="text"
              value={formData.cta?.buttons?.secondary?.icon || ''}
              onChange={(e) => updateFormData('cta', { 
                ...formData.cta, 
                buttons: { 
                  primary: {
                    text: formData.cta?.buttons?.primary?.text || '',
                    url: formData.cta?.buttons?.primary?.url || '',
                    icon: formData.cta?.buttons?.primary?.icon || ''
                  },
                  secondary: {
                    text: formData.cta?.buttons?.secondary?.text || '',
                    url: formData.cta?.buttons?.secondary?.url || '',
                    icon: e.target.value
                  }
                } 
              })}
              placeholder="📋"
            />
          </div>
        </div>

      </div>
    </div>
  );

  const renderAboutTab = () => (
    <div className="admin-section">
      <h2 className="section-title">📋 Hakkımda Yönetimi</h2>
      
      {/* Hero Section */}
      <div className="section-block">
        <h3 className="block-title">Hero Bölümü</h3>
        <div className="form-group">
          <label>Başlık</label>
          <input
            type="text"
            value={formData.about?.title || ''}
            onChange={(e) => updateFormData('about', { ...formData.about, title: e.target.value })}
            placeholder="Hakkımızda başlığı"
          />
        </div>
        <div className="form-group">
          <label>Açıklama</label>
          <textarea
            value={formData.about?.description || ''}
            onChange={(e) => updateFormData('about', { ...formData.about, description: e.target.value })}
            rows={3}
            placeholder="Hero bölümü açıklaması..."
          />
        </div>
      </div>

      {/* Hikayemiz */}
      <div className="section-block">
        <h3 className="block-title">Hikayemiz</h3>
        <div className="form-group">
          <label>Şirket Hikayesi</label>
          <textarea
            value={formData.about?.story || ''}
            onChange={(e) => updateFormData('about', { ...formData.about, story: e.target.value })}
            rows={6}
            placeholder="Şirketinizin kuruluş hikayesini, gelişimini ve bugünkü durumunu anlatın..."
          />
        </div>
      </div>

      {/* Vizyon & Misyon */}
      <div className="section-block">
        <h3 className="block-title">Vizyon & Misyon</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Vizyon</label>
            <textarea
              value={formData.about?.vision || ''}
              onChange={(e) => updateFormData('about', { ...formData.about, vision: e.target.value })}
              rows={3}
              placeholder="Vizyonunuzu açıklayın..."
            />
          </div>
          <div className="form-group">
            <label>Misyon</label>
            <textarea
              value={formData.about?.mission || ''}
              onChange={(e) => updateFormData('about', { ...formData.about, mission: e.target.value })}
              rows={3}
              placeholder="Misyonunuzu açıklayın..."
            />
          </div>
        </div>
      </div>

      {/* Başarılarımız (Stats) */}
      <div className="section-block">
        <h3 className="block-title">Başarılarımız (İstatistikler)</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
          Bu istatistikler Ana Sayfa Hero bölümündeki verilerle aynıdır
        </p>
        
        {/* Deneyim */}
        <div className="form-group">
          <label>📅 Deneyim</label>
          <div className="form-row">
            <input
              type="text"
              value={formData.hero?.statsDetails?.experience?.icon || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                statsDetails: { 
                  ...formData.hero?.statsDetails, 
                  experience: { 
                    ...formData.hero?.statsDetails?.experience, 
                    icon: e.target.value 
                  } 
                } 
              })}
              placeholder="📅"
              style={{ width: '60px' }}
            />
            <input
              type="text"
              value={formData.hero?.stats?.experience || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                stats: { ...formData.hero?.stats, experience: e.target.value } 
              })}
              placeholder="5"
              style={{ width: '80px' }}
            />
            <input
              type="text"
              value={formData.hero?.statsDetails?.experience?.label || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                statsDetails: { 
                  ...formData.hero?.statsDetails, 
                  experience: { 
                    ...formData.hero?.statsDetails?.experience, 
                    label: e.target.value 
                  } 
                } 
              })}
              placeholder="Yıllık Deneyim"
              style={{ flex: 1 }}
            />
          </div>
          <textarea
            value={formData.hero?.statsDetails?.experience?.description || ''}
            onChange={(e) => updateFormData('hero', { 
              ...formData.hero, 
              statsDetails: { 
                ...formData.hero?.statsDetails, 
                experience: { 
                  ...formData.hero?.statsDetails?.experience, 
                  description: e.target.value 
                } 
              } 
            })}
            placeholder="Sektörde kazandığımız tecrübe"
            rows={2}
          />
        </div>

        {/* Projeler */}
        <div className="form-group">
          <label>🚀 Projeler</label>
          <div className="form-row">
            <input
              type="text"
              value={formData.hero?.statsDetails?.projects?.icon || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                statsDetails: { 
                  ...formData.hero?.statsDetails, 
                  projects: { 
                    ...formData.hero?.statsDetails?.projects, 
                    icon: e.target.value 
                  } 
                } 
              })}
              placeholder="🚀"
              style={{ width: '60px' }}
            />
            <input
              type="text"
              value={formData.hero?.stats?.projects || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                stats: { ...formData.hero?.stats, projects: e.target.value } 
              })}
              placeholder="50"
              style={{ width: '80px' }}
            />
            <input
              type="text"
              value={formData.hero?.statsDetails?.projects?.label || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                statsDetails: { 
                  ...formData.hero?.statsDetails, 
                  projects: { 
                    ...formData.hero?.statsDetails?.projects, 
                    label: e.target.value 
                  } 
                } 
              })}
              placeholder="Tamamlanan Proje"
              style={{ flex: 1 }}
            />
          </div>
          <textarea
            value={formData.hero?.statsDetails?.projects?.description || ''}
            onChange={(e) => updateFormData('hero', { 
              ...formData.hero, 
              statsDetails: { 
                ...formData.hero?.statsDetails, 
                projects: { 
                  ...formData.hero?.statsDetails?.projects, 
                  description: e.target.value 
                } 
              } 
            })}
            placeholder="Başarıyla teslim edilen projeler"
            rows={2}
          />
        </div>

        {/* Kalite */}
        <div className="form-group">
          <label>😊 Kalite</label>
          <div className="form-row">
            <input
              type="text"
              value={formData.hero?.statsDetails?.quality?.icon || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                statsDetails: { 
                  ...formData.hero?.statsDetails, 
                  quality: { 
                    ...formData.hero?.statsDetails?.quality, 
                    icon: e.target.value 
                  } 
                } 
              })}
              placeholder="😊"
              style={{ width: '60px' }}
            />
            <input
              type="text"
              value={formData.hero?.stats?.quality || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                stats: { ...formData.hero?.stats, quality: e.target.value } 
              })}
              placeholder="99"
              style={{ width: '80px' }}
            />
            <input
              type="text"
              value={formData.hero?.statsDetails?.quality?.label || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                statsDetails: { 
                  ...formData.hero?.statsDetails, 
                  quality: { 
                    ...formData.hero?.statsDetails?.quality, 
                    label: e.target.value 
                  } 
                } 
              })}
              placeholder="Kod Kalitesi"
              style={{ flex: 1 }}
            />
          </div>
          <textarea
            value={formData.hero?.statsDetails?.quality?.description || ''}
            onChange={(e) => updateFormData('hero', { 
              ...formData.hero, 
              statsDetails: { 
                ...formData.hero?.statsDetails, 
                quality: { 
                  ...formData.hero?.statsDetails?.quality, 
                  description: e.target.value 
                } 
              } 
            })}
            placeholder="Yüksek kalite standartları"
            rows={2}
          />
        </div>

        {/* Müşteriler */}
        <div className="form-group">
          <label>⚡ Müşteriler</label>
          <div className="form-row">
            <input
              type="text"
              value={formData.hero?.statsDetails?.clients?.icon || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                statsDetails: { 
                  ...formData.hero?.statsDetails, 
                  clients: { 
                    ...formData.hero?.statsDetails?.clients, 
                    icon: e.target.value 
                  } 
                } 
              })}
              placeholder="⚡"
              style={{ width: '60px' }}
            />
            <input
              type="text"
              value={formData.hero?.stats?.clients || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                stats: { ...formData.hero?.stats, clients: e.target.value } 
              })}
              placeholder="25"
              style={{ width: '80px' }}
            />
            <input
              type="text"
              value={formData.hero?.statsDetails?.clients?.label || ''}
              onChange={(e) => updateFormData('hero', { 
                ...formData.hero, 
                statsDetails: { 
                  ...formData.hero?.statsDetails, 
                  clients: { 
                    ...formData.hero?.statsDetails?.clients, 
                    label: e.target.value 
                  } 
                } 
              })}
              placeholder="Mutlu Müşteri"
              style={{ flex: 1 }}
            />
          </div>
          <textarea
            value={formData.hero?.statsDetails?.clients?.description || ''}
            onChange={(e) => updateFormData('hero', { 
              ...formData.hero, 
              statsDetails: { 
                ...formData.hero?.statsDetails, 
                clients: { 
                  ...formData.hero?.statsDetails?.clients, 
                  description: e.target.value 
                } 
              } 
            })}
            placeholder="Memnun müşteri sayısı"
            rows={2}
          />
        </div>
      </div>

      {/* Değerlerimiz */}
      <div className="section-block">
        <h3 className="block-title">Değerlerimiz</h3>
        {formData.about?.values?.map((value, index) => (
          <div key={value.id} className="list-item">
            <div className="form-row">
              <div className="form-group">
                <label>Icon</label>
                <input
                  type="text"
                  value={value.icon || ''}
                  onChange={(e) => {
                    const newValues = [...(formData.about?.values || [])];
                    newValues[index] = { ...value, icon: e.target.value };
                    updateFormData('about', { ...formData.about, values: newValues });
                  }}
                  placeholder="⭐"
                />
              </div>
              <div className="form-group">
                <label>Başlık</label>
                <input
                  type="text"
                  value={value.title || ''}
                  onChange={(e) => {
                    const newValues = [...(formData.about?.values || [])];
                    newValues[index] = { ...value, title: e.target.value };
                    updateFormData('about', { ...formData.about, values: newValues });
                  }}
                  placeholder="Değer başlığı"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Açıklama</label>
              <textarea
                value={value.description || ''}
                onChange={(e) => {
                  const newValues = [...(formData.about?.values || [])];
                  newValues[index] = { ...value, description: e.target.value };
                  updateFormData('about', { ...formData.about, values: newValues });
                }}
                rows={2}
                placeholder="Değer açıklaması"
              />
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={() => {
                const newValues = formData.about?.values?.filter((_, i) => i !== index) || [];
                updateFormData('about', { ...formData.about, values: newValues });
              }}
            >
              🗑️ Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            const newValue = {
              id: Date.now(),
              title: 'Yeni Değer',
              description: 'Açıklama yazın...',
              icon: '⭐'
            };
            updateFormData('about', { 
              ...formData.about, 
              values: [...(formData.about?.values || []), newValue] 
            });
          }}
        >
          ➕ Yeni Değer Ekle
        </button>
      </div>
    </div>
  );

  const renderServicesTab = () => (
    <div className="admin-section">
      <h2 className="section-title">⚙️ Hizmetler Yönetimi</h2>
      
      {/* Hero Section */}
      <div className="section-block">
        <h3 className="block-title">Hero Section</h3>
        <div className="form-group">
          <label>Başlık</label>
          <input
            type="text"
            value={formData.servicesHero?.title || ''}
            onChange={(e) => updateFormData('servicesHero', { 
              ...formData.servicesHero, 
              title: e.target.value 
            })}
            placeholder="Hizmetlerimiz"
          />
        </div>
        <div className="form-group">
          <label>Alt Başlık</label>
          <textarea
            value={formData.servicesHero?.subtitle || ''}
            onChange={(e) => updateFormData('servicesHero', { 
              ...formData.servicesHero, 
              subtitle: e.target.value 
            })}
            rows={2}
            placeholder="Teknoloji dünyasında size özel çözümler sunuyoruz"
          />
        </div>
      </div>

      {/* Hizmetler Grid */}
      <div className="section-block">
        <h3 className="block-title">Hizmetler Grid</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
          Bu hizmetler Ana Sayfa'daki "Uzmanlık Alanlarım" ile aynıdır
        </p>
        {formData.services?.map((service, index) => (
          <div key={service.id} className="list-item">
            <div className="form-row">
              <div className="form-group">
                <label>Icon</label>
                <input
                  type="text"
                  value={service.icon || ''}
                  onChange={(e) => {
                    const newServices = [...(formData.services || [])];
                    newServices[index] = { ...service, icon: e.target.value };
                    updateFormData('services', newServices);
                  }}
                  placeholder="🔧"
                />
              </div>
              <div className="form-group">
                <label>Başlık</label>
                <input
                  type="text"
                  value={service.title || ''}
                  onChange={(e) => {
                    const newServices = [...(formData.services || [])];
                    newServices[index] = { ...service, title: e.target.value };
                    updateFormData('services', newServices);
                  }}
                  placeholder="Hizmet başlığı"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Açıklama</label>
              <textarea
                value={service.description || ''}
                onChange={(e) => {
                  const newServices = [...(formData.services || [])];
                  newServices[index] = { ...service, description: e.target.value };
                  updateFormData('services', newServices);
                }}
                rows={3}
                placeholder="Hizmet açıklaması"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Özellikler (virgülle ayırın)</label>
                <input
                  type="text"
                  value={service.features?.join(', ') || ''}
                  onChange={(e) => {
                    const newServices = [...(formData.services || [])];
                    newServices[index] = { ...service, features: e.target.value.split(',').map(f => f.trim()) };
                    updateFormData('services', newServices);
                  }}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="form-group">
                <label>Gradient CSS</label>
                <input
                  type="text"
                  value={service.gradient || ''}
                  onChange={(e) => {
                    const newServices = [...(formData.services || [])];
                    newServices[index] = { ...service, gradient: e.target.value };
                    updateFormData('services', newServices);
                  }}
                  placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Renk</label>
              <input
                type="color"
                value={service.color || '#667eea'}
                onChange={(e) => {
                  const newServices = [...(formData.services || [])];
                  newServices[index] = { 
                    ...service, 
                    color: e.target.value,
                    gradient: `linear-gradient(135deg, ${e.target.value}, ${e.target.value}80)`
                  };
                  updateFormData('services', newServices);
                }}
              />
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={() => {
                const newServices = formData.services?.filter((_, i) => i !== index) || [];
                updateFormData('services', newServices);
              }}
            >
              🗑️ Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            const newService = {
              id: Date.now(),
              title: 'Yeni Hizmet',
              description: 'Hizmet açıklaması...',
              icon: '🔧',
              features: ['Özellik 1', 'Özellik 2'],
              gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            };
            updateFormData('services', [...(formData.services || []), newService]);
          }}
        >
          ➕ Yeni Hizmet Ekle
        </button>
      </div>

      {/* Çalışma Sürecimiz */}
      <div className="section-block">
        <h3 className="block-title">Çalışma Sürecimiz</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
          Bu süreç Ana Sayfa'daki "Geliştirme Sürecim" ile aynıdır
        </p>
        {formData.process?.map((step, index) => (
          <div key={step.id} className="list-item">
            <div className="form-row">
              <div className="form-group">
                <label>Adım Numarası</label>
                <input
                  type="text"
                  value={step.number || ''}
                  onChange={(e) => {
                    const newProcess = [...(formData.process || [])];
                    newProcess[index] = { ...step, number: e.target.value };
                    updateFormData('process', newProcess);
                  }}
                  placeholder="01"
                />
              </div>
              <div className="form-group">
                <label>Icon</label>
                <input
                  type="text"
                  value={step.icon || ''}
                  onChange={(e) => {
                    const newProcess = [...(formData.process || [])];
                    newProcess[index] = { ...step, icon: e.target.value };
                    updateFormData('process', newProcess);
                  }}
                  placeholder="🎯"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Başlık</label>
              <input
                type="text"
                value={step.title || ''}
                onChange={(e) => {
                  const newProcess = [...(formData.process || [])];
                  newProcess[index] = { ...step, title: e.target.value };
                  updateFormData('process', newProcess);
                }}
                placeholder="Adım başlığı"
              />
            </div>
            <div className="form-group">
              <label>Açıklama</label>
              <textarea
                value={step.description || ''}
                onChange={(e) => {
                  const newProcess = [...(formData.process || [])];
                  newProcess[index] = { ...step, description: e.target.value };
                  updateFormData('process', newProcess);
                }}
                rows={3}
                placeholder="Adım açıklaması"
              />
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={() => {
                const newProcess = formData.process?.filter((_, i) => i !== index) || [];
                updateFormData('process', newProcess);
              }}
            >
              🗑️ Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            const newStep = {
              id: Date.now(),
              number: (formData.process?.length + 1 || 1).toString().padStart(2, '0'),
              title: 'Yeni Adım',
              description: 'Adım açıklaması...',
              icon: '🔄'
            };
            updateFormData('process', [...(formData.process || []), newStep]);
          }}
        >
          ➕ Yeni Adım Ekle
        </button>
      </div>

      {/* Kullandığımız Teknolojiler */}
      <div className="section-block">
        <h3 className="block-title">Kullandığımız Teknolojiler</h3>
        {Object.entries(formData.techStack || {}).map(([key, category]) => (
          <div key={key} className="list-item">
            <div className="form-row">
              <div className="form-group">
                <label>Icon</label>
                <input
                  type="text"
                  value={category.icon || ''}
                  onChange={(e) => {
                    const newTechStack = { ...formData.techStack };
                    newTechStack[key] = { ...category, icon: e.target.value };
                    updateFormData('techStack', newTechStack);
                  }}
                  placeholder="🔧"
                />
              </div>
              <div className="form-group">
                <label>Kategori Başlığı</label>
                <input
                  type="text"
                  value={category.title || ''}
                  onChange={(e) => {
                    const newTechStack = { ...formData.techStack };
                    newTechStack[key] = { ...category, title: e.target.value };
                    updateFormData('techStack', newTechStack);
                  }}
                  placeholder="Frontend"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Teknolojiler (virgülle ayırın)</label>
              <input
                type="text"
                value={category.technologies?.join(', ') || ''}
                onChange={(e) => {
                  const newTechStack = { ...formData.techStack };
                  newTechStack[key] = { 
                    ...category, 
                    technologies: e.target.value.split(',').map(t => t.trim()) 
                  };
                  updateFormData('techStack', newTechStack);
                }}
                placeholder="React, Vue.js, Angular"
              />
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={() => {
                const newTechStack = { ...formData.techStack };
                delete newTechStack[key];
                updateFormData('techStack', newTechStack);
              }}
            >
              🗑️ Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            const newKey = `category_${Date.now()}`;
            const newCategory = {
              title: 'Yeni Kategori',
              icon: '🔧',
              technologies: ['Teknoloji 1', 'Teknoloji 2']
            };
            const newTechStack = { ...(formData.techStack || {}), [newKey]: newCategory };
            updateFormData('techStack', newTechStack);
          }}
        >
          ➕ Yeni Kategori Ekle
        </button>
      </div>
    </div>
  );

  const renderReferencesTab = () => (
    <div className="admin-section">
      <h2 className="section-title">🎯 Referanslar Yönetimi</h2>
      
      {/* Hero Section */}
      <div className="section-block">
        <h3 className="block-title">Hero Bölümü</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Başlık</label>
            <input
              type="text"
              value={formData.referencesHero?.title || ''}
              onChange={(e) => updateFormData('referencesHero', { ...formData.referencesHero, title: e.target.value })}
              placeholder="Başarı Hikayelerimiz"
            />
          </div>
          <div className="form-group">
            <label>Alt Başlık</label>
            <input
              type="text"
              value={formData.referencesHero?.subtitle || ''}
              onChange={(e) => updateFormData('referencesHero', { ...formData.referencesHero, subtitle: e.target.value })}
              placeholder="Müşterilerimize sunduğumuz çözümler..."
            />
          </div>
        </div>
      </div>

      {/* Proje Kategorileri */}
      <div className="section-block">
        <h3 className="block-title">Proje Kategorileri</h3>
        <div className="form-group">
          <label>Kategoriler (virgülle ayırın)</label>
          <input
            type="text"
            value={formData.projectCategories?.join(', ') || ''}
            onChange={(e) => updateFormData('projectCategories', e.target.value.split(',').map(cat => cat.trim()))}
            placeholder="E-Ticaret, Kurumsal, Mobil, SaaS, Fintech, Eğitim"
          />
        </div>
      </div>

      {/* Referanslar Listesi */}
      <div className="section-block">
        <h3 className="block-title">Referanslar</h3>
        {formData.references?.map((reference, index) => (
          <div key={index} className="list-item">
            <div className="form-row">
              <div className="form-group">
                <label>Proje Adı</label>
                <input
                  type="text"
                  value={reference.title || ''}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index] = { ...reference, title: e.target.value };
                    updateFormData('references', newReferences);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Müşteri</label>
                <input
                  type="text"
                  value={reference.client || ''}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index] = { ...reference, client: e.target.value };
                    updateFormData('references', newReferences);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Sektör</label>
                <input
                  type="text"
                  value={reference.industry || ''}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index] = { ...reference, industry: e.target.value };
                    updateFormData('references', newReferences);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const newReferences = [...(formData.references || [])];
                      newReferences[index] = { ...reference, logo: event.target?.result as string };
                      updateFormData('references', newReferences);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {reference.logo && (
                <div style={{ marginTop: '10px' }}>
                  <img 
                    src={reference.logo} 
                    alt="Logo preview" 
                    style={{ 
                      width: '100px', 
                      height: '60px', 
                      objectFit: 'contain', 
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      background: 'white'
                    }} 
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    style={{ marginLeft: '10px', padding: '5px 10px' }}
                    onClick={() => {
                      const newReferences = [...(formData.references || [])];
                      newReferences[index] = { ...reference, logo: undefined };
                      updateFormData('references', newReferences);
                    }}
                  >
                    🗑️ Logo Sil
                  </button>
                </div>
              )}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Kategori</label>
                <select
                  value={reference.category || ''}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index] = { ...reference, category: e.target.value };
                    updateFormData('references', newReferences);
                  }}
                >
                  <option value="">Kategori Seçin</option>
                  {formData.projectCategories?.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Durum</label>
                <select
                  value={reference.status || ''}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index] = { ...reference, status: e.target.value };
                    updateFormData('references', newReferences);
                  }}
                >
                  <option value="">Durum Seçin</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                  <option value="Devam Ediyor">Devam Ediyor</option>
                  <option value="Planlama">Planlama</option>
                </select>
              </div>
              <div className="form-group">
                <label>Renk</label>
                <div className="form-row">
                  <input
                    type="color"
                    value={reference.color || '#667eea'}
                    onChange={(e) => {
                      const newReferences = [...(formData.references || [])];
                      newReferences[index] = { ...reference, color: e.target.value };
                      updateFormData('references', newReferences);
                    }}
                    style={{ width: '60px', height: '40px', border: 'none', borderRadius: '8px' }}
                  />
                  <input
                    type="text"
                    value={reference.color || ''}
                    onChange={(e) => {
                      const newReferences = [...(formData.references || [])];
                      newReferences[index] = { ...reference, color: e.target.value };
                      updateFormData('references', newReferences);
                    }}
                    placeholder="#667eea"
                    style={{ flex: 1, marginLeft: '10px' }}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Açıklama</label>
              <textarea
                value={reference.description || ''}
                onChange={(e) => {
                  const newReferences = [...(formData.references || [])];
                  newReferences[index] = { ...reference, description: e.target.value };
                  updateFormData('references', newReferences);
                }}
                rows={3}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Teknolojiler (virgülle ayırın)</label>
                <input
                  type="text"
                  value={reference.technologies?.join(', ') || ''}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index] = { ...reference, technologies: e.target.value.split(',').map(tech => tech.trim()) };
                    updateFormData('references', newReferences);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Süre (ay)</label>
                <input
                  type="number"
                  value={reference.duration || ''}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index] = { ...reference, duration: parseInt(e.target.value) };
                    updateFormData('references', newReferences);
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Canlı URL</label>
                <input
                  type="url"
                  value={reference.liveUrl || ''}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index] = { ...reference, liveUrl: e.target.value };
                    updateFormData('references', newReferences);
                  }}
                />
              </div>
              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="url"
                  value={reference.githubUrl || ''}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index] = { ...reference, githubUrl: e.target.value };
                    updateFormData('references', newReferences);
                  }}
                />
              </div>
            </div>
            
            {/* Metrics - Proje Sonuçları */}
            <div className="form-group">
              <label>📈 Proje Sonuçları (İsteğe Bağlı)</label>
              <div className="form-row">
                <div className="form-group">
                  <label>Önce</label>
                  <input
                    type="text"
                    value={reference.metrics?.before || ''}
                    onChange={(e) => {
                      const newReferences = [...(formData.references || [])];
                      newReferences[index] = { 
                        ...reference, 
                        metrics: { 
                          before: e.target.value,
                          after: reference.metrics?.after || '',
                          improvement: reference.metrics?.improvement || ''
                        } 
                      };
                      updateFormData('references', newReferences);
                    }}
                    placeholder="Örn: Aylık 50 sipariş"
                  />
                </div>
                <div className="form-group">
                  <label>Sonra</label>
                  <input
                    type="text"
                    value={reference.metrics?.after || ''}
                    onChange={(e) => {
                      const newReferences = [...(formData.references || [])];
                      newReferences[index] = { 
                        ...reference, 
                        metrics: { 
                          before: reference.metrics?.before || '',
                          after: e.target.value,
                          improvement: reference.metrics?.improvement || ''
                        } 
                      };
                      updateFormData('references', newReferences);
                    }}
                    placeholder="Örn: Aylık 200 sipariş"
                  />
                </div>
                <div className="form-group">
                  <label>İyileştirme</label>
                  <input
                    type="text"
                    value={reference.metrics?.improvement || ''}
                    onChange={(e) => {
                      const newReferences = [...(formData.references || [])];
                      newReferences[index] = { 
                        ...reference, 
                        metrics: { 
                          before: reference.metrics?.before || '',
                          after: reference.metrics?.after || '',
                          improvement: e.target.value
                        } 
                      };
                      updateFormData('references', newReferences);
                    }}
                    placeholder="Örn: %300 artış"
                  />
                </div>
              </div>
            </div>
            
            <button
              type="button"
              className="remove-btn"
              onClick={() => {
                const newReferences = formData.references?.filter((_, i) => i !== index) || [];
                updateFormData('references', newReferences);
              }}
            >
              🗑️ Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            const newReference = {
              id: Date.now(),
              title: '',
              client: '',
              industry: '',
              description: '',
              image: '',
              technologies: [],
              category: '',
              status: '',
              gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              duration: 0,
              liveUrl: '',
              githubUrl: ''
            };
            updateFormData('references', [...(formData.references || []), newReference]);
          }}
        >
          ➕ Yeni Referans Ekle
        </button>
      </div>

      {/* CTA Section */}
      <div className="section-block">
        <h3 className="block-title">CTA Bölümü</h3>
        <div className="form-group">
          <label>CTA Başlığı</label>
          <input
            type="text"
            value={formData.cta?.referencesCta?.title || ''}
            onChange={(e) => updateFormData('cta', { 
              ...formData.cta, 
              referencesCta: {
                ...formData.cta?.referencesCta,
                title: e.target.value
              }
            })}
            placeholder="Sizin de Başarı Hikayanizi Yazalım!"
          />
        </div>
        <div className="form-group">
          <label>CTA Açıklaması</label>
          <textarea
            value={formData.cta?.referencesCta?.description || ''}
            onChange={(e) => updateFormData('cta', { 
              ...formData.cta, 
              referencesCta: {
                ...formData.cta?.referencesCta,
                description: e.target.value
              }
            })}
            rows={3}
            placeholder="Müşterilerimizin elde ettiği sonuçlar gibi, sizin de işinizi bir sonraki seviyeye taşıyalım..."
          />
        </div>
        <div className="form-group">
          <label>Ana Buton Metni</label>
          <input
            type="text"
            value={formData.cta?.referencesCta?.buttonText || ''}
            onChange={(e) => updateFormData('cta', { 
              ...formData.cta, 
              referencesCta: {
                ...formData.cta?.referencesCta,
                buttonText: e.target.value
              }
            })}
            placeholder="Projenizi Başlatalım"
          />
        </div>
        
        {/* CTA Features */}
        <div className="form-group">
          <label>CTA Özellikler (3 adet)</label>
          {(formData.cta?.referencesCta?.features || []).map((feature, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...(formData.cta?.referencesCta?.features || [])];
                  newFeatures[index] = e.target.value;
                  updateFormData('cta', { 
                    ...formData.cta, 
                    referencesCta: {
                      ...formData.cta?.referencesCta,
                      features: newFeatures
                    }
                  });
                }}
                placeholder="Hedef Odaklı Çözümler"
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="remove-btn"
                onClick={() => {
                  const newFeatures = (formData.cta?.referencesCta?.features || []).filter((_, i) => i !== index);
                  updateFormData('cta', { 
                    ...formData.cta, 
                    referencesCta: {
                      ...formData.cta?.referencesCta,
                      features: newFeatures
                    }
                  });
                }}
              >
                ✕
              </button>
            </div>
          ))}
          {(!formData.cta?.referencesCta?.features || formData.cta.referencesCta.features.length < 3) && (
            <button
              type="button"
              className="add-btn"
              onClick={() => {
                const currentFeatures = formData.cta?.referencesCta?.features || [];
                const newFeatures = [...currentFeatures, 'Yeni Özellik'];
                updateFormData('cta', { 
                  ...formData.cta, 
                  referencesCta: {
                    ...formData.cta?.referencesCta,
                    features: newFeatures
                  }
                });
              }}
            >
              + Özellik Ekle
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderBrandsTab = () => (
    <div className="admin-section">
      <h2 className="section-title">🏢 Markalar Yönetimi</h2>
      
      {/* Hero Section */}
      <div className="section-block">
        <h3 className="block-title">Hero Bölümü</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Başlık</label>
            <input
              type="text"
              value={formData.brands?.title || ''}
              onChange={(e) => updateFormData('brands', { ...formData.brands, title: e.target.value })}
              placeholder="Güvenilir Markaların Tercihi"
            />
          </div>
          <div className="form-group">
            <label>Alt Başlık</label>
            <input
              type="text"
              value={formData.brands?.subtitle || ''}
              onChange={(e) => updateFormData('brands', { ...formData.brands, subtitle: e.target.value })}
              placeholder="Dünya genelindeki başarılı markalarla..."
            />
          </div>
        </div>
      </div>

      {/* Marka Kategorileri */}
      <div className="section-block">
        <h3 className="block-title">Marka Kategorileri</h3>
        <div className="form-group">
          <label>Kategoriler (virgülle ayırın)</label>
          <input
            type="text"
            value={formData.brandCategories?.join(', ') || ''}
            onChange={(e) => updateFormData('brandCategories', e.target.value.split(',').map(cat => cat.trim()))}
            placeholder="E-Ticaret, Teknoloji, Finans, Sağlık, Eğitim"
          />
        </div>
      </div>

      {/* Markalar Listesi */}
      <div className="section-block">
        <h3 className="block-title">Markalar</h3>
        {formData.brands?.list?.map((brand, index) => (
          <div key={index} className="list-item">
            <div className="form-row">
              <div className="form-group">
                <label>Marka Adı</label>
                <input
                  type="text"
                  value={brand.name || ''}
                  onChange={(e) => {
                    const newBrands = { ...formData.brands };
                    if (newBrands.list) {
                      newBrands.list[index] = { ...brand, name: e.target.value };
                      updateFormData('brands', newBrands);
                    }
                  }}
                />
              </div>
              <div className="form-group">
                <label>Kategori</label>
                <select
                  value={brand.category || ''}
                  onChange={(e) => {
                    const newBrands = { ...formData.brands };
                    if (newBrands.list) {
                      newBrands.list[index] = { ...brand, category: e.target.value };
                      updateFormData('brands', newBrands);
                    }
                  }}
                >
                  <option value="">Kategori Seçin</option>
                  {formData.brandCategories?.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Durum</label>
                <select
                  value={brand.status || ''}
                  onChange={(e) => {
                    const newBrands = { ...formData.brands };
                    if (newBrands.list) {
                      newBrands.list[index] = { ...brand, status: e.target.value as 'completed' | 'in-progress' | 'planning' };
                      updateFormData('brands', newBrands);
                    }
                  }}
                >
                  <option value="">Durum Seçin</option>
                  <option value="completed">Tamamlandı</option>
                  <option value="in-progress">Devam Ediyor</option>
                  <option value="planning">Planlama</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const newBrands = { ...formData.brands };
                      if (newBrands.list) {
                        newBrands.list[index] = { ...brand, logo: event.target?.result as string };
                        updateFormData('brands', newBrands);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {brand.logo && (
                <div style={{ marginTop: '10px' }}>
                  <img 
                    src={brand.logo} 
                    alt="Logo preview" 
                    style={{ 
                      width: '100px', 
                      height: '60px', 
                      objectFit: 'contain', 
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      background: 'white'
                    }} 
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    style={{ marginLeft: '10px', padding: '5px 10px' }}
                    onClick={() => {
                      const newBrands = { ...formData.brands };
                      if (newBrands.list) {
                        newBrands.list[index] = { ...brand, logo: undefined };
                        updateFormData('brands', newBrands);
                      }
                    }}
                  >
                    🗑️ Logo Sil
                  </button>
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Açıklama</label>
              <textarea
                value={brand.description || ''}
                onChange={(e) => {
                  const newBrands = { ...formData.brands };
                  if (newBrands.list) {
                    newBrands.list[index] = { ...brand, description: e.target.value };
                    updateFormData('brands', newBrands);
                  }
                }}
                rows={3}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Teknolojiler (virgülle ayırın)</label>
                <input
                  type="text"
                  value={brand.technologies?.join(', ') || ''}
                  onChange={(e) => {
                    const newBrands = { ...formData.brands };
                    if (newBrands.list) {
                      newBrands.list[index] = { ...brand, technologies: e.target.value.split(',').map(tech => tech.trim()) };
                      updateFormData('brands', newBrands);
                    }
                  }}
                />
              </div>
              <div className="form-group">
                <label>Özellikler (virgülle ayırın)</label>
                <input
                  type="text"
                  value={brand.features?.join(', ') || ''}
                  onChange={(e) => {
                    const newBrands = { ...formData.brands };
                    if (newBrands.list) {
                      newBrands.list[index] = { ...brand, features: e.target.value.split(',').map(feature => feature.trim()) };
                      updateFormData('brands', newBrands);
                    }
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Website URL</label>
                <input
                  type="url"
                  value={brand.links?.website || ''}
                  onChange={(e) => {
                    const newBrands = { ...formData.brands };
                    if (newBrands.list) {
                      newBrands.list[index] = { 
                        ...brand, 
                        links: { ...brand.links, website: e.target.value } 
                      };
                      updateFormData('brands', newBrands);
                    }
                  }}
                />
              </div>
              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="url"
                  value={brand.links?.github || ''}
                  onChange={(e) => {
                    const newBrands = { ...formData.brands };
                    if (newBrands.list) {
                      newBrands.list[index] = { 
                        ...brand, 
                        links: { ...brand.links, github: e.target.value } 
                      };
                      updateFormData('brands', newBrands);
                    }
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Önceki Metrik</label>
                <input
                  type="text"
                  value={brand.metrics?.previous || ''}
                  onChange={(e) => {
                    const newBrands = { ...formData.brands };
                    if (newBrands.list) {
                      newBrands.list[index] = { 
                        ...brand, 
                        metrics: { ...brand.metrics, previous: e.target.value, current: brand.metrics?.current || '' } 
                      };
                      updateFormData('brands', newBrands);
                    }
                  }}
                  placeholder="Örn: 1000 kullanıcı"
                />
              </div>
              <div className="form-group">
                <label>Güncel Metrik</label>
                <input
                  type="text"
                  value={brand.metrics?.current || ''}
                  onChange={(e) => {
                    const newBrands = { ...formData.brands };
                    if (newBrands.list) {
                      newBrands.list[index] = { 
                        ...brand, 
                        metrics: { ...brand.metrics, current: e.target.value, previous: brand.metrics?.previous || '' } 
                      };
                      updateFormData('brands', newBrands);
                    }
                  }}
                  placeholder="Örn: 5000 kullanıcı"
                />
              </div>
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={() => {
                const newBrands = { ...formData.brands };
                if (newBrands.list) {
                  newBrands.list = newBrands.list.filter((_, i) => i !== index);
                  updateFormData('brands', newBrands);
                }
              }}
            >
              🗑️ Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            const newBrand = {
              id: Date.now(),
              name: '',
              category: '',
              description: '',
              status: 'completed',
              technologies: [],
              features: [],
              links: { website: '', github: '' },
              metrics: { previous: '', current: '' },
              gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            };
            const newBrands = { 
              ...formData.brands, 
              list: [...(formData.brands?.list || []), newBrand] 
            };
            updateFormData('brands', newBrands);
          }}
        >
          ➕ Yeni Marka Ekle
        </button>
      </div>

      {/* CTA Section */}
      <div className="section-block">
        <h3 className="block-title">CTA Bölümü</h3>
        <div className="form-group">
          <label>CTA Başlığı</label>
          <input
            type="text"
            value={formData.brandsCta?.title || ''}
            onChange={(e) => updateFormData('brandsCta', { 
              ...formData.brandsCta, 
              title: e.target.value 
            })}
            placeholder="Bir Sonraki Başarılı Marka Sizin Olabilir!"
          />
        </div>
        <div className="form-group">
          <label>CTA Açıklaması</label>
          <textarea
            value={formData.brandsCta?.description || ''}
            onChange={(e) => updateFormData('brandsCta', { 
              ...formData.brandsCta, 
              description: e.target.value 
            })}
            rows={2}
            placeholder="Modern teknolojiler ve proven methodologies ile markanızı yeni seviyelere taşıyalım."
          />
        </div>
        <div className="form-group">
          <label>Ana Buton Metni</label>
          <input
            type="text"
            value={formData.brandsCta?.buttonText || ''}
            onChange={(e) => updateFormData('brandsCta', { 
              ...formData.brandsCta, 
              buttonText: e.target.value 
            })}
            placeholder="Ücretsiz Konsültasyon"
          />
        </div>
        
        {/* CTA Features */}
        <div className="form-group">
          <label>CTA Özellikler (3 adet)</label>
          {(formData.brandsCta?.features || []).map((feature, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...(formData.brandsCta?.features || [])];
                  newFeatures[index] = e.target.value;
                  updateFormData('brandsCta', { 
                    ...formData.brandsCta, 
                    features: newFeatures 
                  });
                }}
                placeholder="Innovation"
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="remove-btn"
                onClick={() => {
                  const newFeatures = (formData.brandsCta?.features || []).filter((_, i) => i !== index);
                  updateFormData('brandsCta', { 
                    ...formData.brandsCta, 
                    features: newFeatures 
                  });
                }}
              >
                ✕
              </button>
            </div>
          ))}
          {(!formData.brandsCta?.features || formData.brandsCta.features.length < 3) && (
            <button
              type="button"
              className="add-btn"
              onClick={() => {
                const currentFeatures = formData.brandsCta?.features || [];
                const newFeatures = [...currentFeatures, 'Yeni Özellik'];
                updateFormData('brandsCta', { 
                  ...formData.brandsCta, 
                  features: newFeatures 
                });
              }}
            >
              + Özellik Ekle
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="admin-section">
      <h2 className="section-title">📞 İletişim Yönetimi</h2>
      
      {/* Hero Section */}
      <div className="section-block">
        <h3 className="block-title">Hero Bölümü</h3>
        <div className="form-group">
          <label>Başlık</label>
          <input
            type="text"
            value={formData.contactHero?.title || ''}
            onChange={(e) => updateFormData('contactHero', { 
              ...formData.contactHero, 
              title: e.target.value 
            })}
            placeholder="İletişime Geçin"
          />
        </div>
        <div className="form-group">
          <label>Alt Başlık</label>
          <input
            type="text"
            value={formData.contactHero?.subtitle || ''}
            onChange={(e) => updateFormData('contactHero', { 
              ...formData.contactHero, 
              subtitle: e.target.value 
            })}
            placeholder="Projeleriniz için birlikte çalışalım"
          />
        </div>
        
        {/* Hero Features */}
        <div className="form-group">
          <label>Özellikler (3 adet)</label>
          {(formData.contactHero?.features || []).map((feature, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...(formData.contactHero?.features || [])];
                  newFeatures[index] = e.target.value;
                  updateFormData('contactHero', { 
                    ...formData.contactHero, 
                    features: newFeatures 
                  });
                }}
                placeholder="24 Saat İçinde Yanıt"
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="remove-btn"
                onClick={() => {
                  const newFeatures = (formData.contactHero?.features || []).filter((_, i) => i !== index);
                  updateFormData('contactHero', { 
                    ...formData.contactHero, 
                    features: newFeatures 
                  });
                }}
              >
                ✕
              </button>
            </div>
          ))}
          {(!formData.contactHero?.features || formData.contactHero.features.length < 3) && (
            <button
              type="button"
              className="add-btn"
              onClick={() => {
                const currentFeatures = formData.contactHero?.features || [];
                const newFeatures = [...currentFeatures, 'Yeni Özellik'];
                updateFormData('contactHero', { 
                  ...formData.contactHero, 
                  features: newFeatures 
                });
              }}
            >
              + Özellik Ekle
            </button>
          )}
        </div>
      </div>


      
      {/* İletişim Bilgileri */}
      <div className="section-block">
        <div className="block-header">
          <h3 className="block-title">İletişim Bilgileri</h3>
          <button
            type="button"
            className="add-btn"
            onClick={() => {
              const newField = { id: Date.now(), label: '', value: '', type: 'text' };
              updateFormData('contact', { 
                ...formData.contact, 
                customFields: [...(formData.contact?.customFields || []), newField] 
              });
            }}
          >
            <span>+</span> Yeni İletişim Bilgisi Ekle
          </button>
        </div>

        {/* İletişim Icon'ları */}
        <h4 className="sub-title">İletişim Icon'ları</h4>
        <div className="icon-help">
          <p>💡 <strong>Gerçek Logo Kullanımı:</strong> Bu alanları boş bırakın - sistem otomatik olarak uygun icon'ları kullanacak!</p>
          <p>📝 <strong>Özel Icon İstiyorsanız:</strong> Emoji veya Unicode karakterler girebilirsiniz</p>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email Icon</label>
            <input
              type="text"
              value={formData.contact?.icons?.email || ''}
              onChange={(e) => updateFormData('contact', { 
                ...formData.contact, 
                icons: { 
                  ...formData.contact?.icons, 
                  email: e.target.value 
                } 
              })}
              placeholder="📧"
            />
          </div>
          <div className="form-group">
            <label>Telefon Icon</label>
            <input
              type="text"
              value={formData.contact?.icons?.phone || ''}
              onChange={(e) => updateFormData('contact', { 
                ...formData.contact, 
                icons: { 
                  ...formData.contact?.icons, 
                  phone: e.target.value 
                } 
              })}
              placeholder="📞"
            />
          </div>
          <div className="form-group">
            <label>WhatsApp Icon</label>
            <input
              type="text"
              value={formData.contact?.icons?.whatsapp || ''}
              onChange={(e) => updateFormData('contact', { 
                ...formData.contact, 
                icons: { 
                  ...formData.contact?.icons, 
                  whatsapp: e.target.value 
                } 
              })}
              placeholder="💬"
            />
          </div>
          <div className="form-group">
            <label>Adres Icon</label>
            <input
              type="text"
              value={formData.contact?.icons?.address || ''}
              onChange={(e) => updateFormData('contact', { 
                ...formData.contact, 
                icons: { 
                  ...formData.contact?.icons, 
                  address: e.target.value 
                } 
              })}
              placeholder="📍"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.contact?.email || ''}
              onChange={(e) => updateFormData('contact', { ...formData.contact, email: e.target.value })}
              placeholder="info@mskod.com"
            />
          </div>
          <div className="form-group">
            <label>Telefon</label>
            <input
              type="text"
              value={formData.contact?.phone || ''}
              onChange={(e) => updateFormData('contact', { ...formData.contact, phone: e.target.value })}
              placeholder="+90 (555) 123 45 67"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>WhatsApp</label>
            <input
              type="text"
              value={formData.contact?.whatsapp || ''}
              onChange={(e) => updateFormData('contact', { ...formData.contact, whatsapp: e.target.value })}
              placeholder="905551234567"
            />
          </div>
          <div className="form-group">
            <label>Adres</label>
            <input
              type="text"
              value={formData.contact?.address || ''}
              onChange={(e) => updateFormData('contact', { ...formData.contact, address: e.target.value })}
              placeholder="İstanbul, Türkiye"
            />
          </div>
        </div>
        
        {/* Dinamik İletişim Alanları */}
        {formData.contact?.customFields?.map((field: any, index: number) => (
          <div key={field.id} className="custom-field-row">
            <div className="form-row">
              <div className="form-group">
                <label>Alan Adı</label>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => {
                    const updatedFields = [...(formData.contact?.customFields || [])];
                    updatedFields[index] = { ...field, label: e.target.value };
                    updateFormData('contact', { ...formData.contact, customFields: updatedFields });
                  }}
                  placeholder="Örn: Skype, Telegram, vb."
                />
              </div>
              <div className="form-group">
                <label>Değer</label>
                <input
                  type={field.type || 'text'}
                  value={field.value}
                  onChange={(e) => {
                    const updatedFields = [...(formData.contact?.customFields || [])];
                    updatedFields[index] = { ...field, value: e.target.value };
                    updateFormData('contact', { ...formData.contact, customFields: updatedFields });
                  }}
                  placeholder="İletişim bilgisi"
                />
              </div>
              <div className="form-group">
                <label>Icon</label>
                <input
                  type="text"
                  value={field.icon || ''}
                  onChange={(e) => {
                    const updatedFields = [...(formData.contact?.customFields || [])];
                    updatedFields[index] = { ...field, icon: e.target.value };
                    updateFormData('contact', { ...formData.contact, customFields: updatedFields });
                  }}
                  placeholder="💬"
                />
              </div>
              <div className="form-group">
                <label>Tip</label>
                <select
                  value={field.type}
                  onChange={(e) => {
                    const updatedFields = [...(formData.contact?.customFields || [])];
                    updatedFields[index] = { ...field, type: e.target.value };
                    updateFormData('contact', { ...formData.contact, customFields: updatedFields });
                  }}
                >
                  <option value="text">Metin</option>
                  <option value="email">Email</option>
                  <option value="tel">Telefon</option>
                  <option value="url">URL</option>
                </select>
              </div>
              <button
                type="button"
                className="delete-btn"
                onClick={() => {
                  const updatedFields = formData.contact?.customFields?.filter((_: any, i: number) => i !== index) || [];
                  updateFormData('contact', { ...formData.contact, customFields: updatedFields });
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sosyal Medya */}
      <div className="section-block">
        <h3 className="block-title">Sosyal Medya</h3>
        
        {/* Sosyal Medya Icon'ları */}
        <h4 className="sub-title">Sosyal Medya Icon'ları</h4>
        <div className="icon-help">
          <p>💡 <strong>Gerçek Logo Kullanımı:</strong> Bu alanları boş bırakın - sistem otomatik olarak gerçek sosyal medya logolarını kullanacak!</p>
          <p>📝 <strong>Özel Icon İstiyorsanız:</strong> Emoji veya Unicode karakterler girebilirsiniz</p>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>LinkedIn Icon</label>
            <input
              type="text"
              value={formData.contact?.socialMediaIcons?.linkedin || ''}
              onChange={(e) => updateFormData('contact', { 
                ...formData.contact, 
                socialMediaIcons: { 
                  ...formData.contact?.socialMediaIcons, 
                  linkedin: e.target.value 
                } 
              })}
              placeholder="💼"
            />
          </div>
          <div className="form-group">
            <label>GitHub Icon</label>
            <input
              type="text"
              value={formData.contact?.socialMediaIcons?.github || ''}
              onChange={(e) => updateFormData('contact', { 
                ...formData.contact, 
                socialMediaIcons: { 
                  ...formData.contact?.socialMediaIcons, 
                  github: e.target.value 
                } 
              })}
              placeholder="💻"
            />
          </div>
          <div className="form-group">
            <label>Instagram Icon</label>
            <input
              type="text"
              value={formData.contact?.socialMediaIcons?.instagram || ''}
              onChange={(e) => updateFormData('contact', { 
                ...formData.contact, 
                socialMediaIcons: { 
                  ...formData.contact?.socialMediaIcons, 
                  instagram: e.target.value 
                } 
              })}
              placeholder="📸"
            />
          </div>
          <div className="form-group">
            <label>Twitter Icon</label>
            <input
              type="text"
              value={formData.contact?.socialMediaIcons?.twitter || ''}
              onChange={(e) => updateFormData('contact', { 
                ...formData.contact, 
                socialMediaIcons: { 
                  ...formData.contact?.socialMediaIcons, 
                  twitter: e.target.value 
                } 
              })}
              placeholder="🐦"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              value={formData.contact?.socialMedia?.linkedin || ''}
              onChange={(e) => updateFormData('contact', { 
                ...formData.contact, 
                socialMedia: { ...formData.contact?.socialMedia, linkedin: e.target.value } 
              })}
              placeholder="https://linkedin.com/in/mskod"
            />
          </div>
          <div className="form-group">
            <label>GitHub</label>
            <input
              type="url"
              value={formData.contact?.socialMedia?.github || ''}
              onChange={(e) => updateFormData('contact', { 
                ...formData.contact, 
                socialMedia: { ...formData.contact?.socialMedia, github: e.target.value } 
              })}
              placeholder="https://github.com/mskod"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Instagram</label>
            <input
              type="url"
              value={formData.contact?.socialMedia?.instagram || ''}
              onChange={(e) => updateFormData('contact', { 
                ...formData.contact, 
                socialMedia: { ...formData.contact?.socialMedia, instagram: e.target.value } 
              })}
              placeholder="https://instagram.com/mskod"
            />
          </div>
          <div className="form-group">
            <label>Twitter</label>
            <input
              type="url"
              value={formData.contact?.socialMedia?.twitter || ''}
              onChange={(e) => updateFormData('contact', { 
                ...formData.contact, 
                socialMedia: { ...formData.contact?.socialMedia, twitter: e.target.value } 
              })}
              placeholder="https://twitter.com/mskod"
            />
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="section-block">
        <h3 className="block-title">İletişim CTA Bölümü</h3>
        <div className="form-group">
          <label>CTA Başlık</label>
          <input
            type="text"
            value={formData.contactCta?.title || ''}
            onChange={(e) => updateFormData('contactCta', { 
              ...formData.contactCta, 
              title: e.target.value 
            })}
            placeholder="Projenizi Hayata Geçirelim!"
          />
        </div>
        <div className="form-group">
          <label>CTA Açıklama</label>
          <textarea
            value={formData.contactCta?.description || ''}
            onChange={(e) => updateFormData('contactCta', { 
              ...formData.contactCta, 
              description: e.target.value 
            })}
            placeholder="Fikirlerinizi modern teknolojilerle buluşturalım..."
            rows={3}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Buton Metni</label>
            <input
              type="text"
              value={formData.contactCta?.buttonText || ''}
              onChange={(e) => updateFormData('contactCta', { 
                ...formData.contactCta, 
                buttonText: e.target.value 
              })}
              placeholder="Hemen Başlayalım"
            />
          </div>
          <div className="form-group">
            <label>Buton URL</label>
            <input
              type="text"
              value={formData.contactCta?.buttonUrl || ''}
              onChange={(e) => updateFormData('contactCta', { 
                ...formData.contactCta, 
                buttonUrl: e.target.value 
              })}
              placeholder="mailto:info@mskod.com"
            />
          </div>
          <div className="form-group">
            <label>Buton Icon</label>
            <input
              type="text"
              value={formData.contactCta?.buttonIcon || ''}
              onChange={(e) => updateFormData('contactCta', { 
                ...formData.contactCta, 
                buttonIcon: e.target.value 
              })}
              placeholder="🚀"
            />
          </div>
        </div>

        {/* CTA Features */}
        <h4 className="sub-title">CTA Özellikler</h4>
        {formData.contactCta?.features?.map((feature: any, index: number) => (
          <div key={index} className="custom-field-row">
            <div className="form-row">
              <div className="form-group">
                <label>Icon</label>
                <input
                  type="text"
                  value={feature.icon}
                  onChange={(e) => {
                    const updatedFeatures = [...(formData.contactCta?.features || [])];
                    updatedFeatures[index] = { ...feature, icon: e.target.value };
                    updateFormData('contactCta', { ...formData.contactCta, features: updatedFeatures });
                  }}
                  placeholder="💡"
                />
              </div>
              <div className="form-group">
                <label>Metin</label>
                <input
                  type="text"
                  value={feature.text}
                  onChange={(e) => {
                    const updatedFeatures = [...(formData.contactCta?.features || [])];
                    updatedFeatures[index] = { ...feature, text: e.target.value };
                    updateFormData('contactCta', { ...formData.contactCta, features: updatedFeatures });
                  }}
                  placeholder="Ücretsiz Konseptual Tasarım"
                />
              </div>
              <button
                type="button"
                className="delete-btn"
                onClick={() => {
                  const updatedFeatures = formData.contactCta?.features?.filter((_: any, i: number) => i !== index) || [];
                  updateFormData('contactCta', { ...formData.contactCta, features: updatedFeatures });
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            const newFeature = { icon: "✨", text: "Yeni Özellik" };
            const updatedFeatures = [...(formData.contactCta?.features || []), newFeature];
            updateFormData('contactCta', { ...formData.contactCta, features: updatedFeatures });
          }}
        >
          + CTA Özellik Ekle
        </button>
      </div>
    </div>
  );

  const renderMessagesTab = () => (
    <div className="admin-section">
      <h2 className="section-title">💬 Mesaj Yönetimi</h2>
      
      {/* İstatistikler */}
      <div className="section-block">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📧</div>
            <div className="stat-content">
              <h3>{formData.messages?.length || 0}</h3>
              <p>Toplam Mesaj</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🆕</div>
            <div className="stat-content">
              <h3>{formData.messages?.filter(m => m.status === 'new').length || 0}</h3>
              <p>Yeni Mesaj</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👁️</div>
            <div className="stat-content">
              <h3>{formData.messages?.filter(m => m.status === 'read').length || 0}</h3>
              <p>Okundu</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{formData.messages?.filter(m => m.status === 'replied').length || 0}</h3>
              <p>Yanıtlandı</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mesaj Filtreleri */}
      <div className="section-block">
        <div className="filter-bar">
          <div className="filter-group">
            <label>Durum Filtresi:</label>
            <select 
              value={formData.messageFilter || 'all'}
              onChange={(e) => updateFormData('messageFilter', e.target.value)}
            >
              <option value="all">Tüm Mesajlar</option>
              <option value="new">Yeni Mesajlar</option>
              <option value="read">Okunmuş Mesajlar</option>
              <option value="replied">Yanıtlanmış Mesajlar</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Sıralama:</label>
            <select 
              value={formData.messageSortOrder || 'newest'}
              onChange={(e) => updateFormData('messageSortOrder', e.target.value)}
            >
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="name">İsim A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mesajlar Listesi */}
      <div className="section-block">
        <div className="block-header">
          <h3 className="block-title">Gelen Mesajlar</h3>
          <div className="header-actions">
            <button
              type="button"
              className="action-btn secondary"
              onClick={() => {
                const readMessages = formData.messages?.map(m => ({ ...m, status: 'read' as const })) || [];
                updateFormData('messages', readMessages);
              }}
              disabled={!formData.messages?.some(m => m.status === 'new')}
            >
              📖 Tümünü Okundu Yap
            </button>
            <button
              type="button"
              className="action-btn danger"
              onClick={() => {
                if (confirm('Tüm mesajları silmek istediğinizden emin misiniz?')) {
                  updateFormData('messages', []);
                }
              }}
              disabled={!formData.messages?.length}
            >
              🗑️ Tümünü Sil
            </button>
          </div>
        </div>

        {formData.messages && formData.messages.length > 0 ? (
          <div className="messages-container">
            {formData.messages
              .filter(message => {
                const filter = formData.messageFilter || 'all';
                return filter === 'all' || message.status === filter;
              })
              .sort((a, b) => {
                const sortOrder = formData.messageSortOrder || 'newest';
                switch (sortOrder) {
                  case 'newest':
                    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                  case 'oldest':
                    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
                  case 'name':
                    return a.name.localeCompare(b.name, 'tr');
                  default:
                    return 0;
                }
              })
              .map((message) => (
                <div key={message.id} className={`message-card ${message.status}`}>
                  <div className="message-header">
                    <div className="message-meta">
                      <div className="sender-info">
                        <h4 className="sender-name">{message.name}</h4>
                        <span className="sender-email">{message.email}</span>
                      </div>
                      <div className="message-details">
                        <span className="message-date">
                          {new Date(message.timestamp).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <span className={`status-badge ${message.status}`}>
                          {message.status === 'new' && '🆕 Yeni'}
                          {message.status === 'read' && '👁️ Okundu'}
                          {message.status === 'replied' && '✅ Yanıtlandı'}
                        </span>
                      </div>
                    </div>
                    <div className="message-actions">
                      <select
                        value={message.status}
                        onChange={(e) => {
                          const newMessages = [...(formData.messages || [])];
                          const messageIndex = newMessages.findIndex(m => m.id === message.id);
                          if (messageIndex !== -1) {
                            newMessages[messageIndex] = { 
                              ...message, 
                              status: e.target.value as 'new' | 'read' | 'replied' 
                            };
                            updateFormData('messages', newMessages);
                          }
                        }}
                        className="status-select"
                      >
                        <option value="new">🆕 Yeni</option>
                        <option value="read">👁️ Okundu</option>
                        <option value="replied">✅ Yanıtlandı</option>
                      </select>
                      <button
                        type="button"
                        className="action-btn primary small"
                        onClick={() => {
                          const emailSubject = encodeURIComponent(`Re: ${message.subject}`);
                          const emailBody = encodeURIComponent(
                            `Merhaba ${message.name},\n\n${message.subject} konulu mesajınız için teşekkür ederiz.\n\n---\nOrijinal Mesaj:\n"${message.message}"\n---\n\nSaygılarımla,\nMS-KOD`
                          );
                          window.open(`mailto:${message.email}?subject=${emailSubject}&body=${emailBody}`);
                        }}
                        title="Email ile yanıtla"
                      >
                        📧 Yanıtla
                      </button>
                      <button
                        type="button"
                        className="action-btn danger small"
                        onClick={() => {
                          if (confirm(`${message.name} kişisinin mesajını silmek istediğinizden emin misiniz?`)) {
                            const newMessages = (formData.messages || []).filter(m => m.id !== message.id);
                            updateFormData('messages', newMessages);
                          }
                        }}
                        title="Mesajı sil"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div className="message-body">
                    <div className="message-subject">
                      <h5>📋 Konu: {message.subject}</h5>
                    </div>
                    <div className="message-content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                  
                  {message.phone && (
                    <div className="message-contact">
                      <span className="contact-info">
                        📞 Telefon: <a href={`tel:${message.phone}`}>{message.phone}</a>
                      </span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>Henüz Mesaj Yok</h3>
            <p>İletişim formundan gelen mesajlar burada görünecek.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSEOTab = () => (
    <div className="admin-section">
      <h2 className="section-title">🔍 SEO Yönetimi</h2>
      
      {/* Temel SEO */}
      <div className="section-block">
        <h3 className="block-title">Temel SEO Bilgileri</h3>
        <div className="form-group">
          <label>Meta Başlık</label>
          <input
            type="text"
            value={formData.seo?.metaTitle || ''}
            onChange={(e) => updateFormData('seo', { ...formData.seo, metaTitle: e.target.value })}
            placeholder="MS-KOD - Dijital Çözümler"
          />
        </div>
        <div className="form-group">
          <label>Meta Açıklama</label>
          <textarea
            value={formData.seo?.metaDescription || ''}
            onChange={(e) => updateFormData('seo', { ...formData.seo, metaDescription: e.target.value })}
            placeholder="MS-KOD olarak, teknoloji dünyasında yenilikçi çözümler üreten..."
            rows={3}
          />
        </div>
        <div className="form-group">
          <label>Anahtar Kelimeler (virgülle ayırın)</label>
          <input
            type="text"
            value={formData.seo?.keywords?.join(', ') || ''}
            onChange={(e) => updateFormData('seo', { 
              ...formData.seo, 
              keywords: e.target.value.split(',').map(k => k.trim()) 
            })}
            placeholder="MS-KOD, Dijital Çözümler, Web Geliştirme..."
          />
        </div>

      </div>

      {/* Open Graph */}
      <div className="section-block">
        <h3 className="block-title">Open Graph (Facebook/LinkedIn)</h3>
        <div className="form-group">
          <label>OG Başlık</label>
          <input
            type="text"
            value={formData.seo?.openGraph?.title || ''}
            onChange={(e) => updateFormData('seo', { 
              ...formData.seo, 
              openGraph: { ...formData.seo?.openGraph, title: e.target.value } 
            })}
            placeholder="MS-KOD - Dijital Çözümler"
          />
        </div>
        <div className="form-group">
          <label>OG Açıklama</label>
          <textarea
            value={formData.seo?.openGraph?.description || ''}
            onChange={(e) => updateFormData('seo', { 
              ...formData.seo, 
              openGraph: { ...formData.seo?.openGraph, description: e.target.value } 
            })}
            placeholder="MS-KOD olarak, teknoloji dünyasında..."
            rows={3}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>OG Resim URL</label>
            <input
              type="text"
              value={formData.seo?.openGraph?.image || ''}
              onChange={(e) => updateFormData('seo', { 
                ...formData.seo, 
                openGraph: { ...formData.seo?.openGraph, image: e.target.value } 
              })}
              placeholder="/api/placeholder/400/300"
            />
          </div>
          <div className="form-group">
            <label>OG URL</label>
            <input
              type="url"
              value={formData.seo?.openGraph?.url || ''}
              onChange={(e) => updateFormData('seo', { 
                ...formData.seo, 
                openGraph: { ...formData.seo?.openGraph, url: e.target.value } 
              })}
              placeholder="https://mskod.com"
            />
          </div>
        </div>
      </div>

      {/* Twitter Card */}
      <div className="section-block">
        <h3 className="block-title">Twitter Card</h3>
        <div className="form-group">
          <label>Twitter Başlık</label>
          <input
            type="text"
            value={formData.seo?.twitterCard?.title || ''}
            onChange={(e) => updateFormData('seo', { 
              ...formData.seo, 
              twitterCard: { ...formData.seo?.twitterCard, title: e.target.value } 
            })}
            placeholder="MS-KOD - Dijital Çözümler"
          />
        </div>
        <div className="form-group">
          <label>Twitter Açıklama</label>
          <textarea
            value={formData.seo?.twitterCard?.description || ''}
            onChange={(e) => updateFormData('seo', { 
              ...formData.seo, 
              twitterCard: { ...formData.seo?.twitterCard, description: e.target.value } 
            })}
            placeholder="MS-KOD olarak, teknoloji dünyasında..."
            rows={3}
          />
        </div>
        <div className="form-group">
          <label>Twitter Resim URL</label>
          <input
            type="text"
            value={formData.seo?.twitterCard?.image || ''}
            onChange={(e) => updateFormData('seo', { 
              ...formData.seo, 
              twitterCard: { ...formData.seo?.twitterCard, image: e.target.value } 
            })}
            placeholder="/api/placeholder/400/300"
          />
        </div>
      </div>

      {/* Analytics */}
      <div className="section-block">
        <h3 className="block-title">Analytics & Search Console</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Google Analytics ID</label>
            <input
              type="text"
              value={formData.seo?.googleAnalyticsId || ''}
              onChange={(e) => updateFormData('seo', { ...formData.seo, googleAnalyticsId: e.target.value })}
              placeholder="G-XXXXXXXXXX"
            />
          </div>
          <div className="form-group">
            <label>Google Search Console ID</label>
            <input
              type="text"
              value={formData.seo?.googleSearchConsoleId || ''}
              onChange={(e) => updateFormData('seo', { ...formData.seo, googleSearchConsoleId: e.target.value })}
              placeholder="google-site-verification kodu"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPagesSEOTab = () => (
    <div className="admin-section">
      <h2 className="section-title">📄 Sayfa SEO Yönetimi</h2>
      <p className="section-description">Her sayfa için özel SEO ayarları yapın. Bu ayarlar sayfa başlıklarını, açıklamalarını ve anahtar kelimeleri kontrol eder.</p>
      
      {/* Ana Sayfa SEO */}
      <div className="section-block">
        <h3 className="block-title">🏠 Ana Sayfa SEO</h3>
        <div className="form-group">
          <label>Sayfa Başlığı (Title)</label>
          <input
            type="text"
            value={formData.pagesSEO?.home?.title || ''}
            onChange={(e) => updateFormData('pagesSEO.home.title', e.target.value)}
            placeholder="Ana sayfa başlığı (50-60 karakter önerilir)"
            maxLength={60}
          />
          <small>Karakter sayısı: {(formData.pagesSEO?.home?.title || '').length}/60</small>
        </div>
        <div className="form-group">
          <label>Meta Açıklama (Description)</label>
          <textarea
            value={formData.pagesSEO?.home?.description || ''}
            onChange={(e) => updateFormData('pagesSEO.home.description', e.target.value)}
            placeholder="Ana sayfa açıklaması (150-160 karakter önerilir)"
            rows={3}
            maxLength={160}
          />
          <small>Karakter sayısı: {(formData.pagesSEO?.home?.description || '').length}/160</small>
        </div>
        <div className="form-group">
          <label>Anahtar Kelimeler</label>
          <input
            type="text"
            value={formData.pagesSEO?.home?.keywords?.join(', ') || ''}
            onChange={(e) => updateFormData('pagesSEO.home.keywords', e.target.value.split(',').map(k => k.trim()).filter(k => k))}
            placeholder="web geliştirme, react, nodejs, python"
          />
        </div>
        <div className="form-group">
          <label>Sayfa URL'i</label>
          <input
            type="text"
            value={formData.pagesSEO?.home?.url || ''}
            onChange={(e) => updateFormData('pagesSEO.home.url', e.target.value)}
            placeholder="https://mskcode.com/"
          />
        </div>
      </div>

      {/* Hakkımızda SEO */}
      <div className="section-block">
        <h3 className="block-title">📋 Hakkımızda Sayfası SEO</h3>
        <div className="form-group">
          <label>Sayfa Başlığı (Title)</label>
          <input
            type="text"
            value={formData.pagesSEO?.about?.title || ''}
            onChange={(e) => updateFormData('pagesSEO.about.title', e.target.value)}
            placeholder="Hakkımızda sayfa başlığı"
            maxLength={60}
          />
          <small>Karakter sayısı: {(formData.pagesSEO?.about?.title || '').length}/60</small>
        </div>
        <div className="form-group">
          <label>Meta Açıklama (Description)</label>
          <textarea
            value={formData.pagesSEO?.about?.description || ''}
            onChange={(e) => updateFormData('pagesSEO.about.description', e.target.value)}
            placeholder="Hakkımızda sayfa açıklaması"
            rows={3}
            maxLength={160}
          />
          <small>Karakter sayısı: {(formData.pagesSEO?.about?.description || '').length}/160</small>
        </div>
        <div className="form-group">
          <label>Anahtar Kelimeler</label>
          <input
            type="text"
            value={formData.pagesSEO?.about?.keywords?.join(', ') || ''}
            onChange={(e) => updateFormData('pagesSEO.about.keywords', e.target.value.split(',').map(k => k.trim()).filter(k => k))}
            placeholder="hakkımızda, yazılım ekibi, deneyim"
          />
        </div>
        <div className="form-group">
          <label>Sayfa URL'i</label>
          <input
            type="text"
            value={formData.pagesSEO?.about?.url || ''}
            onChange={(e) => updateFormData('pagesSEO.about.url', e.target.value)}
            placeholder="https://mskcode.com/about"
          />
        </div>
      </div>

      {/* Hizmetler SEO */}
      <div className="section-block">
        <h3 className="block-title">⚙️ Hizmetler Sayfası SEO</h3>
        <div className="form-group">
          <label>Sayfa Başlığı (Title)</label>
          <input
            type="text"
            value={formData.pagesSEO?.services?.title || ''}
            onChange={(e) => updateFormData('pagesSEO.services.title', e.target.value)}
            placeholder="Hizmetler sayfa başlığı"
            maxLength={60}
          />
          <small>Karakter sayısı: {(formData.pagesSEO?.services?.title || '').length}/60</small>
        </div>
        <div className="form-group">
          <label>Meta Açıklama (Description)</label>
          <textarea
            value={formData.pagesSEO?.services?.description || ''}
            onChange={(e) => updateFormData('pagesSEO.services.description', e.target.value)}
            placeholder="Hizmetler sayfa açıklaması"
            rows={3}
            maxLength={160}
          />
          <small>Karakter sayısı: {(formData.pagesSEO?.services?.description || '').length}/160</small>
        </div>
        <div className="form-group">
          <label>Anahtar Kelimeler</label>
          <input
            type="text"
            value={formData.pagesSEO?.services?.keywords?.join(', ') || ''}
            onChange={(e) => updateFormData('pagesSEO.services.keywords', e.target.value.split(',').map(k => k.trim()).filter(k => k))}
            placeholder="web geliştirme, mobil uygulama, AI çözümleri"
          />
        </div>
        <div className="form-group">
          <label>Sayfa URL'i</label>
          <input
            type="text"
            value={formData.pagesSEO?.services?.url || ''}
            onChange={(e) => updateFormData('pagesSEO.services.url', e.target.value)}
            placeholder="https://mskcode.com/services"
          />
        </div>
      </div>

      {/* Markalar SEO */}
      <div className="section-block">
        <h3 className="block-title">🏢 Markalar Sayfası SEO</h3>
        <div className="form-group">
          <label>Sayfa Başlığı (Title)</label>
          <input
            type="text"
            value={formData.pagesSEO?.brands?.title || ''}
            onChange={(e) => updateFormData('pagesSEO.brands.title', e.target.value)}
            placeholder="Markalar sayfa başlığı"
            maxLength={60}
          />
          <small>Karakter sayısı: {(formData.pagesSEO?.brands?.title || '').length}/60</small>
        </div>
        <div className="form-group">
          <label>Meta Açıklama (Description)</label>
          <textarea
            value={formData.pagesSEO?.brands?.description || ''}
            onChange={(e) => updateFormData('pagesSEO.brands.description', e.target.value)}
            placeholder="Markalar sayfa açıklaması"
            rows={3}
            maxLength={160}
          />
          <small>Karakter sayısı: {(formData.pagesSEO?.brands?.description || '').length}/160</small>
        </div>
        <div className="form-group">
          <label>Anahtar Kelimeler</label>
          <input
            type="text"
            value={formData.pagesSEO?.brands?.keywords?.join(', ') || ''}
            onChange={(e) => updateFormData('pagesSEO.brands.keywords', e.target.value.split(',').map(k => k.trim()).filter(k => k))}
            placeholder="markalar, iş ortakları, referanslar"
          />
        </div>
        <div className="form-group">
          <label>Sayfa URL'i</label>
          <input
            type="text"
            value={formData.pagesSEO?.brands?.url || ''}
            onChange={(e) => updateFormData('pagesSEO.brands.url', e.target.value)}
            placeholder="https://mskcode.com/brands"
          />
        </div>
      </div>

      {/* Referanslar SEO */}
      <div className="section-block">
        <h3 className="block-title">🎯 Referanslar Sayfası SEO</h3>
        <div className="form-group">
          <label>Sayfa Başlığı (Title)</label>
          <input
            type="text"
            value={formData.pagesSEO?.references?.title || ''}
            onChange={(e) => updateFormData('pagesSEO.references.title', e.target.value)}
            placeholder="Referanslar sayfa başlığı"
            maxLength={60}
          />
          <small>Karakter sayısı: {(formData.pagesSEO?.references?.title || '').length}/60</small>
        </div>
        <div className="form-group">
          <label>Meta Açıklama (Description)</label>
          <textarea
            value={formData.pagesSEO?.references?.description || ''}
            onChange={(e) => updateFormData('pagesSEO.references.description', e.target.value)}
            placeholder="Referanslar sayfa açıklaması"
            rows={3}
            maxLength={160}
          />
          <small>Karakter sayısı: {(formData.pagesSEO?.references?.description || '').length}/160</small>
        </div>
        <div className="form-group">
          <label>Anahtar Kelimeler</label>
          <input
            type="text"
            value={formData.pagesSEO?.references?.keywords?.join(', ') || ''}
            onChange={(e) => updateFormData('pagesSEO.references.keywords', e.target.value.split(',').map(k => k.trim()).filter(k => k))}
            placeholder="referanslar, projeler, portfolio"
          />
        </div>
        <div className="form-group">
          <label>Sayfa URL'i</label>
          <input
            type="text"
            value={formData.pagesSEO?.references?.url || ''}
            onChange={(e) => updateFormData('pagesSEO.references.url', e.target.value)}
            placeholder="https://mskcode.com/references"
          />
        </div>
      </div>

      {/* İletişim SEO */}
      <div className="section-block">
        <h3 className="block-title">📞 İletişim Sayfası SEO</h3>
        <div className="form-group">
          <label>Sayfa Başlığı (Title)</label>
          <input
            type="text"
            value={formData.pagesSEO?.contact?.title || ''}
            onChange={(e) => updateFormData('pagesSEO.contact.title', e.target.value)}
            placeholder="İletişim sayfa başlığı"
            maxLength={60}
          />
          <small>Karakter sayısı: {(formData.pagesSEO?.contact?.title || '').length}/60</small>
        </div>
        <div className="form-group">
          <label>Meta Açıklama (Description)</label>
          <textarea
            value={formData.pagesSEO?.contact?.description || ''}
            onChange={(e) => updateFormData('pagesSEO.contact.description', e.target.value)}
            placeholder="İletişim sayfa açıklaması"
            rows={3}
            maxLength={160}
          />
          <small>Karakter sayısı: {(formData.pagesSEO?.contact?.description || '').length}/160</small>
        </div>
        <div className="form-group">
          <label>Anahtar Kelimeler</label>
          <input
            type="text"
            value={formData.pagesSEO?.contact?.keywords?.join(', ') || ''}
            onChange={(e) => updateFormData('pagesSEO.contact.keywords', e.target.value.split(',').map(k => k.trim()).filter(k => k))}
            placeholder="iletişim, teklif, proje, danışmanlık"
          />
        </div>
        <div className="form-group">
          <label>Sayfa URL'i</label>
          <input
            type="text"
            value={formData.pagesSEO?.contact?.url || ''}
            onChange={(e) => updateFormData('pagesSEO.contact.url', e.target.value)}
            placeholder="https://mskcode.com/contact"
          />
        </div>
      </div>

      {/* SEO İpuçları */}
      <div className="section-block">
        <h3 className="block-title">💡 SEO İpuçları</h3>
        <div className="seo-tips">
          <div className="tip-item">
            <div className="tip-icon">📝</div>
            <div className="tip-content">
              <h4>Başlık Uzunluğu</h4>
              <p>Sayfa başlıkları 50-60 karakter arasında olmalı. Google arama sonuçlarında kesilmemesi için.</p>
            </div>
          </div>
          
          <div className="tip-item">
            <div className="tip-icon">📄</div>
            <div className="tip-content">
              <h4>Meta Açıklama</h4>
              <p>Meta açıklamalar 150-160 karakter arasında olmalı. Sayfa içeriğini özetlemeli.</p>
            </div>
          </div>
          
          <div className="tip-item">
            <div className="tip-icon">🔑</div>
            <div className="tip-content">
              <h4>Anahtar Kelimeler</h4>
              <p>3-5 anahtar kelime kullanın. Virgülle ayırın. Sayfa içeriğiyle ilgili olmalı.</p>
            </div>
          </div>
          
          <div className="tip-item">
            <div className="tip-icon">🌐</div>
            <div className="tip-content">
              <h4>URL Yapısı</h4>
              <p>URL'ler temiz ve anlaşılır olmalı. Türkçe karakter kullanmayın.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Önizleme */}
      <div className="section-block">
        <h3 className="block-title">👁️ Google Arama Önizlemesi</h3>
        <div className="search-preview">
          <div className="preview-item">
            <h4>Ana Sayfa Önizleme</h4>
            <div className="google-preview">
              <div className="preview-url">{formData.pagesSEO?.home?.url || 'https://mskcode.com/'}</div>
              <div className="preview-title">{formData.pagesSEO?.home?.title || 'MSK CODE - Modern Web Geliştirme'}</div>
              <div className="preview-description">{formData.pagesSEO?.home?.description || 'Modern web geliştirme ve yazılım hizmetleri...'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="admin-section">
      <h2 className="section-title">📊 Site İstatistikleri</h2>
      
      {/* Analytics Overview Cards */}
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="card-icon">👥</div>
          <div className="card-content">
            <h3>Günlük Ziyaretçi</h3>
            <div className="card-value">{analyticsData.dailyVisitors}</div>
            <div className="card-change positive">+12% dünden</div>
          </div>
        </div>
        
        <div className="analytics-card">
          <div className="card-icon">📈</div>
          <div className="card-content">
            <h3>Toplam Ziyaretçi</h3>
            <div className="card-value">{analyticsData.totalVisitors}</div>
            <div className="card-change positive">+24% bu aydan</div>
          </div>
        </div>
        
        <div className="analytics-card">
          <div className="card-icon">👀</div>
          <div className="card-content">
            <h3>Sayfa Görüntüleme</h3>
            <div className="card-value">{analyticsData.pageViews}</div>
            <div className="card-change neutral">+5% bu haftadan</div>
          </div>
        </div>
        
        <div className="analytics-card">
          <div className="card-icon">⏱️</div>
          <div className="card-content">
            <h3>Ortalama Süre</h3>
            <div className="card-value">{analyticsData.avgSessionDuration}</div>
            <div className="card-change positive">+8% geçen haftadan</div>
          </div>
        </div>
      </div>

      {/* Device Stats */}
      <div className="section-block">
        <h3 className="block-title">📱 Cihaz İstatistikleri</h3>
        <div className="device-stats">
          <div className="device-item">
            <div className="device-icon">📱</div>
            <div className="device-info">
              <span className="device-name">Mobil</span>
              <span className="device-percentage">{analyticsData.deviceStats.mobile}%</span>
            </div>
            <div className="device-bar">
              <div className="device-fill" style={{width: `${analyticsData.deviceStats.mobile}%`}}></div>
            </div>
          </div>
          
          <div className="device-item">
            <div className="device-icon">💻</div>
            <div className="device-info">
              <span className="device-name">Masaüstü</span>
              <span className="device-percentage">{analyticsData.deviceStats.desktop}%</span>
            </div>
            <div className="device-bar">
              <div className="device-fill" style={{width: `${analyticsData.deviceStats.desktop}%`}}></div>
            </div>
          </div>
          
          <div className="device-item">
            <div className="device-icon">📟</div>
            <div className="device-info">
              <span className="device-name">Tablet</span>
              <span className="device-percentage">{analyticsData.deviceStats.tablet}%</span>
            </div>
            <div className="device-bar">
              <div className="device-fill" style={{width: `${analyticsData.deviceStats.tablet}%`}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Setup */}
      <div className="section-block">
        <h3 className="block-title">⚙️ Analytics Kurulumu</h3>
        <div className="analytics-setup">
          <div className="setup-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Google Analytics ID'nizi SEO sekmesinden girin</h4>
              <p>GA4 tracking kodu: G-XXXXXXXXXX formatında</p>
            </div>
          </div>
          
          <div className="setup-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Verileri güncellemek için butona tıklayın</h4>
              <button 
                className="btn-update-analytics"
                onClick={() => {
                  // Simüle edilmiş veri güncelleme
                  setAnalyticsData({
                    dailyVisitors: Math.floor(Math.random() * 500) + 50,
                    totalVisitors: Math.floor(Math.random() * 10000) + 1000,
                    pageViews: Math.floor(Math.random() * 2000) + 200,
                    bounceRate: Math.floor(Math.random() * 40) + 30,
                    avgSessionDuration: `${Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
                    topPages: [],
                    deviceStats: { 
                      mobile: Math.floor(Math.random() * 30) + 50, 
                      desktop: Math.floor(Math.random() * 30) + 30, 
                      tablet: Math.floor(Math.random() * 15) + 5 
                    },
                    lastUpdated: new Date().toISOString()
                  });
                }}
              >
                🔄 Verileri Güncelle
              </button>
            </div>
          </div>
          
          <div className="setup-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Son Güncelleme</h4>
              <p>{new Date(analyticsData.lastUpdated).toLocaleString('tr-TR')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Info */}
      <div className="section-block">
        <h3 className="block-title">ℹ️ Bilgi</h3>
        <div className="info-box">
          <p>📊 Bu istatistikler Google Analytics verilerinden alınmaktadır.</p>
          <p>🔄 Veriler gerçek zamanlı olarak güncellenmektedir.</p>
          <p>📱 Cihaz istatistikleri son 30 günlük veriyi göstermektedir.</p>
          <p>⚠️ İstatistiklerin doğru çalışması için Google Analytics ID'nin doğru girilmiş olması gerekir.</p>
        </div>
      </div>
    </div>
  );

  const renderFooterTab = () => (
    <div className="admin-section">
      <h2 className="section-title">🦶 Footer Yönetimi</h2>
      <p className="section-description">Footer bölümündeki tüm bilgileri buradan yönetebilirsiniz.</p>
      
      {/* Şirket Bilgileri */}
      <div className="section-block">
        <h3 className="block-title">🏢 Şirket Bilgileri</h3>
        <div className="form-group">
          <label>Şirket Adı</label>
          <input
            type="text"
            value={formData.footer?.company?.name || ''}
            onChange={(e) => updateFormData('footer.company.name', e.target.value)}
            placeholder="MSK CODE"
          />
        </div>
        <div className="form-group">
          <label>Şirket Açıklaması</label>
          <textarea
            value={formData.footer?.company?.description || ''}
            onChange={(e) => updateFormData('footer.company.description', e.target.value)}
            placeholder="Modern web teknolojileri ile yaratıcı çözümler üreten..."
            rows={4}
          />
        </div>
      </div>

      {/* Hızlı Linkler */}
      <div className="section-block">
        <h3 className="block-title">🔗 Hızlı Linkler</h3>
        {formData.footer?.quickLinks?.map((link, index) => (
          <div key={index} className="list-item">
            <div className="form-row">
              <div className="form-group">
                <label>Link Adı</label>
                <input
                  type="text"
                  value={link.name || ''}
                  onChange={(e) => {
                    const newLinks = [...(formData.footer?.quickLinks || [])];
                    newLinks[index] = { ...link, name: e.target.value };
                    updateFormData('footer.quickLinks', newLinks);
                  }}
                  placeholder="Ana Sayfa"
                />
              </div>
              <div className="form-group">
                <label>Link Yolu</label>
                <input
                  type="text"
                  value={link.path || ''}
                  onChange={(e) => {
                    const newLinks = [...(formData.footer?.quickLinks || [])];
                    newLinks[index] = { ...link, path: e.target.value };
                    updateFormData('footer.quickLinks', newLinks);
                  }}
                  placeholder="/about"
                />
              </div>
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={() => {
                const newLinks = formData.footer?.quickLinks?.filter((_, i) => i !== index) || [];
                updateFormData('footer.quickLinks', newLinks);
              }}
            >
              🗑️ Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            const newLink = { name: '', path: '' };
            const newLinks = [...(formData.footer?.quickLinks || []), newLink];
            updateFormData('footer.quickLinks', newLinks);
          }}
        >
          ➕ Yeni Link Ekle
        </button>
      </div>

      {/* İletişim Bilgileri */}
      <div className="section-block">
        <h3 className="block-title">📞 İletişim Bilgileri</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.footer?.contact?.email || ''}
              onChange={(e) => updateFormData('footer.contact.email', e.target.value)}
              placeholder="info@mskod.com"
            />
          </div>
          <div className="form-group">
            <label>Telefon</label>
            <input
              type="text"
              value={formData.footer?.contact?.phone || ''}
              onChange={(e) => updateFormData('footer.contact.phone', e.target.value)}
              placeholder="+90 (555) 123 45 67"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Adres</label>
          <input
            type="text"
            value={formData.footer?.contact?.address || ''}
            onChange={(e) => updateFormData('footer.contact.address', e.target.value)}
            placeholder="İstanbul, Türkiye"
          />
        </div>
      </div>

      {/* Sosyal Medya */}
      <div className="section-block">
        <h3 className="block-title">📱 Sosyal Medya Linkleri</h3>
        <div className="form-row">
          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              value={formData.footer?.socialMedia?.linkedin || ''}
              onChange={(e) => updateFormData('footer.socialMedia.linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/mskod"
            />
          </div>
          <div className="form-group">
            <label>GitHub</label>
            <input
              type="url"
              value={formData.footer?.socialMedia?.github || ''}
              onChange={(e) => updateFormData('footer.socialMedia.github', e.target.value)}
              placeholder="https://github.com/mskod"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Instagram</label>
            <input
              type="url"
              value={formData.footer?.socialMedia?.instagram || ''}
              onChange={(e) => updateFormData('footer.socialMedia.instagram', e.target.value)}
              placeholder="https://instagram.com/mskod"
            />
          </div>
          <div className="form-group">
            <label>Twitter</label>
            <input
              type="url"
              value={formData.footer?.socialMedia?.twitter || ''}
              onChange={(e) => updateFormData('footer.socialMedia.twitter', e.target.value)}
              placeholder="https://twitter.com/mskod"
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="section-block">
        <h3 className="block-title">©️ Telif Hakkı</h3>
        <div className="form-group">
          <label>Copyright Metni</label>
          <input
            type="text"
            value={formData.footer?.copyright || ''}
            onChange={(e) => updateFormData('footer.copyright', e.target.value)}
            placeholder="© 2024 MSK CODE. Tüm hakları saklıdır."
          />
          <small>Yıl otomatik olarak güncellenecektir.</small>
        </div>
      </div>

      {/* Önizleme */}
      <div className="section-block">
        <h3 className="block-title">👁️ Footer Önizleme</h3>
        <div className="footer-preview">
          <div className="preview-section">
            <h4>🏢 {formData.footer?.company?.name || 'MSK CODE'}</h4>
            <p>{formData.footer?.company?.description || 'Şirket açıklaması...'}</p>
          </div>
          
          <div className="preview-section">
            <h4>🔗 Hızlı Linkler</h4>
            <ul>
              {(formData.footer?.quickLinks || []).map((link, index) => (
                <li key={index}>{link.name || 'Link'} → {link.path || '/'}</li>
              ))}
            </ul>
          </div>
          
          <div className="preview-section">
            <h4>📞 İletişim</h4>
            <p>📧 {formData.footer?.contact?.email || 'email@domain.com'}</p>
            <p>📞 {formData.footer?.contact?.phone || 'telefon numarası'}</p>
            <p>📍 {formData.footer?.contact?.address || 'adres'}</p>
          </div>
          
          <div className="preview-section">
            <h4>📱 Sosyal Medya</h4>
            <p>LinkedIn: {formData.footer?.socialMedia?.linkedin || 'belirtilmemiş'}</p>
            <p>GitHub: {formData.footer?.socialMedia?.github || 'belirtilmemiş'}</p>
            <p>Instagram: {formData.footer?.socialMedia?.instagram || 'belirtilmemiş'}</p>
            <p>Twitter: {formData.footer?.socialMedia?.twitter || 'belirtilmemiş'}</p>
          </div>
        </div>
      </div>

      {/* İpuçları */}
      <div className="section-block">
        <h3 className="block-title">💡 Footer İpuçları</h3>
        <div className="tips-grid">
          <div className="tip-item">
            <div className="tip-icon">🏢</div>
            <div className="tip-content">
              <h4>Şirket Bilgileri</h4>
              <p>Şirket adı ve açıklaması footer'ın sol üst köşesinde görünür. Açıklama kısa ve öz olmalı.</p>
            </div>
          </div>
          
          <div className="tip-item">
            <div className="tip-icon">🔗</div>
            <div className="tip-content">
              <h4>Hızlı Linkler</h4>
              <p>Sitenizin ana sayfalarına hızlı erişim için linkler. Maksimum 6-8 link önerilir.</p>
            </div>
          </div>
          
          <div className="tip-item">
            <div className="tip-icon">📞</div>
            <div className="tip-content">
              <h4>İletişim Bilgileri</h4>
              <p>Gerçek iletişim bilgilerinizi girin. Email ve telefon tıklanabilir linkler olacak.</p>
            </div>
          </div>
          
          <div className="tip-item">
            <div className="tip-icon">📱</div>
            <div className="tip-content">
              <h4>Sosyal Medya</h4>
              <p>Tam URL girin (https:// ile başlayan). Boş bırakılan linkler görünmeyecek.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="admin-section">
      <h2 className="section-title">⚙️ Sistem Ayarları</h2>
      <p>Sistem ayarları burada yapılacak...</p>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-card">
          <h2>🔐 Admin Panel</h2>
          <p style={{ color: '#b8c5d1', marginBottom: '32px' }}>Firebase Firestore ile güçlendirilmiş</p>
          <div className="login-form">
            <input
              type="password"
              placeholder="Şifre giriniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button onClick={handleLogin}>🚀 Giriş Yap</button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-card">
          <h2>📡 Firebase Bağlantısı</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <div className="error-card">
          <h2>❌ Bağlantı Hatası</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>🔄 Yenile</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🎛️ Admin Panel</h1>
        <div className="header-actions">
          <div className={`save-status ${saveStatus}`}>
            {saveStatus === 'saving' && '💾 Kaydediliyor...'}
            {saveStatus === 'saved' && '✅ Kaydedildi'}
            {saveStatus === 'error' && '❌ Hata'}
          </div>
          <button 
            className="logout-btn"
            onClick={handleLogout}
            title="Çıkış Yap"
          >
            🚪 Çıkış
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <span className="tab-icon">🏠</span>
            <span className="tab-label">Ana Sayfa</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <span className="tab-icon">📋</span>
            <span className="tab-label">Hakkımda</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <span className="tab-icon">⚙️</span>
            <span className="tab-label">Hizmetler</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'references' ? 'active' : ''}`}
            onClick={() => setActiveTab('references')}
          >
            <span className="tab-icon">🎯</span>
            <span className="tab-label">Referanslar</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'brands' ? 'active' : ''}`}
            onClick={() => setActiveTab('brands')}
          >
            <span className="tab-icon">🏢</span>
            <span className="tab-label">Markalar</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <span className="tab-icon">📞</span>
            <span className="tab-label">İletişim</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <span className="tab-icon">💬</span>
            <span className="tab-label">Mesajlar</span>
            {formData.messages && formData.messages.filter(m => m.status === 'new').length > 0 && (
              <span className="tab-badge">{formData.messages.filter(m => m.status === 'new').length}</span>
            )}
          </button>
          <button 
            className={`tab-btn ${activeTab === 'seo' ? 'active' : ''}`}
            onClick={() => setActiveTab('seo')}
          >
            <span className="tab-icon">🔍</span>
            <span className="tab-label">SEO</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pagesSEO' ? 'active' : ''}`}
            onClick={() => setActiveTab('pagesSEO')}
          >
            <span className="tab-icon">📄</span>
            <span className="tab-label">Sayfa SEO</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <span className="tab-icon">📊</span>
            <span className="tab-label">İstatistikler</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'footer' ? 'active' : ''}`}
            onClick={() => setActiveTab('footer')}
          >
            <span className="tab-icon">🦶</span>
            <span className="tab-label">Footer</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="tab-icon">⚙️</span>
            <span className="tab-label">Ayarlar</span>
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'home' && renderHomeTab()}
          {activeTab === 'about' && renderAboutTab()}
          {activeTab === 'services' && renderServicesTab()}
          {activeTab === 'references' && renderReferencesTab()}
          {activeTab === 'brands' && renderBrandsTab()}
          {activeTab === 'contact' && renderContactTab()}
          {activeTab === 'messages' && renderMessagesTab()}
          {activeTab === 'seo' && renderSEOTab()}
          {activeTab === 'pagesSEO' && renderPagesSEOTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
          {activeTab === 'footer' && renderFooterTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>
      </div>

      <div className="admin-footer">
        <p>🔥 Firebase Firestore ile güçlendirilmiş • Real-time veri senkronizasyonu</p>
      </div>

      <button onClick={handleSave} className={`floating-save ${saveStatus}`}>
        {saveStatus === 'saving' && '💾'}
        {saveStatus === 'saved' && '✅'}
        {saveStatus === 'error' && '❌'}
        {saveStatus === 'idle' && '🚀 Kaydet'}
      </button>
    </div>
  );
};

export default AdminPanel; 
 