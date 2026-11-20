# BIRD 2026–2035 · Data Register (canonical figures)

**Status:** adopted 20 November 2026 · **Owner:** BoI-MTIT BARMM (report editors) · **Applies to:** `public/report/*`, every page in `public/`, the Strat Planner Pro platform (`src/`), and the sibling `bird-validation-survey` repo.

**Rule.** When a figure appears anywhere in the BIRD ecosystem, it must match this register. Precedence:

1. **The written report**: the Executive Summary and Chapters 1–7, in particular Chapter 2 Table 2-3, the Chapter 3 targets and option scores, the Chapter 4–6 phase schedule, and **Chapter 7 Table 7.6 "Baseline reconciliation required before adoption"**.
2. **Primary official sources** (PSA, PSA-RSSO BARMM, BBOI, NEA), used to verify (1). Where the report and an official source disagree, the official source wins and the report is corrected.
3. **The live survey database** (`survey_responses` in Supabase project `lydsisparsmvextskevw`) for every Validation Survey count.

When a value has two legitimate readings (different period or territory), quote **both, with their basis**, as Table 2-3 does. Never quote one without its basis.

## 1. Macro and social baselines

| Indicator | Canonical value(s) and basis | Source | Notes |
|---|---|---|---|
| GRDP level | **₱266.59B (2025, five-province BARMM, constant 2018 prices)**; ₱299.5B (2024, region before Sulu's exclusion) | PSA-RSSO BARMM (Apr 2026); MFBM Economic Brief No. 2 (2025) | PSA's 2023–2025 regional accounts move Sulu to Region IX. Use the five-province series for tracking (Table 7.6). |
| GRDP growth | 6.6% (2022); 4.3% (2023); 2.7% (2024, Apr 2025 release; ~3.4% in the 2026 five-province restatement); **5.0% (2025)** | PSA | Always label 2024 with its release basis. |
| GRDP 2035 target | **₱550B or more** | Report Ch 3 | ~7.5% a year from the five-province base (Table 7.6). |
| GRDP milestones | **₱331B (2028 gate), ₱383B (2030 checkpoint)** | Report Ch 4 Table 4-2, Ch 5; Table 7.6 | Constant 7.51% path from ₱266.59B (2025). Supersedes ₱385B / ₱440B (old 2024 base) and ₱400B. |
| Poverty incidence, families | **23.5% (full-year 2023)**; 34.8% (first semester 2023); 28.0% (2021); 52.9% (2018) | PSA 2023 Full-Year Official Poverty Statistics (15 Aug 2024) | "34.8%" must always say *first semester 2023*. Do **not** pair 34.8% (1H 2023) with a 2018 full-year figure as a trend. |
| Poverty incidence, population | 32.4% (2023) | PSA | |
| Poverty target | **below 20% by 2035** | Report Ch 3 | Table 7.6 flags recalibration on the full-year basis. |
| Basic literacy | **81.0% (2024), lowest region** (national 90.0%) | PSA 2024 FLEMMS | |
| Functional literacy | **64.7% (2024)** (national 70.8%) | PSA 2024 FLEMMS; PSA-RSSO reports | **Correction:** "59.3%, lowest in the country" is **Region IX**, not BARMM. Tawi-Tawi's functional literacy is 33.2%. |
| Population | **About 4.54 million (2024, excluding Sulu)**; 3.43% a year growth (2020–2024) | MTIT (2026a) | 5.69M includes Sulu: do not use. |
| Household electrification | **About 39–40% of potential connections in EC areas** (NEA 2023). Target **90% by 2035, 100% by 2040** | Report Ch 2–3; NEA | 67.52% (DOE–MENRE end-2025) and "~75%" use other denominators. Table 7.6 action A6: adopt one metric. Never state "~75% → 100% by 2035". |

## 2. Investment

| Indicator | Canonical value | Source |
|---|---|---|
| Investment approvals 2025 | **₱5.0B** (against a ₱3B target) | BBOI |
| Investment approvals 2026 YTD | **₱5.1B, January–April 2026** (not "Q1 2026") | BBOI; MindaNews (3 May 2026) |
| Investment approvals target | **₱15B or more a year** by 2035; milestones ₱6.5B (2028), ₱10B (2030) | Report Ch 3, Ch 4 Table 4-2 | Baseline ₱5.0B (2025). Supersedes ₱8B (2030). |
| Jobs target | **At least 20,000** | Report Ch 3 |

## 3. Strategy and roadmap

| Item | Canonical value | Source |
|---|---|---|
| Strategy selected | Integrated Ecosystem Development Strategy (IEDS) | Ch 3 |
| Option composite scores (canonical weights, Table 3-8) | **IEDS 8.83 · HEDS 7.53 · IFES 7.46 · GEMS 7.16** | Ch 3 Table 3-9 |
| Superseded scores | IEDS 8.93 / 8.33, HEDS 7.61, IFES 7.48 were computed with superseded weights. **Do not use.** | Ch 3 note |
| Survey option ratings (n = 75 valid) | IEDS 6.05 · HEDS 5.90 · IFES 5.77 · GEMS 5.73 | Ch 3; Executive Summary |
| Critical Leverage Points | **Five (LP1–LP5)** | Ch 3 |
| Indicative public catalytic envelope | **₱120–160B** (planning parameter, not an appropriation) | Ch 3, Ch 6 |
| Total investment requirement | **₱0.99–1.13 trillion** = ICOR 3.5–4.0 × ₱283.4B gap (₱266.59B → ₱550B, constant 2018 prices) | Ch 3, Ch 7 C.3, Table 7.6 | Supersedes ₱1.55–1.77T, which implied a ₱443B output gain. |
| Leverage of public capital | **about 6–9×** (₱0.99–1.13T ÷ ₱120–160B) | Ch 7 C.3 | Supersedes 11–14×. |
| Poverty milestones | <25% by 2030 (already met on the full-year basis; recalibrate), **<20% by 2035** | Ch 4, Ch 5, Table 7.6 | |
| Phase 1 | **2026–2028** · Foundations and enabling conditions · ₱35–45B | Ch 3, Ch 6 |
| Phase 2 | **2029–2031** · Value addition and market formation · ₱50–65B | Ch 3, Ch 6 |
| Phase 3 | **2032–2035** · Consolidation and global integration · ₱35–50B | Ch 3, Ch 6 |
| Illustrative financing mix | BARMM 35% (₱42–56B) · national programmes 25% (₱30–40B) · ODA and climate finance 30% (₱36–48B) · private, PPP and Islamic finance 10% (₱12–16B) | Ch 6 Table 6-5 (illustrative only) |
| BSC causal weights | Learning & Growth 20% → Internal Process 25% → Stakeholder 25% → Financial 30% | Ch 5 |

**Superseded phase boundaries** (2029–2032 / 2033–2035): do not use. Table 7.6 requires the platform, dashboards and public pages to adopt 2026–2028 / 2029–2031 / 2032–2035.

## 4. Validation evidence

| Item | Canonical value | Source |
|---|---|---|
| Regional Validation Survey | **n = 76** responses, **3–20 August 2026** | `survey_responses` (verified 20 Nov 2026: 76 rows, first 2026-08-03 UTC, last 2026-08-20 UTC) |
| Per-item n | 63–73 (item non-response); option ratings n = 75 | Ch 3, Ch 7 |
| Tawi-Tawi | 0 survey respondents; 44 of 72 (61.1%) named it the province with most trapped value | Ch 2 |
| Basilan provincial validation | 20 June 2026, Isabela City; provincial workshop with BEIE cluster conversations; validated the Basilan Economic and Investment Outlook | `public/basilan-outlook.html`; Report Ch 1, F.4 |
| Tawi-Tawi provincial validation | 28 October 2026, Rachel's Place, Bongao; MTIT Tawi-Tawi Provincial Office; facilitated plenary with hand-raise voting; validated the Tawi-Tawi Economic and Investment Outlook | `public/tawi-tawi-outlook.html` |

## 5. Governance context (dated)

| Item | Value | Source |
|---|---|---|
| First regular Bangsamoro Parliament | Elected 14 September 2026 | Comelec; news |
| Chief Minister | Abdulraof Macacua, elected 30 October 2026 (51–27) | PNA; GMA |
| Sulu | Outside BARMM since the Supreme Court decision of 9 September 2024 (*Province of Sulu v. Medialdea*, G.R. No. 242255) | Ch 1 |

## 6. Known variants and where they were corrected

Generated with `tools/scan` patterns during the November 2026 consistency pass. Corrections are made in:

- **PR B:** report (`public/report/*`)
- **PR C:** public pages
- **PR D:** platform modules (`src/components/strategic/*`)

| Variant in circulation | Correct to |
|---|---|
| "functional literacy 59.3%, lowest in the country" (BARMM) | basic literacy 81.0% (lowest region); functional literacy 64.7% |
| "poverty fell from 55.9% (2018) to 34.8% (2023)" | 52.9% (2018) → 23.5% (full-year 2023), families; or label 34.8% as first semester 2023 |
| Phase 2 2029–2032 · Phase 3 2033–2035 | Phase 2 2029–2031 · Phase 3 2032–2035 |
| IEDS 8.93 / 8.33 · HEDS 7.61 · IFES 7.48 | IEDS 8.83 · HEDS 7.53 · IFES 7.46 · GEMS 7.16 |
| "four Critical Leverage Points" | five (LP1–LP5) |
| "₱1.55–1.77T" total investment; "11–14×" leverage | ₱0.99–1.13T; about 6–9× |
| GRDP 2030 "₱440B" / "₱400B"; 2028 "₱385B" | ₱383B (2030); ₱331B (2028) |
| Approvals 2030 "₱8B" | ₱10B |
| electrification "~75% → 100% (2035)" | ~39–40% of potential EC connections → 90% by 2035 (100% by 2040) |
| "₱5.1B in Q1 2026" | ₱5.1B, January–April 2026 |
| "23.5% in 2023" without basis | 23.5% (full-year 2023, families) |
| GRDP "₱299.5B" as the current baseline without basis | ₱266.59B (2025, five-province) · ₱299.5B (2024, before Sulu's exclusion) |
