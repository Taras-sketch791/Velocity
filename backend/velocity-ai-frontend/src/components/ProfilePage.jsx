import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartContext';
import { User, Mail, CreditCard, ShieldCheck, Loader2, Calendar, Lock } from 'lucide-react';
import api from '../api';   // <-- импортируем настроенный axios

const ProfilePage = () => {
  const { t } = useTranslation();
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [paymentResult, setPaymentResult] = useState(null); // для сообщения об успехе

  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  const userData = {
    username: localStorage.getItem('username') || 'Гость',
    email: localStorage.getItem('email') || 'Не указан'
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setPaymentStatus('processing');
    setPaymentResult(null);

    try {
      // Используем api instance (baseURL уже содержит /api/)
      const response = await api.post('/payment/', {
        card_number: cardData.number,
        expiry: cardData.expiry
        // сервер пока не сохраняет эти данные, но мы их отправляем
      });

      if (response.status === 201) {
        const data = response.data;
        setPaymentStatus('success');
        setPaymentResult(`Заказ #${data.order_id} успешно оплачен!`);

        // Очищаем локальную корзину
        if (clearCart) clearCart();

        // Очищаем поля карты (опционально)
        setCardData({ number: '', expiry: '', cvc: '' });

        // Можно перенаправить на страницу заказов, если она есть
        // navigate('/orders');
      } else {
        throw new Error('Неожиданный ответ сервера');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentStatus('error');
      setPaymentResult(
        err.response?.data?.error ||
        err.message ||
        'Ошибка при оплате. Попробуйте позже.'
      );
    }
  };

  return (
    <div style={containerStyle}>
      <div style={profileGrid}>
        {/* Данные профиля */}
        <div style={cardStyle}>
          <h2 style={cardTitle}><User color="#6366f1" /> {t('profile.info', 'Личные данные')}</h2>
          <div style={infoRow}><User size={18} color="#94a3b8" /><span><strong>Логин:</strong> {userData.username}</span></div>
          <div style={infoRow}><Mail size={18} color="#94a3b8" /><span><strong>Email:</strong> {userData.email}</span></div>
        </div>


        <div style={cardStyle}>
          <h2 style={cardTitle}><CreditCard color="#6366f1" /> {t('profile.checkout', 'Оплата заказа')}</h2>

          {cart.length > 0 ? (
            <form onSubmit={handlePay} style={formStyle}>
              <p style={totalDisplay}>К оплате: <span>{totalPrice.toLocaleString()} ₽</span></p>

              {paymentResult && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: paymentStatus === 'success' ? '#22c55e20' : '#ef444420',
                  color: paymentStatus === 'success' ? '#22c55e' : '#ef4444',
                  border: `1px solid ${paymentStatus === 'success' ? '#22c55e' : '#ef4444'}`,
                  textAlign: 'center'
                }}>
                  {paymentResult}
                </div>
              )}

              <div style={inputWrapper}>
                <CreditCard size={18} style={iconStyle} />
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  style={inputStyle}
                  required
                  maxLength="16"
                  value={cardData.number}
                  onChange={(e) => setCardData({...cardData, number: e.target.value})}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ ...inputWrapper, flex: 1 }}>
                  <Calendar size={18} style={iconStyle} />
                  <input
                    type="text"
                    placeholder="09/26"
                    style={inputStyle}
                    required
                    maxLength="5"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                  />
                </div>
                <div style={{ ...inputWrapper, flex: 1 }}>
                  <Lock size={18} style={iconStyle} />
                  <input
                    type="password"
                    placeholder="CVC"
                    style={inputStyle}
                    required
                    maxLength="3"
                    value={cardData.cvc}
                    onChange={(e) => setCardData({...cardData, cvc: e.target.value})}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={payButtonStyle}
                disabled={paymentStatus === 'processing'}
              >
                {paymentStatus === 'processing' ? (
                  <Loader2 size={20} className="spinner" />
                ) : (
                  <><ShieldCheck size={20} /> Оплатить сейчас</>
                )}
              </button>

              <p style={secureNote}>🔒 Ваши данные защищены шифрованием SSL</p>
            </form>
          ) : (
            <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '20px' }}>
              Корзина пуста. Оплачивать пока нечего.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};


const containerStyle = { padding: '140px 20px', minHeight: '100vh', background: '#0f172a', display: 'flex', justifyContent: 'center' };
const profileGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', maxWidth: '1000px', width: '100%' };
const cardStyle = { background: '#1e293b', padding: '35px', borderRadius: '24px', color: '#fff', border: '1px solid #334155', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' };
const cardTitle = { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px', fontSize: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '15px' };
const infoRow = { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', fontSize: '1.1rem' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
const totalDisplay = { fontSize: '1.3rem', marginBottom: '5px', color: '#94a3b8' };
const inputWrapper = { position: 'relative', display: 'flex', alignItems: 'center' };
const iconStyle = { position: 'absolute', left: '12px', color: '#6366f1' };
const inputStyle = { width: '100%', padding: '14px 14px 14px 40px', borderRadius: '12px', border: '1px solid #334155', background: '#0f172a', color: '#fff', fontSize: '1rem', outline: 'none' };
const payButtonStyle = { padding: '18px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', transition: '0.3s' };
const secureNote = { fontSize: '0.85rem', color: '#64748b', textAlign: 'center', marginTop: '10px' };

export default ProfilePage;