import React from 'react';
import { useTranslation } from 'react-i18next';
import CompetencyCard from './CompetencyCard';

const Competencies = () => {
  const { t } = useTranslation();

  const competenciesData = [
    {
      id: 'ai',
      iconClass: 'competency-card__icon--ai',
      title: t('competencies.items.ai.title'),
      description: t('competencies.items.ai.description'),
      tech: ['Python', 'TensorFlow', 'PyTorch', 'Keras', 'API'],
    },
    {
      id: 'web',
      iconClass: 'competency-card__icon--web',
      title: t('competencies.items.web.title'),
      description: t('competencies.items.web.description'),
      tech: ['React', 'Vue.js', 'Node.js', 'Flask', 'Django'],
    },
    {
      id: 'mobile',
      iconClass: 'competency-card__icon--mobile',
      title: t('competencies.items.mobile.title'),
      description: t('competencies.items.mobile.description'),
      tech: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    },
    {
      id: 'cloud',
      iconClass: 'competency-card__icon--cloud',
      title: t('competencies.items.cloud.title'),
      description: t('competencies.items.cloud.description'),
      tech: ['AWS', 'Docker', 'Kubernetes', 'Redis'],
    },
  ];

  return (
    <section id="competencies" className="competencies">
      <div className="container">
        <h2 className="section-title">{t('nav.competencies')}</h2>
        <div className="competencies__grid">
          {competenciesData.map((c) => (
            <CompetencyCard key={c.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Competencies;