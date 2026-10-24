import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '48px', color: '#1e3a8a', marginBottom: '16px' }}>404</h1>
      <h2 style={{ fontSize: '20px', marginBottom: '12px', color: '#334155' }}>Page Not Found</h2>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>
        The route you are trying to access does not exist in this single page application.
      </p>
      <Link to="/" style={{ textDecoration: 'none', background: '#1e3a8a', color: 'white', padding: '10px 20px', borderRadius: '6px', fontWeight: '600' }}>
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
