import React, { useContext } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
  Bot, Cpu, Globe, Smartphone, Database, Cloud,
  Brain, Eye, MessageSquare, Shield, Gauge, Sparkles
} from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Catalog = () => {
  const { t } = useTranslation();
  const { addToCart } = useContext(CartContext);

  const services = [
    {
      id: 1,
      icon: <Bot className="service-icon-main" />,
      title: t('services.aiDevelopment'),
      description: t('services.aiDescription'),
      price: 150000,
      classModifier: "service-purple"
    },
    {
      id: 2,
      icon: <Cpu className="service-icon-main" />,
      title: t('services.intelligentSystems'),
      description: t('services.intelligentDescription'),
      price: 250000,
      classModifier: "service-blue"
    },
    {
      id: 3,
      icon: <Globe className="service-icon-main" />,
      title: t('services.webSolutions'),
      description: t('services.webDescription'),
      price: 80000,
      classModifier: "service-green"
    },
    {
      id: 4,
      icon: <Smartphone className="service-icon-main" />,
      title: t('services.mobileApps'),
      description: t('services.mobileDescription'),
      price: 120000,
      classModifier: "service-red"
    },
    {
      id: 5,
      icon: <Database className="service-icon-main" />,
      title: t('services.dataAnalysis'),
      description: t('services.dataDescription'),
      price: 90000,
      classModifier: "service-yellow"
    },
    {
      id: 6,
      icon: <Cloud className="service-icon-main" />,
      title: t('services.cloudSolutions'),
      description: t('services.cloudDescription'),
      price: 200000,
      classModifier: "service-indigo"
    },
    {
      id: 7,
      icon: <MessageSquare className="service-icon-main" />,
      title: t('services.chatbots'),
      description: t('services.chatbotsDescription'),
      price: 100000,
      classModifier: "service-teal"
    },
    {
      id: 8,
      icon: <Eye className="service-icon-main" />,
      title: t('services.computerVision'),
      description: t('services.computerVisionDescription'),
      price: 220000,
      classModifier: "service-orange"
    },
    {
      id: 9,
      icon: <Brain className="service-icon-main" />,
      title: t('services.nlp'),
      description: t('services.nlpDescription'),
      price: 180000,
      classModifier: "service-pink"
    },
    {
      id: 10,
      icon: <Gauge className="service-icon-main" />,
      title: t('services.recommenderSystems'),
      description: t('services.recommenderDescription'),
      price: 140000,
      classModifier: "service-cyan"
    },
    {
      id: 11,
      icon: <Shield className="service-icon-main" />,
      title: t('services.aiSecurity'),
      description: t('services.aiSecurityDescription'),
      price: 190000,
      classModifier: "service-amber"
    },
    {
      id: 12,
      icon: <Sparkles className="service-icon-main" />,
      title: t('services.mlops'),
      description: t('services.mlopsDescription'),
      price: 210000,
      classModifier: "service-lime"
    }
  ];

  return (
    <section id="catalog" className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">
            <Trans i18nKey="catalog.title">
              Каталог <span className="services-title-accent">услуг</span>
            </Trans>
          </h2>
          <p className="services-subtitle">
            {t('services.subtitle', 'Выберите подходящее решение для вашего бизнеса и добавьте в корзину для расчета стоимости')}
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card-item ${service.classModifier}`}
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>

              <div style={priceContainerStyle}>
                <span style={priceLabelStyle}>{t('catalog.from', 'от')}</span>
                <span style={priceValueStyle}>{service.price.toLocaleString()} ₽</span>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 'auto' }}
                onClick={() => addToCart(service)}
              >
                {t('catalog.addToCart', 'В корзину')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const priceContainerStyle = {
  margin: '20px 0',
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
  borderTop: '1px solid #eee',
  paddingTop: '15px'
};

const priceLabelStyle = { fontSize: '14px', color: '#666' };
const priceValueStyle = { fontSize: '22px', fontWeight: '800', color: '#333' };

export default Catalog;