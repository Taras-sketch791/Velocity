// src/components/Competencies/CompetencyCard.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const CompetencyCard = ({ id, iconClass, title, description, tech, price, addToCart }) => {
  const { t } = useTranslation();

  const handleAddToCart = () => {
    addToCart({ id, title, price });
  };

  return (
    <div className="competency-card-item" style={cardStyle}> {/* Добавили style */}
      <div className={`competency-card-icon ${iconClass}`}>
        {iconClass.includes('ai') && '🤖'}
        {iconClass.includes('web') && '🌐'}
        {iconClass.includes('mobile') && '📱'}
        {iconClass.includes('cloud') && '☁️'}
      </div>

      <h3 className="competency-card-title">{title}</h3>
      <p className="competency-card-description" style={descriptionStyle}> {/* Можно добавить flex-grow */}
        {description}
      </p>

      <div className="competency-tech-subtitle">
        {t('competencies.techTitle', 'Technologies')}
      </div>

      <div className="competency-tech-tags" style={techTagsStyle}>
        {tech.map((techItem, index) => (
          <span key={index} className="competency-tech-tag">
            {techItem}
          </span>
        ))}
      </div>

      {/* Блок цены */}
      <div style={priceContainerStyle}>
        <span style={priceLabelStyle}>{t('catalog.from', 'от')}</span>
        <span style={priceValueStyle}>{price.toLocaleString()} ₽</span>
      </div>

      <button
        className="btn btn-primary"
        style={{ width: '100%', marginTop: 'auto' }} // marginTop: auto сработает благодаря flex
        onClick={handleAddToCart}
      >
        {t('catalog.addToCart', 'В корзину')}
      </button>
    </div>
  );
};

// Стили для flex-контейнера карточки
const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // чтобы карточка занимала всю высоту ячейки сетки
  // Остальные стили (фон, границы, отступы) лучше оставить в CSS-классе competency-card-item
};

// Если нужно, чтобы описание или блок с технологиями расширялись, можно добавить:
const descriptionStyle = {
  flexGrow: 1, // будет занимать оставшееся пространство (но тогда кнопка всё равно внизу)
  marginBottom: '10px' // небольшой отступ
};

const techTagsStyle = {
  marginBottom: '10px' // чтобы не прилипало к цене
};

// Остальные стили (priceContainerStyle, priceLabelStyle, priceValueStyle) оставляем как есть
const priceContainerStyle = {
  margin: '20px 0 10px',
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
  borderTop: '1px solid #eee',
  paddingTop: '15px'
};

const priceLabelStyle = { fontSize: '14px', color: '#666' };
const priceValueStyle = { fontSize: '22px', fontWeight: '800', color: '#333' };

export default CompetencyCard;