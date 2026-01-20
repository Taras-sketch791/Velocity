import React from 'react';

const CompetencyCard = ({ iconClass, title, description, tech }) => {
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

      <div className="competency-tech-subtitle">Технологии</div>
      <div className="competency-tech-tags">
        {tech.map((techItem, index) => (
          <span key={index} className="competency-tech-tag">
            {techItem}
          </span>
        ))}
      </div>

      <button className="competency-card-cta">
        Подробнее
      </button>
    </div>
  );
};

export default CompetencyCard;