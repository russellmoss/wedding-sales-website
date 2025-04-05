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
          
          // Prepare initial message for Claude
          const initialMessage = {
            role: "assistant",
            content: "I'm interested in learning more about Milea Estate Vineyard for our wedding. Could you tell me about your venue?"
          };
          
          // Send initial message to Claude
          const response = await sendMessageToClaude(
            systemPrompt,
            [initialMessage],
            { temperature: 0.8 }
          );
          
          // Add Claude's response to chat history
          const aiResponse = {
            type: 'ai',
            content: response.content[0].text,
            timestamp: new Date().toISOString()
          };
          addMessage(aiResponse);
        } catch (err) {
          console.error("Error initiating chat:", err);
          setError(`Failed to start conversation: ${err.message}`);
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
      
      // Send to Claude API
      const response = await sendMessageToClaude(
        systemPrompt,
        formattedHistory,
        { temperature: 0.8 }
      );
      
      // Add Claude's response to chat history
      const aiResponse = {
        type: 'ai',
        content: response.content[0].text,
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            {currentScenario?.title || 'Sales Simulation'}
          </h1>
          <button
            onClick={handleEndSimulation}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            End Simulation
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-4 ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 shadow'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-lg p-4 shadow">
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

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={isTyping || !message.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SimulatorChat; 