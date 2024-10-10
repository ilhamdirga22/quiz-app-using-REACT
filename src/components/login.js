import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      localStorage.setItem('username', username);
      navigate('/quiz');
    }
  };

  return (
    <div className="container">
      <h2>Welcome to the Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          required
        />
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default Login;
