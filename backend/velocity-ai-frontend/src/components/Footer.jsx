import React from 'react';
import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { Send as Telegram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-main">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand-section">
            <div className="footer-logo-box">
              <Sparkles className="logo-icon" />
              <span className="logo-text">Velocity AI</span>
            </div>
            <p className="footer-about">
              {t('footer.about')}
            </p>
          </div>

          <div className="footer-contacts-section">
            <h3 className="contacts-title">{t('footer.contact')}</h3>
            <div className="social-links">

            </div>
            <p className="footer-copyright-small">
              {t('footer.copyright', { year: currentYear })}
            </p>
          </div>
        </div>

        <div className="footer-bottom-info">
          <p>
            {t('footer.madeWithLove')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;