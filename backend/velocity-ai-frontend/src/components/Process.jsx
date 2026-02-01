import React from 'react';
import { Search, Layers, Code, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Process = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: '01',
      title: t('process.analysis'),
      description: t('process.analysisDescription'),
      icon: <Search className="process-icon" />
    },
    {
      number: '02',
      title: t('process.prototyping'),
      description: t('process.prototypingDescription'),
      icon: <Layers className="process-icon" />
    },
    {
      number: '03',
      title: t('process.development'),
      description: t('process.developmentDescription'),
      icon: <Code className="process-icon" />
    },
    {
      number: '04',
      title: t('process.launch'),
      description: t('process.launchDescription'),
      icon: <Rocket className="process-icon" />
    }
  ];

  return (
    <section id="process" className="process-section">
      <div className="process-container">
        <h2 className="section-title-process">{t('process.title')}</h2>

        <div className="process-grid">
          {steps.map((step, index) => (
            <div key={index} className="process-step-wrapper">
              <div className="process-card">
                <div className="process-number-badge-wrapper">
                  <div className="process-number-badge">
                    {step.number}
                  </div>
                </div>

                <div className="process-card-content">
                  <div className="process-icon-box">
                    {step.icon}
                  </div>

                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-description">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;