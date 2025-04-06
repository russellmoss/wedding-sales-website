import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulator } from '../../contexts/SimulatorContext';
import { sendMessageToClaude, createScenarioSystemPrompt } from '../../services/claudeApiService';
import { useEmotion } from '../../contexts/EmotionContext';
import CallInstructions from './CallInstructions';
import VenueTourInstructions from './VenueTourInstructions';
import InitialInquiryInstructions from './InitialInquiryInstructions';
import '../../styles/animations.css';

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
    error: simulatorError,
    resetSimulation
  } = useSimulator();
  
  const { currentEmotion, emotionIntensity, updateEmotion, overrideEmotion } = useEmotion();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState(null);
  const chatEndRef = useRef(null);
  const timeoutRef = useRef(null);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);
  
  // State for emotion override UI
  const [showEmotionOverride, setShowEmotionOverride] = useState(false);
  const [overrideEmotionType, setOverrideEmotionType] = useState('neutral');
  const [overrideIntensity, setOverrideIntensity] = useState(0.7);
  const [overrideReason, setOverrideReason] = useState('');
  
  // State for showing/hiding instructions
  const [showCallInstructions, setShowCallInstructions] = useState(true);
  const [showVenueTourInstructions, setShowVenueTourInstructions] = useState(true);
  const [showInitialInquiryInstructions, setShowInitialInquiryInstructions] = useState(true);
  
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

  // Start the timeout timer when the simulation starts
  useEffect(() => {
    if (isSimulationActive && chatHistory.length > 0 && !isTimeoutActive) {
      console.log("Starting 30-minute response timeout timer");
      setIsTimeoutActive(true);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
      
      // Set up the countdown timer
      timeoutRef.current = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            // Time's up - trigger frustration
            clearInterval(timeoutRef.current);
            handleTimeoutFrustration();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      return () => {
        if (timeoutRef.current) {
          clearInterval(timeoutRef.current);
        }
      };
    }
  }, [isSimulationActive, chatHistory.length, isTimeoutActive]);
  
  // Reset timeout when user sends a message
  useEffect(() => {
    if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1].type === 'user') {
      console.log("User responded - resetting timeout timer");
      setTimeRemaining(30 * 60); // Reset to 30 minutes
    }
  }, [chatHistory]);
  
  // Handle timeout frustration
  const handleTimeoutFrustration = () => {
    console.log("Timeout reached - customer is getting frustrated");
    
    // Update emotion to frustrated with high intensity
    updateEmotion('frustrated', 0.9, 'No response received within 30 minutes');
    
    // Add a system message about the timeout
    const timeoutMessage = {
      type: 'system',
      content: "The customer is getting frustrated due to the delayed response.",
      timestamp: new Date().toISOString()
    };
    
    addMessage(timeoutMessage, 'system', false);
  };
  
  // Format time remaining for display
  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

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
          
          // Instead of automatically adding initial message, we'll wait for "CALL" command
          setLocalLoading(false);
        } catch (err) {
          console.error("Error initiating chat:", err);
          setLocalError(`Failed to start conversation: ${err.message}`);
        } finally {
          setIsTyping(false);
        }
      }
    };
    
    initiateChat();
  }, [currentScenario, chatHistory.length]);

  // Add function to handle the CALL initiation
  const handleCallInitiation = async () => {
    if (inputValue.trim().toUpperCase() === 'CALL') {
      setInputValue('');
      setIsTyping(true);
      
      try {
        // Create system prompt based on scenario
        const systemPrompt = createScenarioSystemPrompt(currentScenario);
        
        // Add a system message explaining what's happening
        const systemMessage = {
          type: 'system',
          content: "Initiating phone call with Sarah Miller...",
          timestamp: new Date().toISOString()
        };
        
        await addMessage(systemMessage, 'system', false);
        
        // Add Sarah's initial greeting as if she answered the phone
        const initialMessage = {
          type: 'assistant',
          content: "Hello, this is Sarah speaking.",
          timestamp: new Date().toISOString()
        };
        
        await addMessage(initialMessage, 'assistant', false);
        
        // Analyze the impact of the initial message on customer emotion
        analyzeAssistantResponseImpact(initialMessage, [initialMessage]);
        
        // Update emotion based on initial message
        updateEmotion(initialMessage.content, currentScenario);
        
      } catch (err) {
        console.error("Error initiating call:", err);
        setLocalError(`Failed to initiate call: ${err.message}`);
      } finally {
        setIsTyping(false);
      }
      
      return true; // Return true to indicate we handled this input
    }
    
    return false; // Return false to indicate this input was not handled
  };

  // Add function to handle the GREET initiation for venue tour
  const handleGreetingInitiation = async () => {
    if (inputValue.trim().toUpperCase() === 'GREET') {
      setInputValue('');
      setIsTyping(true);
      
      try {
        // Create system prompt based on scenario
        const systemPrompt = createScenarioSystemPrompt(currentScenario);
        
        // Add a system message explaining what's happening
        const systemMessage = {
          type: 'system',
          content: "Initiating venue tour with Morgan and Casey...",
          timestamp: new Date().toISOString()
        };
        
        await addMessage(systemMessage, 'system', false);
        
        // Add Morgan and Casey's initial greeting as if they arrived at the venue
        const initialMessage = {
          type: 'assistant',
          content: "Hi there! We're Morgan and Casey. We're so excited to see the venue today!",
          timestamp: new Date().toISOString()
        };
        
        await addMessage(initialMessage, 'assistant', false);
        
        // Analyze the impact of the initial message on customer emotion
        analyzeAssistantResponseImpact(initialMessage, [initialMessage]);
        
        // Update emotion based on initial message
        updateEmotion(initialMessage.content, currentScenario);
        
      } catch (err) {
        console.error("Error initiating venue tour:", err);
        setLocalError(`Failed to initiate venue tour: ${err.message}`);
      } finally {
        setIsTyping(false);
      }
      
      return true; // Return true to indicate we handled this input
    }
    
    return false; // Return false to indicate this input was not handled
  };

  // Add the analyzeAssistantResponseImpact function
  const analyzeAssistantResponseImpact = (message, context) => {
    try {
      // Get the current emotional state
      const currentEmotionalState = getEmotionalJourney();
      
      // Analyze the message content for emotional triggers
      const messageContent = message.content.toLowerCase();
      
      // Check for positive emotional triggers
      if (messageContent.includes('welcome') || 
          messageContent.includes('thank you') || 
          messageContent.includes('happy to help') ||
          messageContent.includes('excited')) {
        updateEmotion('positive', 0.7, 'Assistant showed enthusiasm and welcome');
      }
      
      // Check for neutral or professional responses
      else if (messageContent.includes('hello') || 
               messageContent.includes('hi') || 
               messageContent.includes('speaking')) {
        updateEmotion('neutral', 0.5, 'Assistant provided a standard greeting');
      }
      
      // Check for potential negative triggers
      else if (messageContent.includes('sorry') || 
               messageContent.includes('unavailable') || 
               messageContent.includes('cannot help')) {
        updateEmotion('negative', 0.6, 'Assistant indicated potential limitations');
      }
      
      // Log the analysis for debugging
      console.log("Assistant response analysis:", {
        message: message.content,
        currentEmotion: currentEmotionalState.currentEmotion,
        emotionIntensity: currentEmotionalState.emotionIntensity,
        context: context.map(msg => msg.content)
      });
      
    } catch (error) {
      console.error("Error analyzing assistant response:", error);
    }
  };

  // Modify the handleSubmit function to check for CALL command
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Check if this is a call initiation command
    if (await handleCallInitiation()) return;
    
    // Check if this is a greeting initiation command for venue tour
    if (await handleGreetingInitiation()) return;

    // Regular message handling continues as before...
    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };
    
    setIsTyping(true);
    
    try {
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
      // Navigate to the export page without resetting the simulation
      navigate('/simulator/export');
    } catch (err) {
      console.error('Error navigating to export page:', err);
      setLocalError('Failed to navigate to export page. Please try again.');
    }
  };

  // Handle emotion override
  const handleEmotionOverride = () => {
    if (!overrideEmotionType) return;
    
    overrideEmotion(overrideEmotionType, overrideIntensity, overrideReason || 'Manual override');
    setShowEmotionOverride(false);
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

  const renderMessage = (message, index) => {
    const isUser = message.type === 'user';
    const isSystem = message.type === 'system';
    const isInitialInquiry = currentScenario?.id === 'initial-inquiry' && index === 0 && isUser;
    
    return (
      <div 
        key={index} 
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div 
          className={`max-w-[80%] rounded-lg p-4 ${
            isSystem 
              ? 'bg-gray-100 text-gray-600 text-sm' 
              : isUser 
                ? 'bg-blue-600 text-white' 
                : isInitialInquiry
                  ? 'bg-white border border-gray-300 text-gray-800'
                  : currentScenario?.id === 'qualification-call' 
                    ? 'bg-purple-100 text-gray-800 border-l-4 border-purple-500'
                    : currentScenario?.id === 'venue-tour'
                      ? 'bg-green-100 text-gray-800 border-l-4 border-green-500'
                      : 'bg-gray-100 text-gray-800'
          }`}
        >
          {isInitialInquiry ? (
            <div className="font-mono text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">First Name:</div>
                <div>Taylor & Jordan</div>
                
                <div className="font-semibold">Last Name:</div>
                <div>Smith</div>
                
                <div className="font-semibold">Email:</div>
                <div>taylor@email.com</div>
                
                <div className="font-semibold">Phone:</div>
                <div>(555) 123-4567</div>
                
                <div className="font-semibold">Event Type:</div>
                <div>Wedding</div>
                
                <div className="font-semibold">Desired Date:</div>
                <div>Summer 2025</div>
                
                <div className="font-semibold">Start Time:</div>
                <div>4:00 PM</div>
                
                <div className="font-semibold">Budget:</div>
                <div>$25,000 - $30,000</div>
                
                <div className="font-semibold">Estimated Group Size:</div>
                <div>120 guests</div>
              </div>
              
              <div className="mt-3">
                <div className="font-semibold">Tell us about your event:</div>
                <div className="mt-1">
                  We are a couple looking for a picturesque vineyard venue for our summer wedding next year. We're excited to find a location that offers both beautiful scenery and an intimate atmosphere for our 120 guests. We're hoping to create a memorable day that captures the romance of a vineyard setting while being mindful of our budget.
                </div>
              </div>
            </div>
          ) : (
            <>
              {!isUser && (
                <div className="flex items-center mb-2">
                  {currentScenario?.id === 'qualification-call' && (
                    <span className="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded mr-2">Sarah</span>
                  )}
                  {currentScenario?.id === 'venue-tour' && (
                    <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded mr-2">Morgan & Casey</span>
                  )}
                  {currentScenario?.id === 'initial-inquiry' && (
                    <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded mr-2">Taylor & Jordan (Email)</span>
                  )}
                </div>
              )}
              {isUser && currentScenario?.id === 'initial-inquiry' && (
                <div className="flex items-center mb-2">
                  <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded mr-2">You - Email Response</span>
                </div>
              )}
              <div className="whitespace-pre-wrap">{message.content}</div>
            </>
          )}
        </div>
      </div>
    );
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

      {/* Instructions for call, venue tour, or initial inquiry */}
      {isSimulationActive && currentScenario?.id === 'qualification-call' && showCallInstructions && (
        <CallInstructions onDismiss={() => setShowCallInstructions(false)} />
      )}
      
      {isSimulationActive && currentScenario?.id === 'venue-tour' && showVenueTourInstructions && (
        <VenueTourInstructions onDismiss={() => setShowVenueTourInstructions(false)} />
      )}
      
      {isSimulationActive && currentScenario?.id === 'initial-inquiry' && showInitialInquiryInstructions && (
        <InitialInquiryInstructions onDismiss={() => setShowInitialInquiryInstructions(false)} />
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {chatHistory.map((msg, index) => renderMessage(msg, index))}
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
              placeholder={
                chatHistory.length === 0 && currentScenario?.id === 'qualification-call'
                  ? "Type CALL to start the phone conversation..."
                  : chatHistory.length === 0 && currentScenario?.id === 'venue-tour'
                  ? "Type GREET to start the venue tour..."
                  : currentScenario?.id === 'initial-inquiry'
                  ? "Type your email response to Taylor and Jordan's inquiry..."
                  : "Type your message... (Press Shift+Enter for new line)"
              }
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
              disabled={isLoading || !inputValue.trim()}
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Export Conversation
          </button>
        </div>
      </div>

      {/* Emotion Override UI */}
      {showEmotionOverride && (
        <div className="emotion-override-panel">
          <h3>Override Emotion Detection</h3>
          <div className="emotion-override-form">
            <div className="form-group">
              <label htmlFor="emotion-type">Emotion:</label>
              <select 
                id="emotion-type" 
                value={overrideEmotionType} 
                onChange={(e) => setOverrideEmotionType(e.target.value)}
              >
                <option value="happy">Happy</option>
                <option value="excited">Excited</option>
                <option value="pleased">Pleased</option>
                <option value="interested">Interested</option>
                <option value="hopeful">Hopeful</option>
                <option value="neutral">Neutral</option>
                <option value="concerned">Concerned</option>
                <option value="worried">Worried</option>
                <option value="confused">Confused</option>
                <option value="doubtful">Doubtful</option>
                <option value="annoyed">Annoyed</option>
                <option value="frustrated">Frustrated</option>
                <option value="disappointed">Disappointed</option>
                <option value="angry">Angry</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="emotion-intensity">Intensity: {overrideIntensity}</label>
              <input 
                type="range" 
                id="emotion-intensity" 
                min="0.1" 
                max="1.0" 
                step="0.1" 
                value={overrideIntensity} 
                onChange={(e) => setOverrideIntensity(parseFloat(e.target.value))}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="override-reason">Reason (optional):</label>
              <input 
                type="text" 
                id="override-reason" 
                value={overrideReason} 
                onChange={(e) => setOverrideReason(e.target.value)}
                placeholder="Why are you overriding the emotion?"
              />
            </div>
            
            <div className="emotion-override-actions">
              <button 
                className="btn btn-primary" 
                onClick={handleEmotionOverride}
              >
                Apply Override
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowEmotionOverride(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Emotion Override Button */}
      <div className="emotion-override-button">
        <button 
          className="btn btn-outline-secondary btn-sm" 
          onClick={() => setShowEmotionOverride(!showEmotionOverride)}
        >
          {showEmotionOverride ? 'Hide Override' : 'Override Emotion'}
        </button>
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
    case 'very_positive':
      return '#4CAF50'; // Green
    case 'hopeful':
    case 'optimistic':
    case 'confident':
      return '#FF9800'; // Orange
    case 'curious':
    case 'interested':
    case 'engaged':
    case 'positive':
      return '#9C27B0'; // Purple
    case 'grateful':
    case 'appreciative':
    case 'satisfied':
      return '#00BCD4'; // Cyan
    case 'thrilled':
    case 'eager':
    case 'ecstatic':
      return '#8BC34A'; // Light Green
      
    // Neutral emotions
    case 'neutral':
    case 'calm':
    case 'composed':
    case 'attentive':
      return '#9E9E9E'; // Grey
      
    // Negative emotions
    case 'concerned':
    case 'worried':
    case 'anxious':
    case 'hesitant':
      return '#FFC107'; // Yellow
    case 'frustrated':
    case 'angry':
    case 'irritated':
    case 'annoyed':
    case 'very_negative':
      return '#F44336'; // Red
    case 'sad':
    case 'disappointed':
    case 'unhappy':
    case 'negative':
      return '#2196F3'; // Blue
    case 'confused':
    case 'uncertain':
    case 'doubtful':
    case 'skeptical':
      return '#795548'; // Brown
    case 'impatient':
    case 'rushed':
    case 'pressured':
      return '#E91E63'; // Pink
    case 'surprised':
    case 'shocked':
    case 'taken_aback':
      return '#673AB7'; // Deep Purple
    default:
      return '#9E9E9E'; // Default grey color
  }
};

export default SimulatorChat; 