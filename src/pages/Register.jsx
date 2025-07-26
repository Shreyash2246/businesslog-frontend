import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/user/register', { username, password });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="login-bg">
      <header className="login-header">BuisinessLog</header>
      <div className="login-center">
        <div className="login-card">
          <h2 className="login-title">Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-btn">Register</button>
          </form>
          {error && <p className="login-error">{error}</p>}
          <p className="login-link">
            Already have an account?{' '}
            <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
      <footer className="login-footer">© 2025 BuisinessLog. All rights reserved.</footer>
    </div>
  );
} 