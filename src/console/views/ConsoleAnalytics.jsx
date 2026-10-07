import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  Activity, 
  AlertCircle, 
  Info,
  PhoneCall
} from 'lucide-react';
import { 
  CHANNEL_DISTRIBUTION, 
  STATE_DISTRIBUTION, 
  INTERVENTION_STATS,
  CONSOLE_OVERVIEW_METRICS 
} from '../data/consoleData';

export const ConsoleAnalytics = () => {
  return (
    <div className="console-content">
      
      {/* Page Header */}
      <div className="console-page-header">
        <div className="console-title-group">
          <h1>DISTRESS INTELLIGENCE & OPERATIONAL ANALYTICS</h1>
          <p>Longitudinal distress escalation trends, statutory response SLAs, and closed-loop delivery metrics.</p>
        </div>
      </div>

      {/* Mandatory Synthetic Data Notice (Section 14) */}
      <div className="console-ai-disclaimer" style={{ marginBottom: '24px', borderLeftColor: '#D97706' }}>
        <Info size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ fontWeight: 700, color: '#172033', marginBottom: '2px' }}>
            PROTOTYPE / DEMONSTRATION DATA NOTICE
          </div>
          <div>
            All metrics, case volumes, scores, response times, and geographic distributions displayed in this dashboard are <strong>synthetic demonstration data</strong> created specifically for Smart India Hackathon 2026. This interface does <strong>not</strong> represent official statistics of the Ministry of Social Justice & Empowerment (MoSJE) or the Government of India.
          </div>
        </div>
      </div>

      {/* Top Analytics KPIs (Section 14) */}
      <div className="console-kpi-grid">
        <div className="console-kpi-card">
          <div className="console-kpi-label">
            <span>ACTIVE CASES</span>
            <Activity size={16} color="#667085" />
          </div>
          <div className="console-kpi-value">
            {CONSOLE_OVERVIEW_METRICS.activeCases}
          </div>
          <div className="console-kpi-sub">Across 8 pilot districts</div>
        </div>

        <div className="console-kpi-card">
          <div className="console-kpi-label">
            <span>AVERAGE RESPONSE TIME</span>
            <Clock size={16} color="#2563EB" />
          </div>
          <div className="console-kpi-value" style={{ color: '#2563EB' }}>
            21 <span style={{ fontSize: '1rem', fontWeight: 600 }}>min</span>
          </div>
          <div className="console-kpi-sub">SLA target: &lt; 30 minutes</div>
        </div>

        <div className="console-kpi-card">
          <div className="console-kpi-label">
            <span>INTERVENTION COMPLETION</span>
            <CheckCircle2 size={16} color="#15803D" />
          </div>
          <div className="console-kpi-value" style={{ color: '#15803D' }}>
            94%
          </div>
          <div className="console-kpi-sub">Verified delivered support</div>
        </div>

        <div className="console-kpi-card">
          <div className="console-kpi-label">
            <span>FOLLOW-UP COMPLIANCE</span>
            <TrendingUp size={16} color="#17324D" />
          </div>
          <div className="console-kpi-value" style={{ color: '#17324D' }}>
            88%
          </div>
          <div className="console-kpi-sub">Post-intervention normalization</div>
        </div>
      </div>

      {/* Charts Grid 1: Distress Escalation Trends (Left) & Channel Breakdown (Right) */}
      <div className="console-two-col">
        
        {/* Distress Severity Distribution */}
        <div className="console-card">
          <div className="console-card-header">
            <span className="console-card-title">Cases by Triage Severity Level</span>
            <span style={{ fontSize: '0.74rem', color: '#667085' }}>Total 128 Cases</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '10px 0' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#B42318' }}>Critical (DDS &ge; 80 / Acute Threat)</span>
                <strong>6 cases (4.7%)</strong>
              </div>
              <div style={{ height: '8px', background: '#F2F4F7', borderRadius: '4px' }}>
                <div style={{ height: '100%', width: '4.7%', background: '#B42318', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#D97706' }}>High Risk (DDS 65–79 / Boycott / Trial Near)</span>
                <strong>11 cases (8.6%)</strong>
              </div>
              <div style={{ height: '8px', background: '#F2F4F7', borderRadius: '4px' }}>
                <div style={{ height: '100%', width: '8.6%', background: '#D97706', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#CA8A04' }}>Moderate Risk (DDS 36–64 / Resource Denial)</span>
                <strong>24 cases (18.8%)</strong>
              </div>
              <div style={{ height: '8px', background: '#F2F4F7', borderRadius: '4px' }}>
                <div style={{ height: '100%', width: '18.8%', background: '#CA8A04', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#15803D' }}>Routine Monitoring (Stable Baseline Delta &lt; 15)</span>
                <strong>87 cases (68.0%)</strong>
              </div>
              <div style={{ height: '8px', background: '#F2F4F7', borderRadius: '4px' }}>
                <div style={{ height: '100%', width: '68%', background: '#15803D', borderRadius: '4px' }} />
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.74rem', color: '#667085', marginTop: '14px', borderTop: '1px solid #F2F4F7', paddingTop: '10px' }}>
            Dynamic baseline delta comparison prevents false positives by personalizing each victim's threshold.
          </div>
        </div>

        {/* Channel Distribution */}
        <div className="console-card">
          <div className="console-card-header">
            <span className="console-card-title">Cases by Communication Channel</span>
            <span style={{ fontSize: '0.74rem', color: '#667085' }}>Accessibility Breakdown</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CHANNEL_DISTRIBUTION.map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: '#172033' }}>{item.channel}</span>
                  <span style={{ color: '#667085' }}>{item.count} cases ({item.percentage}%)</span>
                </div>
                <div style={{ height: '8px', background: '#F2F4F7', borderRadius: '4px' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${item.percentage}%`, 
                      background: i === 0 ? '#17324D' : i === 1 ? '#2563EB' : i === 2 ? '#D97706' : '#15803D', 
                      borderRadius: '4px' 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.74rem', color: '#667085', marginTop: '16px', borderTop: '1px solid #F2F4F7', paddingTop: '10px' }}>
            IVRS and 14566 helpline account for <strong>64%</strong> of reach, ensuring non-smartphone & low-literacy inclusion.
          </div>
        </div>

      </div>

      {/* Grid 2: State-wise Distribution & Closed-Loop Delivery SLA */}
      <div className="console-two-col">
        
        {/* State-wise Distribution */}
        <div className="console-card">
          <div className="console-card-header">
            <span className="console-card-title">State-Wise Caseload & Resolution</span>
            <span style={{ fontSize: '0.74rem', color: '#667085' }}>8 Active State Hubs</span>
          </div>

          <div className="console-table-wrapper" style={{ border: 'none' }}>
            <table className="console-table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Active Cases</th>
                  <th>Critical Alerts</th>
                  <th>Delivery Rate</th>
                </tr>
              </thead>
              <tbody>
                {STATE_DISTRIBUTION.map((st, i) => (
                  <tr key={i}>
                    <td><strong>{st.state}</strong></td>
                    <td>{st.activeCases}</td>
                    <td>
                      {st.critical > 0 ? (
                        <span className="c-badge c-badge-critical">{st.critical}</span>
                      ) : (
                        <span style={{ color: '#98A2B3' }}>0</span>
                      )}
                    </td>
                    <td>
                      <strong style={{ color: '#15803D' }}>{st.completionRate}%</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Closed-Loop Intervention Delivery SLAs */}
        <div className="console-card">
          <div className="console-card-header">
            <span className="console-card-title">Intervention Delivery SLAs</span>
            <span className="c-badge c-badge-safe">VERIFIED CLOSED-LOOP</span>
          </div>

          <div className="console-table-wrapper" style={{ border: 'none' }}>
            <table className="console-table">
              <thead>
                <tr>
                  <th>Intervention Type</th>
                  <th>Dispatched</th>
                  <th>Delivered</th>
                  <th>Avg Delivery Time</th>
                  <th>SLA Compliance</th>
                </tr>
              </thead>
              <tbody>
                {INTERVENTION_STATS.map((stat, i) => (
                  <tr key={i}>
                    <td><strong>{stat.type}</strong></td>
                    <td>{stat.total}</td>
                    <td>{stat.delivered}</td>
                    <td>{stat.avgDeliveryHours} hrs</td>
                    <td>
                      <span className="c-badge c-badge-safe">{stat.compliance}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ fontSize: '0.74rem', color: '#667085', marginTop: '14px', borderTop: '1px solid #F2F4F7', paddingTop: '10px' }}>
            Physical verification receipts and official sign-offs are mandatory before marking any intervention delivered.
          </div>
        </div>

      </div>

    </div>
  );
};
