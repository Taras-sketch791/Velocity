import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bot, Sparkles, X, Send, MessageCircle } from 'lucide-react';

export default function HeroSection() {
  const { t } = useTranslation();
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-tag">
          <span className="tag-dot"></span>
          {t('hero.tag', 'AI Revolution')}

          <div className="gemini-ai-helper">
            <button className="gemini-toggle-btn" onClick={() => setIsAiOpen(true)}>
              <Bot size={16} />
              AI Agent
            </button>
          </div>
        </div>

        <h1 className="hero-title">
          {t('hero.mainTitleLine1', 'Создаём цифровое будущее')}
          <span className="gradient-text">
             <br /> {t('hero.mainTitleLine2', 'с искусственным интеллектом')}
          </span>
        </h1>

        <p className="hero-subtitle">
          {t('hero.subtitleText', 'Разрабатываем интеллектуальные системы, которые решают реальные бизнес-задачи')}
        </p>

        <div className="hero-buttons">
          <button className="btn btn-primary">{t('common.discussProject')}</button>

          <a href="https://t.me/TarasMaxs" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <MessageCircle size={18} />
            Telegram
          </a>
        </div>

        <div className="stats">
          <div className="stat-item">
            <p className="stat-number">30+</p>
            <p className="stat-label">{t('hero.stats.projectsDone')}</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">2+</p>
            <p className="stat-label">{t('hero.stats.yearsExp')}</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">100%</p>
            <p className="stat-label">{t('hero.stats.successRate')}</p>
          </div>
        </div>
      </div>

      {isAiOpen && (
        <div className="gemini-modal-overlay">
          <div className="gemini-modal">
            <div className="gemini-header">
              <div className="gemini-header-left">
                <Sparkles />
                <span>Velocity AI Assistant</span>
              </div>
              <button className="gemini-close-btn" onClick={() => setIsAiOpen(false)}><X /></button>
            </div>
            <div className="gemini-content">
              <div className="ai-placeholder">Задайте вопрос нашему ИИ агенту...</div>
              <div className="gemini-input-form">
                <input type="text" className="gemini-input" placeholder="Напишите сообщение..." />
                <button className="gemini-send-btn"><Send size={20} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}