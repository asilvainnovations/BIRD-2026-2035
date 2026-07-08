// netlify/functions/submit.js
const crypto = require('crypto');

const GITHUB_OWNER = 'asilvainnovations';
const GITHUB_REPO = 'BIRD-2026-2035';
const GITHUB_BRANCH = 'main';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://bird-survey.asilvainnovations.com';

function validateSurveyData(data) {
    const errors = [];
    if (!data.demographics?.category) errors.push('Stakeholder category is required');
    if (!data.demographics?.province) errors.push('Province is required');
    if (!data.responses?.section1_beie?.understanding) errors.push('Section 1: Framework understanding is required');
    if (!data.responses?.section8_options?.strategy) errors.push('Section 8: Strategy selection is required');
    if (!data.consent) errors.push('Consent is required to submit');

    // STEP 4: Numeric Range Validation (1-5) for Likert scales
    const likertPaths = [
        'section1_beie.understanding', 'section1_beie.relevance',
        'section2_mg.importance', 'section2_mg.implementation',
        'section3_foundations.feasibility', 'section3_foundations.el_nino_impact',
        'section3_foundations.el_nino_likelihood', 'section4_transformers.halal_park',
        'section5_enablers.infra_rating', 'section6_connectors.bimpeaga_importance',
        'section7_financiers.criticality', 'section8_options.sequencing',
        'section9_budget.realism', 'section10_targets.ambition',
        'section11_equity.affirmative', 'section12_climate.green_priority',
        'section13_policy.bicc', 'section16_care.context', 'section16_care.overall'
    ];

    const getNestedValue = (obj, path) => path.split('.').reduce((acc, part) => acc && acc[part], obj);
    for (const path of likertPaths) {
        const val = getNestedValue(data.responses, path);
        if (val !== null && val !== undefined) {
            const num = Number(val);
            if (isNaN(num) || num < 1 || num > 5) {
                errors.push(`Invalid rating for ${path}: must be 1-5`);
            }
        }
    }
    return errors;
}

function transformToSchema(rawData, metadata) {
    // ... (Keep your existing transformToSchema logic exactly as it is) ...
    // It correctly maps the lowercase frontend keys to the capitalized schema keys.
}

exports.handler = async (event, context) => {
    // STEP 4: Strict CORS Headers
    const headers = {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
    if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ message: 'Method Not Allowed' }) };

    try {
        const { surveyData, metadata = {} } = JSON.parse(event.body || '{}');
        const validationErrors = validateSurveyData(surveyData);
        if (validationErrors.length > 0) {
            return { statusCode: 400, headers, body: JSON.stringify({ message: 'Validation failed', errors: validationErrors }) };
        }

        const structuredData = transformToSchema(surveyData, metadata);
        const token = process.env.GITHUB_TOKEN; // Ensure this token has ONLY 'contents: write' permissions to this specific repo
        
        let storageResult;
        if (token) {
            try {
                // GitHub storage logic...
                storageResult = { primary: 'github' };
            } catch (err) {
                // Supabase fallback logic...
                storageResult = { primary: 'supabase', fallback: true };
            }
        }

        return { statusCode: 200, headers, body: JSON.stringify({ message: 'Success', responseId: structuredData.responseId }) };
    } catch (error) {
        return { statusCode: 500, headers, body: JSON.stringify({ message: 'Internal server error' }) };
    }
};
