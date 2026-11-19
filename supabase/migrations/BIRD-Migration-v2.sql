-- ═══════════════════════════════════════════════════════════════════════════════
-- BIRD 2026–2035 · Migration Script v3.0.0
-- FIXES: Adds missing columns to existing tables
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── 1. ADD MISSING COLUMNS TO EXISTING TABLES ───────────────────────────────

-- strategic_plans: Add is_public and related columns
ALTER TABLE strategic_plans
ADD COLUMN IF NOT EXISTS is_archived boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS archived_at timestamptz,
ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS public_access text NOT NULL DEFAULT 'none',
ADD COLUMN IF NOT EXISTS data jsonb,
ADD COLUMN IF NOT EXISTS swot_items jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS strategic_options jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS objectives jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS paps jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS cld_nodes jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS cld_links jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS version integer NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS created_by uuid,
ADD COLUMN IF NOT EXISTS organization_id uuid;

-- Add CHECK constraint for public_access
ALTER TABLE strategic_plans
DROP CONSTRAINT IF EXISTS strategic_plans_public_access_check;
ALTER TABLE strategic_plans
ADD CONSTRAINT strategic_plans_public_access_check
CHECK (public_access IN ('none', 'view', 'comment'));

-- Backfill created_by for existing rows
UPDATE strategic_plans SET created_by = user_id WHERE created_by IS NULL;

-- ─── 2. ADD MISSING COLUMNS TO OTHER TABLES ──────────────────────────────────

-- swot_items: Add BIRD-specific columns
ALTER TABLE swot_items
ADD COLUMN IF NOT EXISTS leverage_point text,
ADD COLUMN IF NOT EXISTS beie_cluster text,
ADD COLUMN IF NOT EXISTS created_by uuid,
ADD COLUMN IF NOT EXISTS created_by_name text,
ADD COLUMN IF NOT EXISTS modified_by uuid,
ADD COLUMN IF NOT EXISTS modified_by_name text,
ADD COLUMN IF NOT EXISTS modified_at timestamptz,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Add CHECK constraints
ALTER TABLE swot_items
DROP CONSTRAINT IF EXISTS swot_items_leverage_point_check,
DROP CONSTRAINT IF EXISTS swot_items_beie_cluster_check;
ALTER TABLE swot_items
ADD CONSTRAINT swot_items_leverage_point_check
CHECK (leverage_point IS NULL OR leverage_point IN ('LP1', 'LP2', 'LP3', 'LP4', 'LP5')),
ADD CONSTRAINT swot_items_beie_cluster_check
CHECK (beie_cluster IS NULL OR beie_cluster IN ('foundations', 'transformers', 'enablers', 'connectors', 'financiers', 'cross-cutting'));

-- strategy_matrix: Add BIRD columns
ALTER TABLE strategy_matrix
ADD COLUMN IF NOT EXISTS leverage_point text,
ADD COLUMN IF NOT EXISTS leverage_level integer,
ADD COLUMN IF NOT EXISTS beie_cluster text,
ADD COLUMN IF NOT EXISTS bird_phase text,
ADD COLUMN IF NOT EXISTS swot_pairs text,
ADD COLUMN IF NOT EXISTS resource_requirement text,
ADD COLUMN IF NOT EXISTS selected boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS approved_by uuid,
ADD COLUMN IF NOT EXISTS approved_at timestamptz,
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE strategy_matrix
DROP CONSTRAINT IF EXISTS strategy_matrix_leverage_point_check,
DROP CONSTRAINT IF EXISTS strategy_matrix_leverage_level_check,
DROP CONSTRAINT IF EXISTS strategy_matrix_resource_check,
DROP CONSTRAINT IF EXISTS strategy_matrix_bird_phase_check;
ALTER TABLE strategy_matrix
ADD CONSTRAINT strategy_matrix_leverage_point_check
CHECK (leverage_point IS NULL OR leverage_point IN ('LP1', 'LP2', 'LP3', 'LP4', 'LP5')),
ADD CONSTRAINT strategy_matrix_leverage_level_check
CHECK (leverage_level IS NULL OR leverage_level BETWEEN 1 AND 12),
ADD CONSTRAINT strategy_matrix_resource_check
CHECK (resource_requirement IS NULL OR resource_requirement IN ('low', 'medium', 'high')),
ADD CONSTRAINT strategy_matrix_bird_phase_check
CHECK (bird_phase IS NULL OR bird_phase IN ('1', '2', '3'));

-- scorecard_objectives: Add BIRD columns
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
CHECK (leverage_point IS NULL OR leverage_point IN ('LP1', 'LP2', 'LP3', 'LP4', 'LP5')),
ADD CONSTRAINT scorecard_objectives_bird_phase_check
CHECK (bird_phase IS NULL OR bird_phase IN ('1', '2', '3'));

-- scorecard_kpis: Add BIRD columns
ALTER TABLE scorecard_kpis
ADD COLUMN IF NOT EXISTS target_2030 numeric(15,2),
ADD COLUMN IF NOT EXISTS target_2035 numeric(15,2),
ADD COLUMN IF NOT EXISTS leverage_point text,
ADD COLUMN IF NOT EXISTS benchmark_source text,
ADD COLUMN IF NOT EXISTS owner_id uuid,
ADD COLUMN IF NOT EXISTS owner_name text,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE scorecard_kpis
DROP CONSTRAINT IF EXISTS scorecard_kpis_leverage_point_check;
ALTER TABLE scorecard_kpis
ADD CONSTRAINT scorecard_kpis_leverage_point_check
CHECK (leverage_point IS NULL OR leverage_point IN ('LP1', 'LP2', 'LP3', 'LP4', 'LP5'));

-- paps: Add BIRD columns
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
CHECK (beie_cluster IS NULL OR beie_cluster IN ('foundations', 'transformers', 'enablers', 'connectors', 'financiers', 'cross-cutting')),
ADD CONSTRAINT paps_bird_phase_check
CHECK (bird_phase IS NULL OR bird_phase IN ('1', '2', '3')),
ADD CONSTRAINT paps_leverage_point_check
CHECK (leverage_point IS NULL OR leverage_point IN ('LP1', 'LP2', 'LP3', 'LP4', 'LP5'));

-- user_profiles: Add missing columns
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS notification_preferences jsonb DEFAULT '{
    "welcome_email": true,
    "kpi_alerts": true,
    "weekly_digest": true,
    "stale_plan_reminders": true,
    "team_mentions": true,
    "product_updates": false
}'::jsonb,
ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'viewer',
ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS last_seen_at timestamptz;

ALTER TABLE user_profiles
DROP CONSTRAINT IF EXISTS user_profiles_role_check;
ALTER TABLE user_profiles
ADD CONSTRAINT user_profiles_role_check
CHECK (role IN ('owner', 'admin', 'editor', 'viewer'));

-- user_settings: Fix AI model default
UPDATE user_settings
SET ai_config = jsonb_set(ai_config, '{model}', '"gpt-4o"')
WHERE ai_config->>'model' IN ('google/gemini-3-flash', 'gemini-3-flash', 'gemini-pro');

ALTER TABLE user_settings
ALTER COLUMN ai_config SET DEFAULT '{
    "model": "gpt-4o",
    "verbose": false,
    "temperature": 0.65,
    "auto_suggest": true,
    "max_tokens": 1600
}'::jsonb;

-- ─── 3. CREATE MISSING TABLES ────────────────────────────────────────────────

-- strategic_planner_state (if not exists)
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

-- ai_interaction_logs (if not exists)
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

-- ─── 4. VERIFICATION ─────────────────────────────────────────────────────────

-- Verify is_public column exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'strategic_plans'
          AND column_name = 'is_public'
    ) THEN
        RAISE EXCEPTION 'FATAL: is_public column still missing after migration';
    END IF;
    
    RAISE NOTICE '✓ Migration completed successfully - is_public column exists';
END $$;
