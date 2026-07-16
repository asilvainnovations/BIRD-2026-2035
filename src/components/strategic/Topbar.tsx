import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, X, Moon, Sun, FileText, ChevronDown,
  LogOut, User, Settings, Shield,
  ClipboardCheck, Menu, LogIn,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';
import type { StrategicPlan } from '@/lib/strategicPlanStore';

// ─── Types ──────────────────────────────────────────────────────────────

interface TopbarProps {
  plans: StrategicPlan[];
  currentPlan: StrategicPlan | null;
  onSelectPlan: (id: string) => void;
  onOpenMobileMenu: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userEmail?: string;
  userName: string;
  userInitials: string;
  onSignIn: () => void;
  onSignOut: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onNavigateView: (view: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  type: string;
  view: string;
}

// ─── Component ──────────────────────────────────────────────────────────

const Topbar: React.FC<TopbarProps> = ({
  plans,
  currentPlan,
  onSelectPlan,
  onOpenMobileMenu,
  isAuthenticated,
  isAdmin,
  userEmail,
  userName,
  userInitials,
  onSignIn,
  onSignOut,
  onOpenProfile,
  onOpenSettings,
  onNavigateView,
}) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  // Effective theme: resolve 'system' through the OS preference so the
  // toggle icon always reflects what's actually rendered.
  const isDark = theme === 'dark' || (
    theme === 'system' &&
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const ThemeIcon = isDark ? Sun : Moon;

  const [showPlanSelector, setShowPlanSelector] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const planRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (planRef.current && !planRef.current.contains(e.target as Node)) {
        setShowPlanSelector(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // ── Client-side search across the current plan's artefacts ──────────
  const searchResults: SearchResult[] = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || !currentPlan) return [];
    const results: SearchResult[] = [];
    for (const item of currentPlan.swotItems ?? []) {
      if (item.description?.toLowerCase().includes(q)) {
        results.push({ id: item.id, title: item.description, type: item.category, view: 'swot' });
      }
    }
    for (const opt of currentPlan.strategicOptions ?? []) {
      if (opt.title?.toLowerCase().includes(q) || opt.description?.toLowerCase().includes(q)) {
        results.push({ id: opt.id, title: opt.title, type: opt.optionType, view: 'strategy' });
      }
    }
    for (const obj of currentPlan.objectives ?? []) {
      if (obj.objective?.toLowerCase().includes(q)) {
        results.push({ id: obj.id, title: obj.objective, type: obj.perspective, view: 'scorecard' });
      }
      for (const kpi of obj.kpis ?? []) {
        if (kpi.name?.toLowerCase().includes(q)) {
          results.push({ id: kpi.id, title: kpi.name, type: 'kpi', view: 'scorecard' });
        }
      }
    }
    for (const pap of currentPlan.paps ?? []) {
      if (pap.name?.toLowerCase().includes(q) || pap.description?.toLowerCase().includes(q)) {
        results.push({ id: pap.id, title: pap.name, type: pap.papType, view: 'paps' });
      }
    }
    return results.slice(0, 12);
  }, [searchQuery, currentPlan]);

  const handleSearchSelect = (r: SearchResult) => {
    onNavigateView(r.view);
    setSearchQuery('');
    setShowMobileSearch(false);
  };

  const planName = currentPlan?.name ?? '';

  return (
    <header className="h-16 border-b border-white/5 bg-[#022c22]/80 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-50">
      {/* ── Left: Mobile menu + Plan Selector ── */}
      <div className="flex items-center gap-3" ref={planRef}>
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-4 h-4 text-[#64748b]/80" />
        </button>

        <button
          id="topbar-plan-selector"
          onClick={() => setShowPlanSelector((v) => !v)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium text-[#ecfdf5]/90"
        >
          <FileText className="w-4 h-4 text-[#C9A84C]" />
          <span className="max-w-[140px] truncate hidden sm:inline">{planName || 'Select Plan'}</span>
          <ChevronDown className={cn("w-3.5 h-3.5 text-[#64748b] transition-transform", showPlanSelector && "rotate-180")} />
        </button>

        {/* Plan dropdown */}
        {showPlanSelector && (
          <div className="absolute top-14 left-4 w-64 rounded-xl border border-white/10 bg-[#022c22] shadow-2xl shadow-black/40 py-2 z-50">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#64748b] border-b border-white/5 mb-1">
              Your Plans
            </div>
            {plans.map((p) => (
              <button
                key={p.id}
                onClick={() => { onSelectPlan(p.id); setShowPlanSelector(false); }}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                  p.id === currentPlan?.id ? "text-[#E8C560] bg-[#C9A84C]/10" : "text-[#64748b] hover:bg-white/5"
                )}
              >
                <FileText className="w-4 h-4" />
                <span className="truncate">{p.name}</span>
              </button>
            ))}
            {plans.length === 0 && (
              <p className="px-3 py-2 text-xs text-[#64748b]">No plans yet.</p>
            )}
            <div className="border-t border-white/5 mt-1 pt-1">
              <button
                onClick={() => { onNavigateView('templates'); setShowPlanSelector(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#6ee7b7] hover:bg-white/5 transition-colors"
              >
                <span className="text-lg leading-none">+</span> New Plan
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-2">
        {/* Validation Survey */}
        <button
          id="topbar-btn-validation"
          onClick={() => onNavigateView('validation')}
          className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 text-[#C9A84C] rounded-xl text-xs font-bold border border-[#C9A84C]/30 transition-colors"
          title="Validation Survey (opens in new tab)"
        >
          <ClipboardCheck className="w-4 h-4" /> Survey
        </button>

        {/* Search */}
        <div className="relative" ref={searchRef} id="topbar-search-wrapper">
          {/* Mobile search toggle */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            onClick={() => setShowMobileSearch((v) => !v)}
          >
            {showMobileSearch ? <X className="w-4 h-4 text-[#64748b]/80" /> : <Search className="w-4 h-4 text-[#64748b]/80" />}
          </button>

          {/* Desktop search input */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-[#64748b] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search KPIs, SWOT, PAPs..."
              className="w-56 lg:w-72 pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-[#ecfdf5]/90 placeholder:text-[#ecfdf5]/80 focus:outline-none focus:border-[#C9A84C]/40 focus:bg-white/[0.07] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[#64748b] hover:text-[#64748b]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile search input */}
          {showMobileSearch && (
            <div className="absolute top-12 right-0 w-72 md:hidden flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-[#64748b] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search KPIs, SWOT, PAPs..."
                autoFocus
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#022c22] border border-white/10 text-sm text-[#ecfdf5]/90 placeholder:text-[#ecfdf5]/80 focus:outline-none focus:border-[#C9A84C]/40 transition-colors"
              />
            </div>
          )}

          {/* Search results dropdown */}
          {searchQuery && searchResults.length > 0 && (
            <div className="absolute top-12 right-0 w-80 rounded-xl border border-white/10 bg-[#022c22] shadow-2xl shadow-black/40 py-2 z-50">
              {searchResults.map((r) => (
                <button
                  key={`${r.type}-${r.id}`}
                  onClick={() => handleSearchSelect(r)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#64748b] hover:bg-white/5 transition-colors text-left"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] bg-white/5 px-1.5 py-0.5 rounded">
                    {r.type}
                  </span>
                  <span className="truncate">{r.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Theme toggle */}
        <button
          id="topbar-btn-theme"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <ThemeIcon className="w-4 h-4 text-[#64748b]/80" />
        </button>

        {/* Account menu / Sign in */}
        {isAuthenticated ? (
          <div className="relative" ref={accountRef}>
            <button
              id="topbar-btn-account"
              onClick={() => setShowAccountMenu((v) => !v)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#064e3b] text-white text-xs font-bold hover:shadow-lg hover:shadow-[#C9A84C]/20 transition-all"
            >
              {userInitials}
            </button>

            {/* Account dropdown */}
            {showAccountMenu && (
              <div className="absolute top-12 right-0 w-56 rounded-xl border border-white/10 bg-[#022c22] shadow-2xl shadow-black/40 py-2 z-50">
                <div className="px-4 py-2 border-b border-white/5 mb-1">
                  <p className="text-sm font-semibold text-white truncate">{userName}</p>
                  <p className="text-[10px] text-[#64748b] truncate">{userEmail}</p>
                  <p className="text-[10px] text-[#64748b] uppercase tracking-wider">{isAdmin ? 'admin' : 'member'}</p>
                </div>
                <button
                  onClick={() => { onOpenProfile(); setShowAccountMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#64748b] hover:bg-white/5 transition-colors"
                >
                  <User className="w-4 h-4" /> Profile
                </button>
                <button
                  onClick={() => { onOpenSettings(); setShowAccountMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#64748b] hover:bg-white/5 transition-colors"
                >
                  <Settings className="w-4 h-4" /> Settings
                </button>
                {isAdmin && (
                  <button
                    onClick={() => { navigate('/admin'); setShowAccountMenu(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-amber-400 hover:bg-white/5 transition-colors"
                  >
                    <Shield className="w-4 h-4" /> Admin Dashboard
                  </button>
                )}
                <div className="border-t border-white/5 mt-1 pt-1">
                  <button
                    onClick={() => { onSignOut(); setShowAccountMenu(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:bg-white/5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            id="topbar-btn-signin"
            onClick={onSignIn}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#C9A84C] hover:bg-[#E8C560] text-[#022c22] rounded-xl text-xs font-bold transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Topbar;
