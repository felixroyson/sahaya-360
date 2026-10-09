import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_CASES, MOCK_DISTRICTS_DATA, NATIONAL_AGGREGATES } from '../data/mockCases';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const stored = localStorage.getItem('sahaya_language') || localStorage.getItem('preferred_language');
      if (stored && ['en', 'hi', 'mr', 'ta', 'te'].includes(stored)) {
        return stored;
      }
      return 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (langCode) => {
    setLanguageState(langCode);
    try {
      localStorage.setItem('sahaya_language', langCode);
      localStorage.setItem('preferred_language', langCode);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = langCode;
      }
    } catch {
      // Ignore storage errors in private browsing
    }
  };

  // Synchronize language attribute and listen to external storage changes across tabs
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
    const handleStorageChange = (e) => {
      if ((e.key === 'sahaya_language' || e.key === 'preferred_language') && e.newValue) {
        if (['en', 'hi', 'mr', 'ta', 'te'].includes(e.newValue)) {
          setLanguageState(e.newValue);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [language]);

  // =========================================================================
  // ENTERPRISE AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC)
  // =========================================================================
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('sahaya_auth_user') || localStorage.getItem('sahaya_auth_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role && parsed.token) {
          return parsed;
        }
      }
      return null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(currentUser);

  // Active Role with Authentication Guard: If not authenticated, always enforce landing!
  const [activeRole, setActiveRoleState] = useState(() => {
    try {
      const storedUser = sessionStorage.getItem('sahaya_auth_user') || localStorage.getItem('sahaya_auth_user');
      if (!storedUser) {
        return 'landing';
      }
      const savedRole = localStorage.getItem('sahaya_active_role');
      if (savedRole && ['landing', 'victim', 'counsellor', 'district', 'national'].includes(savedRole)) {
        return savedRole;
      }
      return 'landing';
    } catch {
      return 'landing';
    }
  });

  // Security Notice & Login Interception State
  const [authNotice, setAuthNotice] = useState(null);
  const [loginModalState, setLoginModalState] = useState({
    isOpen: false,
    role: 'user', // 'user' | 'admin'
    designation: 'district',
    intendedTarget: null
  });

  const openLoginModal = ({ role = 'user', designation = 'district', intendedTarget = null, notice = '' } = {}) => {
    if (notice) {
      setAuthNotice(notice);
    }
    setLoginModalState({
      isOpen: true,
      role,
      designation,
      intendedTarget
    });
  };

  const closeLoginModal = () => {
    setLoginModalState(prev => ({ ...prev, isOpen: false }));
    setAuthNotice(null);
  };

  // Safe Navigation with Security Guard (Intercepts unauthorized access)
  const safeNavigate = (targetRole, customNotice) => {
    if (!targetRole || targetRole === 'landing') {
      setActiveRoleState('landing');
      try {
        localStorage.removeItem('sahaya_active_role');
      } catch {}
      return true;
    }

    // Check if user is authenticated
    if (!currentUser) {
      // SECURITY GUARD TRIGGERED: Block access and open login modal
      if (targetRole === 'victim') {
        openLoginModal({
          role: 'user',
          intendedTarget: targetRole,
          notice: customNotice || '🔒 Citizen Authentication Required: Please log in with your registered mobile and OTP to access the Protected Citizen Portal.'
        });
      } else {
        openLoginModal({
          role: 'admin',
          designation: targetRole,
          intendedTarget: targetRole,
          notice: customNotice || '🔒 Official Clearance Required: Access to statutory command consoles is restricted to authorized Magistrates, Counsellors, and MoSJE Officers.'
        });
      }
      return false;
    }

    // Role-Based Access Control (RBAC) verification
    if (targetRole === 'victim') {
      setActiveRoleState('victim');
      try {
        localStorage.setItem('sahaya_active_role', 'victim');
      } catch {}
      return true;
    }

    if (['district', 'counsellor', 'national'].includes(targetRole)) {
      if (currentUser.role !== 'official') {
        // A citizen cannot view confidential judicial magistrate records
        openLoginModal({
          role: 'admin',
          designation: targetRole,
          intendedTarget: targetRole,
          notice: '🔒 Access Denied: Official Government Credentials required to inspect confidential District/Magistrate Command records.'
        });
        return false;
      }
      setActiveRoleState(targetRole);
      try {
        localStorage.setItem('sahaya_active_role', targetRole);
      } catch {}
      return true;
    }

    setActiveRoleState('landing');
    return true;
  };

  // Guaranteed Security: All setActiveRole calls are guarded by safeNavigate!
  const setActiveRole = (role) => {
    return safeNavigate(role);
  };

  const login = ({ role, username, designation, phone }) => {
    const isCitizen = role === 'citizen' || role === 'user';
    const userSession = {
      id: `USR-${Date.now()}`,
      username: username || (isCitizen ? (phone || 'citizen_user') : 'official_user'),
      displayName: isCitizen
        ? (username || 'Sunita (Protected Citizen)')
        : designation === 'counsellor'
          ? 'Dr. Ananya Sharma (Clinical Counsellor)'
          : designation === 'national'
            ? 'Apex Command (MoSJE National Grid)'
            : 'Shri Rajesh Verma, IAS (District Magistrate & DVO)',
      role: isCitizen ? 'citizen' : 'official',
      designation: !isCitizen ? (designation || 'district') : undefined,
      phone: phone || (isCitizen ? '9822014566' : '9412014566'),
      token: `AUTH-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now()}`,
      loginTime: Date.now()
    };

    setCurrentUser(userSession);
    try {
      sessionStorage.setItem('sahaya_auth_user', JSON.stringify(userSession));
      localStorage.setItem('sahaya_auth_user', JSON.stringify(userSession));
    } catch {}

    const targetRole = isCitizen ? 'victim' : (designation || 'district');
    setActiveRoleState(targetRole);
    try {
      localStorage.setItem('sahaya_active_role', targetRole);
    } catch {}

    setLoginModalState(prev => ({ ...prev, isOpen: false }));
    setAuthNotice(null);
    return userSession;
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveRoleState('landing');
    try {
      sessionStorage.removeItem('sahaya_auth_user');
      localStorage.removeItem('sahaya_auth_user');
      localStorage.removeItem('sahaya_active_role');
    } catch {}
    setAuthNotice(null);
  };
  const [cases, setCases] = useState(MOCK_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState(MOCK_CASES[0].id);
  const [districts, setDistricts] = useState(MOCK_DISTRICTS_DATA);
  const [nationalAggregates, setNationalAggregates] = useState(NATIONAL_AGGREGATES);

  // SIH 2026 Presentation Modal State
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);
  const [pitchDeckInitialSlide, setPitchDeckInitialSlide] = useState(1);

  // Safe-Contact Protocol: Discreet Panic Camouflage
  const [isDiscreetCamouflage, setIsDiscreetCamouflage] = useState(false);
  const [safeContactSettings, setSafeContactSettings] = useState({
    preferredTimeWindow: "10:30 AM - 12:30 PM",
    discreetMode: true,
    lowBandwidth: false
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isDiscreetCamouflage) {
          setIsDiscreetCamouflage(false);
          return;
        }
        // Only trigger panic camouflage for citizen role, not in official desks
        if (activeRole === 'victim' && !isPitchDeckOpen && !modalState.isOpen) {
          setIsDiscreetCamouflage(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPitchDeckOpen, activeRole, isDiscreetCamouflage, modalState.isOpen]);

  // Active alerts stream
  const [alerts, setAlerts] = useState([
    {
      id: "ALT-901",
      caseId: "NHAA-2026-102",
      victimName: "Sunita (Protected Survivor)",
      severity: "CRITICAL_RED",
      message: "Acute Panic Dysphonia & Suicide Ideation Risk detected during 14566 Helpline call.",
      timestamp: "12 mins ago",
      status: "UNRESOLVED", // 'UNRESOLVED' | 'VERIFIED_BY_COUNSELLOR' | 'DISPATCHED_IN_PROGRESS' | 'DISMISSED'
      score: 92,
      actionRequired: "Deploy Emergency Crisis Psychiatric Team & File In-Camera Trial Application",
      humanReviewNotes: null,
      reviewedBy: null
    },
    {
      id: "ALT-902",
      caseId: "NHAA-2026-894",
      victimName: "Ramesh Kumar",
      severity: "CRITICAL",
      message: "Direct witness threat recorded: Perpetrators threatened arson before Sept 18 trial date.",
      timestamp: "45 mins ago",
      status: "UNRESOLVED",
      score: 84,
      actionRequired: "Armed Police Witness Protection Escort required",
      humanReviewNotes: null,
      reviewedBy: null
    },
    {
      id: "ALT-903",
      caseId: "NHAA-2026-412",
      victimName: "Pooja Devi",
      severity: "HIGH",
      message: "Informal economic boycott reported in village. Drinking water access hindered.",
      timestamp: "3 hours ago",
      status: "UNDER_REVIEW",
      score: 68,
      actionRequired: "RDO Spot Inspection & Civil Supplies Allocation",
      humanReviewNotes: null,
      reviewedBy: null
    }
  ]);

  // Modal Dialogs
  const [modalState, setModalState] = useState({
    type: null, // 'XAI' | 'DISPATCH' | 'SOS' | 'NEW_CHECKIN'
    caseData: null
  });

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  // Helper to open XAI breakdown
  const openXAI = (caseItem) => {
    setModalState({ type: 'XAI', caseData: caseItem || selectedCase });
  };

  // Helper to open Action Dispatch
  const openDispatch = (caseItem) => {
    setModalState({ type: 'DISPATCH', caseData: caseItem || selectedCase });
  };

  // Close modals
  const closeModal = () => {
    setModalState({ type: null, caseData: null });
  };

  // Dispatch an intervention
  const handleDispatchAction = (caseId, newIntervention) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          recommendedInterventions: [
            {
              id: `INT-${Date.now()}`,
              status: "DISPATCHED_ACTIVE",
              timestamp: "Just now",
              ...newIntervention
            },
            ...c.recommendedInterventions
          ],
          // Relieve score slightly when intervention is deployed
          dynamicDistressScore: Math.max(25, c.dynamicDistressScore - 8)
        };
      }
      return c;
    }));

    // Update alert status if exists
    setAlerts(prev => prev.map(a => 
      a.caseId === caseId ? { ...a, status: "DISPATCHED_IN_PROGRESS" } : a
    ));

    closeModal();
  };

  // Trigger SOS Panic Beacon
  const triggerSOS = (customPayload) => {
    const newAlert = {
      id: `ALT-SOS-${Date.now()}`,
      caseId: selectedCase.id,
      victimName: selectedCase.victimName,
      severity: "CRITICAL_RED",
      message: `EMERGENCY SOS BEACON TRIGGERED: Immediate physical safety threat reported via citizen portal! Coordinates: 27.8974° N, 78.0880° E (Aligarh District)`,
      timestamp: "Just now",
      status: "EMERGENCY_DISPATCHED",
      score: 99,
      actionRequired: "Dispatch Nearest PCR Police Van & Alert SP Control Room"
    };

    setAlerts(prev => [newAlert, ...prev]);
    setCases(prev => prev.map(c => 
      c.id === selectedCase.id ? { ...c, dynamicDistressScore: 98, riskCategory: "CRITICAL" } : c
    ));
    setModalState({ type: 'SOS', caseData: selectedCase });
  };

  // Update Dynamic Distress Score dynamically from voice or chat
  const recordInteractionUpdate = (caseId, analysisResult) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const updatedScore = Math.min(100, Math.max(10, Math.round(analysisResult.score)));
        const newRisk = updatedScore >= 80 ? "CRITICAL" : updatedScore >= 65 ? "HIGH" : updatedScore >= 36 ? "MODERATE" : "LOW";
        
        return {
          ...c,
          dynamicDistressScore: updatedScore,
          riskCategory: newRisk,
          riskTrend: updatedScore > c.dynamicDistressScore ? "RISING_SHARP" : "RECOVERING",
          lastInteractionTimestamp: "Just now",
          lastInteractionChannel: analysisResult.channel || "Multimodal AI Check-in",
          voiceAcousticMetrics: analysisResult.voiceMetrics ? {
            ...c.voiceAcousticMetrics,
            ...analysisResult.voiceMetrics
          } : c.voiceAcousticMetrics,
          longitudinalHistory: [
            ...c.longitudinalHistory,
            { day: "Live Check", score: updatedScore, note: analysisResult.summary || "Interactive Check-in" }
          ]
        };
      }
      return c;
    }));

    if (analysisResult.score >= 80) {
      setAlerts(prev => [
        {
          id: `ALT-LIVE-${Date.now()}`,
          caseId,
          victimName: selectedCase.victimName,
          severity: "CRITICAL",
          message: `Live Analysis Threshold Crossed: Distress score reached ${Math.round(analysisResult.score)}/100. ${analysisResult.summary || 'Elevated acoustic tremor and fear markers detected.'}`,
          timestamp: "Just now",
          status: "UNRESOLVED",
          score: Math.round(analysisResult.score),
          actionRequired: "Immediate Tele-Counselling / Police Verification Required",
          humanReviewNotes: null,
          reviewedBy: null
        },
        ...prev
      ]);
    }
  };

  // SIH Presentation Pitch Deck Helpers
  const openPitchDeck = (slideNum = 1) => {
    setPitchDeckInitialSlide(slideNum);
    setIsPitchDeckOpen(true);
  };
  const closePitchDeck = () => setIsPitchDeckOpen(false);

  // Safe-Contact Protocol: Quick Exit Camouflage
  const toggleDiscreetCamouflage = () => {
    setIsDiscreetCamouflage(prev => !prev);
  };

  // Explainable Human-Reviewed Alerts: "AI Supports — Humans Decide"
  const verifyAlert = (alertId, counsellorNotes) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          status: "VERIFIED_BY_COUNSELLOR",
          humanReviewNotes: counsellorNotes || "Clinically reviewed: Verbal threat and acoustic tremor verified. Immediate protection advised.",
          reviewedBy: "Dr. Anjali Sharma, Senior NIMHANS Empanelled Clinician"
        };
      }
      return a;
    }));
  };

  const dismissAlert = (alertId, reason) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          status: "DISMISSED_FALSE_POSITIVE",
          humanReviewNotes: reason || "Reviewed by clinician: Background ambient noise caused acoustic anomaly. No acute threat.",
          reviewedBy: "Dr. Anjali Sharma, Senior NIMHANS Clinician"
        };
      }
      return a;
    }));
  };

  // Closed-Loop Intervention Tracking: Verify Delivery
  const verifyInterventionDelivery = (caseId, interventionId, proofDetails) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          recommendedInterventions: c.recommendedInterventions.map(int => {
            if (int.id === interventionId) {
              return {
                ...int,
                status: "DELIVERED_VERIFIED",
                verifiedDeliveredAt: "Just now (Verified)",
                deliveryProof: proofDetails || "Physical spot inspection & victim acknowledgment logged",
                humanReviewStatus: "VERIFIED_BY_OFFICER"
              };
            }
            return int;
          }),
          // Positive closed-loop outcome lowers distress
          dynamicDistressScore: Math.max(25, c.dynamicDistressScore - 10)
        };
      }
      return c;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        // Enterprise Authentication & RBAC
        currentUser,
        isAuthenticated,
        login,
        logout,
        safeNavigate,
        authNotice,
        setAuthNotice,
        loginModalState,
        openLoginModal,
        closeLoginModal,
        language,
        setLanguage,
        cases,
        selectedCaseId,
        setSelectedCaseId,
        selectedCase,
        districts,
        nationalAggregates,
        alerts,
        modalState,
        openXAI,
        openDispatch,
        closeModal,
        handleDispatchAction,
        triggerSOS,
        recordInteractionUpdate,
        // SIH Presentation
        isPitchDeckOpen,
        pitchDeckInitialSlide,
        openPitchDeck,
        closePitchDeck,
        // Safe-Contact Protocol
        isDiscreetCamouflage,
        toggleDiscreetCamouflage,
        safeContactSettings,
        setSafeContactSettings,
        // Human in the loop alerts
        verifyAlert,
        dismissAlert,
        // Closed loop interventions
        verifyInterventionDelivery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
