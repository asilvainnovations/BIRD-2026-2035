// BIRD 2026–2035 · Interactive Guided Tour
// Points to real DOM elements in Sidebar.tsx, Topbar.tsx & HeroSection
// Features: auto-scroll spotlight, BIRD-branded tooltips, element descriptions

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  X, ChevronLeft, ChevronRight, Sparkles, LayoutDashboard, Target, Network,
  GitBranch, BarChart3, FolderKanban, FileText, Users, Layers, ClipboardCheck,
  Star, Search, Settings, Share2, Moon, Sun, FileDown, BookOpen, Check,
  Lightbulb, ArrowRight, Compass, HelpCircle, ChevronDown, ExternalLink,
  Menu, Download, Upload, ShieldAlert, User as UserIcon, LogOut, Copy,
  MapPin, TrendingUp, Zap, BookMarked, Globe, MonitorPlay,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface NavElement {
  id: string;
  label: string;
  location: "sidebar" | "topbar" | "dashboard" | "hero";
  description: string;
  shortDesc: string;
  icon: React.ElementType;
  /** BIRD gold/green shade: e.g. "gold", "green", "lightGold" */
  highlightColor: string;
  /** CSS text color class */
  textClass: string;
  /** CSS bg/border accent class */
  accentClass: string;
}

interface TutorialStep {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  viewId: string | null;
  elementId: string | null;
  tips: string[];
  gradient: string;
  accentFrom: string;
  accentTo: string;
  phase?: string;
  phaseColor?: string;
}

interface NavigationTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  onNavigate?: (view: string) => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// BIRD COLOR TOKENS for tutorial highlights
// ═══════════════════════════════════════════════════════════════════════════════

const BIRD = {
  gold:       { text: "text-[#E8C560]",   bg: "bg-[#C9A84C]/20",  border: "border-[#C9A84C]/40",  glow: "shadow-[#C9A84C]/20" },
  goldDark:   { text: "text-[#C9A84C]",   bg: "bg-[#B8942E]/20",  border: "border-[#B8942E]/40",  glow: "shadow-[#B8942E]/20" },
  green:      { text: "text-emerald-400",  bg: "bg-emerald-500/20", border: "border-emerald-500/40", glow: "shadow-emerald-500/20" },
  greenLight: { text: "text-[#6ee7b7]",   bg: "bg-[#064e3b]/40",  border: "border-emerald-400/30", glow: "shadow-emerald-400/20" },
  cream:      { text: "text-[#ecfdf5]",   bg: "bg-[#ecfdf5]/10",  border: "border-[#ecfdf5]/20",  glow: "shadow-[#ecfdf5]/10" },
  rose:       { text: "text-rose-400",     bg: "bg-rose-500/20",   border: "border-rose-500/40",    glow: "shadow-rose-500/20" },
  amber:      { text: "text-amber-400",    bg: "bg-amber-500/20",  border: "border-amber-500/40",   glow: "shadow-amber-500/20" },
  sky:        { text: "text-sky-400",      bg: "bg-sky-500/20",    border: "border-sky-500/40",     glow: "shadow-sky-500/20" },
  violet:     { text: "text-violet-400",   bg: "bg-violet-500/20", border: "border-violet-500/40",  glow: "shadow-violet-500/20" },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// NAV ELEMENT CATALOG — Every clickable item in Sidebar, Topbar & Hero
// DOM IDs must match: Sidebar id={`nav-item-${item.id}`}, Topbar id="topbar-..."
// ═══════════════════════════════════════════════════════════════════════════════

const NAV_CATALOG: Record<string, NavElement> = {

  // ── SIDEBAR HEADER ──
  "sidebar-header": {
    id: "app-sidebar",
    label: "Bangsamoro Investment Roadmap 2026\u20132035 (BIRD)",
    location: "sidebar",
    description: "The BIRD Strategic Planning Platform. Your command center for building the Emerging Bangsamoro through evidence-based investment roadmapping.",
    shortDesc: "Platform Brand Identity",
    icon: Star,
    highlightColor: "gold",
    textClass: BIRD.gold.text,
    accentClass: `${BIRD.gold.bg} ${BIRD.gold.border}`,
  },

  // ── SIDEBAR: Main Navigation ──
  "nav-item-dashboard": {
    id: "nav-item-dashboard",
    label: "MEL Dashboard",
    location: "sidebar",
    description: "Monitor, Evaluate, Learn. Your strategic command center tracking 6 Pareto KPIs that drive 80% of impact, phase progress, and the full \u20b1120\u2013160B investment roadmap.",
    shortDesc: "Monitor, Evaluate, Learn",
    icon: LayoutDashboard,
    highlightColor: "green",
    textClass: BIRD.green.text,
    accentClass: `${BIRD.green.bg} ${BIRD.green.border}`,
  },
  "nav-item-swot": {
    id: "nav-item-swot",
    label: "SWOT Analysis",
    location: "sidebar",
    description: "Structured Diagnostics across all 5 BEIE clusters. Surface strengths, weaknesses, opportunities, and threats with data-backed assessments and AI-assisted factor discovery.",
    shortDesc: "Structured Diagnostics",
    icon: Target,
    highlightColor: "gold",
    textClass: BIRD.gold.text,
    accentClass: `${BIRD.gold.bg} ${BIRD.gold.border}`,
  },
  "nav-item-systems": {
    id: "nav-item-systems",
    label: "Systems Thinking",
    location: "sidebar",
    description: "Visualize Relationships through causal loop diagrams. Identify 10 systems archetypes and find high-leverage intervention points across BARMM\u2019s economic ecosystem.",
    shortDesc: "Visualize Relationships",
    icon: Network,
    highlightColor: "greenLight",
    textClass: BIRD.greenLight.text,
    accentClass: `${BIRD.greenLight.bg} ${BIRD.greenLight.border}`,
  },
  "nav-item-strategy": {
    id: "nav-item-strategy",
    label: "Strategy Matrix",
    location: "sidebar",
    description: "SO/ST/WO/WT Options. Generate strategic options from your diagnostic data using the TOWS matrix. Turn insights into board-ready investment strategies with 7-criteria scoring.",
    shortDesc: "SO/ST/WO/WT Options",
    icon: Sparkles,
    highlightColor: "amber",
    textClass: BIRD.amber.text,
    accentClass: `${BIRD.amber.bg} ${BIRD.amber.border}`,
  },
  "nav-item-scorecard": {
    id: "nav-item-scorecard",
    label: "Balanced Scorecard",
    location: "sidebar",
    description: "Objectives & KPIs. Set strategic objectives and key performance indicators across four causal perspectives \u2014 Learning & Growth, Internal Process, Stakeholder, and Financial.",
    shortDesc: "Objectives & KPIs",
    icon: BarChart3,
    highlightColor: "rose",
    textClass: BIRD.rose.text,
    accentClass: `${BIRD.rose.bg} ${BIRD.rose.border}`,
  },
  "nav-item-paps": {
    id: "nav-item-paps",
    label: "PAPs Management",
    location: "sidebar",
    description: "Programs & Projects. Track Priority Action Programs with budget allocation, timelines, ownership assignment, and real-time MEL status indicators linked to strategic objectives.",
    shortDesc: "Programs & Projects",
    icon: FolderKanban,
    highlightColor: "sky",
    textClass: BIRD.sky.text,
    accentClass: `${BIRD.sky.bg} ${BIRD.sky.border}`,
  },
  "nav-item-templates": {
    id: "nav-item-templates",
    label: "Templates Library",
    location: "sidebar",
    description: "Reusable Plan Templates. Jump-start your planning with pre-built strategic frameworks. Import, customize, and deploy proven BARMM planning templates for rapid deployment.",
    shortDesc: "Reusable Plan Templates",
    icon: Layers,
    highlightColor: "violet",
    textClass: BIRD.violet.text,
    accentClass: `${BIRD.violet.bg} ${BIRD.violet.border}`,
  },
  "nav-item-team": {
    id: "nav-item-team",
    label: "Team Collaboration",
    location: "sidebar",
    description: "Share & Collaborate. Invite team members with role-based access \u2014 Viewer, Editor, or Admin. Real-time cursors, live collaboration, and version history included.",
    shortDesc: "Share & Collaborate",
    icon: Users,
    highlightColor: "green",
    textClass: BIRD.green.text,
    accentClass: `${BIRD.green.bg} ${BIRD.green.border}`,
  },
  "nav-item-export": {
    id: "nav-item-export",
    label: "Plan Generator",
    location: "sidebar",
    description: "Export Reports. Generate board-ready reports in PDF, DOCX, or Excel. Toggle sections, add cover pages, and print with professional BIRD-branded formatting.",
    shortDesc: "Export Reports",
    icon: FileText,
    highlightColor: "cream",
    textClass: BIRD.cream.text,
    accentClass: `${BIRD.cream.bg} ${BIRD.cream.border}`,
  },
  "nav-item-settings": {
    id: "nav-item-settings",
    label: "Settings",
    location: "sidebar",
    description: "Preferences & Account. Configure your profile, notification preferences, data privacy settings, display options, and platform personalization.",
    shortDesc: "Preferences & Account",
    icon: Settings,
    highlightColor: "goldDark",
    textClass: BIRD.goldDark.text,
    accentClass: `${BIRD.goldDark.bg} ${BIRD.goldDark.border}`,
  },

  // ── SIDEBAR: Special Items ──
  "nav-item-validation": {
    id: "nav-item-validation",
    label: "Validation Survey",
    location: "sidebar",
    description: "BIRD 2026-2035 Feedback. NEW \u2014 Shape the roadmap as a stakeholder. Share your insights as government, private sector, academia, or community leader. Takes 5\u201310 minutes.",
    shortDesc: "Help shape BARMM 2026\u20132035",
    icon: ClipboardCheck,
    highlightColor: "gold",
    textClass: BIRD.gold.text,
    accentClass: `${BIRD.gold.bg} ${BIRD.gold.border}`,
  },
  "sidebar-btn-tutorial": {
    id: "sidebar-btn-tutorial",
    label: "Navigation Tutorial",
    location: "sidebar",
    description: "CLOUD CONNECTED \u2014 Restart this interactive guided tour anytime to explore platform features, navigation items, and strategic planning workflows.",
    shortDesc: "Restart This Tour",
    icon: HelpCircle,
    highlightColor: "greenLight",
    textClass: BIRD.greenLight.text,
    accentClass: `${BIRD.greenLight.bg} ${BIRD.greenLight.border}`,
  },

  // ── TOPBAR ITEMS ──
  "topbar-plan-selector": {
    id: "topbar-plan-selector",
    label: "Plan Selector",
    location: "topbar",
    description: "Switch between your strategic plans or create a new one. All plans auto-save locally and sync to the cloud when online. Current focus displayed here.",
    shortDesc: "BIRD 2026\u20132035 | Current Focus",
    icon: FileDown,
    highlightColor: "gold",
    textClass: BIRD.gold.text,
    accentClass: `${BIRD.gold.bg} ${BIRD.gold.border}`,
  },
  "topbar-btn-validation": {
    id: "topbar-btn-validation",
    label: "Validation Survey",
    location: "topbar",
    description: "Quick-access to the stakeholder validation survey. Share feedback that directly shapes the BIRD roadmap. Available from both sidebar and topbar.",
    shortDesc: "NEW | Quick Survey Access",
    icon: ClipboardCheck,
    highlightColor: "gold",
    textClass: BIRD.gold.text,
    accentClass: `${BIRD.gold.bg} ${BIRD.gold.border}`,
  },
  "topbar-search-wrapper": {
    id: "topbar-search-wrapper",
    label: "Global Search",
    location: "topbar",
    description: "Search plans, KPIs, modules\u2026 Find SWOT items, strategic options, PAPs, and templates across every module. Autocomplete suggests results as you type.",
    shortDesc: "Search All Modules",
    icon: Search,
    highlightColor: "greenLight",
    textClass: BIRD.greenLight.text,
    accentClass: `${BIRD.greenLight.bg} ${BIRD.greenLight.border}`,
  },
  "topbar-btn-theme": {
    id: "topbar-btn-theme",
    label: "Theme Toggle",
    location: "topbar",
    description: "Switch between light and dark display modes. Your preference saves automatically across sessions for comfortable viewing.",
    shortDesc: "Light / Dark Mode",
    icon: Moon,
    highlightColor: "cream",
    textClass: BIRD.cream.text,
    accentClass: `${BIRD.cream.bg} ${BIRD.cream.border}`,
  },
  "topbar-btn-account": {
    id: "topbar-btn-account",
    label: "Account Menu",
    location: "topbar",
    description: "Sign In / Profile. Manage your account, view profile settings, access admin dashboard (if authorized), or sign out securely.",
    shortDesc: "Sign In",
    icon: UserIcon,
    highlightColor: "gold",
    textClass: BIRD.gold.text,
    accentClass: `${BIRD.gold.bg} ${BIRD.gold.border}`,
  },
  "topbar-btn-share": {
    id: "topbar-btn-share",
    label: "Share Plan",
    location: "topbar",
    description: "Generate a shareable link for collaborators. Copy the link, set permissions, or revoke access at any time. Secure sharing built-in.",
    shortDesc: "Shareable Links",
    icon: Share2,
    highlightColor: "green",
    textClass: BIRD.green.text,
    accentClass: `${BIRD.green.bg} ${BIRD.green.border}`,
  },

  // ── HERO SECTION CTAs ──
  "hero-cta-mel": {
    id: "hero-cta-mel",
    label: "Open MEL Dashboard",
    location: "hero",
    description: "Strategic MEL Dashboard. Monitor 6 Pareto KPIs driving 80% of strategic impact. Real-time metrics, trend analysis, and automated status reporting.",
    shortDesc: "Explore KPIs",
    icon: LayoutDashboard,
    highlightColor: "green",
    textClass: BIRD.green.text,
    accentClass: `${BIRD.green.bg} ${BIRD.green.border}`,
  },
  "hero-cta-validation": {
    id: "hero-cta-validation",
    label: "Participate in Validation Survey",
    location: "hero",
    description: "Validation Survey. NEW \u2014 Help shape BARMM 2026\u20132035. Your stakeholder feedback directly influences the investment roadmap priorities and resource allocation.",
    shortDesc: "Share Your Input",
    icon: ClipboardCheck,
    highlightColor: "gold",
    textClass: BIRD.gold.text,
    accentClass: `${BIRD.gold.bg} ${BIRD.gold.border}`,
  },
  "hero-cta-systems": {
    id: "hero-cta-systems",
    label: "Systems Thinking",
    location: "hero",
    description: "Visualize causal loops and feedback dynamics. Map the interconnections between BARMM\u2019s economic clusters, identify leverage points, and design systemic interventions.",
    shortDesc: "Explore Dynamics",
    icon: Network,
    highlightColor: "greenLight",
    textClass: BIRD.greenLight.text,
    accentClass: `${BIRD.greenLight.bg} ${BIRD.greenLight.border}`,
  },
  "hero-cta-roadmap": {
    id: "hero-cta-roadmap",
    label: "Implementation Roadmap",
    location: "hero",
    description: "3-phase \u20b1120-160B investment pathway to 2035. Track Foundation (2026\u20132028), Acceleration (2029\u20132031), and Transformation (2032\u20132035) milestones.",
    shortDesc: "View Phases",
    icon: Compass,
    highlightColor: "amber",
    textClass: BIRD.amber.text,
    accentClass: `${BIRD.amber.bg} ${BIRD.amber.border}`,
  },

  // ── DASHBOARD PANELS ──
  "panel-a-title": {
    id: "panel-a-title",
    label: "Panel A: Pareto KPIs",
    location: "dashboard",
    description: "Six vital-few KPIs that drive 80% of strategic impact. Each card shows current value, target, animated progress ring, and delta trend.",
    shortDesc: "6 Critical KPIs",
    icon: Target,
    highlightColor: "green",
    textClass: BIRD.green.text,
    accentClass: `${BIRD.green.bg} ${BIRD.green.border}`,
  },
  "panel-b-title": {
    id: "panel-b-title",
    label: "Panel B: Leverage Points",
    location: "dashboard",
    description: "Balanced Scorecard leverage points (LP1\u2013LP5) across Financial, Stakeholder, Internal Process, and Learning & Growth perspectives.",
    shortDesc: "BSC Leverage Points",
    icon: BarChart3,
    highlightColor: "rose",
    textClass: BIRD.rose.text,
    accentClass: `${BIRD.rose.bg} ${BIRD.rose.border}`,
  },
  "panel-c-title": {
    id: "panel-c-title",
    label: "Panel C: Action Board",
    location: "dashboard",
    description: "Priority Action Plan 2026 with full budget tracking, ownership assignment, due dates, and MEL status indicators linked to strategic pillars.",
    shortDesc: "Priority Actions 2026",
    icon: FolderKanban,
    highlightColor: "sky",
    textClass: BIRD.sky.text,
    accentClass: `${BIRD.sky.bg} ${BIRD.sky.border}`,
  },
  "panel-e-title": {
    id: "panel-e-title",
    label: "Panel E: Phase Tracker",
    location: "dashboard",
    description: "Three-phase \u20b1120\u2013160B implementation roadmap through 2035. Track milestones, budgets, completion status, and inter-phase dependencies.",
    shortDesc: "3-Phase Roadmap",
    icon: Compass,
    highlightColor: "amber",
    textClass: BIRD.amber.text,
    accentClass: `${BIRD.amber.bg} ${BIRD.amber.border}`,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// TUTORIAL STEPS — Each step maps to a NAV_CATALOG entry via elementId
// Guides the user through every navigation item with purpose-driven tooltips
// ═══════════════════════════════════════════════════════════════════════════════

const TUTORIAL_STEPS: TutorialStep[] = [
  // ── 0. Welcome ──
  {
    title: "Welcome to BIRD 2026\u20132035",
    subtitle: "Your Strategic Planning Command Center",
    description:
      "BIRD is the Bangsamoro Investment Roadmap Development platform for BOI-MTIT BARMM. This 2-minute tour shows you where every tool lives and what it does \u2014 so you can move from insight to action faster.",
    icon: Sparkles,
    viewId: null,
    elementId: null,
    tips: [
      "All data auto-saves to your device and syncs when you are online",
      "Use the sidebar (left) for main modules, the topbar for quick actions",
      "Every panel updates in real time as you edit strategic content",
      "Click \u2018Navigation Tutorial\u2019 in the sidebar anytime to restart this tour",
    ],
    gradient: "from-[#C9A84C] via-[#B8942E] to-[#064e3b]",
    accentFrom: "#C9A84C",
    accentTo: "#064e3b",
  },

  // ── 1. Sidebar Brand ──
  {
    title: "Bangsamoro Investment Roadmap",
    subtitle: "2026\u20132035 Strategic Platform",
    description: NAV_CATALOG["sidebar-header"].description,
    icon: Star,
    viewId: null,
    elementId: "sidebar-header",
    tips: [
      "The BIRD platform integrates 6 strategic planning modules into one workflow",
      "All modules feed into each other: SWOT \u2192 Systems \u2192 Strategy \u2192 BSC \u2192 PAPs \u2192 MEL",
      "Built for BOI-MTIT BARMM with support from development partners",
    ],
    gradient: "from-[#C9A84C] via-[#B8942E] to-[#7a5c1e]",
    accentFrom: "#C9A84C",
    accentTo: "#E8C560",
  },

  // ── 2. Validation Survey (Special ── highlighted) ──
  {
    title: "Validation Survey",
    subtitle: "NEW \u2014 Help Shape BARMM 2026\u20132035",
    description: NAV_CATALOG["nav-item-validation"].description,
    icon: ClipboardCheck,
    viewId: "validation",
    elementId: "nav-item-validation",
    tips: [
      "Takes about 5\u201310 minutes to complete all sections",
      "Your responses are confidential under the Data Privacy Act of 2012",
      "Available from both sidebar and topbar for quick access anytime",
      "Feedback directly influences roadmap priorities and resource allocation",
    ],
    gradient: "from-[#C9A84C] via-[#B8943F] to-[#7a5c1e]",
    accentFrom: "#C9A84C",
    accentTo: "#E8C560",
    phase: "Feedback",
    phaseColor: "bg-[#C9A84C]/20 text-[#E8C560] border-[#C9A84C]/30",
  },

  // ── 3. MEL Dashboard ──
  {
    title: "MEL Dashboard",
    subtitle: "Monitor, Evaluate, Learn",
    description: NAV_CATALOG["nav-item-dashboard"].description,
    icon: LayoutDashboard,
    viewId: "dashboard",
    elementId: "nav-item-dashboard",
    tips: [
      "Panel A: 6 Pareto KPIs with animated progress rings and trend deltas",
      "Panel B: BSC leverage points (LP1\u2013LP5) across 4 causal perspectives",
      "Panel C: Priority Action Board with budget tracking and ownership",
      "Panel E: 3-phase \u20b1120\u2013160B roadmap through 2035 with milestones",
    ],
    gradient: "from-[#064e3b] via-emerald-700 to-[#022c22]",
    accentFrom: "#6ee7b7",
    accentTo: "#064e3b",
    phase: "Foundation",
    phaseColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },

  // ── 4. SWOT Analysis ──
  {
    title: "SWOT Analysis",
    subtitle: "Structured 5-Cluster Diagnostics",
    description: NAV_CATALOG["nav-item-swot"].description,
    icon: Target,
    viewId: "swot",
    elementId: "nav-item-swot",
    tips: [
      "Assess Foundations, Transformers, Enablers, Connectors, and Financiers",
      "AI-assisted factor discovery suggests relevant items from BARMM sector data",
      "Real-time RI (Readiness Index) and Risk scoring with formula-driven outputs",
      "Results feed directly into the Strategy Matrix for TOWS generation",
    ],
    gradient: "from-[#C9A84C] via-[#B8942E] to-[#7a5c1e]",
    accentFrom: "#C9A84C",
    accentTo: "#E8C560",
    phase: "Phase 1",
    phaseColor: "bg-[#C9A84C]/20 text-[#E8C560] border-[#C9A84C]/30",
  },

  // ── 5. Systems Thinking ──
  {
    title: "Systems Thinking",
    subtitle: "Visualize Causal Relationships",
    description: NAV_CATALOG["nav-item-systems"].description,
    icon: Network,
    viewId: "systems",
    elementId: "nav-item-systems",
    tips: [
      "Matrix View: Score interdependencies between all 5 BEIE clusters",
      "CLD View: Draw and analyze reinforcing/balancing feedback loops visually",
      "10 archetypes: Fixes that Fail, Tragedy of the Commons, Limits to Growth\u2026",
      "Identifies Critical Leverage Points (CLPs) for maximum intervention impact",
    ],
    gradient: "from-[#064e3b] via-emerald-800 to-[#022c22]",
    accentFrom: "#6ee7b7",
    accentTo: "#064e3b",
    phase: "Phase 1",
    phaseColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },

  // ── 6. Strategy Matrix ──
  {
    title: "Strategy Matrix",
    subtitle: "SO/ST/WO/WT Strategic Options",
    description: NAV_CATALOG["nav-item-strategy"].description,
    icon: Sparkles,
    viewId: "strategy",
    elementId: "nav-item-strategy",
    tips: [
      "SO strategies: Offensive plays using Strengths to seize Opportunities",
      "ST strategies: Defensive moves using Strengths against Threats",
      "WO & WT: Turnaround strategies addressing Weaknesses",
      "7-criteria scoring matrix ranks options by impact, feasibility, and alignment",
    ],
    gradient: "from-amber-600 via-amber-700 to-[#B8942E]",
    accentFrom: "#f59e0b",
    accentTo: "#d97706",
    phase: "Phase 2",
    phaseColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },

  // ── 7. Balanced Scorecard ──
  {
    title: "Balanced Scorecard",
    subtitle: "Objectives & KPIs Across 4 Perspectives",
    description: NAV_CATALOG["nav-item-scorecard"].description,
    icon: BarChart3,
    viewId: "scorecard",
    elementId: "nav-item-scorecard",
    tips: [
      "Bottom-up causal flow: Learning \u2192 Process \u2192 Stakeholder \u2192 Financial",
      "AI recommends KPIs based on your strategic objectives and BEIE alignment",
      "Set Baseline, Target, and Current values per KPI with auto status calculation",
      "Strategy Map shows how objectives cascade across all four perspectives",
    ],
    gradient: "from-rose-600 via-rose-700 to-pink-800",
    accentFrom: "#f43f5e",
    accentTo: "#be185d",
    phase: "Phase 3",
    phaseColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  },

  // ── 8. PAPs Management ──
  {
    title: "PAPs Management",
    subtitle: "Programs, Projects & Actions",
    description: NAV_CATALOG["nav-item-paps"].description,
    icon: FolderKanban,
    viewId: "paps",
    elementId: "nav-item-paps",
    tips: [
      "Assign ownership, budgets, timelines, and due dates per action item",
      "Filter by priority: Critical, High, Medium, or Low impact",
      "Link PAPs directly to strategic objectives and BSC initiatives",
      "Track MEL indicators for each program in real time",
    ],
    gradient: "from-sky-600 via-sky-700 to-blue-800",
    accentFrom: "#38bdf8",
    accentTo: "#0369a1",
    phase: "Phase 4",
    phaseColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  },

  // ── 9. Templates Library ──
  {
    title: "Templates Library",
    subtitle: "Reusable Plan Templates",
    description: NAV_CATALOG["nav-item-templates"].description,
    icon: Layers,
    viewId: "templates",
    elementId: "nav-item-templates",
    tips: [
      "Pre-built frameworks for SWOT, BSC, Strategy Maps, and MEL plans",
      "BARMM-specific templates aligned with the BEIE framework",
      "Import, customize, and deploy templates across team workspaces",
      "Save your own plans as reusable templates for future roadmaps",
    ],
    gradient: "from-violet-600 via-violet-700 to-purple-800",
    accentFrom: "#8b5cf6",
    accentTo: "#6d28d9",
    phase: "Toolkit",
    phaseColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  },

  // ── 10. Team Collaboration ──
  {
    title: "Team Collaboration",
    subtitle: "Share & Collaborate in Real Time",
    description: NAV_CATALOG["nav-item-team"].description,
    icon: Users,
    viewId: "team",
    elementId: "nav-item-team",
    tips: [
      "Invite team members via email with Viewer, Editor, or Admin roles",
      "Real-time collaborative cursors show who is editing what",
      "Activity feed tracks all changes with timestamps and author attribution",
      "Share plans via secure links with configurable access permissions",
    ],
    gradient: "from-[#064e3b] via-emerald-700 to-[#022c22]",
    accentFrom: "#6ee7b7",
    accentTo: "#064e3b",
    phase: "Collaborate",
    phaseColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },

  // ── 11. Plan Generator ──
  {
    title: "Plan Generator",
    subtitle: "Export Board-Ready Reports",
    description: NAV_CATALOG["nav-item-export"].description,
    icon: FileText,
    viewId: "export",
    elementId: "nav-item-export",
    tips: [
      "Toggle which sections appear: Cover, SWOT, Systems, PAPs, Scorecard",
      "Export formats: PDF (print-ready), DOCX (editable), Excel (data)",
      "Professional BIRD-branded formatting with Deep Green & Metallic Gold",
      "Preview inline before downloading with full layout control",
    ],
    gradient: "from-[#64748b] via-slate-600 to-slate-700",
    accentFrom: "#94a3b8",
    accentTo: "#475569",
    phase: "Deliver",
    phaseColor: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  },

  // ── 12. Settings ──
  {
    title: "Settings",
    subtitle: "Preferences & Account",
    description: NAV_CATALOG["nav-item-settings"].description,
    icon: Settings,
    viewId: "settings",
    elementId: "nav-item-settings",
    tips: [
      "Update your profile, password, and account preferences",
      "Configure notification settings for collaboration events",
      "Set data privacy options and local storage preferences",
      "Manage display options: sidebar collapse, theme, density",
    ],
    gradient: "from-[#B8942E] via-[#C9A84C] to-[#E8C560]",
    accentFrom: "#C9A84C",
    accentTo: "#E8C560",
    phase: "Config",
    phaseColor: "bg-[#C9A84C]/20 text-[#E8C560] border-[#C9A84C]/30",
  },

  // ── 13. Topbar Quick Actions ──
  {
    title: "Topbar Quick Actions",
    subtitle: "Search, Share, Switch Plans, Sign In",
    description:
      "The top bar puts your most-used actions one click away: search across all modules, share plans with collaborators, switch between strategic plans, toggle light/dark mode, or access your account.",
    icon: Search,
    viewId: null,
    elementId: "topbar-search-wrapper",
    tips: [
      "Global search finds KPIs, SWOT items, strategies, and PAPs instantly",
      "Plan selector shows your current focus and lets you switch quickly",
      "Account menu: profile, settings, admin dashboard (if authorized), sign out",
      "Validation Survey button for quick access to stakeholder feedback",
    ],
    gradient: "from-[#022c22] via-[#064e3b] to-[#011a12]",
    accentFrom: "#6ee7b7",
    accentTo: "#064e3b",
  },

  // ── 14. Hero CTAs ──
  {
    title: "Hero Quick Access",
    subtitle: "Jump to Key Workflows from the Homepage",
    description:
      "The hero section offers one-click entry points to the most important workflows: open the MEL Dashboard, participate in the Validation Survey, explore Systems Thinking, or view the Implementation Roadmap.",
    icon: Zap,
    viewId: null,
    elementId: "hero-cta-mel",
    tips: [
      "\u201cOpen MEL Dashboard\u2019 \u2014 Jump straight to your KPI command center",
      "\u201cParticipate in Validation Survey\u2019 \u2014 Share feedback in 5-10 minutes",
      "\u201cSystems Thinking\u2019 \u2014 Explore causal loops and feedback dynamics",
      "\u201cImplementation Roadmap\u2019 \u2014 View the 3-phase \u20b1120-160B pathway",
    ],
    gradient: "from-[#C9A84C] via-[#B8942E] to-[#064e3b]",
    accentFrom: "#C9A84C",
    accentTo: "#064e3b",
  },

  // ── 15. You Are Ready ──
  {
    title: "You Are Ready",
    subtitle: "Start Building the Emerging Bangsamoro",
    description:
      "You now know where every tool lives and what it does. Start with the MEL Dashboard to see the big picture, then dive into SWOT or Systems Thinking to begin your strategic diagnostic.",
    icon: Sparkles,
    viewId: null,
    elementId: null,
    tips: [
      'Click "Navigation Tutorial" in the sidebar anytime to revisit this walkthrough',
      "All your work auto-saves locally and syncs to the cloud when online",
      "Your input shapes the Bangsamoro Investment Roadmap 2026\u20132035",
      "Click the BIRD AI Strategist widget for AI-powered strategic guidance",
    ],
    gradient: "from-[#C9A84C] via-[#B8942E] to-[#064e3b]",
    accentFrom: "#C9A84C",
    accentTo: "#064e3b",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ELEMENT TOOLTIP — Floats beside the spotlighted DOM element
// Shows label, description, and purpose-driven context
// ═══════════════════════════════════════════════════════════════════════════════

const ElementTooltip: React.FC<{
  elementId: string | null;
  isVisible: boolean;
}> = ({ elementId, isVisible }) => {
  const [pos, setPos] = useState<{ top: number; left: number; placement: "right" | "left" | "bottom" } | null>(null);
  const el = elementId ? NAV_CATALOG[elementId] : null;

  useEffect(() => {
    if (!isVisible || !elementId || !el) { setPos(null); return; }

    const measure = () => {
      const domEl = document.getElementById(elementId);
      if (!domEl) { setPos(null); return; }
      const r = domEl.getBoundingClientRect();
      const tooltipWidth = 320;
      const gap = 12;

      // Decide placement: prefer right, then left, then bottom
      let left = r.right + gap;
      let placement: "right" | "left" | "bottom" = "right";
      if (left + tooltipWidth > window.innerWidth - 20) {
        left = r.left - tooltipWidth - gap;
        placement = "left";
        if (left < 20) {
          left = r.left;
          placement = "bottom";
        }
      }

      const top = placement === "bottom" ? r.bottom + gap : r.top;
      setPos({ top, left, placement });
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [elementId, isVisible, el]);

  if (!isVisible || !pos || !el) return null;

  return (
    <div
      className="fixed z-[97] pointer-events-none"
      style={{ top: pos.top, left: pos.left, width: 320 }}
    >
      <div
        className="rounded-xl border bg-[#022c22]/95 backdrop-blur-xl shadow-2xl p-4 animate-tooltipIn"
        style={{
          borderColor: "rgba(201,168,76,0.4)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.15) inset",
        }}
      >
        {/* Arrow */}
        <div
          className={cn(
            "absolute w-3 h-3 bg-[#022c22] border-r border-b rotate-45",
            pos.placement === "right" && "-left-1.5 top-4",
            pos.placement === "left" && "-right-1.5 top-4 border-r-0 border-l border-b-0 border-t",
            pos.placement === "bottom" && "-top-1.5 left-6 border-r-0 border-l border-b-0 border-t"
          )}
          style={{ borderColor: "rgba(201,168,76,0.4)" }}
        />

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", el.accentClass)}>
            <el.icon className={cn("w-4 h-4", el.textClass)} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#E8C560] truncate">{el.label}</p>
            <p className="text-[9px] text-[#64748b] uppercase tracking-wider">{el.shortDesc}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[#ecfdf5]/80 leading-relaxed mb-2">{el.description}</p>

        {/* Location badge */}
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border",
            el.location === "sidebar"
              ? "bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]/20"
              : el.location === "topbar"
                ? "bg-[#064e3b]/40 text-[#6ee7b7] border-emerald-500/30"
                : el.location === "hero"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-rose-500/10 text-rose-400 border-rose-500/20"
          )}>
            {el.location}
          </span>
          {el.location === "hero" && (
            <span className="text-[9px] text-[#64748b]">Call to Action</span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-tooltipIn { animation: tooltipIn 0.25s ease-out; }
      `}</style>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MINI NAV PREVIEW — Visual map of sidebar + topbar highlighting current item
// ═══════════════════════════════════════════════════════════════════════════════

const MiniNavPreview: React.FC<{
  activeElementId: string | null;
  onElementClick?: (id: string) => void;
}> = ({ activeElementId, onElementClick }) => {
  const sidebarItems = Object.values(NAV_CATALOG).filter(e => e.location === "sidebar");
  const topbarItems = Object.values(NAV_CATALOG).filter(e => e.location === "topbar");
  const heroItems = Object.values(NAV_CATALOG).filter(e => e.location === "hero");

  return (
    <div className="hidden lg:flex flex-col gap-3 w-60 flex-shrink-0">
      {/* Mini Topbar */}
      <div className="rounded-lg border border-[#C9A84C]/10 bg-[#011a12]/90 p-2.5 space-y-1.5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#64748b] mb-1.5">Topbar</p>
        <div className="flex flex-wrap gap-1">
          {topbarItems.slice(0, 6).map(el => {
            const isActive = el.id === activeElementId;
            const Icon = el.icon;
            return (
              <button
                key={el.id}
                onClick={() => onElementClick?.(el.id)}
                className={cn(
                  "w-7 h-7 rounded-md flex items-center justify-center transition-all",
                  isActive
                    ? `${el.accentClass} shadow-lg`
                    : "bg-white/5 border border-white/5 hover:bg-white/10"
                )}
                title={el.label}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? el.textClass : "text-[#64748b]")} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Mini Sidebar */}
      <div className="rounded-lg border border-[#C9A84C]/10 bg-[#011a12]/90 p-2.5 flex-1 space-y-0.5 overflow-y-auto">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#64748b] mb-1.5">Sidebar</p>
        {sidebarItems.filter(s => s.id !== "sidebar-header").map(el => {
          const isActive = el.id === activeElementId;
          const Icon = el.icon;
          return (
            <button
              key={el.id}
              onClick={() => onElementClick?.(el.id)}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-all text-left",
                isActive
                  ? `${el.accentClass}`
                  : "hover:bg-white/5 border border-transparent"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", isActive ? el.textClass : "text-[#64748b]")} />
              <span className={cn("text-[10px] font-medium truncate", isActive ? "text-[#E8C560]" : "text-[#64748b]")}>
                {el.label}
              </span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />}
            </button>
          );
        })}
      </div>

      {/* Mini Hero CTAs */}
      <div className="rounded-lg border border-[#C9A84C]/10 bg-[#011a12]/90 p-2.5 space-y-1.5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#64748b] mb-1.5">Hero CTAs</p>
        {heroItems.map(el => {
          const isActive = el.id === activeElementId;
          const Icon = el.icon;
          return (
            <button
              key={el.id}
              onClick={() => onElementClick?.(el.id)}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-all text-left",
                isActive
                  ? `${el.accentClass}`
                  : "hover:bg-white/5 border border-transparent"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", isActive ? el.textClass : "text-[#64748b]")} />
              <span className={cn("text-[10px] font-medium truncate", isActive ? "text-[#E8C560]" : "text-[#64748b]")}>
                {el.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Location indicator */}
      {activeElementId && NAV_CATALOG[activeElementId] && (
        <div className="text-center">
          <span className="text-[9px] text-[#64748b] uppercase tracking-wider">
            {NAV_CATALOG[activeElementId].location} &bull; {NAV_CATALOG[activeElementId].shortDesc}
          </span>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPOTLIGHT OVERLAY — Darkens screen with transparent cutout around target
// Auto-scrolls element into view before measuring
// ═══════════════════════════════════════════════════════════════════════════════

const SpotlightOverlay: React.FC<{
  elementId: string | null;
  isVisible: boolean;
}> = ({ elementId, isVisible }) => {
  const [box, setBox] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  useEffect(() => {
    if (!isVisible || !elementId) { setBox(null); return; }

    const measure = () => {
      const el = document.getElementById(elementId);
      if (el) {
        // Auto-scroll element into view smoothly
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        const r = el.getBoundingClientRect();
        setBox({ top: r.top, left: r.left, width: r.width, height: r.height });
      } else {
        setBox(null);
      }
    };

    // Delay to allow scroll + layout to settle
    const timer = setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [elementId, isVisible]);

  if (!isVisible || !box) return null;

  const pad = 10;
  const t = box.top - pad;
  const l = box.left - pad;
  const w = box.width + pad * 2;
  const h = box.height + pad * 2;

  return (
    <div className="fixed inset-0 z-[95] pointer-events-none" style={{ background: "rgba(0,0,0,0.55)" }}>
      <div
        className="absolute rounded-xl border-2 border-[#C9A84C]/50"
        style={{
          top: t,
          left: l,
          width: w,
          height: h,
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.55), 0 0 24px rgba(201,168,76,0.25)",
          background: "transparent",
        }}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const NavigationTutorial: React.FC<NavigationTutorialProps> = ({
  isOpen,
  onClose,
  onComplete,
  onNavigate,
}) => {
  const [step, setStep] = useState(0);
  const [animDir, setAnimDir] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const current = TUTORIAL_STEPS[step];
  const totalSteps = TUTORIAL_STEPS.length;
  const progress = (step / (totalSteps - 1)) * 100;
  const catalogEntry = current.elementId ? NAV_CATALOG[current.elementId] : null;

  // Reset to first step when opened
  useEffect(() => { if (isOpen) setStep(0); }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
      if (e.key === "Escape") handleSkip();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, step]);

  const transition = useCallback((newStep: number, dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimDir(dir);
    setTimeout(() => { setStep(newStep); setIsAnimating(false); }, 180);
  }, [isAnimating]);

  const goNext = useCallback(() => {
    if (step === totalSteps - 1) { onComplete?.(); onClose(); }
    else transition(step + 1, "next");
  }, [step, totalSteps, onComplete, onClose, transition]);

  const goPrev = useCallback(() => {
    if (step > 0) transition(step - 1, "prev");
  }, [step, transition]);

  const handleSkip = () => { onComplete?.(); onClose(); };

  const handleTryIt = () => {
    if (current.viewId && onNavigate) {
      onNavigate(current.viewId);
      onClose();
    }
  };

  const jumpToStep = (idx: number) => {
    if (idx !== step) transition(idx, idx > step ? "next" : "prev");
  };

  if (!isOpen) return null;

  const isFirst = step === 0;
  const isLast = step === totalSteps - 1;
  const hasTryIt = !!current.viewId;

  return (
    <>
      {/* Spotlight dark overlay with element cutout */}
      <SpotlightOverlay elementId={current.elementId} isVisible={isOpen} />

      {/* Floating tooltip beside the spotlighted element */}
      <ElementTooltip elementId={current.elementId} isVisible={isOpen} />

      {/* Main tutorial modal */}
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden"
        onClick={(e) => { if (e.target === e.currentTarget) handleSkip(); }}
      >
        <div className="flex items-start gap-4 max-w-4xl w-full">
          {/* Mini Nav Preview (desktop only) */}
          <MiniNavPreview
            activeElementId={current.elementId}
            onElementClick={(id) => {
              const idx = TUTORIAL_STEPS.findIndex(s => s.elementId === id);
              if (idx >= 0) jumpToStep(idx);
            }}
          />

          {/* Main Modal Card */}
          <div
            className="relative flex-1 rounded-xl overflow-hidden shadow-2xl border border-[#C9A84C]/15"
            style={{
              background: "linear-gradient(165deg, #022c22 0%, #011a12 60%, #000 100%)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08) inset",
              animation: isAnimating
                ? animDir === "next" ? "tutSlideInRight 0.2s ease-out" : "tutSlideInLeft 0.2s ease-out"
                : "tutFadeInScale 0.3s ease-out",
            }}
          >
            <style>{`
              @keyframes tutSlideInRight { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
              @keyframes tutSlideInLeft  { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
              @keyframes tutFadeInScale  { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `}</style>

            {/* ── Close Button ── */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-[#C9A84C]/20"
              style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}
            >
              <X className="w-3.5 h-3.5 text-[#C9A84C]" />
            </button>

            {/* ── Header ── */}
            <div className="px-6 pt-6 pb-4 border-b border-[#C9A84C]/10">
              <div className="flex items-start gap-4 mb-3">
                <div className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br",
                  current.gradient
                )}>
                  <current.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  {current.phase && (
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-1.5",
                      current.phaseColor
                    )}>
                      {current.phase}
                    </span>
                  )}
                  <h2 className="text-lg font-bold text-[#E8C560] leading-tight font-serif">{current.title}</h2>
                  <p className="text-xs text-[#64748b] mt-0.5">{current.subtitle}</p>
                </div>
                <div className="flex-shrink-0 text-right pt-0.5 text-xs font-bold text-[#64748b] tabular-nums">
                  {step + 1} / {totalSteps}
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-0.5 bg-[#C9A84C]/10 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${current.accentFrom}, ${current.accentTo})`,
                  }}
                />
              </div>
            </div>

            {/* ── Body ── */}
            <div className="px-6 py-5">
              {/* Catalog element info card */}
              {catalogEntry && (
                <div className={cn(
                  "flex items-center gap-3 mb-4 p-3 rounded-lg border",
                  catalogEntry.accentClass
                )}>
                  <catalogEntry.icon className={cn("w-5 h-5 flex-shrink-0", catalogEntry.textClass)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#E8C560]">{catalogEntry.label}</p>
                    <p className="text-[10px] text-[#64748b] uppercase tracking-wider">
                      {catalogEntry.location} navigation &bull; {catalogEntry.shortDesc}
                    </p>
                  </div>
                  <div className={cn(
                    "ml-auto text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border",
                    catalogEntry.location === "sidebar"
                      ? "bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]/20"
                      : catalogEntry.location === "topbar"
                        ? "bg-[#064e3b]/40 text-[#6ee7b7] border-emerald-500/30"
                        : catalogEntry.location === "hero"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  )}>
                    {catalogEntry.location}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="flex items-start gap-2 mb-3">
                <Lightbulb className={cn(
                  "w-4 h-4 flex-shrink-0 mt-0.5",
                  catalogEntry?.textClass || "text-[#C9A84C]"
                )} />
                <span className={cn(
                  "text-sm font-semibold leading-relaxed",
                  catalogEntry?.textClass || "text-[#E8C560]"
                )}>
                  {catalogEntry ? catalogEntry.description : current.description}
                </span>
              </div>

              {!catalogEntry && (
                <p className="text-sm text-[#ecfdf5]/60 leading-relaxed mb-5">{current.description}</p>
              )}

              {/* Tips */}
              <div className="rounded-lg p-4 mb-5 space-y-2.5 bg-[#022c22]/60 border border-[#C9A84C]/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#64748b]">Key Features</p>
                {current.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: current.accentFrom }} />
                    <span className="text-xs text-[#ecfdf5]/70 leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>

              {/* ── Actions ── */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex gap-2">
                  {isFirst ? (
                    <button
                      onClick={handleSkip}
                      className="text-xs font-medium text-[#64748b] hover:text-[#ecfdf5]/60 transition-colors"
                    >
                      Skip Tour
                    </button>
                  ) : (
                    <button
                      onClick={goPrev}
                      className="flex items-center gap-1 px-3 py-2 rounded-md text-xs font-semibold text-[#64748b] hover:text-[#E8C560] bg-white/5 hover:bg-[#C9A84C]/10 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Dot indicators */}
                  <div className="flex items-center gap-1 mr-1">
                    {TUTORIAL_STEPS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => jumpToStep(i)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                          width: i === step ? 14 : 6,
                          height: 6,
                          background: i === step ? current.accentFrom : "rgba(201,168,76,0.15)",
                          opacity: i === step ? 1 : 0.4,
                        }}
                        aria-label={`Go to step ${i + 1}`}
                      />
                    ))}
                  </div>

                  {/* Try It button */}
                  {hasTryIt && (
                    <button
                      onClick={handleTryIt}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold text-[#022c22] bg-[#C9A84C] hover:bg-[#E8C560] border border-[#C9A84C]/50 transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5" /> Try It
                    </button>
                  )}

                  {/* Next / Finish */}
                  <button
                    onClick={goNext}
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold text-[#022c22] shadow-lg transition-transform hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${current.accentFrom}, ${current.accentTo})` }}
                  >
                    {isLast ? (
                      <><Sparkles className="w-3.5 h-3.5" /> Finish</>
                    ) : (
                      <>Next <ChevronRight className="w-3.5 h-3.5" /></>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="px-6 py-3 bg-black/20 border-t border-[#C9A84C]/10 flex items-center justify-between text-[11px] text-[#64748b]">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> BIRD Guide
              </span>
              <span className="flex items-center gap-3">
                <span className="hidden sm:inline">Arrow Keys Navigate</span>
                <span className="text-[#C9A84C]/40">|</span>
                <span>ESC to Exit</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationTutorial;
