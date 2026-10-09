import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DistressPredictionChart } from '../components/DistressPredictionChart';
import { VoiceStressAnalyzer } from '../components/VoiceStressAnalyzer';
import { 
  ShieldAlert, 
  UserCheck, 
  AlertTriangle, 
  Calendar, 
  Scale, 
  PhoneCall, 
  HeartHandshake, 
  IndianRupee, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  FileText, 
  ArrowRight, 
  Info,
  Search,
  Filter
} from 'lucide-react';

export const DistrictView = () => {
  const { 
    cases, 
    selectedCaseId, 
    setSelectedCaseId, 
    selectedCase, 
    alerts, 
    openXAI, 
    openDispatch, 
    triggerSOS,
    verifyInterventionDelivery 
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'voice_stress' | 'interventions'
  const [searchFilter, setSearchFilter] = useState('');

  const filteredCases = cases.filter(c => 
    c.victimName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.district.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.caseType.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top District Bar */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1.25rem 1.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
            <span className="badge badge-poa">District Vigilance Desk</span>
            <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Aligarh District Magistrate & SP Command</span>
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Citizen Safety & Distress Monitoring Desk
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
            Review high-risk distress signals, verify warning signs, and issue immediate police protection or relief.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            className="btn btn-outline-ashoka"
            onClick={() => openXAI(selectedCase)}
            style={{ fontSize: '0.82rem', gap: '6px' }}
            title="Inspect AI reasoning and contributing factors"
          >
            <Sparkles size={15} />
            <span>Why was this flagged? (AI Explainer)</span>
          </button>

          <button 
            className="btn btn-primary"
            onClick={() => openDispatch(selectedCase)}
            style={{ fontSize: '0.82rem', gap: '6px' }}
            title="Dispatch police protection order or relief compensation"
          >
            <Send size={15} />
            <span>⚡ Take Action (Protection / Relief)</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Operational Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '370px 1fr', gap: '1.5rem' }}>
        
        {/* Left Column: Victim Prioritization Roster */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldAlert size={17} color="#dc2626" />
                <span>Priority Cases ({filteredCases.length})</span>
              </h3>
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Sorted by Risk</span>
            </div>

            {/* Quick Search */}
            <div style={{ position: 'relative', marginBottom: '0.85rem' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Search citizen name, district, FIR..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{ width: '100%', paddingLeft: '32px', fontSize: '0.8rem' }}
              />
            </div>

            {/* Queue List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {filteredCases.map((c) => {
                const isSelected = c.id === selectedCaseId;
                const isCritical = c.dynamicDistressScore >= 80;
                const isHigh = c.dynamicDistressScore >= 65 && c.dynamicDistressScore < 80;

                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    style={{
                      background: isSelected ? '#f0f9ff' : '#ffffff',
                      border: isSelected ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 4px 14px rgba(2, 132, 199, 0.12)' : '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 800, color: isSelected ? '#0284c7' : '#0f172a' }}>
                        {c.victimName}
                      </span>
                      <span 
                        className={`badge ${isCritical ? 'badge-critical' : isHigh ? 'badge-high' : 'badge-low'}`}
                        style={{ fontSize: '0.7rem', padding: '2px 7px' }}
                      >
                        {isCritical ? `Severe (${c.dynamicDistressScore}/100)` : isHigh ? `High (${c.dynamicDistressScore}/100)` : `Moderate (${c.dynamicDistressScore}/100)`}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '5px' }}>
                      {c.caseType} • {c.district}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', marginBottom: '5px' }}>
                      <span style={{ color: '#ea580c', fontWeight: 700 }}>
                        📅 Trial: {c.nextCourtDate.split(' ')[0]}
                      </span>
                      <span style={{ 
                        color: c.baselineDelta > 30 ? '#dc2626' : '#d97706',
                        fontWeight: 800,
                        background: c.baselineDelta > 30 ? '#fee2e2' : '#fef3c7',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontSize: '0.68rem'
                      }}>
                        +{c.baselineDelta || 0} pts above baseline
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', color: '#94a3b8' }}>
                      <span>Safe Contact: <strong style={{ color: '#475569' }}>{c.safeContactProtocol?.preferredChannel || 'App'}</strong></span>
                      <span>{c.lastInteractionChannel.split(' ')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Live Escalation Stream */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h3 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={15} color="#dc2626" />
                <span>Live Escalation Stream</span>
              </h3>
              <span className="live-indicator" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '260px', overflowY: 'auto' }}>
              {alerts.map(a => (
                <div 
                  key={a.id} 
                  style={{ 
                    background: '#fef2f2', 
                    border: '1px solid #fecaca', 
                    borderRadius: '10px', 
                    padding: '0.75rem' 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#dc2626', fontWeight: 800, marginBottom: '3px' }}>
                    <span>{a.victimName}</span>
                    <span style={{ color: '#94a3b8', fontWeight: 600 }}>{a.timestamp}</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#475569', lineHeight: 1.4 }}>
                    {a.message}
                  </div>
                  <div style={{ marginTop: '5px', fontSize: '0.68rem', color: '#0284c7', fontWeight: 700 }}>
                    Action: {a.actionRequired}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Deep-Dive Victim Dossier */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Victim Master Profile Card */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>
                    {selectedCase.victimName}
                  </h3>
                  <span className="badge badge-poa">{selectedCase.priorityCategory}</span>
                  <span className={`badge ${selectedCase.dynamicDistressScore >= 80 ? 'badge-critical' : 'badge-high'}`}>
                    Distress Level: {selectedCase.dynamicDistressScore}/100
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                  Case ID: <strong style={{ color: '#0f172a' }}>{selectedCase.id}</strong> | FIR: <strong style={{ color: '#0f172a' }}>{selectedCase.firNumber}</strong> | Registered: {selectedCase.registrationDate}
                </div>
              </div>

              {/* Dynamic Distress Score Gauge Ring */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '0.6rem 1.25rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Distress Score</div>
                  <div style={{
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    color: selectedCase.dynamicDistressScore >= 80 ? '#dc2626' : selectedCase.dynamicDistressScore >= 65 ? '#ea580c' : '#16a34a',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {selectedCase.dynamicDistressScore}<span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>/100</span>
                  </div>
                </div>
                <div style={{ height: '36px', width: '1px', background: '#e2e8f0' }} />
                <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                  <div>Trend: <strong style={{ color: '#dc2626' }}>{selectedCase.riskTrend}</strong></div>
                  <div>Channel: <strong style={{ color: '#0f172a' }}>{selectedCase.lastInteractionChannel}</strong></div>
                </div>
              </div>
            </div>

            {/* Plain-English Case Summary for Instant Comprehension */}
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <Info size={14} />
                <span>Quick Situation Brief (Plain English)</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', fontSize: '0.82rem' }}>
                <div>
                  <strong style={{ color: '#0f172a' }}>What happened?</strong>
                  <p style={{ margin: '2px 0 0', color: '#334155', lineHeight: 1.45 }}>
                    Citizen reported fear & intimidation before upcoming trial date. Severe acoustic tremors and anxiety were detected in morning helpline call.
                  </p>
                </div>
                <div>
                  <strong style={{ color: '#166534' }}>Recommended Action:</strong>
                  <p style={{ margin: '2px 0 0', color: '#15803d', lineHeight: 1.45 }}>
                    1. Assign 24×7 armed police escort under Section 15A.<br/>
                    2. Expedite 50% interim relief fund via Direct Benefit Transfer.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Status Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem', marginBottom: '1.25rem', fontSize: '0.78rem' }}>
              <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600 }}>Legal Stage</div>
                <div style={{ color: '#0f172a', fontWeight: 700, marginTop: '2px' }}>{selectedCase.currentStage}</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600 }}>Next Court Date</div>
                <div style={{ color: '#ea580c', fontWeight: 800, marginTop: '2px' }}>{selectedCase.nextCourtDate}</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600 }}>Police Protection</div>
                <div style={{ color: '#0284c7', fontWeight: 700, marginTop: '2px' }}>{selectedCase.policeProtectionStatus}</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600 }}>Interim Relief Sanctioned</div>
                <div style={{ color: '#16a34a', fontWeight: 800, marginTop: '2px' }}>{selectedCase.compensationDisbursed}</div>
              </div>
            </div>

            {/* Sub-tab Navigation */}
            <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <button 
                className={`tab-pill ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Distress Trend & Timeline
              </button>
              <button 
                className={`tab-pill ${activeTab === 'voice_stress' ? 'active' : ''}`}
                onClick={() => setActiveTab('voice_stress')}
              >
                Voice Stress & Audio Call
              </button>
              <button 
                className={`tab-pill ${activeTab === 'interventions' ? 'active' : ''}`}
                onClick={() => setActiveTab('interventions')}
              >
                Protection Orders & Actions ({selectedCase.recommendedInterventions?.length || 0})
              </button>
            </div>

          </div>

          {/* Tab 1: Predictive Trajectory Chart */}
          {activeTab === 'overview' && (
            <DistressPredictionChart caseItem={selectedCase} />
          )}

          {/* Tab 2: Multimodal Voice Stress Analytics */}
          {activeTab === 'voice_stress' && (
            <VoiceStressAnalyzer caseItem={selectedCase} />
          )}

          {/* Tab 3: Prescriptive Interventions */}
          {activeTab === 'interventions' && (
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2px' }}>
                    <span className="badge badge-poa" style={{ fontSize: '0.7rem' }}>Pillar 5: Closed-Loop Tracking</span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                      Recommended & Enacted Statutory Interventions
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    Tracks whether counselling, police protection, legal aid, or relief were actually delivered to the victim
                  </p>
                </div>
                <button className="btn btn-primary" onClick={() => openDispatch(selectedCase)} style={{ fontSize: '0.8rem' }}>
                  + Add Intervention
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {selectedCase.recommendedInterventions.map((int) => (
                  <div 
                    key={int.id}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                          {int.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                          Authority: <strong style={{ color: '#0284c7' }}>{int.authority}</strong> • Officer: <strong style={{ color: '#0f172a' }}>{int.officerName || 'District Assigned Officer'}</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className={`badge ${int.status.includes('PENDING') ? 'badge-critical' : 'badge-low'}`}>
                          {int.status.replace('_', ' ')}
                        </span>
                        {int.humanReviewStatus && (
                          <span style={{ fontSize: '0.7rem', color: '#16a34a', background: '#dcfce7', padding: '3px 8px', borderRadius: '6px', border: '1px solid #86efac', fontWeight: 700 }}>
                            {int.humanReviewStatus}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      fontSize: '0.75rem', 
                      background: '#ffffff', 
                      padding: '0.6rem 0.85rem', 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0' 
                    }}>
                      <div style={{ color: '#475569' }}>
                        <span>Dispatched: <strong style={{ color: '#0f172a' }}>{int.dispatchedAt || 'Pending'}</strong></span>
                        <span style={{ margin: '0 8px', color: '#cbd5e1' }}>|</span>
                        <span>
                          Delivery Proof: <strong style={{ color: int.verifiedDeliveredAt ? '#16a34a' : '#d97706' }}>
                            {int.verifiedDeliveredAt ? `${int.deliveryProof} (${int.verifiedDeliveredAt})` : 'Awaiting Field Completion & Confirmation'}
                          </strong>
                        </span>
                      </div>

                      {!int.verifiedDeliveredAt && (
                        <button 
                          className="btn btn-outline-ashoka"
                          onClick={() => verifyInterventionDelivery(selectedCase.id, int.id, 'Collector Sign-off & Field GPS Audit Verification')}
                          style={{ fontSize: '0.72rem', padding: '4px 10px', borderColor: '#16a34a', color: '#16a34a' }}
                        >
                          <CheckCircle2 size={13} style={{ marginRight: '4px' }} />
                          Verify Delivery
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default DistrictView;
