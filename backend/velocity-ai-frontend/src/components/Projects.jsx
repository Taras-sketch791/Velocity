import React, { useState, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const mockProjects = [
  {
    id: 1,
    titleKey: "projects.items.referral.title",
    descKey: "projects.items.referral.desc",
    fullDescKey: "projects.items.referral.fullDesc",
    color: '#8B5CF6',
    status: 'live',
    isLarge: true,
    categories: ['ai', 'bot'],
    tags: ['Flask', 'WB API', 'FastAPI', 'AI Analytics'],
    link: 'https://reflow-sales.ru/',
    metrics: [],
    features: []
  },
  {
    id: 2,
    titleKey: "projects.items.gemini.title",
    descKey: "projects.items.gemini.desc",
    fullDescKey: "projects.items.gemini.fullDesc",
    color: '#F59E0B',
    status: 'demo',
    isLarge: false,
    categories: ['ai', 'data'],
    tags: ['Gemini API', 'Python', 'Telegram Interface'],
    link: 'https://t.me/gemini_assistent_bot',
    metrics: [],
    features: [
      "projects.items.gemini.feature1",
      "projects.items.gemini.feature2",
      "projects.items.gemini.feature3"
    ]
  },
  {
    id: 3,
    titleKey: "projects.items.psycho.title",
    descKey: "projects.items.psycho.desc",
    fullDescKey: "projects.items.psycho.fullDesc",
    color: '#8B5CF6',
    status: 'live',
    isLarge: true,
    categories: ['ai', 'bot'],
    tags: ['Flask', 'PostgreeSQL', 'NLP'],
    link: 'https://psycho-passport.ru/',
    metrics: [],
    features: []
  },
  {
    id: 4,
    titleKey: "projects.items.crypto.title",
    descKey: "projects.items.crypto.desc",
    fullDescKey: "projects.items.crypto.fullDesc",
    color: '#8B5CF6',
    status: 'live',
    isLarge: true,
    categories: ['ai', 'bot'],
    tags: ['Telegram Bot', 'Blockchain', 'Aiogram'],
    link: 'https://t.me/ralavadabot',
    metrics: [],
    features: []
  }
];

const Projects = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const mockFilters = [
    { id: 'all', label: t('projects.all') },
    { id: 'ai', label: t('projects.ai') },
    { id: 'bot', label: t('projects.bot') },
    { id: 'data', label: t('projects.data') }
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return mockProjects;
    return mockProjects.filter(project => project.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">
            <Trans i18nKey="projects.title">
              Наши <span className="projects-title-gradient">проекты</span>
            </Trans>
          </h2>
          <p className="projects-subtitle">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="projects-filters">
          {mockFilters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className={`project-card ${project.isLarge ? 'project-card-large' : ''}`}>
              <div className="project-preview" style={{ background: project.color }}>
                <div className={`project-status project-status-${project.status}`}>
                  {project.status === 'live' ? 'Live' : project.status === 'demo' ? 'Demo' : t('projects.inDevelopment')}
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{t(project.titleKey)}</h3>
                <p className="project-description">{t(project.descKey)}</p>

                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-primary">
                    {project.categories.includes('bot') ? t('projects.tryProject') : t('projects.viewProject')}
                  </a>
                  <button className="project-btn" onClick={() => setActiveProject(project)}>
                    {t('projects.details')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <p className="projects-cta-text">{t('projects.cta')}</p>
          <a href="https://t.me/TarasMaxs" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {t('common.discussProject')}
          </a>
        </div>
      </div>

      {activeProject && (
        <div className="project-modal-overlay" onClick={() => setActiveProject(null)}>
          <div className="project-modal" onClick={e => e.stopPropagation()}>
            <button className="project-modal-close" onClick={() => setActiveProject(null)}>×</button>

            <div className="project-modal-header">
              <h2 className="project-modal-title">{t(activeProject.titleKey)}</h2>
              <p className="project-modal-subtitle">{t(activeProject.fullDescKey)}</p>
            </div>

            <div className="project-modal-content">
              <div>
                <h3>{t('projects.mainFeatures')}</h3>
                <ul className="project-modal-features">
                  {activeProject.features && activeProject.features.map((featureKey, index) => (
                    <li key={index}>{t(featureKey)}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{t('projects.technologies')}</h3>
                <div className="project-modal-technologies">
                  {activeProject.tags.map((tech, index) => (
                    <span key={index} className="project-modal-tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="project-modal-actions">
              <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {activeProject.categories.includes('bot') ? t('projects.tryProject') : t('projects.viewProject')}
              </a>
              <a href="https://t.me/TarasMaxs" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                {t('common.discussProject')}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
