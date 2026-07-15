import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Sparkles, Loader2, Check, Star, ArrowRight, Shield, AlertCircle, Lightbulb, Zap, Plus, Trash2, Edit2, X, AlertTriangle, Info, Target, GitBranch, ChevronDown, ChevronUp, Brain, Layers, TrendingUp, Activity, BookOpen, Gauge, Clock, Workflow, Crosshair, Anchor, BarChart2, LayoutGrid, BarChart3,
} from 'lucide-react';
import { StrategicOption, StrategicPlan, SWOTItem } from '@/lib/strategicPlanStore';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// ─── Edge Function URLs ───────────────────────────────────────────────────────
const AI_ASSISTANT_URL = 'https://lydsisparsmvextskevw.supabase.co/functions/v1/ai-strategy-assistant';
const SYNC_URL = 'https://lydsisparsmvextskevw.supabase.co/functions/v1/strategic-planner-sync';
const EMAIL_URL = 'https://lydsisparsmvextskevw.supabase.co/functions/v1/email-notifications';

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface LeveragePoint {
  archetypeId?: string;
  leverageLevel: number;
  meadowsName: string;
  intervention: string;
  targetNodeIds: string[];
  expectedImpact: 'high' | 'medium' | 'low';
  timeHorizon: 'short' | 'medium' | 'long';
  source: 'archetype' | 'cld-analysis';
}

export interface CLDNode {
  id: string;
  label: string;
  category?: string;
}

export interface CLDLink {
  from: string;
  to: string;
  polarity: '+' | '-';
  strength?: number;
}

interface StrategyMatrixProps {
  plan: StrategicPlan;
  onAddOption: (option: Omit<StrategicOption, 'id'>) => void;
  onUpdateOption: (id: string, updates: Partial<StrategicOption>) => void;
  onRemoveOption: (id: string) => void;
  onBulkAdd: (options: Omit<StrategicOption, 'id'>[]) => void;
  leveragePoints?: LeveragePoint[];
  selectedArchetypeId?: string | null;
  selectedArchetypeName?: string | null;
  activeArchetypeDescription?: string | null;
  cldNodes?: CLDNode[];
  cldLinks?: CLDLink[];
  onUpdateItem?: (id: string, updates: Partial<SWOTItem>) => void;
}

// ─── QUADRANT CONFIG (for TOWS strategies) ────────────────────────────────────

const QUADRANT_TYPES = ['SO', 'ST', 'WO', 'WT'] as const;
type QuadrantType = typeof QUADRANT_TYPES[number];

const quadrantConfig = {
  SO: {
    label: 'SO Strategies', subtitle: 'Strengths + Opportunities',
    description: 'Use strengths to capitalize on opportunities',
    color: 'emerald', bgGradient: 'from-emerald-600 to-teal-700',
    lightBg: 'bg-[#064e3b]/30', border: 'border-[#059669]/40',
    textColor: 'text-[#6ee7b7]', headingColor: 'text-[#E8C560]',
    icons: [Shield, Lightbulb], leverageLevels: [7, 4, 8],
    leverageRationale: 'Amplify reinforcing growth loops & self-organizing capabilities',
  },
  ST: {
    label: 'ST Strategies', subtitle: 'Strengths + Threats',
    description: 'Use strengths to mitigate threats',
    color: 'blue', bgGradient: 'from-blue-600 to-indigo-700',
    lightBg: 'bg-[#1e40af]/20', border: 'border-[#3b82f6]/40',
    textColor: 'text-[#60a5fa]', headingColor: 'text-[#E8C560]',
    icons: [Shield, Zap], leverageLevels: [8, 5, 6],
    leverageRationale: 'Strengthen balancing loops, governance rules & information access',
  },
  WO: {
    label: 'WO Strategies', subtitle: 'Weaknesses + Opportunities',
    description: 'Overcome weaknesses by pursuing opportunities',
    color: 'purple', bgGradient: 'from-purple-600 to-violet-700',
    lightBg: 'bg-[#5b21b6]/20', border: 'border-[#a78bfa]/40',
    textColor: 'text-[#c4b5fd]', headingColor: 'text-[#E8C560]',
    icons: [AlertCircle, Lightbulb], leverageLevels: [3, 6, 9],
    leverageRationale: 'Redefine goals, expose information gaps & reduce structural delays',
  },
  WT: {
    label: 'WT Strategies', subtitle: 'Weaknesses + Threats',
    description: 'Minimize weaknesses and avoid threats',
    color: 'amber', bgGradient: 'from-amber-600 to-orange-700',
    lightBg: 'bg-[#92400e]/20', border: 'border-[#fbbf24]/40',
    textColor: 'text-[#fcd34d]', headingColor: 'text-[#E8C560]',
    icons: [AlertCircle, Zap], leverageLevels: [2, 5, 10],
    leverageRationale: 'Challenge paradigms, restructure stock-flow & establish defensive rules',
  },
};

// ─── SWOT CATEGORY CONFIG (for Matrix & Impact tabs) ──────────────────────────

const swotCategoryConfig = {
  strength: {
    label: 'Strength', icon: Shield, color: 'emerald',
    bgColor: 'bg-[#059669]', lightBg: 'bg-[#064e3b]/30',
    textColor: 'text-[#6ee7b7]', borderColor: 'border-[#059669]/40',
    defaultCLDPolarity: '+' as '+' | '-',
  },
  weakness: {
    label: 'Weakness', icon: AlertCircle, color: 'red',
    bgColor: 'bg-[#dc2626]', lightBg: 'bg-[#7f1d1d]/30',
    textColor: 'text-[#f87171]', borderColor: 'border-[#dc2626]/40',
    defaultCLDPolarity: '-' as '+' | '-',
  },
  opportunity: {
    label: 'Opportunity', icon: Lightbulb, color: 'blue',
    bgColor: 'bg-[#3b82f6]', lightBg: 'bg-[#1e3a5f]/30',
    textColor: 'text-[#60a5fa]', borderColor: 'border-[#3b82f6]/40',
    defaultCLDPolarity: '+' as '+' | '-',
  },
  threat: {
    label: 'Threat', icon: Zap, color: 'amber',
    bgColor: 'bg-[#d97706]', lightBg: 'bg-[#78350f]/30',
    textColor: 'text-[#fbbf24]', borderColor: 'border-[#d97706]/40',
    defaultCLDPolarity: '-' as '+' | '-',
  },
};

type SWOTCategoryKey = keyof typeof swotCategoryConfig;

// ─── MEADOWS CONSTANTS ────────────────────────────────────────────────────────

const MEADOWS_ICONS: Record<number, React.ElementType> = {
  12: Gauge, 11: Anchor, 10: Workflow, 9: Clock, 8: Activity, 7: TrendingUp,
  6: BarChart2, 5: BookOpen, 4: Sparkles, 3: Target, 2: Brain, 1: Crosshair,
};

const MEADOWS_LEVEL_COLORS: Record<string, string> = {
  high: 'bg-violet-600 text-white',
  mid: 'bg-red-500 text-white',
  feedback: 'bg-amber-500 text-white',
  params: 'bg-[#64748b] text-white',
};

const getMeadowsBadgeColor = (level: number) => {
  if (level <= 3) return MEADOWS_LEVEL_COLORS.high;
  if (level <= 6) return MEADOWS_LEVEL_COLORS.mid;
  if (level <= 9) return MEADOWS_LEVEL_COLORS.feedback;
  return MEADOWS_LEVEL_COLORS.params;
};

// ─── SCORE GUIDES ─────────────────────────────────────────────────────────────

const SCORE_DESCRIPTIONS = {
  1: { priority: 'Lowest priority', feasibility: 'Very difficult' },
  2: { priority: 'Low priority', feasibility: 'Difficult' },
  3: { priority: 'Medium priority', feasibility: 'Moderate' },
  4: { priority: 'High priority', feasibility: 'Easy' },
  5: { priority: 'Highest priority', feasibility: 'Very easy' },
};

const TOTAL_SCORE_GUIDE = [
  { range: '9-10', color: 'text-[#6ee7b7]', bg: 'bg-[#064e3b]/50', label: 'Excellent' },
  { range: '7-8', color: 'text-[#60a5fa]', bg: 'bg-[#1e3a5f]/40', label: 'Good' },
  { range: '5-6', color: 'text-[#fbbf24]', bg: 'bg-[#78350f]/40', label: 'Fair' },
  { range: '<5', color: 'text-[#64748b]', bg: 'bg-[#022c22]/40', label: 'Low' },
];

const getTotalScoreTier = (total: number) =>
  TOTAL_SCORE_GUIDE.find(t => {
    if (t.range.includes('<')) return total < parseInt(t.range.substring(1));
    const [min, max] = t.range.split('-').map(Number);
    return total >= min && total <= max;
  }) ?? TOTAL_SCORE_GUIDE[3];

const getLeveragePointsForQuadrant = (leveragePoints: LeveragePoint[], quadrant: QuadrantType): LeveragePoint[] => {
  const affinityLevels = quadrantConfig[quadrant].leverageLevels;
  const exact = leveragePoints.filter(lp => affinityLevels.includes(lp.leverageLevel));
  const highImp = leveragePoints.filter(lp => !affinityLevels.includes(lp.leverageLevel) && lp.expectedImpact === 'high');
  return [...exact, ...highImp].slice(0, 3);
};

// ─── SYSTEMS CONTEXT BUILDER ──────────────────────────────────────────────────

const buildSystemsContext = (
  leveragePoints: LeveragePoint[],
  archetypeName: string | null | undefined,
  archetypeDescription: string | null | undefined,
  cldNodes: CLDNode[],
  cldLinks: CLDLink[]
): string => {
  const lines: string[] = [];
  if (archetypeName) {
    lines.push(`ACTIVE SYSTEMS ARCHETYPE: "${archetypeName}"`);
    if (archetypeDescription) lines.push(`  Description: ${archetypeDescription}`);
    lines.push('');
  }
  if (cldNodes.length > 0) {
    lines.push('CAUSAL LOOP DIAGRAM (CLD) VARIABLES:');
    cldNodes.forEach(n => lines.push(`  - ${n.label}${n.category ? ` [${n.category}]` : ''}`));
    lines.push('');
    if (cldLinks.length > 0) {
      lines.push('CLD CAUSAL RELATIONSHIPS:');
      cldLinks.forEach(l => {
        const fromNode = cldNodes.find(n => n.id === l.from)?.label ?? l.from;
        const toNode = cldNodes.find(n => n.id === l.to)?.label ?? l.to;
        lines.push(`  ${fromNode} ${l.polarity === '+' ? '->(+)' : '->(-)'} ${toNode}${(l.strength ?? 0) >= 4 ? ' [HIGH GAIN]' : ''}`);
      });
    }
  }
  if (leveragePoints.length > 0) {
    lines.push('MEADOWS LEVERAGE POINTS:');
    [...leveragePoints].sort((a, b) => a.leverageLevel - b.leverageLevel).forEach(lp =>
      lines.push(`  [L${lp.leverageLevel} - ${lp.meadowsName}] (${lp.expectedImpact} impact / ${lp.timeHorizon}-term) -> ${lp.intervention}`)
    );
  }
  return lines.join('\n');
};

// ─── SWOT SCORE COMPONENTS (for Matrix & Impact tabs) ─────────────────────────

const SWOTScoreButton: React.FC<{
  value: number;
  selectedValue: number;
  onSelect: (v: number) => void;
  type: 'impact' | 'likelihood';
  category: SWOTCategoryKey;
}> = ({ value, selectedValue, onSelect, type, category }) => {
  const config = swotCategoryConfig[category];
  const isSelected = value <= selectedValue;
  return (
    <button
      onClick={() => onSelect(value)}
      className={cn(
        'w-7 h-7 rounded-full border-2 transition-all duration-150 flex items-center justify-center',
        isSelected
          ? type === 'impact'
            ? config.defaultCLDPolarity === '+'
              ? 'border-[#059669] bg-[#059669]'
              : 'border-[#dc2626] bg-[#dc2626]'
            : 'border-[#C9A84C] bg-[#C9A84C]'
          : 'border-[#334155] hover:border-[#64748b] hover:bg-[#022c22]/50 bg-transparent'
      )}
      aria-label={`${type} score ${value}`}
    >
      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
    </button>
  );
};

const SWOTScoreRow: React.FC<{
  label: string;
  score: number;
  onChange: (v: number) => void;
  type: 'impact' | 'likelihood';
  category: SWOTCategoryKey;
  readOnly?: boolean;
  labelColor?: string;
}> = ({ label, score, onChange, type, category, readOnly, labelColor }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <span className={cn('text-xs font-semibold w-16 shrink-0', labelColor || 'text-[#64748b]')}>
      {label}
    </span>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <SWOTScoreButton
          key={n}
          value={n}
          selectedValue={score}
          onSelect={readOnly ? () => {} : onChange}
          type={type}
          category={category}
        />
      ))}
    </div>
    <span className={cn('text-xs font-bold tabular-nums', labelColor || 'text-[#94a3b8]')}>
      {score}/5
    </span>
  </div>
);

const SWOTPriorityBadge: React.FC<{ totalScore: number; category: SWOTCategoryKey }> = ({
  totalScore,
}) => {
  const PRIORITY_GUIDE = [
    { level: 'Low', range: '1-9', color: 'text-[#94a3b8]', bg: 'bg-[#022c22]/60', border: 'border-[#334155]' },
    { level: 'Medium', range: '10-15', color: 'text-[#60a5fa]', bg: 'bg-[#1e3a5f]/40', border: 'border-[#3b82f6]/40' },
    { level: 'High', range: '16-20', color: 'text-[#fbbf24]', bg: 'bg-[#78350f]/40', border: 'border-[#d97706]/40' },
    { level: 'Critical', range: '21-25', color: 'text-[#f87171]', bg: 'bg-[#7f1d1d]/40', border: 'border-[#dc2626]/40' },
  ];

  const getPriorityInfo = (score: number) => {
    if (score <= 9) return PRIORITY_GUIDE[0];
    if (score <= 15) return PRIORITY_GUIDE[1];
    if (score <= 20) return PRIORITY_GUIDE[2];
    return PRIORITY_GUIDE[3];
  };

  const priority = getPriorityInfo(totalScore);
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-xs font-bold border', priority.bg, priority.color, priority.border)}>
      {priority.level} &middot; {totalScore}
    </span>
  );
};

// ─── SWOT CARD ────────────────────────────────────────────────────────────────

const SWOTCard: React.FC<{
  item: SWOTItem;
  config: (typeof swotCategoryConfig)['strength'];
  onUpdate?: (id: string, updates: Partial<SWOTItem>) => void;
  compact?: boolean;
}> = ({ item, config, onUpdate, compact }) => {
  const imp = item.impactScore || 3;
  const lik = item.likelihoodScore || 3;
  const total = imp * lik;

  if (compact) {
    return (
      <div className={cn('rounded-lg p-3 border transition-all', config.lightBg, config.borderColor)}>
        <p className={cn('text-sm font-medium mb-2 leading-snug', config.textColor)}>
          {item.description}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex gap-3 text-xs text-[#94a3b8]">
            <span>
              Impact <span className={cn('font-bold', config.textColor)}>{imp}</span>
            </span>
            <span>
              Likelihood <span className="font-bold text-[#C9A84C]">{lik}</span>
            </span>
          </div>
          <SWOTPriorityBadge totalScore={total} category={item.category as SWOTCategoryKey} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-xl p-4 border transition-all', config.lightBg, config.borderColor)}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className={cn('text-sm font-medium leading-relaxed', config.textColor)}>
          {item.description}
        </p>
        <span className={cn('px-2 py-0.5 rounded text-xs font-bold text-white shrink-0', config.bgColor)}>
          {config.defaultCLDPolarity === '+' ? '+' : '-'}{total}
        </span>
      </div>
      <div className="space-y-2 pt-3 border-t border-[#334155]/40">
        <SWOTScoreRow
          label="Impact"
          score={imp}
          onChange={v => onUpdate?.(item.id, { impactScore: v })}
          type="impact"
          category={item.category as SWOTCategoryKey}
          labelColor={config.textColor}
        />
        <SWOTScoreRow
          label="Likelihood"
          score={lik}
          onChange={v => onUpdate?.(item.id, { likelihoodScore: v })}
          type="likelihood"
          category={item.category as SWOTCategoryKey}
        />
        <div className="flex items-center justify-between pt-1 border-t border-[#334155]/30">
          <span className="text-xs text-[#64748b]">Impact &times; Likelihood</span>
          <SWOTPriorityBadge totalScore={total} category={item.category as SWOTCategoryKey} />
        </div>
      </div>
    </div>
  );
};

// ─── SWOT QUADRANT ────────────────────────────────────────────────────────────

const SWOTQuadrant: React.FC<{
  title: string;
  count: number;
  icon: React.ElementType;
  items: SWOTItem[];
  config: (typeof swotCategoryConfig)['strength'];
  onUpdate?: (id: string, updates: Partial<SWOTItem>) => void;
}> = ({ title, count, icon: Icon, items, config, onUpdate }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={cn('rounded-xl border overflow-hidden', config.borderColor)}>
      <button
        onClick={() => setOpen(v => !v)}
        className={cn('w-full flex items-center justify-between px-4 py-3', config.lightBg)}
      >
        <div className="flex items-center gap-2">
          <Icon className={cn('w-4 h-4', config.textColor)} />
          <h4 className={cn('font-semibold text-sm', config.textColor)}>{title}</h4>
          <span className={cn('text-xs px-1.5 py-0.5 rounded-full font-medium', config.bgColor, 'text-white')}>
            {count}
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#64748b]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#64748b]" />
        )}
      </button>
      {open && (
        <div className="p-3 space-y-2 bg-[#022c22]/30">
          {items.length === 0 ? (
            <p className="text-xs text-[#64748b] text-center py-4">No items yet</p>
          ) : (
            items.map(item => (
              <SWOTCard
                key={item.id}
                item={item}
                config={config}
                onUpdate={onUpdate}
                compact
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

// ─── EXISTING STRATEGY COMPONENTS ─────────────────────────────────────────────

const ScoreButton: React.FC<{
  value: number;
  selectedValue: number;
  onSelect: (value: number) => void;
  type: 'priority' | 'feasibility';
  Icon?: React.ElementType;
}> = ({ value, selectedValue, onSelect, type, Icon = Check }) => {
  const description = SCORE_DESCRIPTIONS[value as keyof typeof SCORE_DESCRIPTIONS];
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button onClick={() => onSelect(value)} className="transition-all transform hover:scale-110 active:scale-95">
            {Icon === Star ? (
              <Star className={cn('w-4 h-4 transition-colors', value <= selectedValue ? 'text-[#E8C560] fill-current' : 'text-[#334155]')} />
            ) : (
              <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center', value <= selectedValue ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-[#334155] hover:border-[#C9A84C]/60')}>
                {value <= selectedValue && <Check className="w-3 h-3 text-white" />}
              </div>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px] z-50">
          <p className="font-semibold text-[#E8C560]">{type} Level {value}</p>
          <p className="text-xs text-[#ecfdf5]/80">
            {type === 'priority' ? description.priority : description.feasibility}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const LeverageBadge: React.FC<{ lp: LeveragePoint }> = ({ lp }) => {
  const Icon = MEADOWS_ICONS[lp.leverageLevel] ?? Target;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn('flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold cursor-help', getMeadowsBadgeColor(lp.leverageLevel))}>
            <Icon className="w-3 h-3" /> L{lp.leverageLevel}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[260px] z-50 space-y-1">
          <p className="font-semibold text-[#E8C560]">[L{lp.leverageLevel}] {lp.meadowsName}</p>
          <p className="text-xs text-[#ecfdf5]/80">{lp.intervention}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const StrategyCard: React.FC<{
  option: StrategicOption;
  config: (typeof quadrantConfig)['SO'];
  onUpdate: (updates: Partial<StrategicOption>) => void;
  onRemove: () => void;
}> = ({ option, config, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(option.title);
  const [editDesc, setEditDesc] = useState(option.description);

  const handleSave = () => {
    onUpdate({ title: editTitle, description: editDesc });
    setIsEditing(false);
  };

  const total = (option.priorityScore || 3) + (option.feasibilityScore || 3);
  const scoreTier = getTotalScoreTier(total);

  return (
    <div
      className={cn(
        `${config.lightBg} ${config.border} border rounded-xl p-4 group hover:shadow-md transition-all`,
        option.selected && 'ring-2 ring-[#C9A84C] ring-offset-2 ring-offset-[#022c22]'
      )}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            autoFocus
            onChange={e => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 text-sm font-medium border border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-foreground bg-background"
          />
          <textarea
            value={editDesc}
            rows={3}
            onChange={e => setEditDesc(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] resize-none text-foreground bg-background"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => { setEditTitle(option.title); setEditDesc(option.description); setIsEditing(false); }}
              className="px-3 py-1.5 text-sm text-[#94a3b8] rounded-lg hover:text-[#ecfdf5] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-sm bg-[#C9A84C] text-[#022c22] font-semibold rounded-lg hover:bg-[#E8C560] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <button
                onClick={() => onUpdate({ selected: !option.selected })}
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0',
                  option.selected
                    ? 'bg-[#C9A84C] border-[#C9A84C] text-[#022c22]'
                    : 'border-[#334155] hover:border-[#C9A84C]'
                )}
              >
                {option.selected && <Check className="w-3 h-3" />}
              </button>
              <h4 className="font-semibold text-[#E8C560] truncate">{option.title}</h4>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-[#64748b] hover:text-[#E8C560] rounded-full hover:bg-[#064e3b]/30 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onRemove}
                className="p-1.5 text-[#f87171]/70 hover:text-[#f87171] rounded-full hover:bg-[#7f1d1d]/30 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-sm text-[#ecfdf5]/90 mb-3 line-clamp-2">{option.description}</p>
          <div className="flex items-center justify-between pt-3 border-t border-[#334155]/40 flex-wrap gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-[#94a3b8]">Priority:</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(n => (
                    <ScoreButton
                      key={n}
                      value={n}
                      selectedValue={option.priorityScore || 3}
                      onSelect={val => onUpdate({ priorityScore: val })}
                      type="priority"
                      Icon={Star}
                    />
                  ))}
                </div>
                <span className={cn('text-xs font-semibold w-5 text-center', (option.priorityScore || 3) >= 4 ? 'text-[#E8C560]' : 'text-[#64748b]')}>
                  {option.priorityScore || 3}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-[#94a3b8]">Feasibility:</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(n => (
                    <ScoreButton
                      key={n}
                      value={n}
                      selectedValue={option.feasibilityScore || 3}
                      onSelect={val => onUpdate({ feasibilityScore: val })}
                      type="feasibility"
                    />
                  ))}
                </div>
                <span className={cn('text-xs font-semibold w-5 text-center', (option.feasibilityScore || 3) >= 4 ? 'text-[#C9A84C]' : 'text-[#64748b]')}>
                  {option.feasibilityScore || 3}
                </span>
              </div>
            </div>
            <div className={cn('px-3 py-1.5 rounded-full text-xs font-bold', scoreTier.bg, scoreTier.color)}>
              Score: {total}/10
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── SYSTEMS CONTEXT PANEL ────────────────────────────────────────────────────

const SystemsContextPanel: React.FC<{
  leveragePoints: LeveragePoint[];
  archetypeName?: string | null;
  archetypeDescription?: string | null;
  cldNodes: CLDNode[];
  cldLinks: CLDLink[];
}> = ({ leveragePoints, archetypeName, archetypeDescription, cldNodes, cldLinks }) => {
  const [expanded, setExpanded] = useState(true);
  const highLPs = leveragePoints.filter(lp => lp.leverageLevel <= 4);
  const midLPs = leveragePoints.filter(lp => lp.leverageLevel >= 5 && lp.leverageLevel <= 7);
  const lowLPs = leveragePoints.filter(lp => lp.leverageLevel >= 8);

  return (
    <div className="rounded-xl border border-[#7c3aed]/30 bg-gradient-to-r from-[#4c1d95]/20 via-[#5b21b6]/15 to-[#312e81]/20 overflow-hidden">
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#7c3aed] flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#E8C560] text-sm">Systems Thinking Context</h3>
            <p className="text-[11px] text-[#94a3b8]">
              {archetypeName ? `Archetype: ${archetypeName}` : 'No archetype active'} &middot; {leveragePoints.length} LPs &middot; {cldNodes.length} CLD variables
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-[#C9A84C]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#C9A84C]" />
        )}
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-[#7c3aed]/20">
          {archetypeName && (
            <div className="flex items-start gap-3 pt-3">
              <div className="w-6 h-6 rounded bg-[#7c3aed]/30 flex items-center justify-center shrink-0 mt-0.5">
                <Layers className="w-3.5 h-3.5 text-[#c4b5fd]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#E8C560]">{archetypeName}</p>
                {archetypeDescription && (
                  <p className="text-[11px] text-[#94a3b8] leading-relaxed mt-0.5">{archetypeDescription}</p>
                )}
              </div>
            </div>
          )}
          {leveragePoints.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#C9A84C]">Identified Leverage Points</p>
              <div className="flex flex-wrap gap-1.5 text-[9px] font-bold">
                <span className="px-2 py-0.5 rounded bg-[#7c3aed] text-white">L1-3: Paradigm</span>
                <span className="px-2 py-0.5 rounded bg-[#dc2626] text-white">L4-6: Info/Rules</span>
                <span className="px-2 py-0.5 rounded bg-[#d97706] text-white">L7-9: Feedback</span>
                <span className="px-2 py-0.5 rounded bg-[#64748b] text-white">L10-12: Params</span>
              </div>
              {[
                { label: 'High Leverage', lps: highLPs },
                { label: 'Mid Leverage', lps: midLPs },
                { label: 'Lower Leverage', lps: lowLPs },
              ].map(({ label, lps }) =>
                lps.length > 0 ? (
                  <div key={label}>
                    <p className="text-[10px] text-[#64748b] font-medium mb-1.5">{label}</p>
                    <div className="space-y-1.5">
                      {lps.map((lp, i) => {
                        const Icon = MEADOWS_ICONS[lp.leverageLevel] ?? Target;
                        return (
                          <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-[#022c22]/50 border border-[#334155]/40">
                            <span className={cn('shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded mt-0.5', getMeadowsBadgeColor(lp.leverageLevel))}>
                              L{lp.leverageLevel}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-semibold text-[#ecfdf5]/90 truncate">{lp.meadowsName}</p>
                              <p className="text-[10px] text-[#94a3b8] leading-relaxed line-clamp-2">{lp.intervention}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── MAIN STRATEGY MATRIX COMPONENT ───────────────────────────────────────────

const StrategyMatrix: React.FC<StrategyMatrixProps> = ({
  plan,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
  onBulkAdd,
  leveragePoints = [],
  selectedArchetypeId = null,
  selectedArchetypeName = null,
  activeArchetypeDescription = null,
  cldNodes = [],
  cldLinks = [],
  onUpdateItem,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [newStrategy, setNewStrategy] = useState<{
    quadrant: QuadrantType | null;
    title: string;
    description: string;
  }>({ quadrant: null, title: '', description: '' });

  const hasSystemsContext = leveragePoints.length > 0 || cldNodes.length > 0 || !!selectedArchetypeName;

  // SWOT data for Matrix & Impact tabs
  const swot = useMemo(() => ({
    strengths: plan.swotItems?.filter(i => i.category === 'strength') || [],
    weaknesses: plan.swotItems?.filter(i => i.category === 'weakness') || [],
    opportunities: plan.swotItems?.filter(i => i.category === 'opportunity') || [],
    threats: plan.swotItems?.filter(i => i.category === 'threat') || [],
  }), [plan.swotItems]);

  const allItems = plan.swotItems || [];

  const sortedImpact = useMemo(() =>
    allItems
      .map(item => ({ ...item, total: (item.impactScore || 3) * (item.likelihoodScore || 3) }))
      .sort((a, b) => b.total - a.total),
    [allItems]
  );

  // Auto-sync plan to cloud
  useEffect(() => {
    const syncPlan = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) return;
        await fetch(SYNC_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ plan }),
        });
      } catch (error) {
        console.error('Failed to sync plan to cloud:', error);
      }
    };
    const timer = setTimeout(syncPlan, 2000);
    return () => clearTimeout(timer);
  }, [plan]);

  const handleGenerateStrategies = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error('Not authenticated');

      const strengths = (plan.swotItems || [])
        .filter(i => i.category === 'strength')
        .map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      const weaknesses = (plan.swotItems || [])
        .filter(i => i.category === 'weakness')
        .map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      const opportunities = (plan.swotItems || [])
        .filter(i => i.category === 'opportunity')
        .map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      const threats = (plan.swotItems || [])
        .filter(i => i.category === 'threat')
        .map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));

      const systemsContext = hasSystemsContext
        ? buildSystemsContext(leveragePoints, selectedArchetypeName, activeArchetypeDescription, cldNodes, cldLinks)
        : null;

      const quadrantLeverageGuide = QUADRANT_TYPES.reduce<Record<string, unknown>>((acc, q) => {
        const qLPs = getLeveragePointsForQuadrant(leveragePoints, q);
        acc[q] = {
          leverageRationale: quadrantConfig[q].leverageRationale,
          relevantLeveragePoints: qLPs.map(lp => ({
            level: lp.leverageLevel,
            meadowsName: lp.meadowsName,
            intervention: lp.intervention,
            expectedImpact: lp.expectedImpact,
            timeHorizon: lp.timeHorizon,
          })),
        };
        return acc;
      }, {});

      const response = await fetch(AI_ASSISTANT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          action: 'generate_strategies',
          data: {
            strengths,
            weaknesses,
            opportunities,
            threats,
            strategicIntent: plan.strategicIntent,
            systemsContext,
            activeArchetype: selectedArchetypeName
              ? { id: selectedArchetypeId, name: selectedArchetypeName, description: activeArchetypeDescription }
              : null,
            leveragePoints: leveragePoints.map(lp => ({
              level: lp.leverageLevel,
              meadowsName: lp.meadowsName,
              intervention: lp.intervention,
              impact: lp.expectedImpact,
              horizon: lp.timeHorizon,
              source: lp.source,
            })),
            cldVariables: cldNodes.map(n => ({ label: n.label, category: n.category })),
            cldRelationships: cldLinks.map(l => ({
              from: cldNodes.find(n => n.id === l.from)?.label ?? l.from,
              to: cldNodes.find(n => n.id === l.to)?.label ?? l.to,
              polarity: l.polarity,
              strength: l.strength,
            })),
            quadrantLeverageGuide,
            generationInstructions: buildGenerationInstructions(
              strengths.map(s => s.description),
              weaknesses.map(w => w.description),
              opportunities.map(o => o.description),
              threats.map(t => t.description),
              plan.strategicIntent,
              systemsContext,
              selectedArchetypeName,
              leveragePoints,
              quadrantLeverageGuide
            ),
          },
          plan: plan,
        }),
      });

      const result = await response.json();
      if (!result.success || !result.data) throw new Error('Invalid response from AI service');

      const options: Omit<StrategicOption, 'id'>[] = [];
      QUADRANT_TYPES.forEach(type => {
        const strategies = result.data[type] || [];
        strategies.forEach((s: Record<string, unknown>) => {
          options.push({
            optionType: type,
            title: (s.title as string) || 'Strategy',
            description: (s.description as string) || '',
            priorityScore: (s.priority_score as number) || 3,
            feasibilityScore: (s.feasibility_score as number) || 3,
            selected: false,
          });
        });
      });

      if (options.length > 0) onBulkAdd(options);
      else setGenerationError('No strategies were generated.');
    } catch (error) {
      console.error('Failed to generate strategies:', error);
      setGenerationError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddStrategy = () => {
    if (!newStrategy.quadrant || !newStrategy.title.trim()) return;
    onAddOption({
      optionType: newStrategy.quadrant,
      title: newStrategy.title.trim(),
      description: newStrategy.description.trim(),
      priorityScore: 3,
      feasibilityScore: 3,
      selected: false,
    });
    setNewStrategy({ quadrant: null, title: '', description: '' });
  };

  const getOptionsByType = (type: QuadrantType) =>
    (plan.strategicOptions || []).filter(opt => opt.optionType === type);

  const selectedCount = (plan.strategicOptions || []).filter(opt => opt.selected).length;

  const swotCounts = useMemo(() => ({
    strengths: (plan.swotItems || []).filter(i => i.category === 'strength').length,
    weaknesses: (plan.swotItems || []).filter(i => i.category === 'weakness').length,
    opportunities: (plan.swotItems || []).filter(i => i.category === 'opportunity').length,
    threats: (plan.swotItems || []).filter(i => i.category === 'threat').length,
  }), [plan.swotItems]);

  const canGenerate = swotCounts.strengths > 0 && swotCounts.weaknesses > 0 && swotCounts.opportunities > 0 && swotCounts.threats > 0;

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#E8C560]">Strategy Matrix</h1>
            <p className="text-[#ecfdf5]/70">
              Generate and prioritize SO/ST/WO/WT strategic options{hasSystemsContext ? ' · systems-informed' : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-[#94a3b8]">
              <span className="font-medium text-[#C9A84C]">{selectedCount}</span> selected
            </div>
            <button
              onClick={handleGenerateStrategies}
              disabled={isGenerating || !canGenerate}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] text-white rounded-xl text-sm font-medium hover:shadow-lg disabled:opacity-50 transition-all"
            >
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Generating&hellip;</>
              ) : (
                <><Sparkles className="w-4 h-4" /> AI Generate{hasSystemsContext ? ' (Systems-Aware)' : ''}</>
              )}
            </button>
          </div>
        </div>

        {hasSystemsContext && (
          <SystemsContextPanel
            leveragePoints={leveragePoints}
            archetypeName={selectedArchetypeName}
            archetypeDescription={activeArchetypeDescription}
            cldNodes={cldNodes}
            cldLinks={cldLinks}
          />
        )}

        {!canGenerate && (
          <div className="bg-[#78350f]/30 border border-[#d97706]/30 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#fbbf24]" />
            <div>
              <p className="text-sm font-medium text-[#fbbf24]">Complete SWOT Analysis First</p>
              <p className="text-xs text-[#ecfdf5]/70">
                Current: {swotCounts.strengths}S, {swotCounts.weaknesses}W, {swotCounts.opportunities}O, {swotCounts.threats}T
              </p>
            </div>
          </div>
        )}

        {generationError && (
          <div className="bg-[#7f1d1d]/30 border border-[#dc2626]/30 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-[#f87171]" />
            <p className="text-sm font-medium text-[#f87171]">{generationError}</p>
          </div>
        )}

        {/* ─── TABS ────────────────────────────────────────────────────────── */}
        <Tabs defaultValue="strategies" className="w-full">
          {/* Tab Bar */}
          <TabsList className="w-full grid grid-cols-3 bg-gradient-to-r from-[#022c22] to-[#064e3b] border border-[#C9A84C]/30 p-1 rounded-xl">
            <TabsTrigger
              value="strategies"
              className="flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-all data-[state=active]:bg-[#C9A84C]/20 data-[state=active]:text-[#E8C560] data-[state=active]:border data-[state=active]:border-[#C9A84C]/50 data-[state=inactive]:text-[#94a3b8] data-[state=inactive]:hover:text-[#ecfdf5] border border-transparent py-2.5"
            >
              <Target className="w-4 h-4" />
              Strategies
            </TabsTrigger>
            <TabsTrigger
              value="matrix"
              className="flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-all data-[state=active]:bg-[#C9A84C]/20 data-[state=active]:text-[#E8C560] data-[state=active]:border data-[state=active]:border-[#C9A84C]/50 data-[state=inactive]:text-[#94a3b8] data-[state=inactive]:hover:text-[#ecfdf5] border border-transparent py-2.5"
            >
              <LayoutGrid className="w-4 h-4" />
              Matrix
            </TabsTrigger>
            <TabsTrigger
              value="impact"
              className="flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-all data-[state=active]:bg-[#C9A84C]/20 data-[state=active]:text-[#E8C560] data-[state=active]:border data-[state=active]:border-[#C9A84C]/50 data-[state=inactive]:text-[#94a3b8] data-[state=inactive]:hover:text-[#ecfdf5] border border-transparent py-2.5"
            >
              <BarChart3 className="w-4 h-4" />
              Impact
            </TabsTrigger>
          </TabsList>

          {/* ─── STRATEGIES TAB ─────────────────────────────────────────── */}
          <TabsContent value="strategies" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {QUADRANT_TYPES.map(type => {
                const config = quadrantConfig[type];
                const options = getOptionsByType(type);
                const [Icon1, Icon2] = config.icons;
                return (
                  <div key={type} className="bg-[#022c22]/40 rounded-xl border border-[#C9A84C]/20 overflow-hidden shadow-sm">
                    <div className={`bg-gradient-to-r ${config.bgGradient} px-4 py-3`}>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Icon1 className="w-5 h-5 text-white/80" />
                          <ArrowRight className="w-4 h-4 text-white/60" />
                          <Icon2 className="w-5 h-5 text-white/80" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{config.label}</h3>
                          <p className="text-xs text-white/70">{config.description}</p>
                        </div>
                        <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-sm text-white">
                          {options.length}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                      {options.map(option => (
                        <StrategyCard
                          key={option.id}
                          option={option}
                          config={config}
                          onUpdate={updates => onUpdateOption(option.id, updates)}
                          onRemove={() => onRemoveOption(option.id)}
                        />
                      ))}
                      {newStrategy.quadrant === type ? (
                        <div className={cn(`${config.lightBg} ${config.border} border rounded-xl p-4 space-y-3`)}>
                          <input
                            type="text"
                            autoFocus
                            value={newStrategy.title}
                            onChange={e => setNewStrategy(p => ({ ...p, title: e.target.value }))}
                            className="w-full px-3 py-2 text-sm font-medium border border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-foreground bg-background"
                            placeholder="Strategy title"
                          />
                          <textarea
                            value={newStrategy.description}
                            rows={2}
                            onChange={e => setNewStrategy(p => ({ ...p, description: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] resize-none text-foreground bg-background"
                            placeholder="Strategy description"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setNewStrategy({ quadrant: null, title: '', description: '' })}
                              className="px-3 py-1.5 text-sm text-[#94a3b8] hover:text-[#ecfdf5] rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleAddStrategy}
                              disabled={!newStrategy.title.trim()}
                              className="px-3 py-1.5 text-sm bg-[#C9A84C] text-[#022c22] font-semibold rounded-lg disabled:opacity-50 hover:bg-[#E8C560] transition-colors"
                            >
                              Add Strategy
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setNewStrategy({ quadrant: type, title: '', description: '' })}
                          className={cn(
                            'w-full py-3 border-2 border-dashed rounded-xl text-sm font-medium text-[#64748b] hover:text-[#ecfdf5] hover:border-[#C9A84C]/50 transition-colors flex items-center justify-center gap-2',
                            config.lightBg
                          )}
                        >
                          <Plus className="w-4 h-4" /> Add {type} Strategy
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedCount > 0 && (
              <div className="bg-[#064e3b]/30 border border-[#C9A84C]/20 rounded-xl p-6">
                <h3 className="font-semibold text-[#E8C560] mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#C9A84C]" /> Selected Strategic Options ({selectedCount})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(plan.strategicOptions || [])
                    .filter(opt => opt.selected)
                    .sort((a, b) =>
                      ((b.priorityScore || 3) + (b.feasibilityScore || 3)) -
                      ((a.priorityScore || 3) + (a.feasibilityScore || 3))
                    )
                    .map(opt => {
                      const total = (opt.priorityScore || 3) + (opt.feasibilityScore || 3);
                      const tier = getTotalScoreTier(total);
                      return (
                        <div
                          key={opt.id}
                          className="bg-[#022c22]/40 rounded-lg p-3 border border-[#C9A84C]/20 flex items-start gap-3 hover:shadow-sm transition-shadow"
                        >
                          <span className={cn(
                            'px-2 py-1 rounded text-xs font-bold text-white shrink-0',
                            opt.optionType === 'SO' ? 'bg-[#059669]' :
                            opt.optionType === 'ST' ? 'bg-[#3b82f6]' :
                            opt.optionType === 'WO' ? 'bg-[#8b5cf6]' :
                            'bg-[#d97706]'
                          )}>
                            {opt.optionType}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#E8C560] text-sm truncate">{opt.title}</p>
                            <p className={cn('text-xs font-semibold', tier.color)}>Score: {total}/10</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </TabsContent>

          {/* ─── MATRIX TAB ─────────────────────────────────────────────── */}
          <TabsContent value="matrix" className="mt-6 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SWOTQuadrant
                title="Strengths"
                count={swot.strengths.length}
                icon={Shield}
                items={swot.strengths}
                config={swotCategoryConfig.strength}
                onUpdate={onUpdateItem}
              />
              <SWOTQuadrant
                title="Weaknesses"
                count={swot.weaknesses.length}
                icon={AlertCircle}
                items={swot.weaknesses}
                config={swotCategoryConfig.weakness}
                onUpdate={onUpdateItem}
              />
              <SWOTQuadrant
                title="Opportunities"
                count={swot.opportunities.length}
                icon={Lightbulb}
                items={swot.opportunities}
                config={swotCategoryConfig.opportunity}
                onUpdate={onUpdateItem}
              />
              <SWOTQuadrant
                title="Threats"
                count={swot.threats.length}
                icon={Zap}
                items={swot.threats}
                config={swotCategoryConfig.threat}
                onUpdate={onUpdateItem}
              />
            </div>
          </TabsContent>

          {/* ─── IMPACT TAB ─────────────────────────────────────────────── */}
          <TabsContent value="impact" className="mt-6 space-y-3">
            <h3 className="font-semibold text-sm text-[#E8C560] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#fbbf24]" /> Ranked by Priority Score
            </h3>
            {sortedImpact.length === 0 ? (
              <p className="text-sm text-[#64748b] text-center py-8">No SWOT items to display yet.</p>
            ) : (
              sortedImpact.map((item, idx) => {
                const cfg = swotCategoryConfig[item.category as SWOTCategoryKey];
                const Icon = cfg.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-[#022c22]/40 rounded-xl border border-[#C9A84C]/20 p-4 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-[#64748b] w-6 shrink-0 mt-0.5">
                        #{idx + 1}
                      </span>
                      <div className={cn('p-1.5 rounded-lg shrink-0', cfg.bgColor)}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                          <span className={cn('text-xs font-semibold', cfg.textColor)}>{cfg.label}</span>
                          <SWOTPriorityBadge totalScore={item.total} category={item.category as SWOTCategoryKey} />
                        </div>
                        <p className="text-sm text-[#ecfdf5]/90">{item.description}</p>
                      </div>
                    </div>
                    <div className="pl-9 space-y-2">
                      <SWOTScoreRow
                        label="Impact"
                        score={item.impactScore || 3}
                        onChange={v => onUpdateItem?.(item.id, { impactScore: v })}
                        type="impact"
                        category={item.category as SWOTCategoryKey}
                        labelColor={cfg.textColor}
                      />
                      <SWOTScoreRow
                        label="Likelihood"
                        score={item.likelihoodScore || 3}
                        onChange={v => onUpdateItem?.(item.id, { likelihoodScore: v })}
                        type="likelihood"
                        category={item.category as SWOTCategoryKey}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

// ─── GENERATION INSTRUCTIONS BUILDER ──────────────────────────────────────────

function buildGenerationInstructions(
  strengths: string[],
  weaknesses: string[],
  opportunities: string[],
  threats: string[],
  strategicIntent: string | undefined,
  systemsContext: string | null,
  archetypeName: string | null | undefined,
  leveragePoints: LeveragePoint[],
  quadrantLeverageGuide: Record<string, unknown>,
): string {
  const lines: string[] = [];
  lines.push('=== STRATEGY GENERATION TASK ===');
  lines.push('Generate 2-3 CONCRETE, ACTIONABLE strategic options for each TOWS quadrant.');
  lines.push('CRITICAL REQUIREMENTS:');
  lines.push('  1. Each strategy MUST directly reference at least one strength/weakness AND one opportunity/threat.');
  lines.push('  2. Assign priority_score (1-5) and feasibility_score (1-5).');
  lines.push('  3. DO NOT produce generic strategies - every option must be traceable to specific SWOT items.');
  if (strategicIntent) {
    lines.push(`STRATEGIC INTENT: "${strategicIntent}"`);
    lines.push('');
  }
  lines.push('--- SWOT INVENTORY ---');
  if (strengths.length > 0) { lines.push('STRENGTHS:'); strengths.forEach((s, i) => lines.push(`  S${i + 1}: ${s}`)); }
  if (weaknesses.length > 0) { lines.push('WEAKNESSES:'); weaknesses.forEach((w, i) => lines.push(`  W${i + 1}: ${w}`)); }
  if (opportunities.length > 0) { lines.push('OPPORTUNITIES:'); opportunities.forEach((o, i) => lines.push(`  O${i + 1}: ${o}`)); }
  if (threats.length > 0) { lines.push('THREATS:'); threats.forEach((t, i) => lines.push(`  T${i + 1}: ${t}`)); }
  if (systemsContext) { lines.push('--- SYSTEMS THINKING CONTEXT ---'); lines.push(systemsContext); }
  lines.push('--- OUTPUT FORMAT ---');
  lines.push('Return a JSON object with keys "SO", "ST", "WO", "WT". Each key maps to an array of strategy objects:');
  lines.push('{ "SO": [{ "title": "...", "description": "...", "priority_score": 4, "feasibility_score": 3 }], ... }');
  lines.push('');
  lines.push('--- QUADRANT-LEVEL LEVERAGE GUIDANCE ---');
  Object.entries(quadrantLeverageGuide).forEach(([q, guide]) => {
    lines.push(`${q}: ${(guide as Record<string, unknown>)?.leverageRationale || ''}`);
  });
  if (archetypeName) { lines.push(`Active archetype "${archetypeName}" should strongly influence strategy design.`); }
  if (leveragePoints.length > 0) {
    lines.push('Prioritize strategies that target these Meadows leverage levels:');
    const sorted = [...leveragePoints].sort((a, b) => a.leverageLevel - b.leverageLevel);
    sorted.forEach(lp => lines.push(`  - L${lp.leverageLevel} (${lp.meadowsName}): ${lp.intervention}`));
  }
  return lines.join('\n');
}

export default StrategyMatrix;
