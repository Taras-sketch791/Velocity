// src/pages/CartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../store/CartContext';
import { useAuth } from '../store/AuthContext';
import { useNotification } from '../store/NotificationContext';
import { Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';

const CartPage = () => {
    const { cartItems, fetchCart, updateQuantity, removeFromCart } = useCart();
    const { user } = useAuth();
    const { showSuccess, showError, showInfo } = useNotification();
    const navigate = useNavigate();

    // Безопасное вычисление total
    const total = Array.isArray(cartItems) ? cartItems.reduce(
        (sum, item) => {
            const price = item?.product_details?.discount_price || 0;
            const quantity = item?.quantity || 0;
            return sum + price * quantity;
        },
        0
    ) : 0;

    const handleUpdateQuantity = async (id, newQuantity) => {
        if (newQuantity < 1) return;
        await updateQuantity(id, newQuantity);
    };

    const handleRemoveFromCart = async (id) => {
        await removeFromCart(id);
    };

    const handleCheckout = async () => {
        if (!user) {
            showError('Пожалуйста, войдите в систему');
            navigate('/login');
            return;
        }

        if (!cartItems || cartItems.length === 0) {
            showInfo('Корзина пуста');
            return;
        }

        try {
            await api.post('orders/');
            showSuccess('Заказ успешно оформлен!');
            await fetchCart(); // Обновляем корзину после оформления заказа
        } catch (err) {
            console.error(err.response?.data);
            showError('Ошибка при оформлении заказа');
        }
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <ShoppingBag size={64} color="#ccc" style={{ marginBottom: '20px' }} />
                <h2>Корзина пуста</h2>
                <p>Но это легко исправить!</p>
                <button
                    onClick={() => navigate('/')}
                    className="add-to-cart"
                    style={{ width: '200px', margin: '20px auto' }}
                >
                    Перейти к покупкам
                </button>
            </div>
        );
    }

    return (
        <div className="container cart-page">
            <h2 style={{ margin: '30px 0' }}>Моя корзина</h2>

            <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                {/* СПИСОК ТОВАРОВ */}
                <div style={{ flex: 1, background: 'white', borderRadius: '12px', padding: '20px' }}>
                    {cartItems.map(item => (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '15px 0',
                                borderBottom: '1px solid #eee',
                                gap: '20px'
                            }}
                        >
                            <img
                                src={item?.product_details?.image || '/placeholder.jpg'}
                                alt={item?.product_details?.title || 'Товар'}
                                style={{
                                    width: '80px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                }}
                            />

                            <div style={{ flex: 1 }}>
                                <b style={{ fontSize: '18px' }}>
                                    {item?.product_details?.brand || 'Бренд'}
                                </b>
                                <p style={{ color: '#666', margin: '5px 0' }}>
                                    {item?.product_details?.title || 'Название товара'}
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                    <button
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                        style={{ background: 'none', border: '1px solid #ddd', borderRadius: '4px', padding: '5px', cursor: 'pointer' }}
                                    >
                                        <Minus size={16} />
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                        style={{ background: 'none', border: '1px solid #ddd', borderRadius: '4px', padding: '5px', cursor: 'pointer' }}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>
                                    {Math.floor((item?.product_details?.discount_price || 0) * item.quantity)} ₽
                                </div>

                                <button
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#ff4d4f',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ИТОГО */}
                <div
                    style={{
                        width: '350px',
                        background: 'white',
                        borderRadius: '12px',
                        padding: '20px'
                    }}
                >
                    <h3>Итого</h3>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            margin: '20px 0',
                            fontSize: '20px',
                            fontWeight: 'bold'
                        }}
                    >
                        <span>К оплате:</span>
                        <span>{Math.floor(total)} ₽</span>
                    </div>

                    {!user && (
                        <p style={{ color: '#999', marginBottom: '10px', textAlign: 'center' }}>
                            Войдите, чтобы оформить заказ
                        </p>
                    )}

                    <button
                        onClick={handleCheckout}
                        disabled={!user}
                        style={{
                            width: '100%',
                            padding: '15px',
                            background: !user ? '#ccc' : 'var(--accent-p)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            cursor: !user ? 'not-allowed' : 'pointer',
                            opacity: !user ? 0.7 : 1
                        }}
                    >
                        {user ? 'Оформить заказ' : 'Войдите для оформления'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;