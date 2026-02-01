import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero-main-section">
      <div className="hero-glow-container">
        <div className="glow-top" />
        <div className="glow-bottom" />
      </div>

      <div className="hero-content-container">
        <div className="hero-text-center">
          <h1 className="hero-title">
            <Trans i18nKey="hero.mainTitle">
              Создаём цифровое будущее
              <br />
              <span className="title-gradient">
                с искусственным интеллектом
              </span>
            </Trans>
          </h1>

          <p className="hero-subtitle-text">
            {t('hero.subtitleText', 'Разрабатываем intelligent веб‑системы, платформы и ботов, которые решают реальные бизнес‑задачи')}
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary-action">
              {t('common.discussProject')}
            </button>

            <button className="btn btn-secondary-action">
              {t('hero.viewCases', 'Смотреть кейсы')}
            </button>
          </div>

          <div className="hero-stats-grid">
            <Stat value="30+" label={t('hero.stats.projectsDone', 'реализованных проектов')} />
            <Stat value="2+" label={t('hero.stats.yearsExp', 'года AI‑разработки')} />
            <Stat value="100%" label={t('hero.stats.successRate', 'успешных запусков')} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat-item-new">
      <p className="stat-value">{value}</p>
      <p className="stat-label-new">{label}</p>
    </div>
  );
}