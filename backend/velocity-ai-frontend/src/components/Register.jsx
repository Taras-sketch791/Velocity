import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../api';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.errors.passwordMismatch', 'Пароли не совпадают'));
      return;
    }

    setLoading(true);

    try {
      await api.post('/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });


      const loginRes = await api.post('/login/', {
        username: formData.username,
        password: formData.password
      });

      const data = loginRes.data;
      const tokens = data.tokens || data;

      if (tokens && tokens.access) {
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
        localStorage.setItem('username', formData.username);
        window.location.href = '/';
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
      const serverError = err.response?.data;
      if (serverError) {
        if (typeof serverError === 'object') {
          // Берём первое сообщение об ошибке
          const firstKey = Object.keys(serverError)[0];
          const firstValue = serverError[firstKey];
          setError(Array.isArray(firstValue) ? firstValue[0] : firstValue);
        } else {
          setError(serverError);
        }
      } else {
        setError(t('auth.errors.serverUnavailable', 'Ошибка соединения с сервером'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{t('auth.registrationTitle', 'Регистрация')}</h2>

        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder={t('auth.placeholders.username', 'Имя пользователя')}
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder={t('auth.placeholders.email', 'Email')}
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder={t('auth.placeholders.password', 'Пароль')}
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder={t('auth.placeholders.confirmPassword', 'Подтвердите пароль')}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            style={loading ? { ...styles.button, opacity: 0.7 } : styles.button}
          >
            {loading ? t('common.loading', 'Загрузка...') : t('auth.createAccountBtn', 'Создать аккаунт')}
          </button>
        </form>

        <p style={styles.link}>
          {t('auth.alreadyHaveAccount', 'Уже есть аккаунт?')}{' '}
          <Link to="/login" style={styles.linkAnchor}>
            {t('auth.loginLink', 'Войти')}
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '100px 20px',
    display: 'flex',
    justifyContent: 'center',
    background: '#f4f7f6',
    minHeight: '100vh'
  },
  card: {
    maxWidth: '400px',
    width: '100%',
    background: '#fff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#333',
    fontSize: '1.8rem'
  },
  errorBox: {
    color: '#ef4444',
    backgroundColor: '#fee2e2',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '14px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    width: '100%'
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: '#007bff',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background 0.3s'
  },
  link: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#666'
  },
  linkAnchor: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '600'
  }
};

export default Register;