import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import History from './components/History';
import Membership from './components/Membership';
import Dues from './components/Dues';
import Contact from './components/Contact';
import Login from './components/Login';
import './App.css'; // Import your CSS file

function App() {
  return (
    <div className="App">
      <Router>
        <Header /> {/* The Header component will handle its own styles */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/dues" element={<Dues />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;