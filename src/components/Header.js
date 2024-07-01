// src/components/Header.js
import React from 'react';
import logo from 'C:/Users/Mahendra MR/validator-tracker/src/components/assests/Foundry-horz-inverse-e1701188519620.png'; // Adjust path as necessary
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <img src={logo} alt="Logo" className="header-logo" />
        </div>
        <div className="header-center">
          <h1 className="header-title">Ethereum Validator</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;



