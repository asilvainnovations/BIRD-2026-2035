/**
 * ============================================================================
 * BIRD 2026-2035 — Route Registry
 * Bangsamoro Investment Roadmap Development Platform
 * ============================================================================
 *
 * This module defines the complete route registry for the BIRD platform,
 * mapping URL paths to HTML view files and attaching rich metadata for
 * SEO, navigation, analytics, and access control.
 *
 * All 25 public-facing pages are organized into six functional categories:
 *   core, survey, legal, strategic, provincial, supporting
 *
 * Usage:
 *   const {
 *     ROUTE_REGISTRY,
 *     getRouteByPath,
 *     getRoutesByCategory,
 *     getNavigationRoutes,
 *     getPublicRoutes,
 *     ROUTE_CATEGORIES,
 *     SEO_DEFAULTS
 *   } = require('./src/pages/route.js');
 *
 * @module  src/pages/route
 * @author  MTIT-BARMM
 * @license MIT
 * @since   2025
 * ============================================================================
 */

'use strict';

/* ───────────────────────────────────────────────────────────────────────────
 *  SEO Defaults — shared across all pages unless overridden per-route
 * ─────────────────────────────────────────────────────────────────────────── */

/**
 * Default SEO metadata applied to every page when specific overrides
 * are not provided.
 *
 * @constant {Object}
 * @property {string} siteName        — Platform display name
 * @property {string} titleTemplate   — %s placeholder replaced by page title
 * @property {string} twitterHandle   — Official BARMM Twitter/X handle
 * @property {string} ogImage         — Default Open-Graph / social-share image
 */
const SEO_DEFAULTS = Object.freeze({
  siteName:        'BIRD 2026-2035 | The Emerging Bangsamoro',
  titleTemplate:   '%s | BIRD 2026-2035',
  twitterHandle:   '@MTIT_BARMM',
  ogImage:         'https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/og-default.png',
});

/* ───────────────────────────────────────────────────────────────────────────
 *  Route Categories — human-readable labels for grouping and UI display
 * ─────────────────────────────────────────────────────────────────────────── */

/**
 * Mapping of category keys to their human-readable display labels.
 * Used by navigation menus, breadcrumbs, and analytics dashboards.
 *
 * @constant {Object<string, string>}
 */
const ROUTE_CATEGORIES = Object.freeze({
  core:       'Core Platform',
  survey:     'Survey & Validation',
  legal:      'Legal & Compliance',
  strategic:  'Strategic Reference',
  provincial: 'Provincial Outlook',
  supporting: 'Supporting Resources',
});

/* ───────────────────────────────────────────────────────────────────────────
 *  Route Registry — master list of all 25 platform pages
 *
 *  Each route object shape:
 *  {
 *    path:              string   — URL path (e.g., '/dashboard')
 *    file:              string   — HTML filename (e.g., 'dashboard.html')
 *    title:             string   — <title> tag and social-share title
 *    description:       string   — <meta name="description"> content
 *    category:          string   — key from ROUTE_CATEGORIES
 *    navOrder:          number|null — ascending nav position; null = hidden
 *    icon:              string   — emoji icon for nav display
 *    requiresAuth:      boolean  — true if login/session required
 *    analyticsPageView: boolean  — include in page-view analytics
 *  }
 * ─────────────────────────────────────────────────────────────────────────── */

/**
 * Complete registry of every public page served by the BIRD platform.
 *
 * @constant {Array<RouteDef>}
 */
const ROUTE_REGISTRY = Object.freeze([

  /* ── Core Platform (6 routes) ─────────────────────────────────────────── */

  {
    path:              '/',
    file:              'index.html',
    title:             'Interactive Strategy Map 2026-2035',
    description:       'BARMM Investment Roadmap strategy map with BSC perspectives. Explore the Bangsamoro Investment Roadmap Development 2026-2035 interactive strategic planning platform.',
    category:          'core',
    navOrder:          1,
    icon:              '🗺️',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/dashboard',
    file:              'dashboard.html',
    title:             'Strategic MEL Dashboard',
    description:       'Real-time Monitoring, Evaluation & Learning dashboard for tracking BARMM investment roadmap progress and performance indicators.',
    category:          'core',
    navOrder:          2,
    icon:              '📊',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/roadmap',
    file:              'roadmap.html',
    title:             'Strategic Investment Roadmap',
    description:       'Comprehensive IEDS strategy guide and BSC perspectives. Navigate the Bangsamoro Investment Roadmap Development strategic investment roadmap.',
    category:          'core',
    navOrder:          3,
    icon:              '🛣️',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/action-plan',
    file:              'action-plan.html',
    title:             'One Year Action Plan 2026',
    description:       'Phase 1 Foundation Building priority actions. Discover the BARMM strategic one-year action plan for 2026, focused on foundation-building initiatives.',
    category:          'core',
    navOrder:          4,
    icon:              '📋',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/contact',
    file:              'contact.html',
    title:             'Contact MTIT-BARMM',
    description:       'Investment facilitation contact and inquiry form. Reach out to the Ministry of Trade, Investments and Tourism (MTIT-BARMM) for investment facilitation.',
    category:          'core',
    navOrder:          5,
    icon:              '📧',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/resources',
    file:              'resources.html',
    title:             'Resource Library',
    description:       'Provincial outlooks, frameworks, and stakeholder resources. Access the BARMM resource library with investment outlooks, policy frameworks, and stakeholder guides.',
    category:          'core',
    navOrder:          6,
    icon:              '📚',
    requiresAuth:      false,
    analyticsPageView: true,
  },

  /* ── Survey Routes (3 routes) ─────────────────────────────────────────── */

  {
    path:              '/validation-survey',
    file:              'validation-survey.html',
    title:             'BIRD Validation Survey',
    description:       '16-section stakeholder validation survey with offline support. Participate in the BIRD 2026-2035 stakeholder validation survey to help shape BARMM investment priorities.',
    category:          'survey',
    navOrder:          7,
    icon:              '📝',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/survey-orientation',
    file:              'survey-orientation.html',
    title:             'Survey Orientation',
    description:       'Respondent briefing on C.A.R.E. framework and methodology. Learn about the BIRD survey methodology, the C.A.R.E. framework, and how stakeholder input shapes BARMM strategy.',
    category:          'survey',
    navOrder:          8,
    icon:              '🎓',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/survey-dashboard',
    file:              'survey-dashboard.html',
    title:             'Live Validation Results',
    description:       'Real-time aggregate survey data dashboard with Chart.js. View live results from the BIRD stakeholder validation survey with real-time data visualization.',
    category:          'survey',
    navOrder:          9,
    icon:              '📈',
    requiresAuth:      false,
    analyticsPageView: true,
  },

  /* ── Legal / Compliance Routes (2 routes) ─────────────────────────────── */

  {
    path:              '/privacy-policy',
    file:              'privacy-policy.html',
    title:             'Privacy Policy',
    description:       'DPA 2012 compliant privacy policy for survey respondents. Read the BIRD platform privacy policy, compliant with the Philippine Data Privacy Act of 2012 (RA 10173).',
    category:          'legal',
    navOrder:          null,
    icon:              '🔒',
    requiresAuth:      false,
    analyticsPageView: false,
  },
  {
    path:              '/cookie-policy',
    file:              'cookie-policy.html',
    title:             'Cookie Policy',
    description:       'Cookie and local storage usage policy. Learn how the BIRD platform uses cookies and local storage to enhance your experience and support offline survey functionality.',
    category:          'legal',
    navOrder:          null,
    icon:              '🍪',
    requiresAuth:      false,
    analyticsPageView: false,
  },

  /* ── Strategic Reference Routes (6 routes) ────────────────────────────── */

  {
    path:              '/strategy-map',
    file:              'strategy-map.html',
    title:             'Strategy Map',
    description:       'Visual strategy map with BSC perspectives and leverage points. Explore the BIRD strategy map showing Balanced Scorecard perspectives and strategic leverage points.',
    category:          'strategic',
    navOrder:          10,
    icon:              '🧭',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/kpi',
    file:              'kpi.html',
    title:             'Key Performance Indicators',
    description:       'BSC-aligned KPI targets and metrics dashboard. View the BIRD Key Performance Indicators aligned with the Balanced Scorecard framework for BARMM investment monitoring.',
    category:          'strategic',
    navOrder:          11,
    icon:              '🎯',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/ieb',
    file:              'ieb.html',
    title:             'Investment Ecosystem Brief',
    description:       'BARMM investment ecosystem overview and analysis. Read the Investment Ecosystem Brief analyzing the BARMM investment landscape, opportunities, and challenges.',
    category:          'strategic',
    navOrder:          12,
    icon:              '🏛️',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/options',
    file:              'options.html',
    title:             'Strategic Options',
    description:       'IEDS, HEDS, GEMS, IFES strategy comparison. Compare BARMM strategic options including IEDS, HEDS, GEMS, and IFES frameworks for investment ecosystem development.',
    category:          'strategic',
    navOrder:          13,
    icon:              '⚖️',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/beie-basics',
    file:              'beie-basics.html',
    title:             'BEIE Framework Primer',
    description:       'Bangsamoro Economic and Investment Ecosystem basics. Learn the fundamentals of the Bangsamoro Economic and Investment Ecosystem (BEIE) framework and its role in BARMM development.',
    category:          'strategic',
    navOrder:          14,
    icon:              '📖',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/slides',
    file:              'slides.html',
    title:             'Presentation Slides',
    description:       'BIRD 2026-2035 slide deck and presentation materials. Access the official BIRD 2026-2035 presentation slides for stakeholder briefings and public presentations.',
    category:          'strategic',
    navOrder:          15,
    icon:              '🖼️',
    requiresAuth:      false,
    analyticsPageView: true,
  },

  /* ── Provincial Outlook Routes (6 routes) ─────────────────────────────── */

  {
    path:              '/basilan-outlook',
    file:              'basilan-outlook.html',
    title:             'Basilan Provincial Outlook',
    description:       'Economic outlook and investment profile for Basilan. Explore the economic outlook and investment opportunities in the Province of Basilan, BARMM.',
    category:          'provincial',
    navOrder:          16,
    icon:              '🏝️',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/lanao-delsur-outlook',
    file:              'lanao-delsur-outlook.html',
    title:             'Lanao del Sur Outlook',
    description:       'Economic outlook and investment profile for Lanao del Sur. Explore the economic outlook and investment opportunities in the Province of Lanao del Sur, BARMM.',
    category:          'provincial',
    navOrder:          17,
    icon:              '🕌',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/maguindanao-delnorte-outlook',
    file:              'maguindanao-delnorte-outlook.html',
    title:             'Maguindanao del Norte Outlook',
    description:       'Economic outlook for Maguindanao del Norte. Explore the economic outlook and investment opportunities in the Province of Maguindanao del Norte, BARMM.',
    category:          'provincial',
    navOrder:          18,
    icon:              '🌾',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/maguindanao-delsur-outlook',
    file:              'maguindanao-delsur-outlook.html',
    title:             'Maguindanao del Sur Outlook',
    description:       'Economic outlook for Maguindanao del Sur. Explore the economic outlook and investment opportunities in the Province of Maguindanao del Sur, BARMM.',
    category:          'provincial',
    navOrder:          19,
    icon:              '🐟',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/sga-outlook',
    file:              'sga-outlook.html',
    title:             'Special Geographic Area Outlook',
    description:       'Economic outlook for SGA areas. Explore the economic outlook and investment opportunities in the Special Geographic Area (SGA) of BARMM.',
    category:          'provincial',
    navOrder:          20,
    icon:              '🗾',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/tawi-tawi-outlook',
    file:              'tawi-tawi-outlook.html',
    title:             'Tawi-Tawi Provincial Outlook',
    description:       'Economic outlook and investment profile for Tawi-Tawi. Explore the economic outlook and investment opportunities in the Province of Tawi-Tawi, BARMM.',
    category:          'provincial',
    navOrder:          21,
    icon:              '🐚',
    requiresAuth:      false,
    analyticsPageView: true,
  },

  /* ── Supporting Routes (2 routes) ─────────────────────────────────────── */

  {
    path:              '/user-manual',
    file:              'user-manual.html',
    title:             'User Manual',
    description:       'Platform navigation and module user guide. Learn how to navigate and use the BIRD 2026-2035 platform with this comprehensive user manual.',
    category:          'supporting',
    navOrder:          22,
    icon:              '❓',
    requiresAuth:      false,
    analyticsPageView: true,
  },
  {
    path:              '/actors-value-mapping',
    file:              'actors-value-mapping.html',
    title:             'Actors & Value Mapping',
    description:       'Stakeholder actor mapping and value chain analysis. Explore stakeholder actor mapping and value chain analysis for the BARMM investment ecosystem.',
    category:          'supporting',
    navOrder:          23,
    icon:              '🤝',
    requiresAuth:      false,
    analyticsPageView: true,
  },

]);

/* ───────────────────────────────────────────────────────────────────────────
 *  Route Count Constants — useful for assertions and health checks
 * ─────────────────────────────────────────────────────────────────────────── */

/** Total number of routes in the registry. */
const TOTAL_ROUTES = ROUTE_REGISTRY.length;          // 25

/** Number of navigation-visible routes (navOrder !== null). */
const NAV_VISIBLE_COUNT = ROUTE_REGISTRY.filter(r => r.navOrder !== null).length; // 23

/** Number of routes requiring authentication. */
const AUTH_REQUIRED_COUNT = ROUTE_REGISTRY.filter(r => r.requiresAuth).length;     // 0

/** Number of routes tracked for analytics. */
const ANALYTICS_TRACKED_COUNT = ROUTE_REGISTRY.filter(r => r.analyticsPageView).length; // 23

/* ───────────────────────────────────────────────────────────────────────────
 *  Helper Functions
 * ─────────────────────────────────────────────────────────────────────────── */

/**
 * Look up a route definition by its URL path.
 *
 * Performs an exact, case-sensitive match against the `path` field.
 * Returns `null` if no matching route is found or if the input is invalid.
 *
 * @param   {string} path  — The URL path to search for (e.g., '/dashboard').
 * @returns {RouteDef|null}  The matching route object, or null.
 *
 * @example
 *   const route = getRouteByPath('/dashboard');
 *   // => { path: '/dashboard', file: 'dashboard.html', ... }
 *
 *   const missing = getRouteByPath('/nonexistent');
 *   // => null
 */
function getRouteByPath(path) {
  if (typeof path !== 'string' || path.length === 0) {
    return null;
  }
  // Normalize: ensure path starts with '/'
  const normalized = path.startsWith('/') ? path : '/' + path;
  return ROUTE_REGISTRY.find(route => route.path === normalized) || null;
}

/**
 * Retrieve all routes that belong to a specific category.
 *
 * Validates the category against the known set of keys in
 * {@link ROUTE_CATEGORIES}. Returns an empty array for unknown categories.
 *
 * @param   {string} category  — One of the keys in ROUTE_CATEGORIES.
 * @returns {Array<RouteDef>}   All routes in that category.
 *
 * @example
 *   const coreRoutes = getRoutesByCategory('core');
 *   // => [ { path: '/', ... }, { path: '/dashboard', ... }, ... ]
 */
function getRoutesByCategory(category) {
  if (typeof category !== 'string' || category.length === 0) {
    return [];
  }
  if (!ROUTE_CATEGORIES[category]) {
    return [];
  }
  return ROUTE_REGISTRY.filter(route => route.category === category);
}

/**
 * Get all routes that should appear in the main navigation menu,
 * sorted by their `navOrder` property in ascending order.
 *
 * Routes with `navOrder: null` are excluded (hidden from nav).
 * This powers the sidebar / top-bar navigation component.
 *
 * @returns {Array<RouteDef>}  Nav-visible routes, ordered for display.
 *
 * @example
 *   const nav = getNavigationRoutes();
 *   // => [ { path: '/', navOrder: 1, ... }, { path: '/dashboard', navOrder: 2, ... }, ... ]
 */
function getNavigationRoutes() {
  return ROUTE_REGISTRY
    .filter(route => route.navOrder !== null)
    .sort((a, b) => a.navOrder - b.navOrder);
}

/**
 * Get all public routes — i.e., routes that do NOT require authentication.
 *
 * Currently all 25 routes on the BIRD platform are public-facing,
 * but this helper future-proofs the registry if auth-gated pages
 * are added later.
 *
 * @returns {Array<RouteDef>}  All routes with `requiresAuth: false`.
 *
 * @example
 *   const publicPages = getPublicRoutes();
 *   // => [ { path: '/', requiresAuth: false, ... }, ... ]  (25 items)
 */
function getPublicRoutes() {
  return ROUTE_REGISTRY.filter(route => route.requiresAuth === false);
}

/**
 * Get all routes that should have their page views tracked by analytics.
 *
 * Filters out legal/compliance pages and any other pages where
 * `analyticsPageView` is set to false.
 *
 * @returns {Array<RouteDef>}  Routes eligible for page-view analytics.
 *
 * @example
 *   const tracked = getAnalyticsRoutes();
 *   // => [ { path: '/', analyticsPageView: true, ... }, ... ]  (23 items)
 */
function getAnalyticsRoutes() {
  return ROUTE_REGISTRY.filter(route => route.analyticsPageView === true);
}

/**
 * Build the full HTML <title> tag for a given route.
 *
 * Uses the SEO titleTemplate to interpolate the route title.
 *
 * @param   {RouteDef} route  — A route object from the registry.
 * @returns {string}           Formatted title string.
 *
 * @example
 *   const title = getPageTitle(ROUTE_REGISTRY[0]);
 *   // => 'Interactive Strategy Map 2026-2035 | BIRD 2026-2035'
 */
function getPageTitle(route) {
  if (!route || typeof route.title !== 'string') {
    return SEO_DEFAULTS.siteName;
  }
  return SEO_DEFAULTS.titleTemplate.replace('%s', route.title);
}

/**
 * Get the category label for a given route.
 *
 * @param   {RouteDef} route  — A route object from the registry.
 * @returns {string}           Human-readable category label.
 *
 * @example
 *   const label = getCategoryLabel(ROUTE_REGISTRY[0]);
 *   // => 'Core Platform'
 */
function getCategoryLabel(route) {
  if (!route || typeof route.category !== 'string') {
    return 'Uncategorized';
  }
  return ROUTE_CATEGORIES[route.category] || 'Uncategorized';
}

/* ───────────────────────────────────────────────────────────────────────────
 *  Module Exports
 * ─────────────────────────────────────────────────────────────────────────── */

module.exports = {
  // — Constants —
  SEO_DEFAULTS,
  ROUTE_CATEGORIES,
  ROUTE_REGISTRY,

  // — Count helpers (read-only introspection) —
  TOTAL_ROUTES,
  NAV_VISIBLE_COUNT,
  AUTH_REQUIRED_COUNT,
  ANALYTICS_TRACKED_COUNT,

  // — Lookup functions —
  getRouteByPath,
  getRoutesByCategory,
  getNavigationRoutes,
  getPublicRoutes,
  getAnalyticsRoutes,
  getPageTitle,
  getCategoryLabel,
};

/* ───────────────────────────────────────────────────────────────────────────
 *  EOF  —  src/pages/route.js
 * ─────────────────────────────────────────────────────────────────────────── */