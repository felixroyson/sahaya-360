import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  AlertOctagon, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

export const DEMO_STEPS = [
  {
    step: 1,
    title: "1. Distress Call Received",
    desc: "Citizen completed morning helpline check-in. Severe voice stress and fear detected.",
    action: "Simulate Distress Check-in"
  },
  {
    step: 2,
    title: "2. High Risk Calculated",
    desc: "AI calculates Distress Score of 84 / 100 (Severe Risk Category).",
    action: "Evaluate Signal"
  },
  {
    step: 3,
    title: "3. Abnormal Increase Flagged",
    desc: "Score is +56 points higher than citizen's baseline (usual score: 28).",
    action: "Calculate Deviation"
  },
  {
    step: 4,
    title: "4. Danger Factors Identified",
    desc: "Upcoming court trial in 9 days and reported intimidation flagged as main reasons.",
    action: "Generate Alert"
  },
  {
    step: 5,
    title: "5. Doctor Reviews Case",
    desc: "Clinical Counsellor reviews AI findings and listens to audio stress markers.",
    action: "Review Findings"
  },
  {
    step: 6,
    title: "6. Doctor Confirms Risk",
    desc: "Doctor verifies emergency: 'AI assists — human expert approves.'",
    action: "Confirm Risk"
  },
  {
    step: 7,
    title: "7. Police Escort Dispatched",
    desc: "Magistrate issues statutory order for 24×7 armed police protection.",
    action: "Deploy Protection"
  },
  {
    step: 8,
    title: "8. Counseling Scheduled",
    desc: "Doctor connects directly with citizen to stabilize trauma and anxiety.",
    action: "Start Counseling"
  },
  {
    step: 9,
    title: "9. Protection Verified",
    desc: "Local police station confirms armed escort is stationed at citizen's home.",
    action: "Verify Protection"
  },
  {
    step: 10,
    title: "10. Citizen Safe & Normalized",
    desc: "Follow-up check-in: Citizen feels secure. Distress score drops from 84 down to 32.",
    action: "Resolve Case"
  }
];

export const InteractiveDemoBanner = ({ 
  currentStep, 
  onNextStep, 
  onResetDemo, 
  onJumpToStep,
  isExpanded,
  setIsExpanded,
  onClose
}) => {
  const currentStepData = DEMO_STEPS[currentStep - 1] || DEMO_STEPS[0];
  const isCompleted = currentStep >= 10;

  return (
    <div className="console-demo-banner">
      <div style={{ flex: 1, minWidth: '280px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ 
            background: isCompleted ? '#15803D' : '#0284C7', 
            color: '#FFFFFF', 
            fontSize: '0.68rem', 
            fontWeight: 800, 
            padding: '2px 8px', 
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Sparkles size={11} />
            <span>GUIDED WORKFLOW TOUR</span>
          </span>
          <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
            Case NHAA-DEMO-001 (Ramesh Kumar, Aligarh)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            {currentStepData.title}
          </h3>
          <span style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
            — {currentStepData.desc}
          </span>
        </div>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={onResetDemo}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
          title="Reset demo case to initial acute distress state"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>

        {!isCompleted ? (
          <button
            onClick={onNextStep}
            style={{
              background: '#2563EB',
              border: 'none',
              color: '#FFFFFF',
              padding: '7px 16px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)'
            }}
          >
            <span>Next: {DEMO_STEPS[currentStep]?.title.split('.')[1] || "Complete"}</span>
            <ArrowRight size={14} />
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ADE80', fontWeight: 700, fontSize: '0.85rem' }}>
            <CheckCircle2 size={18} />
            <span>Workflow Completed: Distress Restored</span>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
          title={isExpanded ? "Collapse steps" : "Expand all 10 steps"}
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#CBD5E1',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginLeft: '4px'
            }}
            title="Dismiss Tour"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Expanded 10-step progress bar */}
      {isExpanded && (
        <div style={{ width: '100%', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {DEMO_STEPS.map((s) => {
              const active = s.step === currentStep;
              const past = s.step < currentStep;
              return (
                <div 
                  key={s.step}
                  onClick={() => onJumpToStep(s.step)}
                  style={{
                    background: active ? '#2563EB' : past ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${active ? '#60A5FA' : past ? 'rgba(34, 197, 94, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '6px',
                    padding: '8px 10px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: active ? '#FFFFFF' : past ? '#4ADE80' : '#CBD5E1' }}>
                      Step {s.step}
                    </span>
                    {past && <CheckCircle2 size={12} color="#4ADE80" />}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: active ? '#FFFFFF' : '#94A3B8', fontWeight: active ? 700 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {s.title.split('. ')[1]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
