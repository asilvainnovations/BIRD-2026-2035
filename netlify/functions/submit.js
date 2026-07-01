// netlify/functions/submit.js
const crypto = require('crypto');

exports.handler = async (event, context) => {
  // 1. Handle CORS (Allows your GitHub Pages site to talk to this Netlify function)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ message: 'Method Not Allowed' }) };
  }

  try {
    // 2. Parse the incoming data
    const { surveyData } = JSON.parse(event.body || '{}');
    const token = process.env.GITHUB_TOKEN;
    const owner = 'asilvainnovations';
    const repo = 'BIRD-2026-2035';

    if (!token) {
      return { statusCode: 500, headers, body: JSON.stringify({ message: 'GitHub Token not configured in Netlify' }) };
    }

    // 3. Generate unique filename and format data
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const uniqueId = crypto.randomUUID().substring(0, 8);
    const path = `data/responses/response_${uniqueId}_${timestamp}.json`;
    
    const content = Buffer.from(JSON.stringify(surveyData, null, 2)).toString('base64');

    // 4. Commit to GitHub via API
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'BIRD-Survey-Netlify-Function'
      },
      body: JSON.stringify({
        message: `Add BIRD Survey Response: ${surveyData.demographics?.sector || 'Unknown'} (${uniqueId})`,
        content: content,
        branch: 'main' // Change to 'master' if your default branch is master
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('GitHub API Error:', error);
      return { statusCode: 500, headers, body: JSON.stringify({ message: error.message || 'GitHub API Failed' }) };
    }

    // 5. Success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Data stored successfully in repository', 
        path: path,
        responseId: uniqueId
      })
    };

  } catch (error) {
    console.error('Function Error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ message: error.message }) };
  }
};
