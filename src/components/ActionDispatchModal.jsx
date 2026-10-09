import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ArrowLeft,
  ShieldCheck, 
  Send, 
  HeartHandshake, 
  Home, 
  Scale, 
  IndianRupee, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const ActionDispatchModal = () => {
  const { modalState, closeModal, handleDispatchAction } = useApp();
  if (modalState.type !== 'DISPATCH' || !modalState.caseData) return null;

  const caseData = modalState.caseData;

  const [selectedIntervention, setSelectedIntervention] = useState('WITNESS_PROTECTION');
  const [priority, setPriority] = useState('IMMEDIATE_URGENT');
  const [notes, setNotes] = useState('');
  const [targetOfficial, setTargetOfficial] = useState('Superintendent of Police (SP Control Room)');

  const INTERVENTION_OPTIONS = [
    {
      id: 'WITNESS_PROTECTION',
      title: 'Deploy Armed Police Witness Protection Escort',
      desc: 'Enforce 24x7 armed constabulary escort for victim & family under SC/ST PoA Rule 12 & Witness Protection Scheme.',
      authority: 'Superintendent of Police (SP)',
      icon: ShieldCheck,
      color: '#ef4444'
    },
    {
      id: 'SAFEHOUSE_RELOCATION',
      title: 'Order Relocation to District Secure Safehouse',
      desc: 'Immediate confidential evacuation of victim family to a secured district administrative accommodation.',
      authority: 'District Magistrate (DM)',
      icon: Home,
      color: '#f97316'
    },
    {
      id: 'PSYCHIATRIC_EMERGENCY',
      title: 'Dispatch Emergency Mobile Clinical Psychological Unit',
      desc: 'Emergency home/hospital visit by empanelled clinical psychologist within 4 hours for acute trauma stabilization.',
      authority: 'Chief Medical Officer (CMO) & DMHP',
      icon: HeartHandshake,
      color: '#38bdf8'
    },
    {
      id: 'COMPENSATION_FASTTRACK',
      title: 'Disburse Instant DBT Relief Grant (Annexure 1 PoA)',
      desc: 'Direct electronic fund transfer of statutory compensation installment to victim bank account within 24 hours.',
      authority: 'District Social Welfare Officer (DSWO)',
      icon: IndianRupee,
      color: '#10b981'
    },
    {
      id: 'LEGAL_AID_SPECIAL_PP',
      title: 'Fast-Track In-Camera Trial & Special PP Assignment',
      desc: 'Move urgent legal petition under PoA Rule 12 for video-screened witness box and appointment of senior advocate.',
      authority: 'District Legal Services Authority (DLSA)',
      icon: Scale,
      color: '#a855f7'
    }
  ];

  const handleConfirm = () => {
    const chosen = INTERVENTION_OPTIONS.find(o => o.id === selectedIntervention);
    handleDispatchAction(caseData.id, {
      type: selectedIntervention,
      title: chosen.title,
      authority: targetOfficial,
      priority,
      notes: notes || `Automated dispatch initiated via SAHAYA-360 for Case #${caseData.caseNumber || caseData.id}`
    });
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.75rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'linear-gradient(135deg, #16a34a, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(22, 163, 74, 0.25)' }}>
              <ShieldCheck size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Prescriptive Intervention Dispatch
                </h2>
                <span className="badge badge-critical" style={{ fontSize: '0.68rem' }}>
                  Risk Score: {caseData.dynamicDistressScore || caseData.currentScore || 84}/100
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                Target Case: <strong style={{ color: '#0f172a' }}>{caseData.victimName || caseData.citizenName || 'Protected Citizen'}</strong> | {caseData.district}, {caseData.state || caseData.location || 'Uttar Pradesh'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={closeModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '5px 12px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#334155',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Go back / Close"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>
            <button 
              onClick={closeModal}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form selection */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.55rem' }}>
            Select Statutory Atrocity Intervention
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {INTERVENTION_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedIntervention === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    setSelectedIntervention(opt.id);
                    setTargetOfficial(opt.authority);
                  }}
                  style={{
                    background: isSelected ? '#f0f9ff' : '#f8fafc',
                    border: isSelected ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    boxShadow: isSelected ? '0 4px 12px rgba(2, 132, 199, 0.12)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: isSelected ? '#e0f2fe' : '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={opt.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 700, color: isSelected ? '#0284c7' : '#0f172a' }}>
                        {opt.title}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>
                        Authority: <strong>{opt.authority}</strong>
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: '2px', lineHeight: 1.4 }}>
                      {opt.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Authority and Priority inputs */}
        <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Designated Dispatched Officer
            </label>
            <input
              type="text"
              value={targetOfficial}
              onChange={(e) => setTargetOfficial(e.target.value)}
              style={{
                width: '100%',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: 'var(--radius-sm)',
                padding: '0.6rem 0.85rem',
                color: '#0f172a',
                fontSize: '0.8rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Execution Priority Protocol
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{
                width: '100%',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: 'var(--radius-sm)',
                padding: '0.6rem 0.85rem',
                color: '#0f172a',
                fontSize: '0.8rem'
              }}
            >
              <option value="IMMEDIATE_URGENT">Immediate Urgent (Under 2 Hours)</option>
              <option value="SAME_DAY">Same-Day Priority Action (Under 12 Hours)</option>
              <option value="SCHEDULED_48H">Scheduled Action (Within 48 Hours)</option>
            </select>
          </div>
        </div>

        {/* Action Notes */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Administrative Directives / Special Orders (Optional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Direct station house officer to assign armed constable patrol in civil clothes..."
            style={{
              width: '100%',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: 'var(--radius-sm)',
              padding: '0.6rem 0.85rem',
              color: '#0f172a',
              fontSize: '0.8rem',
              resize: 'none'
            }}
          />
        </div>

        {/* Actions bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={closeModal} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
          <button className="btn btn-primary" onClick={handleConfirm} style={{ gap: '6px', padding: '0.6rem 1.25rem' }}>
            <Send size={15} />
            <span>Confirm & Transmit Order</span>
          </button>
        </div>

      </div>
    </div>
  );
};
