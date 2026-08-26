import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Users,
  Building2,
  Plus,
  X,
  Mail,
  Shield,
  Eye,
  Edit3,
  Crown,
  UserPlus,
  Settings,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  MessageSquare,
  Activity,
  Share2,
  Copy,
  ExternalLink,
  Clock,
  User,
  Send,
  RefreshCw,
  Link2,
  Info,
  Bell,
  Target,
  Trophy,
  Zap,
  Calendar,
  Video,
  MessageCircle,
  Award,
  FolderKanban,
  Search,
  LayoutDashboard,
  Bookmark,
  Phone,
  Filter,
  Tag,
  TrendingUp,
  AlertTriangle,
  Flag,
  CheckCircle2,
  BarChart3,
  Megaphone,
  MoreHorizontal,
  ChevronDown,
  Play,
  FileText,
  Globe,
  BookOpen,
  RotateCcw,
  Pencil,
} from 'lucide-react';
import { StrategicPlan } from '@/lib/strategicPlanStore';
import { PresenceUser, CursorPosition } from '@/hooks/useStrategicPlan';
import { cn } from '@/lib/utils';

interface TeamCollaborationProps {
  plan: StrategicPlan;
  userId?: string;
  userEmail?: string;
  userName?: string;
  presenceUsers?: Record<string, PresenceUser[]>;
  cursors?: Record<string, CursorPosition>;
  onCursorUpdate?: (x: number, y: number) => void;
}

interface Organization {
  id: string;
  name: string;
  description?: string;
  owner_id?: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}

interface Member {
  id: string;
  user_id?: string;
  user_email: string;
  user_name: string;
  role: 'viewer' | 'editor' | 'admin' | 'owner';
  joined_at: string;
  status?: 'active' | 'pending' | 'invited';
}

interface PlanShare {
  id: string;
  shared_with_email: string;
  permission: 'viewer' | 'editor' | 'admin';
  created_at: string;
}

interface Comment {
  id: string;
  user_name: string;
  user_email: string;
  user_id: string;
  content: string;
  is_resolved: boolean;
  created_at: string;
  pap_item_id?: string;
  pap_item_name?: string;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  importance?: 'low' | 'medium' | 'high' | 'critical';
  mentions?: string[];
}

interface KpiItem {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  status: 'on_track' | 'at_risk' | 'off_track' | 'critical';
  owner?: string;
  due_date?: string;
  description?: string;
}

interface ActivityItem {
  id: string;
  user_name: string;
  description: string;
  created_at: string;
  type: 'comment' | 'share' | 'member' | 'kpi' | 'system';
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  read: boolean;
  created_at: string;
  link?: string;
}

interface PapItem {
  id: string;
  name: string;
  priority: number;
  status: string;
}

interface ResourceItem {
  id: number;
  title: string;
  url: string;
  type: 'video' | 'article' | 'prototype' | 'document' | 'dashboard' | 'outlook';
  duration?: string;
  meta?: string;
  category: string;
  description: string;
}

type TabType = 'team' | 'sharing' | 'comments' | 'activity' | 'kpis' | 'resources';
type CommentFilter = 'all' | 'urgent' | 'important' | 'pap_related' | 'unresolved';

const getWindowProperty = <T,>(name: string, defaultValue: T): T => {
  if (typeof window !== 'undefined') {
    const value = (window as any)[name];
    return value !== undefined ? value : defaultValue;
  }
  return defaultValue;
};

// ═══════════════════════════════════════════════════════════════════════════════
// BIRD 2026–2035 · RESOURCE LIBRARY
// ═══════════════════════════════════════════════════════════════════════════════
// Mirrors the canonical library published at public/resources.html so the BIRD
// App and the BIRD Validation Survey Platform surface the SAME resource set to
// the same stakeholders. Update both when a resource is added or retired.
// ─────────────────────────────────────────────────────────────────────────────

const RESOURCES: ResourceItem[] = [
  // ── Core Navigation ───────────────────────────────────────────────────────
  { id: 1, title: 'Home — Bangsamoro Investment Roadmap', url: 'https://bangsamoro-investment-roadmap.asilvainnovations.com', type: 'dashboard', category: 'Core Navigation', description: 'Official home page for the BIRD 2026–2035 initiative: the decade-long strategic vision, key statistics, and quick access to all platform resources.' },
  { id: 2, title: 'MEL Dashboard', url: 'https://bird-dashboard.asilvainnovations.com', type: 'dashboard', category: 'Core Navigation', description: 'Monitoring, Evaluation & Learning. Real-time tracking of implementation progress, KPI performance, investment approvals, and provincial economic indicators.' },
  { id: 3, title: 'Contact & Investment Inquiries', url: 'https://bird-contact.asilvainnovations.com', type: 'dashboard', category: 'Core Navigation', description: 'Direct contact channels with BOI-MTIT BARMM for investment facilitation, stakeholder engagement, and technical assistance.' },

  // ── Provincial Economic and Investment Outlooks ───────────────────────────
  { id: 10, title: 'Lanao del Sur', url: 'https://asilvainnovations.github.io/BIRD-2026-2035/public/lanao-delsur-outlook.html', type: 'outlook', category: 'Provincial Outlooks', meta: 'GDP growth 2023: 5.02% · GDP share 25.8% · Pop. 1.2M · Key sector: Services', description: 'Post-Conflict Recovery & Growth Leader. Second-largest economy and highest 2023 real growth in BARMM.' },
  { id: 11, title: 'Maguindanao del Norte', url: 'https://asilvainnovations.github.io/BIRD-2026-2035/public/maguindanao-delnorte-outlook.html', type: 'outlook', category: 'Provincial Outlooks', meta: 'GDP growth 2024: 4.1% · GDP share 28% · Pop. 1.2M+ · Key sector: Halal Industry', description: 'BARMM Administrative & Economic Center. Largest provincial economy; hosts Cotabato City and the Bangsamoro Halal Park.' },
  { id: 12, title: 'Maguindanao del Sur', url: 'https://asilvainnovations.github.io/BIRD-2026-2035/public/maguindanao-delsur-outlook.html', type: 'outlook', category: 'Provincial Outlooks', meta: '24 municipalities · Pop. 800K+ · Poverty incidence 53.0% · Key sector: Agriculture', description: 'Agricultural Heartland & Rice Producer. The clearest agro-processing value-addition gap in the region.' },
  { id: 13, title: 'Special Geographic Area', url: 'https://asilvainnovations.github.io/BIRD-2026-2035/public/sga-outlook.html', type: 'outlook', category: 'Provincial Outlooks', meta: '63 barangays · 8 new municipalities · BARMM direct governance · Key sector: Agro-Industrial', description: '8 New Municipalities & Cross-Provincial Hub. Land tenure and CADT overlay is the binding constraint on park siting.' },
  { id: 14, title: 'Tawi-Tawi', url: 'https://asilvainnovations.github.io/BIRD-2026-2035/public/tawi-tawi-outlook.html', type: 'outlook', category: 'Provincial Outlooks', meta: '40% national seaweed share · Pop. 439K · 390 islands · Key sector: Marine/Aquaculture', description: 'Seaweed Capital & BIMP-EAGA Gateway. Note: returned zero validation-survey respondents.' },
  { id: 15, title: 'Basilan', url: 'https://asilvainnovations.github.io/BIRD-2026-2035/public/basilan-outlook.html', type: 'outlook', category: 'Provincial Outlooks', meta: 'Poverty 55.9%→29.8% · ZBIP ₱6.67B · ASG-free 2024 · Key sector: Rubber/Coconut', description: 'Peace Dividend & Rubber Industry. Note: returned zero validation-survey respondents.' },

  // ── Video Resource Library ────────────────────────────────────────────────
  { id: 20, title: 'Bangsamoro Investment Roadmap 2026–2035', url: 'https://youtu.be/UCi2dVUmSbE', type: 'video', category: 'Video Library', duration: '7 mins', description: "How BIRD positions BARMM as Southeast Asia's hub for resilient, ethical and sustainable investment — growth momentum, risks ahead, and the strategic response." },
  { id: 21, title: 'Regional Context and Outlook', url: 'https://youtu.be/Li7lpyWWMcE', type: 'video', category: 'Video Library', duration: '6 mins', description: "A deep dive into Bangsamoro's evolving economic landscape, policy environment, and investment ecosystem." },
  { id: 22, title: 'SWOT Analysis & Systems Mapping Explained', url: 'https://youtu.be/LSmBzwyX2uw', type: 'video', category: 'Video Library', duration: '8 mins', description: 'Breaks down the SWOT analysis and uses systems mapping to show how strategic investments reshape the region.' },
  { id: 23, title: 'Strategic Options & Path to Growth', url: 'https://youtu.be/kb_snh8mo1k', type: 'video', category: 'Video Library', duration: '7 mins', description: "The strategic choices shaping BARMM's roadmap, and how priorities fuel inclusive growth and regional competitiveness." },
  { id: 24, title: 'Systems Thinking: From Checklists to an Interconnected Ecosystem', url: 'https://youtu.be/VBAHk0WYz_c?si=sbA9QhA4M791C1ET', type: 'video', category: 'Video Library', duration: '4 mins', description: 'How BIRD turns fragmented efforts into a unified engine of growth — shifting from checklists to interconnected strategy.' },
  { id: 25, title: 'Bangsamoro Economic & Investment Ecosystem (BEIE) Framework', url: 'https://youtu.be/0J491Vqya_4', type: 'video', category: 'Video Library', duration: '3 mins', description: 'How the BEIE Framework transforms BARMM into a resilient, ethical and globally connected hub.' },

  // ── Strategic Framework ───────────────────────────────────────────────────
  { id: 30, title: 'BEIE Framework for Grade Six Pupils', url: 'https://asilvainnovations.github.io/BIRD-2026-2035/public/student-guide.html', type: 'document', category: 'Strategic Framework', description: 'Age-appropriate introduction to the BEIE Framework — economic systems, investment concepts and sustainability for young learners.' },
  { id: 31, title: 'Metrics Architecture for Benchmarking', url: 'https://asilvainnovations.github.io/BIRD-2026-2035/public/kpi.html', type: 'document', category: 'Strategic Framework', description: 'KPI framework and performance indicators: Pareto KPIs, Balanced Scorecard indicators, and provincial economic metrics.' },
  { id: 32, title: 'Ecosystem Framework (IEB)', url: 'https://asilvainnovations.github.io/barmm-investment-roadmap/ieb.html', type: 'document', category: 'Strategic Framework', description: 'The Investment Ecosystem Blueprint underpinning the five BEIE clusters and the cross-cutting operating system.' },

  // ── Planning & Roadmap ────────────────────────────────────────────────────
  { id: 40, title: 'Strategic Options — HEDS, GEMS, IFES, IEDS', url: 'https://asilvainnovations.github.io/BIRD-2026-2035/public/options.html', type: 'document', category: 'Planning & Roadmap', description: 'Analysis of the four development pathways. IEDS is the recommended strategy and is independently validated first by stakeholders (7.39/10 vs 8.93 expert).' },
  { id: 41, title: 'Investment Roadmap 2026–2035', url: 'https://bird-roadmap.asilvainnovations.com', type: 'document', category: 'Planning & Roadmap', description: 'The 10-year roadmap: phased implementation, ₱120–160B budget allocation, priority investment corridors, and milestone targets.' },
  { id: 42, title: '1-Year Action Plan (2026)', url: 'https://asilvainnovations.github.io/BIRD-2026-2035/public/action-plan.html', type: 'document', category: 'Planning & Roadmap', description: 'Priority programmes, activities and projects for 2026 with lead agencies, budgets, timelines and performance indicators.' },

  // ── Data Visualisations & Analytics ───────────────────────────────────────
  { id: 50, title: 'BARMM Actors and Value Network', url: 'https://asilvainnovations.github.io/BIRD-2026-2035/public/actors-value-network.html', type: 'prototype', category: 'Data & Analytics', description: 'Interactive network mapping the relationships between stakeholders, institutions and value chains in the investment ecosystem.' },
  { id: 51, title: '10-Year Roadmap Simulation', url: 'https://asilvainnovations.github.io/BIRD-2026-2035/public/roadmap.html', type: 'prototype', category: 'Data & Analytics', description: 'Dynamic visualisation of key economic indicators and investment priorities across BARMM provinces, 2026 to 2035.' },

  // ── Digital Tools & Platforms ─────────────────────────────────────────────
  { id: 60, title: 'BIRD App', url: 'https://bird-app.asilvainnovations.com', type: 'prototype', category: 'Digital Tools', description: 'The interactive BIRD web application — ecosystem data, strategic pillars, and the full 2026–2035 platform.' },
  { id: 61, title: 'BIRD App User Manual', url: 'https://bird-user-manual.asilvainnovations.com', type: 'document', category: 'Digital Tools', description: 'Step-by-step manual for SWOT, Systems Thinking, Balanced Scorecard, PAPs and the MEL Dashboard. For BOI-MTIT and BARMM strategic planners.' },

  // ── Stakeholder Engagement ────────────────────────────────────────────────
  { id: 70, title: 'Validation Survey Instrument', url: 'https://bird-survey.asilvainnovations.com', type: 'prototype', category: 'Stakeholder Engagement', meta: '76 responses · 3–20 Aug 2026', description: 'The official validation survey collecting stakeholder feedback on strategic assumptions, BEIE cluster dynamics, systems archetypes and investment priorities. The sister platform to this app.' },
  { id: 71, title: 'Validation Survey Orientation', url: 'https://bird-survey-orientation.asilvainnovations.com', type: 'document', category: 'Stakeholder Engagement', description: 'Orientation briefing for BOI-MTIT staff on survey methodology, technical architecture and deployment protocols.' },
  { id: 72, title: 'Resource Library (Full)', url: 'https://bird-resources.asilvainnovations.com', type: 'document', category: 'Stakeholder Engagement', description: 'The complete published resource library — the canonical source this tab mirrors.' },

  // ── Systems Thinking Learning Path ────────────────────────────────────────
  { id: 80, title: 'The Iceberg Model: Why SWOT Listing Is Not Enough', url: 'https://youtu.be/y6h2_EcOOcM?si=3DWAm3dMJ7LzOjAS', type: 'video', category: 'Systems Thinking', description: 'Why surface-level analysis fails and how to see deeper systemic structures.' },
  { id: 81, title: 'Causal Loop Diagrams', url: 'https://youtu.be/tTo06jbSZ4M?si=mSyIfuUvpeXPsrW', type: 'video', category: 'Systems Thinking', description: 'Visual tools for mapping feedback loops and system behaviour.' },
  { id: 82, title: 'Systems Archetypes', url: 'https://youtu.be/zRmEh-PMvWo?si=DnxR-3n4I-382hKT', type: 'video', category: 'Systems Thinking', description: 'Common recurring systemic patterns and their dynamics — the eleven archetypes validated in the BIRD survey.' },
  { id: 83, title: 'Leverage Points (Meadows)', url: 'https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/', type: 'article', category: 'Systems Thinking', description: "Donella Meadows' seminal essay on the intervention hierarchy underpinning LP1–LP5." },
  { id: 84, title: 'What is a Balanced Scorecard', url: 'https://youtu.be/OLdlpeMVmuk?si=mhHAWJr-UisjyV8P', type: 'video', category: 'Systems Thinking', description: 'Foundational overview of the Balanced Scorecard framework used in Chapters 5–6.' },

  // ── Legal ─────────────────────────────────────────────────────────────────
  { id: 90, title: 'Privacy Policy', url: 'https://asilvainnovations.github.io/bird-validation-survey/public/privacy-policy.html', type: 'document', category: 'Legal', description: 'Data collection, usage, security measures and your rights over information submitted through the BIRD platform.' },
  { id: 91, title: 'Cookie Policy', url: 'https://asilvainnovations.github.io/bird-validation-survey/public/cookie-policy.html', type: 'document', category: 'Legal', description: 'How cookies are used to improve browsing, personalise content, analyse traffic and ensure essential functionality.' },
];


// ═══════════════════════════════════════════════════════════════════════════════
// BIRD MEL DASHBOARD WIRING — Urgent & Important Critical Data
// ═══════════════════════════════════════════════════════════════════════════════
// These constants mirror the MEL Dashboard (Panels A, B and C) so that
// accountability and the calendar of activities stay identical across both
// views. Baselines: 2024 PSA / BBOI / MTIT / MENRE actuals. Targets: BIRD
// 2026–2035. Due dates are the Phase-1 (2026–2028) milestone dates.
//
// Status mapping follows the MEL convention:
//   on_track  ≥ 70% of trajectory   at_risk   40–69%
//   off_track 15–39%                critical  < 15% or unstarted & overdue
// ─────────────────────────────────────────────────────────────────────────────

const BIRD_CRITICAL_KPIS: KpiItem[] = [
  // ── Pareto Vital Few (Panel A) ────────────────────────────────────────────
  { id: 'f1', name: 'Annual Investment Approvals', target: 15, current: 5.1, unit: '₱B', status: 'at_risk', owner: 'BBOI', due_date: '2035-12-31', description: 'Panel A · Pareto KPI. Investment promotion roadshows, BIMP-EAGA missions, investor aftercare. Baseline ₱5.1B (2024).' },
  { id: 'f2', name: 'BARMM GRDP', target: 550, current: 299.5, unit: '₱B', status: 'at_risk', owner: 'BPDA', due_date: '2035-12-31', description: 'Panel A · Pareto KPI. Regional output; 2024 actual ₱299.5B growing 2.7%. Requires sustained 7%+ to reach target.' },
  { id: 's6', name: 'Jobs Created (BOI-registered firms)', target: 20000, current: 2029, unit: 'jobs', status: 'off_track', owner: 'BBOI', due_date: '2035-12-31', description: 'Panel A · Pareto KPI. Labour-intensive sector prioritisation, skills matching, TESDA alignment.' },
  { id: 's3', name: 'MSMEs with Halal Certification', target: 5000, current: 500, unit: 'MSMEs', status: 'off_track', owner: 'BHB', due_date: '2035-12-31', description: 'Panel A · Pareto KPI. BHB MSME certification programme and BHIDP implementation.' },
  { id: 's4', name: 'Poverty Incidence (BARMM)', target: 20, current: 34.8, unit: '%', status: 'at_risk', owner: 'PSA', due_date: '2035-12-31', description: 'Panel A · Pareto KPI. Jobs-focused facilitation, MSME development, inclusive value chains. Lower is better.' },
  { id: 'f3', name: 'Annual Exports from BARMM', target: 40, current: 10, unit: '₱B', status: 'off_track', owner: 'MTIT', due_date: '2035-12-31', description: 'Panel A · Pareto KPI. UAE halal corridor, BIMP-EAGA trade facilitation, export readiness.' },

  // ── Critical / urgent Balanced Scorecard indicators (Panel B) ─────────────
  { id: 'p3', name: 'BHB OIC/SMIIC Accreditation', target: 100, current: 0, unit: '%', status: 'critical', owner: 'BHB', due_date: '2028-12-31', description: 'Panel B · LP1. Unstarted. Blocks the entire halal export pathway — without mutual recognition, certification carries no international weight.' },
  { id: 'p1', name: 'Business Registration Time', target: 1, current: 5, unit: 'days', status: 'at_risk', owner: 'MTIT', due_date: '2028-06-30', description: 'Panel B · LP2. Digital BNR system and BEGMP e-governance. Lower is better.' },
  { id: 'p4', name: 'Infrastructure Budget Execution', target: 90, current: 80, unit: '%', status: 'at_risk', owner: 'MPW', due_date: '2028-12-31', description: 'Panel B · LP2. Underspending was rated 4.06 impact / 4.03 likelihood by validation-survey respondents — a live weakness, not a theoretical one.' },
  { id: 'l5', name: 'Functional Literacy Rate', target: 75, current: 59.3, unit: '%', status: 'off_track', owner: 'MBHTE / DepEd', due_date: '2035-12-31', description: 'Panel B · LP2. HIGHEST-RISK factor in the entire SWOT register (Risk 17.76 from 74 respondents). Human capital, not infrastructure, is the binding constraint.' },
  { id: 'p5', name: 'Inter-Agency Coordination Score', target: 8, current: 5.5, unit: '/10', status: 'off_track', owner: 'BICC', due_date: '2028-12-31', description: 'Panel B · LP3. Fragmented mandates scored 4.00 impact in the validation survey; transparency was named the critical governance lever by 42 of 73 respondents.' },
  { id: 's7', name: 'Inter-Provincial Growth Disparity', target: 1.5, current: 3.9, unit: 'pp', status: 'critical', owner: 'BPDA', due_date: '2035-12-31', description: 'Panel B · LP3. Widening. Compounded by an evidence gap: Basilan and Tawi-Tawi returned ZERO validation-survey respondents. Lower is better.' },
  { id: 'f5', name: 'Islamic Banking Assets in BARMM', target: 20, current: 2, unit: '₱B', status: 'off_track', owner: 'BSP / Al-Amanah', due_date: '2035-12-31', description: 'Panel B · LP4. Stakeholders ranked Macro-Capital (Sukuk, infrastructure banking) first for finance sequencing, 36 of 64.' },
  { id: 'f4', name: 'Carbon Credit + PES Revenue', target: 500, current: 0, unit: '₱M', status: 'critical', owner: 'MENRE', due_date: '2030-12-31', description: 'Panel B · LP5. Unstarted. Gated on the Forestry Code and JMC No. 2026-01 — renewable-energy monetisation scored highest of any opportunity (RI 4.14).' },
];

/**
 * Phase-1 priority actions from the MEL Dashboard Action Board (Panel C).
 * `priority` follows the board: 1 = critical, 2 = high, 3 = medium.
 * Comments raised against these items therefore reference the same work
 * packages that appear on the dashboard and in the Plan Generator export.
 */
const BIRD_PRIORITY_PAPS: PapItem[] = [
  { id: 'pap-01', name: 'BHB Operationalisation & OIC/SMIIC Accreditation (Q2 2026)', priority: 1, status: 'in_progress' },
  { id: 'pap-02', name: 'Bangsamoro Forestry Code Enactment (Q2 2026)', priority: 1, status: 'drafting' },
  { id: 'pap-03', name: 'Bangsamoro Halal Park — Matanog Development (Q3 2026)', priority: 1, status: 'in_progress' },
  { id: 'pap-04', name: 'Digital Business Registration (BNR / BEGMP) Rollout (Q3 2026)', priority: 1, status: 'development' },
  { id: 'pap-05', name: 'Functional Literacy & TVET-Industry Alignment (Q4 2026)', priority: 1, status: 'scoping' },
  { id: 'pap-06', name: 'Zamboanga-Basilan Interconnection Project (ZBIP) (Q4 2026)', priority: 2, status: 'in_progress' },
  { id: 'pap-07', name: 'Cold Chain & Agro-Logistics Build-Out (Q3 2026)', priority: 2, status: 'pre_dev' },
  { id: 'pap-08', name: 'Sukuk & Islamic Finance Framework (Q4 2026)', priority: 2, status: 'scoping' },
  { id: 'pap-09', name: 'JMC No. 2026-01 — Carbon & PES Activation (Q3 2026)', priority: 2, status: 'pre_dev' },
  { id: 'pap-10', name: 'Provincial Equity & Island-Province Facilitation Offices (Q4 2026)', priority: 1, status: 'urgent' },
];

// ── Presence Ribbon (exportable for Topbar) ──────────────
export function PresenceRibbon({
  presenceUsers,
  currentUserId,
  maxAvatars = 5,
}: {
  presenceUsers: Record<string, PresenceUser[]>;
  currentUserId?: string;
  maxAvatars?: number;
}) {
  const users = useMemo(() => {
    return Object.values(presenceUsers)
      .flat()
      .filter((u, i, arr) => arr.findIndex((x) => x.user_id === u.user_id) === i)
      .filter((u) => u.user_id !== currentUserId);
  }, [presenceUsers, currentUserId]);

  const displayUsers = users.slice(0, maxAvatars);
  const remaining = users.length - maxAvatars;

  if (users.length === 0) return null;

  return (
    <div className="flex items-center gap-1" aria-label={`${users.length} collaborators online`}>
      <span className="text-xs text-[#64748b] mr-1.5 font-medium hidden lg:inline">Live</span>
      {displayUsers.map((u) => (
        <div
          key={u.user_id}
          className="relative group"
          title={u.user_name}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm transition-transform hover:scale-110"
            style={{ backgroundColor: u.color }}
          >
            {u.user_name?.charAt(0).toUpperCase()}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#059669] border-2 border-white rounded-full" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#022c22] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            {u.user_name}
          </div>
        </div>
      ))}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[#ecfdf5]/80 text-xs font-bold border-2 border-white">
          +{remaining}
        </div>
      )}
    </div>
  );
}

// ── Live Cursors Overlay ─────────────────────────────────
function LiveCursors({
  cursors,
  currentUserId,
}: {
  cursors: Record<string, CursorPosition>;
  currentUserId?: string;
}) {
  const activeCursors = useMemo(() => {
    return Object.values(cursors).filter((c) => c.user_id !== currentUserId);
  }, [cursors, currentUserId]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" aria-hidden="true">
      {activeCursors.map((cursor) => (
        <div
          key={cursor.user_id}
          className="absolute transition-all duration-150 ease-out"
          style={{ left: cursor.x, top: cursor.y }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: cursor.color }}>
            <path
              d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"
              fill="currentColor"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
          <span
            className="absolute left-4 top-4 px-2 py-1 rounded-md text-xs font-semibold text-white whitespace-nowrap shadow-sm"
            style={{ backgroundColor: cursor.color }}
          >
            {cursor.user_name}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────
const TeamCollaboration: React.FC<TeamCollaborationProps> = ({
  plan,
  userId = 'demo-user',
  userEmail = 'demo@example.com',
  userName = 'Demo User',
  presenceUsers,
  cursors,
  onCursorUpdate,
}) => {
  // Core states
  const [activeTab, setActiveTab] = useState<TabType>('team');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [planShares, setPlanShares] = useState<PlanShare[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [kpis, setKpis] = useState<KpiItem[]>([]);
  const [papItems, setPapItems] = useState<PapItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [commentFilter, setCommentFilter] = useState<CommentFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resourceCategory, setResourceCategory] = useState<string>('All');

  // Modal States
  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isManagingCustomUrl, setIsManagingCustomUrl] = useState(false);
  const [showKpiDetail, setShowKpiDetail] = useState<string | null>(null);

  // Admin Org Management States
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [deletingOrg, setDeletingOrg] = useState<Organization | null>(null);
  const [resettingOrg, setResettingOrg] = useState<Organization | null>(null);

  // Form States
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgDescription, setNewOrgDescription] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'viewer' | 'editor' | 'admin'>('viewer');
  const [shareEmail, setShareEmail] = useState('');
  const [sharePermission, setSharePermission] = useState<'viewer' | 'editor' | 'admin'>('viewer');
  const [newComment, setNewComment] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customUrlSuccess, setCustomUrlSuccess] = useState('');

  // Comment context
  const [selectedPapItem, setSelectedPapItem] = useState<string>('');
  const [commentUrgency, setCommentUrgency] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [commentImportance, setCommentImportance] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);
  const [kpiAlerts, setKpiAlerts] = useState(true);
  const [mentionAlerts, setMentionAlerts] = useState(true);

  const notifRef = useRef<HTMLDivElement>(null);
  const createOrgInputRef = useRef<HTMLInputElement>(null);
  const editOrgInputRef = useRef<HTMLInputElement>(null);

  // Determine current user's role in selected org
  const currentUserOrgRole = useMemo(() => {
    const member = members.find((m) => (m.user_id && m.user_id === userId) || m.user_email === userEmail);
    return member?.role || 'viewer';
  }, [members, userId, userEmail]);

  const canManageOrg = useCallback((role?: string) => {
    return role === 'owner' || role === 'admin';
  }, []);

  // ── Realtime cursor tracking ───────────────────────────
  useEffect(() => {
    if (!onCursorUpdate) return;
    const handleMouseMove = (e: MouseEvent) => {
      onCursorUpdate(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [onCursorUpdate]);

  // ── Sync KPIs / PAPs from realtime plan updates ──────────
  useEffect(() => {
    if (plan?.objectives) {
      const planKpis = plan.objectives.flatMap((obj: any) => obj.kpis || []);
      if (planKpis.length > 0) {
        setKpis(planKpis);
      }
    }
  }, [plan?.objectives]);

  useEffect(() => {
    if (plan?.paps && plan.paps.length > 0) {
      setPapItems(
        plan.paps.map((p: any) => ({
          id: p.id,
          name: p.name,
          priority: p.priority ?? 1,
          status: p.status ?? 'pending',
        }))
      );
    }
  }, [plan?.paps]);

  // Initialize Custom URL
  useEffect(() => {
    if (plan.custom_share_url) {
      setCustomUrl(plan.custom_share_url);
    } else {
      const origin = getWindowProperty('location.origin', 'https://example.com');
      const safeName = plan.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      setCustomUrl(`${origin}/p/${safeName}`);
    }
  }, [plan.id, plan.custom_share_url, plan.name]);

  // Clear messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (customUrlSuccess) {
      const timer = setTimeout(() => setCustomUrlSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [customUrlSuccess]);

  // Click outside to close notifications
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape key to close modals
  useEffect(() => {
    const anyModalOpen = showCreateOrgModal || showInviteModal || showShareModal || editingOrg || deletingOrg || resettingOrg;
    if (!anyModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCreateOrgModal(false);
        setShowInviteModal(false);
        setShowShareModal(false);
        setEditingOrg(null);
        setDeletingOrg(null);
        setResettingOrg(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showCreateOrgModal, showInviteModal, showShareModal, editingOrg, deletingOrg, resettingOrg]);

  // Focus first input when modals open
  useEffect(() => {
    if (showCreateOrgModal && createOrgInputRef.current) {
      setTimeout(() => createOrgInputRef.current?.focus(), 50);
    }
    if (editingOrg && editOrgInputRef.current) {
      setTimeout(() => editOrgInputRef.current?.focus(), 50);
    }
  }, [showCreateOrgModal, editingOrg]);

  // === DATA LOADING ===

  const loadOrganizations = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('organizations').select('*');
      if (error) throw error;
      setOrganizations(data || []);
      if (data && data.length > 0 && !selectedOrg) {
        setSelectedOrg(data[0]);
        await loadMembers(data[0].id);
      }
    } catch (err: any) {
      console.warn('Orgs error:', err.message);
    }
  }, [selectedOrg]);

  const loadMembers = useCallback(async (orgId: string) => {
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .select('*')
        .eq('organization_id', orgId);
      if (error) throw error;
      setMembers(data || []);
    } catch (err: any) {
      console.warn('Members error:', err.message);
    }
  }, []);

  const loadPlanShares = useCallback(async () => {
    if (!plan?.id) return;
    try {
      const { data, error } = await supabase
        .from('plan_shares')
        .select('*')
        .eq('plan_id', plan.id);
      if (error) throw error;
      setPlanShares(data || []);
    } catch (err: any) {
      console.warn('Shares error:', err.message);
    }
  }, [plan?.id]);

  const loadComments = useCallback(async () => {
    if (!plan?.id) return;
    try {
      const { data, error } = await supabase
        .from('plan_comments')
        .select('*')
        .eq('plan_id', plan.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setComments(data || []);
    } catch (err: any) {
      console.warn('Comments error:', err.message);
    }
  }, [plan?.id]);

  const loadActivities = useCallback(async () => {
    if (!plan?.id) return;
    try {
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .eq('plan_id', plan.id)
        .limit(50);
      if (error) throw error;
      setActivities(data || []);
    } catch (err: any) {
      console.warn('Activities error:', err.message);
    }
  }, [plan?.id]);

  const loadKpis = useCallback(async () => {
    if (!plan?.id) return;
    try {
      const { data, error } = await supabase
        .from('kpis')
        .select('*')
        .eq('plan_id', plan.id);
      if (error) throw error;
      setKpis(data || []);
    } catch (err: any) {
      console.warn('KPIs error:', err.message);
      // MEL Dashboard fallback — the six Pareto "vital few" KPIs and the
      // urgent/critical Balanced Scorecard indicators carried by the BIRD MEL
      // Dashboard (Panels A and B). Baselines are 2024 PSA / BBOI / MTIT /
      // MENRE actuals; targets are BIRD 2026–2035. These are the SAME figures
      // the MEL Dashboard renders, so accountability stays consistent across
      // the two views rather than diverging into placeholder numbers.
      setKpis(BIRD_CRITICAL_KPIS);
    }
  }, [plan?.id]);

  const loadPapItems = useCallback(async () => {
    if (!plan?.id) return;
    try {
      const { data, error } = await supabase
        .from('pap_items')
        .select('id, name, priority, status')
        .eq('plan_id', plan.id);
      if (error) throw error;
      setPapItems(data || []);
    } catch (err: any) {
      console.warn('PAP error:', err.message);
      setPapItems(BIRD_PRIORITY_PAPS);
    }
  }, [plan?.id]);

  const loadNotifications = useCallback(async () => {
    // Simulated notifications - in production, fetch from Supabase
    setNotifications([
      { id: '1', title: 'KPI Alert', message: 'Customer Satisfaction is at risk (82/90)', type: 'warning', read: false, created_at: new Date(Date.now() - 3600000).toISOString(), link: '#kpis' },
      { id: '2', title: 'New Comment', message: 'Alex mentioned you in "Digital Transformation Initiative"', type: 'info', read: false, created_at: new Date(Date.now() - 7200000).toISOString(), link: '#comments' },
      { id: '3', title: 'Member Joined', message: 'Sarah Chen joined as Editor', type: 'success', read: true, created_at: new Date(Date.now() - 86400000).toISOString() },
    ]);
  }, []);

  useEffect(() => {
    loadOrganizations();
    loadPlanShares();
    loadComments();
    loadActivities();
    loadKpis();
    loadPapItems();
    loadNotifications();
  }, [loadOrganizations, loadPlanShares, loadComments, loadActivities, loadKpis, loadPapItems, loadNotifications]);

  // === ACTIONS ===

  const createOrganization = useCallback(async () => {
    if (!newOrgName.trim()) { setError('Organization name is required'); return; }
    setIsLoading(true); setError(null);
    try {
      const { data, error } = await supabase.from('organizations').insert({
        name: newOrgName,
        description: newOrgDescription,
        owner_id: userId
      }).select().single();
      if (error) throw error;
      await supabase.from('organization_members').insert({
        organization_id: data.id, user_id: userId, user_email: userEmail, user_name: userName, role: 'owner',
      });
      setOrganizations([data, ...organizations]);
      setSelectedOrg(data);
      setShowCreateOrgModal(false);
      setNewOrgName('');
      setNewOrgDescription('');
      setSuccess('Organization created successfully!');
      await loadMembers(data.id);
    } catch (err: any) { setError(err.message); } finally { setIsLoading(false); }
  }, [newOrgName, newOrgDescription, userId, userEmail, userName, organizations, loadMembers]);

  const updateOrganization = useCallback(async () => {
    if (!editingOrg) return;
    if (!editingOrg.name.trim()) { setError('Organization name is required'); return; }
    if (!canManageOrg(currentUserOrgRole)) { setError('You do not have permission to edit this organization.'); return; }

    setIsLoading(true); setError(null);
    try {
      const { error } = await supabase
        .from('organizations')
        .update({
          name: editingOrg.name,
          description: editingOrg.description,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingOrg.id);
      if (error) throw error;

      setOrganizations(prev => prev.map(o => o.id === editingOrg.id ? { ...o, ...editingOrg } : o));
      if (selectedOrg?.id === editingOrg.id) {
        setSelectedOrg(prev => prev ? { ...prev, ...editingOrg } : prev);
      }
      setEditingOrg(null);
      setSuccess('Organization updated successfully.');
    } catch (err: any) {
      setError(err.message || 'Failed to update organization.');
    } finally {
      setIsLoading(false);
    }
  }, [editingOrg, currentUserOrgRole, selectedOrg]);

  const deleteOrganization = useCallback(async () => {
    if (!deletingOrg) return;
    if (!canManageOrg(currentUserOrgRole)) {
      setError('You do not have permission to delete this organization.');
      setDeletingOrg(null);
      return;
    }

    setIsLoading(true); setError(null);
    try {
      // Delete members first to avoid FK constraints if no cascade
      await supabase.from('organization_members').delete().eq('organization_id', deletingOrg.id);
      const { error } = await supabase.from('organizations').delete().eq('id', deletingOrg.id);
      if (error) throw error;

      setOrganizations(prev => prev.filter(o => o.id !== deletingOrg.id));
      if (selectedOrg?.id === deletingOrg.id) {
        setSelectedOrg(null);
        setMembers([]);
      }
      setDeletingOrg(null);
      setSuccess('Organization deleted successfully.');
    } catch (err: any) {
      setError(err.message || 'Failed to delete organization.');
    } finally {
      setIsLoading(false);
    }
  }, [deletingOrg, currentUserOrgRole, selectedOrg]);

  const resetOrganization = useCallback(async () => {
    if (!resettingOrg) return;
    if (!canManageOrg(currentUserOrgRole)) {
      setError('You do not have permission to reset this organization.');
      setResettingOrg(null);
      return;
    }

    setIsLoading(true); setError(null);
    try {
      // Remove all non-owner members
      const { error: memberError } = await supabase
        .from('organization_members')
        .delete()
        .eq('organization_id', resettingOrg.id)
        .neq('role', 'owner');
      if (memberError) throw memberError;

      // Ensure owner is active
      await supabase
        .from('organization_members')
        .update({ status: 'active' })
        .eq('organization_id', resettingOrg.id)
        .eq('role', 'owner');

      // Clear plan shares for this org's plans if needed, or reset other data
      // For now we just reset the team membership

      await loadMembers(resettingOrg.id);
      setResettingOrg(null);
      setSuccess('Organization reset successfully. All non-owner members have been removed.');
    } catch (err: any) {
      setError(err.message || 'Failed to reset organization.');
    } finally {
      setIsLoading(false);
    }
  }, [resettingOrg, currentUserOrgRole, loadMembers]);

  const inviteMember = useCallback(async () => {
    if (!inviteEmail.trim() || !selectedOrg) { setError('Email is required'); return; }
    setIsLoading(true); setError(null);
    try {
      await supabase.from('organization_members').insert({
        organization_id: selectedOrg.id, user_email: inviteEmail, user_name: inviteEmail.split('@')[0], role: inviteRole, status: 'invited',
      });
      // Send email notification
      if (emailNotifications) {
        sendEmailNotification(inviteEmail, `You've been invited to ${selectedOrg.name}`, `Join as ${inviteRole}`);
      }
      setShowInviteModal(false);
      setInviteEmail(''); setInviteRole('viewer');
      setSuccess(`Invitation sent to ${inviteEmail}`);
      await loadMembers(selectedOrg.id);
    } catch (err: any) { setError(err.message); } finally { setIsLoading(false); }
  }, [inviteEmail, selectedOrg, inviteRole, loadMembers, emailNotifications]);

  const sharePlan = useCallback(async () => {
    if (!shareEmail.trim() || !plan?.id) { setError('Email is required'); return; }
    setIsLoading(true); setError(null);
    try {
      await supabase.from('plan_shares').insert({
        plan_id: plan.id, shared_with_email: shareEmail, permission: sharePermission,
      });
      if (emailNotifications) {
        sendEmailNotification(shareEmail, `Shared: ${plan.name}`, `Access level: ${sharePermission}`);
      }
      setShowShareModal(false);
      setShareEmail(''); setSharePermission('viewer');
      setSuccess(`Plan shared with ${shareEmail}`);
      await loadPlanShares();
    } catch (err: any) { setError(err.message); } finally { setIsLoading(false); }
  }, [shareEmail, sharePermission, plan?.id, loadPlanShares, emailNotifications, plan?.name]);

  const addComment = useCallback(async () => {
    if (!newComment.trim() || !plan?.id) { setError('Comment is required'); return; }
    setIsLoading(true); setError(null);
    try {
      const papItem = papItems.find(p => p.id === selectedPapItem);
      await supabase.from('plan_comments').insert({
        plan_id: plan.id, user_id: userId, user_name: userName, user_email: userEmail,
        content: newComment, pap_item_id: selectedPapItem || null,
        pap_item_name: papItem?.name || null,
        urgency: commentUrgency, importance: commentImportance,
      });
      setNewComment(''); setSelectedPapItem(''); setCommentUrgency('medium'); setCommentImportance('medium');
      setSuccess('Comment added!');
      await loadComments();
    } catch (err: any) { setError(err.message); } finally { setIsLoading(false); }
  }, [newComment, userId, userName, userEmail, plan?.id, selectedPapItem, papItems, commentUrgency, commentImportance, loadComments]);

  const resolveComment = useCallback(async (commentId: string) => {
    try {
      await supabase.from('plan_comments').update({ is_resolved: true }).eq('id', commentId);
      await loadComments();
      setSuccess('Comment resolved');
    } catch (err: any) { console.error('Resolve error:', err.message); }
  }, [loadComments]);

  const removeMember = useCallback(async (memberId: string, memberEmail: string) => {
    if (!confirm(`Remove ${memberEmail}?`)) return;
    try {
      await supabase.from('organization_members').delete().eq('id', memberId);
      setMembers(members.filter((m) => m.id !== memberId));
      setSuccess('Member removed');
    } catch (err: any) { setError('Failed to remove member'); }
  }, [members]);

  const removeShare = useCallback(async (shareId: string, email: string) => {
    if (!confirm(`Remove access for ${email}?`)) return;
    try {
      await supabase.from('plan_shares').delete().eq('id', shareId);
      setPlanShares(planShares.filter((s) => s.id !== shareId));
      setSuccess('Share removed');
    } catch (err: any) { setError('Failed to remove share'); }
  }, [planShares]);

  const saveCustomUrl = useCallback(async () => {
    if (!customUrl.trim()) { setCustomUrlSuccess('URL cannot be empty'); return; }
    try {
      await supabase.from('strategic_plans').update({ custom_share_url: customUrl }).eq('id', plan.id);
      setCustomUrlSuccess('Custom URL saved!');
      setIsManagingCustomUrl(false);
    } catch (err: any) { console.error('Save error:', err.message); }
  }, [customUrl, plan.id]);

  const getPlanShareUrl = useCallback((org?: Organization) => {
    if (!plan) return '';
    if (plan.custom_share_url && plan.custom_share_url.startsWith('http')) return plan.custom_share_url;
    const orgSlug = org?.slug || 'default';
    const planSlug = plan.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const origin = getWindowProperty('location.origin', 'https://example.com');
    return `${origin}/organization/${orgSlug}/plan/${planSlug}`;
  }, [plan]);

  const copyToClipboard = useCallback(async (text: string) => {
    try { await navigator.clipboard.writeText(text); setSuccess('Copied to clipboard!'); }
    catch { setError('Failed to copy'); }
  }, []);

  const shareViaWhatsApp = useCallback((text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  }, []);

  const sendEmailNotification = (to: string, subject: string, body: string) => {
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + '\n\n---\nSent from Strategic Planning Platform')}`;
    window.open(mailto, '_blank');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // === UTILITY ===

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(diff / 3600000);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-amber-500/100/10 text-amber-800 border-amber-300';
      case 'admin': return 'bg-purple-500/100/10 text-purple-800 border-purple-300';
      case 'editor': return 'bg-[#C9A84C]/10 text-blue-800 border-blue-300';
      default: return 'bg-[#064e3b]/20 text-[#E8C560]/90 border-[#C9A84C]/30';
    }
  };

  const getUrgencyColor = (level?: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500/100/10 text-red-800 border-red-300';
      case 'high': return 'bg-orange-500/10 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-[#059669]/10 text-green-800 border-green-300';
    }
  };

  const getKpiStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'bg-emerald-600';
      case 'at_risk': return 'bg-amber-500/100';
      case 'off_track': return 'bg-orange-500';
      case 'critical': return 'bg-red-600';
      default: return 'bg-[#064e3b]/100';
    }
  };

  const getKpiStatusText = (status: string) => {
    switch (status) {
      case 'on_track': return 'On Track';
      case 'at_risk': return 'At Risk';
      case 'off_track': return 'Off Track';
      case 'critical': return 'Critical';
      default: return 'Unknown';
    }
  };

  const filteredComments = comments.filter(c => {
    if (searchQuery) {
      return c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
             c.pap_item_name?.toLowerCase().includes(searchQuery.toLowerCase());
    }
    switch (commentFilter) {
      case 'urgent': return c.urgency === 'high' || c.urgency === 'critical';
      case 'important': return c.importance === 'high' || c.importance === 'critical';
      case 'pap_related': return !!c.pap_item_id;
      case 'unresolved': return !c.is_resolved;
      default: return true;
    }
  });

  // === TABS CONFIG ===

  const tabs = [
    { id: 'team' as TabType, label: 'Team', icon: Users },
    { id: 'sharing' as TabType, label: 'Sharing', icon: Share2 },
    { id: 'comments' as TabType, label: 'Discussions', icon: MessageSquare },
    { id: 'kpis' as TabType, label: 'Critical KPIs', icon: Target },
    { id: 'activity' as TabType, label: 'Activity', icon: Activity },
    { id: 'resources' as TabType, label: 'Resources', icon: Bookmark },
  ];

  // === RENDER: TEAM ===

  const renderTeamTab = () => (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Organizations</h2>
          <p className="text-base text-[#ecfdf5]/80 mt-1 leading-relaxed">Manage teams and access control</p>
        </div>
        <button
          onClick={() => setShowCreateOrgModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-[#C9A84C] text-white rounded-xl text-base font-medium hover:bg-[#C9A84C] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2"
          aria-label="Create new organization"
        >
          <Plus className="w-5 h-5" aria-hidden="true" /> Create Organization
        </button>
      </div>

      <div className="grid gap-4 mb-8" role="list" aria-label="Organizations list">
        {organizations.length === 0 ? (
          <div className="text-center py-12 bg-[#064e3b]/10 rounded-xl border-2 border-dashed border-[#C9A84C]/30">
            <Building2 className="w-12 h-12 text-[#64748b]/80 mx-auto mb-3" aria-hidden="true" />
            <p className="text-[#E8C560]/90 font-medium text-base">No organizations yet</p>
            <p className="text-base text-[#ecfdf5]/80 mt-2 leading-relaxed">Create one to start collaborating</p>
          </div>
        ) : (
          organizations.map((org) => (
            <div
              key={org.id}
              onClick={() => { setSelectedOrg(org); loadMembers(org.id); }}
              className={cn(
                "p-5 rounded-xl border-2 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-[#C9A84C]",
                selectedOrg?.id === org.id
                  ? 'border-[#C9A84C] bg-[#C9A84C]/10/60 shadow-sm'
                  : 'border-[#C9A84C]/20 hover:border-slate-400 hover:shadow-sm bg-white'
              )}
              role="listitem"
              aria-selected={selectedOrg?.id === org.id}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedOrg(org);
                  loadMembers(org.id);
                }
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0" aria-hidden="true">
                  {org.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-base truncate">{org.name}</p>
                  <p className="text-sm text-[#ecfdf5]/80 truncate leading-relaxed">{org.description || 'No description'}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedOrg?.id === org.id && <Check className="w-5 h-5 text-[#C9A84C]" aria-hidden="true" />}

                  {canManageOrg(currentUserOrgRole) && (
                    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => setEditingOrg(org)}
                        className="p-2 text-[#64748b] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                        aria-label={`Edit organization ${org.name}`}
                        title="Edit organization"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setResettingOrg(org)}
                        className="p-2 text-[#64748b] hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                        aria-label={`Reset organization ${org.name}`}
                        title="Reset organization"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingOrg(org)}
                        className="p-2 text-[#64748b] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label={`Delete organization ${org.name}`}
                        title="Delete organization"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedOrg && (
        <div className="border-t-2 border-[#C9A84C]/20 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Team Members</h3>
              <p className="text-base text-[#ecfdf5]/80 mt-1">{members.length} member{members.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => shareViaWhatsApp(`Join our strategic plan team: ${getPlanShareUrl(selectedOrg)}`)}
                className="flex items-center gap-2 px-4 py-3 bg-[#059669]/10 text-emerald-800 border border-emerald-300 rounded-xl text-sm font-medium hover:bg-emerald-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label="Share team invite via WhatsApp"
              >
                <Phone className="w-4 h-4" aria-hidden="true" /> WhatsApp
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center gap-2 px-4 py-3 bg-[#022c22] text-white rounded-xl text-sm font-medium hover:bg-[#022c22]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                aria-label="Invite team member"
              >
                <UserPlus className="w-4 h-4" aria-hidden="true" /> Invite
              </button>
            </div>
          </div>

          <div className="space-y-3" role="list" aria-label="Team members">
            {members.length === 0 ? (
              <div className="text-center py-8 bg-[#064e3b]/10 rounded-xl border-2 border-dashed border-[#C9A84C]/20">
                <Users className="w-10 h-10 text-[#64748b]/80 mx-auto mb-2" aria-hidden="true" />
                <p className="text-[#E8C560]/90 text-base">No members yet</p>
              </div>
            ) : (
              members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-4 bg-white border border-[#C9A84C]/20 rounded-xl hover:shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-[#C9A84C]"
                  role="listitem"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0" aria-hidden="true">
                    {member.user_name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-base">{member.user_name}</p>
                    <p className="text-sm text-[#ecfdf5]/80">{member.user_email}</p>
                  </div>
                  <span className={cn(getRoleBadgeColor(member.role), "px-3 py-1 rounded-full text-xs font-semibold border")}>
                    {member.role}
                  </span>
                  {member.status === 'invited' && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/100/10 text-amber-800 border border-amber-300">Pending</span>
                  )}
                  {member.role !== 'owner' && canManageOrg(currentUserOrgRole) && (
                    <button
                      onClick={() => removeMember(member.id, member.user_email)}
                      className="p-2 text-[#64748b] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label={`Remove member ${member.user_name}`}
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );

  // === RENDER: SHARING ===

  const renderSharingTab = () => (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Plan Sharing</h2>
          <p className="text-base text-[#ecfdf5]/80 mt-1 leading-relaxed">Share &quot;{plan?.name}&quot; with stakeholders</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {!isManagingCustomUrl && (
            <button
              onClick={() => setIsManagingCustomUrl(true)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#E8C560]/90 border border-[#C9A84C]/30 rounded-xl hover:bg-[#064e3b]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              aria-label="Customize share URL"
            >
              <Settings className="w-4 h-4" aria-hidden="true" /> Customize URL
            </button>
          )}
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#C9A84C] text-white rounded-xl text-sm font-medium hover:bg-[#C9A84C] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2"
            aria-label="Share plan"
          >
            <Share2 className="w-4 h-4" aria-hidden="true" /> Share Plan
          </button>
        </div>
      </div>

      <div className="mb-6 p-5 bg-[#064e3b]/10 rounded-xl border border-[#C9A84C]/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <p className="text-base font-semibold text-[#E8C560] flex items-center gap-2">
            <Link2 className="w-4 h-4" aria-hidden="true" /> Share Link
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => shareViaWhatsApp(`Check out our strategic plan: ${getPlanShareUrl(selectedOrg || undefined)}`)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Share via WhatsApp"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> WhatsApp
            </button>
            <button
              onClick={() => sendEmailNotification('', `Strategic Plan: ${plan?.name}`, `View here: ${getPlanShareUrl(selectedOrg || undefined)}`)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Share via Email"
            >
              <Mail className="w-4 h-4" aria-hidden="true" /> Email
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={getPlanShareUrl(selectedOrg || undefined)}
            className="flex-1 px-4 py-3 bg-white border border-[#C9A84C]/30 rounded-lg text-sm text-[#E8C560]/90 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            aria-label="Shareable plan URL"
          />
          <button
            onClick={() => copyToClipboard(getPlanShareUrl(selectedOrg || undefined))}
            className="p-3 bg-white border border-[#C9A84C]/30 rounded-lg hover:bg-[#064e3b]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            aria-label="Copy link to clipboard"
            title="Copy link"
          >
            <Copy className="w-5 h-5 text-[#ecfdf5]/80" aria-hidden="true" />
          </button>
          <button
            onClick={() => window.open(getPlanShareUrl(selectedOrg || undefined), '_blank')}
            className="p-3 bg-white border border-[#C9A84C]/30 rounded-lg hover:bg-[#064e3b]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            aria-label="Open share link in new tab"
            title="Open link"
          >
            <ExternalLink className="w-5 h-5 text-[#ecfdf5]/80" aria-hidden="true" />
          </button>
        </div>
      </div>

      {isManagingCustomUrl && (
        <div className="mb-6 p-5 bg-[#C9A84C]/10 border-2 border-[#C9A84C]/20 rounded-xl">
          <div className="flex items-start gap-3 mb-4">
            <Info className="w-5 h-5 text-[#C9A84C] mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <h3 className="font-semibold text-[#C9A84C] text-base">Custom URL</h3>
              <p className="text-sm text-[#C9A84C] mt-1 leading-relaxed">Set a memorable link for easy access</p>
            </div>
            <button
              onClick={() => setIsManagingCustomUrl(false)}
              className="p-1 hover:bg-[#C9A84C]/10 rounded focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
              aria-label="Close custom URL editor"
            >
              <X className="w-5 h-5 text-[#C9A84C]" aria-hidden="true" />
            </button>
          </div>
          <label htmlFor="custom-url" className="sr-only">Custom URL</label>
          <input
            id="custom-url"
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="w-full px-4 py-3 text-base border border-[#C9A84C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C]"
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setIsManagingCustomUrl(false)}
              className="px-5 py-2.5 text-sm font-medium text-[#E8C560]/90 hover:bg-[#064e3b]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Cancel
            </button>
            <button
              onClick={saveCustomUrl}
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium bg-[#C9A84C] text-white rounded-lg hover:bg-[#C9A84C] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2"
            >
              Save URL
            </button>
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold text-slate-900 mb-4 text-base flex items-center gap-2">
          <Shield className="w-5 h-5" aria-hidden="true" /> Shared With
        </h3>
        <div className="space-y-3" role="list" aria-label="External shares">
          {planShares.length === 0 ? (
            <div className="text-center py-8 bg-[#064e3b]/10 rounded-xl border-2 border-dashed border-[#C9A84C]/20">
              <Share2 className="w-10 h-10 text-[#64748b]/80 mx-auto mb-2" aria-hidden="true" />
              <p className="text-[#E8C560]/90 text-base">Not shared externally yet</p>
            </div>
          ) : (
            planShares.map((share) => (
              <div
                key={share.id}
                className="flex items-center gap-4 p-4 bg-white border border-[#C9A84C]/20 rounded-xl focus-within:ring-2 focus-within:ring-[#C9A84C]"
                role="listitem"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0" aria-hidden="true">
                  {share.shared_with_email.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-base truncate">{share.shared_with_email}</p>
                  <span className={cn(getRoleBadgeColor(share.permission), "px-2.5 py-1 rounded-full text-xs font-semibold border inline-block mt-1")}>
                    {share.permission}
                  </span>
                </div>
                <button
                  onClick={() => removeShare(share.id, share.shared_with_email)}
                  className="p-2 text-[#64748b] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label={`Revoke access for ${share.shared_with_email}`}
                  title="Revoke access"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // === RENDER: COMMENTS ===

  const renderCommentsTab = () => (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Discussions</h2>
          <p className="text-base text-[#ecfdf5]/80 mt-1 leading-relaxed">Conversations on PAP items, KPIs, and strategy</p>
        </div>
        <button
          onClick={() => loadComments()}
          className="p-3 hover:bg-[#064e3b]/20 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 self-start"
          aria-label="Refresh discussions"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5 text-[#ecfdf5]/80" aria-hidden="true" />
        </button>
      </div>

      {/* Comment Input */}
      <div className="mb-6 p-5 bg-[#064e3b]/10 rounded-xl border border-[#C9A84C]/20 space-y-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0" aria-hidden="true">
            {userName.charAt(0).toUpperCase()}
          </div>
          <label htmlFor="new-comment" className="sr-only">New comment</label>
          <input
            id="new-comment"
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Start a discussion... Use @ to mention"
            className="flex-1 px-4 py-3 bg-white border border-[#C9A84C]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-base placeholder:text-[#64748b]"
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && addComment()}
          />
          <button
            onClick={addComment}
            disabled={isLoading || !newComment.trim()}
            className="px-5 py-3 bg-[#C9A84C] text-white rounded-xl font-medium hover:bg-[#C9A84C] disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2"
            aria-label="Send comment"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Send className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 pl-12">
          <label htmlFor="pap-select" className="sr-only">Link to PAP item</label>
          <select
            id="pap-select"
            value={selectedPapItem}
            onChange={(e) => setSelectedPapItem(e.target.value)}
            className="px-4 py-2.5 bg-white border border-[#C9A84C]/30 rounded-lg text-sm text-[#E8C560]/90 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          >
            <option value="">Link to PAP Item (optional)</option>
            {papItems.map(pap => (
              <option key={pap.id} value={pap.id}>{pap.name}</option>
            ))}
          </select>

          <label htmlFor="urgency-select" className="sr-only">Urgency level</label>
          <select
            id="urgency-select"
            value={commentUrgency}
            onChange={(e) => setCommentUrgency(e.target.value as any)}
            className="px-4 py-2.5 bg-white border border-[#C9A84C]/30 rounded-lg text-sm text-[#E8C560]/90 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          >
            <option value="low">Urgency: Low</option>
            <option value="medium">Urgency: Medium</option>
            <option value="high">Urgency: High</option>
            <option value="critical">Urgency: Critical</option>
          </select>

          <label htmlFor="importance-select" className="sr-only">Importance level</label>
          <select
            id="importance-select"
            value={commentImportance}
            onChange={(e) => setCommentImportance(e.target.value as any)}
            className="px-4 py-2.5 bg-white border border-[#C9A84C]/30 rounded-lg text-sm text-[#E8C560]/90 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          >
            <option value="low">Importance: Low</option>
            <option value="medium">Importance: Medium</option>
            <option value="high">Importance: High</option>
            <option value="critical">Importance: Critical</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-[#C9A84C]/30 rounded-xl px-4 py-3 flex-1 min-w-[200px] focus-within:ring-2 focus-within:ring-[#C9A84C]">
          <Search className="w-5 h-5 text-[#64748b]" aria-hidden="true" />
          <label htmlFor="comment-search" className="sr-only">Search discussions</label>
          <input
            id="comment-search"
            type="text"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-base outline-none text-[#E8C560] placeholder:text-[#64748b] bg-transparent"
          />
        </div>
        {(['all', 'urgent', 'important', 'pap_related', 'unresolved'] as CommentFilter[]).map(filter => (
          <button
            key={filter}
            onClick={() => setCommentFilter(filter)}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-medium border transition-all focus:outline-none focus:ring-2 focus:ring-offset-1",
              commentFilter === filter
                ? 'bg-[#022c22] text-white border-slate-900 focus:ring-slate-900'
                : 'bg-white text-[#E8C560]/90 border-[#C9A84C]/30 hover:bg-[#064e3b]/10 focus:ring-slate-400'
            )}
            aria-pressed={commentFilter === filter}
          >
            {filter === 'pap_related' ? 'PAP Linked' : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Comments List */}
      <div className="space-y-4" role="feed" aria-label="Discussion comments">
        {filteredComments.length === 0 ? (
          <div className="text-center py-12 bg-[#064e3b]/10 rounded-xl border-2 border-dashed border-[#C9A84C]/30">
            <MessageSquare className="w-12 h-12 text-[#64748b]/80 mx-auto mb-3" aria-hidden="true" />
            <p className="text-[#E8C560]/90 font-medium text-base">No discussions yet</p>
            <p className="text-base text-[#ecfdf5]/80 mt-2 leading-relaxed">Start the conversation above</p>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <article
              key={comment.id}
              className={cn(
                "p-5 rounded-xl border transition-all focus-within:ring-2 focus-within:ring-[#C9A84C]",
                comment.is_resolved ? 'bg-[#064e3b]/10 opacity-70 border-[#C9A84C]/20' : 'bg-white border-[#C9A84C]/20 hover:shadow-sm'
              )}
              aria-label={`Comment by ${comment.user_name}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0" aria-hidden="true">
                  {comment.user_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">{comment.user_name}</span>
                    <time className="text-xs text-[#64748b]" dateTime={comment.created_at}>{formatTimeAgo(comment.created_at)}</time>
                    {comment.pap_item_name && (
                      <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-800 border border-indigo-300 rounded-full text-xs font-semibold flex items-center gap-1">
                        <FolderKanban className="w-3 h-3" aria-hidden="true" /> {comment.pap_item_name}
                      </span>
                    )}
                  </div>
                  <p className="text-[#E8C560] text-base leading-relaxed">{comment.content}</p>
                  <div className="flex items-center gap-2 mt-3">
                    {comment.urgency && (
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1", getUrgencyColor(comment.urgency))}>
                        <AlertTriangle className="w-3 h-3" aria-hidden="true" /> {comment.urgency}
                      </span>
                    )}
                    {comment.importance && (
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1", getUrgencyColor(comment.importance))}>
                        <Flag className="w-3 h-3" aria-hidden="true" /> {comment.importance}
                      </span>
                    )}
                  </div>
                </div>
                {!comment.is_resolved && (
                  <button
                    onClick={() => resolveComment(comment.id)}
                    className="p-2 text-[#34d399] hover:bg-[#059669]/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-label="Mark comment as resolved"
                    title="Mark resolved"
                  >
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );

  // === RENDER: KPIS ===

  const renderKpisTab = () => (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Critical KPIs</h2>
          <p className="text-base text-[#ecfdf5]/80 mt-1 leading-relaxed">Track performance and strategic health</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => loadKpis()}
            className="p-3 hover:bg-[#064e3b]/20 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
            aria-label="Refresh KPIs"
          >
            <RefreshCw className="w-5 h-5 text-[#ecfdf5]/80" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── MEL Accountability Summary ─────────────────────────────────────── */}
      <div className="mb-6 rounded-xl border border-[#C9A84C]/30 bg-[#064e3b]/10 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">
              Wired to the MEL Dashboard
            </span>
            <h3 className="text-base font-bold text-[#E8C560]">Accountability &amp; Calendar of Activities</h3>
          </div>
          <a
            href="https://bird-dashboard.asilvainnovations.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#022c22] text-white rounded-lg text-sm font-medium hover:bg-[#022c22]/80 transition-colors"
          >
            <BarChart3 className="w-4 h-4" aria-hidden="true" /> Open MEL Dashboard
          </a>
        </div>

        {/* Status roll-up */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {([
            { key: 'critical',  label: 'Critical',   color: '#ef4444' },
            { key: 'off_track', label: 'Off Track',  color: '#f97316' },
            { key: 'at_risk',   label: 'At Risk',    color: '#f59e0b' },
            { key: 'on_track',  label: 'On Track',   color: '#10b981' },
          ] as const).map(({ key, label, color }) => (
            <div key={key} className="bg-[#022c22]/40 border border-[#C9A84C]/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold" style={{ color }}>
                {kpis.filter(k => k.status === key).length}
              </div>
              <div className="text-[0.7rem] text-[#a7f3d0]/70 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>

        {/* Owner accountability — who carries the critical and off-track load */}
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] mb-2">
          Accountable units — urgent &amp; important indicators
        </h4>
        <div className="flex flex-wrap gap-2 mb-5">
          {Array.from(
            kpis
              .filter(k => k.status === 'critical' || k.status === 'off_track')
              .reduce((m, k) => m.set(k.owner || 'Unassigned', (m.get(k.owner || 'Unassigned') || 0) + 1), new Map<string, number>())
          )
            .sort((a, b) => b[1] - a[1])
            .map(([owner, count]) => (
              <span
                key={owner}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-300 border border-red-500/30"
              >
                <User className="w-3 h-3" aria-hidden="true" />
                {owner}
                <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 text-[0.65rem]">{count}</span>
              </span>
            ))}
        </div>

        {/* Calendar of activities — Phase-1 milestone dates, soonest first */}
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] mb-2">
          Calendar of activities — next milestones
        </h4>
        <div className="space-y-1.5">
          {[...kpis]
            .filter(k => k.due_date)
            .sort((a, b) => (a.due_date || '').localeCompare(b.due_date || ''))
            .slice(0, 6)
            .map(k => {
              const overdue = (k.due_date || '') < new Date().toISOString().slice(0, 10);
              return (
                <div key={k.id} className="flex items-center gap-3 text-xs border-b border-[#C9A84C]/10 pb-1.5">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-[#64748b]" aria-hidden="true" />
                  <time className="tabular-nums font-semibold flex-shrink-0 w-24" dateTime={k.due_date} style={{ color: overdue ? '#ef4444' : '#C9A84C' }}>
                    {k.due_date}
                  </time>
                  <span className="flex-1 truncate text-[#d1fae5]/80">{k.name}</span>
                  <span className="flex-shrink-0 text-[#64748b]">{k.owner}</span>
                  <span className={cn("px-2 py-0.5 rounded-full text-[0.6rem] font-bold text-white flex-shrink-0", getKpiStatusColor(k.status))}>
                    {getKpiStatusText(k.status)}
                  </span>
                </div>
              );
            })}
        </div>

        <p className="mt-4 text-[0.68rem] text-[#ecfdf5]/40 leading-relaxed">
          Baselines: 2024 PSA / BBOI / MTIT / MENRE actuals. Targets: BIRD 2026–2035. Risk readings referenced in KPI
          descriptions come from the Validation Survey (n=76, 3–20 Aug 2026) — a non-probability convenience sample with
          zero respondents from Basilan and Tawi-Tawi.
        </p>
      </div>

      <div className="grid gap-5" role="list" aria-label="Key performance indicators">
        {kpis.length === 0 ? (
          <div className="text-center py-12 bg-[#064e3b]/10 rounded-xl border-2 border-dashed border-[#C9A84C]/30">
            <Target className="w-12 h-12 text-[#64748b]/80 mx-auto mb-3" aria-hidden="true" />
            <p className="text-[#E8C560]/90 font-medium text-base">No KPIs configured</p>
          </div>
        ) : (
          kpis.map((kpi) => {
            const progress = Math.min(100, Math.round((kpi.current / kpi.target) * 100));
            return (
              <div
                key={kpi.id}
                className="p-6 bg-white border border-[#C9A84C]/20 rounded-xl hover:shadow-md transition-all cursor-pointer focus-within:ring-2 focus-within:ring-[#C9A84C]"
                onClick={() => setShowKpiDetail(showKpiDetail === kpi.id ? null : kpi.id)}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowKpiDetail(showKpiDetail === kpi.id ? null : kpi.id);
                  }
                }}
                aria-expanded={showKpiDetail === kpi.id}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-semibold text-slate-900 text-base">{kpi.name}</h3>
                      <span className={cn("px-3 py-1 rounded-full text-xs font-bold text-white", getKpiStatusColor(kpi.status))}>
                        {getKpiStatusText(kpi.status)}
                      </span>
                    </div>
                    <p className="text-sm text-[#ecfdf5]/80 leading-relaxed">{kpi.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">{kpi.current}<span className="text-sm text-[#64748b] font-normal">/{kpi.target} {kpi.unit}</span></p>
                  </div>
                </div>

                <div className="w-full bg-[#064e3b]/20 rounded-full h-3 mb-4 overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${kpi.name} progress`}>
                  <div className={cn("h-full rounded-full transition-all", getKpiStatusColor(kpi.status))} style={{ width: `${progress}%` }} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-[#ecfdf5]/80 gap-2">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4" aria-hidden="true" /> {kpi.owner}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" aria-hidden="true" /> Due {kpi.due_date}</span>
                  </div>
                  <span className="font-semibold">{progress}% complete</span>
                </div>

                {showKpiDetail === kpi.id && (
                  <div className="mt-5 pt-5 border-t border-[#C9A84C]/20">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveTab('comments'); setSelectedPapItem(''); setNewComment(`Regarding KPI "${kpi.name}": `); }}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-[#064e3b]/20 text-[#E8C560] rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
                      >
                        <MessageSquare className="w-4 h-4" aria-hidden="true" /> Discuss
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); shareViaWhatsApp(`KPI Update: ${kpi.name} is at ${kpi.current}/${kpi.target} ${kpi.unit} (${getKpiStatusText(kpi.status)})`); }}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-[#059669]/10 text-emerald-800 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <Phone className="w-4 h-4" aria-hidden="true" /> Share on WhatsApp
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); sendEmailNotification('', `KPI Alert: ${kpi.name}`, `Current: ${kpi.current}/${kpi.target} ${kpi.unit}\nStatus: ${getKpiStatusText(kpi.status)}`); }}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-[#C9A84C]/10 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Mail className="w-4 h-4" aria-hidden="true" /> Email Update
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  // === RENDER: ACTIVITY ===

  const renderActivityTab = () => (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Activity Log</h2>
          <p className="text-base text-[#ecfdf5]/80 mt-1 leading-relaxed">Recent changes and updates</p>
        </div>
        <button
          onClick={() => loadActivities()}
          className="p-3 hover:bg-[#064e3b]/20 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
          aria-label="Refresh activity log"
        >
          <RefreshCw className="w-5 h-5 text-[#ecfdf5]/80" aria-hidden="true" />
        </button>
      </div>
      <div className="space-y-2" role="list" aria-label="Activity items">
        {activities.length === 0 ? (
          <div className="text-center py-12 bg-[#064e3b]/10 rounded-xl border-2 border-dashed border-[#C9A84C]/30">
            <Activity className="w-12 h-12 text-[#64748b]/80 mx-auto mb-3" aria-hidden="true" />
            <p className="text-[#E8C560]/90 font-medium text-base">No activity recorded yet</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 hover:bg-[#064e3b]/10 rounded-xl transition-colors focus-within:ring-2 focus-within:ring-[#C9A84C]"
              role="listitem"
            >
              <div className="w-10 h-10 rounded-full bg-[#064e3b]/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                {activity.type === 'comment' ? <MessageSquare className="w-5 h-5 text-[#ecfdf5]/80" /> :
                 activity.type === 'share' ? <Share2 className="w-5 h-5 text-[#ecfdf5]/80" /> :
                 activity.type === 'kpi' ? <Target className="w-5 h-5 text-[#ecfdf5]/80" /> :
                 <Activity className="w-5 h-5 text-[#ecfdf5]/80" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base text-[#E8C560] leading-relaxed">
                  <span className="font-semibold">{activity.user_name}</span>{' '}
                  <span className="text-[#E8C560]/90">{activity.description}</span>
                </p>
                <time className="text-sm text-[#64748b] mt-1 block" dateTime={activity.created_at}>{formatTimeAgo(activity.created_at)}</time>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // === RENDER: RESOURCES ===

  const renderResourcesTab = () => (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">BIRD 2026–2035 Resource Library</h2>
        <p className="text-base text-[#ecfdf5]/80 mt-1 leading-relaxed">
          Mirrors the published library at <span className="text-[#C9A84C]">bird-resources.asilvainnovations.com</span> —
          the same {RESOURCES.length} resources available to validation-survey respondents and workshop participants.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['All', ...Array.from(new Set(RESOURCES.map(r => r.category)))].map(cat => (
          <button
            key={cat}
            onClick={() => setResourceCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium border transition-all focus:outline-none focus:ring-2 focus:ring-offset-1",
              resourceCategory === cat
                ? 'bg-[#022c22] text-white border-slate-900 focus:ring-slate-900'
                : 'bg-white text-[#E8C560]/90 border-[#C9A84C]/30 hover:bg-[#064e3b]/10 focus:ring-slate-400'
            )}
            aria-pressed={resourceCategory === cat}
          >
            {cat}
            <span className="ml-1.5 text-xs opacity-60">
              {cat === 'All' ? RESOURCES.length : RESOURCES.filter(r => r.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2" role="list" aria-label="Learning resources">
        {RESOURCES.filter(r => resourceCategory === 'All' || r.category === resourceCategory).map((resource) => (
          <article
            key={resource.id}
            className="group p-5 bg-white border border-[#C9A84C]/20 rounded-xl hover:shadow-md hover:border-[#C9A84C] transition-all focus-within:ring-2 focus-within:ring-[#C9A84C]"
            role="listitem"
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                  resource.type === 'video' ? 'bg-red-500/100/10 text-red-400' :
                  resource.type === 'article' ? 'bg-amber-500/100/10 text-amber-400' :
                  resource.type === 'dashboard' ? 'bg-[#C9A84C]/10 text-[#C9A84C]' :
                  resource.type === 'outlook' ? 'bg-indigo-500/10 text-indigo-300' :
                  'bg-[#059669]/10 text-[#34d399]'
                )}
                aria-hidden="true"
              >
                {resource.type === 'video' ? <Play className="w-6 h-6" /> :
                 resource.type === 'article' ? <FileText className="w-6 h-6" /> :
                 resource.type === 'document' ? <BookOpen className="w-6 h-6" /> :
                 resource.type === 'dashboard' ? <LayoutDashboard className="w-6 h-6" /> :
                 resource.type === 'outlook' ? <TrendingUp className="w-6 h-6" /> :
                 <Globe className="w-6 h-6" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="px-2.5 py-1 bg-[#064e3b]/20 text-[#E8C560]/90 rounded-md text-xs font-semibold">{resource.category}</span>
                  <span className="px-2.5 py-1 bg-[#064e3b]/10 text-[#ecfdf5]/80 rounded-md text-xs font-medium capitalize">{resource.type}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-base leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors">{resource.title}</h3>
                <p className="text-sm text-[#ecfdf5]/80 mb-2 line-clamp-2 leading-relaxed">{resource.description}</p>
                {(resource.duration || resource.meta) && (
                  <p className="text-[0.68rem] text-[#C9A84C]/80 mb-3 leading-relaxed">
                    {resource.duration && <span className="font-semibold">Duration: {resource.duration}</span>}
                    {resource.duration && resource.meta && ' · '}
                    {resource.meta}
                  </p>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#022c22] text-white rounded-lg text-sm font-medium hover:bg-[#022c22]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" /> Open
                  </a>
                  <button
                    onClick={() => copyToClipboard(resource.url)}
                    className="p-2.5 text-[#64748b] hover:text-[#E8C560] hover:bg-[#064e3b]/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
                    aria-label={`Copy link for ${resource.title}`}
                    title="Copy link"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => shareViaWhatsApp(`Check out this resource: ${resource.title} - ${resource.url}`)}
                    className="p-2.5 text-[#34d399] hover:text-emerald-800 hover:bg-[#059669]/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-label={`Share ${resource.title} via WhatsApp`}
                    title="Share via WhatsApp"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => sendEmailNotification('', `Resource: ${resource.title}`, `${resource.description}\n\n${resource.url}`)}
                    className="p-2.5 text-[#C9A84C] hover:text-blue-800 hover:bg-[#C9A84C]/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Share ${resource.title} via Email`}
                    title="Share via Email"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  // === MODALS ===

  const CreateOrgModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="create-org-title">
      <div className="absolute inset-0 bg-[#022c22]/70 backdrop-blur-sm" onClick={() => setShowCreateOrgModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <button
          onClick={() => setShowCreateOrgModal(false)}
          className="absolute top-4 right-4 p-2 hover:bg-[#064e3b]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          aria-label="Close create organization modal"
        >
          <X className="w-5 h-5 text-[#64748b]" aria-hidden="true" />
        </button>
        <h2 id="create-org-title" className="text-xl font-bold mb-1 text-slate-900">Create Organization</h2>
        <p className="text-base text-[#ecfdf5]/80 mb-5 leading-relaxed">Set up a new team workspace</p>

        <label htmlFor="org-name" className="block text-sm font-medium text-[#E8C560]/90 mb-2">Organization Name</label>
        <input
          ref={createOrgInputRef}
          id="org-name"
          value={newOrgName}
          onChange={(e) => setNewOrgName(e.target.value)}
          placeholder="e.g., Strategy Team 2026"
          className="w-full px-4 py-3 border border-[#C9A84C]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-base placeholder:text-[#64748b]"
        />

        <label htmlFor="org-desc" className="block text-sm font-medium text-[#E8C560]/90 mt-4 mb-2">Description <span className="text-[#64748b] font-normal">(optional)</span></label>
        <input
          id="org-desc"
          value={newOrgDescription}
          onChange={(e) => setNewOrgDescription(e.target.value)}
          placeholder="Brief description of this organization"
          className="w-full px-4 py-3 border border-[#C9A84C]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-base placeholder:text-[#64748b]"
        />

        <button
          onClick={createOrganization}
          disabled={isLoading || !newOrgName.trim()}
          className="w-full py-3.5 bg-[#C9A84C] text-white rounded-xl mt-6 hover:bg-[#C9A84C] disabled:opacity-50 font-semibold transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Plus className="w-5 h-5" aria-hidden="true" />} Create Organization
        </button>
      </div>
    </div>
  );

  const EditOrgModal = () => {
    if (!editingOrg) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="edit-org-title">
        <div className="absolute inset-0 bg-[#022c22]/70 backdrop-blur-sm" onClick={() => setEditingOrg(null)} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <button
            onClick={() => setEditingOrg(null)}
            className="absolute top-4 right-4 p-2 hover:bg-[#064e3b]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            aria-label="Close edit organization modal"
          >
            <X className="w-5 h-5 text-[#64748b]" aria-hidden="true" />
          </button>
          <h2 id="edit-org-title" className="text-xl font-bold mb-1 text-slate-900">Edit Organization</h2>
          <p className="text-base text-[#ecfdf5]/80 mb-5 leading-relaxed">Update organization details</p>

          <label htmlFor="edit-org-name" className="block text-sm font-medium text-[#E8C560]/90 mb-2">Organization Name</label>
          <input
            ref={editOrgInputRef}
            id="edit-org-name"
            value={editingOrg.name}
            onChange={(e) => setEditingOrg({...editingOrg, name: e.target.value})}
            placeholder="Organization Name"
            className="w-full px-4 py-3 border border-[#C9A84C]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-base placeholder:text-[#64748b]"
          />

          <label htmlFor="edit-org-desc" className="block text-sm font-medium text-[#E8C560]/90 mt-4 mb-2">Description <span className="text-[#64748b] font-normal">(optional)</span></label>
          <input
            id="edit-org-desc"
            value={editingOrg.description || ''}
            onChange={(e) => setEditingOrg({...editingOrg, description: e.target.value})}
            placeholder="Brief description"
            className="w-full px-4 py-3 border border-[#C9A84C]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-base placeholder:text-[#64748b]"
          />

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setEditingOrg(null)}
              className="flex-1 py-3.5 text-sm font-semibold text-[#E8C560]/90 border border-[#C9A84C]/30 rounded-xl hover:bg-[#064e3b]/10 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Cancel
            </button>
            <button
              onClick={updateOrganization}
              disabled={isLoading || !editingOrg.name.trim()}
              className="flex-1 py-3.5 bg-[#C9A84C] text-white rounded-xl text-sm font-semibold hover:bg-[#C9A84C] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Check className="w-5 h-5" aria-hidden="true" />} Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DeleteOrgModal = () => {
    if (!deletingOrg) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="delete-org-title">
        <div className="absolute inset-0 bg-[#022c22]/70 backdrop-blur-sm" onClick={() => setDeletingOrg(null)} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <button
            onClick={() => setDeletingOrg(null)}
            className="absolute top-4 right-4 p-2 hover:bg-[#064e3b]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            aria-label="Close delete confirmation"
          >
            <X className="w-5 h-5 text-[#64748b]" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-500/100/10 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-400" aria-hidden="true" />
            </div>
            <h2 id="delete-org-title" className="text-xl font-bold text-slate-900">Delete Organization</h2>
          </div>
          <p className="text-base text-[#E8C560]/90 mb-2 leading-relaxed">
            Are you sure you want to delete <strong>{deletingOrg.name}</strong>?
          </p>
          <p className="text-sm text-[#ecfdf5]/80 mb-6 leading-relaxed">
            This action cannot be undone. All members and associated data will be permanently removed.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setDeletingOrg(null)}
              className="flex-1 py-3.5 text-sm font-semibold text-[#E8C560]/90 border border-[#C9A84C]/30 rounded-xl hover:bg-[#064e3b]/10 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Cancel
            </button>
            <button
              onClick={deleteOrganization}
              disabled={isLoading}
              className="flex-1 py-3.5 bg-red-700 text-white rounded-xl text-sm font-semibold hover:bg-red-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Trash2 className="w-5 h-5" aria-hidden="true" />} Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ResetOrgModal = () => {
    if (!resettingOrg) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="reset-org-title">
        <div className="absolute inset-0 bg-[#022c22]/70 backdrop-blur-sm" onClick={() => setResettingOrg(null)} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <button
            onClick={() => setResettingOrg(null)}
            className="absolute top-4 right-4 p-2 hover:bg-[#064e3b]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            aria-label="Close reset confirmation"
          >
            <X className="w-5 h-5 text-[#64748b]" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-amber-500/100/10 rounded-full">
              <RotateCcw className="w-6 h-6 text-amber-400" aria-hidden="true" />
            </div>
            <h2 id="reset-org-title" className="text-xl font-bold text-slate-900">Reset Organization</h2>
          </div>
          <p className="text-base text-[#E8C560]/90 mb-2 leading-relaxed">
            Reset <strong>{resettingOrg.name}</strong>?
          </p>
          <p className="text-sm text-[#ecfdf5]/80 mb-6 leading-relaxed">
            This will remove all members except the owner and clear all pending invitations. Organization settings and name will be preserved.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setResettingOrg(null)}
              className="flex-1 py-3.5 text-sm font-semibold text-[#E8C560]/90 border border-[#C9A84C]/30 rounded-xl hover:bg-[#064e3b]/10 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Cancel
            </button>
            <button
              onClick={resetOrganization}
              disabled={isLoading}
              className="flex-1 py-3.5 bg-amber-700 text-white rounded-xl text-sm font-semibold hover:bg-amber-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <RotateCcw className="w-5 h-5" aria-hidden="true" />} Reset Organization
            </button>
          </div>
        </div>
      </div>
    );
  };

  const InviteModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="invite-title">
      <div className="absolute inset-0 bg-[#022c22]/70 backdrop-blur-sm" onClick={() => setShowInviteModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <button
          onClick={() => setShowInviteModal(false)}
          className="absolute top-4 right-4 p-2 hover:bg-[#064e3b]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          aria-label="Close invite modal"
        >
          <X className="w-5 h-5 text-[#64748b]" aria-hidden="true" />
        </button>
        <h2 id="invite-title" className="text-xl font-bold mb-1 text-slate-900">Invite Team Member</h2>
        <p className="text-base text-[#ecfdf5]/80 mb-5 leading-relaxed">Add colleagues to {selectedOrg?.name}</p>

        <label htmlFor="invite-email" className="block text-sm font-medium text-[#E8C560]/90 mb-2">Email Address</label>
        <input
          id="invite-email"
          type="email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          placeholder="colleague@company.com"
          className="w-full px-4 py-3 border border-[#C9A84C]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-base placeholder:text-[#64748b] mb-4"
        />

        <label htmlFor="invite-role" className="block text-sm font-medium text-[#E8C560]/90 mb-2">Role</label>
        <select
          id="invite-role"
          value={inviteRole}
          onChange={(e) => setInviteRole(e.target.value as any)}
          className="w-full px-4 py-3 border border-[#C9A84C]/30 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-[#E8C560]"
        >
          <option value="viewer">Viewer — Can view only</option>
          <option value="editor">Editor — Can edit content</option>
          <option value="admin">Admin — Full management access</option>
        </select>

        <div className="flex items-center gap-3 mt-5 p-4 bg-[#064e3b]/10 rounded-xl">
          <input
            type="checkbox"
            id="sendEmail"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            className="w-4 h-4 rounded text-[#C9A84C] border-[#C9A84C]/30 focus:ring-[#C9A84C]"
          />
          <label htmlFor="sendEmail" className="text-base text-[#E8C560]/90">Send email notification</label>
        </div>

        <button
          onClick={inviteMember}
          disabled={isLoading || !inviteEmail.trim()}
          className="w-full py-3.5 bg-[#C9A84C] text-white rounded-xl mt-6 hover:bg-[#C9A84C] disabled:opacity-50 font-semibold transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <UserPlus className="w-5 h-5" aria-hidden="true" />} Send Invitation
        </button>
      </div>
    </div>
  );

  const ShareModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="share-title">
      <div className="absolute inset-0 bg-[#022c22]/70 backdrop-blur-sm" onClick={() => setShowShareModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <button
          onClick={() => setShowShareModal(false)}
          className="absolute top-4 right-4 p-2 hover:bg-[#064e3b]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          aria-label="Close share modal"
        >
          <X className="w-5 h-5 text-[#64748b]" aria-hidden="true" />
        </button>
        <h2 id="share-title" className="text-xl font-bold mb-1 text-slate-900">Share Plan</h2>
        <p className="text-base text-[#ecfdf5]/80 mb-5 leading-relaxed">Grant access to external stakeholders</p>

        <label htmlFor="share-email" className="block text-sm font-medium text-[#E8C560]/90 mb-2">Email Address</label>
        <input
          id="share-email"
          type="email"
          value={shareEmail}
          onChange={(e) => setShareEmail(e.target.value)}
          placeholder="stakeholder@example.com"
          className="w-full px-4 py-3 border border-[#C9A84C]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-base placeholder:text-[#64748b] mb-4"
        />

        <label htmlFor="share-permission" className="block text-sm font-medium text-[#E8C560]/90 mb-2">Permission Level</label>
        <select
          id="share-permission"
          value={sharePermission}
          onChange={(e) => setSharePermission(e.target.value as any)}
          className="w-full px-4 py-3 border border-[#C9A84C]/30 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-[#E8C560]"
        >
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => shareViaWhatsApp(`Check out our strategic plan "${plan?.name}": ${getPlanShareUrl(selectedOrg || undefined)}`)}
            className="flex-1 py-3.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Phone className="w-4 h-4" aria-hidden="true" /> WhatsApp
          </button>
          <button
            onClick={sharePlan}
            disabled={isLoading || !shareEmail.trim()}
            className="flex-[2] py-3.5 bg-[#C9A84C] text-white rounded-xl text-sm font-semibold hover:bg-[#C9A84C] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Share2 className="w-4 h-4" aria-hidden="true" />} Share via Email
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="space-y-6 max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Team Collaboration</h1>
          <p className="text-base text-[#E8C560]/90 mt-2 leading-relaxed">Manage your team, track KPIs, and collaborate in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Presence Ribbon */}
          {presenceUsers && Object.keys(presenceUsers).length > 0 && (
            <div className="hidden sm:flex items-center gap-2 mr-1">
              <div className="h-6 w-px bg-slate-300 mx-1" />
              <PresenceRibbon presenceUsers={presenceUsers} currentUserId={userId} />
            </div>
          )}

          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 bg-white border border-[#C9A84C]/30 rounded-xl hover:bg-[#064e3b]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
              aria-label={`Notifications, ${unreadCount} unread`}
              aria-expanded={showNotifications}
            >
              <Bell className="w-5 h-5 text-[#E8C560]/90" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#C9A84C]/20 z-50 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-base text-slate-900">Notifications</h3>
                  <button
                    onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                    className="text-sm text-[#C9A84C] hover:text-[#C9A84C] font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-base text-[#ecfdf5]/80 text-center">No notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={cn(
                          "p-4 border-b border-slate-50 hover:bg-[#064e3b]/10 cursor-pointer transition-colors",
                          !n.read ? 'bg-[#C9A84C]/10/40' : ''
                        )}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && markNotificationRead(n.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0",
                              n.type === 'warning' ? 'bg-amber-500/100' : n.type === 'urgent' ? 'bg-red-600' : n.type === 'success' ? 'bg-emerald-600' : 'bg-blue-600'
                            )}
                            aria-hidden="true"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                            <p className="text-sm text-[#ecfdf5]/80 mt-1 leading-relaxed">{n.message}</p>
                            <time className="text-xs text-[#64748b] mt-1 block" dateTime={n.created_at}>{formatTimeAgo(n.created_at)}</time>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 border-t border-slate-100 bg-[#064e3b]/10 space-y-3">
                  <label className="flex items-center gap-3 text-sm text-[#E8C560]/90 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="w-4 h-4 rounded text-[#C9A84C] border-[#C9A84C]/30 focus:ring-[#C9A84C]"
                    />
                    Email notifications
                  </label>
                  <label className="flex items-center gap-3 text-sm text-[#E8C560]/90 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={whatsappNotifications}
                      onChange={(e) => setWhatsappNotifications(e.target.checked)}
                      className="w-4 h-4 rounded text-[#C9A84C] border-[#C9A84C]/30 focus:ring-[#C9A84C]"
                    />
                    WhatsApp alerts for critical KPIs
                  </label>
                  <label className="flex items-center gap-3 text-sm text-[#E8C560]/90 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mentionAlerts}
                      onChange={(e) => setMentionAlerts(e.target.checked)}
                      className="w-4 h-4 rounded text-[#C9A84C] border-[#C9A84C]/30 focus:ring-[#C9A84C]"
                    />
                    @mention alerts
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Live region for screen reader announcements */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {success ? `Success: ${success}` : error ? `Error: ${error}` : ''}
      </div>

      {/* Visual Alerts */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border-2 border-red-500/20 rounded-xl text-red-800" role="alert">
          <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          <span className="text-base font-medium">{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto p-1 hover:bg-red-500/100/10 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-[#059669]/10 border-2 border-[#059669]/20 rounded-xl text-emerald-800" role="alert">
          <Check className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          <span className="text-base font-medium">{success}</span>
        </div>
      )}
      {customUrlSuccess && (
        <div className="flex items-center gap-3 p-4 bg-[#C9A84C]/10 border-2 border-[#C9A84C]/20 rounded-xl text-[#C9A84C]" role="alert">
          <Check className="w-5 h-5" aria-hidden="true" />
          <span className="text-base font-medium">{customUrlSuccess}</span>
        </div>
      )}

      {/* Tabs */}
      <nav aria-label="Collaboration sections">
        <div
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          role="tablist"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2",
                  isActive
                    ? 'bg-[#022c22] text-white shadow-lg focus:ring-slate-900'
                    : 'bg-white text-[#E8C560]/90 hover:bg-[#064e3b]/20 border border-[#C9A84C]/30 focus:ring-slate-400'
                )}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{tab.label}</span>
                {tab.id === 'comments' && comments.filter(c => !c.is_resolved).length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded-full">
                    {comments.filter(c => !c.is_resolved).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content */}
      <section
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="bg-white rounded-2xl border border-[#C9A84C]/20 overflow-hidden shadow-sm"
      >
        {activeTab === 'team' && renderTeamTab()}
        {activeTab === 'sharing' && renderSharingTab()}
        {activeTab === 'comments' && renderCommentsTab()}
        {activeTab === 'kpis' && renderKpisTab()}
        {activeTab === 'activity' && renderActivityTab()}
        {activeTab === 'resources' && renderResourcesTab()}
      </section>

      {/* Live Cursors Overlay */}
      {cursors && <LiveCursors cursors={cursors} currentUserId={userId} />}

      {/* Modals */}
      {showCreateOrgModal && <CreateOrgModal />}
      {editingOrg && <EditOrgModal />}
      {deletingOrg && <DeleteOrgModal />}
      {resettingOrg && <ResetOrgModal />}
      {showInviteModal && <InviteModal />}
      {showShareModal && <ShareModal />}
    </main>
  );
};

export default TeamCollaboration;