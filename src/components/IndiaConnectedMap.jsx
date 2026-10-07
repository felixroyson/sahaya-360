import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import indiaMapData from '@svg-maps/india';

export const IndiaConnectedMap = () => {
  const { setActiveRole, setSelectedCaseId, language = 'en' } = useApp();
  const [hoveredState, setHoveredState] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Curated pastel palette matching the sovereign reference design
  const STATE_COLORS = {
    // 5 Key Active Nodes
    dl: { fill: '#fecdd3', stroke: '#f43f5e', name: 'Delhi (NCR)', active: true },
    mh: { fill: '#99f6e4', stroke: '#0d9488', name: 'Maharashtra', active: true },
    ap: { fill: '#bbf7d0', stroke: '#16a34a', name: 'Andhra Pradesh', active: true },
    kl: { fill: '#fef08a', stroke: '#ca8a04', name: 'Kerala', active: true },
    tn: { fill: '#ddd6fe', stroke: '#7c3aed', name: 'Tamil Nadu', active: true },

    // Northern Crown
    jk: { fill: '#bae6fd', stroke: '#38bdf8', name: 'Jammu & Kashmir / Ladakh' },
    hp: { fill: '#c7d2fe', stroke: '#818cf8', name: 'Himachal Pradesh' },
    pb: { fill: '#fde68a', stroke: '#f59e0b', name: 'Punjab' },
    hr: { fill: '#fed7aa', stroke: '#f97316', name: 'Haryana' },
    ut: { fill: '#d1fae5', stroke: '#34d399', name: 'Uttarakhand' },
    ch: { fill: '#fed7aa', stroke: '#f97316', name: 'Chandigarh' },

    // Western Belt
    rj: { fill: '#fef3c7', stroke: '#d97706', name: 'Rajasthan' },
    gj: { fill: '#fed7aa', stroke: '#ea580c', name: 'Gujarat' },
    ga: { fill: '#fde047', stroke: '#ca8a04', name: 'Goa' },
    dn: { fill: '#e2e8f0', stroke: '#94a3b8', name: 'Dadra & Nagar Haveli' },
    dd: { fill: '#e2e8f0', stroke: '#94a3b8', name: 'Daman & Diu' },

    // Central India
    mp: { fill: '#dcfce7', stroke: '#22c55e', name: 'Madhya Pradesh' },
    up: { fill: '#f1f5f9', stroke: '#cbd5e1', name: 'Uttar Pradesh' },
    ct: { fill: '#e0e7ff', stroke: '#6366f1', name: 'Chhattisgarh' },

    // Eastern India
    br: { fill: '#f8fafc', stroke: '#cbd5e1', name: 'Bihar' },
    jh: { fill: '#e2e8f0', stroke: '#94a3b8', name: 'Jharkhand' },
    wb: { fill: '#ccfbf1', stroke: '#14b8a6', name: 'West Bengal' },
    or: { fill: '#fef9c3', stroke: '#eab308', name: 'Odisha' },
    sk: { fill: '#bae6fd', stroke: '#0284c7', name: 'Sikkim' },

    // Southern Deccan
    tg: { fill: '#dcfce7', stroke: '#16a34a', name: 'Telangana' },
    ka: { fill: '#f0fdf4', stroke: '#86efac', name: 'Karnataka' },
    py: { fill: '#ddd6fe', stroke: '#a855f7', name: 'Puducherry' },

    // Northeast (Seven Sisters)
    as: { fill: '#e0f2fe', stroke: '#0284c7', name: 'Assam' },
    ar: { fill: '#cffafe', stroke: '#06b6d4', name: 'Arunachal Pradesh' },
    ml: { fill: '#e0f2fe', stroke: '#38bdf8', name: 'Meghalaya' },
    mn: { fill: '#dcfce7', stroke: '#22c55e', name: 'Manipur' },
    mz: { fill: '#fef3c7', stroke: '#f59e0b', name: 'Mizoram' },
    nl: { fill: '#fef9c3', stroke: '#eab308', name: 'Nagaland' },
    tr: { fill: '#fed7aa', stroke: '#f97316', name: 'Tripura' },

    // Islands
    an: { fill: '#bae6fd', stroke: '#38bdf8', name: 'Andaman & Nicobar Islands' },
    ld: { fill: '#bae6fd', stroke: '#38bdf8', name: 'Lakshadweep' }
  };

  // Authentic Multilingual Callout Annotations for the 5 Active Regional Hubs
  const NODE_ANNOTATIONS = {
    delhi: {
      en: ['National', 'Atrocity Cell', 'Helpline 14566'],
      hi: ['राष्ट्रीय', 'अत्याचार सेल', 'हेल्पलाइन 14566'],
      mr: ['राष्ट्रीय', 'अत्याचार कक्ष', 'हेल्पलाइन 14566'],
      ta: ['தேசிய', 'கொடுமை தடுப்பு', 'உதவி எண் 14566'],
      te: ['జాతీయ', 'అత్యాచార విభాగం', 'హెల్ప్‌లైన్ 14566']
    },
    maharashtra: {
      en: ['Zero-FIR', 'Special Police', 'Protection'],
      hi: ['जीरो-एफआईआर', 'विशेष पुलिस', 'सुरक्षा'],
      mr: ['झिरो-एफआयआर', 'विशेष पोलीस', 'सुरक्षा'],
      ta: ['ஜீரோ-எஃப்ஐஆர்', 'சிறப்பு போலீஸ்', 'பாதுகாப்பு'],
      te: ['జీరో-ఎఫ్ఐఆర్', 'ప్రత్యేక పోలీస్', 'రక్షణ']
    },
    andhra: {
      en: ['Statutory', 'DBT Relief', 'Sanctioned'],
      hi: ['वैधानिक', 'डीबीटी राहत', 'मंजूर'],
      mr: ['वैधानिक', 'डीबीटी भरपाई', 'मंजूर'],
      ta: ['சட்டபூர்வ', 'டிபிடி நிவாரணம்', 'ஒப்புதல்'],
      te: ['చట్టబద్ధమైన', 'డీబీటీ పరిహారం', 'మంజూరు']
    },
    kerala: {
      en: ['24×7 Rapid', 'Distress', 'Dispatch'],
      hi: ['24×7 त्वरित', 'संकट निवारण', 'दस्ता'],
      mr: ['24×7 तातडीने', 'मदत व बचाव', 'कार्यवाही'],
      ta: ['24×7 விரைவு', 'துயர் துடைப்பு', 'அணி'],
      te: ['24×7 సత్వర', 'సహాయక', 'బృందం']
    },
    tamilnadu: {
      en: ['Sec 15A', 'Witness', 'Protection'],
      hi: ['धारा 15A', 'गवाह एवं पीड़ित', 'संरक्षण'],
      mr: ['कलम 15A', 'साक्षीदार', 'संरक्षण'],
      ta: ['பிரிவு 15A', 'சாட்சி', 'பாதுகாப்பு'],
      te: ['సెక్షన్ 15A', 'సాక్షుల', 'సంరక్షణ']
    }
  };

  // 5 Active Callout Nodes with precise geographical pin coordinates on the authentic India SVG map
  const nodes = [
    {
      id: 'delhi',
      stateId: 'dl',
      name: 'Delhi',
      state: 'National Capital Region',
      pinColor: '#ef4444',
      pinX: 186,
      pinY: 210,
      linePath: 'M 186,210 Q 340,110 475,80',
      avatarX: 475,
      avatarY: 35,
      avatarWidth: 260,
      avatarHeight: 110,
      layout: 'horizontal',
      avatarImg: '/avatars/avatar_top_right.jpg',
      scriptLines: NODE_ANNOTATIONS.delhi[language] || NODE_ANNOTATIONS.delhi.en,
      scriptRotation: '-2deg',
      subText: 'Delhi Apex Nodal Command',
      caseId: 'NHAA-2026-894'
    },
    {
      id: 'maharashtra',
      stateId: 'mh',
      name: 'Maharashtra',
      state: 'Western Vigilance Zone',
      pinColor: '#0284c7',
      pinX: 168,
      pinY: 425,
      linePath: 'M 168,425 Q 70,400 0,355',
      avatarX: -70,
      avatarY: 300,
      avatarWidth: 200,
      avatarHeight: 170,
      layout: 'vertical',
      avatarImg: '/avatars/avatar_mid_left.jpg',
      scriptLines: NODE_ANNOTATIONS.maharashtra[language] || NODE_ANNOTATIONS.maharashtra.en,
      scriptRotation: '-3deg',
      subText: 'Maharashtra Joint Vigilance Desk',
      caseId: 'NHAA-2026-894'
    },
    {
      id: 'andhra',
      stateId: 'ap',
      name: 'Andhra Pradesh',
      state: 'Central Monitoring Desk',
      pinColor: '#16a34a',
      pinX: 270,
      pinY: 495,
      linePath: 'M 270,495 Q 395,475 480,445',
      avatarX: 480,
      avatarY: 390,
      avatarWidth: 220,
      avatarHeight: 170,
      layout: 'vertical',
      avatarImg: '/avatars/avatar_mid_right.jpg',
      scriptLines: NODE_ANNOTATIONS.andhra[language] || NODE_ANNOTATIONS.andhra.en,
      scriptRotation: '2deg',
      subText: 'Andhra AI Clinical Triage',
      caseId: 'NHAA-2026-651'
    },
    {
      id: 'kerala',
      stateId: 'kl',
      name: 'Kerala',
      state: 'Southern Safe Contact Cell',
      pinColor: '#d97706',
      pinX: 175,
      pinY: 605,
      linePath: 'M 175,605 Q 70,575 0,545',
      avatarX: -70,
      avatarY: 495,
      avatarWidth: 200,
      avatarHeight: 155,
      layout: 'vertical',
      avatarImg: '/avatars/avatar_bot_left.jpg',
      scriptLines: NODE_ANNOTATIONS.kerala[language] || NODE_ANNOTATIONS.kerala.en,
      scriptRotation: '-2deg',
      subText: 'Kerala DLSA Legal Aid & Relief',
      caseId: 'NHAA-2026-412'
    },
    {
      id: 'tamilnadu',
      stateId: 'tn',
      name: 'Tamil Nadu',
      state: 'Special Court Fast-Track Liaison',
      pinColor: '#7c3aed',
      pinX: 225,
      pinY: 605,
      linePath: 'M 225,605 Q 335,595 435,570',
      avatarX: 435,
      avatarY: 530,
      avatarWidth: 260,
      avatarHeight: 110,
      layout: 'horizontal',
      avatarImg: '/avatars/avatar_bot_right.jpg',
      scriptLines: NODE_ANNOTATIONS.tamilnadu[language] || NODE_ANNOTATIONS.tamilnadu.en,
      scriptRotation: '1deg',
      subText: 'Tamil Nadu Statutory Relief Tracking',
      caseId: 'NHAA-2026-339'
    }
  ];

  const handleNodeClick = (node) => {
    if (node.caseId) {
      setSelectedCaseId(node.caseId);
      setActiveRole('district');
    }
  };

  const handleStateClick = (loc) => {
    const matchedNode = nodes.find(n => n.stateId === loc.id);
    if (matchedNode) {
      handleNodeClick(matchedNode);
    } else {
      setActiveRole('district');
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '680px',
      minWidth: '680px',
      maxWidth: '680px',
      height: '570px',
      minHeight: '570px',
      maxHeight: '570px',
      margin: '0 auto',
      userSelect: 'none',
      flexShrink: 0,
      overflow: 'hidden'
    }}>

      {/* Interactive Real Geographic SVG Canvas with Rock-Solid Fixed Sizing */}
      <svg
        viewBox="-130 -30 900 730"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <filter id="realMapShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0284c7" floodOpacity="0.10" />
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.06" />
          </filter>

          {/* Pulse marker animations */}
          <radialGradient id="delhiGlow">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Real Authentic India Geographic Boundaries */}
        <g filter="url(#realMapShadow)">
          {indiaMapData.locations.map((loc) => {
            const styling = STATE_COLORS[loc.id] || { fill: '#f1f5f9', stroke: '#ffffff', name: loc.name };
            const isHovered = hoveredState === loc.id;
            const isFeatured = nodes.some(n => n.stateId === loc.id);

            return (
              <path
                key={loc.id}
                id={loc.id}
                d={loc.path}
                fill={isHovered ? '#38bdf8' : styling.fill}
                stroke={isHovered ? '#0284c7' : '#ffffff'}
                strokeWidth={isHovered ? '2' : isFeatured ? '1.4' : '1'}
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{
                  cursor: 'pointer',
                  transition: 'fill 0.25s ease, stroke 0.25s ease, opacity 0.25s ease',
                  opacity: hoveredState && !isHovered ? 0.85 : 1
                }}
                onMouseEnter={() => {
                  setHoveredState(loc.id);
                  const matched = nodes.find(n => n.stateId === loc.id);
                  setActiveTooltip(matched || { name: styling.name, subText: 'Operational Territory • MoSJE' });
                }}
                onMouseLeave={() => {
                  setHoveredState(null);
                  setActiveTooltip(null);
                }}
                onClick={() => handleStateClick(loc)}
              />
            );
          })}
        </g>

        {/* Dotted Curved Trajectory Lines (Matching screenshot exact paths) */}
        {nodes.map(node => (
          <path
            key={`line-${node.id}`}
            d={node.linePath}
            fill="none"
            stroke="#0284c7"
            strokeWidth="2"
            strokeDasharray="5 5"
            style={{ pointerEvents: 'none' }}
          />
        ))}

        {/* State Location Pins with Animated Radiating Pulse Rings */}
        {nodes.map(node => (
          <g
            key={`pin-${node.id}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleNodeClick(node)}
            onMouseEnter={() => setActiveTooltip(node)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            {/* Outer expanding pulse circle */}
            <circle cx={node.pinX} cy={node.pinY} r="14" fill={node.pinColor} opacity="0.22">
              <animate attributeName="r" values="10;18;10" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0.05;0.35" dur="2.4s" repeatCount="indefinite" />
            </circle>

            {/* Solid Pin Head */}
            <circle cx={node.pinX} cy={node.pinY} r="6.5" fill={node.pinColor} stroke="#ffffff" strokeWidth="2.2" />
            <circle cx={node.pinX} cy={node.pinY} r="2.5" fill="#ffffff" />

            {/* Pin State Label */}
            <text
              x={node.id === 'maharashtra' ? node.pinX + 10 : node.id === 'kerala' ? node.pinX + 11 : node.id === 'tamilnadu' ? node.pinX + 10 : node.pinX + 10}
              y={node.id === 'kerala' ? node.pinY + 4 : node.pinY + 4}
              fontSize="11"
              fontWeight="800"
              fill="#0f172a"
              fontFamily="var(--font-sans)"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(255,255,255,0.95))', pointerEvents: 'none' }}
            >
              {node.name}
            </text>
          </g>
        ))}

        {/* Connected Circular Avatars & Handwritten Script Annotations */}
        {nodes.map(node => (
          <foreignObject
            key={`avatar-${node.id}`}
            x={node.avatarX}
            y={node.avatarY}
            width={node.avatarWidth}
            height={node.avatarHeight}
            style={{ overflow: 'hidden' }}
          >
            {node.layout === 'horizontal' ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => handleNodeClick(node)}
                title={`View ${node.name} Command & Triage Dossier`}
              >
                <img
                  src={node.avatarImg}
                  alt={node.name}
                  className="avatar-circle-img"
                />
                <div
                  className="script-text"
                  style={{
                    transform: `rotate(${node.scriptRotation})`,
                    color: '#1e293b'
                  }}
                >
                  {node.scriptLines.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '6px',
                  cursor: 'pointer'
                }}
                onClick={() => handleNodeClick(node)}
                title={`View ${node.name} Command & Triage Dossier`}
              >
                <img
                  src={node.avatarImg}
                  alt={node.name}
                  className="avatar-circle-img"
                  style={{ alignSelf: node.id === 'andhra' ? 'flex-start' : 'center' }}
                />
                <div
                  className="script-text"
                  style={{
                    transform: `rotate(${node.scriptRotation})`,
                    color: '#1e293b',
                    textAlign: 'left',
                    marginLeft: node.id === 'andhra' ? '0' : '4px'
                  }}
                >
                  {node.scriptLines.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </div>
            )}
          </foreignObject>
        ))}
      </svg>

      {/* Floating State Intelligence Tooltip */}
      {activeTooltip && (
        <div style={{
          position: 'absolute',
          bottom: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(15, 23, 42, 0.96)',
          backdropFilter: 'blur(12px)',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '8px 16px',
          fontSize: '0.8rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 30,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: activeTooltip.pinColor || '#38bdf8' }} />
          <span><strong>{activeTooltip.name}</strong> • {activeTooltip.subText || 'National MoSJE Grid'}</span>
          <span style={{ color: '#38bdf8', fontSize: '0.72rem', fontWeight: 600 }}>Click to explore →</span>
        </div>
      )}

    </div>
  );
};

export default IndiaConnectedMap;
