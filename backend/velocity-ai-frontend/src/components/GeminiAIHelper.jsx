import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, X, Loader2 } from 'lucide-react';

const GeminiAIHelper = ({ onSuggestionInsert, currentMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const scrollRef = useRef(null);

  const quickPrompts = ["Сформулируй ТЗ", "Выбери стек", "Архитектура"];

  useEffect(() => {
    if (aiResponse) {
      setDisplayedText('');
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + (aiResponse[index] || ''));
        index++;
        if (index >= aiResponse.length) clearInterval(interval);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [aiResponse]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedText]);

  // --- ЛОГИКА ГЕНЕРАЦИИ ТЗ НА ОСНОВЕ ТЕКСТА ---
  const generateProTZ = (input) => {
    const text = input.toLowerCase();

    // Интеллектуальное определение функционала
    const features = [];
    if (text.includes("вход") || text.includes("личный") || text.includes("профиль")) features.push("Система аккаунтов и профилей");
    if (text.includes("магазин") || text.includes("оплат") || text.includes("карт")) features.push("E-commerce модуль и эквайринг");
    if (text.includes("ai") || text.includes("ии") || text.includes("бот")) features.push("Интеграция нейросетевых моделей");
    if (text.includes("админ") || text.includes("панель")) features.push("Панель управления (Admin Dashboard)");

    return `📄 **ПРОФЕССИОНАЛЬНОЕ ТЗ**
--------------------------------
**Проект:** ${input.substring(0, 30)}...
**Тип:** Индивидуальная разработка

**1. Основной функционал:**
${features.length > 0 ? features.map(f => `✅ ${f}`).join('\n') : '✅ Базовый функционал MVP\n✅ Адаптивная верстка'}

**2. Технологические требования:**
• Фронтенд: React.js (для высокой производительности)
• Бэкенд: Django / FastAPI (для безопасности данных)
• База данных: PostgreSQL + Redis для кэширования

**3. Этапы реализации:**
1. Проектирование и UX-дизайн (1 нед.)
2. Разработка ядра и API (2-3 нед.)
3. QA Тестирование и запуск (1 нед.)

*Сгенерировано Velocity AI. Нажмите "Вставить", чтобы добавить в заявку.*`;
  };

  const calculatePrice = async () => {
    if (!currentMessage || currentMessage.length < 10) {
      setAiResponse("⚠️ Сначала опишите проект в форме, чтобы я мог рассчитать бюджет.");
      return;
    }
    setIsGenerating(true);
    setAiResponse('');
    try {
      await new Promise(r => setTimeout(r, 1200));
      const text = currentMessage.toLowerCase();
      let price = 1200;
      if (text.includes("ai") || text.includes("ии")) price += 2000;
      if (text.includes("магазин") || text.includes("оплата")) price += 1500;
      setAiResponse(`💰 **Предварительная оценка:**\n\nДиапазон: **$${Math.round(price * 0.9)} — $${Math.round(price * 1.3)}**\nСрок: **от 25 рабочих дней**.`);
    } finally { setIsGenerating(false); }
  };

  const generateAIResponse = async (type) => {
    if (isGenerating) return;
    setIsGenerating(true);
    setAiResponse('');

    try {
      await new Promise(r => setTimeout(r, 1000));

      if (type === "Сформулируй ТЗ") {
        if (!currentMessage || currentMessage.length < 10) {
          setAiResponse("🤖 Опишите суть проекта в форме слева, и я составлю по нему профессиональное ТЗ.");
        } else {
          setAiResponse(generateProTZ(currentMessage));
        }
      } else if (type === "Выбери стек") {
        setAiResponse("🛠 **Рекомендованный стек:**\n\n• **Frontend:** React + Tailwind CSS\n• **Backend:** Django (Python)\n• **Инфраструктура:** Docker + Nginx");
      } else {
        setAiResponse("Я готов помочь! Нажмите 'Сформулируй ТЗ', чтобы я проанализировал вашу идею.");
      }
    } finally { setIsGenerating(false); }
  };

  const handleInsertToForm = () => {
    if (aiResponse) {
      onSuggestionInsert(aiResponse);
      setIsOpen(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#4F46E5', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 8px 25px rgba(79, 70, 229, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Bot size={30} />
        </button>
      ) : (
        <div style={{ width: '380px', background: '#fff', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0' }}>
          <div style={{ padding: '20px', background: '#4F46E5', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={20} />
              <span style={{ fontWeight: '600' }}>AI Консультант</span>
            </div>
            <X size={20} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
          </div>

          <div ref={scrollRef} style={{ height: '300px', padding: '20px', overflowY: 'auto', background: '#f8fafc' }}>
            {isGenerating ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '40px' }}>
                <Loader2 className="animate-spin" color="#4F46E5" />
                <span style={{ color: '#64748b', fontSize: '14px' }}>Анализирую ваш проект...</span>
              </div>
            ) : (
              <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', color: '#334155', lineHeight: '1.5' }}>
                {displayedText || "Привет! Я помогу превратить вашу идею в четкое ТЗ и рассчитаю примерную стоимость. Опишите проект в форме!"}
              </div>
            )}
          </div>

          <div style={{ padding: '15px', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              {quickPrompts.map(p => (
                <button key={p} onClick={() => generateAIResponse(p)} style={{ fontSize: '11px', padding: '5px 12px', borderRadius: '20px', border: '1px solid #4F46E5', background: '#fff', color: '#4F46E5', cursor: 'pointer', fontWeight: '500' }}>{p}</button>
              ))}
              <button onClick={calculatePrice} style={{ fontSize: '11px', padding: '5px 12px', borderRadius: '20px', border: 'none', background: '#DCFCE7', color: '#166534', cursor: 'pointer', fontWeight: 'bold' }}>💵 Расчет цены</button>
            </div>

            {displayedText && !isGenerating && (
              <button onClick={handleInsertToForm} style={{ width: '100%', padding: '12px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}>
                Вставить в форму заявки
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAIHelper;