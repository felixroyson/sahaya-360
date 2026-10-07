import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  FileCheck, 
  UserCheck, 
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export const ConsoleInterventionCenter = ({ 
  cases, 
  onSelectCase, 
  onUpdateInterventionStatus 
}) => {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [verifyingIntervention, setVerifyingIntervention] = useState(null);
  const [verificationNote, setVerificationNote] = useState('');

  // Collect all interventions across cases with case metadata
  const allInterventions = [];
  cases.forEach(c => {
    if (c.interventions) {
      c.interventions.forEach(item => {
        allInterventions.push({
          ...item,
          caseId: c.id,
          caseNumber: c.caseNumber,
          citizenName: c.citizenName,
          casePriority: c.priority,
          location: c.location
        });
      });
    }
  });

  const filteredInterventions = allInterventions.filter(item => {
    const matchesCategory = filterCategory === 'ALL' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'ALL' || 
      (filterStatus === 'VERIFIED' && item.status === 'Delivered & Verified') ||
      (filterStatus === 'PENDING' && (item.status === 'Needs Action' || item.status === 'Pending')) ||
      (filterStatus === 'IN_PROGRESS' && item.status === 'In Progress');
    return matchesCategory && matchesStatus;
  });

  const handleVerifySubmit = () => {
    if (verifyingIntervention && onUpdateInterventionStatus) {
      onUpdateInterventionStatus(
        verifyingIntervention.caseId, 
        verifyingIntervention.id, 
        'Delivered & Verified',
        verificationNote || 'Verified delivery receipt confirmed by nodal officer.'
      );
    }
    setVerifyingIntervention(null);
    setVerificationNote('');
  };

  return (
    <div className="console-content">
      
      {/* Page Header */}
      <div className="console-page-header">
        <div className="console-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1>CLOSED-LOOP INTERVENTION TRACKING</h1>
            <span className="c-badge c-badge-safe">ACCOUNTABILITY ASSURED</span>
          </div>
          <p>Tracks whether counselling, protection, legal, medical, or rehabilitation support was actually delivered to the citizen.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="console-kpi-grid">
        <div className="console-kpi-card">
          <div className="console-kpi-label">
            <span>TOTAL INTERVENTIONS</span>
            <ShieldCheck size={16} color="#667085" />
          </div>
          <div className="console-kpi-value">
            {allInterventions.length}
          </div>
          <div className="console-kpi-sub">Across 5 statutory categories</div>
        </div>

        <div className="console-kpi-card">
          <div className="console-kpi-label">
            <span>DELIVERED & VERIFIED</span>
            <CheckCircle2 size={16} color="#15803D" />
          </div>
          <div className="console-kpi-value" style={{ color: '#15803D' }}>
            {allInterventions.filter(i => i.status === 'Delivered & Verified' || i.status === 'Completed').length}
          </div>
          <div className="console-kpi-sub">94% delivery compliance</div>
        </div>

        <div className="console-kpi-card">
          <div className="console-kpi-label">
            <span>IN PROGRESS</span>
            <Clock size={16} color="#D97706" />
          </div>
          <div className="console-kpi-value" style={{ color: '#D97706' }}>
            {allInterventions.filter(i => i.status === 'In Progress').length}
          </div>
          <div className="console-kpi-sub">Active field deployment</div>
        </div>

        <div className="console-kpi-card" style={{ borderLeft: '3px solid #B42318' }}>
          <div className="console-kpi-label">
            <span style={{ color: '#B42318' }}>ACTION REQUIRED</span>
            <AlertCircle size={16} color="#B42318" />
          </div>
          <div className="console-kpi-value critical">
            {allInterventions.filter(i => i.status === 'Needs Action' || i.status === 'Pending').length}
          </div>
          <div className="console-kpi-sub" style={{ color: '#B42318' }}>
            Awaiting SP/Officer sign-off
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E4E7EC',
        borderRadius: '10px',
        padding: '14px 18px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['ALL', 'Protection', 'Counselling', 'Legal Assistance', 'Medical Support', 'Rehabilitation'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: filterCategory === cat ? '1px solid #2563EB' : '1px solid #E4E7EC',
                background: filterCategory === cat ? '#EFF6FF' : '#FFFFFF',
                color: filterCategory === cat ? '#2563EB' : '#475467',
                fontWeight: filterCategory === cat ? 700 : 500,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {cat === 'ALL' ? 'All Pillars' : cat}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'ALL', label: 'All Statuses' },
            { id: 'PENDING', label: 'Action Needed' },
            { id: 'IN_PROGRESS', label: 'In Progress' },
            { id: 'VERIFIED', label: 'Delivered & Verified' }
          ].map(st => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: filterStatus === st.id ? '1px solid #17324D' : '1px solid #E4E7EC',
                background: filterStatus === st.id ? '#17324D' : '#FFFFFF',
                color: filterStatus === st.id ? '#FFFFFF' : '#475467',
                fontWeight: filterStatus === st.id ? 700 : 500,
                fontSize: '0.76rem',
                cursor: 'pointer'
              }}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Intervention Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredInterventions.map((item) => {
          const isNeedsAction = item.status === 'Needs Action' || item.status === 'Pending';
          const isInProgress = item.status === 'In Progress';
          const isVerified = item.status === 'Delivered & Verified' || item.status === 'Completed';

          return (
            <div key={item.id} className="console-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="c-badge c-badge-neutral">{item.category}</span>
                    <strong style={{ fontSize: '1rem', color: '#172033' }}>
                      {item.title}
                    </strong>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#475467', marginTop: '2px' }}>
                    Case #{item.caseNumber} • <strong>{item.citizenName}</strong> ({item.location})
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#667085', marginTop: '4px' }}>
                    Assigned Authority: <strong>{item.assigned}</strong> ({item.officer}) • Due: <strong>{item.due}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={`c-badge ${
                    isNeedsAction ? 'c-badge-critical' : isInProgress ? 'c-badge-high' : 'c-badge-safe'
                  }`}>
                    {item.status}
                  </span>

                  <button 
                    className="c-btn c-btn-secondary c-btn-sm"
                    onClick={() => onSelectCase(item.caseId)}
                  >
                    View Case Dossier
                  </button>

                  {!isVerified && (
                    <button 
                      className="c-btn c-btn-primary c-btn-sm"
                      onClick={() => setVerifyingIntervention(item)}
                    >
                      <UserCheck size={13} />
                      <span>Verify Delivery</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Closed Loop 6-Step Milestone Bar */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E4E7EC', borderRadius: '8px', padding: '12px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#15803D' }} />
                    <span style={{ fontWeight: 600, color: '#15803D' }}>Created</span>
                  </div>
                  <span style={{ color: '#CBD5E1' }}>→</span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.steps?.assigned ? '#15803D' : '#CBD5E1' }} />
                    <span style={{ fontWeight: 600, color: item.steps?.assigned ? '#15803D' : '#98A2B3' }}>Assigned</span>
                  </div>
                  <span style={{ color: '#CBD5E1' }}>→</span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.steps?.started ? '#15803D' : '#CBD5E1' }} />
                    <span style={{ fontWeight: 600, color: item.steps?.started ? '#15803D' : '#98A2B3' }}>Started</span>
                  </div>
                  <span style={{ color: '#CBD5E1' }}>→</span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.steps?.completed ? '#15803D' : '#CBD5E1' }} />
                    <span style={{ fontWeight: 600, color: item.steps?.completed ? '#15803D' : '#98A2B3' }}>Completed</span>
                  </div>
                  <span style={{ color: '#CBD5E1' }}>→</span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.steps?.verified ? '#15803D' : '#CBD5E1' }} />
                    <span style={{ fontWeight: 600, color: item.steps?.verified ? '#15803D' : '#98A2B3' }}>Verified</span>
                  </div>
                  <span style={{ color: '#CBD5E1' }}>→</span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.steps?.outcome ? '#15803D' : '#CBD5E1' }} />
                    <span style={{ fontWeight: 600, color: item.steps?.outcome ? '#15803D' : '#98A2B3' }}>Outcome Tracked</span>
                  </div>
                </div>

                <div style={{ fontSize: '0.76rem', color: '#475467', marginTop: '10px', borderTop: '1px solid #E4E7EC', paddingTop: '8px' }}>
                  Delivery Receipt / Official Proof: <strong>{item.outcome}</strong>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Delivery Verification Modal */}
      {verifyingIntervention && (
        <div className="console-drawer-overlay" onClick={() => setVerifyingIntervention(null)}>
          <div className="console-drawer" onClick={(e) => e.stopPropagation()} style={{ width: '500px' }}>
            <div className="console-drawer-header">
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                  VERIFY INTERVENTION DELIVERY
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#667085', marginTop: '2px' }}>
                  Case #{verifyingIntervention.caseNumber} • {verifyingIntervention.title}
                </div>
              </div>
              <button className="console-icon-btn" onClick={() => setVerifyingIntervention(null)}>✕</button>
            </div>

            <div className="console-drawer-body">
              <div className="console-ai-disclaimer">
                <FileCheck size={18} color="#15803D" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#172033' }}>Closed-Loop Accountability Check</div>
                  <div>Verify that protection was deployed on the ground, legal representation was present, or counselling session was held with the survivor.</div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#172033', marginBottom: '6px' }}>
                  Delivery Evidence / Spot Inspection Reference
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter physical log entry, police escort order #, or victim confirmation acknowledgment..."
                  value={verificationNote}
                  onChange={(e) => setVerificationNote(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #E4E7EC',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E4E7EC', fontSize: '0.76rem', color: '#667085' }}>
                <div>• Official Nodal Sign-off will be immutably recorded in the Audit Trail.</div>
                <div>• Closed-loop delivery decreases distress score and notifies the clinical team.</div>
              </div>
            </div>

            <div className="console-drawer-footer">
              <button className="c-btn c-btn-secondary" onClick={() => setVerifyingIntervention(null)}>
                Cancel
              </button>
              <button className="c-btn c-btn-primary" onClick={handleVerifySubmit}>
                Confirm Verified Delivery ✓
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
