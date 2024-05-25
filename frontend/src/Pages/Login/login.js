import React, { useState, useContext } from 'react';
import { Context } from '../store/context';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [currentUser, setCurrentUser] = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();

      if (response.status === 200){
        setCurrentUser(data.user);
        console.log(data.user);
        console.log(currentUser)
        setMessage('Login successful');
        console.log("User Data should display above")
        navigate('/Homepage');
      }

    } catch (error) {
      setMessage('Login failed. Please check your email and password.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {message && <div className="message">{message}</div>}

      <div>
        Don't have an account? <Link to="/signup">Sign up now</Link>
      </div>
    </div>
  );
};

export default Login;
