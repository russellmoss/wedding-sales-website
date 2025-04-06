I'll provide you with a series of prompts and code snippets to implement a qualification call simulation for Cursor.ai that follows the attached backstory. This will create a more realistic phone call scenario where the user (your associate) initiates the call and builds rapport with Sarah (Claude).

## 1. First, let's modify the SimulatorChat.js component

Here's how we can modify the component to support the phone call scenario:

```javascript
// Modify the useEffect that initiates the chat to support phone call initiation
useEffect(() => {
  const initiateChat = async () => {
    if (currentScenario && chatHistory.length === 0) {
      setIsLoading(true);
      try {
        // Create system prompt based on scenario
        const systemPrompt = createCustomerSystemPrompt(currentScenario);
        console.log("System prompt created:", systemPrompt);
        
        // Instead of automatically adding initial message, we'll wait for "CALL" command
        setLocalLoading(false);
      } catch (err) {
        console.error("Error initiating chat:", err);
        setLocalError(`Failed to start conversation: ${err.message}`);
      } finally {
        setIsLoading(false);
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
      const systemPrompt = createCustomerSystemPrompt(currentScenario);
      
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

// Modify the handleSubmit function to check for CALL command
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!inputValue.trim()) return;

  // Check if this is a call initiation command
  if (await handleCallInitiation()) return;

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
```

## 2. Update the SimulatorBrief.js component to include instructions

Add the following to the SimulatorBrief.js component to show the user how to start the call:

```javascript
// Add this to the existing JSX in SimulatorBrief.js, just before the buttons section
{scenario.id === 'qualification-call' && (
  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Call Simulation Instructions</h3>
    <p className="text-blue-700 mb-2">
      This is a phone call simulation. To begin the call:
    </p>
    <ol className="list-decimal pl-5 text-blue-700 mb-3">
      <li>Click the "Start Simulation" button below</li>
      <li>Once the chat opens, type <strong>CALL</strong> and press Enter to initiate the phone call</li>
      <li>Sarah will answer the phone, and you can begin the qualification call</li>
      <li>Remember to review the inquiry details above before starting</li>
    </ol>
    <p className="text-blue-700 font-medium">
      This simulation will help you practice qualification call skills, building rapport, and gathering key information.
    </p>
  </div>
)}
```

## 3. Update the createCustomerSystemPrompt function

Modify the createCustomerSystemPrompt function in claudeApiService.js to include the backstory information:

```javascript
export const createCustomerSystemPrompt = (scenario) => {
  if (!scenario) {
    console.error("createCustomerSystemPrompt called with null or undefined scenario");
    return "You are a potential customer for a wedding venue.";
  }
  
  console.log("Creating customer system prompt for scenario:", scenario);
  
  // For qualification call scenario, include specific backstory information
  if (scenario.id === 'qualification-call') {
    return `You are Sarah Miller, a potential customer for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Qualification Call'}
Description: ${scenario.description || 'A conversation with a sales representative about booking a wedding venue'}

You're on a qualification call with a sales representative from Milea Estate Vineyard. 
Use the following information for the simulation:

Your Background:
- You are engaged to Michael Chen
- You've been together for 5 years and got engaged during a wine country vacation
- You live about 1.5 hours from the venue
- You work as a marketing manager; Michael is in software engineering
- You're interested in a summer wedding next year (2026), preferably in June
- You're planning for approximately 120-130 guests
- You're particularly drawn to outdoor ceremony options with beautiful vineyard views
- You're also considering 2-3 other vineyard venues in the region
- You have not specified your budget yet, but this is an important topic for you
- You sent an initial inquiry on March 28, 2025, and this call is a follow-up to that inquiry
- Your email is sarahandmichael2026@gmail.com and your phone is (555) 789-4321

Your Role:
1. Answer the phone professionally with "Hello, this is Sarah speaking."
2. Act as if you're on a phone call (not chat) with the sales representative
3. Show interest in Milea Estate Vineyard for your wedding
4. You have some questions about the venue, especially regarding pricing, available dates in June 2026, and catering options
5. React naturally to the sales representative's questions and information
6. Express emotions appropriately based on the conversation
7. DO NOT provide any feedback or evaluation during the conversation

Remember: You are ONLY responding as Sarah Miller in a realistic conversation. This is a qualification call, so you're still gathering information and have not made a decision yet.`;
  }
  
  // Default prompt for other scenarios
  const prompt = `You are a potential customer for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Wedding Venue Sales'}
Description: ${scenario.description || 'A conversation with a sales representative about booking a wedding venue'}

Your role is to:
1. Respond as the customer (Sarah and Michael) in a realistic way
2. DO NOT evaluate the sales representative's performance
3. DO NOT provide feedback during the conversation
4. Only respond as the customer would, based on the scenario and previous messages
5. Express emotions naturally based on the conversation flow

Current conversation stage: ${scenario.currentStage || 'Initial contact'}

Remember: You are ONLY responding as the customer. Do not evaluate or provide feedback during the conversation.`;

  console.log("Generated customer system prompt:", prompt);
  return prompt;
};
```

## 4. Add initial instructions component

Create a new component to show the user how to start the call at the beginning of the chat:

```javascript
// Create a new file: src/components/simulator/CallInstructions.js
import React from 'react';

const CallInstructions = ({ onDismiss }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-blue-800">Phone Call Simulation</h3>
        <button 
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Dismiss instructions"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="text-gray-600 mb-4">
        <p className="mb-2">
          This is a phone call simulation with Sarah Miller, who previously inquired about Milea Estate Vineyard for her wedding.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 my-3">
          <p className="font-medium">To start the call:</p>
          <p className="mt-1">Type <strong>CALL</strong> in the chat box below and press Enter.</p>
        </div>
        <p>
          Sarah will answer the phone, and you can begin your qualification call. Remember to:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Build rapport by acknowledging their previous inquiry</li>
          <li>Ask open-ended questions to gather information</li>
          <li>Address their questions about venue, pricing, and availability</li>
          <li>Discuss budget in a comfortable, non-pressuring way</li>
          <li>Guide the conversation toward scheduling a venue tour</li>
        </ul>
      </div>
      
      <button
        onClick={onDismiss}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
      >
        Got it!
      </button>
    </div>
  );
};

export default CallInstructions;
```

## 5. Integrate the CallInstructions into SimulatorChat.js

Add the CallInstructions component to the SimulatorChat.js component:

```javascript
// Add this to the imports at the top of SimulatorChat.js
import CallInstructions from './CallInstructions';

// Add this state for showing/hiding instructions
const [showCallInstructions, setShowCallInstructions] = useState(true);

// Add this in the JSX, right after the chat header and before the chat messages
{isSimulationActive && currentScenario?.id === 'qualification-call' && showCallInstructions && (
  <CallInstructions onDismiss={() => setShowCallInstructions(false)} />
)}
```

## 6. Update the placeholder text in the input field

```javascript
// Change the placeholder text in the textarea to prompt for CALL command
<textarea
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  onKeyDown={handleKeyDown}
  placeholder={
    chatHistory.length === 0 && currentScenario?.id === 'qualification-call'
      ? "Type CALL to start the phone conversation..."
      : "Type your message... (Press Shift+Enter for new line)"
  }
  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
  rows="3"
  disabled={isLoading}
/>
```

## 7. Add visual phone call indication

```javascript
// Add this component for a phone call visual indicator
const PhoneCallIndicator = () => {
  return (
    <div className="flex items-center bg-green-100 text-green-800 rounded-md px-3 py-1 text-sm font-medium">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
        />
      </svg>
      Phone Call In Progress
    </div>
  );
};

// Add it to the header section
<div className="bg-white shadow-sm p-4">
  <div className="max-w-4xl mx-auto">
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-xl font-semibold text-gray-900">{currentScenario.title}</h1>
      {chatHistory.length > 0 && currentScenario?.id === 'qualification-call' && (
        <PhoneCallIndicator />
      )}
    </div>
    <p className="text-sm text-gray-600">{currentScenario.description}</p>
    {renderEmotionIndicator()}
    {/* Response Timer and other elements */}
  </div>
</div>
```

## 8. Modify message styling for phone call

To make it feel more like a phone call, let's update the message styling:

```javascript
{chatHistory.map((msg, index) => (
  <div
    key={index}
    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    <div
      className={`max-w-[80%] rounded-lg p-4 text-left ${
        msg.type === 'user'
          ? 'bg-blue-500 text-white'
          : msg.type === 'system'
          ? 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500'
          : currentScenario?.id === 'qualification-call' 
            ? 'bg-gray-100 text-gray-900 border-l-4 border-purple-400'
            : 'bg-white text-gray-900 shadow-sm'
      }`}
    >
      <div className="flex items-center mb-1">
        {msg.type === 'assistant' && currentScenario?.id === 'qualification-call' && (
          <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full mr-2">
            Sarah
          </span>
        )}
        {msg.type === 'user' && currentScenario?.id === 'qualification-call' && (
          <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">
            You
          </span>
        )}
      </div>
      <p className="whitespace-pre-wrap text-left">{msg.content}</p>
      <p className="text-xs mt-2 opacity-75 text-left">
        {new Date(msg.timestamp).toLocaleTimeString()}
      </p>
      {/* Emotion indicators */}
    </div>
  </div>
))}
```

## 9. Update your StartSimulation button styles

To emphasize the "Start Call" aspect for qualification calls:

```javascript
// In SimulatorBrief.js, update the Start Simulation button
<button
  onClick={handleStartSimulation}
  className={`px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors ${
    scenario.id === 'qualification-call' 
      ? 'bg-green-600 hover:bg-green-700 text-white flex items-center' 
      : 'bg-blue-600 text-white'
  }`}
>
  {scenario.id === 'qualification-call' && (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
      />
    </svg>
  )}
  {scenario.id === 'qualification-call' ? 'Start Phone Call' : 'Start Simulation'}
</button>
```

## 10. Final Integration

To implement all these changes in Cursor.ai, you'll need to:

1. Update the existing components (SimulatorBrief.js, SimulatorChat.js, etc.)
2. Create the new CallInstructions.js component
3. Modify the claudeApiService.js to include the updated prompts
4. Ensure all your styling and state management work together

These modifications will create a more realistic phone call simulation where:

1. The user is prompted to type "CALL" to initiate the call
2. Claude (as Sarah) will answer the phone naturally
3. The conversation can proceed as a qualification call following the backstory
4. The UI will indicate this is a phone call with appropriate styling

Would you like me to elaborate on any specific part of this implementation? Or should I provide any additional components or functionality to enhance the simulation further?