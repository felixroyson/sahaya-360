import React, { useState } from 'react';
import { 
  MessageSquare, 
  PhoneCall, 
  Smartphone, 
  MessageCircle, 
  Radio, 
  Search, 
  Filter, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Calendar 
} from 'lucide-react';
import { CONSOLE_OVERVIEW_METRICS } from '../data/consoleData';

export const ConsoleCheckInMonitor = ({ 
  cases, 
  onSelectCase, 
  onOpenExplain 
}) => {
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCheckinHistoryCase, setActiveCheckinHistoryCase] = useState(null);

  // Generate check-in rows based on cases
  const checkInRows = cases.map((c, idx) => ({
    id: c.id,
    caseRef: `#${c.caseNumber.split('-')[2] || c.caseNumber}`,
    caseNumber: c.caseNumber,
    citizenName: c.citizenName,
    channel: c.lastChannel || 'IVRS 14566',
    lastCheckIn: c.lastCheckIn,
    mood: idx === 0 ? 'High Distress / Fear' : idx === 1 ? 'Missed Pulse' : idx === 2 ? 'Social Boycott' : idx === 3 ? 'Relieved / Calm' : 'Anxious',
    trend: c.trend === 'RISING_SHARP' ? 'Rising Sharp' : c.trend === 'ELEVATED' ? 'Elevated' : 'Stable',
    status: c.priority === 'CRITICAL' ? 'Review Required' : c.priority === 'HIGH' ? 'Action Pending' : 'Routine Monitoring',
    score: c.currentScore,
    baseline: c.baselineScore,
    deviation: c.deviation,
    history: c.checkIns || []
  }));

  const filteredRows = checkInRows.filter(r => {
    const matchesChannel = selectedChannel === 'ALL' || r.channel.toLowerCase().includes(selectedChannel.toLowerCase());
    const matchesSearch = 
      r.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.mood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  return (
    <div className="console-content">
      
      {/* Page Header */}
      <div className="console-page-header">
        <div className="console-title-group">
          <h1>CHECK-IN MONITOR</h1>
          <p>Real-time multimodal check-in stream across Mobile App, Chatbot, SMS, IVRS, and 14566 Helpline.</p>
        </div>
      </div>

      {/* KPI Cards (Section 10) */}
      <div className="console-kpi-grid">
        <div className="console-kpi-card">
          <div className="console-kpi-label">
            <span>EXPECTED CHECK-INS</span>
            <Calendar size={16} color="#667085" />
          </div>
          <div className="console-kpi-value">
            {CONSOLE_OVERVIEW_METRICS.checkInMetrics.expected}
          </div>
          <div className="console-kpi-sub">Today's scheduled cohorts</div>
        </div>

        <div className="console-kpi-card">
          <div className="console-kpi-label">
            <span>COMPLETED</span>
            <CheckCircle2 size={16} color="#15803D" />
          </div>
          <div className="console-kpi-value" style={{ color: '#15803D' }}>
            {CONSOLE_OVERVIEW_METRICS.checkInMetrics.completed}
          </div>
          <div className="console-kpi-sub">80.5% completion rate</div>
        </div>

        <div className="console-kpi-card">
          <div className="console-kpi-label">
            <span>PENDING</span>
            <Clock size={16} color="#D97706" />
          </div>
          <div className="console-kpi-value" style={{ color: '#D97706' }}>
            {CONSOLE_OVERVIEW_METRICS.checkInMetrics.pending}
          </div>
          <div className="console-kpi-sub">Within safe contact window</div>
        </div>

        <div className="console-kpi-card" style={{ borderLeft: '3px solid #B42318' }}>
          <div className="console-kpi-label">
            <span style={{ color: '#B42318' }}>MISSED</span>
            <AlertTriangle size={16} color="#B42318" />
          </div>
          <div className="console-kpi-value critical">
            0{CONSOLE_OVERVIEW_METRICS.checkInMetrics.missed}
          </div>
          <div className="console-kpi-sub" style={{ color: '#B42318' }}>
            Triggers escalation review
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E4E7EC',
        borderRadius: '10px',
        padding: '12px 16px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#98A2B3' }} />
          <input 
            type="text" 
            placeholder="Search check-in by case #, citizen, mood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 10px 7px 32px',
              border: '1px solid #E4E7EC',
              borderRadius: '6px',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Channel Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['ALL', 'IVRS', '14566', 'SMS', 'Chatbot', 'Mobile'].map(ch => (
            <button
              key={ch}
              onClick={() => setSelectedChannel(ch)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: selectedChannel === ch ? '1px solid #2563EB' : '1px solid #E4E7EC',
                background: selectedChannel === ch ? '#EFF6FF' : '#FFFFFF',
                color: selectedChannel === ch ? '#2563EB' : '#475467',
                fontWeight: selectedChannel === ch ? 700 : 500,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {ch === 'ALL' ? 'All Channels' : ch}
            </button>
          ))}
        </div>
      </div>

      {/* Check-ins Table (Section 10) */}
      <div className="console-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="console-table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
          <table className="console-table">
            <thead>
              <tr>
                <th>Case</th>
                <th>Citizen</th>
                <th>Channel</th>
                <th>Last Check-in</th>
                <th>Self-Reported Mood</th>
                <th>Distress Trend</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => {
                const isCrit = row.status === 'Review Required';
                const isRising = row.trend === 'Rising Sharp';

                return (
                  <tr key={row.id}>
                    <td>
                      <span style={{ fontWeight: 700, color: '#172033' }}>
                        Case {row.caseRef}
                      </span>
                      <div style={{ fontSize: '0.7rem', color: '#667085' }}>#{row.caseNumber}</div>
                    </td>

                    <td>
                      <span style={{ fontWeight: 600 }}>{row.citizenName}</span>
                    </td>

                    <td>
                      <span className="c-badge c-badge-neutral">
                        {row.channel}
                      </span>
                    </td>

                    <td>
                      <span style={{ fontSize: '0.78rem', color: '#475467' }}>
                        {row.lastCheckIn}
                      </span>
                    </td>

                    <td>
                      <span style={{ 
                        fontWeight: 600, 
                        color: row.mood.includes('Fear') || row.mood.includes('Missed') ? '#B42318' : '#172033' 
                      }}>
                        {row.mood}
                      </span>
                    </td>

                    <td>
                      <span style={{ 
                        fontWeight: 700, 
                        color: isRising ? '#B42318' : '#667085',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {isRising && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B42318' }} />}
                        <span>{row.trend}</span>
                      </span>
                    </td>

                    <td>
                      <span className={`c-badge ${
                        isCrit ? 'c-badge-critical' : row.status.includes('Pending') ? 'c-badge-high' : 'c-badge-safe'
                      }`}>
                        {row.status}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button 
                          className="c-btn c-btn-secondary c-btn-sm"
                          onClick={() => setActiveCheckinHistoryCase(row)}
                          title="View 5-day check-in history & verbatim quotes"
                        >
                          <Eye size={12} />
                          <span>History</span>
                        </button>
                        <button 
                          className="c-btn c-btn-primary c-btn-sm"
                          onClick={() => onSelectCase(row.id)}
                        >
                          Dossier
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Check-in Detail Modal (Section 11) */}
      {activeCheckinHistoryCase && (
        <div className="console-drawer-overlay" onClick={() => setActiveCheckinHistoryCase(null)}>
          <div className="console-drawer" onClick={(e) => e.stopPropagation()} style={{ width: '480px' }}>
            <div className="console-drawer-header">
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                  CHECK-IN HISTORY: CASE {activeCheckinHistoryCase.caseRef}
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#667085', marginTop: '2px' }}>
                  {activeCheckinHistoryCase.citizenName} • {activeCheckinHistoryCase.channel}
                </div>
              </div>
              <button className="console-icon-btn" onClick={() => setActiveCheckinHistoryCase(null)}>✕</button>
            </div>

            <div className="console-drawer-body">
              <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E4E7EC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#667085' }}>CURRENT DISTRESS</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#B42318' }}>
                    {activeCheckinHistoryCase.score} / 100
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: '#667085' }}>BASELINE DEVIATION</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#D97706' }}>
                    {activeCheckinHistoryCase.deviation}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#172033', textTransform: 'uppercase', marginTop: '10px' }}>
                Longitudinal Check-in Transcript Stream
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeCheckinHistoryCase.history.map((h, i) => (
                  <div key={i} style={{ border: '1px solid #E4E7EC', borderRadius: '8px', padding: '12px 14px', background: h.mood === 'Missed' ? '#FEF3F2' : '#FFFFFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '0.8rem', color: '#172033' }}>{h.date}</strong>
                      <span className={`c-badge ${h.mood === 'Missed' ? 'c-badge-critical' : 'c-badge-neutral'}`}>
                        {h.channel} • {h.mood}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.82rem', color: h.mood === 'Missed' ? '#B42318' : '#344054', fontStyle: 'italic', margin: '4px 0 0' }}>
                      "{h.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="console-drawer-footer">
              <button className="c-btn c-btn-primary" onClick={() => {
                const id = activeCheckinHistoryCase.id;
                setActiveCheckinHistoryCase(null);
                onSelectCase(id);
              }}>
                Open Full Case Dossier
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
