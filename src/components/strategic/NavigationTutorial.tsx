import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, LayoutDashboard, Layers, GitBranch, Target, ChartBar as BarChart3, FolderKanban, FileText, Users, BookOpen, Settings, Check, Lightbulb, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

// ─── Types ──────────────────────────────────────────────────────────────

interface TutorialStep {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  viewId: string | null;
  highlight: string;
  highlightColor: string;
  tips: string[];
  gradient: string;
  accentFrom: string;
  accentTo: string;
  phase?: string;
  phaseColor?: string;
  targetElementId: string | null; // NEW: Selector for the live UI element
}

// ─── Configuration & Element Mapping ──────────────────────────────────
// Maps steps to the unique IDs you added in Sidebar/Topbar/Hero/Dashboard

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: 'Welcome to BIRD 2026–2035',
    subtitle: 'Strategic Planning Platform · BOI-MTIT, BARMM',
    description:
      'Your command center for investment roadmaps. We will walk through 9 modules — from diagnostics to board-ready reports.',
    icon: Sparkles,
    viewId: null,
    highlight: 'Emerging Bangsamoro: Resilient & Ethical Growth',
    highlightColor: 'text-cyan-300',
    targetElementId: 'hero-btn-start-planning', // Focuses attention here implicitly
    tips: [
      'Three Phases: Foundation → Acceleration → Consolidation',
      'Use the sidebar for anytime navigation',
      'Auto-save enabled locally and synced to cloud',
    ],
    gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
    accentFrom: '#06b6d4',
    accentTo: '#6366f1',
  },
  {
    title: 'Sidebar Navigation',
    subtitle: 'Access Any Module Instantly',
    description:
      'The primary navigation hub. Switch between Strategy, Systems Thinking, and Reporting views quickly.',
    icon: LayoutDashboard,
    viewId: null,
    highlight: 'Quick access to all tools',
    highlightColor: 'text-blue-300',
    targetElementId: 'nav-item-dashboard', // Targets the Dashboard link specifically
    tips: [
      'Dashboard (MEL): Monitor real-time KPIs',
      'Systems Thinking: Map causal loops',
      'Templates: Start faster with pre-built frameworks',
    ],
    gradient: 'from-blue-500 via-blue-600 to-blue-700',
    accentFrom: '#3b82f6',
    accentTo: '#1d4ed8',
  },
  {
    title: 'MEL Dashboard (KPIs)',
    subtitle: 'Monitor · Evaluate · Learn',
    description:
      'Track all 20 BSC KPIs, Phase milestones, and Priority Actions in one place.',
    icon: Target,
    viewId: 'dashboard',
    highlight: 'Real-time Command Center',
    highlightColor: 'text-blue-300',
    targetElementId: 'mel-panel-kpis', // Highlights the KPI Panel
    tips: [
      'Panel A: Pareto KPIs with progress rings',
      'Panel B: Financial & Stakeholder Objectives',
      'Panel C: Budget Tracking & Burn Rate',
    ],
    gradient: 'from-emerald-500 via-teal-600 to-teal-700',
    accentFrom: '#10b981',
    accentTo: '#0d9488',
    phase: 'Phase 1',
    phaseColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    title: 'Validation Survey',
    subtitle: 'Provide Feedback to BIRD Team',
    description:
      'Help us improve the roadmap! Share insights about your experience with the strategic planning process.',
    icon: BookOpen,
    viewId: 'validation',
    highlight: 'Shape the Future Investment Roadmap',
    highlightColor: 'text-emerald-300',
    targetElementId: 'topbar-btn-validation', // Highlights the button in topbar
    tips: [
      'Take ~5 mins',
      'Anonymous responses encouraged',
      'Data informs future BIRD iterations',
    ],
    gradient: 'from-purple-500 via-violet-600 to-violet-700',
    accentFrom: '#a855f7',
    accentTo: '#7c3aed',
    phase: 'Feedback Loop',
    phaseColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    title: 'Search Functionality',
    subtitle: 'Find Data Instantly',
    description:
      'Search across SWOT factors, KPIs, PAPs, and Strategic Options by keyword.',
    icon: Sparkles,
    viewId: null,
    highlight: 'Locate anything in seconds',
    highlightColor: 'text-slate-300',
    targetElementId: 'topbar-search-wrapper', // Highlights the search bar area
    tips: [
      'Filter by module type',
      'Autocomplete suggests items',
      'Jump directly to the section',
    ],
    gradient: 'from-slate-500 via-slate-600 to-slate-700',
    accentFrom: '#64748b',
    accentTo: '#334155',
  },
  {
    title: 'Balanced Scorecard',
    subtitle: 'Define Objectives & KPIs',
    description:
      'Align goals across Financial, Customer, Process, and Growth perspectives.',
    icon: BarChart3,
    viewId: 'scorecard',
    highlight: 'Measure what matters',
    highlightColor: 'text-rose-300',
    targetElementId: 'mel-panel-bsc', // Highlights the BSC Panel
    tips: [
      'AI-suggests relevant KPIs',
      'Set Baseline, Target, Current values',
      'Auto-calculates On Track / At Risk status',
    ],
    gradient: 'from-rose-500 via-pink-600 to-pink-700',
    accentFrom: '#f43f5e',
    accentTo: '#db2777',
    phase: 'Phase 3',
    phaseColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  },
  {
    title: 'Systems Thinking',
    subtitle: 'Causal Loop Diagrams & Archetypes',
    description:
      'Move beyond lists. See root causes, feedback loops, and leverage points.',
    icon: GitBranch,
    viewId: 'systems',
    highlight: 'Visualize Root Causes',
    highlightColor: 'text-purple-300',
    targetElementId: null, // Systems page is too complex for single ID
    tips: [
      'Matrix View: Score interdependencies',
      'CLD View: Draw feedback loops',
      '10 Archetypes (Limits to Growth, Tragedy of Commons, etc.)',
    ],
    gradient: 'from-purple-500 via-indigo-600 to-indigo-700',
    accentFrom: '#6366f1',
    accentTo: '#4f46e5',
    phase: 'Phase 1',
    phaseColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    title: 'Strategy Matrix (TOWS)',
    subtitle: 'Generate Strategic Options',
    description:
      'Derive SO, ST, WO, WT strategies from your diagnostic data.',
    icon: Target,
    viewId: 'strategy',
    highlight: 'Turn Insights into Action',
    highlightColor: 'text-amber-300',
    targetElementId: null,
    tips: [
      'SO: Offensive (Strengths vs Opportunities)',
      'ST: Defensive (Strengths vs Threats)',
      'WO: Turnaround (Weaknesses vs Opportunities)',
    ],
    gradient: 'from-amber-500 via-orange-500 to-orange-600',
    accentFrom: '#f59e0b',
    accentTo: '#ea580c',
    phase: 'Phase 2',
    phaseColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    title: 'Team Collaboration',
    subtitle: 'Invite & Co-Create',
    description:
      'Share workspaces with viewers, editors, or admins. Real-time cursors included.',
    icon: Users,
    viewId: 'team',
    highlight: 'Work Together Effectively',
    highlightColor: 'text-teal-300',
    targetElementId: 'topbar-account-menu-trigger', // Fallback highlight (Account/Settings)
    tips: [
      'Viewer: Read-only',
      'Editor: Edit content',
      'Live Cursors & Comments',
    ],
    gradient: 'from-teal-500 via-emerald-600 to-green-700',
    accentFrom: '#14b8a6',
    accentTo: '#16a34a',
    phase: 'Collaboration',
    phaseColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  },
  {
    title: 'Export & Share',
    subtitle: 'Generate Board-Ready Reports',
    description:
      'Download PDF, DOCX, or Excel plans for stakeholder distribution.',
    icon: FileText,
    viewId: 'export',
    highlight: 'Final Deliverable Quality',
    highlightColor: 'text-slate-300',
    targetElementId: null,
    tips: [
      'Toggle sections: Cover, SWOT, PAPs',
      'Inline preview editing',
      'Print-ready formatting included',
    ],
    gradient: 'from-slate-500 via-gray-600 to-gray-700',
    accentFrom: '#64748b',
    accentTo: '#475569',
    phase: 'Phase 5',
    phaseColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  },
];

// ─── Props ──────────────────────────────────────────────────────────────

interface NavigationTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  onNavigate?: (view: string) => void;
}

// ─── Subcomponent: Spotlight Overlay ────────────────────────────────────

const SpotlightOverlay: React.FC<{ elementId: string | null; isVisible: boolean }> = ({ elementId, isVisible }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number; width: number; height: number; visible: boolean }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  useEffect(() => {
    if (!isVisible || !elementId) return;

    const element = document.getElementById(elementId);
    if (element && ref.current) {
      const rect = element.getBoundingClientRect();
      setPosition({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
        visible: true,
      });
    } else {
      setPosition(prev => ({ ...prev, visible: false }));
    }
  }, [elementId, isVisible]);

  if (!position.visible) return null;

  // Masking logic: Darken everything EXCEPT the spotlight box
  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.7)', // Dimmer outside spotlight
      }}
    >
      <style>
        {`
          #spotlight-mask::after {
            content: '';
            position: absolute;
            top: ${position.y}px;
            left: ${position.x}px;
            width: ${position.width}px;
            height: ${position.height}px;
            background: transparent;
            mix-blend-mode: normal;
            outline: 2px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
            z-index: 100;
          }
        `}
      </style>
      {/* The "Mask" that hides everything except the specific box */}
      <div
        id="spotlight-mask"
        style={{
          clipPath: `polygon(0 0, 100% 0, 100% ${position.y}px, 100% ${position.y + position.height}px, ${position.x + position.width}px 100%, 0 100%)`,
          // NOTE: This simple clippath approach works best for single-element spotlights.
          // For multiple, consider SVG masking or simpler overlay.
          visibility: 'visible'
        }}
        className="w-full h-full bg-[#050e1f] opacity-100"
      >
        {/* Alternative simpler approach: Absolute box centered */}
        <div
          className="absolute border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] bg-transparent rounded-sm"
          style={{
            top: position.y,
            left: position.x,
            width: position.width,
            height: position.height,
            backgroundColor: 'transparent',
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.8)' // Darkens everything else
          }}
        />
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────

const NavigationTutorial: React.FC<NavigationTutorialProps> = ({
  isOpen,
  onClose,
  onComplete,
  onNavigate,
}) => {
  const [step, setStep] = useState(0);
  const [animDir, setAnimDir] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useIsMobile();
  const current = TUTORIAL_STEPS[step];

  useEffect(() => {
    if (isOpen) setStep(0);
  }, [isOpen]);

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
    setTimeout(() => {
      setStep(newStep);
      setIsAnimating(false);
    }, 180);
  }, [isAnimating]);

  const goNext = useCallback(() => {
    const isLast = step === TUTORIAL_STEPS.length - 1;
    if (isLast) {
      onComplete?.();
      onClose();
    } else {
      transition(step + 1, 'next');
    }
  }, [step, onComplete, onClose, transition]);

  const goPrev = useCallback(() => {
    if (step > 0) transition(step - 1, 'prev');
  }, [step, transition]);

  const handleSkip = () => {
    onComplete?.();
    onClose();
  };

  const handleNavigate = () => {
    const currentStep = TUTORIAL_STEPS[step];
    if (currentStep.viewId && onNavigate) {
      onNavigate(currentStep.viewId);
      toast({
        title: `Navigated to ${currentStep.title}`,
        description: currentStep.highlight,
      });
      // Optional: close after navigate or stay open to show the new screen
      // handleClose?.(); 
    }
  };

  if (!isOpen) return null;

  const isFirst = step === 0;
  const isLast = step === TUTORIAL_STEPS.length - 1;
  const totalSteps = TUTORIAL_STEPS.length;
  const progress = ((step) / (totalSteps - 1)) * 100;

  return (
    <>
      {/* Background Spotlight Overlay */}
      {current.targetElementId && (
        <SpotlightOverlay elementId={current.targetElementId} isVisible={isOpen} />
      )}

      <TooltipProvider delayDuration={isMobile ? 0 : 300}>
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-hidden"
          style={{ background: 'rgba(0, 0, 0, 0.40)', backdropFilter: 'blur(2px)' }}
        >
          <div
            className="relative w-full max-w-lg md:max-w-2xl rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500"
            style={{
              background: 'linear-gradient(165deg, #0d1f3c 0%, #0a1628 60%, #07111e 100%)',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset',
              animation: isAnimating
                ? animDir === 'next'
                  ? 'slideInRight 0.2s ease-out'
                  : 'slideInLeft 0.2s ease-out'
                : 'fadeInScale 0.3s ease-out',
            }}
          >
            <style>
              {`
                @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes slideInLeft { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes fadeInScale { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
              `}
            </style>

            {/* Close Button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <X className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Header */}
            <div className="px-6 py-6 border-b border-white/5">
              <div className="flex items-start gap-4 mb-3">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${current.gradient}`}>
                  <current.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                   {current.phase && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-1.5 ${current.phaseColor}`}>
                      {current.phase}
                    </span>
                  )}
                  <h2 className="text-lg font-bold text-white leading-tight">{current.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{current.subtitle}</p>
                </div>
                <div className="flex-shrink-0 text-right pt-0.5 text-xs font-bold text-slate-500 tabular-nums">
                  {step + 1} / {totalSteps}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${current.accentFrom}, ${current.accentTo})`,
                  }}
                />
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className={cn('w-4 h-4 flex-shrink-0', current.highlightColor)} />
                <span className={cn('text-sm font-semibold', current.highlightColor)}>
                  {current.highlight}
                </span>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed mb-5">
                {current.description}
              </p>

              <div className="rounded-lg p-4 mb-6 space-y-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-500">Key Features</p>
                {current.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: current.accentFrom }} />
                    <span className="text-xs text-slate-400">{tip}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-3 mt-6">
                <div className="flex gap-2">
                  {isFirst ? (
                     <button onClick={handleSkip} className="text-xs font-medium text-slate-600 hover:text-slate-400">Skip</button>
                  ) : (
                    <button onClick={goPrev} className="flex items-center gap-1 px-3 py-2 rounded-md text-xs font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10">
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1 mr-auto">
                    {TUTORIAL_STEPS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => i !== step && transition(i, i > step ? 'next' : 'prev')}
                        className={`transition-all duration-300 rounded-full ${i === step ? '' : 'opacity-40'}`}
                        style={{
                          width: i === step ? 12 : 6,
                          height: 6,
                          background: i === step ? current.accentFrom : 'rgba(255,255,255,0.12)',
                        }}
                      />
                    ))}
                  </div>

                  {/* Next / Open Button */}
                  <button
                    onClick={isLast ? handleSkip : handleNavigate} // Changed last action logic
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${current.accentFrom}, ${current.accentTo})` }}
                  >
                    {isLast ? (
                      <>
                        <Sparkles className="w-3.5 h-3.5" /> Finish Tour
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Footer Tip */}
            <div className="px-6 py-3 bg-black/20 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-600">
               <span className="flex items-center gap-1"><BookOpen className="w-3 h-3"/> Help Guide</span>
               <span className="font-mono">← ← Navigate Keys</span>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};

export default NavigationTutorial;
