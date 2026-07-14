// BIRD 2026–2035 · Interactive Guided Tour
// Maps exactly to Sidebar.tsx, Topbar.tsx, and MELDashboard.tsx element IDs.
// Option B (Modal-only): tutorial stays in modal; "Try It" navigates on demand.

import React, { useState, useEffect, useCallback } from 'react';
import {
  X, ChevronLeft, ChevronRight, Sparkles, LayoutDashboard, Target, Network,
  GitBranch, BarChart3, FolderKanban, FileText, Users, Layers, ClipboardCheck,
  Star, Search, Settings, Share2, Moon, Sun, FileDown, BookOpen, Check,
  Lightbulb, ArrowRight, Compass, HelpCircle, ChevronDown, ExternalLink,
  // Icons for topbar elements
  Menu, Download, Upload, ShieldAlert, User as UserIcon, LogOut, Copy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

// ─── Types ──────────────────────────────────────────────────────────────

interface NavElement {
  id: string;                    // DOM element ID (must exist in Sidebar/Topbar)
  label: string;                 // Display label
  location: 'sidebar' | 'topbar' | 'dashboard' | 'hero';
  description: string;           // Tooltip copy — what this element DOES
  shortDesc: string;             // One-line summary for mini-nav
  icon: React.ElementType;
  highlightColor: string;        // Accent color class
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

// ─── NAV ELEMENT CATALOG ────────────────────────────────────────────────
// Exact IDs from Sidebar.tsx and Topbar.tsx.
// NOTE: Some Topbar IDs must be added to Topbar.tsx (see comments below).

const NAV_CATALOG: Record<string, NavElement> = {
  // ── Sidebar main nav items (id={`nav-item-${item.id}`} in Sidebar.tsx) ──
  'nav-item-dashboard': {
    id: 'nav-item-dashboard', label: 'MEL Dashboard', location: 'sidebar',
    description: 'Your strategic command center. Track 6 Pareto KPIs driving 80% of impact, monitor phase progress, and view the full ₱120–160B investment roadmap.',
    shortDesc: 'KPIs & Roadmap Tracker', icon: LayoutDashboard, highlightColor: 'text-cyan-300',
  },
  'nav-item-swot': {
    id: 'nav-item-swot', label: 'SWOT Analysis', location: 'sidebar',
    description: 'Run structured diagnostics across all 5 BEIE clusters. Surface strengths, weaknesses, opportunities, and threats with data-backed assessments.',
    shortDesc: '5-Cluster Diagnostics', icon: Target, highlightColor: 'text-emerald-300',
  },
  'nav-item-systems': {
    id: 'nav-item-systems', label: 'Systems Thinking', location: 'sidebar',
    description: 'Map causal loop diagrams, identify 10 systems archetypes, and find high-leverage intervention points across BARMM\'s economic ecosystem.',
    shortDesc: 'Causal Loops & Archetypes', icon: Network, highlightColor: 'text-purple-300',
  },
  'nav-item-strategy': {
    id: 'nav-item-strategy', label: 'Strategy Matrix', location: 'sidebar',
    description: 'Generate SO, ST, WO, WT strategic options from your diagnostic data. Turn insights into board-ready investment strategies.',
    shortDesc: 'TOWS Strategy Builder', icon: Sparkles, highlightColor: 'text-amber-300',
  },
  'nav-item-scorecard': {
    id: 'nav-item-scorecard', label: 'Balanced Scorecard', location: 'sidebar',
    description: 'Set objectives and KPIs across four perspectives — Financial, Stakeholder, Internal Process, and Learning & Growth.',
    shortDesc: 'BSC Objectives & KPIs', icon: BarChart3, highlightColor: 'text-rose-300',
  },
  'nav-item-paps': {
    id: 'nav-item-paps', label: 'PAPs Management', location: 'sidebar',
    description: 'Track Priority Action Programs with budget allocation, timelines, ownership, and real-time MEL status updates.',
    shortDesc: 'Programs & Projects', icon: FolderKanban, highlightColor: 'text-blue-300',
  },
  'nav-item-templates': {
    id: 'nav-item-templates', label: 'Templates Library', location: 'sidebar',
    description: 'Start faster with pre-built strategic plan frameworks. Import, customize, and deploy proven BARMM planning templates.',
    shortDesc: 'Reusable Frameworks', icon: Layers, highlightColor: 'text-slate-300',
  },
  'nav-item-team': {
    id: 'nav-item-team', label: 'Team Collaboration', location: 'sidebar',
    description: 'Invite team members with role-based access — Viewer, Editor, or Admin. Real-time cursors and live collaboration included.',
    shortDesc: 'Share & Collaborate', icon: Users, highlightColor: 'text-teal-300',
  },
  'nav-item-export': {
    id: 'nav-item-export', label: 'Plan Generator', location: 'sidebar',
    description: 'Export board-ready reports in PDF, DOCX, or Excel. Toggle sections, add cover pages, and print with professional formatting.',
    shortDesc: 'PDF / DOCX / Excel', icon: FileText, highlightColor: 'text-slate-300',
  },

  // ── Sidebar special items ──
  'nav-item-validation': {
    id: 'nav-item-validation', label: 'Validation Survey', location: 'sidebar',
    description: 'Shape the BIRD 2026–2035 roadmap. Share your insights as a stakeholder — government, private sector, academia, or community leader.',
    shortDesc: 'Stakeholder Feedback', icon: ClipboardCheck, highlightColor: 'text-[#C9A84C]',
  },
  'sidebar-btn-tutorial': {
    id: 'sidebar-btn-tutorial', label: 'Guided Tour', location: 'sidebar',
    description: 'Restart this interactive tutorial anytime to explore platform features and navigation.',
    shortDesc: 'Restart This Tour', icon: HelpCircle, highlightColor: 'text-cyan-300',
  },

  // ── Topbar items ──
  // NOTE: Add id="topbar-plan-selector" to the plan selector button in Topbar.tsx
  'topbar-plan-selector': {
    id: 'topbar-plan-selector', label: 'Plan Selector', location: 'topbar',
    description: 'Switch between your strategic plans or create a new one. All plans auto-save locally and sync to cloud when online.',
    shortDesc: 'Switch Plans', icon: FileDown, highlightColor: 'text-blue-300',
  },
  // NOTE: Add id="topbar-btn-validation" to the Validation Survey button in Topbar.tsx
  'topbar-btn-validation': {
    id: 'topbar-btn-validation', label: 'Validation Survey', location: 'topbar',
    description: 'Quick-access button to the stakeholder validation survey. Share feedback that directly shapes the BIRD roadmap.',
    shortDesc: 'Quick Survey Access', icon: ClipboardCheck, highlightColor: 'text-emerald-300',
  },
  // NOTE: Add id="topbar-search-wrapper" to the search div in Topbar.tsx
  'topbar-search-wrapper': {
    id: 'topbar-search-wrapper', label: 'Global Search', location: 'topbar',
    description: 'Find KPIs, SWOT items, strategic options, and PAPs across every module. Autocomplete suggests results as you type.',
    shortDesc: 'Search All Modules', icon: Search, highlightColor: 'text-cyan-300',
  },
  // NOTE: Add id="topbar-btn-theme" to the theme toggle in Topbar.tsx
  'topbar-btn-theme': {
    id: 'topbar-btn-theme', label: 'Theme Toggle', location: 'topbar',
    description: 'Switch between light and dark mode. Your preference saves automatically across sessions.',
    shortDesc: 'Light / Dark Mode', icon: Moon, highlightColor: 'text-yellow-300',
  },
  // NOTE: Add id="topbar-btn-account" to the account menu trigger in Topbar.tsx
  'topbar-btn-account': {
    id: 'topbar-btn-account', label: 'Account Menu', location: 'topbar',
    description: 'Manage your profile, settings, team access, and sign out. Super admins see the Admin Dashboard link here.',
    shortDesc: 'Profile & Settings', icon: UserIcon, highlightColor: 'text-cyan-300',
  },
  // NOTE: Add id="topbar-btn-share" to the Share button in Topbar.tsx
  'topbar-btn-share': {
    id: 'topbar-btn-share', label: 'Share Plan', location: 'topbar',
    description: 'Generate a shareable link for collaborators. Copy the link or revoke access at any time.',
    shortDesc: 'Shareable Links', icon: Share2, highlightColor: 'text-cyan-300',
  },

  // ── Dashboard panels (from MELDashboard.tsx aria-labelledby IDs) ──
  'panel-a-title': {
    id: 'panel-a-title', label: 'Panel A: Pareto KPIs', location: 'dashboard',
    description: 'Six vital-few KPIs that drive 80% of strategic impact. Each card shows current value, target, progress ring, and delta trend.',
    shortDesc: '6 Critical KPIs', icon: Target, highlightColor: 'text-cyan-300',
  },
  'panel-b-title': {
    id: 'panel-b-title', label: 'Panel B: Leverage Points', location: 'dashboard',
    description: 'Balanced Scorecard leverage points (LP1–LP5) across Financial, Stakeholder, Internal Process, and Learning & Growth perspectives.',
    shortDesc: 'BSC Leverage Points', icon: BarChart3, highlightColor: 'text-rose-300',
  },
  'panel-c-title': {
    id: 'panel-c-title', label: 'Panel C: Action Board', location: 'dashboard',
    description: 'Priority Action Plan 2026 with full budget tracking, ownership assignment, due dates, and MEL status indicators.',
    shortDesc: 'Priority Actions 2026', icon: FolderKanban, highlightColor: 'text-blue-300',
  },
  'panel-e-title': {
    id: 'panel-e-title', label: 'Panel E: Phase Tracker', location: 'dashboard',
    description: 'Three-phase ₱120–160B implementation roadmap through 2035. Track milestones, budgets, and completion status per phase.',
    shortDesc: '3-Phase Roadmap', icon: Compass, highlightColor: 'text-purple-300',
  },
};

// ─── TUTORIAL STEPS ─────────────────────────────────────────────────────
// Each step maps to a NAV_CATALOG entry via elementId.
// Copy follows: active voice, benefits-first, specific numbers.

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: 'Welcome to BIRD 2026–2035',
    subtitle: 'Your Strategic Planning Command Center',
    description:
      'BIRD is the Bangsamoro Investment Roadmap Development platform for BOI-MTIT. This 2-minute tour shows you where every tool lives and what it does — so you can move from insight to action faster.',
    icon: Sparkles,
    viewId: null,
    elementId: null, // Intro step — no specific element
    tips: [
      'All data auto-saves to your device and syncs when you are online',
      'Use the sidebar (left) for main modules, the topbar for quick actions',
      'Every panel on the dashboard updates in real time as you edit',
    ],
    gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
    accentFrom: '#06b6d4',
    accentTo: '#6366f1',
  },
  {
    title: 'Sidebar Navigation',
    subtitle: 'Your Module Launcher',
    description:
      'The sidebar on the left holds every major module. Each icon opens a different part of the strategic planning workflow — from diagnostics to board-ready reports.',
    icon: LayoutDashboard,
    viewId: null,
    elementId: 'nav-item-dashboard',
    tips: [
      'Collapse the sidebar for more workspace (click the arrow at bottom)',
      'The gold Validation Survey button is always visible at the top',
      'Your current plan name shows under "Current Focus"',
    ],
    gradient: 'from-blue-500 via-blue-600 to-blue-700',
    accentFrom: '#3b82f6',
    accentTo: '#1d4ed8',
  },
  {
    title: 'MEL Dashboard',
    subtitle: 'Monitor, Evaluate, Learn',
    description: NAV_CATALOG['nav-item-dashboard'].description,
    icon: Target,
    viewId: 'dashboard',
    elementId: 'nav-item-dashboard',
    tips: [
      'Panel A: 6 Pareto KPIs with animated progress rings',
      'Panel B: BSC leverage points across 4 perspectives',
      'Panel C: Priority Action Board with budget tracking',
      'Panel E: 3-phase ₱120–160B roadmap through 2035',
    ],
    gradient: 'from-emerald-500 via-teal-600 to-teal-700',
    accentFrom: '#10b981',
    accentTo: '#0d9488',
    phase: 'Foundation',
    phaseColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    title: 'SWOT Analysis',
    subtitle: 'Structured 5-Cluster Diagnostics',
    description: NAV_CATALOG['nav-item-swot'].description,
    icon: Target,
    viewId: 'swot',
    elementId: 'nav-item-swot',
    tips: [
      'Assess Foundations, Transformers, Enablers, Connectors, and Financiers',
      'AI suggests relevant factors based on BARMM sector data',
      'Results feed directly into the Strategy Matrix',
    ],
    gradient: 'from-emerald-500 via-green-600 to-green-700',
    accentFrom: '#10b981',
    accentTo: '#16a34a',
    phase: 'Phase 1',
    phaseColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    title: 'Systems Thinking',
    subtitle: 'See the Whole System',
    description: NAV_CATALOG['nav-item-systems'].description,
    icon: Network,
    viewId: 'systems',
    elementId: 'nav-item-systems',
    tips: [
      'Matrix View: Score interdependencies between clusters',
      'CLD View: Draw and analyze feedback loops visually',
      '10 archetypes including "Fixes that Fail" and "Tragedy of the Commons"',
    ],
    gradient: 'from-purple-500 via-indigo-600 to-indigo-700',
    accentFrom: '#6366f1',
    accentTo: '#4f46e5',
    phase: 'Phase 1',
    phaseColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    title: 'Strategy Matrix',
    subtitle: 'Turn Insights into Action',
    description: NAV_CATALOG['nav-item-strategy'].description,
    icon: Sparkles,
    viewId: 'strategy',
    elementId: 'nav-item-strategy',
    tips: [
      'SO strategies: Offensive plays using strengths',
      'ST strategies: Defensive moves against threats',
      'WO & WT: Turnaround and survival strategies',
    ],
    gradient: 'from-amber-500 via-orange-500 to-orange-600',
    accentFrom: '#f59e0b',
    accentTo: '#ea580c',
    phase: 'Phase 2',
    phaseColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    title: 'Balanced Scorecard',
    subtitle: 'Measure What Matters',
    description: NAV_CATALOG['nav-item-scorecard'].description,
    icon: BarChart3,
    viewId: 'scorecard',
    elementId: 'nav-item-scorecard',
    tips: [
      'AI recommends KPIs based on your objectives',
      'Set Baseline, Target, and Current values per KPI',
      'Auto-calculates On Track / At Risk / Behind status',
    ],
    gradient: 'from-rose-500 via-pink-600 to-pink-700',
    accentFrom: '#f43f5e',
    accentTo: '#db2777',
    phase: 'Phase 3',
    phaseColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  },
  {
    title: 'PAPs Management',
    subtitle: 'Track Programs & Projects',
    description: NAV_CATALOG['nav-item-paps'].description,
    icon: FolderKanban,
    viewId: 'paps',
    elementId: 'nav-item-paps',
    tips: [
      'Assign ownership, budgets, and due dates per action',
      'Filter by priority: Critical, High, or Quarter',
      'Link PAPs directly to strategic objectives',
    ],
    gradient: 'from-blue-500 via-indigo-600 to-indigo-700',
    accentFrom: '#3b82f6',
    accentTo: '#4f46e5',
    phase: 'Phase 4',
    phaseColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    title: 'Validation Survey',
    subtitle: 'Shape the Roadmap',
    description: NAV_CATALOG['nav-item-validation'].description,
    icon: ClipboardCheck,
    viewId: 'validation',
    elementId: 'nav-item-validation',
    tips: [
      'Takes about 5–10 minutes to complete',
      'Responses are confidential under the Data Privacy Act of 2012',
      'Available from both sidebar and topbar for quick access',
    ],
    gradient: 'from-[#C9A84C] via-[#B8943F] to-[#7a5c1e]',
    accentFrom: '#C9A84C',
    accentTo: '#E8C560',
    phase: 'Feedback',
    phaseColor: 'bg-[#C9A84C]/20 text-[#E8C560] border-[#C9A84C]/30',
  },
  {
    title: 'Topbar Quick Actions',
    subtitle: 'Search, Share, Switch Plans',
    description:
      'The top bar is for actions you use often: search across all modules, share your plan with a link, switch between plans, or toggle dark mode.',
    icon: Search,
    viewId: null,
    elementId: 'topbar-search-wrapper',
    tips: [
      'Search finds KPIs, SWOT items, strategies, and PAPs instantly',
      'Plan selector lets you switch between multiple strategic plans',
      'Account menu holds settings, profile, and admin access',
    ],
    gradient: 'from-slate-500 via-slate-600 to-slate-700',
    accentFrom: '#64748b',
    accentTo: '#475569',
  },
  {
    title: 'Export & Deliver',
    subtitle: 'Generate Board-Ready Reports',
    description: NAV_CATALOG['nav-item-export'].description,
    icon: FileText,
    viewId: 'export',
    elementId: 'nav-item-export',
    tips: [
      'Toggle which sections appear: Cover, SWOT, PAPs, Scorecard',
      'Preview and edit inline before downloading',
      'Print-ready PDF formatting with professional layout',
    ],
    gradient: 'from-slate-500 via-gray-600 to-gray-700',
    accentFrom: '#64748b',
    accentTo: '#475569',
    phase: 'Deliver',
    phaseColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  },
  {
    title: 'You are Ready',
    subtitle: 'Start Building the Emerging Bangsamoro',
    description:
      'You now know where every tool lives. Start with the MEL Dashboard to see the big picture, then dive into SWOT or Systems Thinking to begin your strategic diagnostic.',
    icon: Sparkles,
    viewId: null,
    elementId: null,
    tips: [
      'Click "Guided Tour" in the sidebar anytime to revisit this walkthrough',
      'All your work auto-saves locally and syncs when online',
      'Your input shapes the Bangsamoro Investment Roadmap 2026–2035',
    ],
    gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
    accentFrom: '#06b6d4',
    accentTo: '#6366f1',
  },
];

// ─── Props ──────────────────────────────────────────────────────────────

interface NavigationTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  onNavigate?: (view: string) => void;
}

// ─── Mini Nav Preview ───────────────────────────────────────────────────
// Shows a tiny visual map of sidebar + topbar, highlighting current item.

const MiniNavPreview: React.FC<{
  activeElementId: string | null;
  onElementClick?: (id: string) => void;
}> = ({ activeElementId, onElementClick }) => {
  const sidebarItems = Object.values(NAV_CATALOG).filter(e => e.location === 'sidebar');
  const topbarItems = Object.values(NAV_CATALOG).filter(e => e.location === 'topbar');

  return (
    <TooltipProvider>
      <div className="hidden lg:flex flex-col gap-3 w-56 flex-shrink-0">
        {/* Mini Topbar */}
        <div className="rounded-lg border border-white/10 bg-[#0A1628]/80 p-2.5 space-y-1.5">
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Topbar</p>
          <div className="flex flex-wrap gap-1">
            {topbarItems.slice(0, 6).map(el => {
              const isActive = el.id === activeElementId;
              const Icon = el.icon;
              return (
                <Tooltip key={el.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onElementClick?.(el.id)}
                      className={cn(
                        "w-7 h-7 rounded-md flex items-center justify-center transition-all",
                        isActive
                          ? "bg-cyan-500/30 border border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                          : "bg-white/5 border border-white/5 hover:bg-white/10"
                      )}
                    >
                      <Icon className={cn("w-3.5 h-3.5", isActive ? "text-cyan-300" : "text-slate-500")} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{el.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Mini Sidebar */}
        <div className="rounded-lg border border-white/10 bg-slate-900/80 p-2.5 flex-1 space-y-0.5 overflow-y-auto">
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Sidebar</p>
          {sidebarItems.map(el => {
            const isActive = el.id === activeElementId;
            const Icon = el.icon;
            return (
              <Tooltip key={el.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onElementClick?.(el.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-all text-left",
                      isActive
                        ? "bg-cyan-600/30 border border-cyan-400/40"
                        : "hover:bg-white/5 border border-transparent"
                    )}
                  >
                    <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", isActive ? "text-cyan-300" : "text-slate-500")} />
                    <span className={cn("text-[10px] font-medium truncate", isActive ? "text-cyan-200" : "text-slate-400")}>
                      {el.label}
                    </span>
                    {isActive && <div className="ml-auto w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{el.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Location indicator */}
        {activeElementId && NAV_CATALOG[activeElementId] && (
          <div className="text-center">
            <span className="text-[9px] text-slate-500 uppercase tracking-wider">
              {NAV_CATALOG[activeElementId].location} &bull; {NAV_CATALOG[activeElementId].shortDesc}
            </span>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

// ─── Spotlight Overlay ──────────────────────────────────────────────────
// Creates a dark overlay with a transparent cutout around the target element.
// Uses box-shadow technique for reliable cross-browser support.

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
        const r = el.getBoundingClientRect();
        setBox({ top: r.top, left: r.left, width: r.width, height: r.height });
      } else {
        setBox(null);
      }
    };

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [elementId, isVisible]);

  if (!isVisible || !box) return null;

  const pad = 8;
  const t = box.top - pad;
  const l = box.left - pad;
  const w = box.width + pad * 2;
  const h = box.height + pad * 2;

  return (
    <div
      className="fixed inset-0 z-[95] pointer-events-none"
      style={{ background: 'rgba(0,0,0,0.55)' }}
    >
      {/* Transparent cutout using an absolutely positioned div with negative box-shadow */}
      <div
        className="absolute rounded-lg border-2 border-cyan-400/60"
        style={{
          top: t,
          left: l,
          width: w,
          height: h,
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.55), 0 0 20px rgba(6,182,212,0.3)',
          background: 'transparent',
        }}
      />
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────

const NavigationTutorial: React.FC<NavigationTutorialProps> = ({
  isOpen,
  onClose,
  onComplete,
  onNavigate,
}) => {
  const [step, setStep] = useState(0);
  const [animDir, setAnimDir] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const current = TUTORIAL_STEPS[step];
  const totalSteps = TUTORIAL_STEPS.length;
  const progress = (step / (totalSteps - 1)) * 100;
  const catalogEntry = current.elementId ? NAV_CATALOG[current.elementId] : null;

  useEffect(() => { if (isOpen) setStep(0); }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, step]);

  const transition = useCallback((newStep: number, dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimDir(dir);
    setTimeout(() => { setStep(newStep); setIsAnimating(false); }, 180);
  }, [isAnimating]);

  const goNext = useCallback(() => {
    if (step === totalSteps - 1) { onComplete?.(); onClose(); }
    else transition(step + 1, 'next');
  }, [step, totalSteps, onComplete, onClose, transition]);

  const goPrev = useCallback(() => {
    if (step > 0) transition(step - 1, 'prev');
  }, [step, transition]);

  const handleSkip = () => { onComplete?.(); onClose(); };

  const handleTryIt = () => {
    if (current.viewId === 'validation') {
      window.open('https://bird-app.bolt.host/validation-survey', '_blank', 'noopener,noreferrer');
      onClose();
    } else if (current.viewId && onNavigate) {
      onNavigate(current.viewId);
      onClose();
    }
  };

  const jumpToStep = (idx: number) => {
    if (idx !== step) transition(idx, idx > step ? 'next' : 'prev');
  };

  const isFirst = step === 0;
  const isLast = step === totalSteps - 1;
  const hasTryIt = !!current.viewId;

  return (
    <>
      {/* Spotlight behind the modal */}
      <SpotlightOverlay elementId={current.elementId} isVisible={isOpen} />

      <Dialog open={isOpen} onOpenChange={(open) => !open && handleSkip()}>
        <DialogContent
          className="max-w-4xl w-full p-0 gap-0 overflow-hidden [&>button:last-of-type]:hidden"
          style={{
            background: 'linear-gradient(165deg, #0d1f3c 0%, #0a1628 60%, #07111e 100%)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset',
          }}
        >
          <style>{`
            @keyframes tutSlideInRight { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes tutSlideInLeft { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes tutFadeInScale { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}</style>

          <div className="flex items-start gap-4">
            {/* Mini Nav Preview (desktop only) */}
            <MiniNavPreview
              activeElementId={current.elementId}
              onElementClick={(id) => {
                const idx = TUTORIAL_STEPS.findIndex(s => s.elementId === id);
                if (idx >= 0) jumpToStep(idx);
              }}
            />

            <div
              className="relative flex-1"
              style={{
                animation: isAnimating
                  ? animDir === 'next' ? 'tutSlideInRight 0.2s ease-out' : 'tutSlideInLeft 0.2s ease-out'
                  : 'tutFadeInScale 0.3s ease-out',
              }}
            >
              {/* Close */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkip}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full hover:scale-110 transition-all"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <X className="w-3.5 h-3.5 text-slate-400" />
              </Button>

              {/* Header */}
              <DialogHeader className="px-6 pt-6 pb-4 space-y-0">
                <div className="flex items-start gap-4 mb-3">
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br",
                    current.gradient
                  )}>
                    <current.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {current.phase && (
                      <Badge variant="outline" className={cn(
                        "mb-1.5 text-[10px] font-bold uppercase tracking-wider",
                        current.phaseColor
                      )}>
                        {current.phase}
                      </Badge>
                    )}
                    <DialogTitle className="text-lg font-bold text-white leading-tight">{current.title}</DialogTitle>
                    <DialogDescription className="text-xs text-slate-500 mt-0.5">{current.subtitle}</DialogDescription>
                  </div>
                  <div className="flex-shrink-0 text-right pt-0.5 text-xs font-bold text-slate-500 tabular-nums">
                    {step + 1} / {totalSteps}
                  </div>
                </div>

                {/* Progress */}
                <Progress
                  value={progress}
                  className="h-0.5 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-[var(--accent-from)] [&>div]:to-[var(--accent-to)]"
                  style={{ '--accent-from': current.accentFrom, '--accent-to': current.accentTo } as Record<string, string>}
                />
              </DialogHeader>

              <Separator className="bg-white/5" />

              {/* Body */}
              <div className="px-6 py-5">
                {/* Catalog element info (if this step targets a specific UI element) */}
                {catalogEntry && (
                  <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-white/[0.04] border border-white/[0.07]">
                    <catalogEntry.icon className={cn("w-5 h-5 flex-shrink-0", catalogEntry.highlightColor)} />
                    <div>
                      <p className="text-sm font-semibold text-white">{catalogEntry.label}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {catalogEntry.location} navigation &bull; {catalogEntry.shortDesc}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "ml-auto text-[10px] font-bold uppercase",
                        catalogEntry.location === 'sidebar'
                          ? "bg-blue-500/10 text-blue-300 border-blue-500/20"
                          : catalogEntry.location === 'topbar'
                            ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                            : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                      )}
                    >
                      {catalogEntry.location}
                    </Badge>
                  </div>
                )}

                {/* Highlight */}
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className={cn("w-4 h-4 flex-shrink-0", catalogEntry?.highlightColor || 'text-cyan-300')} />
                  <span className={cn("text-sm font-semibold", catalogEntry?.highlightColor || 'text-cyan-300')}>
                    {catalogEntry ? catalogEntry.description : current.description}
                  </span>
                </div>

                {!catalogEntry && (
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">{current.description}</p>
                )}

                {/* Tips */}
                <div className="rounded-lg p-4 mb-5 space-y-2.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Key Features</p>
                  {current.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: current.accentFrom }} />
                      <span className="text-xs text-slate-400 leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-2">
                    {isFirst ? (
                      <Button variant="ghost" size="sm" onClick={handleSkip} className="text-xs font-medium text-slate-600 hover:text-slate-400">
                        Skip Tour
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goPrev}
                        className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border-white/10"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" /> Back
                      </Button>
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
                            background: i === step ? current.accentFrom : 'rgba(255,255,255,0.12)',
                            opacity: i === step ? 1 : 0.4,
                          }}
                          aria-label={`Go to step ${i + 1}`}
                        />
                      ))}
                    </div>

                    {/* Try It button (navigates to the view) */}
                    {hasTryIt && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleTryIt}
                        className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30"
                      >
                        <ArrowRight className="w-3.5 h-3.5" /> Try It
                      </Button>
                    )}

                    {/* Next / Finish */}
                    <Button
                      variant="default"
                      size="sm"
                      onClick={goNext}
                      className="flex items-center gap-2 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${current.accentFrom}, ${current.accentTo})` }}
                    >
                      {isLast ? (
                        <><Sparkles className="w-3.5 h-3.5" /> Finish</>
                      ) : (
                        <>Next <ChevronRight className="w-3.5 h-3.5" /></>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/5" />

              {/* Footer */}
              <DialogFooter className="px-6 py-3 bg-black/20 border-t border-white/5 flex-row justify-between text-[11px] text-slate-600">
                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> BIRD Guide</span>
                <span className="font-mono">Arrow Keys Navigate</span>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavigationTutorial;
