import React from 'react';
import { 
  LayoutDashboard, 
  GitPullRequest, 
  FolderKanban, 
  MessageSquare, 
  ShieldCheck, 
  BellRing, 
  BarChart3, 
  Settings, 
  Lock, 
  UserCheck, 
  ExternalLink,
  HeartHandshake,
  Scale,
  Building2
} from 'lucide-react';

export const ConsoleSidebar = ({ 
  activeNav, 
  setActiveNav, 
  activeRole, 
  setActiveRole, 
  unresolvedAlertsCount = 4, 
  needReviewCount = 17,
  onReturnToLanding
}) => {

  const getRoleTitle = () => {
    switch (activeRole) {
      case 'counsellor':
        return { name: 'Dr. Ananya Sharma', title: 'Clinical Counsellor & Doctor', brandSub: 'Psychiatric Clinical Console' };
      case 'district':
        return { name: 'Shri Rajesh Verma, IAS', title: 'District Magistrate / Nodal Officer', brandSub: 'Magistrate Joint Vigilance Desk' };
      case 'national':
        return { name: 'Dr. R. K. Meena', title: 'MoSJE National Administrator', brandSub: 'National MoSJE Apex Grid' };
      default:
        return { name: 'Dr. Ananya Sharma', title: 'Clinical Counsellor', brandSub: 'Clinical Operations Console' };
    }
  };

  const user = getRoleTitle();

  return (
    <aside className="console-sidebar">
      {/* Header with Logo - Clickable to return to Landing Page */}
      <div 
        className="console-sidebar-header"
        onClick={() => {
          if (onReturnToLanding) onReturnToLanding();
          setActiveRole('landing');
        }}
        style={{ cursor: 'pointer' }}
        title="Return to Home (Landing Page)"
      >
        <div className="console-sidebar-logo">
          <img 
            src="/sahaya360_logo.png" 
            alt="SAHAYA-360 Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            draggable="false"
          />
        </div>
        <div>
          <div className="console-sidebar-brand-name">SAHAYA-360</div>
          <div className="console-sidebar-brand-sub">{user.brandSub}</div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="console-sidebar-nav">
        <div className="console-nav-label">Core Operations</div>
        
        {/* Dynamic Primary Role Desk */}
        <button 
          className={`console-nav-item ${activeNav === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveNav('overview')}
        >
          {activeRole === 'counsellor' ? (
            <>
              <HeartHandshake size={17} color={activeNav === 'overview' ? '#ffffff' : '#0284c7'} />
              <span>Doctor / Clinical Desk</span>
            </>
          ) : activeRole === 'district' ? (
            <>
              <Scale size={17} color={activeNav === 'overview' ? '#ffffff' : '#0284c7'} />
              <span>Magistrate Command Desk</span>
            </>
          ) : activeRole === 'national' ? (
            <>
              <Building2 size={17} color={activeNav === 'overview' ? '#ffffff' : '#0284c7'} />
              <span>National MoSJE Grid</span>
            </>
          ) : (
            <>
              <LayoutDashboard size={17} />
              <span>Overview</span>
            </>
          )}
        </button>

        {/* General Operations Overview */}
        <button 
          className={`console-nav-item ${activeNav === 'general-hub' ? 'active' : ''}`}
          onClick={() => setActiveNav('general-hub')}
          title="Consolidated Multi-District Operations Dashboard"
        >
          <LayoutDashboard size={17} />
          <span>General Operations Hub</span>
        </button>

        <button 
          className={`console-nav-item ${activeNav === 'triage' ? 'active' : ''}`}
          onClick={() => setActiveNav('triage')}
        >
          <GitPullRequest size={17} />
          <span>Triage Hub</span>
          {needReviewCount > 0 && (
            <span className="console-nav-badge critical">{needReviewCount}</span>
          )}
        </button>

        <button 
          className={`console-nav-item ${activeNav === 'cases' ? 'active' : ''}`}
          onClick={() => setActiveNav('cases')}
        >
          <FolderKanban size={17} />
          <span>Cases</span>
        </button>

        <button 
          className={`console-nav-item ${activeNav === 'check-ins' ? 'active' : ''}`}
          onClick={() => setActiveNav('check-ins')}
        >
          <MessageSquare size={17} />
          <span>Check-ins</span>
        </button>

        <button 
          className={`console-nav-item ${activeNav === 'interventions' ? 'active' : ''}`}
          onClick={() => setActiveNav('interventions')}
        >
          <ShieldCheck size={17} />
          <span>Interventions</span>
        </button>

        <div className="console-nav-divider" />
        <div className="console-nav-label">Distress Intelligence</div>

        <button 
          className={`console-nav-item ${activeNav === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveNav('alerts')}
        >
          <BellRing size={17} />
          <span>Alerts</span>
          {unresolvedAlertsCount > 0 && (
            <span className="console-nav-badge critical">{unresolvedAlertsCount}</span>
          )}
        </button>

        <button 
          className={`console-nav-item ${activeNav === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveNav('analytics')}
        >
          <BarChart3 size={17} />
          <span>Analytics</span>
        </button>

        <div className="console-nav-divider" />

        <button 
          className={`console-nav-item ${activeNav === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveNav('settings')}
        >
          <Settings size={17} />
          <span>Settings</span>
        </button>
      </nav>

      {/* Footer Profile & Secure Session */}
      <div className="console-sidebar-footer">
        <div className="console-security-badge">
          <Lock size={12} />
          <span>🔒 Secure Session (DPDP 2023)</span>
        </div>

        <div className="console-user-profile">
          <div className="console-user-avatar">
            {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div className="console-user-info">
            <div className="console-user-name" title={user.name}>{user.name}</div>
            <div className="console-user-role" title={user.title}>{user.title}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
