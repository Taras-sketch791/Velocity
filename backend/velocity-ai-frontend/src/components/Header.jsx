import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem('access_token'));
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navLinks = [
    { id: 'hero', label: t('nav.home') },
    { id: 'services', label: t('nav.services') },
    { id: 'process', label: t('nav.process') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'competencies', label: t('nav.competencies') },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleAuthClick = () => {
    if (isAuth) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsAuth(false);
      navigate('/');
      window.location.reload();
    } else {
      navigate('/register');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">Velocity</Link>

        <nav className={`nav ${isMobile ? 'mobile-hidden' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <LanguageSwitcher />

          {/* 🔥 ТА ЖЕ КНОПКА, ЧТО "ОБСУДИТЬ ПРОЕКТ" */}
          <button
            className="btn btn-primary"
            onClick={handleAuthClick}
          >
            {isAuth ? t('auth.logout') : t('auth.registerLink')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
