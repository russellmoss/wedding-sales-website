import React, { createContext, useContext, useState, useEffect } from 'react';
import { useEmotion } from './EmotionContext';
import { useInteractionTracker } from './InteractionTracker';
import { useGoldStandard } from './GoldStandardContext';
import { sendMessageToClaude, createCustomerSystemPrompt, createEvaluatorSystemPrompt, createEvaluationPrompt } from '../services/claudeApiService';
import { salesSimulatorScenarios } from '../data/salesSimulatorData';

const SimulatorContext = createContext();

export const useSimulator = () => {
  const context = useContext(SimulatorContext);
  if (!context) {
    throw new Error('useSimulator must be used within a SimulatorProvider');
  }
  return context;
};

export const SimulatorProvider = ({ children }) => {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [goldStandardAnalysis, setGoldStandardAnalysis] = useState(null);

  // Get emotion tracking functions from EmotionContext
  const { 
    currentEmotion, 
    emotionIntensity, 
    updateEmotion, 
    resetEmotionTracking,
    getEmotionalJourney,
    initializeEmotionTracking
  } = useEmotion();

  // Get interaction tracking functions from InteractionTracker
  const {
    trackNegativeInteraction,
    trackMissedOpportunity,
    trackRapportBuilding,
    trackClosingAttempt,
    getAllInteractions,
    resetInteractions
  } = useInteractionTracker();

  const {
    compareResponse
  } = useGoldStandard();

  // Debug log for scenario changes
  useEffect(() => {
    console.log('Current scenario updated:', currentScenario);
  }, [currentScenario]);

  const startSimulation = async (scenarioId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Find the scenario in our data
      const scenario = salesSimulatorScenarios.find(s => s.id === scenarioId);
      if (!scenario) {
        throw new Error(`Scenario with ID ${scenarioId} not found`);
      }
      
      // Initialize the scenario
      setCurrentScenario(scenario);
      setChatHistory([]);
      setFeedback(null);
      setIsSimulationActive(true);
      
      // Initialize emotion tracking for the new scenario
      resetEmotionTracking();
      initializeEmotionTracking(scenario);
      
      // Reset interaction tracking
      resetInteractions();
      
      // Send initial message from the customer
      const systemPrompt = createCustomerSystemPrompt(scenario);
      
      // Add a default initial message to avoid the "messages: at least one message is required" error
      const initialUserMessage = {
        role: "user",
        content: "Hi, I'm interested in learning more about your venue for my wedding."
      };
      
      const response = await sendMessageToClaude(systemPrompt, [initialUserMessage], { requestType: 'initial' });
      
      // Add the initial message to chat history
      const initialMessage = {
        type: 'assistant',
        content: response.content[0].text,
        timestamp: new Date().toISOString()
      };
      
      // Add the initial message without generating a response
      addMessage(initialMessage, 'assistant', false);
      
      // Analyze the impact of the initial message on customer emotion
      analyzeAssistantResponseImpact(initialMessage, [initialMessage]);
      
      // Update emotion based on initial message
      updateEmotion(initialMessage.content, scenario);
      
    } catch (error) {
      console.error('Error starting simulation:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const endSimulation = async () => {
    if (!isSimulationActive) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Get the emotional journey
      const emotionalJourney = getEmotionalJourney();
      
      // Get tracked interactions
      const interactions = getAllInteractions();
      
      // Get gold standard analysis for the entire conversation
      const userMessages = chatHistory.filter(msg => msg.type === 'user');
      const goldStandardAnalysis = userMessages.map(msg => 
        analyzeResponseAgainstGoldStandard(msg.content, {
          previousMessages: chatHistory.slice(0, chatHistory.indexOf(msg) + 1)
        })
      );
      
      // Calculate average gold standard score
      const averageGoldStandardScore = goldStandardAnalysis.reduce((sum, analysis) => 
        sum + (analysis?.score || 0), 0) / goldStandardAnalysis.length || 0;
      
      // Combine all deviations
      const allDeviations = goldStandardAnalysis.reduce((deviations, analysis) => 
        [...deviations, ...(analysis?.deviations || [])], []);
      
      // Create a summary of gold standard comparison
      const goldStandardComparison = {
        score: Math.round(averageGoldStandardScore),
        feedback: `Average score compared to gold standard responses: ${Math.round(averageGoldStandardScore)}%`,
        deviations: allDeviations
      };
      
      // Evaluate the simulation
      const evaluationResponse = await sendMessageToClaude(
        createEvaluatorSystemPrompt(currentScenario),
        [{
          role: 'user',
          content: createEvaluationPrompt(
            currentScenario, 
            chatHistory, 
            emotionalJourney, 
            interactions,
            goldStandardComparison
          )
        }]
      );
      
      // Parse the evaluation response
      const evaluationText = evaluationResponse.content[0].text;
      
      // Extract score
      const scoreMatch = evaluationText.match(/Score:\s*(\d+)%/i);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
      
      // Extract issues
      const issuesMatch = evaluationText.match(/Issues:?\s*([\s\S]*?)(?=Strengths:|Score:|$)/i);
      const issues = issuesMatch ? issuesMatch[1].trim().split('\n').filter(line => line.trim()) : [];
      
      // Extract strengths
      const strengthsMatch = evaluationText.match(/Strengths:?\s*([\s\S]*?)(?=Score:|$)/i);
      const strengths = strengthsMatch ? strengthsMatch[1].trim().split('\n').filter(line => line.trim()) : [];
      
      // Extract feedback
      const feedbackMatch = evaluationText.match(/Feedback:?\s*([\s\S]*?)$/i);
      const feedback = feedbackMatch ? feedbackMatch[1].trim() : '';
      
      // Set the feedback
      setFeedback({
        score,
        issues,
        strengths,
        feedback,
        rawResponse: evaluationText
      });
      
      // End the simulation
      setIsSimulationActive(false);
    } catch (err) {
      console.error('Error ending simulation:', err);
      setError('Failed to evaluate simulation. Please try again.');
      throw err; // Re-throw the error so the component can handle it
    } finally {
      setIsLoading(false);
    }
  };

  const resetSimulation = () => {
    setCurrentScenario(null);
    setChatHistory([]);
    setFeedback(null);
    setIsSimulationActive(false);
    setError(null);
    resetEmotionTracking();
    resetInteractions();
  };

  const analyzeResponseAgainstGoldStandard = (message, context) => {
    if (!currentScenario) return null;
    
    // Get the scenario ID
    const scenarioId = currentScenario.id || 'wedding_venue'; // Default to wedding_venue if no ID
    
    // Compare the response with the gold standard
    return compareResponse(scenarioId, message, {
      stage: determineConversationStage(),
      context: context || 'general'
    });
  };

  const determineConversationStage = () => {
    if (!chatHistory || chatHistory.length < 2) return 'initial';
    
    // Simple heuristic to determine stage based on conversation length and content
    const messageCount = chatHistory.length;
    
    if (messageCount <= 3) return 'initial';
    if (messageCount <= 6) return 'discovery';
    if (messageCount <= 10) return 'presentation';
    
    // Check for objection handling
    const lastMessages = chatHistory.slice(-3);
    const hasObjection = lastMessages.some(msg => 
      msg.type === 'assistant' && 
      (msg.content.toLowerCase().includes('concern') || 
       msg.content.toLowerCase().includes('worried') || 
       msg.content.toLowerCase().includes('expensive') || 
       msg.content.toLowerCase().includes('budget') || 
       msg.content.toLowerCase().includes('date') || 
       msg.content.toLowerCase().includes('available'))
    );
    
    if (hasObjection) return 'objection';
    
    // Check for closing attempts
    const hasClosing = lastMessages.some(msg => 
      msg.type === 'user' && 
      (msg.content.toLowerCase().includes('book') || 
       msg.content.toLowerCase().includes('reserve') || 
       msg.content.toLowerCase().includes('sign') || 
       msg.content.toLowerCase().includes('contract') || 
       msg.content.toLowerCase().includes('deposit'))
    );
    
    if (hasClosing) return 'closing';
    
    return 'presentation';
  };

  const addMessage = async (message, type = 'user', generateResponse = false) => {
    if (!isSimulationActive) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Handle both string and object inputs for message
      let messageContent = typeof message === 'string' ? message : message.content;
      let messageType = typeof message === 'string' ? type : message.type;
      
      // Add the message to chat history
      const newMessage = {
        id: Date.now(),
        content: messageContent,
        type: messageType,
        timestamp: new Date().toISOString(),
        emotion: messageType === 'user' ? 'neutral' : currentEmotion,
        emotionIntensity: messageType === 'user' ? 0.5 : emotionIntensity
      };
      
      const updatedHistory = [...chatHistory, newMessage];
      setChatHistory(updatedHistory);
      
      // If it's a user message, analyze it for interactions and gold standard comparison
      if (messageType === 'user') {
        // Analyze for interactions
        analyzeInteraction(newMessage, updatedHistory);
        
        // Analyze against gold standard
        const goldStandardAnalysis = analyzeResponseAgainstGoldStandard(messageContent, {
          previousMessages: updatedHistory.slice(-5) // Include context from previous messages
        });
        
        // Store the gold standard analysis for later use in evaluation
        setGoldStandardAnalysis(goldStandardAnalysis);
        
        // Update emotion based on the message
        updateEmotion(newMessage, currentScenario);
        
        // Only generate a response if explicitly requested
        if (generateResponse) {
          // Send the message to Claude and get a response
          const response = await sendMessageToClaude(
            createCustomerSystemPrompt(currentScenario),
            updatedHistory.map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.content
            }))
          );
          
          // Add the response to chat history
          const assistantMessage = {
            id: Date.now() + 1,
            content: response.content[0].text,
            type: 'assistant',
            timestamp: new Date().toISOString(),
            emotion: currentEmotion,
            emotionIntensity
          };
          
          setChatHistory([...updatedHistory, assistantMessage]);
          
          // Update emotion based on the assistant's response
          updateEmotion(assistantMessage, currentScenario);
          
          // Return the assistant message for the component to use
          return assistantMessage;
        }
      } else if (messageType === 'assistant') {
        // For assistant messages, analyze their impact on customer emotion
        analyzeAssistantResponseImpact(newMessage, updatedHistory);
      }
      
      // Return the message that was added
      return newMessage;
    } catch (err) {
      console.error('Error adding message:', err);
      setError('Failed to process message. Please try again.');
      throw err; // Re-throw the error so the component can handle it
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeInteraction = (userMessage, chatHistory) => {
    // Get the last assistant message if available
    const lastAssistantMessage = chatHistory
      .filter(msg => msg.type === 'assistant')
      .pop();
    
    // Analyze for negative interactions
    if (currentEmotion === 'frustrated' || currentEmotion === 'angry') {
      trackNegativeInteraction({
        description: `Customer expressed ${currentEmotion} emotion`,
        impact: 'high',
        trigger: userMessage.content
      });
    }
    
    // Analyze for missed opportunities
    if (userMessage.content.toLowerCase().includes('budget') && 
        lastAssistantMessage && 
        !lastAssistantMessage.content.toLowerCase().includes('package') &&
        !lastAssistantMessage.content.toLowerCase().includes('price')) {
      trackMissedOpportunity({
        description: 'Missed opportunity to discuss pricing packages',
        impact: 'medium',
        context: 'Budget discussion'
      });
    }
    
    // Analyze for rapport building
    if (lastAssistantMessage && 
        (lastAssistantMessage.content.toLowerCase().includes('understand') ||
        lastAssistantMessage.content.toLowerCase().includes('feel') ||
        lastAssistantMessage.content.toLowerCase().includes('share'))) {
      trackRapportBuilding({
        description: 'Demonstrated empathy and understanding',
        impact: 'positive',
        context: 'Emotional connection'
      });
    }
    
    // Analyze for closing attempts
    if (lastAssistantMessage && 
        (lastAssistantMessage.content.toLowerCase().includes('book') ||
        lastAssistantMessage.content.toLowerCase().includes('reserve') ||
        lastAssistantMessage.content.toLowerCase().includes('schedule'))) {
      trackClosingAttempt({
        description: 'Attempted to close the sale',
        effectiveness: 'medium',
        context: 'Closing attempt'
      });
    }
  };

  const analyzeAssistantResponseImpact = (assistantMessage, chatHistory) => {
    const lastUserMessage = chatHistory.find(msg => msg.type === 'user');
    if (!lastUserMessage) return;

    const message = assistantMessage.content.toLowerCase();
    
    // Define response quality indicators
    const unhelpfulPhrases = [
      'i don\'t know',
      'cannot help',
      'unable to help',
      'not sure',
      'don\'t have that information',
      'no information',
      'contact someone else',
      'call back later',
      'not available',
      'busy right now'
    ];

    const helpfulPhrases = [
      'let me help',
      'i can help',
      'here\'s what',
      'here is what',
      'i understand',
      'i see',
      'good question',
      'great question',
      'thank you for asking',
      'let me explain',
      'i\'ll help you',
      'i will help you'
    ];

    // Count occurrences of helpful/unhelpful phrases
    const unhelpfulCount = unhelpfulPhrases.filter(phrase => 
      message.includes(phrase)
    ).length;

    const helpfulCount = helpfulPhrases.filter(phrase => 
      message.includes(phrase)
    ).length;

    // Check for abrupt responses
    const isAbrupt = message.split(' ').length < 20;
    
    // Check if response ignores user questions
    const userQuestions = lastUserMessage.content.match(/\?/g) || [];
    const responseAnswers = message.match(/\./g) || [];
    const ignoredQuestions = userQuestions.length > responseAnswers.length;

    // Determine emotional impact
    let newEmotion = 'neutral';
    let intensity = 0.5;

    if (unhelpfulCount > helpfulCount) {
      newEmotion = 'frustrated';
      intensity = Math.min(0.5 + (unhelpfulCount * 0.1), 1.0);
    } else if (helpfulCount > unhelpfulCount) {
      newEmotion = 'hopeful';
      intensity = Math.min(0.5 + (helpfulCount * 0.1), 1.0);
    }

    if (isAbrupt) {
      newEmotion = 'annoyed';
      intensity = Math.min(intensity + 0.2, 1.0);
    }

    if (ignoredQuestions) {
      newEmotion = 'frustrated';
      intensity = Math.min(intensity + 0.3, 1.0);
    }

    // Update emotional state
    updateEmotion(newEmotion, intensity);
    
    console.log('Emotion updated:', { newEmotion, intensity });
  };

  const value = {
    currentScenario,
    chatHistory,
    isSimulationActive,
    feedback,
    isLoading,
    error,
    currentEmotion,
    emotionIntensity,
    startSimulation,
    endSimulation,
    resetSimulation,
    addMessage,
    goldStandardAnalysis
  };

  return (
    <SimulatorContext.Provider value={value}>
      {children}
    </SimulatorContext.Provider>
  );
}; 