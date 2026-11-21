import React from 'react';
import {
  LayoutDashboard, Target, Network, Sparkles, BarChart3, FolderKanban, FileText,
  ChevronLeft, ChevronRight, Cloud, Users, Layers, X,
  HelpCircle, ClipboardCheck, Star, Settings, ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MTITLogo } from '@/components/branding/Logo';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOnline: boolean;
  lastSynced: string | null;
  planName?: string;
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  onShowTutorial: () => void;
  onShowProfile: () => void;
}

const mainMenuItems = [
  { id: 'dashboard', label: 'MEL Dashboard', icon: LayoutDashboard, description: 'Monitor, Evaluate, Learn' },
  { id: 'swot', label: 'SWOT Analysis', icon: Target, description: 'Structured Diagnostics' },
  { id: 'systems', label: 'Systems Thinking', icon: Network, description: 'Visualize Relationships' },
  { id: 'strategy', label: 'Strategic Options', icon: Sparkles, description: 'SO/ST/WO/WT Options' },
  { id: 'scorecard', label: 'Balanced Scorecard', icon: BarChart3, description: 'Objectives & KPIs' },
  { id: 'paps', label: 'PAPs Management', icon: FolderKanban, description: 'Programs & Projects' },
  { id: 'templates', label: 'Templates Library', icon: Layers, description: 'Reusable Plan Templates' },
  { id: 'team', label: 'Team Collaboration', icon: Users, description: 'Share & Collaborate' },
  { id: 'export', label: 'Plan Generator', icon: FileText, description: 'Export Reports' },
  { id: 'settings', label: 'Settings', icon: Settings, description: 'Preferences & Account' },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  isCollapsed,
  onToggleCollapse,
  isOnline,
  lastSynced,
  planName,
  isMobileMenuOpen,
  onCloseMobileMenu,
  onShowTutorial,
  onShowProfile,
}) => {
  const NavItem = ({ item, isSubItem = false }: { item: any; isSubItem?: boolean }) => {
    const Icon = item.icon;
    const isActive = activeView === item.id;
    const isHighlighted = item.highlight;

    return (
      <button
        id={`nav-item-${item.id}`}
        onClick={() => {
          onViewChange(item.id);
          if (window.innerWidth < 1024) onCloseMobileMenu();
        }}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
          isActive
            ? isHighlighted
              ? "bg-[#C9A84C] text-[#022c22] shadow-lg shadow-[#C9A84C]/30"
              : "bg-[#C9A84C] text-[#022c22] shadow-lg shadow-[#C9A84C]/20"
            : isHighlighted
              ? "text-[#E8C560] hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] border border-[#C9A84C]/20"
              : "text-[#a3bfb3] hover:bg-[#022c22]/60 hover:text-[#ecfdf5]",
          isSubItem && !isCollapsed ? "pl-9 py-2" : ""
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon className={cn(
          "w-5 h-5 flex-shrink-0 transition-colors",
          isActive
            ? "text-[#022c22]"
            : isHighlighted
              ? "group-hover:text-[#C9A84C]"
              : "group-hover:text-[#C9A84C]"
        )} />
        {(!isCollapsed || isMobileMenuOpen) && (
          <div className="text-left overflow-hidden flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold truncate leading-none mb-1">{item.label}</p>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#C9A84C] text-[#022c22] rounded-full uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
            </div>
            {!isSubItem && (
              <p className={cn(
                "text-[10px] truncate",
                isActive
                  ? isHighlighted ? "text-[#022c22]/90" : "text-[#022c22]/90"
                  : isHighlighted ? "text-[#E8C560]/70" : "text-[#a3bfb3]"
              )}>
                {item.description}
              </p>
            )}
          </div>
        )}
        {item.external && (!isCollapsed || isMobileMenuOpen) && (
          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
        )}
        {isCollapsed && !isMobileMenuOpen && (
          <div className="absolute left-full ml-4 px-3 py-2 bg-[#022c22]/60 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-[#C9A84C]/20 shadow-xl">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm">{item.label}</p>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#C9A84C] text-[#022c22] rounded-full uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-[#a3bfb3] text-[10px] mt-0.5">{item.description}</p>
          </div>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#022c22]/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      <aside
        id="app-sidebar"
        className={cn(
          "fixed left-0 top-0 h-full bg-[#022c22] text-white transition-all duration-300 z-50 flex flex-col border-r border-[#C9A84C]/15",
          isCollapsed ? "w-16" : "w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header/Logo */}
        <div className="p-4 border-b border-[#C9A84C]/15 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('dashboard')}>
            <MTITLogo size="md" />
            {(!isCollapsed || isMobileMenuOpen) && (
              <h1 className="font-display font-bold text-sm tracking-wide text-[#ecfdf5] whitespace-nowrap">
                BIRD <span className="text-[#C9A84C]">2026–2035</span>
              </h1>
            )}
          </div>
          {isMobileMenuOpen && (
            <button onClick={onCloseMobileMenu} className="p-1 hover:bg-[#022c22]/60 rounded-md lg:hidden">
              <X className="w-5 h-5 text-[#a3bfb3]" />
            </button>
          )}
        </div>

        {/* Plan Context */}
        {(!isCollapsed || isMobileMenuOpen) && (
          <div className="px-4 py-4 bg-[#022c22]/30">
            <p className="text-[10px] text-[#a3bfb3] uppercase tracking-widest font-bold mb-1">Current Focus</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
              <p className="text-sm font-medium text-[#ecfdf5]/90 truncate">{planName || 'Select a Plan'}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar px-3 space-y-1">
          {mainMenuItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}

          {/* Tutorial */}
          <div className="my-4 border-t border-[#C9A84C]/10 pt-4">
            <button
              onClick={onShowTutorial}
              id="sidebar-btn-tutorial"
              className="w-full flex items-center gap-3 px-3 py-2.5 mt-1 rounded-xl text-[#a3bfb3] hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] transition-all"
            >
              <HelpCircle className="w-5 h-5 flex-shrink-0" />
              {(!isCollapsed || isMobileMenuOpen) && (
                <span className="text-sm font-semibold">Navigation Tutorial</span>
              )}
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t border-[#C9A84C]/15 bg-[#022c22]/80 p-3">
          <div className={cn("flex flex-col gap-2", isCollapsed && !isMobileMenuOpen ? "items-center" : "")}>
            <div className="flex items-center gap-3 px-1">
              <Cloud className={cn("w-4 h-4", isOnline ? "text-[#6ee7b7]" : "text-amber-400")} />
              {(!isCollapsed || isMobileMenuOpen) && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#a3bfb3] leading-none">
                    {isOnline ? 'CLOUD CONNECTED' : 'OFFLINE MODE'}
                  </span>
                  <span className="text-[9px] text-[#a3bfb3] mt-1">{lastSynced}</span>
                </div>
              )}
            </div>
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex w-full items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#022c22]/60 text-[#a3bfb3] hover:text-white transition-colors"
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5 mx-auto" /> : (
                <>
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-xs font-bold">COLLAPSE</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default React.memo(Sidebar);