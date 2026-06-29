-- ═══════════════════════════════════════════════════════════════════════════════
-- BIRD 2026–2035 · Complete Database Schema v3.0.0
-- Project: lydsisparsmvextskevw.supabase.co (primary data project)
-- Edge Functions: rgvteytgkugdqdodedxq.databasepad.com
-- 
-- PURPOSE:
--   Comprehensive database schema for the BIRD AI-powered strategic planning PWA.
--   Supports user authentication, strategic plans, SWOT analysis with BIRD
--   Resilience Index scoring, TOWS strategy matrix with leverage points,
--   balanced scorecard with BIRD KPIs, PAPs management with BEIE clusters,
--   systems thinking (CLDs, archetypes, leverage points), team collaboration,
--   activity logging, plan templates, notifications, AI interaction audit trail,
--   MEL dashboard, CRM integration, and admin functionality.
--
-- SECURITY ENHANCEMENTS:
--   1. Immutable search_path set on all functions to prevent search_path hijacking.
--   2. SECURITY DEFINER converted to SECURITY INVOKER for trigger functions
--      (handle_new_user, log_activity) to run with caller's privileges.
--   3. EXECUTE privileges revoked from PUBLIC, anon, and authenticated roles
--      on all internal/trigger functions to prevent unauthorized RPC calls.
--   4. All RLS policies use auth.uid() (not deprecated current_setting).
--   5. CRM tables restricted to service_role only (edge function access).
--
-- BIRD-SPECIFIC ENHANCEMENTS (from Schema A):
--   • leverage_point (LP1–LP5) on SWOT, objectives, KPIs, strategies, PAPs
--   • beie_cluster (foundations/transformers/enablers/connectors/financiers/cross-cutting)
--   • bird_phase (1/2/3) on objectives, strategies, PAPs
--   • target_2030, benchmark_source on KPIs
--   • swot_pairs, resource_requirement on strategies
--   • lead_agency, support_agencies, sdg_alignment on PAPs
--   • strategic_planner_state (per-user full planner state snapshot)
--   • ai_interaction_logs (AI audit trail for MEL/compliance)
--   • GIN indexes for JSONB fast-containment queries
--   • Helper views: plan_kpi_summary, plan_pap_budget, ai_usage_summary
--   • Storage bucket configurations for BIRD assets
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── 0. EXTENSIONS ─────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ═══════════════════════════════════════════════════════════════════════════════
-- 1. TABLE DEFINITIONS
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── 1.1 Users table extending auth.users ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    full_name text,
    avatar_url text,
    organization text,
    job_title text,
    phone text,
    role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
    assigned_regions text[] DEFAULT '{}',
    notification_preferences jsonb DEFAULT '{"email": true, "kpi_alerts": true, "weekly_digest": true, "plan_reminders": true, "team_updates": true}'::jsonb,
    is_active boolean NOT NULL DEFAULT true,
    last_seen_at timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.2 User profiles (extended profile for Strat Planner Pro) ────────────────
CREATE TABLE IF NOT EXISTS user_profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    full_name text,
    avatar_url text,
    organization text,
    job_title text,
    phone text,
    notification_preferences jsonb DEFAULT '{
        "welcome_email": true,
        "kpi_alerts": true,
        "weekly_digest": true,
        "stale_plan_reminders": true,
        "team_mentions": true,
        "product_updates": false
    }'::jsonb,
    role text NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
    is_active boolean NOT NULL DEFAULT true,
    last_seen_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.3 User settings ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    ai_config jsonb DEFAULT '{
        "model": "gpt-4o",
        "verbose": false,
        "temperature": 0.65,
        "auto_suggest": true,
        "max_tokens": 1600
    }'::jsonb,
    ui_config jsonb DEFAULT '{"theme": "dark", "sidebar_collapsed": false}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE (user_id)
);

-- ─── 1.4 Organizations table ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS organizations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    logo_url text,
    industry text,
    region text,
    created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.5 Organization members ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS organization_members (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role text NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'editor', 'admin')),
    joined_at timestamptz DEFAULT now(),
    UNIQUE (organization_id, user_id)
);

-- ─── 1.6 Strategic plans ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS strategic_plans (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    title text NOT NULL DEFAULT 'Untitled Strategic Plan',
    name text,
    subtitle text,
    description text,
    industry text DEFAULT 'Investment',
    region text DEFAULT 'BARMM',
    start_year int DEFAULT 2026,
    end_year int DEFAULT 2035,
    status text DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived', 'completed', 'review', 'approved')),
    budget_total numeric(15,2) DEFAULT 0,
    budget_allocated numeric(15,2) DEFAULT 0,
    progress_pct int DEFAULT 0,
    last_synced_at timestamptz DEFAULT now(),
    sync_status text DEFAULT 'synced' CHECK (sync_status IN ('synced', 'pending', 'syncing', 'error', 'offline')),
    version int DEFAULT 1,
    is_template boolean DEFAULT false,
    template_id uuid REFERENCES strategic_plans(id) ON DELETE SET NULL,
    is_archived boolean NOT NULL DEFAULT false,
    archived_at timestamptz,
    is_public boolean NOT NULL DEFAULT false,
    public_access text NOT NULL DEFAULT 'none' CHECK (public_access IN ('none', 'view', 'comment')),
    -- JSONB snapshot columns for full planner state
    data jsonb,
    swot_items jsonb DEFAULT '[]'::jsonb,
    strategic_options jsonb DEFAULT '[]'::jsonb,
    objectives jsonb DEFAULT '[]'::jsonb,
    paps jsonb DEFAULT '[]'::jsonb,
    cld_nodes jsonb DEFAULT '[]'::jsonb,
    cld_links jsonb DEFAULT '[]'::jsonb,
    local_id text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.7 Strategic planner state (per-user full state snapshot) ────────────────
CREATE TABLE IF NOT EXISTS strategic_planner_state (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    state jsonb NOT NULL DEFAULT '{}'::jsonb,
    checksum text,
    version integer NOT NULL DEFAULT 1,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (user_id)
);

COMMENT ON TABLE strategic_planner_state IS
'Per-user full planner state snapshot (all plans + currentPlanId). '
'Primary target for strategic-planner-sync edge function.';

-- ─── 1.8 Plan templates ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS plan_templates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    industry text NOT NULL,
    region text DEFAULT 'BARMM',
    category text DEFAULT 'builtin' CHECK (category IN ('builtin', 'user', 'shared')),
    icon text,
    color text,
    tags text[] DEFAULT '{}',
    usage_count int DEFAULT 0,
    rating numeric(2,1) DEFAULT 0,
    rating_count int DEFAULT 0,
    template_data jsonb NOT NULL DEFAULT '{}',
    is_public boolean DEFAULT false,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.9 Plan shares ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS plan_shares (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    shared_with_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    shared_with_org_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
    permission_level text NOT NULL DEFAULT 'viewer' CHECK (permission_level IN ('viewer', 'editor', 'admin')),
    shared_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    shared_at timestamptz DEFAULT now(),
    expires_at timestamptz,
    accepted boolean DEFAULT false,
    CHECK (shared_with_user_id IS NOT NULL OR shared_with_org_id IS NOT NULL)
);

-- ─── 1.10 Share links ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS share_links (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    owner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    token text UNIQUE NOT NULL DEFAULT gen_random_uuid()::text,
    permission_level text NOT NULL DEFAULT 'viewer' CHECK (permission_level IN ('viewer', 'comment')),
    revoked boolean NOT NULL DEFAULT false,
    expires_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.11 SWOT items (with BIRD Resilience Index) ──────────────────────────────
CREATE TABLE IF NOT EXISTS swot_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    category text NOT NULL CHECK (category IN ('strength', 'weakness', 'opportunity', 'threat')),
    title text NOT NULL,
    description text,
    impact int DEFAULT 3 CHECK (impact BETWEEN 1 AND 5),
    likelihood int DEFAULT 3 CHECK (likelihood BETWEEN 1 AND 5),
    resilience_index numeric(4,2) DEFAULT 0,
    priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    ai_generated boolean DEFAULT false,
    ai_recommendation text,
    -- BIRD-specific columns
    leverage_point text CHECK (leverage_point IS NULL OR leverage_point IN ('LP1', 'LP2', 'LP3', 'LP4', 'LP5')),
    beie_cluster text CHECK (beie_cluster IS NULL OR beie_cluster IN ('foundations', 'transformers', 'enablers', 'connectors', 'financiers', 'cross-cutting')),
    assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    status text DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'archived')),
    -- Audit columns
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_by_name text,
    modified_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    modified_by_name text,
    modified_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.12 Strategy matrix / Strategic options (TOWS with BIRD columns) ─────────
CREATE TABLE IF NOT EXISTS strategy_matrix (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    quadrant text NOT NULL CHECK (quadrant IN ('SO', 'ST', 'WO', 'WT')),
    strategy text NOT NULL,
    title text,
    description text,
    priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    priority_score int CHECK (priority_score IS NULL OR priority_score BETWEEN 1 AND 5),
    feasibility_score int CHECK (feasibility_score IS NULL OR feasibility_score BETWEEN 1 AND 5),
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled', 'approved')),
    ai_generated boolean DEFAULT false,
    linked_swot_items uuid[] DEFAULT '{}',
    -- BIRD-specific columns
    leverage_point text CHECK (leverage_point IS NULL OR leverage_point IN ('LP1', 'LP2', 'LP3', 'LP4', 'LP5')),
    leverage_level int CHECK (leverage_level IS NULL OR leverage_level BETWEEN 1 AND 12),
    beie_cluster text CHECK (beie_cluster IS NULL OR beie_cluster IN ('foundations', 'transformers', 'enablers', 'connectors', 'financiers', 'cross-cutting')),
    bird_phase text CHECK (bird_phase IS NULL OR bird_phase IN ('1', '2', '3')),
    swot_pairs text,
    resource_requirement text CHECK (resource_requirement IS NULL OR resource_requirement IN ('low', 'medium', 'high')),
    selected boolean DEFAULT false,
    assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    approved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    approved_at timestamptz,
    due_date date,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.13 Balanced scorecards ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS balanced_scorecards (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    perspective text NOT NULL CHECK (perspective IN ('financial', 'stakeholder', 'internal_process', 'learning_growth')),
    description text,
    weight_pct int DEFAULT 25,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.14 Scorecard objectives / BSC objectives (with BIRD columns) ────────────
CREATE TABLE IF NOT EXISTS scorecard_objectives (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    scorecard_id uuid REFERENCES balanced_scorecards(id) ON DELETE CASCADE,
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    perspective text NOT NULL CHECK (perspective IN ('financial', 'stakeholder', 'internal_process', 'learning_growth')),
    title text NOT NULL,
    objective text,
    description text,
    context text,
    target_value text,
    current_value text,
    progress_pct int DEFAULT 0,
    priority text DEFAULT 'medium',
    weight numeric(3,1) DEFAULT 1.0,
    ai_suggested boolean DEFAULT false,
    -- BIRD-specific columns
    leverage_point text CHECK (leverage_point IS NULL OR leverage_point IN ('LP1', 'LP2', 'LP3', 'LP4', 'LP5')),
    beie_cluster text CHECK (beie_cluster IS NULL OR beie_cluster IN ('foundations', 'transformers', 'enablers', 'connectors', 'financiers', 'cross-cutting')),
    bird_phase text CHECK (bird_phase IS NULL OR bird_phase IN ('1', '2', '3')),
    bsc_code text,
    champion uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    champion_name text,
    status text DEFAULT 'active',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.15 Scorecard KPIs (with BIRD columns) ───────────────────────────────────
CREATE TABLE IF NOT EXISTS scorecard_kpis (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    objective_id uuid NOT NULL REFERENCES scorecard_objectives(id) ON DELETE CASCADE,
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    baseline_value numeric(15,2) DEFAULT 0,
    target_value numeric(15,2) DEFAULT 0,
    current_value numeric(15,2) DEFAULT 0,
    unit text DEFAULT 'count',
    frequency text DEFAULT 'monthly' CHECK (frequency IN ('daily', 'weekly', 'monthly', 'quarterly', 'annual')),
    formula text,
    data_source text,
    status text DEFAULT 'on_track' CHECK (status IN ('on_track', 'at_risk', 'off_track', 'delayed', 'achieved', 'completed')),
    ai_suggested boolean DEFAULT false,
    alert_threshold numeric(5,2) DEFAULT 80,
    -- BIRD-specific columns
    target_2030 numeric(15,2),
    target_2035 numeric(15,2),
    leverage_point text CHECK (leverage_point IS NULL OR leverage_point IN ('LP1', 'LP2', 'LP3', 'LP4', 'LP5')),
    benchmark_source text,
    owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    owner_name text,
    assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    target_year int DEFAULT 2026,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.16 PAPs (Programs, Activities, Projects) with BIRD columns ──────────────
CREATE TABLE IF NOT EXISTS paps (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    type text NOT NULL CHECK (type IN ('program', 'activity', 'project')),
    code text,
    title text NOT NULL,
    name text,
    description text,
    strategic_intent text,
    objective_id uuid REFERENCES scorecard_objectives(id) ON DELETE SET NULL,
    priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    priority_score int CHECK (priority_score IS NULL OR priority_score BETWEEN 1 AND 5),
    status text DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'delayed', 'cancelled')),
    progress numeric(5,2) DEFAULT 0,
    budget numeric(15,2) DEFAULT 0,
    budget_allocated numeric(15,2) DEFAULT 0,
    budget_spent numeric(15,2) DEFAULT 0,
    progress_pct int DEFAULT 0,
    start_date date,
    end_date date,
    duration_months int,
    due_quarter text DEFAULT 'Q1',
    -- BIRD-specific columns
    beie_cluster text CHECK (beie_cluster IS NULL OR beie_cluster IN ('foundations', 'transformers', 'enablers', 'connectors', 'financiers', 'cross-cutting')),
    bird_phase text CHECK (bird_phase IS NULL OR bird_phase IN ('1', '2', '3')),
    leverage_point text CHECK (leverage_point IS NULL OR leverage_point IN ('LP1', 'LP2', 'LP3', 'LP4', 'LP5')),
    lead_agency text,
    support_agencies text[] DEFAULT '{}',
    sdg_alignment text,
    dependencies uuid[] DEFAULT '{}',
    ai_generated boolean DEFAULT false,
    -- Ownership
    owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    owner_email text,
    owner_name text,
    assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_by_name text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.17 Activity logs ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activity_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    action_type text NOT NULL CHECK (action_type IN (
        'plan_created', 'plan_updated', 'plan_exported', 'plan_shared',
        'swot_added', 'swot_updated', 'swot_deleted',
        'strategy_added', 'strategy_updated', 'strategy_deleted',
        'objective_added', 'objective_updated', 'objective_deleted',
        'kpi_added', 'kpi_updated', 'kpi_deleted', 'kpi_value_updated',
        'pap_added', 'pap_updated', 'pap_deleted', 'pap_status_changed',
        'comment_added', 'comment_updated', 'comment_deleted',
        'member_joined', 'member_left', 'member_role_changed',
        'template_used', 'ai_suggestion_accepted', 'ai_suggestion_rejected',
        'sync_completed', 'sync_failed', 'sync_conflict_resolved'
    )),
    entity_type text NOT NULL CHECK (entity_type IN ('plan', 'swot', 'strategy', 'objective', 'kpi', 'pap', 'comment', 'member', 'template', 'sync')),
    entity_id uuid,
    details jsonb DEFAULT '{}',
    ip_address text,
    user_agent text,
    created_at timestamptz DEFAULT now()
);

-- ─── 1.18 Activity log (Strat Planner Pro format) ──────────────────────────────
CREATE TABLE IF NOT EXISTS activity_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid REFERENCES strategic_plans(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    action text NOT NULL,
    entity_type text,
    entity_id uuid,
    details jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

-- ─── 1.19 Comments ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    entity_type text NOT NULL CHECK (entity_type IN ('swot', 'strategy', 'objective', 'kpi', 'pap', 'plan')),
    entity_id uuid NOT NULL,
    parent_id uuid REFERENCES comments(id) ON DELETE CASCADE,
    content text NOT NULL,
    resolved boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.20 Plan comments (Strat Planner Pro format) ─────────────────────────────
CREATE TABLE IF NOT EXISTS plan_comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    entity_type text,
    entity_id uuid,
    parent_id uuid REFERENCES plan_comments(id) ON DELETE CASCADE,
    content text NOT NULL,
    resolved boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.21 Plan collaboration presence ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS plan_collaboration (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    user_name text,
    user_avatar text,
    section text NOT NULL CHECK (section IN ('overview', 'swot', 'strategy', 'scorecard', 'paps', 'systems', 'export')),
    action text DEFAULT 'viewing' CHECK (action IN ('viewing', 'editing')),
    cursor_position jsonb,
    last_seen_at timestamptz DEFAULT now(),
    UNIQUE (plan_id, user_id, section)
);

-- ─── 1.22 User notifications ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type text NOT NULL CHECK (type IN (
        'welcome', 'kpi_alert', 'weekly_digest', 'plan_reminder',
        'team_invite', 'team_update', 'comment_reply', 'sync_conflict',
        'system', 'ai_suggestion'
    )),
    title text NOT NULL,
    message text NOT NULL,
    link text,
    is_read boolean DEFAULT false,
    is_email_sent boolean DEFAULT false,
    data jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

-- ─── 1.23 Plan snapshots ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS plan_snapshots (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    version int NOT NULL,
    snapshot_data jsonb NOT NULL,
    created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now()
);

-- ─── 1.24 Causal loop diagrams ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS causal_loops (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    loop_type text NOT NULL CHECK (loop_type IN ('reinforcing', 'balancing')),
    variables jsonb NOT NULL DEFAULT '[]',
    connections jsonb NOT NULL DEFAULT '[]',
    leverage_points jsonb DEFAULT '[]',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.25 Systems archetypes ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS systems_archetypes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    archetype_type text NOT NULL CHECK (archetype_type IN (
        'limits_to_growth', 'shifting_the_burden', 'tragedy_of_commons',
        'success_to_the_successful', 'fixes_that_fail', 'erosion_of_goals',
        'escalation', 'growth_and_underinvestment', 'drifting_goals',
        'accidental_adversaries', 'attractiveness_principle', 'big_man'
    )),
    symptoms text,
    structural_causes text,
    interventions text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ─── 1.26 AI interaction logs (audit trail) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_interaction_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid REFERENCES strategic_plans(id) ON DELETE SET NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    action text NOT NULL,
    active_view text,
    input_data jsonb,
    output_data jsonb,
    model text DEFAULT 'gpt-4o',
    tokens_used integer,
    duration_ms integer,
    status text NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'error', 'timeout')),
    error_msg text,
    created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE ai_interaction_logs IS
'Audit trail of all BIRD AI assistant interactions for MEL and compliance reporting.';

-- ─── 1.27 MEL logs ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mel_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    log_type text NOT NULL,
    log_data jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

-- ─── 1.28 Visit logs ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS visit_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    page text,
    referrer text,
    user_agent text,
    ip_address text,
    created_at timestamptz DEFAULT now()
);

-- ─── 1.29 Admins ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL UNIQUE,
    full_name text,
    role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 1.30 CRM TABLES (restricted to service_role / edge functions only)
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS crm_contacts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
    name text NOT NULL,
    email text,
    phone text,
    company text,
    title text,
    tags text[] DEFAULT '{}',
    notes text,
    source text,
    status text DEFAULT 'active',
    custom_fields jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_campaigns (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
    name text NOT NULL,
    description text,
    status text DEFAULT 'draft',
    start_date date,
    end_date date,
    budget numeric(15,2) DEFAULT 0,
    metrics jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_flows (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
    name text NOT NULL,
    description text,
    status text DEFAULT 'draft',
    trigger_type text,
    steps jsonb DEFAULT '[]',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_flow_steps (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    flow_id uuid NOT NULL REFERENCES crm_flows(id) ON DELETE CASCADE,
    step_order int NOT NULL,
    step_type text NOT NULL,
    config jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_flow_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    flow_id uuid REFERENCES crm_flows(id) ON DELETE SET NULL,
    contact_id uuid REFERENCES crm_contacts(id) ON DELETE SET NULL,
    step_id uuid REFERENCES crm_flow_steps(id) ON DELETE SET NULL,
    status text DEFAULT 'pending',
    executed_at timestamptz,
    result jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_flow_step_queue (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    flow_id uuid NOT NULL REFERENCES crm_flows(id) ON DELETE CASCADE,
    contact_id uuid NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
    step_id uuid NOT NULL REFERENCES crm_flow_steps(id) ON DELETE CASCADE,
    scheduled_at timestamptz NOT NULL,
    status text DEFAULT 'pending',
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
    name text NOT NULL,
    description text,
    event_type text,
    start_date timestamptz,
    end_date timestamptz,
    location text,
    attendees jsonb DEFAULT '[]',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_appointments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    contact_id uuid REFERENCES crm_contacts(id) ON DELETE SET NULL,
    title text NOT NULL,
    description text,
    start_time timestamptz NOT NULL,
    end_time timestamptz NOT NULL,
    status text DEFAULT 'scheduled',
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_calendars (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
    name text NOT NULL,
    description text,
    color text DEFAULT '#3B82F6',
    is_default boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_calendar_members (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    calendar_id uuid NOT NULL REFERENCES crm_calendars(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role text DEFAULT 'member',
    created_at timestamptz DEFAULT now(),
    UNIQUE (calendar_id, user_id)
);

CREATE TABLE IF NOT EXISTS crm_availability (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    day_of_week int CHECK (day_of_week BETWEEN 0 AND 6),
    start_time time,
    end_time time,
    is_available boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_sends (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    contact_id uuid REFERENCES crm_contacts(id) ON DELETE SET NULL,
    campaign_id uuid REFERENCES crm_campaigns(id) ON DELETE SET NULL,
    channel text NOT NULL CHECK (channel IN ('email', 'sms', 'whatsapp')),
    subject text,
    body text,
    status text DEFAULT 'pending',
    sent_at timestamptz,
    delivered_at timestamptz,
    opened_at timestamptz,
    clicked_at timestamptz,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_lists (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
    name text NOT NULL,
    description text,
    filters jsonb DEFAULT '{}',
    contact_count int DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_contact_lists (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id uuid NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
    list_id uuid NOT NULL REFERENCES crm_lists(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE (contact_id, list_id)
);

CREATE TABLE IF NOT EXISTS crm_goals (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
    name text NOT NULL,
    description text,
    target_value numeric(15,2),
    current_value numeric(15,2) DEFAULT 0,
    unit text,
    deadline date,
    status text DEFAULT 'active',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_goal_contacts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id uuid NOT NULL REFERENCES crm_goals(id) ON DELETE CASCADE,
    contact_id uuid NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
    contribution numeric(15,2) DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    UNIQUE (goal_id, contact_id)
);

CREATE TABLE IF NOT EXISTS crm_goal_actions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id uuid NOT NULL REFERENCES crm_goals(id) ON DELETE CASCADE,
    action_type text NOT NULL,
    config jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_goal_runs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id uuid NOT NULL REFERENCES crm_goals(id) ON DELETE CASCADE,
    run_date date NOT NULL,
    value numeric(15,2) DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_goal_work (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id uuid NOT NULL REFERENCES crm_goals(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    work_type text,
    value numeric(15,2) DEFAULT 0,
    notes text,
    created_at timestamptz DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- ═══════════════════════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategic_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategic_planner_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE swot_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_matrix ENABLE ROW LEVEL SECURITY;
ALTER TABLE balanced_scorecards ENABLE ROW LEVEL SECURITY;
ALTER TABLE scorecard_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE scorecard_kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE paps ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_collaboration ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE causal_loops ENABLE ROW LEVEL SECURITY;
ALTER TABLE systems_archetypes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interaction_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE mel_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- ── Users Policies ──────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "users_select_own" ON users;
CREATE POLICY "users_select_own" ON users FOR SELECT TO authenticated USING (auth.uid() = id);
DROP POLICY IF EXISTS "users_select_admin" ON users;
CREATE POLICY "users_select_admin" ON users FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'super_admin')));
DROP POLICY IF EXISTS "users_update_own" ON users;
CREATE POLICY "users_update_own" ON users FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "users_update_admin" ON users;
CREATE POLICY "users_update_admin" ON users FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'super_admin')));
DROP POLICY IF EXISTS "users_insert_self" ON users;
CREATE POLICY "users_insert_self" ON users FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- ── User Profiles Policies ──────────────────────────────────────────────────────
DROP POLICY IF EXISTS "up_select" ON user_profiles;
CREATE POLICY "up_select" ON user_profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "up_insert" ON user_profiles;
CREATE POLICY "up_insert" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "up_update" ON user_profiles;
CREATE POLICY "up_update" ON user_profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ── User Settings Policies ──────────────────────────────────────────────────────
DROP POLICY IF EXISTS "us_select" ON user_settings;
CREATE POLICY "us_select" ON user_settings FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "us_insert" ON user_settings;
CREATE POLICY "us_insert" ON user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "us_update" ON user_settings;
CREATE POLICY "us_update" ON user_settings FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ── Organizations Policies ──────────────────────────────────────────────────────
DROP POLICY IF EXISTS "org_select_member" ON organizations;
CREATE POLICY "org_select_member" ON organizations FOR SELECT TO authenticated USING (created_by = auth.uid() OR EXISTS (SELECT 1 FROM organization_members om WHERE om.organization_id = organizations.id AND om.user_id = auth.uid()));
DROP POLICY IF EXISTS "org_insert_creator" ON organizations;
CREATE POLICY "org_insert_creator" ON organizations FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
DROP POLICY IF EXISTS "org_update_creator" ON organizations;
CREATE POLICY "org_update_creator" ON organizations FOR UPDATE TO authenticated USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());

-- ── Organization Members Policies ───────────────────────────────────────────────
DROP POLICY IF EXISTS "om_select" ON organization_members;
CREATE POLICY "om_select" ON organization_members FOR SELECT TO authenticated USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM organization_members om2 WHERE om2.organization_id = organization_members.organization_id AND om2.user_id = auth.uid())
);
DROP POLICY IF EXISTS "org_members_insert_admin" ON organization_members;
CREATE POLICY "org_members_insert_admin" ON organization_members FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM organization_members om WHERE om.organization_id = organization_members.organization_id AND om.user_id = auth.uid() AND om.role = 'admin'));
DROP POLICY IF EXISTS "org_members_update_admin" ON organization_members;
CREATE POLICY "org_members_update_admin" ON organization_members FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM organization_members om WHERE om.organization_id = organization_members.organization_id AND om.user_id = auth.uid() AND om.role = 'admin'));
DROP POLICY IF EXISTS "org_members_delete_admin" ON organization_members;
CREATE POLICY "org_members_delete_admin" ON organization_members FOR DELETE TO authenticated USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM organization_members om WHERE om.organization_id = organization_members.organization_id AND om.user_id = auth.uid() AND om.role = 'admin'));

-- ── Strategic Plans Policies ────────────────────────────────────────────────────
DROP POLICY IF EXISTS "sp_select" ON strategic_plans;
CREATE POLICY "sp_select" ON strategic_plans FOR SELECT USING (auth.uid() = user_id OR is_public = true);
DROP POLICY IF EXISTS "sp_insert" ON strategic_plans;
CREATE POLICY "sp_insert" ON strategic_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "sp_update" ON strategic_plans;
CREATE POLICY "sp_update" ON strategic_plans FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "sp_delete" ON strategic_plans;
CREATE POLICY "sp_delete" ON strategic_plans FOR DELETE USING (auth.uid() = user_id);

-- ── Strategic Planner State Policies ────────────────────────────────────────────
DROP POLICY IF EXISTS "sps_select" ON strategic_planner_state;
CREATE POLICY "sps_select" ON strategic_planner_state FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "sps_insert" ON strategic_planner_state;
CREATE POLICY "sps_insert" ON strategic_planner_state FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "sps_update" ON strategic_planner_state;
CREATE POLICY "sps_update" ON strategic_planner_state FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "sps_delete" ON strategic_planner_state;
CREATE POLICY "sps_delete" ON strategic_planner_state FOR DELETE USING (auth.uid() = user_id);

-- ── SWOT Items Policies ─────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "swot_select_plan_access" ON swot_items;
CREATE POLICY "swot_select_plan_access" ON swot_items FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = swot_items.plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)));
DROP POLICY IF EXISTS "swot_insert_plan_access" ON swot_items;
CREATE POLICY "swot_insert_plan_access" ON swot_items FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = swot_items.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "swot_update_plan_access" ON swot_items;
CREATE POLICY "swot_update_plan_access" ON swot_items FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = swot_items.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "swot_delete_plan_access" ON swot_items;
CREATE POLICY "swot_delete_plan_access" ON swot_items FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = swot_items.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level = 'admin'))));

-- ── Strategy Matrix Policies ────────────────────────────────────────────────────
DROP POLICY IF EXISTS "strategy_select_plan_access" ON strategy_matrix;
CREATE POLICY "strategy_select_plan_access" ON strategy_matrix FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = strategy_matrix.plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)));
DROP POLICY IF EXISTS "strategy_insert_plan_access" ON strategy_matrix;
CREATE POLICY "strategy_insert_plan_access" ON strategy_matrix FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = strategy_matrix.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "strategy_update_plan_access" ON strategy_matrix;
CREATE POLICY "strategy_update_plan_access" ON strategy_matrix FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = strategy_matrix.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "strategy_delete_plan_access" ON strategy_matrix;
CREATE POLICY "strategy_delete_plan_access" ON strategy_matrix FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = strategy_matrix.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level = 'admin'))));

-- ── Balanced Scorecards Policies ────────────────────────────────────────────────
DROP POLICY IF EXISTS "bsc_select_plan_access" ON balanced_scorecards;
CREATE POLICY "bsc_select_plan_access" ON balanced_scorecards FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = balanced_scorecards.plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)));
DROP POLICY IF EXISTS "bsc_insert_plan_access" ON balanced_scorecards;
CREATE POLICY "bsc_insert_plan_access" ON balanced_scorecards FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = balanced_scorecards.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "bsc_update_plan_access" ON balanced_scorecards;
CREATE POLICY "bsc_update_plan_access" ON balanced_scorecards FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = balanced_scorecards.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "bsc_delete_plan_access" ON balanced_scorecards;
CREATE POLICY "bsc_delete_plan_access" ON balanced_scorecards FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = balanced_scorecards.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level = 'admin'))));

-- ── Scorecard Objectives Policies ───────────────────────────────────────────────
DROP POLICY IF EXISTS "obj_select_plan_access" ON scorecard_objectives;
CREATE POLICY "obj_select_plan_access" ON scorecard_objectives FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = scorecard_objectives.plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)));
DROP POLICY IF EXISTS "obj_insert_plan_access" ON scorecard_objectives;
CREATE POLICY "obj_insert_plan_access" ON scorecard_objectives FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = scorecard_objectives.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "obj_update_plan_access" ON scorecard_objectives;
CREATE POLICY "obj_update_plan_access" ON scorecard_objectives FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = scorecard_objectives.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "obj_delete_plan_access" ON scorecard_objectives;
CREATE POLICY "obj_delete_plan_access" ON scorecard_objectives FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = scorecard_objectives.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level = 'admin'))));

-- ── Scorecard KPIs Policies ─────────────────────────────────────────────────────
DROP POLICY IF EXISTS "kpi_select_plan_access" ON scorecard_kpis;
CREATE POLICY "kpi_select_plan_access" ON scorecard_kpis FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = scorecard_kpis.plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)));
DROP POLICY IF EXISTS "kpi_insert_plan_access" ON scorecard_kpis;
CREATE POLICY "kpi_insert_plan_access" ON scorecard_kpis FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = scorecard_kpis.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "kpi_update_plan_access" ON scorecard_kpis;
CREATE POLICY "kpi_update_plan_access" ON scorecard_kpis FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = scorecard_kpis.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "kpi_delete_plan_access" ON scorecard_kpis;
CREATE POLICY "kpi_delete_plan_access" ON scorecard_kpis FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = scorecard_kpis.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level = 'admin'))));

-- ── PAPs Policies ───────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "paps_select_plan_access" ON paps;
CREATE POLICY "paps_select_plan_access" ON paps FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = paps.plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)));
DROP POLICY IF EXISTS "paps_insert_plan_access" ON paps;
CREATE POLICY "paps_insert_plan_access" ON paps FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = paps.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "paps_update_plan_access" ON paps;
CREATE POLICY "paps_update_plan_access" ON paps FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = paps.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "paps_delete_plan_access" ON paps;
CREATE POLICY "paps_delete_plan_access" ON paps FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = paps.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level = 'admin'))));

-- ── Activity Logs Policies ──────────────────────────────────────────────────────
DROP POLICY IF EXISTS "activity_select_plan_access" ON activity_logs;
CREATE POLICY "activity_select_plan_access" ON activity_logs FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = activity_logs.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND accepted = true))));
DROP POLICY IF EXISTS "activity_insert_plan_access" ON activity_logs;
CREATE POLICY "activity_insert_plan_access" ON activity_logs FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = activity_logs.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND accepted = true))));

DROP POLICY IF EXISTS "al_select" ON activity_log;
CREATE POLICY "al_select" ON activity_log FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_id AND sp.user_id = auth.uid())
);
DROP POLICY IF EXISTS "al_insert" ON activity_log;
CREATE POLICY "al_insert" ON activity_log FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ── Comments Policies ───────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "comments_select_plan_access" ON comments;
CREATE POLICY "comments_select_plan_access" ON comments FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = comments.plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)));
DROP POLICY IF EXISTS "comments_insert_plan_access" ON comments;
CREATE POLICY "comments_insert_plan_access" ON comments FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = comments.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND accepted = true))));
DROP POLICY IF EXISTS "comments_update_own" ON comments;
CREATE POLICY "comments_update_own" ON comments FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "comments_delete_own" ON comments;
CREATE POLICY "comments_delete_own" ON comments FOR DELETE TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "pc_select" ON plan_comments;
CREATE POLICY "pc_select" ON plan_comments FOR SELECT USING (EXISTS (
    SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)
));
DROP POLICY IF EXISTS "pc_insert" ON plan_comments;
CREATE POLICY "pc_insert" ON plan_comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "pc_update" ON plan_comments;
CREATE POLICY "pc_update" ON plan_comments FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "pc_delete" ON plan_comments;
CREATE POLICY "pc_delete" ON plan_comments FOR DELETE USING (auth.uid() = user_id);

-- ── Plan Collaboration Policies ─────────────────────────────────────────────────
DROP POLICY IF EXISTS "collab_select_plan_access" ON plan_collaboration;
CREATE POLICY "collab_select_plan_access" ON plan_collaboration FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_collaboration.plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)));
DROP POLICY IF EXISTS "collab_insert_plan_access" ON plan_collaboration;
CREATE POLICY "collab_insert_plan_access" ON plan_collaboration FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_collaboration.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND accepted = true))));
DROP POLICY IF EXISTS "collab_update_own" ON plan_collaboration;
CREATE POLICY "collab_update_own" ON plan_collaboration FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "collab_delete_own" ON plan_collaboration;
CREATE POLICY "collab_delete_own" ON plan_collaboration FOR DELETE TO authenticated USING (user_id = auth.uid());

-- ── User Notifications Policies ─────────────────────────────────────────────────
DROP POLICY IF EXISTS "notifications_select_own" ON user_notifications;
CREATE POLICY "notifications_select_own" ON user_notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
DROP POLICY IF EXISTS "notifications_update_own" ON user_notifications;
CREATE POLICY "notifications_update_own" ON user_notifications FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "notifications_delete_own" ON user_notifications;
CREATE POLICY "notifications_delete_own" ON user_notifications FOR DELETE TO authenticated USING (user_id = auth.uid());

-- ── Plan Snapshots Policies ─────────────────────────────────────────────────────
DROP POLICY IF EXISTS "snapshots_select_plan_access" ON plan_snapshots;
CREATE POLICY "snapshots_select_plan_access" ON plan_snapshots FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_snapshots.plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)));
DROP POLICY IF EXISTS "snapshots_insert_plan_access" ON plan_snapshots;
CREATE POLICY "snapshots_insert_plan_access" ON plan_snapshots FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_snapshots.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));

-- ── Plan Templates Policies ─────────────────────────────────────────────────────
DROP POLICY IF EXISTS "pt_public" ON plan_templates;
CREATE POLICY "pt_public" ON plan_templates FOR SELECT USING (category = 'builtin' OR is_public = true);
DROP POLICY IF EXISTS "pt_own" ON plan_templates;
CREATE POLICY "pt_own" ON plan_templates FOR SELECT USING (auth.uid() = created_by);
DROP POLICY IF EXISTS "pt_insert" ON plan_templates;
CREATE POLICY "pt_insert" ON plan_templates FOR INSERT WITH CHECK (auth.uid() = created_by);
DROP POLICY IF EXISTS "pt_update" ON plan_templates;
CREATE POLICY "pt_update" ON plan_templates FOR UPDATE USING (auth.uid() = created_by);
DROP POLICY IF EXISTS "pt_delete" ON plan_templates;
CREATE POLICY "pt_delete" ON plan_templates FOR DELETE USING (auth.uid() = created_by);

-- ── Plan Shares Policies ────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "shares_select_plan_owner" ON plan_shares;
CREATE POLICY "shares_select_plan_owner" ON plan_shares FOR SELECT TO authenticated USING (shared_by = auth.uid() OR shared_with_user_id = auth.uid() OR EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_shares.plan_id AND sp.user_id = auth.uid()));
DROP POLICY IF EXISTS "shares_insert_plan_owner" ON plan_shares;
CREATE POLICY "shares_insert_plan_owner" ON plan_shares FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_shares.plan_id AND sp.user_id = auth.uid()));
DROP POLICY IF EXISTS "shares_update_plan_owner" ON plan_shares;
CREATE POLICY "shares_update_plan_owner" ON plan_shares FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_shares.plan_id AND sp.user_id = auth.uid()));
DROP POLICY IF EXISTS "shares_delete_plan_owner" ON plan_shares;
CREATE POLICY "shares_delete_plan_owner" ON plan_shares FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_shares.plan_id AND sp.user_id = auth.uid()));

-- ── Share Links Policies ────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "sl_select" ON share_links;
CREATE POLICY "sl_select" ON share_links FOR SELECT USING (revoked = false OR auth.uid() = owner_id);
DROP POLICY IF EXISTS "sl_insert" ON share_links;
CREATE POLICY "sl_insert" ON share_links FOR INSERT WITH CHECK (auth.uid() = owner_id);
DROP POLICY IF EXISTS "sl_update" ON share_links;
CREATE POLICY "sl_update" ON share_links FOR UPDATE USING (auth.uid() = owner_id);
DROP POLICY IF EXISTS "sl_delete" ON share_links;
CREATE POLICY "sl_delete" ON share_links FOR DELETE USING (auth.uid() = owner_id);

-- ── Causal Loops Policies ───────────────────────────────────────────────────────
DROP POLICY IF EXISTS "cld_select_plan_access" ON causal_loops;
CREATE POLICY "cld_select_plan_access" ON causal_loops FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = causal_loops.plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)));
DROP POLICY IF EXISTS "cld_insert_plan_access" ON causal_loops;
CREATE POLICY "cld_insert_plan_access" ON causal_loops FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = causal_loops.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "cld_update_plan_access" ON causal_loops;
CREATE POLICY "cld_update_plan_access" ON causal_loops FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = causal_loops.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "cld_delete_plan_access" ON causal_loops;
CREATE POLICY "cld_delete_plan_access" ON causal_loops FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = causal_loops.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level = 'admin'))));

-- ── Systems Archetypes Policies ─────────────────────────────────────────────────
DROP POLICY IF EXISTS "archetype_select_plan_access" ON systems_archetypes;
CREATE POLICY "archetype_select_plan_access" ON systems_archetypes FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = systems_archetypes.plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)));
DROP POLICY IF EXISTS "archetype_insert_plan_access" ON systems_archetypes;
CREATE POLICY "archetype_insert_plan_access" ON systems_archetypes FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = systems_archetypes.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "archetype_update_plan_access" ON systems_archetypes;
CREATE POLICY "archetype_update_plan_access" ON systems_archetypes FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = systems_archetypes.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level IN ('editor', 'admin')))));
DROP POLICY IF EXISTS "archetype_delete_plan_access" ON systems_archetypes;
CREATE POLICY "archetype_delete_plan_access" ON systems_archetypes FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = systems_archetypes.plan_id AND (sp.user_id = auth.uid() OR sp.id IN (SELECT plan_id FROM plan_shares WHERE shared_with_user_id = auth.uid() AND permission_level = 'admin'))));

-- ── AI Interaction Logs Policies ────────────────────────────────────────────────
DROP POLICY IF EXISTS "ail_select" ON ai_interaction_logs;
CREATE POLICY "ail_select" ON ai_interaction_logs FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "ail_insert" ON ai_interaction_logs;
CREATE POLICY "ail_insert" ON ai_interaction_logs FOR INSERT WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- ── MEL Logs Policies ───────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "ml_select" ON mel_logs;
CREATE POLICY "ml_select" ON mel_logs FOR SELECT USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = mel_logs.plan_id AND sp.user_id = auth.uid()));
DROP POLICY IF EXISTS "ml_insert" ON mel_logs;
CREATE POLICY "ml_insert" ON mel_logs FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = mel_logs.plan_id AND sp.user_id = auth.uid()));

-- ── Visit Logs Policies ─────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "vl_select" ON visit_logs;
CREATE POLICY "vl_select" ON visit_logs FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "vl_insert" ON visit_logs;
CREATE POLICY "vl_insert" ON visit_logs FOR INSERT WITH CHECK (true);

-- ── Admins Policies ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "admins_select" ON admins;
CREATE POLICY "admins_select" ON admins FOR SELECT USING (
    auth.jwt()->>'email' IN (SELECT email FROM admins)
    OR auth.role() = 'service_role'
);

-- ── CRM Tables: Restrict to service_role (edge functions only) ──────────────────
DO $$
DECLARE tbl text;
BEGIN
FOREACH tbl IN ARRAY ARRAY[
    'crm_campaigns','crm_flow_step_queue','crm_goal_work','crm_sends',
    'crm_appointments','crm_availability','crm_calendar_members','crm_calendars',
    'crm_contact_lists','crm_contacts','crm_events','crm_flow_logs',
    'crm_flow_steps','crm_flows','crm_goal_actions','crm_goal_contacts',
    'crm_goal_runs','crm_goals','crm_lists'
] LOOP
EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
EXECUTE format(
    'DROP POLICY IF EXISTS "crm_service_%1$s" ON %1$I;
     CREATE POLICY "crm_service_%1$s" ON %1$I
     USING (auth.role() = ''service_role'')
     WITH CHECK (auth.role() = ''service_role'')',
    tbl
);
END LOOP;
END $$;

-- ═══════════════════════════════════════════════════════════════════════════════
-- 3. INDEXES
-- ═══════════════════════════════════════════════════════════════════════════════

-- Core table indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_org ON users(organization);
CREATE INDEX IF NOT EXISTS idx_orgs_slug ON organizations(slug);
CREATE INDEX IF NOT EXISTS idx_org_members_org ON organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_members_user ON organization_members(user_id);

-- Strategic plans indexes
CREATE INDEX IF NOT EXISTS idx_strategic_plans_user_id ON strategic_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_strategic_plans_org ON strategic_plans(organization_id);
CREATE INDEX IF NOT EXISTS idx_strategic_plans_status ON strategic_plans(status);
CREATE INDEX IF NOT EXISTS idx_strategic_plans_archived ON strategic_plans(is_archived) WHERE NOT is_archived;
CREATE INDEX IF NOT EXISTS idx_strategic_plans_updated ON strategic_plans(updated_at DESC);

-- SWOT items indexes
CREATE INDEX IF NOT EXISTS idx_swot_plan ON swot_items(plan_id);
CREATE INDEX IF NOT EXISTS idx_swot_category ON swot_items(category);

-- Strategy matrix indexes
CREATE INDEX IF NOT EXISTS idx_strategy_plan ON strategy_matrix(plan_id);
CREATE INDEX IF NOT EXISTS idx_strategy_quadrant ON strategy_matrix(quadrant);

-- BSC indexes
CREATE INDEX IF NOT EXISTS idx_bsc_plan ON balanced_scorecards(plan_id);
CREATE INDEX IF NOT EXISTS idx_obj_scorecard ON scorecard_objectives(scorecard_id);
CREATE INDEX IF NOT EXISTS idx_bsc_objectives_plan_id ON scorecard_objectives(plan_id);
CREATE INDEX IF NOT EXISTS idx_bsc_objectives_perspective ON scorecard_objectives(perspective);
CREATE INDEX IF NOT EXISTS idx_kpi_objective ON scorecard_kpis(objective_id);

-- PAPs indexes
CREATE INDEX IF NOT EXISTS idx_paps_plan ON paps(plan_id);
CREATE INDEX IF NOT EXISTS idx_paps_type ON paps(type);
CREATE INDEX IF NOT EXISTS idx_paps_status ON paps(status);

-- Activity logs indexes
CREATE INDEX IF NOT EXISTS idx_activity_plan ON activity_logs(plan_id);
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_type ON activity_logs(action_type);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_mel_logs_plan_id ON mel_logs(plan_id);
CREATE INDEX IF NOT EXISTS idx_mel_logs_created ON mel_logs(created_at DESC);

-- Comments indexes
CREATE INDEX IF NOT EXISTS idx_comments_plan ON comments(plan_id);
CREATE INDEX IF NOT EXISTS idx_comments_entity ON comments(entity_id);

-- Collaboration indexes
CREATE INDEX IF NOT EXISTS idx_collab_plan ON plan_collaboration(plan_id);
CREATE INDEX IF NOT EXISTS idx_collab_user ON plan_collaboration(user_id);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user ON user_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON user_notifications(user_id, is_read);

-- Shares indexes
CREATE INDEX IF NOT EXISTS idx_shares_plan ON plan_shares(plan_id);
CREATE INDEX IF NOT EXISTS idx_shares_user ON plan_shares(shared_with_user_id);

-- CLD indexes
CREATE INDEX IF NOT EXISTS idx_cld_plan ON causal_loops(plan_id);
CREATE INDEX IF NOT EXISTS idx_archetype_plan ON systems_archetypes(plan_id);

-- AI logs indexes
CREATE INDEX IF NOT EXISTS idx_sps_user_id ON strategic_planner_state(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_user_id ON ai_interaction_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_plan_id ON ai_interaction_logs(plan_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_created ON ai_interaction_logs(created_at DESC);

-- Visit logs indexes
CREATE INDEX IF NOT EXISTS idx_visit_logs_user_id ON visit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_visit_logs_created ON visit_logs(created_at DESC);

-- GIN indexes for JSONB fast-containment queries
CREATE INDEX IF NOT EXISTS idx_sps_state_gin ON strategic_planner_state USING gin(state);
CREATE INDEX IF NOT EXISTS idx_plans_data_gin ON strategic_plans USING gin(data);
CREATE INDEX IF NOT EXISTS idx_plans_swot_gin ON strategic_plans USING gin(swot_items);
CREATE INDEX IF NOT EXISTS idx_plans_objectives_gin ON strategic_plans USING gin(objectives);
CREATE INDEX IF NOT EXISTS idx_plans_paps_gin ON strategic_plans USING gin(paps);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 4. FUNCTIONS & TRIGGERS
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── 4.1 Updated at trigger ────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
DO $$
DECLARE tbl text;
BEGIN
FOREACH tbl IN ARRAY ARRAY[
    'users', 'user_profiles', 'user_settings', 'organizations',
    'strategic_plans', 'strategic_planner_state', 'plan_templates',
    'swot_items', 'strategy_matrix', 'balanced_scorecards',
    'scorecard_objectives', 'scorecard_kpis', 'paps',
    'comments', 'plan_comments', 'causal_loops', 'systems_archetypes',
    'share_links', 'admins'
] LOOP
EXECUTE format(
    'DROP TRIGGER IF EXISTS trg_%1$s_updated_at ON %1$I;
     CREATE TRIGGER trg_%1$s_updated_at
     BEFORE UPDATE ON %1$I
     FOR EACH ROW EXECUTE FUNCTION set_updated_at()',
    tbl
);
END LOOP;
END $$;

-- ─── 4.2 SWOT resilience index calculation ─────────────────────────────────────
CREATE OR REPLACE FUNCTION calculate_swot_resilience()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
    IF NEW.category IN ('strength', 'opportunity') THEN
        NEW.resilience_index = ROUND(SQRT(NEW.impact * NEW.likelihood)::numeric, 2);
    ELSE
        NEW.resilience_index = ROUND((NEW.impact * NEW.likelihood)::numeric, 2);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_swot_resilience ON swot_items;
CREATE TRIGGER tr_swot_resilience BEFORE INSERT OR UPDATE ON swot_items
FOR EACH ROW EXECUTE FUNCTION calculate_swot_resilience();

-- ─── 4.3 Activity log trigger (SECURITY INVOKER) ───────────────────────────────
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
    action_type_val text;
    entity_type_val text;
    plan_id_val uuid;
    details_val jsonb;
BEGIN
    IF TG_TABLE_NAME = 'swot_items' THEN
        action_type_val := CASE WHEN TG_OP = 'INSERT' THEN 'swot_added' WHEN TG_OP = 'UPDATE' THEN 'swot_updated' ELSE 'swot_deleted' END;
        entity_type_val := 'swot';
        plan_id_val := NEW.plan_id;
        details_val := jsonb_build_object('id', NEW.id, 'title', NEW.title, 'category', NEW.category);
    ELSIF TG_TABLE_NAME = 'strategy_matrix' THEN
        action_type_val := CASE WHEN TG_OP = 'INSERT' THEN 'strategy_added' WHEN TG_OP = 'UPDATE' THEN 'strategy_updated' ELSE 'strategy_deleted' END;
        entity_type_val := 'strategy';
        plan_id_val := NEW.plan_id;
        details_val := jsonb_build_object('id', NEW.id, 'strategy', NEW.strategy, 'quadrant', NEW.quadrant);
    ELSIF TG_TABLE_NAME = 'scorecard_objectives' THEN
        action_type_val := CASE WHEN TG_OP = 'INSERT' THEN 'objective_added' WHEN TG_OP = 'UPDATE' THEN 'objective_updated' ELSE 'objective_deleted' END;
        entity_type_val := 'objective';
        plan_id_val := NEW.plan_id;
        details_val := jsonb_build_object('id', NEW.id, 'title', NEW.title);
    ELSIF TG_TABLE_NAME = 'scorecard_kpis' THEN
        action_type_val := CASE WHEN TG_OP = 'INSERT' THEN 'kpi_added' WHEN TG_OP = 'UPDATE' THEN 'kpi_updated' ELSE 'kpi_deleted' END;
        entity_type_val := 'kpi';
        plan_id_val := NEW.plan_id;
        details_val := jsonb_build_object('id', NEW.id, 'name', NEW.name, 'value', NEW.current_value);
    ELSIF TG_TABLE_NAME = 'paps' THEN
        action_type_val := CASE WHEN TG_OP = 'INSERT' THEN 'pap_added' WHEN TG_OP = 'UPDATE' THEN 'pap_updated' ELSE 'pap_deleted' END;
        entity_type_val := 'pap';
        plan_id_val := NEW.plan_id;
        details_val := jsonb_build_object('id', NEW.id, 'title', NEW.title, 'type', NEW.type);
    ELSE
        RETURN NULL;
    END IF;

    INSERT INTO activity_logs (plan_id, user_id, action_type, entity_type, entity_id, details, created_at)
    VALUES (plan_id_val, COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid), action_type_val, entity_type_val, NEW.id, details_val, now());
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_swot_activity ON swot_items;
CREATE TRIGGER tr_swot_activity AFTER INSERT OR UPDATE OR DELETE ON swot_items FOR EACH ROW EXECUTE FUNCTION log_activity();
DROP TRIGGER IF EXISTS tr_strategy_activity ON strategy_matrix;
CREATE TRIGGER tr_strategy_activity AFTER INSERT OR UPDATE OR DELETE ON strategy_matrix FOR EACH ROW EXECUTE FUNCTION log_activity();
DROP TRIGGER IF EXISTS tr_obj_activity ON scorecard_objectives;
CREATE TRIGGER tr_obj_activity AFTER INSERT OR UPDATE OR DELETE ON scorecard_objectives FOR EACH ROW EXECUTE FUNCTION log_activity();
DROP TRIGGER IF EXISTS tr_kpi_activity ON scorecard_kpis;
CREATE TRIGGER tr_kpi_activity AFTER INSERT OR UPDATE OR DELETE ON scorecard_kpis FOR EACH ROW EXECUTE FUNCTION log_activity();
DROP TRIGGER IF EXISTS tr_paps_activity ON paps;
CREATE TRIGGER tr_paps_activity AFTER INSERT OR UPDATE OR DELETE ON paps FOR EACH ROW EXECUTE FUNCTION log_activity();

-- ─── 4.4 Plan progress update function ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_plan_progress()
RETURNS TRIGGER
SET search_path = ''
AS $$
DECLARE
    total_kpis int;
    on_track_kpis int;
    avg_progress numeric;
BEGIN
    SELECT COUNT(*), COUNT(*) FILTER (WHERE status IN ('on_track', 'achieved'))
    INTO total_kpis, on_track_kpis
    FROM scorecard_kpis WHERE plan_id = NEW.plan_id;

    SELECT COALESCE(AVG(progress_pct), 0)
    INTO avg_progress
    FROM paps WHERE plan_id = NEW.plan_id;

    UPDATE strategic_plans SET
        progress_pct = LEAST(GREATEST(ROUND((COALESCE(on_track_kpis::numeric / NULLIF(total_kpis, 0), 0) * 50 + COALESCE(avg_progress, 0) * 0.5))::int, 0), 100),
        updated_at = now()
    WHERE id = NEW.plan_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_plan_progress_kpi ON scorecard_kpis;
CREATE TRIGGER tr_plan_progress_kpi AFTER INSERT OR UPDATE ON scorecard_kpis FOR EACH ROW EXECUTE FUNCTION update_plan_progress();
DROP TRIGGER IF EXISTS tr_plan_progress_paps ON paps;
CREATE TRIGGER tr_plan_progress_paps AFTER INSERT OR UPDATE ON paps FOR EACH ROW EXECUTE FUNCTION update_plan_progress();

-- ─── 4.5 Handle new user signups (SECURITY INVOKER) ────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
    INSERT INTO users (id, email, full_name, created_at)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), now());

    INSERT INTO user_profiles (
        id, email, full_name,
        notification_preferences,
        role, is_active, created_at, updated_at
    ) VALUES (
        NEW.id, NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        '{"welcome_email":true,"kpi_alerts":true,"weekly_digest":true,
          "stale_plan_reminders":true,"team_mentions":true,"product_updates":false}'::jsonb,
        'viewer', true, now(), now()
    )
    ON CONFLICT (id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_auth_users_insert ON auth.users;
CREATE TRIGGER tr_auth_users_insert AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ═══════════════════════════════════════════════════════════════════════════════
-- 5. STORAGE BUCKET SETUP
-- ═══════════════════════════════════════════════════════════════════════════════

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    ('bird-images',                        'bird-images',                        true,  5242880,   ARRAY['image/webp','image/png','image/jpeg','image/gif']),
    ('bird-files',                         'bird-files',                         false, 52428800,  ARRAY['application/pdf']),
    ('systems-archetypes',                 'systems-archetypes',                 true,  10485760,  ARRAY['image/png','image/jpeg','image/webp']),
    ('images-context-beie-framewoek',      'images-context-beie-framewoek',      true,  10485760,  ARRAY['image/png','image/jpeg']),
    ('images-strategic-options-roadmap',   'images-strategic-options-roadmap',   true,  10485760,  ARRAY['image/png','image/jpeg']),
    ('images-swot-systems-maps',           'images-swot-systems-maps',           true,  10485760,  ARRAY['image/png','image/jpeg']),
    ('pending-tasks',                      'pending-tasks',                      true,  10485760,  ARRAY['image/png','image/jpeg','image/webp'])
ON CONFLICT (id) DO UPDATE SET
    public             = EXCLUDED.public,
    file_size_limit    = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage object policies
DO $$
DECLARE pol text;
BEGIN
FOREACH pol IN ARRAY ARRAY[
    'public_read_bird_images','auth_upload_bird_images',
    'public_read_archetypes','auth_read_bird_files',
    'public_read_beie_images','public_read_pending_tasks'
] LOOP
EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol);
END LOOP;
END $$;

CREATE POLICY "public_read_bird_images"
    ON storage.objects FOR SELECT USING (bucket_id = 'bird-images');
CREATE POLICY "auth_upload_bird_images"
    ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'bird-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "public_read_archetypes"
    ON storage.objects FOR SELECT USING (bucket_id = 'systems-archetypes');
CREATE POLICY "auth_read_bird_files"
    ON storage.objects FOR SELECT USING (bucket_id = 'bird-files' AND auth.uid() IS NOT NULL);
CREATE POLICY "public_read_beie_images"
    ON storage.objects FOR SELECT USING (bucket_id IN (
        'images-context-beie-framewoek',
        'images-strategic-options-roadmap',
        'images-swot-systems-maps',
        'pending-tasks'
    ));

-- ═══════════════════════════════════════════════════════════════════════════════
-- 6. HELPER VIEWS
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── 6.1 Plan KPI Summary ──────────────────────────────────────────────────────
CREATE OR REPLACE VIEW plan_kpi_summary AS
SELECT
    p.id    AS plan_id,
    p.title AS plan_name,
    p.user_id,
    COUNT(k.id)                                              AS total_kpis,
    COUNT(k.id) FILTER (WHERE k.status = 'on_track')        AS on_track,
    COUNT(k.id) FILTER (WHERE k.status = 'at_risk')         AS at_risk,
    COUNT(k.id) FILTER (WHERE k.status = 'off_track')       AS off_track,
    COUNT(k.id) FILTER (WHERE k.status = 'achieved')        AS achieved,
    ROUND(AVG(
        CASE WHEN NULLIF(k.target_value, 0) IS NULL THEN NULL
        ELSE LEAST(100.0, (k.current_value / NULLIF(k.target_value, 0)) * 100)
        END
    ), 1)                                                    AS avg_progress_pct
FROM strategic_plans p
LEFT JOIN scorecard_objectives o ON o.plan_id = p.id
LEFT JOIN scorecard_kpis k ON k.objective_id = o.id
WHERE NOT COALESCE(p.is_archived, false)
GROUP BY p.id, p.title, p.user_id;

-- ─── 6.2 Plan PAP Budget ───────────────────────────────────────────────────────
CREATE OR REPLACE VIEW plan_pap_budget AS
SELECT
    plan_id,
    SUM(budget)   AS total_budget_php,
    SUM(budget_spent) AS total_spent_php,
    CASE WHEN SUM(budget) > 0
    THEN ROUND((SUM(budget_spent) / SUM(budget)) * 100, 1) ELSE 0
    END           AS utilization_pct,
    COUNT(*)      AS total_paps,
    COUNT(*) FILTER (WHERE status = 'in_progress')  AS in_progress,
    COUNT(*) FILTER (WHERE status = 'completed')    AS completed,
    COUNT(*) FILTER (WHERE status = 'delayed')      AS delayed,
    ROUND(AVG(progress_pct), 1) AS avg_progress_pct
FROM paps
GROUP BY plan_id;

-- ─── 6.3 AI Usage Summary (admin only) ─────────────────────────────────────────
CREATE OR REPLACE VIEW ai_usage_summary AS
SELECT
    DATE_TRUNC('day', created_at) AS day,
    action,
    COUNT(*)                       AS calls,
    SUM(tokens_used)               AS total_tokens,
    AVG(duration_ms)               AS avg_duration_ms,
    COUNT(*) FILTER (WHERE status = 'error') AS errors
FROM ai_interaction_logs
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC;

-- ═══════════════════════════════════════════════════════════════════════════════
-- 7. GRANTS
-- ═══════════════════════════════════════════════════════════════════════════════

GRANT SELECT ON plan_kpi_summary TO authenticated;
GRANT SELECT ON plan_pap_budget TO authenticated;
-- ai_usage_summary intentionally not granted to authenticated — admin only

-- ═══════════════════════════════════════════════════════════════════════════════
-- 8. SECURITY HARDENING (Privilege Revocations)
-- ═══════════════════════════════════════════════════════════════════════════════
-- Revoke execute permissions on internal/trigger functions from PUBLIC, anon,
-- and authenticated to prevent unauthorized direct RPC calls.

REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.calculate_swot_resilience() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_activity() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_plan_progress() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- ═══════════════════════════════════════════════════════════════════════════════
-- END OF SCHEMA
-- ═══════════════════════════════════════════════════════════════════════════════
