import React from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

function Home() {
  const skills = [
    { name: 'React 19', color: '#3b82f6' },
    { name: 'JavaScript (ES6+)', color: '#f59e0b' },
    { name: 'Vite', color: '#8b5cf6' },
    { name: 'Node.js', color: '#10b981' },
    { name: 'HTML5/CSS3', color: '#ef4444' },
    { name: 'Git & GitHub', color: '#475569' }
  ];

  return (
    <div>
      <Header
        name="Dharmik Vaghani"
        subtitle="Dharmik Vaghani (24CS104) | ITUE301: Practical 1: React Components & Props"
      />
      <main className="container">
        <About />
        <Skills skills={skills} />
      </main>
    </div>
  );
}

export default Home;
