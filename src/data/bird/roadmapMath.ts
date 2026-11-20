/**
 * Roadmap arithmetic — one source for every component that quotes it.
 *
 * Inputs come from docs/DATA_REGISTER.md and the report (Chapter 2 Table 2-3,
 * Chapter 3, Chapter 7 Table 7.6). Everything else is derived here, so a change
 * to an input flows to the Activity Timeline and the Balanced Scorecard alike.
 *
 * Basis: Table 7.6 adopts the PSA five-province series (Sulu excluded). The
 * ₱299.5B figure for 2024 describes the region before Sulu's exclusion and is
 * kept only as a labelled historical reference.
 */

const round = (x: number, dp = 1) => Math.round(x * 10 ** dp) / 10 ** dp;

/* ── Register inputs ─────────────────────────────────────────────────────── */
export const REGISTER = {
  grdpBase: 266.59,          // ₱B, 2025, five-province BARMM, constant 2018 prices (PSA-RSSO BARMM)
  grdpBaseYear: 2025,
  grdpPreExclusion2024: 299.5, // ₱B, 2024, region before Sulu's exclusion — reference only
  grdpTarget: 550,           // ₱B, 2035 (Report Ch. 3)
  targetYear: 2035,
  runRate: 5.0,              // %, 2025 GRDP growth (PSA)
  publicEnvelope: 140,       // ₱B, midpoint of ₱120–160B indicative public catalytic envelope
  reportICOR: '3.5–4.0',     // planning assumption used in the report (Ch. 7, Table 7.6)
  icorForTest: 3.5,          // lower bound, used for the capital-need test
  approvalsBase: 5.0,        // ₱B, 2025 investment approvals (BBOI)
  approvalsYTD2026: 5.1,     // ₱B, January–April 2026
  approvalsTarget: 15,       // ₱B a year by 2035
  executionRate: 80,         // %, infrastructure budget execution baseline (kpis.ts)
  executionTarget: 90,       // %
} as const;

/* ── Derived ─────────────────────────────────────────────────────────────── */
const years = REGISTER.targetYear - REGISTER.grdpBaseYear;
const required = (REGISTER.grdpTarget / REGISTER.grdpBase) ** (1 / years) - 1;
const trend = REGISTER.grdpBase * (1 + REGISTER.runRate / 100) ** years;
const deltaGRDP = REGISTER.grdpTarget - REGISTER.grdpBase;
const capitalNeed = REGISTER.icorForTest * deltaGRDP;
const approvalsGrowth = (REGISTER.approvalsTarget / REGISTER.approvalsBase) ** (1 / years) - 1;
let approvalsCumulative = 0;
for (let k = 1; k <= years; k++) approvalsCumulative += REGISTER.approvalsBase * (1 + approvalsGrowth) ** k;

export const ROADMAP_MATH = {
  ...REGISTER,
  basisLabel: `₱${REGISTER.grdpBase}B (${REGISTER.grdpBaseYear}, five provinces)`,
  years,
  requiredCAGR: round(required * 100, 2),                       // ≈7.5% a year (Table 7.6)
  growthGap: round(required * 100 - REGISTER.runRate, 2),
  trendLanding: round(trend),
  shortfallAtTrend: round(REGISTER.grdpTarget - trend),
  deltaGRDP: round(deltaGRDP),
  impliedICOR: round(REGISTER.publicEnvelope / deltaGRDP, 2),  // public capital per ₱1 of added output
  capitalNeedAtICOR: Math.round(capitalNeed),                   // ₱B at ICOR 3.5
  envelopeMultiple: round(capitalNeed / REGISTER.publicEnvelope),
  crowdInMultiple: round((capitalNeed - REGISTER.publicEnvelope) / REGISTER.publicEnvelope), // private : public
  approvalsCAGR: round(approvalsGrowth * 100, 2),
  approvalsCumulative: round(approvalsCumulative),
  blendedICOR: round((REGISTER.publicEnvelope + approvalsCumulative) / deltaGRDP, 2),
  absorptionLeakage: Math.round(REGISTER.publicEnvelope * (1 - REGISTER.executionRate / 100)),
  executionRecovery: Math.round(REGISTER.publicEnvelope * (REGISTER.executionTarget - REGISTER.executionRate) / 100),
} as const;
