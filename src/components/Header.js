import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="App-header"> {/* Apply the App-header class */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/triangle.png" alt="Triangle Logo" style={{ height: '50px', marginRight: '1rem' }} />
        <div>
          <h1 style={{ margin: 0 }}>Texas A&M Triangle Fraternity</h1>
          {user && <p style={{ margin: 0 }}>Hi, {user.name}!</p>}
        </div>
      </div>
      <nav>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
          <li><Link to="/"><button>Home</button></Link></li>
          <li><Link to="/history"><button>History</button></Link></li>
          <li><Link to="/membership"><button>Membership</button></Link></li>
          <li><Link to="/dues"><button>Dues & Payments</button></Link></li>
          <li><Link to="/contact"><button>Contact</button></Link></li>
          <li><Link to="/login"><button>Login</button></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;