import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://8080-dfdaccffbaeccdbcacadadfbbcbbebfbde.premiumproject.examly.io/api/users/login', { email, password });
      if (auth && auth.login) {
        auth.login(response.data);
      }
      navigate('/');
    } catch (err) {
      setError('Invalid credentials, Retry');
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message" style={{ color: 'red' }}>[Error - You need to specify the message]</p>}
    </div>
  );
};

export default LoginPage;

