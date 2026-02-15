import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Попытка 1: отправка JSON (самый распространённый вариант)
    try {
      const response = await api.post('/login/', {
        username: formData.username,
        email: formData.username,   // на случай, если бэкенд ожидает email
        password: formData.password
      });
      handleResponse(response);
      return; // успех – выходим
    } catch (err) {
      // Если сервер вернул 401, возможно, он ожидает form-urlencoded (стандартная Django-аутентификация)
      if (err.response && err.response.status === 401) {
        console.warn('JSON не сработал, пробуем form-urlencoded...');
        try {
          const formBody = new URLSearchParams();
          formBody.append('username', formData.username);
          formBody.append('password', formData.password);
          // Добавим CSRF-токен, если он есть в куках (для сессий)
          const csrfToken = document.cookie.split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];

          const response2 = await api.post('/login/', formBody, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              ...(csrfToken && { 'X-CSRFToken': csrfToken })
            }
          });
          handleResponse(response2);
          return; // успех
        } catch (err2) {
          handleError(err2); // обе попытки провалились
        }
      } else {
        handleError(err); // ошибка не 401 – показываем
      }
    } finally {
      setLoading(false);
    }
  };

  // Обработка успешного ответа (извлечение токенов)
  const handleResponse = (response) => {
    const data = response.data;
    console.log('Ответ сервера:', data);

    const accessToken = data?.access || data?.token || data?.tokens?.access;
    const refreshToken = data?.refresh || data?.tokens?.refresh;

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
      // Сохраняем имя пользователя (если есть)
      localStorage.setItem('username', data?.user?.username || formData.username);
      // Перезагружаем страницу, чтобы обновить состояние приложения
      window.location.href = '/';
    } else {
      setError('Неверный ответ сервера: отсутствует токен доступа');
    }
  };

  // Обработка ошибок
  const handleError = (err) => {
    console.error('Ошибка при логине:', err);

    if (err.response) {
      console.error('Данные ответа сервера:', err.response.data);
      console.error('Статус:', err.response.status);
      console.log('Полный ответ сервера:', JSON.stringify(err.response.data, null, 2));

      let errorMsg = 'Ошибка сервера. Попробуйте позже.';
      if (err.response.status === 401) {
        const data = err.response.data;
        // Сервер может вернуть ошибку в разных полях
        errorMsg = data?.detail || data?.message || data?.error || data?.non_field_errors?.[0] || 'Неверный логин или пароль';
      } else if (err.response.status >= 500) {
        errorMsg = 'Внутренняя ошибка сервера. Попробуйте позже.';
      }
      setError(errorMsg);
    } else if (err.request) {
      setError('Сервер не отвечает. Проверьте соединение.');
    } else {
      setError('Ошибка при отправке запроса.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Вход в Velocity</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Логин или Email"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <p style={styles.link}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '100px 20px', display: 'flex', justifyContent: 'center', background: '#f4f7f6', minHeight: '100vh' },
  card: { maxWidth: '400px', width: '100%', background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' },
  title: { textAlign: 'center', marginBottom: '25px', color: '#333' },
  error: { color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' },
  button: { padding: '12px', borderRadius: '8px', border: 'none', background: '#007bff', color: '#fff', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  link: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' },
};

export default LoginPage;