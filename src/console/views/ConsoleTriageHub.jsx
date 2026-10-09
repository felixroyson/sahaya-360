import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  HelpCircle, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  SlidersHorizontal,
  Info
} from 'lucide-react';

export const ConsoleTriageHub = ({ 
  cases, 
  onSelectCase, 
  onOpenExplain,
  initialSearch = ''
}) => {
  const [filterSeverity, setFilterSeverity] = useState('ALL'); // 'ALL' | 'CRITICAL' | 'HIGH' | 'MODERATE' | 'MONITORING'
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [stateFilter, setStateFilter] = useState('ALL');

  React.useEffect(() => {
    if (initialSearch !== undefined) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  // Filter cases
  const filteredCases = cases.filter(c => {
    const matchesSeverity = filterSeverity === 'ALL' || c.priority === filterSeverity;
    const matchesState = stateFilter === 'ALL' || c.state === stateFilter;
    const matchesSearch = 
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.caseType && c.caseType.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSeverity && matchesState && matchesSearch;
  });

  return (
    <div className="console-content">
      
      {/* Primary Header */}
      <div className="console-page-header">
        <div className="console-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1>TRIAGE HUB</h1>
            <span className="c-badge c-badge-critical">PRIMARY OPERATIONAL QUEUE</span>
          </div>
          <p>Review AI-generated distress signals and baseline deviations before taking action.</p>
        </div>

        {/* Responsible AI Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', border: '1px solid #E4E7EC', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem' }}>
          <Info size={15} color="#2563EB" />
          <span><strong>AI Supports — Humans Decide:</strong> Clinical review required before intervention dispatch</span>
        </div>
      </div>

      {/* Summary Filter Pills (Section 6) */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { id: 'ALL', label: 'All Cases', count: cases.length, color: '#172033', bg: '#F2F4F7' },
          { id: 'CRITICAL', label: 'Critical', count: 6, color: '#B42318', bg: '#FEF3F2' },
          { id: 'HIGH', label: 'High', count: 11, color: '#D97706', bg: '#FFFBEB' },
          { id: 'MODERATE', label: 'Moderate', count: 24, color: '#CA8A04', bg: '#FEF9C3' },
          { id: 'MONITORING', label: 'Monitoring', count: 87, color: '#15803D', bg: '#F0FDF4' }
        ].map((tab) => {
          const isSelected = filterSeverity === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterSeverity(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: isSelected ? `2px solid ${tab.color}` : '1px solid #E4E7EC',
                background: isSelected ? tab.bg : '#FFFFFF',
                color: isSelected ? tab.color : '#475467',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'all 0.12s ease'
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                background: isSelected ? tab.color : '#E4E7EC',
                color: isSelected ? '#FFFFFF' : '#475467',
                padding: '1px 7px',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
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
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#98A2B3' }} />
          <input 
            type="text" 
            placeholder="Search case #, citizen, district..."
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

        {/* State Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.76rem', color: '#667085', fontWeight: 600 }}>State:</span>
          <select 
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            style={{
              padding: '6px 10px',
              border: '1px solid #E4E7EC',
              borderRadius: '6px',
              background: '#FFFFFF',
              fontSize: '0.78rem',
              color: '#172033',
              outline: 'none'
            }}
          >
            <option value="ALL">All States</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Haryana">Haryana</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Telangana">Telangana</option>
            <option value="Bihar">Bihar</option>
          </select>
        </div>

        <div style={{ fontSize: '0.76rem', color: '#667085' }}>
          Showing <strong>{filteredCases.length}</strong> prioritized cases
        </div>
      </div>

      {/* Priority Queue Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredCases.map((c) => {
          const isCritical = c.priority === 'CRITICAL';
          const isHigh = c.priority === 'HIGH';
          const isModerate = c.priority === 'MODERATE';

          return (
            <div 
              key={c.id} 
              className={`console-card ${
                isCritical ? 'critical-border' : isHigh ? 'high-border' : 'moderate-border'
              }`}
              style={{ padding: '18px 20px', borderLeftWidth: '5px' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.3fr 2.4fr 1.4fr', gap: '20px', alignItems: 'flex-start' }}>
                
                {/* Column 1: Case Identity & Citizen */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className={`c-badge ${
                      isCritical ? 'c-badge-critical' : isHigh ? 'c-badge-high' : 'c-badge-moderate'
                    }`}>
                      {c.priority}
                    </span>
                    <strong style={{ fontSize: '1rem', color: '#172033' }}>
                      Case #{c.caseNumber}
                    </strong>
                  </div>

                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#172033', marginTop: '2px' }}>
                    {c.citizenName}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#667085', marginTop: '4px' }}>
                    <MapPin size={13} color="#98A2B3" />
                    <span>{c.location}</span>
                  </div>

                  <div style={{ fontSize: '0.74rem', color: '#98A2B3', marginTop: '4px' }}>
                    {c.actCategory}
                  </div>
                </div>

                {/* Column 2: Distress Metrics & Baseline Delta */}
                <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E4E7EC' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#667085', textTransform: 'uppercase' }}>DDS Score</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: isCritical ? '#B42318' : isHigh ? '#D97706' : '#CA8A04' }}>
                      {c.currentScore} <span style={{ fontSize: '0.75rem', color: '#98A2B3' }}>/ 100</span>
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginTop: '4px' }}>
                    <span style={{ color: '#667085' }}>Personal Baseline:</span>
                    <strong style={{ color: '#172033' }}>{c.baselineScore}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginTop: '2px' }}>
                    <span style={{ color: '#667085' }}>Deviation:</span>
                    <strong style={{ color: '#B42318' }}>{c.deviation}</strong>
                  </div>

                  <div style={{ fontSize: '0.68rem', color: '#15803D', marginTop: '4px', borderTop: '1px solid #E4E7EC', paddingTop: '4px' }}>
                    Confidence: <strong>{c.confidence}%</strong> (v1.2)
                  </div>
                </div>

                {/* Column 3: Top Contributing Signals (Why Flagged) */}
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#667085', marginBottom: '6px' }}>
                    Top Contributing Signals:
                  </div>

                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.78rem', color: '#344054', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {c.topSignals.map((sig, i) => (
                      <li key={i} style={{ lineHeight: 1.35 }}>
                        {sig}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px', fontSize: '0.72rem', color: '#667085' }}>
                    <span>Last check-in: <strong>{c.lastCheckIn}</strong> ({c.lastChannel})</span>
                  </div>
                </div>

                {/* Column 4: Operational Status & Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'stretch' }}>
                  <div style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: isCritical ? '#FEF3F2' : '#FFFBEB',
                    color: isCritical ? '#B42318' : '#D97706',
                    border: `1px solid ${isCritical ? '#FECDCA' : '#FDE68A'}`
                  }}>
                    {c.status}
                  </div>

                  <button 
                    className="c-btn c-btn-primary c-btn-sm"
                    onClick={() => onSelectCase(c.id)}
                    style={{ width: '100%' }}
                  >
                    <span>Review Case</span>
                    <ArrowRight size={13} />
                  </button>

                  <button 
                    className="c-btn c-btn-secondary c-btn-sm"
                    onClick={() => onOpenExplain(c)}
                    style={{ width: '100%' }}
                  >
                    <HelpCircle size={13} />
                    <span>Explain Score</span>
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
