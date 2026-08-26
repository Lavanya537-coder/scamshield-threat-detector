import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, FileText, Link, Upload, AlertCircle, Scan, Cpu, User, Mail, ChevronDown } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('text');
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('User');
  const [userEmail, setUserEmail] = useState('user@example.com');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // LocalStorage నుండి యూజర్ పేరు మరియు ఈమెయిల్ తీసుకోవడం
    const storedName = localStorage.getItem('userFullName');
    if (storedName) {
      setFullName(storedName);
    }

    // లాగిన్ సమయంలో లేదా యూజర్ ఆబ్జెక్ట్ నుండి ఈమెయిల్ సెట్ చేసుకోవడం
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (typeof parsedUser === 'string') {
          setUserEmail(parsedUser);
        } else if (parsedUser.email) {
          setUserEmail(parsedUser.email);
        }
      } catch (e) {
        setUserEmail(storedUser);
      }
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userFullName');
    navigate('/login');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleScanSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'file' && !selectedFile) {
      setError('Please select an image file to upload.');
      return;
    }

    if ((activeTab === 'text' || activeTab === 'link') && !inputText.trim()) {
      setError('Please enter text or link content to scan.');
      return;
    }

    setLoading(true);

    try {
      let apiEndpoint = '';
      let requestOptions = {};

      if (activeTab === 'link') {
        apiEndpoint = 'http://localhost:5000/api/scan/url';
        requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: inputText.trim() }),
        };
      } else if (activeTab === 'text') {
        apiEndpoint = 'http://localhost:5000/api/scan/text';
        requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: inputText.trim() }),
        };
      } else if (activeTab === 'file') {
        apiEndpoint = 'http://localhost:5000/api/scan/image';
        const formData = new FormData();
        formData.append('file', selectedFile);
        requestOptions = {
          method: 'POST',
          body: formData,
        };
      }

      const response = await fetch(apiEndpoint, requestOptions);
      const resultData = await response.json();

      setLoading(false);

      if (response.ok) {
        navigate('/results', { state: { resultData, type: activeTab } });
      } else {
        setError(resultData.message || resultData.error || 'Scan failed.');
      }

    } catch (err) {
      setLoading(false);
      setError('Backend server connection failed. Make sure Spring Boot is running on port 5000.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="cyber-grid"></div>
      <div className="glow-orb-1"></div>
      <div className="glow-orb-2"></div>

      {/* Header Section */}
      <header style={{ position: 'relative', zIndex: 100, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(3, 7, 18, 0.85)', backdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '10px', background: 'rgba(109, 40, 217, 0.25)', border: '1px solid #7c3aed', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={30} color="#38bdf8" />
          </div>
          <div>
            <h1 className="tech-gradient-text" style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '0.5px', margin: 0 }}>SCAMSHIELD PORTAL</h1>
            <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>AI Threat Intelligence Platform</span>
          </div>
        </div>

        {/* Right Side: Profile Dropdown with Name & Email */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <div 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(124, 58, 237, 0.4)', padding: '8px 16px', borderRadius: '30px', cursor: 'pointer', transition: 'all 0.3s' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={18} color="#fff" />
            </div>
            <span style={{ color: '#f8fafc', fontWeight: '600', fontSize: '14px' }}>Hello, {fullName}</span>
            <ChevronDown size={16} color="#94a3b8" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div style={{ position: 'absolute', right: 0, top: '50px', width: '240px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(124, 58, 237, 0.4)', borderRadius: '14px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', overflow: 'hidden', zIndex: 1000, backdropFilter: 'blur(10px)' }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={12} /> Signed in as
                </p>
                <p style={{ color: '#fff', fontSize: '14px', fontWeight: '700', margin: '2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fullName}</p>
                <p style={{ color: '#38bdf8', fontSize: '12px', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mail size={12} /> {userEmail}
                </p>
              </div>
              <button 
                onClick={handleLogout}
                style={{ width: '100%', background: 'transparent', border: 'none', color: '#ef4444', padding: '12px 16px', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', fontSize: '14px', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(109, 40, 217, 0.15)', border: '1px solid rgba(124, 58, 237, 0.4)', borderRadius: '20px', marginBottom: '16px' }}>
              <Cpu size={16} color="#c084fc" />
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#c084fc', letterSpacing: '1px' }}>AI THREAT SCANNER ENGINE</span>
            </div>
            <h1 className="tech-gradient-text" style={{ fontSize: '36px', fontWeight: '800' }}>Scan Suspicious Content</h1>
            <p style={{ color: '#94a3b8', fontSize: '16px', marginTop: '8px' }}>Select input method below to verify risk & scam probability</p>
          </div>

          <div className="dark-glass" style={{ padding: '36px', borderRadius: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '28px', background: 'rgba(15, 23, 42, 0.6)', padding: '6px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <button 
                type="button"
                onClick={() => { setActiveTab('text'); setError(''); setInputText(''); }}
                style={{ background: activeTab === 'text' ? 'rgba(109, 40, 217, 0.3)' : 'transparent', border: activeTab === 'text' ? '1px solid #6d28d9' : '1px solid transparent', color: activeTab === 'text' ? '#fff' : '#64748b', padding: '12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}>
                <FileText size={18} /> Raw Text
              </button>

              <button 
                type="button"
                onClick={() => { setActiveTab('link'); setError(''); setInputText(''); }}
                style={{ background: activeTab === 'link' ? 'rgba(109, 40, 217, 0.3)' : 'transparent', border: activeTab === 'link' ? '1px solid #6d28d9' : '1px solid transparent', color: activeTab === 'link' ? '#fff' : '#64748b', padding: '12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}>
                <Link size={18} /> URL Link
              </button>

              <button 
                type="button"
                onClick={() => { setActiveTab('file'); setError(''); }}
                style={{ background: activeTab === 'file' ? 'rgba(109, 40, 217, 0.3)' : 'transparent', border: activeTab === 'file' ? '1px solid #6d28d9' : '1px solid transparent', color: activeTab === 'file' ? '#fff' : '#64748b', padding: '12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}>
                <Upload size={18} /> Upload Image
              </button>
            </div>

            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <form onSubmit={handleScanSubmit}>
              {activeTab === 'text' && (
                <div style={{ marginBottom: '24px' }}>
                  <textarea 
                    rows={6}
                    placeholder="Paste suspicious message, SMS, bank notification..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{ width: '100%', padding: '16px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }}
                  />
                </div>
              )}

              {activeTab === 'link' && (
                <div style={{ marginBottom: '24px' }}>
                  <input 
                    type="url"
                    placeholder="Enter full link URL (e.g. https://www.amazon.in)"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{ width: '100%', padding: '16px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }}
                  />
                </div>
              )}

              {activeTab === 'file' && (
                <div style={{ marginBottom: '24px', border: '2px dashed rgba(124, 58, 237, 0.4)', borderRadius: '12px', padding: '32px', textAlign: 'center', background: 'rgba(15, 23, 42, 0.4)' }}>
                  <input 
                    type="file" 
                    id="fileUpload" 
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="fileUpload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <Upload size={32} color="#38bdf8" />
                    <span style={{ color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>
                      {selectedFile ? selectedFile.name : 'Click to upload screenshot or image'}
                    </span>
                  </label>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading} 
                className="btn-cyber-primary" 
                style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '16px' }}>
                <Scan size={20} />
                {loading ? 'Analyzing Content with AI...' : 'Execute Threat Analysis'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}