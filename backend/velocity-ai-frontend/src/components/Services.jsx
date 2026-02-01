import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Bot, Cpu, Globe, Smartphone, Database, Cloud } from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Bot className="service-icon-main" />,
      title: t('services.aiDevelopment'),
      description: t('services.aiDescription'),
      classModifier: "service-purple"
    },
    {
      icon: <Cpu className="service-icon-main" />,
      title: t('services.intelligentSystems'),
      description: t('services.intelligentDescription'),
      classModifier: "service-blue"
    },
    {
      icon: <Globe className="service-icon-main" />,
      title: t('services.webSolutions'),
      description: t('services.webDescription'),
      classModifier: "service-green"
    },
    {
      icon: <Smartphone className="service-icon-main" />,
      title: t('services.mobileApps'),
      description: t('services.mobileDescription'),
      classModifier: "service-red"
    },
    {
      icon: <Database className="service-icon-main" />,
      title: t('services.dataAnalysis'),
      description: t('services.dataDescription'),
      classModifier: "service-yellow"
    },
    {
      icon: <Cloud className="service-icon-main" />,
      title: t('services.cloudSolutions'),
      description: t('services.cloudDescription'),
      classModifier: "service-indigo"
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">
            {/* Используем Trans для обработки <1></1> из JSON */}
            <Trans i18nKey="services.title">
              Наши <span className="services-title-accent">услуги</span>
            </Trans>
          </h2>
          <p className="services-subtitle">
            {t('services.subtitle')}
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
                {t('common.viewMore')}
              </button>
            </div>
          ))}
        </div>

        <div className="services-cta-wrapper">
          <button className="services-cta-button">
            {t('common.discussProject')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;