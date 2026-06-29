-- ═══════════════════════════════════════════════════════════════════════════════
-- BIRD 2026–2035 · Complete Database Migration v2.1.0
-- Project: lydsisparsmvextskevw.supabase.co (primary data project)
-- Run via: supabase db push  OR  paste in Supabase SQL Editor
--
-- FIXES IN THIS MIGRATION:
--   1.  strategic_plans  — add is_archived, archived_at, data, swot_items,
--                          strategic_options, objectives, paps, cld_nodes, cld_links,
--                          is_public, public_access, version, created_by, organization_id
--   2.  swot_items       — add leverage_point, beie_cluster, audit columns
--   3.  bsc_objectives   — FIX constraint 'customer'→'stakeholder', add BIRD columns
--   4.  kpis             — add target_2030, leverage_point, benchmark_source
--   5.  strategic_options— add leverage_point, beie_cluster, bird_phase, swot_pairs
--   6.  paps             — add beie_cluster, bird_phase, leverage_point, agency cols
--   7.  user_profiles    — add notification_preferences, role, is_active, last_seen_at
--   8.  user_settings    — fix default AI model (Gemini→GPT-4o)
--   9.  CREATE strategic_planner_state (was missing — caused silent sync failures)
--   10. CREATE ai_interaction_logs (was missing — edge function log calls failed)
--   11. FIX all RLS policies (deprecated current_setting→auth.uid(), add missing policies)
--   12. FIX CRM policies (open USING(true) → service_role only)
--   13. Storage bucket configurations
--   14. Performance indexes
--   15. Utility views, triggers, grants
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── 0. Extensions ─────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ─── 1. strategic_plans — add missing columns ──────────────────────────────────
ALTER TABLE strategic_plans
  ADD COLUMN IF NOT EXISTS is_archived       boolean     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS archived_at       timestamptz,
  ADD COLUMN IF NOT EXISTS data              jsonb,
  ADD COLUMN IF NOT EXISTS swot_items        jsonb       DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS strategic_options jsonb       DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS objectives        jsonb       DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS paps              jsonb       DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS cld_nodes         jsonb       DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS cld_links         jsonb       DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS is_public         boolean     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS public_access     text        NOT NULL DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS version           integer     NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS created_by        uuid,
  ADD COLUMN IF NOT EXISTS organization_id   uuid;

ALTER TABLE strategic_plans
  DROP CONSTRAINT IF EXISTS strategic_plans_public_access_check;
ALTER TABLE strategic_plans
  ADD CONSTRAINT strategic_plans_public_access_check
    CHECK (public_access IN ('none','view','comment'));

UPDATE strategic_plans SET created_by = user_id WHERE created_by IS NULL;

-- ─── 2. swot_items — BIRD-specific columns ─────────────────────────────────────
ALTER TABLE swot_items
  ADD COLUMN IF NOT EXISTS leverage_point    text,
  ADD COLUMN IF NOT EXISTS beie_cluster      text,
  ADD COLUMN IF NOT EXISTS created_by        uuid,
  ADD COLUMN IF NOT EXISTS created_by_name   text,
  ADD COLUMN IF NOT EXISTS modified_by       uuid,
  ADD COLUMN IF NOT EXISTS modified_by_name  text,
  ADD COLUMN IF NOT EXISTS modified_at       timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at        timestamptz DEFAULT now();

ALTER TABLE swot_items
  DROP CONSTRAINT IF EXISTS swot_items_leverage_point_check,
  DROP CONSTRAINT IF EXISTS swot_items_beie_cluster_check;
ALTER TABLE swot_items
  ADD CONSTRAINT swot_items_leverage_point_check
    CHECK (leverage_point IS NULL OR leverage_point IN ('LP1','LP2','LP3','LP4','LP5')),
  ADD CONSTRAINT swot_items_beie_cluster_check
    CHECK (beie_cluster IS NULL OR beie_cluster IN ('foundations','transformers','enablers','connectors','financiers','cross-cutting'));

-- ─── 3. bsc_objectives — FIX 'customer'→'stakeholder' + add columns ───────────
ALTER TABLE bsc_objectives
  DROP CONSTRAINT IF EXISTS bsc_objectives_perspective_check;

UPDATE bsc_objectives SET perspective = 'stakeholder' WHERE perspective = 'customer';

ALTER TABLE bsc_objectives
  ADD CONSTRAINT bsc_objectives_perspective_check
    CHECK (perspective IN ('financial','stakeholder','internal_process','learning_growth'));

ALTER TABLE bsc_objectives
  ADD COLUMN IF NOT EXISTS leverage_point    text,
  ADD COLUMN IF NOT EXISTS beie_cluster      text,
  ADD COLUMN IF NOT EXISTS bird_phase        text,
  ADD COLUMN IF NOT EXISTS bsc_code          text,
  ADD COLUMN IF NOT EXISTS champion          uuid,
  ADD COLUMN IF NOT EXISTS champion_name     text,
  ADD COLUMN IF NOT EXISTS updated_at        timestamptz DEFAULT now();

ALTER TABLE bsc_objectives
  DROP CONSTRAINT IF EXISTS bsc_objectives_leverage_point_check,
  DROP CONSTRAINT IF EXISTS bsc_objectives_bird_phase_check;
ALTER TABLE bsc_objectives
  ADD CONSTRAINT bsc_objectives_leverage_point_check
    CHECK (leverage_point IS NULL OR leverage_point IN ('LP1','LP2','LP3','LP4','LP5')),
  ADD CONSTRAINT bsc_objectives_bird_phase_check
    CHECK (bird_phase IS NULL OR bird_phase IN ('1','2','3'));

-- ─── 4. kpis — add BIRD columns ────────────────────────────────────────────────
ALTER TABLE kpis
  ADD COLUMN IF NOT EXISTS target_2030       numeric,
  ADD COLUMN IF NOT EXISTS leverage_point    text,
  ADD COLUMN IF NOT EXISTS benchmark_source  text,
  ADD COLUMN IF NOT EXISTS owner_id          uuid,
  ADD COLUMN IF NOT EXISTS owner_name        text,
  ADD COLUMN IF NOT EXISTS updated_at        timestamptz DEFAULT now();

ALTER TABLE kpis
  DROP CONSTRAINT IF EXISTS kpis_leverage_point_check;
ALTER TABLE kpis
  ADD CONSTRAINT kpis_leverage_point_check
    CHECK (leverage_point IS NULL OR leverage_point IN ('LP1','LP2','LP3','LP4','LP5'));

-- ─── 5. strategic_options — add BIRD columns ───────────────────────────────────
ALTER TABLE strategic_options
  ADD COLUMN IF NOT EXISTS leverage_point        text,
  ADD COLUMN IF NOT EXISTS leverage_level        integer,
  ADD COLUMN IF NOT EXISTS beie_cluster          text,
  ADD COLUMN IF NOT EXISTS bird_phase            text,
  ADD COLUMN IF NOT EXISTS swot_pairs            text,
  ADD COLUMN IF NOT EXISTS resource_requirement  text,
  ADD COLUMN IF NOT EXISTS approved_by           uuid,
  ADD COLUMN IF NOT EXISTS approved_at           timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at            timestamptz DEFAULT now();

ALTER TABLE strategic_options
  DROP CONSTRAINT IF EXISTS so_leverage_point_check,
  DROP CONSTRAINT IF EXISTS so_leverage_level_check,
  DROP CONSTRAINT IF EXISTS so_resource_check,
  DROP CONSTRAINT IF EXISTS so_bird_phase_check;
ALTER TABLE strategic_options
  ADD CONSTRAINT so_leverage_point_check
    CHECK (leverage_point IS NULL OR leverage_point IN ('LP1','LP2','LP3','LP4','LP5')),
  ADD CONSTRAINT so_leverage_level_check
    CHECK (leverage_level IS NULL OR leverage_level BETWEEN 1 AND 12),
  ADD CONSTRAINT so_resource_check
    CHECK (resource_requirement IS NULL OR resource_requirement IN ('low','medium','high')),
  ADD CONSTRAINT so_bird_phase_check
    CHECK (bird_phase IS NULL OR bird_phase IN ('1','2','3'));

-- ─── 6. paps — add BIRD columns ────────────────────────────────────────────────
ALTER TABLE paps
  ADD COLUMN IF NOT EXISTS beie_cluster          text,
  ADD COLUMN IF NOT EXISTS bird_phase            text,
  ADD COLUMN IF NOT EXISTS leverage_point        text,
  ADD COLUMN IF NOT EXISTS lead_agency           text,
  ADD COLUMN IF NOT EXISTS support_agencies      text[]      DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS sdg_alignment         text,
  ADD COLUMN IF NOT EXISTS owner_id              uuid,
  ADD COLUMN IF NOT EXISTS owner_email           text,
  ADD COLUMN IF NOT EXISTS owner_name            text,
  ADD COLUMN IF NOT EXISTS created_by            uuid,
  ADD COLUMN IF NOT EXISTS created_by_name       text;

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

-- ─── 7. user_profiles — add missing columns ────────────────────────────────────
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS notification_preferences jsonb DEFAULT '{
    "welcome_email": true,
    "kpi_alerts": true,
    "weekly_digest": true,
    "stale_plan_reminders": true,
    "team_mentions": true,
    "product_updates": false
  }'::jsonb,
  ADD COLUMN IF NOT EXISTS role         text NOT NULL DEFAULT 'viewer',
  ADD COLUMN IF NOT EXISTS is_active    boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS last_seen_at timestamptz;

ALTER TABLE user_profiles
  DROP CONSTRAINT IF EXISTS user_profiles_role_check;
ALTER TABLE user_profiles
  ADD CONSTRAINT user_profiles_role_check
    CHECK (role IN ('owner','admin','editor','viewer'));

-- ─── 8. user_settings — fix AI model default ───────────────────────────────────
UPDATE user_settings
SET ai_config = jsonb_set(ai_config, '{model}', '"gpt-4o"')
WHERE ai_config->>'model' IN ('google/gemini-3-flash','gemini-3-flash','gemini-pro');

ALTER TABLE user_settings
  ALTER COLUMN ai_config SET DEFAULT '{
    "model": "gpt-4o",
    "verbose": false,
    "temperature": 0.65,
    "auto_suggest": true,
    "max_tokens": 1600
  }'::jsonb;

-- ─── 9. handle_new_user trigger — updated ──────────────────────────────────────
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

-- ─── 10. CREATE strategic_planner_state ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS strategic_planner_state (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  state      jsonb       NOT NULL DEFAULT '{}'::jsonb,
  checksum   text,
  version    integer     NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);
COMMENT ON TABLE strategic_planner_state IS
  'Per-user full planner state snapshot (all plans + currentPlanId). '
  'Primary target for strategic-planner-sync edge function.';

-- ─── 11. CREATE ai_interaction_logs ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_interaction_logs (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id     uuid        REFERENCES strategic_plans(id) ON DELETE SET NULL,
  user_id     uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  action      text        NOT NULL,
  active_view text,
  input_data  jsonb,
  output_data jsonb,
  model       text        DEFAULT 'gpt-4o',
  tokens_used integer,
  duration_ms integer,
  status      text        NOT NULL DEFAULT 'success',
  error_msg   text,
  created_at  timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE ai_interaction_logs
  DROP CONSTRAINT IF EXISTS ai_logs_status_check;
ALTER TABLE ai_interaction_logs
  ADD CONSTRAINT ai_logs_status_check
    CHECK (status IN ('success','error','timeout'));
COMMENT ON TABLE ai_interaction_logs IS
  'Audit trail of all BIRD AI assistant interactions for MEL and compliance reporting.';

-- ─── 12. updated_at auto-trigger ───────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DO $$
DECLARE tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'strategic_plans','swot_items','bsc_objectives','kpis',
    'paps','strategic_options','user_profiles','user_settings',
    'strategic_planner_state'
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

-- ─── 13. PERFORMANCE INDEXES ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_strategic_plans_user_id    ON strategic_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_strategic_plans_archived    ON strategic_plans(is_archived) WHERE NOT is_archived;
CREATE INDEX IF NOT EXISTS idx_strategic_plans_updated     ON strategic_plans(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_swot_items_plan_id          ON swot_items(plan_id);
CREATE INDEX IF NOT EXISTS idx_swot_items_category         ON swot_items(category);
CREATE INDEX IF NOT EXISTS idx_bsc_objectives_plan_id      ON bsc_objectives(plan_id);
CREATE INDEX IF NOT EXISTS idx_bsc_objectives_perspective  ON bsc_objectives(perspective);
CREATE INDEX IF NOT EXISTS idx_kpis_objective_id           ON kpis(objective_id);
CREATE INDEX IF NOT EXISTS idx_paps_plan_id                ON paps(plan_id);
CREATE INDEX IF NOT EXISTS idx_paps_status                 ON paps(status);
CREATE INDEX IF NOT EXISTS idx_mel_logs_plan_id            ON mel_logs(plan_id);
CREATE INDEX IF NOT EXISTS idx_mel_logs_created            ON mel_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sps_user_id                 ON strategic_planner_state(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_user_id             ON ai_interaction_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_plan_id             ON ai_interaction_logs(plan_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_created             ON ai_interaction_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visit_logs_user_id          ON visit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_visit_logs_created          ON visit_logs(created_at DESC);

-- GIN for JSONB fast-containment queries
CREATE INDEX IF NOT EXISTS idx_sps_state_gin               ON strategic_planner_state USING gin(state);
CREATE INDEX IF NOT EXISTS idx_plans_data_gin               ON strategic_plans USING gin(data);

-- ─── 14. FIX RLS POLICIES ──────────────────────────────────────────────────────
-- Enable RLS on tables missing it
ALTER TABLE strategic_planner_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interaction_logs     ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log            ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_links             ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_comments           ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_logs              ENABLE ROW LEVEL SECURITY;
ALTER TABLE mel_logs                ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members    ENABLE ROW LEVEL SECURITY;

-- strategic_plans: replace deprecated current_setting() with auth.uid()
DROP POLICY IF EXISTS "Users can view their own plans"    ON strategic_plans;
DROP POLICY IF EXISTS "Users can insert their own plans"  ON strategic_plans;
DROP POLICY IF EXISTS "Users can update their own plans"  ON strategic_plans;
DROP POLICY IF EXISTS "Users can delete their own plans"  ON strategic_plans;
DROP POLICY IF EXISTS "sp_select" ON strategic_plans;
DROP POLICY IF EXISTS "sp_insert" ON strategic_plans;
DROP POLICY IF EXISTS "sp_update" ON strategic_plans;
DROP POLICY IF EXISTS "sp_delete" ON strategic_plans;

CREATE POLICY "sp_select" ON strategic_plans FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "sp_insert" ON strategic_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sp_update" ON strategic_plans FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sp_delete" ON strategic_plans FOR DELETE
  USING (auth.uid() = user_id);

-- user_profiles: replace deprecated pattern
DROP POLICY IF EXISTS "Users can view their own profile"   ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "up_select" ON user_profiles;
DROP POLICY IF EXISTS "up_insert" ON user_profiles;
DROP POLICY IF EXISTS "up_update" ON user_profiles;

CREATE POLICY "up_select" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "up_insert" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "up_update" ON user_profiles FOR UPDATE
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- plan_templates: replace deprecated pattern
DROP POLICY IF EXISTS "Users can read own templates"   ON plan_templates;
DROP POLICY IF EXISTS "Users can insert own templates" ON plan_templates;
DROP POLICY IF EXISTS "Users can update own templates" ON plan_templates;
DROP POLICY IF EXISTS "Users can delete own templates" ON plan_templates;
DROP POLICY IF EXISTS "Anyone can read builtin templates" ON plan_templates;

CREATE POLICY "pt_public"  ON plan_templates FOR SELECT
  USING (category = 'builtin' OR is_public = true);
CREATE POLICY "pt_own"     ON plan_templates FOR SELECT
  USING (auth.uid() = created_by);
CREATE POLICY "pt_insert"  ON plan_templates FOR INSERT
  WITH CHECK (auth.uid() = created_by);
CREATE POLICY "pt_update"  ON plan_templates FOR UPDATE
  USING (auth.uid() = created_by);
CREATE POLICY "pt_delete"  ON plan_templates FOR DELETE
  USING (auth.uid() = created_by);

-- strategic_planner_state
DROP POLICY IF EXISTS "sps_select" ON strategic_planner_state;
DROP POLICY IF EXISTS "sps_insert" ON strategic_planner_state;
DROP POLICY IF EXISTS "sps_update" ON strategic_planner_state;
DROP POLICY IF EXISTS "sps_delete" ON strategic_planner_state;

CREATE POLICY "sps_select" ON strategic_planner_state FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "sps_insert" ON strategic_planner_state FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sps_update" ON strategic_planner_state FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sps_delete" ON strategic_planner_state FOR DELETE USING (auth.uid() = user_id);

-- ai_interaction_logs
CREATE POLICY "ail_select" ON ai_interaction_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ail_insert" ON ai_interaction_logs FOR INSERT
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- admins: only existing admins can read; service role can write
CREATE POLICY "admins_select" ON admins FOR SELECT
  USING (
    auth.jwt()->>'email' IN (SELECT email FROM admins)
    OR auth.role() = 'service_role'
  );

-- activity_log
CREATE POLICY "al_select" ON activity_log FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_id AND sp.user_id = auth.uid())
  );
CREATE POLICY "al_insert" ON activity_log FOR INSERT WITH CHECK (auth.uid() = user_id);

-- share_links
CREATE POLICY "sl_select" ON share_links FOR SELECT
  USING (revoked = false OR auth.uid() = owner_id);
CREATE POLICY "sl_insert" ON share_links FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "sl_update" ON share_links FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "sl_delete" ON share_links FOR DELETE USING (auth.uid() = owner_id);

-- plan_comments
CREATE POLICY "pc_select" ON plan_comments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM strategic_plans sp
    WHERE sp.id = plan_id AND (sp.user_id = auth.uid() OR sp.is_public = true)
  ));
CREATE POLICY "pc_insert" ON plan_comments FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "pc_update" ON plan_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "pc_delete" ON plan_comments FOR DELETE USING (auth.uid() = user_id);

-- visit_logs: insert-only from anyone, read own
CREATE POLICY "vl_select" ON visit_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "vl_insert" ON visit_logs FOR INSERT WITH CHECK (true);

-- mel_logs: plan owner only
CREATE POLICY "ml_select" ON mel_logs FOR SELECT
  USING (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_id AND sp.user_id = auth.uid()));
CREATE POLICY "ml_insert" ON mel_logs FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM strategic_plans sp WHERE sp.id = plan_id AND sp.user_id = auth.uid()));

-- organization_members
CREATE POLICY "om_select" ON organization_members FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM organization_members om2
      WHERE om2.organization_id = organization_id AND om2.user_id = auth.uid())
  );

-- CRM tables: restrict to service_role (edge functions only)
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

-- ─── 15. STORAGE BUCKET SETUP ──────────────────────────────────────────────────
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
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'bird-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "public_read_archetypes"
  ON storage.objects FOR SELECT USING (bucket_id = 'systems-archetypes');
CREATE POLICY "auth_read_bird_files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'bird-files' AND auth.uid() IS NOT NULL);
CREATE POLICY "public_read_beie_images"
  ON storage.objects FOR SELECT
  USING (bucket_id IN (
    'images-context-beie-framewoek',
    'images-strategic-options-roadmap',
    'images-swot-systems-maps',
    'pending-tasks'
  ));

-- ─── 16. HELPER VIEWS ──────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW plan_kpi_summary AS
SELECT
  p.id    AS plan_id,
  p.name  AS plan_name,
  p.user_id,
  COUNT(k.id)                                              AS total_kpis,
  COUNT(k.id) FILTER (WHERE k.status = 'on-track')        AS on_track,
  COUNT(k.id) FILTER (WHERE k.status = 'at-risk')         AS at_risk,
  COUNT(k.id) FILTER (WHERE k.status = 'delayed')         AS delayed,
  COUNT(k.id) FILTER (WHERE k.status = 'completed')       AS completed,
  ROUND(AVG(
    CASE WHEN NULLIF(k.target_value,0) IS NULL THEN NULL
    ELSE LEAST(100.0,(k.current_value/NULLIF(k.target_value,0))*100)
    END
  ),1)                                                     AS avg_progress_pct
FROM strategic_plans p
LEFT JOIN bsc_objectives o ON o.plan_id = p.id
LEFT JOIN kpis k ON k.objective_id = o.id
WHERE NOT COALESCE(p.is_archived,false)
GROUP BY p.id, p.name, p.user_id;

CREATE OR REPLACE VIEW plan_pap_budget AS
SELECT
  plan_id,
  SUM(budget)   AS total_budget_php,
  SUM(spent)    AS total_spent_php,
  CASE WHEN SUM(budget)>0
    THEN ROUND((SUM(spent)/SUM(budget))*100,1) ELSE 0
  END           AS utilization_pct,
  COUNT(*)      AS total_paps,
  COUNT(*) FILTER (WHERE status='in-progress')  AS in_progress,
  COUNT(*) FILTER (WHERE status='completed')    AS completed,
  COUNT(*) FILTER (WHERE status='delayed')      AS delayed,
  ROUND(AVG(progress),1) AS avg_progress_pct
FROM paps
GROUP BY plan_id;

-- AI usage analytics view (admin)
CREATE OR REPLACE VIEW ai_usage_summary AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  action,
  COUNT(*)                       AS calls,
  SUM(tokens_used)               AS total_tokens,
  AVG(duration_ms)               AS avg_duration_ms,
  COUNT(*) FILTER (WHERE status='error') AS errors
FROM ai_interaction_logs
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC;

-- ─── 17. GRANTS ────────────────────────────────────────────────────────────────
GRANT SELECT ON plan_kpi_summary  TO authenticated;
GRANT SELECT ON plan_pap_budget   TO authenticated;
-- ai_usage_summary intentionally not granted to authenticated — admin only
