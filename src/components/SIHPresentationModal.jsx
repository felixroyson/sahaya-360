import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  HeartHandshake, 
  Cpu, 
  Layers, 
  ArrowRight, 
  Lock, 
  PhoneCall, 
  ExternalLink,
  BookOpen,
  FileText,
  Clock,
  Calendar,
  EyeOff
} from 'lucide-react';

export const SIHPresentationModal = () => {
  const { 
    isPitchDeckOpen, 
    closePitchDeck, 
    pitchDeckInitialSlide, 
    setActiveRole, 
    openXAI, 
    openDispatch,
    selectedCase
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState(pitchDeckInitialSlide || 1);

  useEffect(() => {
    if (pitchDeckInitialSlide) {
      setCurrentSlide(pitchDeckInitialSlide);
    }
  }, [pitchDeckInitialSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPitchDeckOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        setCurrentSlide(prev => Math.min(6, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlide(prev => Math.max(1, prev - 1));
      } else if (e.key === 'Escape') {
        closePitchDeck();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPitchDeckOpen, closePitchDeck]);

  if (!isPitchDeckOpen) return null;

  const handleLaunchDemo = (role, extraAction) => {
    closePitchDeck();
    setActiveRole(role);
    if (extraAction === 'xai') {
      setTimeout(() => openXAI(selectedCase), 300);
    } else if (extraAction === 'dispatch') {
      setTimeout(() => openDispatch(selectedCase), 300);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 18, 0.95)',
      backdropFilter: 'blur(16px)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      color: '#f8fafc',
      overflowY: 'auto'
    }}>
      
      {/* Top Deck Navigation Bar */}
      <div style={{
        padding: '0.85rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(15, 23, 42, 0.85)',
        position: 'sticky',
        top: 0,
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src="/sahaya360_logo.png" 
            alt="SAHAYA-360 Logo"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1.5px solid rgba(13, 148, 136, 0.5)'
            }}
          />

          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#000',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Award size={14} />
            <span>SIH 2026 IDEA SUBMISSION</span>
          </div>

          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f8fafc' }}>
              SAHAYA-360 — From Distress Signal to Human Action
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
              PS ID: <strong style={{ color: '#38bdf8' }}>26094</strong> | Theme: <strong style={{ color: '#34d399' }}>MedTech / BioTech / HealthTech</strong> | Team: <strong style={{ color: '#fbbf24' }}>Slytherin</strong>
            </div>
          </div>
        </div>

        {/* Center: Slide Selector Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.06)', padding: '4px 8px', borderRadius: '30px' }}>
          {[1, 2, 3, 4, 5, 6].map(num => (
            <button
              key={num}
              onClick={() => setCurrentSlide(num)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: currentSlide === num ? '2px solid #38bdf8' : '1px solid transparent',
                background: currentSlide === num ? '#0284c7' : 'transparent',
                color: currentSlide === num ? '#fff' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title={`Slide ${num}`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Right: Controls & Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Slide <strong style={{ color: '#fff' }}>{currentSlide}</strong> of 6
          </span>

          <button
            onClick={() => setCurrentSlide(prev => Math.max(1, prev - 1))}
            disabled={currentSlide === 1}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: currentSlide === 1 ? '#475569' : '#fff',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: currentSlide === 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem'
            }}
          >
            <ChevronLeft size={14} />
            <span>Prev</span>
          </button>

          <button
            onClick={() => setCurrentSlide(prev => Math.min(6, prev + 1))}
            disabled={currentSlide === 6}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: currentSlide === 6 ? '#475569' : '#fff',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: currentSlide === 6 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem'
            }}
          >
            <span>Next</span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={closePitchDeck}
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              padding: '6px 10px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
            title="Close Presentation"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div style={{
        flex: 1,
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* ======================================================== */}
        {/* SLIDE 1: Title & The Problem */}
        {/* ======================================================== */}
        {currentSlide === 1 && (
          <div style={{
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {/* Header / Submitter Box */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <img 
                  src="/sahaya360_logo.png" 
                  alt="SAHAYA-360 Official Logo"
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    background: '#ffffff',
                    padding: '2px',
                    border: '3px solid #0d9488',
                    boxShadow: '0 8px 24px rgba(13, 148, 136, 0.35)',
                    flexShrink: 0
                  }}
                />
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(2, 132, 199, 0.2)', border: '1px solid rgba(2, 132, 199, 0.4)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, marginBottom: '0.75rem' }}>
                    <span>SMART INDIA HACKATHON 2026</span>
                    <span>•</span>
                    <span>IDEA SUBMISSION TEMPLATE</span>
                  </div>
                  <h1 style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #ffffff, #93c5fd, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
                    SAHAYA-360 — FROM DISTRESS SIGNAL TO HUMAN ACTION
                  </h1>
                  <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginTop: '0.5rem', fontWeight: 500 }}>
                    Problem Statement Title: <strong>AI-Powered Dynamic Mental Health Monitoring and Distress Prediction System for Victims of Atrocities</strong>
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.3)', padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>PS ID: <strong style={{ color: '#fff' }}>26094</strong></div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>PS Category: <strong style={{ color: '#34d399' }}>Software</strong></div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Theme: <strong style={{ color: '#38bdf8' }}>MedTech / BioTech / HealthTech</strong></div>
                <div style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 800, marginTop: '4px' }}>Team: Slytherin</div>
              </div>
            </div>

            {/* Core Problem Grid */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                SAHAYA-360: THE PROBLEM WE ADDRESS
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏳</div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fca5a5', marginBottom: '0.4rem' }}>
                    Investigation & Trial Delays
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.4 }}>
                    Prolonged legal proceedings keep victims in acute vulnerability without timely intervention.
                  </p>
                </div>

                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📉</div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fca5a5', marginBottom: '0.4rem' }}>
                    No Risk Prediction
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.4 }}>
                    Lack of dynamic baseline modeling means authorities cannot forecast crises before trial milestones.
                  </p>
                </div>

                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧩</div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fca5a5', marginBottom: '0.4rem' }}>
                    Fragmented Support
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.4 }}>
                    Police, judiciary, healthcare, and social welfare work in isolated silos with poor coordination.
                  </p>
                </div>

                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏱️</div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fca5a5', marginBottom: '0.4rem' }}>
                    Distress Identified Late
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.4 }}>
                    Psychological breakdown and PTSD are noticed only after severe escalation or witness hostility occurs.
                  </p>
                </div>

                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fca5a5', marginBottom: '0.4rem' }}>
                    Threats & Intimidation
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.4 }}>
                    Witnesses face coercive pressure, social boycott, and verbal harassment from accused on bail.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Demo Launcher */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '1rem 1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                💡 <strong>Evaluation Tip:</strong> Explore how SAHAYA-360 converts these distress signals into rapid human action.
              </div>
              <button 
                onClick={() => setCurrentSlide(2)}
                className="btn btn-primary"
                style={{ fontSize: '0.8rem', gap: '6px' }}
              >
                <span>View The Solution & 5 Pillars</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SLIDE 2: Solution & Why We Stand Out */}
        {/* ======================================================== */}
        {currentSlide === 2 && (
          <div style={{
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="badge badge-poa">SLIDE 2: THE 5 PILLARS</span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '6px' }}>
                  The SAHAYA-360 Solution Architecture
                </h2>
              </div>

              {/* The Core Visibility Gap Pipeline */}
              <div style={{
                background: 'rgba(2, 132, 199, 0.15)',
                border: '1px solid rgba(2, 132, 199, 0.35)',
                borderRadius: '12px',
                padding: '0.5rem 1rem',
                fontSize: '0.75rem',
                color: '#38bdf8',
                fontWeight: 600
              }}>
                Victims face increasing pressure → Visibility gap → SAHAYA-360 detects deterioration → Humans act → Support tracked
              </div>
            </div>

            {/* 5 Core Pillars Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
              
              {/* Pillar 1 */}
              <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', marginBottom: '0.75rem', fontWeight: 800 }}>
                    1
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.5rem' }}>
                    Safe Multilingual Check-ins
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    Mobile app, conversational chatbot, IVRS automated calls, SMS pulses, and 24x7 helpline 14566.
                  </p>
                </div>
                <button 
                  onClick={() => handleLaunchDemo('victim')}
                  style={{ marginTop: '1rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '4px 8px', borderRadius: '6px', fontSize: '0.68rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Demo Victim Portal →
                </button>
              </div>

              {/* Pillar 2 */}
              <div style={{ background: 'rgba(234, 88, 12, 0.08)', border: '1px solid rgba(234, 88, 12, 0.3)', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(234, 88, 12, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fb923c', marginBottom: '0.75rem', fontWeight: 800 }}>
                    2
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fb923c', marginBottom: '0.5rem' }}>
                    Multidimensional Distress Monitoring
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    Self-reported mood, NLP text, voice acoustic micro-tremor, engagement latency, and judicial case milestones.
                  </p>
                </div>
                <button 
                  onClick={() => handleLaunchDemo('counsellor')}
                  style={{ marginTop: '1rem', background: 'rgba(234, 88, 12, 0.15)', border: '1px solid rgba(234, 88, 12, 0.3)', color: '#fb923c', padding: '4px 8px', borderRadius: '6px', fontSize: '0.68rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Demo Acoustic AI →
                </button>
              </div>

              {/* Pillar 3 */}
              <div style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc', marginBottom: '0.75rem', fontWeight: 800 }}>
                    3
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#c084fc', marginBottom: '0.5rem' }}>
                    Early Distress Escalation Prediction
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    Tracks personal baseline deviations (DDS - Baseline = Delta). Forecasts 14-day crisis trajectory.
                  </p>
                </div>
                <button 
                  onClick={() => handleLaunchDemo('district')}
                  style={{ marginTop: '1rem', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc', padding: '4px 8px', borderRadius: '6px', fontSize: '0.68rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Demo Forecast Chart →
                </button>
              </div>

              {/* Pillar 4 */}
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', marginBottom: '0.75rem', fontWeight: 800 }}>
                    4
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fbbf24', marginBottom: '0.5rem' }}>
                    Explainable Human-Reviewed Alerts
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    Counsellors inspect exact SHAP/LIME reasons before dispatch. <em>"AI Supports — Humans Decide"</em>.
                  </p>
                </div>
                <button 
                  onClick={() => handleLaunchDemo('district', 'xai')}
                  style={{ marginTop: '1rem', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fbbf24', padding: '4px 8px', borderRadius: '6px', fontSize: '0.68rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Open XAI Modal →
                </button>
              </div>

              {/* Pillar 5 */}
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', marginBottom: '0.75rem', fontWeight: 800 }}>
                    5
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34d399', marginBottom: '0.5rem' }}>
                    Closed-Loop Intervention Tracking
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    Tracks whether counselling, armed protection, legal aid, medical, or rehabilitation support was delivered.
                  </p>
                </div>
                <button 
                  onClick={() => handleLaunchDemo('district', 'dispatch')}
                  style={{ marginTop: '1rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', padding: '4px 8px', borderRadius: '6px', fontSize: '0.68rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Demo Dispatch Modal →
                </button>
              </div>

            </div>

            {/* Why We Stand Out Strip */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                WHY SAHAYA-360 STANDS OUT
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', fontSize: '0.72rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} color="#10b981" />
                  <span><strong>Safe-Contact Protocol</strong> (Discreet Camouflage)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="#38bdf8" />
                  <span><strong>Event-Aware</strong> Court Monitoring</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={14} color="#a855f7" />
                  <span><strong>Personalized Baseline</strong> Trends</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="#f59e0b" />
                  <span><strong>Explainable Human-Reviewed</strong> Alerts</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#10b981" />
                  <span><strong>Closed-Loop</strong> Delivery Verification</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SLIDE 3: Technical Approach */}
        {/* ======================================================== */}
        {currentSlide === 3 && (
          <div style={{
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem'
          }}>
            <div>
              <span className="badge badge-poa">SLIDE 3: TECHNICAL APPROACH</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '6px' }}>
                Technical Architecture & Data Pipeline
              </h2>
            </div>

            {/* Architecture Pipeline Diagram */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
              
              {/* Layer 1 */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                  <PhoneCall size={16} />
                  <span>1. Multi-Channel Intake</span>
                </div>
                <ul style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.6, paddingLeft: '1.2rem', margin: 0 }}>
                  <li>NHAA 14566 Helpline Audio</li>
                  <li>Bhashini Multilingual Chatbot</li>
                  <li>Discreet Mobile App Pulse</li>
                  <li>Interactive IVRS Telephony</li>
                  <li>Low-Bandwidth SMS Check-in</li>
                </ul>
              </div>

              {/* Layer 2 */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                  <Cpu size={16} />
                  <span>2. Multimodal AI Engine</span>
                </div>
                <ul style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.6, paddingLeft: '1.2rem', margin: 0 }}>
                  <li><strong>Acoustic VSA:</strong> Tremor, Jitter, Shimmer</li>
                  <li><strong>NLP Sentiment:</strong> Despair, Fear, Panic</li>
                  <li><strong>Bhashini Indic:</strong> 12+ Indian languages</li>
                  <li><strong>Linguistic Threat Filter:</strong> Keyword regex</li>
                  <li><strong>Baseline Tracking:</strong> Individual delta</li>
                </ul>
              </div>

              {/* Layer 3 */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a855f7', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                  <TrendingUp size={16} />
                  <span>3. Predictive Event Engine</span>
                </div>
                <ul style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.6, paddingLeft: '1.2rem', margin: 0 }}>
                  <li><strong>Judicial Integration:</strong> Court hearing dates</li>
                  <li><strong>Accused Bail Proximity:</strong> Spike predictor</li>
                  <li><strong>14-Day Prognostic Curve:</strong> Confidence band</li>
                  <li><strong>SHAP / LIME:</strong> Transparent factor weights</li>
                  <li><strong>Emergency SOS Beacon:</strong> Latency &lt; 1 sec</li>
                </ul>
              </div>

              {/* Layer 4 */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                  <CheckCircle2 size={16} />
                  <span>4. Closed-Loop Action</span>
                </div>
                <ul style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.6, paddingLeft: '1.2rem', margin: 0 }}>
                  <li><strong>Clinician Verification:</strong> Human sign-off</li>
                  <li><strong>SP Command:</strong> Armed Police Escort</li>
                  <li><strong>DM Command:</strong> Safehouse Relocation</li>
                  <li><strong>DLSA Linkage:</strong> In-Camera Box (Rule 12)</li>
                  <li><strong>Delivery Tracking:</strong> Physical verification</li>
                </ul>
              </div>

            </div>

            {/* Protocol Architecture: Request / Response flow */}
            <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '16px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '6px' }}>
                Slytherin Frontend Request (HTTP) ➔ API Gateway ➔ Microservices Response (JSON):
              </div>
              <div style={{ color: '#94a3b8' }}>
                POST /api/v1/distress/analyze {'{ case_id: "NHAA-2026-894", channel: "IVRS", audio_stream: "base64", personal_baseline: 28 }'}<br/>
                ➔ 200 OK: {'{ dynamic_distress_score: 84, baseline_delta: "+56", risk: "CRITICAL", xai_factors: ["Court Proximity (34%)", "Threat (28%)"], intervention_dispatch_required: true, human_review_gate: "PENDING_COUNSELLOR" }'}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SLIDE 4: Feasibility & Viability */}
        {/* ======================================================== */}
        {currentSlide === 4 && (
          <div style={{
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem'
          }}>
            <div>
              <span className="badge badge-poa">SLIDE 4: FEASIBILITY & VIABILITY</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '6px' }}>
                Deployment Feasibility, Economics & Phased Rollout
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
              
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.6rem' }}>
                  Technical Feasibility
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  Developed using proven open-source technologies for multilingual NLP, speech processing, and dynamic risk prediction. Supports mobile app, chatbot, SMS, IVRS, and helpline 14566 so both smartphone and non-smartphone users participate.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fb923c', marginBottom: '0.6rem' }}>
                  Operational Feasibility
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  Complements existing district administration (DM, SP, DLSA, DMHP) workflows. Standardized dispatch protocols empower nodal officers without creating administrative overhead or duplicating statutory duties.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34d399', marginBottom: '0.6rem' }}>
                  Economic Feasibility
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  Open-source technology stack completely eliminates recurring proprietary software licensing fees. Phased district-level deployment avoids heavy capital expenditure and mitigates deployment risks.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#c084fc', marginBottom: '0.6rem' }}>
                  Regulatory & Ethical
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  Section 15A of SC/ST (PoA) Act and India's DPDP Act 2023 compliant. Uses strict consent management, AES-256 data minimization, role-based access control, and mandatory counsellor verification.
                </p>
              </div>

            </div>

            {/* Phased Roadmap Timeline */}
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                PROTOTYPE VALIDATION & SCALING ROADMAP
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>Phase 1: Working Prototype</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>VSA + Baseline Delta + Closed-Loop Tracker</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fb923c' }}>Phase 2: Controlled District Pilot</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>Pilot in 5 high-atrocity districts (UP, HR, TN, RJ, TS)</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#c084fc' }}>Phase 3: State-Level Expansion</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>Full integration with State Nodal Welfare Portals</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399' }}>Phase 4: National Integration</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>Apex MoSJE NHAA 14566 Grid & Tele-MANAS Bridge</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SLIDE 5: Challenges & Solutions */}
        {/* ======================================================== */}
        {currentSlide === 5 && (
          <div style={{
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div>
              <span className="badge badge-poa">SLIDE 5: CHALLENGES & SOLUTIONS MATRIX</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '6px' }}>
                Overcoming Implementation Roadblocks
              </h2>
            </div>

            {/* Matrix Table */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f87171' }}>Challenge: Language Diversity</div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '3px' }}>
                  <strong>Solution:</strong> Multilingual conversational AI, Bhashini integration, and language-specific acoustic calibration.
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f87171' }}>Challenge: Limited Smartphone Access & Poor Internet</div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '3px' }}>
                  <strong>Solution:</strong> Low-bandwidth interfaces, asynchronous communication, automated SMS and IVRS helpline-assisted check-ins.
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f87171' }}>Challenge: Unsafe Victim Communication</div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '3px' }}>
                  <strong>Solution:</strong> Safe-contact time protocol, preferred communication channels, discreet notifications, and Quick Exit camouflage.
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f87171' }}>Challenge: AI Bias Across Languages & Limited Training Data</div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '3px' }}>
                  <strong>Solution:</strong> Expert-defined clinical rules, fairness testing, language-wise calibration, and consented pilot data refinement.
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f87171' }}>Challenge: False Alerts & Notification Fatigue</div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '3px' }}>
                  <strong>Solution:</strong> Transparent SHAP/LIME explainability reasons and mandatory clinical human counsellor verification before dispatch.
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f87171' }}>Challenge: Sensitive Victim Data Exposure</div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '3px' }}>
                  <strong>Solution:</strong> AES-256 encryption at rest, role-based access control (RBAC), pseudonymized records, and controlled retention.
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f87171' }}>Challenge: Government-System Integration</div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '3px' }}>
                  <strong>Solution:</strong> Modular REST APIs, standardized data adapters for NHAA 14566, and Inter-operable Criminal Justice System (ICJS).
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f87171' }}>Challenge: Delayed Intervention Delivery</div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '3px' }}>
                  <strong>Solution:</strong> Closed-loop tracking assigning designated nodal officers with verified delivery timestamps and follow-ups.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SLIDE 6: Impact, Outcomes & References */}
        {/* ======================================================== */}
        {currentSlide === 6 && (
          <div style={{
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem'
          }}>
            <div>
              <span className="badge badge-poa">SLIDE 6: IMPACT, OUTCOMES & REFERENCES</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '6px' }}>
                Transformative Impact & Statutory Foundations
              </h2>
            </div>

            {/* Impact 4 Pillars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '14px', padding: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.35rem' }}>Victim Benefits</h4>
                <p style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  Safe, multilingual, faster access to counselling, police protection, free legal aid, and DBT relief.
                </p>
              </div>

              <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '14px', padding: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fbbf24', marginBottom: '0.35rem' }}>Counsellor Benefits</h4>
                <p style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  Prioritize vulnerable cases with personal baseline trends and manage psychiatric follow-ups efficiently.
                </p>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399', marginBottom: '0.35rem' }}>Government Benefits</h4>
                <p style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  Unified coordination across DM, SP, DLSA, and MoSJE with evidence-based resource allocation.
                </p>
              </div>

              <div style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: '14px', padding: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#c084fc', marginBottom: '0.35rem' }}>System-Level Impact</h4>
                <p style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  Transforms passive, occasional follow-ups into continuous, predictive, and accountable victim monitoring.
                </p>
              </div>
            </div>

            {/* Our Promise: 3 Pillars */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '1rem 1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                OUR THREE SACRED PROMISES
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div>
                  <strong style={{ color: '#38bdf8', fontSize: '0.8rem' }}>1. Victim Safety & Privacy First:</strong>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                    Strict consent, safe-contact time preferences, and DPDP Act cryptographic protection.
                  </div>
                </div>
                <div>
                  <strong style={{ color: '#fbbf24', fontSize: '0.8rem' }}>2. AI Supports — Humans Decide:</strong>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                    AI flags potential deterioration; trained psychologists verify risks before any action.
                  </div>
                </div>
                <div>
                  <strong style={{ color: '#34d399', fontSize: '0.8rem' }}>3. Early Detection to Timely Action:</strong>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                    Every verified alert triggers coordinated protection and rehabilitation before a crisis hits.
                  </div>
                </div>
              </div>
            </div>

            {/* Research & References */}
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '14px', padding: '1rem 1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                RESEARCH & STATUTORY CITATIONS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem', fontSize: '0.68rem', color: '#cbd5e1' }}>
                <div>1. National Helpline Against Atrocities (NHAA - 14566) – MoSJE Portal</div>
                <div>2. SC and ST (Prevention of Atrocities) Act, 1989 & Amendment Rules 2016</div>
                <div>3. Tele-MANAS – National Tele Mental Health Programme (MoHFW & NIMHANS)</div>
                <div>4. AI4Bharat – Open-Source Indic Speech & Voice Models (IIT Madras)</div>
                <div>5. DAIC-WOZ – Clinical Distress Analysis and Emotion Detection Corpus</div>
                <div>6. Ministry of Home Affairs – Witness Protection Scheme, 2018</div>
                <div>7. NCRB – Crime in India Annual Statistics (Atrocities Against SC/ST)</div>
              </div>
            </div>

            {/* Final Action */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem' }}>
              <button
                onClick={() => setCurrentSlide(1)}
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem' }}
              >
                ↺ Replay from Slide 1
              </button>

              <button
                onClick={() => {
                  closePitchDeck();
                  setActiveRole('district');
                }}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.65rem 1.5rem', gap: '8px' }}
              >
                <span>Launch Live SAHAYA-360 Platform</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
