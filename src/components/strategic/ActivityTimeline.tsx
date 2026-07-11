import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowUpRight, ArrowDownLeft, Plus, FileEdit as Edit, Trash, User, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { useStrategicPlanStore } from '../../stores/strategicPlanStore';
import type { ActivityLog } from '../../types';

const ACTION_ICONS: Record<string, typeof Plus> = {
  plan_created: Plus,
  swot_added: Plus,
  strategy_added: Plus,
  objective_added: Plus,
  kpi_added: Plus,
  pap_added: Plus,
  comment_added: Plus,
  member_joined: User,
  plan_updated: Edit,
  swot_updated: Edit,
  strategy_updated: Edit,
  objective_updated: Edit,
  kpi_updated: Edit,
  kpi_value_updated: ArrowUpRight,
  pap_updated: Edit,
  pap_status_changed: ArrowUpRight,
  plan_deleted: Trash,
  swot_deleted: Trash,
  strategy_deleted: Trash,
  objective_deleted: Trash,
  kpi_deleted: Trash,
  pap_deleted: Trash,
  member_left: ArrowDownLeft,
  member_role_changed: Edit,
  template_used: CheckCircle,
  ai_suggestion_accepted: CheckCircle,
  sync_completed: CheckCircle,
  sync_failed: ArrowDownLeft,
};

export function ActivityTimeline() {
  const { isAuthenticated } = useAuth();
  const { getCurrentPlan } = useStrategicPlanStore();
  const currentPlan = getCurrentPlan();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !currentPlan?.id) return;
    setLoading(true);
    (async () => {
      const { data } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('plan_id', currentPlan.id)
        .order('created_at', { ascending: false })
        .limit(100);
      if (data) setActivities(data);
      setLoading(false);
    })();
  }, [isAuthenticated, currentPlan?.id]);

  const filtered = filter === 'all' ? activities : activities.filter((a) => a.action_type.includes(filter));

  if (!currentPlan) {
    return (
      <div className="glass rounded-xl p-12 text-center">
        <Clock size={48} className="text-gold/30 mx-auto mb-4" />
        <h3 className="font-cinzel text-xl font-bold text-white mb-2">No Plan Selected</h3>
        <button onClick={() => navigate('/app/templates')} className="btn btn-primary">Create Plan</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-gold">Activity Timeline</h2>
          <p className="text-sm text-white/40">Track all changes to your strategic plan</p>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="text-sm w-40">
          <option value="all">All Activities</option>
          <option value="swot">SWOT</option>
          <option value="strategy">Strategy</option>
          <option value="objective">Objectives</option>
          <option value="kpi">KPIs</option>
          <option value="pap">PAPs</option>
          <option value="sync">Sync</option>
        </select>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gold/20" />
        <div className="space-y-4">
          {filtered.map((activity) => {
            const Icon = ACTION_ICONS[activity.action_type] || Clock;
            return (
              <div key={activity.id} className="relative pl-12">
                <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                  <Icon size={10} className="text-gold" />
                </div>
                <div className="glass rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white/80 capitalize">{activity.action_type.replace(/_/g, ' ')}</span>
                    <span className="text-xs text-white/30">{new Date(activity.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-white/40">
                    {activity.entity_type} — {JSON.stringify(activity.details)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-white/20 text-sm">No activities found for this filter.</div>
        )}
      </div>
    </div>
  );
}
