import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OTPVerify() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  // 2 Min Countdown Timer
  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus Next Input Box
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace నొక్కినప్పుడు పాత బాక్స్‌కి వెళ్ళడం
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      // 🔴 డైరెక్ట్ గా పోర్ట్ 5000 కి కనెక్ట్ చేస్తున్నాం
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, otp: otpCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg('Email verified successfully! Redirecting...');
        setTimeout(() => {
          navigate('/login', { state: { message: 'Email verified! Please login.' } });
        }, 1500);
      } else {
        setError(data.message || 'Verification failed. Invalid or expired OTP.');
      }
    } catch (err) {
      setError('Server connection error. Please make sure backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1d', padding: '20px' }}>
      <div 
        style={{ 
          padding: '40px 30px', 
          maxWidth: '440px', 
          width: '100%', 
          textAlign: 'center',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Shield Icon */}
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0) 70%)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
        }}>
          <span style={{ fontSize: '32px' }}>🛡️</span>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
          Security Verification
        </h2>
        
        <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px' }}>
          Enter the 6-digit verification code sent to <br />
          <strong style={{ color: '#38bdf8', fontWeight: '600' }}>{email || 'your email'}</strong>
        </p>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', padding: '12px', borderRadius: '10px', marginBottom: '20px', fontSize: '13px' }}>
            {error}
          </div>
        )}

        {successMsg && (
          <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac', padding: '12px', borderRadius: '10px', marginBottom: '20px', fontSize: '13px' }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }} onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onFocus={(e) => e.target.select()}
                style={{
                  width: '48px',
                  height: '56px',
                  borderRadius: '12px',
                  border: digit ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.15)',
                  background: digit ? 'rgba(99, 102, 241, 0.15)' : 'rgba(0,0,0,0.4)',
                  color: '#ffffff',
                  fontSize: '22px',
                  textAlign: 'center',
                  fontWeight: '700',
                  outline: 'none',
                  boxShadow: digit ? '0 0 12px rgba(99, 102, 241, 0.3)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              border: 'none',
              color: '#ffffff',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Verifying Code...' : 'Verify Email'}
          </button>
        </form>

        <div style={{ marginTop: '24px', fontSize: '14px', color: '#94a3b8' }}>
          {timer > 0 ? (
            <span>Resend code in <strong style={{ color: '#38bdf8' }}>{formatTime(timer)}</strong></span>
          ) : (
            <span>
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={() => alert('New OTP requested. Please check your mail/terminal.')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6366f1',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0
                }}
              >
                Resend OTP
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}