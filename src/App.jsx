import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Algorithm from './components/Algorithm';
import Findings from './components/Findings';
import Leaderboard from './components/Leaderboard';
import Citation from './components/Citation';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'algorithm', 'findings', 'leaderboard'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <Algorithm />
        <Findings />
        <Leaderboard />
        <Citation />
      </main>
      <Footer />
    </div>
  );
}

export default App; 