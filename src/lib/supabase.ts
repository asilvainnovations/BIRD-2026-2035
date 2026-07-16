// ─────────────────────────────────────────────────────────────────────────────
// BIRD 2026–2035 · Supabase Client & Edge Function Service Layer
// Primary Supabase project: lydsisparsmvextskevw.supabase.co
// Edge functions hosted on: lydsisparsmvextskevw.supabase.co
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js';

// ── Primary Supabase project (auth + data) ────────────────────────────────────
// Values sourced from VITE_ env vars; hard-coded fallbacks for runtime resilience
const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  'https://lydsisparsmvextskevw.supabase.co';

const supabaseKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5ZHNpc3BhcnNtdmV4dHNrZXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NzIxNzEsImV4cCI6MjA5NzU0ODE3MX0.VM8BPXPLw7wGYCcUvwlTGeP4qB-M02Nq3x';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// ── Edge Function Endpoints ───────────────────────────────────────────────────
// NOTE: Edge functions are deployed on a separate Supabase project.
//       Use direct fetch() for these endpoints rather than supabase.functions.invoke()
//       when calling from the primary project's client.
const EDGE_BASE = 'https://lydsisparsmvextskevw.supabase.co/functions/v1';

export const EDGE_FUNCTIONS = {
  AI_STRATEGY_ASSISTANT: `${EDGE_BASE}/ai-strategy-assistant`,
  STRATEGIC_PLANNER_SYNC: `${EDGE_BASE}/strategic-planner-sync`,
  EMAIL_NOTIFICATIONS:    `${EDGE_BASE}/email-notifications`,
  CRM_DISPATCHER:         `${EDGE_BASE}/crm-dispatcher`,
} as const;

// ── Branding Assets (CDN) ─────────────────────────────────────────────────────
export const BRAND_ASSETS = {
  LOGO_URL: import.meta.env.VITE_BRAND_LOGO_URL || 'https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/MTIT%20Logo.png',
  AI_AVATAR_URL: import.meta.env.VITE_AI_STRATEGIST_AVATAR_URL || 'https://appimize.app/assets/apps/user_1097/images/2c7d825bf937_232_1097.png',
  BANNER_URL: import.meta.env.VITE_BANNER_INVESTMENT_URL || 'https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/1.Banner.png',
} as const;

// ── External URLs ──────────────────────────────────────────────────────────────
export const EXTERNAL_URLS = {
  PWA:          import.meta.env.VITE_PWA_EXTERNAL_URL      || 'https://bangsamoro-investment-roadmap.asilvainnovations.com',
  USER_MANUAL:  import.meta.env.VITE_USER_MANUAL_URL       || 'https://bird-user-manual.asilvainnovations.com',
  DEV_DOCS:     import.meta.env.VITE_DEVELOPER_DOCS_URL    || 'https://asilvainnovations.github.io/strat-planner-pwa/developer-doc.html',
} as const;

// ── Typed Headers Helper ──────────────────────────────────────────────────────
export const getAuthHeaders = (token: string): HeadersInit => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
});

// ── EDGE FUNCTION SERVICE CALLS ───────────────────────────────────────────────

/** GET: Fetch the user's full strategic planner state from the sync edge function */
export async function fetchPlannerState(token: string): Promise<any | null> {
  try {
    const res = await fetch(EDGE_FUNCTIONS.STRATEGIC_PLANNER_SYNC, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    if (!res.ok) {
      if (res.status === 404) return { plans: [], currentPlanId: null };
      throw new Error(`Sync fetch failed: ${res.statusText}`);
    }
    return res.json();
  } catch (err) {
    console.error('[supabase] fetchPlannerState error:', err);
    return null;
  }
}

/** POST: Save the full planner state (plans array + currentPlanId) */
export async function saveFullState(
  plans: any[],
  currentPlanId: string | null,
  token: string,
): Promise<boolean> {
  try {
    const res = await fetch(EDGE_FUNCTIONS.STRATEGIC_PLANNER_SYNC, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ plans, currentPlanId }),
    });
    if (!res.ok) throw new Error(`Sync save failed: ${res.statusText}`);
    return true;
  } catch (err) {
    console.error('[supabase] saveFullState error:', err);
    return false;
  }
}

/** POST: Save a single plan (incremental update) */
export async function saveSinglePlan(plan: any, token: string): Promise<boolean> {
  try {
    const res = await fetch(EDGE_FUNCTIONS.STRATEGIC_PLANNER_SYNC, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ plan }),
    });
    if (!res.ok) throw new Error(`Plan save failed: ${res.statusText}`);
    return true;
  } catch (err) {
    console.error('[supabase] saveSinglePlan error:', err);
    return false;
  }
}

/** DELETE: Soft-delete (archive) a plan */
export async function archivePlan(planId: string, token: string): Promise<boolean> {
  try {
    const res = await fetch(`${EDGE_FUNCTIONS.STRATEGIC_PLANNER_SYNC}?plan_id=${planId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
    if (!res.ok) throw new Error(`Archive failed: ${res.statusText}`);
    return true;
  } catch (err) {
    console.error('[supabase] archivePlan error:', err);
    return false;
  }
}

/** POST: Send welcome or notification email */
export async function triggerEmailNotification(
  type: 'welcome' | 'share' | 'kpi_alert' | 'weekly_digest',
  userId: string,
  metadata?: Record<string, unknown>,
): Promise<boolean> {
  try {
    const res = await fetch(EDGE_FUNCTIONS.EMAIL_NOTIFICATIONS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, user_id: userId, ...metadata }),
    });
    return res.ok;
  } catch (err) {
    console.error('[supabase] triggerEmailNotification error:', err);
    return false;
  }
}
