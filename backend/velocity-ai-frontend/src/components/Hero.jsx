import React from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const telegramUrl = `https://t.me/TarasMaxs`;

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-tag">
          <span className="tag-dot"></span>
          <span>🚀 {t('hero.tagline', 'We create AI future')}</span>
        </div>

        <h1 className="hero-title">
          <span className="gradient-text">Velocity</span>
          <br />
          {t('hero.title', 'AI Development Studio')}
        </h1>

        <p className="hero-subtitle">
          {t('hero.subtitle')}
        </p>

        <div className="hero-buttons">
          <a
            href={telegramUrl}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 {t('common.discussProject')}
          </a>
          <a href="#projects" className="btn btn-secondary">
            {t('hero.viewCases')}
          </a>
        </div>

        <div className="stats">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">{t('hero.stats.projects')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99%</div>
            <div className="stat-label">{t('hero.stats.clients')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3+</div>
            <div className="stat-label">{t('hero.stats.experience')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">{t('hero.stats.support')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;