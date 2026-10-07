import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Send, 
  Bot, 
  User, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  Sparkles, 
  ShieldAlert, 
  PhoneCall, 
  RefreshCw 
} from 'lucide-react';

const INITIAL_MESSAGES = {
  en: [
    {
      id: 1,
      sender: 'bot',
      text: "Namaste. I am SAHAYA-360, your confidential AI well-being companion backed by the Ministry of Social Justice & Empowerment (Helpline 14566). Your session is protected under our Safe-Contact Protocol. How are you feeling today? Are you facing any threats, intimidation, or court anxiety?",
      timestamp: "10:00 AM",
      sentiment: "SUPPORTIVE"
    }
  ],
  hi: [
    {
      id: 1,
      sender: 'bot',
      text: "नमस्ते। मैं सहायता-३६० (SAHAYA-360) हूँ, सामाजिक न्याय एवं अधिकारिता मंत्रालय (हेल्पलाइन 14566) से आपकी सुरक्षित AI साथी। यह सत्र हमारे सेफ-कॉन्टैक्ट प्रोटोकॉल द्वारा संरक्षित है। आज आप कैसा महसूस कर रहे हैं? क्या आपको कोई धमकी, दबाव या कोर्ट की चिंता सता रही है?",
      timestamp: "10:00 AM",
      sentiment: "SUPPORTIVE"
    }
  ]
};

export const InteractiveChatbot = ({ caseItem }) => {
  const { selectedCase, language, recordInteractionUpdate, triggerSOS } = useApp();
  const targetCase = caseItem || selectedCase;

  const [messages, setMessages] = useState(INITIAL_MESSAGES[language] || INITIAL_MESSAGES.en);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [detectedRiskAlert, setDetectedRiskAlert] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Speech synthesis helper
  const speakText = (text) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Advanced NLP Trauma & Threat Evaluation
    setTimeout(() => {
      const lower = query.toLowerCase();
      let threatDetected = false;
      let courtAnxietyDetected = false;
      let suicideDetected = false;
      let boycottDetected = false;

      if (lower.includes('threat') || lower.includes('kill') || lower.includes('burn') || lower.includes('harm') || lower.includes('धमकी') || lower.includes('मार')) {
        threatDetected = true;
      }
      if (lower.includes('court') || lower.includes('trial') || lower.includes('judge') || lower.includes('lawyer') || lower.includes('तारीख') || lower.includes('अदालत')) {
        courtAnxietyDetected = true;
      }
      if (lower.includes('die') || lower.includes('suicide') || lower.includes('end my life') || lower.includes('मरण') || lower.includes('मरना')) {
        suicideDetected = true;
      }
      if (lower.includes('ration') || lower.includes('water') || lower.includes('boycott') || lower.includes('village') || lower.includes('बहिष्कार')) {
        boycottDetected = true;
      }

      let botReply = "";
      let deltaScore = 0;

      if (suicideDetected) {
        botReply = language === 'hi'
          ? "कृपया हिम्मत मत हारिए, आपकी जान अत्यंत कीमती है। हमने तुरंत आपके लिए विशेष मनोवैज्ञानिक आपातकालीन टीम और सुरक्षा अधिकारियों को सूचित कर दिया है। 14566 पर हमारी टीम आपसे सीधे संपर्क कर रही है।"
          : "Please hold on, you are not alone and your life is precious. An emergency psychological crisis response alert has been dispatched to your district nodal officer and counsellor. Stay in a safe place while we connect you to an urgent counsellor.";
        deltaScore = 95;
        setDetectedRiskAlert("CRITICAL: Extreme Despair / Self-Harm Risk Flagged");
      } else if (threatDetected) {
        botReply = language === 'hi'
          ? "हमने आपके बयान में गंभीर धमकी की पहचान की है। एससी/एसटी (पीओए) नियम 12 और गवाह संरक्षण योजना 2018 के तहत पुलिस अधीक्षक (SP) को सशस्त्र सुरक्षा एस्कॉर्ट हेतु आपातकालीन अलर्ट भेज दिया गया है।"
          : "We have detected severe intimidation cues in your statement. Under Section 15A of the SC/ST (PoA) Act and the Witness Protection Scheme 2018, an urgent protection alert has been sent to the Superintendent of Police (SP) and District Magistrate.";
        deltaScore = 88;
        setDetectedRiskAlert("HIGH THREAT: Witness Intimidation Detected & Transmitted to SP");
      } else if (courtAnxietyDetected) {
        botReply = language === 'hi'
          ? "कोर्ट की तारीख नजदीक आने पर तनाव होना स्वाभाविक है। आप अकेले नहीं हैं; आपके विशेष लोक अभियोजक और सपोर्ट पर्सन को अदालत में कैमरा ट्रायल एवं सुरक्षित गवाह बॉक्स हेतु अर्जी दाखिल करने का निर्देश भेजा गया है।"
          : "Upcoming court appearances cause understandable secondary trauma. Under PoA guidelines, you have the right to an In-Camera trial, screened witness box, and a trained Support Person by your side throughout cross-examination.";
        deltaScore = 78;
        setDetectedRiskAlert("MODERATE-HIGH: Courtroom Anxiety & Secondary Trauma Alert");
      } else if (boycottDetected) {
        botReply = language === 'hi'
          ? "सामाजिक बहिष्कार या बुनियादी सुविधाओं से वंचित करना एससी/एसटी अधिनियम के तहत गैर-जमानती अपराध है। उपजिलाधिकारी (SDM) को तत्काल मौके पर पहुंचकर राशन/पानी आपूर्ति बहाल करने का नोटिस जारी किया जा रहा है।"
          : "Social ostracism or denial of basic rations/water is a cognizable, non-bailable offense under Section 3(1) of the PoA Act. A direct enforcement order is being routed to the Sub-Divisional Magistrate (SDM).";
        deltaScore = 70;
        setDetectedRiskAlert("ELEVATED: Social Boycott & Economic Deprivation Flagged");
      } else {
        botReply = language === 'hi'
          ? "आपकी बात सुरक्षित रूप से दर्ज कर ली गई है। आपका मानसिक स्वास्थ्य स्कोर सामान्य सीमा में है। किसी भी सहायता के लिए आप कभी भी 14566 पर संपर्क कर सकते हैं।"
          : "Thank you for sharing your well-being update. Your responses have been securely logged in compliance with DPDP Act & PoA guidelines. Our automated check-in system will continue to monitor your well-being.";
        deltaScore = 38;
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sentiment: threatDetected || suicideDetected ? "ALERT" : "SUPPORTIVE"
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      speakText(botReply);

      // Recalibrate dynamic distress score
      if (deltaScore > 0) {
        recordInteractionUpdate(targetCase.id, {
          score: deltaScore,
          channel: "Interactive AI Multilingual Chatbot",
          summary: `NLP Analysis: "${query.slice(0, 60)}..." triggered ${detectedRiskAlert || 'well-being response'}.`
        });
      }

    }, 800);
  };

  const samplePrompts = [
    "They threatened to attack us if I testify on Thursday",
    "I cannot face the court crowd again, feeling extreme panic",
    "The villagers have stopped our grocery and water supply",
    "I received my first compensation installment, feeling a bit safer"
  ];

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '520px', padding: '1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)' }}>
            <Bot size={20} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                SAHAYA-360 Indic AI Companion
              </span>
              <span className="live-indicator live-indicator-green" />
              <span className="badge badge-ashoka" style={{ fontSize: '0.65rem', padding: '2px 6px', background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', fontWeight: 700 }}>Bhashini AI</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '1px' }}>
              Pillar 1 Safe Check-in | Multilingual Trauma NLP | Safe-Contact Active
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setSpeechEnabled(!speechEnabled)}
            style={{
              background: speechEnabled ? '#e0f2fe' : '#f8fafc',
              border: speechEnabled ? '1px solid #7dd3fc' : '1px solid #e2e8f0',
              color: speechEnabled ? '#0284c7' : '#64748b',
              borderRadius: 'var(--radius-sm)',
              padding: '0.4rem 0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.74rem',
              fontWeight: 600
            }}
            title={speechEnabled ? "Voice Speech Synthesis Enabled" : "Enable Voice Readback"}
          >
            {speechEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{speechEnabled ? 'Voice ON' : 'Voice OFF'}</span>
          </button>
        </div>
      </div>

      {/* Real-time Alert Banner if threat detected */}
      {detectedRiskAlert && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: 'var(--radius-sm)',
          padding: '0.55rem 0.85rem',
          fontSize: '0.74rem',
          color: '#b91c1c',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '0.75rem'
        }}>
          <ShieldAlert size={16} color="#dc2626" />
          <span style={{ fontWeight: 700 }}>{detectedRiskAlert}</span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingRight: '0.4rem' }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '85%',
              background: m.sender === 'user' ? 'linear-gradient(135deg, #0284c7, #2563eb)' : '#f8fafc',
              border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
              borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
              padding: '0.75rem 0.95rem',
              color: m.sender === 'user' ? '#ffffff' : '#0f172a',
              fontSize: '0.82rem',
              lineHeight: 1.5,
              boxShadow: m.sender === 'user' ? '0 2px 8px rgba(2, 132, 199, 0.2)' : '0 1px 3px rgba(0,0,0,0.02)'
            }}>
              {m.text}
            </div>
            <span style={{ fontSize: '0.66rem', color: '#94a3b8', marginTop: '3px', padding: '0 4px' }}>
              {m.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.75rem', padding: '4px' }}>
            <span className="live-indicator" style={{ width: '6px', height: '6px' }} />
            <span>Analyzing NLP Sentiment & Threat Lexicon...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div style={{ display: 'flex', gap: '0.45rem', overflowX: 'auto', padding: '0.6rem 0', scrollbarWidth: 'none' }}>
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(p)}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#334155',
              fontSize: '0.7rem',
              fontWeight: 500,
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            "{p.slice(0, 32)}..."
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Share how you are feeling or report any threats..."
          style={{
            flex: 1,
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: 'var(--radius-sm)',
            padding: '0.65rem 0.95rem',
            color: '#0f172a',
            fontSize: '0.82rem',
            outline: 'none'
          }}
        />

        <button
          className="btn btn-primary"
          onClick={() => handleSendMessage()}
          style={{ padding: '0.65rem 1.1rem' }}
        >
          <Send size={15} />
        </button>
      </div>

    </div>
  );
};
