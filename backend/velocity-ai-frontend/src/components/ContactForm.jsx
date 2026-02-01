import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, DollarSign, CreditCard } from 'lucide-react';
import GeminiAIHelper from './GeminiAIHelper';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation();

  const TELEGRAM_BOT_TOKEN = '8556181877:AAHdPJjCmLjXuNg7adnb-BRiOqAZKjUfgaE';
  const TELEGRAM_CHAT_ID = '5478197533';

  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'ai-development',
    budget: '',
    paymentSystem: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAISuggestionInsert = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      message: prev.message + (prev.message ? '\n\n' : '') + '🤖 AI-рекомендации:\n' + suggestion
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const text = `
🚀 **${t('contact.telegram.newApplication', 'Новая заявка с сайта!')}**
👤 **${t('contact.telegram.name', 'Имя')}:** ${formData.name}
📧 **Email:** ${formData.email}
${t('contact.telegram.type', 'Тип')}: ${formData.projectType}
💰 **${t('contact.telegram.budget', 'Бюджет')}:** ${formData.budget || t('contact.telegram.notSpecified', 'Не указан')}
💳 **${t('contact.telegram.paymentSystem', 'Платежная система')}:** ${formData.paymentSystem || t('contact.telegram.notChosen', 'Не выбрана')}
📝 **${t('contact.telegram.description', 'Описание')}:** ${formData.message}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: 'ai-development', budget: '', paymentSystem: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ padding: '80px 20px', background: '#f8fafc' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px', textAlign: 'center' }}>{t('contact.title')}</h2>
        <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '30px' }}>
          {t('contact.subtitle')}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <input
              type="text"
              name="name"
              placeholder={t('contact.name')}
              required
              value={formData.name}
              onChange={handleChange}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
            <input
              type="email"
              name="email"
              placeholder={t('contact.email')}
              required
              value={formData.email}
              onChange={handleChange}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ position: 'relative' }}>
              <DollarSign size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#94a3b8' }} />
              <input
                type="text"
                name="budget"
                placeholder={t('contact.budget')}
                value={formData.budget}
                onChange={handleChange}
                style={{ padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <CreditCard size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#94a3b8' }} />
              <select
                name="paymentSystem"
                value={formData.paymentSystem}
                onChange={handleChange}
                style={{ padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #ddd', width: '100%', appearance: 'none', background: '#fff' }}
              >
                <option value="">{t('contact.paymentMethod')}</option>
                <option value="Crypto">{t('contact.paymentOptions.crypto', 'Криптовалюта (USDT/BTC)')}</option>
                <option value="Stripe">{t('contact.paymentOptions.stripe', 'Stripe / Карта мира')}</option>
                <option value="Bank">{t('contact.paymentOptions.bank', 'Банковский перевод')}</option>
              </select>
            </div>
          </div>

          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff' }}
          >
            <option value="ai-development">{t('contact.projectTypes.aiDevelopment', 'AI Разработка')}</option>
            <option value="web-app">{t('contact.projectTypes.webApp', 'Веб-приложение')}</option>
            <option value="mobile-app">{t('contact.projectTypes.mobileApp', 'Мобильное приложение')}</option>
            <option value="consulting">{t('contact.projectTypes.consulting', 'Консалтинг')}</option>
          </select>

          <textarea
            name="message"
            rows="5"
            placeholder={t('contact.projectDescription')}
            required
            value={formData.message}
            onChange={handleChange}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }}
          ></textarea>

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '15px',
              background: status === 'success' ? '#22c55e' : '#4F46E5',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              border: 'none',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {status === 'loading' ? <Loader2 className="animate-spin" /> : status === 'success' ? <CheckCircle /> : <Send />}
            {status === 'loading' ? t('contact.sending') : status === 'success' ? t('contact.success') : t('contact.send')}
          </button>

          {status === 'error' && <p style={{ color: '#ef4444', textAlign: 'center' }}>{t('contact.error', 'Ошибка при отправке. Попробуйте снова.')}</p>}
        </form>
      </div>

      <GeminiAIHelper
        onSuggestionInsert={handleAISuggestionInsert}
        currentMessage={formData.message}
      />
    </section>
  );
};

export default ContactForm;