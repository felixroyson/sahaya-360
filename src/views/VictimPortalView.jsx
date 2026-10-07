import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InteractiveChatbot } from '../components/InteractiveChatbot';
import { 
  HeartHandshake, 
  PhoneCall, 
  ShieldCheck, 
  Scale, 
  Smile, 
  Meh, 
  Frown, 
  Radio, 
  CheckCircle2, 
  Lock, 
  HelpCircle, 
  Sparkles,
  Home
} from 'lucide-react';

export const VictimPortalView = () => {
  const { 
    selectedCase, 
    language, 
    triggerSOS, 
    recordInteractionUpdate,
    toggleDiscreetCamouflage,
    safeContactSettings,
    setSafeContactSettings
  } = useApp();

  const [mood, setMood] = useState(2); // 0: terrible, 1: bad, 2: neutral, 3: good
  const [fearLevel, setFearLevel] = useState(3); // 1 to 5
  const [sleepQuality, setSleepQuality] = useState(2); // 1 to 5
  const [selectedChannel, setSelectedChannel] = useState('app'); // 'app' | 'ivrs' | 'sms'
  const [submittedPulse, setSubmittedPulse] = useState(false);
  const [simulatedSmsSent, setSimulatedSmsSent] = useState(false);

  const handleSubmitDailyPulse = () => {
    // Compute quick distress increment based on answers
    const fearStress = fearLevel * 18;
    const moodStress = (3 - mood) * 15;
    const sleepStress = (5 - sleepQuality) * 8;
    const computedDistress = Math.min(100, Math.max(20, fearStress + moodStress + sleepStress));

    recordInteractionUpdate(selectedCase.id, {
      score: computedDistress,
      channel: selectedChannel === 'sms' ? "SMS Pulse Check-in" : selectedChannel === 'ivrs' ? "IVRS Telephony" : "Citizen Mobile Well-Being Pulse",
      summary: `Daily Pulse: Fear Level ${fearLevel}/5, Sleep Quality ${sleepQuality}/5, Mood rating.`
    });

    setSubmittedPulse(true);
    setTimeout(() => setSubmittedPulse(false), 4000);
  };

  const handleSimulateSms = () => {
    setSimulatedSmsSent(true);
    recordInteractionUpdate(selectedCase.id, {
      score: Math.max(25, selectedCase.dynamicDistressScore - 6),
      channel: "SMS Pulse Check-in (14566)",
      summary: "Low-bandwidth SMS response received: '14566 SAFE 3' (Victim confirmed safe at home, anxiety manageable)."
    });
    setTimeout(() => setSimulatedSmsSent(false), 4000);
  };

  const isHindi = language === 'hi';
  const baseline = selectedCase.personalBaselineDistress || 28;
  const currentScore = selectedCase.dynamicDistressScore || 84;
  const delta = currentScore - baseline;

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Safe-Contact Protocol Strip */}
      <div style={{
        background: 'linear-gradient(90deg, #f0f9ff 0%, #ecfdf5 100%)',
        border: '1px solid #bae6fd',
        borderRadius: '16px',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#0284c7', color: '#fff', padding: '4px 10px', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.04em' }}>
            SAFE-CONTACT PROTOCOL ACTIVE
          </div>
          <div style={{ fontSize: '0.8rem', color: '#334155' }}>
            Preferred Window: <strong style={{ color: '#0284c7' }}>{safeContactSettings.preferredTimeWindow}</strong>
            <span style={{ margin: '0 8px', color: '#cbd5e1' }}>|</span>
            Baseline Normal: <strong style={{ color: '#16a34a' }}>{baseline}</strong>
            <span style={{ margin: '0 8px', color: '#cbd5e1' }}>|</span>
            Current Deviation: <strong style={{ color: delta > 25 ? '#dc2626' : '#d97706' }}>+{delta} pts</strong>
          </div>
        </div>

        {/* Quick Exit Disguise Button */}
        <button
          onClick={toggleDiscreetCamouflage}
          style={{
            background: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#b91c1c',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 4px rgba(239, 68, 68, 0.1)'
          }}
          title="Instant Quick Exit: Press Esc key to camouflage screen"
        >
          <Lock size={13} />
          <span>Quick Exit / Disguise (Esc)</span>
        </button>
      </div>

      {/* Empathetic Welcome Banner */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1.4rem 1.6rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '6px' }}>
            <span className="badge badge-poa" style={{ background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', fontWeight: 700 }}>
              {isHindi ? 'राष्ट्रीय अत्याचार निवारण हेल्पलाइन' : 'National Helpline Against Atrocities (14566)'}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#15803d', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <ShieldCheck size={12} />
              <span>Bhashini Indic AI Multilingual Engine</span>
            </span>
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
            {isHindi 
              ? `नमस्ते, ${selectedCase.victimName}। हम हर कदम पर आपके साथ हैं।` 
              : `Welcome, ${selectedCase.victimName}. You are protected and not alone.`}
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#475569', marginTop: '3px' }}>
            {isHindi 
              ? 'आपकी सुरक्षा, स्वास्थ्य और कानूनी अधिकारों की रक्षा हेतु 24x7 समर्पित सहायता प्रणाली।' 
              : '24x7 continuous well-being support, witness protection linkage, and statutory legal aid under SC/ST PoA Act.'}
          </p>
        </div>

        {/* Emergency SOS & Call 14566 Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a 
            href="tel:14566"
            className="btn btn-secondary"
            style={{ textDecoration: 'none', gap: '6px', fontSize: '0.82rem' }}
          >
            <PhoneCall size={15} color="#ea580c" />
            <span>{isHindi ? 'हेल्पलाइन 14566' : 'Call NHAA 14566'}</span>
          </a>

          <button 
            className="btn btn-danger"
            onClick={() => triggerSOS()}
            style={{ fontSize: '0.82rem', gap: '6px', padding: '0.6rem 1.25rem' }}
          >
            <Radio size={15} className="live-indicator" />
            <span>{isHindi ? 'आपातकालीन मदद (SOS)' : 'EMERGENCY SOS'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Pulse Check-in & Chatbot */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '1.5rem' }}>
        
        {/* Left: Daily Well-being Pulse Check-in */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartHandshake size={18} color="#0284c7" />
              <span>{isHindi ? 'दैनिक कुशलता जांच (Daily Pulse)' : 'Daily Well-Being Pulse Check-in'}</span>
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.95rem' }}>
              {isHindi 
                ? 'यह 30 सेकंड का चेक-इन आपकी मानसिक स्थिति को सुरक्षित रूप से ट्रैक करने में मदद करता है।' 
                : 'Takes 30 seconds. Helps our AI detect distress escalations early and dispatch support.'}
            </p>

            {/* Multi-Channel Selector Pill */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', background: '#f1f5f9', padding: '4px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <button 
                onClick={() => setSelectedChannel('app')}
                className={`tab-pill ${selectedChannel === 'app' ? 'active' : ''}`}
                style={{ fontSize: '0.74rem', padding: '5px 10px', flex: 1, fontWeight: selectedChannel === 'app' ? 700 : 500 }}
              >
                📱 Mobile App
              </button>
              <button 
                onClick={() => setSelectedChannel('ivrs')}
                className={`tab-pill ${selectedChannel === 'ivrs' ? 'active' : ''}`}
                style={{ fontSize: '0.74rem', padding: '5px 10px', flex: 1, fontWeight: selectedChannel === 'ivrs' ? 700 : 500 }}
              >
                📞 IVRS Telephony
              </button>
              <button 
                onClick={() => setSelectedChannel('sms')}
                className={`tab-pill ${selectedChannel === 'sms' ? 'active' : ''}`}
                style={{ fontSize: '0.74rem', padding: '5px 10px', flex: 1, fontWeight: selectedChannel === 'sms' ? 700 : 500 }}
              >
                💬 SMS Pulse (2G)
              </button>
            </div>

            {selectedChannel === 'sms' && (
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '0.85rem', marginBottom: '1.25rem', fontSize: '0.75rem' }}>
                <div style={{ fontWeight: 700, color: '#0284c7', marginBottom: '4px' }}>
                  Low-Bandwidth Asynchronous SMS Pulse
                </div>
                <div style={{ color: '#334155', lineHeight: 1.45, marginBottom: '0.6rem' }}>
                  Non-smartphone or low-connectivity users can reply to toll-free number <strong>14566</strong> via standard SMS: <code>14566 SAFE [1-5]</code>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={handleSimulateSms}
                  style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                >
                  Simulate Incoming 2G SMS Pulse Check-in
                </button>
                {simulatedSmsSent && (
                  <div style={{ color: '#16a34a', marginTop: '6px', fontSize: '0.72rem', fontWeight: 600 }}>
                    ✓ SMS Check-in parsed & encrypted into SAHAYA-360 registry.
                  </div>
                )}
              </div>
            )}

            {/* Question 1: General Mood */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.6rem' }}>
                {isHindi ? '1. आज आप आंतरिक रूप से कैसा महसूस कर रहे हैं?' : '1. How are you feeling internally today?'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {[
                  { val: 0, label: isHindi ? 'अत्यधिक परेशान' : 'Severely Down', icon: Frown, color: '#ef4444' },
                  { val: 1, label: isHindi ? 'चिंतित/उदास' : 'Anxious', icon: Meh, color: '#f97316' },
                  { val: 2, label: isHindi ? 'सामान्य/ठीक' : 'Neutral', icon: Smile, color: '#f59e0b' },
                  { val: 3, label: isHindi ? 'सुरक्षित/बेहतर' : 'Supported', icon: Smile, color: '#10b981' }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = mood === item.val;
                  return (
                    <button
                      key={item.val}
                      onClick={() => setMood(item.val)}
                      style={{
                        background: isSelected ? '#f0f9ff' : '#f8fafc',
                        border: isSelected ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.75rem 0.4rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        color: isSelected ? '#0f172a' : '#64748b',
                        boxShadow: isSelected ? '0 4px 10px rgba(2, 132, 199, 0.12)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Icon size={22} color={isSelected ? item.color : '#94a3b8'} style={{ margin: '0 auto 4px' }} />
                      <div style={{ fontSize: '0.72rem', fontWeight: 700 }}>{item.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Threat & Safety Perception */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.82rem' }}>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>
                  {isHindi ? '2. क्या आपको किसी प्रकार के खतरे या धमकी का डर है?' : '2. Do you feel threatened or intimidated?'}
                </span>
                <span style={{ fontWeight: 700, color: fearLevel >= 4 ? '#dc2626' : '#0284c7' }}>
                  {fearLevel}/5 ({fearLevel >= 4 ? (isHindi ? 'उच्च भय' : 'High Threat') : (isHindi ? 'नियंत्रित' : 'Manageable')})
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={fearLevel}
                onChange={(e) => setFearLevel(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginTop: '3px' }}>
                <span>{isHindi ? 'बिल्कुल नहीं' : 'No Threat'}</span>
                <span>{isHindi ? 'गंभीर डर / धमकी' : 'Severe Intimidation'}</span>
              </div>
            </div>

            {/* Question 3: Sleep Quality */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.82rem' }}>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>
                  {isHindi ? '3. पिछली रात आपकी नींद कैसी रही?' : '3. How was your sleep last night?'}
                </span>
                <span style={{ fontWeight: 700, color: sleepQuality <= 2 ? '#ea580c' : '#16a34a' }}>
                  {sleepQuality}/5 ({sleepQuality <= 2 ? (isHindi ? 'अनिद्रा/बुरे सपने' : 'Severe Insomnia') : (isHindi ? 'अच्छी नींद' : 'Restful')})
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            {/* Submit Button */}
            <button
              className="btn btn-primary"
              onClick={handleSubmitDailyPulse}
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}
            >
              {isHindi ? 'दैनिक कुशलता दर्ज करें' : 'Submit Confidential Daily Pulse'}
            </button>

            {submittedPulse && (
              <div style={{ marginTop: '0.75rem', padding: '0.65rem', background: '#dcfce7', border: '1px solid #86efac', borderRadius: 'var(--radius-sm)', color: '#15803d', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                <CheckCircle2 size={16} />
                <span>
                  {isHindi 
                    ? 'आपकी जानकारी सुरक्षित रूप से दर्ज हो गई है। हमारी टीम लगातार आपकी रक्षा में तत्पर है।' 
                    : 'Pulse submitted securely. Your Dynamic Distress Score has been updated.'}
                </span>
              </div>
            )}
          </div>

          {/* Statutory Rights Information Card */}
          <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Scale size={16} color="#d97706" />
              <span>{isHindi ? 'आपके कानूनी अधिकार (SC/ST PoA Act)' : 'Your Statutory Rights & Protection'}</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.75rem', color: '#334155' }}>
              <div style={{ padding: '0.65rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', lineHeight: 1.45 }}>
                <strong style={{ color: '#0f172a' }}>{isHindi ? 'सुरक्षित गवाह सुरक्षा (धारा 15A):' : 'Witness Protection (Sec 15A):'}</strong>{' '}
                {isHindi 
                  ? 'कोर्ट जाने-आने के लिए सशस्त्र पुलिस सुरक्षा एवं दैनिक यात्रा भत्ता पाने का कानूनी अधिकार।'
                  : 'Right to armed police escort during court travel and protection from social boycott.'}
              </div>

              <div style={{ padding: '0.65rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', lineHeight: 1.45 }}>
                <strong style={{ color: '#0f172a' }}>{isHindi ? 'स्क्रीन युक्त गवाह बॉक्स (नियम 12):' : 'In-Camera & Screened Box (Rule 12):'}</strong>{' '}
                {isHindi 
                  ? 'अदालत में आरोपियों को देखे बिना गोपनीय रूप से गवाही देने का अधिकार।'
                  : 'Right to testify behind a screen without direct eye-contact with accused persons.'}
              </div>

              <div style={{ padding: '0.65rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', lineHeight: 1.45 }}>
                <strong style={{ color: '#0f172a' }}>{isHindi ? 'निशुल्क विधिक सहायता (DLSA):' : 'Free Legal Representation:'}</strong>{' '}
                {isHindi 
                  ? 'वरिष्ठ विशेष लोक अभियोजक अथवा अपनी पसंद के वकील का खर्च सरकार द्वारा वहन।'
                  : 'Right to choose your advocate whose fees are paid directly by the District Administration.'}
              </div>
            </div>
          </div>

        </div>

        {/* Right: Conversational AI Companion */}
        <div>
          <InteractiveChatbot caseItem={selectedCase} />
        </div>

      </div>

    </div>
  );
};
