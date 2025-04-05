const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());
app.use(express.json());

// Claude API proxy endpoint
app.post('/api/claude', async (req, res) => {
  try {
    // Log the request for debugging
    console.log('Received request to Claude API:', {
      model: req.body.model,
      max_tokens: req.body.max_tokens,
      temperature: req.body.temperature
    });
    
    // Ensure we have an API key
    if (!process.env.CLAUDE_API_KEY) {
      console.error('CLAUDE_API_KEY is not set in environment variables');
      return res.status(500).json({
        error: { message: 'API key not configured on server' }
      });
    }
    
    // Make the request to Claude API
    const response = await axios.post('https://api.anthropic.com/v1/messages', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      }
    });
    
    // Log successful response
    console.log('Claude API response received');
    
    // Return the response to the client
    res.json(response.data);
  } catch (error) {
    // Log detailed error information
    console.error('Error proxying to Claude API:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Return appropriate error response
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error || { message: 'Internal Server Error' }
    });
  }
});

// Add a health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Claude API proxy server is running' });
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
}); 