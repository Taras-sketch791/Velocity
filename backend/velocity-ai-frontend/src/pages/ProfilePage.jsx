import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { useCart } from '../store/CartContext';
import { useFavorites } from '../store/FavoritesContext';
import { useNotification } from '../store/NotificationContext';
import api from '../api/axios';
import {
    User, Heart, CreditCard, ShoppingBag,
    LogOut, ArrowLeft, Save, Trash2
} from 'lucide-react';

const ProfilePage = () => {
    const { user, logout, fetchProfile } = useAuth();
    const { cartItems } = useCart();
    const { favorites } = useFavorites();
    const { showSuccess, showError } = useNotification();
    const navigate = useNavigate();

    const [view, setView] = useState('menu');
    const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '' });
    const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' });
    const [savedCards, setSavedCards] = useState([
        { id: 1, number: '**** **** **** 4242', expiry: '12/25', type: 'Visa' }
    ]);

    // При загрузке профиля подставляем данные
    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || ''
            });
        }
    }, [user]);

    // Очистка полей карты при открытии формы добавления
    useEffect(() => {
        if (view === 'add_card') {
            setCardData({ number: '', expiry: '', cvv: '' });
        }
    }, [view]);

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            await api.patch('profile/', formData);
            await fetchProfile();
            showSuccess('Данные обновлены');
            setView('menu');
        } catch (err) {
            showError('Ошибка обновления');
        }
    };

    const handleCardNumberChange = (e) => {
        let v = e.target.value.replace(/\D/g, '').substring(0, 16);
        setCardData({ ...cardData, number: v.match(/.{1,4}/g)?.join(' ') || v });
    };

    const handleAddCard = (e) => {
        e.preventDefault();
        if (!cardData.number || !cardData.expiry) {
            showError('Заполните данные карты');
            return;
        }
        const newCard = {
            id: Date.now(),
            number: `**** **** **** ${cardData.number.replace(/\s/g, '').slice(-4)}`,
            expiry: cardData.expiry,
            type: 'Bank Card'
        };
        setSavedCards([...savedCards, newCard]);
        showSuccess('Карта привязана');
        setCardData({ number: '', expiry: '', cvv: '' }); // Очистка
        setView('card_list');
    };

    const deleteCard = (id) => {
        setSavedCards(savedCards.filter(c => c.id !== id));
        showSuccess('Карта удалена');
    };

    if (!user) return null;

    const sections = [
        { id: 'profile', title: 'Личные данные', desc: 'Имя, фамилия и почта', icon: <User size={32} />, action: () => setView('profile'), color: '#4caf50' },
        { id: 'favorites', title: 'Избранное', desc: `${favorites.length} товаров`, icon: <Heart size={32} />, action: () => navigate('/favorites'), color: '#e91e63' },
        { id: 'cart', title: 'Корзина', desc: `${cartItems.length} товаров ждет`, icon: <ShoppingBag size={32} />, action: () => navigate('/cart'), color: '#cb11ab' },
        { id: 'add_card', title: 'Привязать карту', desc: 'Добавить новый способ', icon: <CreditCard size={32} />, action: () => setView('add_card'), color: '#ff9800' },
        { id: 'card_list', title: 'Способы оплаты', desc: `Привязано карт: ${savedCards.length}`, icon: <CreditCard size={32} />, action: () => setView('card_list'), color: '#607d8b' }
    ];

    return (
        <div className="container" style={{ padding: '50px 20px', maxWidth: '1000px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {view !== 'menu' && (
                        <button onClick={() => setView('menu')} style={backBtnStyle}><ArrowLeft size={24}/></button>
                    )}
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
                        {view === 'profile' && 'Личные данные'}
                        {view === 'add_card' && 'Новая карта'}
                        {view === 'card_list' && 'Ваши карты'}
                        {view === 'menu' && 'Личный кабинет'}
                    </h1>
                </div>
                {view === 'menu' && (
                    <button onClick={logout} style={logoutBtnStyle}><LogOut size={20}/> Выйти</button>
                )}
            </div>

            {/* Profile Form */}
            {view === 'profile' && (
                <div style={formCardStyle}>
                    <form onSubmit={handleSaveProfile} autoComplete="off">
                        {/* Невидимые поля для обмана автозаполнения */}
                        <input type="text" style={{display:'none'}} name="fake_user"/>
                        <input type="password" style={{display:'none'}} name="fake_pass"/>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                            <div className="input-group">
                                <label style={labelStyle}>Имя</label>
                                <input type="text" style={inputStyle} value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} autoComplete="new-password" />
                            </div>
                            <div className="input-group">
                                <label style={labelStyle}>Фамилия</label>
                                <input type="text" style={inputStyle} value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})} autoComplete="new-password" />
                            </div>
                            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                <label style={labelStyle}>Email</label>
                                <input type="email" style={inputStyle} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} autoComplete="new-password" />
                            </div>
                        </div>
                        <button type="submit" style={saveBtnStyle} className="auth-btn"><Save size={18} /> Сохранить</button>
                    </form>
                </div>
            )}

            {/* Add Card Form */}
            {view === 'add_card' && (
                <div style={formCardStyle}>
                    <form onSubmit={handleAddCard} autoComplete="off">
                        {/* Скрываем автозаполнение почты здесь */}
                        <input type="text" style={{display:'none'}} name="prevent_autofill"/>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                            <div className="input-group" style={{ gridColumn: 'span 3' }}>
                                <label style={labelStyle}>Номер карты</label>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    value={cardData.number}
                                    onChange={handleCardNumberChange}
                                    placeholder="0000 0000 0000 0000"
                                    autoComplete="cc-number"
                                />
                            </div>
                            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                <label style={labelStyle}>Срок</label>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    placeholder="ММ/ГГ"
                                    value={cardData.expiry}
                                    onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                                    autoComplete="cc-exp" // Прямое указание браузеру, что это НЕ email
                                    name="card_expiry_date"
                                />
                            </div>
                            <div className="input-group">
                                <label style={labelStyle}>CVV</label>
                                <input
                                    type="password"
                                    style={inputStyle}
                                    placeholder="***"
                                    value={cardData.cvv}
                                    onChange={(e) => setCardData({...cardData, cvv: e.target.value.substring(0, 3)})}
                                    autoComplete="cc-csc"
                                    name="card_cvv_secure"
                                />
                            </div>
                        </div>
                        <button type="submit" style={saveBtnStyle} className="auth-btn"><CreditCard size={18} /> Привязать</button>
                    </form>
                </div>
            )}

            {/* Cards List */}
            {view === 'card_list' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {savedCards.length > 0 ? savedCards.map(card => (
                        <div key={card.id} style={cardListItemStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={cardIconStyle}><CreditCard size={24}/></div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '18px' }}>{card.number}</div>
                                    <div style={{ color: '#888', fontSize: '14px' }}>Действует до {card.expiry}</div>
                                </div>
                            </div>
                            <button onClick={() => deleteCard(card.id)} style={deleteBtnStyle}><Trash2 size={20}/></button>
                        </div>
                    )) : (
                        <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>У вас пока нет привязанных карт</p>
                    )}
                    <button onClick={() => setView('add_card')} style={{ ...saveBtnStyle, marginTop: '20px', background: '#333', width: '100%', justifyContent: 'center' }}>+ Добавить новую карту</button>
                </div>
            )}

            {/* Main Menu Tiles */}
            {view === 'menu' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                    {sections.map(s => (
                        <div key={s.id} onClick={s.action} style={tileStyle}>
                            <div style={{ color: s.color, background: `${s.color}15`, padding: '15px', borderRadius: '16px' }}>{s.icon}</div>
                            <div>
                                <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{s.title}</h3>
                                <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Стили
const tileStyle = { background: '#fff', padding: '30px', borderRadius: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', transition: '0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' };
const formCardStyle = { background: '#fff', padding: '40px', borderRadius: '28px', border: '1px solid #f0f0f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' };
const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e0e0e0', outline: 'none', background: '#fcfcfc', boxSizing: 'border-box', fontSize: '16px' };
const labelStyle = { display: 'block', marginBottom: '8px', color: '#444', fontSize: '14px', fontWeight: '600', marginLeft: '4px' };
const saveBtnStyle = { padding: '16px 32px', background: 'linear-gradient(135deg, var(--main-p), var(--accent-p))', color: 'white', border: 'none', borderRadius: '14px', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', transition: '0.3s' };
const backBtnStyle = { background: '#eee', border: 'none', cursor: 'pointer', color: '#333', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const logoutBtnStyle = { color: '#ff4d4f', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' };
const cardListItemStyle = { background: '#fff', padding: '20px 30px', borderRadius: '20px', border: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' };
const cardIconStyle = { background: '#f5f5f5', padding: '12px', borderRadius: '12px', color: '#666' };
const deleteBtnStyle = { background: '#fff1f0', border: 'none', color: '#ff4d4f', cursor: 'pointer', padding: '10px', borderRadius: '10px', transition: '0.2s' };

export default ProfilePage;