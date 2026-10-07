import React, { useState } from 'react';
import { 
  BellRing, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Search, 
  Filter, 
  Clock, 
  HelpCircle, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const ConsoleAlertCenter = ({ 
  alerts, 
  cases, 
  onSelectCase, 
  onOpenExplain, 
  onVerifyAlert, 
  onDismissAlert 
}) => {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'CRITICAL' | 'HIGH' | 'MODERATE' | 'RESOLVED'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter(a => {
    const isResolved = a.status === 'RESOLVED' || a.status === 'VERIFIED_BY_COUNSELLOR' || a.status === 'DISMISSED';
    if (activeTab === 'RESOLVED') {
      return isResolved;
    }
    if (activeTab === 'CRITICAL') return a.severity === 'CRITICAL' && !isResolved;
    if (activeTab === 'HIGH') return a.severity === 'HIGH' && !isResolved;
    if (activeTab === 'MODERATE') return a.severity === 'MODERATE' && !isResolved;
    
    // ALL
    return matchesSearch(a);
  });

  function matchesSearch(a) {
    if (!searchQuery) return true;
    return a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           a.reason?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           a.caseNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           a.citizenName?.toLowerCase().includes(searchQuery.toLowerCase());
  }

  const criticalCount = alerts.filter(a => a.severity === 'CRITICAL' && a.status !== 'RESOLVED').length;
  const highCount = alerts.filter(a => a.severity === 'HIGH' && a.status !== 'RESOLVED').length;
  const moderateCount = alerts.filter(a => a.severity === 'MODERATE' && a.status !== 'RESOLVED').length;

  return (
    <div className="console-content">
      
      {/* Page Header */}
      <div className="console-page-header">
        <div className="console-title-group">
          <h1>ALERT CENTER</h1>
          <p>Real-time distress signals requiring mandatory human clinical review and verification.</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { id: 'ALL', label: 'All Alerts', count: alerts.length },
          { id: 'CRITICAL', label: 'Critical', count: criticalCount, color: '#B42318' },
          { id: 'HIGH', label: 'High', count: highCount, color: '#D97706' },
          { id: 'MODERATE', label: 'Moderate', count: moderateCount, color: '#CA8A04' },
          { id: 'RESOLVED', label: 'Reviewed & Resolved' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: activeTab === tab.id ? '2px solid #2563EB' : '1px solid #E4E7EC',
              background: activeTab === tab.id ? '#EFF6FF' : '#FFFFFF',
              color: activeTab === tab.id ? '#2563EB' : '#475467',
              fontWeight: activeTab === tab.id ? 700 : 500,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span style={{
                background: tab.color ? tab.color : '#E4E7EC',
                color: tab.color ? '#FFFFFF' : '#475467',
                padding: '1px 6px',
                borderRadius: '9999px',
                fontSize: '0.7rem',
                fontWeight: 700
              }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E4E7EC', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' }}>
        <input 
          type="text" 
          placeholder="Filter alerts by keyword, case #, citizen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.82rem' }}
        />
      </div>

      {/* Alert Cards Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredAlerts.map(alert => {
          const isCrit = alert.severity === 'CRITICAL';
          const isHigh = alert.severity === 'HIGH';
          const isResolved = alert.status === 'VERIFIED_BY_COUNSELLOR' || alert.status === 'RESOLVED';
          const matchedCase = cases.find(c => c.id === alert.caseId) || cases[0];

          return (
            <div 
              key={alert.id}
              className="console-card"
              style={{
                borderLeft: `5px solid ${isResolved ? '#15803D' : isCrit ? '#B42318' : isHigh ? '#D97706' : '#CA8A04'}`,
                padding: '18px 20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className={`c-badge ${
                      isResolved ? 'c-badge-safe' : isCrit ? 'c-badge-critical' : isHigh ? 'c-badge-high' : 'c-badge-moderate'
                    }`}>
                      {isResolved ? 'VERIFIED' : alert.severity}
                    </span>

                    <strong style={{ fontSize: '0.96rem', color: '#172033' }}>
                      Case #{alert.caseNumber} • {alert.citizenName}
                    </strong>

                    <span style={{ fontSize: '0.74rem', color: '#98A2B3' }}>
                      ({alert.location})
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#172033', margin: '4px 0 2px' }}>
                    {alert.title}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: '#475467', margin: '4px 0 0', lineHeight: 1.45 }}>
                    {alert.reason}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#98A2B3', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    <span>{alert.timeAgo}</span>
                  </span>

                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: isCrit ? '#B42318' : '#D97706' }}>
                    Signal: {alert.score}/100 • {alert.deviation}
                  </div>
                </div>
              </div>

              {/* Action Directive */}
              <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E4E7EC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ fontSize: '0.78rem', color: '#344054' }}>
                  Action Directive: <strong>{alert.actionRequired}</strong>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="c-btn c-btn-secondary c-btn-sm"
                    onClick={() => onOpenExplain(matchedCase)}
                  >
                    <HelpCircle size={13} />
                    <span>Explain Factor Attribution</span>
                  </button>

                  <button 
                    className="c-btn c-btn-primary c-btn-sm"
                    onClick={() => onSelectCase(alert.caseId)}
                  >
                    <span>Review Case</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
