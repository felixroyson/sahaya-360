import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  Activity, 
  PhoneCall, 
  Lock, 
  History, 
  Sparkles,
  Send,
  Eye,
  Gavel
} from 'lucide-react';

export const ConsoleCaseDetail = ({ 
  caseData, 
  onBack, 
  onOpenExplain, 
  onUpdateInterventionStatus,
  onVerifyDelivery 
}) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'timeline' | 'checkins' | 'distress' | 'interventions' | 'events' | 'audit'

  if (!caseData) return null;

  const isCritical = caseData.priority === 'CRITICAL';
  const isHigh = caseData.priority === 'HIGH';

  return (
    <div className="console-content">
      
      {/* Back button and breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button 
          className="c-btn c-btn-secondary c-btn-sm"
          onClick={onBack}
        >
          <ArrowLeft size={14} />
          <span>Back to Cases Queue</span>
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="c-btn c-btn-primary c-btn-sm"
            onClick={() => onOpenExplain(caseData)}
          >
            <HelpCircle size={14} />
            <span>Explain Risk Score</span>
          </button>
        </div>
      </div>

      {/* Case Header (Section 7) */}
      <div className="console-card" style={{ marginBottom: '20px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#172033', margin: 0 }}>
                CASE #{caseData.caseNumber || caseData.id}
              </h1>
              <span className={`c-badge ${
                isCritical ? 'c-badge-critical' : isHigh ? 'c-badge-high' : 'c-badge-moderate'
              }`}>
                {caseData.priority} PRIORITY
              </span>
            </div>

            <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#344054' }}>
              {caseData.citizenName || caseData.victimName}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem', color: '#667085', marginTop: '6px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} />
                <span>{caseData.location || `${caseData.district}, ${caseData.state}`}</span>
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FileText size={14} />
                <span>{caseData.firNumber}</span>
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} />
                <span>Reg: {caseData.registrationDate}</span>
              </span>
            </div>
          </div>

          {/* Core Risk Metrics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            background: '#F8FAFC',
            padding: '12px 18px',
            borderRadius: '10px',
            border: '1px solid #E4E7EC',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#667085', textTransform: 'uppercase' }}>
                Distress Signal (DDS)
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: isCritical ? '#B42318' : '#D97706', marginTop: '2px' }}>
                {caseData.currentScore || caseData.dynamicDistressScore || 84} <span style={{ fontSize: '0.7rem', color: '#98A2B3' }}>/ 100</span>
              </div>
            </div>

            <div style={{ borderLeft: '1px solid #E4E7EC', borderRight: '1px solid #E4E7EC' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#667085', textTransform: 'uppercase' }}>
                Personal Baseline
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#172033', marginTop: '2px' }}>
                {caseData.baselineScore || caseData.personalBaselineDistress || 28}
              </div>
            </div>

            <div style={{ borderRight: '1px solid #E4E7EC' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#667085', textTransform: 'uppercase' }}>
                Deviation
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#B42318', marginTop: '2px' }}>
                {caseData.deviation || (caseData.baselineDelta ? `+${caseData.baselineDelta}` : '+56')}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#667085', textTransform: 'uppercase' }}>
                Signal Confidence
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#2563EB', marginTop: '2px' }}>
                {caseData.confidence || 87}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Status Workflow Bar (Section 7) */}
      <div className="console-workflow-bar">
        <div className="console-workflow-step completed">
          <CheckCircle2 size={16} />
          <span>Complaint: <strong>✓ Registered</strong></span>
        </div>
        <div className="console-workflow-divider" />

        <div className="console-workflow-step completed">
          <CheckCircle2 size={16} />
          <span>Assessment: <strong>✓ Completed</strong></span>
        </div>
        <div className="console-workflow-divider" />

        <div className="console-workflow-step active">
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }} />
          <span>Counselling: <strong>● Active</strong></span>
        </div>
        <div className="console-workflow-divider" />

        <div className="console-workflow-step warning">
          <AlertTriangle size={16} />
          <span>Protection: <strong>⚠ Review Required</strong></span>
        </div>
        <div className="console-workflow-divider" />

        <div className="console-workflow-step completed">
          <CheckCircle2 size={16} />
          <span>Legal Assistance: <strong>✓ Connected</strong></span>
        </div>
        <div className="console-workflow-divider" />

        <div className="console-workflow-step">
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#98A2B3' }} />
          <span>Follow-up: <strong>● Scheduled</strong></span>
        </div>
      </div>

      {/* Navigation Tabs (Section 7) */}
      <div className="console-tabs">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'timeline', label: 'Timeline' },
          { id: 'checkins', label: 'Check-ins' },
          { id: 'distress', label: 'Distress Signals' },
          { id: 'interventions', label: `Interventions (${caseData.interventions?.length || 0})` },
          { id: 'events', label: 'Case Events' },
          { id: 'audit', label: 'Audit History' }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`console-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
          
          {/* Left Column: Dossier Details */}
          <div className="console-card">
            <div className="console-card-header">
              <span className="console-card-title">Case Dossier & Statutory Classification</span>
              <span className="c-badge c-badge-neutral">{caseData.currentStage}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.84rem' }}>
              <div>
                <span style={{ color: '#667085', display: 'block', fontSize: '0.74rem' }}>STATUTORY CHARGES</span>
                <span style={{ fontWeight: 600, color: '#172033' }}>{caseData.actCategory}</span>
              </div>

              <div>
                <span style={{ color: '#667085', display: 'block', fontSize: '0.74rem' }}>NEXT COURT HEARING</span>
                <span style={{ fontWeight: 700, color: '#B42318' }}>{caseData.nextCourtDate}</span>
              </div>

              <div>
                <span style={{ color: '#667085', display: 'block', fontSize: '0.74rem' }}>ASSIGNED COUNSELLOR</span>
                <span style={{ fontWeight: 600 }}>{caseData.assignedCounsellor}</span>
              </div>

              <div>
                <span style={{ color: '#667085', display: 'block', fontSize: '0.74rem' }}>DISTRICT NODAL OFFICER</span>
                <span style={{ fontWeight: 600 }}>{caseData.assignedOfficer}</span>
              </div>

              <div>
                <span style={{ color: '#667085', display: 'block', fontSize: '0.74rem' }}>POLICE PROTECTION STATUS</span>
                <span style={{ fontWeight: 600, color: '#D97706' }}>{caseData.policeProtectionStatus}</span>
              </div>

              <div>
                <span style={{ color: '#667085', display: 'block', fontSize: '0.74rem' }}>DBT RELIEF COMPENSATION DISBURSED</span>
                <span style={{ fontWeight: 600, color: '#15803D' }}>{caseData.compensationDisbursed}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Safe Contact Preferences & Why Flagged */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Safe Contact Protocol */}
            <div className="console-card">
              <div className="console-card-header">
                <span className="console-card-title">Safe-Contact Protocol</span>
                <span className="c-badge c-badge-safe">ARMED & ACTIVE</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#667085' }}>Preferred Channel:</span>
                  <strong>{caseData.safeContact?.preferredChannel}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#667085' }}>Safe Contact Window:</span>
                  <strong>{caseData.safeContact?.safeTimeWindow}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#667085' }}>Discreet Notifications:</span>
                  <span className="c-badge c-badge-safe">ENABLED (No PII)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#667085' }}>Quick Exit Camouflage:</span>
                  <span className="c-badge c-badge-safe">ARMED (Esc Key)</span>
                </div>
              </div>
            </div>

            {/* Why Flagged Highlights */}
            <div className="console-card">
              <div className="console-card-header">
                <span className="console-card-title">Top Risk Flags</span>
                <button className="c-btn c-btn-subtle c-btn-sm" onClick={() => onOpenExplain(caseData)}>
                  Full Attribution
                </button>
              </div>

              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: '#344054', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {caseData.topSignals?.map((sig, idx) => (
                  <li key={idx}><strong>{sig}</strong></li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: Case Timeline (Section 8) */}
      {activeTab === 'timeline' && (
        <div className="console-card">
          <div className="console-card-header">
            <span className="console-card-title">Chronological Case Timeline</span>
            <span style={{ fontSize: '0.76rem', color: '#667085' }}>From FIR to Current Operational Stage</span>
          </div>

          <div className="console-timeline">
            {caseData.timeline?.map((item) => (
              <div key={item.id} className="console-timeline-item">
                <div className={`console-timeline-node ${item.type}`} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#172033' }}>{item.title}</strong>
                  <span style={{ fontSize: '0.74rem', color: '#667085', fontWeight: 600 }}>{item.date}</span>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#475467', marginTop: '2px' }}>
                  Source: <strong>{item.source}</strong> {item.dds ? `• Signal: DDS ${item.dds}` : ''}
                </div>

                {item.status && (
                  <div style={{ marginTop: '4px' }}>
                    <span className="c-badge c-badge-neutral">{item.status}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Check-ins History (Section 11) */}
      {activeTab === 'checkins' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="console-card">
            <div className="console-card-header">
              <span className="console-card-title">Recent Check-in Logs (Multi-Channel)</span>
              <span style={{ fontSize: '0.76rem', color: '#667085' }}>Last 5 Check-in Cycles</span>
            </div>

            <div className="console-table-wrapper">
              <table className="console-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Channel</th>
                    <th>Citizen Report / Note</th>
                    <th>Mood Vector</th>
                    <th>DDS Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {caseData.checkIns?.map((ci) => {
                    const isMissed = ci.mood === 'Missed';
                    const isHigh = ci.score >= 70;
                    return (
                      <tr key={ci.id}>
                        <td><strong>{ci.date}</strong></td>
                        <td>{ci.channel}</td>
                        <td style={{ fontStyle: isMissed ? 'normal' : 'italic', color: isMissed ? '#B42318' : '#172033' }}>
                          "{ci.text}"
                        </td>
                        <td>
                          <span className={`c-badge ${
                            isMissed ? 'c-badge-critical' : isHigh ? 'c-badge-high' : 'c-badge-neutral'
                          }`}>
                            {ci.mood}
                          </span>
                        </td>
                        <td>
                          {ci.score ? (
                            <strong style={{ color: isHigh ? '#B42318' : '#172033' }}>
                              {ci.score}
                            </strong>
                          ) : (
                            <span style={{ color: '#98A2B3' }}>—</span>
                          )}
                        </td>
                        <td>
                          <span className={`c-badge ${isMissed ? 'c-badge-critical' : 'c-badge-safe'}`}>
                            {isMissed ? 'MISSED PULSE' : 'LOGGED'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 14-Day Prognostic Distress Trend */}
          <div className="console-card">
            <div className="console-card-header">
              <span className="console-card-title">14-Day Distress Trend & Forecast Breakdown</span>
              <span style={{ fontSize: '0.74rem', color: '#667085' }}>Current: {caseData.currentScore} | Baseline: {caseData.baselineScore} | Delta: {caseData.deviation}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
              {caseData.distressTrend?.slice(0, 6).map((pt, i) => (
                <div key={i} style={{ border: '1px solid #E4E7EC', borderRadius: '8px', padding: '10px', textAlign: 'center', background: pt.isForecast ? '#FFFBEB' : '#FFFFFF' }}>
                  <div style={{ fontSize: '0.72rem', color: '#667085' }}>{pt.day}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: pt.signal >= 75 ? '#B42318' : '#172033', margin: '4px 0' }}>
                    {pt.signal}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: pt.isForecast ? '#D97706' : '#15803D' }}>
                    {pt.isForecast ? 'Projected' : `+${pt.deviation} delta`}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 4: Distress Signals (Acoustic, Sentiment, Engagement) */}
      {activeTab === 'distress' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
          
          {/* Voice Acoustics */}
          <div className="console-card">
            <div className="console-card-header">
              <span className="console-card-title">Speech Acoustics & Vocal Micro-Tremor AI</span>
              <span className="c-badge c-badge-high">VOICE BIOMARKERS</span>
            </div>

            {caseData.voiceMetrics ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#FAFAFA', border: '1px solid #E4E7EC', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#667085', textTransform: 'uppercase', marginBottom: '4px' }}>
                    IVRS Call Audio Excerpt (Verified via Bhashini Speech-to-Text)
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#172033', fontStyle: 'italic', lineHeight: 1.5 }}>
                    "{caseData.voiceMetrics.audioTranscript}"
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div style={{ border: '1px solid #E4E7EC', padding: '10px 14px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#667085' }}>Pitch Micro-Tremor (Hz)</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#B42318' }}>{caseData.voiceMetrics.pitchTremorHz} Hz</div>
                    <div style={{ fontSize: '0.68rem', color: '#667085' }}>Normal: {caseData.voiceMetrics.normalPitchTremorHz}</div>
                  </div>

                  <div style={{ border: '1px solid #E4E7EC', padding: '10px 14px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#667085' }}>Acoustic Jitter (%)</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#D97706' }}>{caseData.voiceMetrics.jitterPercent}%</div>
                    <div style={{ fontSize: '0.68rem', color: '#667085' }}>Normal: {caseData.voiceMetrics.normalJitter}</div>
                  </div>

                  <div style={{ border: '1px solid #E4E7EC', padding: '10px 14px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#667085' }}>Hesitation / Pause Ratio</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#B42318' }}>{caseData.voiceMetrics.pauseRatioPercent}%</div>
                    <div style={{ fontSize: '0.68rem', color: '#667085' }}>Elevated speech block</div>
                  </div>

                  <div style={{ border: '1px solid #E4E7EC', padding: '10px 14px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#667085' }}>Speech Velocity (WPM)</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#172033' }}>{caseData.voiceMetrics.speechRateWPM}</div>
                    <div style={{ fontSize: '0.68rem', color: '#667085' }}>Depressed pace</div>
                  </div>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '0.82rem', color: '#667085' }}>No voice acoustic records available for this case.</p>
            )}
          </div>

          {/* Sentiment & Threat Perception */}
          <div className="console-card">
            <div className="console-card-header">
              <span className="console-card-title">Atrocity Trauma NLP Vectors</span>
              <span className="c-badge c-badge-critical">NLP VECTORS</span>
            </div>

            {caseData.sentimentMetrics ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <span>Fear Perception Score</span>
                    <strong style={{ color: '#B42318' }}>{caseData.sentimentMetrics.fearScore} / 100</strong>
                  </div>
                  <div style={{ height: '6px', background: '#F2F4F7', borderRadius: '3px' }}>
                    <div style={{ height: '100%', width: `${caseData.sentimentMetrics.fearScore}%`, background: '#B42318', borderRadius: '3px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <span>Threat Perception Score</span>
                    <strong style={{ color: '#D97706' }}>{caseData.sentimentMetrics.threatPerceptionScore} / 100</strong>
                  </div>
                  <div style={{ height: '6px', background: '#F2F4F7', borderRadius: '3px' }}>
                    <div style={{ height: '100%', width: `${caseData.sentimentMetrics.threatPerceptionScore}%`, background: '#D97706', borderRadius: '3px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <span>Isolation & Boycott Index</span>
                    <strong style={{ color: '#CA8A04' }}>{caseData.sentimentMetrics.isolationScore} / 100</strong>
                  </div>
                  <div style={{ height: '6px', background: '#F2F4F7', borderRadius: '3px' }}>
                    <div style={{ height: '100%', width: `${caseData.sentimentMetrics.isolationScore}%`, background: '#CA8A04', borderRadius: '3px' }} />
                  </div>
                </div>

                <div style={{ marginTop: '6px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#667085', display: 'block', marginBottom: '6px' }}>
                    DETECTED THREAT KEYWORDS
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {caseData.sentimentMetrics.detectedKeywords?.map((kw, i) => (
                      <span key={i} className="c-badge c-badge-critical">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '0.82rem', color: '#667085' }}>No NLP vectors recorded.</p>
            )}
          </div>

        </div>
      )}

      {/* Tab 5: Closed-Loop Interventions (Section 12) */}
      {activeTab === 'interventions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
                Closed-Loop Statutory & Clinical Interventions
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#667085', margin: '2px 0 0' }}>
                Tracks whether counselling, protection, legal, medical or rehabilitation support was actually delivered.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {caseData.interventions?.map((item) => {
              const isNeedsAction = item.status === 'Needs Action' || item.status === 'Pending';
              const isInProgress = item.status === 'In Progress';
              const isCompleted = item.status === 'Completed' || item.status === 'Delivered & Verified';

              return (
                <div key={item.id} className="console-card" style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="c-badge c-badge-neutral">{item.category}</span>
                        <strong style={{ fontSize: '0.95rem', color: '#172033' }}>
                          {item.title}
                        </strong>
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

                      {/* Action buttons */}
                      {onUpdateInterventionStatus && item.status !== 'Delivered & Verified' && (
                        <button 
                          className="c-btn c-btn-primary c-btn-sm"
                          onClick={() => onUpdateInterventionStatus(caseData.id, item.id, 'Delivered & Verified')}
                        >
                          Verify Delivery ✓
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Closed-Loop 6-Step Verification Track */}
                  <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E4E7EC' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#667085', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Delivery Verification Pipeline:
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.75rem' }}>
                      <span style={{ color: item.steps?.created ? '#15803D' : '#98A2B3', fontWeight: 600 }}>
                        {item.steps?.created ? '✓ Created' : '○ Created'}
                      </span>
                      <span style={{ color: '#CBD5E1' }}>→</span>
                      
                      <span style={{ color: item.steps?.assigned ? '#15803D' : '#98A2B3', fontWeight: 600 }}>
                        {item.steps?.assigned ? '✓ Assigned' : '○ Assigned'}
                      </span>
                      <span style={{ color: '#CBD5E1' }}>→</span>

                      <span style={{ color: item.steps?.started ? '#15803D' : '#98A2B3', fontWeight: 600 }}>
                        {item.steps?.started ? '✓ Started' : '○ Started'}
                      </span>
                      <span style={{ color: '#CBD5E1' }}>→</span>

                      <span style={{ color: item.steps?.completed ? '#15803D' : '#98A2B3', fontWeight: 600 }}>
                        {item.steps?.completed ? '✓ Completed' : '○ Completed'}
                      </span>
                      <span style={{ color: '#CBD5E1' }}>→</span>

                      <span style={{ color: item.steps?.verified ? '#15803D' : '#98A2B3', fontWeight: 600 }}>
                        {item.steps?.verified ? '✓ Verified' : '○ Verified'}
                      </span>
                      <span style={{ color: '#CBD5E1' }}>→</span>

                      <span style={{ color: item.steps?.outcome ? '#15803D' : '#98A2B3', fontWeight: 600 }}>
                        {item.steps?.outcome ? '✓ Outcome Achieved' : '○ Outcome'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.74rem', color: '#475467', marginTop: '8px', borderTop: '1px solid #E4E7EC', paddingTop: '6px' }}>
                      Delivery Proof / Outcome: <strong>{item.outcome}</strong>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Tab 6: Case Events */}
      {activeTab === 'events' && (
        <div className="console-card">
          <div className="console-card-header">
            <span className="console-card-title">Judicial Milestones & Witness Threat Events</span>
          </div>

          <div className="console-table-wrapper">
            <table className="console-table">
              <thead>
                <tr>
                  <th>Event Date</th>
                  <th>Category</th>
                  <th>Incident / Judicial Milestone</th>
                </tr>
              </thead>
              <tbody>
                {caseData.caseEvents?.map((ev) => (
                  <tr key={ev.id}>
                    <td><strong>{ev.date}</strong></td>
                    <td>
                      <span className={`c-badge ${
                        ev.type === 'risk' || ev.type === 'threat' ? 'c-badge-critical' : 'c-badge-neutral'
                      }`}>
                        {ev.type.toUpperCase()}
                      </span>
                    </td>
                    <td>{ev.event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 7: Audit History */}
      {activeTab === 'audit' && (
        <div className="console-card">
          <div className="console-card-header">
            <div>
              <span className="console-card-title">Immutable Audit Trail</span>
              <div style={{ fontSize: '0.74rem', color: '#667085', marginTop: '2px' }}>
                Full DPDP Act 2023 compliant log of human clinician reviews and actions taken
              </div>
            </div>
            <span className="c-badge c-badge-safe">SECURE AUDIT ACTIVE</span>
          </div>

          <div className="console-table-wrapper">
            <table className="console-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Actor / Role</th>
                  <th>Action Logged</th>
                  <th>Clinical Notes / Rationale</th>
                </tr>
              </thead>
              <tbody>
                {caseData.auditHistory?.map((aud) => (
                  <tr key={aud.id}>
                    <td><strong style={{ fontSize: '0.76rem' }}>{aud.timestamp}</strong></td>
                    <td>{aud.actor}</td>
                    <td><span className="c-badge c-badge-neutral">{aud.action}</span></td>
                    <td style={{ fontSize: '0.78rem', color: '#475467' }}>{aud.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
