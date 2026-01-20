import React from 'react';
import { Search, Layers, Code, Rocket } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Анализ',
      description: 'Погружаемся в бизнес-процессы, изучаем цели и формируем техническое задание',
      icon: <Search className="process-icon" />
    },
    {
      number: '02',
      title: 'Прототипирование',
      description: 'Создаём интерфейсы и архитектуру решения, утверждаем с клиентом',
      icon: <Layers className="process-icon" />
    },
    {
      number: '03',
      title: 'Разработка',
      description: 'Реализуем проект по agile-методологии с регулярными демонстрациями',
      icon: <Code className="process-icon" />
    },
    {
      number: '04',
      title: 'Запуск',
      description: 'Развёртываем систему, обучаем пользователей и обеспечиваем поддержку',
      icon: <Rocket className="process-icon" />
    }
  ];

  return (
    <section id="process" className="process-section">
      <div className="process-container">
        <h2 className="section-title-process">Как мы работаем</h2>
        {/*

[Image of the software development life cycle]
 */}

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