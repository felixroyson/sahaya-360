import React from 'react';
import { useApp } from './context/AppContext';
import { LandingPageView } from './views/LandingPageView';
import { ConsoleApp } from './console/ConsoleApp';
import { ExplainableAIModal } from './components/ExplainableAIModal';
import { ActionDispatchModal } from './components/ActionDispatchModal';
import { SOSPanicOverlay } from './components/SOSPanicOverlay';
import { SIHPresentationModal } from './components/SIHPresentationModal';
import { DiscreetCamouflageOverlay } from './components/DiscreetCamouflageOverlay';
import { FloatingAIChatbot } from './components/FloatingAIChatbot';

export const App = () => {
  const { activeRole, setActiveRole, toggleDiscreetCamouflage } = useApp();

  // Landing Page Mode (Kept completely untouched - Chatbot is excluded here as requested)
  if (activeRole === 'landing') {
    return (
      <>
        <LandingPageView />
        <ExplainableAIModal />
        <ActionDispatchModal />
        <SOSPanicOverlay />
        <SIHPresentationModal />
        <DiscreetCamouflageOverlay />
      </>
    );
  }

  // Core Operational Platform: SAHAYA-360 Console & Citizen User Portal (Chatbot enabled here)
  return (
    <>
      <ConsoleApp 
        initialRole={activeRole} 
        onReturnToLanding={() => setActiveRole('landing')}
        onToggleCamouflage={toggleDiscreetCamouflage}
      />
      <SOSPanicOverlay />
      <SIHPresentationModal />
      <DiscreetCamouflageOverlay />
      <FloatingAIChatbot />
    </>
  );
};

export default App;
