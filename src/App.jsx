import React from 'react';
import { useApp } from './context/AppContext';
import { LandingPageView } from './views/LandingPageView';
import { ConsoleApp } from './console/ConsoleApp';
import { GovUtilityTopBar } from './components/GovUtilityTopBar';
import { ExplainableAIModal } from './components/ExplainableAIModal';
import { ActionDispatchModal } from './components/ActionDispatchModal';
import { SOSPanicOverlay } from './components/SOSPanicOverlay';
import { SIHPresentationModal } from './components/SIHPresentationModal';
import { DiscreetCamouflageOverlay } from './components/DiscreetCamouflageOverlay';
import { FloatingAIChatbot } from './components/FloatingAIChatbot';

export const App = () => {
  const { activeRole, setActiveRole, isAuthenticated, toggleDiscreetCamouflage } = useApp();

  const isProtectedRole = activeRole !== 'landing';
  const showLanding = !isProtectedRole || !isAuthenticated;

  return (
    <>
      {showLanding && <GovUtilityTopBar />}
      {showLanding ? (
        <LandingPageView />
      ) : (
        <ConsoleApp 
          initialRole={activeRole} 
          onReturnToLanding={() => setActiveRole('landing')}
          onToggleCamouflage={toggleDiscreetCamouflage}
        />
      )}
      <ExplainableAIModal />
      <ActionDispatchModal />
      <SOSPanicOverlay />
      <SIHPresentationModal />
      <DiscreetCamouflageOverlay />
      {(showLanding || activeRole === 'victim') && <FloatingAIChatbot />}
    </>
  );
};

export default App;
