import React from 'react';
import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { Send as Telegram } from 'lucide-react';

const Footer = () => {
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
              Создаём будущее с помощью искусственного интеллекта.
              Профессиональный подход и инновационные решения.
            </p>
          </div>

          <div className="footer-contacts-section">
            <h3 className="contacts-title">Свяжитесь с нами</h3>
            <div className="social-links">
              <a
                href="https://t.me/TarasMaxs"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item telegram"
                aria-label="Telegram"
              >
                <Telegram className="social-icon" /> {/* Здесь название остается тем же */}
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item github"
                aria-label="GitHub"
              >
                <Github className="social-icon" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item linkedin"
                aria-label="LinkedIn"
              >
                <Linkedin className="social-icon" />
              </a>
              <a
                href="mailto:contact@velocity-ai.com"
                className="social-link-item mail"
                aria-label="Email"
              >
                <Mail className="social-icon" />
              </a>
            </div>
            <p className="footer-copyright-small">
              © {currentYear} Velocity AI. Все права защищены.
            </p>
          </div>
        </div>

        <div className="footer-bottom-info">
          <p>
            Сделано с ❤️ для цифрового будущего
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;