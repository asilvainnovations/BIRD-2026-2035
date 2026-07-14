import React from "react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import {
  BookOpen, FileText, BarChart3, Globe, Video, ExternalLink,
  Lightbulb, Map, AlertTriangle, TrendingUp,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Resource {
  label: string;
  url: string;
  icon: React.ElementType;
}

export interface SectionInfo {
  title: string;
  description: string;
  cluster: string;
  imageUrl: string;
  imageAlt: string;
  imageCaption: string;
  resources: Resource[];
}

// ─── Helper ──────────────────────────────────────────────────────────────────
const RES = (
  label: string,
  url: string,
  icon: React.ElementType
): Resource => ({ label, url, icon });

// ─── Section Catalog ─────────────────────────────────────────────────────────
export const SECTION_CATALOG: Record<number, SectionInfo> = {
  // ── Section 0: Orientation ────────────────────────────────────────────────
  0: {
    title: "Welcome & Orientation",
    description:
      "An introduction to the BIRD 2026–2035 Validation Survey, its systems-thinking foundation, and how your input shapes BARMM's investment future. Watch the systems thinking overview video before you begin.",
    cluster: "Overview",
    imageUrl: BIRD_IMAGES.validationBanner.url,
    imageAlt: BIRD_IMAGES.validationBanner.alt,
    imageCaption: BIRD_IMAGES.validationBanner.title,
    resources: [
      RES("Systems Thinking Video", "https://youtu.be/VBAHk0WYz_c", Video),
      RES("BEIE Framework Overview", BIRD_IMAGES.beieFrameworkV2.url, FileText),
      RES("Bangsamoro Investment Ecosystem", BIRD_IMAGES.beieFrameworkV3.url, FileText),
      RES("Full BIRD Document (PDF)", "https://asilvainnovations.github.io/BIRD-2026-2035/", BookOpen),
    ],
  },

  // ── Section 1: BEIE Framework ─────────────────────────────────────────────
  1: {
    title: "BEIE Framework Overview",
    description:
      "The Bangsamoro Economic and Investment Ecosystem (BEIE) Framework organizes BARMM's economy into five interconnected clusters: Foundations, Transformers, Enablers, Connectors, and Financiers — all governed by Moral Governance as the operating system.",
    cluster: "All Clusters",
    imageUrl: BIRD_IMAGES.beieFrameworkV3.url,
    imageAlt: BIRD_IMAGES.beieFrameworkV3.alt,
    imageCaption: BIRD_IMAGES.beieFrameworkV3.title,
    resources: [
      RES("BEIE Framework v2", BIRD_IMAGES.beieFrameworkV2.url, FileText),
      RES("Sector-to-Ecosystem Diagram", BIRD_IMAGES.sectorToEcosystem.url, Map),
      RES("Investment Roadmap Infographic", BIRD_IMAGES.investmentRoadmapInfographic.url, BarChart3),
      RES("Five Clusters Overview", BIRD_IMAGES.fiveClusters.url, FileText),
    ],
  },

  // ── Section 2: Moral Governance ───────────────────────────────────────────
  2: {
    title: "Moral Governance: The Operating System",
    description:
      "Moral Governance is the software that runs BARMM's investment ecosystem. It encompasses transparency, accountability, stability, and justice — building the trust that is the currency of investment. This section also explores the reinforcing loops (R1 & R2) and systems archetypes that govern investment dynamics.",
    cluster: "Operating System",
    imageUrl: BIRD_IMAGES.operatingSystems.url,
    imageAlt: BIRD_IMAGES.operatingSystems.alt,
    imageCaption: BIRD_IMAGES.operatingSystems.title,
    resources: [
      RES("Moral Governance De-Risks Capital", BIRD_IMAGES.moralGovernanceDeRisks.url, Lightbulb),
      RES("Investment–Development Loop (R1)", BIRD_IMAGES.investmentGovernanceCycles.url, TrendingUp),
      RES("Governance–Confidence Loop (R2)", BIRD_IMAGES.investmentGovernanceCycles.url, TrendingUp),
      RES("Escalation Archetype", BIRD_IMAGES.escalation.url, AlertTriangle),
      RES("The Big Man Archetype", BIRD_IMAGES.bigManArchetype.url, AlertTriangle),
      RES("SWOT & Systems Mapping Video", "https://youtu.be/LSmBzwyX2uw", Video),
      RES("Drifting Goals Archetype", BIRD_IMAGES.driftingGoals.url, AlertTriangle),
    ],
  },

  // ── Section 3: Foundations (C1) ───────────────────────────────────────────
  3: {
    title: "Cluster 1 — Foundations: Stocks & Flows",
    description:
      "The Foundations cluster sustains the Bangsamoro economy — agriculture, fisheries, forestry, energy, and environment. It is the productive base upon which all other clusters depend. Understanding its stocks (accumulations) and flows (rates of change) reveals leverage points for sustainable growth.",
    cluster: "C1 — Foundations",
    imageUrl: BIRD_IMAGES.cluster1Foundations.url,
    imageAlt: BIRD_IMAGES.cluster1Foundations.alt,
    imageCaption: BIRD_IMAGES.cluster1Foundations.title,
    resources: [
      RES("Foundations Stocks & Flows", BIRD_IMAGES.cluster1Stocks.url, BarChart3),
      RES("Foundations Feedback Loops", BIRD_IMAGES.cluster1Loops.url, TrendingUp),
      RES("Tragedy of the Commons Archetype", BIRD_IMAGES.tragedyOfTheCommons.url, AlertTriangle),
      RES("Provincial Variations", BIRD_IMAGES.cluster1Provincial.url, Map),
    ],
  },

  // ── Section 4: Transformers (C2) ──────────────────────────────────────────
  4: {
    title: "Cluster 2 — Transformers: Halal & Industry",
    description:
      "The Transformers cluster converts raw materials into higher-value products — primarily through the halal industry and agro-industrial processing. This is where BARMM's cultural authenticity becomes economic advantage. Key leverage points include halal certification integrity and industrial zone development.",
    cluster: "C2 — Transformers",
    imageUrl: BIRD_IMAGES.cluster2Transformers.url,
    imageAlt: BIRD_IMAGES.cluster2Transformers.alt,
    imageCaption: BIRD_IMAGES.cluster2Transformers.title,
    resources: [
      RES("Farm-to-Market Pipeline", BIRD_IMAGES.farmToMarketPipeline.url, Map),
      RES("Industrial & Economic Zones", BIRD_IMAGES.transformersIndustrialZones.url, FileText),
      RES("Capitalizing Cultural Advantage", BIRD_IMAGES.capitalizingCulturalAdvantage.url, Lightbulb),
      RES("Transformers Stocks & Flows", BIRD_IMAGES.cluster2Stocks.url, BarChart3),
      RES("Transformers Feedback Loops", BIRD_IMAGES.cluster2Loops.url, TrendingUp),
      RES("Fixes that Fail Archetype", BIRD_IMAGES.fixesThatFail.url, AlertTriangle),
    ],
  },

  // ── Section 5: Enablers (C3) ──────────────────────────────────────────────
  5: {
    title: "Cluster 3 — Enablers: Infrastructure, Labor & Health",
    description:
      "The Enablers cluster provides the physical and human infrastructure that makes investment possible — roads, ports, power, digital connectivity, education, and healthcare. Without these, even the best-laid investment plans cannot take root. This section identifies the most critical enabling gaps.",
    cluster: "C3 — Enablers",
    imageUrl: BIRD_IMAGES.cluster3Enablers.url,
    imageAlt: BIRD_IMAGES.cluster3Enablers.alt,
    imageCaption: BIRD_IMAGES.cluster3Enablers.title,
    resources: [
      RES("Skills & Education Gap", BIRD_IMAGES.skillsEducationGap.url, FileText),
      RES("The Enabling Grid", BIRD_IMAGES.enablingGrid.url, Map),
      RES("Digital Backbone", BIRD_IMAGES.digitalBackbone.url, Globe),
      RES("Tourism Master Plan", BIRD_IMAGES.tourismMasterPlan.url, Map),
      RES("Tourism & Digital Connectivity", BIRD_IMAGES.tourismDigitalConnectivity.url, Globe),
      RES("Activating Enablers via Moral Gov", BIRD_IMAGES.activatingEnablers.url, Lightbulb),
      RES("Enablers Overview", BIRD_IMAGES.cluster3Overview.url, FileText),
      RES("Limits to Growth Archetype", BIRD_IMAGES.limitsToGrowthArchetype.url, AlertTriangle),
      RES("Growth & Underinvestment Archetype", BIRD_IMAGES.growthUnderinvestment.url, AlertTriangle),
    ],
  },

  // ── Section 6: Connectors (C4) ────────────────────────────────────────────
  6: {
    title: "Cluster 4 — Connectors: BIMP-EAGA & Trade",
    description:
      "The Connectors cluster integrates BARMM into regional and global value chains — through BIMP-EAGA trade corridors, maritime connectivity, digital linkages, and halal export channels. This cluster determines whether Bangsamoro becomes a gateway or remains isolated.",
    cluster: "C4 — Connectors",
    imageUrl: BIRD_IMAGES.cluster4Connectors.url,
    imageAlt: BIRD_IMAGES.cluster4Connectors.alt,
    imageCaption: BIRD_IMAGES.cluster4Connectors.title,
    resources: [
      RES("Connectivity Capital", BIRD_IMAGES.connectivityCapital.url, FileText),
      RES("Provincial Specialized Connectivity", BIRD_IMAGES.provincialSpecializedConnectivity.url, Map),
      RES("Revitalizing Maritime Trade", BIRD_IMAGES.revitalizingMaritimeTrade.url, Globe),
      RES("Mainland Provincial Endowments", BIRD_IMAGES.provincialEndowmentsMainlands.url, Map),
      RES("Maguindanao del Sur", BIRD_IMAGES.maguindanaoDelSur.url, Map),
      RES("Maguindanao del Norte", BIRD_IMAGES.maguindanaoDelNorte.url, Map),
      RES("Basilan & Tawi-Tawi", BIRD_IMAGES.basilanTawiTawi.url, Map),
      RES("Trapped Value", BIRD_IMAGES.trappedValue.url, Lightbulb),
      RES("Shattering Geographic Isolation", BIRD_IMAGES.shatteringGeographicIsolation.url, Globe),
      RES("Global Integration Vectors", BIRD_IMAGES.globalIntegration.url, Globe),
      RES("UAE-GCC Value Chain", BIRD_IMAGES.globalValueChainUAE.url, Globe),
      RES("BIMP-EAGA Connectivity", BIRD_IMAGES.globalValueChainBIMP.url, Globe),
      RES("Priority Tourism Clusters", BIRD_IMAGES.priorityTourismClusters.url, Map),
    ],
  },

  // ── Section 7: Financiers + Systems Archetypes ────────────────────────────
  7: {
    title: "Cluster 5 — Financiers: Capital Ecosystem",
    description:
      "The Financiers cluster mobilizes capital through Islamic banking, development finance, impact investing, and public-private partnerships. This section also presents the complete systems archetypes gallery — capacity traps, governance traps, resource/equity traps, and instability traps — with their corresponding leverage points.",
    cluster: "C5 — Financiers & Systems Archetypes",
    imageUrl: BIRD_IMAGES.cluster5Financiers.url,
    imageAlt: BIRD_IMAGES.cluster5Financiers.alt,
    imageCaption: BIRD_IMAGES.cluster5Financiers.title,
    resources: [
      RES("Islamic Finance Roadmap", BIRD_IMAGES.islamicFinanceRoadmap.url, FileText),
      RES("Financiers Stocks & Flows", BIRD_IMAGES.cluster5Stocks.url, BarChart3),
      RES("Financiers Feedback Loops", BIRD_IMAGES.cluster5Loops.url, TrendingUp),
      RES("Anatomy of CLD", BIRD_IMAGES.anatomyCLD.url, FileText),
      RES("Unchecked Growth & Ceilings", BIRD_IMAGES.uncheckedGrowth.url, AlertTriangle),
      RES("Why Synchronization Matters", BIRD_IMAGES.whySynchronizationMatters.url, Lightbulb),
      RES("Systems Archetypes Banner", BIRD_IMAGES.systemsArchetypesBanner.url, FileText),
      RES("Anatomy of Systems Traps", BIRD_IMAGES.anatomySystemsTraps.url, FileText),
      RES("Capacity Traps", BIRD_IMAGES.capacityTraps.url, AlertTriangle),
      RES("Limits to Growth", BIRD_IMAGES.limitsToGrowthArchetype.url, AlertTriangle),
      RES("Growth & Underinvestment", BIRD_IMAGES.growthUnderinvestment.url, AlertTriangle),
      RES("Shifting the Burden", BIRD_IMAGES.shiftingTheBurden.url, AlertTriangle),
      RES("Fixes that Fail", BIRD_IMAGES.fixesThatFail.url, AlertTriangle),
      RES("Drifting Goals", BIRD_IMAGES.driftingGoals.url, AlertTriangle),
      RES("Resource & Equity Traps", BIRD_IMAGES.resourceEquityTraps.url, AlertTriangle),
      RES("Success to the Successful", BIRD_IMAGES.successToTheSuccessful.url, AlertTriangle),
      RES("Tragedy of the Commons", BIRD_IMAGES.tragedyOfTheCommons.url, AlertTriangle),
      RES("Instability Traps Intro", BIRD_IMAGES.instabilityTrapsIntro.url, AlertTriangle),
      RES("Cycles of Exclusion", BIRD_IMAGES.cyclesExclusionRetaliation.url, AlertTriangle),
      RES("Escalation Archetype", BIRD_IMAGES.escalation.url, AlertTriangle),
      RES("The Big Man Archetype", BIRD_IMAGES.bigManArchetype.url, AlertTriangle),
      RES("Leverage Points Banner", BIRD_IMAGES.leveragePointsBanner.url, Lightbulb),
      RES("How to Identify Leverage Points", BIRD_IMAGES.howToIdentifyLeveragePoints.url, Lightbulb),
      RES("Activating Leverage Points", BIRD_IMAGES.activatingLeveragePoints.url, Lightbulb),
      RES("Strategic Leverage Points", BIRD_IMAGES.strategicLeveragePoints.url, Lightbulb),
      RES("Leverage in Capacity Traps", BIRD_IMAGES.leverageCapacityTraps.url, Lightbulb),
      RES("Leverage in Governance Traps", BIRD_IMAGES.leverageGovernanceTraps.url, Lightbulb),
      RES("Archetypes & Leverage Points", BIRD_IMAGES.archetypesLeveragePoints.url, Lightbulb),
    ],
  },

  // ── Section 8: Strategic Options ──────────────────────────────────────────
  8: {
    title: "Strategic Options & Leverage Points",
    description:
      "Strategic options emerge from the intersection of SWOT analysis and systems thinking. This section presents the four ranked strategic options (HEDS, GEMS, IFES, IEDS), their sequencing across three phases, and the leverage points that can shift the system toward desired outcomes.",
    cluster: "Strategy",
    imageUrl: BIRD_IMAGES.fourStrategicOptions.url,
    imageAlt: BIRD_IMAGES.fourStrategicOptions.alt,
    imageCaption: BIRD_IMAGES.fourStrategicOptions.title,
    resources: [
      RES("Four Strategic Options", BIRD_IMAGES.fourStrategicOptions.url, BarChart3),
      RES("Strategic Sequencing", BIRD_IMAGES.sequencing.url, Map),
      RES("Strategic Options Video", "https://youtu.be/kb_snh8mo1k", Video),
    ],
  },

  // ── Section 9: Budget Targets ─────────────────────────────────────────────
  9: {
    title: "Budget Targets & Capital Deployment",
    description:
      "The investment roadmap is backed by a ₱120–160 billion budget deployed across three phases (2026–2028, 2029–2032, 2033–2035). This section validates the realism of budget allocations and the sequencing of capital deployment across clusters and provinces.",
    cluster: "Investment",
    imageUrl: BIRD_IMAGES.budgetThreePhases.url,
    imageAlt: BIRD_IMAGES.budgetThreePhases.alt,
    imageCaption: BIRD_IMAGES.budgetThreePhases.title,
    resources: [
      RES("Budget for Three Phases", BIRD_IMAGES.budgetThreePhases.url, BarChart3),
      RES("Capital Deployment Per Phase", BIRD_IMAGES.capitalDeploymentPerPhase.url, BarChart3),
      RES("Executing the Roadmap", BIRD_IMAGES.executingRoadmap.url, Map),
      RES("Roadmap in Motion", BIRD_IMAGES.roadmapInMotion.url, TrendingUp),
    ],
  },

  // ── Section 10: IEDS Matrix ───────────────────────────────────────────────
  10: {
    title: "IEDS: The Execution Engine",
    description:
      "The Integrated Ecosystem Development Strategy (IEDS) is the execution engine of BIRD 2026–2035. It combines monitoring, evaluation, and learning (MEL) frameworks with a metrics architecture that tracks progress across all five BEIE clusters and four strategic options.",
    cluster: "Evaluation",
    imageUrl: BIRD_IMAGES.iedsExecutionEngine.url,
    imageAlt: BIRD_IMAGES.iedsExecutionEngine.alt,
    imageCaption: BIRD_IMAGES.iedsExecutionEngine.title,
    resources: [
      RES("IEDS Execution Engine", BIRD_IMAGES.iedsExecutionEngine.url, BarChart3),
      RES("Metrics Architecture", BIRD_IMAGES.metricsArchitecture.url, BarChart3),
    ],
  },

  // ── Section 11: Provincial Equity & Policy ────────────────────────────────
  11: {
    title: "Provincial Equity & Policy Architecture",
    description:
      "Ensuring inclusive development across all seven BARMM provinces requires affirmative mechanisms that address historical inequities, geographic disadvantages, and conflict legacies. This section also covers the regulatory architecture — JMCs, codes, and mandates — that enables the roadmap.",
    cluster: "Equity & Governance",
    imageUrl: BIRD_IMAGES.policyRecommendations.url,
    imageAlt: BIRD_IMAGES.policyRecommendations.alt,
    imageCaption: BIRD_IMAGES.policyRecommendations.title,
    resources: [
      RES("Policy Recommendations", BIRD_IMAGES.policyRecommendations.url, FileText),
      RES("Regulatory Architecture", BIRD_IMAGES.regulatoryArchitecture.url, FileText),
      RES("Draft JMC 2026-01", BIRD_IMAGES.draftJMC.url, FileText),
      RES("Core Policy Mandates", BIRD_IMAGES.corePolicyMandates.url, FileText),
      RES("Success to the Successful", BIRD_IMAGES.successToTheSuccessful.url, AlertTriangle),
    ],
  },

  // ── Section 12: Wrapping Up ───────────────────────────────────────────────
  12: {
    title: "Wrapping Up — The Decade Ahead",
    description:
      "As we conclude the validation survey, we look ahead to the decade of transformation. Your inputs will be synthesized into the final BIRD 2026–2035 document, informing policy decisions, investment priorities, and the collective journey toward a resilient, equitable, and prosperous Bangsamoro.",
    cluster: "Vision",
    imageUrl: BIRD_IMAGES.whenVisionMeetsExecution.url,
    imageAlt: BIRD_IMAGES.whenVisionMeetsExecution.alt,
    imageCaption: BIRD_IMAGES.whenVisionMeetsExecution.title,
    resources: [
      RES("When Vision Meets Execution", BIRD_IMAGES.whenVisionMeetsExecution.url, Lightbulb),
      RES("The Decade Ahead", BIRD_IMAGES.decadeAhead.url, TrendingUp),
      RES("Invest in Bangsamoro", BIRD_IMAGES.investInBangsamoro.url, ExternalLink),
      RES("Choose Bangsamoro", BIRD_IMAGES.chooseBangsamoro.url, ExternalLink),
      RES("Closing Video", "https://youtu.be/UCi2dVUmSbE", Video),
    ],
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
interface ContextPanelProps {
  sectionIndex: number;
}

const ContextPanel: React.FC<ContextPanelProps> = ({ sectionIndex }) => {
  const info = SECTION_CATALOG[sectionIndex];
  if (!info) return null;

  return (
    <div className="space-y-6">
      {/* Section Image */}
      <div className="rounded-lg overflow-hidden border border-[#C9A84C]/20 shadow-sm">
        <img
          src={info.imageUrl}
          alt={info.imageAlt}
          className="w-full h-auto object-contain bg-white"
        />
        <div className="bg-[#022c22] px-4 py-2">
          <p className="text-[#C9A84C] text-xs font-medium italic">
            {info.imageCaption}
          </p>
        </div>
      </div>

      {/* Section Info */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-5 border border-[#C9A84C]/20">
        <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-wider mb-1">
          {info.cluster}
        </p>
        <h3 className="text-base font-bold text-[#022c22] mb-3 leading-snug">
          {info.title}
        </h3>
        <p className="text-sm text-[#065f46] leading-relaxed">
          {info.description}
        </p>
      </div>

      {/* Resources */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-5 border border-[#C9A84C]/20">
        <h4 className="text-sm font-bold text-[#022c22] mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#C9A84C]" />
          Resources
        </h4>
        <ul className="space-y-2">
          {info.resources.map((r, i) => (
            <li key={i}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#1B4D3E] hover:text-[#C9A84C] transition-colors group"
              >
                <r.icon className="w-3.5 h-3.5 flex-shrink-0 text-[#C9A84C]/70 group-hover:text-[#C9A84C]" />
                <span className="group-hover:underline underline-offset-2">
                  {r.label}
                </span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContextPanel;
