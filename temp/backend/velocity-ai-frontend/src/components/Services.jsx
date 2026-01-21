import React from 'react';
import { Bot, Cpu, Globe, Smartphone, Database, Cloud } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Bot className="service-icon-main" />,
      title: "AI Разработка",
      description: "Создание и внедрение нейросетей, машинное обучение и обработка естественного языка.",
      classModifier: "service-purple"
    },
    {
      icon: <Cpu className="service-icon-main" />,
      title: "Интеллектуальные системы",
      description: "Разработка сложных систем с искусственным интеллектом для анализа данных.",
      classModifier: "service-blue"
    },
    {
      icon: <Globe className="service-icon-main" />,
      title: "Веб-решения",
      description: "Современные веб-приложения на React, Next.js с интеграцией AI.",
      classModifier: "service-green"
    },
    {
      icon: <Smartphone className="service-icon-main" />,
      title: "Мобильные приложения",
      description: "Кроссплатформенные приложения с использованием AI-функций.",
      classModifier: "service-red"
    },
    {
      icon: <Database className="service-icon-main" />,
      title: "Анализ данных",
      description: "Обработка больших данных, аналитика и визуализация.",
      classModifier: "service-yellow"
    },
    {
      icon: <Cloud className="service-icon-main" />,
      title: "Облачные решения",
      description: "Развертывание AI-моделей в облаке, микросервисная архитектура.",
      classModifier: "service-indigo"
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">
            Наши <span className="services-title-accent">услуги</span>
          </h2>
          <p className="services-subtitle">
            Предоставляем полный спектр услуг в области искусственного интеллекта и разработки ПО
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card-item ${service.classModifier}`}
            >
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-card-title">
                {service.title}
              </h3>
              <p className="service-card-description">
                {service.description}
              </p>
              <button className={`service-link ${service.classModifier}`}>
                Узнать больше →
              </button>
            </div>
          ))}
        </div>

        <div className="services-cta-wrapper">
          <button className="services-cta-button">
            Обсудить ваш проект
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;