-- BIRD 2026-2035 | PostgreSQL / Supabase diagnostics
-- Read-only reports. Run each SELECT independently in Supabase SQL Editor.
-- Some catalog/statistics reports require elevated database privileges.
-- Query text may contain sensitive literals: restrict access to report output.

-- ---------------------------------------------------------------------------
-- 1. PostgreSQL VERSION
-- ---------------------------------------------------------------------------
select version() as postgres_version;


-- ---------------------------------------------------------------------------
-- 2. INSTALLED EXTENSIONS AND SCHEMAS
-- ---------------------------------------------------------------------------
select
    e.extname as extension_name,
    e.extversion as installed_version,
    n.nspname as schema_name
from pg_catalog.pg_extension as e
join pg_catalog.pg_namespace as n on n.oid = e.extnamespace
order by e.extname;


-- ---------------------------------------------------------------------------
-- 3. ACTIVE AND MAXIMUM CONNECTIONS
-- ---------------------------------------------------------------------------
select
    (select count(*) from pg_catalog.pg_stat_activity where state = 'active')
        as active_connections,
    (select setting::integer
       from pg_catalog.pg_settings
      where name = 'max_connections')
        as max_connections;


-- ---------------------------------------------------------------------------
-- 4. MOST FREQUENTLY INVOKED QUERIES
-- Requires pg_stat_statements.
-- ---------------------------------------------------------------------------
select
    calls,
    rows,
    round(total_exec_time::numeric, 2) as total_exec_time_ms,
    round(mean_exec_time::numeric, 2) as mean_exec_time_ms,
    round(max_exec_time::numeric, 2) as max_exec_time_ms,
    query
from pg_stat_statements
order by calls desc
limit 50;


-- ---------------------------------------------------------------------------
-- 5. MOST TIME-CONSUMING QUERIES (cumulative execution time)
-- ---------------------------------------------------------------------------
select
    calls,
    round(total_exec_time::numeric, 2) as total_exec_time_ms,
    round(
        100.0 * total_exec_time / nullif(sum(total_exec_time) over (), 0),
        2
    ) as share_of_total_pct,
    round(mean_exec_time::numeric, 2) as mean_exec_time_ms,
    query
from pg_stat_statements
order by total_exec_time desc
limit 50;


-- ---------------------------------------------------------------------------
-- 6. SLOWEST QUERIES (highest maximum execution time)
-- ---------------------------------------------------------------------------
select
    calls,
    round(max_exec_time::numeric, 2) as max_exec_time_ms,
    round(mean_exec_time::numeric, 2) as mean_exec_time_ms,
    round(total_exec_time::numeric, 2) as total_exec_time_ms,
    query
from pg_stat_statements
where calls > 0
order by max_exec_time desc
limit 50;


-- ---------------------------------------------------------------------------
-- 7. CACHE / INDEX HIT RATE
-- ---------------------------------------------------------------------------
select
    'index hit rate' as metric,
    round(
        100.0 * sum(idx_blks_hit) /
        nullif(sum(idx_blks_hit + idx_blks_read), 0),
        2
    ) as hit_rate_pct
from pg_statio_user_indexes
union all
select
    'table hit rate' as metric,
    round(
        100.0 * sum(heap_blks_hit) /
        nullif(sum(heap_blks_hit + heap_blks_read), 0),
        2
    ) as hit_rate_pct
from pg_statio_user_tables;


-- ---------------------------------------------------------------------------
-- 8. REPLICATION SLOTS AND REPLICATION CLIENTS
-- ---------------------------------------------------------------------------
select
    slot_name,
    slot_type,
    plugin,
    database,
    active,
    restart_lsn,
    confirmed_flush_lsn,
    wal_status,
    safe_wal_size
from pg_replication_slots
order by slot_name;

select
    application_name,
    state,
    sync_state,
    write_lag,
    flush_lag,
    replay_lag,
    sent_lsn,
    write_lsn,
    flush_lsn,
    replay_lsn
from pg_stat_replication
order by application_name;


-- ---------------------------------------------------------------------------
-- 9. LARGEST TABLES AND INDEXES
-- ---------------------------------------------------------------------------
select
    schemaname,
    relname as table_name,
    pg_size_pretty(pg_total_relation_size(
        pg_catalog.format('%I.%I', schemaname, relname)::regclass
    )) as total_size,
    pg_size_pretty(pg_relation_size(
        pg_catalog.format('%I.%I', schemaname, relname)::regclass
    )) as table_size,
    pg_size_pretty(pg_indexes_size(
        pg_catalog.format('%I.%I', schemaname, relname)::regclass
    )) as indexes_size
from pg_stat_user_tables
order by pg_total_relation_size(
    pg_catalog.format('%I.%I', schemaname, relname)::regclass
) desc
limit 50;

select
    schemaname,
    relname as table_name,
    indexrelname as index_name,
    pg_size_pretty(pg_relation_size(indexrelid)) as index_size
from pg_stat_user_indexes
order by pg_relation_size(indexrelid) desc
limit 50;


-- ---------------------------------------------------------------------------
-- 10. LARGE OBJECTS (PostgreSQL large-object metadata)
-- ---------------------------------------------------------------------------
select
    oid as large_object_oid,
    pg_catalog.pg_get_userbyid(lomowner) as owner_name
from pg_catalog.pg_largeobject_metadata
order by oid;


-- ---------------------------------------------------------------------------
-- 11. OPTIONAL EXTENSION ENABLEMENT
-- ---------------------------------------------------------------------------
-- Supabase projects commonly have pg_stat_statements enabled already.
-- Check report #2 first. If absent and permitted by your project:
-- create extension if not exists pg_stat_statements with schema extensions;
--
-- Do not run DROP EXTENSION as a diagnostic step.
