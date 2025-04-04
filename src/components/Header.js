import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // 👈 import the context

const Header = () => {
  const { user } = useContext(UserContext); // 👈 get user info

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <div>
        <h1>Texas A&M Triangle Fraternity</h1>
        {user && <p style={{ margin: 0 }}>Hi, {user.name}!</p>} {'Greetings from Triangle!'}
      </div>
      <nav>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/membership">Membership</Link></li>
          <li><Link to="/dues">Dues & Payments</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
