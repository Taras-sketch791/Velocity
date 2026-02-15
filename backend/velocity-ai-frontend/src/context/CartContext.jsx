import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const API_URL = 'http://localhost:8000/api/cart/';

  const getAuthHeader = () => {
    const token = localStorage.getItem('access') || localStorage.getItem('access_token');
    return token ? { 'Authorization': `Bearer ${token}` } : null;
  };

  const fetchCart = async () => {
    const headers = getAuthHeader();
    if (!headers) return;

    try {
      const response = await fetch(API_URL, { headers });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (service) => {
    const headers = getAuthHeader();
    if (!headers) {
      alert('Пожалуйста, войдите в аккаунт');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify({ service: service.id, quantity: 1 })
      });

      if (response.ok) {
        const newItem = await response.json();


        setCart(prevCart => {
          const exists = prevCart.find(item => item.service === newItem.service);
          if (exists) {
            return prevCart.map(item => item.service === newItem.service ? newItem : item);
          }
          return [...prevCart, newItem];
        });

        alert('Услуга добавлена в корзину');
      } else {
        const errorData = await response.json();
        alert(`Ошибка: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    const headers = getAuthHeader();
    if (!headers) return;

    try {
      const response = await fetch(`${API_URL}${cartItemId}/`, {
        method: 'DELETE',
        headers
      });
      if (response.ok) {
        setCart(prev => prev.filter(item => item.id !== cartItemId));
      }
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.service_details?.price || 0);
    return sum + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};