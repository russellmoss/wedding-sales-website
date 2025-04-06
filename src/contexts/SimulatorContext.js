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
      
      // Only add initial message for non-qualification-call scenarios
      if (scenarioId !== 'qualification-call') {
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
      }
      
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
      
      // Try to first look for an explicit overall score
      let score = 0;
      
      // Pattern 1: "Score: 85%"
      const scoreMatch1 = evaluationText.match(/Score:\s*(\d+)%/i);
      if (scoreMatch1) {
        score = parseInt(scoreMatch1[1]);
      }
      
      // Pattern 2: "Overall Score: 85%"
      if (score === 0) {
        const scoreMatch2 = evaluationText.match(/Overall Score:\s*(\d+)%/i);
        if (scoreMatch2) {
          score = parseInt(scoreMatch2[1]);
        }
      }
      
      // Pattern 3: "Final Score: 85%"
      if (score === 0) {
        const scoreMatch3 = evaluationText.match(/Final Score:\s*(\d+)%/i);
        if (scoreMatch3) {
          score = parseInt(scoreMatch3[1]);
        }
      }
      
      // Pattern 4: Look for a number followed by % near the beginning of the text
      if (score === 0) {
        const scoreMatch4 = evaluationText.match(/(\d+)%/);
        if (scoreMatch4) {
          score = parseInt(scoreMatch4[1]);
        }
      }
      
      // If no explicit score is found, calculate it from criteria points
      if (score === 0) {
        // Parse individual criteria scores using regex to find patterns like "15/15 points" or "(15/20 points)"
        const pointsPattern = /(\d+)\/(\d+)\s*points/gi;
        let earnedPoints = 0;
        let totalPoints = 0;
        
        let match;
        while ((match = pointsPattern.exec(evaluationText)) !== null) {
          earnedPoints += parseInt(match[1]);
          totalPoints += parseInt(match[2]);
        }
        
        // Also check for bonus points
        const bonusPattern = /(\d+)\/(\d+)\s*bonus\s*points/gi;
        while ((match = bonusPattern.exec(evaluationText)) !== null) {
          earnedPoints += parseInt(match[1]);
          totalPoints += parseInt(match[2]);
        }
        
        // Check for penalty points
        const penaltyPattern = /-(\d+)\s*points/gi;
        while ((match = penaltyPattern.exec(evaluationText)) !== null) {
          earnedPoints -= parseInt(match[1]);
        }
        
        // Calculate percentage if we found any points
        if (totalPoints > 0) {
          score = Math.round((earnedPoints / totalPoints) * 100);
        }
        
        // If we still don't have a score, try to calculate it from criteria scores
        if (score === 0) {
          // Look for criteria scores in the format "Criteria: 85%"
          const criteriaScores = [];
          const criteriaMatches = evaluationText.matchAll(/([A-Za-z\s]+):\s*(\d+)%/g);
          
          for (const match of criteriaMatches) {
            const criteriaName = match[1].trim();
            const criteriaScore = parseInt(match[2]);
            
            // Skip if it's a known non-criteria match
            if (!['Score', 'Overall Score', 'Final Score'].includes(criteriaName)) {
              criteriaScores.push(criteriaScore);
            }
          }
          
          // Calculate average of criteria scores if we found any
          if (criteriaScores.length > 0) {
            const sum = criteriaScores.reduce((acc, val) => acc + val, 0);
            score = Math.round(sum / criteriaScores.length);
          }
        }
      }
      
      // Ensure score is within valid range
      score = Math.max(0, Math.min(100, score));
      
      // Extract issues
      const issuesMatch = evaluationText.match(/Issues:?\s*([\s\S]*?)(?=Strengths:|Score:|$)/i);
      const issues = issuesMatch ? issuesMatch[1].trim().split('\n').filter(line => line.trim()) : [];
      
      // Extract strengths
      const strengthsMatch = evaluationText.match(/Strengths:?\s*([\s\S]*?)(?=Issues:|Score:|$)/i);
      const strengths = strengthsMatch ? strengthsMatch[1].trim().split('\n').filter(line => line.trim()) : [];
      
      // Extract feedback
      const feedbackMatch = evaluationText.match(/Feedback:?\s*([\s\S]*?)$/i);
      const feedback = feedbackMatch ? feedbackMatch[1].trim() : '';
      
      // Log the extracted score for debugging
      console.log('Extracted score from evaluation:', score);
      
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
        
        // Only generate a response if explicitly requested and it's not the initial message
        if (generateResponse && updatedHistory.length > 1) {
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
      }
      
      // For assistant messages, analyze their impact on customer emotion
      if (messageType === 'assistant') {
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
    
    // Get previous user messages (up to 3) to detect patterns
    const recentUserMessages = chatHistory
      .filter(msg => msg.type === 'user')
      .slice(-3);
    
    const messageLower = userMessage.content.toLowerCase();
    
    // Analyze for negative interactions - expanded list of triggers
    const negativeEmotions = ['frustrated', 'angry', 'disappointed', 'very_negative'];
    const negativeKeywords = [
      'ridiculous', 'absurd', 'unreasonable', 'waste of time', 
      'not interested', 'looking elsewhere', 'too expensive',
      'other venues', 'moving on', 'unhappy', 'annoyed'
    ];
    
    const hasNegativeEmotion = negativeEmotions.includes(currentEmotion);
    const hasNegativeKeyword = negativeKeywords.some(keyword => messageLower.includes(keyword));
    
    if (hasNegativeEmotion || hasNegativeKeyword) {
      const negativeType = hasNegativeKeyword ? 
        `explicitly stated ${negativeKeywords.find(k => messageLower.includes(k))}` :
        `showed ${currentEmotion} emotion`;
      
      trackNegativeInteraction({
        description: `Customer ${negativeType}`,
        impact: 'high',
        trigger: userMessage.content.substring(0, 100) + (userMessage.content.length > 100 ? '...' : '')
      });
      
      console.warn(`Negative interaction detected: ${negativeType}`);
    }
    
    // Detect sudden shift in tone from previous messages
    if (recentUserMessages.length > 1) {
      const prevMsg = recentUserMessages[recentUserMessages.length - 2]?.content.toLowerCase() || '';
      const currentMsg = messageLower;
      
      // Check message length change - sudden very short responses can signal disengagement
      if (prevMsg.length > 50 && currentMsg.length < 15) {
        trackNegativeInteraction({
          description: 'Customer message length dropped significantly - possible disengagement',
          impact: 'medium',
          trigger: 'Message length changed from ' + prevMsg.length + ' to ' + currentMsg.length + ' characters'
        });
      }
      
      // Check for abrupt endings
      const endingPhrases = [
        'thank you for your time', 'we\'ll think about it', 'get back to you',
        'consider other', 'look elsewhere', 'need to go', 'have to go'
      ];
      
      if (endingPhrases.some(phrase => currentMsg.includes(phrase))) {
        trackNegativeInteraction({
          description: 'Customer signaling conversation end - possible lost opportunity',
          impact: 'high',
          trigger: userMessage.content
        });
      }
    }
    
    // Analyze for missed opportunities - expanded
    const opportunityTriggers = [
      {keyword: 'budget', context: 'Budget discussion', response: 'package|price|cost|value|investment'},
      {keyword: 'date', context: 'Date availability', response: 'calendar|availability|available|schedule|book'},
      {keyword: 'capacity', context: 'Venue capacity', response: 'accommodate|guest|fit|space|room'},
      {keyword: 'menu', context: 'Food & beverage', response: 'catering|food|chef|cuisine|dietary'},
      {keyword: 'weather', context: 'Weather contingency', response: 'rain|backup|plan|indoor|tent'}
    ];
    
    opportunityTriggers.forEach(trigger => {
      if (messageLower.includes(trigger.keyword) && 
          lastAssistantMessage && 
          !new RegExp(trigger.response).test(lastAssistantMessage.content.toLowerCase())) {
        trackMissedOpportunity({
          description: `Missed opportunity to address ${trigger.keyword} concerns`,
          impact: 'medium',
          context: trigger.context
        });
      }
    });
    
    // Analyze for repeated questions/concerns that weren't addressed
    const repeatedConcerns = recentUserMessages
      .filter(msg => msg !== userMessage) // Exclude current message
      .filter(msg => {
        const msgLower = msg.content.toLowerCase();
        // Find a concern in previous message that's repeated in current message
        return opportunityTriggers.some(trigger => 
          msgLower.includes(trigger.keyword) && messageLower.includes(trigger.keyword)
        );
      });
    
    if (repeatedConcerns.length > 0) {
      const concernType = opportunityTriggers.find(trigger => 
        messageLower.includes(trigger.keyword) && 
        repeatedConcerns.some(msg => msg.content.toLowerCase().includes(trigger.keyword))
      )?.context || 'customer concern';
      
      trackMissedOpportunity({
        description: `Failed to address repeated ${concernType} - customer had to ask again`,
        impact: 'high',
        context: 'Repeated concerns'
      });
    }
    
    // Analyze for rapport building - expanded
    const rapportPhrases = [
      {phrase: 'understand', impact: 'medium', context: 'Empathy'},
      {phrase: 'feel', impact: 'medium', context: 'Emotional connection'},
      {phrase: 'appreciate', impact: 'medium', context: 'Gratitude'},
      {phrase: 'similar to', impact: 'high', context: 'Shared experience'},
      {phrase: 'like you', impact: 'high', context: 'Personal connection'},
      {phrase: 'absolutely', impact: 'medium', context: 'Affirmation'},
      {phrase: 'great question', impact: 'medium', context: 'Validation'}
    ];
    
    if (lastAssistantMessage) {
      const assistantLower = lastAssistantMessage.content.toLowerCase();
      
      for (const {phrase, impact, context} of rapportPhrases) {
        if (assistantLower.includes(phrase)) {
          trackRapportBuilding({
            description: `Used "${phrase}" to build rapport`,
            impact,
            context
          });
          break; // Only track the first rapport-building phrase found
        }
      }
    }
    
    // Analyze for closing attempts - expanded
    const closingPhrases = [
      {phrase: 'book', effectiveness: 'medium', context: 'Direct booking'},
      {phrase: 'reserve', effectiveness: 'medium', context: 'Reservation'},
      {phrase: 'schedule', effectiveness: 'low', context: 'Scheduling'},
      {phrase: 'secure your date', effectiveness: 'high', context: 'Creating urgency'},
      {phrase: 'deposit', effectiveness: 'high', context: 'Payment discussion'},
      {phrase: 'contract', effectiveness: 'high', context: 'Formal agreement'},
      {phrase: 'hold the date', effectiveness: 'medium', context: 'Temporary hold'}
    ];
    
    if (lastAssistantMessage) {
      const assistantLower = lastAssistantMessage.content.toLowerCase();
      
      for (const {phrase, effectiveness, context} of closingPhrases) {
        if (assistantLower.includes(phrase)) {
          // Check if the client responded positively
          const positiveResponse = messageLower.includes('yes') || 
                                  messageLower.includes('sure') || 
                                  messageLower.includes('ok') || 
                                  messageLower.includes('sounds good');
          
          trackClosingAttempt({
            description: `Used "${phrase}" closing technique`,
            effectiveness: positiveResponse ? 'high' : effectiveness,
            context,
            result: positiveResponse ? 'Positive response' : 'No clear commitment'
          });
          break; // Only track the first closing attempt found
        }
      }
    }
    
    // Log analysis summary
    console.log(`Interaction analysis for message: "${messageLower.substring(0, 50)}..."`);
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