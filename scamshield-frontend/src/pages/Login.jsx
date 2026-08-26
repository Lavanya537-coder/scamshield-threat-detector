import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/api';
import { Mail, Lock, ShieldCheck, LogIn } from 'lucide-react';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const successMsg = location.state?.message || '';

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login({
        email: credentials.email,
        password: credentials.password
      });

      const loginData = response.data.data || response.data;
      
      // Token మరియు User వివరాలను సేవ్ చేయడం
      localStorage.setItem('token', loginData.token);
      
      // Backend నుండి వచ్చే యూజర్ ఫుల్ నేమ్ ని స్టోర్ చేసుకోవడం (లేకపోతే మెయిల్ ఐడీని డిస్‌ప్లే పేరుగా వాడొచ్చు)
      const fullName = loginData.user?.fullName || loginData.fullName || credentials.email.split('@')[0];
      localStorage.setItem('userFullName', fullName);
      localStorage.setItem('user', JSON.stringify(loginData.user || credentials.email));

      // Successful login navigation -> Scanner / Dashboard Page కి వెళ్తుంది
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="cyber-grid"></div>
      <div className="glow-orb-1"></div>
      <div className="glow-orb-2"></div>

      <div className="dark-glass" style={{ padding: '40px', maxWidth: '440px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(109, 40, 217, 0.2)', border: '1px solid #6d28d9', borderRadius: '16px', marginBottom: '12px' }}>
            <ShieldCheck size={36} color="#38bdf8" />
          </div>
          <h2 className="tech-gradient-text" style={{ fontSize: '28px', fontWeight: '800' }}>Portal Access</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>Sign in to scan suspicious messages & links</p>
        </div>

        {successMsg && (
          <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#4ade80', padding: '12px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
            {successMsg}
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Email Field Only */}
          <div style={{ position: 'relative' }}>
            <Mail size={18} color="#64748b" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
              value={credentials.email} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '14px 16px 14px 48px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }} 
            />
          </div>

          {/* Password Field */}
          <div style={{ position: 'relative' }}>
            <Lock size={18} color="#64748b" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
              value={credentials.password} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '14px 16px 14px 48px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }} 
            />
          </div>

          <button type="submit" disabled={loading} className="btn-cyber-primary" style={{ width: '100%', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            {loading ? 'Authenticating...' : 'Sign In'} <LogIn size={18} />
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#64748b', fontSize: '14px' }}>
          Don't have an account? <span onClick={() => navigate('/register')} style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: '600' }}>Register Now</span>
        </p>
      </div>
    </div>
  );
}