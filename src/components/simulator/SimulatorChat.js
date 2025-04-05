import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulator } from '../../contexts/SimulatorContext';
import { sendMessageToClaude, createScenarioSystemPrompt } from '../../services/claudeApiService';
import { useEmotion } from '../../contexts/EmotionContext';

const SimulatorChat = () => {
  const navigate = useNavigate();
  const { 
    currentScenario, 
    chatHistory, 
    addMessage, 
    endSimulation,
    isSimulationActive,
    getEmotionalJourney,
    isLoading: simulatorLoading,
    error: simulatorError
  } = useSimulator();
  
  const { currentEmotion, emotionIntensity } = useEmotion();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState(null);
  const chatEndRef = useRef(null);
  
  // Combine local and context loading states
  const isLoading = localLoading || simulatorLoading;
  const error = localError || simulatorError;

  useEffect(() => {
    // Debug log to see what's in currentScenario
    console.log("Current scenario in chat:", currentScenario);
    
    // Check if we have a valid scenario
    if (!currentScenario) {
      console.error("No scenario data available, redirecting to simulator home");
      navigate('/simulator');
      return;
    }
    setLocalLoading(false);
  }, [currentScenario, navigate]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Update typing indicator based on chat history changes
  useEffect(() => {
    // If the last message is from the assistant, we're not typing anymore
    if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1].type === 'assistant') {
      setIsTyping(false);
    }
    
    // If there's an error, we should also stop typing
    if (error) {
      setIsTyping(false);
    }
    
    // Add a safety timeout to reset typing indicator if it gets stuck
    let typingTimeout;
    if (isTyping) {
      typingTimeout = setTimeout(() => {
        console.log("Typing indicator reset due to timeout");
        setIsTyping(false);
      }, 10000); // 10 seconds timeout
    }
    
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [chatHistory, error, isTyping]);

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
          addMessage(userMessage, 'user', false);
          
          // We don't send this to Claude yet - the user will respond first
          console.log("Initial customer inquiry added. Waiting for user response.");
        } catch (err) {
          console.error("Error initiating chat:", err);
          setLocalError(`Failed to start conversation: ${err.message}`);
          
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
    if (!inputValue.trim()) return;

    // Add user message to chat and generate a response
    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };
    
    // Set typing indicator before adding the message
    setIsTyping(true);
    
    try {
      // Add the message and generate a response
      await addMessage(userMessage, 'user', true);
      setInputValue('');
    } catch (err) {
      console.error('Error sending message:', err);
      setLocalError('Failed to send message. Please try again.');
      setIsTyping(false);
    }
  };

  const handleEndSimulation = async () => {
    try {
      setLocalLoading(true);
      await endSimulation();
      navigate('/simulator/feedback');
    } catch (err) {
      console.error('Error ending simulation:', err);
      setLocalError('Failed to generate feedback. Please try again.');
      setLocalLoading(false);
    }
  };

  const renderEmotionIndicator = () => {
    if (!isSimulationActive) return null;
    
    const emotionColor = getEmotionColor(currentEmotion);
    const intensityPercent = Math.round(emotionIntensity * 100);
    
    return (
      <div className="emotion-indicator">
        <div className="emotion-label">
          Customer Emotion: <span style={{ color: emotionColor }}>{currentEmotion}</span>
        </div>
        <div className="emotion-intensity">
          Intensity: {intensityPercent}%
          <div className="intensity-bar">
            <div 
              className="intensity-fill" 
              style={{ 
                width: `${intensityPercent}%`,
                backgroundColor: emotionColor
              }}
            />
          </div>
        </div>
      </div>
    );
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
          {renderEmotionIndicator()}
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
                {msg.type === 'assistant' && (
                  <div className="message-emotion">
                    <span className="emotion-label">Emotion:</span>
                    <span 
                      className="emotion-value"
                      style={{ color: getEmotionColor(msg.emotion) }}
                    >
                      {msg.emotion || 'neutral'}
                    </span>
                  </div>
                )}
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
          <div ref={chatEndRef} />
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Press Shift+Enter for new line)"
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
              disabled={!isSimulationActive}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
              disabled={!isSimulationActive || !inputValue.trim()}
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
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </>
            ) : (
              'End Simulation'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get color based on emotion
const getEmotionColor = (emotion) => {
  // Return a default color if emotion is undefined or null
  if (!emotion) {
    return '#9E9E9E'; // Default grey color
  }
  
  switch (emotion.toLowerCase()) {
    // Positive emotions
    case 'happy':
    case 'excited':
    case 'enthusiastic':
    case 'delighted':
    case 'pleased':
      return '#4CAF50'; // Green
    case 'hopeful':
    case 'optimistic':
    case 'confident':
      return '#FF9800'; // Orange
    case 'curious':
    case 'interested':
    case 'engaged':
      return '#9C27B0'; // Purple
    case 'grateful':
    case 'appreciative':
      return '#00BCD4'; // Cyan
      
    // Neutral emotions
    case 'neutral':
    case 'calm':
    case 'composed':
      return '#9E9E9E'; // Grey
      
    // Negative emotions
    case 'concerned':
    case 'worried':
    case 'anxious':
      return '#FFC107'; // Yellow
    case 'frustrated':
    case 'angry':
    case 'irritated':
    case 'annoyed':
      return '#F44336'; // Red
    case 'sad':
    case 'disappointed':
    case 'unhappy':
      return '#2196F3'; // Blue
    case 'confused':
    case 'uncertain':
      return '#795548'; // Brown
    case 'impatient':
    case 'rushed':
      return '#E91E63'; // Pink
    default:
      return '#9E9E9E'; // Default grey color
  }
};

export default SimulatorChat; 