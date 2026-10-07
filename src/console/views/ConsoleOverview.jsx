import React from 'react';
import { 
  Users, 
  AlertCircle, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { CONSOLE_OVERVIEW_METRICS, TODAYS_INTERVENTIONS } from '../data/consoleData';

export const ConsoleOverview = ({ 
  cases, 
  alerts, 
  onSelectCase, 
  onOpenExplain, 
  onNavigate,
  activeRole 
}) => {
  const getGreeting = () => {
    switch (activeRole) {
      case 'district':
        return { name: 'Shri Rajesh Verma, IAS', subtitle: 'District Magistrate & SP Joint Vigilance Desk' };
      case 'national':
        return { name: 'Dr. R. K. Meena', subtitle: 'MoSJE National Apex Command Cell' };
      default:
        return { name: 'Dr. Ananya Sharma', subtitle: 'District Clinical Operations' };
    }
  };

  const user = getGreeting();
  const criticalCasesCount = cases.filter(c => c.priority === 'CRITICAL').length;
  const needReviewCount = cases.filter(c => c.status.includes('REVIEW')).length;
  const activeInterventionsCount = 94;

  // Active priority alerts from real/state alerts
  const priorityAlerts = alerts.slice(0, 3);

  return (
    <div className="console-content">
      
      {/* Top Header */}
      <div className="console-page-header">
        <div className="console-title-group">
          <h1>Good morning, {user.name}</h1>
          <p>{user.subtitle} • Last synchronized 2 minutes ago</p>
        </div>

        <div className="console-header-actions">
          <button 
            className="c-btn c-btn-primary"
            onClick={() => onNavigate('triage')}
          >
            <ShieldAlert size={15} />
            <span>Open Triage Queue ({needReviewCount})</span>
          </button>
        </div>
      </div>

      {/* Top KPI Cards (Section 5) */}
      <div className="console-kpi-grid">
        <div className="console-kpi-card" onClick={() => onNavigate('cases')} style={{ cursor: 'pointer' }}>
          <div className="console-kpi-label">
            <span>ACTIVE CASES</span>
            <Users size={16} color="#667085" />
          </div>
          <div className="console-kpi-value">
            {CONSOLE_OVERVIEW_METRICS.activeCases}
          </div>
          <div className="console-kpi-sub">
            Monitored across 8 districts
          </div>
        </div>

        <div className="console-kpi-card" onClick={() => onNavigate('triage')} style={{ cursor: 'pointer' }}>
          <div className="console-kpi-label">
            <span>NEED REVIEW</span>
            <AlertCircle size={16} color="#D97706" />
          </div>
          <div className="console-kpi-value" style={{ color: '#D97706' }}>
            {CONSOLE_OVERVIEW_METRICS.needReview}
          </div>
          <div className="console-kpi-sub">
            Pending counsellor verification
          </div>
        </div>

        <div className="console-kpi-card" onClick={() => onNavigate('alerts')} style={{ cursor: 'pointer', borderLeft: '3px solid #B42318' }}>
          <div className="console-kpi-label">
            <span style={{ color: '#B42318' }}>CRITICAL</span>
            <ShieldAlert size={16} color="#B42318" />
          </div>
          <div className="console-kpi-value critical">
            {criticalCasesCount < 10 ? `0${criticalCasesCount}` : criticalCasesCount}
          </div>
          <div className="console-kpi-sub" style={{ color: '#B42318' }}>
            Immediate statutory intervention needed
          </div>
        </div>

        <div className="console-kpi-card" onClick={() => onNavigate('interventions')} style={{ cursor: 'pointer' }}>
          <div className="console-kpi-label">
            <span>ACTIVE INTERVENTIONS</span>
            <CheckCircle2 size={16} color="#15803D" />
          </div>
          <div className="console-kpi-value" style={{ color: '#15803D' }}>
            {activeInterventionsCount}
          </div>
          <div className="console-kpi-sub">
            94% verified delivery rate
          </div>
        </div>
      </div>

      {/* Two Column Section: Distress Trend (Left) & Priority Alerts (Right) */}
      <div className="console-two-col">
        
        {/* Left: 14-Day Distress Trend Chart */}
        <div className="console-card">
          <div className="console-card-header">
            <div>
              <div className="console-card-title">
                <Activity size={18} color="#2563EB" />
                <span>DISTRESS TREND & PROGNOSTIC DEVIATION</span>
              </div>
              <div style={{ fontSize: '0.76rem', color: '#667085', marginTop: '2px' }}>
                14-day longitudinal signal vs personal baseline reference
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.72rem', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', background: '#2563EB', borderRadius: '2px' }} />
                <span>Distress Signal</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '2px', background: '#15803D' }} />
                <span>Baseline (28)</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '2px', background: '#B42318', borderStyle: 'dashed' }} />
                <span>Forecast</span>
              </span>
            </div>
          </div>

          {/* SVG 14-Day Trend Chart */}
          <div style={{ width: '100%', height: '230px', position: 'relative' }}>
            <svg viewBox="0 0 540 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Background grid lines */}
              <line x1="40" y1="20" x2="520" y2="20" stroke="#F2F4F7" strokeWidth="1" />
              <line x1="40" y1="60" x2="520" y2="60" stroke="#F2F4F7" strokeWidth="1" />
              <line x1="40" y1="100" x2="520" y2="100" stroke="#F2F4F7" strokeWidth="1" />
              <line x1="40" y1="140" x2="520" y2="140" stroke="#F2F4F7" strokeWidth="1" />
              <line x1="40" y1="180" x2="520" y2="180" stroke="#E4E7EC" strokeWidth="1" />

              {/* Y-axis labels */}
              <text x="10" y="24" fontSize="10" fill="#98A2B3">100</text>
              <text x="15" y="64" fontSize="10" fill="#98A2B3">75</text>
              <text x="15" y="104" fontSize="10" fill="#98A2B3">50</text>
              <text x="15" y="144" fontSize="10" fill="#98A2B3">25</text>
              <text x="22" y="184" fontSize="10" fill="#98A2B3">0</text>

              {/* Baseline Reference Line (Green dashed at DDS 28 = y: 147) */}
              <line x1="40" y1="147" x2="520" y2="147" stroke="#15803D" strokeWidth="1.8" strokeDasharray="4 3" />
              <text x="460" y="142" fontSize="9" fontWeight="bold" fill="#15803D">Baseline: 28</text>

              {/* Historical Trend Line (Days 1 to 7) */}
              {/* Coordinates mapped: Day 1 (60, 137), Day 2 (105, 122), Day 3 (150, 96), Day 4 (195, 82), Day 5 (240, 68), Day 6 (285, 57), Day 7 (330, 46) */}
              <path
                d="M 60 137 L 105 122 L 150 96 L 195 82 L 240 68 L 285 57 L 330 46"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
              />

              {/* Forecast Area & Projection Line (Days 7 to 11) */}
              <path
                d="M 330 46 L 375 41 L 420 34 L 465 26 L 510 39"
                fill="none"
                stroke="#B42318"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Shaded Forecast Cone */}
              <polygon
                points="330,46 375,32 420,24 465,18 510,30 510,48 465,34 420,44 375,50"
                fill="rgba(180, 35, 24, 0.08)"
              />

              {/* Data points */}
              <circle cx="60" cy="137" r="3.5" fill="#2563EB" />
              <circle cx="105" cy="122" r="3.5" fill="#2563EB" />
              <circle cx="150" cy="96" r="3.5" fill="#2563EB" />
              <circle cx="195" cy="82" r="3.5" fill="#2563EB" />
              <circle cx="240" cy="68" r="3.5" fill="#2563EB" />
              <circle cx="285" cy="57" r="3.5" fill="#2563EB" />
              
              {/* Critical Current Point (DDS 84) */}
              <circle cx="330" cy="46" r="6" fill="#B42318" stroke="#FFFFFF" strokeWidth="2" />
              <text x="315" y="34" fontSize="10" fontWeight="bold" fill="#B42318">DDS: 84</text>

              {/* Trial Spike Forecast Marker */}
              <circle cx="465" cy="26" r="4.5" fill="#B42318" />
              <text x="440" y="16" fontSize="9" fontWeight="bold" fill="#B42318">Trial: 96</text>

              {/* X-axis labels */}
              <text x="50" y="196" fontSize="9" fill="#667085">Sep 01</text>
              <text x="140" y="196" fontSize="9" fill="#667085">Sep 05</text>
              <text x="230" y="196" fontSize="9" fill="#667085">Sep 09</text>
              <text x="318" y="196" fontSize="9" fontWeight="bold" fill="#B42318">Sep 12 (Today)</text>
              <text x="408" y="196" fontSize="9" fill="#98A2B3">Sep 15</text>
              <text x="490" y="196" fontSize="9" fill="#98A2B3">Sep 18</text>
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #F2F4F7', fontSize: '0.78rem' }}>
            <span style={{ color: '#667085' }}>
              Significant baseline deviation marker flagged on <strong>Sep 12 (+56 delta)</strong>
            </span>
            <button 
              className="c-btn c-btn-subtle c-btn-sm"
              onClick={() => onSelectCase("NHAA-DEMO-001")}
            >
              <span>Inspect Case #894 Dossier</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Right: Priority Alerts */}
        <div className="console-card">
          <div className="console-card-header">
            <div className="console-card-title">
              <AlertTriangle size={18} color="#B42318" />
              <span>PRIORITY ALERTS</span>
            </div>
            <button 
              className="c-btn c-btn-subtle c-btn-sm"
              onClick={() => onNavigate('alerts')}
            >
              <span>View All ({priorityAlerts.length})</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {priorityAlerts.map((alert) => {
              const isCrit = alert.severity === 'CRITICAL';
              const isHigh = alert.severity === 'HIGH';
              return (
                <div 
                  key={alert.id}
                  style={{
                    border: '1px solid #E4E7EC',
                    borderLeft: `4px solid ${isCrit ? '#B42318' : isHigh ? '#D97706' : '#CA8A04'}`,
                    borderRadius: '8px',
                    padding: '12px 14px',
                    background: '#FFFFFF'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className={`c-badge ${isCrit ? 'c-badge-critical' : isHigh ? 'c-badge-high' : 'c-badge-moderate'}`}>
                        {alert.severity}
                      </span>
                      <strong style={{ fontSize: '0.82rem', color: '#172033' }}>
                        Case #{alert.caseNumber}
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#98A2B3' }}>
                      {alert.timeAgo}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#172033', marginTop: '2px' }}>
                    {alert.title}
                  </div>

                  <p style={{ fontSize: '0.76rem', color: '#667085', margin: '4px 0 10px', lineHeight: 1.4 }}>
                    {alert.reason}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: '#B42318', fontWeight: 700 }}>
                      DDS {alert.score} • Delta {alert.deviation}
                    </span>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        className="c-btn c-btn-secondary c-btn-sm"
                        onClick={() => {
                          const c = cases.find(item => item.id === alert.caseId) || cases[0];
                          onOpenExplain(c);
                        }}
                      >
                        Explain
                      </button>
                      <button 
                        className="c-btn c-btn-primary c-btn-sm"
                        onClick={() => onSelectCase(alert.caseId)}
                      >
                        Review Case
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Today's Interventions Section (Section 5) */}
      <div className="console-card">
        <div className="console-card-header">
          <div>
            <div className="console-card-title">
              <CheckCircle2 size={18} color="#17324D" />
              <span>TODAY'S INTERVENTIONS</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#667085', marginTop: '2px' }}>
              Actionable statutory, medical, and clinical interventions due today
            </div>
          </div>

          <button 
            className="c-btn c-btn-secondary c-btn-sm"
            onClick={() => onNavigate('interventions')}
          >
            <span>Intervention Center</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="console-table-wrapper">
          <table className="console-table">
            <thead>
              <tr>
                <th>Case Ref</th>
                <th>Citizen</th>
                <th>Intervention</th>
                <th>Owner / Authority</th>
                <th>Due</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {TODAYS_INTERVENTIONS.map((item) => {
                const isNeedsAction = item.status === 'Needs Action';
                const isInProgress = item.status === 'In Progress';
                const isCompleted = item.status === 'Completed';

                return (
                  <tr key={item.id}>
                    <td>
                      <span style={{ fontWeight: 700, color: '#172033' }}>
                        {item.caseRef}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{item.citizenName}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: '#172033' }}>
                        {item.intervention}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: '#475467' }}>{item.owner}</span>
                    </td>
                    <td>
                      <span style={{ 
                        fontSize: '0.76rem', 
                        fontWeight: item.due === 'Today' ? 700 : 500,
                        color: item.due === 'Today' ? '#B42318' : '#667085' 
                      }}>
                        {item.due}
                      </span>
                    </td>
                    <td>
                      <span className={`c-badge ${
                        isNeedsAction ? 'c-badge-critical' : isInProgress ? 'c-badge-high' : 'c-badge-safe'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="c-btn c-btn-secondary c-btn-sm"
                        onClick={() => onSelectCase(item.caseId)}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
