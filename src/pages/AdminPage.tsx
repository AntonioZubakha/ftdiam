import React, { useState, useEffect } from 'react';
import { getAnalyticsData, checkAdminAuth, resetAnalytics } from '../utils/analytics';
import { AdminPageData, ButtonClickCount } from '../interfaces/AnalyticsDataTypes';
import '../styles/admin.css';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [analyticsData, setAnalyticsData] = useState<AdminPageData | null>(null);
  const [loginError, setLoginError] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    const authStatus = sessionStorage.getItem('ftdiam_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadAnalyticsData();
    }
  }, []);

  const loadAnalyticsData = () => {
    const data = getAnalyticsData();
    setAnalyticsData(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (checkAdminAuth(login, password)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('ftdiam_admin_auth', 'true');
      loadAnalyticsData();
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ftdiam_admin_auth');
    setLogin('');
    setPassword('');
  };

  const handleResetAnalytics = () => {
    resetAnalytics();
    loadAnalyticsData();
    setShowResetConfirm(false);
  };

  // Calculate percentage for chart columns
  const calculatePercentage = (clicks: number) => {
    if (!analyticsData || !analyticsData.buttonClicks.length) return 0;
    
    const maxClicks = Math.max(...analyticsData.buttonClicks.map(btn => btn.clicks));
    return maxClicks === 0 ? 0 : (clicks / maxClicks) * 100;
  };

  return (
    <div className="admin-container">
      {!isAuthenticated ? (
        <div className="login-container">
          <h1>Admin Panel Login</h1>
          {loginError && <div className="error-message">{loginError}</div>}
          <form onSubmit={handleLogin} className="login-form">
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
        </div>
      ) : (
        <div className="admin-dashboard">
          <div className="admin-header">
            <h1>Administrator Dashboard</h1>
            <button onClick={handleLogout} className="admin-button logout-button">Sign Out</button>
          </div>

          {analyticsData && (
            <>
              <div className="stats-container">
                <div className="stats-box">
                  <h2>Visits</h2>
                  <div className="stats-data">
                    <div className="stat-item">
                      <span className="stat-label">Total:</span>
                      <span className="stat-value">{analyticsData.visitorStats.total}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Unique:</span>
                      <span className="stat-value">{analyticsData.visitorStats.unique}</span>
                    </div>
                  </div>
                </div>

                <div className="stats-box">
                  <h2>Button Clicks</h2>
                  <div className="button-stats">
                    {analyticsData.buttonClicks.map((button) => (
                      <div key={button.id} className="button-stat-item">
                        <div className="button-stat-info">
                          <span className="button-name">{button.name}</span>
                          <span className="button-clicks">{button.clicks}</span>
                        </div>
                        <div className="button-chart-container">
                          <div 
                            className="button-chart-bar"
                            style={{ width: `${calculatePercentage(button.clicks)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="admin-actions">
                {!showResetConfirm ? (
                  <button 
                    onClick={() => setShowResetConfirm(true)} 
                    className="admin-button reset-button"
                  >
                    Reset Statistics
                  </button>
                ) : (
                  <div className="confirm-dialog">
                    <p>Are you sure you want to reset all statistics?</p>
                    <div className="confirm-buttons">
                      <button 
                        onClick={handleResetAnalytics} 
                        className="admin-button confirm-yes"
                      >
                        Yes
                      </button>
                      <button 
                        onClick={() => setShowResetConfirm(false)} 
                        className="admin-button confirm-no"
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage; 