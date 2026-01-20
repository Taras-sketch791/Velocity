import React from 'react';

const Hero = () => {
  const telegramUsername = '@TarasMaxs';
  const telegramUrl = `https://t.me/TarasMaxs`;

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-tag">
          <span className="tag-dot"></span>
          <span>🚀 Мы создаем AI будущее</span>
        </div>

        <h1 className="hero-title">
          <span className="gradient-text">Velocity</span>
          <br />
          AI Development Studio
        </h1>

        <p className="hero-subtitle">
          Создаём инновационные продукты на основе искусственного интеллекта,
          которые решают реальные бизнес-задачи и меняют мир к лучшему
        </p>

        <div className="hero-buttons">
          <a
            href={telegramUrl}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Обсудить проект в Telegram"
          >
            🚀 Обсудить проект
          </a>
          <a
            href="#projects"
            className="btn btn-secondary"
          >
            Смотреть кейсы
          </a>
        </div>
        <div className="stats">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Проектов</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99%</div>
            <div className="stat-label">Довольных клиентов</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3+</div>
            <div className="stat-label">Года опыта</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Поддержка</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;