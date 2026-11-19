# BIRD Database Schema v3.0.1 — corrected draft

This package contains the revised full SQL schema based on the uploaded `Complete Database Schema v3.0.0`.

## Important deployment warning
This SQL has been statically reviewed and corrected, but has **not** been executed against the live Supabase project. Do not run it against production until it has been tested on a Supabase staging project or database clone, with a backup and rollback plan.

## Main corrections
- Corrected BIRD SWOT resilience-index calculation for Strengths and Opportunities.
- Fixed trigger functions that used an empty `search_path` but referenced unqualified public tables.
- Changed privileged signup/activity/progress triggers to tightly scoped `SECURITY DEFINER` functions with fixed empty search paths and schema-qualified references.
- Fixed DELETE handling in activity logging and plan progress recalculation.
- Prevented recursive RLS policies on users, admins, and organization membership.
- Added centralized plan/organization authorization helpers.
- Tightened share-link token visibility to owners/admins.
- Tightened comment write access, share permissions, user/profile role updates, and AI audit-log insertion.
- Made analytics views use caller RLS (`security_invoker`).
- Added integrity constraints and supporting indexes as `NOT VALID` constraints for safer legacy-data rollout.

## Deployment sequence
1. Create a staging Supabase project using the same PostgreSQL major version/extensions as production.
2. Back up the existing database and storage policies.
3. Apply the SQL in staging using the Supabase SQL Editor or `psql`.
4. Run the verification checklist in `VALIDATION_CHECKLIST.md`.
5. Inspect and reconcile any legacy data that violates the new `NOT VALID` constraints.
6. Only then schedule a production migration window.

## Compatibility note
The views use PostgreSQL 15's `security_invoker` view option, which is supported by current Supabase PostgreSQL releases. Confirm the target database version before applying.
