import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import { useNotification } from './NotificationContext';
import { getAccessToken, setTokens, removeTokens } from '../api/tokenService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { showSuccess, showError } = useNotification();

    const fetchProfile = async () => {
        try {
            const res = await api.get('profile/');
            setUser(res.data);
        } catch (err) {
            setUser(null);
            removeTokens(); // токен невалиден – чистим хранилище
        }
    };

    const login = async (username, password) => {
        try {
            const res = await api.post('token/', { username, password });
            const { access, refresh } = res.data;
            setTokens(access, refresh);
            await fetchProfile();
            showSuccess('Добро пожаловать!');
            return true;
        } catch (err) {
            showError('Ошибка входа. Проверьте логин и пароль.');
            return false;
        }
    };

    const logout = () => {
        removeTokens();
        setUser(null);
        showSuccess('Вы вышли из системы');
    };

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
            fetchProfile();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, fetchProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};