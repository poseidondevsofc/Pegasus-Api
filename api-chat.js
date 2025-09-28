const axios = require('axios');

module.exports = async function(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages required' });
    }

    const resp = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 800
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.status(200).json(resp.data);
  } catch (err) {
    console.error('chat API error', err?.response?.data || err.message);
    res.status(500).json({ error: 'Server error', details: err?.response?.data || err.message });
  }
}