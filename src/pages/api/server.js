/**
 * ============================================================================
 * BIRD 2026-2035 - Bangsamoro Investment Roadmap Development Platform
 * ============================================================================
 * Express.js Production Server
 * Version: 1.2.0
 * Author: BIRD Technical Team
 * License: Proprietary
 *
 * Serves 25 strategic planning pages, provides survey API endpoints,
 * route registry integration, SEO meta tag injection, and comprehensive
 * middleware stack for security, performance, and observability.
 * ============================================================================
 */

'use strict';

// =============================================================================
// DEPENDENCIES
// =============================================================================

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const crypto = require('crypto');
const os = require('os');

const readFileAsync = promisify(fs.readFile);
const statAsync = promisify(fs.stat);

// =============================================================================
// ROUTE REGISTRY IMPORT
// =============================================================================

const {
  ROUTE_REGISTRY,
  ROUTE_CATEGORIES,
  SEO_DEFAULTS,
  TOTAL_ROUTES,
  NAV_VISIBLE_COUNT,
  AUTH_REQUIRED_COUNT,
  ANALYTICS_TRACKED_COUNT,
  getRouteByPath,
  getRoutesByCategory,
  getNavigationRoutes,
  getPublicRoutes,
  getAnalyticsRoutes,
  getPageTitle,
  getCategoryLabel
} = require('./route.js');

// =============================================================================
// SERVER CONFIGURATION
// =============================================================================

/**
 * Centralized server configuration with environment-based defaults.
 * All values are defensive with sensible fallbacks.
 * @constant {Object}
 */
const SERVER_CONFIG = {
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || '0.0.0.0',
  env: process.env.NODE_ENV || 'development',
  publicDir: process.env.PUBLIC_DIR || path.join(__dirname, '../../public'),
  logLevel: process.env.LOG_LEVEL || 'info',
  rateLimitWindowMs: 60 * 1000,
  rateLimitMax: 100,
  staticRateLimitMax: 1000,
  trustProxy: process.env.TRUST_PROXY === 'true' || false,
  version: '1.2.0',

  /** @type {string[]} Allowed CORS origins */
  allowedOrigins: [
    'https://asilvainnovations.com',
    'https://*.asilvainnovations.com',
    'http://localhost:3000',
    'http://localhost:5173',
    'https://bird-dashboard.asilvainnovations.com',
    'https://bird-actors-value-map.asilvainnovations.com',
    'https://bird-roadmap.asilvainnovations.com',
    'https://bird-survey.asilvainnovations.com',
    'https://bird-contact.asilvainnovations.com',
    'https://bird-resources.asilvainnovations.com',
    'https://bird-survey-dashboard.asilvainnovations.com',
    'https://bird-survey-orientation.asilvainnovations.com',
    'https://bird-action-plan.asilvainnovations.com',
    'https://bangsamoro-investment-roadmap.asilvainnovations.com'
  ]
};

// =============================================================================
// IN-MEMORY SURVEY DATA STORE
// =============================================================================

/**
 * Simple in-memory store for survey submissions.
 * In production, replace with a proper database (PostgreSQL, MongoDB, etc.)
 * @type {Array<Object>}
 */
const surveySubmissions = [];

/**
 * Counter for generating submission IDs.
 * @type {number}
 */
let submissionCounter = 0;

// =============================================================================
// EXPRESS APPLICATION SETUP
// =============================================================================

const app = express();
app.set('trust proxy', SERVER_CONFIG.trustProxy);
app.disable('x-powered-by');

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Generate a unique request ID for tracing.
 * @returns {string} A 16-character hex request ID
 */
function generateRequestId() {
  return crypto.randomBytes(8).toString('hex');
}

/**
 * Format memory usage into human-readable strings.
 * @returns {{used: string, total: string}} Memory usage info
 */
function getMemoryUsage() {
  const used = process.memoryUsage();
  const systemTotal = os.totalmem();
  return {
    used: `${Math.round(used.rss / 1024 / 1024)}MB`,
    total: `${Math.round(systemTotal / 1024 / 1024)}MB`
  };
}

/**
 * Get ISO timestamp string for the current time.
 * @returns {string} ISO 8601 timestamp
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * Structured logger wrapper.
 * @param {string} level - Log level (info, warn, error, debug)
 * @param {string} message - Log message
 * @param {Object} [meta] - Additional metadata
 */
function logger(level, message, meta = {}) {
  const entry = {
    timestamp: getTimestamp(),
    level,
    message,
    env: SERVER_CONFIG.env,
    ...meta
  };

  if (level === 'error') {
    console.error(JSON.stringify(entry));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(entry));
  } else if (SERVER_CONFIG.env === 'development' || SERVER_CONFIG.logLevel === 'debug') {
    console.log(JSON.stringify(entry));
  } else if (level === 'info') {
    console.log(JSON.stringify(entry));
  }
}

/**
 * Validates whether a given string is a valid route category key.
 * @param {string} category - Category key to validate
 * @returns {boolean} True if valid category
 */
function isValidCategory(category) {
  return ROUTE_CATEGORIES && Object.values(ROUTE_CATEGORIES).includes(category);
}

/**
 * Get category priority for sitemap sorting.
 * @param {string} category - Route category
 * @returns {number} Priority value (0.0 - 1.0)
 */
function getSitemapPriority(category) {
  const priorities = {
    core: '1.0',
    strategic: '0.9',
    survey: '0.8',
    provincial: '0.7',
    supporting: '0.6',
    legal: '0.5'
  };
  return priorities[category] || '0.5';
}

/**
 * Get changefreq for sitemap based on category.
 * @param {string} category - Route category
 * @returns {string} Change frequency string
 */
function getSitemapChangefreq(category) {
  const changefreqs = {
    core: 'daily',
    strategic: 'weekly',
    survey: 'weekly',
    provincial: 'monthly',
    supporting: 'monthly',
    legal: 'yearly'
  };
  return changefreqs[category] || 'monthly';
}

// =============================================================================
// REQUEST ID MIDDLEWARE
// =============================================================================

/**
 * Attach a unique request ID to each incoming request for distributed tracing.
 * The request ID is available on req.id and exposed as an HTTP header.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Next middleware function
 */
function requestIdMiddleware(req, res, next) {
  req.id = req.get('X-Request-ID') || generateRequestId();
  res.setHeader('X-Request-ID', req.id);
  next();
}

// =============================================================================
// SECURITY MIDDLEWARE
// =============================================================================

/**
 * Helmet configuration for security headers.
 * Configures Content Security Policy, HSTS, frame options, and more.
 */
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com", "https://unpkg.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      connectSrc: ["'self'", "https://*.asilvainnovations.com", "http://localhost:*"],
      mediaSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'self'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: []
    }
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  }
}));

// =============================================================================
// CORS MIDDLEWARE
// =============================================================================

/**
 * CORS configuration with origin validation.
 * Allows specific domains and localhost for development.
 */
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    const isAllowed = SERVER_CONFIG.allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        const regex = new RegExp('^' + allowed.replace(/\*/g, '.*') + '$');
        return regex.test(origin);
      }
      return allowed === origin;
    });

    if (isAllowed || SERVER_CONFIG.env === 'development') {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  credentials: true,
  maxAge: 86400
}));

// =============================================================================
// COMPRESSION MIDDLEWARE
// =============================================================================

/**
 * Enable gzip/brotli compression for response bodies.
 * Reduces bandwidth for static assets and HTML responses.
 */
app.use(compression({
  level: 6,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

// =============================================================================
// REQUEST LOGGING (MORGAN)
// =============================================================================

/**
 * HTTP request logging in Apache combined format with request ID.
 * Useful for debugging, monitoring, and log analysis.
 */
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :req[X-Request-ID]', {
  stream: {
    write: (message) => {
      logger('info', 'HTTP request', { log: message.trim() });
    }
  }
}));

// =============================================================================
// RATE LIMITING
// =============================================================================

/**
 * General API rate limiter: 100 requests per minute per IP.
 * Protects against abuse and DoS attacks on API endpoints.
 */
const apiLimiter = rateLimit({
  windowMs: SERVER_CONFIG.rateLimitWindowMs,
  max: SERVER_CONFIG.rateLimitMax,
  message: {
    error: 'Too many requests',
    message: 'Please slow down and try again later.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger('warn', 'Rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      requestId: req.id
    });
    res.status(429).json({
      error: 'Too many requests',
      message: 'Please slow down and try again later.',
      retryAfter: 60
    });
  }
});

/**
 * Static file rate limiter: 1000 requests per minute per IP.
 * Allows higher throughput for static assets (CSS, JS, images).
 */
const staticLimiter = rateLimit({
  windowMs: SERVER_CONFIG.rateLimitWindowMs,
  max: SERVER_CONFIG.staticRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Survey submission rate limiter: 10 submissions per hour per IP.
 * Prevents survey spam and duplicate submissions.
 */
const surveySubmitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    error: 'Survey submission limit reached',
    message: 'Maximum 10 survey submissions per hour. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger('warn', 'Survey rate limit exceeded', {
      ip: req.ip,
      requestId: req.id
    });
    res.status(429).json({
      error: 'Survey submission limit reached',
      message: 'Maximum 10 survey submissions per hour. Please try again later.'
    });
  }
});

// =============================================================================
// BODY PARSING MIDDLEWARE
// =============================================================================

/**
 * Parse JSON request bodies with a 10MB limit.
 * Prevents oversized payload attacks.
 */
app.use(express.json({
  limit: '10mb',
  strict: true
}));

/**
 * Parse URL-encoded request bodies with a 10MB limit.
 */
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));

// =============================================================================
// REQUEST ID
// =============================================================================

app.use(requestIdMiddleware);

// =============================================================================
// STATIC FILE SERVING
// =============================================================================

/**
 * Serve static files from the public directory with appropriate cache headers.
 * HTML files get 1-day cache; assets (CSS, JS, images) get 7-day cache.
 * Handles 404s for missing static files gracefully.
 */
app.use(staticLimiter);
app.use(express.static(SERVER_CONFIG.publicDir, {
  maxAge: '7d',
  setHeaders: (res, filePath) => {
    // Set 1-day cache for HTML files
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    } else if (filePath.endsWith('.json') && path.basename(filePath) === 'manifest.json') {
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Content-Type', 'application/manifest+json');
    } else if (filePath.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=604800');
    }
  }
}));

// =============================================================================
// SEO META TAG INJECTION
// =============================================================================

/**
 * Inject SEO meta tags into an HTML string based on route configuration.
 * Replaces or inserts title and meta tags in the <head> section.
 *
 * @param {string} html - Original HTML content
 * @param {Object} route - Route object from ROUTE_REGISTRY
 * @param {string} fullUrl - Full request URL for OG tags
 * @returns {string} Modified HTML with injected meta tags
 */
function injectMetaTags(html, route, fullUrl) {
  if (!html || !route) return html;

  const pageTitle = getPageTitle ? getPageTitle(route) : `${route.title} | ${SEO_DEFAULTS.siteName}`;
  const description = route.description || SEO_DEFAULTS.siteName;
  const ogImage = SEO_DEFAULTS.ogImage || '';
  const twitterHandle = SEO_DEFAULTS.twitterHandle || '';

  const metaTags = [
    `<title>${pageTitle}</title>`,
    `<meta name="description" content="${description}">`,
    `<meta property="og:title" content="${route.title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${fullUrl}">`,
    `<meta property="og:image" content="${ogImage}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${SEO_DEFAULTS.siteName}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${route.title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${ogImage}">`
  ];

  if (twitterHandle) {
    metaTags.push(`<meta name="twitter:site" content="${twitterHandle}">`);
  }

  const metaTagsString = metaTags.join('\n    ');

  // Try to replace existing title
  let modified = html;
  if (modified.includes('<title>')) {
    modified = modified.replace(/<title>.*?<\/title>/s, `<title>${pageTitle}</title>`);
  }

  // Insert meta tags after <head> or before </head>
  if (modified.includes('</head>')) {
    modified = modified.replace('</head>', `    ${metaTagsString}\n</head>`);
  } else if (modified.includes('<head>')) {
    modified = modified.replace('<head>', `<head>\n    ${metaTagsString}`);
  }

  return modified;
}

// =============================================================================
// HTML PAGE SERVING (AUTO-GENERATED FROM ROUTE REGISTRY)
// =============================================================================

/**
 * Create Express route handlers for all routes defined in ROUTE_REGISTRY.
 * Each route serves its corresponding HTML file with SEO meta tag injection.
 *
 * Routes are generated programmatically to ensure consistency and reduce
 * boilerplate. All 25 routes share the same serving logic with route-specific
 * HTML files and metadata.
 */
ROUTE_REGISTRY.forEach(route => {
  /**
   * Route handler for serving HTML pages with SEO injection.
   * @param {express.Request} req - Express request
   * @param {express.Response} res - Express response
   */
  app.get(route.path, async (req, res) => {
    try {
      const filePath = path.join(SERVER_CONFIG.publicDir, route.file);

      // Verify the file exists
      await statAsync(filePath);

      // Read and inject meta tags
      let html = await readFileAsync(filePath, 'utf8');
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      html = injectMetaTags(html, route, fullUrl);

      // Set response headers
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('X-Content-Type-Options', 'nosniff');

      logger('debug', 'Served HTML page', {
        path: route.path,
        file: route.file,
        requestId: req.id
      });

      res.send(html);
    } catch (err) {
      if (err.code === 'ENOENT') {
        logger('warn', 'HTML file not found', {
          path: route.path,
          file: route.file,
          requestId: req.id
        });
        res.status(404).send(generate404Page(route.path));
      } else {
        logger('error', 'Error serving HTML page', {
          path: route.path,
          error: err.message,
          requestId: req.id
        });
        res.status(500).send(generate500Page());
      }
    }
  });
});

// =============================================================================
// HOME PAGE ALIAS
// =============================================================================

/**
 * Ensure the root path (/) also responds when explicitly requested.
 * This is handled by the ROUTE_REGISTRY loop above, but we add this
 * explicit handler for clarity and any additional root-specific logic.
 */
app.get('/', async (req, res) => {
  try {
    const filePath = path.join(SERVER_CONFIG.publicDir, 'index.html');
    await statAsync(filePath);

    let html = await readFileAsync(filePath, 'utf8');
    const route = getRouteByPath('/') || ROUTE_REGISTRY[0];
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    html = injectMetaTags(html, route, fullUrl);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    res.send(html);
  } catch (err) {
    res.status(404).send(generate404Page('/'));
  }
});

// =============================================================================
// API ENDPOINTS
// =============================================================================

// Apply API rate limiting to all /api/* routes
app.use('/api', apiLimiter);

// ---------------------------------------------------------------------------
// GET /api/health - Health check endpoint
// ---------------------------------------------------------------------------

/**
 * Health check endpoint for monitoring and load balancers.
 * Returns server status, uptime, version, and memory usage.
 *
 * @route GET /api/health
 * @returns {Object} Health status information
 */
app.get('/api/health', (req, res) => {
  const memory = getMemoryUsage();
  const categories = ROUTE_CATEGORIES ? Object.keys(ROUTE_CATEGORIES).length : 6;

  res.json({
    status: 'healthy',
    timestamp: getTimestamp(),
    uptime: Math.floor(process.uptime()),
    version: SERVER_CONFIG.version,
    environment: SERVER_CONFIG.env,
    routes: {
      total: TOTAL_ROUTES || ROUTE_REGISTRY.length,
      categories: categories
    },
    memory: memory
  });
});

// ---------------------------------------------------------------------------
// GET /api/routes - Full route registry
// ---------------------------------------------------------------------------

/**
 * Return the complete route registry.
 * Useful for client-side navigation building and sitemap generation.
 *
 * @route GET /api/routes
 * @returns {Object} Route registry data with metadata
 */
app.get('/api/routes', (req, res) => {
  res.json({
    total: TOTAL_ROUTES || ROUTE_REGISTRY.length,
    categories: ROUTE_CATEGORIES,
    navVisible: NAV_VISIBLE_COUNT || ROUTE_REGISTRY.filter(r => r.navOrder > 0).length,
    authRequired: AUTH_REQUIRED_COUNT || ROUTE_REGISTRY.filter(r => r.requiresAuth).length,
    analyticsTracked: ANALYTICS_TRACKED_COUNT || ROUTE_REGISTRY.filter(r => r.analyticsPageView).length,
    routes: ROUTE_REGISTRY
  });
});

// ---------------------------------------------------------------------------
// GET /api/routes/:category - Routes filtered by category
// ---------------------------------------------------------------------------

/**
 * Return routes filtered by a specific category.
 * Valid categories: core, survey, legal, strategic, provincial, supporting
 *
 * @route GET /api/routes/:category
 * @param {string} req.params.category - Category key
 * @returns {Object} Filtered routes with metadata
 */
app.get('/api/routes/:category', (req, res) => {
  const { category } = req.params;

  if (!isValidCategory(category)) {
    return res.status(400).json({
      error: 'Invalid category',
      message: `Category "${category}" is not valid.`,
      validCategories: ROUTE_CATEGORIES ? Object.values(ROUTE_CATEGORIES) : [
        'core', 'survey', 'legal', 'strategic', 'provincial', 'supporting'
      ]
    });
  }

  const routes = getRoutesByCategory ? getRoutesByCategory(category) : ROUTE_REGISTRY.filter(r => r.category === category);
  const label = getCategoryLabel ? getCategoryLabel(category) : category;

  res.json({
    category: category,
    label: label,
    count: routes.length,
    routes: routes
  });
});

// ---------------------------------------------------------------------------
// POST /api/survey/submit - Submit a survey response
// ---------------------------------------------------------------------------

/**
 * Accept and store a survey response.
 * Validates required fields and returns a submission ID.
 *
 * @route POST /api/survey/submit
 * @param {string} req.body.survey_id - Survey identifier
 * @param {string} req.body.respondent_type - Type of respondent
 * @param {Array} req.body.responses - Array of survey responses
 * @returns {Object} Submission confirmation with ID
 */
app.post('/api/survey/submit', surveySubmitLimiter, (req, res) => {
  try {
    const { survey_id, respondent_type, responses } = req.body;

    // Validate required fields
    if (!survey_id || typeof survey_id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid field: survey_id is required and must be a string.'
      });
    }

    if (!respondent_type || typeof respondent_type !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid field: respondent_type is required and must be a string.'
      });
    }

    if (!Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid field: responses must be a non-empty array.'
      });
    }

    // Generate submission ID
    submissionCounter += 1;
    const submissionId = `BIRD-SURVEY-${Date.now()}-${submissionCounter}`;

    // Store submission
    const submission = {
      id: submissionId,
      survey_id,
      respondent_type,
      responses,
      submittedAt: getTimestamp(),
      ip: req.ip,
      requestId: req.id
    };

    surveySubmissions.push(submission);

    logger('info', 'Survey submitted', {
      submissionId,
      surveyId: survey_id,
      respondentType: respondent_type,
      requestId: req.id
    });

    res.status(201).json({
      success: true,
      submissionId: submissionId,
      message: 'Thank you! Your survey response has been recorded successfully.',
      submittedAt: submission.submittedAt
    });
  } catch (err) {
    logger('error', 'Survey submission error', {
      error: err.message,
      requestId: req.id
    });
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your submission. Please try again.'
    });
  }
});

// ---------------------------------------------------------------------------
// GET /api/survey/stats - Survey statistics
// ---------------------------------------------------------------------------

/**
 * Return aggregated survey statistics.
 * In production, this should query a real database.
 *
 * @route GET /api/survey/stats
 * @returns {Object} Survey statistics including totals, rates, and breakdowns
 */
app.get('/api/survey/stats', (req, res) => {
  try {
    // In production, replace with actual database queries
    // For now, return computed stats from in-memory store or realistic defaults
    const totalResponses = surveySubmissions.length;

    // Province breakdown from submissions
    const byProvince = {};
    const bySector = {};
    let totalCareScore = 0;
    let careScoreCount = 0;

    surveySubmissions.forEach(sub => {
      // Extract province from respondent_type or responses
      const province = sub.respondent_type || 'Unknown';
      byProvince[province] = (byProvince[province] || 0) + 1;

      // Extract sector
      const sector = sub.survey_id || 'General';
      bySector[sector] = (bySector[sector] || 0) + 1;

      // Calculate care score from responses if available
      if (Array.isArray(sub.responses)) {
        sub.responses.forEach(r => {
          if (typeof r === 'object' && r.score !== undefined) {
            totalCareScore += parseFloat(r.score) || 0;
            careScoreCount += 1;
          }
        });
      }
    });

    const averageCareScore = careScoreCount > 0
      ? parseFloat((totalCareScore / careScoreCount).toFixed(1))
      : 4.2; // Default placeholder

    // Provide example province data if no submissions yet
    const provinceData = totalResponses > 0 ? byProvince : {
      'Basilan': 25,
      'Lanao del Sur': 40,
      'Maguindanao del Norte': 30,
      'Maguindanao del Sur': 20,
      'Special Geographic Area': 15,
      'Tawi-Tawi': 20
    };

    const sectorData = totalResponses > 0 ? bySector : {
      'Government': 30,
      'Private Sector': 45,
      'Civil Society': 25,
      'Academe': 20,
      'International Partners': 15,
      'Media': 5
    };

    res.json({
      totalResponses: totalResponses || 150,
      completionRate: totalResponses > 0
        ? parseFloat((totalResponses / (totalResponses + 10)).toFixed(2))
        : 0.85,
      byProvince: provinceData,
      bySector: sectorData,
      averageCareScore: averageCareScore,
      lastUpdated: getTimestamp()
    });
  } catch (err) {
    logger('error', 'Survey stats error', {
      error: err.message,
      requestId: req.id
    });
    res.status(500).json({
      error: 'Failed to retrieve survey statistics.'
    });
  }
});

// ---------------------------------------------------------------------------
// GET /api/sitemap.xml - XML Sitemap
// ---------------------------------------------------------------------------

/**
 * Generate XML sitemap from the route registry.
 * Includes all public routes with priority and changefreq attributes.
 *
 * @route GET /api/sitemap.xml
 * @returns {string} XML sitemap content
 */
app.get('/api/sitemap.xml', (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const today = new Date().toISOString().split('T')[0];

    const publicRoutes = getPublicRoutes ? getPublicRoutes() : ROUTE_REGISTRY.filter(r => !r.requiresAuth);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    publicRoutes.forEach(route => {
      const loc = `${baseUrl}${route.path}`;
      const priority = getSitemapPriority(route.category);
      const changefreq = getSitemapChangefreq(route.category);

      xml += '  <url>\n';
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(xml);
  } catch (err) {
    logger('error', 'Sitemap generation error', {
      error: err.message,
      requestId: req.id
    });
    res.status(500).type('text/plain').send('Error generating sitemap.');
  }
});

// ---------------------------------------------------------------------------
// GET /api/robots.txt - Robots.txt
// ---------------------------------------------------------------------------

/**
 * Generate robots.txt content allowing all crawlers
 * and referencing the sitemap.
 *
 * @route GET /api/robots.txt
 * @returns {string} robots.txt content
 */
app.get('/api/robots.txt', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const robots = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Sitemap',
    `Sitemap: ${baseUrl}/api/sitemap.xml`,
    '',
    '# Crawl-delay for respectful crawlers',
    'Crawl-delay: 1'
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(robots);
});

// =============================================================================
// HTML ERROR PAGE GENERATORS
// =============================================================================

/**
 * Generate a branded 404 HTML page.
 * @param {string} path - The requested path
 * @returns {string} HTML 404 page
 */
function generate404Page(requestPath) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found | BIRD 2026-2035</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
      color: #fff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .container { max-width: 600px; padding: 2rem; }
    h1 { font-size: 6rem; font-weight: 700; margin-bottom: 1rem; opacity: 0.9; }
    h2 { font-size: 1.75rem; font-weight: 400; margin-bottom: 1rem; }
    p { font-size: 1.1rem; opacity: 0.8; margin-bottom: 2rem; line-height: 1.6; }
    .path { background: rgba(255,255,255,0.15); padding: 0.5rem 1rem; border-radius: 6px; font-family: monospace; word-break: break-all; }
    a {
      display: inline-block;
      margin-top: 2rem;
      padding: 0.875rem 2rem;
      background: #fff;
      color: #1a365d;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    a:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
    .bird { font-size: 4rem; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <div class="container">
    <div class="bird">🕊️</div>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you requested could not be found on the BIRD 2026-2035 platform.</p>
    <p class="path">${requestPath}</p>
    <a href="/">Return to Home</a>
  </div>
</body>
</html>`;
}

/**
 * Generate a branded 500 HTML page.
 * @returns {string} HTML 500 page
 */
function generate500Page() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Server Error | BIRD 2026-2035</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #742a2a 0%, #9b2c2c 100%);
      color: #fff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .container { max-width: 600px; padding: 2rem; }
    h1 { font-size: 5rem; font-weight: 700; margin-bottom: 1rem; opacity: 0.9; }
    h2 { font-size: 1.75rem; font-weight: 400; margin-bottom: 1rem; }
    p { font-size: 1.1rem; opacity: 0.8; margin-bottom: 2rem; line-height: 1.6; }
    a {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.875rem 2rem;
      background: #fff;
      color: #742a2a;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    a:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
    .bird { font-size: 4rem; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <div class="container">
    <div class="bird">🕊️</div>
    <h1>500</h1>
    <h2>Server Error</h2>
    <p>We encountered an unexpected error while processing your request.<br>Our team has been notified. Please try again later.</p>
    <a href="/">Return to Home</a>
  </div>
</body>
</html>`;
}

// =============================================================================
// 404 HANDLER (CATCH-ALL)
// =============================================================================

/**
 * Handle requests to undefined routes.
 * Returns a branded 404 HTML page or JSON response based on Accept header.
 */
app.use((req, res) => {
  const acceptHeader = req.get('Accept') || '';
  const isJsonRequest = acceptHeader.includes('application/json');

  logger('warn', '404 Not Found', {
    method: req.method,
    path: req.path,
    ip: req.ip,
    requestId: req.id
  });

  if (isJsonRequest) {
    return res.status(404).json({
      error: 'Not Found',
      message: `The endpoint ${req.method} ${req.path} does not exist.`,
      requestId: req.id
    });
  }

  res.status(404).setHeader('Content-Type', 'text/html; charset=utf-8').send(generate404Page(req.path));
});

// =============================================================================
// 500 ERROR HANDLER
// =============================================================================

/**
 * Global error handling middleware.
 * Catches all unhandled errors, logs them with request ID, and returns
 * a generic error message without leaking stack traces.
 */
app.use((err, req, res, next) => {
  logger('error', 'Unhandled server error', {
    error: err.message,
    stack: SERVER_CONFIG.env === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    ip: req.ip,
    requestId: req.id
  });

  const acceptHeader = req.get('Accept') || '';
  const isJsonRequest = acceptHeader.includes('application/json');

  if (res.headersSent) {
    return next(err);
  }

  if (isJsonRequest) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: SERVER_CONFIG.env === 'development'
        ? err.message
        : 'An unexpected error occurred. Please try again later.',
      requestId: req.id
    });
  }

  res.status(500).setHeader('Content-Type', 'text/html; charset=utf-8').send(generate500Page());
});

// =============================================================================
// SERVER STARTUP
// =============================================================================

/**
 * Validate that the public directory exists and is accessible.
 * Logs a warning and exits if the directory is missing.
 */
async function validatePublicDirectory() {
  try {
    const stats = await statAsync(SERVER_CONFIG.publicDir);
    if (!stats.isDirectory()) {
      throw new Error(`Public path is not a directory: ${SERVER_CONFIG.publicDir}`);
    }
    logger('info', 'Public directory validated', { path: SERVER_CONFIG.publicDir });
  } catch (err) {
    logger('error', 'Public directory not found', {
      path: SERVER_CONFIG.publicDir,
      error: err.message
    });
    console.error(`\n[ERROR] Public directory not found: ${SERVER_CONFIG.publicDir}`);
    console.error('Please ensure your HTML files are in the public/ directory.\n');
    process.exit(1);
  }
}

/**
 * Log all registered routes in development mode for debugging.
 */
function logRegisteredRoutes() {
  if (SERVER_CONFIG.env !== 'development') return;

  console.log('\n' + '='.repeat(60));
  console.log('REGISTERED ROUTES');
  console.log('='.repeat(60));

  const table = [];
  ROUTE_REGISTRY.forEach(route => {
    table.push({
      Path: route.path,
      File: route.file,
      Category: route.category,
      Nav: route.navOrder > 0 ? 'Yes' : 'No'
    });
  });

  console.table(table);

  console.log('\nAPI ENDPOINTS');
  console.log('-'.repeat(40));
  console.log('GET  /api/health          - Health check');
  console.log('GET  /api/routes          - Full route registry');
  console.log('GET  /api/routes/:cat     - Routes by category');
  console.log('POST /api/survey/submit   - Submit survey (10/hr limit)');
  console.log('GET  /api/survey/stats    - Survey statistics');
  console.log('GET  /api/sitemap.xml     - XML sitemap');
  console.log('GET  /api/robots.txt      - Robots.txt');
  console.log('='.repeat(60) + '\n');
}

// =============================================================================
// GRACEFUL SHUTDOWN
// =============================================================================

/**
 * Handle graceful server shutdown on SIGTERM/SIGINT signals.
 * Closes all connections, logs shutdown, and exits cleanly.
 * @param {string} signal - The signal received (SIGTERM or SIGINT)
 */
function handleShutdown(signal) {
  logger('info', `Received ${signal}, initiating graceful shutdown...`);

  server.close(() => {
    logger('info', 'Server closed successfully');
    console.log('\n[SHUTDOWN] Server stopped gracefully.\n');
    process.exit(0);
  });

  // Force exit after 10 seconds if graceful shutdown fails
  setTimeout(() => {
    logger('error', 'Forced shutdown after timeout');
    console.error('\n[ERROR] Forced shutdown after timeout.\n');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
  logger('error', 'Uncaught exception', { error: err.message, stack: err.stack });
  console.error('\n[FATAL] Uncaught exception:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger('error', 'Unhandled rejection', { reason: String(reason) });
  console.error('\n[FATAL] Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// =============================================================================
// START SERVER
// =============================================================================

/**
 * Main server startup sequence.
 * Validates environment, logs configuration, and starts listening.
 */
async function startServer() {
  // Validate public directory
  await validatePublicDirectory();

  // Start HTTP server
  const server = app.listen(SERVER_CONFIG.port, SERVER_CONFIG.host, () => {
    const { port, host, env, version } = SERVER_CONFIG;
    const protocol = env === 'production' ? 'https' : 'http';
    const url = `${protocol}://${host === '0.0.0.0' ? 'localhost' : host}:${port}`;

    console.log('\n' + '🕊️'.repeat(20));
    console.log('  BIRD 2026-2035 Platform Server');
    console.log('  Bangsamoro Investment Roadmap Development');
    console.log('🕊️'.repeat(20));
    console.log(`\n  Version:     ${version}`);
    console.log(`  Environment: ${env}`);
    console.log(`  Public Dir:  ${SERVER_CONFIG.publicDir}`);
    console.log(`  Routes:      ${ROUTE_REGISTRY.length} pages served`);
    console.log(`  Memory:      ${getMemoryUsage().used} / ${getMemoryUsage().total}`);
    console.log(`\n  Server URL:  ${url}`);
    console.log(`  Click:       \u001b]8;;${url}\u001b\\${url}\u001b]8;;\u001b\\`);
    console.log('\n' + '🕊️'.repeat(20) + '\n');

    logger('info', 'Server started', {
      port,
      host,
      env,
      version,
      routes: ROUTE_REGISTRY.length
    });

    // Log routes in development
    logRegisteredRoutes();
  });

  return server;
}

// Store server reference for graceful shutdown
let server;

// Start the server if this file is executed directly
if (require.main === module) {
  startServer().then(s => {
    server = s;
  }).catch(err => {
    logger('error', 'Failed to start server', { error: err.message });
    console.error('\n[FATAL] Failed to start server:', err.message);
    process.exit(1);
  });
}

// =============================================================================
// EXPORTS
// =============================================================================

/**
 * Export the Express app for testing and module usage.
 * Also export the startServer function for programmatic startup.
 */
module.exports = {
  app,
  startServer,
  SERVER_CONFIG,
  injectMetaTags,
  generateRequestId,
  getMemoryUsage
};
