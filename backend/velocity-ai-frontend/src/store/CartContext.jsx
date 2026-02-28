// src/store/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const { showSuccess, showError, showInfo } = useNotification();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    // Загружаем все товары для информации
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('products/');
                setProducts(response.data);
                console.log('📦 Загружено товаров с бэкенда:', response.data.length);
            } catch (error) {
                console.error('❌ Ошибка загрузки товаров:', error);
            }
        };
        fetchProducts();
    }, []);

    // Загрузка корзины с сервера
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            const localCart = localStorage.getItem('local_cart');
            if (localCart) {
                try {
                    const parsedCart = JSON.parse(localCart);
                    setCartItems(parsedCart);
                    console.log('📦 Загружена локальная корзина:', parsedCart.length, 'товаров');
                } catch (e) {
                    console.error('Ошибка парсинга localStorage:', e);
                    setCartItems([]);
                }
            }
        }
    }, [user]);

    // Сохранение локальной корзины
    useEffect(() => {
        if (!user && cartItems.length > 0) {
            localStorage.setItem('local_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, user]);

    const fetchCart = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const response = await api.get('cart/');
            setCartItems(response.data);
            console.log('✅ Корзина загружена:', response.data.length, 'товаров');
        } catch (error) {
            console.error('❌ Ошибка загрузки корзины:', error.response?.data || error.message);
            if (error.response?.status === 404) {
                console.log('⚠️ Эндпоинт cart/ не найден, проверьте бэкенд');
            }
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        // Конвертируем в число
        const productIdNum = Number(productId);

        if (!user) {
            // Локальная корзина
            const existingItem = cartItems.find(item => item.product === productIdNum);

            if (existingItem) {
                const updatedCart = cartItems.map(item =>
                    item.product === productIdNum
                        ? { ...item, quantity: (item.quantity || 1) + quantity }
                        : item
                );
                setCartItems(updatedCart);
                showInfo('Товар добавлен в корзину');
            } else {
                // Пытаемся найти информацию о товаре
                const productDetails = products.find(p => p.id === productIdNum);

                const newItem = {
                    id: Date.now(),
                    product: productIdNum,
                    quantity: quantity,
                    product_details: productDetails || null
                };
                setCartItems([...cartItems, newItem]);
                showInfo('Товар добавлен в корзину');
            }
            return;
        }

        // Отправка на сервер для авторизованных
        try {
            setLoading(true);
            console.log('📤 Отправка запроса на cart/ с product:', productIdNum);

            const response = await api.post('cart/', {
                product: productIdNum,
                quantity: quantity
            });

            console.log('✅ Ответ от сервера:', response.data);
            await fetchCart();
            showSuccess('Товар добавлен в корзину');
        } catch (error) {
            console.error('❌ Ошибка при добавлении в корзину:', error);

            if (error.response) {
                console.log('Статус ошибки:', error.response.status);
                console.log('Данные ошибки:', error.response.data);

                if (error.response.status === 401) {
                    showError('Необходимо авторизоваться');
                } else if (error.response.status === 404) {
                    // Проверяем, может быть товар не существует в бэкенде
                    if (error.response.data?.detail === 'Товар не найден') {
                        showError('Товар не найден в базе данных');
                    } else {
                        showError('Эндпоинт корзины не найден');
                    }
                } else if (error.response.status === 400) {
                    const errorMsg = error.response.data?.detail ||
                                    error.response.data?.product ||
                                    'Ошибка при добавлении';
                    showError(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
                } else {
                    showError('Ошибка сервера');
                }
            } else if (error.request) {
                showError('Сервер не отвечает');
            } else {
                showError('Ошибка при отправке запроса');
            }
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        if (!user) {
            const updatedCart = cartItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            );
            setCartItems(updatedCart);
            return;
        }

        try {
            setLoading(true);
            await api.patch(`cart/${itemId}/`, { quantity: newQuantity });
            await fetchCart();
            showSuccess('Количество обновлено');
        } catch (error) {
            console.error('❌ Ошибка обновления:', error);
            showError('Не удалось изменить количество');
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        if (!user) {
            setCartItems(prev => prev.filter(item => item.id !== itemId));
            showInfo('Товар удалён из корзины');
            return;
        }

        try {
            setLoading(true);
            await api.delete(`cart/${itemId}/`);
            await fetchCart();
            showInfo('Товар удалён из корзины');
        } catch (error) {
            console.error('❌ Ошибка удаления:', error);
            showError('Не удалось удалить товар');
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        if (!user) {
            setCartItems([]);
            localStorage.removeItem('local_cart');
            showInfo('Корзина очищена');
            return;
        }

        try {
            setLoading(true);
            // Удаляем все товары по одному
            for (const item of cartItems) {
                await api.delete(`cart/${item.id}/`);
            }
            await fetchCart();
            showInfo('Корзина очищена');
        } catch (error) {
            console.error('❌ Ошибка очистки корзины:', error);
            showError('Ошибка при очистке корзины');
        } finally {
            setLoading(false);
        }
    };

    // Синхронизация локальной корзины при авторизации
    useEffect(() => {
        const syncLocalCart = async () => {
            if (user) {
                const localCart = localStorage.getItem('local_cart');
                if (localCart && localCart !== '[]') {
                    try {
                        const items = JSON.parse(localCart);
                        console.log('🔄 Синхронизация корзины:', items.length, 'товаров');

                        for (const item of items) {
                            try {
                                await api.post('cart/', {
                                    product: item.product,
                                    quantity: item.quantity
                                });
                            } catch (error) {
                                console.error('Ошибка синхронизации товара:', error);
                            }
                        }
                        localStorage.removeItem('local_cart');
                        await fetchCart();
                    } catch (e) {
                        console.error('Ошибка парсинга localStorage:', e);
                    }
                }
            }
        };

        syncLocalCart();
    }, [user]);

    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            fetchCart,
            products
        }}>
            {children}
        </CartContext.Provider>
    );
};