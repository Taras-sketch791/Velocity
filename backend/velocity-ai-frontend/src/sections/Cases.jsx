import React, { useState, useEffect } from 'react';
import { fetchCases } from '../api/api';

const CaseCard = ({ caseItem }) => (
    <a href={caseItem.link || '#'} className={`case-card case-card--link ${!caseItem.link ? 'not-clickable' : ''}`} target="_blank" rel="noopener noreferrer">
        {/* Использование динамического CSS класса из Django */}
        <div className={`case-card__image ${caseItem.image_class}`}></div>
        <div className="case-card__content">
            <h3 className="case-card__title">{caseItem.title}</h3>
            <p className="case-card__description">{caseItem.description}</p>
            <div className="case-card__tags">
                {/* Маппинг по тегам */}
                {caseItem.tags.map((tag, index) => (
                    <span key={index} className="case-card__tag">{tag.tag_name}</span>
                ))}
            </div>
        </div>
    </a>
);

const Cases = () => {
    const [cases, setCases] = useState([]);
    // ... (useEffect и логика загрузки) ...

    return (
        <section id="cases" className="cases">
            <div className="container">
                <h2 className="section-title">Реализованные проекты</h2>
                {/* ... (Состояние загрузки) ... */}
                <div className="cases__grid">
                    {cases.map(caseItem => (
                        <CaseCard key={caseItem.id} caseItem={caseItem} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Cases;