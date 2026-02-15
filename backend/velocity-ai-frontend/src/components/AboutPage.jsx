import React from 'react';
import About from './About'; // ваш уже созданный компонент About
import Footer from './Footer'; // если футер не включён в About

const AboutPage = () => {
  return (
    <>
      <About />
      <Footer />
    </>
  );
};

export default AboutPage;