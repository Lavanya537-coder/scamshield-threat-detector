import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state?.resultData;

  if (!resultData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <h2>No Scan Data Found</h2>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ marginTop: '20px', padding: '10px 20px', background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const score = resultData.riskScore ?? 0;
  const isHighRisk = score > 50;

  return (
    <div style={{ minHeight: '100vh', width: '100vw', padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#030712', color: '#fff' }}>
      <div style={{ maxWidth: '600px', width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
        
        <div style={{ marginBottom: '20px', display: 'inline-block', padding: '16px', borderRadius: '50%', background: isHighRisk ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)' }}>
          {isHighRisk ? <ShieldAlert size={48} color="#ef4444" /> : <ShieldCheck size={48} color="#22c55e" />}
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: isHighRisk ? '#ef4444' : '#22c55e' }}>
          {resultData.riskLevel || (isHighRisk ? 'HIGH RISK' : 'LOW RISK')}
        </h1>

        <div style={{ fontSize: '48px', fontWeight: '900', margin: '16px 0', color: isHighRisk ? '#ef4444' : '#22c55e' }}>
          {score}% <span style={{ fontSize: '18px', color: '#94a3b8' }}>Risk Score</span>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', textAlign: 'left', marginBottom: '24px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#94a3b8' }}><strong>Status:</strong> {resultData.status}</p>
          <p style={{ margin: 0, fontSize: '15px', color: '#f8fafc' }}><strong>Analysis:</strong> {resultData.message}</p>
        </div>

        <button 
          onClick={() => navigate('/dashboard')}
          style={{ width: '100%', padding: '14px', background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <ArrowLeft size={18} /> Scan Another Item
        </button>

      </div>
    </div>
  );
}