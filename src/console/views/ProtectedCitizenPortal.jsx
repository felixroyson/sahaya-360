import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartHandshake, 
  PhoneCall, 
  ShieldAlert, 
  ShieldCheck, 
  MessageSquare, 
  EyeOff, 
  CheckCircle2, 
  Clock, 
  Globe, 
  Lock, 
  Radio, 
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  Mic,
  MicOff,
  MapPin,
  FileText,
  AlertTriangle,
  HelpCircle,
  Search,
  LayoutDashboard,
  User,
  Users,
  Eye,
  Building,
  Menu,
  X,
  Volume2,
  Send,
  Home,
  ChevronDown,
  MessageCircle,
  Copy,
  Check,
  Printer,
  Download,
  Scale,
  Sparkles,
  AlertCircle,
  CheckSquare,
  Square,
  FileCheck,
  Shield,
  Info
} from 'lucide-react';
import { dispatchRealTimeOtp, verifyOtpCode } from '../../services/otpService';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';

export const ProtectedCitizenPortal = ({ 
  onReturnToConsole, 
  onReturnToLanding,
  onToggleCamouflage,
  onSwitchRole
}) => {
  const { language = 'en', setLanguage } = useApp ? useApp() : { language: 'en', setLanguage: () => {} };
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState(1);
  const [isTopLangOpen, setIsTopLangOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const handleSkipToMain = () => {
    const mainEl = document.getElementById('citizen-main-content');
    if (mainEl) {
      mainEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mainEl.focus?.();
    }
  };

  const handleFontScale = (scale) => {
    setFontSizeScale(scale);
    document.documentElement.style.fontSize = `${scale * 100}%`;
  };

  useEffect(() => {
    return () => {
      document.documentElement.style.fontSize = '100%';
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsTopLangOpen(false);
      }
    };
    if (isTopLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTopLangOpen]);

  const availableLanguages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  ];
  const currentLangObj = availableLanguages.find(l => l.code === language) || availableLanguages[0];

  // Navigation tabs: 'dashboard' | 'grievance' | 'rescue' | 'track' | 'faq'
  const [activeTab, setActiveTab] = useState('grievance');

  // Multi-step Grievance Registration State (Steps 1 to 5)
  const [currentGrievanceStep, setCurrentGrievanceStep] = useState(1);

  // Step 1: Grievance Registration
  const [grievanceType, setGrievanceType] = useState('FIR');
  const [hasRegisteredFIR, setHasRegisteredFIR] = useState('Yes');
  const [existingFirNo, setExistingFirNo] = useState('CR-184/2026');
  const [policeStationName, setPoliceStationName] = useState('Satara Rural Special Cell');
  const [registeredBy, setRegisteredBy] = useState('informer'); // 'informer' | 'victim' | 'ngo'
  const [mobileNumber, setMobileNumber] = useState('9822014566');
  const [isOtpSent, setIsOtpSent] = useState(true);
  const [otpCode, setOtpCode] = useState('456612');
  const [otpDispatchData, setOtpDispatchData] = useState({
    formattedPhone: '+91 9822014566',
    carrier: 'MoSJE DLT Priority',
    phone: '9822014566',
    otpCode: '456612',
    whatsappUrl: 'https://wa.me/919822014566?text=Your%20SAMBAL%20OTP%20is%20456612'
  });

  // Step 2: Informer / Complainant Details
  const [informerName, setInformerName] = useState('Kishore Pandurang Kamble');
  const [informerRelation, setInformerRelation] = useState('Relative / Family Member');
  const [ngoName, setNgoName] = useState('Ambedkar Samaj Vikas Manch');
  const [ngoRegNo, setNgoRegNo] = useState('MH/2021/008291');
  const [informerDistrict, setInformerDistrict] = useState('Satara');
  const [informerState, setInformerState] = useState('Maharashtra');
  const [informerAddress, setInformerAddress] = useState('Ward No. 3, Siddharth Nagar, Koregaon');
  const [isConfidential, setIsConfidential] = useState(true); // Section 15A Witness Protection

  // Step 3: Victim Details & Vulnerability
  const [victimName, setVictimName] = useState('Sunil Tukaram Kamble');
  const [victimAge, setVictimAge] = useState('42');
  const [victimGender, setVictimGender] = useState('Male');
  const [casteCategory, setCasteCategory] = useState('Scheduled Caste (SC)');
  const [subCaste, setSubCaste] = useState('Mahar / Navayana Buddhist');
  const [dependentsCount, setDependentsCount] = useState('4');
  const [victimDistrict, setVictimDistrict] = useState('Satara');
  const [victimState, setVictimState] = useState('Maharashtra');
  const [victimTaluka, setVictimTaluka] = useState('Koregaon');
  const [victimAddress, setVictimAddress] = useState('Gat No. 44, Pimpode Budruk, Koregaon');
  const [threatLevel, setThreatLevel] = useState('High Threat'); // 'Normal' | 'High Threat' | 'Critical'

  // Step 4: Grievance Details & Atrocity Particulars
  const [incidentDate, setIncidentDate] = useState('2026-10-04');
  const [incidentTime, setIncidentTime] = useState('14:30');
  const [poaSection, setPoaSection] = useState('Section 3(1)(r)(s) — Casteist Abuse, Slurs & Public Humiliation');
  const [incidentDescription, setIncidentDescription] = useState(
    'Dominant caste individuals blocked our pathway to agricultural field and drinking water well, using derogatory casteist slurs in front of villagers, and threatened physical violence if police complaint is filed.'
  );
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceRecordingStatus, setVoiceRecordingStatus] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([
    'Written_Application_to_Collector.pdf',
    'Witness_Statement_Audio.m4a'
  ]);
  const [bhashiniLang, setBhashiniLang] = useState('Marathi');

  // Step 5: Review & Statutory Relief
  const [needArmedEscort, setNeedArmedEscort] = useState(true);
  const [agreedDeclaration, setAgreedDeclaration] = useState(true);
  const [isGrievanceSubmitted, setIsGrievanceSubmitted] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState('');
  const [isCopiedRef, setIsCopiedRef] = useState(false);

  const speakInstruction = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleVoiceRecording = () => {
    if (isVoiceRecording) {
      setIsVoiceRecording(false);
      setVoiceRecordingStatus('');
    } else {
      setIsVoiceRecording(true);
      setVoiceRecordingStatus(`Recording audio via Bhashini AI (${bhashiniLang})...`);
      setTimeout(() => {
        setIncidentDescription((prev) => 
          prev 
            ? `${prev}\n\n[Transcribed Voice Statement via Bhashini AI]: आम्ही गावच्या सरपंचांना आणि पोलीस अधीक्षकांना तातडीने प्रत्यक्ष सुरक्षेची आणि कलम १५अ नुसार संरक्षणाची विनंती करत आहोत.`
            : 'आम्ही गावच्या सरपंचांना आणि पोलीस अधीक्षकांना तातडीने प्रत्यक्ष सुरक्षेची आणि कलम १५अ नुसार संरक्षणाची विनंती करत आहोत.'
        );
        setVoiceRecordingStatus('✓ Spoken statement transcribed and appended in real time!');
        setTimeout(() => {
          setIsVoiceRecording(false);
          setVoiceRecordingStatus('');
        }, 1800);
      }, 2500);
    }
  };

  const handleFinalGrievanceSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!agreedDeclaration) {
      alert('Please confirm the statutory declaration under the SC/ST (PoA) Act before submitting.');
      return;
    }
    const newRef = `NHAA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRefId(newRef);
    setIsGrievanceSubmitted(true);
  };

  // Register Rescue State (Screenshot 2)
  const [rescueName, setRescueName] = useState('');
  const [rescueGender, setRescueGender] = useState('');
  const [rescueMobile, setRescueMobile] = useState('');
  const [rescuePincode, setRescuePincode] = useState('');
  const [rescueState, setRescueState] = useState('Maharashtra');
  const [rescueDistrict, setRescueDistrict] = useState('Satara');
  const [rescueTaluka, setRescueTaluka] = useState('Koregaon');
  const [rescueAddress, setRescueAddress] = useState('');
  const [rescueProblem, setRescueProblem] = useState('');
  const [isRescueOtpSent, setIsRescueOtpSent] = useState(false);
  const [rescueOtpCode, setRescueOtpCode] = useState('');
  const [rescueOtpDispatchData, setRescueOtpDispatchData] = useState(null);
  const [rescueDispatched, setRescueDispatched] = useState(false);
  const [rescueDispatchId, setRescueDispatchId] = useState('');

  // Track Status State (Screenshot 3)
  const [trackSearchType, setTrackSearchType] = useState('reference'); // 'reference' | 'mobile'
  const [trackInput, setTrackInput] = useState('NHAA-2026-004521');
  const [trackResult, setTrackResult] = useState(null);
  const [isTrackLoading, setIsTrackLoading] = useState(false);

  // Dashboard Check-in State
  const [selectedMood, setSelectedMood] = useState(null);
  const [checkInText, setCheckInText] = useState('');
  const [checkInSubmitted, setCheckInSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Handlers
  const handleSendOtp = () => {
    if (!mobileNumber || mobileNumber.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    const res = dispatchRealTimeOtp(mobileNumber);
    if (!res.success) {
      alert(res.error);
      return;
    }
    setOtpDispatchData(res);
    setIsOtpSent(true);
    setOtpCode('');
  };

  const handleSendRescueOtp = () => {
    if (!rescueMobile || rescueMobile.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    const res = dispatchRealTimeOtp(rescueMobile);
    if (!res.success) {
      alert(res.error);
      return;
    }
    setRescueOtpDispatchData(res);
    setIsRescueOtpSent(true);
    setRescueOtpCode('');
  };

  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    const newRef = `NHAA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRefId(newRef);
    setIsGrievanceSubmitted(true);
  };

  const handleRescueSubmit = (e) => {
    e.preventDefault();
    if (!rescueName || !rescueMobile || !rescueAddress || !rescueProblem) {
      alert('Please fill all mandatory fields to dispatch rescue assistance.');
      return;
    }
    const newId = `POLICE-SOS-${Math.floor(1000 + Math.random() * 9000)}`;
    setRescueDispatchId(newId);
    setRescueDispatched(true);
  };

  const handleTrackSubmit = () => {
    setIsTrackLoading(true);
    setTimeout(() => {
      const isCurrentSubmission = trackInput === generatedRefId;
      setTrackResult({
        refId: trackInput || generatedRefId || 'NHAA-2026-004521',
        title: isCurrentSubmission 
          ? `${poaSection.split('—')[0]} (${grievanceType})`
          : 'Caste Discrimination & Intimidation regarding Land Rights',
        complainant: isCurrentSubmission
          ? (registeredBy === 'victim' ? `${victimName} (Direct Filing)` : `${informerName} (${informerRelation}${isConfidential ? ' - 🔒 Confidential' : ''})`)
          : 'Protected Citizen (Confidential Informer)',
        victimName: isCurrentSubmission ? `${victimName} & Family` : 'Ramesh K. & Family',
        state: isCurrentSubmission ? victimState : 'Maharashtra',
        district: isCurrentSubmission ? victimDistrict : 'Satara',
        firNumber: hasRegisteredFIR === 'Yes' ? `${existingFirNo}, ${policeStationName}` : 'Zero-FIR Docket (PoA Special Cell)',
        status: 'UNDER ACTIVE LEGAL DISPATCH & STATUTORY RELIEF',
        dateFiled: isCurrentSubmission ? 'Today' : '02 Oct 2026',
        reliefAmount: '₹50,000 / ₹4,25,000 (Phase 1 Queued for Clearance via DBT)',
        assignedOfficer: `Shri A. Deshmukh (SDM & Nodal Vigilance, ${isCurrentSubmission ? victimDistrict : 'Satara'})`,
        counsellor: 'Dr. Priya Sharma (NIMHANS Empanelled Legal Counsel)',
        timeline: [
          { date: 'Just now', title: 'Grievance Registered via NHAA 14566', status: 'done', desc: 'Case entered national central registry and allocated Reference ID.' },
          { date: 'Live', title: 'Mobile & Identity Verified', status: 'done', desc: `Verified via OTP (+91 ${mobileNumber}).` },
          { date: 'Dispatched', title: 'Forwarded to District Magistrate & SP', status: 'done', desc: `Dispatched to Collectorate & PoA Special Cell (${isCurrentSubmission ? victimDistrict : 'Satara'}).` },
          { date: 'Next 24h', title: 'Statutory Relief Clearance (Phase 1 DBT)', status: 'active', desc: 'District Collector sanctioning interim relief under PoA Rule 12(4).' },
          { date: 'Scheduled', title: 'Special PoA Inquiry & Beat Patrol', status: 'pending', desc: isConfidential ? 'DSP inquiry under Sec 15A Witness Protection Protocol.' : 'DSP field inquiry.' }
        ]
      });
      setIsTrackLoading(false);
    }, 400);
  };

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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F4F7FB',
      color: '#1E293B',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      fontSize: `${fontSizeScale * 100}%`
    }}>
      
      {/* 1. TOP UTILITY STRIP (Official Government of India Header matching screenshot) */}
      <div style={{
        background: '#0B1A30',
        color: '#CBD5E1',
        fontSize: '0.72rem',
        padding: '5px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        zIndex: 500
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <img 
              src="/indian_flag.png" 
              alt="National Flag of India" 
              style={{ 
                width: '18px', 
                height: '12px', 
                objectFit: 'cover', 
                borderRadius: '1px', 
                boxShadow: '0 0 2px rgba(0,0,0,0.4)',
                display: 'inline-block' 
              }} 
            />
            <strong style={{ color: '#FFFFFF' }}>{t('gov_india', language) || 'Government of India'}</strong>
          </span>
          <span style={{ color: '#64748B' }}>|</span>
          <span style={{ color: '#94A3B8' }}>{t('ministry_name', language) || 'Ministry of Social Justice and Empowerment'}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* 1. Skip to Main Content Button */}
          <button
            type="button"
            onClick={handleSkipToMain}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#94A3B8',
              fontSize: '0.72rem',
              fontWeight: 500,
              padding: '2px 6px',
              borderRadius: '4px',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; e.currentTarget.style.textDecoration = 'underline'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.textDecoration = 'none'; }}
            title={t('skip_to_main', language) || 'Skip to Main Content'}
            aria-label={t('skip_to_main', language) || 'Skip to Main Content'}
          >
            {t('skip_to_main', language) || 'Skip to Main Content'}
          </button>

          {/* 2. Accessibility Font Size Controls (A- A A+) */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '2px', 
              background: 'rgba(255,255,255,0.06)', 
              borderRadius: '5px', 
              padding: '1px 3px',
              border: '1px solid rgba(255,255,255,0.1)' 
            }}
            role="group"
            aria-label="Font sizing controls"
          >
            {[
              { scale: 0.9, label: 'A-', title: t('font_decrease', language) || 'Decrease font size' },
              { scale: 1.0, label: 'A', title: t('font_normal', language) || 'Normal font size' },
              { scale: 1.15, label: 'A+', title: t('font_increase', language) || 'Increase font size' }
            ].map(item => {
              const isActive = fontSizeScale === item.scale;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleFontScale(item.scale)}
                  style={{
                    background: isActive ? '#0284C7' : 'transparent',
                    border: 'none',
                    borderRadius: '3px',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.72rem',
                    padding: '2px 7px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#94A3B8';
                  }}
                  title={item.title}
                  aria-pressed={isActive}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* 3. Multilingual Dropdown (English ▼) */}
          <div style={{ position: 'relative' }} ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setIsTopLangOpen(!isTopLangOpen)}
              style={{
                background: isTopLangOpen ? 'rgba(255,255,255,0.12)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: '5px',
                color: '#CBD5E1',
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '2px 8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={(e) => { if (!isTopLangOpen) { e.currentTarget.style.color = '#CBD5E1'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'; } }}
              aria-expanded={isTopLangOpen}
              aria-haspopup="listbox"
              title="Select Language / भाषा चुनें / மொழியைத் தேர்ந்தெடுக்கவும்"
            >
              <span>{currentLangObj.native}</span>
              <span style={{ fontSize: '0.58rem', opacity: 0.8 }}>▼</span>
            </button>

            {isTopLangOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '125%',
                  right: 0,
                  background: '#0B1A30',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.55)',
                  padding: '5px',
                  minWidth: '150px',
                  zIndex: 9999,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
                role="listbox"
              >
                {availableLanguages.map(l => {
                  const isSelected = language === l.code;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsTopLangOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        borderRadius: '5px',
                        border: 'none',
                        background: isSelected ? 'rgba(2, 132, 199, 0.3)' : 'transparent',
                        color: isSelected ? '#38BDF8' : '#E2E8F0',
                        fontSize: '0.74rem',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isSelected ? 'rgba(2, 132, 199, 0.4)' : 'rgba(255,255,255,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isSelected ? 'rgba(2, 132, 199, 0.3)' : 'transparent';
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{l.native}</span>
                        {l.code !== 'en' && <span style={{ fontSize: '0.62rem', color: '#94A3B8' }}>({l.label})</span>}
                      </span>
                      {isSelected && <span style={{ color: '#38BDF8', fontWeight: 800 }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN SOVEREIGN APP HEADER */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '10px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* Left: Ministry Emblem Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#334155', padding: '4px' }}
            title="Toggle Menu"
          >
            <Menu size={22} />
          </button>

          {/* State Emblem of India */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/ashoka_emblem.png"
              alt="State Emblem of India"
              style={{
                height: '46px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ background: '#F59E0B', color: '#FFFFFF', fontSize: '0.62rem', fontWeight: 800, padding: '1px 5px', borderRadius: '3px' }}>BETA</span>
                <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600 }}>{t('gov_india', language) || 'Government of India'}</span>
              </div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                {t('ministry_name', language) || 'Ministry of Social Justice & Empowerment'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                {t('dept_name', language) || 'Department of Social Justice & Empowerment'}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Digital India, SAMAVESH & Admin Login Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Digital India Pill Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
            <span style={{ fontWeight: 800, fontSize: '0.75rem', color: '#0284C7' }}>Digital India</span>
            <span style={{ fontSize: '0.65rem', color: '#64748B' }}>Power To Empower</span>
          </div>

          {/* SAMAVESH Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></span>
            <span style={{ fontWeight: 800, fontSize: '0.75rem', color: '#0F172A' }}>SAMAVESH</span>
          </div>

          {/* Quick Exit Camouflage */}
          <button
            onClick={onToggleCamouflage}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#475569',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            title="Instantly camouflage screen with weather forecast"
          >
            <EyeOff size={13} />
            <span>{t('quick_exit', language) || 'Quick Exit (Esc)'}</span>
          </button>

          {/* Home Link */}
          {onReturnToLanding && (
            <button
              onClick={onReturnToLanding}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'transparent',
                border: '1px solid #CBD5E1',
                color: '#334155',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Return to Public Landing Page"
            >
              <Home size={13} />
              <span>{t('btn_home', language) || 'Home'}</span>
            </button>
          )}

          {/* Admin Login Dropdown Menu with 3 Admin Roles */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 18px',
                borderRadius: '8px',
                background: '#0B2545',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(11, 37, 69, 0.25)'
              }}
              title="Access Official Admin Desks (Doctor, Magistrate, National)"
            >
              <Lock size={13} />
              <span>{t('btn_admin_login', language) || 'Admin Login'}</span>
              <ChevronDown size={13} />
            </button>

            {isAdminMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '115%',
                right: 0,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
                padding: '8px',
                minWidth: '280px',
                zIndex: 300,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', padding: '4px 8px', textTransform: 'uppercase' }}>
                  Select Admin Official Desk:
                </div>
                {[
                  { role: 'counsellor', icon: '🩺', label: 'Doctor / Clinical Counsellor Desk', desc: 'Dr. Ananya Sharma' },
                  { role: 'district', icon: '⚖️', label: 'Magistrate & DVO Command Desk', desc: 'Shri Rajesh Verma, IAS' },
                  { role: 'national', icon: '🏛️', label: 'MoSJE National Apex Grid', desc: 'Dr. R. K. Meena' }
                ].map(item => (
                  <button
                    key={item.role}
                    onClick={() => {
                      setIsAdminMenuOpen(false);
                      if (onSwitchRole) onSwitchRole(item.role);
                      else onReturnToConsole(item.role);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '9px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f0f9ff'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>{item.label}</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 3. APP BODY WITH LEFT SIDEBAR AND RIGHT CONTENT VIEW */}
      <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 120px)' }}>
        
        {/* LEFT SIDEBAR (Matching screenshots) */}
        <aside style={{
          width: '260px',
          background: '#FFFFFF',
          borderRight: '1px solid #E2E8F0',
          padding: '20px 14px',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0
        }}>
          {/* SAMBAL Logo Emblem with State Emblem */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
            borderRadius: '12px',
            border: '1px solid #FED7AA',
            marginBottom: '24px'
          }}>
            <img
              src="/ashoka_emblem.png"
              alt="State Emblem of India"
              style={{
                height: '38px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9A3412', lineHeight: 1.1 }}>
                {t('portal_brand', language) || 'SAMBAL (NHAA 2.0)'}
              </div>
              <div style={{ fontSize: '0.62rem', color: '#C2410C', marginTop: '2px', lineHeight: 1.2 }}>
                {t('portal_subbrand', language) || 'Smart Access for Mainstreaming of Beneficiaries'}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { id: 'dashboard', label: t('nav_dashboard', language) || 'Dashboard', icon: <LayoutDashboard size={17} /> },
              { id: 'grievance', label: t('nav_grievance', language) || 'Register Grievance', icon: <FileText size={17} /> },
              { id: 'rescue', label: t('nav_rescue', language) || 'Register Rescue', icon: <ShieldAlert size={17} /> },
              { id: 'track', label: t('nav_track', language) || 'Track Status', icon: <Search size={17} /> },
              { id: 'faq', label: t('nav_faqs', language) || 'Help & FAQs', icon: <HelpCircle size={17} /> },
            ].map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsGrievanceSubmitted(false);
                    setRescueDispatched(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isActive ? '#E0F2FE' : 'transparent',
                    color: isActive ? '#0369A1' : '#475569',
                    fontSize: '0.86rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ color: isActive ? '#0284C7' : '#64748B' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* 24x7 Helpline Card at bottom of sidebar */}
          <div style={{
            marginTop: 'auto',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '14px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>{t('toll_free_title', language) || 'Toll-Free Helpline 24×7'}</div>
            <a 
              href="tel:14566"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '6px',
                color: '#EA580C',
                fontWeight: 900,
                fontSize: '1.05rem',
                textDecoration: 'none'
              }}
            >
              <PhoneCall size={16} color="#EA580C" />
              <span>14566</span>
            </a>
            <div style={{ fontSize: '0.62rem', color: '#94A3B8', marginTop: '4px' }}>{t('national_hotline', language) || 'National Atrocities Hotline'}</div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT AREA */}
        <main 
          id="citizen-main-content" 
          tabIndex="-1" 
          style={{ flex: 1, padding: '28px 36px', overflowY: 'auto', outline: 'none' }}
        >
          
          {/* ======================================================== */}
          {/* TAB 1: REGISTER GRIEVANCE (Complete 5-Step Interaction)   */}
          {/* ======================================================== */}
          {activeTab === 'grievance' && (
            <div>
              {/* Step Progress Bar */}
              <div style={{
                maxWidth: '920px',
                margin: '0 auto 28px',
                position: 'relative'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  zIndex: 2
                }}>
                  {[
                    { num: 1, label: t('step_1', language) || 'Grievance Registration' },
                    { num: 2, label: t('step_2', language) || 'Informer Details' },
                    { num: 3, label: t('step_3', language) || 'Victim Details' },
                    { num: 4, label: t('step_4', language) || 'Grievance Details' },
                    { num: 5, label: t('step_5', language) || 'Review & Submit' },
                  ].map((step) => {
                    const isCompleted = step.num < currentGrievanceStep;
                    const isActive = step.num === currentGrievanceStep;

                    return (
                      <div 
                        key={step.num} 
                        onClick={() => {
                          if (isCompleted || step.num < currentGrievanceStep) {
                            setCurrentGrievanceStep(step.num);
                          }
                        }}
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center',
                          cursor: isCompleted ? 'pointer' : 'default',
                          userSelect: 'none'
                        }}
                        title={isCompleted ? `Click to return to ${step.label}` : ''}
                      >
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: isActive 
                            ? '#0A2540' 
                            : isCompleted 
                              ? '#0284C7' 
                              : '#F1F5F9',
                          border: isActive 
                            ? '3px solid #BAE6FD' 
                            : isCompleted 
                              ? 'none' 
                              : '1.5px solid #CBD5E1',
                          color: (isActive || isCompleted) ? '#FFFFFF' : '#64748B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.86rem',
                          marginBottom: '6px',
                          boxShadow: isActive ? '0 0 0 3px rgba(2, 132, 199, 0.2)' : 'none',
                          transition: 'all 0.2s ease'
                        }}>
                          {isCompleted ? <Check size={18} strokeWidth={2.8} /> : step.num}
                        </div>
                        <span style={{ 
                          fontSize: '0.78rem', 
                          color: isActive ? '#0F172A' : isCompleted ? '#0369A1' : '#64748B', 
                          fontWeight: isActive ? 800 : isCompleted ? 700 : 500,
                          textAlign: 'center',
                          maxWidth: '120px'
                        }}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Connecting track & active progress fill */}
                <div style={{
                  position: 'absolute',
                  top: '18px',
                  left: '36px',
                  right: '36px',
                  height: '3px',
                  background: '#E2E8F0',
                  zIndex: 1
                }}>
                  <div style={{
                    height: '100%',
                    background: '#0284C7',
                    width: `${((currentGrievanceStep - 1) / 4) * 100}%`,
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}></div>
                </div>
              </div>

              {/* Main Grievance Container */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '30px 36px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                maxWidth: '920px',
                margin: '0 auto'
              }}>

                {/* ======================================================== */}
                {/* SUBMITTED SUCCESS VIEW: OFFICIAL DOCKET RECEIPT          */}
                {/* ======================================================== */}
                {isGrievanceSubmitted ? (
                  <div>
                    {/* Header Banner */}
                    <div style={{
                      padding: '24px',
                      background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
                      border: '1.5px solid #86EFAC',
                      borderRadius: '14px',
                      textAlign: 'center',
                      marginBottom: '24px'
                    }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: '#16A34A',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px',
                        boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
                      }}>
                        <CheckCircle2 size={34} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                        <img 
                          src="/ashoka_emblem.png" 
                          alt="State Emblem of India" 
                          style={{ height: '42px', width: 'auto', objectFit: 'contain' }} 
                        />
                      </div>

                      <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800, color: '#15803D', marginBottom: '4px' }}>
                        Government of India · Ministry of Social Justice & Empowerment
                      </div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#14532D', marginBottom: '6px' }}>
                        {t('docket_success_title', language)}
                      </h3>
                      <p style={{ fontSize: '0.86rem', color: '#166534', maxWidth: '640px', margin: '0 auto 16px', lineHeight: 1.5 }}>
                        {t('docket_success_desc', language)}
                      </p>

                      {/* Reference Badge with Copy */}
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: '#FFFFFF',
                        border: '1.5px solid #86EFAC',
                        padding: '10px 22px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                      }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>{t('docket_ref_label', language)}</span>
                        <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', letterSpacing: '0.05em' }}>
                          {generatedRefId}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(generatedRefId);
                            setIsCopiedRef(true);
                            setTimeout(() => setIsCopiedRef(false), 2000);
                          }}
                          style={{
                            background: isCopiedRef ? '#DCFCE7' : '#F1F5F9',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            color: isCopiedRef ? '#15803D' : '#334155',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          {isCopiedRef ? <Check size={12} /> : <Copy size={12} />}
                          <span>{isCopiedRef ? t('btn_copied', language) : t('btn_copy', language)}</span>
                        </button>
                      </div>
                    </div>

                    {/* Dispatch Breakdown Grid */}
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1E293B', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ShieldCheck size={18} color="#0284C7" />
                        <span>{t('statutory_routing_title', language)}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                        {/* Dispatch 1: DM / Collector */}
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <Building size={16} color="#0A2540" />
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F172A' }}>
                              District Magistrate & Collectorate ({victimDistrict})
                            </span>
                          </div>
                          <p style={{ fontSize: '0.74rem', color: '#64748B', lineHeight: 1.4, margin: 0 }}>
                            Direct cognizance file created under PoA Rule 12(4). Preliminary statutory DBT relief sanction of ₹50,000 (Phase 1) queued for clearance within 7 days.
                          </p>
                        </div>

                        {/* Dispatch 2: SP Special Cell */}
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <ShieldAlert size={16} color="#DC2626" />
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F172A' }}>
                              Superintendent of Police (PoA Special Cell)
                            </span>
                          </div>
                          <p style={{ fontSize: '0.74rem', color: '#64748B', lineHeight: 1.4, margin: 0 }}>
                            Assigned to Sub-Divisional Police Officer (DSP). Zero-FIR documentation verified; precautionary police beat patrol scheduled at victim's residence.
                          </p>
                        </div>

                        {/* Dispatch 3: Witness Protection */}
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <Lock size={16} color="#0284C7" />
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F172A' }}>
                              Section 15A Witness Protection Status
                            </span>
                          </div>
                          <p style={{ fontSize: '0.74rem', color: '#64748B', lineHeight: 1.4, margin: 0 }}>
                            {isConfidential 
                              ? 'Active Confidentiality Seal: Informer name and contact are strictly concealed from the accused and public copies.' 
                              : 'Standard Public Record status assigned.'}
                          </p>
                        </div>

                        {/* Dispatch 4: NHAA 14566 Counselor */}
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <PhoneCall size={16} color="#16A34A" />
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F172A' }}>
                              14566 National Helpline Case Manager
                            </span>
                          </div>
                          <p style={{ fontSize: '0.74rem', color: '#64748B', lineHeight: 1.4, margin: 0 }}>
                            Legal counselor assigned for real-time tracking, free DLSA lawyer allocation, and psychosocial wellness check-ins.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Docket Summary Details */}
                    <div style={{
                      background: '#F1F5F9',
                      borderRadius: '12px',
                      padding: '16px 20px',
                      marginBottom: '26px',
                      fontSize: '0.8rem',
                      lineHeight: 1.6
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                        <div>
                          <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>VICTIM / BENEFICIARY</span>
                          <strong style={{ color: '#0F172A' }}>{victimName} ({casteCategory})</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>LOCATION / JURISDICTION</span>
                          <strong style={{ color: '#0F172A' }}>{victimTaluka}, {victimDistrict}, {victimState}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>INVOKED SECTION</span>
                          <strong style={{ color: '#0F172A' }}>{poaSection.split('—')[0]}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsGrievanceSubmitted(false);
                          setCurrentGrievanceStep(1);
                        }}
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          color: '#475569',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Register Another Grievance
                      </button>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          type="button"
                          onClick={() => window.print()}
                          style={{
                            background: '#F8FAFC',
                            border: '1px solid #CBD5E1',
                            color: '#1E293B',
                            padding: '10px 18px',
                            borderRadius: '8px',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Printer size={15} />
                          <span>{t('btn_print_pdf', language)}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setTrackInput(generatedRefId);
                            setActiveTab('track');
                            handleTrackSubmit();
                          }}
                          style={{
                            background: '#0B2545',
                            color: '#FFFFFF',
                            padding: '10px 24px',
                            borderRadius: '8px',
                            border: 'none',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <span>{t('btn_track_status_now', language)}</span>
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Header with Step Title & Bhashini Audio Assist */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px', borderBottom: '1px solid #F1F5F9', pb: '16px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{
                            background: '#E0F2FE',
                            color: '#0369A1',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 800
                          }}>
                            STEP {currentGrievanceStep} OF 5
                          </span>
                          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                            {currentGrievanceStep === 1 && t('step_title_1', language)}
                            {currentGrievanceStep === 2 && t('step_title_2', language)}
                            {currentGrievanceStep === 3 && t('step_title_3', language)}
                            {currentGrievanceStep === 4 && t('step_title_4', language)}
                            {currentGrievanceStep === 5 && t('step_title_5', language)}
                          </h2>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>
                          {currentGrievanceStep === 1 && t('step_desc_1', language)}
                          {currentGrievanceStep === 2 && t('step_desc_2', language)}
                          {currentGrievanceStep === 3 && t('step_desc_3', language)}
                          {currentGrievanceStep === 4 && t('step_desc_4', language)}
                          {currentGrievanceStep === 5 && t('step_desc_5', language)}
                        </p>
                      </div>

                      {/* Bhashini Voice Guide Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const prompts = {
                            1: "In this step, please select whether your grievance relates to an FIR, statutory relief, or police inaction, and verify your mobile number.",
                            2: "In this step, enter your details as the informer. You can check the Section 15A box to keep your name confidential from the accused.",
                            3: "Please enter the victim's name, caste category, location, and threat level so the district administration can dispatch immediate help.",
                            4: "Describe the incident date, time, and what happened. You can also tap the mic button to speak in your local language.",
                            5: "Review all information before submitting to the District Magistrate and Superintendent of Police. You will receive an official docket reference."
                          };
                          speakInstruction(prompts[currentGrievanceStep]);
                        }}
                        style={{
                          background: '#F0F9FF',
                          border: '1px solid #BAE6FD',
                          borderRadius: '8px',
                          color: '#0369A1',
                          padding: '6px 12px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                        title="Click to listen to step instructions in clear audio"
                      >
                        <Volume2 size={15} />
                        <span>{t('voice_guidance', language)}</span>
                      </button>
                    </div>

                    {/* ======================================================== */}
                    {/* STEP 1: GRIEVANCE REGISTRATION (Matching Screenshot 1)   */}
                    {/* ======================================================== */}
                    {currentGrievanceStep === 1 && (
                      <div>
                        {/* Grievance Related To */}
                        <div style={{ marginBottom: '22px' }}>
                          <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1E293B', marginBottom: '10px' }}>
                            Grievance Related To <span style={{ color: '#EF4444' }}>*</span>
                          </label>
                          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                            {['FIR', 'Relief', 'Charge Sheet', 'Corruption', 'Atrocity Intimidation'].map(opt => (
                              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.86rem', color: '#334155' }}>
                                <input 
                                  type="radio" 
                                  name="grievanceRelated" 
                                  checked={grievanceType === opt} 
                                  onChange={() => setGrievanceType(opt)} 
                                  style={{ accentColor: '#0284C7', cursor: 'pointer' }}
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Do you have a registered FIR? */}
                        <div style={{ marginBottom: '24px' }}>
                          <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1E293B', marginBottom: '10px' }}>
                            Do you have a registered FIR? <span style={{ color: '#EF4444' }}>*</span>
                          </label>
                          <div style={{ display: 'flex', gap: '24px', marginBottom: hasRegisteredFIR === 'Yes' ? '12px' : '0' }}>
                            {['Yes', 'No'].map(opt => (
                              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.86rem', color: '#334155' }}>
                                <input 
                                  type="radio" 
                                  name="hasFIR" 
                                  checked={hasRegisteredFIR === opt} 
                                  onChange={() => setHasRegisteredFIR(opt)} 
                                  style={{ accentColor: '#0284C7', cursor: 'pointer' }}
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>

                          {/* Conditional FIR Details or Zero-FIR Guarantee */}
                          {hasRegisteredFIR === 'Yes' ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', background: '#F8FAFC', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                                  Existing FIR / Crime Number (if known)
                                </label>
                                <input
                                  type="text"
                                  value={existingFirNo}
                                  onChange={(e) => setExistingFirNo(e.target.value)}
                                  placeholder="e.g. CR-184/2026"
                                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                                  Police Station Jurisdiction
                                </label>
                                <input
                                  type="text"
                                  value={policeStationName}
                                  onChange={(e) => setPoliceStationName(e.target.value)}
                                  placeholder="e.g. Satara Rural PS"
                                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div style={{ padding: '10px 14px', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '8px', fontSize: '0.78rem', color: '#92400E', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <AlertCircle size={16} color="#B45309" />
                              <span>
                                <strong>Zero-FIR Guarantee:</strong> Under SC/ST PoA Rule 5, filing here directs an immediate Zero-FIR instruction to the District Superintendent of Police.
                              </span>
                            </div>
                          )}
                        </div>

                        {/* REGISTRATION OF GRIEVANCE BY */}
                        <div style={{ marginBottom: '28px' }}>
                          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                            REGISTRATION OF GRIEVANCE BY
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                            {/* Option 1: Informer */}
                            <div 
                              onClick={() => setRegisteredBy('informer')}
                              style={{
                                border: registeredBy === 'informer' ? '2px solid #0369A1' : '1px solid #CBD5E1',
                                background: registeredBy === 'informer' ? '#F0F9FF' : '#FFFFFF',
                                borderRadius: '12px',
                                padding: '16px',
                                cursor: 'pointer',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'flex-start',
                                position: 'relative'
                              }}
                            >
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                background: '#0F2942',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <Eye size={20} />
                              </div>
                              <div>
                                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                                  As an Informer
                                </div>
                                <div style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1.4 }}>
                                  Reporting on behalf of another person or public interest
                                </div>
                              </div>
                              <input 
                                type="radio" 
                                name="registeredByRadio" 
                                checked={registeredBy === 'informer'} 
                                onChange={() => setRegisteredBy('informer')}
                                style={{ position: 'absolute', top: '14px', right: '14px', accentColor: '#0284C7' }} 
                              />
                            </div>

                            {/* Option 2: Victim */}
                            <div 
                              onClick={() => setRegisteredBy('victim')}
                              style={{
                                border: registeredBy === 'victim' ? '2px solid #0369A1' : '1px solid #CBD5E1',
                                background: registeredBy === 'victim' ? '#F0F9FF' : '#FFFFFF',
                                borderRadius: '12px',
                                padding: '16px',
                                cursor: 'pointer',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'flex-start',
                                position: 'relative'
                              }}
                            >
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                background: '#E0F2FE',
                                color: '#0284C7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <User size={20} />
                              </div>
                              <div>
                                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                                  As a Victim
                                </div>
                                <div style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1.4 }}>
                                  Directly affected and filing on your own behalf
                                </div>
                              </div>
                              <input 
                                type="radio" 
                                name="registeredByRadio" 
                                checked={registeredBy === 'victim'} 
                                onChange={() => setRegisteredBy('victim')}
                                style={{ position: 'absolute', top: '14px', right: '14px', accentColor: '#0284C7' }} 
                              />
                            </div>

                            {/* Option 3: NGO */}
                            <div 
                              onClick={() => setRegisteredBy('ngo')}
                              style={{
                                border: registeredBy === 'ngo' ? '2px solid #0369A1' : '1px solid #CBD5E1',
                                background: registeredBy === 'ngo' ? '#F0F9FF' : '#FFFFFF',
                                borderRadius: '12px',
                                padding: '16px',
                                cursor: 'pointer',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'flex-start',
                                position: 'relative'
                              }}
                            >
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                background: '#E0F2FE',
                                color: '#0284C7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <Users size={20} />
                              </div>
                              <div>
                                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                                  As an NGO
                                </div>
                                <div style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1.4 }}>
                                  Organisation filing for one or more beneficiaries
                                </div>
                              </div>
                              <input 
                                type="radio" 
                                name="registeredByRadio" 
                                checked={registeredBy === 'ngo'} 
                                onChange={() => setRegisteredBy('ngo')}
                                style={{ position: 'absolute', top: '14px', right: '14px', accentColor: '#0284C7' }} 
                              />
                            </div>
                          </div>
                        </div>

                        {/* IDENTITY VERIFICATION */}
                        <div style={{ marginBottom: '32px' }}>
                          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                            IDENTITY VERIFICATION
                          </div>

                          <div style={{ maxWidth: '440px' }}>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Mobile No. <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <input 
                                type="tel"
                                placeholder="Enter 10-digit Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                maxLength={10}
                                style={{
                                  flex: 1,
                                  padding: '10px 14px',
                                  borderRadius: '8px',
                                  border: '1px solid #CBD5E1',
                                  fontSize: '0.86rem',
                                  outline: 'none'
                                }}
                              />
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                style={{
                                  background: '#BAE6FD',
                                  color: '#0369A1',
                                  fontWeight: 700,
                                  fontSize: '0.82rem',
                                  border: 'none',
                                  borderRadius: '8px',
                                  padding: '0 16px',
                                  cursor: 'pointer'
                                }}
                              >
                                {isOtpSent ? 'OTP Sent ✓' : 'Send OTP'}
                              </button>
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '6px' }}>
                              OTP will be sent to your registered mobile number for identity verification.
                            </div>

                            {isOtpSent && (
                              <div style={{ marginTop: '12px', padding: '12px 14px', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#15803D' }}>
                                    ✓ OTP Dispatched to {otpDispatchData?.formattedPhone || `+91 ${mobileNumber}`}
                                  </span>
                                  <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                                    {otpDispatchData?.carrier || 'MoSJE DLT Priority'}
                                  </span>
                                </div>

                                {otpDispatchData?.whatsappUrl && (
                                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                    <a
                                      href={otpDispatchData.whatsappUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        background: '#25D366',
                                        color: '#fff',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        textDecoration: 'none'
                                      }}
                                      title="Send directly via WhatsApp to this number"
                                    >
                                      <MessageCircle size={12} />
                                      <span>Send via WhatsApp (+91 {otpDispatchData.phone})</span>
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() => setOtpCode(otpDispatchData.otpCode)}
                                      style={{
                                        background: '#E0F2FE',
                                        border: '1px solid #7DD3FC',
                                        color: '#0369A1',
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        cursor: 'pointer'
                                      }}
                                    >
                                      ⚡ Auto-Fill ({otpDispatchData.otpCode})
                                    </button>
                                  </div>
                                )}

                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                                  Enter 6-Digit OTP (Dispatched in Real Time)
                                </label>
                                <input 
                                  type="text" 
                                  placeholder="Enter OTP" 
                                  value={otpCode}
                                  onChange={(e) => setOtpCode(e.target.value)}
                                  maxLength={6}
                                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #94A3B8', fontSize: '0.9rem', letterSpacing: '0.15em', fontWeight: 700 }} 
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Step 1 Actions */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setMobileNumber('');
                              setIsOtpSent(false);
                            }}
                            style={{
                              padding: '10px 24px',
                              borderRadius: '8px',
                              background: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              color: '#475569',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer'
                            }}
                          >
                            Reset Form
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (!mobileNumber || mobileNumber.replace(/\D/g, '').length < 10) {
                                alert('Please provide a valid 10-digit mobile number before continuing.');
                                return;
                              }
                              setCurrentGrievanceStep(2);
                            }}
                            style={{
                              padding: '10px 28px',
                              borderRadius: '8px',
                              background: '#0B2545',
                              border: 'none',
                              color: '#FFFFFF',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <span>Save and Continue</span>
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ======================================================== */}
                    {/* STEP 2: INFORMER / COMPLAINANT DETAILS                   */}
                    {/* ======================================================== */}
                    {currentGrievanceStep === 2 && (
                      <div>
                        {/* Note if Registered as Victim */}
                        {registeredBy === 'victim' && (
                          <div style={{
                            padding: '14px 18px',
                            background: '#EFF6FF',
                            border: '1px solid #BFDBFE',
                            borderRadius: '10px',
                            marginBottom: '20px',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center'
                          }}>
                            <User size={22} color="#1D4ED8" />
                            <div style={{ fontSize: '0.82rem', color: '#1E40AF', lineHeight: 1.4 }}>
                              <strong>Primary Victim Filing:</strong> You selected "As a Victim". Your complainant identity will be directly linked to the victim profile in Step 3. You may add a trusted co-informer / community advocate below or proceed directly.
                            </div>
                          </div>
                        )}

                        {/* SECTION 15A WITNESS PROTECTION CARD (CRITICAL STATUTORY FEATURE) */}
                        <div style={{
                          background: isConfidential ? '#F0F9FF' : '#F8FAFC',
                          border: isConfidential ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                          borderRadius: '12px',
                          padding: '18px 20px',
                          marginBottom: '24px',
                          transition: 'all 0.2s ease'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                              <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '8px',
                                background: isConfidential ? '#0284C7' : '#94A3B8',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <ShieldCheck size={22} />
                              </div>
                              <div>
                                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                                  Statutory Identity Confidentiality (Section 15A, SC/ST PoA Act)
                                </div>
                                <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
                                  Witness Protection Scheme guarantee: Your name, mobile, and address will be strictly concealed from the accused persons, public FIR copy, and local station records. Only the Designated DSP & Special Judge have access.
                                </p>
                              </div>
                            </div>

                            <label style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              background: '#FFFFFF',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              border: '1px solid #BAE6FD',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              color: '#0369A1',
                              whiteSpace: 'nowrap'
                            }}>
                              <input 
                                type="checkbox"
                                checked={isConfidential}
                                onChange={(e) => setIsConfidential(e.target.checked)}
                                style={{ accentColor: '#0284C7', cursor: 'pointer', width: '16px', height: '16px' }}
                              />
                              <span>Conceal My Identity</span>
                            </label>
                          </div>
                        </div>

                        {/* Informer Profile Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '18px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Informer / Complainant Full Name <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input 
                              type="text"
                              value={informerName}
                              onChange={(e) => setInformerName(e.target.value)}
                              placeholder="Enter your full name"
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Relationship to Primary Victim <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <select
                              value={informerRelation}
                              onChange={(e) => setInformerRelation(e.target.value)}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem', background: '#FFFFFF' }}
                            >
                              <option value="Relative / Family Member">Relative / Family Member</option>
                              <option value="Community Elder / Gram Sevak">Community Elder / Gram Sevak</option>
                              <option value="Eyewitness to Atrocity">Eyewitness to Atrocity</option>
                              <option value="Social Justice Activist">Social Justice Activist</option>
                              <option value="Legal Aid Volunteer">Legal Aid Volunteer</option>
                              <option value="Self / Victim">Self / Victim</option>
                              <option value="Other">Other Supporter</option>
                            </select>
                          </div>
                        </div>

                        {/* If NGO: Organization Details */}
                        {registeredBy === 'ngo' && (
                          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px', marginBottom: '18px', background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                                NGO / Organisation Registered Name
                              </label>
                              <input 
                                type="text"
                                value={ngoName}
                                onChange={(e) => setNgoName(e.target.value)}
                                placeholder="Registered NGO Name"
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.84rem' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                                NGO Darpan ID / Registration No.
                              </label>
                              <input 
                                type="text"
                                value={ngoRegNo}
                                onChange={(e) => setNgoRegNo(e.target.value)}
                                placeholder="e.g. MH/2021/008291"
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.84rem' }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Location Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Informer State <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input 
                              type="text"
                              value={informerState}
                              onChange={(e) => setInformerState(e.target.value)}
                              placeholder="e.g. Maharashtra"
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Informer District <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input 
                              type="text"
                              value={informerDistrict}
                              onChange={(e) => setInformerDistrict(e.target.value)}
                              placeholder="e.g. Satara"
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                            />
                          </div>
                        </div>

                        <div style={{ marginBottom: '28px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                            Informer Address / Landmark
                          </label>
                          <input 
                            type="text"
                            value={informerAddress}
                            onChange={(e) => setInformerAddress(e.target.value)}
                            placeholder="Enter postal address or village landmark"
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                          />
                        </div>

                        {/* Step 2 Actions */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
                          <button
                            type="button"
                            onClick={() => setCurrentGrievanceStep(1)}
                            style={{
                              padding: '10px 22px',
                              borderRadius: '8px',
                              background: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              color: '#475569',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <ArrowLeft size={15} />
                            <span>Back to Step 1</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCurrentGrievanceStep(3)}
                            style={{
                              padding: '10px 28px',
                              borderRadius: '8px',
                              background: '#0B2545',
                              border: 'none',
                              color: '#FFFFFF',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <span>Save and Continue to Victim Details</span>
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ======================================================== */}
                    {/* STEP 3: VICTIM DETAILS & VULNERABILITY ASSESSMENT        */}
                    {/* ======================================================== */}
                    {currentGrievanceStep === 3 && (
                      <div>
                        {/* Statutory Entitlement Banner */}
                        <div style={{
                          padding: '12px 16px',
                          background: '#FFFBEB',
                          border: '1px solid #FDE68A',
                          borderRadius: '10px',
                          marginBottom: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '0.8rem',
                          color: '#92400E'
                        }}>
                          <Scale size={20} color="#D97706" style={{ flexShrink: 0 }} />
                          <div>
                            <strong>PoA Statutory Mandate:</strong> Under Rule 12(4), the District Magistrate is legally obligated to sanction interim compensation directly via DBT within 7 days of grievance cognizance.
                          </div>
                        </div>

                        {/* Row 1: Victim Name, Age, Gender */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 1fr', gap: '16px', marginBottom: '18px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Victim Full Name / Head of Family <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input 
                              type="text"
                              value={victimName}
                              onChange={(e) => setVictimName(e.target.value)}
                              placeholder="Name of aggrieved victim"
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Age <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input 
                              type="number"
                              value={victimAge}
                              onChange={(e) => setVictimAge(e.target.value)}
                              placeholder="Age"
                              min={1}
                              max={120}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Gender <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <select
                              value={victimGender}
                              onChange={(e) => setVictimGender(e.target.value)}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem', background: '#FFFFFF' }}
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Transgender">Transgender</option>
                              <option value="Family / Multiple Persons">Family / Multiple Beneficiaries</option>
                            </select>
                          </div>
                        </div>

                        {/* Row 2: Caste Category & Sub-Caste */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 0.8fr', gap: '16px', marginBottom: '18px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Category under PoA Act <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              {['Scheduled Caste (SC)', 'Scheduled Tribe (ST)'].map(cat => (
                                <button
                                  type="button"
                                  key={cat}
                                  onClick={() => setCasteCategory(cat)}
                                  style={{
                                    flex: 1,
                                    padding: '9px 12px',
                                    borderRadius: '8px',
                                    border: casteCategory === cat ? '2px solid #0369A1' : '1px solid #CBD5E1',
                                    background: casteCategory === cat ? '#F0F9FF' : '#FFFFFF',
                                    color: casteCategory === cat ? '#0369A1' : '#475569',
                                    fontWeight: 700,
                                    fontSize: '0.78rem',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Sub-Caste / Tribe Name <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input 
                              type="text"
                              value={subCaste}
                              onChange={(e) => setSubCaste(e.target.value)}
                              placeholder="e.g. Mahar, Gond, Bhil, Madiga, Chamar"
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Dependents Affected
                            </label>
                            <input 
                              type="number"
                              value={dependentsCount}
                              onChange={(e) => setDependentsCount(e.target.value)}
                              placeholder="e.g. 4"
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                            />
                          </div>
                        </div>

                        {/* Row 3: Location Details */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              State <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input 
                              type="text"
                              value={victimState}
                              onChange={(e) => setVictimState(e.target.value)}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              District <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input 
                              type="text"
                              value={victimDistrict}
                              onChange={(e) => setVictimDistrict(e.target.value)}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Taluka / Block <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input 
                              type="text"
                              value={victimTaluka}
                              onChange={(e) => setVictimTaluka(e.target.value)}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                            />
                          </div>
                        </div>

                        <div style={{ marginBottom: '22px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                            Village / House Address / Incident Site <span style={{ color: '#EF4444' }}>*</span>
                          </label>
                          <input 
                            type="text"
                            value={victimAddress}
                            onChange={(e) => setVictimAddress(e.target.value)}
                            placeholder="Exact village, gat number, or house address"
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                          />
                        </div>

                        {/* Row 4: Acute Threat Level Indicator */}
                        <div style={{ marginBottom: '28px' }}>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1E293B', marginBottom: '10px' }}>
                            Current Threat & Vulnerability Level <span style={{ color: '#EF4444' }}>*</span>
                          </label>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                            {[
                              { level: 'Normal', label: 'Standard Protection', color: '#16A34A', desc: 'Legal aid, trial monitoring, and statutory compensation file.' },
                              { level: 'High Threat', label: 'High Threat / Boycott', color: '#EA580C', desc: 'Social boycott, agricultural road blocked, intimidation.' },
                              { level: 'Critical', label: 'Critical / Armed Escort', color: '#DC2626', desc: 'Immediate physical danger. Section 15A(6) armed beat patrol requested.' },
                            ].map(item => (
                              <div
                                key={item.level}
                                onClick={() => setThreatLevel(item.level)}
                                style={{
                                  border: threatLevel === item.level ? `2px solid ${item.color}` : '1px solid #CBD5E1',
                                  background: threatLevel === item.level ? '#FAFAFA' : '#FFFFFF',
                                  borderRadius: '10px',
                                  padding: '12px 14px',
                                  cursor: 'pointer',
                                  position: 'relative'
                                }}
                              >
                                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: item.color, marginBottom: '4px' }}>
                                  {item.label}
                                </div>
                                <div style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1.3 }}>
                                  {item.desc}
                                </div>
                                <input 
                                  type="radio"
                                  name="threatLevelRadio"
                                  checked={threatLevel === item.level}
                                  onChange={() => setThreatLevel(item.level)}
                                  style={{ position: 'absolute', top: '10px', right: '10px', accentColor: item.color }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Step 3 Actions */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
                          <button
                            type="button"
                            onClick={() => setCurrentGrievanceStep(2)}
                            style={{
                              padding: '10px 22px',
                              borderRadius: '8px',
                              background: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              color: '#475569',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <ArrowLeft size={15} />
                            <span>Back to Informer Details</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCurrentGrievanceStep(4)}
                            style={{
                              padding: '10px 28px',
                              borderRadius: '8px',
                              background: '#0B2545',
                              border: 'none',
                              color: '#FFFFFF',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <span>Save and Continue to Incident Details</span>
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ======================================================== */}
                    {/* STEP 4: GRIEVANCE DETAILS & ATROCITY PARTICULARS         */}
                    {/* ======================================================== */}
                    {currentGrievanceStep === 4 && (
                      <div>
                        {/* Incident Date & Time */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Incident Date <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input 
                              type="date"
                              value={incidentDate}
                              onChange={(e) => setIncidentDate(e.target.value)}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                              Approximate Time <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input 
                              type="time"
                              value={incidentTime}
                              onChange={(e) => setIncidentTime(e.target.value)}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                            />
                          </div>
                        </div>

                        {/* Specific Section of SC/ST (PoA) Act */}
                        <div style={{ marginBottom: '20px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                            Specific Nature of Offense under SC/ST (PoA) Act <span style={{ color: '#EF4444' }}>*</span>
                          </label>
                          <select
                            value={poaSection}
                            onChange={(e) => setPoaSection(e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem', background: '#FFFFFF' }}
                          >
                            <option value="Section 3(1)(r)(s) — Casteist Abuse, Slurs & Public Humiliation">
                              Section 3(1)(r)(s) — Casteist Abuse, Slurs & Public Humiliation
                            </option>
                            <option value="Section 3(1)(f)(g) — Wrongful Dispossession of Land, Crop Destruction or Water Source Denial">
                              Section 3(1)(f)(g) — Wrongful Dispossession of Land, Crop Destruction or Water Source Denial
                            </option>
                            <option value="Section 3(1)(w) — Assault or Outraging the Modesty of an SC/ST Woman">
                              Section 3(1)(w) — Assault or Outraging the Modesty of an SC/ST Woman
                            </option>
                            <option value="Section 3(1)(za)(zb) — Social or Economic Boycott / Denial of Entry to Public Place / Temple">
                              Section 3(1)(za)(zb) — Social or Economic Boycott / Denial of Entry to Public Place / Temple
                            </option>
                            <option value="Section 3(2)(v) — Severe Physical Violence, Arson, or Destruction of Property">
                              Section 3(2)(v) — Severe Physical Violence, Arson, or Destruction of Property
                            </option>
                            <option value="Rule 5 / Section 4 — Wilful Neglect of Duties / Police Inaction">
                              Rule 5 / Section 4 — Wilful Neglect of Duties / Police Inaction
                            </option>
                          </select>
                        </div>

                        {/* Narrative / Incident Description with Bhashini Mic */}
                        <div style={{ marginBottom: '22px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}>
                              Detailed Narrative of Incident <span style={{ color: '#EF4444' }}>*</span>
                            </label>

                            {/* Voice Dictation Button */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <select
                                value={bhashiniLang}
                                onChange={(e) => setBhashiniLang(e.target.value)}
                                style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#F8FAFC' }}
                              >
                                <option value="Marathi">मराठी (Marathi)</option>
                                <option value="Hindi">हिंदी (Hindi)</option>
                                <option value="English">English</option>
                                <option value="Telugu">తెలుగు (Telugu)</option>
                              </select>

                              <button
                                type="button"
                                onClick={handleToggleVoiceRecording}
                                style={{
                                  background: isVoiceRecording ? '#DC2626' : '#E0F2FE',
                                  color: isVoiceRecording ? '#FFFFFF' : '#0369A1',
                                  border: isVoiceRecording ? 'none' : '1px solid #7DD3FC',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  cursor: 'pointer',
                                  animation: isVoiceRecording ? 'pulse 1.2s infinite' : 'none'
                                }}
                              >
                                <Mic size={13} />
                                <span>{isVoiceRecording ? 'Recording...' : 'Speak Grievance'}</span>
                              </button>
                            </div>
                          </div>

                          {voiceRecordingStatus && (
                            <div style={{
                              padding: '8px 12px',
                              background: '#EFF6FF',
                              border: '1px solid #BFDBFE',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              color: '#1D4ED8',
                              marginBottom: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}>
                              <Sparkles size={14} color="#2563EB" />
                              <span>{voiceRecordingStatus}</span>
                            </div>
                          )}

                          <textarea
                            rows={4}
                            value={incidentDescription}
                            onChange={(e) => setIncidentDescription(e.target.value)}
                            placeholder="Describe what occurred, who was present, what threats or slurs were used, and any witnesses."
                            style={{
                              width: '100%',
                              padding: '10px 14px',
                              borderRadius: '8px',
                              border: '1px solid #CBD5E1',
                              fontSize: '0.86rem',
                              lineHeight: 1.5,
                              fontFamily: 'inherit',
                              outline: 'none'
                            }}
                          />
                        </div>

                        {/* Supporting Documents & Attachments */}
                        <div style={{ marginBottom: '28px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
                            Supporting Documents / Evidence (Optional)
                          </label>

                          <div style={{
                            border: '1.5px dashed #CBD5E1',
                            borderRadius: '10px',
                            padding: '16px',
                            background: '#F8FAFC',
                            textAlign: 'center',
                            marginBottom: '12px'
                          }}>
                            <FileText size={24} color="#64748B" style={{ margin: '0 auto 6px' }} />
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '2px' }}>
                              Attach Medical MLC, FIR, Photographs, or Audio Note
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '10px' }}>
                              Supports PDF, JPG, PNG, MP3 up to 25 MB
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const newDoc = `Evidence_Photo_${Math.floor(100 + Math.random() * 900)}.jpg`;
                                setAttachedFiles(prev => [...prev, newDoc]);
                              }}
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid #CBD5E1',
                                padding: '5px 14px',
                                borderRadius: '6px',
                                fontSize: '0.76rem',
                                fontWeight: 700,
                                color: '#0369A1',
                                cursor: 'pointer'
                              }}
                            >
                              + Add Document / File
                            </button>
                          </div>

                          {/* Attached files list */}
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {attachedFiles.map((file, idx) => (
                              <div
                                key={idx}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  background: '#EFF6FF',
                                  border: '1px solid #BFDBFE',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  color: '#1E40AF',
                                  fontWeight: 600
                                }}
                              >
                                <FileCheck size={14} color="#2563EB" />
                                <span>{file}</span>
                                <button
                                  type="button"
                                  onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0 2px',
                                    color: '#64748B'
                                  }}
                                  title="Remove attachment"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Step 4 Actions */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
                          <button
                            type="button"
                            onClick={() => setCurrentGrievanceStep(3)}
                            style={{
                              padding: '10px 22px',
                              borderRadius: '8px',
                              background: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              color: '#475569',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <ArrowLeft size={15} />
                            <span>Back to Victim Details</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCurrentGrievanceStep(5)}
                            style={{
                              padding: '10px 28px',
                              borderRadius: '8px',
                              background: '#0B2545',
                              border: 'none',
                              color: '#FFFFFF',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <span>Save and Continue to Review & Submit</span>
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ======================================================== */}
                    {/* STEP 5: REVIEW DOSSIER & STATUTORY RELIEF PREVIEW        */}
                    {/* ======================================================== */}
                    {currentGrievanceStep === 5 && (
                      <div>
                        {/* Summary Grid of Entered Details */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '14px',
                          marginBottom: '20px'
                        }}>
                          {/* Card 1: Registration Role & Informer */}
                          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px' }}>
                            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                              SUBMISSION ROLE & INFORMER
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                              {registeredBy === 'victim' ? 'Primary Victim (Direct Filing)' : `${informerName} (${informerRelation})`}
                            </div>
                            <div style={{ fontSize: '0.76rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>Status:</span>
                              <strong style={{ color: isConfidential ? '#0284C7' : '#15803D' }}>
                                {isConfidential ? '🔒 Section 15A Identity Concealed' : 'Public Record'}
                              </strong>
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
                              Mobile: +91 {mobileNumber} · Grievance Type: {grievanceType}
                            </div>
                          </div>

                          {/* Card 2: Victim Profile */}
                          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px' }}>
                            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                              VICTIM / AGGRIEVED PERSON
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                              {victimName} (Age: {victimAge}, {victimGender})
                            </div>
                            <div style={{ fontSize: '0.76rem', color: '#0369A1', fontWeight: 700 }}>
                              {casteCategory} · Sub-caste: {subCaste}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
                              Jurisdiction: {victimAddress}, {victimTaluka}, {victimDistrict}
                            </div>
                          </div>

                          {/* Card 3: Atrocity Particulars */}
                          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px' }}>
                            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                              INVOKED PROVISION
                            </div>
                            <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                              {poaSection}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                              Incident Date: {incidentDate} at {incidentTime}
                            </div>
                          </div>

                          {/* Card 4: Threat Assessment & Evidence */}
                          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px' }}>
                            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                              THREAT LEVEL & EVIDENCE
                            </div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: threatLevel === 'Critical' ? '#DC2626' : threatLevel === 'High Threat' ? '#EA580C' : '#16A34A', marginBottom: '4px' }}>
                              {threatLevel === 'Critical' ? '🔴 Critical / Armed Escort Requested' : threatLevel === 'High Threat' ? '🟠 High Threat / Social Boycott' : '🟢 Standard Protection'}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                              {attachedFiles.length} supporting file(s) attached
                            </div>
                          </div>
                        </div>

                        {/* STATUTORY FINANCIAL RELIEF CALCULATOR (ANNEXURE 1 POA RULES) */}
                        <div style={{
                          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                          border: '1.5px solid #FCD34D',
                          borderRadius: '12px',
                          padding: '18px 22px',
                          marginBottom: '22px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <Scale size={20} color="#B45309" />
                            <h4 style={{ fontSize: '0.96rem', fontWeight: 900, color: '#78350F', margin: 0 }}>
                              Statutory Compensation Entitlement (PoA Amendment Rules 2016, Annexure 1)
                            </h4>
                          </div>

                          <p style={{ fontSize: '0.78rem', color: '#92400E', marginBottom: '14px', lineHeight: 1.4 }}>
                            Under the Scheduled Castes and the Scheduled Tribes (Prevention of Atrocities) Act, victims are entitled to non-discretionary government relief transferred directly via DBT:
                          </p>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                            <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                              <div style={{ fontSize: '0.7rem', color: '#78350F', fontWeight: 700 }}>STAGE 1 (IMMEDIATE)</div>
                              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#166534', margin: '2px 0' }}>
                                ₹50,000 – ₹1,00,000
                              </div>
                              <div style={{ fontSize: '0.68rem', color: '#475569' }}>
                                25% payable within 7 days upon FIR cognizance by Collector.
                              </div>
                            </div>

                            <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                              <div style={{ fontSize: '0.7rem', color: '#78350F', fontWeight: 700 }}>STAGE 2 (CHARGESHEET)</div>
                              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0369A1', margin: '2px 0' }}>
                                ₹1,00,000 – ₹2,25,000
                              </div>
                              <div style={{ fontSize: '0.68rem', color: '#475569' }}>
                                50% payable upon chargesheet filing in Special Court.
                              </div>
                            </div>

                            <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                              <div style={{ fontSize: '0.7rem', color: '#78350F', fontWeight: 700 }}>STAGE 3 (VERDICT)</div>
                              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', margin: '2px 0' }}>
                                ₹50,000 – ₹1,00,000
                              </div>
                              <div style={{ fontSize: '0.68rem', color: '#475569' }}>
                                Remaining 25% at conclusion of trial. Free DLSA advocate.
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Statutory Affirmations & Escort Checkboxes */}
                        <div style={{ marginBottom: '26px' }}>
                          <label style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            background: '#F8FAFC',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                            marginBottom: '10px',
                            cursor: 'pointer'
                          }}>
                            <input 
                              type="checkbox"
                              checked={needArmedEscort}
                              onChange={(e) => setNeedArmedEscort(e.target.checked)}
                              style={{ accentColor: '#DC2626', marginTop: '3px', width: '16px', height: '16px' }}
                            />
                            <div style={{ fontSize: '0.8rem', color: '#1E293B', lineHeight: 1.4 }}>
                              <strong>Request 24×7 Police Beat Patrol & Escort:</strong> Formally notify District SP Control Room to establish regular beat patrol around victim's residence under Section 15A(6).
                            </div>
                          </label>

                          <label style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            background: agreedDeclaration ? '#F0FDF4' : '#F8FAFC',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            border: agreedDeclaration ? '1.5px solid #86EFAC' : '1px solid #CBD5E1',
                            cursor: 'pointer'
                          }}>
                            <input 
                              type="checkbox"
                              checked={agreedDeclaration}
                              onChange={(e) => setAgreedDeclaration(e.target.checked)}
                              style={{ accentColor: '#16A34A', marginTop: '3px', width: '16px', height: '16px' }}
                            />
                            <div style={{ fontSize: '0.8rem', color: '#1E293B', lineHeight: 1.4 }}>
                              <span style={{ color: '#EF4444' }}>*</span> <strong>Statutory Declaration:</strong> I solemnly affirm that the facts stated above are true to the best of my knowledge and submitted in good faith for official action under the SC/ST (Prevention of Atrocities) Act 1989.
                            </div>
                          </label>
                        </div>

                        {/* Step 5 Actions */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
                          <button
                            type="button"
                            onClick={() => setCurrentGrievanceStep(4)}
                            style={{
                              padding: '10px 22px',
                              borderRadius: '8px',
                              background: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              color: '#475569',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <ArrowLeft size={15} />
                            <span>Back to Incident Details</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleFinalGrievanceSubmit}
                            style={{
                              padding: '12px 32px',
                              borderRadius: '8px',
                              background: '#0B2545',
                              border: 'none',
                              color: '#FFFFFF',
                              fontWeight: 800,
                              fontSize: '0.92rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              boxShadow: '0 4px 14px rgba(11, 37, 69, 0.25)'
                            }}
                          >
                            <ShieldCheck size={18} />
                            <span>Confirm & File Official Grievance (NHAA 14566)</span>
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: REGISTER RESCUE (Matching Screenshot 2 exactly)    */}
          {/* ======================================================== */}
          {activeTab === 'rescue' && (
            <div style={{ maxWidth: '960px', margin: '0 auto' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                  Register a Rescue
                </h2>
                <p style={{ fontSize: '0.84rem', color: '#64748B' }}>
                  Quick distress report. Only four fields — name, mobile (we'll send an OTP), location, and what's wrong. The receiving Police officer is alerted immediately.
                </p>
              </div>

              {rescueDispatched ? (
                <div style={{
                  padding: '32px',
                  background: '#FEF2F2',
                  border: '1.5px solid #FCA5A5',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <ShieldAlert size={48} color="#DC2626" style={{ margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#991B1B', marginBottom: '6px' }}>
                    🚨 Emergency Rescue Dispatched!
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#B91C1C', marginBottom: '14px', maxWidth: '600px', margin: '0 auto 16px' }}>
                    High-priority alert sent to District SP & Station Officer in {rescueDistrict}, {rescueState}. An officer is being dispatched immediately to your address.
                  </p>
                  <div style={{
                    display: 'inline-block',
                    background: '#FFFFFF',
                    border: '1px solid #FECACA',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    marginBottom: '20px'
                  }}>
                    Police Alert Ref: {rescueDispatchId}
                  </div>
                  <div>
                    <button
                      onClick={() => setRescueDispatched(false)}
                      style={{
                        background: '#0B2545',
                        color: '#FFFFFF',
                        padding: '9px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      File Another Report
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRescueSubmit} style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '28px 32px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ marginBottom: '22px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                      Rescue Details
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      All fields are mandatory. Your mobile will be OTP-verified so you can later track this rescue using the same number.
                    </p>
                  </div>

                  {/* Row 1: Name, Gender, Mobile No */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.4fr', gap: '16px', marginBottom: '22px' }}>
                    {/* Name */}
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        <span>Name <span style={{ color: '#EF4444' }}>*</span></span>
                        <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px' }}><Mic size={11} /> FN</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="Enter your name" 
                        value={rescueName}
                        onChange={(e) => setRescueName(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Gender <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select 
                        value={rescueGender}
                        onChange={(e) => setRescueGender(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FFF' }}
                      >
                        <option value="">Select gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    {/* Mobile No */}
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        <span>Mobile No. <span style={{ color: '#EF4444' }}>*</span></span>
                        <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px' }}><Mic size={11} /> FN</span>
                      </label>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <input 
                          type="tel" 
                          placeholder="10-digit mobile no." 
                          value={rescueMobile}
                          onChange={(e) => setRescueMobile(e.target.value)}
                          maxLength={10}
                          style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none' }}
                        />
                        <button
                          type="button"
                          onClick={handleSendRescueOtp}
                          style={{
                            background: '#BAE6FD',
                            color: '#0369A1',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0 14px',
                            cursor: 'pointer'
                          }}
                        >
                          {isRescueOtpSent ? 'Sent ✓' : 'Send OTP'}
                        </button>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '4px' }}>
                        You'll receive a 6-digit OTP. The same mobile is recorded against this rescue for status updates.
                      </div>

                      {isRescueOtpSent && (
                        <div style={{ marginTop: '10px', padding: '10px 12px', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803D' }}>
                              ✓ OTP Dispatched to {rescueOtpDispatchData?.formattedPhone || `+91 ${rescueMobile}`}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                              {rescueOtpDispatchData?.carrier || 'MoSJE DLT'}
                            </span>
                          </div>

                          {rescueOtpDispatchData?.whatsappUrl && (
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                              <a
                                href={rescueOtpDispatchData.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  background: '#25D366',
                                  color: '#fff',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  textDecoration: 'none'
                                }}
                              >
                                <MessageCircle size={12} />
                                <span>Send via WhatsApp (+91 {rescueOtpDispatchData.phone})</span>
                              </a>
                              <button
                                type="button"
                                onClick={() => setRescueOtpCode(rescueOtpDispatchData.otpCode)}
                                style={{
                                  background: '#E0F2FE',
                                  border: '1px solid #7DD3FC',
                                  color: '#0369A1',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                ⚡ Auto-Fill ({rescueOtpDispatchData.otpCode})
                              </button>
                            </div>
                          )}

                          <input 
                            type="text" 
                            placeholder="Enter 6-digit rescue OTP" 
                            value={rescueOtpCode}
                            onChange={(e) => setRescueOtpCode(e.target.value)}
                            maxLength={6}
                            style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #94A3B8', fontSize: '0.85rem', letterSpacing: '0.12em', fontWeight: 700 }} 
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* LOCATION SECTION */}
                  <div style={{ marginBottom: '22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>LOCATION</span>
                      <button
                        type="button"
                        onClick={() => {
                          setRescuePincode('415001');
                          setRescueState('Maharashtra');
                          setRescueDistrict('Satara');
                          setRescueTaluka('Koregaon');
                          setRescueAddress('Near Ambedkar Nagar Ward 4, Subhash Chowk');
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#0284C7',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <MapPin size={12} />
                        <span>Use My Location</span>
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '14px' }}>
                      {/* Pincode */}
                      <div>
                        <input 
                          type="text" 
                          placeholder="6-digit Pincode" 
                          value={rescuePincode}
                          onChange={(e) => setRescuePincode(e.target.value)}
                          maxLength={6}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none' }}
                        />
                      </div>

                      {/* State */}
                      <div>
                        <select 
                          value={rescueState}
                          onChange={(e) => setRescueState(e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FFF' }}
                        >
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Delhi">Delhi (NCR)</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                        </select>
                      </div>

                      {/* District */}
                      <div>
                        <select 
                          value={rescueDistrict}
                          onChange={(e) => setRescueDistrict(e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FFF' }}
                        >
                          <option value="Satara">Satara</option>
                          <option value="Pune">Pune</option>
                          <option value="Nagpur">Nagpur</option>
                          <option value="Nashik">Nashik</option>
                        </select>
                      </div>

                      {/* Taluka */}
                      <div>
                        <select 
                          value={rescueTaluka}
                          onChange={(e) => setRescueTaluka(e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FFF' }}
                        >
                          <option value="Koregaon">Koregaon</option>
                          <option value="Karad">Karad</option>
                          <option value="Wai">Wai</option>
                          <option value="Phaltan">Phaltan</option>
                        </select>
                      </div>
                    </div>

                    {/* Full Address */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}>
                          Full Address <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px' }}><Mic size={11} /> EN</span>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Street, landmark, locality" 
                        value={rescueAddress}
                        onChange={(e) => setRescueAddress(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Problem Section */}
                  <div style={{ marginBottom: '26px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}>
                        Problem <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px' }}><Mic size={11} /> EN</span>
                    </div>
                    <textarea 
                      rows={3}
                      placeholder="Briefly describe what's happening — type or use the mic"
                      value={rescueProblem}
                      onChange={(e) => setRescueProblem(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  {/* Action */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="submit"
                      style={{
                        padding: '12px 32px',
                        borderRadius: '8px',
                        background: '#0B2545',
                        border: 'none',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 14px rgba(11, 37, 69, 0.25)'
                      }}
                    >
                      <span>Verify Mobile & Continue</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: TRACK STATUS (Matching Screenshot 3 exactly)      */}
          {/* ======================================================== */}
          {activeTab === 'track' && (
            <div style={{ maxWidth: '920px', margin: '0 auto' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                  Track Grievance Status
                </h2>
                <p style={{ fontSize: '0.84rem', color: '#64748B' }}>
                  Enter your Reference ID to view the current status of your case.
                </p>
              </div>

              {/* Search Card */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '24px 28px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.86rem', color: '#334155' }}>
                    <input 
                      type="radio" 
                      name="searchType" 
                      checked={trackSearchType === 'reference'} 
                      onChange={() => setTrackSearchType('reference')}
                      style={{ accentColor: '#0284C7' }} 
                    />
                    <span>Reference ID</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.86rem', color: '#334155' }}>
                    <input 
                      type="radio" 
                      name="searchType" 
                      checked={trackSearchType === 'mobile'} 
                      onChange={() => setTrackSearchType('mobile')}
                      style={{ accentColor: '#0284C7' }} 
                    />
                    <span>Mobile Number</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '10px', maxWidth: '520px' }}>
                  <input 
                    type="text" 
                    placeholder={trackSearchType === 'reference' ? 'e.g. NHAA-2026-004521' : 'Enter 10-digit mobile number'}
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value)}
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.86rem', outline: 'none' }}
                  />
                  <button
                    onClick={handleTrackSubmit}
                    disabled={isTrackLoading}
                    style={{
                      background: '#475569',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0 18px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {isTrackLoading ? 'Verifying...' : 'Get OTP & Track Status'}
                  </button>
                </div>

                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '10px' }}>
                  For your security, we'll send a one-time password to the mobile number registered with this grievance. The case opens only after the OTP is verified.
                </div>
              </div>

              {/* Status Results Display */}
              {trackResult && (
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '28px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}>
                  {/* Status Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #F1F5F9', paddingBottom: '18px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>{trackResult.refId}</span>
                        <span style={{ background: '#DCFCE7', color: '#166534', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 800 }}>
                          {trackResult.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 600 }}>{trackResult.title}</div>
                      <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>
                        {trackResult.district}, {trackResult.state} • FIR: {trackResult.firNumber}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Statutory Relief Under Sec 15A</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0284C7', marginTop: '2px' }}>
                        {trackResult.reliefAmount}
                      </div>
                    </div>
                  </div>

                  {/* Stage Timeline */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>
                      CASE LIFECYCLE & STATUTORY MILESTONES
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {trackResult.timeline.map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                          <div style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            background: step.status === 'done' ? '#DCFCE7' : step.status === 'active' ? '#FEF08A' : '#F1F5F9',
                            color: step.status === 'done' ? '#16A34A' : step.status === 'active' ? '#CA8A04' : '#94A3B8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            flexShrink: 0
                          }}>
                            {step.status === 'done' ? '✓' : step.status === 'active' ? '⚡' : '○'}
                          </div>

                          <div style={{ flex: 1, paddingBottom: '10px', borderBottom: idx < trackResult.timeline.length - 1 ? '1px solid #F8FAFC' : 'none' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: step.status === 'active' ? '#0F172A' : '#334155' }}>
                                {step.title}
                              </span>
                              <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{step.date}</span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                              {step.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Officers in Charge */}
                  <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Assigned Magistrate / SDM</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>{trackResult.assignedOfficer}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Clinical Tele-Counsellor</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>{trackResult.counsellor}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B' }}>24×7 Rapid Response Desk</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#EA580C' }}>Dial 14566 (Ref #{trackResult.refId})</div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: HELP & FAQS (Requested by User)                   */}
          {/* ======================================================== */}
          {activeTab === 'faq' && (
            <div style={{ maxWidth: '860px', margin: '0 auto' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                  Citizen Rights, Legal Support & FAQs
                </h2>
                <p style={{ fontSize: '0.84rem', color: '#64748B' }}>
                  Everything you need to know about your statutory rights under the SC/ST PoA Act 1989 and NHAA 14566 services.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        overflow: 'hidden',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                      }}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        style={{
                          width: '100%',
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: '#0F172A'
                        }}
                      >
                        <span>{faq.q}</span>
                        <ChevronRight 
                          size={16} 
                          color="#64748B" 
                          style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }} 
                        />
                      </button>

                      {isOpen && (
                        <div style={{ padding: '0 20px 18px', fontSize: '0.84rem', color: '#475569', lineHeight: 1.6, borderTop: '1px solid #F1F5F9' }}>
                          <p style={{ marginTop: '12px', marginBottom: 0 }}>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legal Assistance Box */}
              <div style={{
                marginTop: '28px',
                background: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
                color: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px 28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 4px' }}>
                    Need Immediate Legal Counsel?
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#CBD5E1', margin: 0 }}>
                    Empanelled Special Public Prosecutors and DLSA advocates are available free of charge under Section 15A.
                  </p>
                </div>

                <a
                  href="tel:14566"
                  style={{
                    background: '#EA580C',
                    color: '#FFFFFF',
                    padding: '10px 22px',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <PhoneCall size={15} />
                  <span>Call 14566 Legal Desk</span>
                </a>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: DASHBOARD (Well-Being & Safe Check-Ins)            */}
          {/* ======================================================== */}
          {activeTab === 'dashboard' && (
            <div style={{ maxWidth: '860px', margin: '0 auto' }}>
              <div style={{
                background: 'linear-gradient(135deg, #0B2545, #133E6E)',
                color: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px 28px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', color: '#93C5FD', fontWeight: 700 }}>
                  <Lock size={12} />
                  <span>Confidential Protected Citizen Space • MoSJE National Grid</span>
                </div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '8px 0 6px' }}>
                  Vanakam, Protected Citizen
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#CBD5E1', margin: 0, lineHeight: 1.5 }}>
                  Your safety and recovery are actively safeguarded. Submit your daily wellness check-in below or register a distress rescue if you feel unsafe.
                </p>
              </div>

              {/* Quick Actions Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div 
                  onClick={() => setActiveTab('grievance')}
                  style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                    <FileText size={18} />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A' }}>Register Grievance</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>File a formal complaint or relief docket</div>
                </div>

                <div 
                  onClick={() => setActiveTab('rescue')}
                  style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #FECACA', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                    <ShieldAlert size={18} />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#991B1B' }}>Register Rescue</div>
                  <div style={{ fontSize: '0.72rem', color: '#B91C1C', marginTop: '2px' }}>Emergency distress signal to Police SP</div>
                </div>

                <div 
                  onClick={() => setActiveTab('track')}
                  style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                    <Search size={18} />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A' }}>Track Status</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>View Section 15A relief & FIR milestones</div>
                </div>
              </div>

              {/* Mood Check-In Card */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '24px 28px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                  Daily Psychological Wellness Check-In
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '18px' }}>
                  How are you feeling today? Your assigned counsellor reviews this to protect you from harassment.
                </p>

                {checkInSubmitted ? (
                  <div style={{ padding: '16px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', textAlign: 'center' }}>
                    <CheckCircle2 size={24} color="#16A34A" style={{ margin: '0 auto 6px' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#166534' }}>Thank you. Check-in recorded safely.</div>
                    <div style={{ fontSize: '0.72rem', color: '#15803D', marginTop: '2px' }}>Your assigned counsellor Dr. Ananya has been notified.</div>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '18px' }}>
                      {[
                        { id: 'okay', label: "I'm okay", icon: "🌱", color: "#15803D", bg: "#F0FDF4" },
                        { id: 'worried', label: "Worried", icon: "🌾", color: "#D97706", bg: "#FFFBEB" },
                        { id: 'scared', label: "Scared", icon: "🌧️", color: "#CA8A04", bg: "#FEF9C3" },
                        { id: 'struggling', label: "Struggling", icon: "🌪️", color: "#EA580C", bg: "#FFF7ED" },
                        { id: 'need_help', label: "Need Help", icon: "🚨", color: "#B42318", bg: "#FEF3F2" }
                      ].map(m => (
                        <button
                          key={m.id}
                          onClick={() => setSelectedMood(m.id)}
                          style={{
                            padding: '12px 8px',
                            borderRadius: '10px',
                            border: selectedMood === m.id ? `2px solid ${m.color}` : '1px solid #E2E8F0',
                            background: selectedMood === m.id ? m.bg : '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span style={{ fontSize: '1.4rem' }}>{m.icon}</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: m.color }}>{m.label}</span>
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Optional: Add anything you'd like your counsellor to know..."
                      value={checkInText}
                      onChange={(e) => setCheckInText(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.82rem', marginBottom: '14px', outline: 'none' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => {
                          if (!selectedMood) {
                            alert('Please select your mood to submit.');
                            return;
                          }
                          setCheckInSubmitted(true);
                        }}
                        style={{
                          background: '#0B2545',
                          color: '#FFFFFF',
                          padding: '9px 24px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Submit Daily Check-In
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* 4. OFFICIAL FOOTER BAR (Matching Screenshot 2 footer) */}
      <footer style={{
        background: '#0B1A30',
        color: '#94A3B8',
        fontSize: '0.72rem',
        padding: '12px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div>
          © 2026 - Copyright UX4G. All rights reserved. Powered by NeGD | MeitY Government of India © 2026 UX4G
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ cursor: 'pointer', color: '#CBD5E1' }}>Terms & Conditions</span>
          <span>|</span>
          <span style={{ cursor: 'pointer', color: '#CBD5E1' }}>Privacy Policy</span>
          <span>|</span>
          <span style={{ cursor: 'pointer', color: '#CBD5E1' }}>Feedback</span>
        </div>
      </footer>

    </div>
  );
};

export default ProtectedCitizenPortal;
