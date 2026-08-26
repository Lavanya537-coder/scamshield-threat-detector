import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, HelpCircle, UserPlus, LogIn, Lock, Cpu, X, CheckCircle2, ShieldAlert, AlertTriangle, ArrowRight, Check, AlertCircle } from 'lucide-react';

export default function Home() {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'otp', 'risk', 'threat'
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', width: '100vw', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
      
      {/* Background Cyber Grid & Glow Orbs */}
      <div className="cyber-grid"></div>
      <div className="glow-orb-1"></div>
      <div className="glow-orb-2"></div>

      {/* Top Navbar */}
      <nav style={{ position: 'relative', zIndex: 10, padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(3, 7, 18, 0.6)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '8px', background: 'rgba(109, 40, 217, 0.2)', border: '1px solid #6d28d9', borderRadius: '10px' }}>
            <ShieldCheck size={28} color="#38bdf8" />
          </div>
          <span className="tech-gradient-text" style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '1px' }}>SCAMSHIELD AI</span>
        </div>

        <button 
          onClick={() => setShowGuidelines(true)} 
          style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
          <HelpCircle size={18} /> App Guidelines
        </button>
      </nav>

      {/* Main Full Page Hero Content */}
      <main style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1100px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
          
          {/* Left Text Column */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(109, 40, 217, 0.15)', border: '1px solid rgba(124, 58, 237, 0.4)', borderRadius: '20px', marginBottom: '20px' }}>
              <Cpu size={16} color="#c084fc" />
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#c084fc', letterSpacing: '1px' }}>ENTERPRISE CYBER DEFENSE</span>
            </div>

            <h1 className="tech-gradient-text" style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1.15', marginBottom: '20px' }}>
              Real-Time AI Scam & Threat Detector
            </h1>

            <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: '1.6', marginBottom: '36px' }}>
              Protect yourself from online fraud, phishing links, and fake bank messages using our advanced AI risk engine.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/login')} className="btn-cyber-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LogIn size={20} /> Access Portal (Login)
              </button>
              
              <button onClick={() => navigate('/register')} className="btn-cyber-outline" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <UserPlus size={20} /> Register Account
              </button>
            </div>
          </div>

          {/* Right Interactive Features Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div 
              onClick={() => setActiveModal('otp')} 
              className="dark-glass" 
              style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <div style={{ padding: '14px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '12px', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
                <Lock size={28} color="#0284c7" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#f8fafc' }}>Secure OTP Authentication</h3>
                <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Click to see how 2FA protects user access.</p>
              </div>
            </div>

            <div 
              onClick={() => setActiveModal('risk')} 
              className="dark-glass" 
              style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <div style={{ padding: '14px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <ShieldAlert size={28} color="#ef4444" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#f8fafc' }}>AI Risk & Safety Scores</h3>
                <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Click to see how AI calculates risk %.</p>
              </div>
            </div>

            <div 
              onClick={() => setActiveModal('threat')} 
              className="dark-glass" 
              style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <div style={{ padding: '14px', background: 'rgba(109, 40, 217, 0.15)', borderRadius: '12px', border: '1px solid rgba(109, 40, 217, 0.3)' }}>
                <AlertTriangle size={28} color="#c084fc" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#f8fafc' }}>Multi-Source Threat Detection</h3>
                <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Click to view supported scam detection sources.</p>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Feature Modals */}
      {activeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(3, 7, 18, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div className="dark-glass" style={{ padding: '36px', maxWidth: '500px', width: '100%', position: 'relative', textAlign: 'left' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '50%' }}>
              <X size={20} />
            </button>

            {/* Modal 1: OTP Info */}
            {activeModal === 'otp' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Lock size={26} color="#38bdf8" />
                  <h3 className="tech-gradient-text" style={{ fontSize: '22px', fontWeight: '800' }}>2-Factor OTP Protection</h3>
                </div>
                <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '14px', marginBottom: '20px' }}>
                  Our system verifies user registration using live 6-digit email tokens via Nodemailer backend.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#cbd5e1', fontSize: '13px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#22c55e" /> Prevents fake spam registrations & bots</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#22c55e" /> Validates authentic user Gmail inbox</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#22c55e" /> Encrypted token expiration timer</div>
                </div>
              </>
            )}

            {/* Modal 2: Risk Engine Info */}
            {activeModal === 'risk' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <ShieldAlert size={26} color="#ef4444" />
                  <h3 className="tech-gradient-text" style={{ fontSize: '22px', fontWeight: '800' }}>AI Risk Scoring Engine</h3>
                </div>
                <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '14px', marginBottom: '20px' }}>
                  Calculates probability score (0-100%) by inspecting text urgency patterns and malicious indicators.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#cbd5e1', fontSize: '13px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={16} color="#ef4444" /> 80% - 100%: Urgent Threat / Fraud Phishing</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={16} color="#f59e0b" /> 40% - 79%: Suspicious Unverified Domain</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#22c55e" /> 0% - 39%: Safe Verified Content</div>
                </div>
              </>
            )}

            {/* Modal 3: Threat Detection Info */}
            {activeModal === 'threat' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <AlertTriangle size={26} color="#c084fc" />
                  <h3 className="tech-gradient-text" style={{ fontSize: '22px', fontWeight: '800' }}>Multi-Source Input Support</h3>
                </div>
                <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '14px', marginBottom: '20px' }}>
                  The scanner accepts three primary input vectors to detect fraud across different mediums.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#cbd5e1', fontSize: '13px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#c084fc" /> <strong>Raw Text:</strong> Bank SMS, Telegram/WhatsApp text messages</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#c084fc" /> <strong>URL Link:</strong> Fake login portals & phishing domains</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#c084fc" /> <strong>Image File:</strong> Fake payment receipts & chat screenshots</div>
                </div>
              </>
            )}

            <button onClick={() => setActiveModal(null)} className="btn-cyber-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Close Information
            </button>
          </div>
        </div>
      )}

      {/* Tech Guidelines Modal */}
      {showGuidelines && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(3, 7, 18, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div className="dark-glass" style={{ padding: '40px', maxWidth: '540px', width: '100%', position: 'relative', textAlign: 'left' }}>
            <button onClick={() => setShowGuidelines(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '50%' }}>
              <X size={20} />
            </button>
            
            <h3 className="tech-gradient-text" style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px' }}>System Guidelines</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', color: '#94a3b8', fontSize: '15px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <CheckCircle2 color="#38bdf8" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div><strong style={{ color: '#fff' }}>1. Registration:</strong> Click Register, fill in your details, and enter the 6-digit Email OTP.</div>
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <CheckCircle2 color="#c084fc" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div><strong style={{ color: '#fff' }}>2. Authentication:</strong> Access Portal click chesi log in avvandi.</div>
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <CheckCircle2 color="#38bdf8" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div><strong style={{ color: '#fff' }}>3. Dashboard Scanner:</strong> Portal dashboard lo content input chesi scan start cheyyandi.</div>
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <CheckCircle2 color="#c084fc" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div><strong style={{ color: '#fff' }}>4. Risk Analysis Page:</strong> Risk Score % and safety suggestions chudandi.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ position: 'relative', zIndex: 10, padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#475569', fontSize: '13px' }}>
        ScamShield AI Engine • Dark Cyber Security Portal
      </footer>

    </div>
  );
}