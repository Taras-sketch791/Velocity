import React from 'react';
import CompetencyCard from './CompetencyCard';

const competenciesData = [
  {
    iconClass: 'competency-card__icon--ai',
    title: 'Искусственный интеллект',
    description: 'Машинное обучение, компьютерное зрение, NLP, генеративные AI модели',
    tech: ['Python', 'TensorFlow', 'PyTorch', 'Keras', 'API'],
  },
  {
    iconClass: 'competency-card__icon--web',
    title: 'Веб-разработка',
    description: 'Современные фреймворки, прогрессивные веб-приложения, серверная архитектура',
    tech: ['React', 'Vue.js', 'Node.js', 'Flask', 'Django'],
  },
  {
    iconClass: 'competency-card__icon--mobile',
    title: 'Мобильная разработка',
    description: 'Кроссплатформенные и нативные приложения с интеграцией AI-сервисов',
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    iconClass: 'competency-card__icon--cloud',
    title: 'Облачные решения',
    description: 'Масштабируемая инфраструктура, микросервисная архитектура, DevOps',
    tech: ['AWS', 'Docker', 'Kubernetes', 'Redis'],
  },
];

const Competencies = () => (
  <section id="competencies" className="competencies">
    <div className="container">
      <h2 className="section-title">Наши компетенции</h2>
      <div className="competencies__grid">
        {competenciesData.map((c) => (
          <CompetencyCard key={c.title} {...c} />
        ))}
      </div>
    </div>
  </section>
);

export default Competencies;
