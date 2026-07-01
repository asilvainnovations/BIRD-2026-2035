// api/submit.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { surveyData } = req.body;
  const token = process.env.GITHUB_TOKEN;
  const owner = 'asilvainnovations';
  const repo = 'BIRD-2026-2035';
  
  // Generate unique filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const path = `data/responses/response_${timestamp}.json`;

  if (!token) {
    return res.status(500).json({ message: 'GitHub Token not configured' });
  }

  try {
    // Convert JSON to Base64 for GitHub API
    const content = Buffer.from(JSON.stringify(surveyData, null, 2)).toString('base64');
    
    // Commit file to repository via GitHub API
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Add BIRD Validation Survey Response (${timestamp})`,
        content: content,
        branch: 'main' // Change to 'master' if your default branch is master
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('GitHub API Error:', error);
      throw new Error(error.message || 'Failed to commit to GitHub');
    }

    res.status(200).json({ message: 'Data stored successfully in repository', path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error storing data', error: error.message });
  }
}
