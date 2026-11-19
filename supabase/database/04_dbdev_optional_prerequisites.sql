-- BIRD 2026-2035 | Optional dbdev / Trusted Language Extensions prerequisites
--
-- dbdev (database.dev) is a package manager for PostgreSQL extensions; it is
-- not a normal SQL extension shipped with the BIRD schema. Its installation
-- uses pg_tle and pgsql-http and may be restricted by the Supabase project,
-- database role, or platform policy.
--
-- Run ONLY in a disposable/staging project after reviewing the current
-- Supabase guide. This file installs prerequisites only; it does not fetch
-- or install a third-party package and does not embed any registry API key.

create extension if not exists http with schema extensions;
create extension if not exists pg_tle;

-- Next step (manual, only after confirming platform support): install the
-- `supabase-dbdev` package from https://database.dev using the current
-- official Supabase instructions, then create its extension and use dbdev.
-- Do not paste a service-role key into this process.
-- Do not run third-party extension SQL on the BIRD production database
-- without a staging test and security review.

-- Verify prerequisite availability:
select extname, extversion
from pg_catalog.pg_extension
where extname in ('http', 'pg_tle', 'supabase-dbdev')
order by extname;
