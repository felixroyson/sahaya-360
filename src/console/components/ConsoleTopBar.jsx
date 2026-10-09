import React from 'react';
import { 
  Search, 
  Bell, 
  Globe, 
  ArrowLeft, 
  ShieldAlert, 
  PlayCircle, 
  CheckCircle2,
  Sparkles,
  LogOut,
  Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ConsoleTopBar = ({ 
  searchQuery, 
  setSearchQuery, 
  activeRole, 
  setActiveRole, 
  language, 
  setLanguage, 
  unresolvedAlertsCount,
  onOpenAlerts,
  onLaunchDemo,
  isDemoActive,
  onReturnToLanding,
  currentUser,
  logout
}) => {
  const appContext = useApp ? useApp() : {};
  const user = currentUser || appContext.currentUser;
  const handleLogout = logout || appContext.logout;
  const handleBack = () => {
    if (onReturnToLanding) {
      onReturnToLanding();
    }
    setActiveRole('landing');
  };

  return (
    <header className="console-topbar">
      {/* Official Government Credentials */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingRight: '14px', borderRight: '1px solid #E2E8F0', flexShrink: 0 }}>
        <img 
          src="/ashoka_emblem.png" 
          alt="State Emblem of India" 
          style={{ height: '32px', width: 'auto', objectFit: 'contain', display: 'block' }} 
        />
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <img 
              src="/indian_flag.png" 
              alt="National Flag of India" 
              style={{ width: '13px', height: '9px', objectFit: 'cover', borderRadius: '1px' }} 
            />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.01em' }}>Government of India</span>
          </div>
          <div style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 600 }}>MoSJE Official Desk</div>
        </div>
      </div>

      {/* Top Left: Global Search */}
      <div style={{ display: 'flex', alignItems: 'center', flex: '1', minWidth: '180px', maxWidth: '340px' }}>
        <div className="console-search-box" style={{ width: '100%' }}>
          <Search size={15} className="console-search-icon" />
          <input 
            type="text" 
            placeholder="Search citizen, FIR, district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Top Bar Actions */}
      <div className="console-topbar-actions">
        {/* Interactive Guided Tour Trigger */}
        <button 
          type="button"
          onClick={onLaunchDemo}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            border: isDemoActive ? '1px solid #0284c7' : '1px solid #e2e8f0',
            background: isDemoActive ? '#e0f2fe' : '#ffffff',
            color: isDemoActive ? '#0369a1' : '#475569',
            fontSize: '0.74rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          title="Toggle Guided Interactive Tour"
        >
          <Sparkles size={13} color={isDemoActive ? '#0284c7' : '#64748b'} />
          <span>{isDemoActive ? "Guided Tour: On" : "Guided Tour"}</span>
        </button>

        {/* Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.74rem', color: '#667085', fontWeight: 600 }}>Role:</span>
          <select 
            className="console-role-select"
            value={activeRole}
            onChange={(e) => setActiveRole(e.target.value)}
          >
            <option value="counsellor">Clinical Counsellor (Dr. Ananya)</option>
            <option value="district">District Officer (DM / SP)</option>
            <option value="national">National MoSJE Grid</option>
            <option value="victim">Citizen Portal (Protected)</option>
          </select>
        </div>

        {/* Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Globe size={15} style={{ color: '#667085' }} />
          <select 
            className="console-role-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English (EN)</option>
            <option value="hi">हिंदी (HI)</option>
            <option value="ta">தமிழ் (TA)</option>
            <option value="te">తెలుగు (TE)</option>
            <option value="mr">मराठी (MR)</option>
          </select>
        </div>

        {/* Notifications Icon with Badge */}
        <button 
          className="console-icon-btn" 
          onClick={onOpenAlerts}
          title="View Active Critical Alerts"
        >
          <Bell size={18} />
          {unresolvedAlertsCount > 0 && (
            <span className="console-icon-badge">{unresolvedAlertsCount}</span>
          )}
        </button>

        {/* Back to Home / Public Portal Button */}
        <button 
          className="console-return-link"
          onClick={handleBack}
          title="Return to Public Landing Page (Home)"
        >
          <ArrowLeft size={14} />
          <span>Home</span>
        </button>

        {/* Authenticated User Credentials & Logout Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', borderLeft: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title={`Authenticated: ${user?.displayName || 'Authorized Official'}`}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#0284c7',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.70rem',
              fontWeight: 800
            }}>
              {user?.role === 'citizen' ? 'CP' : 'GOI'}
            </div>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0F172A', maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.displayName || 'Officer Session'}
              </div>
              <div style={{ fontSize: '0.62rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                <span>Verified</span>
              </div>
            </div>
          </div>

          <button 
            type="button"
            className="console-logout-btn"
            onClick={handleLogout}
            title="Securely Log Out & Terminate Session"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#B91C1C',
              padding: '5px 10px',
              borderRadius: '6px',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <LogOut size={12} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
