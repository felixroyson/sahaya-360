import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, 
  Activity, 
  PhoneCall, 
  AlertTriangle, 
  Building2, 
  HeartHandshake, 
  Globe, 
  Radio,
  Home,
  Award,
  EyeOff
} from 'lucide-react';

export const Navbar = () => {
  const { 
    activeRole, 
    setActiveRole, 
    language, 
    setLanguage, 
    alerts, 
    triggerSOS,
    openPitchDeck,
    toggleDiscreetCamouflage
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unresolvedAlertsCount = alerts.filter(a => a.status === 'UNRESOLVED').length;

  return (
    <header style={{ 
      position: 'sticky', 
      top: isScrolled ? 10 : 14, 
      zIndex: 150, 
      margin: '0 auto', 
      maxWidth: '1440px', 
      width: 'calc(100% - 2rem)',
      transition: 'top 0.25s ease'
    }}>
      {/* Floating Sovereign Pill Navbar Matching Landing Page */}
      <div style={{
        background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '9999px',
        padding: '7px 12px 7px 18px',
        boxShadow: isScrolled 
          ? '0 20px 42px -8px rgba(15, 23, 42, 0.20), 0 3px 8px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(15, 23, 42, 0.08)' 
          : '0 10px 30px -6px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        
        {/* Left: Official Brand Identity */}
        <div 
          onClick={() => setActiveRole('landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
          title="Return to Landing Page"
        >
          <img 
            src="/sahaya360_brand_banner.png" 
            alt="SAHAYA-360 Official Brand"
            style={{
              height: '42px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        {/* Center: Interactive Role Navigation Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: '#f1f5f9',
          padding: '4px',
          borderRadius: '9999px'
        }}>
          <button 
            className={`tab-pill ${activeRole === 'landing' ? 'active' : ''}`}
            onClick={() => setActiveRole('landing')}
            title="Public Homepage & Triage Overview"
          >
            <Home size={14} style={{ marginRight: '5px' }} />
            <span>Home</span>
          </button>

          <button 
            className={`tab-pill ${activeRole === 'district' ? 'active' : ''}`}
            onClick={() => setActiveRole('district')}
            title="District Collector & SP Joint Vigilance Hub"
          >
            <Shield size={14} style={{ marginRight: '5px' }} />
            <span>District DM/SP</span>
          </button>

          <button 
            className={`tab-pill ${activeRole === 'national' ? 'active' : ''}`}
            onClick={() => setActiveRole('national')}
            title="Ministry of Social Justice & Empowerment National Grid"
          >
            <Building2 size={14} style={{ marginRight: '5px' }} />
            <span>National MoSJE</span>
          </button>

          <button 
            className={`tab-pill ${activeRole === 'counsellor' ? 'active' : ''}`}
            onClick={() => setActiveRole('counsellor')}
            title="Tele-Mental Health Dossier & Voice Stress AI"
          >
            <Activity size={14} style={{ marginRight: '5px' }} />
            <span>Clinical Desk</span>
          </button>

          <button 
            className={`tab-pill ${activeRole === 'victim' ? 'active' : ''}`}
            onClick={() => setActiveRole('victim')}
            title="Victim & Citizen Protected 14566 Portal"
          >
            <HeartHandshake size={14} style={{ marginRight: '5px' }} />
            <span>Citizen 14566</span>
          </button>
        </div>

        {/* Right Tools, Alerts, Quick Exit & Deck */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          
          {/* Unresolved Alerts Badge */}
          {unresolvedAlertsCount > 0 && (
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                background: '#fee2e2',
                border: '1px solid #fca5a5',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                cursor: 'pointer'
              }}
              onClick={() => setActiveRole('district')}
              title="Click to triage active critical alerts"
            >
              <span className="live-indicator" />
              <span style={{ color: '#dc2626', fontWeight: 700 }}>
                {unresolvedAlertsCount} Critical
              </span>
            </div>
          )}

          {/* Quick Exit Camouflage Button */}
          <button
            onClick={toggleDiscreetCamouflage}
            style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              color: '#475569',
              padding: '6px 12px',
              borderRadius: '9999px',
              fontSize: '0.74rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s ease'
            }}
            title="Safe-Contact Protocol: Press Esc to camouflage screen with weather portal"
          >
            <EyeOff size={13} color="#64748b" />
            <span>Quick Exit (Esc)</span>
          </button>

          {/* Language Switcher Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '9999px', padding: '3px 9px' }}>
            <Globe size={13} style={{ color: '#64748b', marginRight: '4px' }} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0f172a',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                padding: '2px 0'
              }}
            >
              <option value="en">EN</option>
              <option value="hi">HI (हिन्दी)</option>
              <option value="ta">TA (தமிழ்)</option>
              <option value="te">TE (తెలుగు)</option>
              <option value="mr">MR (मराठी)</option>
            </select>
          </div>

          {/* National Helpline Link */}
          <a 
            href="tel:14566"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              textDecoration: 'none',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#ea580c',
              background: '#fff7ed',
              border: '1px solid #fed7aa',
              padding: '6px 12px',
              borderRadius: '9999px',
              transition: 'all 0.15s ease'
            }}
            title="Toll-Free National Helpline Against Atrocities (14566)"
          >
            <PhoneCall size={13} color="#ea580c" />
            <span>14566</span>
          </a>

          {/* Quick SOS Panic Button */}
          <button 
            className="btn btn-danger"
            onClick={() => triggerSOS()}
            style={{ 
              borderRadius: '9999px', 
              padding: '7px 14px', 
              fontSize: '0.78rem', 
              fontWeight: 800,
              gap: '5px' 
            }}
            title="Emergency SOS Dispatch for Immediate Intervention"
          >
            <Radio size={13} />
            <span>SOS</span>
          </button>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
