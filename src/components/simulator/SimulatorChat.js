import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulator } from '../../contexts/SimulatorContext';
import { sendMessageToClaude, createScenarioSystemPrompt } from '../../services/claudeApiService';

const SimulatorChat = () => {
  const navigate = useNavigate();
  const { currentScenario, chatHistory, addMessage, endSimulation } = useSimulator();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Debug log to see what's in currentScenario
    console.log("Current scenario in chat:", currentScenario);
    
    // Check if we have a valid scenario
    if (!currentScenario) {
      console.error("No scenario data available, redirecting to simulator home");
      navigate('/simulator');
      return;
    }
    setIsLoading(false);
  }, [currentScenario, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Send initial message from AI if chat is empty
  useEffect(() => {
    const initiateChat = async () => {
      if (currentScenario && chatHistory.length === 0) {
        setIsTyping(true);
        try {
          // Create system prompt based on scenario
          const systemPrompt = createScenarioSystemPrompt(currentScenario);
          console.log("System prompt created:", systemPrompt);
          
          // Prepare initial message for Claude - this should be the customer's inquiry
          const initialMessage = {
            role: "user",
            content: "Hi, my name is Sarah and my fiancé Michael and I are interested in learning more about Milea Estate Vineyard for our wedding. Could you tell us about your venue?"
          };
          
          // Add the initial user message to chat history without sending to Claude
          console.log("Adding initial customer inquiry to chat history");
          const userMessage = {
            type: 'user',
            content: initialMessage.content,
            timestamp: new Date().toISOString()
          };
          addMessage(userMessage);
          
          // We don't send this to Claude yet - the user will respond first
          console.log("Initial customer inquiry added. Waiting for user response.");
        } catch (err) {
          console.error("Error initiating chat:", err);
          setError(`Failed to start conversation: ${err.message}`);
          
          // Add fallback error message
          const errorResponse = {
            type: 'ai',
            content: "Thank you for your interest in Milea Estate Vineyard! I'd be happy to tell you about our venue. What aspects are you most interested in learning about?",
            timestamp: new Date().toISOString()
          };
          addMessage(errorResponse);
        } finally {
          setIsTyping(false);
        }
      }
    };
    
    initiateChat();
  }, [currentScenario, chatHistory.length, addMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    addMessage(userMessage);
    setMessage('');
    setIsTyping(true);

    try {
      // Create system prompt based on scenario
      const systemPrompt = createScenarioSystemPrompt(currentScenario);
      
      // Convert chat history to format expected by Claude API
      const formattedHistory = chatHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      // Add the newest user message
      formattedHistory.push({
        role: 'user',
        content: userMessage.content
      });
      
      console.log("Sending message to Claude with history:", formattedHistory);
      
      // Send to Claude API
      const response = await sendMessageToClaude(
        systemPrompt,
        formattedHistory,
        { 
          temperature: 0.8,
          requestType: 'chat-message',
          model: process.env.REACT_APP_CLAUDE_MODEL || 'claude-3-opus-20240229'
        }
      );
      
      console.log("Claude API response:", response);
      
      // Extract the AI's response text from the response structure
      let aiResponseText = '';
      
      // Handle different possible response structures
      if (response && response.content && Array.isArray(response.content) && response.content.length > 0) {
        // New Claude API structure
        if (response.content[0].text) {
          aiResponseText = response.content[0].text;
        } else if (response.content[0].type === 'text') {
          aiResponseText = response.content[0].text;
        }
      } else if (response && response.message && response.message.content) {
        // Alternative structure
        aiResponseText = response.message.content;
      } else if (response && typeof response === 'string') {
        // Direct string response
        aiResponseText = response;
      } else if (response && response.choices && response.choices.length > 0) {
        // OpenAI-style structure
        aiResponseText = response.choices[0].message.content;
      } else {
        // Fallback - try to extract any text content
        console.error("Unexpected response structure:", response);
        aiResponseText = "I'm having trouble understanding. Could you please rephrase that?";
      }
      
      console.log("Extracted AI response text:", aiResponseText);
      
      // Check if the response contains evaluation feedback
      if (aiResponseText.includes("Score:") || aiResponseText.includes("Feedback:")) {
        console.log("AI response contains evaluation feedback. This should not happen during the conversation.");
        // Extract just the customer response part if possible
        const customerResponseMatch = aiResponseText.match(/\*responds as the customer\*\s*([\s\S]*?)(?=\*evaluates|$)/i);
        if (customerResponseMatch && customerResponseMatch[1]) {
          aiResponseText = customerResponseMatch[1].trim();
        } else {
          // If we can't extract just the customer response, use a fallback
          aiResponseText = "Thank you for your interest in Milea Estate Vineyard! I'd be happy to tell you about our venue. What aspects are you most interested in learning about?";
        }
      }
      
      // Add Claude's response to chat history
      const aiResponse = {
        type: 'ai',
        content: aiResponseText,
        timestamp: new Date().toISOString()
      };
      addMessage(aiResponse);
    } catch (err) {
      console.error("Error sending message to Claude:", err);
      setError(`Failed to get response: ${err.message}`);
      
      // Add fallback error message
      const errorResponse = {
        type: 'ai',
        content: "I'm sorry, I'm having trouble responding right now. Could you please try again?",
        timestamp: new Date().toISOString()
      };
      addMessage(errorResponse);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEndSimulation = () => {
    endSimulation();
    navigate('/simulator/feedback');
  };

  // If no scenario is available, show error
  if (!currentScenario) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">No Scenario Selected</h2>
          <button
            onClick={() => navigate('/simulator')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Return to Scenarios
          </button>
        </div>
      </div>
    );
  }

  // Handle keydown events in the textarea
  const handleKeyDown = (e) => {
    // If Enter is pressed without Shift, prevent form submission
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Submit the form programmatically
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-900">{currentScenario.title}</h1>
          <p className="text-sm text-gray-600">{currentScenario.description}</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-900 shadow-sm'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs mt-2 opacity-75">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 shadow-sm rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Chat Input */}
      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Press Shift+Enter for new line)"
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
              disabled={isTyping || !message.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* End Simulation Button */}
      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto flex justify-end">
          <button
            onClick={handleEndSimulation}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            End Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimulatorChat; 