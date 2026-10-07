import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VoiceStressAnalyzer } from '../components/VoiceStressAnalyzer';
import { 
  Activity, 
  HeartHandshake, 
  Video, 
  FileText, 
  Save, 
  Sparkles, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar 
} from 'lucide-react';

export const CounsellorView = () => {
  const { 
    cases, 
    selectedCaseId, 
    setSelectedCaseId, 
    selectedCase, 
    alerts,
    verifyAlert,
    dismissAlert,
    openXAI,
    openDispatch,
    verifyInterventionDelivery
  } = useApp();

  const [sessionNotes, setSessionNotes] = useState(
    "Patient exhibits significant anticipatory panic regarding cross-examination by defense counsel on Sept 18. Somatic complaints of severe insomnia and motor tremors. Reassured victim regarding PoA Rule 12 right to Screened Witness Box and Support Person accompaniment. Initiated grounding techniques."
  );
  const [isInCall, setIsInCall] = useState(false);
  const [phqScore, setPhqScore] = useState(19); // Severe depression (>15)
  const [gadScore, setGadScore] = useState(17); // Severe anxiety (>15)
  const [saveStatus, setSaveStatus] = useState(null);

  const baseline = selectedCase.personalBaselineDistress || 28;
  const currentScore = selectedCase.dynamicDistressScore || 84;
  const delta = currentScore - baseline;

  const caseAlerts = alerts.filter(a => a.caseId === selectedCase.id);

  const handleSaveNotes = () => {
    setSaveStatus('Saving Clinical Session Notes...');
    setTimeout(() => {
      setSaveStatus('Notes saved and encrypted to victim psychiatric record under HIPAA & DPDP standards.');
      setTimeout(() => setSaveStatus(null), 3000);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1.25rem 1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
            <span className="badge badge-low" style={{ background: '#dcfce7', color: '#166534', fontWeight: 700 }}>Tele-Mental Health Clinical Desk</span>
            <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>|</span>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>MoSJE Empanelled Psychological Network • SAHAYA-360</span>
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
            Victim Psychiatric Dossier & Human-in-the-Loop Clinical Console
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            className="btn btn-outline-ashoka"
            onClick={() => openXAI(selectedCase)}
            style={{ fontSize: '0.8rem', gap: '6px' }}
          >
            <Sparkles size={15} />
            <span>Explain AI Factors (SHAP)</span>
          </button>

          <button 
            className={`btn ${isInCall ? 'btn-danger' : 'btn-primary'}`}
            onClick={() => setIsInCall(!isInCall)}
            style={{ fontSize: '0.8rem', gap: '6px' }}
          >
            <Video size={16} />
            <span>{isInCall ? 'End Tele-Health Session' : 'Launch Live Tele-Counselling'}</span>
          </button>
        </div>
      </div>

      {/* Baseline Deviation & Clinical Alert Notification */}
      <div style={{
        background: 'linear-gradient(90deg, #fef2f2 0%, #fffbeb 100%)',
        border: '1px solid #fecaca',
        borderRadius: '16px',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: '0 4px 16px rgba(239, 68, 68, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={22} color="#dc2626" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{ fontSize: '0.98rem', color: '#991b1b' }}>
                Personal Baseline Escalation Detected: {selectedCase.victimName}
              </strong>
              <span className="badge badge-critical" style={{ fontSize: '0.7rem' }}>
                +{delta} pts above normal
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '3px' }}>
              Individual Baseline: <strong style={{ color: '#16a34a' }}>{baseline}/100</strong> | Current Score: <strong style={{ color: '#dc2626' }}>{currentScore}/100</strong> | Trend: <strong style={{ color: '#ea580c' }}>{selectedCase.riskTrend}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 500 }}>Human verification required under Pillar 4</span>
          <button
            className="btn btn-primary"
            onClick={() => openDispatch(selectedCase)}
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.95rem' }}
          >
            Review & Dispatch Interventions
          </button>
        </div>
      </div>

      {/* Case Selector Strip */}
      <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.35rem' }}>
        {cases.map((c) => {
          const isSelected = c.id === selectedCaseId;
          const caseDelta = c.dynamicDistressScore - (c.personalBaselineDistress || 28);
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              style={{
                padding: '0.65rem 1.1rem',
                minWidth: '220px',
                textAlign: 'left',
                borderRadius: '12px',
                border: isSelected ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
                background: isSelected ? '#f0f9ff' : '#ffffff',
                boxShadow: isSelected ? '0 4px 12px rgba(2, 132, 199, 0.12)' : '0 2px 6px rgba(0,0,0,0.02)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isSelected ? '#0284c7' : '#0f172a' }}>
                {c.victimName}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{c.district}</span>
                <span style={{ color: c.dynamicDistressScore >= 80 ? '#dc2626' : '#d97706', fontWeight: 700 }}>
                  DDS: {c.dynamicDistressScore} (+{caseDelta})
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem' }}>
        
        {/* Left: Tele-health & Voice Stress Monitor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Active Call HUD if in call */}
          {isInCall && (
            <div className="glass-card" style={{ borderColor: '#fca5a5', background: '#ffffff', padding: '1.25rem', boxShadow: '0 8px 24px rgba(239, 68, 68, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="live-indicator" />
                  <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>
                    Encrypted Tele-Session Active: {selectedCase.victimName}
                  </strong>
                </div>
                <span className="badge badge-critical">Live Speech Biometrics</span>
              </div>

              <div style={{
                height: '160px',
                background: 'linear-gradient(135deg, #f0f9ff, #f8fafc)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCheck size={28} color="#0284c7" />
                </div>
                <div style={{ fontSize: '0.84rem', color: '#0f172a', fontWeight: 700 }}>
                  Secure Audio-Visual Channel Connected (NHAA 14566 Link)
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  Latency: 18ms | Jitter Buffer: Optimal | End-to-End Encrypted
                </div>
              </div>
            </div>
          )}

          {/* Voice Stress Analyzer Component */}
          <VoiceStressAnalyzer caseItem={selectedCase} />

          {/* Clinical Session Notes */}
          <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={16} color="#0284c7" />
                <span>Clinical Observations & Grounding Log</span>
              </h3>
              
              <button 
                className="btn btn-primary"
                onClick={handleSaveNotes}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', gap: '4px' }}
              >
                <Save size={13} />
                <span>Save Notes</span>
              </button>
            </div>

            <textarea
              rows={5}
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              style={{
                width: '100%',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                color: '#0f172a',
                fontSize: '0.82rem',
                lineHeight: 1.5,
                resize: 'vertical'
              }}
            />

            {saveStatus && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={13} />
                <span>{saveStatus}</span>
              </div>
            )}
          </div>

        </div>

        {/* Right: Standardized Clinical Scales & Trauma Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Clinical Assessment Scales (PHQ-9 & GAD-7) */}
          <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
              Standardized Psychometric Scores
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1.1rem' }}>
              Algorithmic correlation between clinical self-reports and Dynamic Distress Score
            </p>

            {/* PHQ-9 Depression Scale */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.8rem' }}>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>PHQ-9 Depression Severity</span>
                <span style={{ fontWeight: 700, color: phqScore >= 15 ? '#dc2626' : '#d97706' }}>
                  {phqScore} / 27 ({phqScore >= 15 ? 'Moderately Severe' : 'Moderate'})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="27"
                value={phqScore}
                onChange={(e) => setPhqScore(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            {/* GAD-7 Anxiety Scale */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.8rem' }}>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>GAD-7 Acute Anxiety & Panic</span>
                <span style={{ fontWeight: 700, color: gadScore >= 15 ? '#dc2626' : '#d97706' }}>
                  {gadScore} / 21 ({gadScore >= 15 ? 'Severe Panic' : 'Moderate'})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="21"
                value={gadScore}
                onChange={(e) => setGadScore(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-sm)', padding: '0.75rem', fontSize: '0.74rem', color: '#334155', lineHeight: 1.45 }}>
              <strong style={{ color: '#0f172a' }}>Clinical Assessment:</strong> High somatic arousal with acute hyper-reactivity triggered by upcoming trial summons. Recommend cognitive reframing, deep breathing exercises, and safehouse transfer.
            </div>
          </div>

          {/* Pillar 4: Explainable Human-Reviewed Alert Verification ("AI Supports — Humans Decide") */}
          <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="#d97706" />
                <span>Explainable Human-Reviewed Alerts (Pillar 4)</span>
              </h3>
              <span className="badge badge-poa" style={{ fontSize: '0.65rem' }}>Humans Decide</span>
            </div>

            <p style={{ fontSize: '0.74rem', color: '#64748b', marginBottom: '0.85rem' }}>
              Statutory protocols mandate clinician sign-off before dispatching police escorts or crisis teams.
            </p>

            {caseAlerts.length === 0 ? (
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', padding: '0.65rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                No active critical alerts pending human review for this case.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {caseAlerts.map(alert => (
                  <div 
                    key={alert.id}
                    style={{
                      background: alert.status === 'VERIFIED_BY_COUNSELLOR' ? '#f0fdf4' : '#fef2f2',
                      border: alert.status === 'VERIFIED_BY_COUNSELLOR' ? '1px solid #bbf7d0' : '1px solid #fecaca',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.8rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: alert.status === 'VERIFIED_BY_COUNSELLOR' ? '#15803d' : '#b91c1c' }}>
                        Alert #{alert.id} ({alert.severity})
                      </span>
                      <span className={`badge ${alert.status === 'VERIFIED_BY_COUNSELLOR' ? 'badge-low' : 'badge-critical'}`} style={{ fontSize: '0.65rem' }}>
                        {alert.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.74rem', color: '#334155', lineHeight: 1.45, marginBottom: '8px' }}>
                      {alert.message}
                    </div>

                    {alert.status === 'VERIFIED_BY_COUNSELLOR' ? (
                      <div style={{ fontSize: '0.7rem', color: '#15803d', background: '#dcfce7', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <CheckCircle2 size={13} />
                        <span>{alert.reviewedBy} approved dispatch.</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '6px' }}>
                        <button
                          className="btn btn-primary"
                          onClick={() => verifyAlert(alert.id)}
                          style={{ fontSize: '0.72rem', padding: '5px 10px', flex: 1 }}
                        >
                          ✓ Verify Alert & Approve Action
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => dismissAlert(alert.id, "Acoustic false spike from ambient road traffic")}
                          style={{ fontSize: '0.72rem', padding: '5px 8px' }}
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pillar 5: Closed-Loop Intervention Tracking List */}
          <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#16a34a" />
                <span>Closed-Loop Interventions (Pillar 5)</span>
              </h3>
              <button 
                onClick={() => openDispatch(selectedCase)}
                style={{ background: 'none', border: 'none', color: '#0284c7', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
              >
                + Dispatch New
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {(selectedCase.recommendedInterventions || []).map(int => (
                <div
                  key={int.id}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    fontSize: '0.74rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3px' }}>
                    <strong style={{ color: '#0f172a' }}>{int.title}</strong>
                    <span className={`badge ${int.status === 'DELIVERED_VERIFIED' ? 'badge-low' : 'badge-critical'}`} style={{ fontSize: '0.64rem' }}>
                      {int.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div style={{ color: '#475569', marginTop: '2px' }}>
                    Nodal Officer: <strong style={{ color: '#0f172a' }}>{int.officerName || int.authority}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', color: '#64748b', fontSize: '0.7rem' }}>
                    <span>Proof: <strong>{int.deliveryProof || 'In Delivery'}</strong></span>
                    {int.status !== 'DELIVERED_VERIFIED' && (
                      <button
                        onClick={() => verifyInterventionDelivery(selectedCase.id, int.id)}
                        style={{
                          background: '#dcfce7',
                          border: '1px solid #86efac',
                          color: '#15803d',
                          borderRadius: '4px',
                          padding: '3px 8px',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '0.68rem'
                        }}
                      >
                        Verify Delivery Receipt
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trauma & Trial Milestone Timeline */}
          <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="#0284c7" />
              <span>Trauma & Judicial Chronology</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', borderLeft: '2px solid #38bdf8', paddingLeft: '0.95rem', marginLeft: '0.5rem' }}>
              
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>
                  Atrocity Incident & FIR Registration
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{selectedCase.registrationDate}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#16a34a' }}>
                  First Relief Installment Disbursed (₹4.25 L)
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Aug 24, 2026</div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ea580c' }}>
                  Accused Bail Granted & Threat Incident
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Aug 26, 2026 (Triggered DDS Spike to 68)</div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#dc2626' }}>
                  Upcoming Trial Cross-Examination
                </div>
                <div style={{ fontSize: '0.7rem', color: '#b91c1c', fontWeight: 600 }}>{selectedCase.nextCourtDate} (High Vulnerability Date)</div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
