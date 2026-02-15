// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // импортируем провайдер


// Импорт постоянных компонентов (не ленивых для главной)
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Catalog from './components/Catalog';
// import Competencies from "./components/Competencies/Competencies";
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// Ленивая загрузка страниц (включая AboutPage)
const ProfilePage = lazy(() => import('./components/ProfilePage'));
const CartPage = lazy(() => import('./components/CartPage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const RegisterPage = lazy(() => import('./components/RegisterPage'));
const AboutPage = lazy(() => import('./components/AboutPage')); // новый импорт

// Главная страница (без About)
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Catalog />
{/*       <Competencies /> */}
      <Projects />
      <ContactForm />
    </>
  );
};

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px', color: '#fff' }}>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />     {/* новый маршрут */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
      {/* Футер будет показан на всех страницах, кроме тех, где он уже включён (но мы его оставим здесь глобально) */}
      <Footer />
    </div>
  );
}

export default App;