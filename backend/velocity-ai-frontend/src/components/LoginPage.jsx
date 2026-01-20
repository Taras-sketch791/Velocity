import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // success | error
    const [loading, setLoading] = useState(false);


    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setMessageType('');


        if (formData.password !== formData.confirmPassword) {
            setMessage('Пароли не совпадают');
            setMessageType('error');
            return;
        }

        setLoading(true);

        try {
            await axios.post(`${API_URL}/api/register/`, {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });


            const loginResponse = await axios.post(`${API_URL}/api/login/`, {
                username: formData.username,
                password: formData.password,
            });

            // 3. Сохраняем токены
            localStorage.setItem('access_token', loginResponse.data.access);
            localStorage.setItem('refresh_token', loginResponse.data.refresh);

            setMessage('✅ Регистрация успешна! Вход выполнен...');
            setMessageType('success');

            // ✅ Плавная навигация
            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (err) {
            setMessageType('error');
            if (err.response?.data) {
                const errorData = err.response.data;
                const firstError = Object.values(errorData).flat()[0];
                setMessage(firstError || 'Ошибка регистрации');
            } else {
                setMessage('Сервер недоступен');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container" style={{ maxWidth: '500px', margin: '50px auto', padding: '30px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '25px' }}>Регистрация</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Логин"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd' }}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd' }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd' }}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Подтвердите пароль"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ddd' }}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    >
                        {loading ? 'Загрузка...' : 'Создать аккаунт'}
                    </button>
                </form>

                {message && (
                    <div className={`message ${messageType}`} style={{ marginTop: '15px', padding: '10px', borderRadius: '6px', color: messageType === 'error' ? 'red' : 'green', background: messageType === 'error' ? '#ffe6e6' : '#e6ffe6' }}>
                        {message}
                    </div>
                )}

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p>Уже есть аккаунт? <a href="/login" style={{ color: '#007bff' }}>Войти</a></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;