import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initClaudeApi } from './services/claudeApiInit';

// Initialize the Claude API service
const claudeApiStatus = initClaudeApi();

// Log initialization status
if (claudeApiStatus.hasApiKey) {
  console.log('Claude API service is ready');
} else {
  console.warn('Claude API service is not fully configured - API key is missing');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
