import React, { useState, useRef, useEffect } from 'react';
import {
  Search, X, Share2, Moon, Sun, FileText, ChevronDown,
  LogOut, User, Settings, Shield, Download, Upload,
  ClipboardCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';

// ─── Types ──────────────────────────────────────────────────────────────

interface TopbarProps {
  planName: string;
  plans: string[];
  onPlanChange: (plan: string) => void;
  onCreatePlan: () => void;
  onShare: () => void;
  isAuthenticated: boolean;
  userInitials: string;
  userRole: string;
  onLogout: () => void;
  onShowProfile: () => void;
  onShowSettings: () => void;
  onShowAdmin?: () => void;
  isAdmin: boolean;
  currentPlan: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchResults: Array<{ id: string; title: string; type: string }>;
  onSearchSelect: (id: string) => void;
}

// ─── Component ──────────────────────────────────────────────────────────

const Topbar: React.FC<TopbarProps> = ({
  planName,
  plans,
  onPlanChange,
  onCreatePlan,
  onShare,
  isAuthenticated,
  userInitials,
  userRole,
  onLogout,
  onShowProfile,
  onShowSettings,
  onShowAdmin,
  isAdmin,
  currentPlan,
  searchQuery,
  onSearchChange,
  searchResults,
  onSearchSelect,
}) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const ThemeIcon = isDark ? Sun : Moon;

  const [showPlanSelector, setShowPlanSelector] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

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

  return (
    <header className="h-16 border-b border-white/5 bg-[#0d1f3c]/80 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-50">
      {/* ── Left: Plan Selector ── */}
      <div className="flex items-center gap-3" ref={planRef}>
        <button
          id="topbar-plan-selector"
          onClick={() => setShowPlanSelector((v) => !v)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium text-slate-200"
        >
          <FileText className="w-4 h-4 text-blue-400" />
          <span className="max-w-[140px] truncate hidden sm:inline">{planName || 'Select Plan'}</span>
          <ChevronDown className={cn("w-3.5 h-3.5 text-slate-500 transition-transform", showPlanSelector && "rotate-180")} />
        </button>

        {/* Plan dropdown */}
        {showPlanSelector && (
          <div className="absolute top-14 left-4 w-64 rounded-xl border border-white/10 bg-[#0d1f3c] shadow-2xl shadow-black/40 py-2 z-50">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-white/5 mb-1">
              Your Plans
            </div>
            {plans.map((p) => (
              <button
                key={p}
                onClick={() => { onPlanChange(p); setShowPlanSelector(false); }}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                  p === planName ? "text-cyan-300 bg-cyan-500/10" : "text-slate-300 hover:bg-white/5"
                )}
              >
                <FileText className="w-4 h-4" />
                <span className="truncate">{p}</span>
              </button>
            ))}
            <div className="border-t border-white/5 mt-1 pt-1">
              <button
                onClick={() => { onCreatePlan(); setShowPlanSelector(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-emerald-400 hover:bg-white/5 transition-colors"
              >
                <span className="text-lg leading-none">+</span> New Plan
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-2">
        {/* Share */}
        {isAuthenticated && currentPlan && (
          <button
            id="topbar-btn-share"
            onClick={onShare}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 rounded-xl text-xs font-bold border border-cyan-500/30 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        )}

        {/* Validation Survey */}
        {isAuthenticated && (
          <button
            id="topbar-btn-validation"
            onClick={() => window.open('https://bird-app.bolt.host/validation-survey', '_blank', 'noopener,noreferrer')}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 text-[#C9A84C] rounded-xl text-xs font-bold border border-[#C9A84C]/30 transition-colors"
            title="Validation Survey"
          >
            <ClipboardCheck className="w-4 h-4" /> Survey
          </button>
        )}

        {/* Search */}
        <div className="relative" ref={searchRef} id="topbar-search-wrapper">
          {/* Mobile search toggle */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            onClick={() => setShowMobileSearch((v) => !v)}
          >
            {showMobileSearch ? <X className="w-4 h-4 text-slate-400" /> : <Search className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Desktop search input */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search KPIs, SWOT, PAPs..."
              className="w-56 lg:w-72 pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.07] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search results dropdown */}
          {searchQuery && searchResults.length > 0 && (
            <div className="absolute top-12 right-0 w-80 rounded-xl border border-white/10 bg-[#0d1f3c] shadow-2xl shadow-black/40 py-2 z-50">
              {searchResults.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { onSearchSelect(r.id); onSearchChange(''); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition-colors text-left"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">
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
          <ThemeIcon className="w-4 h-4 text-slate-400" />
        </button>

        {/* Account menu */}
        <div className="relative" ref={accountRef}>
          <button
            id="topbar-btn-account"
            onClick={() => setShowAccountMenu((v) => !v)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xs font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            {userInitials}
          </button>

          {/* Account dropdown */}
          {showAccountMenu && (
            <div className="absolute top-12 right-0 w-56 rounded-xl border border-white/10 bg-[#0d1f3c] shadow-2xl shadow-black/40 py-2 z-50">
              <div className="px-4 py-2 border-b border-white/5 mb-1">
                <p className="text-sm font-semibold text-white">{userInitials}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{userRole}</p>
              </div>
              <button
                onClick={() => { onShowProfile(); setShowAccountMenu(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 transition-colors"
              >
                <User className="w-4 h-4" /> Profile
              </button>
              <button
                onClick={() => { onShowSettings(); setShowAccountMenu(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 transition-colors"
              >
                <Settings className="w-4 h-4" /> Settings
              </button>
              {isAdmin && onShowAdmin && (
                <button
                  onClick={() => { onShowAdmin(); setShowAccountMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-amber-400 hover:bg-white/5 transition-colors"
                >
                  <Shield className="w-4 h-4" /> Admin Dashboard
                </button>
              )}
              <div className="border-t border-white/5 mt-1 pt-1">
                <button
                  onClick={() => { onLogout(); setShowAccountMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:bg-white/5 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
