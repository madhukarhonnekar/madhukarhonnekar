import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <Provider store={store}>
      <div className="bg-gray-50">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </div>
    </Provider>
  );
}

export default App;