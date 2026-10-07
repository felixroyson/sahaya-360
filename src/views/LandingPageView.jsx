import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  ArrowRight,
  PhoneCall,
  Activity,
  CheckCircle2,
  Brain,
  TrendingUp,
  Scale,
  Lock,
  Users,
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Award,
  FileCheck,
  HeartHandshake,
  Globe,
  Cpu,
  Layers,
  GitBranch,
  Database,
  Mic,
  MessageSquare,
  BarChart3,
  BookOpen,
  FlaskConical,
  Gavel,
  AlertOctagon,
  Clock,
  MapPin,
  ZapOff,
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  Code2,
  Network,
  Server,
  Workflow,
  MessageCircle,
  Copy,
  Check,
  Smartphone,
  Radio
} from 'lucide-react';
import { IndiaConnectedMap } from '../components/IndiaConnectedMap';
import { t } from '../i18n/translations';
import { dispatchRealTimeOtp, verifyOtpCode } from '../services/otpService';

// Animated counter hook
const useCountUp = (target, duration = 2000, suffix = '') => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
      }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
};


// Animated Impact Statistics Section Component
const StatCard = ({ target, suffix, prefix, label, sublabel, color, duration }) => {
  const { count, ref } = useCountUp(target, duration || 2000);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
      <div style={{
        fontSize: '3.2rem',
        fontWeight: 900,
        lineHeight: 1,
        color,
        letterSpacing: '-0.03em',
        marginBottom: '0.5rem',
        fontFamily: 'var(--font-sans)'
      }}>
        {prefix || ''}{count.toLocaleString()}{suffix || ''}
      </div>
      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>{label}</div>
      {sublabel && <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sublabel}</div>}
    </div>
  );
};

const ImpactStatsSection = ({ language = 'en' }) => (
  <section style={{ maxWidth: '1240px', margin: '5rem auto 0', padding: '0 1.5rem' }}>
    <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '32px', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '2.5rem 3rem 0', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
          <Activity size={12} />
          <span>{t('impact_badge', language)}</span>
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          {t('impact_title', language)}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
          {t('impact_subtitle', language)}
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '2rem' }}>
        {[
          { target: 51656, suffix: '+', label: t('stat_cases_label', language), sublabel: t('stat_cases_sub', language), color: '#ef4444', duration: 2500 },
          { target: 71, suffix: '%', label: t('stat_conviction_label', language), sublabel: t('stat_conviction_sub', language), color: '#f59e0b', duration: 1800 },
          { target: 14566, suffix: '', label: t('stat_helpline_label', language), sublabel: t('stat_helpline_sub', language), color: '#38bdf8', duration: 1200 },
          { target: 60, suffix: 's', label: t('stat_response_label', language), sublabel: t('stat_response_sub', language), color: '#10b981', duration: 1500 },
          { target: 28, suffix: '+', label: t('stat_states_label', language), sublabel: t('stat_states_sub', language), color: '#a855f7', duration: 1600 },
        ].map((stat, i) => (
          <div key={i} style={{ borderRight: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{t('stat_source', language)}</span>
        <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>{t('stat_refresh', language)}</span>
      </div>
    </div>
  </section>
);


export const LandingPageView = () => {

  const { setActiveRole, setSelectedCaseId, cases, nationalAggregates, language, setLanguage, openPitchDeck } = useApp();
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedHub, setSelectedHub] = useState(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeOfferingsTab, setActiveOfferingsTab] = useState('schemes'); // 'schemes' | 'vacancies'
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [vacancyApplied, setVacancyApplied] = useState(false);

  // Login Panel State (Unified Login on Home Page)
  const [showLogin, setShowLogin] = useState(false);
  const [loginRole, setLoginRole] = useState('user'); // 'user' | 'admin'
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'
  const [adminDesignation, setAdminDesignation] = useState('district'); // 'district' | 'counsellor' | 'national'
  const [username, setUsername] = useState('citizen_sunita');
  const [password, setPassword] = useState('••••••••••••');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpDispatchData, setOtpDispatchData] = useState(null);
  const [otpError, setOtpError] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [copiedOtp, setCopiedOtp] = useState(false);

  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  const handleSendOtpClick = (e) => {
    if (e) e.preventDefault();
    setOtpError('');
    if (!mobileNumber || mobileNumber.replace(/\D/g, '').length < 10) {
      setOtpError('Please enter a valid 10-digit mobile number.');
      return;
    }
    const res = dispatchRealTimeOtp(mobileNumber);
    if (!res.success) {
      setOtpError(res.error);
      return;
    }
    setOtpSent(true);
    setOtpDispatchData(res);
    setOtpCountdown(60);
    setOtpValue(''); // Clear old value to allow fresh input
  };

  const handleCopyOtp = () => {
    if (otpDispatchData?.otpCode) {
      navigator.clipboard?.writeText(otpDispatchData.otpCode);
      setCopiedOtp(true);
      setTimeout(() => setCopiedOtp(false), 2000);
    }
  };

  const handleAutoFillOtp = () => {
    if (otpDispatchData?.otpCode) {
      setOtpValue(otpDispatchData.otpCode);
      setOtpError('');
    }
  };

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    setOtpError('');
    if (loginMethod === 'otp') {
      if (!mobileNumber || mobileNumber.replace(/\D/g, '').length < 10) {
        setOtpError('Please enter a valid 10-digit mobile number.');
        return;
      }
      if (!otpValue || otpValue.trim().length === 0) {
        setOtpError('Please enter the 6-digit OTP code.');
        return;
      }
      const verifyRes = verifyOtpCode(mobileNumber, otpValue);
      if (!verifyRes.success) {
        setOtpError(verifyRes.error || 'Invalid OTP. Please check the code sent to your mobile number.');
        return;
      }
    }
    if (loginRole === 'user') {
      setActiveRole('victim');
    } else {
      setActiveRole(adminDesignation || 'district');
    }
  };

  const switchLoginRole = (newRole) => {
    setLoginRole(newRole);
    if (newRole === 'user') {
      setUsername('citizen_sunita');
      setPassword('••••••••••••');
    } else {
      if (adminDesignation === 'counsellor') {
        setUsername('dr_priya_counsellor');
      } else if (adminDesignation === 'national') {
        setUsername('apex_command_mosje');
      } else {
        setUsername('magistrate_aligarh');
      }
      setPassword('••••••••••••');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hubs = [
    {
      id: "hub-1",
      city: "New Delhi",
      state: "National HQ",
      role: "MoSJE Apex Command Center",
      score: "Live",
      flag: "🇮🇳",
      top: "32%",
      left: "48%",
      avatar: "🏛️",
      caseId: "NHAA-2026-894"
    },
    {
      id: "hub-2",
      city: "Aligarh",
      state: "Uttar Pradesh",
      name: "Ramesh Kumar",
      score: "DDS 84",
      risk: "Critical",
      flag: "UP",
      top: "38%",
      left: "54%",
      avatar: "👨🏽",
      caseId: "NHAA-2026-894"
    },
    {
      id: "hub-3",
      city: "Bhiwani",
      state: "Haryana",
      name: "Sunita (Protected)",
      score: "DDS 92",
      risk: "Severe",
      flag: "HR",
      top: "26%",
      left: "42%",
      avatar: "👩🏽",
      caseId: "NHAA-2026-102"
    },
    {
      id: "hub-4",
      city: "Dharmapuri",
      state: "Tamil Nadu",
      name: "Pooja Devi",
      score: "DDS 68",
      risk: "High",
      flag: "TN",
      top: "76%",
      left: "52%",
      avatar: "👩🏾",
      caseId: "NHAA-2026-412"
    },
    {
      id: "hub-5",
      city: "Baran",
      state: "Rajasthan",
      name: "Anil Meena",
      score: "DDS 42",
      risk: "Moderate",
      flag: "RJ",
      top: "46%",
      left: "34%",
      avatar: "👨🏾",
      caseId: "NHAA-2026-651"
    },
    {
      id: "hub-6",
      city: "Mahabubnagar",
      state: "Telangana",
      name: "Kavitha Madiga",
      score: "DDS 59",
      risk: "Elevated",
      flag: "TS",
      top: "64%",
      left: "50%",
      avatar: "👩🏽",
      caseId: "NHAA-2026-339"
    }
  ];

  const faqs = [
    {
      q: t('faq_q1', language),
      a: t('faq_a1', language)
    },
    {
      q: t('faq_q2', language),
      a: t('faq_a2', language)
    },
    {
      q: t('faq_q3', language),
      a: t('faq_a3', language)
    },
    {
      q: t('faq_q4', language),
      a: t('faq_a4', language)
    },
    {
      q: t('faq_q5', language),
      a: t('faq_a5', language)
    }
  ];

  const handleOpenHubCase = (hub) => {
    if (hub.caseId) {
      setSelectedCaseId(hub.caseId);
      setActiveRole('district');
    }
  };

  return (
    <div className="landing-page-container">

      {/* Sticky Header Wrapper - Anchored cleanly at top: 0 to eliminate any dragging/scrolling empty gaps */}
      <header className={`landing-header-wrapper ${isScrolled ? 'is-scrolled' : ''}`}>
        {/* Floating Pill Navbar (Project platform navbar) */}
        <nav className={`landing-pill-nav ${isScrolled ? 'is-scrolled' : ''}`}>
          {/* Brand Pill */}
          <div
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => {
              setShowLogin(false);
              setActiveRole('landing');
            }}
            title="SAHAYA-360 — From Distress Signal to Human Action"
          >
            <img
              src="/sahaya360_brand_banner.png"
              alt="SAHAYA-360: From Distress Signal to Human Action"
              style={{
                height: '44px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          {/* Center Nav Links */}
          <div className="landing-nav-links">
            <button className="landing-nav-link active" onClick={() => {
              setShowLogin(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>{t('nav_home', language)}</button>
            <button className="landing-nav-link" onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}>{t('nav_about', language)}</button>
            <button className="landing-nav-link" onClick={() => {
              setActiveOfferingsTab('schemes');
              document.getElementById('offerings-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>{t('nav_schemes', language)}</button>
            <button className="landing-nav-link" onClick={() => {
              setActiveOfferingsTab('vacancies');
              document.getElementById('offerings-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>{t('nav_vacancies', language)}</button>
            <button className="landing-nav-link" onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}>{t('nav_faq', language)}</button>
          </div>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Language Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 10px',
                  borderRadius: '9999px',
                  transition: 'background 0.15s ease'
                }}
                title="Select Language"
              >
                <Globe size={15} color="#0f172a" />
                <span>{language === 'hi' ? 'HI' : language === 'ta' ? 'TA' : language === 'te' ? 'TE' : language === 'mr' ? 'MR' : 'EN'}</span>
                <ChevronDown size={14} color="#64748b" />
              </button>

              {isLangOpen && (
                <div style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                  border: '1px solid #e2e8f0',
                  padding: '6px',
                  minWidth: '130px',
                  zIndex: 250,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}>
                  {[
                    { code: 'en', label: 'English (EN)' },
                    { code: 'hi', label: 'हिंदी (HI)' },
                    { code: 'mr', label: 'मराठी (MR)' },
                    { code: 'ta', label: 'தமிழ் (TA)' },
                    { code: 'te', label: 'తెలుగు (TE)' }
                  ].map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setIsLangOpen(false); }}
                      style={{
                        background: language === l.code ? 'rgba(2, 132, 199, 0.1)' : 'transparent',
                        color: language === l.code ? '#0284c7' : '#0f172a',
                        fontWeight: language === l.code ? 700 : 500,
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.78rem'
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="tel:14566"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#ea580c',
                background: '#fff7ed',
                border: '1px solid #fed7aa',
                padding: '7px 12px',
                borderRadius: '9999px',
                transition: 'all 0.15s ease'
              }}
              title="Toll-Free National Helpline Against Atrocities (14566)"
            >
              <PhoneCall size={13} color="#ea580c" />
              <span>{t('nav_helpline', language)}</span>
            </a>

            {/* Single Unified Login Button */}
            <button
              className="pill-btn-admin-login"
              onClick={() => {
                setShowLogin(prev => !prev);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                background: showLogin ? '#0284c7' : '#0f172a',
                color: '#ffffff',
                border: showLogin ? '1.5px solid #0284c7' : 'none',
                borderRadius: '9999px',
                padding: '8px 20px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: showLogin ? '0 4px 14px rgba(2, 132, 199, 0.35)' : '0 4px 14px rgba(15, 23, 42, 0.25)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                whiteSpace: 'nowrap'
              }}
              title="Access Unified Login (Citizen Portal & Official Console)"
            >
              <User size={14} />
              <span>{t('nav_login', language)}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section (Matching exact locked 2-column layout that never shifts across languages) */}
      <section className="hero-two-column-layout">

        {/* Left Hero Column: Either Overview Hero OR Swapped Login Panel */}
        {showLogin ? (
          <div className={`hero-login-card hero-left-column ${loginRole === 'user' ? 'is-user' : 'is-admin'}`}>
            {/* MoSJE / GoI Official Header matching reference image */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.15rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Government State Emblem */}
                <img
                  src="/ashoka_emblem.png"
                  alt="State Emblem of India"
                  style={{
                    height: '42px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.62rem', fontWeight: 800, background: '#fef08a', color: '#854d0e', padding: '1px 6px', borderRadius: '4px', letterSpacing: '0.04em' }}>{t('beta_badge', language)}</span>
                    <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>{t('gov_india', language)}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', lineHeight: 1.2 }}>{t('ministry_name', language)}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>{t('dept_name', language)}</div>
                </div>
              </div>

              {/* Close / Return to overview button */}
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#64748b',
                  borderRadius: '9999px',
                  padding: '5px 11px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.15s ease'
                }}
                title="Return to Home Overview"
              >
                <ArrowLeft size={12} />
                <span>{t('nav_overview', language)}</span>
              </button>
            </div>

            {/* Heading matching reference image */}
            <div style={{ marginBottom: '1.15rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0 0 0.25rem 0', letterSpacing: '-0.02em' }}>
                {t('login_title', language)}
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>              </p>
            </div>

            {/* Portal Role Selector (User vs Admin with Sliding Pill Transition) */}
            <div className="role-toggle-track">
              <div className={`role-toggle-slider ${loginRole === 'user' ? 'pos-user' : 'pos-admin'}`} />
              
              <button
                type="button"
                onClick={() => switchLoginRole('user')}
                className="role-toggle-btn"
                style={{
                  color: loginRole === 'user' ? '#0284c7' : '#64748b'
                }}
              >
                <User size={15} />
                <span>{t('login_tab_citizen', language)}</span>
              </button>

              <button
                type="button"
                onClick={() => switchLoginRole('admin')}
                className="role-toggle-btn"
                style={{
                  color: loginRole === 'admin' ? '#ffffff' : '#64748b'
                }}
              >
                <Lock size={14} />
                <span>{t('login_tab_admin', language)}</span>
              </button>
            </div>

            {/* 3 Admin User Roles with Smooth Reveal */}
            {loginRole === 'admin' && (
              <div className="admin-roles-container" style={{
                marginBottom: '1.15rem',
                padding: '8px 10px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px'
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#475569', marginBottom: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {t('official_role', language)}
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '6px'
                }}>
                  {[
                    { id: 'district', labelKey: 'role_magistrate', user: 'magistrate_verma_ias' },
                    { id: 'counsellor', labelKey: 'role_counsellor', user: 'dr_ananya_counsellor' },
                    { id: 'national', labelKey: 'role_national', user: 'apex_command_mosje' }
                  ].map(d => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        setAdminDesignation(d.id);
                        setUsername(d.user);
                      }}
                      style={{
                        padding: '7px 4px',
                        borderRadius: '6px',
                        border: adminDesignation === d.id ? '1.5px solid #0f172a' : '1px solid #cbd5e1',
                        background: adminDesignation === d.id ? '#0f172a' : '#ffffff',
                        color: adminDesignation === d.id ? '#ffffff' : '#334155',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease'
                      }}
                      title={`Login as ${t(d.labelKey, language)}`}
                    >
                      <span>{t(d.labelKey, language)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Login Method Tabs */}
            <div style={{ display: 'flex', borderBottom: '1.5px solid #e2e8f0', marginBottom: '1.15rem' }}>
              <button
                type="button"
                onClick={() => setLoginMethod('password')}
                style={{
                  padding: '9px 16px',
                  background: 'none',
                  border: 'none',
                  borderBottom: loginMethod === 'password' ? '2.5px solid #0284c7' : '2.5px solid transparent',
                  color: loginMethod === 'password' ? '#0f172a' : '#64748b',
                  fontWeight: loginMethod === 'password' ? 700 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  marginBottom: '-1.5px',
                  transition: 'all 0.15s ease'
                }}
              >
                {t('login_with_password', language)}
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('otp')}
                style={{
                  padding: '9px 16px',
                  background: 'none',
                  border: 'none',
                  borderBottom: loginMethod === 'otp' ? '2.5px solid #0284c7' : '2.5px solid transparent',
                  color: loginMethod === 'otp' ? '#0f172a' : '#64748b',
                  fontWeight: loginMethod === 'otp' ? 700 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  marginBottom: '-1.5px',
                  transition: 'all 0.15s ease'
                }}
              >
                {t('login_with_otp', language)}
              </button>
            </div>

            {/* Form Content with Smooth Animated Transitions */}
            <form onSubmit={handleLoginSubmit}>
              <div className="animated-form-section" key={`${loginRole}-${loginMethod}`}>
                {loginMethod === 'password' ? (
                  <>
                    {/* Username Field */}
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        {loginRole === 'user' ? t('label_username_user', language) : t('label_username_admin', language)}
                      </label>
                      <input
                        type="text"
                        className="login-input-field"
                        placeholder={t('enter_username', language)}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>

                    {/* Password Field */}
                    <div style={{ marginBottom: '1.2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                          {t('label_password', language)}
                        </label>
                        <a
                          href="#forgot"
                          onClick={(e) => {
                            e.preventDefault();
                            alert("A secure password reset verification code has been dispatched to your linked registered mobile number via NHAA Gateway.");
                          }}
                          style={{ fontSize: '0.78rem', color: '#0284c7', textDecoration: 'none', fontWeight: 600 }}
                        >
                          {t('forgot_password', language)}
                        </a>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="login-input-field"
                          placeholder={t('enter_password', language)}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          style={{ paddingRight: '40px' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: '#64748b',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            padding: 0
                          }}
                          title={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* OTP Mode */}
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        {loginRole === 'user' ? t('label_mobile_user', language) : t('label_mobile_admin', language)}
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: '#f1f5f9',
                          border: '1.5px solid #cbd5e1',
                          borderRadius: '8px',
                          padding: '0 10px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: '#475569',
                          flexShrink: 0
                        }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <img 
                              src="/indian_flag.png" 
                              alt="National Flag of India" 
                              style={{ width: '16px', height: '11px', objectFit: 'cover', borderRadius: '1px' }} 
                            />
                            <span>+91</span>
                          </span>
                        </div>
                        <input
                          type="tel"
                          className="login-input-field"
                          placeholder="Enter 10-digit Mobile (e.g. 9876543210)"
                          value={mobileNumber}
                          onChange={(e) => {
                            setMobileNumber(e.target.value);
                            if (otpError) setOtpError('');
                          }}
                          style={{ flex: 1 }}
                          maxLength={13}
                        />
                        <button
                          type="button"
                          onClick={handleSendOtpClick}
                          disabled={otpCountdown > 0}
                          style={{
                            background: otpCountdown > 0 ? '#94a3b8' : '#0284c7',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0 14px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: otpCountdown > 0 ? 'not-allowed' : 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {otpCountdown > 0 
                            ? `Resend (${otpCountdown}s)` 
                            : otpSent 
                              ? t('btn_resend_otp', language) 
                              : t('btn_send_otp', language)}
                        </button>
                      </div>
                    </div>

                    {/* Real-Time Live Dispatch Card */}
                    {otpSent && otpDispatchData && (
                      <div style={{
                        marginBottom: '1rem',
                        padding: '10px 12px',
                        background: '#f0fdf4',
                        border: '1px solid #86efac',
                        borderRadius: '8px',
                        fontSize: '0.78rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 700, color: '#15803d', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Radio size={14} className="pulse-dot" color="#16a34a" />
                            Dispatched in Real Time
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            {otpDispatchData.carrier}
                          </span>
                        </div>

                        <div style={{ color: '#166534', marginBottom: '8px', lineHeight: 1.4 }}>
                          OTP generated for <strong>{otpDispatchData.formattedPhone}</strong>.
                        </div>

                        {/* WhatsApp Delivery Action */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '6px' }}>
                          <a
                            href={otpDispatchData.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              background: '#25D366',
                              color: '#ffffff',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              textDecoration: 'none'
                            }}
                            title="Send directly to this phone number via WhatsApp"
                          >
                            <MessageCircle size={13} />
                            <span>Send via WhatsApp (+91 {otpDispatchData.phone})</span>
                          </a>

                          <button
                            type="button"
                            onClick={handleCopyOtp}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: '#ffffff',
                              border: '1px solid #bbf7d0',
                              color: '#166534',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '0.74rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            {copiedOtp ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                            <span>{copiedOtp ? 'Copied!' : `Copy (${otpDispatchData.otpCode})`}</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleAutoFillOtp}
                            style={{
                              background: '#e0f2fe',
                              border: '1px solid #7dd3fc',
                              color: '#0369a1',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            ⚡ Auto-Fill
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Error Notification */}
                    {otpError && (
                      <div style={{
                        marginBottom: '1rem',
                        padding: '8px 12px',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '8px',
                        color: '#b91c1c',
                        fontSize: '0.78rem',
                        fontWeight: 600
                      }}>
                        ⚠️ {otpError}
                      </div>
                    )}

                    <div style={{ marginBottom: '1.2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                          {t('label_otp_digits', language)}
                        </label>
                        {otpSent && (
                          <span style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 600 }}>
                            ✓ Dispatched
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        className="login-input-field"
                        placeholder={t('enter_otp', language)}
                        value={otpValue}
                        onChange={(e) => {
                          setOtpValue(e.target.value);
                          if (otpError) setOtpError('');
                        }}
                        maxLength={6}
                        style={{ letterSpacing: '0.2em', fontWeight: 700, fontSize: '1rem', textAlign: 'center' }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Submit Button matching reference image with dynamic mode transitions */}
              <button
                type="submit"
                className={`login-submit-btn ${loginRole === 'user' ? 'user-mode' : 'admin-mode'}`}
                style={{ marginBottom: 0 }}
              >
                <span>{t('btn_login', language)}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="hero-left-column">
            {/* Realistic Waving Indian National Flag */}
            <img
              src="/indian_flag.png"
              alt="National Flag of India"
              className="hero-flag-banner"
            />

            {/* Big Bold Headline matching screenshot */}
            <h1 style={{ fontSize: '2.45rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em', color: '#0f172a', marginBottom: '0.45rem', minHeight: '62px' }}>
              {t('hero_support_in', language)}{' '}
              <span style={{ color: '#0284c7' }}>{t('hero_india', language)}</span>
            </h1>

            {/* Subheading matching screenshot styling */}
            <p style={{ fontSize: '1.02rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.3rem', minHeight: '44px' }}>
              {t('hero_headline', language)}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, maxWidth: '480px', marginBottom: '1.1rem', minHeight: '62px' }}>
              {t('hero_subheadline', language)}
            </p>

            {/* Action Buttons - Always on the same line and positioned high up */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.4rem', width: '100%' }}>
              <button
                className="pill-btn-black"
                onClick={() => setActiveRole('district')}
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: '10px 12px',
                  fontSize: '0.80rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t('btn_explore_triage', language)}</span>
                <ArrowRight size={14} style={{ flexShrink: 0 }} />
              </button>

              <button
                onClick={() => setActiveRole('victim')}
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: '#ffffff',
                  border: '1.5px solid #0284c7',
                  color: '#0284c7',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  padding: '10px 12px',
                  fontSize: '0.80rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(2, 132, 199, 0.08)',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                title="Access Protected Citizen Well-Being Portal"
              >
                <Shield size={14} color="#0284c7" style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t('btn_protected_portal', language)}</span>
              </button>
            </div>

            {/* Official Credentials Bar (Bottom Left matching screenshot) */}
            <div className="hero-credentials-bar">
              {/* Item 1: State Emblem of India */}
              <div className="credential-item">
                <img
                  src="/ashoka_emblem.png"
                  alt="State Emblem of India"
                  style={{
                    height: '42px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                    {t('cred_ministry', language)}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                    {t('cred_gov', language)}
                  </div>
                </div>
              </div>

              <div className="credential-divider" />

              {/* Item 2: Brand Initiative */}
              <div className="credential-item">
                <img
                  src="/sahaya360_logo.png"
                  alt="SAHAYA-360 Official Emblem"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    boxShadow: '0 2px 8px rgba(13, 148, 136, 0.25)',
                    border: '1.5px solid rgba(13, 148, 136, 0.3)'
                  }}
                />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                    SAHAYA-360
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                    Predict | Protect | Restore
                  </div>
                </div>
              </div>

              <div className="credential-divider" />

              {/* Item 3: National Helpline / Statutory Seal */}
              <div className="credential-item">
                <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="44" stroke="#0284c7" strokeWidth="4" strokeDasharray="6 3" />
                  <circle cx="50" cy="50" r="36" stroke="#0369a1" strokeWidth="2" />
                  <circle cx="50" cy="50" r="16" fill="#0284c7" opacity="0.2" />
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                    <line key={deg} x1="50" y1="16" x2="50" y2="28" stroke="#0284c7" strokeWidth="3" transform={`rotate(${deg} 50 50)`} />
                  ))}
                  <circle cx="50" cy="50" r="8" fill="#0284c7" />
                </svg>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                    {t('stat_helpline_seal', language)}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                    {t('stat_act_sec', language)}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Right Hero Column: Connected India Map with 5 Circular Avatars and Script Notes */}
        <div className="hero-right-map-container" style={{ position: 'relative', marginTop: '0.25rem' }}>
          <IndiaConnectedMap />
        </div>

      </section>

      {/* Section: 5 Core Pillars of SAHAYA-360 */}
      <section id="about-section" style={{ maxWidth: '1240px', margin: '5rem auto 0', padding: '0 1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.85rem' }}>
          <span>{t('pillar_badge', language)}</span>
        </div>

        <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          {t('pillar_title', language)}
        </h2>

        <p style={{ maxWidth: '720px', margin: '0 auto 2rem', color: '#475569', fontSize: '1rem', lineHeight: 1.6 }}>
          {t('pillar_subtitle', language)}
        </p>

        {/* Why We Stand Out: Visibility Gap Pipeline */}
        <div style={{
          maxWidth: '960px',
          margin: '0 auto 3rem',
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          borderRadius: '20px',
          padding: '1.25rem 1.75rem',
          color: '#fff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>1</span>
            <span>{t('pipe_step1', language)}</span>
          </div>
          <ArrowRight size={16} color="#94a3b8" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>2</span>
            <span>{t('pipe_step2', language)}</span>
          </div>
          <ArrowRight size={16} color="#94a3b8" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>3</span>
            <span>{t('pipe_step3', language)}</span>
          </div>
          <ArrowRight size={16} color="#94a3b8" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>4</span>
            <span>{t('pipe_step4', language)}</span>
          </div>
        </div>

        {/* 5 Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem', textAlign: 'left' }}>

          {/* Pillar 1 */}
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(2, 132, 199, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <PhoneCall size={22} color="#0284c7" />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                {t('p1_title', language)}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.55 }}>
                {t('p1_desc', language)}
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(234, 88, 12, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Activity size={22} color="#ea580c" />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                {t('p2_title', language)}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.55 }}>
                {t('p2_desc', language)}
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <TrendingUp size={22} color="#a855f7" />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                {t('p3_title', language)}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.55 }}>
                {t('p3_desc', language)}
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Sparkles size={22} color="#d97706" />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                {t('p4_title', language)}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.55 }}>
                {t('p4_desc', language)}
              </p>
            </div>
          </div>

          {/* Pillar 5 */}
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(22, 163, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <CheckCircle2 size={22} color="#16a34a" />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                {t('p5_title', language)}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.55 }}>
                {t('p5_desc', language)}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Direct Command Portals Strip */}
      <section style={{ maxWidth: '1240px', margin: '4.5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ background: '#0f172a', borderRadius: '32px', padding: '3rem', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('dash_badge', language)}
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px', marginBottom: '0.5rem' }}>
              {t('dash_title', language)}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '560px' }}>
              {t('dash_desc', language)}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => setActiveRole('district')}
              style={{ padding: '12px 22px', fontSize: '0.85rem' }}
            >
              <span>{t('btn_desk_dm', language)}</span>
              <ArrowRight size={15} />
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setActiveRole('national')}
              style={{ padding: '12px 22px', fontSize: '0.85rem' }}
            >
              <span>{t('btn_desk_nat', language)}</span>
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setActiveRole('counsellor')}
              style={{ padding: '12px 22px', fontSize: '0.85rem' }}
            >
              <span>{t('btn_desk_counsellor', language)}</span>
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setActiveRole('victim')}
              style={{ padding: '12px 22px', fontSize: '0.85rem' }}
            >
              <span>{t('btn_desk_citizen', language)}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION: MoSJE Official Offerings: Schemes & Vacancies       */}
      {/* ============================================================ */}
      <section id="offerings-section" style={{ maxWidth: '1240px', margin: '5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.85rem' }}>
            <Award size={13} />
            <span>MINISTRY OF SOCIAL JUSTICE & EMPOWERMENT · OFFICIAL OFFERINGS</span>
          </div>

          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            {t('offerings_title', language)}
          </h2>

          <p style={{ maxWidth: '720px', margin: '0 auto 1.5rem', color: '#475569', fontSize: '0.98rem', lineHeight: 1.6 }}>
            {t('offerings_subtitle', language)}
          </p>

          {/* Official Source Link Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.76rem', color: '#475569', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
            <span>Official Portal Reference:</span>
            <a
              href="https://www.dosje.gov.in/schemes-services/?org=mosje"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>dosje.gov.in/schemes-services</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Filter Tab Switcher */}
          <div style={{ display: 'inline-flex', background: '#e2e8f0', padding: '4px', borderRadius: '9999px', gap: '4px' }}>
            <button
              onClick={() => setActiveOfferingsTab('schemes')}
              style={{
                padding: '9px 24px',
                borderRadius: '9999px',
                border: 'none',
                background: activeOfferingsTab === 'schemes' ? '#0f172a' : 'transparent',
                color: activeOfferingsTab === 'schemes' ? '#ffffff' : '#475569',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FileCheck size={14} />
              <span>{t('tab_schemes', language)} (6)</span>
            </button>

            <button
              onClick={() => setActiveOfferingsTab('vacancies')}
              style={{
                padding: '9px 24px',
                borderRadius: '9999px',
                border: 'none',
                background: activeOfferingsTab === 'vacancies' ? '#0f172a' : 'transparent',
                color: activeOfferingsTab === 'vacancies' ? '#ffffff' : '#475569',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Briefcase size={14} />
              <span>{t('tab_vacancies', language)} (4)</span>
            </button>
          </div>
        </div>

        {/* 1. SCHEMES & SERVICES GRID */}
        {activeOfferingsTab === 'schemes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              {
                id: 'poa-relief',
                title: 'SC/ST PoA Statutory Relief & Rehabilitation',
                category: 'Statutory Justice & Protection',
                badgeColor: '#0284c7',
                badgeBg: 'rgba(2, 132, 199, 0.1)',
                benefit: '₹1,00,000 to ₹8,25,000 Direct DBT',
                desc: 'Mandated under SC/ST PoA Act 1989 Section 15A. 50% initial relief credited upon FIR, plus monthly pension, housing support, and educational allowance for affected families.',
                portalText: 'Apply in Citizen Portal',
                action: () => setActiveRole('victim'),
                officialUrl: 'https://www.dosje.gov.in/organisation/national-helpline-against-atrocities/'
              },
              {
                id: 'nhaa-helpline',
                title: 'National Helpline Against Atrocities (14566)',
                category: '24×7 Rapid Response Grid',
                badgeColor: '#ea580c',
                badgeBg: 'rgba(234, 88, 12, 0.1)',
                benefit: 'Toll-Free Multilingual Emergency Triage',
                desc: 'Zero-FIR automated docket generation, geo-tagged alert dispatch to District SP/DM, and real-time survivor tracking across all 28 States and 8 Union Territories.',
                portalText: 'Register Rescue Report',
                action: () => setActiveRole('victim'),
                officialUrl: 'https://dosje.gov.in/organisation/national-helpline-against-atrocities/'
              },
              {
                id: 'pm-ajay',
                title: 'PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana)',
                category: 'Socio-Economic Development',
                badgeColor: '#16a34a',
                badgeBg: 'rgba(22, 163, 74, 0.1)',
                benefit: 'Adarsh Gram Infrastructure & Grants',
                desc: 'Comprehensive community development in SC-majority villages, providing grant-in-aid for self-employment generation, skill training, and clean public asset creation.',
                portalText: 'Explore Guidelines',
                action: () => window.open('https://www.dosje.gov.in/organisation/pradhan-mantri-anusuchit-jaati-abhyuday-yojnapm-ajay/', '_blank'),
                officialUrl: 'https://www.dosje.gov.in/organisation/pradhan-mantri-anusuchit-jaati-abhyuday-yojnapm-ajay/'
              },
              {
                id: 'smile',
                title: 'SMILE (Support for Marginalized Individuals)',
                category: 'Social Rehabilitation & Inclusion',
                badgeColor: '#7c3aed',
                badgeBg: 'rgba(124, 58, 237, 0.1)',
                benefit: 'Shelter, Medical Care & Skill Reintegration',
                desc: 'Flagship framework providing health screening, vocational training, counseling, identity documentation, and economic rehabilitation for marginalized persons.',
                portalText: 'View Scheme Details',
                action: () => window.open('https://dosje.gov.in/organisation/support-for-marginalized-individuals-for-livelihood-and-enterprise-smile/', '_blank'),
                officialUrl: 'https://dosje.gov.in/organisation/support-for-marginalized-individuals-for-livelihood-and-enterprise-smile/'
              },
              {
                id: 'scholarship',
                title: 'Pre-Matric & Post-Matric Scholarships for SCs',
                category: 'Educational Empowerment',
                badgeColor: '#0284c7',
                badgeBg: 'rgba(2, 132, 199, 0.1)',
                benefit: '100% Tuition Fee & Academic Stipends',
                desc: 'National scholarship framework covering higher education tuition fees and academic maintenance allowance directly via Aadhaar DBT, empowering over 60 lakh students.',
                portalText: 'National Scholarship Portal ↗',
                action: () => window.open('https://scholarships.gov.in', '_blank'),
                officialUrl: 'https://www.dosje.gov.in/schemes-services/?org=mosje'
              },
              {
                id: 'ambedkar-medical',
                title: 'Dr. Ambedkar Medical & Legal Defense Aid',
                category: 'Healthcare & Special Courts',
                badgeColor: '#d97706',
                badgeBg: 'rgba(217, 119, 6, 0.1)',
                benefit: 'Up to ₹5,00,000 Treatment & Legal Aid',
                desc: 'Immediate financial aid for critical medical surgeries (cardiac, renal, cancer) and fully government-funded Special Public Prosecutors for trial defense in Special PoA Courts.',
                portalText: 'Apply in Portal',
                action: () => setActiveRole('victim'),
                officialUrl: 'https://www.dosje.gov.in/organisation/dr-ambedkar-foundation'
              }
            ].map(scheme => (
              <div
                key={scheme.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: scheme.badgeColor, background: scheme.badgeBg, padding: '3px 10px', borderRadius: '9999px' }}>
                      {scheme.category}
                    </span>
                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View on official MoSJE Portal"
                      style={{ color: '#94a3b8' }}
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.45rem', lineHeight: 1.3 }}>
                    {scheme.title}
                  </h3>

                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0284c7', marginBottom: '0.75rem' }}>
                    {scheme.benefit}
                  </div>

                  <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {scheme.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <button
                    onClick={scheme.action}
                    style={{
                      flex: 1,
                      background: '#0f172a',
                      color: '#ffffff',
                      padding: '9px 14px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <span>{scheme.portalText}</span>
                    <ArrowRight size={13} />
                  </button>

                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#f8fafc',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Official Info</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. OPEN VACANCIES & RECRUITMENT GRID */}
        {activeOfferingsTab === 'vacancies' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {[
              {
                id: 'vac-1',
                title: 'Clinical Tele-Counsellor (NIMHANS/MoSJE Empanelled)',
                department: 'National Helpline Against Atrocities (NHAA - 14566)',
                positions: '42 Open Positions Across 14 Nodal Hubs',
                honorarium: '₹65,000 – ₹85,000 / month',
                qualifications: 'Master’s in Clinical Psychology / Psychiatric Social Work; minimum 2 years trauma & crisis counseling experience.',
                location: 'New Delhi / State Nodal Command Desks',
                deadline: '31 Oct 2026'
              },
              {
                id: 'vac-2',
                title: 'District Vigilance & Human Rights Monitoring Fellow',
                department: 'District Legal Services Authority (DLSA) & Special PoA Courts',
                positions: '28 Open Positions in High-Volume Atrocity Districts',
                honorarium: '₹55,000 / month + Local Travel Allowance',
                qualifications: 'LL.B or Master’s in Human Rights / Social Justice; field experience with SC/ST PoA Act Section 15A enforcement.',
                location: 'Maharashtra, UP, Andhra Pradesh, Bihar & Kerala Districts',
                deadline: '25 Oct 2026'
              },
              {
                id: 'vac-3',
                title: 'AI/ML Bias Audit & Legal NLP Specialist',
                department: 'SAHAYA-360 Autonomous Intelligence Unit · MoSJE Tech Wing',
                positions: '6 Open Positions (Engineering & Audit)',
                honorarium: '₹95,000 – ₹1,25,000 / month',
                qualifications: 'B.Tech / M.Tech in CS/AI or Computational Linguistics; experience with IndicBERT, fairness auditing, and SHAP interpretability.',
                location: 'New Delhi (Hybrid Options Available)',
                deadline: '05 Nov 2026'
              },
              {
                id: 'vac-4',
                title: 'Frontline Victim Advocate & Case Navigator',
                department: 'State Directorate of Social Welfare & PoA Fast-Track Cells',
                positions: '65 Open Positions (Pan-India)',
                honorarium: '₹42,000 / month + Field Mobility Stipend',
                qualifications: 'Bachelor’s in Social Work (BSW) / Sociology; fluency in regional state languages (Hindi, Marathi, Telugu, Tamil).',
                location: 'District Magistrate Complex / Sub-Divisional Desks',
                deadline: '28 Oct 2026'
              }
            ].map(job => (
              <div
                key={job.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16a34a', background: 'rgba(22, 163, 74, 0.1)', padding: '3px 10px', borderRadius: '9999px' }}>
                      {job.positions}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Deadline: <strong>{job.deadline}</strong>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                    {job.title}
                  </h3>

                  <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 700, marginBottom: '0.85rem' }}>
                    {job.department}
                  </div>

                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                      <span style={{ color: '#64748b' }}>Remuneration:</span>
                      <strong style={{ color: '#0f172a' }}>{job.honorarium}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                      <span style={{ color: '#64748b' }}>Duty Station:</span>
                      <strong style={{ color: '#0f172a' }}>{job.location}</strong>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    <strong>Eligibility:</strong> {job.qualifications}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                  <button
                    onClick={() => {
                      setSelectedVacancy(job);
                      setVacancyApplied(false);
                    }}
                    style={{
                      flex: 1,
                      background: '#0f172a',
                      color: '#ffffff',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Apply Online</span>
                    <ArrowRight size={14} />
                  </button>

                  <a
                    href="https://www.dosje.gov.in/vacancies/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#ffffff',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <span>Official Gazette</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* VACANCY APPLICATION MODAL */}
      {selectedVacancy && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '540px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0284c7', background: 'rgba(2, 132, 199, 0.1)', padding: '3px 8px', borderRadius: '4px' }}>
                  RECRUITMENT APPLICATION
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '6px', marginBottom: '2px' }}>
                  {selectedVacancy.title}
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{selectedVacancy.department}</div>
              </div>

              <button
                onClick={() => setSelectedVacancy(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            {vacancyApplied ? (
              <div style={{ padding: '24px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', textAlign: 'center' }}>
                <CheckCircle2 size={40} color="#16a34a" style={{ margin: '0 auto 10px' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#166534', marginBottom: '4px' }}>
                  Application Registered Successfully!
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#15803D', marginBottom: '14px' }}>
                  Your candidate profile has been transmitted to the MoSJE Recruitment Directorate. An acknowledgment email has been dispatched.
                </p>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', background: '#fff', padding: '6px 14px', borderRadius: '6px', border: '1px solid #86efac', display: 'inline-block' }}>
                  Application Ref: REC-2026-{Math.floor(1000 + Math.random() * 9000)}
                </div>
                <div style={{ marginTop: '16px' }}>
                  <button
                    onClick={() => setSelectedVacancy(null)}
                    style={{ background: '#0f172a', color: '#fff', padding: '8px 20px', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                setVacancyApplied(true);
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Full Name *
                  </label>
                  <input required type="text" placeholder="Enter your official name" style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.84rem' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Email Address *
                    </label>
                    <input required type="email" placeholder="name@example.com" style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.84rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Mobile Number *
                    </label>
                    <input required type="tel" maxLength={10} placeholder="10-digit number" style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.84rem' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Highest Qualification & University *
                  </label>
                  <input required type="text" placeholder="e.g. M.Phil in Clinical Psychology (NIMHANS)" style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.84rem' }} />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Statement of Experience / Motivation *
                  </label>
                  <textarea required rows={3} placeholder="Briefly describe your relevant field or clinical experience..." style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.84rem' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedVacancy(null)}
                    style={{ padding: '9px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '9px 22px', borderRadius: '8px', border: 'none', background: '#0f172a', color: '#fff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION: AI/ML Tech Architecture Pipeline                    */}
      {/* ============================================================ */}
      <section id="pipeline-section" style={{ maxWidth: '1240px', margin: '5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.85rem' }}>
            <Cpu size={12} />
            <span>TECHNICAL ARCHITECTURE</span>
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            From Signal to Statutory Action
          </h2>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: '#475569', fontSize: '0.95rem', lineHeight: 1.65 }}>
            SAHAYA-360 fuses 5 independent data streams through an XGBoost ensemble model with SHAP explainability —
            ensuring every alert is traceable, reviewable, and human-approved before action is taken.
          </p>
        </div>

        {/* Pipeline Flow Diagram */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr 40px 1fr 40px 1fr', gap: '0', alignItems: 'center', marginBottom: '2.5rem' }}>

          {/* Stage 1: 5 Input Signals */}
          <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Stage 1 · Input Signals</div>
            {[
              { icon: <Activity size={14} />, label: 'PHQ-9 Mood Self-Report', color: '#0284c7' },
              { icon: <MessageSquare size={14} />, label: 'NLP Text Sentiment (BERT)', color: '#ea580c' },
              { icon: <Mic size={14} />, label: 'Speech Acoustic Features', color: '#a855f7' },
              { icon: <Clock size={14} />, label: 'Check-In Latency Gap', color: '#f59e0b' },
              { icon: <Gavel size={14} />, label: 'Judicial Milestone Proximity', color: '#10b981' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ color: s.color }}>{s.icon}</div>
                <span style={{ fontSize: '0.75rem', color: '#334155', fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ArrowRight size={22} color="#94a3b8" />
          </div>

          {/* Stage 2: AI Model */}
          <div style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)', borderRadius: '20px', padding: '1.5rem', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem' }}>Stage 2 · AI Engine</div>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <Brain size={26} color="#fff" />
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '4px' }}>XGBoost Ensemble</div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
              Gradient boosted trees trained on PHQ-9, PC-PTSD, AUDIT + NHAA historical case outcomes
            </div>
            <div style={{ marginTop: '0.85rem', padding: '6px 12px', background: 'rgba(255,255,255,0.15)', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700 }}>
              Personal Baseline Deviation Detection
            </div>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ArrowRight size={22} color="#94a3b8" />
          </div>

          {/* Stage 3: SHAP Explainability */}
          <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Stage 3 · Explainability</div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <Eye size={22} color="#f59e0b" />
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '6px' }}>SHAP / LIME Attribution</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.55 }}>
              Every flag shows counsellors <em>exactly</em> which signals contributed and by how much — no black boxes.
            </div>
            <div style={{ marginTop: '0.85rem', padding: '5px 10px', background: '#fff7ed', borderRadius: '8px', fontSize: '0.7rem', color: '#d97706', fontWeight: 600, border: '1px solid #fed7aa' }}>
              "Court date in 3 days" +41pts contribution
            </div>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ArrowRight size={22} color="#94a3b8" />
          </div>

          {/* Stage 4: Human in the Loop */}
          <div style={{ background: '#f0fdf4', borderRadius: '20px', padding: '1.5rem', border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Stage 4 · Human Decision</div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(22, 163, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <CheckCircle2 size={22} color="#16a34a" />
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '6px' }}>Counsellor Verification</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.55 }}>
              A licensed NIMHANS-empanelled clinician reviews, confirms, and releases the statutory dispatch — never the AI alone.
            </div>
            <div style={{ marginTop: '0.85rem', padding: '5px 10px', background: '#dcfce7', borderRadius: '8px', fontSize: '0.7rem', color: '#16a34a', fontWeight: 700, border: '1px solid #bbf7d0' }}>
              ✓ AI Supports — Humans Decide
            </div>
          </div>
        </div>

        {/* Tech Stack Row */}
        <div style={{ background: '#0f172a', borderRadius: '20px', padding: '1.5rem 2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tech Stack & Integration</div>
          {[
            { label: 'ML/AI', value: 'XGBoost + scikit-learn, SHAP, LIME' },
            { label: 'NLP', value: 'IndicBERT / XLM-R (Bhashini)' },
            { label: 'Voice', value: 'openSMILE acoustic feature extraction' },
            { label: 'Backend', value: 'FastAPI · PostgreSQL · Redis' },
            { label: 'Privacy', value: 'AES-256 · Role-based MFA · Audit Logs' },
          ].map((techItem, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>{techItem.label}</div>
              <div style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 600 }}>{techItem.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION: Impact Statistics with animated counters             */}
      {/* ============================================================ */}
      <ImpactStatsSection language={language} />

      {/* ============================================================ */}
      {/* SECTION: Statutory Legal Framework                           */}
      {/* ============================================================ */}
      <section style={{ maxWidth: '1240px', margin: '5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(14, 165, 233, 0.1)', color: '#0284c7', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.85rem' }}>
            <Gavel size={12} />
            <span>STATUTORY MANDATE</span>
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Grounded in Constitutional Law
          </h2>
          <p style={{ maxWidth: '660px', margin: '0 auto', color: '#475569', fontSize: '0.95rem', lineHeight: 1.65 }}>
            SAHAYA-360 is built to operationalize the victim protection obligations mandated by the SC/ST (Prevention of Atrocities) Act 1989 and its 2015 Amendment — turning paper rights into live, tracked interventions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {[
            {
              act: 'SC/ST PoA Act, 1989',
              section: 'Section 15A',
              title: 'Victim & Witness Rights',
              desc: 'Mandates periodic psychological assessment, physical protection, and socio-economic rehabilitation for atrocity survivors. SAHAYA-360 automates compliance tracking for every Section 15A obligation.',
              color: '#0284c7',
              bgColor: 'rgba(2, 132, 199, 0.06)',
              borderColor: 'rgba(2, 132, 199, 0.2)',
              icon: <Shield size={22} color="#0284c7" />,
            },
            {
              act: '2015 Amendment Rules',
              section: 'Rule 12(4)',
              title: 'Nodal Officer Mandate',
              desc: 'Each district must designate a nodal officer responsible for periodic victim welfare enquiry. SAHAYA-360 provides named assignment, response-time SLA tracking, and audit-proof delivery logs.',
              color: '#ea580c',
              bgColor: 'rgba(234, 88, 12, 0.06)',
              borderColor: 'rgba(234, 88, 12, 0.2)',
              icon: <Users size={22} color="#ea580c" />,
            },
            {
              act: 'NHAA Helpline',
              section: '14566 Protocol',
              title: 'National Helpline Integration',
              desc: 'Victims calling 14566 are matched to their case record in real-time. Call transcripts are analysed for acute distress markers and the counsellor is alerted within 60 seconds if a threshold is crossed.',
              color: '#a855f7',
              bgColor: 'rgba(168, 85, 247, 0.06)',
              borderColor: 'rgba(168, 85, 247, 0.2)',
              icon: <PhoneCall size={22} color="#a855f7" />,
            },
            {
              act: 'MoSJE Guidelines',
              section: 'DISHA Portal Alignment',
              title: 'State-Level Reporting',
              desc: 'District-level distress indices and intervention completion rates are reported monthly to the MoSJE State Nodal Cell via the DISHA portal API integration — enabling national oversight without manual compilation.',
              color: '#10b981',
              bgColor: 'rgba(16, 185, 129, 0.06)',
              borderColor: 'rgba(16, 185, 129, 0.2)',
              icon: <BarChart3 size={22} color="#10b981" />,
            },
            {
              act: 'Data Protection',
              section: 'DPDP Act 2023',
              title: 'Privacy by Design',
              desc: 'All victim PII is encrypted at rest (AES-256) and in transit (TLS 1.3). Role-based access with MFA ensures only authorized officers see dossier details. Full DPDP Act 2023 compliance baked in from day one.',
              color: '#f59e0b',
              bgColor: 'rgba(245, 158, 11, 0.06)',
              borderColor: 'rgba(245, 158, 11, 0.2)',
              icon: <Lock size={22} color="#f59e0b" />,
            },
            {
              act: 'Ethical AI Framework',
              section: 'NITI Aayog RAISE',
              title: 'Responsible AI Principles',
              desc: 'No autonomous statutory action without human verification. Full model audit trails, bias monitoring across castes and geographies, and quarterly independent review by empanelled NIMHANS clinicians.',
              color: '#64748b',
              bgColor: 'rgba(100, 116, 139, 0.06)',
              borderColor: 'rgba(100, 116, 139, 0.2)',
              icon: <Eye size={22} color="#64748b" />,
            },
          ].map((item, i) => (
            <div key={i} style={{ background: item.bgColor, borderRadius: '20px', padding: '1.5rem', border: `1px solid ${item.borderColor}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '0.75rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: item.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.act} · {item.section}</div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', marginTop: '2px' }}>{item.title}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION: SIH Team & Hackathon Info                          */}
      {/* ============================================================ */}
      <section style={{ maxWidth: '1240px', margin: '5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0c4a6e 100%)', borderRadius: '32px', padding: '3rem 3.5rem', color: '#fff', position: 'relative', overflow: 'hidden' }}>

          {/* Decorative background */}
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '20%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.06)', pointerEvents: 'none' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>

            {/* Left: Problem Statement Details */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700, marginBottom: '1.25rem', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                <Award size={11} />
                <span>SMART INDIA HACKATHON 2026</span>
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
                Built for SIH 2026<br />
                <span style={{ color: '#38bdf8' }}>Problem Statement #26094</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {[
                  { label: 'PS Title', value: 'AI-Powered Dynamic Mental Health Monitoring & Distress Prediction System for Victims of Atrocities' },
                  { label: 'Theme', value: 'MedTech / BioTech / HealthTech' },
                  { label: 'Category', value: 'Software' },
                  { label: 'Ministry', value: 'Ministry of Social Justice & Empowerment (MoSJE)' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '0.82rem' }}>
                    <span style={{ color: '#64748b', fontWeight: 600, minWidth: '90px', flexShrink: 0 }}>{item.label}:</span>
                    <span style={{ color: '#e2e8f0', fontWeight: 500, lineHeight: 1.4 }}>{item.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openPitchDeck(1)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(2, 132, 199, 0.4)',
                  transition: 'all 0.2s ease'
                }}
              >
                <BookOpen size={16} />
                <span>Open SIH Pitch Deck</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Right: Team Card */}
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  🐍
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.3rem' }}>Team Slytherin</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Team ID: 175458</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {[
                  { role: 'Team Lead / Full Stack', name: 'Felix Thomas' },
                  { role: 'ML / AI Pipeline', name: 'Distress Engine' },
                  { role: 'NLP & Bhashini', name: 'IndicBERT Pipeline' },
                  { role: 'Backend & API', name: 'FastAPI + PostgreSQL' },
                  { role: 'Voice Analytics', name: 'openSMILE + IVRS' },
                  { role: 'UI/UX & Design', name: 'React + Vite' },
                ].map((m, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '10px 12px' }}>
                    <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>{m.role}</div>
                    <div style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 600, marginTop: '2px' }}>{m.name}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['React + Vite', 'XGBoost', 'IndicBERT', 'FastAPI', 'Bhashini', 'SHAP', 'openSMILE', 'IVRS'].map((tech, i) => (
                  <span key={i} style={{ fontSize: '0.68rem', fontWeight: 600, padding: '3px 10px', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" style={{ maxWidth: '860px', margin: '4.5rem auto 5rem', padding: '0 1.5rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
            {t('faq_title', language)}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
            {t('faq_subtitle', language)}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '1.25rem 1.5rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveFaq(isOpen ? null : i)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} color="#0284c7" /> : <ChevronDown size={18} color="#64748b" />}
                </div>

                {isOpen && (
                  <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Landing Footer */}
      <footer style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '2rem 1.5rem', color: '#64748b', fontSize: '0.8rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/sahaya360_logo.png"
              alt="SAHAYA-360 Logo"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid #0d9488'
              }}
            />
            <div>
              <strong style={{ color: '#0f172a' }}>SAHAYA-360</strong> — {t('footer_tagline', language)}
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                {t('footer_sub', language)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span>{t('national_helpline_label', language)}</span>
            <span>•</span>
            <span>{t('emergency_police_label', language)}</span>
            <span>•</span>
            <button
              onClick={() => setActiveRole('district')}
              style={{ background: 'none', border: 'none', color: '#0284c7', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>{t('command_center_link', language)}</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
