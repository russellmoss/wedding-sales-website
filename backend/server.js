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
    console.log('\n=== Claude API Request ===');
    console.log('Model:', req.body.model);
    console.log('Max Tokens:', req.body.max_tokens);
    console.log('Temperature:', req.body.temperature);
    
    // Log system prompt if present
    if (req.body.system) {
      console.log('\n=== System Prompt ===');
      console.log(req.body.system);
    }
    
    // Log messages if present
    if (req.body.messages && req.body.messages.length > 0) {
      console.log('\n=== Messages ===');
      req.body.messages.forEach((msg, index) => {
        console.log(`\nMessage ${index + 1}:`);
        console.log('Role:', msg.role);
        console.log('Content:', msg.content);
      });
    }
    
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
    console.log('\n=== Claude API Response ===');
    console.log('Status:', response.status);
    console.log('Response Time:', response.headers['x-response-time'] || 'N/A');
    
    // Log token usage if available
    if (response.data.usage) {
      console.log('\n=== Token Usage ===');
      console.log('Input Tokens:', response.data.usage.input_tokens);
      console.log('Output Tokens:', response.data.usage.output_tokens);
      console.log('Total Tokens:', response.data.usage.input_tokens + response.data.usage.output_tokens);
    }
    
    // Log the actual response content
    console.log('\n=== Response Content ===');
    console.log(response.data.content || response.data.message?.content || 'No content in response');
    
    // Return the response to the client
    res.json(response.data);
  } catch (error) {
    // Log detailed error information
    console.error('\n=== Claude API Error ===');
    console.error('Status:', error.response?.status);
    console.error('Error Data:', error.response?.data);
    console.error('Error Message:', error.message);
    
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