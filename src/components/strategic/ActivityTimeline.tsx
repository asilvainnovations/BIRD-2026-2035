import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowUpRight, ArrowDownLeft, Plus, FileEdit as Edit, Trash, User, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { useStrategicPlan } from '@/hooks/useStrategicPlan';
// Existing module — verified exports: ACTION_PLAN_2026, ACTION_SUMMARY, ActionPlan,
// LP_COLOR_MAP. Nothing else is imported from @/data/bird beyond what ships in the repo.
import { ACTION_PLAN_2026, ACTION_SUMMARY, type ActionPlan } from '@/data/bird/actions';

/** Row shape returned by the Supabase `activity_logs` table (snake_case). */
interface ActivityLog {
  id: string;
  plan_id: string;
  action_type: string;
  entity_type: string;
  details: Record<string, unknown> | null;
  created_at: string;
  user_id?: string;
}

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
  pap_milestone: CheckCircle,
};

/* ═══════════════════════════════════════════════════════════════════════════
   ROADMAP MATHEMATICS — why this timeline exists
   ═══════════════════════════════════════════════════════════════════════════
   The Activity Timeline is not an event log. It is the execution ledger of a
   ₱120–160B capital programme, and every entry must be readable against the
   trajectory it is supposed to produce.

   Phase boundaries and budgets are read from phases.ts (source of truth):
     P1 Foundation      2026–2028   ₱35–45B    ₱13.3B/yr
     P2 Acceleration    2029–2032   ₱50–65B    ₱14.4B/yr
     P3 Consolidation   2033–2035   ₱35–50B    ₱14.2B/yr

   THE CENTRAL FINDING — capital efficiency:
     GRDP must move ₱299.5B (2024 actual) → ₱550B (2035 target) = 5.68% CAGR,
     against a 2.70% run-rate. That is a 2.98pp gap. At trend, BARMM lands at
     ₱401.5B — a ₱148.5B shortfall.

     ΔGRDP ₱250.5B against a ₱140B public envelope implies an ICOR of 0.56
     (₱0.56 of capital per ₱1 of added output). Developing-economy ICOR is
     typically 3.0–5.0. At ICOR 3.5 the target would need ₱877B — 6.3x the
     envelope.

     CONCLUSION: public capital here is a CATALYST, not the driver. The roadmap
     is only internally consistent if it crowds in private and FDI capital at
     roughly 5x public spend. Investment approvals rising ₱5.1B → ₱15B (10.30%
     CAGR) contribute ~₱106B cumulative, taking blended ICOR to 0.98 — still
     aggressive. This is the assumption the whole roadmap rests on, and it is
     what the timeline exists to monitor.

   THE BINDING CONSTRAINT — absorption:
     Infra budget execution is 80% (kpis.ts baseline, target 90%). At 80%,
     ₱28B of the ₱140B envelope never converts to output. Closing execution to
     90% recovers ₱14B — cheaper than raising new capital, and it is why
     budget-execution KPIs sit on the critical path, not in a back office.
   ═══════════════════════════════════════════════════════════════════════════ */

const ROADMAP_MATH = {
  grdpBase: 299.5,          // ₱B, PSA-BARMM 2024 actual
  grdpTarget: 550,          // ₱B, BIRD 2035
  requiredCAGR: 5.68,       // %
  currentRunRate: 2.70,     // %
  trendLanding: 401.5,      // ₱B at 2.7% to 2035
  shortfallAtTrend: 148.5,  // ₱B
  publicEnvelope: 140,      // ₱B midpoint of ₱120–160B
  impliedICOR: 0.56,
  blendedICOR: 0.98,
  benchmarkICOR: '3.0–5.0',
  crowdInMultiple: 5.3,
  approvalsCAGR: 10.30,     // %, ₱5.1B → ₱15B
  executionRate: 80,        // %, 2024 baseline
  absorptionLeakage: 28,    // ₱B lost at 80% execution
} as const;

interface PhaseWindow {
  num: string;
  title: string;
  years: string;
  startISO: string;
  endISO: string;
  budgetMid: number;        // ₱B
  annualBurn: number;       // ₱B/yr
  shareOfEnvelope: number;  // %
  bscFocus: string;
  thesis: string;
}

/** Mirrors phases.ts. Boundaries verified against source: ≤2028 / ≤2032 / after. */
const PHASE_WINDOWS: PhaseWindow[] = [
  {
    num: '01', title: 'Foundation Building', years: '2026 – 2028',
    startISO: '2026-01-01', endISO: '2028-12-31',
    budgetMid: 40, annualBurn: 13.33, shareOfEnvelope: 28.6,
    bscFocus: 'Learning & Growth → Internal Process',
    thesis:
      'Build absorptive capacity before deploying capital at scale. Certification integrity, ' +
      'digital registration and budget execution are prerequisites, not deliverables — every ' +
      'point of execution rate gained here compounds across ₱100B of later spend.',
  },
  {
    num: '02', title: 'Acceleration', years: '2029 – 2032',
    startISO: '2029-01-01', endISO: '2032-12-31',
    budgetMid: 57.5, annualBurn: 14.38, shareOfEnvelope: 41.1,
    bscFocus: 'Internal Process → Stakeholder',
    thesis:
      'The crowding-in window. Public capital peaks here, but the test is whether private ' +
      'approvals compound at 10.3% CAGR alongside it. If the multiple does not appear by ' +
      '2030, the ₱550B target is arithmetically out of reach and should be restated.',
  },
  {
    num: '03', title: 'Consolidation & Global Integration', years: '2033 – 2035',
    startISO: '2033-01-01', endISO: '2035-12-31',
    budgetMid: 42.5, annualBurn: 14.17, shareOfEnvelope: 30.4,
    bscFocus: 'Stakeholder → Financial',
    thesis:
      'Financial-perspective outcomes land last by design. GRDP, exports and Islamic-finance ' +
      'assets are lagging indicators of Phase-1 and Phase-2 capability. Nothing done in this ' +
      'phase can rescue an execution failure in the first.',
  },
];

const phaseOf = (iso: string): PhaseWindow =>
  PHASE_WINDOWS.find((p) => iso >= p.startISO && iso <= p.endISO) ?? PHASE_WINDOWS[0];

/**
 * BSC cascade position. The roadmap is organised into Balanced Scorecards, and
 * the causal direction runs Learning & Growth → Internal Process → Stakeholder
 * → Financial. An action's BSC code therefore tells you WHERE IN THE CAUSAL
 * CHAIN it sits — and a Financial-perspective action scheduled before its
 * Learning & Growth enablers is a sequencing error, not just a late task.
 */
const BSC_CASCADE: Record<string, { tier: number; label: string; role: string }> = {
  LG: { tier: 1, label: 'Learning & Growth', role: 'Enabler — capability that must exist first' },
  IP: { tier: 2, label: 'Internal Process',  role: 'Conversion — turns capability into throughput' },
  S:  { tier: 3, label: 'Stakeholder',       role: 'Outcome — what beneficiaries experience' },
  F:  { tier: 4, label: 'Financial',         role: 'Lagging — realised economic return' },
};

/** Lowest (earliest) cascade tier referenced by a BSC code like 'IP2 / LG2'. */
const cascadeOf = (bscCode?: string) => {
  if (!bscCode) return null;
  const tiers = (bscCode.match(/\b(LG|IP|S|F)\d/g) ?? [])
    .map((c) => BSC_CASCADE[c.replace(/\d/, '')])
    .filter(Boolean);
  return tiers.sort((a, b) => a.tier - b.tier)[0] ?? null;
};

/**
 * Roadmap baseline for the timeline.
 *
 * `activity_logs` records what users DID in the planner. Until the plan has
 * accumulated real edits that table is empty, and rendering nothing reads as
 * "this plan has no activity" rather than "no one has edited it yet". Those are
 * different statements — and for a capital programme, the second one matters.
 *
 * So with no recorded activity we render the Phase-1 Action Plan
 * (`ACTION_PLAN_2026` — the same source as MEL Dashboard Panel C) as the
 * CALENDAR OF ACTIVITIES: commitments, not events, each positioned against its
 * phase, its BSC cascade tier, and its Meadows leverage point.
 */
interface TimelineRow {
  id: string;
  kind: 'recorded' | 'milestone';
  label: string;
  detail: string;
  timestamp: string;
  actionType: string;
  lp?: string;
  cluster?: string;
  priority?: ActionPlan['priority'];
  status?: string;
  budget?: string;
  budgetValue?: number;
  lead?: string;
  bscCode?: string;
  cascade?: { tier: number; label: string; role: string } | null;
  phase?: PhaseWindow;
  cumulativeShare?: number;  // % of named Phase-1 capital committed by this point
}

/** 'Q2 2026' -> quarter-end ISO, so milestones sort against real timestamps. */
const quarterToDate = (due: string): string => {
  const m = /Q(\d)\s*(\d{4})/.exec(due);
  if (!m) return `${/\d{4}/.exec(due)?.[0] ?? '2026'}-12-31`;
  return `${m[2]}-${['03-31', '06-30', '09-30', '12-31'][Number(m[1]) - 1]}`;
};

const NAMED_PHASE1_CAPITAL = ACTION_PLAN_2026.reduce((s, a) => s + (a.budgetValue ?? 0), 0);

const ACTION_MILESTONES: TimelineRow[] = (() => {
  let running = 0;
  return ACTION_PLAN_2026
    .map((a) => ({ a, iso: quarterToDate(a.due) }))
    .sort((x, y) => x.iso.localeCompare(y.iso))
    .map(({ a, iso }) => {
      running += a.budgetValue ?? 0;
      return {
        id: `pap-${a.id}`,
        kind: 'milestone' as const,
        label: a.action,
        detail: a.actionDesc,
        timestamp: iso,
        actionType: 'pap_milestone',
        lp: a.lp,
        cluster: a.cluster,
        priority: a.priority,
        status: a.status,
        budget: a.budget,
        budgetValue: a.budgetValue,
        lead: a.lead,
        bscCode: a.bscCode,
        cascade: cascadeOf(a.bscCode),
        phase: phaseOf(iso),
        cumulativeShare: NAMED_PHASE1_CAPITAL ? (running / NAMED_PHASE1_CAPITAL) * 100 : 0,
      };
    });
})();

export function ActivityTimeline() {
  const { isAuthenticated } = useAuth();
  const { currentPlan } = useStrategicPlan();
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

  // Recorded activity, normalised to the shared row shape.
  const recordedRows: TimelineRow[] = useMemo(
    () =>
      activities.map((a) => ({
        id: a.id,
        kind: 'recorded' as const,
        label: a.action_type.replace(/_/g, ' '),
        detail:
          a.details && Object.keys(a.details).length
            ? Object.entries(a.details)
                .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`)
                .join(' · ')
            : a.entity_type,
        timestamp: a.created_at,
        actionType: a.action_type,
      })),
    [activities],
  );

  // Fall back to the Phase-1 calendar of activities when nothing is recorded yet.
  const usingRoadmapBaseline = recordedRows.length === 0;
  const rows = usingRoadmapBaseline ? ACTION_MILESTONES : recordedRows;

  const filtered =
    filter === 'all'
      ? rows
      : rows.filter((r) => r.actionType.includes(filter) || (r.cluster ?? '').toLowerCase().includes(filter));

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
          <p className="text-sm text-white/40">
            {usingRoadmapBaseline
              ? 'Phase-1 calendar of activities — no recorded plan edits yet'
              : 'Track all changes to your strategic plan'}
          </p>
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

      {/* Roadmap trajectory — the investment case the timeline is monitoring */}
      {usingRoadmapBaseline && (
        <div className="glass rounded-xl p-5 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-gold block mb-1">
                Execution Ledger · ₱120–160B Capital Programme
              </span>
              <h3 className="font-cinzel text-base font-bold text-white">Calendar of Activities &amp; Roadmap Trajectory</h3>
            </div>
            <span className="text-xs text-white/50 bg-gold/10 border border-gold/30 rounded-full px-3 py-1">
              {ACTION_SUMMARY.totalActions} actions · {ACTION_SUMMARY.criticalActions} critical
            </span>
          </div>

          {/* Trajectory arithmetic */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { v: `${ROADMAP_MATH.requiredCAGR}%`, l: 'Required GRDP CAGR', s: `vs ${ROADMAP_MATH.currentRunRate}% run-rate`, c: 'text-red-400' },
              { v: `₱${ROADMAP_MATH.shortfallAtTrend}B`, l: 'Shortfall at trend', s: `lands ₱${ROADMAP_MATH.trendLanding}B of ₱${ROADMAP_MATH.grdpTarget}B`, c: 'text-amber-400' },
              { v: `${ROADMAP_MATH.impliedICOR}`, l: 'Implied ICOR', s: `benchmark ${ROADMAP_MATH.benchmarkICOR}`, c: 'text-red-400' },
              { v: `${ROADMAP_MATH.crowdInMultiple}x`, l: 'Required crowd-in', s: 'private : public capital', c: 'text-gold' },
            ].map((m) => (
              <div key={m.l} className="rounded-lg border border-gold/20 bg-white/[0.02] p-3">
                <div className={`font-cinzel text-xl font-bold ${m.c}`}>{m.v}</div>
                <div className="text-[0.68rem] text-white/60 uppercase tracking-wider">{m.l}</div>
                <div className="text-[0.6rem] text-white/30 mt-0.5">{m.s}</div>
              </div>
            ))}
          </div>

          <p className="text-xs text-white/45 leading-relaxed">
            <strong className="text-white/75">The investment thesis in one line:</strong> ΔGRDP of ₱
            {(ROADMAP_MATH.grdpTarget - ROADMAP_MATH.grdpBase).toFixed(1)}B against a ₱{ROADMAP_MATH.publicEnvelope}B
            public envelope implies an ICOR of {ROADMAP_MATH.impliedICOR} — far below the {ROADMAP_MATH.benchmarkICOR}{' '}
            typical of developing economies. Public capital is therefore a <em>catalyst</em>, not the driver. The
            roadmap is internally consistent only if investment approvals compound at{' '}
            {ROADMAP_MATH.approvalsCAGR}% CAGR and crowd in roughly {ROADMAP_MATH.crowdInMultiple}x public spend,
            taking blended ICOR to {ROADMAP_MATH.blendedICOR}. Every milestone below is a test of that assumption.
          </p>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/[0.07] p-3">
            <p className="text-[0.72rem] text-amber-300/90 leading-relaxed">
              <strong>Binding constraint — absorption, not capital.</strong> At {ROADMAP_MATH.executionRate}% infra
              budget execution, ₱{ROADMAP_MATH.absorptionLeakage}B of the ₱{ROADMAP_MATH.publicEnvelope}B envelope
              never converts to output. Lifting execution to 90% recovers ₱
              {(ROADMAP_MATH.publicEnvelope * 0.1).toFixed(0)}B — cheaper than raising new capital. This is why
              budget-execution and certification-integrity actions sit on the critical path rather than in a back
              office.
            </p>
          </div>

          {/* Phase sequencing and BSC cascade */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
              Three-phase sequencing · Balanced Scorecard cascade
            </h4>
            <div className="space-y-2">
              {PHASE_WINDOWS.map((p) => {
                const active = new Date().toISOString().slice(0, 10) <= p.endISO &&
                               new Date().toISOString().slice(0, 10) >= p.startISO;
                return (
                  <div
                    key={p.num}
                    className={`rounded-lg border p-3 ${active ? 'border-gold/50 bg-gold/[0.06]' : 'border-white/10 bg-white/[0.02]'}`}
                  >
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <span className="font-cinzel text-sm font-bold text-white">
                        Phase {p.num} · {p.title}
                      </span>
                      <span className="text-[0.68rem] text-white/40">{p.years}</span>
                      {active && (
                        <span className="px-1.5 py-0.5 rounded text-[0.6rem] font-bold bg-gold/20 text-gold border border-gold/40">
                          CURRENT
                        </span>
                      )}
                      <span className="ml-auto text-[0.68rem] text-gold/80 font-semibold">
                        ₱{p.budgetMid}B · ₱{p.annualBurn.toFixed(1)}B/yr · {p.shareOfEnvelope}%
                      </span>
                    </div>
                    <div className="text-[0.62rem] text-white/35 mb-1">BSC focus: {p.bscFocus}</div>
                    {/* Capital share bar */}
                    <div className="h-1 rounded-full bg-white/10 overflow-hidden mb-2">
                      <div className="h-full rounded-full bg-gold/60" style={{ width: `${p.shareOfEnvelope}%` }} />
                    </div>
                    <p className="text-[0.7rem] text-white/50 leading-relaxed">{p.thesis}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[0.68rem] text-white/30 leading-relaxed">
            Named Phase-1 actions commit ₱{(NAMED_PHASE1_CAPITAL / 1e9).toFixed(2)}B — only{' '}
            {((NAMED_PHASE1_CAPITAL / 1e9 / 40) * 100).toFixed(0)}% of the ₱35–45B Phase-1 envelope. The balance sits
            in unitemised block-grant and ODA lines and should be attributed before the plan is published. Rows below
            are <strong className="text-white/50">commitments, not recorded events</strong>; once{' '}
            <code className="text-white/40">activity_logs</code> populates, real activity replaces this baseline.
          </p>
        </div>
      )}

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gold/20" />
        <div className="space-y-4">
          {filtered.map((row) => {
            const Icon = ACTION_ICONS[row.actionType] || Clock;
            const isMilestone = row.kind === 'milestone';
            const overdue = isMilestone && row.timestamp < new Date().toISOString().slice(0, 10);
            return (
              <div key={row.id} className="relative pl-12">
                <div
                  className={`absolute left-2 top-1 w-5 h-5 rounded-full border flex items-center justify-center ${
                    row.priority === 'critical'
                      ? 'bg-red-500/20 border-red-500/50'
                      : 'bg-gold/20 border-gold/40'
                  }`}
                >
                  <Icon size={10} className={row.priority === 'critical' ? 'text-red-400' : 'text-gold'} />
                </div>
                <div className="glass rounded-lg p-4">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <span className="text-sm text-white/80 capitalize">{row.label}</span>
                    <span className={`text-xs flex-shrink-0 ${overdue ? 'text-red-400' : 'text-white/30'}`}>
                      {isMilestone
                        ? new Date(row.timestamp).toLocaleDateString('en-PH', { year: 'numeric', month: 'short' })
                        : new Date(row.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{row.detail}</p>
                  {isMilestone && (
                    <>
                      <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                        {row.lp && (
                          <span className="px-1.5 py-0.5 rounded text-[0.6rem] font-bold bg-gold/15 text-gold border border-gold/30">
                            {row.lp}
                          </span>
                        )}
                        {row.cascade && (
                          <span
                            className="px-1.5 py-0.5 rounded text-[0.6rem] font-bold border bg-white/[0.04] text-white/60 border-white/15"
                            title={row.cascade.role}
                          >
                            T{row.cascade.tier} {row.cascade.label}
                          </span>
                        )}
                        {row.priority && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[0.6rem] font-bold border ${
                              row.priority === 'critical'
                                ? 'bg-red-500/15 text-red-400 border-red-500/30'
                                : row.priority === 'high'
                                ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                                : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                            }`}
                          >
                            {row.priority}
                          </span>
                        )}
                        {row.status && <span className="text-[0.62rem] text-white/35">{row.status}</span>}
                        {row.budget && <span className="text-[0.62rem] text-gold/70 ml-auto font-semibold">{row.budget}</span>}
                      </div>

                      {/* Cumulative capital commitment curve across Phase 1 */}
                      {row.cumulativeShare !== undefined && (
                        <div className="mt-2">
                          <div className="flex justify-between text-[0.58rem] text-white/25 mb-0.5">
                            <span>{row.cluster}</span>
                            <span>{row.cumulativeShare.toFixed(0)}% of named Phase-1 capital committed</span>
                          </div>
                          <div className="h-0.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full rounded-full bg-gold/50" style={{ width: `${row.cumulativeShare}%` }} />
                          </div>
                        </div>
                      )}

                      {/* Sequencing check: Financial-tier work before its enablers is a design error */}
                      {row.cascade?.tier === 4 && (
                        <p className="mt-2 text-[0.62rem] text-amber-400/80 leading-relaxed">
                          Financial-perspective outcome scheduled in Phase 1 — verify its Learning &amp; Growth and
                          Internal Process enablers land first, or the return is being booked ahead of the capability
                          that produces it.
                        </p>
                      )}
                      <div className="mt-1.5 text-[0.58rem] text-white/25">
                        {row.bscCode && <>BSC {row.bscCode} · </>}
                        {row.lead}
                        {row.phase && <> · Phase {row.phase.num} {row.phase.title}</>}
                      </div>
                    </>
                  )}
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