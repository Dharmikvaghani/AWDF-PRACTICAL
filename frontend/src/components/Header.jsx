import React from 'react';

function Header({ name = 'Dharmik Vaghani', subtitle }) {
  return (
    <header className="portfolio-header">
      <h1>Student Portfolio & Full Stack Platform</h1>
      <p className="header-name">{name}</p>
      {subtitle && <p className="header-subtitle">{subtitle}</p>}
    </header>
  );
}

export default Header;
