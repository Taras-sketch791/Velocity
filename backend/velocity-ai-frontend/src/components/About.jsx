import React, { useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
  Users, Target, Rocket, Award,
  Brain, Globe, Smartphone, ArrowRight
} from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('stats-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '50+', label: t('about.stats.projects', 'Проектов') },
    { value: '3+', label: t('about.stats.experience', 'Лет опыта') },
    { value: '99%', label: t('about.stats.clients', 'Клиентов довольны') },
    { value: '24/7', label: t('about.stats.support', 'Поддержка') },
  ];

  const features = [
    {
      icon: <Users size={32} />,
      title: t('about.features.team.title', 'Команда экспертов'),
      desc: t('about.features.team.desc', 'Senior‑разработчики, AI‑специалисты и проджект‑менеджеры с опытом работы в международных проектах.'),
      color: '#4F46E5',
    },
    {
      icon: <Target size={32} />,
      title: t('about.features.focus.title', 'Фокус на результат'),
      desc: t('about.features.focus.desc', 'Мы создаём продукты, которые приносят реальную пользу бизнесу и окупают себя.'),
      color: '#F59E0B',
    },
    {
      icon: <Rocket size={32} />,
      title: t('about.features.tech.title', 'Передовые технологии'),
      desc: t('about.features.tech.desc', 'AI/ML, блокчейн, облачные архитектуры и микросервисы — всё лучшее для ваших задач.'),
      color: '#10B981',
    },
    {
      icon: <Award size={32} />,
      title: t('about.features.quality.title', 'Гарантия качества'),
      desc: t('about.features.quality.desc', 'Code review, автотестирование и лучшие практики разработки.'),
      color: '#EF4444',
    },
  ];

  const directions = [
    {
      icon: <Brain size={40} />,
      title: t('about.directions.ai.title', 'Искусственный интеллект'),
      desc: t('about.directions.ai.desc', 'Глубокие нейронные сети и ML для автоматизации бизнеса.'),
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <Globe size={40} />,
      title: t('about.directions.web.title', 'Веб-разработка'),
      desc: t('about.directions.web.desc', 'Высоконагруженные сервисы и порталы на React, Node.js, Django.'),
      bgColor: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    },
    {
      icon: <Smartphone size={40} />,
      title: t('about.directions.mobile.title', 'Мобильные приложения'),
      desc: t('about.directions.mobile.desc', 'Нативные и кроссплатформенные решения любой сложности.'),
      bgColor: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
    },
  ];

  return (
    <section id="about" style={sectionStyle}>
      <div style={containerStyle}>
        {/* Заголовок */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <Trans i18nKey="about.title">
              О <span style={titleAccentStyle}>нас</span>
            </Trans>
          </h2>
          <p style={subtitleStyle}>
            {t('about.subtitle', 'Velocity AI — студия разработки с фокусом на искусственный интеллект и сложные программные решения.')}
          </p>
        </div>


        <div ref={statsRef} style={statsGridStyle} className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} style={statCardStyle} className="stat-card">
              <div style={statValueStyle}>{stat.value}</div>
              <div style={statLabelStyle}>{stat.label}</div>
            </div>
          ))}
        </div>


        <div style={featuresGridStyle}>
          {features.map((feature, idx) => (
            <div key={idx} style={featureCardStyle(feature.color)} className="feature-card">
              <div style={featureIconStyle(feature.color)}>{feature.icon}</div>
              <h3 style={featureTitleStyle}>{feature.title}</h3>
              <p style={featureDescStyle}>{feature.desc}</p>
            </div>
          ))}
        </div>


        <div style={directionsSectionStyle}>
          <h3 style={directionsTitleStyle}>
            {t('about.directions.title', 'Наши направления')}
          </h3>
          <div style={directionsGridStyle}>
            {directions.map((dir, idx) => (
              <div key={idx} style={directionCardStyle} className="direction-card">
                <div style={directionIconWrapperStyle(dir.bgColor)}>
                  {dir.icon}
                </div>
                <h4 style={directionCardTitleStyle}>{dir.title}</h4>
                <p style={directionDescStyle}>{dir.desc}</p>
                <div style={directionDotStyle}></div>
              </div>
            ))}
          </div>
        </div>


        <div style={ctaWrapperStyle}>
          <p style={ctaTextStyle}>
            {t('about.cta', 'Готовы воплотить вашу идею в жизнь? Давайте обсудим проект!')}
          </p>
          <a
            href="https://t.me/TarasMaxs"
            target="_blank"
            rel="noopener noreferrer"
            style={ctaButtonStyle}
            className="cta-button"
          >
            {t('common.discussProject')}
            <ArrowRight size={20} style={{ marginLeft: '8px' }} />
          </a>
        </div>
      </div>
    </section>
  );
};


const sectionStyle = {
  padding: '100px 0',
  background: '#0f172a', // тёмный фон
  color: '#fff',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '60px',
};

const titleStyle = {
  fontSize: '3rem',
  fontWeight: '800',
  marginBottom: '20px',
  color: '#fff',
};

const titleAccentStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#cbd5e1',
  maxWidth: '700px',
  margin: '0 auto',
  lineHeight: '1.7',
};


const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '30px',
  marginBottom: '80px',
};

const statCardStyle = {
  background: 'rgba(30, 41, 59, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: '30px 20px',
  textAlign: 'center',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'default',
};


const statValueStyle = {
  fontSize: '3.5rem',
  fontWeight: '800',
  color: '#4F46E5',
  lineHeight: '1.2',
  marginBottom: '8px',
};

const statLabelStyle = {
  fontSize: '1rem',
  color: '#cbd5e1',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};


const featuresGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '25px',
  marginBottom: '80px',
};

const featureCardStyle = (color) => ({
  background: '#1e293b',
  padding: '30px 20px',
  borderRadius: '20px',
  textAlign: 'center',
  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  border: '1px solid rgba(255,255,255,0.05)',
  position: 'relative',
  overflow: 'hidden',
  ':hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 20px 35px ${color}30`,
    borderColor: color,
  },
});

const featureIconStyle = (color) => ({
  width: '70px',
  height: '70px',
  margin: '0 auto 20px',
  background: `${color}20`,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: color,
  boxShadow: `0 0 20px ${color}60`,
});

const featureTitleStyle = {
  fontSize: '1.3rem',
  fontWeight: '600',
  color: '#fff',
  marginBottom: '12px',
};

const featureDescStyle = {
  fontSize: '0.95rem',
  color: '#cbd5e1',
  lineHeight: '1.6',
};

// Направления
const directionsSectionStyle = {
  marginBottom: '80px',
};

const directionsTitleStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: '50px',
  color: '#fff',
};

const directionsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '30px',
};

const directionCardStyle = {
  background: '#1e293b',
  borderRadius: '24px',
  padding: '40px 30px',
  textAlign: 'center',
  boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.05)',
  ':hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 25px 45px rgba(79, 70, 229, 0.2)',
  },
};

const directionIconWrapperStyle = (bgGradient) => ({
  width: '90px',
  height: '90px',
  margin: '0 auto 25px',
  background: bgGradient,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
});

const directionCardTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#fff',
  marginBottom: '15px',
};

const directionDescStyle = {
  fontSize: '1rem',
  color: '#cbd5e1',
  lineHeight: '1.7',
  marginBottom: '20px',
};

const directionDotStyle = {
  width: '8px',
  height: '8px',
  background: '#4F46E5',
  borderRadius: '50%',
  margin: '0 auto',
  opacity: '0.5',
};

const ctaWrapperStyle = {
  textAlign: 'center',
  background: 'rgba(30, 41, 59, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '40px',
  padding: '50px',
  border: '1px solid rgba(255,255,255,0.1)',
};

const ctaTextStyle = {
  fontSize: '1.5rem',
  color: '#fff',
  marginBottom: '30px',
  fontWeight: '500',
};

const ctaButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '16px 40px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: '#fff',
  fontSize: '1.2rem',
  fontWeight: '600',
  borderRadius: '50px',
  textDecoration: 'none',
  transition: 'transform 0.3s, box-shadow 0.3s',
  boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
  border: 'none',
  cursor: 'pointer',
  animation: 'pulse 2s infinite',
};

// Адаптивность (в реальном проекте лучше использовать media queries в CSS)
const mediaStyles = `
  @media (max-width: 992px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .features-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .directions-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 576px) {
    .stats-grid,
    .features-grid,
    .directions-grid {
      grid-template-columns: 1fr !important;
    }
    .about-title {
      font-size: 2.5rem !important;
    }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .stat-card {
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
  }
  .stats-visible .stat-card {
    opacity: 1;
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = mediaStyles;
  document.head.appendChild(styleEl);
}

export default About;