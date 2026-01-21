import React, { useState, useMemo } from 'react';

const mockProjects = [
  {
    id: 1,
    title: "Платформа для реферального маркентинга",
    description: "Автоматизированная система управления реферальными программами с Ai-аналитикой",
    fullDescription: "Система на основе глубокого обучения, которая обрабатывает 80% входящих запросов без участия человека.",
    color: '#8B5CF6',
    status: 'live',
    isLarge: true,
    categories: ['ai', 'bot'],
    tags: ['Flask', 'WB API', 'FastAPI', 'AI Analytics'],
    link: 'https://reflow-sales.ru/',
    metrics: [], // Исправлено: массив должен быть определен
    features: [] // Исправлено: массив должен быть определен
  },
  {
    id: 2,
    title: "Ассистент Gemini",
    description: "Упрощенный AI-ассистент для быстрых ответов и автоматизации рутинных задач",
    fullDescription: "Математическая модель, разработанная для повышения точности прогнозов до 95%.",
    color: '#F59E0B',
    status: 'demo',
    isLarge: false,
    categories: ['ai', 'data'],
    tags: ['Gemini API', 'Python', 'Telegram Interface'],
    link: 'https://t.me/gemini_assistent_bot',
    metrics: [], // Исправлено: массив должен быть определен
    features: [
      "Прогнозирование временных рядов",
      "Визуализация данных",
      "Отчетность в реальном времени"
    ]
  },
  {
    id: 3,
    title: "Платформа для психологов",
    description: "Комплексное решение для ведения практики с Ai-помощником и системой записи",
    fullDescription: "Система на основе глубокого обучения, которая обрабатывает 80% входящих запросов без участия человека.",
    color: '#8B5CF6',
    status: 'live',
    isLarge: true,
    categories: ['ai', 'bot'],
    tags: ['Flask', 'PostgreeSQL', 'NLP'],
    link: 'https://psycho-passport.ru/',
    metrics: [], // Исправлено: массив должен быть определен
    features: [] // Исправлено: массив должен быть определен
  },
  {
    id: 4,
    title: "Бот для настроек криптошлюзов",
    description: "Автоматизированный бот для управления криптовалютными платежными шлюзами",
    fullDescription: "Система на основе глубокого обучения, которая обрабатывает 80% входящих запросов без участия человека.",
    color: '#8B5CF6',
    status: 'live',
    isLarge: true,
    categories: ['ai', 'bot'],
    tags: ['Telegram Bot', 'Blockchain', 'Aiogram'],
    link: 'https://t.me/ralavadabot',
    metrics: [], // Исправлено: массив должен быть определен
    features: [] // Исправлено: массив должен быть определен
  }
];

const mockFilters = [
  { id: 'all', label: 'Все проекты' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'bot', label: 'Чат-боты' },
  { id: 'data', label: 'Аналитика' }
];


const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  // Логика фильтрации
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return mockProjects;
    }
    return mockProjects.filter(project =>
      project.categories.includes(activeFilter)
    );
  }, [activeFilter]);

  const filters = mockFilters;

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">
            Наши <span className="projects-title-gradient">проекты</span>
          </h2>
          <p className="projects-subtitle">
            Реализованные решения для различных бизнес-задач с использованием AI
          </p>
        </div>

        <div className="projects-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`} // Исправлено: использованы обратные кавычки
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Сетка проектов */}
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className={`project-card ${project.isLarge ? 'project-card-large' : ''}`} // Исправлено: использованы обратные кавычки
            >
              <div className="project-preview" style={{ background: project.color }}>
                <div className={`project-status project-status-${project.status}`}>
                  {project.status === 'live' ? 'Live' : project.status === 'demo' ? 'Demo' : 'В разработке'}
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-metrics">
                  {project.metrics && project.metrics.map((metric, index) => (
                    <div key={index} className="project-metric">
                      <div className="project-metric-value">{metric.value}</div>
                      <div className="project-metric-label">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="project-actions">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-primary"
                  >
                    {project.categories.includes('bot') ? 'Попробовать →' : 'Посмотреть →'}
                  </a>
                  <button
                    className="project-btn"
                    onClick={() => setActiveProject(project)}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <p className="projects-cta-text">Хотите реализовать похожий проект?</p>
          <a
            href="https://t.me/TarasMaxs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Обсудить проект
          </a>
        </div>
      </div>

      {/* Модальное окно */}
      {activeProject && (
        <div className="project-modal-overlay" onClick={() => setActiveProject(null)}>
          <div className="project-modal" onClick={e => e.stopPropagation()}>
            <button
              className="project-modal-close"
              onClick={() => setActiveProject(null)}
            >
              ×
            </button>

            <div className="project-modal-header">
              <h2 className="project-modal-title">{activeProject.title}</h2>
              <p className="project-modal-subtitle">{activeProject.fullDescription}</p>
            </div>

            <div className="project-modal-content">
              <div>
                <h3>Основные функции</h3>
                <ul className="project-modal-features">
                  {activeProject.features && activeProject.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>Результаты</h3>
                <div className="project-modal-results">
                  {activeProject.metrics && activeProject.metrics.map((metric, index) => (
                    <div key={index} className="project-modal-result">
                      <span className="project-modal-result-label">{metric.label}</span>
                      <span className="project-modal-result-value">{metric.value}</span>
                    </div>
                  ))}
                </div>

                <h3>Технологии</h3>
                <div className="project-modal-technologies">
                  {activeProject.tags.map((tech, index) => (
                    <span key={index} className="project-modal-tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="project-modal-actions">
              <a
                href={activeProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {activeProject.categories.includes('bot') ? 'Попробовать проект' : 'Посмотреть проект'}
              </a>
              <a
                href="https://t.me/TarasMaxs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Обсудить похожий проект
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;