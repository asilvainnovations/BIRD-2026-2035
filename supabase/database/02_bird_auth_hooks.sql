-- BIRD 2026-2035 | Supabase Auth Hooks
-- Compatible with the BIRD v3.0.2 schema objects:
--   public.users(id, role, is_active)
--   public.user_profiles(id, role, is_active)
--
-- IMPORTANT:
--   Creating these functions does NOT activate the hooks.
--   Configure each hook in Supabase Dashboard > Authentication > Hooks.
--   Password Verification and MFA Verification hooks are plan-gated
--   (currently Teams / Enterprise according to Supabase documentation).
--
-- Configure URI values:
--   Password Verification: pg-functions://postgres/public/hook_password_verification_attempt
--   MFA Verification:      pg-functions://postgres/public/hook_mfa_verification_attempt
--   Custom Access Token:   pg-functions://postgres/public/bird_custom_access_token_hook
--
-- These are Postgres function hooks. Do not expose them as client RPC endpoints.

-- ---------------------------------------------------------------------------
-- 1. PASSWORD VERIFICATION: one failed attempt per user in any 10-second span
-- ---------------------------------------------------------------------------

create table if not exists public.password_failed_verification_attempts (
    user_id uuid primary key,
    last_failed_at timestamptz not null default now()
);

revoke all on table public.password_failed_verification_attempts
    from public, anon, authenticated;
grant select, insert, update, delete
    on table public.password_failed_verification_attempts
    to supabase_auth_admin;

create or replace function public.hook_password_verification_attempt(event jsonb)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
    v_user_id uuid;
    v_valid boolean;
    v_recorded_at timestamptz;
begin
    v_user_id := (event ->> 'user_id')::uuid;
    v_valid := coalesce((event ->> 'valid')::boolean, false);

    if v_user_id is null then
        return jsonb_build_object(
            'error', jsonb_build_object(
                'http_code', 400,
                'message', 'Missing user_id in password verification event.'
            )
        );
    end if;

    if v_valid then
        delete from public.password_failed_verification_attempts
        where user_id = v_user_id;

        return jsonb_build_object('decision', 'continue');
    end if;

    -- Atomic UPSERT: concurrent attempts cannot all pass the 10-second gate.
    insert into public.password_failed_verification_attempts as attempts
        (user_id, last_failed_at)
    values
        (v_user_id, pg_catalog.now())
    on conflict (user_id) do update
        set last_failed_at = excluded.last_failed_at
        where attempts.last_failed_at <=
              pg_catalog.now() - interval '10 seconds'
    returning last_failed_at into v_recorded_at;

    if not found then
        return jsonb_build_object(
            'error', jsonb_build_object(
                'http_code', 429,
                'message', 'Please wait 10 seconds before another password attempt.'
            )
        );
    end if;

    -- Let Supabase Auth return its normal invalid-password response.
    return jsonb_build_object('decision', 'continue');
end;
$$;

grant usage on schema public to supabase_auth_admin;
grant execute on function public.hook_password_verification_attempt(jsonb)
    to supabase_auth_admin;
revoke execute on function public.hook_password_verification_attempt(jsonb)
    from public, anon, authenticated;


-- ---------------------------------------------------------------------------
-- 2. MFA VERIFICATION: one failed attempt per user/factor in any 2-second span
-- ---------------------------------------------------------------------------

create table if not exists public.mfa_failed_verification_attempts (
    user_id uuid not null,
    factor_id uuid not null,
    last_failed_at timestamptz not null default now(),
    primary key (user_id, factor_id)
);

revoke all on table public.mfa_failed_verification_attempts
    from public, anon, authenticated;
grant select, insert, update, delete
    on table public.mfa_failed_verification_attempts
    to supabase_auth_admin;

create or replace function public.hook_mfa_verification_attempt(event jsonb)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
    v_user_id uuid;
    v_factor_id uuid;
    v_valid boolean;
    v_recorded_at timestamptz;
begin
    v_user_id := (event ->> 'user_id')::uuid;
    v_factor_id := (event ->> 'factor_id')::uuid;
    v_valid := coalesce((event ->> 'valid')::boolean, false);

    if v_user_id is null or v_factor_id is null then
        return jsonb_build_object(
            'error', jsonb_build_object(
                'http_code', 400,
                'message', 'Missing user_id or factor_id in MFA verification event.'
            )
        );
    end if;

    if v_valid then
        delete from public.mfa_failed_verification_attempts
        where user_id = v_user_id
          and factor_id = v_factor_id;

        return jsonb_build_object('decision', 'continue');
    end if;

    insert into public.mfa_failed_verification_attempts as attempts
        (user_id, factor_id, last_failed_at)
    values
        (v_user_id, v_factor_id, pg_catalog.now())
    on conflict (user_id, factor_id) do update
        set last_failed_at = excluded.last_failed_at
        where attempts.last_failed_at <=
              pg_catalog.now() - interval '2 seconds'
    returning last_failed_at into v_recorded_at;

    if not found then
        return jsonb_build_object(
            'error', jsonb_build_object(
                'http_code', 429,
                'message', 'Please wait 2 seconds before another MFA attempt.'
            )
        );
    end if;

    return jsonb_build_object('decision', 'continue');
end;
$$;

grant execute on function public.hook_mfa_verification_attempt(jsonb)
    to supabase_auth_admin;
revoke execute on function public.hook_mfa_verification_attempt(jsonb)
    from public, anon, authenticated;


-- ---------------------------------------------------------------------------
-- 3. CUSTOM ACCESS TOKEN: append trusted BIRD roles from database records
-- ---------------------------------------------------------------------------
-- Never use user-editable user_metadata for authorization.
-- Claims are sourced from public.users and public.user_profiles.
-- Tokens remain valid until expiry/refresh; changes to roles are not instantly
-- reflected in already-issued JWTs.

create or replace function public.bird_custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_user_id uuid;
    v_system_role text := 'user';
    v_workspace_role text := 'viewer';
    v_is_active boolean := true;
    v_claims jsonb;
    v_app_metadata jsonb;
begin
    v_user_id := (event ->> 'user_id')::uuid;

    if v_user_id is null then
        return jsonb_build_object(
            'error', jsonb_build_object(
                'http_code', 400,
                'message', 'Missing user_id in custom access token event.'
            )
        );
    end if;

    select u.role, u.is_active
      into v_system_role, v_is_active
      from public.users as u
     where u.id = v_user_id;

    if not found then
        v_system_role := 'user';
        v_is_active := true;
    end if;

    select p.role
      into v_workspace_role
      from public.user_profiles as p
     where p.id = v_user_id;

    if not found then
        v_workspace_role := 'viewer';
    end if;

    if v_is_active is false then
        return jsonb_build_object(
            'error', jsonb_build_object(
                'http_code', 403,
                'message', 'This BIRD account is inactive. Please contact an administrator.'
            )
        );
    end if;

    v_claims := coalesce(event -> 'claims', '{}'::jsonb);
    v_app_metadata := coalesce(v_claims -> 'app_metadata', '{}'::jsonb);

    if jsonb_typeof(v_app_metadata) <> 'object' then
        v_app_metadata := '{}'::jsonb;
    end if;

    v_app_metadata := v_app_metadata || jsonb_build_object(
        'bird_system_role', coalesce(v_system_role, 'user'),
        'bird_workspace_role', coalesce(v_workspace_role, 'viewer'),
        'bird_account_active', true
    );

    v_claims := jsonb_set(
        v_claims,
        '{app_metadata}',
        v_app_metadata,
        true
    );

    return jsonb_build_object('claims', v_claims);
end;
$$;

grant usage on schema public to supabase_auth_admin;
grant execute on function public.bird_custom_access_token_hook(jsonb)
    to supabase_auth_admin;
revoke execute on function public.bird_custom_access_token_hook(jsonb)
    from public, anon, authenticated;


-- ---------------------------------------------------------------------------
-- 4. GENERAL AUTH HOOK STARTER (NOT CONNECTED TO AN AUTH EVENT)
-- ---------------------------------------------------------------------------
-- Auth hooks have different input/output contracts. This is only a neutral
-- starter. Do not configure it until its logic and the selected hook contract
-- have been deliberately implemented.

create or replace function public.bird_general_auth_hook(event jsonb)
returns jsonb
language plpgsql
set search_path = ''
as $$
begin
    -- Add hook-specific validation or transformation here.
    -- This no-op response is NOT a substitute for a specific hook contract.
    return '{}'::jsonb;
end;
$$;

grant execute on function public.bird_general_auth_hook(jsonb)
    to supabase_auth_admin;
revoke execute on function public.bird_general_auth_hook(jsonb)
    from public, anon, authenticated;
