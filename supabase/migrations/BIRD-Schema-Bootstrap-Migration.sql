-- ═══════════════════════════════════════════════════════════════════════════════
-- BIRD 2026–2035 · Bootstrap & Migrate Script
-- FIXES: "relation does not exist" errors by creating missing tables first.
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── STEP 1: Create any missing tables ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS user_profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    full_name text,
    avatar_url text,
    organization text,
    job_title text,
    phone text,
    notification_preferences jsonb DEFAULT '{"welcome_email":true,"kpi_alerts":true,"weekly_digest":true,"stale_plan_reminders":true,"team_mentions":true,"product_updates":false}'::jsonb,
    role text NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
    is_active boolean NOT NULL DEFAULT true,
    last_seen_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    ai_config jsonb DEFAULT '{"model":"gpt-4o","verbose":false,"temperature":0.65,"auto_suggest":true,"max_tokens":1600}'::jsonb,
    ui_config jsonb DEFAULT '{"theme":"dark","sidebar_collapsed":false}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE (user_id)
);

CREATE TABLE IF NOT EXISTS strategic_plans (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id uuid,
    created_by uuid,
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
    template_id uuid,
    is_archived boolean NOT NULL DEFAULT false,
    archived_at timestamptz,
    is_public boolean NOT NULL DEFAULT false,
    public_access text NOT NULL DEFAULT 'none',
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

CREATE TABLE IF NOT EXISTS swot_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    category text NOT NULL CHECK (category IN ('strength', 'weakness', 'opportunity', 'threat')),
    title text NOT NULL,
    description text,
    impact int DEFAULT 3 CHECK (impact BETWEEN 1 AND 5),
    likelihood int DEFAULT 3 CHECK (likelihood BETWEEN 1 AND 5),
    resilience_index numeric(4,2) DEFAULT 0,
    priority text DEFAULT 'medium',
    ai_generated boolean DEFAULT false,
    ai_recommendation text,
    leverage_point text,
    beie_cluster text,
    created_by uuid,
    created_by_name text,
    modified_by uuid,
    modified_by_name text,
    modified_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS scorecard_objectives (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    scorecard_id uuid,
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
    leverage_point text,
    beie_cluster text,
    bird_phase text,
    bsc_code text,
    champion uuid,
    champion_name text,
    status text DEFAULT 'active',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

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
    frequency text DEFAULT 'monthly',
    formula text,
    data_source text,
    status text DEFAULT 'on_track',
    ai_suggested boolean DEFAULT false,
    alert_threshold numeric(5,2) DEFAULT 80,
    target_2030 numeric(15,2),
    target_2035 numeric(15,2),
    leverage_point text,
    benchmark_source text,
    owner_id uuid,
    owner_name text,
    assigned_to uuid,
    target_year int DEFAULT 2026,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS strategy_matrix (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    quadrant text NOT NULL CHECK (quadrant IN ('SO', 'ST', 'WO', 'WT')),
    strategy text NOT NULL,
    title text,
    description text,
    priority text DEFAULT 'medium',
    priority_score int,
    feasibility_score int,
    status text DEFAULT 'pending',
    ai_generated boolean DEFAULT false,
    linked_swot_items uuid[] DEFAULT '{}',
    leverage_point text,
    leverage_level int,
    beie_cluster text,
    bird_phase text,
    swot_pairs text,
    resource_requirement text,
    selected boolean DEFAULT false,
    assigned_to uuid,
    approved_by uuid,
    approved_at timestamptz,
    due_date date,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS paps (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id uuid NOT NULL REFERENCES strategic_plans(id) ON DELETE CASCADE,
    type text NOT NULL CHECK (type IN ('program', 'activity', 'project')),
    code text,
    title text NOT NULL,
    name text,
    description text,
    strategic_intent text,
    objective_id uuid,
    priority text DEFAULT 'medium',
    priority_score int,
    status text DEFAULT 'planned',
    progress numeric(5,2) DEFAULT 0,
    budget numeric(15,2) DEFAULT 0,
    budget_allocated numeric(15,2) DEFAULT 0,
    budget_spent numeric(15,2) DEFAULT 0,
    progress_pct int DEFAULT 0,
    start_date date,
    end_date date,
    duration_months int,
    due_quarter text DEFAULT 'Q1',
    beie_cluster text,
    bird_phase text,
    leverage_point text,
    lead_agency text,
    support_agencies text[] DEFAULT '{}',
    sdg_alignment text,
    dependencies uuid[] DEFAULT '{}',
    ai_generated boolean DEFAULT false,
    owner_id uuid,
    owner_email text,
    owner_name text,
    assigned_to uuid,
    created_by uuid,
    created_by_name text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

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
    status text NOT NULL DEFAULT 'success',
    error_msg text,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- ─── STEP 2: Apply ALTER TABLE commands (safe even if columns already exist) ──

ALTER TABLE strategic_plans
ADD COLUMN IF NOT EXISTS is_archived boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS archived_at timestamptz,
ADD COLUMN IF NOT EXISTS data jsonb,
ADD COLUMN IF NOT EXISTS swot_items jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS strategic_options jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS objectives jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS paps jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS cld_nodes jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS cld_links jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS public_access text NOT NULL DEFAULT 'none',
ADD COLUMN IF NOT EXISTS version integer NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS created_by uuid,
ADD COLUMN IF NOT EXISTS organization_id uuid;

ALTER TABLE strategic_plans
DROP CONSTRAINT IF EXISTS strategic_plans_public_access_check;
ALTER TABLE strategic_plans
ADD CONSTRAINT strategic_plans_public_access_check
CHECK (public_access IN ('none','view','comment'));

ALTER TABLE swot_items
ADD COLUMN IF NOT EXISTS leverage_point text,
ADD COLUMN IF NOT EXISTS beie_cluster text,
ADD COLUMN IF NOT EXISTS created_by uuid,
ADD COLUMN IF NOT EXISTS created_by_name text,
ADD COLUMN IF NOT EXISTS modified_by uuid,
ADD COLUMN IF NOT EXISTS modified_by_name text,
ADD COLUMN IF NOT EXISTS modified_at timestamptz,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE swot_items
DROP CONSTRAINT IF EXISTS swot_items_leverage_point_check,
DROP CONSTRAINT IF EXISTS swot_items_beie_cluster_check;
ALTER TABLE swot_items
ADD CONSTRAINT swot_items_leverage_point_check
CHECK (leverage_point IS NULL OR leverage_point IN ('LP1','LP2','LP3','LP4','LP5')),
ADD CONSTRAINT swot_items_beie_cluster_check
CHECK (beie_cluster IS NULL OR beie_cluster IN ('foundations','transformers','enablers','connectors','financiers','cross-cutting'));

ALTER TABLE scorecard_objectives
ADD COLUMN IF NOT EXISTS leverage_point text,
ADD COLUMN IF NOT EXISTS beie_cluster text,
ADD COLUMN IF NOT EXISTS bird_phase text,
ADD COLUMN IF NOT EXISTS bsc_code text,
ADD COLUMN IF NOT EXISTS champion uuid,
ADD COLUMN IF NOT EXISTS champion_name text,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE scorecard_objectives
DROP CONSTRAINT IF EXISTS scorecard_objectives_leverage_point_check,
DROP CONSTRAINT IF EXISTS scorecard_objectives_bird_phase_check;
ALTER TABLE scorecard_objectives
ADD CONSTRAINT scorecard_objectives_leverage_point_check
CHECK (leverage_point IS NULL OR leverage_point IN ('LP1','LP2','LP3','LP4','LP5')),
ADD CONSTRAINT scorecard_objectives_bird_phase_check
CHECK (bird_phase IS NULL OR bird_phase IN ('1','2','3'));

ALTER TABLE scorecard_kpis
ADD COLUMN IF NOT EXISTS target_2030 numeric,
ADD COLUMN IF NOT EXISTS leverage_point text,
ADD COLUMN IF NOT EXISTS benchmark_source text,
ADD COLUMN IF NOT EXISTS owner_id uuid,
ADD COLUMN IF NOT EXISTS owner_name text,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE scorecard_kpis
DROP CONSTRAINT IF EXISTS scorecard_kpis_leverage_point_check;
ALTER TABLE scorecard_kpis
ADD CONSTRAINT scorecard_kpis_leverage_point_check
CHECK (leverage_point IS NULL OR leverage_point IN ('LP1','LP2','LP3','LP4','LP5'));

ALTER TABLE strategy_matrix
ADD COLUMN IF NOT EXISTS leverage_point text,
ADD COLUMN IF NOT EXISTS leverage_level integer,
ADD COLUMN IF NOT EXISTS beie_cluster text,
ADD COLUMN IF NOT EXISTS bird_phase text,
ADD COLUMN IF NOT EXISTS swot_pairs text,
ADD COLUMN IF NOT EXISTS resource_requirement text,
ADD COLUMN IF NOT EXISTS approved_by uuid,
ADD COLUMN IF NOT EXISTS approved_at timestamptz,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE strategy_matrix
DROP CONSTRAINT IF EXISTS strategy_matrix_leverage_point_check,
DROP CONSTRAINT IF EXISTS strategy_matrix_leverage_level_check,
DROP CONSTRAINT IF EXISTS strategy_matrix_resource_check,
DROP CONSTRAINT IF EXISTS strategy_matrix_bird_phase_check;
ALTER TABLE strategy_matrix
ADD CONSTRAINT strategy_matrix_leverage_point_check
CHECK (leverage_point IS NULL OR leverage_point IN ('LP1','LP2','LP3','LP4','LP5')),
ADD CONSTRAINT strategy_matrix_leverage_level_check
CHECK (leverage_level IS NULL OR leverage_level BETWEEN 1 AND 12),
ADD CONSTRAINT strategy_matrix_resource_check
CHECK (resource_requirement IS NULL OR resource_requirement IN ('low','medium','high')),
ADD CONSTRAINT strategy_matrix_bird_phase_check
CHECK (bird_phase IS NULL OR bird_phase IN ('1','2','3'));

ALTER TABLE paps
ADD COLUMN IF NOT EXISTS beie_cluster text,
ADD COLUMN IF NOT EXISTS bird_phase text,
ADD COLUMN IF NOT EXISTS leverage_point text,
ADD COLUMN IF NOT EXISTS lead_agency text,
ADD COLUMN IF NOT EXISTS support_agencies text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS sdg_alignment text,
ADD COLUMN IF NOT EXISTS owner_id uuid,
ADD COLUMN IF NOT EXISTS owner_email text,
ADD COLUMN IF NOT EXISTS owner_name text,
ADD COLUMN IF NOT EXISTS created_by uuid,
ADD COLUMN IF NOT EXISTS created_by_name text;

ALTER TABLE paps
DROP CONSTRAINT IF EXISTS paps_beie_cluster_check,
DROP CONSTRAINT IF EXISTS paps_bird_phase_check,
DROP CONSTRAINT IF EXISTS paps_leverage_point_check;
ALTER TABLE paps
ADD CONSTRAINT paps_beie_cluster_check
CHECK (beie_cluster IS NULL OR beie_cluster IN ('foundations','transformers','enablers','connectors','financiers','cross-cutting')),
ADD CONSTRAINT paps_bird_phase_check
CHECK (bird_phase IS NULL OR bird_phase IN ('1','2','3')),
ADD CONSTRAINT paps_leverage_point_check
CHECK (leverage_point IS NULL OR leverage_point IN ('LP1','LP2','LP3','LP4','LP5'));

ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS notification_preferences jsonb DEFAULT '{"welcome_email":true,"kpi_alerts":true,"weekly_digest":true,"stale_plan_reminders":true,"team_mentions":true,"product_updates":false}'::jsonb,
ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'viewer',
ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS last_seen_at timestamptz;

ALTER TABLE user_profiles
DROP CONSTRAINT IF EXISTS user_profiles_role_check;
ALTER TABLE user_profiles
ADD CONSTRAINT user_profiles_role_check
CHECK (role IN ('owner','admin','editor','viewer'));

ALTER TABLE user_settings
ALTER COLUMN ai_config SET DEFAULT '{"model":"gpt-4o","verbose":false,"temperature":0.65,"auto_suggest":true,"max_tokens":1600}'::jsonb;

UPDATE user_settings
SET ai_config = jsonb_set(ai_config, '{model}', '"gpt-4o"')
WHERE ai_config->>'model' IN ('google/gemini-3-flash','gemini-3-flash','gemini-pro');

-- ─── STEP 3: Create handle_new_user trigger ───────────────────────────────────

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
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
$$;

-- ═══════════════════════════════════════════════════════════════════════════════
