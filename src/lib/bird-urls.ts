// ============================================================================
// BIRD 2026–2035 · Multimedia Asset Registry
// Centralized URLs for all images & videos used across the platform.
// Source: Supabase Storage (lydsisparsmvextskevw)
// ============================================================================

const STORAGE_URL =
  'https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public';

// ─── Validation Survey Images ────────────────────────────────────────────────
const VALIDATION_IMG = `${STORAGE_URL}/validation-survey-images`;

// ─── BEIE / Strategic Images ─────────────────────────────────────────────────
const BEIE_IMG = `${STORAGE_URL}/BEIE-images`;

// ─── SWOT & Systems Maps ─────────────────────────────────────────────────────
const SWOT_SYSTEMS_IMG = `${STORAGE_URL}/images-swot-systems-maps`;

// ─── Strategic Options & Roadmap ─────────────────────────────────────────────
const ROADMAP_IMG = `${STORAGE_URL}/images-strategic-options-roadmap`;

// ─────────────────────────────────────────────────────────────────────────────
// BIRD EXTERNAL SITES REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

export const BIRD_SITES = {
  birdMain: {
    title: 'BIRD 2026–2035 Platform',
    description:
      'The official Bangsamoro Investment Roadmap portal — validation survey, strategic planning tools, and real-time analytics.',
    url: 'https://asilvainnovations.github.io/BIRD-2026-2035/',
  },
  bangsamoroGov: {
    title: 'Bangsamoro Government Portal',
    description:
      'Official government portal of the Bangsamoro Autonomous Region in Muslim Mindanao.',
    url: 'https://www.bangsamoro.gov.ph/',
  },
  mtitBarmm: {
    title: 'MTIT-BARMM',
    description:
      'Ministry of Trade, Investments and Tourism of the Bangsamoro Autonomous Region.',
    url: 'https://mtit.bangsamoro.gov.ph/',
  },
  bimpEaga: {
    title: 'BIMP-EAGA',
    description:
      'Brunei Darussalam-Indonesia-Malaysia-Philippines East ASEAN Growth Area.',
    url: 'https://bimp-eaga.asia/',
  },
  psaBarmm: {
    title: 'PSA-BARMM Statistics',
    description:
      'Philippine Statistics Authority — BARMM regional statistics and data.',
    url: 'https://psa.gov.ph/statistics/census/provincial-profile-barmm',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// BIRD IMAGES REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

export const BIRD_IMAGES = {
  // ── Section 0: Orientation ────────────────────────────────────────────────
  validationBanner: {
    url: `${VALIDATION_IMG}/Validation%20Survey%20Banner.png`,
    title: 'BIRD 2026–2035 Validation Survey',
    alt: 'BIRD Validation Survey Banner',
  },

  // ── Section 1: BEIE Framework ─────────────────────────────────────────────
  sectorToEcosystem: {
    url: `${VALIDATION_IMG}/From%20Sector-Based%20Planning%20to%20BEIE%20Approach.png`,
    title: 'From Sector-Based Planning to BEIE Ecosystem Approach',
    alt: 'Diagram comparing traditional sector-based planning with the integrated BEIE ecosystem approach for BARMM',
    category: 'framework',
  },
  beieFrameworkV2: {
    url: `${VALIDATION_IMG}/BEIE-v2.png`,
    title: 'BEIE Framework v2',
    alt: 'Bangsamoro Economic and Investment Ecosystem Framework version 2',
    category: 'framework',
  },
  beieFrameworkV3: {
    url: `${VALIDATION_IMG}/BEIE-v3.png`,
    title: 'Bangsamoro Investment Ecosystem v3',
    alt: 'Bangsamoro Investment Ecosystem Framework version 3',
    category: 'framework',
  },
  investmentRoadmapInfographic: {
    url: `${VALIDATION_IMG}/2035%20Bangsamoro%20Investment%20Roadmap%20Infographics.png`,
    title: '2035 Bangsamoro Investment Roadmap Infographic',
    alt: 'Investment roadmap infographic showing the path to 2035 for Bangsamoro',
    category: 'framework',
  },

  // ── Section 2: Moral Governance ───────────────────────────────────────────
  operatingSystems: {
    url: `${BEIE_IMG}/3.%20MG.png`,
    title: 'Moral Governance — The Operating System',
    alt: 'Moral Governance as the operating system of BARMM',
  },
  investmentGovernanceCycles: {
    url: `${SWOT_SYSTEMS_IMG}/Investment%20and%20Governance%20Cycles.png`,
    title: 'Investment–Development & Governance–Confidence Loops',
    alt: 'Two reinforcing loops showing how investment and governance reinforce each other in BARMM',
  },
  moralGovernanceDeRisks: {
    url: `${BEIE_IMG}/How%20moral%20Governance%20De-Risks%20Capital.png`,
    title: 'How Moral Governance De-Risks Capital',
    alt: 'Diagram explaining how moral governance reduces investment risk in BARMM',
  },
  fiveClusters: {
    url: `${BEIE_IMG}/4%20The%20parts%20of%20the%20Engine.png`,
    title: 'Five Interconnected Clusters',
    alt: 'The five interconnected BEIE clusters that drive BARMM',
    category: 'cluster',
  },

  // ── Section 3: Cluster 1 Foundations ──────────────────────────────────────
  cluster1Foundations: {
    url: `${BEIE_IMG}/10.%20Cluster%201.png`,
    title: 'Cluster 1 — Foundations',
    alt: 'Cluster 1: Foundations of the Bangsamoro economy',
    category: 'cluster',
  },

  // ── Section 4: Cluster 2 Transformers ─────────────────────────────────────
  cluster2Transformers: {
    url: `${BEIE_IMG}/11.%20Cluster%202%20_%20Transformers.png`,
    title: 'Cluster 2 — Transformers',
    alt: 'Cluster 2: Transformers of the Bangsamoro economy',
    category: 'cluster',
  },
  farmToMarketPipeline: {
    url: `${VALIDATION_IMG}/Transformers-Farm-to-Market%20Pipeline%20.png`,
    title: 'Farm-to-Market Pipeline',
    alt: 'Farm-to-market pipeline showing agricultural value chain in BARMM',
  },
  transformersIndustrialZones: {
    url: `${VALIDATION_IMG}/Industrial%20and%20Economic%20Zones.png`,
    title: 'The Transformers — Capturing Value Through Industrial and Economic Zones',
    alt: 'Industrial and economic zones in the Transformers cluster',
  },
  capitalizingCulturalAdvantage: {
    url: `${VALIDATION_IMG}/Capitalizing%20Cultural%20Advantage%20-%20Halal%20Industry%20Adv.png`,
    title: 'Capitalizing Cultural Advantage — Halal Industry',
    alt: 'How BARMM capitalizes on its cultural advantage for the halal industry',
  },

  // ── Section 5: Cluster 3 Enablers ─────────────────────────────────────────
  cluster3Enablers: {
    url: `${BEIE_IMG}/Cluster%203%20Enablers.png`,
    title: 'Cluster 3 — Enablers',
    alt: 'Cluster 3: Enablers of the Bangsamoro economy',
    category: 'cluster',
  },
  skillsEducationGap: {
    url: `${VALIDATION_IMG}/Skills%20and%20Education%20Gap.png`,
    title: 'Skills and Education Gap',
    alt: 'Skills and education gap analysis for BARMM',
  },
  enablingGrid: {
    url: `${BEIE_IMG}/Layer%202%20-%20The%20Enabling%20Grid%20and%20Lawof%20Sequencing.png`,
    title: 'The Enabling Grid — 2nd Layer of BARMM Interconnectivity',
    alt: 'The enabling grid showing the second layer of BARMM interconnectivity',
  },
  digitalBackbone: {
    url: `${VALIDATION_IMG}/The%20Digital%20Backbone.png`,
    title: 'The Digital Backbone',
    alt: 'Digital backbone infrastructure for BARMM',
  },
  tourismMasterPlan: {
    url: `${VALIDATION_IMG}/Tourism%20Master%20Plan.png`,
    title: 'Tourism Master Plan',
    alt: 'Tourism master plan for Bangsamoro',
  },
  tourismDigitalConnectivity: {
    url: `${VALIDATION_IMG}/Tourism%20and%20Digital%20Connectivity.png`,
    title: 'Tourism and Digital Connectivity',
    alt: 'Tourism and digital connectivity in BARMM',
  },
  activatingEnablers: {
    url: `${VALIDATION_IMG}/Activating%20the%20Enablers%20-%20Infra%20Primed%20by%20Moral%20Governance.png`,
    title: 'Activating the Enablers — Primed by Moral Governance',
    alt: 'How moral governance activates infrastructure enablers in BARMM',
  },

  // ── Section 6: Cluster 4 Connectors ───────────────────────────────────────
  cluster4Connectors: {
    url: `${BEIE_IMG}/Cluster%204_%20Connectors.png`,
    title: 'Cluster 4 — Connectors',
    alt: 'Cluster 4: Connectors of the Bangsamoro economy',
    category: 'cluster',
  },
  connectivityIntegratesZones: {
    url: `${ROADMAP_IMG}/Critical%20Test%20-%20Integrating%20Zones%20and%20Scaling%20Capiral%20-%20Think%20of%20one%20challenge%20%20we%20must%20overcome%20to%20achieve%20this%20vision.png`,
    title: 'Does Connectivity Integrate Economic Zones?',
    alt: 'Critical test on whether connectivity integrates economic zones in BARMM',
  },
  connectivityCapital: {
    url: `${VALIDATION_IMG}/The%20Connectivity%20Capital%20.png`,
    title: 'The Connectivity Capital',
    alt: 'Connectivity capital of Bangsamoro',
  },
  provincialSpecializedConnectivity: {
    url: `${BEIE_IMG}/Layer%201%20-%20Provincial%20-%20Geopolitical%20Specialized%20Nodes.png`,
    title: 'Provincial Specialized Connectivity — One Bangsamoro',
    alt: 'Provincial specialized connectivity nodes for One Bangsamoro',
  },
  revitalizingMaritimeTrade: {
    url: `${BEIE_IMG}/Revitalizing%20the%20Maritime%20Trade.png`,
    title: 'Revitalizing the Maritime Trade',
    alt: 'Revitalizing maritime trade in Bangsamoro',
  },
  provincialEndowmentsMainlands: {
    url: `${BEIE_IMG}/Mainlands%20Provincial%20Endowments.png`,
    title: 'Provincial Endowments — Mainlands',
    alt: 'Provincial endowments of mainland Bangsamoro provinces',
  },
  maguindanaoDelSur: {
    url: `${BEIE_IMG}/Maguidano-del-Sur.png`,
    title: 'Maguindanao del Sur Provincial Endowment',
    alt: 'Provincial endowment map of Maguindanao del Sur',
  },
  maguindanaoDelNorte: {
    url: `${BEIE_IMG}/Maguindanao-del-Norte.png`,
    title: 'Maguindanao del Norte Provincial Endowment',
    alt: 'Provincial endowment map of Maguindanao del Norte',
  },
  basilanTawiTawi: {
    url: `${BEIE_IMG}/Basilan%20and%20tawi-Tawi.png`,
    title: 'Basilan & Tawi-Tawi Provincial Endowments',
    alt: 'Provincial endowment maps of Basilan and Tawi-Tawi',
  },
  trappedValue: {
    url: `${BEIE_IMG}/The%20Trapped%20Value.png`,
    title: 'The Trapped Value',
    alt: 'Diagram showing trapped value in Bangsamoro',
  },
  shatteringGeographicIsolation: {
    url: `${BEIE_IMG}/Shattering%20Geographical%20Isolation.png`,
    title: 'Shattering Geographic Isolation',
    alt: 'How Bangsamoro is shattering geographic isolation',
  },
  globalIntegration: {
    url: `${BEIE_IMG}/Global%20Integration%20Vectors.png`,
    title: 'Global Integration Vectors',
    alt: 'Global integration vectors for Bangsamoro',
  },
  globalValueChainUAE: {
    url: `${BEIE_IMG}/UAE%20&%20GCC.png`,
    title: 'Global Value Chain Integration with UAE-GCC',
    alt: 'Global value chain integration with UAE and GCC',
  },
  globalValueChainBIMP: {
    url: `${BEIE_IMG}/BARMM%20Connectivity-BIMP-EAGA.png`,
    title: 'Global Value Chain Integration with BIMP-EAGA',
    alt: 'Global value chain integration with BIMP-EAGA',
  },
  priorityTourismClusters: {
    url: `${VALIDATION_IMG}/Priority%20Tourism%20Clusters%20and%20Investment%20Sites.png`,
    title: 'Priority Tourism Clusters & Investment Sites',
    alt: 'Priority tourism clusters and investment sites in BARMM',
  },

  // ── Section 7: Cluster 5 Financiers ───────────────────────────────────────
  cluster5Financiers: {
    url: `${BEIE_IMG}/38.%20Cluster%205_%20Financiers.png`,
    title: 'Cluster 5 — Financiers',
    alt: 'Cluster 5: Financiers of the Bangsamoro economy',
    category: 'cluster',
  },
  islamicFinanceRoadmap: {
    url: `${VALIDATION_IMG}/Islamic%20Finance%20Roadmap.png`,
    title: 'Islamic Finance Roadmap',
    alt: 'Islamic finance roadmap for Bangsamoro',
  },

  // ── Section 7: Systems Archetypes ─────────────────────────────────────────
  anatomyCLD: {
    url: `${VALIDATION_IMG}/3-Anatomy%20of%20CLD.png`,
    title: 'Anatomy of a Causal Loop Diagram',
    alt: 'Anatomy of a causal loop diagram',
  },
  uncheckedGrowth: {
    url: `${SWOT_SYSTEMS_IMG}/19.%20The%20Archetypes.png`,
    title: 'Unchecked Growth Hits Infrastructure & Security Ceilings',
    alt: 'Diagram showing how unchecked growth hits hard infrastructure and security ceilings',
  },
  whySynchronizationMatters: {
    url: `${BEIE_IMG}/6.%20Why%20Synchronization%20Matters.png`,
    title: 'Why Synchronization Matters',
    alt: 'Why synchronization matters in the Bangsamoro investment ecosystem',
  },

  // ── Systems Archetypes Banners ────────────────────────────────────────────
  systemsArchetypesBanner: {
    url: `${VALIDATION_IMG}/Systems%20Archetypes%20Banner.png`,
    title: 'Systems Archetypes Banner',
    alt: 'Systems archetypes banner for Bangsamoro',
  },
  anatomySystemsTraps: {
    url: `${VALIDATION_IMG}/6-Anatomy%20of%20Systems%20Traps.png`,
    title: 'Anatomy of Systems Traps or Archetypes',
    alt: 'Anatomy of systems traps or archetypes',
  },

  // ── Capacity Traps ────────────────────────────────────────────────────────
  capacityTraps: {
    url: `${VALIDATION_IMG}/Hitting%20the%20Growth%20Wall-%20Limits%20to%20Growth%20and%20Growth%20and%20Underinvestment.png`,
    title: 'Capacity Traps — Hitting the Growth Wall',
    alt: 'Capacity traps showing limits to growth and growth and underinvestment archetypes',
  },
  limitsToGrowthArchetype: {
    url: `${VALIDATION_IMG}/Limits%20to%20Growth%20Archetype.png`,
    title: 'Limits to Growth Archetype',
    alt: 'Limits to growth archetype diagram',
  },
  growthUnderinvestment: {
    url: `${VALIDATION_IMG}/Growth%20and%20Underinvestment.png`,
    title: 'Growth and Underinvestment Archetype',
    alt: 'Growth and underinvestment archetype diagram',
  },

  // ── Governance Traps ──────────────────────────────────────────────────────
  shiftingTheBurden: {
    url: `${VALIDATION_IMG}/Shifting%20the%20Burden%20Archetype.png`,
    title: 'Shifting the Burden Archetype',
    alt: 'Shifting the burden archetype diagram',
  },
  fixesThatFail: {
    url: `${VALIDATION_IMG}/Fixes%20that%20Fail%20Archetype.png`,
    title: 'Fixes that Fail Archetype',
    alt: 'Fixes that fail archetype diagram',
  },
  driftingGoals: {
    url: `${SWOT_SYSTEMS_IMG}/Drifting%20Goals.png`,
    title: 'Drifting Goals Archetype',
    alt: 'Drifting goals archetype diagram',
  },

  // ── Resource & Equity Traps ───────────────────────────────────────────────
  resourceEquityTraps: {
    url: `${VALIDATION_IMG}/Resource%20and%20Equity%20Traps%20-%20Success%20to%20the%20Successful%20and%20Growth%20and%20Tragedy%20of%20the%20Commons%20Archetypes%20.png`,
    title: 'Resource and Equity Traps',
    alt: 'Resource and equity traps archetypes',
  },
  successToTheSuccessful: {
    url: `${VALIDATION_IMG}/Success%20to%20the%20Successful%20Aarchetype.png`,
    title: 'Success to the Successful Archetype',
    alt: 'Success to the successful archetype diagram',
  },
  tragedyOfTheCommons: {
    url: `${VALIDATION_IMG}/Tragedy%20of%20the%20Commons%20Archetype.png`,
    title: 'Tragedy of the Commons Archetype',
    alt: 'Tragedy of the commons archetype diagram',
  },

  // ── Instability Traps ─────────────────────────────────────────────────────
  instabilityTrapsIntro: {
    url: `${VALIDATION_IMG}/Instability%20Traps%20Introduction.png`,
    title: 'Instability Traps Introduction',
    alt: 'Introduction to instability traps',
  },
  cyclesExclusionRetaliation: {
    url: `${VALIDATION_IMG}/Cycles%20of%20Exclusion%20and%20Retaliation.png`,
    title: 'Cycles of Exclusion and Retaliation',
    alt: 'Cycles of exclusion and retaliation archetype',
  },
  escalation: {
    url: `${SWOT_SYSTEMS_IMG}/Escalation.png`,
    title: 'Escalation Archetype',
    alt: 'Escalation archetype diagram',
  },
  bigManArchetype: {
    url: `${SWOT_SYSTEMS_IMG}/The%20Big%20Man%20Archetype.png`,
    title: 'The Big Man Archetype',
    alt: 'The Big Man archetype diagram',
  },

  // ── Leverage Points ───────────────────────────────────────────────────────
  leveragePointsBanner: {
    url: `${VALIDATION_IMG}/Leverage%20Points%20Banner.png`,
    title: 'Leverage Points Banner',
    alt: 'Leverage points banner',
  },
  howToIdentifyLeveragePoints: {
    url: `${SWOT_SYSTEMS_IMG}/How%20to%20Identify%20Leverage%20Points.png`,
    title: 'How to Identify Leverage Points',
    alt: 'How to identify leverage points diagram',
  },
  activatingLeveragePoints: {
    url: `${SWOT_SYSTEMS_IMG}/Activating%20Leverage%20Points.png`,
    title: 'Activating Leverage Points',
    alt: 'Activating leverage points diagram',
  },
  strategicLeveragePoints: {
    url: `${VALIDATION_IMG}/27.%20Strategic%20Leverage%20Points.png`,
    title: 'Strategic Leverage Points',
    alt: 'Strategic leverage points for Bangsamoro',
  },
  leverageCapacityTraps: {
    url: `${VALIDATION_IMG}/Skills%20and%20Education%20Gap.png`,
    title: 'Leverage Points in Capacity Traps',
    alt: 'Leverage points in capacity traps',
  },
  leverageGovernanceTraps: {
    url: `${VALIDATION_IMG}/Iceberg%20Model%20Paradigm.png`,
    title: "Leverage Points in Governance Traps: The Iceberg Model",
    alt: 'Leverage points in governance traps using the iceberg model paradigm',
  },
  archetypesLeveragePoints: {
    url: `${VALIDATION_IMG}/Archetypes%20&%20Leverage%20Points.png`,
    title: 'Archetypes and Leverage Points',
    alt: 'Archetypes and leverage points combined diagram',
  },

  // ── Section 8: Strategic Options ──────────────────────────────────────────
  fourStrategicOptions: {
    url: `${ROADMAP_IMG}/3.%20Strategic%20Options%20Ranking.png`,
    title: 'Four Strategic Options',
    alt: 'Four strategic options for Bangsamoro',
  },
  sequencing: {
    url: `${ROADMAP_IMG}/Sequencing.png`,
    title: 'The Phasing — Strategic Sequencing',
    alt: 'Strategic sequencing and phasing diagram',
  },

  // ── Section 9: Budget Targets ─────────────────────────────────────────────
  budgetThreePhases: {
    url: `${VALIDATION_IMG}/22.%20Regulatory%20Architecture.png`,
    title: 'Budget for Three Phases',
    alt: 'Budget allocation across three phases',
  },
  capitalDeploymentPerPhase: {
    url: `${VALIDATION_IMG}/28.%20Ecosystem%20Success.png`,
    title: 'Total Capital Deployment Per Phase',
    alt: 'Total capital deployment per phase',
  },
  executingRoadmap: {
    url: `${ROADMAP_IMG}/Executing%20the%20Roadmap.png`,
    title: 'Executing the Roadmap — Timeline',
    alt: 'Timeline for executing the Bangsamoro roadmap',
  },
  roadmapInMotion: {
    url: `${VALIDATION_IMG}/Roadmap%20on%20Motion.png`,
    title: 'Roadmap in Motion',
    alt: 'Roadmap in motion showing dynamic progress',
  },

  // ── Section 10: IEDS ──────────────────────────────────────────────────────
  iedsExecutionEngine: {
    url: `${ROADMAP_IMG}/The%20Execution%20Engine%20-IEDS.png`,
    title: 'IEDS — The Execution Engine',
    alt: 'IEDS execution engine diagram',
  },
  metricsArchitecture: {
    url: `${VALIDATION_IMG}/Metrics%20Architecture%20(1).png`,
    title: 'Metrics Architecture',
    alt: 'Metrics architecture for monitoring and evaluation',
  },

  // ── Section 11: Policies ──────────────────────────────────────────────────
  regulatoryArchitecture: {
    url: `${VALIDATION_IMG}/22.%20Regulatory%20Architecture.png`,
    title: 'Regulatory Architecture',
    alt: 'Regulatory architecture for Bangsamoro',
  },
  draftJMC: {
    url: `${VALIDATION_IMG}/23.%20Draft%20JMC%202026-01.png`,
    title: 'Draft JMC 2026-01',
    alt: 'Draft Joint Memorandum Circular 2026-01',
  },
  policyRecommendations: {
    url: `${VALIDATION_IMG}/Policy%20Recommendations-Policy%20Makers-Planners-Investors.png`,
    title: 'Policy Recommendations — Policy Makers, Planners, Investors',
    alt: 'Policy recommendations for policy makers planners and investors',
  },
  corePolicyMandates: {
    url: `${VALIDATION_IMG}/Policy%20recommendations-Institutional-Fiscal-Regulatory.png`,
    title: 'Core Policy Mandates',
    alt: 'Core policy mandates institutional fiscal regulatory',
  },

  // ── Section 12: Wrapping Up ───────────────────────────────────────────────
  whenVisionMeetsExecution: {
    url: `${ROADMAP_IMG}/When%20Vision%20Meets%20Execution.png`,
    title: 'When Vision Meets Execution',
    alt: 'When vision meets execution in Bangsamoro',
  },
  decadeAhead: {
    url: `${VALIDATION_IMG}/The%20Decade%20Ahead_Bird%20App-CTA.png`,
    title: 'The Decade Ahead',
    alt: 'The decade ahead for Bangsamoro',
  },
  investInBangsamoro: {
    url: `${VALIDATION_IMG}/Invest%20in%20Bangsamoro.png`,
    title: 'Invest in Bangsamoro',
    alt: 'Invest in Bangsamoro call to action',
  },
  chooseBangsamoro: {
    url: `${VALIDATION_IMG}/Choose%20Bangsamoro.png`,
    title: 'Choose Bangsamoro',
    alt: 'Choose Bangsamoro call to action',
  },

  // ── Existing BEIE Images (retained for backward compatibility) ────────────
  clusterOverview: {
    url: `${BEIE_IMG}/5.%20Clusters.png`,
    title: 'Five BEIE Clusters',
    alt: 'Overview of the five BEIE clusters',
  },
  cluster1Stocks: {
    url: `${BEIE_IMG}/12.%20Foundations%20Stocks.png`,
    title: 'Cluster 1 — Foundations Stocks & Flows',
    alt: 'Foundations cluster stocks and flows',
  },
  cluster1Loops: {
    url: `${BEIE_IMG}/13.%20Foundations%20Loops.png`,
    title: 'Cluster 1 — Foundations Feedback Loops',
    alt: 'Foundations cluster feedback loops',
  },
  cluster1Provincial: {
    url: `${BEIE_IMG}/14.%20Foundations%20Provincial.png`,
    title: 'Cluster 1 — Provincial Variations',
    alt: 'Provincial variations in the Foundations cluster',
  },
  cluster2Stocks: {
    url: `${BEIE_IMG}/15.%20Transformers%20Stocks.png`,
    title: 'Cluster 2 — Transformers Stocks & Flows',
    alt: 'Transformers cluster stocks and flows',
  },
  cluster2Loops: {
    url: `${BEIE_IMG}/16.%20Transformers%20Loops.png`,
    title: 'Cluster 2 — Transformers Feedback Loops',
    alt: 'Transformers cluster feedback loops',
  },
  cluster3Overview: {
    url: `${BEIE_IMG}/17.%20Enablers%20Overview.png`,
    title: 'Cluster 3 — Enablers Overview',
    alt: 'Enablers cluster overview',
  },
  cluster4Stocks: {
    url: `${BEIE_IMG}/18.%20Connectors%20Stocks.png`,
    title: 'Cluster 4 — Connectors Stocks & Flows',
    alt: 'Connectors cluster stocks and flows',
  },
  cluster4Loops: {
    url: `${BEIE_IMG}/19.%20Connectors%20Loops.png`,
    title: 'Cluster 4 — Connectors Feedback Loops',
    alt: 'Connectors cluster feedback loops',
  },
  cluster5Stocks: {
    url: `${BEIE_IMG}/20.%20Financiers%20Stocks.png`,
    title: 'Cluster 5 — Financiers Stocks & Flows',
    alt: 'Financiers cluster stocks and flows',
  },
  cluster5Loops: {
    url: `${BEIE_IMG}/21.%20Financiers%20Loops.png`,
    title: 'Cluster 5 — Financiers Feedback Loops',
    alt: 'Financiers cluster feedback loops',
  },
  roadmapOverview: {
    url: `${BEIE_IMG}/7.%20Roadmap.png`,
    title: 'Investment Roadmap Overview',
    alt: 'Bangsamoro Investment Roadmap overview',
  },
  roadmapPhases: {
    url: `${BEIE_IMG}/8.%20Phasing.png`,
    title: 'Investment Roadmap Phases',
    alt: 'Investment roadmap phases and timeline',
  },
  virtuousCycle: {
    url: `${BEIE_IMG}/9.%20Virtuous%20Cycle.png`,
    title: 'Investment Virtuous Cycle',
    alt: 'The investment virtuous cycle for Bangsamoro',
  },
  meadows: {
    url: `${BEIE_IMG}/36.%20Meadows.png`,
    title: "Meadows' Leverage Points",
    alt: "Donella Meadows' hierarchy of leverage points",
  },
  bsc: {
    url: `${BEIE_IMG}/35.%20BSC.png`,
    title: 'Balanced Scorecard Perspectives',
    alt: 'Balanced Scorecard strategic perspectives',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// BIRD VIDEOS REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

export const BIRD_VIDEOS = {
  // ── Section 0: Systems Thinking ───────────────────────────────────────────
  systemsThinking: {
    url: 'https://youtu.be/VBAHk0WYz_c?si=sbA9QhA4M791C1ET',
    title: 'Systems Thinking: Moving from Checklists to Interconnected Investment Ecosystem',
    description:
      'Discover how the Bangsamoro Investment Roadmap (BIRD 2026–2035) turns fragmented efforts into a unified engine of growth. This video unpacks: Systems Thinking — shifting from checklists to interconnected strategies; Feedback Loops — cycles that amplify progress and stabilize change; Causal Loop Diagrams — visuals that expose traps and leverage points; and Leverage Strategies — small shifts sparking big gains in governance, infrastructure, and equity.',
    embedUrl: 'https://www.youtube.com/embed/VBAHk0WYz_c',
    duration: '5 min',
  },

  // ── Section 2: SWOT & Systems Mapping ─────────────────────────────────────
  swotSystemsMapping: {
    url: 'https://youtu.be/LSmBzwyX2uw',
    title: 'SWOT Analysis & Systems Mapping Explained',
    description:
      'In this video, we break down the SWOT Analysis — examining Strengths, Weaknesses, Opportunities, and Threats — and use Systems Mapping to show how strategic investments can reshape the region. Through non-linear diagramming, we co-created narratives using tools like Causal Loop Diagrams and Systems Archetypes to reveal patterns of change and leverage points for transformation.',
    embedUrl: 'https://www.youtube.com/embed/LSmBzwyX2uw',
    duration: '8 min',
  },

  // ── Section 8: Strategic Options ──────────────────────────────────────────
  strategicOptions: {
    url: 'https://youtu.be/kb_snh8mo1k',
    title: 'Strategic Options & Path to Growth',
    description:
      "Discover the strategic choices shaping Bangsamoro's Investment Roadmap 2026–2035. This video shows how well-crafted strategies and priorities can fuel inclusive growth, sustainability, and regional competitiveness in BARMM.",
    embedUrl: 'https://www.youtube.com/embed/kb_snh8mo1k',
    duration: '6 min',
  },

  // ── Section 12: Wrapping Up ───────────────────────────────────────────────
  wrappingUp: {
    url: 'https://youtu.be/UCi2dVUmSbE',
    title: 'Bangsamoro Investment Roadmap 2026‑2035 | Southeast Asia\u2019s Hub for Ethical & Sustainable Growth',
    description:
      'Discover how the Bangsamoro Investment Roadmap (BIRD) 2026‑2035 positions BARMM as Southeast Asia\u2019s hub for resilient, ethical, and sustainable investments — highlighting its growth momentum, the risks ahead, and the frameworks driving transformation.',
    embedUrl: 'https://www.youtube.com/embed/UCi2dVUmSbE',
    duration: '4 min',
  },

  // ── BEIE Ecosystem Overview (existing) ────────────────────────────────────
  beieEcosystem: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'BEIE Ecosystem Overview',
    description: 'An overview of the Bangsamoro Economic and Investment Ecosystem.',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '3 min',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO EMBED HELPER
// ─────────────────────────────────────────────────────────────────────────────

export const getVideoEmbedUrl = (videoKey: keyof typeof BIRD_VIDEOS): string =>
  BIRD_VIDEOS[videoKey]?.embedUrl || '';

export const getVideoByKey = (videoKey: keyof typeof BIRD_VIDEOS) =>
  BIRD_VIDEOS[videoKey];

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE HELPER
// ─────────────────────────────────────────────────────────────────────────────

export const getImageByKey = (imageKey: keyof typeof BIRD_IMAGES) =>
  BIRD_IMAGES[imageKey];