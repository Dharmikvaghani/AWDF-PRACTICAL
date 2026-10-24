import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('Practical');

  const fallbackRepos = [
    {
      id: 1,
      name: '24CS104_AWDF_Practical-1',
      description: 'Static Student Portfolio with Vite & Component Props',
      html_url: 'https://github.com/Dharmikvaghani/AWDF-PRACTICAL',
      stargazers_count: 3,
      forks_count: 1,
      language: 'JavaScript'
    },
    {
      id: 2,
      name: '24CS104_AWDF_Practical-2',
      description: 'Client-Side Routing and Dynamic State Management',
      html_url: 'https://github.com/Dharmikvaghani/AWDF-PRACTICAL',
      stargazers_count: 2,
      forks_count: 0,
      language: 'JavaScript'
    },
    {
      id: 3,
      name: '24CS104_AWDF_Practical-3',
      description: 'GitHub REST API Integration with Search & Skeletons',
      html_url: 'https://github.com/Dharmikvaghani/AWDF-PRACTICAL',
      stargazers_count: 5,
      forks_count: 2,
      language: 'JavaScript'
    }
  ];

  useEffect(() => {
    fetch('https://api.github.com/users/Dharmikvaghani/repos')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
        } else {
          setRepos(fallbackRepos);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Using mock repo data:', err.message);
        setRepos(fallbackRepos);
        setLoading(false);
      });
  }, []);

  const filtered = repos.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.description && r.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <Header
        name="Dharmik Vaghani"
        subtitle="Dharmik Vaghani (24CS104) | ITUE301: Practical 3: API Integration & Data Rendering"
      />
      <div className="container">
        <div className="card" style={{ padding: '12px 18px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter repositories..."
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '13px',
                background: 'transparent'
              }}
            />
          </div>
        </div>

        {loading ? (
          <div>
            {[1, 2, 3].map((n) => (
              <div key={n} className="card" style={{ opacity: 0.6, animation: 'pulse 1.5s infinite' }}>
                <div style={{ height: '16px', background: '#cbd5e1', borderRadius: '4px', width: '40%', marginBottom: '8px' }}></div>
                <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '4px', width: '70%' }}></div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', color: '#64748b' }}>
            No repositories found matching "{search}".
          </div>
        ) : (
          filtered.map((repo) => (
            <div key={repo.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '700', fontSize: '14px' }}
                >
                  {repo.name}
                </a>
                <p style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                  {repo.description || 'Full-Stack Practical Project'}
                </p>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px', display: 'flex', gap: '12px' }}>
                  <span>⭐ {repo.stargazers_count || 0}</span>
                  <span>🍴 {repo.forks_count || 0}</span>
                  <span>• {repo.language || 'JavaScript'}</span>
                </div>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  color: '#334155'
                }}
              >
                View Code
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Projects;
