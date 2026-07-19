import React, { useState, useMemo, useEffect } from 'react';
import {
  FolderKanban,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  DollarSign,
  User,
  Target,
  Check,
  X,
  Filter,
  LayoutGrid,
  List,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { PAP, StrategicPlan, BSCObjective } from '@/lib/strategicPlanStore';
import { supabase } from '@/lib/supabase';

// Edge Function URLs
const AI_URL = 'https://lydsisparsmvextskevw.supabase.co/functions/v1/ai-strategy-assistant';
const SYNC_URL = 'https://lydsisparsmvextskevw.supabase.co/functions/v1/strategic-planner-sync';
const EMAIL_URL = 'https://lydsisparsmvextskevw.supabase.co/functions/v1/email-notifications';

interface PAPsManagementProps {
  plan: StrategicPlan;
  onAddPAP: (pap: Omit<PAP, 'id'>) => void;
  onUpdatePAP: (id: string, updates: Partial<PAP>) => void;
  onRemovePAP: (id: string) => void;
}

const typeConfig = {
  program: { label: 'Program', color: 'purple', bgColor: 'bg-purple-500/100', lightBg: 'bg-purple-500/10' },
  activity: { label: 'Activity', color: 'blue', bgColor: 'bg-[#C9A84C]', lightBg: 'bg-[#C9A84C]/10' },
  project: { label: 'Project', color: 'cyan', bgColor: 'bg-[#C9A84C]', lightBg: 'bg-[#C9A84C]/10' },
};

const statusConfig = {
  planned: { label: 'Planned', bgColor: 'bg-[#064e3b]/20 dark:bg-[#022c22]/60', textColor: 'text-[#ecfdf5]/80 dark:text-[#64748b]/80', borderColor: 'border-[#C9A84C]/20 dark:border-[#C9A84C]/20' },
  'in-progress': { label: 'In Progress', bgColor: 'bg-[#C9A84C]/10', textColor: 'text-[#C9A84C]', borderColor: 'border-[#C9A84C]/20' },
  completed: { label: 'Completed', bgColor: 'bg-[#059669]/10', textColor: 'text-[#34d399]', borderColor: 'border-[#059669]/20' },
  delayed: { label: 'Delayed', bgColor: 'bg-red-500/100/10', textColor: 'text-red-400', borderColor: 'border-red-500/20' },
  cancelled: { label: 'Cancelled', bgColor: 'bg-slate-200', textColor: 'text-[#64748b] dark:text-[#64748b]/80', borderColor: 'border-[#C9A84C]/30 dark:border-[#C9A84C]/20' },
};

const PAPCard = ({ pap, objectives, onUpdate, onRemove }: { 
  pap: PAP; 
  objectives: BSCObjective[]; 
  onUpdate: (updates: Partial<PAP>) => void; 
  onRemove: () => void 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(pap);

  useEffect(() => {
    setEditData(pap);
  }, [pap]);

  const typeConf = typeConfig[pap.papType] || typeConfig.project;
  const statusConf = statusConfig[pap.status] || statusConfig.planned;
  
  const budgetUsed = useMemo(() => {
    if (!pap.budget || pap.budget <= 0) return 0;
    return (pap.spent / pap.budget) * 100;
  }, [pap.spent, pap.budget]);

  const linkedObjective = useMemo(() => 
    objectives.find((obj) => obj.id === pap.objectiveId),
    [objectives, pap.objectiveId]
  );

  const handleSave = () => {
    if (!editData.name.trim()) return;
    onUpdate(editData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-[#022c22]/60/60 rounded-xl border-2 border-[#C9A84C] p-4 space-y-4 shadow-xl ring-4 ring-[#C9A84C]/10">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">Name</label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 text-sm border text-foreground bg-background border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">Type</label>
            <select
              value={editData.papType}
              onChange={(e) => setEditData((prev) => ({ ...prev, papType: e.target.value as PAP['papType'] }))}
              className="w-full px-3 py-2 text-sm border text-foreground bg-background border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
            >
              <option value="program">Program</option>
              <option value="activity">Activity</option>
              <option value="project">Project</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">Status</label>
            <select
              value={editData.status}
              onChange={(e) => setEditData((prev) => ({ ...prev, status: e.target.value as PAP['status'] }))}
              className="w-full px-3 py-2 text-sm border text-foreground bg-background border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
            >
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">Budget ($)</label>
            <input
              type="number"
              value={editData.budget}
              onChange={(e) => setEditData((prev) => ({ ...prev, budget: parseFloat(e.target.value) || 0 }))}
              className="w-full px-3 py-2 text-sm border text-foreground bg-background border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">Spent ($)</label>
            <input
              type="number"
              value={editData.spent}
              onChange={(e) => setEditData((prev) => ({ ...prev, spent: parseFloat(e.target.value) || 0 }))}
              className="w-full px-3 py-2 text-sm border text-foreground bg-background border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">Linked Objective</label>
            <select
              value={editData.objectiveId || ''}
              onChange={(e) => setEditData((prev) => ({ ...prev, objectiveId: e.target.value || undefined }))}
              className="w-full px-3 py-2 text-sm border text-foreground bg-background border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
            >
              <option value="">None</option>
              {objectives.map((obj) => (
                <option key={obj.id} value={obj.id}>{obj.objective}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={() => setIsEditing(false)} className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-[#ecfdf5]/80 hover:bg-[#064e3b]/20 rounded-lg">
            <X className="w-4 h-4" /> Cancel
          </button>
          <button onClick={handleSave} className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-[#C9A84C] text-white hover:bg-[#C9A84C] rounded-lg">
            <Check className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#022c22]/60/60 rounded-xl border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 p-4 hover:shadow-xl hover:border-[#C9A84C]/20 transition-all group relative overflow-hidden flex flex-col h-full">
      <div className={`absolute top-0 right-0 w-24 h-1 ${typeConf.bgColor}`} />
      
      <div className="flex items-start justify-between mb-3">
        <div className={`flex items-center gap-2 px-2 py-1 rounded-md ${typeConf.lightBg}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${typeConf.bgColor}`} />
          <span className={`text-[10px] font-bold uppercase tracking-wider ${typeConf.color === 'purple' ? 'text-purple-400' : typeConf.color === 'blue' ? 'text-[#C9A84C]' : 'text-[#C9A84C]'}`}>
            {typeConf.label}
          </span>
        </div>
        <div className="flex items-center gap-1">
           <button onClick={() => setIsEditing(true)} className="p-1.5 text-[#64748b]/80 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onRemove} className="p-1.5 text-[#64748b]/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-grow">
        <h4 className="font-bold text-[#E8C560] dark:text-[#ecfdf5] leading-tight mb-2 group-hover:text-[#C9A84C] transition-colors">
          {pap.name}
        </h4>
        
        {pap.description && (
          <p className="text-xs text-[#64748b] dark:text-[#64748b]/80 mb-4 line-clamp-2 italic">
            "{pap.description}"
          </p>
        )}

        <div className="space-y-4 mb-4">
          {linkedObjective && (
            <div className="flex items-start gap-2 p-2 bg-[#064e3b]/10 dark:bg-[#022c22] rounded-lg border border-slate-100 dark:border-[#C9A84C]/20/60">
              <Target className="w-3.5 h-3.5 text-[#64748b]/80 mt-0.5" />
              <div className="flex-1">
                <p className="text-[10px] uppercase font-bold text-[#64748b]/80 leading-none mb-1">Aligned Objective</p>
                <p className="text-xs text-[#E8C560]/90 dark:text-[#ecfdf5]/90 font-medium line-clamp-1">{linkedObjective.objective}</p>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-[#64748b]/80 uppercase tracking-tight">Current Progress</span>
              <span className="text-xs font-bold text-[#E8C560]/90 dark:text-[#ecfdf5]/90">{pap.progress}%</span>
            </div>
            <div className="h-1.5 bg-[#064e3b]/20 dark:bg-[#022c22]/60 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-out rounded-full ${pap.progress >= 100 ? 'bg-[#059669]' : 'bg-gradient-to-r from-[#C9A84C] to-blue-500'}`}
                style={{ width: `${pap.progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-[#64748b]/80" />
                <span className="text-[10px] font-bold text-[#64748b]/80 uppercase tracking-tight">Budget Utilization</span>
              </div>
              <span className="text-xs font-bold text-[#E8C560]/90 dark:text-[#ecfdf5]/90">
                ${(pap.spent / 1000).toFixed(1)}k / ${(pap.budget / 1000).toFixed(1)}k
              </span>
            </div>
            <div className="h-1.5 bg-[#064e3b]/20 dark:bg-[#022c22]/60 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 rounded-full ${
                  budgetUsed > 100 ? 'bg-red-500/100 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 
                  budgetUsed > 90 ? 'bg-amber-500/100' : 
                  'bg-[#059669]'
                }`}
                style={{ width: `${Math.min(budgetUsed, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-[#C9A84C]/20/60">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#064e3b]/20 dark:bg-[#022c22]/60 border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 flex items-center justify-center text-[10px] font-bold text-[#ecfdf5]/80 dark:text-[#64748b]/80">
              {pap.ownerName ? pap.ownerName.split(' ').map(n => n[0]).join('') : <User className="w-3 h-3" />}
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#64748b]/80 uppercase leading-none mb-0.5">Owner</p>
              <p className="text-xs font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90">{pap.ownerName || pap.owner || 'Unassigned'}</p>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusConf.bgColor} ${statusConf.textColor} ${statusConf.borderColor}`}>
            {statusConf.label}
          </span>
        </div>

        <div className="flex items-center justify-between text-[10px] font-medium text-[#64748b]/80 bg-[#064e3b]/10 dark:bg-[#022c22] p-2 rounded-lg">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(pap.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="h-px w-4 bg-slate-200" />
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(pap.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PAPsManagement: React.FC<PAPsManagementProps> = ({ plan, onAddPAP, onUpdatePAP, onRemovePAP }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [newPAP, setNewPAP] = useState({
    papType: 'project' as const,
    name: '',
    description: '',
    owner: '',
    ownerName: '',
    budget: 0,
    spent: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    progress: 0,
    status: 'planned' as const,
  });

  // ─── EDGE FUNCTION INTEGRATIONS ─────────────────────────────────────────────
  
  // 1. Auto-Sync to Cloud (Debounced)
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

  // 2. Email Notification for Delayed PAPs
  const sendPapAlertEmail = async (pap: PAP) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return;

      await fetch(EMAIL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          type: 'stale_plan_reminder', // Reusing this type for PAP delays
          user_id: session.user.id,
          data: {
            plan_name: plan.name,
            days_inactive: 1,
            plan_id: plan.id,
          },
        }),
      });
    } catch (error) {
      console.error('Failed to send PAP alert email:', error);
    }
  };

  // 3. AI Generate PAPs
  const handleGeneratePAPs = async () => {
    setIsGenerating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(AI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || ''}`,
        },
        body: JSON.stringify({
          action: 'generate_paps',
          data: {
            objectives: plan.objectives.map(o => ({ id: o.id, title: o.objective, perspective: o.perspective })),
            timeHorizon: `${plan.planningPeriodStart} to ${plan.planningPeriodEnd}`,
          },
          plan: plan,
        }),
      });

      const result = await response.json();
      if (result.success && result.data && Array.isArray(result.data)) {
        result.data.forEach((aiPap: any) => {
          onAddPAP({
            papType: aiPap.type || 'project',
            name: aiPap.name,
            description: aiPap.description || '',
            owner: session?.user?.id || '',
            ownerName: 'AI Generated',
            budget: aiPap.budget_estimate || 0,
            spent: 0,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + (aiPap.duration_months || 6) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            progress: 0,
            status: 'planned',
            objectiveId: aiPap.linked_objective_id || undefined,
          });
        });
      }
    } catch (error) {
      console.error('Failed to generate PAPs:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Wrap Update to trigger emails
  const handleUpdatePAP = (id: string, updates: Partial<PAP>) => {
    onUpdatePAP(id, updates);
    if (updates.status === 'delayed') {
      const pap = plan.paps.find(p => p.id === id);
      if (pap) sendPapAlertEmail({ ...pap, ...updates } as PAP);
    }
  };

  const filteredPAPs = useMemo(() => {
    return plan.paps.filter((pap) => {
      const matchesType = filterType === 'all' || pap.papType === filterType;
      const matchesStatus = filterStatus === 'all' || pap.status === filterStatus;
      const matchesSearch = pap.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (pap.ownerName || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [plan.paps, filterType, filterStatus, searchQuery]);

  const stats = useMemo(() => {
    const totalBudget = plan.paps.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = plan.paps.reduce((sum, p) => sum + p.spent, 0);
    const utilization = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
    
    return {
      totalBudget,
      totalSpent,
      utilization,
      inProgress: plan.paps.filter(p => p.status === 'in-progress').length,
      completed: plan.paps.filter(p => p.status === 'completed').length,
      delayed: plan.paps.filter(p => p.status === 'delayed').length,
    };
  }, [plan.paps]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPAP.name.trim()) return;
    onAddPAP(newPAP);
    setNewPAP({
      papType: 'project',
      name: '',
      description: '',
      owner: '',
      ownerName: '',
      budget: 0,
      spent: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 0,
      status: 'planned',
    });
    setIsAdding(false);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#C9A84C]/20 dark:border-[#C9A84C]/20">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-[#C9A84C]" />
            PAPs Management
          </h1>
          <p className="text-[#64748b] mt-1 font-medium">Execute strategic goals through targeted programs, activities, and projects.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleGeneratePAPs}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#065f46] to-[#4c1d95] text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 transition-all"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            AI Generate PAPs
          </button>
          <div className="relative group">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]/80 group-focus-within:text-[#C9A84C]" />
            <input 
              type="text"
              placeholder="Search PAPs or owners..."
              className="pl-9 pr-4 py-2.5 bg-[#064e3b]/10 dark:bg-[#022c22] border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-xl text-sm focus:ring-2 focus:ring-[#C9A84C] outline-none w-64 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#022c22] text-white rounded-xl text-sm font-bold hover:bg-[#C9A84C] transition-all shadow-lg hover:shadow-[#C9A84C]/20"
          >
            <Plus className="w-4 h-4" />
            Create New PAP
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#022c22]/60/60 p-5 rounded-2xl border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#C9A84C]/10 rounded-lg text-[#C9A84C]"><DollarSign className="w-5 h-5" /></div>
            <span className="text-[10px] font-bold text-[#64748b]/80 uppercase">Financial Scope</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">${(stats.totalBudget / 1000).toFixed(1)}k</h3>
          <p className="text-xs text-[#64748b] font-medium">Total Portfolio Budget</p>
        </div>
        
        <div className="bg-white dark:bg-[#022c22]/60/60 p-5 rounded-2xl border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#059669]/10 rounded-lg text-[#34d399]"><TrendingUp className="w-5 h-5" /></div>
            <span className="text-[10px] font-bold text-[#64748b]/80 uppercase">Expenditure</span>
          </div>
          <h3 className="text-2xl font-black text-[#34d399]">${(stats.totalSpent / 1000).toFixed(1)}k</h3>
          <div className="flex items-center gap-2 mt-1">
             <div className="flex-1 h-1 bg-[#064e3b]/20 dark:bg-[#022c22]/60 rounded-full">
               <div className="h-full bg-[#059669] rounded-full" style={{ width: `${stats.utilization}%` }} />
             </div>
             <span className="text-[10px] font-bold text-[#64748b]">{stats.utilization.toFixed(0)}%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#022c22]/60/60 p-5 rounded-2xl border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#C9A84C]/10 rounded-lg text-[#C9A84C]"><Check className="w-5 h-5" /></div>
            <span className="text-[10px] font-bold text-[#64748b]/80 uppercase">Throughput</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{stats.completed}</h3>
          <p className="text-xs text-[#64748b] font-medium">{plan.paps.length} Total Registered PAPs</p>
        </div>

        <div className="bg-white dark:bg-[#022c22]/60/60 p-5 rounded-2xl border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><AlertCircle className="w-5 h-5" /></div>
            <span className="text-[10px] font-bold text-[#64748b]/80 uppercase">Attention Needed</span>
          </div>
          <h3 className="text-2xl font-black text-red-400">{stats.delayed}</h3>
          <p className="text-xs text-[#64748b] font-medium">{stats.inProgress} Currently In Progress</p>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white dark:bg-[#022c22]/60/60 p-3 rounded-2xl border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#64748b]/80 uppercase ml-2">Filter By:</span>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-sm font-semibold text-[#E8C560]/90 bg-[#064e3b]/10 dark:bg-[#022c22] px-3 py-1.5 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#C9A84C]"
            >
              <option value="all">All Types</option>
              <option value="program">Programs</option>
              <option value="activity">Activities</option>
              <option value="project">Projects</option>
            </select>
          </div>
          <div className="w-px h-6 bg-slate-200" />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm font-semibold text-[#E8C560]/90 bg-[#064e3b]/10 dark:bg-[#022c22] px-3 py-1.5 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#C9A84C]"
          >
            <option value="all">All Statuses</option>
            {Object.entries(statusConfig).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 bg-[#064e3b]/20 dark:bg-[#022c22]/60 p-1 rounded-xl">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-[#022c22]/60/60 shadow-sm text-[#C9A84C]' : 'text-[#64748b]/80 hover:text-[#ecfdf5]/80'}`}>
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-[#022c22]/60/60 shadow-sm text-[#C9A84C]' : 'text-[#64748b]/80 hover:text-[#ecfdf5]/80'}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-[#022c22]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddSubmit} className="bg-white dark:bg-[#022c22]/60/60 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-[#022c22] text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Initiate New PAP</h2>
                <p className="text-[#64748b]/80 text-sm">Define a new program, activity, or project for execution.</p>
              </div>
              <button type="button" onClick={() => setIsAdding(false)} className="p-2 hover:bg-white/10 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-[#64748b]/80 uppercase mb-2">PAP Name</label>
                  <input required autoFocus placeholder="e.g., Annual Customer Satisfaction Survey" className="w-full px-4 py-3 bg-[#064e3b]/10 dark:bg-[#022c22] border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-xl focus:ring-2 focus:ring-[#C9A84C] outline-none" value={newPAP.name} onChange={(e) => setNewPAP(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#64748b]/80 uppercase mb-2">Classification</label>
                  <select className="w-full px-4 py-3 bg-[#064e3b]/10 dark:bg-[#022c22] border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-xl outline-none" value={newPAP.papType} onChange={(e) => setNewPAP(p => ({ ...p, papType: e.target.value as any }))}>
                    <option value="program">Program</option>
                    <option value="activity">Activity</option>
                    <option value="project">Project</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#64748b]/80 uppercase mb-2">Project Owner</label>
                  <input required placeholder="Full Name" className="w-full px-4 py-3 bg-[#064e3b]/10 dark:bg-[#022c22] border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-xl focus:ring-2 focus:ring-[#C9A84C] outline-none" value={newPAP.ownerName} onChange={(e) => setNewPAP(p => ({ ...p, ownerName: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#64748b]/80 uppercase mb-2">Start Date</label>
                  <input type="date" className="w-full px-4 py-3 bg-[#064e3b]/10 dark:bg-[#022c22] border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-xl outline-none" value={newPAP.startDate} onChange={(e) => setNewPAP(p => ({ ...p, startDate: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#64748b]/80 uppercase mb-2">End Date</label>
                  <input type="date" className="w-full px-4 py-3 bg-[#064e3b]/10 dark:bg-[#022c22] border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-xl outline-none" value={newPAP.endDate} onChange={(e) => setNewPAP(p => ({ ...p, endDate: e.target.value }))} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-[#64748b]/80 uppercase mb-2">Initial Budget ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]/80" />
                    <input type="number" placeholder="0.00" className="w-full pl-10 pr-4 py-3 bg-[#064e3b]/10 dark:bg-[#022c22] border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-xl focus:ring-2 focus:ring-[#C9A84C] outline-none" value={newPAP.budget} onChange={(e) => setNewPAP(p => ({ ...p, budget: parseFloat(e.target.value) || 0 }))} />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#064e3b]/10 dark:bg-[#022c22] flex justify-end gap-3 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/20">
              <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2.5 font-bold text-[#64748b] hover:text-[#E8C560]/90 transition-colors">Cancel</button>
              <button type="submit" disabled={!newPAP.name.trim()} className="px-8 py-2.5 bg-[#C9A84C] text-white font-bold rounded-xl hover:bg-[#C9A84C] disabled:opacity-50 shadow-lg shadow-[#C9A84C]/20 transition-all">Confirm Creation</button>
            </div>
          </form>
        </div>
      )}

      {filteredPAPs.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20' : 'space-y-4 pb-20'}>
          {filteredPAPs.map((pap) => (
            <PAPCard
              key={pap.id}
              pap={pap}
              objectives={plan.objectives}
              onUpdate={(updates) => handleUpdatePAP(pap.id, updates)}
              onRemove={() => onRemovePAP(pap.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-[#064e3b]/10 dark:bg-[#022c22] border-2 border-dashed border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-3xl text-center px-6">
          <div className="w-20 h-20 bg-[#064e3b]/20 dark:bg-[#022c22]/60 rounded-full flex items-center justify-center mb-6">
            <FolderKanban className="w-10 h-10 text-[#64748b]" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
          <p className="text-[#64748b] max-w-sm">We couldn't find any PAPs matching your current filters. Try adjusting your search or add a new entry.</p>
        </div>
      )}
    </div>
  );
};

export default PAPsManagement;
