import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">SecureXchange</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/provider-dashboard">Provider Dashboard</Link></li>
          <li><Link to="/user-dashboard">User Dashboard</Link></li>
          <li><Link to="/upload-file">Upload File</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
