import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAdminAuth } from '../utils/analytics';
import '../styles/admin.css';

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to admin
    const authStatus = sessionStorage.getItem('ftdiam_admin_auth');
    if (authStatus === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (checkAdminAuth(login, password)) {
      sessionStorage.setItem('ftdiam_admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login to System</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login">Username</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="admin-button">Sign In</button>
        </form>
        <div className="back-link">
          <a href="/">Return to home page</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 