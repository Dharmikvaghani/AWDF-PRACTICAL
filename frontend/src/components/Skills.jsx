import React from 'react';

function Skills({ skills }) {
  const defaultSkills = [
    { name: 'React 19', color: '#3b82f6' },
    { name: 'JavaScript (ES6+)', color: '#f59e0b' },
    { name: 'Vite', color: '#8b5cf6' },
    { name: 'Node.js', color: '#10b981' },
    { name: 'Express.js', color: '#6366f1' },
    { name: 'MongoDB & Mongoose', color: '#059669' },
    { name: 'HTML5/CSS3', color: '#ef4444' },
    { name: 'Git & GitHub', color: '#475569' },
    { name: 'Docker', color: '#0284c7' },
    { name: 'CI/CD Actions', color: '#7c3aed' }
  ];

  const skillList = skills || defaultSkills;

  return (
    <section className="card">
      <h2>🛠️ Technical Skills (Reusable SkillBadge Components)</h2>
      <div className="skills-grid">
        {skillList.map((skill) => (
          <span
            key={skill.name}
            className="skill-badge"
            style={{ background: skill.color }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Skills;
