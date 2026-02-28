// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import api from '../api/axios';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Извлекаем параметры из URL
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';
    const categoryFromUrl = searchParams.get('category') || '';

    // Загружаем данные
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [prodRes, catRes] = await Promise.all([
                    api.get('products/'),
                    api.get('categories/')
                ]);
                setProducts(prodRes.data);
                setCategories(catRes.data);
            } catch (err) {
                console.error('❌ Ошибка загрузки данных:', err);
                setError('Не удалось загрузить данные');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Поиск названия текущей категории для заголовка
    const currentCategoryName = categories.find(c => c.id === parseInt(categoryFromUrl))?.name;

    // Логика фильтрации
    const filteredProducts = products.filter(product => {
        // Фильтр по категории (берем из URL)
        const matchesCategory = categoryFromUrl ? product.category === parseInt(categoryFromUrl) : true;

        // Фильтр по цене
        const matchesMinPrice = minPrice ? product.discount_price >= parseFloat(minPrice) : true;
        const matchesMaxPrice = maxPrice ? product.discount_price <= parseFloat(maxPrice) : true;

        // Поиск
        const matchesSearch = searchQuery ?
            (product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
             product.brand?.toLowerCase().includes(searchQuery.toLowerCase())) : true;

        return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesSearch;
    });

    if (loading) return <div style={{ textAlign: 'center', padding: '100px 0' }}><h2>Загрузка Velocity...</h2></div>;
    if (error) return <div style={{ textAlign: 'center', padding: '100px 0' }}><h2 style={{ color: 'red' }}>{error}</h2></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f5f7' }}>
            <div className="container" style={{ display: 'flex', gap: '30px', maxWidth: '1200px', margin: '40px auto', padding: '0 20px', flex: 1 }}>

                {/* Сайдбар с фильтрами по цене */}
                <aside style={{ width: '260px', flexShrink: 0 }}>
                    <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: '20px' }}>
                        <h3 style={{ marginBottom: '15px' }}>Цена, ₽</h3>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="От"
                                style={filterInputStyle}
                            />
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="До"
                                style={filterInputStyle}
                            />
                        </div>

                        <button
                            onClick={() => { setMaxPrice(''); setMinPrice(''); }}
                            style={resetBtnStyle}
                        >
                            Сбросить цены
                        </button>
                    </div>
                </aside>

                {/* Основная часть */}
                <main style={{ flex: 1 }}>
                    <div style={{ marginBottom: '25px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '700' }}>
                            {searchQuery ? `Поиск: ${searchQuery}` :
                             currentCategoryName ? `Категория: ${currentCategoryName}` :
                             'Все товары'}
                        </h2>
                        <p style={{ color: '#888', marginTop: '5px' }}>Найдено: {filteredProducts.length}</p>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '60px' }}>
                            <div style={{ fontSize: '50px' }}>🔍</div>
                            <h3 style={{ color: '#555' }}>Ничего не нашли, попробуйте изменить фильтры</h3>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                            gap: '25px'
                        }}>
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

// Стили для фильтров
const filterInputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    fontSize: '14px'
};

const resetBtnStyle = {
    width: '100%',
    padding: '12px',
    background: '#f0f0f0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    color: '#333',
    transition: '0.2s'
};

export default Home;