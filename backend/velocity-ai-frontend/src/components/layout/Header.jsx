import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, Heart, LogOut, ChevronRight, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import { useAuth } from '../../store/AuthContext';
import { useFavorites } from '../../store/FavoritesContext';
import api from '../../api/axios';

const Header = () => {
    const { cartItems = [] } = useCart() || {};
    const { user, logout } = useAuth() || {};
    const { favorites = [] } = useFavorites() || {};

    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showCatalog, setShowCatalog] = useState(false); // Теперь управляется только кликом
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('categories/');
                setCategories(res.data);
            } catch (err) {
                console.error("Ошибка загрузки категорий", err);
            }
        };
        fetchCategories();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate('/');
        }
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    // Функция переключения каталога
    const toggleCatalog = (e) => {
        e.stopPropagation(); // Чтобы клик не всплывал
        setShowCatalog(!showCatalog);
    };

    return (
        <>
            {/* ПОДЛОЖКА (закрывает каталог при клике в любое место) */}
            {showCatalog && (
                <div
                    className="catalog-overlay"
                    onClick={() => setShowCatalog(false)}
                />
            )}

            <header className="wb-header">
                <div className="container header-content">
                    <Link to="/" className="logo">VELOCITY</Link>

                    {/* КНОПКА КАТАЛОГ (ТОЛЬКО КЛИК) */}
                    <div className="catalog-wrapper">
                        <button
                            className={`catalog-btn ${showCatalog ? 'active' : ''}`}
                            onClick={toggleCatalog}
                        >
                            {showCatalog ? <X size={20}/> : <Menu size={20}/>}
                            Каталог
                        </button>

                        {showCatalog && (
                            <div className="catalog-dropdown" onClick={(e) => e.stopPropagation()}>
                                <Link
                                    to="/"
                                    className="cat-item all-cats"
                                    onClick={() => setShowCatalog(false)}
                                >
                                    <strong>Все товары</strong>
                                    <ChevronRight size={14} opacity={0.5} />
                                </Link>

                                <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '4px 0' }} />

                                {categories.length > 0 ? (
                                    categories.map(cat => (
                                        <Link
                                            key={cat.id}
                                            to={`/?category=${cat.id}`}
                                            className="cat-item"
                                            onClick={() => setShowCatalog(false)}
                                        >
                                            <span>{cat.name}</span>
                                            <ChevronRight size={14} opacity={0.5} />
                                        </Link>
                                    ))
                                ) : (
                                    <div className="cat-item-loading">Загрузка категорий...</div>
                                )}
                            </div>
                        )}
                    </div>

                    <form className="search-wrapper" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Найти на Velocity"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="search-btn">
                            <Search size={20} />
                        </button>
                    </form>

                    <div className="header-actions">
                        <div
                            className="user-menu-outer"
                            onMouseEnter={() => setShowUserMenu(true)}
                            onMouseLeave={() => setShowUserMenu(false)}
                        >
                            {user ? (
                                <div className="user-menu-container">
                                    <button
                                        className="action-item"
                                        style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', padding: 0, cursor: 'pointer' }}
                                        onClick={() => navigate('/profile')}
                                    >
                                        <User size={24}/>
                                        <span style={{ fontSize: '12px', marginTop: '4px' }}>
                                            {user.first_name || user.username}
                                        </span>
                                    </button>

                                    {showUserMenu && (
                                        <div className="user-dropdown">
                                            <div className="dropdown-header">
                                                <strong>{user.username}</strong>
                                                <div style={{fontSize: '11px', color: '#888'}}>{user.email}</div>
                                            </div>
                                            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '5px 0' }} />
                                            <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                                                Личный кабинет
                                            </Link>
                                            <button onClick={handleLogout} className="logout-link">
                                                <LogOut size={14} /> Выйти
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login" className="action-item">
                                    <User size={24}/>
                                    <span>Войти</span>
                                </Link>
                            )}
                        </div>

                        <Link to="/favorites" className="action-item">
                            <div className="icon-badge-wrapper">
                                <Heart size={24}/>
                                {favorites.length > 0 && <span className="badge-count">{favorites.length}</span>}
                            </div>
                            <span>Избранное</span>
                        </Link>

                        <Link to="/cart" className="action-item">
                            <div className="icon-badge-wrapper">
                                <ShoppingCart size={24}/>
                                {cartItems.length > 0 && <span className="badge-count">{cartItems.length}</span>}
                            </div>
                            <span>Корзина</span>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;