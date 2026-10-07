import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  HelpCircle, 
  CheckCircle, 
  TrendingUp, 
  Info, 
  FileText, 
  UserCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ExplainabilityDrawer = ({ 
  isOpen, 
  onClose, 
  caseData, 
  onConfirmConcern,
  onDismissAlert 
}) => {
  if (!isOpen || !caseData) return null;

  const [reviewNote, setReviewNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const signals = caseData.contributingSignals || [
    { name: "Court event proximity", weight: 18, desc: "Sessions Court trial hearing approaching in 6 days." },
    { name: "Reported threat", weight: 16, desc: "Direct intimidation statement recorded during morning check-in." },
    { name: "Reduced engagement", weight: 11, desc: "48h response delay and high acoustic hesitation latency." },
    { name: "Self-reported distress", weight: 9, desc: "Survivor indicated 'I don't feel safe' with sleep disruption." },
    { name: "Recent case event", weight: 8, desc: "Co-accused bail petition accepted by Additional Sessions Judge." }
  ];

  const handleConfirm = () => {
    setConfirmed(true);
    if (onConfirmConcern) {
      onConfirmConcern(caseData.id, reviewNote || "Clinically reviewed: Verbal threat and acoustic tremor verified. Immediate protection advised.");
    }
    setTimeout(() => {
      onClose();
      setConfirmed(false);
    }, 800);
  };

  return (
    <div className="console-drawer-overlay" onClick={onClose}>
      <div className="console-drawer" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="console-drawer-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="c-badge c-badge-critical">EXPLAINABLE AI ATTRIBUTION</span>
              <span style={{ fontSize: '0.75rem', color: '#667085' }}>{caseData.modelVersion || 'DDS Prototype v1.2'}</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#172033', marginTop: '6px' }}>
              WHY WAS THIS CASE FLAGGED?
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#667085', marginTop: '2px' }}>
              Case #{caseData.caseNumber || caseData.id} • {caseData.citizenName || 'Protected Citizen'}
            </div>
          </div>
          <button className="console-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="console-drawer-body">
          
          {/* Signal vs Baseline Comparison */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E4E7EC',
            borderRadius: '10px',
            padding: '16px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#667085' }}>
                Current Signal
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#B42318', marginTop: '4px' }}>
                {caseData.currentScore || 84} <span style={{ fontSize: '0.9rem', color: '#98A2B3' }}>/ 100</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#B42318', fontWeight: 600 }}>Potential Acute Distress</div>
            </div>

            <div style={{ borderLeft: '1px solid #E4E7EC', borderRight: '1px solid #E4E7EC' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#667085' }}>
                Personal Baseline
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#172033', marginTop: '4px' }}>
                {caseData.baselineScore || 28}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#15803D', fontWeight: 600 }}>Individual Norm</div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#667085' }}>
                Deviation
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>
                {caseData.deviation || '+56'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#D97706', fontWeight: 600 }}>Significant Shift</div>
            </div>
          </div>

          {/* Model Confidence & Specification */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#FFFFFF', border: '1px solid #E4E7EC', borderRadius: '8px', fontSize: '0.8rem' }}>
            <span style={{ color: '#667085' }}>Model Confidence:</span>
            <span style={{ fontWeight: 700, color: '#172033' }}>{caseData.confidence || 87}% Signal Confidence</span>
            <span style={{ color: '#E4E7EC' }}>|</span>
            <span style={{ color: '#667085' }}>Engine:</span>
            <span style={{ fontWeight: 600, color: '#2563EB' }}>DDS Multimodal v1.2</span>
          </div>

          {/* Contributing Signals Breakdown */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#172033', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>CONTRIBUTING SIGNALS (FACTOR ATTRIBUTION)</span>
              <span style={{ fontSize: '0.72rem', color: '#667085', fontWeight: 500 }}>Points Added</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {signals.map((sig, idx) => (
                <div 
                  key={idx}
                  style={{
                    border: '1px solid #E4E7EC',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    background: '#FFFFFF'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#172033' }}>
                      {sig.name}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#B42318' }}>
                      +{sig.weight}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#667085', lineHeight: 1.45 }}>
                    {sig.desc}
                  </div>
                  {/* Subtle bar */}
                  <div style={{ height: '4px', background: '#F2F4F7', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${Math.min(100, (sig.weight / 25) * 100)}%`, 
                        background: sig.weight >= 15 ? '#B42318' : '#D97706',
                        borderRadius: '2px' 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transcript Snippet / Voice Acoustic Factor */}
          {caseData.voiceMetrics?.audioTranscript && (
            <div style={{ border: '1px solid #E4E7EC', borderRadius: '8px', padding: '14px', background: '#FAFAFA' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#172033', textTransform: 'uppercase', marginBottom: '6px' }}>
                Key Signal Excerpt (Speech / IVRS Audio)
              </div>
              <p style={{ fontSize: '0.82rem', color: '#475467', fontStyle: 'italic', lineHeight: 1.5 }}>
                "{caseData.voiceMetrics.audioTranscript}"
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '0.74rem', color: '#667085' }}>
                <span>Pitch Tremor: <strong style={{ color: '#B42318' }}>{caseData.voiceMetrics.pitchTremorHz} Hz</strong></span>
                <span>Pause Ratio: <strong style={{ color: '#D97706' }}>{caseData.voiceMetrics.pauseRatioPercent}%</strong></span>
                <span>Speech Rate: <strong>{caseData.voiceMetrics.speechRateWPM} WPM</strong></span>
              </div>
            </div>
          )}

          {/* Mandatory Responsible AI Disclaimer */}
          <div className="console-ai-disclaimer">
            <Info size={18} style={{ color: '#2563EB', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 700, color: '#172033', marginBottom: '2px' }}>
                AI SUPPORTS — HUMANS DECIDE
              </div>
              <div>
                This is an <strong>AI-generated decision-support signal</strong> indicating a potential acute distress escalation and significant deviation from personal baseline. It does <strong>not</strong> constitute a clinical psychiatric diagnosis or autonomous statutory order. Mandatory human review by authorized clinical personnel is required before consequential action.
              </div>
            </div>
          </div>

          {/* Clinician Review Notes Input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#172033', marginBottom: '6px' }}>
              Clinician Assessment & Verification Notes
            </label>
            <textarea
              rows={3}
              placeholder="Enter clinical observations, risk factors confirmed, or dispatch directives..."
              value={reviewNote}
              onChange={(e) => setReviewNote(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #E4E7EC',
                borderRadius: '8px',
                fontSize: '0.82rem',
                color: '#172033',
                outline: 'none',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="console-drawer-footer">
          <button 
            className="c-btn c-btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          {onDismissAlert && (
            <button 
              className="c-btn c-btn-secondary"
              onClick={() => {
                onDismissAlert(caseData.id);
                onClose();
              }}
              style={{ color: '#667085' }}
            >
              Mark False Positive
            </button>
          )}

          <button 
            className="c-btn c-btn-primary"
            onClick={handleConfirm}
            disabled={confirmed}
          >
            {confirmed ? (
              <>
                <CheckCircle size={15} />
                <span>Concern Confirmed ✓</span>
              </>
            ) : (
              <>
                <UserCheck size={15} />
                <span>Confirm Concern & Recommend Action</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
