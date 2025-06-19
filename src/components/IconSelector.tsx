import React, { useState } from 'react';

interface IconSelectorProps {
  value: string;
  onChange: (iconType: string, iconValue: string) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'emoji' | 'svg'>('svg');

  const svgIcons = [
    { id: 'web', name: 'Web Development', svg: 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 10.1 9.9 11 11 11V22H13V11C14.1 11 15 10.1 15 9ZM5 12H7V22H5V12ZM19 12H21V22H19V12Z' },
    { id: 'mobile', name: 'Mobile Development', svg: 'M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21C5,22.11 5.89,23 7,23H17C18.11,23 19,22.11 19,21V3C19,1.89 18.11,1 17,1Z' },
    { id: 'ai', name: 'AI Solutions', svg: 'M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z' },
    { id: 'cloud', name: 'Cloud Services', svg: 'M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04Z' },
    { id: 'database', name: 'Database', svg: 'M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z' },
    { id: 'security', name: 'Security', svg: 'M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z' },
    { id: 'analytics', name: 'Analytics', svg: 'M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z' },
    { id: 'design', name: 'Design', svg: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,15.4L16.2,16.2Z' },
    { id: 'ecommerce', name: 'E-Commerce', svg: 'M17,18C17.55,18 18,18.45 18,19A1,1 0 0,1 17,20A1,1 0 0,1 16,19C16,18.45 16.45,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5H5.21L4.27,3H1M7,18C7.55,18 8,18.45 8,19A1,1 0 0,1 7,20A1,1 0 0,1 6,19C6,18.45 6.45,18 7,18Z' },
    { id: 'consulting', name: 'Consulting', svg: 'M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z' }
  ];

  const emojiIcons = [
    '🌐', '📱', '🤖', '☁️', '🔧', '💻', '🎨', '📊', '🔒', '⚡', '🚀', '💡',
    '🛡️', '📈', '🎯', '⭐', '💎', '🔮', '🎪', '🌟', '🔥', '💫', '✨', '🎨'
  ];

  const getCurrentIcon = () => {
    if (value.startsWith('svg:')) {
      const iconId = value.replace('svg:', '');
      const svgIcon = svgIcons.find(icon => icon.id === iconId);
      return {
        type: 'svg' as const,
        display: svgIcon ? (
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
            <path d={svgIcon.svg} />
          </svg>
        ) : '❓'
      };
    }
    return {
      type: 'emoji' as const,
      display: value || '❓'
    };
  };

  const selectIcon = (iconType: 'emoji' | 'svg', iconValue: string) => {
    const newValue = iconType === 'svg' ? `svg:${iconValue}` : iconValue;
    onChange(iconType, newValue);
    setIsOpen(false);
  };

  const currentIcon = getCurrentIcon();

  return (
    <div className="icon-selector">
      <div className="icon-selector-current" onClick={() => setIsOpen(!isOpen)}>
        <div className="icon-preview">
          {currentIcon.display}
        </div>
        <span className="icon-selector-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="icon-selector-dropdown">
          <div className="icon-type-tabs">
            <button 
              className={`icon-type-tab ${selectedType === 'svg' ? 'active' : ''}`}
              onClick={() => setSelectedType('svg')}
            >
              SVG İkonlar
            </button>
            <button 
              className={`icon-type-tab ${selectedType === 'emoji' ? 'active' : ''}`}
              onClick={() => setSelectedType('emoji')}
            >
              Emoji İkonlar
            </button>
          </div>

          <div className="icon-grid">
            {selectedType === 'svg' ? (
              svgIcons.map((icon) => (
                <div
                  key={icon.id}
                  className={`icon-option ${value === `svg:${icon.id}` ? 'selected' : ''}`}
                  onClick={() => selectIcon('svg', icon.id)}
                  title={icon.name}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d={icon.svg} />
                  </svg>
                </div>
              ))
            ) : (
              emojiIcons.map((emoji, index) => (
                <div
                  key={index}
                  className={`icon-option ${value === emoji ? 'selected' : ''}`}
                  onClick={() => selectIcon('emoji', emoji)}
                >
                  {emoji}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconSelector; 