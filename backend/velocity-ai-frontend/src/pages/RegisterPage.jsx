import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../store/AuthContext';
import { useNotification } from '../store/NotificationContext';

const RegisterPage = () => {
    // ОБНОВЛЕНО: Добавлены first_name и last_name
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });

    const { login } = useAuth();
    const { showError, showSuccess } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            username: '',
            email: '',
            password: '',
            first_name: '',
            last_name: ''
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Создаем аккаунт (теперь с именем и фамилией)
            await api.post('register/', formData);
            showSuccess('Аккаунт создан! Входим...');

            // 2. Сразу логинимся (используем логин и пароль из формы)
            await login(formData.username, formData.password);

            // 3. Улетаем на главную
            navigate('/');
        } catch (err) {
            showError('Ошибка регистрации. Возможно, логин уже занят.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Регистрация</h2>
                <p className="auth-subtitle">Присоединяйтесь к Velocity сегодня</p>

                <form onSubmit={handleSubmit} autoComplete="off">
                    {/* НОВОЕ ПОЛЕ: ИМЯ */}
                    <div className="input-group">
                        <label>Имя</label>
                        <input
                            type="text"
                            placeholder="Введите ваше имя"
                            value={formData.first_name}
                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                            autoComplete="new-password"
                        />
                    </div>

                    {/* НОВОЕ ПОЛЕ: ФАМИЛИЯ */}
                    <div className="input-group">
                        <label>Фамилия</label>
                        <input
                            type="text"
                            placeholder="Введите вашу фамилию"
                            value={formData.last_name}
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="input-group">
                        <label>Логин</label>
                        <input
                            type="text"
                            placeholder="Придумайте логин"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="input-group">
                        <label>Ваш Email</label>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="input-group">
                        <label>Пароль</label>
                        <input
                            type="password"
                            placeholder="Минимум 6 символов"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className="auth-btn">
                        Создать аккаунт и войти
                    </button>
                </form>

                <p className="auth-footer">
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;