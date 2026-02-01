import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage(t('auth.errors.passwordMismatch'));
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      // 1. Регистрация
      await axios.post(`${API_URL}/api/register/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      // 2. Автоматический вход после регистрации
      const loginResponse = await axios.post(`${API_URL}/api/login/`, {
        username: formData.username,
        password: formData.password
      });

      localStorage.setItem('access_token', loginResponse.data.access);
      localStorage.setItem('refresh_token', loginResponse.data.refresh);

      setMessageType('success');
      setMessage(t('auth.success.registered'));

      setTimeout(() => {
        navigate('/'); // Переход на главную
      }, 1500);

    } catch (err) {
      setMessageType('error');
      if (err.response?.data) {
        const errorData = err.response.data;
        // Извлекаем первую ошибку из ответа сервера
        const firstError = Object.values(errorData).flat()[0];
        setMessage(firstError || t('auth.errors.registrationFailed'));
      } else {
        setMessage(t('auth.errors.serverUnavailable'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className="auth-card" style={{ maxWidth: '450px', width: '100%', background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>{t('auth.registrationTitle')}</h1>
          <p style={{ color: '#666' }}>Velocity AI Studio</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <input
              type="text"
              placeholder={t('auth.placeholders.username')}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder={t('auth.placeholders.email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder={t('auth.placeholders.password')}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder={t('auth.placeholders.confirmPassword')}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <button type="submit" disabled={loading} style={{ padding: '14px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
            {loading ? t('common.loading') : t('auth.createAccountBtn')}
          </button>
        </form>

        {message && (
          <div style={{ marginTop: '20px', padding: '10px', borderRadius: '8px', textAlign: 'center', backgroundColor: messageType === 'error' ? '#fff1f0' : '#f6ffed', color: messageType === 'error' ? '#cf1322' : '#389e0d', border: `1px solid ${messageType === 'error' ? '#ffa39e' : '#b7eb8f'}` }}>
            {message}
          </div>
        )}

        <div style={{ marginTop: '25px', textAlign: 'center' }}>
          <p>{t('auth.alreadyHaveAccount')} <a href="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '500' }}>{t('auth.loginLink')}</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;