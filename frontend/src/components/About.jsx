import React from 'react';

function About() {
  return (
    <section className="card">
      <h2>👤 About Dharmik Vaghani</h2>
      <p className="meta-text">
        <strong>Student ID:</strong> 24CS104 | <strong>Department:</strong> Computer Science & Engineering, CSPIT
      </p>
      <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '12px' }}>
        Building modern, performant, and secure full-stack web applications using React, Component Composition,
        One-Way Data Flow, Express RESTful architectures, and MongoDB.
      </p>
      <p style={{ fontSize: '12px', color: '#2563eb' }}>
        <strong>Email:</strong> 24cs104@charusat.edu.in &nbsp;|&nbsp; 
        <strong>GitHub:</strong> <a href="https://github.com/Dharmikvaghani" target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>github.com/Dharmikvaghani</a>
      </p>
    </section>
  );
}

export default About;
