// SAHAYA-360 Multilingual Stakeholder Intelligence Dossiers
// Comprehensive translations in English (en), Tamil (ta), Hindi (hi), Marathi (mr), Telugu (te)
// Calibrated for MoSJE & SC/ST (PoA) Act 1989 legal standards

export const STAKEHOLDER_LABELS = {
  en: {
    lbl_who: "Who Are They? (Identity & Cadre)",
    lbl_why: "Why Do They Exist in SAHAYA-360? (Core Purpose)",
    lbl_roles: "Statutory Roles & Legal Responsibilities (SC/ST PoA Act 1989)",
    btn_close: "Close Dossier",
    close_title: "Close stakeholder dossier"
  },
  ta: {
    lbl_who: "அவர்கள் யார்? (அடையாளம் & பதவி வரிசை)",
    lbl_why: "SAHAYA-360-ல் அவர்கள் ஏன் உள்ளனர்? (முதன்மை நோக்கம்)",
    lbl_roles: "சட்டப்பூர்வ பணிகள் & பொறுப்புகள் (வன்கொடுமை தடுப்புச் சட்டம் 1989)",
    btn_close: "விவரங்களை மூடு",
    close_title: "பங்களிப்பாளர் விவரங்களை மூடு"
  },
  hi: {
    lbl_who: "वे कौन हैं? (पहचान एवं कैडर)",
    lbl_why: "वे SAHAYA-360 में क्यों मौजूद हैं? (मूल उद्देश्य)",
    lbl_roles: "वैधानिक भूमिकाएं और कानूनी जिम्मेदारियां (एससी/एसटी अत्याचार निवारण अधिनियम 1989)",
    btn_close: "डोज़ियर बंद करें",
    close_title: "हितधारक डोज़ियर बंद करें"
  },
  mr: {
    lbl_who: "ते कोण आहेत? (ओळख आणि संवर्ग)",
    lbl_why: "ते SAHAYA-360 मध्ये का अस्तित्वात आहेत? (मूळ उद्देश)",
    lbl_roles: "वैधानिक भूमिका आणि कायदेशीर जबाबदाऱ्या (ॲट्रॉसिटी प्रतिबंधक कायदा १९८९)",
    btn_close: "माहिती बंद करा",
    close_title: "हितधारक तपशील बंद करा"
  },
  te: {
    lbl_who: "వీరు ఎవరు? (గుర్తింపు & కేడర్)",
    lbl_why: "వీరు SAHAYA-360 లో ఎందుకు ఉన్నారు? (ప్రధాన ఉద్దేశం)",
    lbl_roles: "చట్టబద్ధమైన విధులు మరియు చట్టపరమైన బాధ్యతలు (SC/ST అత్యాచారాల నిరోధక చట్టం 1989)",
    btn_close: "డాక్యుమెంట్ మూసివేయి",
    close_title: "స్టేక్‌హోల్డర్ వివరాలు మూసివేయి"
  }
};

export const STAKEHOLDER_DOSSIERS_BY_LANG = {
  en: {
    district: {
      id: 'district',
      badge: 'DISTRICT VIGILANCE & MAGISTRATE DESK',
      badgeColor: '#0284c7',
      badgeBg: 'rgba(2, 132, 199, 0.1)',
      name: 'District Magistrate (IAS) & Superintendent of Police (IPS)',
      designation: 'Statutory District Vigilance Officers (DVO) & Special PoA Enforcement Command',
      icon: '⚖️',
      who: 'The principal executive and law enforcement authorities of the district administration. Under the SC/ST (PoA) Rules 1995/2016, the District Magistrate (Collector) and Superintendent of Police jointly head the District Vigilance & Monitoring Committee (DVMC) and supervise all Special PoA Police Units.',
      why: 'Under the statutory provisions of the SC/ST (PoA) Act 1989, only the District Magistrate and SP possess the legal administrative authority to authorize emergency DBT compensation funds, order 24×7 armed witness protection, assign DSP-rank inquiry officers, and prevent social boycotts in vulnerable caste clusters.',
      roles: [
        {
          title: 'Rule 12(4) Direct DBT Relief Clearance',
          desc: 'Statutorily mandated to sanction and disburse 50% interim relief compensation (₹1,00,000 to ₹8,25,000) directly to survivor bank accounts within 7 days of FIR registration without awaiting trial completion.'
        },
        {
          title: 'Section 15A Witness Protection Enforcement',
          desc: 'Directs round-the-clock armed police escorts, provides safe house relocation, and conceals victim identity in judicial records to prevent local intimidation and witness hostility.'
        },
        {
          title: 'Rule 7(2) 60-Day Investigation Oversight',
          desc: 'Mandates that inquiry by a Deputy Superintendent of Police (DSP) is finalized and charge sheet filed in the Special Court within 60 days, reviewed fortnightly by the DM.'
        },
        {
          title: 'Preventive Measures & Peace Bonds',
          desc: 'Executes Section 17 & CrPC preventive security bonds in identified atrocity-prone pockets and conducts surprise night beat patrols in vulnerable settlements.'
        }
      ],
      actionRole: 'district',
      actionLabel: 'Proceed to District DM/SP Command Desk'
    },
    national: {
      id: 'national',
      badge: 'CENTRAL APEX COMMAND · GOVT OF INDIA',
      badgeColor: '#ea580c',
      badgeBg: 'rgba(234, 88, 12, 0.1)',
      name: 'Ministry of Social Justice & Empowerment (MoSJE)',
      designation: 'Central Scheduled Castes & Tribes Vigilance Grid (Govt of India)',
      icon: '🏛️',
      who: 'Joint Secretaries, Central Vigilance Directors, and National Nodal Officers of the Department of Social Justice & Empowerment, Government of India, operating in coordination with the National Commission for Scheduled Castes (NCSC).',
      why: 'To maintain unified apex sovereign oversight across all 28 States and 8 Union Territories. The National Desk eliminates interstate jurisdictional bottlenecks, audits delayed investigations, releases matching Central Share DBT relief funds, and ensures compliance with Parliament mandates.',
      roles: [
        {
          title: 'National Atrocity Hotspot Grid & AI Analytics',
          desc: 'Monitors real-time spatial clustering of repeat atrocity zones, inter-district patterns, and systemic law enforcement delays across all state borders.'
        },
        {
          title: 'National Helpline 14566 Oversight',
          desc: 'Live supervisory tracking of toll-free 14566 distress calls, operator response velocity, and automated Zero-FIR electronic docket handoffs to state DMs.'
        },
        {
          title: 'Central DBT Budget Allocation & Disbursal',
          desc: 'Releases matching 50% central grants to State Governments under Centrally Sponsored Schemes, tracking direct beneficiary transfers end-to-end.'
        },
        {
          title: 'Parliamentary & Statutory Annual Reporting',
          desc: 'Compiles and presents annual statutory implementation, conviction rate, and rehabilitation audit reports to the Parliament of India under Section 21(4).'
        }
      ],
      actionRole: 'national',
      actionLabel: 'Proceed to National MoSJE Grid'
    },
    counsellor: {
      id: 'counsellor',
      badge: 'CLINICAL TELE-MENTAL HEALTH DESK',
      badgeColor: '#16a34a',
      badgeBg: 'rgba(22, 163, 74, 0.1)',
      name: 'Empanelled Clinical Psychologist & Crisis Counsellor',
      designation: 'NIMHANS-Empanelled Tele-Mental Health Specialist (MoSJE Triage)',
      icon: '🩺',
      who: 'Licensed clinical psychologists, psychiatric social workers, and trauma specialists empanelled under NIMHANS and the National Helpline Against Atrocities (NHAA 14566), trained in hate crime psychological trauma and caste-atrocity PTSD.',
      why: 'Atrocity survivors frequently suffer acute psychological shock, existential dread, humiliation, and severe suicidal ideation. Without immediate trauma triage, victims face long-term trauma paralysis and often drop legal proceedings under intense local coercion. The Clinical Desk delivers immediate psychological safety, voice biomarker assessment, and healing.',
      roles: [
        {
          title: 'Immediate Multilingual Crisis Intervention',
          desc: 'Conducts immediate emotional stabilization, empathetic de-escalation, and suicide risk assessments via toll-free 14566 in the survivor’s native language.'
        },
        {
          title: 'Voice Stress & Acoustic AI Biomarkers',
          desc: 'Analyzes micro-tremors, speech pitch irregularities, and hesitation markers to objectively evaluate trauma depth without subjecting survivors to repetitive interrogation.'
        },
        {
          title: 'PHQ-9 & GAD-7 Evaluation Dossiers',
          desc: 'Generates validated psychological impact dossiers submitted to Special PoA Courts and magistrates to justify enhanced psychiatric and medical relief funds.'
        },
        {
          title: 'Long-Term Community Rehabilitation',
          desc: 'Coordinates continuous tele-counseling sessions and connects survivors with district mental health officers and local community health workers.'
        }
      ],
      actionRole: 'counsellor',
      actionLabel: 'Proceed to Clinical Counsellor Desk'
    },
    victim: {
      id: 'victim',
      badge: 'STATUTORY CITIZEN & SURVIVOR GATEWAY',
      badgeColor: '#7c3aed',
      badgeBg: 'rgba(124, 58, 237, 0.1)',
      name: 'Protected Citizen & Atrocity Survivor (Citizen Portal)',
      designation: 'Direct Beneficiary & Legal Rights Gateway (SC/ST PoA Act 1989)',
      icon: '🛡️',
      who: 'Vulnerable citizens, atrocity victims, their families, and frontline community rights defenders across India seeking immediate state protection, emergency rescue, or statutory economic rehabilitation.',
      why: 'SAHAYA-360 is built around the citizen. Traditional reporting often fails due to local police resistance, fear of backlash from dominant perpetrators, and lack of information on legal rights. This portal puts statutory power into the survivor’s hands with an untamperable digital trail straight to the District Magistrate.',
      roles: [
        {
          title: 'Mandatory Zero-FIR & Rapid Rescue Dispatch',
          desc: 'Allows instant grievance and rescue filing with GPS coordinates, auto-dispatching priority dockets to the District SP and nearest police station.'
        },
        {
          title: 'Milestone-by-Milestone Relief DBT Tracking',
          desc: 'Allows victims to track their statutory compensation (₹1,00,000 to ₹8,25,000) from District Magistrate sanction to final Aadhaar DBT bank credit.'
        },
        {
          title: 'Section 15A Witness Protection Requests',
          desc: 'Enables direct one-touch applications for armed police beat patrols, safe houses, and government-funded travel allowance for attending court hearings.'
        },
        {
          title: 'Discreet Camouflage & Multilingual Reporting',
          desc: 'Features a one-click camouflage screen (weather disguise) and voice-to-text intake in Telugu, Tamil, Hindi, Marathi, and English for confidential reporting.'
        }
      ],
      actionRole: 'victim',
      actionLabel: 'Enter Protected Citizen Portal'
    }
  },

  ta: {
    district: {
      id: 'district',
      badge: 'மாவட்ட கண்காணிப்பு & நடுவர் அமர்வு',
      badgeColor: '#0284c7',
      badgeBg: 'rgba(2, 132, 199, 0.1)',
      name: 'மாவட்ட ஆட்சியர் (IAS) & காவல் கண்காணிப்பாளர் (IPS)',
      designation: 'சட்டப்பூர்வ மாவட்ட கண்காணிப்பு அலுவலர்கள் (DVO) & சிறப்பு அமலாக்கப் பிரிவு',
      icon: '⚖️',
      who: 'மாவட்ட நிர்வாகத்தின் முதன்மை நிர்வாக மற்றும் சட்டம் ஒழுங்கு அதிகாரிகள். வன்கொடுமை தடுப்பு விதிகள் 1995/2016 கீழ், மாவட்ட ஆட்சியர் மற்றும் மாவட்ட காவல் கண்காணிப்பாளர் இணைந்து மாவட்ட கண்காணிப்புக் குழுவை (DVMC) வழிநடத்தி, அனைத்து சிறப்பு காவல் பிரிவுகளையும் மேற்பார்வையிடுகின்றனர்.',
      why: 'வன்கொடுமை தடுப்புச் சட்டம் 1989-இன் கீழ், அவசர நேரடி வங்கிப் பரிவர்த்தனை (DBT) நிவாரண நிதியை அனுமதிக்கவும், 24×7 ஆயுதம் ஏந்திய சாட்சி பாதுகாப்பை வழங்கவும், டிஎஸ்பி அந்தஸ்து விசாரணை அதிகாரிகளை நியமிக்கவும், சாதிய புறக்கணிப்புகளைத் தடுக்கவும் மாவட்ட ஆட்சியர் மற்றும் எஸ்பி-க்கு மட்டுமே சட்டப்பூர்வ அதிகாரம் உள்ளது.',
      roles: [
        {
          title: 'விதி 12(4) நேரடி DBT நிவாரண அனுமதி',
          desc: 'முதல் தகவல் அறிக்கை (FIR) பதிவு செய்யப்பட்ட 7 நாட்களுக்குள், வழக்கு விசாரணை முடிவடைவதற்கு முன்பாகவே 50% இடைக்கால நிவாரணத்தை (₹1,00,000 முதல் ₹8,25,000 வரை) நேரடியாக பாதிக்கப்பட்டவரின் வங்கிக் கணக்கில் வழங்க சட்டப்பூர்வ ஆணை.'
        },
        {
          title: 'பிரிவு 15A சாட்சி பாதுகாப்பு அமலாக்கம்',
          desc: 'உள்ளூர் அச்சுறுத்தல்கள் மற்றும் சாட்சி பிறழ்வைத் தடுக்க 24 மணி நேர ஆயுதப்படை பாதுகாப்பு, பாதுகாப்பான இருப்பிட இடமாற்றம் மற்றும் நீதிமன்ற ஆவணங்களில் அடையாள ரகசியம் காத்தல்.'
        },
        {
          title: 'விதி 7(2) 60-நாள் விசாரணை மேற்பார்வை',
          desc: 'துணை காவல் கண்காணிப்பாளர் (DSP) விசாரணையை 60 நாட்களுக்குள் முடித்து சிறப்பு நீதிமன்றத்தில் குற்றப்பத்திரிகை தாக்கல் செய்வதை உறுதி செய்தல், மாவட்ட ஆட்சியரால் இருவார ஆய்வுக் கூட்டம் நடத்துதல்.'
        },
        {
          title: 'தடுப்பு நடவடிக்கைகள் & அமைதி பத்திரங்கள்',
          desc: 'வன்கொடுமை ஏற்பட வாய்ப்புள்ள பகுதிகளில் பிரிவு 17 மற்றும் CrPC தடுப்பு பிணைப் பத்திரங்களை நடைமுறைப்படுத்துதல் மற்றும் இரவு நேர திடீர் ரோந்துப் பணிகளை மேற்கொள்ளுதல்.'
        }
      ],
      actionRole: 'district',
      actionLabel: 'மாவட்ட ஆட்சியர் / எஸ்பி கன்சோலுக்குச் செல்லவும்'
    },
    national: {
      id: 'national',
      badge: 'மத்திய உச்சகட்ட கட்டளை · இந்திய அரசு',
      badgeColor: '#ea580c',
      badgeBg: 'rgba(234, 88, 12, 0.1)',
      name: 'சமூக நீதி மற்றும் அதிகாரமளித்தல் அமைச்சகம் (MoSJE)',
      designation: 'மத்திய பட்டியலின & பழங்குடியினர் கண்காணிப்பு வலைப்பின்னல் (இந்திய அரசு)',
      icon: '🏛️',
      who: 'இந்திய அரசின் சமூக நீதி மற்றும் அதிகாரமளித்தல் துறையின் இணைச் செயலாளர்கள், மத்திய கண்காணிப்பு இயக்குநர்கள் மற்றும் தேசிய ஒருங்கிணைப்பு அலுவலர்கள், தேசிய பட்டியலின ஆணையத்துடன் (NCSC) இணைந்து செயல்படுகின்றனர்.',
      why: 'அனைத்து 28 மாநிலங்கள் மற்றும் 8 யூனியன் பிரதேசங்களில் ஒரே சீரான மேலாண்மையை உறுதி செய்தல். மாநிலங்களுக்கிடையேயான எல்லை சிக்கல்களைத் தீர்த்தல், தாமதமான வழக்குகளை தணிக்கை செய்தல் மற்றும் மத்திய அரசின் நேரடி DBT நிதியை விடுவித்தல்.',
      roles: [
        {
          title: 'தேசிய வன்கொடுமை பகுப்பாய்வு & AI வரைபடம்',
          desc: 'மீண்டும் மீண்டும் வன்கொடுமை நிகழும் பகுதிகள் மற்றும் மாநில எல்லைகளில் ஏற்படும் தாமதங்களை நிகழ்நேர செயற்கை நுண்ணறிவு வரைபடம் மூலம் கண்காணித்தல்.'
        },
        {
          title: 'தேசிய உதவி எண் 14566 மேற்பார்வை',
          desc: 'கட்டணமில்லா 14566 உதவி எண் அழைப்புகள் மற்றும் தானியங்கி ஜீரோ-எஃப்ஐஆர் ஆவணங்களை உடனுக்குடன் மாவட்ட ஆட்சியர்களுக்கு அனுப்புவதைக் கண்காணித்தல்.'
        },
        {
          title: 'மத்திய DBT நிதி ஒதுக்கீடு & பட்டுவாடா',
          desc: 'மத்திய நிதியுதவித் திட்டங்களின் கீழ் மாநில அரசுகளுக்கு 50% மத்திய பங்கை விடுவித்து, நேரடி பலனடைவோரின் கணக்கிற்குச் செல்வதை இறுதிவரை கண்காணித்தல்.'
        },
        {
          title: 'நாடாளுமன்ற சட்டப்பூர்வ ஆண்டு அறிக்கை',
          desc: 'சட்டப்பிரிவு 21(4)-இன் கீழ் சட்டம் அமலாக்கம், தண்டனை விகிதம் மற்றும் மறுவாழ்வு பற்றிய விரிவான அறிக்கைகளை இந்திய நாடாளுமன்றத்தில் சமர்ப்பித்தல்.'
        }
      ],
      actionRole: 'national',
      actionLabel: 'மத்திய MoSJE கட்டளை மையத்திற்குச் செல்லவும்'
    },
    counsellor: {
      id: 'counsellor',
      badge: 'மருத்துவ மனநல ஆலோசனைக் கூடம்',
      badgeColor: '#16a34a',
      badgeBg: 'rgba(22, 163, 74, 0.1)',
      name: 'அங்கீகரிக்கப்பட்ட மருத்துவ உளவியலாளர் & அவசர ஆலோசகர்',
      designation: 'நிம்ஹான்ஸ் (NIMHANS) அங்கீகாரம் பெற்ற தொலைதூர மனநல நிபுணர் (MoSJE)',
      icon: '🩺',
      who: 'நிம்ஹான்ஸ் மற்றும் தேசிய உதவி எண் (14566) கீழ் பதிவுசெய்யப்பட்ட உரிமம் பெற்ற மருத்துவ உளவியலாளர்கள் மற்றும் மனநல நிபுணர்கள்; வெறுப்புக் குற்றங்கள் மற்றும் சாதிய அதிர்ச்சி சார்ந்த சிகிச்சைகளில் பயிற்சி பெற்றவர்கள்.',
      why: 'வன்கொடுமைக்கு ஆளானவர்கள் கடுமையான மன அதிர்ச்சி, அவமானம் மற்றும் தீவிர தற்கொலை எண்ணங்களை எதிர்கொள்கின்றனர். உடனடி உளவியல் ஆதரவு இல்லாமல், பாதிக்கப்பட்டவர்கள் நீண்டகால மன அழுத்தத்திற்கு ஆளாகி வழக்குகளை கைவிட நேரிடுகிறது. இந்த பிரிவு உடனடி மனநல பாதுகாப்பையும் குரல் அடிப்படையிலான மன அழுத்த மதிப்பீட்டையும் வழங்குகிறது.',
      roles: [
        {
          title: 'உடனடி பலமொழி அவசர ஆலோசனை',
          desc: '14566 கட்டணமில்லா தொலைபேசி மூலம் பாதிக்கப்பட்டவரின் தாய்மொழியிலேயே உடனடி உணர்ச்சி நிலைப்படுத்தல் மற்றும் தற்கொலை அபாய தடுப்பு வழங்குதல்.'
        },
        {
          title: 'குரல் அழுத்தம் & ஒலி AI பயோமார்க்கர்கள்',
          desc: 'மீண்டும் மீண்டும் விசாரணை செய்து காயப்படுத்தாமல், பாதிக்கப்பட்டவரின் குரல் அதிர்வுகள் மூலம் மன அழுத்தத்தின் தீவிரத்தை புறநிலையாக மதிப்பீடு செய்தல்.'
        },
        {
          title: 'PHQ-9 & GAD-7 மனநல தாக்க ஆவணங்கள்',
          desc: 'நீதிமன்றங்கள் மற்றும் நடுவர்களிடம் சமர்ப்பிக்க மருத்துவ சான்றளிக்கப்பட்ட மனநல அறிக்கைகளை உருவாக்கி கூடுதல் இழப்பீடு பெற்றுத் தருதல்.'
        },
        {
          title: 'நீண்டகால சமூக மறுவாழ்வு ஆதரவு',
          desc: 'தொடர் தொலைபேசி ஆலோசனைகளை ஒருங்கிணைத்து, மாவட்ட மனநல அலுவலர்கள் மற்றும் உள்ளூர் சுகாதார பணியாளர்களுடன் இணைத்தல்.'
        }
      ],
      actionRole: 'counsellor',
      actionLabel: 'மருத்துவ ஆலோசகர் மேசைக்குச் செல்லவும்'
    },
    victim: {
      id: 'victim',
      badge: 'சட்டப்பூர்வ குடிமக்கள் & பாதிக்கப்பட்டோர் நுழைவு வாயில்',
      badgeColor: '#7c3aed',
      badgeBg: 'rgba(124, 58, 237, 0.1)',
      name: 'பாதுகாக்கப்பட்ட குடிமகன் & பாதிக்கப்பட்டவர் (குடிமக்கள் தளம்)',
      designation: 'நேரடி பயனாளி & சட்ட உரிமைகள் மையம் (வன்கொடுமை தடுப்புச் சட்டம் 1989)',
      icon: '🛡️',
      who: 'பாதிக்கப்பட்ட குடிமக்கள், அவர்களின் குடும்பத்தினர் மற்றும் உரிமைகள் களப் பணியாளர்கள் உடனடி அரசு பாதுகாப்பு, அவசர மீட்பு அல்லது பொருளாதார மறுவாழ்வை நாடும் தளம்.',
      why: 'SAHAYA-360 குடிமக்களை மையமாகக் கொண்டது. உள்ளூர் காவல்துறை தாமதம் மற்றும் ஆதிக்க சக்திகளின் மிரட்டல்களைத் தாண்டி, மாவட்ட ஆட்சியருக்கு நேரடியாகச் செல்லும் டிஜிட்டல் அதிகாரத்தை இத்தளம் பாதிக்கப்பட்டோரின் கைகளில் வழங்குகிறது.',
      roles: [
        {
          title: 'கட்டாய ஜீரோ-எஃப்ஐஆர் & விரைவு மீட்பு',
          desc: 'ஜிபிஎஸ் இருப்பிடத்துடன் உடனடியாகப் புகார் பதிவு செய்து, எஸ்பி மற்றும் அருகில் உள்ள காவல் நிலையத்திற்கு உடனடி அவசர மீட்புக் கோரிக்கையை அனுப்புதல்.'
        },
        {
          title: 'நேரடி DBT நிவாரண நிதி கண்காணிப்பு',
          desc: 'சட்டப்பூர்வ நிவாரணத் தொகையை (₹1,00,000 முதல் ₹8,25,000 வரை) ஆட்சியர் அனுமதி முதல் ஆதார் வங்கிப் பரிவர்த்தனை வரை படிப்படியாகக் கண்காணித்தல்.'
        },
        {
          title: 'பிரிவு 15A சாட்சி பாதுகாப்பு விண்ணப்பம்',
          desc: 'ஆயுதம் ஏந்திய காவல் பாதுகாப்பு, பாதுகாப்பான தங்குமிடம் மற்றும் நீதிமன்ற விசாரணைக்கான அரசுப் பயணப் படிகளை ஒரே கிளிக்கில் பெறுதல்.'
        },
        {
          title: 'ரகசிய உருமறைப்பு & குரல் வழிப் புகார்',
          desc: 'வானிலை திரை போன்ற உருமறைப்பு வசதி மற்றும் தமிழ், தெலுங்கு, இந்தி, மராத்தி, ஆங்கிலத்தில் குரல் வழியாக ரகசியமாகப் புகார் அளிக்கும் வசதி.'
        }
      ],
      actionRole: 'victim',
      actionLabel: 'பாதுகாக்கப்பட்ட குடிமக்கள் தளத்திற்குள் நுழையவும்'
    }
  },

  hi: {
    district: {
      id: 'district',
      badge: 'जिला सतर्कता एवं मजिस्ट्रेट डेस्क',
      badgeColor: '#0284c7',
      badgeBg: 'rgba(2, 132, 199, 0.1)',
      name: 'जिला मजिस्ट्रेट (IAS) एवं पुलिस अधीक्षक (IPS)',
      designation: 'वैधानिक जिला सतर्कता अधिकारी (DVO) एवं विशेष अत्याचार निवारण कमान',
      icon: '⚖️',
      who: 'जिला प्रशासन के प्रमुख प्रशासनिक एवं कानून प्रवर्तन अधिकारी। एससी/एसटी (पीओए) नियम 1995/2016 के तहत जिला मजिस्ट्रेट और पुलिस अधीक्षक संयुक्त रूप से जिला सतर्कता एवं निगरानी समिति (DVMC) का नेतृत्व करते हैं और सभी विशेष पुलिस इकाइयों की निगरानी करते हैं।',
      why: 'एससी/एसटी (पीओए) अधिनियम 1989 के वैधानिक प्रावधानों के तहत, केवल डीएम और एसपी के पास ही आपातकालीन डीबीटी राहत राशि स्वीकृत करने, 24×7 सशस्त्र गवाह सुरक्षा प्रदान करने, डीएसपी-रैंक के जांच अधिकारी नियुक्त करने और सामाजिक बहिष्कार रोकने का कानूनी अधिकार है।',
      roles: [
        {
          title: 'नियम 12(4) प्रत्यक्ष डीबीटी राहत निकासी',
          desc: 'एफआईआर दर्ज होने के 7 दिनों के भीतर बिना मुकदमे की प्रतीक्षा किए 50% अंतरिम राहत राशि (₹1,00,000 से ₹8,25,000) सीधे पीड़ित के बैंक खाते में भेजने का वैधानिक दायित्व।'
        },
        {
          title: 'धारा 15A गवाह सुरक्षा प्रवर्तन',
          desc: 'स्थानीय धमकियों और गवाहों के मुकरने को रोकने के लिए 24 घंटे सशस्त्र पुलिस सुरक्षा, सुरक्षित आवास स्थानांतरण और अदालती रिकॉर्ड में पहचान गोपनीय रखना।'
        },
        {
          title: 'नियम 7(2) 60-दिवसीय जांच निगरानी',
          desc: 'उप पुलिस अधीक्षक (DSP) द्वारा 60 दिनों के भीतर जांच पूरी कर विशेष अदालत में आरोप पत्र दाखिल कराना सुनिश्चित करना, जिसकी पाक्षिक समीक्षा डीएम द्वारा की जाती है।'
        },
        {
          title: 'निवारक उपाय एवं शांति बांड',
          desc: 'पहचाने गए संवेदनशील क्षेत्रों में धारा 17 और सीआरपीसी के तहत सुरक्षा बांड निष्पादित करना और बस्तियों में औचक रात्रि गश्त आयोजित करना।'
        }
      ],
      actionRole: 'district',
      actionLabel: 'जिला डीएम/एसपी कमान डेस्क पर जाएं'
    },
    national: {
      id: 'national',
      badge: 'केंद्रीय शीर्ष कमान · भारत सरकार',
      badgeColor: '#ea580c',
      badgeBg: 'rgba(234, 88, 12, 0.1)',
      name: 'सामाजिक न्याय और अधिकारिता मंत्रालय (MoSJE)',
      designation: 'केंद्रीय अनुसूचित जाति/जनजाति सतर्कता ग्रिड (भारत सरकार)',
      icon: '🏛️',
      who: 'सामाजिक न्याय और अधिकारिता विभाग, भारत सरकार के संयुक्त सचिव, केंद्रीय सतर्कता निदेशक और राष्ट्रीय नोडल अधिकारी, जो राष्ट्रीय अनुसूचित जाति आयोग (NCSC) के साथ समन्वय में कार्य करते हैं।',
      why: 'सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों में एकीकृत शीर्ष संप्रभु निगरानी बनाए रखना। यह डेस्क अंतर्राज्यीय अधिकार क्षेत्र की बाधाओं को दूर करता है, लंबित जांचों का ऑडिट करता है, केंद्रीय अंश डीबीटी राहत राशि जारी करता है और संसदीय आदेशों का अनुपालन सुनिश्चित करता है।',
      roles: [
        {
          title: 'राष्ट्रीय अत्याचार हॉटस्पॉट ग्रिड व एआई विश्लेषण',
          desc: 'राज्यों की सीमाओं के पार पुनरावृत्ति वाले अत्याचार क्षेत्रों, अंतर-जिला पैटर्न और प्रणालीगत पुलिस देरी की वास्तविक समय में निगरानी।'
        },
        {
          title: 'राष्ट्रीय हेल्पलाइन 14566 निगरानी',
          desc: 'टोल-फ्री 14566 संकट कॉलों, ऑपरेटर प्रतिक्रिया गति और राज्य डीएम को स्वचालित जीरो-एफआईआर इलेक्ट्रॉनिक डॉकेट प्रेषण की लाइव ट्रैकिंग।'
        },
        {
          title: 'केंद्रीय डीबीटी बजट आवंटन व संवितरण',
          desc: 'केंद्र प्रायोजित योजनाओं के तहत राज्य सरकारों को 50% केंद्रीय अनुदान जारी करना और प्रत्यक्ष लाभार्थी हस्तांतरण की अंतिम छोर तक निगरानी।'
        },
        {
          title: 'संसदीय एवं वैधानिक वार्षिक रिपोर्टिंग',
          desc: 'धारा 21(4) के तहत संसद में वैधानिक कार्यान्वयन, दोषसिद्धि दर और पुनर्वास ऑडिट पर वार्षिक रिपोर्ट संकलित एवं प्रस्तुत करना।'
        }
      ],
      actionRole: 'national',
      actionLabel: 'राष्ट्रीय MoSJE ग्रिड पर जाएं'
    },
    counsellor: {
      id: 'counsellor',
      badge: 'क्लिनिकल टेली-मेंटल हेल्थ डेस्क',
      badgeColor: '#16a34a',
      badgeBg: 'rgba(22, 163, 74, 0.1)',
      name: 'सूचीबद्ध क्लिनिकल मनोवैज्ञानिक एवं संकट परामर्शदाता',
      designation: 'NIMHANS-सूचीबद्ध टेली-मेंटल हेल्थ विशेषज्ञ (MoSJE)',
      icon: '🩺',
      who: 'NIMHANS और राष्ट्रीय हेल्पलाइन अगेंस्ट एट्रॉसिटीज (14566) के तहत पैनलबद्ध लाइसेंस प्राप्त मनोवैज्ञानिक और ट्रॉमा विशेषज्ञ, जो घृणा अपराध और जाति-हिंसा से उत्पन्न तनाव के उपचार में प्रशिक्षित हैं।',
      why: 'अत्याचार पीड़ितों को तीव्र मानसिक आघात, भय, अपमान और अवसाद का सामना करना पड़ता है। तत्काल परामर्श के बिना वे कानूनी लड़ाई छोड़ देते हैं। यह डेस्क तत्काल मनोवैज्ञानिक सुरक्षा, वॉयस बायोमार्कर विश्लेषण और उपचार प्रदान करता है।',
      roles: [
        {
          title: 'तत्काल बहुभाषी संकट हस्तक्षेप',
          desc: 'टोल-फ्री 14566 के माध्यम से पीड़ित की मातृभाषा में तत्काल भावनात्मक स्थिरता, सहानुभूतिपूर्ण परामर्श और आत्महत्या जोखिम मूल्यांकन।'
        },
        {
          title: 'वॉयस स्ट्रेस व ध्वनिक एआई बायोमार्कर',
          desc: 'बार-बार पूछताछ किए बिना आवाज के सूक्ष्म कंपनों और झिझक के माध्यम से आघात की गहराई का वस्तुनिष्ठ वैज्ञानिक मूल्यांकन।'
        },
        {
          title: 'PHQ-9 एवं GAD-7 मनोवैज्ञानिक प्रभाव डॉसियर',
          desc: 'विशेष अदालतों और मजिस्ट्रेटों को प्रस्तुत करने के लिए प्रमाणित मनोवैज्ञानिक रिपोर्ट तैयार करना जिससे अतिरिक्त चिकित्सा राहत प्राप्त हो सके।'
        },
        {
          title: 'दीर्घकालिक सामुदायिक पुनर्वास',
          desc: 'लगातार टेली-काउंसलिंग सत्र आयोजित करना और पीड़ितों को जिला मानसिक स्वास्थ्य अधिकारियों एवं स्थानीय स्वास्थ्य कार्यकर्ताओं से जोड़ना।'
        }
      ],
      actionRole: 'counsellor',
      actionLabel: 'क्लिनिकल काउंसलर डेस्क पर जाएं'
    },
    victim: {
      id: 'victim',
      badge: 'वैधानिक नागरिक एवं उत्तरजीवी प्रवेश द्वार',
      badgeColor: '#7c3aed',
      badgeBg: 'rgba(124, 58, 237, 0.1)',
      name: 'संरक्षित नागरिक एवं अत्याचार पीड़ित (नागरिक पोर्टल)',
      designation: 'प्रत्यक्ष लाभार्थी एवं कानूनी अधिकार केंद्र (एससी/एसटी अधिनियम 1989)',
      icon: '🛡️',
      who: 'कमजोर नागरिक, अत्याचार पीड़ित, उनके परिवार और अधिकारों के रक्षक जो तत्काल राज्य सुरक्षा, आपातकालीन बचाव या वैधानिक आर्थिक पुनर्वास चाहते हैं।',
      why: 'SAHAYA-360 नागरिक-केंद्रित है। पारंपरिक रिपोर्टिंग में पुलिस की उपेक्षा और प्रभुत्वशाली वर्ग के डर को समाप्त कर यह पोर्टल पीड़ित के हाथ में सीधे जिला मजिस्ट्रेट तक पहुंचने की डिजिटल शक्ति देता है।',
      roles: [
        {
          title: 'अनिवार्य जीरो-एफआईआर व त्वरित बचाव प्रेषण',
          desc: 'जीपीएस स्थान के साथ तुरंत शिकायत और बचाव का अनुरोध, जो सीधे जिला एसपी और निकटतम थाने को प्राथमिकता डॉकेट भेजता है।'
        },
        {
          title: 'चरणबद्ध डीबीटी राहत राशि ट्रैकिंग',
          desc: 'जिला मजिस्ट्रेट की मंजूरी से लेकर आधार डीबीटी बैंक क्रेडिट तक अपनी वैधानिक राहत (₹1,00,000 से ₹8,25,000) को ट्रैक करने की सुविधा।'
        },
        {
          title: 'धारा 15A गवाह सुरक्षा अनुरोध',
          desc: 'सशस्त्र पुलिस गश्त, सुरक्षित आवास और अदालती सुनवाई में भाग लेने के लिए सरकारी यात्रा भत्ते के लिए एक-क्लिक आवेदन।'
        },
        {
          title: 'गोपनीय कैमोफ्लेज व बहुभाषी रिपोर्टिंग',
          desc: 'मौसम स्क्रीन जैसे गुप्त आवरण और हिंदी, तमिल, तेलुगु, मराठी और अंग्रेजी में बोलकर गोपनीय शिकायत दर्ज करने की सुविधा।'
        }
      ],
      actionRole: 'victim',
      actionLabel: 'संरक्षित नागरिक पोर्टल में प्रवेश करें'
    }
  },

  mr: {
    district: {
      id: 'district',
      badge: 'जिल्हा दक्षता आणि दंडाधिकारी कक्ष',
      badgeColor: '#0284c7',
      badgeBg: 'rgba(2, 132, 199, 0.1)',
      name: 'जिल्हा दंडाधिकारी (IAS) आणि पोलीस अधीक्षक (IPS)',
      designation: 'वैधानिक जिल्हा दक्षता अधिकारी (DVO) आणि विशेष कमान',
      icon: '⚖️',
      who: 'जिल्हा प्रशासनाचे प्रमुख कार्यकारी आणि कायदा व सुव्यवस्था अधिकारी. ॲट्रॉसिटी नियम १९९५/२०१६ अंतर्गत जिल्हाधिकारी व पोलीस अधीक्षक संयुक्तपणे जिल्हा दक्षता आणि सनियंत्रण समितीचे (DVMC) नेतृत्व करतात.',
      why: 'ॲट्रॉसिटी कायदा १९८९ च्या तरतुदींनुसार, केवळ जिल्हाधिकारी आणि पोलीस अधीक्षकांकडेच तातडीची डीबीटी मदत मंजूर करण्याचे, २४×७ सशस्त्र साक्षीदार संरक्षण देण्याचे आणि सामाजिक बहिष्काराला प्रतिबंध करण्याचे अधिकार आहेत.',
      roles: [
        {
          title: 'नियम १२(४) थेट डीबीटी मदत मंजुरी',
          desc: 'एफआयआर नोंदवल्यापासून ७ दिवसांच्या आत खटल्याची वाट न पाहता ५०% अंतरिम भरपाई (₹१,००,००० ते ₹८,२५,०००) थेट बँक खात्यात जमा करण्याचे वैधानिक बंधन.'
        },
        {
          title: 'कलम १५A साक्षीदार संरक्षण अंमलबजावणी',
          desc: 'स्थानिक धमक्या आणि साक्षीदार फितूर होणे रोखण्यासाठी २४ तास सशस्त्र पोलीस संरक्षण, सुरक्षित स्थलांतर आणि न्यायालयीन नोंदींमध्ये ओळख गुप्त ठेवणे.'
        },
        {
          title: 'नियम ७(२) ६०-दिवसीय तपास देखरेख',
          desc: 'पोलीस उपअधीक्षक (DSP) यांनी ६० दिवसांच्या आत तपास पूर्ण करून आरोपपत्र न्यायालयात दाखल करणे सुनिश्चित करणे.'
        },
        {
          title: 'प्रतिबंधक उपाय आणि शांतता बंधपत्रे',
          desc: 'संवेदनशील भागात कलम १७ अंतर्गत सुरक्षा बंधपत्रे घेणे आणि वस्त्यांमध्ये अचानक रात्रीची गस्त घालणे.'
        }
      ],
      actionRole: 'district',
      actionLabel: 'जिल्हा डीएम/एसपी कक्षात जा'
    },
    national: {
      id: 'national',
      badge: 'केंद्रीय सर्वोच्च कमान · भारत सरकार',
      badgeColor: '#ea580c',
      badgeBg: 'rgba(234, 88, 12, 0.1)',
      name: 'सामाजिक न्याय आणि सक्षमीकरण मंत्रालय (MoSJE)',
      designation: 'केंद्रीय अनुसूचित जाती/जमाती दक्षता नेटवर्क (भारत सरकार)',
      icon: '🏛️',
      who: 'सामाजिक न्याय आणि सक्षमीकरण विभाग, भारत सरकारचे सहसचिव, केंद्रीय दक्षता संचालक आणि राष्ट्रीय नोडल अधिकारी, जे राष्ट्रीय अनुसूचित जाती आयोगाच्या (NCSC) समन्वयाने काम करतात.',
      why: 'सर्व २८ राज्ये आणि ८ केंद्रशासित प्रदेशांमध्ये सर्वोच्च देखरेख ठेवणे. हे डेस्क आंतरराज्यीय सीमा अडचणी दूर करते आणि केंद्रीय डीबीटी निधी थेट वितरित करते.',
      roles: [
        {
          title: 'राष्ट्रीय हॉटस्पॉट ग्रिड आणि एआय विश्लेषण',
          desc: 'वारंवार घडणाऱ्या अत्याचारांच्या भागांचे आणि पोलीस तपासातील विलंबाचे रिअल-टाइम एआय नकाशाद्वारे निरीक्षण.'
        },
        {
          title: 'राष्ट्रीय हेल्पलाइन १४५६६ देखरेख',
          desc: 'टोल-फ्री १४५६६ कॉल्स, प्रतिसाद गती आणि राज्य जिल्हाधिकाऱ्यांना स्वयंचलित झिरो-एफआयआर डॉकेट हस्तांतरणाचे थेट ट्रॅकिंग.'
        },
        {
          title: 'केंद्रीय डीबीटी बजेट वाटप आणि वितरण',
          desc: 'केंद्र पुरस्कृत योजनांतर्गत राज्य सरकारांना ५०% केंद्रीय हिस्सा वितरित करणे आणि लाभार्थी हस्तांतरणावर लक्ष ठेवणे.'
        },
        {
          title: 'संसदीय वार्षिक अहवाल सादरीकरण',
          desc: 'कलम २१(४) अंतर्गत कायदा अंमलबजावणी आणि पुनर्वसन अहवाल दरवर्षी संसदेत सादर करणे.'
        }
      ],
      actionRole: 'national',
      actionLabel: 'राष्ट्रीय MoSJE ग्रिडवर जा'
    },
    counsellor: {
      id: 'counsellor',
      badge: 'क्लिनिकल टेली-मानसोपचार डेस्क',
      badgeColor: '#16a34a',
      badgeBg: 'rgba(22, 163, 74, 0.1)',
      name: 'सूचीबद्ध क्लिनिकल मानसशास्त्रज्ञ आणि संकट सल्लागार',
      designation: 'NIMHANS-सूचीबद्ध टेली-मेंटल हेल्थ तज्ज्ञ (MoSJE)',
      icon: '🩺',
      who: 'NIMHANS आणि राष्ट्रीय हेल्पलाइन (१४५६६) अंतर्गत नोंदणीकृत मानसशास्त्रज्ञ आणि ट्रॉमा तज्ज्ञ.',
      why: 'अत्याचार पीडितांना मानसिक धक्का आणि भीतीचा सामना करावा लागतो. तातडीच्या समुपदेशनाशिवाय ते खटले मागे घेतात. हे डेस्क त्वरित मानसिक सुरक्षितता आणि उपचार प्रदान करते.',
      roles: [
        {
          title: 'तातडीचे बहुभाषिक संकट निवारण',
          desc: '१४५६६ टोल-फ्रीद्वारे पीडितांच्या मातृभाषेत तातडीने भावनिक स्थिरता आणि आत्महत्या जोखीम मूल्यांकन करणे.'
        },
        {
          title: 'व्हॉइस स्ट्रेस आणि ध्वनिक एआय बायोमार्कर्स',
          desc: 'वारंवार चौकशी न करता आवाजातील कंपनांद्वारे मानसिक आघाताची खोली वैज्ञानिकदृष्ट्या मोजणे.'
        },
        {
          title: 'PHQ-9 आणि GAD-7 मानसिक परिणाम अहवाल',
          desc: 'विशेष न्यायालयात सादर करण्यासाठी प्रमाणित अहवाल तयार करून अतिरिक्त वैद्यकीय भरपाई मिळवून देणे.'
        },
        {
          title: 'दीर्घकालीन समुदाय पुनर्वसन',
          desc: 'सतत टेलि-समुपदेशन सत्रे आयोजित करणे आणि स्थानिक आरोग्य कार्यकर्त्यांशी जोडणे.'
        }
      ],
      actionRole: 'counsellor',
      actionLabel: 'क्लिनिकल समुपदेशक कक्षात जा'
    },
    victim: {
      id: 'victim',
      badge: 'वैधानिक नागरिक आणि पीडित प्रवेशद्वार',
      badgeColor: '#7c3aed',
      badgeBg: 'rgba(124, 58, 237, 0.1)',
      name: 'संरक्षित नागरिक आणि अत्याचार पीडित (नागरिक पोर्टल)',
      designation: 'थेट लाभार्थी आणि कायदेशीर हक्क केंद्र (ॲट्रॉसिटी कायदा १९८९)',
      icon: '🛡️',
      who: 'अत्याचार पीडित नागरिक, त्यांची कुटुंबे आणि कार्यकर्ते जे तातडीचे संरक्षण, बचाव किंवा भरपाई शोधत आहेत.',
      why: 'स्थानिक पोलीस विलंब आणि दबावाला मागे टाकून हे पोर्टल थेट जिल्हाधिकाऱ्यांपर्यंत पोहोचण्याचे डिजिटल अधिकार पीडितांच्या हातात देते.',
      roles: [
        {
          title: 'अनिवार्य झिरो-एफआयआर आणि त्वरित बचाव',
          desc: 'जीपीएस स्थानासह तक्रार नोंदवून थेट पोलीस अधीक्षक आणि जवळच्या पोलीस ठाण्याकडे मदत पाठवणे.'
        },
        {
          title: 'थेट डीबीटी भरपाई ट्रॅकिंग',
          desc: 'जिल्हाधिकाऱ्यांच्या मंजुरीपासून ते आधार बँक खात्यात भरपाई (₹१,००,००० ते ₹८,२५,०००) जमा होईपर्यंत ट्रॅक करणे.'
        },
        {
          title: 'कलम १५A साक्षीदार संरक्षण अर्ज',
          desc: 'सशस्त्र पोलीस गस्त, सुरक्षित निवास आणि कोर्ट प्रवासासाठी शासकीय भत्त्यासाठी थेट एका क्लिकवर अर्ज.'
        },
        {
          title: 'गुप्त कॅमोफ्लेज आणि बहुभाषिक नोंदणी',
          desc: 'हवामान स्क्रीनसारखे गुप्त आवरण आणि मराठी, तमिळ, तेलगू, हिंदी व इंग्रजीत बोलून तक्रार नोंदवण्याची सोय.'
        }
      ],
      actionRole: 'victim',
      actionLabel: 'सुरक्षित नागरिक पोर्टलमध्ये प्रवेश करा'
    }
  },

  te: {
    district: {
      id: 'district',
      badge: 'జిల్లా విజిలెన్స్ & మేజిస్ట్రేట్ డెస్క్',
      badgeColor: '#0284c7',
      badgeBg: 'rgba(2, 132, 199, 0.1)',
      name: 'జిల్లా మేజిస్ట్రేట్ (IAS) & పోలీస్ సూపరింటెండెంట్ (IPS)',
      designation: 'చట్టబద్ధమైన జిల్లా విజిలెన్స్ అధికారులు (DVO) & స్పెషల్ కమాండ్',
      icon: '⚖️',
      who: 'జిల్లా పరిపాలన మరియు చట్ట అమలు ప్రధాన అధికారులు. SC/ST నియమాలు 1995/2016 ప్రకారం కలెక్టర్ మరియు ఎస్పీ సంయుక్తంగా జిల్లా విజిలెన్స్ & మానిటరింగ్ కమిటీకి (DVMC) నాయకత్వం వహిస్తారు.',
      why: 'SC/ST చట్టం 1989 ప్రకారం, అత్యవసర డీబీటీ పరిహారాన్ని మంజూరు చేయడానికి, 24×7 సాయుధ సాక్షి రక్షణ కల్పించడానికి, డీఎస్పీ స్థాయి విచారణాధికారులను నియమించడానికి కలెక్టర్ మరియు ఎస్పీలకు మాత్రమే చట్టపరమైన అధికారం ఉంది.',
      roles: [
        {
          title: 'రూల్ 12(4) డైరెక్ట్ డీబీటీ రిలీఫ్ మంజూరు',
          desc: 'ఎఫ్ఐఆర్ నమోదైన 7 రోజుల్లోగా విచారణ ముగింపు కోసం వేచి చూడకుండా 50% మధ్యంతర పరిహారాన్ని (₹1,00,000 నుండి ₹8,25,000) నేరుగా బాధితుల బ్యాంక్ ఖాతాలో జమ చేసే చట్టబద్ధమైన నిబంధన.'
        },
        {
          title: 'సెక్షన్ 15A సాక్షుల రక్షణ అమలు',
          desc: 'స్థానిక బెదిరింపులను అరికట్టడానికి 24 గంటల సాయుధ పోలీసు భద్రత, సురక్షిత గృహ వసతి మరియు కోర్టు రికార్డులలో గుర్తింపును రహస్యంగా ఉంచడం.'
        },
        {
          title: 'రూల్ 7(2) 60 రోజుల విచారణ పర్యవేక్షణ',
          desc: 'డీఎస్పీ ఆధ్వర్యంలో 60 రోజుల్లోగా విచారణ పూర్తి చేసి ప్రత్యేక కోర్టులో ఛార్జిషీట్ దాఖలు చేయడాన్ని కలెక్టర్ పర్యవేక్షిస్తారు.'
        },
        {
          title: 'ముందస్తు చర్యలు & శాంతి బాండ్లు',
          desc: 'సున్నితమైన ప్రాంతాల్లో సెక్షన్ 17 కింద భద్రతా బాండ్లు నమోదు చేయడం మరియు ఆకస్మిక రాత్రి గస్తీ నిర్వహించడం.'
        }
      ],
      actionRole: 'district',
      actionLabel: 'జిల్లా కలెక్టర్/ఎస్పీ డెస్క్‌కి వెళ్లండి'
    },
    national: {
      id: 'national',
      badge: 'కేంద్ర అత్యున్నత కమాండ్ · భారత ప్రభుత్వం',
      badgeColor: '#ea580c',
      badgeBg: 'rgba(234, 88, 12, 0.1)',
      name: 'సామాజిక న్యాయం మరియు సాధికారత మంత్రిత్వ శాఖ (MoSJE)',
      designation: 'కేంద్ర షెడ్యూల్డ్ కులాలు & తెగల విజిలెన్స్ గ్రిడ్ (భారత ప్రభుత్వం)',
      icon: '🏛️',
      who: 'సామాజిక న్యాయ మరియు సాధికారత విభాగం జాయింట్ సెక్రటరీలు, డైరెక్టర్లు మరియు నేషనల్ నోడల్ అధికారులు, వీరు NCSC సమన్వయంతో పనిచేస్తారు.',
      why: 'అన్ని 28 రాష్ట్రాలు మరియు 8 కేంద్రపాలిత ప్రాంతాలలో ఏకీకృత పర్యవేక్షణను నిర్వహించడం, సరిహద్దు వివాదాలను పరిష్కరించడం మరియు కేంద్ర వాటా డీబీటీ నిధులను నేరుగా విడుదల చేయడం.',
      roles: [
        {
          title: 'జాతీయ అట్రాసిటీ హాట్‌స్పాట్ గ్రిడ్ & AI అనలిటిక్స్',
          desc: 'రిపీట్ అట్రాసిటీ జోన్లు మరియు పోలీస్ ఆలస్యాలను రియల్-టైమ్ ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ మ్యాప్ ద్వారా పర్యవేక్షించడం.'
        },
        {
          title: 'జాతీయ హెల్ప్‌లైన్ 14566 పర్యవేక్షణ',
          desc: 'టోల్-ఫ్రీ 14566 కాల్స్, స్పందన వేగం మరియు రాష్ట్ర కలెక్టర్లకు ఆటోమేటెడ్ జీరో-ఎఫ్ఐఆర్ డాకెట్ల బదిలీని ప్రత్యక్షంగా ట్రాక్ చేయడం.'
        },
        {
          title: 'కేంద్ర డీబీటీ బడ్జెట్ కేటాయింపు & విడుదల',
          desc: 'కేంద్ర పథకాల కింద రాష్ట్రాలకు 50% నిధులను విడుదల చేయడం మరియు లబ్ధిదారులకు అందేలా పర్యవేక్షించడం.'
        },
        {
          title: 'పార్లమెంటరీ వార్షిక నివేదిక సమర్పణ',
          desc: 'సెక్షన్ 21(4) క్రింద అమలు మరియు పునరావాస ఆడిట్ నివేదికలను ప్రతి సంవత్సరం భారత పార్లమెంటుకు సమర్పించడం.'
        }
      ],
      actionRole: 'national',
      actionLabel: 'జాతీయ MoSJE గ్రిడ్‌కి వెళ్లండి'
    },
    counsellor: {
      id: 'counsellor',
      badge: 'క్లినికల్ టెలి-మెంటల్ హెల్త్ డెస్క్',
      badgeColor: '#16a34a',
      badgeBg: 'rgba(22, 163, 74, 0.1)',
      name: 'ఎంప్యానెల్డ్ క్లినికల్ సైకాలజిస్ట్ & క్రైసిస్ కౌన్సిలర్',
      designation: 'NIMHANS-ఎంప్యానెల్డ్ టెలి-మెంటల్ హెల్త్ స్పెషలిస్ట్ (MoSJE)',
      icon: '🩺',
      who: 'NIMHANS మరియు జాతీయ హెల్ప్‌లైన్ (14566) పరిధిలోని నమోదిత సైకాలజిస్టులు మరియు ట్రామా నిపుణులు.',
      why: 'బాధితులు తీవ్రమైన మానసిక షాక్ మరియు అవమానానికి గురవుతారు. తక్షణ కౌన్సెలింగ్ లేకపోతే కేసులను వదులుకుంటారు. ఈ డెస్క్ తక్షణ మానసిక భద్రత మరియు స్వస్థతను అందిస్తుంది.',
      roles: [
        {
          title: 'తక్షణ బహుభాషా సంక్షోభ జోక్యం',
          desc: '14566 టోల్-ఫ్రీ ద్వారా బాధితుల మాతృభాషలోనే తక్షణ మానసిక సాంత్వన మరియు ఆత్మహత్య నివారణ కౌన్సెలింగ్.'
        },
        {
          title: 'వాయిస్ స్ట్రెస్ & అకౌస్టిక్ AI బయోమార్కర్లు',
          desc: 'మళ్లీ మళ్లీ ప్రశ్నించకుండానే వాయిస్ కంపనాల ద్వారా మానసిక వేదన తీవ్రతను శాస్త్రీయంగా అంచనా వేయడం.'
        },
        {
          title: 'PHQ-9 & GAD-7 మానసిక ప్రభావ నివేదికలు',
          desc: 'కోర్టుల్లో సమర్పించడానికి ధృవీకరించిన నివేదికలను రూపొందించి అదనపు వైద్య సహాయాన్ని అందించడం.'
        },
        {
          title: 'దీర్ఘకాలిక సమాజ పునరావాసం',
          desc: 'నిరంతర టెలి-కౌన్సెలింగ్ మరియు స్థానిక ఆరోగ్య కార్యకర్తలతో అనుసంధానం చేయడం.'
        }
      ],
      actionRole: 'counsellor',
      actionLabel: 'క్లినికల్ కౌన్సిలర్ డెస్క్‌కి వెళ్లండి'
    },
    victim: {
      id: 'victim',
      badge: 'చట్టబద్ధమైన పౌర & బాధితుల గేట్‌వే',
      badgeColor: '#7c3aed',
      badgeBg: 'rgba(124, 58, 237, 0.1)',
      name: 'రక్షిత పౌరుడు & అట్రాసిటీ బాధితుడు (పౌర పోర్టల్)',
      designation: 'ప్రత్యక్ష లబ్ధిదారుడు & న్యాయ హక్కుల కేంద్రం (SC/ST చట్టం 1989)',
      icon: '🛡️',
      who: 'బాధిత పౌరులు, వారి కుటుంబాలు మరియు హక్కుల కార్యకర్తలు తక్షణ రక్షణ, రెస్క్యూ లేదా ఆర్థిక పునరావాసం పొందే వేదిక.',
      why: 'పోలీసుల నిర్లక్ష్యం మరియు బెదిరింపులను అధిగమించి, బాధితుడి చేతికే నేరుగా కలెక్టర్‌కు చేరే డిజిటల్ అధికారాన్ని ఈ పోర్టల్ అందిస్తుంది.',
      roles: [
        {
          title: 'తప్పనిసరి జీరో-ఎఫ్ఐఆర్ & శీఘ్ర రెస్క్యూ',
          desc: 'జీపీఎస్ లొకేషన్‌తో తక్షణమే ఫిర్యాదు నమోదు చేసి జిల్లా ఎస్పీ మరియు సమీప పోలీస్ స్టేషన్‌కు అత్యవసర సమాచారం పంపడం.'
        },
        {
          title: 'దశలవారీ డీబీటీ పరిహార ట్రాకింగ్',
          desc: 'కలెక్టర్ మంజూరు నుండి ఆధార్ బ్యాంక్ జమ వరకు చట్టబద్ధమైన పరిహారాన్ని (₹1,00,000 నుండి ₹8,25,000) ట్రాక్ చేయడం.'
        },
        {
          title: 'సెక్షన్ 15A సాక్షి రక్షణ దరఖాస్తు',
          desc: 'సాయుధ పోలీసు గస్తీ, సురక్షిత నివాసం మరియు కోర్టు ప్రయాణ ఖర్చుల భత్యం కోసం ఒక్క క్లిక్‌తో దరఖాస్తు.'
        },
        {
          title: 'రహస్య కామోఫ్లాజ్ & వాయిస్ రిపోర్టింగ్',
          desc: 'వాతావరణ స్క్రీన్ మాదిరిగా రహస్యంగా మార్చే సదుపాయం మరియు తెలుగు, తమిళ్, హిందీ, మరాఠీ, ఇంగ్లీష్‌లో మాట్లాడి ఫిర్యాదు చేసే సదుపాయం.'
        }
      ],
      actionRole: 'victim',
      actionLabel: 'రక్షిత పౌర పోర్టల్‌లోకి ప్రవేశించండి'
    }
  }
};

export const getStakeholderDossier = (roleId, lang = 'en') => {
  const langKey = STAKEHOLDER_DOSSIERS_BY_LANG[lang] ? lang : 'en';
  const dossiers = STAKEHOLDER_DOSSIERS_BY_LANG[langKey] || STAKEHOLDER_DOSSIERS_BY_LANG.en;
  return dossiers[roleId] || dossiers.district;
};

export const getStakeholderLabels = (lang = 'en') => {
  const langKey = STAKEHOLDER_LABELS[lang] ? lang : 'en';
  return STAKEHOLDER_LABELS[langKey] || STAKEHOLDER_LABELS.en;
};
