import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('provider'); // or 'user'

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', { username, password, role })
      .then(response => {
        console.log('Registration successful:', response.data);
        navigate('/login');
      })
      .catch(error => console.error('Error registering:', error));
  };

  return (
    <div className="registration-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="provider">Provider</option>
          <option value="user">User</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
