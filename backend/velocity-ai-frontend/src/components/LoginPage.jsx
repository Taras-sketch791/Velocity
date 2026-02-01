import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/login/`, formData);
            if (response.data.access) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                navigate('/'); // Используем navigate вместо window.location
            }
        } catch (err) {
            setError(t('auth.errors.invalidCredentials'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page" style={{ padding: '100px 20px', display: 'flex', justifyContent: 'center' }}>
            <div className="auth-card" style={{ maxWidth: '400px', width: '100%', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{t('auth.loginTitle')}</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="text"
                        name="username"
                        placeholder={t('auth.placeholders.username')}
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder={t('auth.placeholders.password')}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                    />
                    {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                    <button type="submit" disabled={loading} style={{ padding: '12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                        {loading ? t('auth.loggingIn') : t('auth.loginBtn')}
                    </button>
                </form>

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
                    {t('auth.noAccount')} <a href="/register" style={{ color: '#007bff' }}>{t('auth.registerLink')}</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;