/*
# Create visit_logs table (single-tenant, no auth)

1. New Tables
- `visit_logs`
- `id` (uuid, primary key)
- `path` (text, not null) — the page path visited
- `user_agent` (text, nullable) — browser user agent
- `referrer` (text, nullable) — referrer header
- `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `visit_logs`.
- Allow anon + authenticated CRUD because the data is intentionally shared/public (no sign-in screen).
*/

CREATE TABLE IF NOT EXISTS visit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  user_agent text,
  referrer text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE visit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_visit_logs" ON visit_logs;
CREATE POLICY "anon_select_visit_logs" ON visit_logs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_visit_logs" ON visit_logs;
CREATE POLICY "anon_insert_visit_logs" ON visit_logs FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_visit_logs" ON visit_logs;
CREATE POLICY "anon_update_visit_logs" ON visit_logs FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_visit_logs" ON visit_logs;
CREATE POLICY "anon_delete_visit_logs" ON visit_logs FOR DELETE
  TO anon, authenticated USING (true);
