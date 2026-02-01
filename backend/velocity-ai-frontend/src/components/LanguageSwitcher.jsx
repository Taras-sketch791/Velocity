import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Закрытие при клике вне dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="language-switcher" ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Кнопка открытия */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-current"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          background: 'transparent',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        <Globe size={18} />
        <span>{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <ChevronDown size={16} style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s'
        }} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="language-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '150px',
            zIndex: 1000,
            padding: '4px'
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              style={{
                padding: '10px 16px',
                background: i18n.language === lang.code ? '#f3f4f6' : 'transparent',
                border: 'none',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '6px',
                fontSize: '14px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                if (i18n.language !== lang.code) {
                  e.target.style.background = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (i18n.language !== lang.code) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '1.2em' }}>{lang.flag}</span>
              <span>{lang.name}</span>
              {i18n.language === lang.code && (
                <span style={{ marginLeft: 'auto', color: '#10b981' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;