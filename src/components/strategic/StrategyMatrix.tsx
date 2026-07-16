import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles, Loader2, Check, Star, ArrowRight, Shield, AlertCircle, Lightbulb, Zap, Plus, Trash2, Edit2, X, AlertTriangle, Info, Target, GitBranch, ChevronDown, ChevronUp, Brain, Layers, TrendingUp, Activity, BookOpen, Gauge, Clock, Workflow, Crosshair, Anchor, BarChart2, Link as LinkIcon,
} from 'lucide-react';
import { StrategicOption, StrategicPlan, SWOTItem } from '@/lib/strategicPlanStore';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

// Edge Function URLs
const AI_ASSISTANT_URL = 'https://rgvteytgkugdqdodedxq.supabase.co/functions/v1/ai-strategy-assistant';
const SYNC_URL = 'https://rgvteytgkugdqdodedxq.supabase.co/functions/v1/strategic-planner-sync';

export interface LeveragePoint { archetypeId?: string; leverageLevel: number; meadowsName: string; intervention: string; targetNodeIds: string[]; expectedImpact: 'high' | 'medium' | 'low'; timeHorizon: 'short' | 'medium' | 'long'; source: 'archetype' | 'cld-analysis'; }
export interface CLDNode { id: string; label: string; category?: string; }
export interface CLDLink { from: string; to: string; polarity: '+' | '-'; strength?: number; }

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
}

const QUADRANT_TYPES = ['SO', 'ST', 'WO', 'WT'] as const;
type QuadrantType = typeof QUADRANT_TYPES[number];

const quadrantConfig = {
  SO: { label: 'SO Strategies', subtitle: 'Strengths + Opportunities', description: 'Use strengths to capitalize on opportunities', color: 'emerald', bgGradient: 'from-emerald-500 to-teal-600', lightBg: 'bg-[#059669]/10', border: 'border-[#059669]/20', textColor: 'text-[#34d399]', icons: [Shield, Lightbulb], leverageLevels: [7, 4, 8], leverageRationale: 'Amplify reinforcing growth loops & self-organizing capabilities' },
  ST: { label: 'ST Strategies', subtitle: 'Strengths + Threats', description: 'Use strengths to mitigate threats', color: 'blue', bgGradient: 'from-blue-500 to-indigo-600', lightBg: 'bg-[#C9A84C]/10', border: 'border-[#C9A84C]/20', textColor: 'text-[#C9A84C]', icons: [Shield, Zap], leverageLevels: [8, 5, 6], leverageRationale: 'Strengthen balancing loops, governance rules & information access' },
  WO: { label: 'WO Strategies', subtitle: 'Weaknesses + Opportunities', description: 'Overcome weaknesses by pursuing opportunities', color: 'purple', bgGradient: 'from-purple-500 to-violet-600', lightBg: 'bg-purple-500/10', border: 'border-purple-500/20', textColor: 'text-purple-400', icons: [AlertCircle, Lightbulb], leverageLevels: [3, 6, 9], leverageRationale: 'Redefine goals, expose information gaps & reduce structural delays' },
  WT: { label: 'WT Strategies', subtitle: 'Weaknesses + Threats', description: 'Minimize weaknesses and avoid threats', color: 'amber', bgGradient: 'from-amber-500 to-orange-600', lightBg: 'bg-amber-500/10', border: 'border-amber-500/20', textColor: 'text-amber-400', icons: [AlertCircle, Zap], leverageLevels: [2, 5, 10], leverageRationale: 'Challenge paradigms, restructure stock-flow & establish defensive rules' },
};

const MEADOWS_ICONS: Record<number, React.ElementType> = { 12: Gauge, 11: Anchor, 10: Workflow, 9: Clock, 8: Activity, 7: TrendingUp, 6: BarChart2, 5: BookOpen, 4: Sparkles, 3: Target, 2: Brain, 1: Crosshair };
const MEADOWS_LEVEL_COLORS: Record<string, string> = { high: 'bg-violet-600 text-white', mid: 'bg-red-500/100 text-white', feedback: 'bg-amber-500/100 text-white', params: 'bg-slate-400 text-white' };
const getMeadowsBadgeColor = (level: number) => { if (level <= 3) return MEADOWS_LEVEL_COLORS.high; if (level <= 6) return MEADOWS_LEVEL_COLORS.mid; if (level <= 9) return MEADOWS_LEVEL_COLORS.feedback; return MEADOWS_LEVEL_COLORS.params; };

const SCORE_DESCRIPTIONS = {
  1: { priority: 'Lowest priority', feasibility: 'Very difficult' },
  2: { priority: 'Low priority', feasibility: 'Difficult' },
  3: { priority: 'Medium priority', feasibility: 'Moderate' },
  4: { priority: 'High priority', feasibility: 'Easy' },
  5: { priority: 'Highest priority', feasibility: 'Very easy' },
};

const TOTAL_SCORE_GUIDE = [
  { range: '9-10', color: 'text-[#34d399]', bg: 'bg-[#059669]/10', label: 'Excellent' },
  { range: '7-8', color: 'text-[#C9A84C]', bg: 'bg-[#C9A84C]/10', label: 'Good' },
  { range: '5-6', color: 'text-amber-400', bg: 'bg-amber-500/100/10', label: 'Fair' },
  { range: '<5', color: 'text-[#ecfdf5]/80', bg: 'bg-[#064e3b]/20', label: 'Low' },
];

const getTotalScoreTier = (total: number) => TOTAL_SCORE_GUIDE.find(t => { if (t.range.includes('<')) return total < parseInt(t.range.substring(1)); const [min, max] = t.range.split('-').map(Number); return total >= min && total <= max; }) ?? TOTAL_SCORE_GUIDE[3];

const getLeveragePointsForQuadrant = (leveragePoints: LeveragePoint[], quadrant: QuadrantType): LeveragePoint[] => {
  const affinityLevels = quadrantConfig[quadrant].leverageLevels;
  const exact = leveragePoints.filter(lp => affinityLevels.includes(lp.leverageLevel));
  const highImp = leveragePoints.filter(lp => !affinityLevels.includes(lp.leverageLevel) && lp.expectedImpact === 'high');
  return [...exact, ...highImp].slice(0, 3);
};

const buildSystemsContext = (leveragePoints: LeveragePoint[], archetypeName: string | null | undefined, archetypeDescription: string | null | undefined, cldNodes: CLDNode[], cldLinks: CLDLink[]): string => {
  const lines: string[] = [];
  if (archetypeName) { lines.push(`ACTIVE SYSTEMS ARCHETYPE: "${archetypeName}"`); if (archetypeDescription) lines.push(`  Description: ${archetypeDescription}`); lines.push(''); }
  if (cldNodes.length > 0) {
    lines.push('CAUSAL LOOP DIAGRAM (CLD) VARIABLES:');
    cldNodes.forEach(n => lines.push(`  - ${n.label}${n.category ? ` [${n.category}]` : ''}`));
    lines.push('');
    if (cldLinks.length > 0) {
      lines.push('CLD CAUSAL RELATIONSHIPS:');
      cldLinks.forEach(l => {
        const fromNode = cldNodes.find(n => n.id === l.from)?.label ?? l.from;
        const toNode = cldNodes.find(n => n.id === l.to)?.label ?? l.to;
        lines.push(`  ${fromNode} ${l.polarity === '+' ? '→(+)' : '→(−)'} ${toNode}${(l.strength ?? 0) >= 4 ? ' [HIGH GAIN]' : ''}`);
      });
    }
  }
  if (leveragePoints.length > 0) {
    lines.push('MEADOWS LEVERAGE POINTS:');
    [...leveragePoints].sort((a, b) => a.leverageLevel - b.leverageLevel).forEach(lp => lines.push(`  [L${lp.leverageLevel} — ${lp.meadowsName}] (${lp.expectedImpact} impact / ${lp.timeHorizon}-term) → ${lp.intervention}`));
  }
  return lines.join('\n');
};

const ScoreButton: React.FC<{ value: number; selectedValue: number; onSelect: (value: number) => void; type: 'priority' | 'feasibility'; Icon?: React.ElementType; }> = ({ value, selectedValue, onSelect, type, Icon = Check }) => {
  const description = SCORE_DESCRIPTIONS[value as keyof typeof SCORE_DESCRIPTIONS];
  return (
    <TooltipProvider><Tooltip><TooltipTrigger asChild>
      <button onClick={() => onSelect(value)} className="transition-all transform hover:scale-110 active:scale-95">
        {Icon === Star ? <Star className={cn('w-4 h-4 transition-colors', value <= selectedValue ? 'text-amber-400 fill-current' : 'text-[#64748b]')} /> : <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center', value <= selectedValue ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-[#C9A84C]/30 hover:border-[#C9A84C]/30')}>{value <= selectedValue && <Check className="w-3 h-3 text-white" />}</div>}
      </button>
    </TooltipTrigger><TooltipContent side="top" className="max-w-[200px] z-50"><p className="font-semibold text-[#C9A84C]">{type} Level {value}</p><p className="text-xs text-[#ecfdf5]/80">{type === 'priority' ? description.priority : description.feasibility}</p></TooltipContent></Tooltip></TooltipProvider>
  );
};

const LeverageBadge: React.FC<{ lp: LeveragePoint }> = ({ lp }) => {
  const Icon = MEADOWS_ICONS[lp.leverageLevel] ?? Target;
  return (
    <TooltipProvider><Tooltip><TooltipTrigger asChild>
      <div className={cn('flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold cursor-help', getMeadowsBadgeColor(lp.leverageLevel))}><Icon className="w-3 h-3" /> L{lp.leverageLevel}</div>
    </TooltipTrigger><TooltipContent side="bottom" className="max-w-[260px] z-50 space-y-1"><p className="font-semibold text-violet-700">[L{lp.leverageLevel}] {lp.meadowsName}</p><p className="text-xs text-[#ecfdf5]/80">{lp.intervention}</p></TooltipContent></Tooltip></TooltipProvider>
  );
};

const StrategyCard: React.FC<{ option: StrategicOption; config: typeof quadrantConfig.SO; onUpdate: (updates: Partial<StrategicOption>) => void; onRemove: () => void; }> = ({ option, config, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(option.title);
  const [editDesc, setEditDesc] = useState(option.description);
  const handleSave = () => { onUpdate({ title: editTitle, description: editDesc }); setIsEditing(false); };
  const total = (option.priorityScore || 3) + (option.feasibilityScore || 3);
  const scoreTier = getTotalScoreTier(total);

  return (
    <div className={cn(`${config.lightBg} ${config.border} border rounded-xl p-4 group hover:shadow-md transition-all`, option.selected && 'ring-2 ring-[#C9A84C] ring-offset-2')}>
      {isEditing ? (
        <div className="space-y-3">
          <input type="text" value={editTitle} autoFocus onChange={e => setEditTitle(e.target.value)} className="w-full px-3 py-2 text-sm font-medium border border-[#C9A84C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]" />
          <textarea value={editDesc} rows={3} onChange={e => setEditDesc(e.target.value)} className="w-full px-3 py-2 text-sm border text-foreground bg-background border-[#C9A84C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] resize-none" />
          <div className="flex justify-end gap-2">
            <button onClick={() => { setEditTitle(option.title); setEditDesc(option.description); setIsEditing(false); }} className="px-3 py-1.5 text-sm text-[#ecfdf5]/80 rounded-lg">Cancel</button>
            <button onClick={handleSave} className="px-3 py-1.5 text-sm bg-[#C9A84C] text-white rounded-lg">Save</button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <button onClick={() => onUpdate({ selected: !option.selected })} className={cn('w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0', option.selected ? 'bg-[#C9A84C] border-[#C9A84C] text-white' : 'border-[#C9A84C]/30 hover:border-[#C9A84C]')}>{option.selected && <Check className="w-3 h-3" />}</button>
              <h4 className="font-semibold text-[#E8C560] truncate">{option.title}</h4>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setIsEditing(true)} className="p-1.5 text-[#64748b]/80 hover:text-[#ecfdf5]/80 rounded-full hover:bg-[#064e3b]/20"><Edit2 className="w-3.5 h-3.5" /></button>
              <button onClick={onRemove} className="p-1.5 text-red-400 hover:text-red-400 rounded-full hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <p className="text-sm text-[#ecfdf5]/80 mb-3 line-clamp-2">{option.description}</p>
          <div className="flex items-center justify-between pt-3 border-t border-[#C9A84C]/20/50 flex-wrap gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-[#ecfdf5]/80">Priority:</span>
                <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(n => <ScoreButton key={n} value={n} selectedValue={option.priorityScore || 3} onSelect={val => onUpdate({ priorityScore: val })} type="priority" Icon={Star} />)}</div>
                <span className={cn('text-xs font-semibold w-5 text-center', (option.priorityScore || 3) >= 4 ? 'text-amber-400' : 'text-[#64748b]')}>{option.priorityScore || 3}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-[#ecfdf5]/80">Feasibility:</span>
                <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(n => <ScoreButton key={n} value={n} selectedValue={option.feasibilityScore || 3} onSelect={val => onUpdate({ feasibilityScore: val })} type="feasibility" />)}</div>
                <span className={cn('text-xs font-semibold w-5 text-center', (option.feasibilityScore || 3) >= 4 ? 'text-[#C9A84C]' : 'text-[#64748b]')}>{option.feasibilityScore || 3}</span>
              </div>
            </div>
            <div className={cn('px-3 py-1.5 rounded-full text-xs font-bold', scoreTier.bg, scoreTier.color)}>Score: {total}/10</div>
          </div>
        </>
      )}
    </div>
  );
};

const SystemsContextPanel: React.FC<{ leveragePoints: LeveragePoint[]; archetypeName?: string | null; archetypeDescription?: string | null; cldNodes: CLDNode[]; cldLinks: CLDLink[]; }> = ({ leveragePoints, archetypeName, archetypeDescription, cldNodes, cldLinks }) => {
  const [expanded, setExpanded] = useState(true);
  const highLPs = leveragePoints.filter(lp => lp.leverageLevel <= 4);
  const midLPs = leveragePoints.filter(lp => lp.leverageLevel >= 5 && lp.leverageLevel <= 7);
  const lowLPs = leveragePoints.filter(lp => lp.leverageLevel >= 8);

  return (
    <div className="rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 overflow-hidden">
      <button onClick={() => setExpanded(v => !v)} className="w-full flex items-center justify-between px-4 py-3 text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center"><GitBranch className="w-4 h-4 text-white" /></div>
          <div>
            <h3 className="font-semibold text-violet-900 text-sm">Systems Thinking Context</h3>
            <p className="text-[11px] text-violet-600">{archetypeName ? `Archetype: ${archetypeName}` : 'No archetype active'} · {leveragePoints.length} LPs · {cldNodes.length} CLD variables</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-violet-500" /> : <ChevronDown className="w-4 h-4 text-violet-500" />}
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-violet-200/60">
          {archetypeName && <div className="flex items-start gap-3 pt-3"><div className="w-6 h-6 rounded bg-violet-200 flex items-center justify-center shrink-0 mt-0.5"><Layers className="w-3.5 h-3.5 text-violet-700" /></div><div><p className="text-xs font-semibold text-violet-800">{archetypeName}</p>{archetypeDescription && <p className="text-[11px] text-violet-600 leading-relaxed mt-0.5">{archetypeDescription}</p>}</div></div>}
          {leveragePoints.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-violet-500">Identified Leverage Points</p>
              <div className="flex flex-wrap gap-1.5 text-[9px] font-bold">
                <span className="px-2 py-0.5 rounded bg-violet-600 text-white">L1–3: Paradigm</span>
                <span className="px-2 py-0.5 rounded bg-red-500/100 text-white">L4–6: Info/Rules</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/100 text-white">L7–9: Feedback</span>
                <span className="px-2 py-0.5 rounded bg-slate-400 text-white">L10–12: Params</span>
              </div>
              {[{ label: 'High Leverage', lps: highLPs }, { label: 'Mid Leverage', lps: midLPs }, { label: 'Lower Leverage', lps: lowLPs }].map(({ label, lps }) => lps.length > 0 && (
                <div key={label}>
                  <p className="text-[10px] text-[#64748b] font-medium mb-1.5">{label}</p>
                  <div className="space-y-1.5">
                    {lps.map((lp, i) => {
                      const Icon = MEADOWS_ICONS[lp.leverageLevel] ?? Target;
                      return (
                        <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/70 border border-violet-100">
                          <span className={cn('shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded mt-0.5', getMeadowsBadgeColor(lp.leverageLevel))}>L{lp.leverageLevel}</span>
                          <div className="flex-1 min-w-0"><p className="text-[11px] font-semibold text-[#E8C560]/90 truncate">{lp.meadowsName}</p><p className="text-[10px] text-[#64748b] leading-relaxed line-clamp-2">{lp.intervention}</p></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const StrategyMatrix: React.FC<StrategyMatrixProps> = ({ plan, onAddOption, onUpdateOption, onRemoveOption, onBulkAdd, leveragePoints = [], selectedArchetypeId = null, selectedArchetypeName = null, activeArchetypeDescription = null, cldNodes = [], cldLinks = [] }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [newStrategy, setNewStrategy] = useState<{ quadrant: QuadrantType | null; title: string; description: string; }>({ quadrant: null, title: '', description: '' });

  const hasSystemsContext = leveragePoints.length > 0 || cldNodes.length > 0 || !!selectedArchetypeName;

  // Auto-sync plan to cloud
  useEffect(() => {
    const syncPlan = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) return;
        await fetch(SYNC_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
          body: JSON.stringify({ plan }),
        });
      } catch (error) { console.error('Failed to sync plan to cloud:', error); }
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

      const strengths = (plan.swotItems || []).filter(i => i.category === 'strength').map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      const weaknesses = (plan.swotItems || []).filter(i => i.category === 'weakness').map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      const opportunities = (plan.swotItems || []).filter(i => i.category === 'opportunity').map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      const threats = (plan.swotItems || []).filter(i => i.category === 'threat').map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));

      const systemsContext = hasSystemsContext ? buildSystemsContext(leveragePoints, selectedArchetypeName, activeArchetypeDescription, cldNodes, cldLinks) : null;
      const quadrantLeverageGuide = QUADRANT_TYPES.reduce<Record<string, any>>((acc, q) => {
        const qLPs = getLeveragePointsForQuadrant(leveragePoints, q);
        acc[q] = { leverageRationale: quadrantConfig[q].leverageRationale, relevantLeveragePoints: qLPs.map(lp => ({ level: lp.leverageLevel, meadowsName: lp.meadowsName, intervention: lp.intervention, expectedImpact: lp.expectedImpact, timeHorizon: lp.timeHorizon })) };
        return acc;
      }, {} as Record<string, any>);

      const response = await fetch(AI_ASSISTANT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
        body: JSON.stringify({
          action: 'generate_strategies',
          data: {
            strengths, weaknesses, opportunities, threats,
            strategicIntent: plan.strategicIntent,
            systemsContext,
            activeArchetype: selectedArchetypeName ? { id: selectedArchetypeId, name: selectedArchetypeName, description: activeArchetypeDescription } : null,
            leveragePoints: leveragePoints.map(lp => ({ level: lp.leverageLevel, meadowsName: lp.meadowsName, intervention: lp.intervention, impact: lp.expectedImpact, horizon: lp.timeHorizon, source: lp.source })),
            cldVariables: cldNodes.map(n => ({ label: n.label, category: n.category })),
            cldRelationships: cldLinks.map(l => ({ from: cldNodes.find(n => n.id === l.from)?.label ?? l.from, to: cldNodes.find(n => n.id === l.to)?.label ?? l.to, polarity: l.polarity, strength: l.strength })),
            quadrantLeverageGuide,
            generationInstructions: buildGenerationInstructions(strengths.map(s => s.description), weaknesses.map(w => w.description), opportunities.map(o => o.description), threats.map(t => t.description), plan.strategicIntent, systemsContext, selectedArchetypeName, leveragePoints, quadrantLeverageGuide),
          },
          plan: plan,
        }),
      });

      const result = await response.json();
      if (!result.success || !result.data) throw new Error('Invalid response from AI service');

      const options: Omit<StrategicOption, 'id'>[] = [];
      QUADRANT_TYPES.forEach(type => {
        const strategies = result.data[type] || [];
        strategies.forEach((s: any) => {
          options.push({ optionType: type, title: s.title || 'Strategy', description: s.description || '', priorityScore: s.priority_score || 3, feasibilityScore: s.feasibility_score || 3, selected: false });
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
    onAddOption({ optionType: newStrategy.quadrant, title: newStrategy.title.trim(), description: newStrategy.description.trim(), priorityScore: 3, feasibilityScore: 3, selected: false });
    setNewStrategy({ quadrant: null, title: '', description: '' });
  };

  const getOptionsByType = (type: QuadrantType) => (plan.strategicOptions || []).filter(opt => opt.optionType === type);
  const selectedCount = (plan.strategicOptions || []).filter(opt => opt.selected).length;
  const swotCounts = useMemo(() => ({ strengths: (plan.swotItems || []).filter(i => i.category === 'strength').length, weaknesses: (plan.swotItems || []).filter(i => i.category === 'weakness').length, opportunities: (plan.swotItems || []).filter(i => i.category === 'opportunity').length, threats: (plan.swotItems || []).filter(i => i.category === 'threat').length }), [plan.swotItems]);
  const canGenerate = swotCounts.strengths > 0 && swotCounts.weaknesses > 0 && swotCounts.opportunities > 0 && swotCounts.threats > 0;

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#E8C560]">Strategy Matrix</h1>
            <p className="text-[#64748b]">Generate and prioritize SO/ST/WO/WT strategic options{hasSystemsContext ? ' · systems-informed' : ''}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-[#ecfdf5]/80"><span className="font-medium text-[#C9A84C]">{selectedCount}</span> selected</div>
            <button onClick={handleGenerateStrategies} disabled={isGenerating || !canGenerate} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#065f46] to-[#4c1d95] text-white rounded-xl text-sm font-medium hover:shadow-lg disabled:opacity-50 transition-all">
              {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <><Sparkles className="w-4 h-4" /> AI Generate{hasSystemsContext ? ' (Systems-Aware)' : ''}</>}
            </button>
          </div>
        </div>

        {hasSystemsContext && <SystemsContextPanel leveragePoints={leveragePoints} archetypeName={selectedArchetypeName} archetypeDescription={activeArchetypeDescription} cldNodes={cldNodes} cldLinks={cldLinks} />}
        {!canGenerate && <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center gap-3"><AlertCircle className="w-5 h-5 text-amber-400" /><div><p className="text-sm font-medium text-amber-800">Complete SWOT Analysis First</p><p className="text-xs text-amber-400">Current: {swotCounts.strengths}S, {swotCounts.weaknesses}W, {swotCounts.opportunities}O, {swotCounts.threats}T</p></div></div>}
        {generationError && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3"><AlertTriangle className="w-5 h-5 text-red-400" /><p className="text-sm font-medium text-red-800">{generationError}</p></div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {QUADRANT_TYPES.map(type => {
            const config = quadrantConfig[type];
            const options = getOptionsByType(type);
            const [Icon1, Icon2] = config.icons;
            return (
              <div key={type} className="bg-white rounded-xl border border-[#C9A84C]/20 overflow-hidden shadow-sm">
                <div className={`bg-gradient-to-r ${config.bgGradient} px-4 py-3`}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1"><Icon1 className="w-5 h-5 text-white/80" /><ArrowRight className="w-4 h-4 text-white/60" /><Icon2 className="w-5 h-5 text-white/80" /></div>
                    <div><h3 className="font-semibold text-white">{config.label}</h3><p className="text-xs text-white/70">{config.description}</p></div>
                    <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-sm text-white">{options.length}</span>
                  </div>
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {options.map(option => <StrategyCard key={option.id} option={option} config={config} onUpdate={updates => onUpdateOption(option.id, updates)} onRemove={() => onRemoveOption(option.id)} />)}
                  {newStrategy.quadrant === type ? (
                    <div className={cn(`${config.lightBg} ${config.border} border rounded-xl p-4 space-y-3`)}>
                      <input type="text" autoFocus value={newStrategy.title} onChange={e => setNewStrategy(p => ({ ...p, title: e.target.value }))} className="w-full px-3 py-2 text-sm font-medium border border-[#C9A84C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]" placeholder="Strategy title" />
                      <textarea value={newStrategy.description} rows={2} onChange={e => setNewStrategy(p => ({ ...p, description: e.target.value }))} className="w-full px-3 py-2 text-sm border text-foreground bg-background border-[#C9A84C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] resize-none" placeholder="Strategy description" />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setNewStrategy({ quadrant: null, title: '', description: '' })} className="px-3 py-1.5 text-sm text-[#ecfdf5]/80 rounded-lg">Cancel</button>
                        <button onClick={handleAddStrategy} disabled={!newStrategy.title.trim()} className="px-3 py-1.5 text-sm bg-[#C9A84C] text-white rounded-lg disabled:opacity-50">Add Strategy</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setNewStrategy({ quadrant: type, title: '', description: '' })} className={cn('w-full py-3 border-2 border-dashed rounded-xl text-sm font-medium text-[#64748b] hover:text-[#E8C560]/90 hover:border-slate-400 transition-colors flex items-center justify-center gap-2', config.lightBg)}><Plus className="w-4 h-4" /> Add {type} Strategy</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {selectedCount > 0 && (
          <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-xl p-6">
            <h3 className="font-semibold text-[#C9A84C] mb-4 flex items-center gap-2"><Check className="w-5 h-5" /> Selected Strategic Options ({selectedCount})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(plan.strategicOptions || []).filter(opt => opt.selected).sort((a, b) => ((b.priorityScore || 3) + (b.feasibilityScore || 3)) - ((a.priorityScore || 3) + (a.feasibilityScore || 3))).map(opt => {
                const total = (opt.priorityScore || 3) + (opt.feasibilityScore || 3);
                const tier = getTotalScoreTier(total);
                return (
                  <div key={opt.id} className="bg-white rounded-lg p-3 border border-[#C9A84C]/20 flex items-start gap-3 hover:shadow-sm transition-shadow">
                    <span className={cn('px-2 py-1 rounded text-xs font-bold text-white shrink-0', opt.optionType === 'SO' ? 'bg-[#059669]' : opt.optionType === 'ST' ? 'bg-[#C9A84C]' : opt.optionType === 'WO' ? 'bg-purple-500/100' : 'bg-amber-500/100')}>{opt.optionType}</span>
                    <div className="flex-1 min-w-0"><p className="font-medium text-[#E8C560] text-sm truncate">{opt.title}</p><p className={cn('text-xs font-semibold', tier.color)}>Score: {total}/10</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

function buildGenerationInstructions(strengths: string[], weaknesses: string[], opportunities: string[], threats: string[], strategicIntent: string | undefined, systemsContext: string | null, archetypeName: string | null | undefined, leveragePoints: LeveragePoint[], quadrantLeverageGuide: Record<string, any>): string {
  const lines: string[] = [];
  lines.push('=== STRATEGY GENERATION TASK ===');
  lines.push('Generate 2–3 CONCRETE, ACTIONABLE strategic options for each TOWS quadrant.');
  lines.push('CRITICAL REQUIREMENTS:');
  lines.push('  1. Each strategy MUST directly reference at least one strength/weakness AND one opportunity/threat.');
  lines.push('  2. Assign priority_score (1–5) and feasibility_score (1–5).');
  lines.push('  3. DO NOT produce generic strategies — every option must be traceable to specific SWOT items.');
  if (strategicIntent) { lines.push(`STRATEGIC INTENT: "${strategicIntent}"`); lines.push(''); }
  lines.push('─── SWOT INVENTORY ───');
  if (strengths.length > 0) { lines.push('STRENGTHS:'); strengths.forEach((s, i) => lines.push(`  S${i + 1}: ${s}`)); }
  if (weaknesses.length > 0) { lines.push('WEAKNESSES:'); weaknesses.forEach((w, i) => lines.push(`  W${i + 1}: ${w}`)); }
  if (opportunities.length > 0) { lines.push('OPPORTUNITIES:'); opportunities.forEach((o, i) => lines.push(`  O${i + 1}: ${o}`)); }
  if (threats.length > 0) { lines.push('THREATS:'); threats.forEach((t, i) => lines.push(`  T${i + 1}: ${t}`)); }
  if (systemsContext) { lines.push('─── SYSTEMS THINKING CONTEXT ───'); lines.push(systemsContext); }
  lines.push('─── OUTPUT FORMAT ───');
  lines.push('Return a JSON object with keys "SO", "ST", "WO", "WT". Each key maps to an array of strategy objects:');
  lines.push('{ "SO": [{ "title": "...", "description": "...", "priority_score": 4, "feasibility_score": 3 }], ... }');
  return lines.join('\n');
}

export default StrategyMatrix;
