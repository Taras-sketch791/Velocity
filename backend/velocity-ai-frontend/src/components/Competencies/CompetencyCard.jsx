import React from 'react';
import { useTranslation } from 'react-i18next';

const CompetencyCard = ({ iconClass, title, description, tech }) => {
  const { t } = useTranslation();

  return (
    <div className="competency-card-item">
      <div className={`competency-card-icon ${iconClass}`}>
        {iconClass.includes('ai') && '🤖'}
        {iconClass.includes('web') && '🌐'}
        {iconClass.includes('mobile') && '📱'}
        {iconClass.includes('cloud') && '☁️'}
      </div>

      <h3 className="competency-card-title">{title}</h3>
      <p className="competency-card-description">{description}</p>

      <div className="competency-tech-subtitle">
        {t('competencies.techTitle', 'Technologies')}
      </div>

      <div className="competency-tech-tags">
        {tech.map((techItem, index) => (
          <span key={index} className="competency-tech-tag">
            {techItem}
          </span>
        ))}
      </div>

      <button className="competency-card-cta">
        {t('common.viewMore', 'Learn more')}
      </button>
    </div>
  );
};

export default CompetencyCard;