import React from 'react';
import { useApp } from '../context/AppContext';
import { CloudSun, ArrowLeft, RefreshCw, Calculator, SunMedium } from 'lucide-react';

export const DiscreetCamouflageOverlay = () => {
  const { isDiscreetCamouflage, toggleDiscreetCamouflage } = useApp();

  if (!isDiscreetCamouflage) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#f8fafc',
      color: '#1e293b',
      zIndex: 100000,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Camouflage Header */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SunMedium size={24} color="#f59e0b" />
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
            Daily Regional Weather & Mandi Bhav Portal
          </span>
        </div>

        {/* Discreet Return Button */}
        <button
          onClick={toggleDiscreetCamouflage}
          style={{
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '6px 14px',
            fontSize: '0.75rem',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          title="Press Esc or click to return to safe session"
        >
          <ArrowLeft size={14} />
          <span>Exit Camouflage (Esc)</span>
        </button>
      </header>

      {/* Camouflage Content Body */}
      <main style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem', width: '100%' }}>
        
        {/* Weather Card */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Current Location: Northern Plains District</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>31°C</div>
              <div style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>Partly Cloudy • Humidity 58% • Air Quality: Moderate (AQI 94)</div>
            </div>
            <CloudSun size={64} color="#38bdf8" />
          </div>
        </div>

        {/* Agriculture Rates */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
            Daily Agricultural Produce Market Committee (APMC) Rates (₹/Quintal)
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '8px' }}>Commodity</th>
                <th style={{ padding: '8px' }}>Market</th>
                <th style={{ padding: '8px' }}>Arrivals</th>
                <th style={{ padding: '8px' }}>Modal Price</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 8px', fontWeight: 600 }}>Wheat (Dara)</td>
                <td style={{ padding: '10px 8px' }}>District Main Mandi</td>
                <td style={{ padding: '10px 8px' }}>420 MT</td>
                <td style={{ padding: '10px 8px', color: '#059669', fontWeight: 700 }}>₹2,275 / Qtl</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 8px', fontWeight: 600 }}>Mustard (Sarson)</td>
                <td style={{ padding: '10px 8px' }}>Sub-Mandi Yard</td>
                <td style={{ padding: '10px 8px' }}>180 MT</td>
                <td style={{ padding: '10px 8px', color: '#059669', fontWeight: 700 }}>₹5,450 / Qtl</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 8px', fontWeight: 600 }}>Paddy (Basmati 1509)</td>
                <td style={{ padding: '10px 8px' }}>Grain Market</td>
                <td style={{ padding: '10px 8px' }}>310 MT</td>
                <td style={{ padding: '10px 8px', color: '#059669', fontWeight: 700 }}>₹3,180 / Qtl</td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
};
