import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Trench Crusade Campaign Builder</h1>
      <p>
        <a href="https://github.com/ajbot22/Trench-Crusade-Campaign-Builder" target="_blank" rel="noopener noreferrer">
          GitHub Repo
        </a>{' '}
        | <a href="mailto:ajbotcs@gmail.com">ajbotcs@gmail.com</a>
      </p>
    </header>
  );
};

export default Header;
