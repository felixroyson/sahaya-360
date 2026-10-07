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
  ChevronUp
} from 'lucide-react';

export const DEMO_STEPS = [
  {
    step: 1,
    title: "1. Check-in Received",
    desc: "IVRS 14566 morning pulse received with severe acoustic tremor & voice distress transcript.",
    action: "Simulate Distress Check-in"
  },
  {
    step: 2,
    title: "2. Signal Detected",
    desc: "NLP + Acoustic model computes Dynamic Distress Signal (DDS: 84 / 100).",
    action: "Evaluate Signal"
  },
  {
    step: 3,
    title: "3. Baseline Delta Calculated",
    desc: "Comparison with victim's personal baseline (28) flags acute +56 point deviation.",
    action: "Calculate Baseline Delta"
  },
  {
    step: 4,
    title: "4. Explainable Alert Generated",
    desc: "Factor attribution created: Imminent trial proximity (+18), threat (+16), hesitation (+11).",
    action: "Generate Alert"
  },
  {
    step: 5,
    title: "5. Counsellor Reviews Explanation",
    desc: "Clinical Counsellor (Dr. Ananya) inspects SHAP/LIME factors and acoustic markers.",
    action: "Review Explanation"
  },
  {
    step: 6,
    title: "6. Concern Confirmed",
    desc: "Counsellor signs clinical verification: 'AI Supports — Humans Decide'.",
    action: "Confirm Risk"
  },
  {
    step: 7,
    title: "7. Protection Dispatched",
    desc: "Statutory order generated for Armed Police Escort under Witness Protection Scheme 2018.",
    action: "Deploy Protection"
  },
  {
    step: 8,
    title: "8. Counselling Deployed",
    desc: "Emergency tele-counselling trauma stabilization session assigned to Dr. Meena.",
    action: "Deploy Counselling"
  },
  {
    step: 9,
    title: "9. Delivery Verified",
    desc: "DSP Sasni Gate & Clinician upload delivery receipts; Closed-Loop status updated.",
    action: "Verify Delivery"
  },
  {
    step: 10,
    title: "10. Baseline Normalization",
    desc: "Follow-up check-in received: Victim feels secure. DDS normalizes from 84 down to 32.",
    action: "Follow-up & Resolve"
  }
];

export const InteractiveDemoBanner = ({ 
  currentStep, 
  onNextStep, 
  onResetDemo, 
  onJumpToStep,
  isExpanded,
  setIsExpanded 
}) => {
  const currentStepData = DEMO_STEPS[currentStep - 1] || DEMO_STEPS[0];
  const isCompleted = currentStep >= 10;

  return (
    <div className="console-demo-banner">
      <div style={{ flex: 1, minWidth: '280px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ 
            background: isCompleted ? '#15803D' : '#DC2626', 
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
            <span>SIH 2026 INTERACTIVE WALKTHROUGH</span>
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
            padding: '4px'
          }}
          title={isExpanded ? "Collapse steps" : "Expand all 10 steps"}
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
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
