import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Bell, 
  Globe, 
  Lock, 
  Sliders, 
  Database, 
  CheckCircle2,
  Save
} from 'lucide-react';

export const ConsoleSettings = () => {
  const [saved, setSaved] = useState(false);
  const [thresholds, setThresholds] = useState({
    criticalScore: 80,
    highScore: 65,
    baselineDeltaSensitivity: 25,
    consecutiveMissedCheckins: 3,
    autoEscalateHours: 4
  });

  const [safeContact, setSafeContact] = useState({
    defaultSafeWindow: "10:00 AM - 01:00 PM",
    discreetCamouflageKey: "Escape",
    lowBandwidthDefault: false,
    discreetSMSMask: "KisanSeva / GramVikas"
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="console-content">
      
      {/* Page Header */}
      <div className="console-page-header">
        <div className="console-title-group">
          <h1>OPERATIONAL SETTINGS & CALIBRATION</h1>
          <p>Clinical thresholds, Safe-Contact rules, Bhashini AI language connectors, and DPDP 2023 audit parameters.</p>
        </div>

        <button 
          className="c-btn c-btn-primary"
          onClick={handleSave}
        >
          {saved ? <CheckCircle2 size={15} /> : <Save size={15} />}
          <span>{saved ? "Settings Saved ✓" : "Save Changes"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        
        {/* Left Column: Clinical Distress Thresholds */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="console-card">
            <div className="console-card-header">
              <span className="console-card-title">Clinical Risk Thresholds & Calibration</span>
              <span className="c-badge c-badge-critical">NIMHANS CLINICAL ENGINE</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <label style={{ fontWeight: 600 }}>Critical Escalation Score (DDS 0–100)</label>
                  <strong style={{ color: '#B42318' }}>{thresholds.criticalScore} / 100</strong>
                </div>
                <input 
                  type="range" 
                  min="60" 
                  max="95" 
                  value={thresholds.criticalScore}
                  onChange={(e) => setThresholds({ ...thresholds, criticalScore: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#667085' }}>
                  Scores at or above this threshold trigger mandatory immediate clinician alert.
                </span>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <label style={{ fontWeight: 600 }}>Personal Baseline Delta Sensitivity</label>
                  <strong style={{ color: '#D97706' }}>+{thresholds.baselineDeltaSensitivity} points</strong>
                </div>
                <input 
                  type="range" 
                  min="15" 
                  max="45" 
                  value={thresholds.baselineDeltaSensitivity}
                  onChange={(e) => setThresholds({ ...thresholds, baselineDeltaSensitivity: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#667085' }}>
                  Deviation from survivor's personal established baseline required to flag risk.
                </span>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <label style={{ fontWeight: 600 }}>Consecutive Missed Check-ins to Escalate</label>
                  <strong style={{ color: '#17324D' }}>{thresholds.consecutiveMissedCheckins} cycles</strong>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={thresholds.consecutiveMissedCheckins}
                  onChange={(e) => setThresholds({ ...thresholds, consecutiveMissedCheckins: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#667085' }}>
                  Number of missed pulse responses before generating High priority welfare check.
                </span>
              </div>
            </div>
          </div>

          {/* Safe-Contact Protocol Defaults */}
          <div className="console-card">
            <div className="console-card-header">
              <span className="console-card-title">Safe-Contact Protocol Defaults</span>
              <span className="c-badge c-badge-safe">VICTIM PRIVACY</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.82rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>
                  Default Safe Contact Time Window
                </label>
                <input 
                  type="text" 
                  value={safeContact.defaultSafeWindow}
                  onChange={(e) => setSafeContact({ ...safeContact, defaultSafeWindow: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #E4E7EC', borderRadius: '6px', fontSize: '0.82rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>
                  Discreet Camouflage Sender Mask (SMS / IVRS Caller ID)
                </label>
                <input 
                  type="text" 
                  value={safeContact.discreetSMSMask}
                  onChange={(e) => setSafeContact({ ...safeContact, discreetSMSMask: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #E4E7EC', borderRadius: '6px', fontSize: '0.82rem' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#667085' }}>
                  Inconspicuous sender ID displayed on survivor's device to prevent perpetrator suspicion.
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>
                  Quick Exit Camouflage Shortcut
                </label>
                <input 
                  type="text" 
                  value={safeContact.discreetCamouflageKey}
                  disabled
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #E4E7EC', borderRadius: '6px', background: '#F8FAFC', fontSize: '0.82rem' }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: AI Language Models & DPDP 2023 Compliance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Bhashini Connectors */}
          <div className="console-card">
            <div className="console-card-header">
              <span className="console-card-title">Bhashini Multilingual AI Connectors</span>
              <span className="c-badge c-badge-info">BHASHINI AI4BHARAT</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
              {[
                { lang: "Hindi (हिन्दी)", status: "Active & Calibrated", code: "hi", verified: true },
                { lang: "Tamil (தமிழ்)", status: "Active & Calibrated", code: "ta", verified: true },
                { lang: "Telugu (తెలుగు)", status: "Active & Calibrated", code: "te", verified: true },
                { lang: "Marathi (मराठी)", status: "Active & Calibrated", code: "mr", verified: true },
                { lang: "Bengali (বাংলা)", status: "Pilot Active", code: "bn", verified: true }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', border: '1px solid #E4E7EC', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Globe size={14} color="#2563EB" />
                    <strong>{item.lang}</strong>
                  </div>
                  <span className="c-badge c-badge-safe">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Statutory & Privacy Standards */}
          <div className="console-card">
            <div className="console-card-header">
              <span className="console-card-title">Statutory & Privacy Compliance</span>
              <span className="c-badge c-badge-safe">SECURE</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Lock size={15} color="#15803D" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Digital Personal Data Protection (DPDP) Act 2023:</strong>
                  <div style={{ fontSize: '0.74rem', color: '#667085' }}>
                    Data minimization, end-to-end encryption, and purpose limitation applied to all survivor telemetry.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <ShieldCheck size={15} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>SC/ST (Prevention of Atrocities) Act 1989 & Sec 15A:</strong>
                  <div style={{ fontSize: '0.74rem', color: '#667085' }}>
                    Witness protection mandate and relief fund disbursement compliance strictly enforced.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle2 size={15} color="#17324D" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Responsible AI Governance:</strong>
                  <div style={{ fontSize: '0.74rem', color: '#667085' }}>
                    Zero autonomous statutory dispatches. All police and legal actions require authorized human review.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
