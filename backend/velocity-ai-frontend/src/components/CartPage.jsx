import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { Trash2, CreditCard, ArrowLeft } from 'lucide-react';

const CartPage = () => {
  const { t } = useTranslation();
  const { cart, removeFromCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();


  const goToCheckout = (e) => {
    if (e) e.preventDefault();
    console.log("Переход в профиль...");
    navigate('/profile');
  };

  if (!cart || cart.length === 0) {
    return (
      <div style={emptyPageStyle}>
        <h2 style={{ color: '#fff' }}>{t('cart.empty', 'Корзина пуста')}</h2>
        <button onClick={() => navigate('/')} style={backBtnStyle}>
          <ArrowLeft size={18} /> {t('cart.back', 'Вернуться в каталог')}
        </button>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <h1 style={headerStyle}>{t('cart.title', 'Ваша корзина')}</h1>

        <div style={listStyle}>
          {cart.map((item) => (
            <div key={item.id} style={rowStyle}>
              <div style={{ flex: 2 }}>
                <h4 style={{ margin: 0, color: '#f8fafc' }}>
                  {item.service_details?.title || 'Услуга'}
                </h4>
                <small style={{ color: '#94a3b8' }}>{t('cart.quantity', 'Количество')}: {item.quantity}</small>
              </div>

              <div style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', color: '#818cf8' }}>
                {(parseFloat(item.service_details?.price || 0) * item.quantity).toLocaleString()} ₽
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={delBtnStyle}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div style={summaryStyle}>
          <span>{t('cart.total', 'Итого')}:</span>
          <span style={{ color: '#4F46E5' }}>{totalPrice.toLocaleString()} ₽</span>
        </div>

        {/* ИСПРАВЛЕННАЯ КНОПКА С ONCLICK */}
        <button
          type="button"
          onClick={goToCheckout}
          style={mainBtnStyle}
        >
          <CreditCard size={20} />
          {t('cart.checkout', 'Оформить заказ')}
        </button>

        <button onClick={() => navigate('/')} style={backLinkStyle}>
          ← {t('cart.back', 'Вернуться в каталог')}
        </button>
      </div>
    </div>
  );
};

const wrapperStyle = { padding: '140px 20px', minHeight: '100vh', background: '#0f172a', display: 'flex', justifyContent: 'center' };
const containerStyle = { maxWidth: '700px', width: '100%', background: '#1e293b', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' };
const headerStyle = { color: '#fff', fontSize: '2rem', marginBottom: '30px', textAlign: 'center', borderBottom: '1px solid #334155', paddingBottom: '20px' };
const listStyle = { marginBottom: '30px' };
const rowStyle = { display: 'flex', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #334155' };
const delBtnStyle = { background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', marginLeft: '20px' };
const summaryStyle = { display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', padding: '20px 0' };
const mainBtnStyle = { width: '100%', padding: '18px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' };
const backBtnStyle = { marginTop: '20px', padding: '12px 24px', background: '#334155', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' };
const backLinkStyle = { width: '100%', marginTop: '20px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' };
const emptyPageStyle = { height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#0f172a' };

export default CartPage;