-- BIRD database hotfix: legacy admins table compatibility
-- Run this if you have already applied the earlier v3.0.1 schema and the
-- execution stopped at ERROR 42703: column "user_id" does not exist.
-- This intentionally uses the existing admins.email column and does not
-- require adding user_id or role columns.

CREATE OR REPLACE FUNCTION public.bird_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1
          FROM public.users u
         WHERE u.id = auth.uid()
           AND u.role IN ('admin', 'super_admin')
           AND u.is_active = true
    )
    OR EXISTS (
        SELECT 1
          FROM public.admins a
         WHERE lower(a.email) = lower(auth.jwt() ->> 'email')
    );
$$;

REVOKE ALL ON FUNCTION public.bird_is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.bird_is_admin() TO authenticated, service_role;

-- Verify the function compiles and returns a boolean for the current session.
SELECT public.bird_is_admin() AS current_user_is_admin;
