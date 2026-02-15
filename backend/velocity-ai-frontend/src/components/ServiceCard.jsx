import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ServiceCard = ({ service }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
      <h3>{service.title}</h3>
      <p>Цена: {service.price}€</p>
      <button onClick={() => addToCart(service)}>Добавить в корзину</button>
    </div>
  );
};

export default ServiceCard;
