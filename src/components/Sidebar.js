// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        <li>
          <Link to="/" className="sidebar-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/track-validator" className="sidebar-link">
            Track Validator
          </Link>
        </li>
        <li>
          <Link to="/top-validators" className="sidebar-link">
            Top Validators
          </Link>
        </li>
        <li>
          <Link to="/about" className="sidebar-link">
            About
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;






