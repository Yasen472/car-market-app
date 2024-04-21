import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext.js';

const Login = () => {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoggedIn, login, logout } = useAuth();

  const URL = 'http://localhost:5000/auth'

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can perform any validation or additional logic here before sending the data
    const userData = {
      email: email,
      password: password,
    };
  
    try {
      // Make a request to your login endpoint
      const response = await axios.post(`${URL}/login`, {
        email: email,
        password: password,
      });

      // Handle the response from the server as needed
      console.log('Login successful:', response.data);
      login();

      // Clear form fields and error message after successful registration
      setEmail('');
      setPassword('');
      navigate('/')
      // Navigate('/');
    } catch (error) {
      // Handle login error
      console.error('Error during login:', error);
    }
  
  
  };

  return (
    <div className="login-page">
      <div className='login-container'>
        <h3 className='login-header'>Login</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          <button type="submit" className='login-btn'>Login</button>
        </form>
      </div>
      </div>
  );
};

export default Login;
