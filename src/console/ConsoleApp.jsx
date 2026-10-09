import React, { useState, useEffect } from 'react';
import './console.css';
import { ConsoleSidebar } from './components/ConsoleSidebar';
import { ConsoleTopBar } from './components/ConsoleTopBar';
import { ExplainabilityDrawer } from './components/ExplainabilityDrawer';
import { InteractiveDemoBanner } from './components/InteractiveDemoBanner';

import { ConsoleOverview } from './views/ConsoleOverview';
import { ConsoleTriageHub } from './views/ConsoleTriageHub';
import { ConsoleCaseDetail } from './views/ConsoleCaseDetail';
import { ConsoleCheckInMonitor } from './views/ConsoleCheckInMonitor';
import { ConsoleInterventionCenter } from './views/ConsoleInterventionCenter';
import { ConsoleAlertCenter } from './views/ConsoleAlertCenter';
import { ConsoleAnalytics } from './views/ConsoleAnalytics';
import { ConsoleSettings } from './views/ConsoleSettings';
import { ProtectedCitizenPortal } from './views/ProtectedCitizenPortal';

import { CounsellorView } from '../views/CounsellorView';
import { DistrictView } from '../views/DistrictView';
import { NationalView } from '../views/NationalView';

import { SYNTHETIC_CASES, PRIORITY_ALERTS, DEMO_CASE_ID } from './data/consoleData';
import { useApp } from '../context/AppContext';

export const ConsoleApp = ({ 
  initialRole = 'counsellor', 
  onReturnToLanding, 
  onToggleCamouflage 
}) => {
  const { setActiveRole: setGlobalRole, language, setLanguage, currentUser, logout, safeNavigate } = useApp();
  const [activeRole, setActiveRole] = useState(initialRole);
  const [activeNav, setActiveNav] = useState('overview'); // 'overview' | 'triage' | 'cases' | 'check-ins' | 'interventions' | 'alerts' | 'analytics' | 'settings'

  const handleReturnToLanding = () => {
    if (onReturnToLanding) {
      onReturnToLanding();
    }
    setGlobalRole('landing');
  };

  const handleRoleChange = (role) => {
    if (role === 'landing') {
      handleReturnToLanding();
      return;
    }
    const success = safeNavigate(role);
    if (success) {
      setActiveRole(role);
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query.trim().length > 0 && activeNav !== 'triage' && activeNav !== 'cases') {
      setActiveNav('triage');
      setIsViewingCaseDetail(false);
    }
  };

  // Cases State
  const [cases, setCases] = useState(SYNTHETIC_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState(DEMO_CASE_ID);
  const [isViewingCaseDetail, setIsViewingCaseDetail] = useState(false);

  // Alerts State
  const [alerts, setAlerts] = useState(PRIORITY_ALERTS);

  // Explainability Drawer State
  const [explainDrawerOpen, setExplainDrawerOpen] = useState(false);
  const [explainCaseData, setExplainCaseData] = useState(null);

  // Interactive Demo Scenario State
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [isDemoExpanded, setIsDemoExpanded] = useState(false);

  // Sync role changes if parent passes new role
  useEffect(() => {
    if (initialRole && initialRole !== activeRole) {
      setActiveRole(initialRole);
    }
  }, [initialRole]);

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  // Helper to open Explain Score
  const handleOpenExplain = (caseItem) => {
    setExplainCaseData(caseItem || selectedCase);
    setExplainDrawerOpen(true);
  };

  // Helper to select and inspect a case
  const handleSelectCase = (caseId) => {
    setSelectedCaseId(caseId);
    setIsViewingCaseDetail(true);
    setActiveNav('cases');
  };

  // Handle Counsellor confirming concern
  const handleConfirmConcern = (caseId, reviewNote) => {
    setAlerts(prev => prev.map(a => 
      a.caseId === caseId ? { ...a, status: 'VERIFIED_BY_COUNSELLOR', humanReviewNotes: reviewNote } : a
    ));
    setCases(prev => prev.map(c => 
      c.id === caseId ? {
        ...c,
        status: 'CRITICAL — CONCERN VERIFIED',
        workflow: { ...c.workflow, counselling: 'Active (Verified)' },
        auditHistory: [
          {
            id: `A-${Date.now()}`,
            timestamp: 'Just now',
            actor: 'Dr. Ananya Sharma (Clinical Counsellor)',
            action: 'Concern Clinically Verified',
            notes: reviewNote
          },
          ...c.auditHistory
        ]
      } : c
    ));
  };

  // Handle Dismissing alert
  const handleDismissAlert = (caseId) => {
    setAlerts(prev => prev.map(a => 
      a.caseId === caseId ? { ...a, status: 'DISMISSED' } : a
    ));
  };

  // Handle updating intervention status
  const handleUpdateInterventionStatus = (caseId, interventionId, newStatus, proofNote) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          interventions: c.interventions.map(int => {
            if (int.id === interventionId) {
              return {
                ...int,
                status: newStatus,
                outcome: proofNote || int.outcome,
                steps: {
                  ...int.steps,
                  completed: true,
                  verified: true,
                  outcome: true
                }
              };
            }
            return int;
          }),
          // Positive closed loop outcome lowers acute distress
          currentScore: Math.max(28, c.currentScore - 12),
          deviation: `+${Math.max(0, parseInt(c.deviation) - 12)}`
        };
      }
      return c;
    }));
  };

  // Interactive Demo Step Advancement
  const handleNextDemoStep = () => {
    const next = demoStep + 1;
    if (next <= 10) {
      setDemoStep(next);
      applyDemoStepState(next);
    }
  };

  const handleJumpToStep = (stepNumber) => {
    setDemoStep(stepNumber);
    applyDemoStepState(stepNumber);
  };

  const handleResetDemo = () => {
    setDemoStep(1);
    setCases(SYNTHETIC_CASES);
    setAlerts(PRIORITY_ALERTS);
    setSelectedCaseId(DEMO_CASE_ID);
    setIsViewingCaseDetail(false);
    setActiveNav('overview');
  };

  const applyDemoStepState = (step) => {
    switch (step) {
      case 1:
        // Initial state
        setActiveNav('overview');
        break;
      case 2:
      case 3:
      case 4:
        // Signal detected & alert generated -> Triage view
        setActiveNav('triage');
        setSelectedCaseId(DEMO_CASE_ID);
        break;
      case 5:
        // Counsellor reviews explanation -> open Explain Drawer
        setSelectedCaseId(DEMO_CASE_ID);
        setExplainCaseData(cases.find(c => c.id === DEMO_CASE_ID));
        setExplainDrawerOpen(true);
        break;
      case 6:
        // Concern confirmed
        setExplainDrawerOpen(false);
        handleConfirmConcern(DEMO_CASE_ID, "Verified: Imminent trial intimidation confirmed. Statutory protection required.");
        handleSelectCase(DEMO_CASE_ID);
        break;
      case 7:
      case 8:
        // Interventions dispatched
        setActiveNav('interventions');
        break;
      case 9:
        // Delivery verified
        handleUpdateInterventionStatus(DEMO_CASE_ID, "INT-894-1", "Delivered & Verified", "DSP Sasni Gate deployed 2 armed constables at victim residence.");
        setActiveNav('interventions');
        break;
      case 10:
        // Full normalization
        setCases(prev => prev.map(c => 
          c.id === DEMO_CASE_ID ? {
            ...c,
            currentScore: 32,
            baselineScore: 28,
            deviation: "+4",
            status: "SAFE — STABILIZED",
            priority: "MODERATE",
            trend: "RECOVERING",
            checkIns: [
              { id: "C-FOLLOWUP", date: "TODAY (Follow-up)", text: "Police picket has arrived. I feel safe to attend court.", mood: "Relieved", channel: "IVRS 14566", score: 32 },
              ...c.checkIns
            ]
          } : c
        ));
        handleSelectCase(DEMO_CASE_ID);
        break;
      default:
        break;
    }
  };

  // If user selected Citizen Portal role, render the Citizen View
  if (activeRole === 'victim') {
    return (
      <ProtectedCitizenPortal 
        onReturnToConsole={(role) => handleRoleChange(role || 'district')}
        onReturnToLanding={onReturnToLanding}
        onToggleCamouflage={onToggleCamouflage}
        onSwitchRole={(role) => handleRoleChange(role)}
        currentUser={currentUser}
        logout={logout}
      />
    );
  }

  const unresolvedAlertsCount = alerts.filter(a => a.status === 'UNRESOLVED').length;

  return (
    <div className="console-app-root">
      
      {/* Left Navigation Sidebar */}
      <ConsoleSidebar 
        activeNav={activeNav}
        setActiveNav={(nav) => {
          setActiveNav(nav);
          setIsViewingCaseDetail(false);
        }}
        activeRole={activeRole}
        setActiveRole={handleRoleChange}
        unresolvedAlertsCount={unresolvedAlertsCount}
        needReviewCount={cases.filter(c => c.status.includes('REVIEW')).length}
        onReturnToLanding={handleReturnToLanding}
      />

      {/* Main Content Area */}
      <div className="console-main-wrapper">
        
        {/* Top Bar */}
        <ConsoleTopBar 
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          activeRole={activeRole}
          setActiveRole={handleRoleChange}
          language={language}
          setLanguage={setLanguage}
          unresolvedAlertsCount={unresolvedAlertsCount}
          onOpenAlerts={() => {
            setActiveNav('alerts');
            setIsViewingCaseDetail(false);
          }}
          onLaunchDemo={() => setIsDemoActive(prev => !prev)}
          isDemoActive={isDemoActive}
          onReturnToLanding={handleReturnToLanding}
          currentUser={currentUser}
          logout={logout}
        />

        {/* Interactive Walkthrough Banner */}
        {isDemoActive && (
          <div style={{ padding: '20px 28px 0' }}>
            <InteractiveDemoBanner 
              currentStep={demoStep}
              onNextStep={handleNextDemoStep}
              onResetDemo={handleResetDemo}
              onJumpToStep={handleJumpToStep}
              isExpanded={isDemoExpanded}
              setIsExpanded={setIsDemoExpanded}
              onClose={() => setIsDemoActive(false)}
            />
          </div>
        )}

        {/* Dynamic Route View */}
        {isViewingCaseDetail ? (
          <ConsoleCaseDetail 
            caseData={selectedCase}
            onBack={() => setIsViewingCaseDetail(false)}
            onOpenExplain={handleOpenExplain}
            onUpdateInterventionStatus={handleUpdateInterventionStatus}
          />
        ) : (
          <>
            {activeNav === 'overview' && (
              activeRole === 'counsellor' ? (
                <div style={{ padding: '24px 28px' }}>
                  <CounsellorView />
                </div>
              ) : activeRole === 'district' ? (
                <div style={{ padding: '24px 28px' }}>
                  <DistrictView />
                </div>
              ) : activeRole === 'national' ? (
                <div style={{ padding: '24px 28px' }}>
                  <NationalView />
                </div>
              ) : (
                <ConsoleOverview 
                  cases={cases}
                  alerts={alerts}
                  onSelectCase={handleSelectCase}
                  onOpenExplain={handleOpenExplain}
                  onNavigate={(nav) => {
                    setActiveNav(nav);
                    setIsViewingCaseDetail(false);
                  }}
                  activeRole={activeRole}
                />
              )
            )}

            {activeNav === 'general-hub' && (
              <ConsoleOverview 
                cases={cases}
                alerts={alerts}
                onSelectCase={handleSelectCase}
                onOpenExplain={handleOpenExplain}
                onNavigate={(nav) => {
                  setActiveNav(nav);
                  setIsViewingCaseDetail(false);
                }}
                activeRole={activeRole}
              />
            )}

            {activeNav === 'triage' && (
              <ConsoleTriageHub 
                cases={cases}
                onSelectCase={handleSelectCase}
                onOpenExplain={handleOpenExplain}
                initialSearch={searchQuery}
              />
            )}

            {activeNav === 'cases' && (
              <ConsoleTriageHub 
                cases={cases}
                onSelectCase={handleSelectCase}
                onOpenExplain={handleOpenExplain}
                initialSearch={searchQuery}
              />
            )}

            {activeNav === 'check-ins' && (
              <ConsoleCheckInMonitor 
                cases={cases}
                onSelectCase={handleSelectCase}
                onOpenExplain={handleOpenExplain}
              />
            )}

            {activeNav === 'interventions' && (
              <ConsoleInterventionCenter 
                cases={cases}
                onSelectCase={handleSelectCase}
                onUpdateInterventionStatus={handleUpdateInterventionStatus}
              />
            )}

            {activeNav === 'alerts' && (
              <ConsoleAlertCenter 
                alerts={alerts}
                cases={cases}
                onSelectCase={handleSelectCase}
                onOpenExplain={handleOpenExplain}
                onVerifyAlert={handleConfirmConcern}
                onDismissAlert={handleDismissAlert}
              />
            )}

            {activeNav === 'analytics' && (
              <ConsoleAnalytics />
            )}

            {activeNav === 'settings' && (
              <ConsoleSettings />
            )}
          </>
        )}

      </div>

      {/* Slide-over Explainability AI Drawer */}
      <ExplainabilityDrawer 
        isOpen={explainDrawerOpen}
        onClose={() => setExplainDrawerOpen(false)}
        caseData={explainCaseData}
        onConfirmConcern={handleConfirmConcern}
        onDismissAlert={handleDismissAlert}
      />

    </div>
  );
};
