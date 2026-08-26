import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { User, Mail, Lock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authAPI.register(formData);
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="cyber-grid"></div>
      <div className="glow-orb-1"></div>
      <div className="glow-orb-2"></div>

      <div className="dark-glass" style={{ padding: '40px', maxWidth: '480px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(109, 40, 217, 0.2)', border: '1px solid #6d28d9', borderRadius: '16px', marginBottom: '12px' }}>
            <ShieldCheck size={36} color="#38bdf8" />
          </div>
          <h2 className="tech-gradient-text" style={{ fontSize: '28px', fontWeight: '800' }}>Create Account</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>Join ScamShield AI for real-time security</p>
        </div>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ position: 'relative' }}>
            <User size={18} color="#64748b" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input type="text" name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleChange} style={{ width: '100%', padding: '14px 16px 14px 48px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }} />
          </div>

          <div style={{ position: 'relative' }}>
            <Sparkles size={18} color="#64748b" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input type="text" name="username" placeholder="Username" required value={formData.username} onChange={handleChange} style={{ width: '100%', padding: '14px 16px 14px 48px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }} />
          </div>

          <div style={{ position: 'relative' }}>
            <Mail size={18} color="#64748b" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '14px 16px 14px 48px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }} />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} color="#64748b" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '14px 16px 14px 48px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }} />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} color="#64748b" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={handleChange} style={{ width: '100%', padding: '14px 16px 14px 48px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }} />
          </div>

          <button type="submit" disabled={loading} className="btn-cyber-primary" style={{ width: '100%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            {loading ? 'Creating Account...' : 'Continue to OTP Verification'} <ArrowRight size={18} />
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#64748b', fontSize: '14px' }}>
          Already registered? <span onClick={() => navigate('/login')} style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: '600' }}>Login</span>
        </p>
      </div>
    </div>
  );
}