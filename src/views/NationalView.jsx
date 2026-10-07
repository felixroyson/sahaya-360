import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  ShieldAlert, 
  IndianRupee, 
  Users, 
  Activity, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Search,
  Filter
} from 'lucide-react';

export const NationalView = () => {
  const { districts, nationalAggregates, cases } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('ALL');

  const filteredDistricts = districts.filter(d => {
    const matchesSearch = d.district.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedStateFilter === 'ALL' || d.state === selectedStateFilter;
    return matchesSearch && matchesState;
  });

  const uniqueStates = ['ALL', ...new Set(districts.map(d => d.state))];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1.25rem 1.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '4px' }}>
            <span className="badge badge-poa">National Command Center</span>
            <span className="badge badge-low">
              <CheckCircle2 size={12} />
              MoSJE Live Apex Grid
            </span>
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            National Atrocity Victim Mental Health & Distress Intelligence
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
            Longitudinal surveillance across 36 States/UTs under SC/ST (Prevention of Atrocities) Act, 1989 & NHAA 14566
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Helpline 14566 National Load</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0284c7', fontFamily: 'var(--font-mono)' }}>
              {nationalAggregates.registeredHelpline14566Calls.toLocaleString()} Calls
            </div>
          </div>
          <div style={{ height: '36px', width: '1px', background: '#e2e8f0' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>AI Speech Accuracy</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#16a34a', fontFamily: 'var(--font-mono)' }}>
              {nationalAggregates.aiSpeechAnalysisAccuracy}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid-4">
        
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>
              Active Monitored Victims
            </span>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(2, 132, 199, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={17} color="#0284c7" />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
            {nationalAggregates.totalMonitoredNationwide.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#16a34a', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <TrendingUp size={13} />
            <span>+8.4% intake through 14566 portal</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderColor: '#fecaca', background: '#fef2f2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#dc2626' }}>
              Critical Risk Thresholds
            </span>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={17} color="#dc2626" />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
            {nationalAggregates.activeCriticalAlerts}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#dc2626', marginTop: '4px', fontWeight: 600 }}>
            DDS &gt; 80 / Immediate Police & Medical Dispatch
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>
              Crises Preempted Early
            </span>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(22, 163, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={17} color="#16a34a" />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#16a34a', fontFamily: 'var(--font-mono)' }}>
            {nationalAggregates.crisesPredictedAndDeescalated.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px', fontWeight: 600 }}>
            De-escalated before trial or bail hearing
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>
              PoA Relief Funds Disbursed
            </span>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IndianRupee size={17} color="#d97706" />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#d97706', fontFamily: 'var(--font-mono)' }}>
            {nationalAggregates.totalReliefDisbursedCr} <span style={{ fontSize: '1rem', fontWeight: 600 }}>Cr</span>
          </div>
          <div style={{ fontSize: '0.74rem', color: '#0284c7', marginTop: '4px', fontWeight: 600 }}>
            Correlated with 41% decrease in acute anxiety
          </div>
        </div>

      </div>

      {/* State & District Surveillance Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
              State & District Vulnerability Monitoring Grid
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
              Live roll-up of atrocity victim mental health indicators and emergency response latency
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '0.45rem 0.85rem' }}>
              <Search size={14} color="#64748b" style={{ marginRight: '6px' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search District or State..."
                style={{ background: 'transparent', border: 'none', color: '#0f172a', fontSize: '0.8rem', outline: 'none', padding: 0 }}
              />
            </div>

            {/* Filter by state */}
            <select
              value={selectedStateFilter}
              onChange={(e) => setSelectedStateFilter(e.target.value)}
              style={{
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                padding: '0.5rem 0.85rem',
                color: '#0f172a',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              {uniqueStates.map(st => (
                <option key={st} value={st}>{st === 'ALL' ? 'All States (36 UTs)' : st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Clean Light Surveillance Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#475569', textAlign: 'left', fontWeight: 700 }}>
                <th style={{ padding: '0.85rem 0.75rem' }}>State / District</th>
                <th style={{ padding: '0.85rem 0.75rem' }}>Active Monitored</th>
                <th style={{ padding: '0.85rem 0.75rem' }}>Critical Risk (DDS &gt; 80)</th>
                <th style={{ padding: '0.85rem 0.75rem' }}>Elevated Risk (66-80)</th>
                <th style={{ padding: '0.85rem 0.75rem' }}>Avg Dispatch Response</th>
                <th style={{ padding: '0.85rem 0.75rem' }}>Relief Disbursed</th>
                <th style={{ padding: '0.85rem 0.75rem' }}>Crises Averted</th>
                <th style={{ padding: '0.85rem 0.75rem' }}>Tele-Counselling</th>
              </tr>
            </thead>
            <tbody>
              {filteredDistricts.map((d, i) => (
                <tr 
                  key={i} 
                  style={{ 
                    borderBottom: '1px solid #f1f5f9',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#0f172a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={15} color="#0284c7" />
                      <span>{d.district}</span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>({d.state})</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {d.activeMonitoredVictims}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span className="badge badge-critical" style={{ fontSize: '0.7rem' }}>
                      {d.criticalDistressCases} Cases
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span className="badge badge-high" style={{ fontSize: '0.7rem' }}>
                      {d.highRiskCases} Cases
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', color: d.avgInterventionResponseMins < 20 ? '#16a34a' : '#ea580c', fontWeight: 700 }}>
                    <Clock size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    {d.avgInterventionResponseMins} mins
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#d97706' }}>
                    ₹ {d.reliefFundsDisbursedCr} Cr
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', color: '#16a34a', fontWeight: 800 }}>
                    {d.preventedCrisisEvents}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', color: '#0284c7', fontWeight: 700 }}>
                    {d.teleCounsellingSessions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default NationalView;
