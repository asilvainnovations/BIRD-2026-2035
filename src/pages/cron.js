/**
 * ============================================================================
 * BIRD 2026-2035 — Bangsamoro Investment Roadmap Development
 * ============================================================================
 * Cron Job Scheduler Module
 * -------------------------
 * Manages all background scheduled tasks for the BIRD platform including:
 *   - Survey response synchronization
 *   - Analytics aggregation & cache management
 *   - Health monitoring & alerting
 *   - Daily/weekly reporting & backup triggers
 *
 * Architecture: Task Registry Pattern with graceful shutdown support.
 * Timezone   : Asia/Manila (PHT)
 * Framework  : node-cron (CommonJS)
 *
 * @module   cron
 * @version  1.0.0
 * @author   BIRD Platform Team
 * @license  MIT
 * ============================================================================
 */

'use strict';

// ─── Dependencies ────────────────────────────────────────────────────────────
const cron = require('node-cron');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// ─── Configuration ───────────────────────────────────────────────────────────
/**
 * Central configuration for the cron scheduler.
 * All values are overridable via environment variables.
 *
 * @constant {Object} CRON_CONFIG
 */
const CRON_CONFIG = {
  /** Timezone for all scheduled tasks */
  timezone: 'Asia/Manila',

  /** Master switch — set CRON_ENABLED=false to disable all jobs */
  enabled: process.env.CRON_ENABLED !== 'false',

  /** Dry-run mode — logs tasks without executing side effects */
  dryRun: process.env.CRON_DRY_RUN === 'true',

  /** Log verbosity: 'debug' | 'info' | 'warn' | 'error' */
  logLevel: process.env.CRON_LOG_LEVEL || 'info',

  /** Maximum retry attempts per task */
  maxRetries: parseInt(process.env.CRON_MAX_RETRIES, 10) || 3,

  /** Delay between retry attempts in milliseconds */
  retryDelayMs: parseInt(process.env.CRON_RETRY_DELAY_MS, 10) || 5000,

  /** Supabase project URL */
  supabaseUrl: process.env.SUPABASE_URL || 'https://lydsisparsmvextskevw.supabase.co',

  /** Supabase anonymous/public API key */
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',

  /** Supabase service role key (for elevated operations) */
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',

  /** Application health endpoint to ping */
  healthCheckEndpoint: process.env.HEALTH_ENDPOINT || 'http://localhost:3000/api/health',

  /** Path to cron log file */
  logFile: process.env.CRON_LOG_FILE || './logs/cron.log',

  /** Number of survey sections (for completion-rate calculations) */
  surveySectionCount: 16,

  /** Default fetch timeout in milliseconds */
  fetchTimeoutMs: parseInt(process.env.CRON_FETCH_TIMEOUT_MS, 10) || 15000,

  /** Cache TTL in milliseconds (default 30 minutes) */
  cacheTtlMs: parseInt(process.env.CRON_CACHE_TTL_MS, 10) || 1800000,
};

// ─── Log Level Priority ──────────────────────────────────────────────────────
const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };

// ─── In-Memory State ─────────────────────────────────────────────────────────
/** @type {Map<string,Object>} Stores runtime state for each registered task */
const taskState = new Map();

/** @type {Map<string,Object>} Active cron job instances */
const activeJobs = new Map();

/** @type {boolean} Whether the scheduler has been initialized */
let isInitialized = false;

/** @type {boolean} Shutdown in progress flag */
let isShuttingDown = false;

// ─── Logger Utility ──────────────────────────────────────────────────────────
/**
 * Writes a timestamped log entry to both console and the configured log file.
 * Respects the CRON_CONFIG.logLevel setting.
 *
 * @param   {string}  level   - Log level: 'debug' | 'info' | 'warn' | 'error'
 * @param   {string}  message - Human-readable log message
 * @param   {Object}  [meta]  - Optional structured metadata
 */
function logger(level, message, meta = {}) {
  if (LOG_LEVELS[level] < LOG_LEVELS[CRON_CONFIG.logLevel]) return;

  const timestamp = new Date().toISOString();
  const entry = {
    timestamp,
    level: level.toUpperCase(),
    source: 'cron',
    message,
    ...meta,
  };

  const line = `[${entry.timestamp}] [${entry.level}] [cron] ${message}`
    + (Object.keys(meta).length ? ' | ' + JSON.stringify(meta) : '');

  // Console output
  if (level === 'error') {
    console.error(line);
  } else if (level === 'warn') {
    console.warn(line);
  } else {
    console.log(line);
  }

  // File output (best-effort)
  try {
    const logDir = path.dirname(CRON_CONFIG.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    fs.appendFileSync(CRON_CONFIG.logFile, line + '\n', 'utf8');
  } catch (err) {
    console.error(`[${timestamp}] [ERROR] [cron] Failed to write to log file: ${err.message}`);
  }
}

// ─── Helper: Delay ───────────────────────────────────────────────────────────
/**
 * Returns a Promise that resolves after `ms` milliseconds.
 *
 * @param   {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Helper: Fetch with Timeout ──────────────────────────────────────────────
/**
 * Performs an HTTP request that automatically aborts after the configured timeout.
 *
 * @param   {string}  url     - Target URL
 * @param   {Object}  [opts]  - node-fetch options
 * @returns {Promise<Object>} Parsed JSON response or error object
 */
async function fetchWithTimeout(url, opts = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CRON_CONFIG.fetchTimeoutMs);

  try {
    const response = await fetch(url, {
      ...opts,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await response.json();
    }
    return { text: await response.text() };
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// ─── Helper: Retry Wrapper ───────────────────────────────────────────────────
/**
 * Executes an async function with configurable retry logic.
 *
 * @param   {Function}  fn        - Async function to execute
 * @param   {Object}    [options] - Retry options
 * @param   {number}    [options.maxRetries]   - Max attempts
 * @param   {number}    [options.retryDelayMs] - Delay between attempts
 * @param   {string}    [options.taskName]     - Task name for logging
 * @returns {Promise<*>} Resolves with the function's return value
 * @throws  {Error} If all retries are exhausted
 */
async function withRetry(fn, options = {}) {
  const maxRetries = options.maxRetries || CRON_CONFIG.maxRetries;
  const retryDelayMs = options.retryDelayMs || CRON_CONFIG.retryDelayMs;
  const taskName = options.taskName || 'unknown';
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      logger('warn', `Task "${taskName}" attempt ${attempt}/${maxRetries} failed`, {
        task: taskName,
        attempt,
        maxRetries,
        error: err.message,
      });

      if (attempt < maxRetries) {
        await delay(retryDelayMs);
      }
    }
  }

  throw new Error(
    `Task "${taskName}" failed after ${maxRetries} attempts: ${lastError.message}`
  );
}

// ─── Helper: Supabase Request ────────────────────────────────────────────────
/**
 * Makes an authenticated request to the Supabase REST API.
 *
 * @param   {string}  endpoint - API endpoint path (e.g., '/rest/v1/survey_responses')
 * @param   {Object}  [opts]   - Fetch options (method, body, headers)
 * @returns {Promise<Object>}  JSON response from Supabase
 */
async function supabaseRequest(endpoint, opts = {}) {
  const url = `${CRON_CONFIG.supabaseUrl}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'apikey': CRON_CONFIG.supabaseAnonKey,
    'Authorization': `Bearer ${CRON_CONFIG.supabaseServiceKey || CRON_CONFIG.supabaseAnonKey}`,
    'Prefer': 'return=representation',
    ...opts.headers,
  };

  return await fetchWithTimeout(url, {
    method: opts.method || 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
}

// ============================================================================
// TASK HANDLERS
// ============================================================================

/**
 * Task 1: Synchronize pending survey responses from the localStorage queue to Supabase.
 * Retries failed submissions up to the configured max attempts.
 * Schedule: Every 5 minutes.
 */
async function syncSurveyResponses() {
  logger('info', 'Starting survey response synchronization');

  if (CRON_CONFIG.dryRun) {
    logger('info', '[DRY-RUN] Would sync pending survey responses to Supabase');
    return { synced: 0, failed: 0, skipped: true };
  }

  return await withRetry(async () => {
    // Fetch pending responses from the sync_queue table
    const pending = await supabaseRequest(
      '/rest/v1/sync_queue?status=eq.pending&order=created_at.asc&limit=100'
    );

    if (!Array.isArray(pending) || pending.length === 0) {
      logger('info', 'No pending survey responses to sync');
      return { synced: 0, failed: 0 };
    }

    let syncedCount = 0;
    let failedCount = 0;

    for (const record of pending) {
      try {
        // Insert the actual survey response
        await supabaseRequest('/rest/v1/survey_responses', {
          method: 'POST',
          body: record.payload,
        });

        // Mark sync_queue record as completed
        await supabaseRequest(`/rest/v1/sync_queue?id=eq.${record.id}`, {
          method: 'PATCH',
          body: { status: 'synced', synced_at: new Date().toISOString() },
        });

        syncedCount++;
      } catch (err) {
        failedCount++;

        // Increment retry count in the queue
        const newAttempts = (record.attempts || 0) + 1;
        const status = newAttempts >= CRON_CONFIG.maxRetries ? 'failed' : 'pending';

        await supabaseRequest(`/rest/v1/sync_queue?id=eq.${record.id}`, {
          method: 'PATCH',
          body: {
            status,
            attempts: newAttempts,
            last_error: err.message,
            updated_at: new Date().toISOString(),
          },
        });

        logger('warn', `Failed to sync response ${record.id}`, {
          recordId: record.id,
          attempts: newAttempts,
          error: err.message,
        });
      }
    }

    logger('info', `Survey sync complete: ${syncedCount} synced, ${failedCount} failed`, {
      synced: syncedCount,
      failed: failedCount,
      total: pending.length,
    });

    return { synced: syncedCount, failed: failedCount };
  }, { taskName: 'syncSurveyResponses' });
}

/**
 * Task 2: Aggregate survey response data for the real-time dashboard.
 * Calculates province-wise counts, category distributions, and C.A.R.E. scores.
 * Schedule: Every 15 minutes.
 */
async function aggregateAnalytics() {
  logger('info', 'Starting analytics aggregation');

  if (CRON_CONFIG.dryRun) {
    logger('info', '[DRY-RUN] Would aggregate survey analytics');
    return { provincesUpdated: 0, categoriesUpdated: 0, careScoresUpdated: 0, skipped: true };
  }

  return await withRetry(async () => {
    // 1. Fetch all survey responses
    const responses = await supabaseRequest(
      '/rest/v1/survey_responses?select=*,provinces(province_name),survey_sections(section_name,category)'
    );

    if (!Array.isArray(responses)) {
      throw new Error('Invalid response format from Supabase');
    }

    // 2. Province-wise response counts
    const provinceStats = {};
    const categoryStats = {};
    const careScores = { cohesion: [], autonomy: [], resilience: [], equity: [] };

    for (const resp of responses) {
      // Province aggregation
      const provName = resp.provinces?.province_name || 'Unknown';
      provinceStats[provName] = (provinceStats[provName] || 0) + 1;

      // Category distribution (C.A.R.E. framework)
      const cat = resp.survey_sections?.category || 'Uncategorized';
      categoryStats[cat] = (categoryStats[cat] || 0) + 1;

      // C.A.R.E. score components (if available)
      if (resp.care_scores) {
        if (resp.care_scores.cohesion != null) careScores.cohesion.push(resp.care_scores.cohesion);
        if (resp.care_scores.autonomy != null) careScores.autonomy.push(resp.care_scores.autonomy);
        if (resp.care_scores.resilience != null) careScores.resilience.push(resp.care_scores.resilience);
        if (resp.care_scores.equity != null) careScores.equity.push(resp.care_scores.equity);
      }
    }

    // 3. Compute averages
    const avgCare = {};
    for (const [key, vals] of Object.entries(careScores)) {
      avgCare[key] = vals.length > 0
        ? parseFloat((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2))
        : 0;
    }

    // 4. Upsert analytics snapshot
    const snapshot = {
      timestamp: new Date().toISOString(),
      total_responses: responses.length,
      province_distribution: provinceStats,
      category_distribution: categoryStats,
      avg_care_scores: avgCare,
      computed_at: new Date().toISOString(),
    };

    await supabaseRequest('/rest/v1/analytics_snapshots', {
      method: 'POST',
      body: snapshot,
    });

    // 5. Trigger cache refresh via app endpoint
    try {
      await fetchWithTimeout(`${CRON_CONFIG.healthCheckEndpoint.replace('/health', '')}/cache/refresh`, {
        method: 'POST',
      });
      logger('debug', 'Cache refresh triggered successfully');
    } catch (err) {
      logger('warn', 'Cache refresh endpoint unreachable', { error: err.message });
    }

    logger('info', 'Analytics aggregation complete', {
      totalResponses: responses.length,
      provinces: Object.keys(provinceStats).length,
      categories: Object.keys(categoryStats).length,
      avgCare,
    });

    return {
      provincesUpdated: Object.keys(provinceStats).length,
      categoriesUpdated: Object.keys(categoryStats).length,
      careScoresUpdated: Object.keys(avgCare).length,
      totalResponses: responses.length,
    };
  }, { taskName: 'aggregateAnalytics' });
}

/**
 * Task 3: Clean up expired cache entries, temporary files, and orphaned session data.
 * Schedule: Every 30 minutes.
 */
async function cleanupExpiredCache() {
  logger('info', 'Starting cache cleanup');

  if (CRON_CONFIG.dryRun) {
    logger('info', '[DRY-RUN] Would clean expired cache entries and temp files');
    return { cacheCleared: 0, tempFilesRemoved: 0, sessionsCleaned: 0, skipped: true };
  }

  return await withRetry(async () => {
    let cacheCleared = 0;
    let tempFilesRemoved = 0;
    let sessionsCleaned = 0;

    // 1. Clear expired Supabase analytics cache entries
    const now = new Date().toISOString();
    const expiredCache = await supabaseRequest(
      `/rest/v1/analytics_snapshots?expires_at=lt.${encodeURIComponent(now)}&status=eq.expired`
    );

    if (Array.isArray(expiredCache) && expiredCache.length > 0) {
      for (const entry of expiredCache) {
        await supabaseRequest(`/rest/v1/analytics_snapshots?id=eq.${entry.id}`, {
          method: 'DELETE',
        });
        cacheCleared++;
      }
    }

    // 2. Clean temporary upload files older than 24 hours
    const tmpDir = path.resolve('./tmp');
    if (fs.existsSync(tmpDir)) {
      const cutoff = Date.now() - 86400000; // 24 hours
      const files = fs.readdirSync(tmpDir);
      for (const file of files) {
        const filePath = path.join(tmpDir, file);
        try {
          const stats = fs.statSync(filePath);
          if (stats.mtimeMs < cutoff) {
            fs.unlinkSync(filePath);
            tempFilesRemoved++;
          }
        } catch (err) {
          logger('warn', `Failed to remove temp file: ${file}`, { error: err.message });
        }
      }
    }

    // 3. Clean orphaned session data older than 7 days
    const sessionCutoff = new Date(Date.now() - 7 * 86400000).toISOString();
    const orphanedSessions = await supabaseRequest(
      `/rest/v1/sessions?last_active=lt.${encodeURIComponent(sessionCutoff)}&is_active=eq.false`
    );

    if (Array.isArray(orphanedSessions) && orphanedSessions.length > 0) {
      for (const session of orphanedSessions) {
        await supabaseRequest(`/rest/v1/sessions?id=eq.${session.id}`, {
          method: 'DELETE',
        });
        sessionsCleaned++;
      }
    }

    logger('info', 'Cache cleanup complete', {
      cacheCleared,
      tempFilesRemoved,
      sessionsCleaned,
    });

    return { cacheCleared, tempFilesRemoved, sessionsCleaned };
  }, { taskName: 'cleanupExpiredCache' });
}

/**
 * Task 4: Ping the main application and Supabase for health status.
 * Logs results and alerts on failures.
 * Schedule: Every 10 minutes.
 */
async function healthCheckPing() {
  logger('info', 'Starting health check ping');

  if (CRON_CONFIG.dryRun) {
    logger('info', '[DRY-RUN] Would ping health endpoints');
    return { appHealthy: true, dbHealthy: true, skipped: true };
  }

  const results = { appHealthy: false, dbHealthy: false, checkedAt: new Date().toISOString() };

  // 1. Ping main application health endpoint
  try {
    const appHealth = await fetchWithTimeout(CRON_CONFIG.healthCheckEndpoint);
    results.appHealthy = appHealth.status === 'ok' || appHealth.healthy === true;
    logger('debug', 'Application health check result', {
      healthy: results.appHealthy,
      response: appHealth,
    });
  } catch (err) {
    results.appHealthy = false;
    results.appError = err.message;
    logger('error', 'Application health check FAILED', {
      endpoint: CRON_CONFIG.healthCheckEndpoint,
      error: err.message,
    });
  }

  // 2. Ping Supabase connection
  try {
    const dbHealth = await supabaseRequest('/rest/v1/');
    results.dbHealthy = true;
    logger('debug', 'Supabase connection check passed');
  } catch (err) {
    results.dbHealthy = false;
    results.dbError = err.message;
    logger('error', 'Supabase health check FAILED', { error: err.message });
  }

  // 3. Log aggregate health status
  const overallHealthy = results.appHealthy && results.dbHealthy;
  logger(overallHealthy ? 'info' : 'error', `Health check complete — Overall: ${overallHealthy ? 'HEALTHY' : 'UNHEALTHY'}`, {
    app: results.appHealthy ? 'OK' : 'FAIL',
    database: results.dbHealthy ? 'OK' : 'FAIL',
  });

  // 4. Store health check result in monitoring table
  try {
    await supabaseRequest('/rest/v1/health_checks', {
      method: 'POST',
      body: {
        checked_at: results.checkedAt,
        app_healthy: results.appHealthy,
        db_healthy: results.dbHealthy,
        overall_healthy: overallHealthy,
        app_error: results.appError || null,
        db_error: results.dbError || null,
      },
    });
  } catch (err) {
    logger('warn', 'Failed to persist health check result', { error: err.message });
  }

  return results;
}

/**
 * Task 5: Send reminder emails to survey respondents with incomplete submissions.
 * Only sends to respondents who opted in for notifications.
 * Schedule: Daily at 9:00 AM PHT.
 */
async function sendReminderEmails() {
  logger('info', 'Starting reminder email dispatch');

  if (CRON_CONFIG.dryRun) {
    logger('info', '[DRY-RUN] Would send reminder emails to incomplete respondents');
    return { sent: 0, failed: 0, skipped: true };
  }

  return await withRetry(async () => {
    // 1. Find respondents with incomplete submissions who opted in
    const incompleteRespondents = await supabaseRequest(
      '/rest/v1/survey_responses?completion_status=eq.partial&notifications_enabled=eq.true&reminder_sent_at=lt.' +
      encodeURIComponent(new Date(Date.now() - 86400000).toISOString()) +
      '&select=respondent_email,respondent_name,id,completed_sections'
    );

    if (!Array.isArray(incompleteRespondents) || incompleteRespondents.length === 0) {
      logger('info', 'No incomplete respondents needing reminders');
      return { sent: 0, failed: 0 };
    }

    let sentCount = 0;
    let failedCount = 0;

    for (const respondent of incompleteRespondents) {
      try {
        const completedSections = Array.isArray(respondent.completed_sections)
          ? respondent.completed_sections.length
          : 0;
        const progressPct = Math.round((completedSections / CRON_CONFIG.surveySectionCount) * 100);

        // Invoke Supabase Edge Function for email delivery
        await fetchWithTimeout(
          `${CRON_CONFIG.supabaseUrl}/functions/v1/send-survey-reminder`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${CRON_CONFIG.supabaseAnonKey}`,
            },
            body: JSON.stringify({
              to: respondent.respondent_email,
              name: respondent.respondent_name || 'Valued Stakeholder',
              progressPercent: progressPct,
              completedSections,
              totalSections: CRON_CONFIG.surveySectionCount,
              surveyUrl: `${CRON_CONFIG.supabaseUrl.replace('.co', '.co/survey')}`,
            }),
          }
        );

        // Update reminder_sent_at timestamp
        await supabaseRequest(`/rest/v1/survey_responses?id=eq.${respondent.id}`, {
          method: 'PATCH',
          body: { reminder_sent_at: new Date().toISOString() },
        });

        sentCount++;
      } catch (err) {
        failedCount++;
        logger('warn', `Failed to send reminder to ${respondent.respondent_email}`, {
          respondentId: respondent.id,
          error: err.message,
        });
      }
    }

    logger('info', `Reminder emails dispatched: ${sentCount} sent, ${failedCount} failed`, {
      sent: sentCount,
      failed: failedCount,
    });

    return { sent: sentCount, failed: failedCount };
  }, { taskName: 'sendReminderEmails' });
}

/**
 * Task 6: Generate a daily summary report of survey responses.
 * Counts new responses in the last 24 hours, calculates completion rates.
 * Schedule: Daily at 6:00 AM PHT.
 */
async function generateDailyReport() {
  logger('info', 'Starting daily report generation');

  if (CRON_CONFIG.dryRun) {
    logger('info', '[DRY-RUN] Would generate daily report');
    return { newResponses: 0, completionRate: 0, skipped: true };
  }

  return await withRetry(async () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString();
    const today = new Date().toISOString();

    // 1. Count new responses in the last 24 hours
    const newResponses = await supabaseRequest(
      `/rest/v1/survey_responses?submitted_at=gte.${encodeURIComponent(yesterday)}&select=id`
    );

    const newResponseCount = Array.isArray(newResponses) ? newResponses.length : 0;

    // 2. Get total responses and completion stats
    const allResponses = await supabaseRequest(
      '/rest/v1/survey_responses?select=completion_status'
    );

    const totalResponses = Array.isArray(allResponses) ? allResponses.length : 0;
    const completedResponses = Array.isArray(allResponses)
      ? allResponses.filter((r) => r.completion_status === 'complete').length
      : 0;

    const completionRate = totalResponses > 0
      ? parseFloat(((completedResponses / totalResponses) * 100).toFixed(2))
      : 0;

    // 3. Province breakdown for new responses
    const provinceBreakdown = {};
    if (newResponseCount > 0) {
      const newWithProvinces = await supabaseRequest(
        `/rest/v1/survey_responses?submitted_at=gte.${encodeURIComponent(yesterday)}` +
        '&select=provinces(province_name)'
      );

      if (Array.isArray(newWithProvinces)) {
        for (const resp of newWithProvinces) {
          const prov = resp.provinces?.province_name || 'Unknown';
          provinceBreakdown[prov] = (provinceBreakdown[prov] || 0) + 1;
        }
      }
    }

    // 4. Store the daily report
    const report = {
      report_date: today.split('T')[0],
      generated_at: today,
      new_responses_24h: newResponseCount,
      total_responses: totalResponses,
      completed_responses: completedResponses,
      completion_rate: completionRate,
      province_breakdown: provinceBreakdown,
      report_type: 'daily',
    };

    await supabaseRequest('/rest/v1/daily_reports', {
      method: 'POST',
      body: report,
    });

    logger('info', 'Daily report generated', {
      newResponses24h: newResponseCount,
      totalResponses,
      completionRate: `${completionRate}%`,
      provinces: Object.keys(provinceBreakdown),
    });

    return {
      newResponses: newResponseCount,
      totalResponses,
      completedResponses,
      completionRate,
      provinceBreakdown,
    };
  }, { taskName: 'generateDailyReport' });
}

/**
 * Task 7: Trigger weekly database backup via Supabase.
 * Verifies backup completion and logs status.
 * Schedule: Sundays at 2:00 AM PHT.
 */
async function weeklyBackupTrigger() {
  logger('info', 'Starting weekly backup trigger');

  if (CRON_CONFIG.dryRun) {
    logger('info', '[DRY-RUN] Would trigger weekly database backup');
    return { backupId: null, status: 'dry-run', skipped: true };
  }

  return await withRetry(async () => {
    // 1. Trigger backup via Supabase Management API (or Edge Function proxy)
    const backupResult = await fetchWithTimeout(
      `${CRON_CONFIG.supabaseUrl}/functions/v1/trigger-backup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CRON_CONFIG.supabaseServiceKey || CRON_CONFIG.supabaseAnonKey}`,
        },
        body: JSON.stringify({
          type: 'full',
          triggered_by: 'cron-weekly',
          timestamp: new Date().toISOString(),
        }),
      }
    );

    const backupId = backupResult.backupId || backupResult.id || 'unknown';

    // 2. Poll for backup completion (max 5 minutes)
    let verified = false;
    let attempts = 0;
    const maxPollAttempts = 30;

    while (!verified && attempts < maxPollAttempts) {
      await delay(10000); // Wait 10 seconds between polls
      attempts++;

      try {
        const statusResult = await fetchWithTimeout(
          `${CRON_CONFIG.supabaseUrl}/functions/v1/backup-status`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${CRON_CONFIG.supabaseServiceKey || CRON_CONFIG.supabaseAnonKey}`,
            },
            body: JSON.stringify({ backupId }),
          }
        );

        if (statusResult.status === 'completed' || statusResult.status === 'success') {
          verified = true;
        } else if (statusResult.status === 'failed') {
          throw new Error(`Backup ${backupId} failed on server`);
        }
      } catch (err) {
        logger('warn', `Backup status check attempt ${attempts} failed`, { error: err.message });
      }
    }

    // 3. Log backup result
    const backupLog = {
      backup_id: backupId,
      triggered_at: new Date().toISOString(),
      status: verified ? 'completed' : 'pending',
      verified,
      poll_attempts: attempts,
      backup_type: 'weekly-full',
    };

    await supabaseRequest('/rest/v1/backup_logs', {
      method: 'POST',
      body: backupLog,
    });

    logger('info', `Weekly backup ${verified ? 'completed' : 'verification timed out'}`, {
      backupId,
      verified,
      pollAttempts: attempts,
    });

    return { backupId, status: verified ? 'completed' : 'timeout', verified };
  }, { taskName: 'weeklyBackupTrigger' });
}

// ============================================================================
// TASK REGISTRY
// ============================================================================

/**
 * Registry of all scheduled tasks.
 * Each entry defines the cron schedule, handler, and error callback.
 *
 * @constant {Array<Object>} CRON_TASKS
 */
const CRON_TASKS = [
  {
    name: 'syncSurveyResponses',
    schedule: '*/5 * * * *',
    description: 'Sync pending survey responses from localStorage queue to Supabase (every 5 min)',
    timezone: CRON_CONFIG.timezone,
    enabled: process.env.CRON_SYNC_SURVEY !== 'false',
    handler: syncSurveyResponses,
    onError: (err) => logger('error', 'syncSurveyResponses fatal error', { error: err.message }),
  },
  {
    name: 'aggregateAnalytics',
    schedule: '*/15 * * * *',
    description: 'Aggregate survey data: province counts, category distribution, C.A.R.E. scores (every 15 min)',
    timezone: CRON_CONFIG.timezone,
    enabled: process.env.CRON_AGGREGATE !== 'false',
    handler: aggregateAnalytics,
    onError: (err) => logger('error', 'aggregateAnalytics fatal error', { error: err.message }),
  },
  {
    name: 'cleanupExpiredCache',
    schedule: '*/30 * * * *',
    description: 'Clear expired cache entries, temp files, and orphaned sessions (every 30 min)',
    timezone: CRON_CONFIG.timezone,
    enabled: process.env.CRON_CLEANUP !== 'false',
    handler: cleanupExpiredCache,
    onError: (err) => logger('error', 'cleanupExpiredCache fatal error', { error: err.message }),
  },
  {
    name: 'healthCheckPing',
    schedule: '*/10 * * * *',
    description: 'Ping application and Supabase health endpoints (every 10 min)',
    timezone: CRON_CONFIG.timezone,
    enabled: process.env.CRON_HEALTH_CHECK !== 'false',
    handler: healthCheckPing,
    onError: (err) => logger('error', 'healthCheckPing fatal error', { error: err.message }),
  },
  {
    name: 'sendReminderEmails',
    schedule: '0 9 * * *',
    description: 'Send daily reminder emails to incomplete survey respondents at 9:00 AM PHT',
    timezone: CRON_CONFIG.timezone,
    enabled: process.env.CRON_REMINDERS !== 'false',
    handler: sendReminderEmails,
    onError: (err) => logger('error', 'sendReminderEmails fatal error', { error: err.message }),
  },
  {
    name: 'generateDailyReport',
    schedule: '0 6 * * *',
    description: 'Generate daily survey response summary report at 6:00 AM PHT',
    timezone: CRON_CONFIG.timezone,
    enabled: process.env.CRON_DAILY_REPORT !== 'false',
    handler: generateDailyReport,
    onError: (err) => logger('error', 'generateDailyReport fatal error', { error: err.message }),
  },
  {
    name: 'weeklyBackupTrigger',
    schedule: '0 2 * * 0',
    description: 'Trigger weekly database backup on Sundays at 2:00 AM PHT',
    timezone: CRON_CONFIG.timezone,
    enabled: process.env.CRON_WEEKLY_BACKUP !== 'false',
    handler: weeklyBackupTrigger,
    onError: (err) => logger('error', 'weeklyBackupTrigger fatal error', { error: err.message }),
  },
];

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Wraps a task handler with execution tracking, timing, and error handling.
 *
 * @param   {Object}    taskDef - Task definition from CRON_TASKS
 * @returns {Function}  Wrapped async handler
 */
function createWrappedHandler(taskDef) {
  return async function wrappedHandler() {
    if (isShuttingDown) {
      logger('warn', `Task "${taskDef.name}" skipped — shutdown in progress`);
      return;
    }

    const startTime = Date.now();
    const state = taskState.get(taskDef.name) || {};

    // Update state: running
    taskState.set(taskDef.name, {
      ...state,
      status: 'running',
      lastRunStart: new Date().toISOString(),
    });

    logger('info', `Task "${taskDef.name}" started`, { task: taskDef.name });

    try {
      const result = await taskDef.handler();
      const durationMs = Date.now() - startTime;

      // Update state: success
      taskState.set(taskDef.name, {
        ...state,
        status: 'idle',
        lastRunStart: state.lastRunStart,
        lastRunEnd: new Date().toISOString(),
        lastDurationMs: durationMs,
        lastResult: result,
        lastError: null,
        runCount: (state.runCount || 0) + 1,
      });

      logger('info', `Task "${taskDef.name}" completed in ${durationMs}ms`, {
        task: taskDef.name,
        durationMs,
        result,
      });

      return result;
    } catch (err) {
      const durationMs = Date.now() - startTime;

      // Update state: error
      taskState.set(taskDef.name, {
        ...state,
        status: 'error',
        lastRunEnd: new Date().toISOString(),
        lastDurationMs: durationMs,
        lastError: { message: err.message, stack: err.stack, timestamp: new Date().toISOString() },
        errorCount: (state.errorCount || 0) + 1,
      });

      logger('error', `Task "${taskDef.name}" failed after ${durationMs}ms`, {
        task: taskDef.name,
        durationMs,
        error: err.message,
      });

      // Invoke task-specific error handler
      if (typeof taskDef.onError === 'function') {
        try {
          taskDef.onError(err);
        } catch (handlerErr) {
          logger('error', `Error handler for "${taskDef.name}" also failed`, {
            error: handlerErr.message,
          });
        }
      }

      // Re-throw so the caller knows the task failed
      throw err;
    }
  };
}

/**
 * Initializes and starts all enabled cron jobs.
 * Validates schedules before starting. Safe to call multiple times (idempotent).
 *
 * @returns {Object} Summary of started jobs
 */
function initializeCronJobs() {
  if (isInitialized) {
    logger('warn', 'Cron jobs already initialized — skipping');
    return { status: 'already-initialized', started: 0 };
  }

  if (!CRON_CONFIG.enabled) {
    logger('warn', 'Cron scheduler is disabled (CRON_ENABLED=false)');
    return { status: 'disabled', started: 0 };
  }

  logger('info', 'Initializing BIRD cron scheduler', {
    timezone: CRON_CONFIG.timezone,
    dryRun: CRON_CONFIG.dryRun,
    logLevel: CRON_CONFIG.logLevel,
  });

  let startedCount = 0;

  for (const taskDef of CRON_TASKS) {
    // Validate cron expression
    if (!cron.validate(taskDef.schedule)) {
      logger('error', `Invalid cron schedule for task "${taskDef.name}": ${taskDef.schedule}`);
      continue;
    }

    // Check environment-based enable flag
    if (!taskDef.enabled) {
      logger('info', `Task "${taskDef.name}" is disabled via environment variable`);
      taskState.set(taskDef.name, {
        status: 'disabled',
        enabled: false,
        schedule: taskDef.schedule,
        description: taskDef.description,
      });
      continue;
    }

    // Initialize state
    taskState.set(taskDef.name, {
      status: 'idle',
      enabled: true,
      schedule: taskDef.schedule,
      description: taskDef.description,
      runCount: 0,
      errorCount: 0,
    });

    // Create and store the cron job
    const wrappedHandler = createWrappedHandler(taskDef);
    const job = cron.schedule(taskDef.schedule, wrappedHandler, {
      scheduled: true,
      timezone: taskDef.timezone,
    });

    activeJobs.set(taskDef.name, job);
    startedCount++;

    logger('info', `Task "${taskDef.name}" registered — ${taskDef.schedule} (${taskDef.description})`);
  }

  isInitialized = true;

  // Register graceful shutdown handlers
  process.on('SIGTERM', () => stopCronJobs('SIGTERM'));
  process.on('SIGINT', () => stopCronJobs('SIGINT'));

  logger('info', `Cron scheduler initialized: ${startedCount}/${CRON_TASKS.length} tasks active`);

  return {
    status: 'initialized',
    started: startedCount,
    total: CRON_TASKS.length,
    timezone: CRON_CONFIG.timezone,
    dryRun: CRON_CONFIG.dryRun,
  };
}

/**
 * Stops all running cron jobs gracefully.
 * Waits for currently executing tasks to finish (best-effort).
 *
 * @param   {string} [signal] - The shutdown signal that triggered this (SIGTERM, SIGINT)
 * @returns {Object} Summary of stopped jobs
 */
function stopCronJobs(signal) {
  if (isShuttingDown) {
    logger('warn', 'Shutdown already in progress');
    return { status: 'already-shutting-down' };
  }

  isShuttingDown = true;
  logger('info', `Stopping all cron jobs${signal ? ` (signal: ${signal})` : ''}`);

  let stoppedCount = 0;

  for (const [name, job] of activeJobs.entries()) {
    try {
      job.stop();
      const state = taskState.get(name) || {};
      taskState.set(name, { ...state, status: 'stopped' });
      stoppedCount++;
      logger('debug', `Task "${name}" stopped`);
    } catch (err) {
      logger('error', `Failed to stop task "${name}"`, { error: err.message });
    }
  }

  activeJobs.clear();
  isInitialized = false;
  isShuttingDown = false;

  logger('info', `All cron jobs stopped: ${stoppedCount} tasks`);

  return {
    status: 'stopped',
    stopped: stoppedCount,
    signal: signal || null,
  };
}

/**
 * Returns the current status of all registered tasks including
 * last run time, next scheduled run, enabled state, and any errors.
 *
 * @returns {Object} Status object with tasks array and summary
 */
function getTaskStatus() {
  const tasks = [];
  let runningCount = 0;
  let errorCount = 0;
  let disabledCount = 0;

  for (const taskDef of CRON_TASKS) {
    const state = taskState.get(taskDef.name) || {};

    if (state.status === 'running') runningCount++;
    if (state.lastError) errorCount++;
    if (state.enabled === false) disabledCount++;

    // Compute next run using the schedule
    let nextRun = null;
    try {
      // Simple next-run estimation based on the cron pattern
      // node-cron doesn't expose nextRun directly, so we provide the schedule
      nextRun = `Scheduled per "${taskDef.schedule}"`;
    } catch {
      nextRun = 'Unknown';
    }

    tasks.push({
      name: taskDef.name,
      schedule: taskDef.schedule,
      description: taskDef.description,
      enabled: state.enabled !== false && taskDef.enabled,
      status: state.status || 'unknown',
      lastRunStart: state.lastRunStart || null,
      lastRunEnd: state.lastRunEnd || null,
      lastDurationMs: state.lastDurationMs || null,
      lastError: state.lastError || null,
      runCount: state.runCount || 0,
      errorCount: state.errorCount || 0,
      nextRun,
    });
  }

  return {
    summary: {
      total: CRON_TASKS.length,
      running: runningCount,
      errors: errorCount,
      disabled: disabledCount,
      healthy: errorCount === 0 && runningCount >= 0,
      initialized: isInitialized,
      dryRun: CRON_CONFIG.dryRun,
      timezone: CRON_CONFIG.timezone,
    },
    tasks,
    config: {
      enabled: CRON_CONFIG.enabled,
      logLevel: CRON_CONFIG.logLevel,
      maxRetries: CRON_CONFIG.maxRetries,
      retryDelayMs: CRON_CONFIG.retryDelayMs,
    },
  };
}

/**
 * Manually triggers a task by name, bypassing the cron schedule.
 * Useful for testing or ad-hoc execution.
 *
 * @param   {string}  taskName - Name of the task to run (must match CRON_TASKS entry)
 * @returns {Promise<*>}      Task result
 * @throws  {Error} If task not found or not enabled
 */
async function runTaskNow(taskName) {
  const taskDef = CRON_TASKS.find((t) => t.name === taskName);

  if (!taskDef) {
    throw new Error(`Task "${taskName}" not found. Available: ${CRON_TASKS.map((t) => t.name).join(', ')}`);
  }

  if (!taskDef.enabled) {
    throw new Error(`Task "${taskName}" is disabled via environment variable`);
  }

  logger('info', `Manually triggering task "${taskName}"`);

  const wrappedHandler = createWrappedHandler(taskDef);
  return await wrappedHandler();
}

// ============================================================================
// IMMEDIATE EXPORTS & MODULE INTERFACE
// ============================================================================

module.exports = {
  /** Start all enabled scheduled tasks */
  initializeCronJobs,

  /** Stop all running tasks gracefully */
  stopCronJobs,

  /** Return status of all tasks (last run, next run, enabled, last error) */
  getTaskStatus,

  /** Manually trigger a task by name */
  runTaskNow,

  /** Registry of all task definitions */
  CRON_TASKS,

  /** Configuration object (read-only reference) */
  CRON_CONFIG,

  // ─── Advanced / Testing Exports ──────────────────────────────────────────

  /** Access internal task state (for debugging / health endpoints) */
  _taskState: taskState,

  /** Access active job instances (for advanced control) */
  _activeJobs: activeJobs,

  /** Direct access to logger utility */
  logger,

  /** Direct access to retry wrapper */
  withRetry,

  /** Direct access to Supabase request helper */
  supabaseRequest,
};

// ─── Auto-initialize if this file is executed directly ─────────────────────
if (require.main === module) {
  logger('info', 'cron.js executed directly — auto-initializing');
  initializeCronJobs();
}
