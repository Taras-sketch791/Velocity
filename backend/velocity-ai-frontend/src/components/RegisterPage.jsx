import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');


    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

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

      // 3. Сохраняем токены и имя пользователя
      // Проверяем наличие токенов в ответе (структура зависит от вашего бэкенда)
      const data = loginRes.data;
      const tokens = data.tokens || data; // на случай если токены приходят в корне

      if (tokens && tokens.access) {
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);

        // СОХРАНЯЕМ ИМЯ: чтобы оно сразу подхватилось в Header.jsx
        localStorage.setItem('username', formData.username);

        // ПЕРЕХОДИМ НА ГЛАВНУЮ: используем href для полной перезагрузки состояния приложения
        window.location.href = '/';
      } else {
        // Если регистрация прошла, но логин не вернул токены
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
      const serverError = err.response?.data;

      // Вывод ошибки от сервера (обработка разных форматов ответа)
      if (serverError) {
        if (typeof serverError === 'object') {
          setError(Object.values(serverError)[0]);
        } else {
          setError(serverError);
        }
      } else {
        setError('Ошибка соединения с сервером');
      }
    }
  };

  return (
    <div style={{ padding: '100px 20px', display: 'flex', justifyContent: 'center', background: '#f4f7f6', minHeight: '100vh' }}>
      <div style={{ maxWidth: '400px', width: '100%', background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Регистрация</h2>

        {error && (
          <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            name="username"
            placeholder="Имя пользователя"
            value={formData.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Создать аккаунт
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Уже есть аккаунт? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '600' }}>Войти</Link>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '14px',
  outline: 'none',
  width: '100%'
};

const buttonStyle = {
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
};

export default RegisterPage;