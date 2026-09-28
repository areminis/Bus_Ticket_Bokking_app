import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { normalizeRole, roleToPath } from '../utils/auth';
import '../styles/Login.css';

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '', role: 'Customer' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const loginPayload = {
        email: credentials.email,
        password: credentials.password,
      };
      const { data } = await authAPI.login(loginPayload);
      const backendUser = data?.user || data;
      const backendRole = normalizeRole(backendUser?.role);
      const selectedRole = normalizeRole(credentials.role);
      const resolvedRole = backendRole || selectedRole;

      if (backendRole && selectedRole && backendRole !== selectedRole) {
        throw new Error(`This account is registered as ${backendRole}, not ${selectedRole}.`);
      }

      const userData = {
        ...backendUser,
        role: resolvedRole,
        token: data?.token || null,
      };
      const nextPath = roleToPath(resolvedRole);
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate(nextPath ? `/${nextPath}` : '/');
    } catch (err) {
      const errorMessage =
        typeof err.response?.data === 'string'
          ? err.response.data
          : err.response?.data?.message || err.message || 'Login failed';

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">BusTicket Pro</h1>
          <p className="login-subtitle">Online Bus Ticketing System</p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error-alert">{error}</div>}
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="Enter your password" 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Login As</label>
              <select name="role" onChange={handleChange} value={credentials.role}>
                <option value="Customer">Customer</option>
                <option value="BusOwner">Bus Owner</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
