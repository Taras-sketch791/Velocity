import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { useNotification } from '../store/NotificationContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useAuth();
    const { showError, showSuccess } = useNotification();
    const navigate = useNavigate();

    // Очищаем поля при загрузке
    useEffect(() => {
        setFormData({ username: '', password: '' });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.username, formData.password);
            showSuccess('С возвращением в Velocity!');
            navigate('/');
        } catch (err) {
            showError('Неверный логин или пароль');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Вход в Velocity</h2>
                <p className="auth-subtitle">Введите свои данные для доступа к покупкам</p>

                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="input-group">
                        <label>Логин или Email</label>
                        <input
                            type="text"
                            placeholder="Ваш логин"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="input-group">
                        <label>Пароль</label>
                        <input
                            type="password"
                            placeholder="Ваш пароль"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {/* ТУТ ТА САМАЯ КРАСИВАЯ КНОПКА */}
                    <button type="submit" className="auth-btn">
                        Войти в аккаунт
                    </button>
                </form>

                <p className="auth-footer">
                    Впервые у нас? <Link to="/register">Зарегистрироваться</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;