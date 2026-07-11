-- ============================================================
-- SECURITY FIX: Function search_path and SECURITY DEFINER issues
-- ============================================================

-- Fix 1: Set immutable search_path on all functions
-- ============================================================

ALTER FUNCTION public.update_updated_at()
  SET search_path = '';

ALTER FUNCTION public.calculate_swot_resilience()
  SET search_path = '';

ALTER FUNCTION public.log_activity()
  SET search_path = '';

ALTER FUNCTION public.update_plan_progress()
  SET search_path = '';

ALTER FUNCTION public.handle_new_user()
  SET search_path = '';

-- Fix 2: Revoke EXECUTE on SECURITY DEFINER functions from public/anon/authenticated
-- ============================================================

-- Revoke public access (covers anon and authenticated via inheritance)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_activity() FROM PUBLIC;

-- Explicitly revoke from anon and authenticated roles
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.log_activity() FROM anon;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.log_activity() FROM authenticated;

-- Fix 3: Convert SECURITY DEFINER functions to SECURITY INVOKER where appropriate
-- ============================================================

-- handle_new_user is a trigger function - it should use SECURITY INVOKER
-- so it runs with the caller's privileges, not the definer's.
ALTER FUNCTION public.handle_new_user() SECURITY INVOKER;

-- log_activity is also a trigger function and should use SECURITY INVOKER
ALTER FUNCTION public.log_activity() SECURITY INVOKER;

-- Verify the remaining functions don't have the same issues
-- These functions should NOT be callable via RPC by external roles:
-- update_updated_at, calculate_swot_resilience, update_plan_progress

-- Ensure they are also not exposed to anon/authenticated
REVOKE EXECUTE ON FUNCTION public.update_updated_at() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.calculate_swot_resilience() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_plan_progress() FROM PUBLIC;

REVOKE EXECUTE ON FUNCTION public.update_updated_at() FROM anon;
REVOKE EXECUTE ON FUNCTION public.calculate_swot_resilience() FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_plan_progress() FROM anon;

REVOKE EXECUTE ON FUNCTION public.update_updated_at() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.calculate_swot_resilience() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.update_plan_progress() FROM authenticated;se
