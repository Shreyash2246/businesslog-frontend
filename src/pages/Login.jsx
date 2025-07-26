import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/user/login', { username, password });
      localStorage.setItem('userId', res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="login-bg">
      <header className="login-header">BuisinessLog</header>
      <div className="login-center">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="login-btn">Login</button>
          </form>
          {error && <p className="login-error">{error}</p>}
          <p className="login-link">
            Don't have an account?{' '}
            <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
      <footer className="login-footer">© 2025 BuisinessLog. All rights reserved.</footer>
    </div>
  );
} 