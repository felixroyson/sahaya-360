import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  PhoneCall, 
  ShieldAlert, 
  ChevronDown, 
  ArrowRight,
  HelpCircle,
  Clock,
  Mic
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingAIChatbot = () => {
  const { setActiveRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Vanakam! I am the SAMBAL 2.0 AI Citizen & Legal Assistant powered by the Ministry of Social Justice and Empowerment. How can I help you today?',
      time: 'Just now',
      suggestions: [
        'How to register a rescue?',
        'What is Section 15A relief?',
        'Track my grievance status',
        'Can I report as an informer?'
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = getBotResponse(query);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: botResponse.action,
        actionLabel: botResponse.actionLabel,
        suggestions: botResponse.suggestions
      }]);
      setIsTyping(false);
    }, 700);
  };

  const getBotResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('rescue') || q.includes('emergency') || q.includes('danger') || q.includes('help me')) {
      return {
        text: '🚨 If you are in immediate danger, please use "Register Rescue" in the portal or dial 14566 immediately. A rescue alert sends your GPS coordinates directly to the District Police SP and station officer for rapid dispatch.',
        action: () => setActiveRole('victim'),
        actionLabel: 'Go to Register Rescue Portal →',
        suggestions: ['What happens after rescue?', 'Call 14566 helpline', 'Track relief amount']
      };
    }

    if (q.includes('15a') || q.includes('relief') || q.includes('compensation') || q.includes('money') || q.includes('dbt')) {
      return {
        text: '⚖️ Under Section 15A of the SC/ST PoA Act 1989 & 2015 Amendment, atrocity victims are entitled to statutory compensation from ₹1,00,000 up to ₹8,25,000 depending on offense severity. 50% is released immediately upon FIR registration directly via Aadhaar Direct Benefit Transfer (DBT).',
        suggestions: ['How to claim relief?', 'Track my grievance', 'Do I need an FIR?']
      };
    }

    if (q.includes('track') || q.includes('status') || q.includes('reference') || q.includes('docket')) {
      return {
        text: '🔍 You can track your case anytime in the "Track Status" tab. Enter your Reference ID (e.g. NHAA-2026-004521) or your registered 10-digit mobile number. You will receive an OTP to view live police & judicial milestones.',
        action: () => setActiveRole('victim'),
        actionLabel: 'Open Track Status Tab →',
        suggestions: ['What is my Ref ID?', 'How long does relief take?']
      };
    }

    if (q.includes('informer') || q.includes('anonymous') || q.includes('ngo') || q.includes('someone else')) {
      return {
        text: '🛡️ Yes! In the "Register Grievance" form, you can select "As an Informer" or "As an NGO". Your personal details remain strictly confidential and will not be shared with accused parties. Statutory inquiry will be initiated to protect the victim.',
        suggestions: ['Register Grievance as Informer', 'What is NHAA 14566?']
      };
    }

    if (q.includes('fir') || q.includes('police')) {
      return {
        text: '📋 Under Section 18A of the SC/ST PoA Act, police cannot refuse FIR registration or demand preliminary inquiry before filing. If the local station refuses, NHAA 14566 will file a Zero-FIR and mandate inquiry by an officer of DSP rank or above.',
        suggestions: ['Register Grievance', 'Speak with Legal Counsel']
      };
    }

    return {
      text: 'I understand your query regarding MoSJE services and the SC/ST PoA Act. You can file a formal grievance, request emergency police rescue, or check Section 15A statutory compensation anytime. For live voice assistance, please call our 24x7 toll-free helpline at 14566.',
      suggestions: ['Register a Rescue', 'Track Grievance Status', 'Section 15A Relief Rules']
    };
  };

  return (
    <>
      {/* Floating Widget Button (Bottom Right matching screenshot icon badge) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
            color: '#FFFFFF',
            border: '3px solid #FFFFFF',
            boxShadow: '0 8px 24px rgba(2, 132, 199, 0.4), 0 2px 6px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 9999,
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease'
          }}
          title="Open SAMBAL 2.0 AI Assistant"
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {/* Circular badge representation matching screenshot */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.4rem' }}>🤖</span>
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#22C55E',
              border: '2px solid #FFFFFF'
            }}></span>
          </div>
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          height: '540px',
          maxHeight: 'calc(100vh - 48px)',
          background: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 16px 48px -8px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          overflow: 'hidden',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }}>
          {/* Chat Window Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0B2545 0%, #17324D 100%)',
            color: '#FFFFFF',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#0284C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                border: '2px solid #FFFFFF'
              }}>
                🤖
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>SAMBAL AI Assistant</span>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }}></span>
                </div>
                <div style={{ fontSize: '0.68rem', color: '#93C5FD' }}>
                  MoSJE Citizen & Legal Support • 24×7
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
              title="Close Chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Helpline Emergency Bar */}
          <div style={{
            background: '#FFF7ED',
            borderBottom: '1px solid #FED7AA',
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            color: '#C2410C'
          }}>
            <span>National Helpline (Toll-Free):</span>
            <a 
              href="tel:14566"
              style={{ fontWeight: 800, color: '#EA580C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <PhoneCall size={11} />
              <span>14566</span>
            </a>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#F8FAFC'
          }}>
            {messages.map(msg => (
              <div 
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '100%'
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  background: msg.sender === 'user' ? '#0284C7' : '#FFFFFF',
                  color: msg.sender === 'user' ? '#FFFFFF' : '#1E293B',
                  fontSize: '0.84rem',
                  lineHeight: 1.5,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  border: msg.sender === 'user' ? 'none' : '1px solid #E2E8F0'
                }}>
                  {msg.text}

                  {msg.action && (
                    <div style={{ marginTop: '8px' }}>
                      <button
                        onClick={msg.action}
                        style={{
                          background: '#0B2545',
                          color: '#FFFFFF',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>{msg.actionLabel}</span>
                      </button>
                    </div>
                  )}
                </div>

                <span style={{ fontSize: '0.62rem', color: '#94A3B8', marginTop: '3px', padding: '0 4px' }}>
                  {msg.time}
                </span>

                {/* Suggestions Pills */}
                {msg.suggestions && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sug)}
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #BAE6FD',
                          color: '#0369A1',
                          borderRadius: '9999px',
                          padding: '4px 10px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                padding: '8px 14px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                fontSize: '0.75rem',
                color: '#64748B'
              }}>
                SAMBAL AI is typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div style={{
            padding: '10px 14px',
            background: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <input 
              type="text"
              placeholder="Ask about schemes, rescue, rights..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleSend()}
              style={{
                background: '#0B2545',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Send Message"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAIChatbot;
