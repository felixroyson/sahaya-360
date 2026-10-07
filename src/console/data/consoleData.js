// Synthetic Demonstration Data for SAHAYA-360 Core Operational Platform
// Smart India Hackathon 2026 | Problem Statement ID: 26094
// Theme: MedTech / BioTech / HealthTech | Team: Slytherin
// All identities, case records, scores, and statistics are synthetic demonstration data.

export const DEMO_CASE_ID = "NHAA-DEMO-001";

export const SYNTHETIC_CASES = [
  {
    id: "NHAA-DEMO-001",
    caseNumber: "NHAA-2026-894",
    citizenName: "Protected Citizen A (Ramesh Kumar)",
    gender: "Male",
    age: 38,
    district: "Aligarh",
    state: "Uttar Pradesh",
    location: "Aligarh, Uttar Pradesh",
    actCategory: "SC/ST (PoA) Act Sec 3(1)(r)(s), 3(2)(v) & IPC 307/326",
    firNumber: "FIR No. 412/2026 - PS Sasni Gate",
    caseType: "Witness Facing Severe Intimidation / Grievous Hurt",
    priority: "CRITICAL",
    status: "CRITICAL — REVIEW REQUIRED",
    registrationDate: "2026-06-14",
    currentStage: "Charge Sheet Filed | Trial Commencement",
    nextCourtDate: "2026-09-18 (In 6 Days)",
    assignedCounsellor: "Dr. Ananya Sharma (Clinical Counsellor)",
    assignedOfficer: "Shri Rajesh Verma, IAS (District Officer / DM)",
    policeProtectionStatus: "Beat Constable Patrol (Inadequate - Review Required)",
    compensationDisbursed: "₹4,25,000 / ₹8,50,000 (50% Disbursed)",

    // Core Risk Metrics
    currentScore: 84, // Dynamic Distress Signal (DDS)
    baselineScore: 28, // Personal baseline
    deviation: "+56",
    confidence: 87,
    modelVersion: "DDS Prototype v1.2",
    lastCheckIn: "32 minutes ago",
    lastChannel: "IVRS 14566",
    trend: "RISING_SHARP",

    // Safe Contact Protocol Preferences
    safeContact: {
      preferredChannel: "IVRS (14566 Automated)",
      safeTimeWindow: "10:30 AM - 12:30 PM",
      discreetNotification: true,
      quickExitArmed: true,
      alternateContact: "SMS Pulse"
    },

    // Case Status Workflow
    workflow: {
      complaint: "Registered",
      assessment: "Completed",
      counselling: "Active",
      protection: "Review Required",
      legalAssistance: "Connected",
      followUp: "Scheduled"
    },

    // Top Contributing Signals (Summary)
    topSignals: [
      "Reported threat from accused kin",
      "Court hearing approaching (in 6 days)",
      "Reduced check-in engagement (38% hesitation)",
      "Increased self-reported distress"
    ],

    // Contributing Signals for Explainable Risk Drawer (SHAP/LIME style)
    contributingSignals: [
      { name: "Court event proximity", weight: 18, desc: "Sessions Court trial hearing scheduled in 6 days; perpetrators currently on bail." },
      { name: "Reported threat", weight: 16, desc: "Direct intimidation statement recorded during morning 14566 check-in: 'threatened to burn hut'." },
      { name: "Reduced engagement", weight: 11, desc: "3 consecutive missed pulse windows and 38.2% speech hesitation ratio." },
      { name: "Self-reported distress", weight: 9, desc: "Survivor indicated 'I don't feel safe' with severe sleep disruption." },
      { name: "Recent case event", weight: 8, desc: "Co-accused bail petition accepted by Additional Sessions Judge." }
    ],

    // Multi-dimensional distress signals
    voiceMetrics: {
      pitchTremorHz: 14.8,
      normalPitchTremorHz: "< 5.0",
      jitterPercent: 3.4,
      normalJitter: "< 1.04%",
      shimmerPercent: 7.9,
      pauseRatioPercent: 38.2,
      speechRateWPM: 86,
      audioTranscript: "They intercepted my son near the tube well yesterday evening. They told him if I give evidence in the Sessions Court next Thursday, our hut will be burned again. I cannot sleep. My hands are shaking. Who will protect my family?"
    },

    sentimentMetrics: {
      overallSentiment: "High Acute Terror & Helplessness",
      fearScore: 92,
      threatPerceptionScore: 95,
      isolationScore: 78,
      detectedKeywords: ["burned again", "intercepted my son", "hands shaking", "court next Thursday"]
    },

    // Timeline
    timeline: [
      { id: "T1", date: "14 JUN 2026", title: "Complaint registered", source: "14566 National Helpline", status: "Verified", type: "complaint" },
      { id: "T2", date: "20 JUN 2026", title: "Initial assessment completed", source: "Tele-MANAS Clinical Desk", dds: 31, status: "Baseline Established (28)", type: "assessment" },
      { id: "T3", date: "18 AUG 2026", title: "Threat reported by survivor", source: "Helpline 14566", status: "Flagged to District Cell", type: "threat" },
      { id: "T4", date: "03 SEP 2026", title: "Distress escalation detected", source: "DDS Predictive AI v1.2", dds: 84, status: "Critical Alert Generated", type: "escalation" },
      { id: "T5", date: "05 SEP 2026", title: "Counsellor reviewed alert", source: "Dr. Ananya Sharma", status: "Confirmed Concern (+56 Delta)", type: "review" },
      { id: "T6", date: "06 SEP 2026", title: "Protection intervention created", source: "District Clinical Triage", status: "Assigned to District Officer", type: "intervention" }
    ],

    // Check-in History
    checkIns: [
      { id: "C1", date: "SEP 10", text: "I am feeling okay.", mood: "Neutral", channel: "Mobile App", score: 32 },
      { id: "C2", date: "SEP 11", text: "I am worried about the hearing.", mood: "Concerned", channel: "SMS", score: 54 },
      { id: "C3", date: "SEP 12", text: "I don't feel safe.", mood: "High distress", channel: "14566 Helpline", score: 84 },
      { id: "C4", date: "SEP 13", text: "Missed scheduled check-in window", mood: "Missed", channel: "IVRS", score: null },
      { id: "C5", date: "SEP 14", text: "Missed scheduled check-in window", mood: "Missed", channel: "IVRS", score: null }
    ],

    // 14-Day Longitudinal Distress Trend & Forecast
    distressTrend: [
      { day: "Sep 01", signal: 34, baseline: 28, deviation: 6, isForecast: false },
      { day: "Sep 03", signal: 42, baseline: 28, deviation: 14, isForecast: false },
      { day: "Sep 05", signal: 56, baseline: 28, deviation: 28, isForecast: false },
      { day: "Sep 07", signal: 64, baseline: 28, deviation: 36, isForecast: false },
      { day: "Sep 09", signal: 72, baseline: 28, deviation: 44, isForecast: false },
      { day: "Sep 11", signal: 78, baseline: 28, deviation: 50, isForecast: false },
      { day: "Sep 12", signal: 84, baseline: 28, deviation: 56, isForecast: false, marker: "Critical Escalation" },
      { day: "Sep 13", signal: 87, baseline: 28, deviation: 59, isForecast: true },
      { day: "Sep 15", signal: 91, baseline: 28, deviation: 63, isForecast: true },
      { day: "Sep 18", signal: 96, baseline: 28, deviation: 68, isForecast: true, marker: "Trial Hearing Spike" },
      { day: "Sep 22", signal: 88, baseline: 28, deviation: 60, isForecast: true }
    ],

    // Closed-Loop Interventions
    interventions: [
      {
        id: "INT-894-1",
        category: "Protection",
        title: "Armed Police Witness Protection Escort",
        assigned: "District Officer / SP",
        officer: "DSP Rajesh Kumar Meena (CO Sasni Gate)",
        due: "Today",
        status: "Needs Action", // 'Needs Action' | 'In Progress' | 'Completed' | 'Delivered & Verified'
        createdDate: "2026-09-12 09:15 AM",
        steps: { created: true, assigned: true, started: false, completed: false, verified: false, outcome: false },
        outcome: "Awaiting SP deployment order #WP-2026-894"
      },
      {
        id: "INT-894-2",
        category: "Counselling",
        title: "Acute Trauma Stabilization Session",
        assigned: "Dr. Meena (NIMHANS)",
        officer: "Dr. Ananya Sharma (Clinical Counsellor)",
        due: "Today",
        status: "In Progress",
        createdDate: "2026-09-12 07:00 AM",
        steps: { created: true, assigned: true, started: true, completed: false, verified: false, outcome: false },
        outcome: "Virtual session scheduled at 4:30 PM with victim"
      },
      {
        id: "INT-894-3",
        category: "Legal Assistance",
        title: "DLSA Free Legal Aid & In-Camera Witness Application",
        assigned: "DLSA Secretary",
        officer: "Adv. Virendra Gautam (Spl. Public Prosecutor)",
        due: "Tomorrow",
        status: "Completed",
        createdDate: "2026-09-10 11:00 AM",
        steps: { created: true, assigned: true, started: true, completed: true, verified: true, outcome: true },
        outcome: "Application diary #DLSA-419 submitted to Special Court"
      },
      {
        id: "INT-894-4",
        category: "Medical Support",
        title: "Psychiatric consultation & somatic symptom relief",
        assigned: "CMO / District Hospital",
        officer: "Dr. Ananya Ray, DMHP Senior Psychiatrist",
        due: "18 Sep",
        status: "Not Required",
        createdDate: "2026-09-11 02:00 PM",
        steps: { created: true, assigned: false, started: false, completed: false, verified: false, outcome: false },
        outcome: "Survivor reports anxiety without acute physical injury"
      },
      {
        id: "INT-894-5",
        category: "Rehabilitation",
        title: "50% DBT Compensation Clearance (₹4.25 Lakh)",
        assigned: "District Welfare Officer",
        officer: "Smt. Rohini Devi (DSWO Aligarh)",
        due: "20 Sep",
        status: "Pending",
        createdDate: "2026-09-11 04:00 PM",
        steps: { created: true, assigned: true, started: false, completed: false, verified: false, outcome: false },
        outcome: "PFMS batch token #202609110482 submitted to treasury"
      }
    ],

    // Case Events
    caseEvents: [
      { id: "E1", date: "2026-06-14", event: "FIR registered under SC/ST PoA Act Sec 3(1)(r)(s), 3(2)(v)", type: "statutory" },
      { id: "E2", date: "2026-07-28", event: "Police Charge Sheet filed in Special Court", type: "court" },
      { id: "E3", date: "2026-08-26", event: "Bail granted to 2 co-accused by Sessions Judge", type: "risk" },
      { id: "E4", date: "2026-09-03", event: "Court Summons served to victim for witness examination", type: "court" },
      { id: "E5", date: "2026-09-11", event: "Son intercepted near village field by accused relatives", type: "threat" }
    ],

    // Audit History (Immutable record)
    auditHistory: [
      { id: "A1", timestamp: "2026-09-12 08:34 AM", actor: "System (DDS Model v1.2)", action: "Distress signal evaluated: 84/100 (+56 delta from baseline 28)", notes: "Decision-support signal flagged for human triage." },
      { id: "A2", timestamp: "2026-09-12 09:05 AM", actor: "Dr. Ananya Sharma (Clinical Counsellor)", action: "Alert reviewed and concern confirmed", notes: "Acoustic tremor and imminent trial proximity verified. Recommended police protection." },
      { id: "A3", timestamp: "2026-09-12 09:15 AM", actor: "Dr. Ananya Sharma (Clinical Counsellor)", action: "Intervention created: Armed Police Escort", notes: "Assigned to District Officer & SP for statutory deployment." }
    ]
  },
  {
    id: "NHAA-2026-912",
    caseNumber: "NHAA-2026-912",
    citizenName: "Protected Citizen B",
    gender: "Female",
    age: 26,
    district: "Bhiwani",
    state: "Haryana",
    location: "Bhiwani, Haryana",
    actCategory: "SC/ST (PoA) Act Sec 3(2)(v) & IPC 376D",
    firNumber: "FIR No. 89/2026 - Women PS Bhiwani",
    caseType: "Sexual Assault & Atrocity Survivor",
    priority: "CRITICAL",
    status: "CRITICAL — REVIEW REQUIRED",
    registrationDate: "2026-05-19",
    currentStage: "Cross-Examination in Fast Track Special Court",
    nextCourtDate: "2026-09-15 (In 3 Days)",
    assignedCounsellor: "Dr. Preeti Malik (Clinical Neuropsychologist)",
    assignedOfficer: "Shri Naresh Kumar, IAS (District Collector)",
    policeProtectionStatus: "2 Armed Women Police Constables",
    compensationDisbursed: "₹8,25,000 / ₹8,25,000 (100% Disbursed)",

    currentScore: 92,
    baselineScore: 30,
    deviation: "+62",
    confidence: 91,
    modelVersion: "DDS Prototype v1.2",
    lastCheckIn: "45 minutes ago",
    lastChannel: "14566 Helpline",
    trend: "RISING_SHARP",

    safeContact: {
      preferredChannel: "Direct Helpline 14566",
      safeTimeWindow: "06:00 AM - 08:00 AM",
      discreetNotification: true,
      quickExitArmed: true,
      alternateContact: "Female Nodal Officer SMS"
    },

    workflow: {
      complaint: "Registered",
      assessment: "Completed",
      counselling: "Active",
      protection: "Delivered",
      legalAssistance: "Connected",
      followUp: "Urgent Action Required"
    },

    topSignals: [
      "Three consecutive missed check-ins",
      "Acute vocal dysphonia & fear markers",
      "Hostile courtroom cross-examination",
      "Secondary trauma symptoms"
    ],

    contributingSignals: [
      { name: "Hostile cross-examination", weight: 24, desc: "Defence questioning triggered acute panic episodes." },
      { name: "Consecutive missed check-ins", weight: 19, desc: "No response on 3 consecutive daily pulse cycles." },
      { name: "Vocal constriction tremor", weight: 15, desc: "Acoustic jitter measured 4.8% (normal <1.04%)." },
      { name: "Court trial proximity", weight: 14, desc: "Courtroom appearance in 3 days." }
    ],

    voiceMetrics: {
      pitchTremorHz: 18.6,
      normalPitchTremorHz: "< 5.0",
      jitterPercent: 4.8,
      normalJitter: "< 1.04%",
      shimmerPercent: 9.6,
      pauseRatioPercent: 47.1,
      speechRateWPM: 62,
      audioTranscript: "I cannot sit in that courtroom again with those men staring and laughing at me. The defence lawyer was asking disgraceful questions. I would rather die than go on Monday."
    },

    sentimentMetrics: {
      overallSentiment: "Severe Acute PTSD & Panic",
      fearScore: 98,
      threatPerceptionScore: 94,
      isolationScore: 89,
      detectedKeywords: ["rather die", "staring and laughing", "disgraceful questions", "cannot sit in that courtroom"]
    },

    timeline: [
      { id: "T1", date: "19 MAY 2026", title: "Complaint registered", source: "Special Police Cell", status: "Verified", type: "complaint" },
      { id: "T2", date: "05 SEP 2026", title: "Witness box examination", source: "FTSC Court", status: "Hostile questioning logged", type: "court" },
      { id: "T3", date: "12 SEP 2026", title: "Three missed check-ins flagged", source: "System Monitor", status: "DDS 92 Spike", type: "escalation" }
    ],

    checkIns: [
      { id: "C1", date: "SEP 10", text: "Very anxious about court.", mood: "Anxious", channel: "14566 Helpline", score: 78 },
      { id: "C2", date: "SEP 11", text: "Missed check-in", mood: "Missed", channel: "IVRS", score: null },
      { id: "C3", date: "SEP 12", text: "Missed check-in", mood: "Missed", channel: "IVRS", score: null },
      { id: "C4", date: "SEP 13", text: "Missed check-in", mood: "Missed", channel: "IVRS", score: null }
    ],

    distressTrend: [
      { day: "Sep 01", signal: 45, baseline: 30, deviation: 15, isForecast: false },
      { day: "Sep 05", signal: 72, baseline: 30, deviation: 42, isForecast: false },
      { day: "Sep 08", signal: 82, baseline: 30, deviation: 52, isForecast: false },
      { day: "Sep 12", signal: 92, baseline: 30, deviation: 62, isForecast: false, marker: "Critical Panic Spike" },
      { day: "Sep 15", signal: 99, baseline: 30, deviation: 69, isForecast: true, marker: "Hearing Risk" }
    ],

    interventions: [
      {
        id: "INT-912-1",
        category: "Counselling",
        title: "Immediate Psychiatric Emergency Evaluation",
        assigned: "Dr. Preeti Malik",
        officer: "Dr. Preeti Malik",
        due: "Today",
        status: "In Progress",
        createdDate: "2026-09-12 08:30 AM",
        steps: { created: true, assigned: true, started: true, completed: false, verified: false, outcome: false },
        outcome: "Home visit dispatched with female nurse"
      },
      {
        id: "INT-912-2",
        category: "Legal Assistance",
        title: "In-Camera Trial & Screened Witness Box Application",
        assigned: "Special Public Prosecutor",
        officer: "Adv. Sunita Hooda",
        due: "Today",
        status: "Completed",
        createdDate: "2026-09-12 08:00 AM",
        steps: { created: true, assigned: true, started: true, completed: true, verified: true, outcome: true },
        outcome: "Application diary #8944 under PoA Rule 12 filed in court"
      }
    ],

    caseEvents: [
      { id: "E1", date: "2026-05-19", event: "FIR registered under POCSO & SC/ST PoA Act", type: "statutory" },
      { id: "E2", date: "2026-09-05", event: "First day cross-examination in Fast Track Court", type: "court" }
    ],

    auditHistory: [
      { id: "A1", timestamp: "2026-09-12 07:12 AM", actor: "System Monitor", action: "3 consecutive missed check-ins flagged", notes: "DDS recalculated from 82 to 92." }
    ]
  },
  {
    id: "NHAA-2026-921",
    caseNumber: "NHAA-2026-921",
    citizenName: "Protected Citizen C (Pooja Devi)",
    gender: "Female",
    age: 29,
    district: "Dharmapuri",
    state: "Tamil Nadu",
    location: "Dharmapuri, Tamil Nadu",
    actCategory: "SC/ST (PoA) Act Sec 3(1)(t), 3(2)(iii) - Social Boycott & Arson",
    firNumber: "FIR No. 208/2026 - PS Pennagaram",
    caseType: "Village Ostracism & Economic Boycott",
    priority: "HIGH",
    status: "HIGH — ACTION PENDING",
    registrationDate: "2026-07-02",
    currentStage: "Investigation Pending | Supplementary Charge Sheet",
    nextCourtDate: "2026-09-29 (In 17 Days)",
    assignedCounsellor: "Smt. Meenakshi S. (Psychologist)",
    assignedOfficer: "Smt. K. Shanthi, IAS (District Collector)",
    policeProtectionStatus: "Fixed Static Picket at Hamlet",
    compensationDisbursed: "₹3,00,000 / ₹6,00,000",

    currentScore: 68,
    baselineScore: 24,
    deviation: "+44",
    confidence: 84,
    modelVersion: "DDS Prototype v1.2",
    lastCheckIn: "1 hour ago",
    lastChannel: "Chatbot (Tamil)",
    trend: "ELEVATED",

    safeContact: {
      preferredChannel: "Multilingual Chatbot (Tamil)",
      safeTimeWindow: "03:30 PM - 05:30 PM",
      discreetNotification: true,
      quickExitArmed: true,
      alternateContact: "SMS"
    },

    workflow: {
      complaint: "Registered",
      assessment: "Completed",
      counselling: "Active",
      protection: "Active",
      legalAssistance: "Connected",
      followUp: "Scheduled"
    },

    topSignals: [
      "Informal economic boycott reported",
      "Drinking water tanker access denied",
      "Children schooling disruption",
      "Significant deviation from personal baseline (+44)"
    ],

    contributingSignals: [
      { name: "Economic & social boycott", weight: 22, desc: "Panchayat instructed shopkeepers not to sell rations." },
      { name: "Water access restriction", weight: 18, desc: "Community drinking water tanker bypassed victim's lane." },
      { name: "Children safety concerns", weight: 12, desc: "Survivor fears sending children to primary school." },
      { name: "Baseline delta (+44)", weight: 11, desc: "Score escalated from stable 24 to 68." }
    ],

    voiceMetrics: {
      pitchTremorHz: 8.2,
      normalPitchTremorHz: "< 5.0",
      jitterPercent: 2.1,
      normalJitter: "< 1.04%",
      shimmerPercent: 5.4,
      pauseRatioPercent: 26.5,
      speechRateWPM: 104,
      audioTranscript: "The local panchayat has instructed shopkeepers not to sell rations to our street. Water tanker has stopped coming. My children are scared to go to school."
    },

    sentimentMetrics: {
      overallSentiment: "Helplessness & Social Deprivation",
      fearScore: 71,
      threatPerceptionScore: 65,
      isolationScore: 91,
      detectedKeywords: ["not sell rations", "water tanker stopped", "children scared", "ostracism"]
    },

    timeline: [
      { id: "T1", date: "02 JUL 2026", title: "Complaint registered", source: "District Nodal Cell", status: "Verified", type: "complaint" },
      { id: "T2", date: "08 SEP 2026", title: "Bazaar boycott announced", source: "Informal Panchayat", status: "Monitored", type: "threat" },
      { id: "T3", date: "12 SEP 2026", title: "Chatbot check-in flags water denial", source: "Tamil Chatbot", dds: 68, status: "Alert Raised", type: "escalation" }
    ],

    checkIns: [
      { id: "C1", date: "SEP 10", text: "Ration shop refused flour.", mood: "Distressed", channel: "Tamil Chatbot", score: 65 },
      { id: "C2", date: "SEP 11", text: "No water tanker today.", mood: "Concerned", channel: "Tamil Chatbot", score: 68 }
    ],

    distressTrend: [
      { day: "Sep 01", signal: 30, baseline: 24, deviation: 6, isForecast: false },
      { day: "Sep 06", signal: 45, baseline: 24, deviation: 21, isForecast: false },
      { day: "Sep 10", signal: 65, baseline: 24, deviation: 41, isForecast: false },
      { day: "Sep 12", signal: 68, baseline: 24, deviation: 44, isForecast: false }
    ],

    interventions: [
      {
        id: "INT-921-1",
        category: "Legal Assistance",
        title: "Revenue Divisional Officer (RDO) Spot Inspection for Boycott",
        assigned: "DLSA / RDO",
        officer: "Shri S. Kathiravan, RDO Dharmapuri",
        due: "Tomorrow",
        status: "Completed",
        createdDate: "2026-09-12 10:00 AM",
        steps: { created: true, assigned: true, started: true, completed: true, verified: true, outcome: true },
        outcome: "Official inspection notice #RDO-88 issued to Panchayat President"
      },
      {
        id: "INT-921-2",
        category: "Medical Support",
        title: "Direct Doorstep Civil Supplies & Water Supply allocation",
        assigned: "District Supply Officer",
        officer: "Tmt. V. Geetha, DSO",
        due: "Today",
        status: "Delivered & Verified",
        createdDate: "2026-09-11 02:00 PM",
        steps: { created: true, assigned: true, started: true, completed: true, verified: true, outcome: true },
        outcome: "PDS Doorstep Delivery acknowledgment #TN-DSO-412 signed"
      }
    ],

    caseEvents: [
      { id: "E1", date: "2026-07-02", event: "Arson incident at hamlet edge", type: "statutory" },
      { id: "E2", date: "2026-09-08", event: "Informal social ostracism resolution passed", type: "risk" }
    ],

    auditHistory: [
      { id: "A1", timestamp: "2026-09-12 10:15 AM", actor: "Dr. Ananya Sharma", action: "Counsellor verified chatbot distress signals", notes: "Food and water insecurity confirmed. Escalated to District Collector." }
    ]
  },
  {
    id: "NHAA-2026-651",
    caseNumber: "NHAA-2026-651",
    citizenName: "Protected Citizen D (Anil Meena)",
    gender: "Male",
    age: 34,
    district: "Baran",
    state: "Rajasthan",
    location: "Baran, Rajasthan",
    actCategory: "SC/ST (PoA) Act Sec 3(1)(f) & 3(1)(g) - Land Encroachment",
    firNumber: "FIR No. 176/2026 - PS Shahbad",
    caseType: "Agricultural Land Dispossession",
    priority: "MODERATE",
    status: "MODERATE — MONITORING",
    registrationDate: "2026-06-20",
    currentStage: "Boundary Demarcation & Tehsildar Spot Verification",
    nextCourtDate: "2026-10-04 (In 22 Days)",
    assignedCounsellor: "Shri Mahendra Singh (Counsellor)",
    assignedOfficer: "Shri Narendra Gupta, IAS (DM Baran)",
    policeProtectionStatus: "Beat Patrol Twice Weekly",
    compensationDisbursed: "₹1,50,000 / ₹3,00,000",

    currentScore: 42,
    baselineScore: 22,
    deviation: "+20",
    confidence: 82,
    modelVersion: "DDS Prototype v1.2",
    lastCheckIn: "Yesterday, 06:15 PM",
    lastChannel: "SMS Pulse",
    trend: "STABLE",

    safeContact: {
      preferredChannel: "SMS Pulse",
      safeTimeWindow: "05:00 PM - 07:00 PM",
      discreetNotification: false,
      quickExitArmed: false,
      alternateContact: "Helpline 14566"
    },

    workflow: {
      complaint: "Registered",
      assessment: "Completed",
      counselling: "Active",
      protection: "Delivered",
      legalAssistance: "Connected",
      followUp: "Scheduled"
    },

    topSignals: [
      "Land boundary demarcation pending",
      "Partial livelihood disruption",
      "Stable response latency on SMS",
      "Minor baseline deviation (+20)"
    ],

    contributingSignals: [
      { name: "Pending Tehsildar survey", weight: 12, desc: "Awaiting final patwari land map demarcation." },
      { name: "Loss of seasonal crop income", weight: 9, desc: "Disputed 1.5 acre plot uncultivated this monsoon." }
    ],

    voiceMetrics: {
      pitchTremorHz: 4.1,
      normalPitchTremorHz: "< 5.0",
      jitterPercent: 1.2,
      normalJitter: "< 1.04%",
      shimmerPercent: 3.8,
      pauseRatioPercent: 18.2,
      speechRateWPM: 118,
      audioTranscript: "Patwari has promised to come on Tuesday for land inspection. We are managing, but until the field is in my name, I cannot take an agricultural loan."
    },

    sentimentMetrics: {
      overallSentiment: "Moderate Stress & Patience",
      fearScore: 38,
      threatPerceptionScore: 32,
      isolationScore: 40,
      detectedKeywords: ["patwari promised", "agricultural loan", "managing"]
    },

    timeline: [
      { id: "T1", date: "20 JUN 2026", title: "Complaint registered", source: "Sub-Divisional Office", status: "Verified", type: "complaint" },
      { id: "T2", date: "11 SEP 2026", title: "SMS Check-in indicates stable mood", source: "SMS Gateway", dds: 42, status: "Normal Progress", type: "assessment" }
    ],

    checkIns: [
      { id: "C1", date: "SEP 08", text: "Waiting for tehsildar visit.", mood: "Neutral", channel: "SMS", score: 44 },
      { id: "C2", date: "SEP 11", text: "Everything calm today.", mood: "Relieved", channel: "SMS", score: 42 }
    ],

    distressTrend: [
      { day: "Sep 01", signal: 48, baseline: 22, deviation: 26, isForecast: false },
      { day: "Sep 06", signal: 44, baseline: 22, deviation: 22, isForecast: false },
      { day: "Sep 11", signal: 42, baseline: 22, deviation: 20, isForecast: false }
    ],

    interventions: [
      {
        id: "INT-651-1",
        category: "Rehabilitation",
        title: "PM-DAKSH Skill Development & Mudra Linkage",
        assigned: "District Welfare Officer",
        officer: "Smt. Rohini Meena, RAS",
        due: "Completed",
        status: "Delivered & Verified",
        createdDate: "2026-09-10 11:30 AM",
        steps: { created: true, assigned: true, started: true, completed: true, verified: true, outcome: true },
        outcome: "Registration receipt #DAKSH-RJ-651 verified"
      }
    ],

    caseEvents: [
      { id: "E1", date: "2026-06-20", event: "Encroachment FIR lodged", type: "statutory" }
    ],

    auditHistory: [
      { id: "A1", timestamp: "2026-09-11 06:20 PM", actor: "System", action: "SMS check-in verified", notes: "DDS 42 within acceptable monitoring bounds." }
    ]
  },
  {
    id: "NHAA-2026-339",
    caseNumber: "NHAA-2026-339",
    citizenName: "Protected Citizen E (Kavitha Madiga)",
    gender: "Female",
    age: 41,
    district: "Mahabubnagar",
    state: "Telangana",
    location: "Mahabubnagar, Telangana",
    actCategory: "SC/ST (PoA) Act Sec 3(1)(za)(D) - Well & Water Denial",
    firNumber: "FIR No. 94/2026 - PS Jadcherla",
    caseType: "Caste Discrimination & Resource Exclusion",
    priority: "MODERATE",
    status: "MODERATE — MONITORING",
    registrationDate: "2026-06-25",
    currentStage: "Charge Sheet Filed | Bail Hearing",
    nextCourtDate: "2026-09-24 (In 12 Days)",
    assignedCounsellor: "Dr. K. Srinivas Rao, Ph.D",
    assignedOfficer: "Smt. Sweta Mohanty, IAS",
    policeProtectionStatus: "Village Patrolling Team",
    compensationDisbursed: "₹2,00,000 / ₹4,00,000",

    currentScore: 59,
    baselineScore: 26,
    deviation: "+33",
    confidence: 86,
    modelVersion: "DDS Prototype v1.2",
    lastCheckIn: "3 hours ago",
    lastChannel: "Chatbot (Telugu)",
    trend: "ELEVATED",

    safeContact: {
      preferredChannel: "Telugu Chatbot",
      safeTimeWindow: "01:00 PM - 03:00 PM",
      discreetNotification: true,
      quickExitArmed: true,
      alternateContact: "IVRS"
    },

    workflow: {
      complaint: "Registered",
      assessment: "Completed",
      counselling: "Active",
      protection: "Active",
      legalAssistance: "Connected",
      followUp: "Scheduled"
    },

    topSignals: [
      "Accused bail hearing scheduled",
      "Verbal harassment in village market",
      "Elevated baseline deviation (+33)",
      "High distress in conversational text"
    ],

    contributingSignals: [
      { name: "Bail hearing anxiety", weight: 16, desc: "Survivor fears retribution if main accused is granted regular bail." },
      { name: "Market hostility", weight: 11, desc: "Persistent hostile glares and refusal of small credit." }
    ],

    voiceMetrics: {
      pitchTremorHz: 6.8,
      normalPitchTremorHz: "< 5.0",
      jitterPercent: 1.8,
      normalJitter: "< 1.04%",
      shimmerPercent: 4.9,
      pauseRatioPercent: 22.4,
      speechRateWPM: 98,
      audioTranscript: "If he gets bail on Monday, my family cannot walk on the main road. The police patrol only comes once in the evening."
    },

    sentimentMetrics: {
      overallSentiment: "Elevated Apprehension & Anxiety",
      fearScore: 64,
      threatPerceptionScore: 68,
      isolationScore: 60,
      detectedKeywords: ["if he gets bail", "cannot walk on main road", "patrol only once"]
    },

    timeline: [
      { id: "T1", date: "25 JUN 2026", title: "Complaint registered", source: "14566 Gateway", status: "Verified", type: "complaint" },
      { id: "T2", date: "12 SEP 2026", title: "Chatbot alert: Bail anxiety spike", source: "Telugu AI Chatbot", dds: 59, status: "Alert Raised", type: "escalation" }
    ],

    checkIns: [
      { id: "C1", date: "SEP 10", text: "Worried about Monday bail hearing.", mood: "Worried", channel: "Telugu Chatbot", score: 56 },
      { id: "C2", date: "SEP 12", text: "Need lawyer to oppose bail.", mood: "Anxious", channel: "Telugu Chatbot", score: 59 }
    ],

    distressTrend: [
      { day: "Sep 01", signal: 38, baseline: 26, deviation: 12, isForecast: false },
      { day: "Sep 06", signal: 45, baseline: 26, deviation: 19, isForecast: false },
      { day: "Sep 12", signal: 59, baseline: 26, deviation: 33, isForecast: false }
    ],

    interventions: [
      {
        id: "INT-339-1",
        category: "Legal Assistance",
        title: "Bail Opposition Petition Filed by Special PP",
        assigned: "Adv. T. Chandrasekhar",
        officer: "Adv. T. Chandrasekhar",
        due: "Tomorrow",
        status: "In Progress",
        createdDate: "2026-09-12 11:00 AM",
        steps: { created: true, assigned: true, started: true, completed: false, verified: false, outcome: false },
        outcome: "Counter-affidavit drafted citing witness intimidation risk"
      }
    ],

    caseEvents: [
      { id: "E1", date: "2026-06-25", event: "FIR registered for public water denial", type: "statutory" }
    ],

    auditHistory: [
      { id: "A1", timestamp: "2026-09-12 11:30 AM", actor: "Dr. K. Srinivas Rao", action: "Counsellor check-in logged", notes: "Advised victim on court procedures and coordinated with Special PP." }
    ]
  },
  {
    id: "NHAA-2026-708",
    caseNumber: "NHAA-2026-708",
    citizenName: "Protected Citizen F",
    gender: "Male",
    age: 46,
    district: "Muzaffarpur",
    state: "Bihar",
    location: "Muzaffarpur, Bihar",
    actCategory: "SC/ST (PoA) Act Sec 3(1)(s) & 3(2)(va)",
    firNumber: "FIR No. 312/2026 - PS Kanti",
    caseType: "Physical Assault & Verbal Degradation",
    priority: "HIGH",
    status: "HIGH — ACTION PENDING",
    registrationDate: "2026-07-15",
    currentStage: "Investigation Stage | Witness Statements Recording",
    nextCourtDate: "2026-09-28 (In 16 Days)",
    assignedCounsellor: "Dr. Alok Verma",
    assignedOfficer: "Shri Subrat Kumar Sen, IAS (DM)",
    policeProtectionStatus: "Beat Constable Patrol",
    compensationDisbursed: "₹1,00,000 / ₹2,00,000",

    currentScore: 71,
    baselineScore: 25,
    deviation: "+46",
    confidence: 88,
    modelVersion: "DDS Prototype v1.2",
    lastCheckIn: "2 hours ago",
    lastChannel: "IVRS 14566",
    trend: "RISING_SHARP",

    safeContact: {
      preferredChannel: "IVRS 14566",
      safeTimeWindow: "08:00 AM - 10:00 AM",
      discreetNotification: true,
      quickExitArmed: true,
      alternateContact: "SMS"
    },

    workflow: {
      complaint: "Registered",
      assessment: "Completed",
      counselling: "Active",
      protection: "Review Required",
      legalAssistance: "Connected",
      followUp: "Scheduled"
    },

    topSignals: [
      "Physical assault threats repeated",
      "Hesitation in voice transcription",
      "Significant baseline deviation (+46)",
      "High fear sentiment score"
    ],

    contributingSignals: [
      { name: "Repeated intimidation", weight: 20, desc: "Perpetrators warned victim against identifying suspects in test identification parade." },
      { name: "Speech micro-tremors", weight: 14, desc: "Acoustic tremor elevated above baseline by 2.8x." }
    ],

    voiceMetrics: {
      pitchTremorHz: 11.4,
      normalPitchTremorHz: "< 5.0",
      jitterPercent: 2.9,
      normalJitter: "< 1.04%",
      shimmerPercent: 6.8,
      pauseRatioPercent: 32.1,
      speechRateWPM: 88,
      audioTranscript: "They said if I identify the mukhiya's brother at the police station, they will not let my bullock cart pass the main crossing."
    },

    sentimentMetrics: {
      overallSentiment: "High Terror & Physical Vulnerability",
      fearScore: 86,
      threatPerceptionScore: 89,
      isolationScore: 72,
      detectedKeywords: ["identify at police station", "bullock cart pass", "threatened"]
    },

    timeline: [
      { id: "T1", date: "15 JUL 2026", title: "Complaint registered", source: "14566 Helpline", status: "Verified", type: "complaint" },
      { id: "T2", date: "12 SEP 2026", title: "IVRS distress spike detected", source: "DDS AI v1.2", dds: 71, status: "High Alert Raised", type: "escalation" }
    ],

    checkIns: [
      { id: "C1", date: "SEP 10", text: "Uneasy about police parade.", mood: "Concerned", channel: "IVRS", score: 62 },
      { id: "C2", date: "SEP 12", text: "Direct threat given yesterday.", mood: "High distress", channel: "IVRS", score: 71 }
    ],

    distressTrend: [
      { day: "Sep 01", signal: 35, baseline: 25, deviation: 10, isForecast: false },
      { day: "Sep 07", signal: 52, baseline: 25, deviation: 27, isForecast: false },
      { day: "Sep 12", signal: 71, baseline: 25, deviation: 46, isForecast: false }
    ],

    interventions: [
      {
        id: "INT-708-1",
        category: "Protection",
        title: "Test Identification Parade Police Escort",
        assigned: "Superintendent of Police",
        officer: "DSP (HQ) Muzaffarpur",
        due: "Tomorrow",
        status: "Needs Action",
        createdDate: "2026-09-12 11:45 AM",
        steps: { created: true, assigned: true, started: false, completed: false, verified: false, outcome: false },
        outcome: "Awaiting SP escort sign-off"
      }
    ],

    caseEvents: [
      { id: "E1", date: "2026-07-15", event: "FIR registered for assault and insult", type: "statutory" }
    ],

    auditHistory: [
      { id: "A1", timestamp: "2026-09-12 11:50 AM", actor: "Dr. Ananya Sharma", action: "Alert marked for District Officer action", notes: "Urgent escort needed for police parade." }
    ]
  }
];

// Operational Overview Statistics
export const CONSOLE_OVERVIEW_METRICS = {
  activeCases: 128,
  needReview: 17,
  criticalCases: 6,
  activeInterventions: 94,
  lastSynchronized: "2 minutes ago",
  triageDistribution: {
    critical: 6,
    high: 11,
    moderate: 24,
    monitoring: 87
  },
  checkInMetrics: {
    expected: 128,
    completed: 103,
    pending: 17,
    missed: 8
  },
  analyticsMetrics: {
    averageResponseTimeMin: 21,
    interventionCompletionRatePercent: 94,
    followUpCompliancePercent: 88,
    slaTargetMin: 30
  }
};

// Priority Alerts Stream
export const PRIORITY_ALERTS = [
  {
    id: "ALT-894",
    caseId: "NHAA-DEMO-001",
    caseNumber: "NHAA-2026-894",
    citizenName: "Protected Citizen A",
    location: "Aligarh, Uttar Pradesh",
    severity: "CRITICAL",
    title: "Potential acute distress escalation",
    timeAgo: "12 minutes ago",
    score: 84,
    baseline: 28,
    deviation: "+56",
    reason: "Direct physical threat recorded during IVRS check-in; trial date approaching in 6 days; acoustic pitch tremor at 14.8 Hz.",
    status: "UNRESOLVED",
    actionRequired: "Review Case & Confirm Armed Witness Protection Escort"
  },
  {
    id: "ALT-912",
    caseId: "NHAA-2026-912",
    caseNumber: "NHAA-2026-912",
    citizenName: "Protected Citizen B",
    location: "Bhiwani, Haryana",
    severity: "HIGH",
    title: "Three consecutive missed check-ins",
    timeAgo: "32 minutes ago",
    score: 92,
    baseline: 30,
    deviation: "+62",
    reason: "No response on 3 consecutive daily pulse windows following hostile cross-examination in Fast Track Court.",
    status: "UNRESOLVED",
    actionRequired: "Clinician Welfare Call & In-Camera Trial Motion"
  },
  {
    id: "ALT-921",
    caseId: "NHAA-2026-921",
    caseNumber: "NHAA-2026-921",
    citizenName: "Protected Citizen C",
    location: "Dharmapuri, Tamil Nadu",
    severity: "MODERATE",
    title: "Significant deviation from personal baseline",
    timeAgo: "1 hour ago",
    score: 68,
    baseline: 24,
    deviation: "+44",
    reason: "Chatbot flagged informal economic boycott and water supply denial by local panchayat.",
    status: "UNDER_REVIEW",
    actionRequired: "Revenue Divisional Officer Spot Inspection Notice"
  },
  {
    id: "ALT-708",
    caseId: "NHAA-2026-708",
    caseNumber: "NHAA-2026-708",
    citizenName: "Protected Citizen F",
    location: "Muzaffarpur, Bihar",
    severity: "HIGH",
    title: "Threat prior to police test identification parade",
    timeAgo: "2 hours ago",
    score: 71,
    baseline: 25,
    deviation: "+46",
    reason: "Perpetrators warned survivor against identifying accused suspects in custody.",
    status: "UNRESOLVED",
    actionRequired: "Police Escort Order for Identification Parade"
  }
];

// Today's Interventions
export const TODAYS_INTERVENTIONS = [
  {
    id: "TI-1",
    caseId: "NHAA-DEMO-001",
    caseRef: "#894",
    citizenName: "Protected Citizen A",
    intervention: "Protection Review (Armed Police Escort)",
    owner: "District Officer / SP",
    due: "Today",
    status: "Needs Action",
    priority: "CRITICAL"
  },
  {
    id: "TI-2",
    caseId: "NHAA-2026-912",
    caseRef: "#912",
    citizenName: "Protected Citizen B",
    intervention: "Emergency Tele-Counselling Visit",
    owner: "Dr. Meena (NIMHANS)",
    due: "Today",
    status: "In Progress",
    priority: "CRITICAL"
  },
  {
    id: "TI-3",
    caseId: "NHAA-2026-921",
    caseRef: "#921",
    citizenName: "Protected Citizen C",
    intervention: "Legal Assistance (RDO Boycott Inspection)",
    owner: "DLSA Secretary",
    due: "Tomorrow",
    status: "Completed",
    priority: "HIGH"
  },
  {
    id: "TI-4",
    caseId: "NHAA-2026-651",
    caseRef: "#651",
    citizenName: "Protected Citizen D",
    intervention: "PM-DAKSH Livelihood Rehabilitation",
    owner: "District Welfare Officer",
    due: "Today",
    status: "Completed",
    priority: "MODERATE"
  },
  {
    id: "TI-5",
    caseId: "NHAA-2026-339",
    caseRef: "#339",
    citizenName: "Protected Citizen E",
    intervention: "Bail Opposition Counter-Affidavit",
    owner: "Special Public Prosecutor",
    due: "Tomorrow",
    status: "In Progress",
    priority: "MODERATE"
  }
];

// Channel Distribution for Analytics
export const CHANNEL_DISTRIBUTION = [
  { channel: "IVRS 14566", percentage: 38, count: 49 },
  { channel: "National Helpline 14566", percentage: 26, count: 33 },
  { channel: "SMS Pulse", percentage: 18, count: 23 },
  { channel: "Mobile App", percentage: 12, count: 15 },
  { channel: "Bhashini Chatbot", percentage: 6, count: 8 }
];

// State-wise Distribution
export const STATE_DISTRIBUTION = [
  { state: "Uttar Pradesh", activeCases: 34, critical: 2, completionRate: 95 },
  { state: "Tamil Nadu", activeCases: 22, critical: 1, completionRate: 96 },
  { state: "Haryana", activeCases: 18, critical: 2, completionRate: 92 },
  { state: "Rajasthan", activeCases: 16, critical: 0, completionRate: 97 },
  { state: "Telangana", activeCases: 14, critical: 0, completionRate: 94 },
  { state: "Bihar", activeCases: 12, critical: 1, completionRate: 91 },
  { state: "Madhya Pradesh", activeCases: 8, critical: 0, completionRate: 93 },
  { state: "Maharashtra", activeCases: 4, critical: 0, completionRate: 98 }
];

// Intervention Delivery SLA Breakdown
export const INTERVENTION_STATS = [
  { type: "Police Protection", total: 28, delivered: 26, avgDeliveryHours: 3.2, compliance: "93%" },
  { type: "Clinical Counselling", total: 42, delivered: 40, avgDeliveryHours: 1.8, compliance: "95%" },
  { type: "DLSA Legal Aid", total: 35, delivered: 34, avgDeliveryHours: 8.4, compliance: "97%" },
  { type: "Medical Assistance", total: 19, delivered: 19, avgDeliveryHours: 2.1, compliance: "100%" },
  { type: "DBT Rehabilitation", total: 31, delivered: 28, avgDeliveryHours: 48.0, compliance: "90%" }
];
