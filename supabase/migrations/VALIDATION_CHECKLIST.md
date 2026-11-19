# BIRD database schema v3.0.1 — validation checklist

## SQL and migration
- [ ] Apply to a disposable/staging Supabase project first.
- [ ] Confirm all CREATE/ALTER statements complete without error.
- [ ] Confirm all trigger functions compile and trigger execution succeeds.
- [ ] Test signup: new `auth.users` row creates both `public.users` and `public.user_profiles`.
- [ ] Test SWOT insert/update for all four categories and verify resilience_index.
- [ ] Test KPI/PAP INSERT, UPDATE and DELETE; verify plan progress is recalculated.

## RLS / authorization (use separate authenticated test accounts)
- [ ] Owner can read/write/delete own plan and plan entities.
- [ ] Viewer can read but cannot write plan entities.
- [ ] Editor can read/write but cannot delete plan entities.
- [ ] Admin share can read/write/delete.
- [ ] Unaccepted share grants no access.
- [ ] Organization member access is limited to the intended organization.
- [ ] Public plan with `public_access='none'` is not exposed.
- [ ] Public plan with `public_access='view'` can be read but not modified.
- [ ] Comment-level share can comment but cannot edit strategic entities.
- [ ] A non-owner cannot enumerate share-link bearer tokens.
- [ ] Anonymous user cannot insert AI audit rows or visit-log rows.
- [ ] CRM tables are inaccessible to anon/authenticated and accessible to service_role.

## Views / storage
- [ ] `plan_kpi_summary` and `plan_pap_budget` obey caller RLS.
- [ ] `ai_usage_summary` is granted only to intended administrative/service roles.
- [ ] Validate each storage bucket's public/private access and upload/update/delete policies.
- [ ] Verify storage object paths used by the deployed frontend match bucket IDs.

## Important follow-up
The current schema contains both `activity_logs` and `activity_log`, both `comments` and `plan_comments`, and both `users` and `user_profiles`. These parallel legacy structures were preserved to avoid breaking application code. Confirm which tables are still used before planning a later consolidation migration.
