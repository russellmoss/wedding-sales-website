export const salesSimulatorScenarios = [
  {
    id: "initial-inquiry",
    title: "Initial Inquiry Response",
    difficulty: "Beginner",
    description: "Handle an initial wedding inquiry from a couple interested in Milea Estate Vineyard.",
    context: "A couple has submitted an inquiry through your website contact form. They're interested in a summer wedding next year for approximately 120 guests. This is your first interaction with them.",
    clientPersonality: {
      name: "Taylor and Jordan",
      traits: ["Excited", "Research-oriented", "Budget-conscious"],
      concerns: ["Pricing", "Date availability", "What's included"]
    },
    objectives: [
      "Respond promptly and personally",
      "Gather essential information",
      "Build rapport",
      "Schedule a venue tour"
    ],
    evaluationCriteria: {
      responseTime: {
        description: "Acknowledged the importance of responding quickly",
        weight: 10
      },
      personalization: {
        description: "Used the couple's names and personalized the response",
        weight: 15
      },
      warmth: {
        description: "Demonstrated genuine enthusiasm and warmth",
        weight: 15
      },
      informationGathering: {
        description: "Asked appropriate qualification questions about vision, guest count, and date preferences",
        weight: 20
      },
      callToAction: {
        description: "Provided a clear next step (typically scheduling a tour)",
        weight: 20
      },
      followUpPlan: {
        description: "Mentioned a specific follow-up plan if they don't respond",
        weight: 10
      },
      communicationOptions: {
        description: "Provided multiple ways to communicate (email, phone, text)",
        weight: 10
      }
    },
    stageFunnel: "top-funnel",
    keyDocuments: ["step-1-inquiry-response-section.md"]
  },
  {
    id: "qualification-call",
    title: "Qualification Call",
    difficulty: "Intermediate",
    description: "Conduct a qualification call with a couple who has shown interest in your venue.",
    context: "You've scheduled a call with a couple who inquired about your venue. They've expressed interest in a fall wedding and have a guest count of around 150 people.",
    clientPersonality: {
      name: "Alex and Sam",
      traits: ["Busy professionals", "Detail-oriented", "Value-focused"],
      concerns: ["Budget constraints", "Logistics", "Unique features"]
    },
    objectives: [
      "Confirm key details about their wedding",
      "Understand their budget range",
      "Identify their priorities and preferences",
      "Qualify them as a potential client"
    ],
    evaluationCriteria: {
      preparation: {
        description: "Reviewed their inquiry details before the call",
        weight: 10
      },
      rapport: {
        description: "Established a comfortable conversation flow",
        weight: 15
      },
      questionQuality: {
        description: "Asked open-ended questions to gather information",
        weight: 20
      },
      activeListening: {
        description: "Demonstrated active listening and acknowledged their responses",
        weight: 15
      },
      budgetDiscussion: {
        description: "Addressed budget concerns professionally",
        weight: 20
      },
      valueProposition: {
        description: "Highlighted venue features that match their needs",
        weight: 10
      },
      nextSteps: {
        description: "Clearly outlined next steps in the process",
        weight: 10
      }
    },
    stageFunnel: "middle-funnel",
    keyDocuments: ["step-2-qualification-call-section.md"]
  },
  {
    id: "venue-tour",
    title: "Venue Tour",
    difficulty: "Advanced",
    description: "Lead a venue tour for a couple considering your property for their wedding.",
    context: "A couple has scheduled a venue tour after your qualification call. They're particularly interested in your outdoor ceremony space and have mentioned they want a rustic yet elegant wedding.",
    clientPersonality: {
      name: "Morgan and Casey",
      traits: ["Visual learners", "Enthusiastic", "Family-oriented"],
      concerns: ["Space capacity", "Weather contingency plans", "Photo opportunities"]
    },
    objectives: [
      "Create a memorable experience",
      "Showcase key features that match their needs",
      "Address their specific concerns",
      "Move them closer to booking"
    ],
    evaluationCriteria: {
      preparation: {
        description: "Prepared the venue for the tour",
        weight: 10
      },
      welcome: {
        description: "Created a warm, welcoming atmosphere",
        weight: 15
      },
      storytelling: {
        description: "Used storytelling to highlight venue features",
        weight: 20
      },
      personalization: {
        description: "Tailored the tour to their specific interests",
        weight: 15
      },
      questionHandling: {
        description: "Addressed their questions confidently",
        weight: 20
      },
      visualization: {
        description: "Helped them visualize their wedding at the venue",
        weight: 10
      },
      nextSteps: {
        description: "Clearly outlined next steps after the tour",
        weight: 10
      }
    },
    stageFunnel: "middle-funnel",
    keyDocuments: ["step-3-venue-tour-section.md"]
  },
  {
    id: "proposal-presentation",
    title: "Proposal Presentation",
    difficulty: "Expert",
    description: "Present a detailed proposal to a couple who has toured your venue.",
    context: "After a successful venue tour, you're meeting with the couple to present a customized proposal based on their needs and preferences.",
    clientPersonality: {
      name: "Riley and Jamie",
      traits: ["Analytical", "Value-conscious", "Decision-makers"],
      concerns: ["Pricing transparency", "Package inclusions", "Payment terms"]
    },
    objectives: [
      "Present a compelling value proposition",
      "Address their specific needs and concerns",
      "Overcome objections professionally",
      "Close the sale"
    ],
    evaluationCriteria: {
      proposalQuality: {
        description: "Created a comprehensive, customized proposal",
        weight: 15
      },
      presentation: {
        description: "Delivered the proposal confidently and clearly",
        weight: 15
      },
      valueFocus: {
        description: "Emphasized value rather than just price",
        weight: 20
      },
      objectionHandling: {
        description: "Addressed concerns professionally",
        weight: 20
      },
      urgency: {
        description: "Created appropriate urgency without pressure",
        weight: 10
      },
      closing: {
        description: "Asked for the booking confidently",
        weight: 10
      },
      followUp: {
        description: "Established a clear follow-up plan",
        weight: 10
      }
    },
    stageFunnel: "bottom-funnel",
    keyDocuments: ["step-4-proposal-section.md"]
  }
]; 