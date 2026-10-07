// Data repository for SAHAYA-360 (MoSJE Smart India Hackathon 2026, PS ID: 26094)
// Team: Slytherin | Theme: MedTech / BioTech / HealthTech
// Realistic case dossiers, longitudinal distress trends, personal baseline deltas, voice stress metrics, and closed-loop intervention history

export const MOCK_CASES = [
  {
    id: "NHAA-2026-894",
    victimName: "Ramesh Kumar (Protected)",
    gender: "Male",
    age: 38,
    district: "Aligarh",
    state: "Uttar Pradesh",
    actCategory: "SC/ST (PoA) Act Sec 3(1)(r)(s), 3(2)(v) & IPC 307/326",
    firNumber: "FIR No. 412/2026 - PS Sasni Gate",
    caseType: "Grievous Hurt & Land Dispossession",
    priorityCategory: "Witness Facing Intimidation / High Threat",
    registrationDate: "2026-06-14",
    currentStage: "Charge Sheet Filed | Trial Commencement",
    nextCourtDate: "2026-09-18 (In 6 Days)",
    assignedCounsellor: "Dr. Anjali Sharma (NIMHANS Empanelled)",
    assignedSpecialPP: "Adv. Virendra Gautam (Spl. Public Prosecutor)",
    districtNodalOfficer: "Shri Rajesh Verma, IAS (District Magistrate)",
    policeProtectionStatus: "Beat Constable Patrol (Inadequate)",
    compensationDisbursed: "₹4,25,000 / ₹8,50,000 (50% Disbursed at FIR/Chargesheet)",

    // Real-Time Mental Health & Personal Baseline Distress
    personalBaselineDistress: 28, // Victim's personal baseline when stable (0-100)
    dynamicDistressScore: 84, // 0-100 scale (Critical)
    baselineDelta: "+56 pts", // Detects meaningful change from personal baseline
    riskCategory: "CRITICAL",
    riskTrend: "RISING_SHARP", // 'RISING_SHARP', 'ELEVATED', 'STABLE', 'RECOVERING'
    lastInteractionChannel: "IVRS 14566 Follow-up Call",
    lastInteractionTimestamp: "Today, 08:30 AM",

    // Safe-Contact Protocol Preferences
    safeContactProtocol: {
      preferredChannel: "Interactive IVRS (14566)",
      safeTimeWindow: "10:30 AM - 12:30 PM (When perpetrators away from field)",
      discreetNotification: true,
      quickExitArmed: true,
      alternateContactMethod: "SMS Pulse"
    },

    // Emotion AI & Voice Stress Breakdown
    voiceAcousticMetrics: {
      pitchTremorHz: 14.8, // Normal < 5Hz
      jitterPercentage: 3.4, // Normal < 1.04%
      shimmerPercentage: 7.9, // Normal < 3.8%
      acousticPauseRatio: 38.2, // 38% silence/hesitation during speech
      speechRateWordsPerMin: 86, // Abnormally depressed / halted rate
      vocalStrainScore: 88, // 0 - 100
      recordedClipDurationSec: 42,
      audioTranscriptExcerpt: "They intercepted my son near the tube well yesterday evening. They told him if I give evidence in the Sessions Court next Thursday, our hut will be burned again. I cannot sleep. My hands are shaking. Who will protect my family?"
    },

    // NLP Atrocity Trauma & Sentiment
    sentimentMetrics: {
      overallSentiment: "Extreme Despair & Terror",
      fearScore: 92,
      threatPerceptionScore: 95,
      isolationScore: 78,
      suicideIdeationRisk: "Elevated Warning",
      detectedKeywords: ["burned again", "intercepted my son", "hands shaking", "who will protect", "court next Thursday"]
    },

    // Explainable AI (XAI) Attribution Breakdown
    xaiAttribution: [
      { factor: "Imminent Court Trial Date Proximity", weight: 34, description: "Scheduled hearing on 18th Sept with perpetrators on bail" },
      { factor: "Direct Witness Intimidation Language", weight: 28, description: "Explicit physical threats recorded in IVRS call" },
      { factor: "Severe Voice Pitch Tremor & Jitter", weight: 22, description: "Acoustic micro-tremor exceeded 3.2x baseline" },
      { factor: "Sleep Deprivation & Social Boycott", weight: 16, description: "Reported consecutive 4 nights of severe insomnia" }
    ],

    // Longitudinal Trend Data (Past 30 days DDS)
    longitudinalHistory: [
      { day: "Aug 14", score: 45, note: "Routine follow-up post FIR" },
      { day: "Aug 18", score: 48, note: "Legal aid lawyer assigned" },
      { day: "Aug 22", score: 52, note: "Accused applied for bail" },
      { day: "Aug 26", score: 68, note: "Bail granted to 2 co-accused" },
      { day: "Aug 30", score: 62, note: "Counselling tele-session 1" },
      { day: "Sep 03", score: 66, note: "Summons received for court" },
      { day: "Sep 07", score: 74, note: "Anonymous threat over phone" },
      { day: "Sep 09", score: 79, note: "Son confronted near village" },
      { day: "Sep 12", score: 84, note: "IVRS alert: High distress spike (+56 from baseline)" }
    ],

    // Predictive Forecast for next 14 days if unaddressed
    predictiveForecast: [
      { day: "Sep 13", projectedScore: 87, confidenceLower: 82, confidenceUpper: 91 },
      { day: "Sep 15", projectedScore: 91, confidenceLower: 85, confidenceUpper: 95 },
      { day: "Sep 18", projectedScore: 96, confidenceLower: 89, confidenceUpper: 99, event: "TRIAL DATE SPIKE" },
      { day: "Sep 22", projectedScore: 89, confidenceLower: 78, confidenceUpper: 94 }
    ],

    // Closed-Loop Intervention Tracking
    recommendedInterventions: [
      { 
        id: "INT-1", 
        type: "WITNESS_PROTECTION", 
        title: "Deploy Armed Police Escort under Witness Protection Scheme, 2018", 
        status: "URGENT_PENDING", 
        authority: "Superintendent of Police (SP)",
        officerName: "DSP Rajesh Kumar Meena (CO Sasni Gate)",
        dispatchedAt: "2026-09-12 09:15 AM",
        verifiedDeliveredAt: "Pending SP Sign-off",
        deliveryProof: "Police Escort Order File #WP-2026-894",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      },
      { 
        id: "INT-2", 
        type: "SAFEHOUSE_RELOCATION", 
        title: "Immediate Temporary Relocation to District Safehouse", 
        status: "RECOMMENDED", 
        authority: "District Magistrate",
        officerName: "Shri Rajesh Verma, IAS (DM Aligarh)",
        dispatchedAt: "2026-09-12 09:30 AM",
        verifiedDeliveredAt: "In Progress",
        deliveryProof: "Safehouse Allotment Slip #SH-12",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      },
      { 
        id: "INT-3", 
        type: "PSYCHIATRIC_EMERGENCY", 
        title: "Emergency In-Person Clinical Psychologist Visit within 4 Hours", 
        status: "DELIVERED_VERIFIED", 
        authority: "Chief Medical Officer (CMO)",
        officerName: "Dr. Ananya Ray, DMHP Senior Psychiatrist",
        dispatchedAt: "2026-09-12 07:00 AM",
        verifiedDeliveredAt: "2026-09-12 09:45 AM",
        deliveryProof: "Clinical Session Form #DMHP-904",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      },
      { 
        id: "INT-4", 
        type: "COMPENSATION_FASTTRACK", 
        title: "Disburse Balance 50% Relief Fund (₹4.25 Lakh) via DBT", 
        status: "IN_REVIEW", 
        authority: "District Social Welfare Officer",
        officerName: "Smt. Rohini Devi (DSWO Aligarh)",
        dispatchedAt: "2026-09-11 04:00 PM",
        verifiedDeliveredAt: "Pending PFMS Clearance",
        deliveryProof: "PFMS Batch Token #202609110482",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      }
    ]
  },
  {
    id: "NHAA-2026-412",
    victimName: "Pooja Devi (Protected)",
    gender: "Female",
    age: 29,
    district: "Dharmapuri",
    state: "Tamil Nadu",
    actCategory: "SC/ST (PoA) Act Sec 3(1)(t), 3(2)(iii) - Arson & Social Boycott",
    firNumber: "FIR No. 208/2026 - PS Pennagaram",
    caseType: "Arson & Village Ostracism",
    priorityCategory: "Families Affected by Caste Violence",
    registrationDate: "2026-07-02",
    currentStage: "Investigation Pending | Supplementary Charge Sheet",
    nextCourtDate: "2026-09-29 (In 17 Days)",
    assignedCounsellor: "Smt. Meenakshi S., M.Phil Psychology",
    assignedSpecialPP: "Adv. K. Selvam",
    districtNodalOfficer: "Smt. K. Shanthi, IAS (District Collector)",
    policeProtectionStatus: "Fixed Static Picket at Hamlet",
    compensationDisbursed: "₹3,00,000 / ₹6,00,000",

    // Real-Time Mental Health & Personal Baseline Distress
    personalBaselineDistress: 24,
    dynamicDistressScore: 68, // Elevated
    baselineDelta: "+44 pts",
    riskCategory: "HIGH",
    riskTrend: "ELEVATED",
    lastInteractionChannel: "Multilingual Chatbot (Tamil)",
    lastInteractionTimestamp: "Yesterday, 04:15 PM",

    // Safe-Contact Protocol Preferences
    safeContactProtocol: {
      preferredChannel: "Multilingual Chatbot (Tamil)",
      safeTimeWindow: "03:30 PM - 05:30 PM",
      discreetNotification: true,
      quickExitArmed: true,
      alternateContactMethod: "SMS"
    },

    voiceAcousticMetrics: {
      pitchTremorHz: 8.2,
      jitterPercentage: 2.1,
      shimmerPercentage: 5.4,
      acousticPauseRatio: 26.5,
      speechRateWordsPerMin: 104,
      vocalStrainScore: 69,
      recordedClipDurationSec: 35,
      audioTranscriptExcerpt: "The local panchayat has instructed shopkeepers not to sell rations to our street. Water tanker has stopped coming. My children are scared to go to school."
    },

    sentimentMetrics: {
      overallSentiment: "Helplessness & Social Deprivation",
      fearScore: 71,
      threatPerceptionScore: 65,
      isolationScore: 91,
      suicideIdeationRisk: "Low/Monitoring",
      detectedKeywords: ["not sell rations", "water tanker stopped", "children scared", "ostracism"]
    },

    xaiAttribution: [
      { factor: "Systemic Social Boycott & Economic Blockade", weight: 38, description: "Denial of grocery and drinking water supply reported" },
      { factor: "Children Schooling Disruption", weight: 26, description: "Maternal distress regarding children safety" },
      { factor: "Delayed Compensation Phase 2", weight: 20, description: "Awaiting housing reconstruction grant" },
      { factor: "Vocal Fatigue & Speech Hesitations", weight: 16, description: "High pause duration when discussing future" }
    ],

    longitudinalHistory: [
      { day: "Aug 14", score: 78, note: "Arson incident occurs" },
      { day: "Aug 18", score: 75, note: "Police static picket installed" },
      { day: "Aug 22", score: 71, note: "Initial relief disbursed" },
      { day: "Aug 26", score: 65, note: "NGO relief food kit supplied" },
      { day: "Aug 30", score: 64, note: "Counselling check-in" },
      { day: "Sep 04", score: 62, note: "Temporary stabilization" },
      { day: "Sep 08", score: 69, note: "Bazaar boycott announced" },
      { day: "Sep 11", score: 68, note: "Chatbot interaction flags isolation" }
    ],

    predictiveForecast: [
      { day: "Sep 13", projectedScore: 70, confidenceLower: 64, confidenceUpper: 76 },
      { day: "Sep 16", projectedScore: 73, confidenceLower: 66, confidenceUpper: 80 },
      { day: "Sep 20", projectedScore: 75, confidenceLower: 68, confidenceUpper: 82 }
    ],

    recommendedInterventions: [
      { 
        id: "INT-5", 
        type: "COMMUNITY_ENFORCEMENT", 
        title: "Revenue Divisional Officer (RDO) inspection to break informal boycott", 
        status: "URGENT_PENDING", 
        authority: "Sub-Divisional Magistrate",
        officerName: "Shri S. Kathiravan, RDO Dharmapuri",
        dispatchedAt: "2026-09-12 10:00 AM",
        verifiedDeliveredAt: "Pending Spot Inspection",
        deliveryProof: "Official Inspection Notice #RDO-88",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      },
      { 
        id: "INT-6", 
        type: "RATION_SUPPLY", 
        title: "Direct Doorstep Civil Supplies allocation", 
        status: "DELIVERED_VERIFIED", 
        authority: "District Supply Officer",
        officerName: "Tmt. V. Geetha, District Supply Officer",
        dispatchedAt: "2026-09-11 02:00 PM",
        verifiedDeliveredAt: "2026-09-11 05:45 PM",
        deliveryProof: "PDS Doorstep Delivery Acknowledgment #TN-DSO-412",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      },
      { 
        id: "INT-7", 
        type: "CHILD_COUNSELLING", 
        title: "Trauma counselling for minor children", 
        status: "SCHEDULED", 
        authority: "District Child Protection Unit",
        officerName: "Dr. K. Saravanan, Child Protection Officer",
        dispatchedAt: "2026-09-12 08:30 AM",
        verifiedDeliveredAt: "Scheduled for Today 03:00 PM",
        deliveryProof: "DCPU Case File #DCPU-109",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      }
    ]
  },
  {
    id: "NHAA-2026-102",
    victimName: "Sunita (Protected Survivor)",
    gender: "Female",
    age: 22,
    district: "Bhiwani",
    state: "Haryana",
    actCategory: "SC/ST (PoA) Act Sec 3(2)(v) & IPC 376D (Aggravated Gang Rape)",
    firNumber: "FIR No. 89/2026 - Women PS Bhiwani",
    caseType: "Sexual Assault & Atrocity",
    priorityCategory: "Victims of Rape & Gang Rape (Top Priority)",
    registrationDate: "2026-05-19",
    currentStage: "Cross-Examination in Fast Track Special Court (FTSC)",
    nextCourtDate: "2026-09-15 (In 3 Days)",
    assignedCounsellor: "Dr. Preeti Malik (Clinical Neuropsychologist)",
    assignedSpecialPP: "Adv. Sunita Hooda (FTSC Special Prosecutor)",
    districtNodalOfficer: "Shri Naresh Kumar, IAS",
    policeProtectionStatus: "24x7 2 Armed Women Police Constables",
    compensationDisbursed: "₹8,25,000 / ₹8,25,000 (100% Full Relief Disbursed)",

    // Real-Time Mental Health & Personal Baseline Distress
    personalBaselineDistress: 30,
    dynamicDistressScore: 92, // Severe Crisis
    baselineDelta: "+62 pts",
    riskCategory: "CRITICAL",
    riskTrend: "RISING_SHARP",
    lastInteractionChannel: "Tele-Health SOS Call (14566)",
    lastInteractionTimestamp: "Today, 06:45 AM",

    // Safe-Contact Protocol Preferences
    safeContactProtocol: {
      preferredChannel: "Direct NIMHANS Tele-Health Hotline",
      safeTimeWindow: "06:00 AM - 08:00 AM & 07:00 PM - 09:00 PM",
      discreetNotification: true,
      quickExitArmed: true,
      alternateContactMethod: "Dedicated Female Nodal Officer WhatsApp"
    },

    voiceAcousticMetrics: {
      pitchTremorHz: 18.6,
      jitterPercentage: 4.8,
      shimmerPercentage: 9.6,
      acousticPauseRatio: 47.1,
      speechRateWordsPerMin: 62,
      vocalStrainScore: 96,
      recordedClipDurationSec: 55,
      audioTranscriptExcerpt: "I cannot sit in that courtroom again with those men staring and laughing at me. The defence lawyer was asking disgraceful questions about my character. I would rather die than go on Monday."
    },

    sentimentMetrics: {
      overallSentiment: "Severe Acute PTSD & Panic Crisis",
      fearScore: 98,
      threatPerceptionScore: 94,
      isolationScore: 89,
      suicideIdeationRisk: "HIGH EMERGENCY RED ALERT",
      detectedKeywords: ["rather die", "staring and laughing", "disgraceful questions", "cannot sit in that courtroom", "panic"]
    },

    xaiAttribution: [
      { factor: "Hostile Courtroom Cross-Examination Trauma", weight: 42, description: "Secondary victimization during aggressive defence grilling" },
      { factor: "Active Suicidal Ideation Expression", weight: 31, description: "Explicit statements of despair ('rather die than attend')" },
      { factor: "Acute Acoustic Panic Dysphonia", weight: 17, description: "Extreme vocal constriction and micro-tremors (18.6 Hz)" },
      { factor: "Flashback Intrusion and Hypervigilance", weight: 10, description: "Reported somatic tremors and inability to retain food" }
    ],

    longitudinalHistory: [
      { day: "Aug 10", score: 72, note: "Pre-trial preparation with counsellor" },
      { day: "Aug 17", score: 69, note: "Stabilization therapy session" },
      { day: "Aug 24", score: 68, note: "Relief fund deposited" },
      { day: "Aug 31", score: 74, note: "Court summons served" },
      { day: "Sep 05", score: 81, note: "First day in witness box (Hostile environment)" },
      { day: "Sep 08", score: 86, note: "Severe insomnia and panic episodes" },
      { day: "Sep 12", score: 92, note: "Immediate distress alert triggered via 14566" }
    ],

    predictiveForecast: [
      { day: "Sep 13", projectedScore: 95, confidenceLower: 91, confidenceUpper: 98 },
      { day: "Sep 15", projectedScore: 99, confidenceLower: 95, confidenceUpper: 100, event: "CRITICAL RE-TRAUMATIZATION SPIKE" },
      { day: "Sep 18", projectedScore: 94, confidenceLower: 88, confidenceUpper: 98 }
    ],

    recommendedInterventions: [
      { 
        id: "INT-8", 
        type: "IN_CAMERA_TRIAL", 
        title: "Move Application for In-Camera Trial & Screened Witness Box (PoA Rule 12)", 
        status: "DELIVERED_VERIFIED", 
        authority: "Special Public Prosecutor",
        officerName: "Adv. Sunita Hooda (Special Prosecutor FTSC)",
        dispatchedAt: "2026-09-12 08:00 AM",
        verifiedDeliveredAt: "2026-09-12 10:15 AM",
        deliveryProof: "FTSC Urgent Application Diary No. 8944/2026 under PoA Rule 12",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      },
      { 
        id: "INT-9", 
        type: "PSYCHIATRIC_EMERGENCY", 
        title: "Deploy Mobile Crisis Psychiatric Intervention Unit immediately", 
        status: "DELIVERED_VERIFIED", 
        authority: "District Mental Health Program (DMHP)",
        officerName: "Dr. Sandeep Bishnoi, DMHP Crisis Response Team",
        dispatchedAt: "2026-09-12 07:15 AM",
        verifiedDeliveredAt: "2026-09-12 08:50 AM",
        deliveryProof: "Clinical Emergency Stabilization Certificate #DMHP-102",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      },
      { 
        id: "INT-10", 
        type: "SUPPORT_PERSON", 
        title: "Appoint trained trauma-informed Support Person under PoA guidelines", 
        status: "DELIVERED_VERIFIED", 
        authority: "District Legal Services Authority (DLSA)",
        officerName: "Smt. Neelam Kumari, DLSA Certified Support Person",
        dispatchedAt: "2026-09-12 09:00 AM",
        verifiedDeliveredAt: "2026-09-12 09:40 AM",
        deliveryProof: "DLSA Support Order #DLSA-BHW-2026-89",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      }
    ]
  },
  {
    id: "NHAA-2026-651",
    victimName: "Anil Meena (Protected)",
    gender: "Male",
    age: 34,
    district: "Baran",
    state: "Rajasthan",
    actCategory: "SC/ST (PoA) Act Sec 3(1)(s) - Public Humiliation & Assault",
    firNumber: "FIR No. 177/2026 - PS Kelwara",
    caseType: "Physical Assault & Humiliation",
    priorityCategory: "Beneficiary Under Rehabilitation",
    registrationDate: "2026-07-28",
    currentStage: "Charge Sheet Prepared | Awaiting Trial Allotment",
    nextCourtDate: "2026-10-12 (In 30 Days)",
    assignedCounsellor: "Shri Mahendra Singh, MSW",
    assignedSpecialPP: "Adv. Ramavtar Sharma",
    districtNodalOfficer: "Smt. Rohini Meena, RAS",
    policeProtectionStatus: "Occasional Patrol",
    compensationDisbursed: "₹1,50,000 / ₹3,00,000",

    // Real-Time Mental Health & Personal Baseline Distress
    personalBaselineDistress: 25,
    dynamicDistressScore: 42, // Moderate
    baselineDelta: "+17 pts",
    riskCategory: "MODERATE",
    riskTrend: "RECOVERING",
    lastInteractionChannel: "Automated SMS Pulse Check-in",
    lastInteractionTimestamp: "2 Days ago, 11:00 AM",

    // Safe-Contact Protocol Preferences
    safeContactProtocol: {
      preferredChannel: "Automated SMS Pulse Check-in",
      safeTimeWindow: "11:00 AM - 01:00 PM",
      discreetNotification: true,
      quickExitArmed: true,
      alternateContactMethod: "Village Gram Sevak Discreet Link"
    },

    voiceAcousticMetrics: {
      pitchTremorHz: 4.1,
      jitterPercentage: 0.9,
      shimmerPercentage: 2.8,
      acousticPauseRatio: 14.2,
      speechRateWordsPerMin: 128,
      vocalStrainScore: 38,
      recordedClipDurationSec: 28,
      audioTranscriptExcerpt: "I am feeling better now that the police took our statement properly. The local officer visits once a week. We are hoping the court process starts soon."
    },

    sentimentMetrics: {
      overallSentiment: "Cautious Optimism & Resilience",
      fearScore: 38,
      threatPerceptionScore: 35,
      isolationScore: 41,
      suicideIdeationRisk: "None Detected",
      detectedKeywords: ["feeling better", "police took statement", "cautious", "recovering"]
    },

    xaiAttribution: [
      { factor: "Adequate Local Police Responsive Contact", weight: 35, description: "Weekly sub-inspector visits created security reassurance" },
      { factor: "Timely Initial Compensation Release", weight: 25, description: "50% relief fund helped clear medical debts" },
      { factor: "Distant Court Hearing Date", weight: 25, description: "No immediate courtroom anxiety trigger this month" },
      { factor: "Strong Community Kinship Support", weight: 15, description: "Family network active in district headquarter" }
    ],

    longitudinalHistory: [
      { day: "Aug 14", score: 68, note: "Assault incident and FIR filing" },
      { day: "Aug 20", score: 62, note: "Arrest of main perpetrator" },
      { day: "Aug 26", score: 55, note: "Relief fund received" },
      { day: "Sep 01", score: 48, note: "Counselling session 1" },
      { day: "Sep 07", score: 44, note: "Return to partial livelihood" },
      { day: "Sep 11", score: 42, note: "Stable progress on SMS check-in" }
    ],

    predictiveForecast: [
      { day: "Sep 15", projectedScore: 40, confidenceLower: 35, confidenceUpper: 46 },
      { day: "Sep 22", projectedScore: 38, confidenceLower: 32, confidenceUpper: 44 },
      { day: "Sep 30", projectedScore: 45, confidenceLower: 38, confidenceUpper: 52, event: "Pre-trial briefing alert" }
    ],

    recommendedInterventions: [
      { 
        id: "INT-11", 
        type: "LIVELIHOOD_LINKAGE", 
        title: "Link victim to PM-DAKSH Skill Development & Mudra Scheme", 
        status: "DELIVERED_VERIFIED", 
        authority: "District Social Welfare Officer",
        officerName: "Smt. Rohini Meena, RAS (DSWO)",
        dispatchedAt: "2026-09-10 11:30 AM",
        verifiedDeliveredAt: "2026-09-11 03:30 PM",
        deliveryProof: "PM-DAKSH Registration Receipt #DAKSH-RJ-651",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      },
      { 
        id: "INT-12", 
        type: "ROUTINE_MONITORING", 
        title: "Maintain bi-weekly automated IVRS check-in cycle", 
        status: "DELIVERED_VERIFIED", 
        authority: "NHAA 14566 System",
        officerName: "NHAA Automated Gateway",
        dispatchedAt: "2026-09-11 11:00 AM",
        verifiedDeliveredAt: "2026-09-11 11:02 AM",
        deliveryProof: "SMS Delivery Confirmation #AIRTEL-98214",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      }
    ]
  },
  {
    id: "NHAA-2026-339",
    victimName: "Kavitha Madiga (Protected)",
    gender: "Female",
    age: 41,
    district: "Mahabubnagar",
    state: "Telangana",
    actCategory: "SC/ST (PoA) Act Sec 3(1)(za)(D) - Obstruction of Water Access",
    firNumber: "FIR No. 94/2026 - PS Jadcherla",
    caseType: "Caste Discrimination & Resource Denial",
    priorityCategory: "Families Affected by Caste-Based Violence",
    registrationDate: "2026-06-25",
    currentStage: "Charge Sheet Filed | Bail Hearing for Accused",
    nextCourtDate: "2026-09-24 (In 12 Days)",
    assignedCounsellor: "Dr. K. Srinivas Rao, Ph.D",
    assignedSpecialPP: "Adv. T. Chandrasekhar",
    districtNodalOfficer: "Smt. Sweta Mohanty, IAS",
    policeProtectionStatus: "Village Patrolling Team",
    compensationDisbursed: "₹2,00,000 / ₹4,00,000",

    // Real-Time Mental Health & Personal Baseline Distress
    personalBaselineDistress: 26,
    dynamicDistressScore: 59, // Moderate-High
    baselineDelta: "+33 pts",
    riskCategory: "MODERATE",
    riskTrend: "ELEVATED",
    lastInteractionChannel: "IVRS 14566 Follow-up Call (Telugu)",
    lastInteractionTimestamp: "Yesterday, 07:20 PM",

    // Safe-Contact Protocol Preferences
    safeContactProtocol: {
      preferredChannel: "IVRS 14566 Follow-up Call (Telugu)",
      safeTimeWindow: "06:30 PM - 08:30 PM",
      discreetNotification: true,
      quickExitArmed: true,
      alternateContactMethod: "Discreet Web App"
    },

    voiceAcousticMetrics: {
      pitchTremorHz: 6.8,
      jitterPercentage: 1.8,
      shimmerPercentage: 4.2,
      acousticPauseRatio: 22.1,
      speechRateWordsPerMin: 110,
      vocalStrainScore: 58,
      recordedClipDurationSec: 32,
      audioTranscriptExcerpt: "The accused person's family came to our house offering money to withdraw the case. They said if we do not withdraw before the bail hearing on the 24th, we will have to leave the village."
    },

    sentimentMetrics: {
      overallSentiment: "Coercion Stress & Anxious Uncertainty",
      fearScore: 64,
      threatPerceptionScore: 72,
      isolationScore: 55,
      suicideIdeationRisk: "Low",
      detectedKeywords: ["withdraw the case", "leave the village", "bail hearing", "offering money", "threat"]
    },

    xaiAttribution: [
      { factor: "Out-of-Court Coercion & Settlement Pressure", weight: 36, description: "Accused relatives pressurized victim family with eviction" },
      { factor: "Upcoming Bail Hearing Anxiety", weight: 28, description: "Fear that accused will return to village if granted regular bail" },
      { factor: "Acoustic Strain from Suppression", weight: 19, description: "Suppressed vocal tone and respiratory pauses" },
      { factor: "Livelihood Disruption in Village", weight: 17, description: "Loss of agricultural labor wages due to tension" }
    ],

    longitudinalHistory: [
      { day: "Aug 12", score: 62, note: "FIR registered after protest" },
      { day: "Aug 19", score: 54, note: "Police inquiry completed" },
      { day: "Aug 27", score: 50, note: "Borewell connection restored" },
      { day: "Sep 03", score: 51, note: "Routine IVRS check-in" },
      { day: "Sep 08", score: 56, note: "Accused applied for regular bail" },
      { day: "Sep 11", score: 59, note: "IVRS call reveals intimidation to compromise" }
    ],

    predictiveForecast: [
      { day: "Sep 14", projectedScore: 63, confidenceLower: 56, confidenceUpper: 70 },
      { day: "Sep 18", projectedScore: 68, confidenceLower: 60, confidenceUpper: 76 },
      { day: "Sep 24", projectedScore: 77, confidenceLower: 68, confidenceUpper: 86, event: "BAIL ORDER UNCERTAINTY" }
    ],

    recommendedInterventions: [
      { 
        id: "INT-13", 
        type: "WITNESS_INTIMIDATION_REPORT", 
        title: "File Section 15A (Witness Rights) report against accused for coercion", 
        status: "URGENT_PENDING", 
        authority: "Investigating Officer (DSP)",
        officerName: "DSP K. Venkat Reddy (SDPO Jadcherla)",
        dispatchedAt: "2026-09-12 08:45 AM",
        verifiedDeliveredAt: "Inquiry Scheduled for 04:00 PM",
        deliveryProof: "PoA Sec 15A Inquiry Docket #CO-JDC-94",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      },
      { 
        id: "INT-14", 
        type: "COUNSELLING_TELE", 
        title: "Empowerment & rights reassurance tele-counselling session", 
        status: "SCHEDULED", 
        authority: "Assigned Counsellor",
        officerName: "Dr. K. Srinivas Rao, Ph.D (Lead Clinical Counsellor)",
        dispatchedAt: "2026-09-12 09:30 AM",
        verifiedDeliveredAt: "Slot Booked for 06:00 PM",
        deliveryProof: "Tele-MANAS Consultation Slot #TM-TS-339",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      },
      { 
        id: "INT-15", 
        type: "POLICE_PATROL_STRENGTHEN", 
        title: "Increase nocturnal police picketing near victim residence", 
        status: "DELIVERED_VERIFIED", 
        authority: "Sub-Divisional Police Officer",
        officerName: "Sub-Inspector PS Jadcherla",
        dispatchedAt: "2026-09-11 08:00 PM",
        verifiedDeliveredAt: "2026-09-11 09:15 PM",
        deliveryProof: "Night Picket General Diary Entry #GD-1109-PSJ",
        humanReviewStatus: "VERIFIED_BY_COUNSELLOR"
      }
    ]
  }
];

export const MOCK_DISTRICTS_DATA = [
  {
    state: "Uttar Pradesh",
    district: "Aligarh",
    activeMonitoredVictims: 142,
    criticalDistressCases: 19,
    highRiskCases: 38,
    avgInterventionResponseMins: 22,
    reliefFundsDisbursedCr: "₹4.82",
    preventedCrisisEvents: 67,
    nhaaHelplineInteractions: 894,
    teleCounsellingSessions: 520
  },
  {
    state: "Haryana",
    district: "Bhiwani",
    activeMonitoredVictims: 88,
    criticalDistressCases: 14,
    highRiskCases: 21,
    avgInterventionResponseMins: 16,
    reliefFundsDisbursedCr: "₹3.15",
    preventedCrisisEvents: 43,
    nhaaHelplineInteractions: 612,
    teleCounsellingSessions: 390
  },
  {
    state: "Tamil Nadu",
    district: "Dharmapuri",
    activeMonitoredVictims: 104,
    criticalDistressCases: 8,
    highRiskCases: 27,
    avgInterventionResponseMins: 18,
    reliefFundsDisbursedCr: "₹3.90",
    preventedCrisisEvents: 52,
    nhaaHelplineInteractions: 745,
    teleCounsellingSessions: 460
  },
  {
    state: "Rajasthan",
    district: "Baran",
    activeMonitoredVictims: 95,
    criticalDistressCases: 6,
    highRiskCases: 18,
    avgInterventionResponseMins: 24,
    reliefFundsDisbursedCr: "₹2.95",
    preventedCrisisEvents: 38,
    nhaaHelplineInteractions: 530,
    teleCounsellingSessions: 310
  },
  {
    state: "Telangana",
    district: "Mahabubnagar",
    activeMonitoredVictims: 112,
    criticalDistressCases: 11,
    highRiskCases: 29,
    avgInterventionResponseMins: 19,
    reliefFundsDisbursedCr: "₹3.40",
    preventedCrisisEvents: 49,
    nhaaHelplineInteractions: 680,
    teleCounsellingSessions: 415
  },
  {
    state: "Madhya Pradesh",
    district: "Gwalior",
    activeMonitoredVictims: 135,
    criticalDistressCases: 17,
    highRiskCases: 34,
    avgInterventionResponseMins: 25,
    reliefFundsDisbursedCr: "₹4.60",
    preventedCrisisEvents: 58,
    nhaaHelplineInteractions: 820,
    teleCounsellingSessions: 490
  },
  {
    state: "Bihar",
    district: "Gaya",
    activeMonitoredVictims: 168,
    criticalDistressCases: 23,
    highRiskCases: 46,
    avgInterventionResponseMins: 28,
    reliefFundsDisbursedCr: "₹5.70",
    preventedCrisisEvents: 74,
    nhaaHelplineInteractions: 1020,
    teleCounsellingSessions: 610
  }
];

export const NATIONAL_AGGREGATES = {
  totalMonitoredNationwide: 18450,
  activeCriticalAlerts: 412,
  crisesPredictedAndDeescalated: 6890,
  avgDispatchLatencyMinutes: 18.4,
  totalReliefDisbursedCr: "₹184.6",
  registeredHelpline14566Calls: 84200,
  aiSpeechAnalysisAccuracy: "94.8%",
  poaWitnessProtectionOrdersEnforced: 2180,
  activeStatePortalsConnected: 36
};

export const PRESET_AUDIO_SAMPLES = [
  {
    id: "sample-threat-high",
    title: "High Distress: Witness Intimidation Excerpt",
    victimTag: "Case #894 - Ramesh Kumar",
    simulatedScore: 88,
    pitchTremor: 15.4,
    jitter: 3.6,
    shimmer: 8.2,
    pauseRatio: 41,
    transcript: "They told my boy that if I go to the court this Thursday, they will make sure nobody comes back from our house. We are locked inside. Please send help.",
    riskAlert: "CRITICAL: Threat to Life & Witness Tampering Detected"
  },
  {
    id: "sample-court-anxiety",
    title: "Severe Panic: Pre-Courtroom Re-Traumatization",
    victimTag: "Case #102 - Sunita Valmiki",
    simulatedScore: 94,
    pitchTremor: 19.2,
    jitter: 4.9,
    shimmer: 10.1,
    pauseRatio: 48,
    transcript: "I cannot face them again. The defense was laughing at me in front of everyone. I feel suffocated, my chest is pounding, I cannot do this anymore.",
    riskAlert: "CRITICAL EMERGENCY: Acute Panic Dysphonia & Suicide Ideation Risk"
  },
  {
    id: "sample-stabilized",
    title: "Moderate / Stable: Follow-up Post Relief Fund",
    victimTag: "Case #651 - Anil Meena",
    simulatedScore: 41,
    pitchTremor: 3.9,
    jitter: 0.88,
    shimmer: 2.7,
    pauseRatio: 12,
    transcript: "The nodal officer came yesterday and verified the relief installment. The local beat constable has been passing by our street. We feel somewhat safer today.",
    riskAlert: "NORMAL / MONITORING: De-escalation Verified"
  }
];
