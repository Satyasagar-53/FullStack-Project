// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    
    // For now, let's mock a successful login
    if (email && password) {
      alert(`👋 Welcome back, ${email}!`);
      
      // Send them to the homepage after logging in
      navigate('/');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '4rem auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Sign In</h2>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontWeight: '500', color: '#555' }}>Email Address</label>
          <input 
            type="email" 
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontWeight: '500', color: '#555' }}>Password</label>
          <input 
            type="password" 
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
            required
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            backgroundColor: '#007BFF', 
            color: 'white', 
            border: 'none', 
            padding: '0.75rem', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            fontSize: '1rem',
            fontWeight: 'bold',
            marginTop: '0.5rem'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}