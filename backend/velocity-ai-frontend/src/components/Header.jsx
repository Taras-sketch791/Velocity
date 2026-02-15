import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useContext(CartContext);

  const [isMobile, setIsMobile] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const savedUsername = localStorage.getItem('username');
    if (token) {
      setIsAuth(true);
      if (savedUsername && savedUsername !== "undefined" && savedUsername !== "null") {
        setUsername(savedUsername);
      } else {
        setUsername('');
      }
    } else {
      setIsAuth(false);
      setUsername('');
    }
  }, [location]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navLinks = [
    { id: 'catalog', label: t('nav.services'), isAnchor: true },
    { id: 'about', label: t('nav.about'), isAnchor: false },
    { id: 'projects', label: t('nav.projects'), isAnchor: true },
  ];

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthClick = () => {
    if (isAuth) {
      localStorage.clear();
      setIsAuth(false);
      setUsername('');
      navigate('/');
      window.location.reload();
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          Velocity
        </Link>

        <nav className={`nav ${isMobile ? 'mobile-hidden' : ''}`}>
          {navLinks.map(link => {
            if (link.isAnchor) {
              return (
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
              );
            } else {
              return (
                <Link key={link.id} to={`/${link.id}`}>
                  {link.label}
                </Link>
              );
            }
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {isAuth && (
            <button
              className="btn btn-secondary"
              style={compactBtnStyle}
              onClick={() => navigate('/profile')}
            >
              {t('profile.title', 'Профиль')}
            </button>
          )}

          <button
            className="btn btn-cart"
            style={compactBtnStyle}
            onClick={() => navigate('/cart')}
          >
            {t('cart.title', 'Корзина')} ({cart ? cart.length : 0})
          </button>

          <LanguageSwitcher />

          <div style={authBlockStyle}>
            <button
              className="btn btn-primary"
              onClick={handleAuthClick}
              style={compactBtnStyle}
            >
              {isAuth ? t('auth.logout') : t('auth.login', 'Войти')}
            </button>
            {isAuth && (
              <span style={usernameUnderLogoutStyle}>
                {username || t('auth.user', 'Пользователь')}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const compactBtnStyle = {
  padding: '8px 12px',
  fontSize: '14px'
};

const authBlockStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '4px'
};

const usernameUnderLogoutStyle = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#007bff',
  whiteSpace: 'nowrap'
};

export default Header;