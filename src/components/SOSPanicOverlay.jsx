import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldAlert, 
  Radio, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  X, 
  EyeOff, 
  VolumeX 
} from 'lucide-react';

export const SOSPanicOverlay = () => {
  const { modalState, closeModal } = useApp();
  if (modalState.type !== 'SOS') return null;

  const caseData = modalState.caseData;
  const [silentMode, setSilentMode] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setDispatched(true);
    }
  }, [countdown]);

  return (
    <div className="modal-backdrop" style={{ background: silentMode ? 'rgba(0,0,0,0.98)' : 'rgba(30, 0, 0, 0.92)' }}>
      <div className="modal-content" style={{ maxWidth: '580px', border: silentMode ? '1px solid #334155' : '2px solid #ef4444', boxShadow: 'var(--shadow-critical)', padding: '2rem', textAlign: 'center' }}>
        
        {!silentMode && (
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '2px solid #ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            animation: 'pulseGlow 1.5s infinite'
          }}>
            <ShieldAlert size={34} color="#ef4444" />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
          <span className="live-indicator" />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em' }}>
            {silentMode ? 'DISCREET SECURITY TRANSMISSION' : 'EMERGENCY SOS BEACON ACTIVE'}
          </h2>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#fca5a5', marginBottom: '1.5rem', lineHeight: 1.45 }}>
          {silentMode 
            ? 'Screen dimmed for your safety. Location and emergency assistance requests are being silently routed.'
            : 'Immediate emergency alert transmitted to District Police Control Room (Dial 112) and NHAA 14566 Rapid Response Unit.'}
        </p>

        {/* Live Status Details */}
        <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-sm)', padding: '1rem', textAlign: 'left', marginBottom: '1.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.65rem', fontSize: '0.8rem', color: '#f8fafc' }}>
            <MapPin size={16} color="#ef4444" />
            <span><strong>Target Geolocation:</strong> 27.8974° N, 78.0880° E ({caseData?.district || 'Aligarh'}, {caseData?.state || 'UP'})</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.65rem', fontSize: '0.8rem', color: '#f8fafc' }}>
            <Radio size={16} color="#38bdf8" />
            <span><strong>Dispatched Units:</strong> PCR Van #14 + Station House Officer (PS Sasni Gate)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#10b981' }}>
            <CheckCircle2 size={16} />
            <span><strong>National Helpline 14566:</strong> Crisis Counselor Bridge connected</span>
          </div>

        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => setSilentMode(!silentMode)}
            style={{ fontSize: '0.8rem', gap: '6px' }}
          >
            {silentMode ? <EyeOff size={15} /> : <VolumeX size={15} />}
            <span>{silentMode ? 'Exit Discreet Mode' : 'Switch to Discreet Stealth Mode'}</span>
          </button>

          <button 
            className="btn btn-danger"
            onClick={closeModal}
            style={{ fontSize: '0.8rem' }}
          >
            Acknowledge & Dismiss Alert
          </button>
        </div>

      </div>
    </div>
  );
};
