import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Competencies from "./components/Competencies/Competencies";
import ContactForm from "./components/ContactForm";
import RegisterPage from "./components/RegisterPage";

// Компонент загрузки на случай если i18n еще не готов
const Loading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}>
    Загрузка...
  </div>
);

function HomePage() {
  return (
    <div className="app-main-wrapper">
      <Header />
      <main>
        <Hero />
        <Competencies />
        <Services />
        <Process />
        <Projects />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;