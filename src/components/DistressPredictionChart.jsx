import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  AlertTriangle, 
  Calendar, 
  ShieldAlert, 
  Info, 
  Sparkles 
} from 'lucide-react';

export const DistressPredictionChart = ({ caseItem }) => {
  const { selectedCase, openXAI, openDispatch } = useApp();
  const targetCase = caseItem || selectedCase;

  const [hoveredPoint, setHoveredPoint] = useState(null);

  const history = targetCase.longitudinalHistory || [];
  const forecast = targetCase.predictiveForecast || [];

  // Chart dimensions
  const chartWidth = 720;
  const chartHeight = 220;
  const paddingX = 45;
  const paddingY = 25;

  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingY * 2;

  const totalPoints = history.length + forecast.length;

  const getX = (index) => {
    return paddingX + (index / (totalPoints - 1)) * innerWidth;
  };

  const getY = (score) => {
    // 0 is bottom (chartHeight - paddingY), 100 is top (paddingY)
    const normalized = Math.min(100, Math.max(0, score)) / 100;
    return (chartHeight - paddingY) - (normalized * innerHeight);
  };

  // Build SVG path for history
  const historyPath = history.reduce((acc, pt, idx) => {
    const x = getX(idx);
    const y = getY(pt.score);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  // Build SVG path for forecast
  const lastHistIdx = history.length - 1;
  const forecastPath = forecast.reduce((acc, pt, idx) => {
    const globalIdx = lastHistIdx + 1 + idx;
    const x = getX(globalIdx);
    const y = getY(pt.projectedScore);
    if (idx === 0) {
      const prevX = getX(lastHistIdx);
      const prevY = getY(history[lastHistIdx].score);
      return `M ${prevX} ${prevY} L ${x} ${y}`;
    }
    return `${acc} L ${x} ${y}`;
  }, "");

  // Area under forecast for confidence band
  const upperBandPoints = forecast.map((pt, idx) => {
    const globalIdx = lastHistIdx + 1 + idx;
    return `${getX(globalIdx)},${getY(pt.confidenceUpper || pt.projectedScore + 5)}`;
  });
  const lowerBandPoints = [...forecast].reverse().map((pt, idx) => {
    const globalIdx = totalPoints - 1 - idx;
    return `${getX(globalIdx)},${getY(pt.confidenceLower || pt.projectedScore - 5)}`;
  });
  const prevHistPt = `${getX(lastHistIdx)},${getY(history[lastHistIdx].score)}`;
  const confidencePolygon = [prevHistPt, ...upperBandPoints, ...lowerBandPoints].join(" ");

  return (
    <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="#dc2626" />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
              Dynamic Distress Score (DDS) & 14-Day Predictive Crisis Curve
            </h3>
            <span className="badge badge-critical" style={{ fontSize: '0.65rem' }}>
              {targetCase.riskCategory} RISK
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '3px' }}>
            Longitudinal trend tracking correlated with court dates, witness intimidation, and recovery interventions
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '6px', flexWrap: 'wrap' }}>
            <span className="badge badge-ashoka" style={{ fontSize: '0.68rem', background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', fontWeight: 700 }}>Pillar 3: Early Distress Escalation</span>
            <span style={{ fontSize: '0.74rem', color: '#475569' }}>
              Personal Baseline: <strong style={{ color: '#16a34a' }}>{targetCase.personalBaselineDistress || 28}</strong> • Meaningful Escalation: <strong style={{ color: '#dc2626' }}>+{targetCase.baselineDelta || (targetCase.dynamicDistressScore - (targetCase.personalBaselineDistress || 28))} pts</strong>
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            className="btn btn-outline-ashoka" 
            onClick={() => openXAI(targetCase)}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', gap: '4px' }}
          >
            <Sparkles size={13} />
            <span>Explain AI Factors</span>
          </button>

          <button 
            className="btn btn-primary" 
            onClick={() => openDispatch(targetCase)}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.85rem' }}
          >
            Dispatch Intervention
          </button>
        </div>
      </div>

      {/* SVG Chart Box */}
      <div style={{ position: 'relative', width: '100%', overflowX: 'auto', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0' }}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            {/* Background Risk Zone Gradients */}
            <linearGradient id="chartLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#0284c7" />
              <stop offset="70%" stop-color="#ea580c" />
              <stop offset="100%" stop-color="#dc2626" />
            </linearGradient>

            <linearGradient id="forecastGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ea580c" stop-opacity="0.2" />
              <stop offset="100%" stop-color="#dc2626" stop-opacity="0.4" />
            </linearGradient>
          </defs>

          {/* Horizontal Danger Threshold Zones */}
          {/* Critical Zone (80-100) */}
          <rect x={paddingX} y={getY(100)} width={innerWidth} height={getY(80) - getY(100)} fill="rgba(239, 68, 68, 0.08)" />
          {/* High Zone (65-80) */}
          <rect x={paddingX} y={getY(80)} width={innerWidth} height={getY(65) - getY(80)} fill="rgba(249, 115, 22, 0.05)" />
          {/* Moderate Zone (35-65) */}
          <rect x={paddingX} y={getY(65)} width={innerWidth} height={getY(35) - getY(65)} fill="rgba(245, 158, 11, 0.03)" />
          {/* Low Zone (0-35) */}
          <rect x={paddingX} y={getY(35)} width={innerWidth} height={getY(0) - getY(35)} fill="rgba(16, 185, 129, 0.03)" />

          {/* Horizontal Grid lines */}
          {[20, 40, 60, 80, 100].map(val => (
            <g key={val}>
              <line 
                x1={paddingX} 
                y1={getY(val)} 
                x2={chartWidth - paddingX} 
                y2={getY(val)} 
                stroke="rgba(0,0,0,0.06)" 
                strokeDasharray="3 3" 
              />
              <text 
                x={paddingX - 8} 
                y={getY(val) + 4} 
                fill="#64748b" 
                fontSize="10" 
                textAnchor="end" 
                fontFamily="var(--font-mono)"
              >
                {val}
              </text>
            </g>
          ))}

          {/* Pillar 3: Personal Baseline Reference Line */}
          {targetCase.personalBaselineDistress && (
            <g>
              <line 
                x1={paddingX} 
                y1={getY(targetCase.personalBaselineDistress)} 
                x2={chartWidth - paddingX} 
                y2={getY(targetCase.personalBaselineDistress)} 
                stroke="#16a34a" 
                strokeDasharray="5 3" 
                strokeWidth="1.5" 
              />
              <rect
                x={chartWidth - paddingX - 195}
                y={getY(targetCase.personalBaselineDistress) - 14}
                width="190"
                height="13"
                fill="#dcfce7"
                rx="3"
                stroke="#86efac"
              />
              <text
                x={chartWidth - paddingX - 5}
                y={getY(targetCase.personalBaselineDistress) - 4}
                fill="#15803d"
                fontSize="8.5"
                fontWeight="bold"
                textAnchor="end"
              >
                Personal Baseline ({targetCase.personalBaselineDistress}) • Δ +{targetCase.baselineDelta || (targetCase.dynamicDistressScore - targetCase.personalBaselineDistress)} pts
              </text>
            </g>
          )}

          {/* Vertical Separator between Historical and Forecast */}
          <line
            x1={getX(lastHistIdx)}
            y1={paddingY}
            x2={getX(lastHistIdx)}
            y2={chartHeight - paddingY}
            stroke="#0284c7"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <text
            x={getX(lastHistIdx) - 6}
            y={paddingY + 12}
            fill="#0284c7"
            fontSize="9"
            fontWeight="bold"
            textAnchor="end"
          >
            HISTORICAL LOGS
          </text>
          <text
            x={getX(lastHistIdx) + 6}
            y={paddingY + 12}
            fill="#dc2626"
            fontSize="9"
            fontWeight="bold"
            textAnchor="start"
          >
            AI FORECAST (14 DAYS)
          </text>

          {/* Forecast Confidence Area */}
          <polygon
            points={confidencePolygon}
            fill="rgba(239, 68, 68, 0.1)"
          />

          {/* Historical Path */}
          <path
            d={historyPath}
            fill="none"
            stroke="url(#chartLineGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Forecast Path (Dashed) */}
          <path
            d={forecastPath}
            fill="none"
            stroke="#dc2626"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Historical Data Points */}
          {history.map((pt, idx) => {
            const cx = getX(idx);
            const cy = getY(pt.score);
            const isHovered = hoveredPoint?.type === 'hist' && hoveredPoint.index === idx;

            return (
              <g 
                key={`hist-${idx}`}
                onMouseEnter={() => setHoveredPoint({ type: 'hist', index: idx, data: pt, x: cx, y: cy })}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : (idx === lastHistIdx ? 5 : 3.5)}
                  fill={pt.score >= 80 ? '#dc2626' : pt.score >= 65 ? '#ea580c' : pt.score >= 35 ? '#d97706' : '#16a34a'}
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 2 : 1}
                />
                <text
                  x={cx}
                  y={chartHeight - paddingY + 14}
                  fill="#475569"
                  fontSize="8.5"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {pt.day}
                </text>
              </g>
            );
          })}

          {/* Forecast Data Points */}
          {forecast.map((pt, idx) => {
            const globalIdx = lastHistIdx + 1 + idx;
            const cx = getX(globalIdx);
            const cy = getY(pt.projectedScore);
            const isHovered = hoveredPoint?.type === 'fore' && hoveredPoint.index === idx;

            return (
              <g 
                key={`fore-${idx}`}
                onMouseEnter={() => setHoveredPoint({ type: 'fore', index: idx, data: pt, x: cx, y: cy })}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              >
                {pt.event && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={10}
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 4}
                  fill="#dc2626"
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 2 : 1}
                />
                <text
                  x={cx}
                  y={chartHeight - paddingY + 14}
                  fill="#dc2626"
                  fontSize="8.5"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {pt.day}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div style={{
            position: 'absolute',
            left: `${Math.min(chartWidth - 200, Math.max(20, hoveredPoint.x - 70))}px`,
            top: `${Math.max(10, hoveredPoint.y - 65)}px`,
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '8px 12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            pointerEvents: 'none',
            zIndex: 10,
            fontSize: '0.74rem',
            minWidth: '150px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#0f172a', marginBottom: '2px' }}>
              <span>{hoveredPoint.data.day}</span>
              <span style={{ color: (hoveredPoint.data.score || hoveredPoint.data.projectedScore) >= 80 ? '#dc2626' : '#0284c7' }}>
                Score: {hoveredPoint.data.score || hoveredPoint.data.projectedScore}
              </span>
            </div>
            <div style={{ color: '#475569', fontSize: '0.7rem' }}>
              {hoveredPoint.data.note || hoveredPoint.data.event || 'Projected trend without intervention'}
            </div>
          </div>
        )}
      </div>

      {/* Trajectory Insight Callout */}
      <div style={{
        marginTop: '0.85rem',
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: 'var(--radius-sm)',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertTriangle size={18} color="#dc2626" />
          <div style={{ fontSize: '0.76rem', color: '#991b1b', lineHeight: 1.45 }}>
            <strong>Crisis Escalation Prediction:</strong> Victim escalated <strong style={{ color: '#b91c1c' }}>+{targetCase.baselineDelta || 56} pts</strong> from personal baseline ({targetCase.personalBaselineDistress || 28}). Without armed witness protection, DDS is projected to spike to <strong style={{ color: '#b91c1c' }}>96/100</strong> on the {targetCase.nextCourtDate.split(' ')[0]} trial date.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.74rem', color: '#64748b' }}>
          <span>Current DDS: <strong style={{ color: '#dc2626', fontSize: '0.95rem' }}>{targetCase.dynamicDistressScore}</strong>/100</span>
          <span>•</span>
          <span>Next Court: <strong style={{ color: '#0f172a' }}>{targetCase.nextCourtDate}</strong></span>
        </div>
      </div>

    </div>
  );
};
