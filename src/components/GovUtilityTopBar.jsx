import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';

const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' }
];

export const GovUtilityTopBar = () => {
  const { language, setLanguage, fontSizeScale = 1.0, setFontSizeScale } = useApp ? useApp() : {};
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentFontScale, setCurrentFontScale] = useState(() => {
    try {
      const stored = localStorage.getItem('sahaya_font_scale');
      return stored ? parseFloat(stored) : (fontSizeScale || 1.0);
    } catch {
      return fontSizeScale || 1.0;
    }
  });

  const langDropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle font scale adjustment
  const handleFontScale = (scale) => {
    setCurrentFontScale(scale);
    if (setFontSizeScale) {
      setFontSizeScale(scale);
    }
    try {
      localStorage.setItem('sahaya_font_scale', scale.toString());
      if (typeof document !== 'undefined') {
        document.documentElement.style.fontSize = `${scale * 100}%`;
      }
    } catch {}
  };

  // Handle skip to main content
  const handleSkipToMain = () => {
    const mainEl = document.getElementById('main-content') || 
                   document.querySelector('main') || 
                   document.getElementById('about-section') || 
                   document.querySelector('.hero-two-column-layout') ||
                   document.querySelector('.console-main-content');
    if (mainEl) {
      mainEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mainEl.setAttribute('tabindex', '-1');
      mainEl.focus();
    } else {
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === (language || 'en')) || SUPPORTED_LANGUAGES[0];

  return (
    <div 
      className="gov-utility-topbar"
      style={{
        background: '#0B1A30',
        color: '#CBD5E1',
        fontSize: '0.72rem',
        padding: '5px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        zIndex: 500,
        width: '100%',
        boxSizing: 'border-box',
        userSelect: 'none'
      }}
    >
      {/* Left: Sovereign Government Credentials */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <img 
            src="/indian_flag.png" 
            alt="National Flag of India" 
            style={{ 
              width: '18px', 
              height: '12px', 
              objectFit: 'cover', 
              borderRadius: '1px', 
              boxShadow: '0 0 2px rgba(0,0,0,0.4)',
              display: 'inline-block' 
            }} 
          />
          <strong style={{ color: '#FFFFFF', letterSpacing: '0.01em' }}>
            {t('gov_india', language) || 'Government of India'}
          </strong>
        </span>
        <span style={{ color: '#64748B' }}>|</span>
        <span style={{ color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {t('ministry_name', language) || 'Ministry of Social Justice & Empowerment'}
        </span>
      </div>

      {/* Right: Accessibility Controls & Multilingual Language Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
        {/* 1. Skip to Main Content Button */}
        <button
          type="button"
          onClick={handleSkipToMain}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#94A3B8',
            fontSize: '0.72rem',
            fontWeight: 500,
            padding: '2px 6px',
            borderRadius: '4px',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.textDecoration = 'none'; }}
          title={t('skip_to_main', language) || 'Skip to Main Content'}
          aria-label={t('skip_to_main', language) || 'Skip to Main Content'}
        >
          {t('skip_to_main', language) || 'Skip to Main Content'}
        </button>

        {/* 2. Accessibility Font Sizing Controls (A- A A+) */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2px', 
            background: 'rgba(255,255,255,0.06)', 
            borderRadius: '5px', 
            padding: '1px 3px',
            border: '1px solid rgba(255,255,255,0.1)' 
          }}
          role="group"
          aria-label="Font sizing controls"
        >
          {[
            { scale: 0.9, label: 'A-', title: t('font_decrease', language) || 'Decrease font size' },
            { scale: 1.0, label: 'A', title: t('font_normal', language) || 'Normal font size' },
            { scale: 1.15, label: 'A+', title: t('font_increase', language) || 'Increase font size' }
          ].map(item => {
            const isActive = Math.abs(currentFontScale - item.scale) < 0.05;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleFontScale(item.scale)}
                style={{
                  background: isActive ? '#0284C7' : 'transparent',
                  border: 'none',
                  borderRadius: '3px',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.72rem',
                  padding: '2px 7px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#94A3B8';
                }}
                title={item.title}
                aria-pressed={isActive}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* 3. Multilingual Dropdown (English ▼) */}
        <div style={{ position: 'relative' }} ref={langDropdownRef}>
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            style={{
              background: isLangOpen ? 'rgba(255,255,255,0.12)' : 'transparent',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: '5px',
              color: '#CBD5E1',
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '2px 8px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={(e) => { if (!isLangOpen) { e.currentTarget.style.color = '#CBD5E1'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'; } }}
            aria-expanded={isLangOpen}
            aria-haspopup="listbox"
            title="Select Language / भाषा चुनें / மொழியைத் தேர்ந்தெடுக்கவும்"
          >
            <span>{currentLangObj.native}</span>
            <span style={{ fontSize: '0.58rem', opacity: 0.8 }}>▼</span>
          </button>

          {isLangOpen && (
            <div 
              style={{
                position: 'absolute',
                top: '125%',
                right: 0,
                background: '#0B1A30',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.55)',
                minWidth: '135px',
                padding: '4px 0',
                zIndex: 1000,
                animation: 'fadeIn 0.15s ease-out forwards'
              }}
              role="listbox"
            >
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = lang.code === (language || 'en');
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      if (setLanguage) setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '6px 12px',
                      background: isSelected ? 'rgba(2, 132, 199, 0.25)' : 'transparent',
                      color: isSelected ? '#38BDF8' : '#E2E8F0',
                      border: 'none',
                      fontSize: '0.74rem',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'transparent';
                    }}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span>{lang.native}</span>
                    {isSelected && <span style={{ color: '#38BDF8', fontSize: '0.7rem' }}>✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
