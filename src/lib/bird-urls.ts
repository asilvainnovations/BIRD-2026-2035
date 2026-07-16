// src/lib/bird-urls.ts
// BIRD 2026–2035 · Centralized URL Registry
// Videos, Images, and Site Pages for Context, Reference, Visualizations & Interactions
// Updated: 2026-07-16 | 70+ images, 5 videos, 12 sites | All URLs validated

export const BIRD_VIDEOS = {
  overview: {
    title: "Bangsamoro Investment Roadmap 2026‑2035 | Southeast Asia's Hub for Ethical & Sustainable Growth",
    url: "https://youtu.be/UCi2dVUmSbE",
    duration: "~15 min",
    section: "general",
    description: "Comprehensive overview of the BIRD 2026-2035 strategic vision, BEIE framework, and the path to making BARMM Southeast Asia's premier ethical investment destination.",
  },
  contextBEIE: {
    title: "Context Analysis and the BEIE Framework",
    url: "https://youtu.be/Li7lpyWWMcE",
    duration: "~12 min",
    section: "section1",
    description: "Deep dive into the Bangsamoro Economic and Investment Ecosystem (BEIE) Framework context analysis methodology, covering all 5 clusters and their interdependencies.",
  },
  swotSystems: {
    title: "SWOT Analysis and Systems Mapping",
    url: "https://youtu.be/LSmBzwyX2uw",
    duration: "~18 min",
    section: "section2",
    description: "How to conduct comprehensive SWOT analysis integrated with systems thinking causal loop diagrams and archetype identification for strategic planning.",
  },
  strategicOptions: {
    title: "Strategic Options and the Investment Roadmap",
    url: "https://youtu.be/kb_snh8mo1k",
    duration: "~20 min",
    section: "section8",
    description: "Formulating strategic options using the TOWS matrix, 7-criteria evaluation, and building the phased investment roadmap with IEDS sequencing.",
  },
  systemsThinking: {
    title: "On Systems Thinking",
    url: "https://youtu.be/VBAHk0WYz_c",
    duration: "~10 min",
    section: "section2",
    description: "Introduction to systems thinking for strategic planning — understanding feedback loops, delays, and non-linear causality in the BARMM economic ecosystem.",
  },
} as const;

export const BIRD_IMAGES = {
  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 0: VALIDATION SURVEY & PLATFORM
  // ═══════════════════════════════════════════════════════════════════════════════
  validationSurveyBanner: {
    title: "BIRD Validation Survey 2026-2035",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/0-Survey.png",
    category: "survey", section: "general", alt: "BIRD validation survey banner",
    description: "Official validation survey banner for the BIRD 2026-2035 stakeholder consultation process.",
  },
  validationProcess: {
    title: "Validation Process Flow",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/2-Process.png",
    category: "survey", section: "general", alt: "Validation process workflow",
    description: "Step-by-step validation process from survey distribution through stakeholder feedback to roadmap finalization.",
  },
  surveyAnalytics: {
    title: "Survey Analytics Dashboard",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/3-Dashboard.png",
    category: "survey", section: "general", alt: "Survey analytics dashboard",
    description: "Real-time analytics dashboard showing survey response rates, stakeholder engagement metrics, and thematic analysis.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 1: BEIE FRAMEWORK & STRATEGIC CONTEXT
  // ═══════════════════════════════════════════════════════════════════════════════
  vision: {
    title: "BIRD Vision 2026-2035",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/18.%20Vision.png",
    category: "framework", section: "section1", alt: "BIRD strategic vision diagram",
    description: "The strategic vision for BIRD 2026-2035: positioning BARMM as Southeast Asia's premier ethical and sustainable investment destination.",
  },
  beieFramework: {
    title: "Bangsamoro BEIE Framework",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-context-beie-framework/public/19.%20Bangsamoro%20BEIE%20Framework.png",
    category: "framework", section: "section1", alt: "BEIE Framework structure diagram",
    description: "The complete Bangsamoro Economic and Investment Ecosystem (BEIE) Framework showing all 5 clusters, their nodes, and interconnections.",
  },
  operatingSystemsTrust: {
    title: "Operating Systems: Trust as the Currency",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-context-beie-framework/public/20.%20Operating%20Systems_%20Trust%20as%20the%20Currency.png",
    category: "framework", section: "section2", alt: "Trust-based operating systems diagram",
    description: "How trust functions as the core operating currency across the BEIE framework, enabling transactions, governance, and investment flows.",
  },
  beieEcosystem: {
    title: "BEIE Ecosystem Map",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/4-Ecosystem.png",
    category: "framework", section: "section1", alt: "BEIE ecosystem map",
    description: "Comprehensive ecosystem map showing the relationships between government institutions, private sector, civil society, and international partners.",
  },
  moralGovernance: {
    title: "Moral Governance Framework",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/21.png",
    category: "governance", section: "section1", alt: "Moral governance framework",
    description: "The Moral Governance framework that anchors the BEIE, integrating Islamic principles, transparency, and accountability mechanisms.",
  },
  strategicPillars: {
    title: "Four Strategic Pillars",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/27.png",
    category: "framework", section: "section1", alt: "Four strategic pillars diagram",
    description: "The four strategic pillars of BIRD 2026-2035: Halal Industry, Governance Reform, Infrastructure & Connectivity, and Islamic Finance.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 2: SYSTEMS THINKING & SWOT
  // ═══════════════════════════════════════════════════════════════════════════════
  systemsThinkingBanner: {
    title: "Systems Thinking for BIRD",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/1-Systems%20Thinking%20Banner.png",
    category: "systems", section: "section2", alt: "Systems thinking banner",
    description: "Banner image introducing systems thinking methodology applied to the Bangsamoro Investment Roadmap development.",
  },
  icebergParadigm: {
    title: "Iceberg Paradigm",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/5-Paradigm.png",
    category: "systems", section: "section2", alt: "Iceberg model of systems thinking",
    description: "The iceberg paradigm showing visible events above the waterline and underlying patterns, structures, and mental models below.",
  },
  anatomySystemTraps: {
    title: "Anatomy of System Traps",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/6-Anatomy%20of%20Systems%20Traps.png",
    category: "systems", section: "section2", alt: "System traps anatomy diagram",
    description: "Diagram illustrating common system traps that undermine strategic initiatives and how to identify and escape them.",
  },
  investmentVirtuousCycle: {
    title: "Investment-Development Virtuous Cycle",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/14.%20Investment-Development%20Virtuous%20Cycle.png",
    category: "systems", section: "section2", alt: "Virtuous cycle diagram",
    description: "The virtuous cycle connecting investment inflows to infrastructure development, job creation, and further investment attraction.",
  },
  investmentGovernanceCycles: {
    title: "Investment and Governance Cycles",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/public/15.%20Investment%20and%20Governance%20Cycles.png",
    category: "systems", section: "section2", alt: "Investment governance cycles",
    description: "How investment flows interact with governance reforms to create reinforcing or balancing feedback loops.",
  },
  swotMatrix: {
    title: "SWOT Analysis Matrix",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/7-SWOT.png",
    category: "systems", section: "section2", alt: "SWOT analysis matrix",
    description: "The comprehensive SWOT analysis matrix for BARMM, identifying internal strengths/weaknesses and external opportunities/threats.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 3-7: CLUSTERS 1-5
  // ═══════════════════════════════════════════════════════════════════════════════
  cluster1Foundations: {
    title: "Cluster 1: Foundations",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-context-beie-framework/public/25.%20Cluster%201_%20Foundations.png",
    category: "cluster", section: "section3", alt: "Foundations cluster diagram",
    description: "Cluster 1 — Foundations: Islamic governance, legal frameworks, land tenure, and institutional capacity building.",
  },
  cluster2Transformers: {
    title: "Cluster 2: Transformers",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-context-beie-framework/public/26.%20Cluster%202%20_%20Transformers.png",
    category: "cluster", section: "section4", alt: "Transformers cluster diagram",
    description: "Cluster 2 — Transformers: Halal industry, agribusiness, manufacturing, and export-oriented sectors driving economic transformation.",
  },
  cluster3Enablers: {
    title: "Cluster 3: Enablers",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-context-beie-framework/public/28.%20Cluster%203%20_%20Enablers.png",
    category: "cluster", section: "section5", alt: "Enablers cluster diagram",
    description: "Cluster 3 — Enablers: Infrastructure, energy, digital connectivity, and human capital development enabling growth.",
  },
  cluster4Connectors: {
    title: "Cluster 4: Connectors",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-context-beie-framework/public/33.%20Cluster%204_%20Connectors.png",
    category: "cluster", section: "section6", alt: "Connectors cluster diagram",
    description: "Cluster 4 — Connectors: Trade corridors, logistics hubs, BIMP-EAGA integration, and international partnerships.",
  },
  cluster5Financiers: {
    title: "Cluster 5: Financiers",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-context-beie-framework/public/38.%20Cluster%205_%20Financiers.png",
    category: "cluster", section: "section7", alt: "Financiers cluster diagram",
    description: "Cluster 5 — Financiers: Islamic finance institutions, development banks, venture capital, and investment funds.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CONNECTIVITY & TRADE CORRIDORS
  // ═══════════════════════════════════════════════════════════════════════════════
  connectivityUAE: {
    title: "BARMM Strategic Connectivity vis-à-vis UAE",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/UAE%20&%20GCC.png",
    category: "connectivity", section: "section6", alt: "UAE and GCC connectivity map",
    description: "Strategic connectivity map showing BARMM's trade and investment linkages with UAE and Gulf Cooperation Council countries.",
  },
  connectivityBIMPEAGA: {
    title: "BARMM Strategic Connectivity vis-à-vis BIMP-EAGA",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BARMM%20Connectivity%20%20.png",
    category: "connectivity", section: "section6", alt: "BIMP-EAGA connectivity map",
    description: "Connectivity map illustrating BARMM's integration within the BIMP-EAGA growth area and regional trade corridors.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PROVINCIAL DIAGNOSTICS & OUTLOOKS
  // ═══════════════════════════════════════════════════════════════════════════════
  provincialEndowments: {
    title: "Provincial Endowments Leverages (LDS and Maguindanao)",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/13.%20Provincial%20Endowments-Mainlands.png",
    category: "provincial", section: "section14", alt: "Provincial endowments map",
    description: "Endowment leverage analysis for mainland provinces (Lanao del Sur and Maguindanao) showing comparative advantages.",
  },
  provincialDiagnostics: {
    title: "Provincial Diagnostics Overview",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Provincial%20Diagnostics.png",
    category: "provincial", section: "section14", alt: "Provincial diagnostics dashboard",
    description: "Comprehensive diagnostics dashboard for all BARMM provinces covering economic, social, infrastructure, and governance indicators.",
  },
  maguindanaoNorte: {
    title: "Maguindanao del Norte",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Maguindanao-del-Norte.png",
    category: "provincial", section: "section14", alt: "Maguindanao del Norte profile",
    description: "Provincial profile for Maguindanao del Norte including resource endowments, infrastructure status, and investment opportunities.",
  },
  basilanTawiTawi: {
    title: "Basilan and Tawi-Tawi",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Basilan%20and%20tawi-Tawi.png",
    category: "provincial", section: "section14", alt: "Basilan and Tawi-Tawi profile",
    description: "Island province profiles for Basilan and Tawi-Tawi highlighting fisheries, agriculture, and maritime trade potential.",
  },
  maguindanaoSur: {
    title: "Maguindanao del Sur",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Maguidano-del-Sur.png",
    category: "provincial", section: "section14", alt: "Maguindanao del Sur profile",
    description: "Provincial profile for Maguindanao del Sur covering agricultural potential, infrastructure gaps, and development priorities.",
  },
  provincialOutlookLDS: {
    title: "Provincial Outlook: Lanao del Sur",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/1.%20Lanao%20del%20Sur.png",
    category: "provincial-outlook", section: "section14", alt: "Lanao del Sur provincial outlook",
    description: "Detailed provincial outlook for Lanao del Sur with key economic indicators, investment climate, and priority sectors.",
  },
  provincialOutlookMaguindanao: {
    title: "Provincial Outlook: Maguindanao",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/2.%20Maguindanao%20del%20Sur.png",
    category: "provincial-outlook", section: "section14", alt: "Maguindanao provincial outlook",
    description: "Comprehensive outlook for Maguindanao province with growth projections, sectoral analysis, and investment readiness assessment.",
  },
  provincialOutlookBasilan: {
    title: "Provincial Outlook: Basilan",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/3.%20Basilan.png",
    category: "provincial-outlook", section: "section14", alt: "Basilan provincial outlook",
    description: "Investment outlook for Basilan province focusing on fisheries, coconut processing, and emerging halal sectors.",
  },
  provincialOutlookTawiTawi: {
    title: "Provincial Outlook: Tawi-Tawi",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/4.%20Tawi-Tawi.png",
    category: "provincial-outlook", section: "section14", alt: "Tawi-Tawi provincial outlook",
    description: "Tawi-Tawi provincial outlook highlighting seaweed industry, tourism potential, and maritime connectivity opportunities.",
  },
  provincialOutlookSulu: {
    title: "Provincial Outlook: Sulu",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/5.%20Sulu.png",
    category: "provincial-outlook", section: "section14", alt: "Sulu provincial outlook",
    description: "Provincial outlook for Sulu with focus on pearl industry, tourism, and peace-building economic initiatives.",
  },
  provincialOutlookCotabato: {
    title: "Provincial Outlook: Special Geographic Area",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/6.%20Cotabato.png",
    category: "provincial-outlook", section: "section14", alt: "Cotabato special geographic area outlook",
    description: "Economic outlook for the Special Geographic Area of Cotabato within the BARMM territory.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SYSTEMS ARCHETYPES
  // ═══════════════════════════════════════════════════════════════════════════════
  shiftingBurden: {
    title: "Shifting the Burden",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/9.png",
    category: "archetype", section: "section2", alt: "Shifting the burden archetype",
    description: "Shifting the Burden archetype: when symptomatic solutions divert attention from fundamental systemic issues.",
  },
  fixesFail: {
    title: "Fixes that Fail",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/8-FtF.png",
    category: "archetype", section: "section2", alt: "Fixes that fail archetype",
    description: "Fixes that Fail archetype: well-intentioned interventions that produce unintended consequences, undermining long-term goals.",
  },
  tragedyCommons: {
    title: "Tragedy of the Commons",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/1-Systems%20Thinking%20Banner.png",
    category: "archetype", section: "section2", alt: "Tragedy of the commons archetype",
    description: "Tragedy of the Commons archetype: individual actors depleting shared resources, leading to collective detriment.",
  },
  successSuccessful: {
    title: "Success to the Successful",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/13.png",
    category: "archetype", section: "section2", alt: "Success to the successful archetype",
    description: "Success to the Successful archetype: reinforcing loops that concentrate resources among winners, widening inequality gaps.",
  },
  limitsGrowth: {
    title: "Limits to Growth",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/9LtG.png",
    category: "archetype", section: "section2", alt: "Limits to growth archetype",
    description: "Limits to Growth archetype: exponential growth encountering balancing loops that slow or reverse progress.",
  },
  growthUnderinvestment: {
    title: "Growth and Underinvestment",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/10.png",
    category: "archetype", section: "section2", alt: "Growth and underinvestment archetype",
    description: "Growth and Underinvestment archetype: declining performance reducing investment, creating a vicious cycle of deterioration.",
  },
  bigManArchetype: {
    title: "The Big Man Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/11-BM.png",
    category: "archetype", section: "section2", alt: "Big Man archetype diagram",
    description: "The Big Man archetype: centralized decision-making patterns in governance and their systemic implications.",
  },
  bigManEscalation: {
    title: "BigMan and Escalation",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/23.png",
    category: "archetype", section: "section2", alt: "Big Man escalation pattern",
    description: "How the Big Man archetype interacts with escalation dynamics, creating competitive loops in political and economic systems.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CAUSAL LOOP DIAGRAMS (CLDs)
  // ═══════════════════════════════════════════════════════════════════════════════
  cldTrustInvestment: {
    title: "CLD: Trust-Investment Reinforcing Loop",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/CLD-1.png",
    category: "cld", section: "section2", alt: "Trust-investment causal loop diagram",
    description: "Causal loop diagram showing the reinforcing relationship between trust-building and investment attraction in BARMM.",
  },
  cldGovernanceConfidence: {
    title: "CLD: Governance-Investor Confidence",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/CLD-2.png",
    category: "cld", section: "section2", alt: "Governance confidence causal loop",
    description: "CLD illustrating how governance reforms feedback into investor confidence and subsequent capital inflows.",
  },
  cldInfrastructureGrowth: {
    title: "CLD: Infrastructure-Economic Growth",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/CLD-3.png",
    category: "cld", section: "section2", alt: "Infrastructure growth causal loop",
    description: "Causal loop diagram mapping infrastructure investment to economic growth, employment, and tax revenue feedback loops.",
  },
  cldHalalEcosystem: {
    title: "CLD: Halal Ecosystem Development",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/CLD-4.png",
    category: "cld", section: "section2", alt: "Halal ecosystem causal loop",
    description: "CLD showing the interconnected drivers of halal ecosystem development from certification to market access.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // LEVERAGE POINTS
  // ═══════════════════════════════════════════════════════════════════════════════
  meadowsLeverage: {
    title: "Meadows Hierarchy of Leverage Points",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/public/24.%20Meadows%20Hierarchy%20of%20Leverage%20Points.png",
    category: "leverage", section: "section8", alt: "Meadows leverage points hierarchy",
    description: "Donella Meadows' hierarchy of leverage points from parameters to paradigm shifts, applied to BARMM strategic intervention design.",
  },
  leverageArchetypes: {
    title: "Leverage Points in Archetypes",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/22.png",
    category: "leverage", section: "section8", alt: "Leverage points within archetypes",
    description: "Mapping strategic leverage points onto identified systems archetypes to design effective interventions.",
  },
  moralGovernanceLeverage: {
    title: "Moral Governance as Leverage",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/26.png",
    category: "leverage", section: "section2", alt: "Moral governance as a leverage point",
    description: "How moral governance functions as a high-leverage intervention point for transforming the BARMM economic ecosystem.",
  },
  leveragePointsBanner: {
    title: "5 Critical Leverage Points",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/25.png",
    category: "leverage", section: "section8", alt: "Five critical leverage points banner",
    description: "The five critical leverage points for BIRD 2026-2035: Halal Certification, Infrastructure-Energy, Governance-Confidence, Islamic Finance, and Green Economy.",
  },
  clpDiagram: {
    title: "Critical Leverage Points (CLPs) Diagram",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/CLP-Overview.png",
    category: "leverage", section: "section8", alt: "CLP overview diagram",
    description: "Complete overview diagram of all 5 Critical Leverage Points with their interconnections and expected transformation outcomes.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // ROADMAP, STRATEGY & EXECUTION
  // ═══════════════════════════════════════════════════════════════════════════════
  roadmap: {
    title: "BIRD Investment Roadmap",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/28.png",
    category: "roadmap", section: "section8", alt: "BIRD strategic roadmap visualization",
    description: "The complete BIRD 2026-2035 investment roadmap showing phased implementation, milestones, and critical path.",
  },
  bangsamoroBIMPEAGA: {
    title: "Bangsamoro and BIMP-EAGA",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BARMM%20Connectivity%20%20.png",
    category: "roadmap", section: "section6", alt: "Bangsamoro BIMP-EAGA integration",
    description: "Bangsamoro's role and integration strategy within the BIMP-EAGA regional economic cooperation framework.",
  },
  bangsamoroUAE: {
    title: "Bangsamoro and UAE",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/UAE%20&%20GCC.png",
    category: "roadmap", section: "section6", alt: "Bangsamoro UAE connectivity",
    description: "Strategic partnership roadmap between Bangsamoro and UAE covering halal trade, Islamic finance, and investment promotion.",
  },
  strategicOptions: {
    title: "Strategic Options Portfolio",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/29-Options.png",
    category: "roadmap", section: "section8", alt: "Strategic options portfolio",
    description: "Portfolio of strategic options generated through TOWS matrix analysis, prioritized by impact and feasibility.",
  },
  phases: {
    title: "BIRD Implementation Phases",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/30-Phases.png",
    category: "roadmap", section: "section8", alt: "Implementation phases diagram",
    description: "Three-phase implementation roadmap: Foundation (2026-2028), Acceleration (2029-2031), and Transformation (2032-2035).",
  },
  timeline: {
    title: "BIRD Implementation Timeline",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/31-Timeline.png",
    category: "roadmap", section: "section8", alt: "Implementation timeline",
    description: "Detailed implementation timeline with key milestones, decision gates, and review periods across the 10-year horizon.",
  },
  budget: {
    title: "BIRD Budget Framework",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/32-Budget.png",
    category: "finance", section: "section8", alt: "Budget framework diagram",
    description: "Comprehensive budget framework showing funding sources, allocation priorities, and financial sustainability mechanisms.",
  },
  ieds: {
    title: "IEDS: Integrated Economic Development Strategy",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/33-IEDS.png",
    category: "roadmap", section: "section8", alt: "IEDS strategy diagram",
    description: "The Integrated Economic Development Strategy (IEDS) sequencing framework for coordinating cross-sectoral initiatives.",
  },
  iedsDiagram: {
    title: "IEDS Implementation Framework",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/IEDS-Framework.png",
    category: "roadmap", section: "section8", alt: "IEDS implementation framework",
    description: "Detailed IEDS implementation framework showing the sequencing logic, dependencies, and integration points across strategic pillars.",
  },
  metrics: {
    title: "Key Metrics & KPIs Dashboard",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/34-Metrics.png",
    category: "metrics", section: "section8", alt: "Key metrics and KPIs",
    description: "Key performance indicators and metrics dashboard for tracking BIRD implementation progress across all strategic pillars.",
  },
  metricsKPIs: {
    title: "BIRD KPI Framework",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/KPI-Framework.png",
    category: "metrics", section: "section8", alt: "BIRD KPI framework",
    description: "Complete KPI framework with leading and lagging indicators, targets, baselines, and measurement methodologies.",
  },
  infographic: {
    title: "BIRD at a Glance Infographic",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/35-Infographic.png",
    category: "framework", section: "general", alt: "BIRD infographic summary",
    description: "Executive summary infographic capturing the essence of BIRD 2026-2035 for stakeholder communication and public engagement.",
  },
  visionExecution: {
    title: "From Vision to Execution",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/36-Execution.png",
    category: "framework", section: "section8", alt: "Vision to execution framework",
    description: "The translation framework from strategic vision through actionable plans to measurable execution and adaptive management.",
  },
  decadeAhead: {
    title: "A Decade Ahead: BIRD 2035 Vision",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/37-Decade.png",
    category: "framework", section: "section1", alt: "Decade ahead vision",
    description: "Long-term vision for 2035: what BARMM will look like after a decade of strategic implementation and investment attraction.",
  },
  investBanner: {
    title: "Invest in BARMM Banner",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/38-Invest.png",
    category: "site", section: "general", alt: "Invest in BARMM banner",
    description: "Call-to-action banner for attracting investors to BARMM highlighting key value propositions and opportunities.",
  },
  chooseBanner: {
    title: "Choose BARMM Banner",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/39-Choose.png",
    category: "site", section: "general", alt: "Choose BARMM banner",
    description: "Promotional banner encouraging stakeholders to choose BARMM as their investment destination in Southeast Asia.",
  },
  halalEcosystem: {
    title: "Halal Ecosystem Map",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Halal-Ecosystem.png",
    category: "cluster", section: "section4", alt: "Halal ecosystem map",
    description: "Complete map of the halal ecosystem in BARMM covering certification, production, logistics, and export value chains.",
  },
  infrastructureNexus: {
    title: "Infrastructure-Energy Nexus",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Infrastructure-Nexus.png",
    category: "cluster", section: "section5", alt: "Infrastructure energy nexus",
    description: "The infrastructure-energy nexus showing interdependencies between power generation, transport, digital connectivity, and industrial zones.",
  },
  islamicFinance: {
    title: "Islamic Finance Framework",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Islamic-Finance.png",
    category: "cluster", section: "section7", alt: "Islamic finance framework",
    description: "Islamic finance framework for BARMM including Shariah-compliant instruments, regulatory architecture, and market development.",
  },
  greenEconomy: {
    title: "Green Economy Roadmap",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Green-Economy.png",
    category: "cluster", section: "section5", alt: "Green economy roadmap",
    description: "Green economy roadmap for sustainable development covering renewable energy, carbon markets, and eco-tourism in BARMM.",
  },
  investorJourney: {
    title: "Investor Journey Map",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Investor-Journey.png",
    category: "framework", section: "general", alt: "Investor journey map",
    description: "End-to-end investor journey map from awareness and consideration through investment, operation, and expansion in BARMM.",
  },
  digitalPlatform: {
    title: "BIRD Digital Platform Architecture",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Digital-Platform.png",
    category: "framework", section: "general", alt: "Digital platform architecture",
    description: "Architecture diagram of the BIRD digital platform showing modules, data flows, integrations, and user interfaces.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SURVEY-SPECIFIC IMAGES (Added 2026-07-16 for Validation Survey Sections 0–5)
  // ═══════════════════════════════════════════════════════════════════════════════
  validationBanner: {
    title: "BIRD Validation Survey Banner",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Validation%20Survey%20Banner.png",
    category: "survey", section: "general", alt: "BIRD validation survey banner",
    description: "Official validation survey banner for the BIRD 2026-2035 stakeholder consultation process.",
  },
  sectorToEcosystem: {
    title: "From Sector-Based Planning to BEIE Approach",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/From%20Sector-Based%20Planning%20to%20BEIE%20Approach.png",
    category: "framework", section: "section3", alt: "Sector-based vs BEIE ecosystem approach",
    description: "Mental model shift from siloed sector-based development to an interconnected BEIE ecosystem that drives inclusive and sustainable growth in Bangsamoro.",
  },
  beieFrameworkDiagram: {
    title: "BEIE Framework Diagram",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/BEIE%20Framework%20-1%20.png",
    category: "framework", section: "section3", alt: "BEIE circular framework diagram",
    description: "The Bangsamoro Economic and Investment Ecosystem (BEIE) circular framework powered by Moral Governance at its center, with five interconnected components.",
  },
  cluster1FoundationsDetailed: {
    title: "Cluster 1: Foundations — The Infrastructure-First Resource Base",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%201-Foundations.png",
    category: "cluster", section: "section4", alt: "Cluster 1 Foundations detailed diagram",
    description: "Cluster 1 Foundations showing four sectors: Agri-Fisheries (32.4% of GRDP), Energy (75.86% renewable), Forestry (carbon potential), and Environment (green economy revenue).",
  },
  maguindanaoDelSurProfile: {
    title: "Maguindanao del Sur: The Agro-Industrial Breadbasket",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Maguidano-del-Sur.png",
    category: "provincial", section: "section4", alt: "Maguindanao del Sur provincial profile",
    description: "Three-layer economic: Raw Inputs (Pulangi River), Modern Processing (VCO, desiccated coconut), Logistics Grid (farm-to-market roads, solar-dryer warehousing).",
  },
  tragedyOfTheCommonsArchetype: {
    title: "Tragedy of the Commons Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tragedy%20of%20the%20Commons%20Archetype.png",
    category: "archetype", section: "section4", alt: "Tragedy of the Commons systems archetype",
    description: "Systems archetype showing how shared resources get over-exploited when governance is fragmented, with each actor gaining individually but collective impact depleting resources.",
  },
  cluster2TransformersDetailed: {
    title: "Cluster 2: Transformers — Engines of Value Creation",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%202%20_%20Transformers.png",
    category: "cluster", section: "section5", alt: "Cluster 2 Transformers detailed diagram",
    description: "Three-stage progression: Raw Material, High-Value Processing (halal MSMEs, WOW Matnog SEZ), Premium Export (USD 2.3T ASEAN halal market).",
  },
  fixesThatFailArchetype: {
    title: "Fixes that Fail Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Fixes%20that%20Fail%20Archetype.png",
    category: "archetype", section: "section5", alt: "Fixes that Fail systems archetype",
    description: "How short-term tax incentives and fragmented subsidies create the illusion of progress but erode institutional capacity over time.",
  },
  successToTheSuccessfulArchetype: {
    title: "Success to the Successful Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Success%20to%20the%20Successful%20Aarchetype.png",
    category: "archetype", section: "section5", alt: "Success to the Successful systems archetype",
    description: "How mainland provinces attract bulk of resources while island provinces with high potential are left behind.",
  },
  halalFarmToMarketPipeline: {
    title: "MAFAR Halal Farm-to-Market Pipeline",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Transformers-Farm-to-Market%20Pipeline%20.png",
    category: "cluster", section: "section5", alt: "Halal farm-to-market pipeline diagram",
    description: "Four stages: Input Supply, Cold Chain & Logistics, Processing (halal livestock, poultry, seaweed), Market Linkage (BIMP-EAGA export).",
  },
  industrialEconomicZones: {
    title: "Industrial & Economic Zones",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Industrial%20and%20Economic%20Zones.png",
    category: "cluster", section: "section5", alt: "Industrial and economic zones map",
    description: "Polloc Freeport & EcoZone (119-hectare, ADB-funded) and WOW Matanog Special Economic Zone (upcoming Bangsamoro Halal Park).",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 6: CLUSTER 3 — ENABLERS IMAGES
  // ═══════════════════════════════════════════════════════════════════════════════
  capitalizingCulturalAdvantage: {
    title: "Capitalizing Cultural Advantage — Halal Industry Advantage",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Capitalizing%20Cultural%20Advantage%20-%20Halal%20Industry%20Adv.png",
    category: "cluster", section: "section6", alt: "Halal industry advantage for ASEAN market",
    description: "Three key sectors — Halal Food & Beverage (coconut by-products), Halal Cosmetics (Muslim beauty products), Halal Pharmaceuticals — with the BIMP-EAGA trade corridor connecting Bangsamoro to regional Muslim markets.",
  },
  enablingGrid: {
    title: "The Enabling Grid & The Law of Sequencing",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%202%20-%20The%20Enabling%20Grid%20and%20Lawof%20Sequencing.png",
    category: "framework", section: "section6", alt: "Enabling grid and law of sequencing diagram",
    description: "Four sequential stages for infrastructure progression: Energy Priming (island grid connection), Physical Mobility (bridges/transport), Logistics Integrity (cold-storage/warehousing), Industrial Scaling (agro-industrial expansion).",
  },
  digitalTransformationPlan: {
    title: "Digital Transformation Master Plan (BEGMP)",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Digital%20Transformation%20Master%20Plan.png",
    category: "framework", section: "section6", alt: "BEGMP digital transformation roadmap",
    description: "Bangsamoro E-Governance Master Plan bridging the digital divide: Broadband & Connectivity, Smart Cities, E-Government (digital identities, shared services), and Cybersecurity for governance modernization.",
  },
  tourismMasterPlan: {
    title: "Tourism Master Plan (BTDP 2024–2033)",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20Master%20Plan.png",
    category: "framework", section: "section6", alt: "BTDP tourism master plan 10-year strategy",
    description: "Three-phase tourism strategy: Organizing (2025–2026), Stabilizing (2027–2028), Institutionalizing (2029–2033). ₱161.97B funded with 93% to physical access and connectivity for tourism sites.",
  },
  tourismDigitalConnectivity: {
    title: "Tourism and Digital Connectivity — Reinforcing Loop II",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20and%20Digital%20Connectivity.png",
    category: "connectivity", section: "section6", alt: "Digital infrastructure and smart tourism reinforcing loop",
    description: "How digital infrastructure enables tourism (₱161.97B BTDP) which fuels economic development, with the BEGMP digital backbone (broadband, smart cities, e-government, cybersecurity) supporting both tourism and regional growth.",
  },
  activatingEnablers: {
    title: "Activating the Enablers — Infrastructure Primed by Moral Governance",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Activating%20the%20Enablers%20-%20Infra%20Primed%20by%20Moral%20Governance.png",
    category: "governance", section: "section6", alt: "Moral governance powering infrastructure enablers",
    description: "Moral Governance as the operating system: Transparency, Accountability, Stability build trust (the currency of investment). Physical goals: 100% Electrification, 85% Broadband by 2035, 30% Logistics Cost Reduction.",
  },

// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7: CLUSTER 4 — CONNECTORS IMAGES
  // ═══════════════════════════════════════════════════════════════════════════════
  connectivityCapital: {
    title: "The Connectivity Capital Matrix",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Connectivity%20Capital%20.png",
    category: "connectivity", section: "section7", alt: "Connectivity capital matrix diagram",
    description: "Three pillars defining Bangsamoro's infrastructure priorities: Physical Pipelines (₱627M MPW projects, 1,000km farm-to-market roads), Digital Backbones (fiber-optic, e-governance, 1-day business registration by 2028), and Market-Access Assets (cold-chain in Tawi-Tawi, 10 provincial port upgrades).",
  },
  integratingZones: {
    title: "The Critical Test: Integrating Zones & Scaling Capital",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Critical%20Test%20-%20Integrating%20Zones%20and%20Scaling%20Capiral%20-%20Think%20of%20one%20challenge%20%20we%20must%20overcome%20to%20achieve%20this%20vision.png",
    category: "framework", section: "section7", alt: "Integrating economic zones and scaling capital",
    description: "Connectivity Map (Basilan-Zamboanga Bridge, Polloc Freeport, UAE Halal Export Corridors) and the Ethical Bloodstream Pyramid (Islamic Banking & Sukuk, Takaful, Microfinance & Waqf) — showing true integration requires both physical and financial connectivity.",
  },
  provincialSpecializedNodes: {
    title: "Layer 1 — Geopolitical Specialized Nodes",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%201%20-%20Provincial%20-%20Geopolitical%20Specialized%20Nodes.png",
    category: "provincial", section: "section7", alt: "Provincial specialized nodes map",
    description: "Six provincial hubs: Mainland (Maguindanao del Norte & Cotabato — Admin/Halal, Maguindanao del Sur — Agri-Industrial, Lanao del Sur — Clean Energy/Agro, SGA — Agro-Industrial Corridor) and Archipelagic (Basilan — Logistics Gateway, Tawi-Tawi — Maritime Gateway).",
  },
  trappedValue: {
    title: "The Geographic Reality: Trapped Value",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/The%20Trapped%20Value.png",
    category: "connectivity", section: "section7", alt: "Trapped value due to limited connectivity",
    description: "How limited connectivity traps economic potential — Basilan's 48,386ha rubber and Tawi-Tawi's 40% of national seaweed isolated from global trade. The Law of Sequencing highlights Zamboanga-Basilan Interconnection and digital backbones as essential unlocks.",
  },
  shatteringIsolation: {
    title: "The Archipelagic Bridge: Shattering Geographic Isolation",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Shattering%20Geographical%20Isolation.png",
    category: "connectivity", section: "section7", alt: "Archipelagic bridge projects",
    description: "Three key initiatives: Zamboanga-Basilan Interconnection (₱6.67B, 69kV), Basilan-Zamboanga Bridge (31km by 2030), Bongao Bridge Tawi-Tawi (541m). Systemic interventions improving market access and labor mobility.",
  },
  basilanTawiTawiConnectors: {
    title: "Basilan and Tawi-Tawi: Provincial Endowments & Strategic Leverages",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Basilan%20and%20tawi-Tawi.png",
    category: "provincial", section: "section7", alt: "Basilan and Tawi-Tawi provincial profiles",
    description: "Basilan — Archipelagic Catalyst: 48,366ha rubber, coastal aquaculture, ZBIP power, Basilan-Zamboanga Bridge. Tawi-Tawi — Maritime & Eco-Tourism Hub: BIMP-EAGA location, marine biodiversity, maritime gateway for blue economy.",
  },
  globalIntegration: {
    title: "Layer 3: Global Integration Vectors",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Global%20Integration%20Vectors.png",
    category: "connectivity", section: "section7", alt: "Global integration vectors BIMP-EAGA and UAE/GCC",
    description: "Vector 1 — BIMP-EAGA Corridor: proximity-based maritime trade, 3% of ASEAN halal market via Tawi-Tawi. Vector 2 — UAE & GCC Corridor: standards-based air/sea logistics, $2.3T global halal market via Polloc Freeport and OIC/SMIIC accreditation.",
  },
  uaeGccConnectivity: {
    title: "BARMM Connectivity vis-à-vis UAE & GCC",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/UAE%20&%20GCC.png",
    category: "connectivity", section: "section7", alt: "BARMM UAE GCC connectivity map",
    description: "Three hubs linked to $2.3T global halal market: Basilan (₱23.15B GDP, Archipelagic Logistics Gateway, ZBIP), Maguindanao del Norte (₱81.91B GDP, Admin & Halal Hub, Polloc), Maguindanao del Sur (₱39.54B GDP, Agri-Industrial Breadbasket).",
  },
  barmmBimpeaga: {
    title: "BARMM Strategic Connectivity Map",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BARMM%20Connectivity-BIMP-EAGA.png",
    category: "connectivity", section: "section7", alt: "BARMM BIMP-EAGA strategic connectivity",
    description: "Tawi-Tawi and Basilan as maritime gateways feeding BIMP-EAGA. Maguindanao del Norte and Polloc Freeport as halal export centers to UAE/GCC. Maguindanao del Sur and Lanao del Sur as inland production zones.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 8: CLUSTER 5 — FINANCIERS IMAGES
  // ═══════════════════════════════════════════════════════════════════════════════
  financiersCapitalBloodstream: {
    title: "The Capital Bloodstream: Scaling Shariah-Compliant Finance",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Financiers.png",
    category: "cluster", section: "section8", alt: "Capital bloodstream Shariah-compliant finance pyramid",
    description: "Three-tier pyramid: Macro-Capital (Islamic Banking & Sukuk for infrastructure), Risk Mitigation (Takaful for agriculture/climate shocks), Micro-Access (Islamic Microfinance & Waqf for farmers/MSMEs).",
  },
  islamicFinanceRoadmap: {
    title: "Islamic Finance Roadmap (2024–2028)",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Islamic%20Finance%20Roadmap.png",
    category: "framework", section: "section8", alt: "Islamic finance roadmap 2024-2028",
    description: "Six progressive layers: Strengthen Islamic Banking, Enhance Microfinance & Waqf, Establish Takaful, Facilitate Sukuk Capital Market, Harness Fintech, Develop Human Capital. Timeline: 2024-2025 Foundation, Mid-Term Takaful, 2028 Functional System & Tax Neutrality.",
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 10-15: IEDS, METRICS, BALANCED SCORECARD, PRIORITY ACTIONS IMAGES
  // ═══════════════════════════════════════════════════════════════════════════════
  executionEngine: {
    title: "The Execution Engine: IEDS",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Execution%20Engine%20-IEDS.png",
    category: "roadmap", section: "section10", alt: "The Execution Engine IEDS diagram",
    description: "The Execution Engine presents the best pathway among four strategic options by sequencing HEDS, GEMS, and IFES into a coherent, time-bound execution plan. Total capital deployment: ₱120-160B across three phases.",
  },
  capitalDeployment: {
    title: "Total Capital Deployment across Three Phases",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Total%20Capital%20Deployment.png",
    category: "roadmap", section: "section13", alt: "Total capital deployment ₱120-160B",
    description: "Total capital deployment of ₱120-160 billion across Activate (₱35-45B), Scale (₱50-65B), and Consolidate (₱35-50B) phases with funding mix: 35% block grants, 30% ODA/climate finance, 35% private capital.",
  },
  bscStrategyMap: {
    title: "BSC Strategy Map: Intangibles to Economic Outcomes",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BSC-Intangibles-to-Economic-Outcomes.png",
    category: "framework", section: "section12", alt: "Balanced Scorecard strategy map",
    description: "The strategy map visualizes how investments in Learning & Growth enable Internal Processes, which deliver Stakeholder value, ultimately achieving Financial objectives — ₱550B GRDP, 20,000+ jobs, <20% poverty.",
  },
  kpiFramework: {
    title: "BIRD KPI Framework - 4-Tier Calibration",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/KPI-Framework.png",
    category: "metrics", section: "section11", alt: "4-tier KPI calibration architecture",
    description: "The 4-tier KPI calibration architecture: Baseline (2024-2025), Interim 1 (2028), Interim 2 (2030), Terminal (2035), Long-Horizon (2040) ensuring metrics remain responsive to IEDS synchronization.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 9: OPERATING SYSTEMS — MORAL GOVERNANCE IMAGES
  // ═══════════════════════════════════════════════════════════════════════════════
  moralGovernanceDerisksCapital: {
    title: "How Moral Governance De-Risks Capital",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/How%20moral%20Governance%20De-Risks%20Capital.png",
    category: "governance", section: "section9", alt: "Moral governance de-risking capital reinforcing loop",
    description: "Reinforcing feedback loop: Moral Governance → Institutional Transparency → Lower Bureaucratic Friction (BIFOSS) → Investor Confidence → Increased FDI → Regional Revenue → Stronger Governance Capacity → Moral Governance.",
  },
  investmentGovernanceCyclesOS: {
    title: "Investment-Development and Governance-Investor Confidence Loops",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Investment%20and%20Governance%20Cycles.png",
    category: "systems", section: "section9", alt: "Investment development and governance investor confidence cycles",
    description: "Loop R1 — Investment-Development: investments create jobs, expand markets, attract more investors. Loop R2 — Governance-Investor Confidence: transparent governance builds trust, expands tax base, improves governance capacity.",
  },
  regulatoryArchitecture: {
    title: "The Regulatory Architecture Securing Capital",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Regulatory%20Architecture.png",
    category: "governance", section: "section9", alt: "Regulatory architecture five pillars",
    description: "Five pillars around RA 11054: 2nd BDP & SIPP, BHIDP (halal/OIC-SMIIC), BSEMP (renewable energy), RA 11439 & CREATE MORE (Islamic banking), Pending Forestry Code (carbon credits/PES).",
  },
  draftJMC2026: {
    title: "Draft JMC 2026-01: Conservation as Municipal Revenue",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Draft%20JMC%202026-01.png",
    category: "governance", section: "section9", alt: "Draft JMC 2026-01 conservation revenue streams",
    description: "Three channels — Carbon Credits, PES, and Eco-Tourism User Fees — merge into a Revenue River feeding LGUs for capacity building, livelihoods, and infrastructure.",
  },
  policyRecommendationsStakeholders: {
    title: "Policy Recommendations: Policymakers, Planners, and Investors",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Policy%20Recommendations-Policy%20Makers-Planners-Investors.png",
    category: "governance", section: "section9", alt: "Policy recommendations for stakeholders",
    description: "Collaborative governance: Policymakers (Forestry Code, Investment Code, Command Center), Planners (BEIE, infrastructure sequencing, BBOI offices), Investors (agro/halal/rubber, carbon finance, fintech).",
  },
  policyRecommendationsFramework: {
    title: "Policy Recommendations: Activating the Framework",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Policy%20recommendations-Institutional-Fiscal-Regulatory.png",
    category: "governance", section: "section9", alt: "Institutional fiscal regulatory reforms",
    description: "Three integrated reforms: Institutional (BIF-Net for inter-agency coordination), Fiscal (SIPP/CREATE MORE harmonization), Regulatory (BEIE institutionalization for synchronized budgets).",
  },

} as const;

// BIRD SITES — 12 External Reference Sites
// ═══════════════════════════════════════════════════════════════════════════════

export const BIRD_SITES = {
  home: {
    title: "BIRD Home",
    url: "https://bangsamoro-investment-roadmap.asilvainnovations.com",
    description: "Main BIRD 2026-2035 landing page with executive summary, key highlights, and stakeholder access portals.",
  },
  roadmap: {
    title: "Investment Roadmap",
    url: "https://bird-roadmap.asilvainnovations.com",
    description: "Interactive roadmap visualization with phase details, milestones, progress tracking, and public dashboards.",
  },
  surveyOrientation: {
    title: "Validation Survey Orientation",
    url: "https://bird-survey-orientation.asilvainnovations.com",
    description: "Survey orientation and guidance portal with methodology explainer, FAQ, and stakeholder preparation resources.",
  },
  resources: {
    title: "Resources Library",
    url: "https://bird-resources.asilvainnovations.com",
    description: "Comprehensive BIRD documentation library: reports, presentations, data sets, and multimedia resources.",
  },
  dashboard: {
    title: "Strategic Dashboard",
    url: "https://bird-dashboard.asilvainnovations.com",
    description: "Public strategic dashboard with real-time KPIs, progress indicators, and transparent performance reporting.",
  },
  contact: {
    title: "Contact BOI-MTIT BARMM",
    url: "https://bird-contact.asilvainnovations.com",
    description: "Contact page for the Bangsamoro Board of Investments - Ministry of Trade, Investment and Tourism.",
  },
  birdApp: {
    title: "BIRD Strategic Planning App",
    url: "https://bird-app.asilvainnovations.com",
    description: "Main BIRD strategic planning application with all modules: SWOT, Systems Thinking, BSC, PAPs, MEL, and AI Assistant.",
  },
  validationSurvey: {
    title: "Validation Survey Portal",
    url: "https://bird-survey.asilvainnovations.com",
    description: "Standalone validation survey portal for stakeholder feedback collection, analysis, and reporting.",
  },
  boiPortal: {
    title: "BOI-MTIT BARMM Official",
    url: "https://boi.barmm.gov.ph",
    description: "Official Bangsamoro Board of Investments portal for registration, incentives, and investment facilitation.",
  },
  barmmGov: {
    title: "Bangsamoro Government",
    url: "https://www.barmm.gov.ph",
    description: "Official website of the Bangsamoro Autonomous Region in Muslim Mindanao government.",
  },
  halalCertification: {
    title: "BARMM Halal Certification",
    url: "https://halal.barmm.gov.ph",
    description: "Official halal certification portal for BARMM with application, verification, and registry services.",
  },
  investorPortal: {
    title: "BARMM Investor Portal",
    url: "https://invest.barmm.gov.ph",
    description: "One-stop investor portal for investment promotion, facilitation, aftercare, and grievance handling.",
  },
} as const;
export type BIRDVideo = typeof BIRD_VIDEOS[keyof typeof BIRD_VIDEOS];
export type BIRDImage = typeof BIRD_IMAGES[keyof typeof BIRD_IMAGES];
export type BIRDSite = typeof BIRD_SITES[keyof typeof BIRD_SITES];

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/** Get all images for a specific section ID */
export function getImagesForSection(sectionId: string): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.section === sectionId);
}

/** Get all videos for a specific section ID */
export function getVideosForSection(sectionId: string): BIRDVideo[] {
  return Object.values(BIRD_VIDEOS).filter(vid => vid.section === sectionId);
}

/** Get images by category */
export function getImagesByCategory(category: BIRDImage["category"]): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === category);
}

// ── Category-specific shortcuts ──────────────────────────────────────────────

export function getArchetypeImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "archetype");
}

export function getClusterImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "cluster");
}

export function getProvincialImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img =>
    img.category === "provincial" || img.category === "provincial-outlook"
  );
}

export function getProvincialOutlookImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "provincial-outlook");
}

export function getConnectivityImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "connectivity");
}

export function getFrameworkImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "framework");
}

export function getSystemsImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "systems");
}

export function getCLDImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "cld");
}

export function getLeverageImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "leverage");
}

export function getRoadmapImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "roadmap");
}

export function getSurveyImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "survey");
}

export function getMetricsImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "metrics");
}

// ── Search & discovery ───────────────────────────────────────────────────────

/** Search images by keyword in title, alt, or description */
export function searchImages(query: string): BIRDImage[] {
  const q = query.toLowerCase();
  return Object.values(BIRD_IMAGES).filter(
    img =>
      img.title.toLowerCase().includes(q) ||
      img.alt.toLowerCase().includes(q) ||
      (img as BIRDImage & { description?: string }).description?.toLowerCase().includes(q)
  );
}

/** Get total counts for dashboard display */
export function getMediaCounts() {
  return {
    videos: Object.keys(BIRD_VIDEOS).length,
    images: Object.keys(BIRD_IMAGES).length,
    sites: Object.keys(BIRD_SITES).length,
    sections: new Set(Object.values(BIRD_IMAGES).map(i => i.section)).size,
  };
}

/** Get all available sections that have content */
export function getAvailableSections(): string[] {
  const sections = new Set<string>();
  Object.values(BIRD_IMAGES).forEach(img => sections.add(img.section));
  Object.values(BIRD_VIDEOS).forEach(vid => sections.add(vid.section));
  return Array.from(sections).sort();
}
