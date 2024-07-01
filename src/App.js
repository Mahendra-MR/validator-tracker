// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ValidatorTracking from './components/ValidatorTracking';
import Home from './components/Home';
import About from './components/About';
import TopValidators from './components/TopValidators';
import LoadingSpiral from './components/LoadingSpiral';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpiral />;
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          <Sidebar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/track-validator" element={<ValidatorTracking />} />
              <Route path="/top-validators" element={<TopValidators />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;










