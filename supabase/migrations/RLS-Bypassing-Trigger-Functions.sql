-- Convert trigger functions to SECURITY DEFINER to bypass RLS

-- 2a. handle_new_user
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
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

-- 2b. set_updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 2c. log_activity
CREATE OR REPLACE FUNCTION log_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  row record;
  action_type_val text;
  entity_type_val text;
  plan_id_val uuid;
  details_val jsonb;
  caller_uid uuid;
BEGIN
  IF TG_OP = 'DELETE' THEN
    row := OLD;
  ELSE
    row := NEW;
  END IF;

  caller_uid := auth.uid();
  IF caller_uid IS NULL THEN
    NULL;
  END IF;

  IF TG_TABLE_NAME = 'swot_items' THEN
    action_type_val := CASE TG_OP WHEN 'INSERT' THEN 'swot_added'
                                  WHEN 'UPDATE' THEN 'swot_updated'
                                  ELSE 'swot_deleted' END;
    entity_type_val := 'swot';
    plan_id_val := row.plan_id;
    details_val := jsonb_build_object('id', row.id, 'title', row.title, 'category', row.category);
  ELSIF TG_TABLE_NAME = 'strategy_matrix' THEN
    action_type_val := CASE TG_OP WHEN 'INSERT' THEN 'strategy_added'
                                  WHEN 'UPDATE' THEN 'strategy_updated'
                                  ELSE 'strategy_deleted' END;
    entity_type_val := 'strategy';
    plan_id_val := row.plan_id;
    details_val := jsonb_build_object('id', row.id, 'strategy', row.strategy, 'quadrant', row.quadrant);
  ELSIF TG_TABLE_NAME = 'scorecard_objectives' THEN
    action_type_val := CASE TG_OP WHEN 'INSERT' THEN 'objective_added'
                                  WHEN 'UPDATE' THEN 'objective_updated'
                                  ELSE 'objective_deleted' END;
    entity_type_val := 'objective';
    plan_id_val := row.plan_id;
    details_val := jsonb_build_object('id', row.id, 'title', row.title);
  ELSIF TG_TABLE_NAME = 'scorecard_kpis' THEN
    action_type_val := CASE TG_OP WHEN 'INSERT' THEN 'kpi_added'
                                  WHEN 'UPDATE' THEN 'kpi_updated'
                                  ELSE 'kpi_deleted' END;
    entity_type_val := 'kpi';
    plan_id_val := row.plan_id;
    details_val := jsonb_build_object('id', row.id, 'name', row.name, 'value', row.current_value);
  ELSIF TG_TABLE_NAME = 'paps' THEN
    action_type_val := CASE TG_OP WHEN 'INSERT' THEN 'pap_added'
                                  WHEN 'UPDATE' THEN 'pap_updated'
                                  ELSE 'pap_deleted' END;
    entity_type_val := 'pap';
    plan_id_val := row.plan_id;
    details_val := jsonb_build_object('id', row.id, 'title', row.title, 'type', row.type);
  ELSE
    RETURN NULL;
  END IF;

  INSERT INTO activity_logs (plan_id, user_id, action_type, entity_type, entity_id, details, created_at)
  VALUES (plan_id_val, caller_uid, action_type_val, entity_type_val, row.id, details_val, now());

  RETURN NULL;
END;
$$;

-- 2d. update_plan_progress
CREATE OR REPLACE FUNCTION update_plan_progress()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  total_kpis int;
  on_track_kpis int;
  avg_progress numeric;
  target_plan_id uuid;
BEGIN
  IF TG_OP = 'DELETE' THEN
    target_plan_id := OLD.plan_id;
  ELSE
    target_plan_id := NEW.plan_id;
  END IF;

  IF target_plan_id IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT COUNT(*), COUNT(*) FILTER (WHERE status IN ('on_track', 'achieved'))
  INTO total_kpis, on_track_kpis
  FROM scorecard_kpis
  WHERE plan_id = target_plan_id;

  SELECT COALESCE(AVG(progress_pct), 0)
  INTO avg_progress
  FROM paps
  WHERE plan_id = target_plan_id;

  UPDATE strategic_plans
  SET progress_pct = LEAST(
        GREATEST(
          ROUND((
            COALESCE(on_track_kpis::numeric / NULLIF(total_kpis, 0), 0) * 50
            + COALESCE(avg_progress, 0) * 0.5
          )::int, 0),
        100),
      0),
      updated_at = now()
  WHERE id = target_plan_id;

  RETURN NULL;
END;
$$;
