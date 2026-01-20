import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Competencies from "./components/Competencies/Competencies";
import ContactForm from "./components/ContactForm";
import RegisterPage from "./components/RegisterPage";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;