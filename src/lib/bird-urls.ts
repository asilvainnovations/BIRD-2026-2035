// src/lib/bird-urls.ts
// BIRD 2026–2035 · Centralized URL Registry
// Videos, Images, and Site Pages for Context, Reference, Visualizations & Interactions

export const BIRD_VIDEOS = {
  overview: {
    title: "Bangsamoro Investment Roadmap 2026‑2035 | Southeast Asia's Hub for Ethical & Sustainable Growth",
    url: "https://youtu.be/UCi2dVUmSbE",
    duration: "~15 min",
    section: "general",
    description: "Comprehensive overview of the BIRD 2026-2035 strategic vision",
  },
  contextBEIE: {
    title: "Context Analysis and the BEIE Framework",
    url: "https://youtu.be/Li7lpyWWMcE",
    duration: "~12 min",
    section: "section1",
    description: "Deep dive into the BEIE Framework context analysis methodology",
  },
  swotSystems: {
    title: "SWOT Analysis and Systems Mapping",
    url: "https://youtu.be/LSmBzwyX2uw",
    duration: "~18 min",
    section: "section2",
    description: "How to conduct SWOT analysis with systems thinking integration",
  },
  strategicOptions: {
    title: "Strategic Options and the Investment Roadmap",
    url: "https://youtu.be/kb_snh8mo1k",
    duration: "~20 min",
    section: "section8",
    description: "Formulating strategic options and building the investment roadmap",
  },
  systemsThinking: {
    title: "On Systems Thinking",
    url: "https://youtu.be/VBAHk0WYz_c",
    duration: "~10 min",
    section: "section2",
    description: "Introduction to systems thinking for strategic planning",
  },
} as const;

export const BIRD_IMAGES = {
  // BEIE Framework & Context
  vision: {
    title: "BIRD Vision 2026-2035",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/18.%20Vision.png",
    category: "framework", section: "section1", alt: "BIRD strategic vision diagram",
  },
  beieFramework: {
    title: "Bangsamoro BEIE Framework",
    url: "https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/19.%20Bangsamoro%20BEIE%20Framework.png",
    category: "framework", section: "section1", alt: "BEIE Framework structure diagram",
  },
  operatingSystemsTrust: {
    title: "Operating Systems: Trust as the Currency",
    url: "https://rgvteytgkugdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/20.%20Operating%20Systems_%20Trust%20as%20the%20Currency.png",
    category: "framework", section: "section2", alt: "Trust-based operating systems diagram",
  },

  // Clusters 1-5
  cluster1Foundations: {
    title: "Cluster 1: Foundations",
    url: "https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/25.%20Cluster%201_%20Foundations.png",
    category: "cluster", section: "section3", alt: "Foundations cluster diagram",
  },
  cluster2Transformers: {
    title: "Cluster 2: Transformers",
    url: "https://rgvteytgkugdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/26.%20Cluster%202%20_%20Transformers.png",
    category: "cluster", section: "section4", alt: "Transformers cluster diagram",
  },
  cluster3Enablers: {
    title: "Cluster 3: Enablers",
    url: "https://rgvteytgkugdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/28.%20Cluster%203%20_%20Enablers.png",
    category: "cluster", section: "section5", alt: "Enablers cluster diagram",
  },
  cluster4Connectors: {
    title: "Cluster 4: Connectors",
    url: "https://rgvteytgkugdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/33.%20Cluster%204_%20Connectors.png",
    category: "cluster", section: "section6", alt: "Connectors cluster diagram",
  },
  cluster5Financiers: {
    title: "Cluster 5: Financiers",
    url: "https://rgvteytgkugdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/38.%20Cluster%205_%20Financiers.png",
    category: "cluster", section: "section7", alt: "Financiers cluster diagram",
  },

  // Connectivity & Trade
  connectivityUAE: {
    title: "BARMM Strategic Connectivity vis-à-vis UAE",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/UAE%20&%20GCC.png",
    category: "connectivity", section: "section6", alt: "UAE and GCC connectivity map",
  },
  connectivityBIMPEAGA: {
    title: "BARMM Strategic Connectivity vis-à-vis BIMP-EAGA",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BARMM%20Connectivity%20%20.png",
    category: "connectivity", section: "section6", alt: "BIMP-EAGA connectivity map",
  },

  // Provincial Diagnostics
  provincialEndowments: {
    title: "Provincial Endowments Leverages (LDS and Maguindanao)",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/13.%20Provincial%20Endowments-Mainlands.png",
    category: "provincial", section: "section14", alt: "Provincial endowments map",
  },
  provincialDiagnostics: {
    title: "Provincial Diagnostics Overview",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Provincial%20Diagnostics.png",
    category: "provincial", section: "section14", alt: "Provincial diagnostics dashboard",
  },
  maguindanaoNorte: {
    title: "Maguindanao del Norte",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Maguindanao-del-Norte.png",
    category: "provincial", section: "section14", alt: "Maguindanao del Norte profile",
  },
  basilanTawiTawi: {
    title: "Basilan and Tawi-Tawi",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Basilan%20and%20tawi-Tawi.png",
    category: "provincial", section: "section14", alt: "Basilan and Tawi-Tawi profile",
  },
  maguindanaoSur: {
    title: "Maguindanao del Sur",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Maguidano-del-Sur.png",
    category: "provincial", section: "section14", alt: "Maguindanao del Sur profile",
  },

  // Systems Thinking & Archetypes
  icebergParadigm: {
    title: "Iceberg Paradigm",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/5-Paradigm.png",
    category: "systems", section: "section2", alt: "Iceberg model of systems thinking",
  },
  anatomySystemTraps: {
    title: "Anatomy of System Traps",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/6-Anatomy%20of%20Systems%20Traps.png",
    category: "systems", section: "section2", alt: "System traps anatomy diagram",
  },
  investmentVirtuousCycle: {
    title: "Investment-Development Virtuous Cycle",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/14.%20Investment-Development%20Virtuous%20Cycle.png",
    category: "systems", section: "section2", alt: "Virtuous cycle diagram",
  },
  investmentGovernanceCycles: {
    title: "Investment and Governance Cycles",
    url: "https://rgvteytgkugdodedxq.databasepad.com/storage/v1/object/public/images-swot-systems-maps/public/15.%20Investment%20and%20Governance%20Cycles.png",
    category: "systems", section: "section2", alt: "Investment governance cycles",
  },

  // Systems Archetypes
  shiftingBurden: {
    title: "Shifting the Burden",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/9.png",
    category: "archetype", section: "section2", alt: "Shifting the burden archetype",
  },
  fixesFail: {
    title: "Fixes that Fail",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/8-FtF.png",
    category: "archetype", section: "section2", alt: "Fixes that fail archetype",
  },
  tragedyCommons: {
    title: "Tragedy of the Commons",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/1-Systems%20Thinking%20Banner.png",
    category: "archetype", section: "section2", alt: "Tragedy of the commons archetype",
  },
  successSuccessful: {
    title: "Success to the Successful",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/13.png",
    category: "archetype", section: "section2", alt: "Success to the successful archetype",
  },
  limitsGrowth: {
    title: "Limits to Growth",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/9LtG.png",
    category: "archetype", section: "section2", alt: "Limits to growth archetype",
  },
  growthUnderinvestment: {
    title: "Growth and Underinvestment",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/10.png",
    category: "archetype", section: "section2", alt: "Growth and underinvestment archetype",
  },
  bigManArchetype: {
    title: "The Big Man Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/11-BM.png",
    category: "archetype", section: "section2", alt: "Big Man archetype diagram",
  },
  bigManEscalation: {
    title: "BigMan and Escalation",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/23.png",
    category: "archetype", section: "section2", alt: "Big Man escalation pattern",
  },

  // Leverage Points
  meadowsLeverage: {
    title: "Meadows Hierarchy of Leverage Points",
    url: "https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-swot-systems-maps/public/24.%20Meadows%20Hierarchy%20of%20Leverage%20Points.png",
    category: "leverage", section: "section8", alt: "Meadows leverage points hierarchy",
  },
  leverageArchetypes: {
    title: "Leverage Points in Archetypes",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/22.png",
    category: "leverage", section: "section8", alt: "Leverage points within archetypes",
  },
  moralGovernanceLeverage: {
    title: "Moral Governance as Leverage",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/26.png",
    category: "leverage", section: "section2", alt: "Moral governance as a leverage point",
  },

  // Roadmap & Strategy
  roadmap: {
    title: "BIRD Investment Roadmap",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/28.png",
    category: "roadmap", section: "section8", alt: "BIRD strategic roadmap visualization",
  },
  bangsamoroBIMPEAGA: {
    title: "Bangsamoro and BIMP-EAGA",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BARMM%20Connectivity%20%20.png",
    category: "roadmap", section: "section6", alt: "Bangsamoro BIMP-EAGA integration",
  },
  bangsamoroUAE: {
    title: "Bangsamoro and UAE",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/UAE%20&%20GCC.png",
    category: "roadmap", section: "section6", alt: "Bangsamoro UAE connectivity",
  },
} as const;

export const BIRD_SITES = {
  home: { title: "BIRD Home", url: "https://bangsmoro-investment-roadmap.asilvainnovations.com", description: "Main BIRD 2026-2035 landing page" },
  roadmap: { title: "Investment Roadmap", url: "https://bird-roadmap.asilvainnovations.com", description: "Interactive roadmap visualization" },
  surveyOrientation: { title: "Validation Survey Orientation", url: "https://bird-survey-orientation.asilvainnovations.com", description: "Survey orientation and guidance" },
  resources: { title: "Resources Library", url: "https://bird-resources.asilvainnovations.com", description: "BIRD documentation and resources" },
  dashboard: { title: "Strategic Dashboard", url: "https://bird-dashboard.asilvainnovations.com", description: "Public strategic dashboard" },
  contact: { title: "Contact Us", url: "https://bird-contact.asilvainnovations.com", description: "BOI-MTIT BARMM contact page" },
  birdApp: { title: "BIRD App", url: "https://bird-app.asilvainnovations.com", description: "Main BIRD strategic planning application" },
  validationSurvey: { title: "Validation Survey", url: "https://bird-survey.asilvainnovations.com", description: "Standalone validation survey portal" },
} as const;

// ── Helper functions ─────────────────────────────────────────────────────────

export function getImagesForSection(sectionId: string) {
  return Object.values(BIRD_IMAGES).filter(img => img.section === sectionId);
}

export function getVideosForSection(sectionId: string) {
  return Object.values(BIRD_VIDEOS).filter(vid => vid.section === sectionId);
}

export function getArchetypeImages() {
  return Object.values(BIRD_IMAGES).filter(img => img.category === 'archetype');
}

export function getClusterImages() {
  return Object.values(BIRD_IMAGES).filter(img => img.category === 'cluster');
}

export function getProvincialImages() {
  return Object.values(BIRD_IMAGES).filter(img => img.category === 'provincial');
}

export function getConnectivityImages() {
  return Object.values(BIRD_IMAGES).filter(img => img.category === 'connectivity');
}

export function getFrameworkImages() {
  return Object.values(BIRD_IMAGES).filter(img => img.category === 'framework');
}
