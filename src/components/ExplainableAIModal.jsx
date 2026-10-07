import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  FileText, 
  Activity, 
  Eye, 
  Cpu, 
  Lock 
} from 'lucide-react';

export const ExplainableAIModal = () => {
  const { modalState, closeModal } = useApp();
  if (modalState.type !== 'XAI' || !modalState.caseData) return null;

  const caseData = modalState.caseData;
  const factors = caseData.xaiAttribution || [];

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.75rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)' }}>
              <Sparkles size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Explainable AI (XAI) Factor Attribution
                </h2>
                <span className="badge badge-poa" style={{ fontSize: '0.65rem', background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', fontWeight: 700 }}>SHAP / LIME Model</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                Transparent risk score breakdown for <strong>{caseData.victimName}</strong> (DDS: <strong style={{ color: '#dc2626' }}>{caseData.dynamicDistressScore}/100</strong>)
              </p>
            </div>
          </div>

          <button 
            onClick={closeModal}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* System Summary Box */}
        <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 'var(--radius-sm)', padding: '0.95rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
            <Cpu size={16} />
            <span>Multi-Modal Predictive Risk Formulation</span>
          </div>
          <p style={{ fontSize: '0.76rem', color: '#334155', lineHeight: 1.5 }}>
            The Dynamic Distress Score (DDS) combines <strong>Acoustic Voice Stress Analytics (30%)</strong>, <strong>NLP Trauma & Threat Lexicon (35%)</strong>, <strong>External Procedural Stress / Court Proximity (20%)</strong>, and <strong>Behavioral Interaction Latency (15%)</strong>.
          </p>
        </div>

        {/* Attribution Bars */}
        <h4 style={{ fontSize: '0.82rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 700 }}>
          Relative Weightage in Crisis Prediction
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {factors.map((f, i) => (
            <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>
                  {f.factor}
                </span>
                <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0284c7', fontFamily: 'var(--font-mono)' }}>
                  {f.weight}% Contribution
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '6px' }}>
                <div 
                  style={{ 
                    width: `${f.weight * 2.5}%`, 
                    height: '100%', 
                    background: f.weight > 30 ? 'linear-gradient(90deg, #f97316, #ef4444)' : 'linear-gradient(90deg, #0284c7, #38bdf8)',
                    borderRadius: '4px'
                  }} 
                />
              </div>

              <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                {f.description}
              </div>
            </div>
          ))}
        </div>

        {/* Evidence & Ground Truth Excerpt */}
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', padding: '0.95rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b91c1c', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
            <FileText size={15} />
            <span>Auditable Empirical Evidence (14566 IVRS Excerpt)</span>
          </div>
          <blockquote style={{ fontSize: '0.78rem', color: '#7f1d1d', fontStyle: 'italic', borderLeft: '3px solid #dc2626', paddingLeft: '10px', margin: '4px 0', lineHeight: 1.45 }}>
            "{caseData.voiceAcousticMetrics?.audioTranscriptExcerpt}"
          </blockquote>
        </div>

        {/* Privacy & Legal Protection Compliance */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', borderTop: '1px solid #e2e8f0', fontSize: '0.72rem', color: '#64748b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={13} color="#16a34a" />
            <span>End-to-End Encrypted (AES-256) | Role-Based Access</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Scale size={13} color="#0284c7" />
            <span>SC/ST PoA Act Sec 15A & DPDP Act 2023 Compliant</span>
          </div>
        </div>

      </div>
    </div>
  );
};
